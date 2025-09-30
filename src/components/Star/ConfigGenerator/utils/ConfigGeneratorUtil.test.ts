import { describe, it, expect } from "vitest";
import {
    mergeRouterConfigs,
    mergeMultipleConfigs,
    mergeConfigurations,
    removeEmptyArrays,
    removeEmptyLines,
    formatConfig,
    SConfigGenerator,
    CommandShortner,
} from "./ConfigGeneratorUtil";
import type { RouterConfig } from "../ConfigGenerator";

// Helper function to display test results with formatted output
const testWithOutput = (
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    testFn: () => RouterConfig,
) => {
    console.log("\n" + "=".repeat(80));
    console.log(`🧪 Testing: ${functionName}`);
    console.log(`📝 Test Case: ${testCase}`);
    console.log("📥 Input Parameters:");
    Object.entries(inputs).forEach(([key, value]) => {
        console.log(`   ${key}: ${JSON.stringify(value)}`);
    });

    const result = testFn();
    const formattedOutput = SConfigGenerator(result);

    console.log("\n📤 Raw RouterConfig Output:");
    console.log(JSON.stringify(result, null, 2));

    console.log("\n🎯 Formatted MikroTik Configuration:");
    console.log("─".repeat(40));
    console.log(formattedOutput);
    console.log("─".repeat(40));

    return result;
};

// Validation helper
const validateRouterConfig = (
    config: RouterConfig,
    expectedSections: string[] = [],
) => {
    expect(config).toBeDefined();
    expect(typeof config).toBe("object");

    expectedSections.forEach((section) => {
        expect(config).toHaveProperty(section);
        expect(Array.isArray(config[section])).toBe(true);
        expect(config[section].length).toBeGreaterThan(0);
    });

    // Validate that all commands are strings
    Object.entries(config).forEach(([, commands]) => {
        if (Array.isArray(commands)) {
            commands.forEach((command) => {
                expect(typeof command).toBe("string");
                expect(command.trim().length).toBeGreaterThan(0);
            });
        }
    });
};

