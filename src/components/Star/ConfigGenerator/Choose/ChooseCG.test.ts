import { describe, expect, it } from "vitest";
import { BaseConfig, ChooseCG } from "./ChooseCG";
import { SConfigGenerator } from "../utils/ConfigGeneratorUtil";

describe("ChooseCG module", () => {
    // Verifies the base config emits the current quoted interface-list, address-list, mangle, and NAT rules.
    it("builds the base config sections", () => {
        const result = BaseConfig();

        expect(result["/interface list"]).toEqual([
            'add name="WAN"',
            'add name="LAN"',
        ]);
        expect(result["/ip firewall address-list"]).toEqual([
            'add comment="LOCAL-IP" address="192.168.0.0/16" list="LOCAL-IP"',
            'add comment="LOCAL-IP" address="172.16.0.0/12" list="LOCAL-IP"',
            'add comment="LOCAL-IP" address="10.0.0.0/8" list="LOCAL-IP"',
        ]);
        expect(result["/ip firewall mangle"]).toHaveLength(5);
        expect(result["/ip firewall nat"]).toEqual([
            'add action=masquerade chain=srcnat out-interface-list="WAN" comment="MASQUERADE the traffic go to WAN Interfaces"',
        ]);
    });

    // Verifies every base mangle rule accepts local-to-local traffic for the expected RouterOS chains.
    it("builds local traffic accept rules across all firewall chains", () => {
        const rules = BaseConfig()["/ip firewall mangle"];

        expect(rules.every((rule) => rule.includes("action=accept"))).toBe(true);
        expect(
            rules.every(
                (rule) =>
                    rule.includes('dst-address-list="LOCAL-IP"') &&
                    rule.includes('src-address-list="LOCAL-IP"'),
            ),
        ).toBe(true);
        expect(rules.some((rule) => rule.includes("chain=prerouting"))).toBe(true);
        expect(rules.some((rule) => rule.includes("chain=postrouting"))).toBe(true);
        expect(rules.some((rule) => rule.includes("chain=output"))).toBe(true);
        expect(rules.some((rule) => rule.includes("chain=input"))).toBe(true);
        expect(rules.some((rule) => rule.includes("chain=forward"))).toBe(true);
    });

    // Verifies ChooseCG preserves the base config and adds the currently empty route section for later extension.
    it("merges the base config with an empty route section", () => {
        const baseResult = BaseConfig();
        const result = ChooseCG();

        expect(result["/interface list"]).toEqual(baseResult["/interface list"]);
        expect(result["/ip firewall address-list"]).toEqual(
            baseResult["/ip firewall address-list"],
        );
        expect(result["/ip firewall mangle"]).toEqual(baseResult["/ip firewall mangle"]);
        expect(result["/ip firewall nat"]).toEqual(baseResult["/ip firewall nat"]);
        expect(result["/ip route"]).toEqual([]);
    });

    // Verifies the formatted MikroTik output reflects the current quoted command style.
    it("formats the merged config into MikroTik command text", () => {
        const formattedOutput = SConfigGenerator(ChooseCG());

        expect(formattedOutput).toContain("/interface list");
        expect(formattedOutput).toContain('add name="WAN"');
        expect(formattedOutput).toContain('add name="LAN"');
        expect(formattedOutput).toContain('list="LOCAL-IP"');
        expect(formattedOutput).toContain('out-interface-list="WAN"');
    });
});
