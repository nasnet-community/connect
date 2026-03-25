import { describe, expect, it } from "vitest";
import type { RouterConfig } from "../ConfigGenerator";
import {
    OneTimeScript,
    SchedulerGenerator,
    ScriptAndScheduler,
    ScriptGenerator,
    formatRouterConfig,
} from "./ScriptSchedule";

describe("ScriptSchedule utils", () => {
    // Verifies the formatter keeps section headers and comments while applying line continuation to longer commands.
    it("formats router config into RouterOS script text", () => {
        const input: RouterConfig = {
            "": ["# header"],
            "/ip firewall filter": [
                "add action=accept chain=input connection-state=established,related protocol=tcp dst-port=443",
            ],
        };

        const result = formatRouterConfig(input);

        expect(result).toContain("# header");
        expect(result).toContain("/ip firewall filter");
        expect(result).toContain(" \\\n    protocol=tcp dst-port=443");
    });

    // Verifies escapeForScript protects quotes, dollar signs, and line breaks for embedded script content.
    it("escapes special characters for embedded script source", () => {
        const input: RouterConfig = {
            "/log": ['info "Hello $world"', 'warning "line2"'],
        };

        const result = formatRouterConfig(input, { escapeForScript: true });

        expect(result).toContain('\\"Hello \\$world\\"');
        expect(result).toContain("\\r\\n");
    });

    // Verifies the scheduler generator embeds escaped script content with the current default interval behavior.
    it("builds scheduler commands with embedded on-event content", () => {
        const result = SchedulerGenerator({
            Name: "nightly-check",
            content: {
                "/log": ['info "nightly"'],
            },
            startTime: "startup",
        });

        expect(result["/system scheduler"]).toHaveLength(1);
        expect(result["/system scheduler"][0]).toContain("interval=00:00:00");
        expect(result["/system scheduler"][0]).toContain("name=nightly-check");
        expect(result["/system scheduler"][0]).toContain(
            'on-event="/log\\r\\ninfo \\"nightly\\""',
        );
        expect(result["/system scheduler"][0]).toContain("start-time=startup");
    });

    // Verifies the script generator uses the current quoted script name and escaped source string format.
    it("builds script commands with quoted names and escaped source", () => {
        const result = ScriptGenerator({
            scriptName: "refresh-peers",
            ScriptContent: {
                "/system script": ["run updater"],
            },
        });

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system script"][0]).toContain('name="refresh-peers"');
        expect(result["/system script"][0]).toContain(
            'source="/system script\\r\\nrun updater"',
        );
    });

    // Verifies the combined helper produces both the script and a scheduler that runs it.
    it("builds paired script and scheduler configs", () => {
        const result = ScriptAndScheduler({
            Name: "paired-job",
            interval: "00:05:00",
            startTime: "12:00:00",
            ScriptContent: {
                "/log": ['warning "paired"'],
            },
        });

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(result["/system scheduler"][0]).toContain("name=paired-job");
        expect(result["/system scheduler"][0]).toContain("run paired-job");
    });

    // Verifies a one-time script appends scheduler self-removal and no longer injects the old top-level comment block.
    it("builds self-cleaning one-time scripts without legacy header comments", () => {
        const result = OneTimeScript({
            name: "bootstrap",
            startTime: "startup",
            ScriptContent: {
                "/ip service": ["enable ssh"],
            },
        });

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(result["/system script"][0]).toContain(
            "remove [find name=bootstrap];",
        );
        expect(result["/system scheduler"][0]).toContain("name=bootstrap");
        expect(result[""]).toEqual([]);
    });
});
