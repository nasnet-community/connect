/**
 * RouterOS smoke-validator for the generated DomesticIPUpdate script.
 *
 * Goal: catch the classes of bugs a substring-only test can't:
 *   1. Unbalanced { } [ ] ( ) inside the script body
 *   2. Unbalanced { } [ ] ( ) inside the boot-scheduler `on-event="..."`
 *     (this is the worry the TODO at the top of DomesticIPS.ts calls out)
 *   3. Orphan trailing line-continuation `\` at end of script body
 *   4. Every :do { has a matching `}` partner
 *   5. The escaping in /system script source="..." un-escapes to a valid body
 *
 * NOTE: this is a smoke validator, not a RouterOS parser. It treats `#` as
 * a line comment, ignores brace chars inside RouterOS double-quoted strings,
 * and accounts for `\\`/`\"`/`\$`/`\r`/`\n` escapes when un-quoting.
 */
import { describe, expect, it } from "vitest";
import { generateDomesticIPScript } from "./DomesticIPS";

// Un-escape a RouterOS double-quoted string value
function unescapeRosString(s: string): string {
    let out = "";
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === "\\" && i + 1 < s.length) {
            const n = s[i + 1];
            if (n === "n") out += "\n";
            else if (n === "r") out += "\r";
            else if (n === "t") out += "\t";
            else if (n === '"') out += '"';
            else if (n === "\\") out += "\\";
            else if (n === "$") out += "$";
            else if (n === "?") out += "?";
            else out += n;
            i++;
        } else {
            out += c;
        }
    }
    return out;
}

interface BalanceResult {
    ok: boolean;
    error?: string;
    finalDepth: { "{": number; "[": number; "(": number };
}

function checkBalance(body: string): BalanceResult {
    const depth = { "{": 0, "[": 0, "(": 0 };
    const pairs: Record<string, "{" | "[" | "("> = {
        "}": "{",
        "]": "[",
        ")": "(",
    };
    let inStr = false;
    let lineNo = 1;
    let col = 0;
    for (let i = 0; i < body.length; i++) {
        const c = body[i];
        if (c === "\n") {
            lineNo++;
            col = 0;
            continue;
        }
        col++;
        if (inStr) {
            if (c === "\\" && i + 1 < body.length) {
                i++;
                col++;
                continue;
            }
            if (c === '"') inStr = false;
            continue;
        }
        if (c === '"') {
            inStr = true;
            continue;
        }
        if (c === "#") {
            while (i < body.length && body[i] !== "\n") i++;
            i--;
            continue;
        }
        if (c === "{" || c === "[" || c === "(") {
            depth[c]++;
        } else if (c === "}" || c === "]" || c === ")") {
            const opener = pairs[c];
            depth[opener]--;
            if (depth[opener] < 0) {
                return {
                    ok: false,
                    error: `unmatched closing '${c}' at line ${lineNo} col ${col}`,
                    finalDepth: depth,
                };
            }
        }
    }
    if (inStr) {
        return {
            ok: false,
            error: "ended inside an open string literal",
            finalDepth: depth,
        };
    }
    if (depth["{"] !== 0 || depth["["] !== 0 || depth["("] !== 0) {
        return {
            ok: false,
            error: `final depths { } [ ] ( ) = ${depth["{"]} ${depth["["]} ${depth["("]}`,
            finalDepth: depth,
        };
    }
    return { ok: true, finalDepth: depth };
}

function hasTrailingContinuation(body: string): boolean {
    const lines = body.split("\n");
    const last = lines[lines.length - 1].replace(/\s+$/, "");
    return last.endsWith("\\");
}

// Every `:do {` should have a matching `}`
function checkDoBlocks(body: string): { ok: boolean; unmatchedAt?: number } {
    let i = 0;
    while ((i = body.indexOf(":do {", i)) !== -1) {
        let depth = 0;
        let j = i + ":do ".length;
        let inStr = false;
        for (; j < body.length; j++) {
            const c = body[j];
            if (inStr) {
                if (c === "\\" && j + 1 < body.length) {
                    j++;
                    continue;
                }
                if (c === '"') inStr = false;
                continue;
            }
            if (c === '"') {
                inStr = true;
                continue;
            }
            if (c === "#") {
                while (j < body.length && body[j] !== "\n") j++;
                continue;
            }
            if (c === "{") depth++;
            else if (c === "}") {
                depth--;
                if (depth === 0) break;
            }
        }
        if (depth !== 0) return { ok: false, unmatchedAt: i };
        i = j + 1;
    }
    return { ok: true };
}

