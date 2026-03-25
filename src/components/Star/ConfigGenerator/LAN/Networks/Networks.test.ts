import { describe, expect, it } from "vitest";

import {
    DomesticBase,
    NetworkBaseGenerator,
    Networks,
    SplitBase,
    addNetworks,
} from "./Networks";

describe("Networks", () => {
    // Verifies the base network generator emits the core bridge, DHCP, routing, and mangle sections for an active routed network.
    it("builds a complete routed network config when mangle generation is enabled", () => {
        const result = NetworkBaseGenerator(
            "Foreign",
            "192.168.30.0/24",
            undefined,
            true,
        );

        expect(result["/interface bridge"][0]).toContain(
            'name="LANBridgeForeign"',
        );
        expect(result["/ip dhcp-server"][0]).toContain('name="DHCP-Foreign"');
        expect(result["/routing table"][0]).toContain('name="to-Foreign"');
        expect(result["/ip firewall mangle"][0]).toContain(
            'new-routing-mark="to-Foreign"',
        );
    });

    // Verifies the domestic base helper can intentionally omit mangle rules when higher-level routing logic has decided they should be skipped.
    it("omits domestic mangle rules when skipMangle is requested", () => {
        const result = DomesticBase("Domestic", "192.168.20.0/24", true);

        expect(result["/interface bridge"][0]).toContain(
            'name="LANBridgeDomestic"',
        );
        expect(result["/ip firewall mangle"]).toBeUndefined();
    });

    // Verifies the Split network helper generates the special Split routing marks used to divide traffic across domestic, VPN, and non-domestic destinations.
    it("creates the Split-specific mangle rules that drive split routing", () => {
        const result = SplitBase("Split", "192.168.10.0/24");
        const mangleCommands = result["/ip firewall mangle"].join("\n");

        expect(mangleCommands).toContain('comment="Split-DOM"');
        expect(mangleCommands).toContain('comment="Split-VPN"');
        expect(mangleCommands).toContain('comment="Split-!DOM"');
        expect(mangleCommands).toContain('src-address-list="Split-LAN"');
    });

    // Verifies additional named networks are promoted into full VLAN-style bridge configs with mangle rules enabled by default.
    it("generates additional named networks with prefixed bridge names and routing marks", () => {
        const result = addNetworks(
            [{ name: "Guest", subnet: "192.168.31.0/24" }],
            "Foreign",
            "Foreign",
        );

        expect(result["/interface bridge"][0]).toContain(
            'name="LANBridgeForeign-Guest"',
        );
        expect(result["/ip firewall mangle"][0]).toContain(
            'new-routing-mark="to-Foreign-Guest"',
        );
    });

    // Verifies the top-level Networks combiner merges base, additional, and VPN-client subnets into one RouterConfig tree.
    it("merges base networks, additional networks, and VPN client subnets into one config", () => {
        const result = Networks({
            BaseSubnets: {
                Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
            },
            ForeignSubnets: [{ name: "Guest", subnet: "192.168.31.0/24" }],
            VPNClientSubnets: {
                Wireguard: [{ name: "Branch", subnet: "192.168.50.0/24" }],
            },
        } as any);

        const bridgeCommands = result["/interface bridge"].join("\n");

        expect(bridgeCommands).toContain('name="LANBridgeDomestic"');
        expect(bridgeCommands).toContain('name="LANBridgeForeign"');
        expect(bridgeCommands).toContain('name="LANBridgeForeign-Guest"');
        expect(bridgeCommands).toContain('name="LANBridgeVPN-Branch"');
    });
});
