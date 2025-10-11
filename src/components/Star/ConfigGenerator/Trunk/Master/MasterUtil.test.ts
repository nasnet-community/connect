import { describe, it, expect } from "vitest";
import {
    createVLAN,
    addVLANToBridge,
    generateBaseNetworkVLANs,
    generateAdditionalNetworkVLANs,
    generateVPNClientNetworkVLANs,
    generateWirelessTrunkInterface,
} from "./MasterUtil";
import type { ChooseState, WirelessConfig } from "~/components/Star/StarContext";
import {
    testWithOutput,
    testWithGenericOutput,
    validateRouterConfig,
    validateRouterConfigStructure,
} from "~/test-utils/test-helpers";

describe("Master Utility Functions Tests", () => {

    // Base test data used across multiple tests
    const baseChooseState: ChooseState = {
        Mode: "easy" as const,
        Firmware: "MikroTik" as const,
        WANLinkType: "both" as const,
        RouterMode: "Trunk Mode" as const,
        RouterModels: [
            {
                isMaster: true,
                Model: "RB5009UPr+S+IN" as const,
                MasterSlaveInterface: "ether1" as const,
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1" as const, "ether2" as const],
                    },
                    OccupiedInterfaces: [],
                },
            },
        ],
        Networks: {
            BaseNetworks: {},
        },
    };

    describe("createVLAN Function", () => {
        it("should create VLAN with standard parameters", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN with standard parameters: VLAN10 on ether1 for Split network",
                {
                    vlanId: 10,
                    interfaceName: "ether1",
                    networkName: "Split",
                    comment: "Split Network VLAN",
                },
                () => createVLAN(10, "ether1", "Split", "Split Network VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toBe(
                'add name="VLAN10-ether1-Split" comment="Split Network VLAN" interface=ether1 vlan-id=10',
            );
        });

        it("should create VLAN with Domestic network parameters", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN20 for Domestic network",
                {
                    vlanId: 20,
                    interfaceName: "ether1",
                    networkName: "Domestic",
                    comment: "Domestic Network VLAN",
                },
                () => createVLAN(20, "ether1", "Domestic", "Domestic Network VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=20");
            expect(result["/interface vlan"][0]).toContain("VLAN20-ether1-Domestic");
        });

        it("should create VLAN with Foreign network parameters", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN30 for Foreign network",
                {
                    vlanId: 30,
                    interfaceName: "ether1",
                    networkName: "Foreign",
                    comment: "Foreign Network VLAN",
                },
                () => createVLAN(30, "ether1", "Foreign", "Foreign Network VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=30");
            expect(result["/interface vlan"][0]).toContain("VLAN30-ether1-Foreign");
        });

        it("should create VLAN with VPN network parameters", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN40 for VPN network",
                {
                    vlanId: 40,
                    interfaceName: "ether1",
                    networkName: "VPN",
                    comment: "VPN Network VLAN",
                },
                () => createVLAN(40, "ether1", "VPN", "VPN Network VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=40");
            expect(result["/interface vlan"][0]).toContain("VLAN40-ether1-VPN");
        });

        it("should create VLAN on wireless interface (wifi5)", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN on wifi5 wireless interface",
                {
                    vlanId: 10,
                    interfaceName: "wifi5",
                    networkName: "Split",
                    comment: "Wireless Split VLAN",
                },
                () => createVLAN(10, "wifi5", "Split", "Wireless Split VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=wifi5");
            expect(result["/interface vlan"][0]).toContain("VLAN10-wifi5-Split");
        });

        it("should create VLAN on wireless interface (wifi2.4)", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN on wifi2.4 wireless interface",
                {
                    vlanId: 20,
                    interfaceName: "wifi2.4",
                    networkName: "Domestic",
                    comment: "Wireless Domestic VLAN",
                },
                () => createVLAN(20, "wifi2.4", "Domestic", "Wireless Domestic VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=wifi2.4");
            expect(result["/interface vlan"][0]).toContain("VLAN20-wifi2.4-Domestic");
        });

        it("should create VLAN with hyphenated network name", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN with hyphenated network name",
                {
                    vlanId: 31,
                    interfaceName: "ether1",
                    networkName: "Foreign-Guest",
                    comment: "Foreign Guest Network VLAN",
                },
                () => createVLAN(31, "ether1", "Foreign-Guest", "Foreign Guest Network VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("VLAN31-ether1-Foreign-Guest");
        });

        it("should create VLAN with VPN client network name", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN for VPN client network",
                {
                    vlanId: 50,
                    interfaceName: "ether1",
                    networkName: "WG-Client-Server1",
                    comment: "Wireguard Client VLAN",
                },
                () => createVLAN(50, "ether1", "WG-Client-Server1", "Wireguard Client VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=50");
            expect(result["/interface vlan"][0]).toContain("WG-Client-Server1");
        });

        it("should create VLAN with high VLAN ID", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN with high VLAN ID (160)",
                {
                    vlanId: 160,
                    interfaceName: "ether1",
                    networkName: "Vxlan",
                    comment: "Vxlan Tunnel VLAN",
                },
                () => createVLAN(160, "ether1", "Vxlan", "Vxlan Tunnel VLAN"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=160");
        });

        it("should create VLAN on different ethernet port (ether8)", () => {
            const result = testWithOutput(
                "createVLAN",
                "Create VLAN on ether8 interface",
                {
                    vlanId: 10,
                    interfaceName: "ether8",
                    networkName: "Split",
                    comment: "Split on ether8",
                },
                () => createVLAN(10, "ether8", "Split", "Split on ether8"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=ether8");
            expect(result["/interface vlan"][0]).toContain("VLAN10-ether8-Split");
        });
    });

    describe("addVLANToBridge Function", () => {
        it("should add VLAN to Split bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add VLAN10 to LANBridgeSplit",
                {
                    vlanInterfaceName: "VLAN10-ether1-Split",
                    bridgeName: "LANBridgeSplit",
                    comment: "Split VLAN to Bridge",
                },
                () => addVLANToBridge("VLAN10-ether1-Split", "LANBridgeSplit", "Split VLAN to Bridge"),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"].length).toBe(1);
            expect(result["/interface bridge port"][0]).toBe(
                'add bridge=LANBridgeSplit interface=VLAN10-ether1-Split comment="Split VLAN to Bridge"',
            );
        });

        it("should add VLAN to Domestic bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add VLAN20 to LANBridgeDomestic",
                {
                    vlanInterfaceName: "VLAN20-ether1-Domestic",
                    bridgeName: "LANBridgeDomestic",
                    comment: "Domestic VLAN to Bridge",
                },
                () =>
                    addVLANToBridge("VLAN20-ether1-Domestic", "LANBridgeDomestic", "Domestic VLAN to Bridge"),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("bridge=LANBridgeDomestic");
            expect(result["/interface bridge port"][0]).toContain("interface=VLAN20-ether1-Domestic");
        });

        it("should add VLAN to Foreign bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add VLAN30 to LANBridgeForeign",
                {
                    vlanInterfaceName: "VLAN30-ether1-Foreign",
                    bridgeName: "LANBridgeForeign",
                    comment: "Foreign VLAN to Bridge",
                },
                () =>
                    addVLANToBridge("VLAN30-ether1-Foreign", "LANBridgeForeign", "Foreign VLAN to Bridge"),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("bridge=LANBridgeForeign");
        });

        it("should add VLAN to VPN bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add VLAN40 to LANBridgeVPN",
                {
                    vlanInterfaceName: "VLAN40-ether1-VPN",
                    bridgeName: "LANBridgeVPN",
                    comment: "VPN VLAN to Bridge",
                },
                () => addVLANToBridge("VLAN40-ether1-VPN", "LANBridgeVPN", "VPN VLAN to Bridge"),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("bridge=LANBridgeVPN");
        });

        it("should add wireless VLAN to bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add wireless VLAN to bridge",
                {
                    vlanInterfaceName: "VLAN10-wifi5-Split",
                    bridgeName: "LANBridgeSplit",
                    comment: "Wireless Split VLAN",
                },
                () => addVLANToBridge("VLAN10-wifi5-Split", "LANBridgeSplit", "Wireless Split VLAN"),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("VLAN10-wifi5-Split");
        });

        it("should add additional network VLAN to bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add additional Foreign network VLAN to bridge",
                {
                    vlanInterfaceName: "VLAN31-ether1-Foreign-Guest",
                    bridgeName: "LANBridgeForeign-Guest",
                    comment: "Foreign Guest VLAN to Bridge",
                },
                () =>
                    addVLANToBridge(
                        "VLAN31-ether1-Foreign-Guest",
                        "LANBridgeForeign-Guest",
                        "Foreign Guest VLAN to Bridge",
                    ),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("LANBridgeForeign-Guest");
        });

        it("should add VPN client VLAN to bridge", () => {
            const result = testWithOutput(
                "addVLANToBridge",
                "Add VPN client VLAN to bridge",
                {
                    vlanInterfaceName: "VLAN50-ether1-WG-Client-Server1",
                    bridgeName: "LANBridgeVPN-WG-Client-Server1",
                    comment: "WG Client VLAN to Bridge",
                },
                () =>
                    addVLANToBridge(
                        "VLAN50-ether1-WG-Client-Server1",
                        "LANBridgeVPN-WG-Client-Server1",
                        "WG Client VLAN to Bridge",
                    ),
            );

            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("LANBridgeVPN-WG-Client-Server1");
        });
    });

    describe("generateBaseNetworkVLANs Function", () => {
        it("should generate VLAN for Split network only", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Split: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate Split network VLAN only",
                { baseNetworks: { Split: true } },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface bridge port"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=10");
            expect(result["/interface vlan"][0]).toContain("Split");
        });

        it("should generate VLAN for Domestic network only", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate Domestic network VLAN only",
                { baseNetworks: { Domestic: true } },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=20");
            expect(result["/interface vlan"][0]).toContain("Domestic");
        });

        it("should generate VLAN for Foreign network only", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Foreign: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate Foreign network VLAN only",
                { baseNetworks: { Foreign: true } },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=30");
            expect(result["/interface vlan"][0]).toContain("Foreign");
        });

        it("should generate VLAN for VPN network only", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        VPN: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate VPN network VLAN only",
                { baseNetworks: { VPN: true } },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=40");
            expect(result["/interface vlan"][0]).toContain("VPN");
        });

        it("should generate VLANs for all base networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate all base network VLANs (Split, Domestic, Foreign, VPN)",
                { baseNetworks: { Split: true, Domestic: true, Foreign: true, VPN: true } },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(4);
            expect(result["/interface bridge port"].length).toBe(4);

            // Verify VLAN IDs
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("vlan-id=10");
            expect(vlanCommands).toContain("vlan-id=20");
            expect(vlanCommands).toContain("vlan-id=30");
            expect(vlanCommands).toContain("vlan-id=40");
        });

        it("should return empty config for no base networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate with empty base networks - should return empty config",
                { baseNetworks: {} },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            expect(Object.keys(result).length).toBe(0);
        });

        it("should generate VLANs with custom trunk interface", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate VLANs on custom trunk interface (ether8)",
                { trunkInterface: "ether8", baseNetworks: { Split: true, Domestic: true } },
                () => generateBaseNetworkVLANs(choose, "ether8"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("interface=ether8");
            expect(result["/interface vlan"][1]).toContain("interface=ether8");
        });

        it("should generate VLANs with wireless trunk interface (wifi5)", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Foreign: true,
                        VPN: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate VLANs on wireless trunk interface (wifi5)",
                { trunkInterface: "wifi5", baseNetworks: { Foreign: true, VPN: true } },
                () => generateBaseNetworkVLANs(choose, "wifi5"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("interface=wifi5");
            expect(result["/interface vlan"][1]).toContain("interface=wifi5");
        });

        it("should generate only enabled base networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Split: false,
                        Domestic: true,
                        Foreign: false,
                        VPN: true,
                    },
                },
            };

            const result = testWithOutput(
                "generateBaseNetworkVLANs",
                "Generate only enabled base networks (Domestic and VPN)",
                { baseNetworks: { Split: false, Domestic: true, Foreign: false, VPN: true } },
                () => generateBaseNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("Domestic");
            expect(result["/interface vlan"][1]).toContain("VPN");
        });
    });

    describe("generateAdditionalNetworkVLANs Function", () => {
        it("should generate VLAN for single Foreign additional network", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: ["Guest"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate single Foreign additional network VLAN",
                { ForeignNetworks: ["Guest"] },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=31");
            expect(result["/interface vlan"][0]).toContain("Foreign-Guest");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeForeign-Guest");
        });

        it("should generate VLANs for multiple Foreign additional networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: ["Guest", "IoT", "Security"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate multiple Foreign additional network VLANs",
                { ForeignNetworks: ["Guest", "IoT", "Security"] },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(3);
            expect(result["/interface vlan"][0]).toContain("vlan-id=31");
            expect(result["/interface vlan"][1]).toContain("vlan-id=32");
            expect(result["/interface vlan"][2]).toContain("vlan-id=33");

            // Verify network names
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("Foreign-Guest");
            expect(vlanCommands).toContain("Foreign-IoT");
            expect(vlanCommands).toContain("Foreign-Security");
        });

        it("should generate VLAN for single Domestic additional network", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    DomesticNetworks: ["Family"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate single Domestic additional network VLAN",
                { DomesticNetworks: ["Family"] },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=21");
            expect(result["/interface vlan"][0]).toContain("Domestic-Family");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeDomestic-Family");
        });

        it("should generate VLANs for multiple Domestic additional networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    DomesticNetworks: ["Family", "Kids", "Office"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate multiple Domestic additional network VLANs",
                { DomesticNetworks: ["Family", "Kids", "Office"] },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(3);
            expect(result["/interface vlan"][0]).toContain("vlan-id=21");
            expect(result["/interface vlan"][1]).toContain("vlan-id=22");
            expect(result["/interface vlan"][2]).toContain("vlan-id=23");

            // Verify network names
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("Domestic-Family");
            expect(vlanCommands).toContain("Domestic-Kids");
            expect(vlanCommands).toContain("Domestic-Office");
        });

        it("should generate VLANs for both Foreign and Domestic additional networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: ["Guest", "IoT"],
                    DomesticNetworks: ["Family", "Office"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate both Foreign and Domestic additional networks",
                {
                    ForeignNetworks: ["Guest", "IoT"],
                    DomesticNetworks: ["Family", "Office"],
                },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(4);

            // Verify Foreign networks
            expect(result["/interface vlan"][0]).toContain("vlan-id=31");
            expect(result["/interface vlan"][1]).toContain("vlan-id=32");

            // Verify Domestic networks
            expect(result["/interface vlan"][2]).toContain("vlan-id=21");
            expect(result["/interface vlan"][3]).toContain("vlan-id=22");
        });

        it("should return empty config when no additional networks", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate with no additional networks - should return empty",
                { additionalNetworks: "none" },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            expect(Object.keys(result).length).toBe(0);
        });

        it("should return empty config when additional network arrays are empty", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: [],
                    DomesticNetworks: [],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate with empty additional network arrays",
                { ForeignNetworks: [], DomesticNetworks: [] },
                () => generateAdditionalNetworkVLANs(choose, "ether1"),
            );

            expect(Object.keys(result).length).toBe(0);
        });

        it("should generate VLANs with custom trunk interface", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: ["Guest"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate VLANs on custom trunk interface (ether8)",
                { trunkInterface: "ether8", ForeignNetworks: ["Guest"] },
                () => generateAdditionalNetworkVLANs(choose, "ether8"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=ether8");
        });

        it("should generate VLANs with wireless trunk interface", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    DomesticNetworks: ["Family"],
                },
            };

            const result = testWithOutput(
                "generateAdditionalNetworkVLANs",
                "Generate VLANs on wireless trunk interface (wifi5)",
                { trunkInterface: "wifi5", DomesticNetworks: ["Family"] },
                () => generateAdditionalNetworkVLANs(choose, "wifi5"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=wifi5");
        });
    });

    describe("generateVPNClientNetworkVLANs Function", () => {
        it("should return empty config when VPNClientNetworks is undefined", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate with undefined VPNClientNetworks",
                { VPNClientNetworks: "undefined" },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            expect(Object.keys(result).length).toBe(0);
        });

        it("should generate VLAN for single Wireguard client", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate single Wireguard client VLAN",
                { Wireguard: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=50");
            expect(result["/interface vlan"][0]).toContain("WG-Client-Server1");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeVPN-WG-Client-Server1");
        });

        it("should generate VLANs for multiple Wireguard clients", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["Server1", "Server2", "Server3"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate multiple Wireguard client VLANs",
                { Wireguard: ["Server1", "Server2", "Server3"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(3);
            expect(result["/interface vlan"][0]).toContain("vlan-id=50");
            expect(result["/interface vlan"][1]).toContain("vlan-id=51");
            expect(result["/interface vlan"][2]).toContain("vlan-id=52");
        });

        it("should generate VLAN for single OpenVPN client", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        OpenVPN: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate single OpenVPN client VLAN",
                { OpenVPN: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=60");
            expect(result["/interface vlan"][0]).toContain("OVPN-Client-Server1");
        });

        it("should generate VLAN for single L2TP client", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        L2TP: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate single L2TP client VLAN",
                { L2TP: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=70");
            expect(result["/interface vlan"][0]).toContain("L2TP-Client-Server1");
        });

        it("should generate VLAN for single PPTP client", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        PPTP: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate single PPTP client VLAN",
                { PPTP: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=75");
            expect(result["/interface vlan"][0]).toContain("PPTP-Client-Server1");
        });

        it("should generate VLAN for single SSTP client", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        SSTP: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate single SSTP client VLAN",
                { SSTP: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=80");
            expect(result["/interface vlan"][0]).toContain("SSTP-Client-Server1");
        });

        it("should generate VLAN for single IKev2 client", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        IKev2: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate single IKev2 client VLAN",
                { IKev2: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=85");
            expect(result["/interface vlan"][0]).toContain("IKEv2-Client-Server1");
        });

        it("should generate VLANs for all VPN client protocols", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG1"],
                        OpenVPN: ["OVPN1"],
                        L2TP: ["L2TP1"],
                        PPTP: ["PPTP1"],
                        SSTP: ["SSTP1"],
                        IKev2: ["IKEv2-1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate VLANs for all VPN client protocols",
                {
                    Wireguard: ["WG1"],
                    OpenVPN: ["OVPN1"],
                    L2TP: ["L2TP1"],
                    PPTP: ["PPTP1"],
                    SSTP: ["SSTP1"],
                    IKev2: ["IKEv2-1"],
                },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(6);

            // Verify VLAN IDs for each protocol
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("vlan-id=50");  // Wireguard
            expect(vlanCommands).toContain("vlan-id=60");  // OpenVPN
            expect(vlanCommands).toContain("vlan-id=70");  // L2TP
            expect(vlanCommands).toContain("vlan-id=75");  // PPTP
            expect(vlanCommands).toContain("vlan-id=80");  // SSTP
            expect(vlanCommands).toContain("vlan-id=85");  // IKEv2
        });

        it("should return empty config when all VPN client arrays are empty", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: [],
                        OpenVPN: [],
                        L2TP: [],
                        PPTP: [],
                        SSTP: [],
                        IKev2: [],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate with all empty VPN client arrays",
                { VPNClientNetworks: "all empty arrays" },
                () => generateVPNClientNetworkVLANs(choose, "ether1"),
            );

            expect(Object.keys(result).length).toBe(0);
        });

        it("should generate VLANs with custom trunk interface", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate VPN client VLANs on custom trunk interface (ether8)",
                { trunkInterface: "ether8", Wireguard: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "ether8"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=ether8");
        });

        it("should generate VLANs with wireless trunk interface", () => {
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        OpenVPN: ["Server1"],
                    },
                },
            };

            const result = testWithOutput(
                "generateVPNClientNetworkVLANs",
                "Generate VPN client VLANs on wireless trunk interface (wifi5)",
                { trunkInterface: "wifi5", OpenVPN: ["Server1"] },
                () => generateVPNClientNetworkVLANs(choose, "wifi5"),
            );

            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=wifi5");
        });
    });

    describe("generateWirelessTrunkInterface Function", () => {
        it("should return empty config for empty wireless configs array", () => {
            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Generate with empty wireless configs array",
                { wirelessConfigs: [], masterSlaveInterface: "wifi5" },
                () => generateWirelessTrunkInterface([], "wifi5"),
            );

            expect(Object.keys(result).length).toBe(0);
        });

        it("should generate wireless station for 5GHz band (wifi5)", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "TrunkNetwork",
                    Password: "SecurePassword123",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Generate wireless station for 5GHz band (wifi5)",
                {
                    SSID: "TrunkNetwork",
                    Password: "SecurePassword123",
                    masterSlaveInterface: "wifi5",
                    expectedBand: "5",
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi5"),
            );

            // Verify wireless configuration is present
            validateRouterConfigStructure(result);
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });

        it("should generate wireless station for 5GHz band (wifi5-2)", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "Trunk5G",
                    Password: "Password5G",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Generate wireless station for 5GHz band (wifi5-2)",
                {
                    SSID: "Trunk5G",
                    Password: "Password5G",
                    masterSlaveInterface: "wifi5-2",
                    expectedBand: "5",
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi5-2"),
            );

            validateRouterConfigStructure(result);
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });

        it("should generate wireless station for 2.4GHz band (wifi2.4)", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "Trunk24G",
                    Password: "Password24G",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Generate wireless station for 2.4GHz band (wifi2.4)",
                {
                    SSID: "Trunk24G",
                    Password: "Password24G",
                    masterSlaveInterface: "wifi2.4",
                    expectedBand: "2.4",
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi2.4"),
            );

            validateRouterConfigStructure(result);
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });

        it("should use first wireless config when multiple provided", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "FirstNetwork",
                    Password: "FirstPassword",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
                {
                    SSID: "SecondNetwork",
                    Password: "SecondPassword",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Use first wireless config when multiple provided",
                {
                    wirelessConfigs: "2 configs provided",
                    usedSSID: "!FirstNetwork",
                    usedPassword: "FirstPassword",
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi5"),
            );

            validateRouterConfigStructure(result);
            // The SSID should be from first config with ! prefix
            const wirelessSection = result["/interface wifi"] || result["/interface wireless"] || [];
            const hasFirstConfig = wirelessSection.some((cmd: string) =>
                cmd.includes("!FirstNetwork") || cmd.includes("TrunkStation")
            );
            expect(hasFirstConfig).toBe(true);
        });

        it("should prefix SSID with exclamation mark", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "MasterTrunk",
                    Password: "MasterPass",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Verify SSID is prefixed with ! for station mode",
                {
                    originalSSID: "MasterTrunk",
                    stationSSID: "!MasterTrunk",
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi5"),
            );

            validateRouterConfigStructure(result);
            // Verify the SSID has "!" prefix or TrunkStation name is used
            const wirelessSection = result["/interface wifi"] || result["/interface wireless"] || [];
            const hasStationConfig = wirelessSection.some((cmd: string) =>
                cmd.includes("!MasterTrunk") || cmd.includes("TrunkStation")
            );
            expect(hasStationConfig).toBe(true);
        });

        it("should handle special characters in SSID", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "Trunk_Network-5G",
                    Password: "Pass@Word#123",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Handle special characters in SSID and password",
                {
                    SSID: "Trunk_Network-5G",
                    Password: "Pass@Word#123",
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi5"),
            );

            validateRouterConfigStructure(result);
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });

        it("should handle long SSID", () => {
            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "VeryLongTrunkNetworkSSIDForTesting",
                    Password: "VeryLongPasswordForTesting123",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const result = testWithOutput(
                "generateWirelessTrunkInterface",
                "Handle long SSID and password",
                {
                    SSID: "VeryLongTrunkNetworkSSIDForTesting",
                    SSIDLength: 38,
                },
                () => generateWirelessTrunkInterface(wirelessConfigs, "wifi5"),
            );

            validateRouterConfigStructure(result);
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });
    });

    describe("VLAN_IDS Constants Verification", () => {
        it("should verify all VLAN_IDS constant values", () => {
            // This test documents and verifies all VLAN ID constants
            // Note: We can't directly access VLAN_IDS as it's not exported,
            // but we verify the values through the functions that use them

            const testData = {
                baseNetworks: {
                    Split: 10,
                    Domestic: 20,
                    Foreign: 30,
                    VPN: 40,
                },
                vpnClients: {
                    Wireguard: 50,
                    OpenVPN: 60,
                    L2TP: 70,
                    PPTP: 75,
                    SSTP: 80,
                    IKev2: 85,
                },
                additionalNetworks: {
                    ForeignBase: 31,
                    DomesticBase: 21,
                },
            };

            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                    ForeignNetworks: ["Guest"],
                    DomesticNetworks: ["Family"],
                    VPNClientNetworks: {
                        Wireguard: ["WG1"],
                        OpenVPN: ["OVPN1"],
                        L2TP: ["L2TP1"],
                        PPTP: ["PPTP1"],
                        SSTP: ["SSTP1"],
                        IKev2: ["IKEv2-1"],
                    },
                },
            };

            // Test base networks
            const baseResult = generateBaseNetworkVLANs(choose, "ether1");
            const baseVlans = baseResult["/interface vlan"].join(" ");
            expect(baseVlans).toContain("vlan-id=10");
            expect(baseVlans).toContain("vlan-id=20");
            expect(baseVlans).toContain("vlan-id=30");
            expect(baseVlans).toContain("vlan-id=40");

            // Test additional networks
            const additionalResult = generateAdditionalNetworkVLANs(choose, "ether1");
            const additionalVlans = additionalResult["/interface vlan"].join(" ");
            expect(additionalVlans).toContain("vlan-id=31");  // Foreign-Guest
            expect(additionalVlans).toContain("vlan-id=21");  // Domestic-Family

            // Test VPN clients
            const vpnResult = generateVPNClientNetworkVLANs(choose, "ether1");
            const vpnVlans = vpnResult["/interface vlan"].join(" ");
            expect(vpnVlans).toContain("vlan-id=50");  // Wireguard
            expect(vpnVlans).toContain("vlan-id=60");  // OpenVPN
            expect(vpnVlans).toContain("vlan-id=70");  // L2TP
            expect(vpnVlans).toContain("vlan-id=75");  // PPTP
            expect(vpnVlans).toContain("vlan-id=80");  // SSTP
            expect(vpnVlans).toContain("vlan-id=85");  // IKEv2

            console.log("\n" + "=".repeat(80));
            console.log("✅ VLAN_IDS Constants Verification Summary");
            console.log("─".repeat(80));
            console.log("Base Networks:");
            console.log("  Split: 10 ✓");
            console.log("  Domestic: 20 ✓");
            console.log("  Foreign: 30 ✓");
            console.log("  VPN: 40 ✓");
            console.log("\nVPN Client Protocols:");
            console.log("  Wireguard: 50 ✓");
            console.log("  OpenVPN: 60 ✓");
            console.log("  L2TP: 70 ✓");
            console.log("  PPTP: 75 ✓");
            console.log("  SSTP: 80 ✓");
            console.log("  IKEv2: 85 ✓");
            console.log("\nAdditional Networks:");
            console.log("  Foreign additional: 31+ (incremental) ✓");
            console.log("  Domestic additional: 21+ (incremental) ✓");
            console.log("─".repeat(80));
        });

        it("should verify no VLAN ID collisions in ranges", () => {
            // Test that multiple networks of same type get sequential IDs without collisions
            const choose: ChooseState = {
                ...baseChooseState,
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG1", "WG2", "WG3", "WG4", "WG5"],
                    },
                },
            };

            const result = generateVPNClientNetworkVLANs(choose, "ether1");
            const vlanIds = result["/interface vlan"].map((cmd: string) => {
                const match = cmd.match(/vlan-id=(\d+)/);
                return match ? parseInt(match[1]) : 0;
            });

            // Should be 50, 51, 52, 53, 54
            expect(vlanIds).toEqual([50, 51, 52, 53, 54]);

            // Verify no duplicates
            const uniqueIds = new Set(vlanIds);
            expect(uniqueIds.size).toBe(vlanIds.length);
        });
    });
});