function extractQuotedValue(cmd: string, attr: string): string | null {
    // Greedy-match attr="..." accounting for \" escapes
    const re = new RegExp(`${attr}="((?:\\\\.|[^"\\\\])*)"`);
    const m = cmd.match(re);
    return m ? m[1] : null;
}

describe("DomesticIPUpdate generated .rsc smoke checks", () => {
    const config = generateDomesticIPScript("03:00");

    it("produces exactly one /system script and two /system scheduler commands", () => {
        expect(config["/system script"]).toHaveLength(1);
        expect(config["/system scheduler"]).toHaveLength(2);
    });

    it("/system script source is balanced and well-formed", () => {
        const cmd = config["/system script"][0];
        const escaped = extractQuotedValue(cmd, "source");
        expect(escaped, "could not extract source=\"...\"").toBeTruthy();
        const body = unescapeRosString(escaped!);

        const balance = checkBalance(body);
        expect(
            balance.ok,
            balance.error
                ? `brace/bracket balance failed: ${balance.error}`
                : undefined,
        ).toBe(true);

        expect(hasTrailingContinuation(body)).toBe(false);

        const doBlocks = checkDoBlocks(body);
        expect(doBlocks.ok).toBe(true);

        // Sanity: required guards must survive escaping round-trip
        expect(body).toContain(":local stagingListName");
        expect(body).toContain(":global domesticIPUpdateRunning");
        expect(body).toContain(":do {");
        expect(body).toContain("} on-error={");
        // We expect multiple :error throws inside the wrapping :do
        const errorThrows = (body.match(/:error "/g) ?? []).length;
        expect(errorThrows).toBeGreaterThanOrEqual(4);
        // Cleanup must always run after the on-error closes
        expect(body).toMatch(
            /:set domesticIPUpdateRunning false[\s\S]*:set cleanLine/,
        );
    });

    it("DomesticIPUpdate scheduler on-event is balanced and well-formed", () => {
        const cmd = config["/system scheduler"].find((c) =>
            /name=DomesticIPUpdate(?!-)/.test(c),
        );
        expect(cmd, "no scheduler for DomesticIPUpdate").toBeTruthy();
        const escaped = extractQuotedValue(cmd!, "on-event");
        expect(escaped).toBeTruthy();
        const body = unescapeRosString(escaped!);

        const balance = checkBalance(body);
        expect(
            balance.ok,
            balance.error
                ? `brace/bracket balance failed: ${balance.error}`
                : undefined,
        ).toBe(true);
        expect(hasTrailingContinuation(body)).toBe(false);
        // Bi-weekly main scheduler just calls `/system script run DomesticIPUpdate`
        expect(body).toContain("/system script");
    });

    it("DomesticIPUpdate-BootCheck scheduler on-event is balanced and well-formed", () => {
        const cmd = config["/system scheduler"].find((c) =>
            /name=DomesticIPUpdate-BootCheck/.test(c),
        );
        expect(cmd, "no scheduler for BootCheck").toBeTruthy();
        const escaped = extractQuotedValue(cmd!, "on-event");
        expect(escaped).toBeTruthy();
        const body = unescapeRosString(escaped!);

        const balance = checkBalance(body);
        expect(
            balance.ok,
            balance.error
                ? `brace/bracket balance failed: ${balance.error}`
                : undefined,
        ).toBe(true);
        expect(hasTrailingContinuation(body)).toBe(false);
        const doBlocks = checkDoBlocks(body);
        expect(doBlocks.ok).toBe(true);

        // Required behaviors of the boot guard
        expect(body).toContain(":delay 5m");
        expect(body).toContain("/ip firewall address-list find list=DOMAddList");
        expect(body).toMatch(/:if \(\$currentCount < 100\) do=\{/);
        expect(body).toContain("/system script run DomesticIPUpdate");
    });
});
