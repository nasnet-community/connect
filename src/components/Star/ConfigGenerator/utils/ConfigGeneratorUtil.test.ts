import { describe, expect, it } from "vitest";
import type { RouterConfig } from "../ConfigGenerator";
import {
    CommandShortner,
    SConfigGenerator,
    formatConfig,
    mergeConfigurations,
    mergeMultipleConfigs,
    mergeRouterConfigs,
    removeEmptyArrays,
    removeEmptyLines,
} from "./ConfigGeneratorUtil";

describe("ConfigGeneratorUtil", () => {
    // Verifies all three merge helpers concatenate commands without dropping shared sections.
    it("merges router configs across shared keys", () => {
        const left: RouterConfig = {
            "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            "/system identity": ["set name=left"],
        };
        const right: RouterConfig = {
            "/ip address": ["add address=10.0.0.1/24 interface=ether2"],
            "/ip route": ["add gateway=192.168.1.254"],
        };

        expect(mergeRouterConfigs(left, right)["/ip address"]).toHaveLength(2);
        expect(mergeConfigurations(left, right)["/ip route"]).toEqual([
            "add gateway=192.168.1.254",
        ]);
        expect(mergeMultipleConfigs(left, right, left)["/system identity"]).toHaveLength(2);
    });

    // Verifies empty array sections are removed while populated sections are preserved.
    it("removes empty sections before formatting", () => {
        const result = removeEmptyArrays({
            "/ip address": [],
            "/system identity": ["set name=router"],
        });

        expect(result).toEqual({
            "/system identity": ["set name=router"],
        });
    });

    // Verifies blank lines are stripped from raw string output.
    it("removes empty lines from formatted strings", () => {
        expect(removeEmptyLines("a\n\n  \n b\n")).toBe("a\n b");
    });

    // Verifies formatConfig keeps section headers even when values trim down to nothing, matching current implementation.
    it("formats sections using the current header-first behavior", () => {
        const result = formatConfig({
            "/ip address": ["add address=192.168.1.1/24 interface=ether1", ""],
            "/ip route": ["   "],
        });

        expect(result).toContain("/ip address");
        expect(result).toContain("add address=192.168.1.1/24 interface=ether1");
        expect(result).toContain("/ip route");
        expect(result.endsWith("\n")).toBe(false);
    });

    // Verifies SConfigGenerator removes empty arrays before the final string is produced.
    it("generates a compact config string from non-empty sections only", () => {
        const result = SConfigGenerator({
            "/ip address": ["add address=192.168.1.1/24 interface=ether1", ""],
            "/ip route": [],
            "/system identity": ["set name=router"],
        });

        expect(result).toContain("/ip address");
        expect(result).toContain("/system identity");
        expect(result).not.toContain("/ip route");
        expect(result.split("\n").every((line) => line.trim().length > 0)).toBe(true);
    });

    // Verifies CommandShortner leaves comments and short commands unchanged.
    it("preserves comments and commands with four or fewer parsed parts", () => {
        const result = CommandShortner({
            "": ["# unchanged comment"],
            "/system identity": ["set name=router"],
            "/ip route": ["add gateway=1.1.1.1 distance=1"],
        });

        expect(result[""]).toEqual(["# unchanged comment"]);
        expect(result["/system identity"]).toEqual(["set name=router"]);
        expect(result["/ip route"]).toEqual(["add gateway=1.1.1.1 distance=1"]);
    });

    // Verifies long commands are broken into continued lines while preserving quoted strings and bracket expressions.
    it("splits long commands using the current continuation rules", () => {
        const result = CommandShortner({
            "/system script": [
                'set [find name="script 1"] owner=admin policy=read,write,test comment="test script" disabled=no',
            ],
        });

        const command = result["/system script"][0];
        const lines = command.split("\n");

        expect(lines[0]).toBe(
            'set [find name="script 1"] owner=admin policy=read,write,test \\',
        );
        expect(lines[1]).toBe('    comment="test script" disabled=no');
        expect(command).toContain('[find name="script 1"]');
    });
});
