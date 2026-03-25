import { describe, expect, it } from "vitest";

import {
    addTrunkInterfaceToBridge,
    commentTrunkInterface,
    createVLAN,
    generateBaseNetworkVLANs,
    generateVPNClientNetworkVLANs,
    generateWirelessTrunkInterface,
} from "./MasterUtil";

describe("MasterUtil", () => {
    // Verifies VLAN helpers generate the current quoted interface name and comment format used by RouterOS config output.
    it("creates a VLAN command for the requested trunk interface and network name", () => {
        const result = createVLAN(10, "ether1", "Split", "Split Network VLAN");

        expect(result["/interface vlan"]).toEqual([
            'add name="VLAN10-ether1-Split" comment="Split Network VLAN" interface="ether1" vlan-id=10',
        ]);
    });

    // Verifies base subnets are translated into VLAN interfaces and bridge-port attachments for each active base network.
    it("generates VLAN and bridge-port config for active base networks", () => {
        const result = generateBaseNetworkVLANs(
            {
                BaseSubnets: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
            } as any,
            "ether1",
        );

        const vlanCommands = result["/interface vlan"].join("\n");
        const bridgeCommands = result["/interface bridge port"].join("\n");

        expect(vlanCommands).toContain("VLAN10-ether1-Split");
        expect(vlanCommands).toContain("VLAN40-ether1-VPN");
        expect(bridgeCommands).toContain('bridge="LANBridgeSplit"');
        expect(bridgeCommands).toContain('bridge="LANBridgeVPN"');
    });

    // Verifies VPN client subnet definitions are promoted into per-client VLANs using the current protocol-specific naming convention.
    it("generates VLANs for VPN client networks using protocol-prefixed names", () => {
        const result = generateVPNClientNetworkVLANs(
            {
                BaseSubnets: {},
                VPNClientSubnets: {
                    Wireguard: [{ name: "Branch", subnet: "192.168.50.0/24" }],
                    IKev2: [{ name: "Users", subnet: "192.168.77.0/24" }],
                },
            } as any,
            "ether5",
        );

        const vlanCommands = result["/interface vlan"].join("\n");
        expect(vlanCommands).toContain("VLAN50-ether5-WG-Client-Branch");
        expect(vlanCommands).toContain("VLAN77-ether5-IKEv2-Client-Users");
    });

    // Verifies wired trunk ports are attached to the Split bridge when Split is available, which currently has priority over VPN.
    it("attaches a wired trunk interface to the highest-priority bridge", () => {
        const result = addTrunkInterfaceToBridge(
            {
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        VPN: true,
                    },
                },
            } as any,
            "ether8",
        );

        expect(result["/interface bridge port"]).toEqual([
            'add bridge="LANBridgeSplit" interface="ether8" comment="Trunk Interface"',
        ]);
    });

    // Verifies wireless trunk mode adds both generated trunk radios to the selected bridge instead of using the master interface name directly.
    it("attaches both wireless trunk radios when the trunk uplink is wireless", () => {
        const result = addTrunkInterfaceToBridge(
            {
                Networks: {
                    BaseNetworks: {
                        VPN: true,
                    },
                },
            } as any,
            "wifi5",
        );

        expect(result["/interface bridge port"]).toEqual([
            'add bridge="LANBridgeVPN" interface=wifi2.4-Trunk comment="Trunk 2.4"',
            'add bridge="LANBridgeVPN" interface=wifi5-Trunk comment="Trunk 5"',
        ]);
    });

    // Verifies trunk comments are applied only to ethernet-family ports because wireless trunk comments are handled by the generated wifi interfaces.
    it("adds trunk comments to wired ports and skips wireless master interfaces", () => {
        expect(commentTrunkInterface("sfp-sfpplus1")).toEqual({
            "/interface ethernet": [
                'set [ find default-name="sfp-sfpplus1" ] comment="Trunk Interface"',
            ],
        });
        expect(commentTrunkInterface("wifi2.4")).toEqual({});
    });

    // Verifies wireless trunk generation creates hidden 2.4 GHz and 5 GHz backhaul interfaces plus steering commands from the first wireless config.
    it("creates both wireless trunk radios and their steering assignments", () => {
        const result = generateWirelessTrunkInterface([
            {
                SSID: "Backhaul",
                Password: "SecretPass",
            },
        ] as any);

        const wifiCommands = result["/interface wifi"].join("\n");

        expect(wifiCommands).toContain('name="wifi2.4-Trunk"');
        expect(wifiCommands).toContain('name="wifi5-Trunk"');
        expect(wifiCommands).toContain("configuration.hide-ssid=yes");
        expect(wifiCommands).toContain('steering add comment="Trunk"');
        expect(wifiCommands).toContain('steering="Trunk"');
    });
});