describe("ConfigGeneratorUtil", () => {
    describe("mergeRouterConfigs", () => {
        it("should merge two RouterConfigs correctly", () => {
            const config1: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
                "/system identity": ["set name=Router1"],
            };

            const config2: RouterConfig = {
                "/ip address": ["add address=10.0.0.1/8 interface=ether2"],
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
                ],
            };

            const result = testWithOutput(
                "mergeRouterConfigs",
                "Merge two RouterConfigs with overlapping sections",
                {
                    config1: "RouterConfig with ip address and system identity",
                    config2: "RouterConfig with ip address and ip route",
                },
                () => mergeRouterConfigs(config1, config2),
            );

            validateRouterConfig(result, [
                "/ip address",
                "/system identity",
                "/ip route",
            ]);
            const output = SConfigGenerator(result);

            expect(result["/ip address"]).toHaveLength(2);
            expect(result["/system identity"]).toHaveLength(1);
            expect(result["/ip route"]).toHaveLength(1);

            expect(output).toContain("192.168.1.1/24");
            expect(output).toContain("10.0.0.1/8");
            expect(output).toContain("set name=Router1");
            expect(output).toContain("dst-address=0.0.0.0/0");
        });

        it("should merge multiple RouterConfigs", () => {
            const config1: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const config2: RouterConfig = {
                "/ip address": ["add address=10.0.0.1/8 interface=ether2"],
            };

            const config3: RouterConfig = {
                "/system identity": ["set name=TestRouter"],
                "/ip address": ["add address=172.16.0.1/16 interface=ether3"],
            };

            const result = mergeRouterConfigs(config1, config2, config3);
            const output = SConfigGenerator(result);

            expect(result["/ip address"]).toHaveLength(3);
            expect(result["/system identity"]).toHaveLength(1);

            expect(output).toContain("192.168.1.1/24");
            expect(output).toContain("10.0.0.1/8");
            expect(output).toContain("172.16.0.1/16");
            expect(output).toContain("set name=TestRouter");
        });

        it("should handle empty configs", () => {
            const config1: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const emptyConfig: RouterConfig = {};

            const result = mergeRouterConfigs(config1, emptyConfig);
            expect(result).toEqual(config1);
        });

        it("should handle configs with empty arrays", () => {
            const config1: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
                "/ip route": [],
            };

            const config2: RouterConfig = {
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
                ],
            };

            const result = mergeRouterConfigs(config1, config2);
            expect(result["/ip route"]).toHaveLength(1);
            expect(result["/ip route"][0]).toContain("dst-address=0.0.0.0/0");
        });
    });

    describe("mergeMultipleConfigs", () => {
        it("should work identically to mergeRouterConfigs for multiple configs", () => {
            const config1: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const config2: RouterConfig = {
                "/system identity": ["set name=Router2"],
            };

            const config3: RouterConfig = {
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
                ],
            };

            const result1 = mergeMultipleConfigs(config1, config2, config3);
            const result2 = mergeRouterConfigs(config1, config2, config3);

            expect(result1).toEqual(result2);
        });

        it("should handle single config", () => {
            const config: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const result = mergeMultipleConfigs(config);
            expect(result).toEqual(config);
        });

        it("should handle no configs", () => {
            const result = mergeMultipleConfigs();
            expect(result).toEqual({});
        });
    });

    describe("mergeConfigurations", () => {
        it("should merge base and new configurations", () => {
            const baseConfig: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
                "/system identity": ["set name=BaseRouter"],
            };

            const newConfig: RouterConfig = {
                "/ip address": ["add address=10.0.0.1/8 interface=ether2"],
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
                ],
            };

            const result = mergeConfigurations(baseConfig, newConfig);
            const output = SConfigGenerator(result);

            expect(result["/ip address"]).toHaveLength(2);
            expect(result["/system identity"]).toHaveLength(1);
            expect(result["/ip route"]).toHaveLength(1);

            expect(output).toContain("192.168.1.1/24");
            expect(output).toContain("10.0.0.1/8");
            expect(output).toContain("set name=BaseRouter");
        });

        it("should not modify original configs", () => {
            const baseConfig: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const newConfig: RouterConfig = {
                "/ip address": ["add address=10.0.0.1/8 interface=ether2"],
            };

            const originalBase = JSON.parse(JSON.stringify(baseConfig));
            const originalNew = JSON.parse(JSON.stringify(newConfig));

            const result = mergeConfigurations(baseConfig, newConfig);

            expect(baseConfig).toEqual(originalBase);
            expect(newConfig).toEqual(originalNew);
            expect(result["/ip address"]).toHaveLength(2);
        });

        it("should handle new sections in newConfig", () => {
            const baseConfig: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const newConfig: RouterConfig = {
                "/system identity": ["set name=NewRouter"],
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
                ],
            };

            const result = mergeConfigurations(baseConfig, newConfig);

            expect(result["/ip address"]).toHaveLength(1);
            expect(result["/system identity"]).toHaveLength(1);
            expect(result["/ip route"]).toHaveLength(1);
        });
    });

    describe("removeEmptyArrays", () => {
        it("should remove sections with empty arrays", () => {
            const config: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
                "/ip route": [],
                "/system identity": ["set name=TestRouter"],
                "/firewall filter": [],
            };

            const result = removeEmptyArrays(config);

            expect(result["/ip address"]).toBeDefined();
            expect(result["/system identity"]).toBeDefined();
            expect(result["/ip route"]).toBeUndefined();
            expect(result["/firewall filter"]).toBeUndefined();

            expect(Object.keys(result)).toHaveLength(2);
        });

        it("should handle config with all empty arrays", () => {
            const config: RouterConfig = {
                "/ip address": [],
                "/ip route": [],
                "/system identity": [],
            };

            const result = removeEmptyArrays(config);
            expect(Object.keys(result)).toHaveLength(0);
        });

        it("should handle config with no empty arrays", () => {
            const config: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
                "/system identity": ["set name=TestRouter"],
            };

            const result = removeEmptyArrays(config);
            expect(result).toEqual(config);
        });

        it("should handle empty config", () => {
            const config: RouterConfig = {};
            const result = removeEmptyArrays(config);
            expect(result).toEqual({});
        });
    });

    describe("removeEmptyLines", () => {
        it("should remove empty lines from string", () => {
            const input = "line1\n\nline2\n   \nline3\n\n";
            const result = removeEmptyLines(input);
            expect(result).toBe("line1\nline2\nline3");
        });

        it("should remove lines with only whitespace", () => {
            const input = "line1\n   \nline2\n\t\nline3";
            const result = removeEmptyLines(input);
            expect(result).toBe("line1\nline2\nline3");
        });

        it("should handle string with no empty lines", () => {
            const input = "line1\nline2\nline3";
            const result = removeEmptyLines(input);
            expect(result).toBe("line1\nline2\nline3");
        });

        it("should handle empty string", () => {
            const result = removeEmptyLines("");
            expect(result).toBe("");
        });

        it("should handle string with only empty lines", () => {
            const input = "\n\n   \n\t\n";
            const result = removeEmptyLines(input);
            expect(result).toBe("");
        });
    });

    describe("formatConfig", () => {
        it("should format RouterConfig to string correctly", () => {
            const config: RouterConfig = {
                "/ip address": [
                    "add address=192.168.1.1/24 interface=ether1",
                    "add address=10.0.0.1/8 interface=ether2",
                ],
                "/system identity": ["set name=TestRouter"],
            };

            const result = formatConfig(config);

            expect(result).toContain("/ip address");
            expect(result).toContain("/system identity");
            expect(result).toContain(
                "add address=192.168.1.1/24 interface=ether1",
            );
            expect(result).toContain("add address=10.0.0.1/8 interface=ether2");
            expect(result).toContain("set name=TestRouter");

            // Check structure: section header followed by commands
            const lines = result.split("\n");
            expect(lines).toContain("/ip address");
            expect(lines).toContain("/system identity");
        });

        it("should filter out empty values", () => {
            const config: RouterConfig = {
                "/ip address": [
                    "add address=192.168.1.1/24 interface=ether1",
                    "",
                    "   ",
                    "add address=10.0.0.1/8 interface=ether2",
                ],
            };

            const result = formatConfig(config);
            const lines = result.split("\n");

            expect(lines.filter((line) => line.trim() === "")).toHaveLength(0);
            expect(result).toContain(
                "add address=192.168.1.1/24 interface=ether1",
            );
            expect(result).toContain("add address=10.0.0.1/8 interface=ether2");
        });

        it("should handle empty config", () => {
            const config: RouterConfig = {};
            const result = formatConfig(config);
            expect(result).toBe("");
        });

        it("should handle config with empty sections", () => {
            const config: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
                "/ip route": [],
                "/system identity": ["set name=TestRouter"],
            };

            const result = formatConfig(config);

            expect(result).toContain("/ip address");
            expect(result).toContain("/system identity");
            expect(result).not.toContain("/ip route");
        });

        it("should trim trailing newlines", () => {
            const config: RouterConfig = {
                "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
            };

            const result = formatConfig(config);
            expect(result).not.toMatch(/\n+$/);
        });
    });

    describe("SConfigGenerator", () => {
        it("should generate complete formatted config from RouterConfig", () => {
            const config: RouterConfig = {
                "/ip address": [
                    "add address=192.168.1.1/24 interface=ether1",
                    "add address=10.0.0.1/8 interface=ether2",
                ],
                "/system identity": ["set name=TestRouter"],
                "/ip route": [], // This should be removed by removeEmptyArrays
            };

            console.log("\n" + "=".repeat(80));
            console.log(`🧪 Testing: SConfigGenerator`);
            console.log(`📝 Test Case: Complete formatted config generation`);
            console.log("📥 Input RouterConfig:");
            console.log(JSON.stringify(config, null, 2));

            const result = SConfigGenerator(config);

            console.log("\n🎯 Final Formatted MikroTik Configuration:");
            console.log("─".repeat(40));
            console.log(result);
            console.log("─".repeat(40));

            expect(result).toContain("/ip address");
            expect(result).toContain("/system identity");
            expect(result).not.toContain("/ip route"); // Should be removed
            expect(result).toContain(
                "add address=192.168.1.1/24 interface=ether1",
            );
            expect(result).toContain("add address=10.0.0.1/8 interface=ether2");
            expect(result).toContain("set name=TestRouter");

            // Should not have empty lines
            expect(result.split("\n").some((line) => line.trim() === "")).toBe(
                false,
            );
        });

        it("should handle complex RouterConfig with comments", () => {
            const config: RouterConfig = {
                "": ["# Router configuration", "# Generated automatically"],
                "/ip address": [
                    "# LAN interface",
                    "add address=192.168.1.1/24 interface=ether1",
                    "# WAN interface",
                    "add address=10.0.0.1/8 interface=ether2",
                ],
                "/system identity": ["set name=ProductionRouter"],
            };

            const result = SConfigGenerator(config);

            expect(result).toContain("# Router configuration");
            expect(result).toContain("# Generated automatically");
            expect(result).toContain("# LAN interface");
            expect(result).toContain("# WAN interface");
            expect(result).toContain(
                "add address=192.168.1.1/24 interface=ether1",
            );
            expect(result).toContain("set name=ProductionRouter");
        });

        it("should return empty string for empty config", () => {
            const config: RouterConfig = {};
            const result = SConfigGenerator(config);
            expect(result).toBe("");
        });

        it("should handle config with only empty arrays", () => {
            const config: RouterConfig = {
                "/ip address": [],
                "/ip route": [],
                "/system identity": [],
            };

            const result = SConfigGenerator(config);
            expect(result).toBe("");
        });

        it("should handle config with empty strings and whitespace", () => {
            const config: RouterConfig = {
                "/ip address": [
                    "",
                    "   ",
                    "add address=192.168.1.1/24 interface=ether1",
                    "\t",
                    "add address=10.0.0.1/8 interface=ether2",
                    "",
                ],
            };

            const result = SConfigGenerator(config);

            expect(result).toContain(
                "add address=192.168.1.1/24 interface=ether1",
            );
            expect(result).toContain("add address=10.0.0.1/8 interface=ether2");

            // Should not contain empty lines
            const lines = result.split("\n");
            expect(lines.every((line) => line.trim().length > 0)).toBe(true);
        });
    });

    describe("CommandShortner", () => {
        it("should not modify comments (lines starting with #)", () => {
            const config: RouterConfig = {
                "": [
                    "# This is a comment",
                    "# Another comment with many words that exceeds three parts but should not be modified",
                ],
                "/ip address": [
                    "# Comment in section",
                    "add address=192.168.1.1/24 interface=ether1",
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Comments should remain unchanged",
                { config: "RouterConfig with comments" },
                () => CommandShortner(config),
            );

            expect(result[""][0]).toBe("# This is a comment");
            expect(result[""][1]).toBe(
                "# Another comment with many words that exceeds three parts but should not be modified",
            );
            expect(result["/ip address"][0]).toBe("# Comment in section");
        });

        it("should not modify short commands (4 or fewer parts)", () => {
            const config: RouterConfig = {
                "/system identity": ["set name=Router"],
                "/ip address": [
                    "print",
                    "add address=192.168.1.1/24 interface=ether1",
                    "remove 0",
                ],
            };

            const result = CommandShortner(config);

            expect(result["/system identity"][0]).toBe("set name=Router");
            expect(result["/ip address"][0]).toBe("print");
            expect(result["/ip address"][1]).toBe(
                "add address=192.168.1.1/24 interface=ether1",
            );
            expect(result["/ip address"][2]).toBe("remove 0");
        });

        it("should break long commands into multiple lines with continuation characters", () => {
            const config: RouterConfig = {
                "/ip firewall filter": [
                    "add action=accept chain=input connection-state=established,related protocol=tcp dst-port=80,443",
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Long command should be broken into multiple lines",
                { config: "Long firewall rule command" },
                () => CommandShortner(config),
            );

            const command = result["/ip firewall filter"][0];
            const lines = command.split("\n");

            expect(lines.length).toBeGreaterThan(1);
            expect(lines[0]).toContain(" \\");
            expect(lines[1]).toMatch(/^ {4}/); // Should have indentation
            expect(command).toContain("add action=accept chain=input");
            expect(command).toContain(
                "connection-state=established,related protocol=tcp dst-port=80,443",
            );
        });

        it("should break commands containing quotes when they have more than 4 parts", () => {
            const config: RouterConfig = {
                "/system script": [
                    'add name=test source="put \\"hello world\\"" policy=read,write,test comment="test script"',
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Should break long commands with quotes properly",
                { config: "Command with quoted parameters" },
                () => CommandShortner(config),
            );

            const command = result["/system script"][0];
            const lines = command.split("\n");

            // Should be broken because it has 5 parts (more than 4)
            expect(lines.length).toBeGreaterThan(1);
            expect(command).toContain(" \\");
            expect(lines[1]).toMatch(/^ {4}/); // Should have indentation

            // Should preserve quoted content properly
            expect(command).toContain('source="put \\"hello world\\""');
            expect(command).toContain('comment="test script"');
        });

        it("should break commands containing single quotes when they have more than 4 parts", () => {
            const config: RouterConfig = {
                "/system script": [
                    "add name=test source='put hello' policy=read,write,test comment='test script with single quotes'",
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Should break long commands with single quotes properly",
                { config: "Command with single quoted parameters" },
                () => CommandShortner(config),
            );

            const command = result["/system script"][0];
            const lines = command.split("\n");

            // Should be broken because it has 5 parts (more than 4)
            expect(lines.length).toBeGreaterThan(1);
            expect(command).toContain(" \\");
            expect(lines[1]).toMatch(/^ {4}/); // Should have indentation

            // Should preserve single quoted content properly
            expect(command).toContain("source='put hello'");
            expect(command).toContain(
                "comment='test script with single quotes'",
            );
        });

        it("should handle very long commands with proper line breaking", () => {
            const config: RouterConfig = {
                "/ip firewall nat": [
                    'add action=masquerade chain=srcnat out-interface=WAN src-address=192.168.1.0/24 dst-address=!192.168.1.0/24 protocol=tcp comment="NAT rule for LAN"',
                ],
            };

            const result = CommandShortner(config);
            const command = result["/ip firewall nat"][0];
            const lines = command.split("\n");

            expect(lines.length).toBeGreaterThan(2); // Should be broken into multiple lines

            // Check that each line (except the last) ends with backslash
            for (let i = 0; i < lines.length - 1; i++) {
                expect(lines[i]).toMatch(/ \\$/);
            }

            // Check that continuation lines are indented
            for (let i = 1; i < lines.length; i++) {
                expect(lines[i]).toMatch(/^ {4}/);
            }

            // Check that the command content is preserved
            const rejoined = lines
                .join(" ")
                .replace(/ \\/g, "")
                .replace(/\n\s+/g, " ");
            expect(rejoined).toContain("action=masquerade");
            expect(rejoined).toContain("chain=srcnat");
            expect(rejoined).toContain("out-interface=WAN");
        });

        it("should handle multiple long commands in same section", () => {
            const config: RouterConfig = {
                "/ip firewall filter": [
                    "add action=accept chain=input connection-state=established,related protocol=tcp dst-port=80,443",
                    'add action=drop chain=input src-address-list=blacklist log=yes log-prefix="Blocked IP"',
                    "print", // Short command should remain unchanged
                ],
            };

            const result = CommandShortner(config);
            const commands = result["/ip firewall filter"];

            // First command should be broken
            expect(commands[0]).toContain("\n");
            expect(commands[0]).toContain(" \\");

            // Second command should be broken
            expect(commands[1]).toContain("\n");
            expect(commands[1]).toContain(" \\");

            // Third command should remain unchanged
            expect(commands[2]).toBe("print");
            expect(commands[2]).not.toContain("\n");
        });

        it("should handle empty config", () => {
            const config: RouterConfig = {};
            const result = CommandShortner(config);
            expect(result).toEqual({});
        });

        it("should handle config with empty sections", () => {
            const config: RouterConfig = {
                "/ip address": [],
                "/system identity": ["set name=Router"],
            };

            const result = CommandShortner(config);
            expect(result["/ip address"]).toEqual([]);
            expect(result["/system identity"]).toEqual(["set name=Router"]);
        });

        it("should follow 4+3+3 pattern for line breaking", () => {
            const config: RouterConfig = {
                "/ip firewall filter": [
                    'add action=accept chain=input connection-state=established,related protocol=tcp dst-port=80,443 src-address=192.168.1.0/24 comment="test rule"',
                ],
            };

            const result = CommandShortner(config);
            const command = result["/ip firewall filter"][0];
            const lines = command.split("\n");

            // Should have multiple lines
            expect(lines.length).toBeGreaterThan(2);

            // First line should have 4 elements + backslash
            expect(lines[0]).toBe(
                "add action=accept chain=input connection-state=established,related \\",
            );

            // Second line should have 3 elements + backslash (indented)
            expect(lines[1]).toBe(
                "    protocol=tcp dst-port=80,443 src-address=192.168.1.0/24 \\",
            );

            // Third line should have remaining elements (indented)
            expect(lines[2]).toBe('    comment="test rule"');

            // Verify continuation lines are properly indented
            for (let i = 1; i < lines.length; i++) {
                expect(lines[i]).toMatch(/^ {4}/);
            }
        });

        it("should preserve command structure after line breaking", () => {
            const config: RouterConfig = {
                "/interface bridge": [
                    "add name=bridge1 protocol-mode=rstp priority=0x8000 admin-mac=auto auto-mac=yes ageing-time=5m max-message-age=20s",
                ],
            };

            const result = CommandShortner(config);
            const command = result["/interface bridge"][0];
            const lines = command.split("\n");

            // Should be broken into multiple lines
            expect(lines.length).toBeGreaterThan(1);

            // Reconstruct the original command by removing backslashes and extra whitespace
            const reconstructed = lines
                .map((line) => line.replace(/ \\$/, "").trim())
                .join(" ");

            expect(reconstructed).toBe(
                "add name=bridge1 protocol-mode=rstp priority=0x8000 admin-mac=auto auto-mac=yes ageing-time=5m max-message-age=20s",
            );
        });

        it("should handle commands with exactly 5 parts (should be broken)", () => {
            const config: RouterConfig = {
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.1 distance=1",
                ],
            };

            const result = CommandShortner(config);
            const command = result["/ip route"][0];

            // Should be broken because it has 5 parts (more than 4)
            expect(command).toContain("\n");
            expect(command).toContain(" \\");

            // First line should have 4 parts, second line should have 1 part
            const lines = command.split("\n");
            expect(lines[0]).toBe(
                "add dst-address=0.0.0.0/0 gateway=192.168.1.1 \\",
            );
            expect(lines[1]).toBe("    distance=1");
        });

        it("should intelligently parse quoted strings as single tokens", () => {
            const config: RouterConfig = {
                "/interface list member": [
                    'add interface="wireguard-server" list="LAN" comment="VPN interface"',
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Should handle quoted strings intelligently",
                { config: "Command with quoted parameters" },
                () => CommandShortner(config),
            );

            const command = result["/interface list member"][0];

            // This command has 4 quoted parts, so it should remain as single line
            expect(command).not.toContain("\n");
            expect(command).toBe(
                'add interface="wireguard-server" list="LAN" comment="VPN interface"',
            );
        });

        it("should break commands with simple quoted strings when they exceed 4 parts", () => {
            const config: RouterConfig = {
                "/ip firewall address-list": [
                    'add address="192.168.1.0/24" list="LAN-Nets" comment="Main LAN" disabled=no timeout=1d',
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Should break long commands with simple quoted strings",
                { config: "Long command with simple quotes" },
                () => CommandShortner(config),
            );

            const command = result["/ip firewall address-list"][0];
            const lines = command.split("\n");

            // Should be broken because it has 6 parts (more than 4)
            expect(lines.length).toBeGreaterThan(1);
            expect(command).toContain(" \\");
            expect(lines[1]).toMatch(/^ {4}/); // Should have indentation

            // First line should have 4 parts
            expect(lines[0]).toBe(
                'add address="192.168.1.0/24" list="LAN-Nets" comment="Main LAN" \\',
            );
            expect(lines[1]).toBe("    disabled=no timeout=1d");
        });

        it("should break commands with complex quoted content while preserving quotes", () => {
            const config: RouterConfig = {
                "/system script": [
                    'add name=test source="put \\"hello world\\"" policy=read,write,test comment="script with complex quotes"',
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Should break commands with complex quoted content while preserving quotes",
                { config: "Command with complex quoted strings" },
                () => CommandShortner(config),
            );

            const command = result["/system script"][0];
            const lines = command.split("\n");

            // Should be broken because it has 5 parts (more than 4)
            expect(lines.length).toBeGreaterThan(1);
            expect(command).toContain(" \\");
            expect(lines[1]).toMatch(/^ {4}/); // Should have indentation

            // Should preserve complex quoted content properly
            expect(command).toContain('source="put \\"hello world\\""');
            expect(command).toContain('comment="script with complex quotes"');
        });

        it("should handle mixed quoted and unquoted parameters", () => {
            const config: RouterConfig = {
                "/ppp secret": [
                    'add name="user with spaces" password=secret123 profile="default-profile" service=any disabled=no comment="Test user"',
                ],
            };

            const result = testWithOutput(
                "CommandShortner",
                "Should handle mixed quoted and unquoted parameters",
                { config: "Command with mixed parameter types" },
                () => CommandShortner(config),
            );

            const command = result["/ppp secret"][0];
            const lines = command.split("\n");

            // Should be broken because it has 7 parts (more than 4)
            expect(lines.length).toBeGreaterThan(1);
            expect(command).toContain(" \\");

            // Verify the quoted strings with spaces are preserved
            expect(command).toContain('name="user with spaces"');
            expect(command).toContain('profile="default-profile"');
            expect(command).toContain('comment="Test user"');
        });

        it("should integrate well with SConfigGenerator", () => {
            const config: RouterConfig = {
                "": ["# Router Configuration"],
                "/ip firewall filter": [
                    "add action=accept chain=input connection-state=established,related protocol=tcp dst-port=80,443",
                    "add action=drop chain=input",
                ],
                "/system identity": ["set name=TestRouter"],
            };

            const shortened = CommandShortner(config);
            const formatted = SConfigGenerator(shortened);

            console.log("\n" + "=".repeat(80));
            console.log(
                `🧪 Testing: CommandShortner + SConfigGenerator Integration`,
            );
            console.log(`📝 Test Case: Complete workflow with line breaking`);
            console.log("\n🎯 Final Formatted Configuration with Line Breaks:");
            console.log("─".repeat(40));
            console.log(formatted);
            console.log("─".repeat(40));

            expect(formatted).toContain("# Router Configuration");
            expect(formatted).toContain("/ip firewall filter");
            expect(formatted).toContain("\\"); // Should contain continuation characters
            expect(formatted).toContain("    "); // Should contain indentation
            expect(formatted).toContain("set name=TestRouter");
        });
    });

    describe("Integration tests", () => {
        it("should work end-to-end: merge configs and generate output", () => {
            const networkConfig: RouterConfig = {
                "/ip address": [
                    "add address=192.168.1.1/24 interface=ether1",
                    "add address=10.0.0.1/8 interface=ether2",
                ],
            };

            const systemConfig: RouterConfig = {
                "/system identity": ["set name=IntegratedRouter"],
                "/system clock": ["set time-zone-name=UTC"],
            };

            const routingConfig: RouterConfig = {
                "/ip route": [
                    "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
                    "add dst-address=10.0.0.0/8 gateway=10.0.0.254",
                ],
            };

            const merged = mergeRouterConfigs(
                networkConfig,
                systemConfig,
                routingConfig,
            );
            const output = SConfigGenerator(merged);

            expect(output).toContain("/ip address");
            expect(output).toContain("/system identity");
            expect(output).toContain("/system clock");
            expect(output).toContain("/ip route");

            expect(output).toContain("192.168.1.1/24");
            expect(output).toContain("set name=IntegratedRouter");
            expect(output).toContain("time-zone-name=UTC");
            expect(output).toContain("dst-address=0.0.0.0/0");

            // Should be properly formatted without empty lines
            const lines = output.split("\n");
            expect(lines.every((line) => line.trim().length > 0)).toBe(true);
        });

        it("should handle complex real-world scenario", () => {
            const interfaceConfig: RouterConfig = {
                "": ["# Network Interface Configuration"],
                "/interface ethernet": [
                    "set [ find default-name=ether1 ] name=LAN",
                    "set [ find default-name=ether2 ] name=WAN",
                ],
                "/ip address": [
                    "add address=192.168.88.1/24 interface=LAN",
                    "add address=dhcp-client interface=WAN",
                ],
            };

            const firewallConfig: RouterConfig = {
                "": ["# Firewall Configuration"],
                "/ip firewall filter": [
                    "add action=accept chain=input connection-state=established,related",
                    "add action=drop chain=input",
                    "add action=accept chain=forward connection-state=established,related",
                    "add action=drop chain=forward",
                ],
            };

            const merged = mergeRouterConfigs(interfaceConfig, firewallConfig);
            const output = SConfigGenerator(merged);

            expect(output).toContain("# Network Interface Configuration");
            expect(output).toContain("# Firewall Configuration");
            expect(output).toContain("/interface ethernet");
            expect(output).toContain("/ip address");
            expect(output).toContain("/ip firewall filter");
            expect(output).toContain("name=LAN");
            expect(output).toContain("address=192.168.88.1/24");
            expect(output).toContain("action=accept");
        });
    });
});
