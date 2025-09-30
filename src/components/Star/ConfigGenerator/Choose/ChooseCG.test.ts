import { describe, it, expect } from "vitest";
import { BaseConfig, ChooseCG } from "./ChooseCG";
import type { RouterConfig } from "../ConfigGenerator";
import { SConfigGenerator } from "../utils/ConfigGeneratorUtil";

// Helper function to display test results with formatted output (following project memory pattern)
const testWithOutput = (
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    testFn: () => RouterConfig,
) => {
    console.log("\n" + "=".repeat(80));
    console.log(`🧪 Testing: ${functionName}`);
    console.log(`📝 Test Case: ${testCase}`);
    console.log(`⚙️ Function: ${functionName}`);
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

    // Check that all expected sections exist
    expectedSections.forEach((section) => {
        expect(config).toHaveProperty(section);
        expect(Array.isArray(config[section])).toBe(true);
    });
};

describe("ChooseCG Module", () => {
    describe("BaseConfig", () => {
        it("should return basic RouterConfig with essential sections", () => {
            const result = testWithOutput(
                "BaseConfig",
                "Generate base configuration with interface lists, address-lists, mangle, and NAT rules",
                {},
                () => BaseConfig(),
            );

            validateRouterConfig(result, [
                "/interface list",
                "/ip firewall address-list",
                "/ip firewall mangle",
                "/ip firewall nat",
            ]);

            // Check interface list configuration
            expect(result["/interface list"]).toContain("add name=WAN");
            expect(result["/interface list"]).toContain("add name=LAN");
            expect(result["/interface list"]).toHaveLength(2);
        });

        it("should include correct LOCAL-IP address-list entries", () => {
            const result = BaseConfig();

            const addressListCommands = result["/ip firewall address-list"];

            expect(addressListCommands).toContain(
                "add address=192.168.0.0/16 list=LOCAL-IP",
            );
            expect(addressListCommands).toContain(
                "add address=172.16.0.0/12 list=LOCAL-IP",
            );
            expect(addressListCommands).toContain(
                "add address=10.0.0.0/8 list=LOCAL-IP",
            );
            expect(addressListCommands).toHaveLength(3);
        });

        it("should include correct firewall mangle rules for local traffic", () => {
            const result = BaseConfig();

            const mangleRules = result["/ip firewall mangle"];

            expect(mangleRules).toHaveLength(5);

            // Check that all mangle rules are for accepting local traffic
            mangleRules.forEach((rule) => {
                expect(rule).toContain("action=accept");
                expect(rule).toContain(
                    "dst-address-list=LOCAL-IP src-address-list=LOCAL-IP",
                );
            });

            // Check specific chain rules
            expect(
                mangleRules.some((rule) => rule.includes("chain=prerouting")),
            ).toBe(true);
            expect(
                mangleRules.some((rule) => rule.includes("chain=postrouting")),
            ).toBe(true);
            expect(
                mangleRules.some((rule) => rule.includes("chain=output")),
            ).toBe(true);
            expect(
                mangleRules.some((rule) => rule.includes("chain=input")),
            ).toBe(true);
            expect(
                mangleRules.some((rule) => rule.includes("chain=forward")),
            ).toBe(true);
        });

        it("should include masquerade NAT rule for WAN traffic", () => {
            const result = BaseConfig();

            const natRules = result["/ip firewall nat"];

            expect(natRules).toHaveLength(1);
            expect(natRules[0]).toContain("action=masquerade");
            expect(natRules[0]).toContain("chain=srcnat");
            expect(natRules[0]).toContain("out-interface-list=WAN");
            expect(natRules[0]).toContain(
                'comment="MASQUERADE the traffic go to WAN Interfaces"',
            );
        });

        it("should return consistent configuration on multiple calls", () => {
            const result1 = BaseConfig();
            const result2 = BaseConfig();

            expect(result1).toEqual(result2);
        });
    });

    describe("ChooseCG", () => {
        it("should merge BaseConfig with additional empty sections", () => {
            const result = testWithOutput(
                "ChooseCG",
                "Merge BaseConfig with additional empty mangle and route sections",
                {},
                () => ChooseCG(),
            );

            validateRouterConfig(result, [
                "/interface list",
                "/ip firewall address-list",
                "/ip firewall mangle",
                "/ip firewall nat",
                "/ip route",
            ]);

            // Verify that BaseConfig sections are preserved
            expect(result["/interface list"]).toContain("add name=WAN");
            expect(result["/interface list"]).toContain("add name=LAN");

            // Verify LOCAL-IP address-list is preserved
            expect(result["/ip firewall address-list"]).toContain(
                "add address=192.168.0.0/16 list=LOCAL-IP",
            );
            expect(result["/ip firewall address-list"]).toContain(
                "add address=172.16.0.0/12 list=LOCAL-IP",
            );
            expect(result["/ip firewall address-list"]).toContain(
                "add address=10.0.0.0/8 list=LOCAL-IP",
            );

            // Verify mangle rules from BaseConfig are preserved (should be 5 rules from BaseConfig)
            expect(result["/ip firewall mangle"]).toHaveLength(5);

            // Verify NAT rule from BaseConfig is preserved
            expect(result["/ip firewall nat"]).toHaveLength(1);
            expect(result["/ip firewall nat"][0]).toContain(
                "action=masquerade",
            );

            // Verify additional empty sections exist
            expect(result["/ip route"]).toEqual([]);
        });

        it("should maintain BaseConfig structure when merged", () => {
            const baseResult = BaseConfig();
            const chooseResult = ChooseCG();

            // All BaseConfig sections should exist in ChooseCG result
            Object.keys(baseResult).forEach((section) => {
                expect(chooseResult).toHaveProperty(section);

                // For sections that only exist in BaseConfig, they should be identical
                if (section !== "/ip firewall mangle") {
                    // mangle might be merged with empty array
                    expect(chooseResult[section]).toEqual(baseResult[section]);
                }
            });

            // BaseConfig mangle rules should be preserved in ChooseCG
            baseResult["/ip firewall mangle"].forEach((rule) => {
                expect(chooseResult["/ip firewall mangle"]).toContain(rule);
            });
        });

        it("should include empty route section for future expansion", () => {
            const result = ChooseCG();

            expect(result).toHaveProperty("/ip route");
            expect(result["/ip route"]).toEqual([]);
            expect(Array.isArray(result["/ip route"])).toBe(true);
        });

        it("should generate valid MikroTik configuration output", () => {
            const result = ChooseCG();
            const formattedOutput = SConfigGenerator(result);

            // Check that the output contains expected MikroTik sections
            expect(formattedOutput).toContain("/interface list");
            expect(formattedOutput).toContain("/ip firewall address-list");
            expect(formattedOutput).toContain("/ip firewall mangle");
            expect(formattedOutput).toContain("/ip firewall nat");

            // Check for specific commands
            expect(formattedOutput).toContain("add name=WAN");
            expect(formattedOutput).toContain("add name=LAN");
            expect(formattedOutput).toContain("list=LOCAL-IP");
            expect(formattedOutput).toContain("action=masquerade");
        });

        it("should be ready for extension with additional configuration", () => {
            const result = ChooseCG();

            // Verify the structure allows for easy extension
            expect(Object.keys(result)).toContain("/ip firewall mangle");
            expect(Object.keys(result)).toContain("/ip route");

            // Both sections should be arrays that can be extended
            expect(Array.isArray(result["/ip firewall mangle"])).toBe(true);
            expect(Array.isArray(result["/ip route"])).toBe(true);
        });
    });
});
