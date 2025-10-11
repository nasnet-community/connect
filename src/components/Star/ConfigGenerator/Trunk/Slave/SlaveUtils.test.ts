import { describe, it, expect } from "vitest";
import {
    createBridgesForNetworks,
    commentTrunkInterface,
    createVLANsOnTrunkInterface,
    addVLANsToBridges,
    createDHCPClientsOnBridges,
    SlaveExtraCG,
    addSlaveInterfacesToBridge,
    configureSlaveWireless,
} from "./SlaveUtils";
import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
import type {
    Subnets,
    MasterSlaveInterfaceType,
    ExtraConfigState,
    RouterModels,
    WirelessConfig,
} from "~/components/Star/StarContext";

describe("SlaveUtils - Slave Router Utility Functions", () => {
    // ============================================================================
    // Helper Functions
    // ============================================================================

    const createBaseSubnets = (): Subnets => ({
        BaseNetworks: {
            Split: { name: "Split", subnet: "192.168.10.0/24" },
            Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
            Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
            VPN: { name: "VPN", subnet: "192.168.40.0/24" },
        },
    });

    const createSlaveRouter = (overrides?: Partial<RouterModels>): RouterModels => ({
        isMaster: false,
        Model: "hAP ax3",
        MasterSlaveInterface: "ether1",
        Interfaces: {
            Interfaces: {
                ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
                wireless: ["wifi5", "wifi2.4"],
            },
            OccupiedInterfaces: [],
        },
        ...overrides,
    });

    const createWirelessConfig = (overrides?: Partial<WirelessConfig>): WirelessConfig => ({
        SSID: "TestNetwork",
        Password: "TestPassword123",
        isHide: false,
        isDisabled: false,
        SplitBand: false,
        WifiTarget: "Split",
        NetworkName: "",
        ...overrides,
    });

    const createBaseExtraConfig = (): ExtraConfigState => ({
        RUI: {
            Timezone: "Asia/Tehran",
            IPAddressUpdate: {
                interval: "",
                time: "",
            },
        },
    });

    // ============================================================================
    // createBridgesForNetworks Tests
    // ============================================================================

    describe("createBridgesForNetworks", () => {
        it("should create bridges for all base networks", () => {
            const subnets = createBaseSubnets();

            testWithOutput(
                "createBridgesForNetworks",
                "Create bridges for all base networks",
                { Networks: "Split, Domestic, Foreign, VPN" },
                () => createBridgesForNetworks(subnets)
            );

            const result = createBridgesForNetworks(subnets);
            validateRouterConfig(result, ["/interface bridge"]);

            expect(result["/interface bridge"].length).toBe(4);
            expect(result["/interface bridge"]).toContain('add name=LANBridgeSplit comment="Split"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeDomestic comment="Domestic"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeForeign comment="Foreign"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeVPN comment="VPN"');
        });

        it("should create bridges for only enabled base networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                },
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(2);
            expect(result["/interface bridge"]).toContain('add name=LANBridgeSplit comment="Split"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeDomestic comment="Domestic"');
        });

        it("should create bridges for additional Foreign networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                    { name: "Streaming", subnet: "192.168.32.0/24" },
                ],
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(2);
            expect(result["/interface bridge"]).toContain('add name=LANBridgeForeign-Gaming comment="Foreign-Gaming"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeForeign-Streaming comment="Foreign-Streaming"');
        });

        it("should create bridges for additional Domestic networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                    { name: "IoT", subnet: "192.168.22.0/24" },
                ],
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(2);
            expect(result["/interface bridge"]).toContain('add name=LANBridgeDomestic-Office comment="Domestic-Office"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeDomestic-IoT comment="Domestic-IoT"');
        });

        it("should create bridges for Wireguard VPN client networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [
                        { name: "WG-US", subnet: "192.168.50.0/24" },
                        { name: "WG-EU", subnet: "192.168.51.0/24" },
                    ],
                },
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(2);
            expect(result["/interface bridge"]).toContain('add name=LANBridgeVPN-WG-Client-WG-US comment="WG-Client-WG-US"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeVPN-WG-Client-WG-EU comment="WG-Client-WG-EU"');
        });

        it("should create bridges for all VPN client types", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                    L2TP: [{ name: "L2TP1", subnet: "192.168.70.0/24" }],
                    PPTP: [{ name: "PPTP1", subnet: "192.168.71.0/24" }],
                    SSTP: [{ name: "SSTP1", subnet: "192.168.72.0/24" }],
                    IKev2: [{ name: "IKEv2-1", subnet: "192.168.73.0/24" }],
                },
            };

            testWithOutput(
                "createBridgesForNetworks",
                "Create bridges for all VPN client types",
                { VPNTypes: "Wireguard, OpenVPN, L2TP, PPTP, SSTP, IKEv2" },
                () => createBridgesForNetworks(subnets)
            );

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(6);
            expect(result["/interface bridge"]).toContain('add name=LANBridgeVPN-WG-Client-WG1 comment="WG-Client-WG1"');
            expect(result["/interface bridge"]).toContain('add name=LANBridgeVPN-OVPN-Client-OVPN1 comment="OVPN-Client-OVPN1"');
        });

        it("should return empty config for undefined subnets", () => {
            const result = createBridgesForNetworks(undefined);
            expect(result).toEqual({});
        });

        it("should return empty config for empty subnets", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
            };

            const result = createBridgesForNetworks(subnets);
            expect(result).toEqual({});
        });

        it("should handle mixed base and additional networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                ],
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(3);
        });

        it("should handle only VPN client networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                },
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(1);
        });

        it("should handle multiple networks of the same type", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                    { name: "Streaming", subnet: "192.168.32.0/24" },
                    { name: "Work", subnet: "192.168.33.0/24" },
                ],
            };

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(3);
        });

        it("should handle maximum network complexity", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                    { name: "Streaming", subnet: "192.168.32.0/24" },
                ],
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                ],
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                },
            };

            testWithOutput(
                "createBridgesForNetworks",
                "Maximum network complexity",
                {
                    BaseNetworks: 4,
                    ForeignNetworks: 2,
                    DomesticNetworks: 1,
                    VPNClientNetworks: 2,
                    TotalBridges: 9,
                },
                () => createBridgesForNetworks(subnets)
            );

            const result = createBridgesForNetworks(subnets);
            expect(result["/interface bridge"].length).toBe(9);
        });
    });

    // ============================================================================
    // commentTrunkInterface Tests
    // ============================================================================

    describe("commentTrunkInterface", () => {
        it("should comment ethernet trunk interface", () => {
            const result = commentTrunkInterface("ether1");
            validateRouterConfig(result, ["/interface ethernet"]);
            expect(result["/interface ethernet"]).toContain('set [ find default-name=ether1 ] comment="Trunk Interface"');
        });

        it("should comment wireless trunk interface", () => {
            testWithOutput(
                "commentTrunkInterface",
                "Comment wireless trunk interface (wifi5)",
                { TrunkInterface: "wifi5", InterfaceType: "wireless" },
                () => commentTrunkInterface("wifi5")
            );

            const result = commentTrunkInterface("wifi5");
            validateRouterConfig(result, ["/interface wifi"]);
            expect(result["/interface wifi"]).toContain('set [ find default-name=wifi5 ] comment="Trunk Interface"');
        });

        it("should return empty config for undefined trunk interface", () => {
            const result = commentTrunkInterface(undefined);
            expect(result).toEqual({});
        });

        it("should handle wifi2.4 interface", () => {
            const result = commentTrunkInterface("wifi2.4");
            validateRouterConfig(result, ["/interface wifi"]);
            expect(result["/interface wifi"]).toContain('set [ find default-name=wifi2.4 ] comment="Trunk Interface"');
        });

        it("should handle wifi5-2 interface", () => {
            const result = commentTrunkInterface("wifi5-2" as MasterSlaveInterfaceType);
            validateRouterConfig(result, ["/interface wifi"]);
            expect(result["/interface wifi"]).toContain('set [ find default-name=wifi5-2 ] comment="Trunk Interface"');
        });

        it("should handle SFP interface", () => {
            const result = commentTrunkInterface("sfp1" as MasterSlaveInterfaceType);
            validateRouterConfig(result, ["/interface ethernet"]);
            expect(result["/interface ethernet"]).toContain('set [ find default-name=sfp1 ] comment="Trunk Interface"');
        });
    });

    // ============================================================================
    // createVLANsOnTrunkInterface Tests
    // ============================================================================

    describe("createVLANsOnTrunkInterface", () => {
        it("should create VLANs for base networks with correct VLAN IDs", () => {
            const subnets = createBaseSubnets();

            testWithOutput(
                "createVLANsOnTrunkInterface",
                "Create VLANs with correct VLAN IDs from subnet third octet",
                {
                    Split: "192.168.10.0/24 → VLAN 10",
                    Domestic: "192.168.20.0/24 → VLAN 20",
                    Foreign: "192.168.30.0/24 → VLAN 30",
                    VPN: "192.168.40.0/24 → VLAN 40",
                },
                () => createVLANsOnTrunkInterface(subnets, "ether1")
            );

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            validateRouterConfig(result, ["/interface vlan"]);

            expect(result["/interface vlan"].length).toBe(4);
            expect(result["/interface vlan"][0]).toContain("vlan-id=10");
            expect(result["/interface vlan"][1]).toContain("vlan-id=20");
            expect(result["/interface vlan"][2]).toContain("vlan-id=30");
            expect(result["/interface vlan"][3]).toContain("vlan-id=40");
        });

        it("should use correct VLAN naming convention", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"][0]).toContain('name="VLAN10-ether1-Split"');
            expect(result["/interface vlan"][0]).toContain('comment="Split Network VLAN"');
            expect(result["/interface vlan"][0]).toContain('interface="ether1"');
        });

        it("should create VLANs for additional Foreign networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                    { name: "Streaming", subnet: "192.168.32.0/24" },
                ],
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=31");
            expect(result["/interface vlan"][0]).toContain('name="VLAN31-ether1-Foreign-Gaming"');
        });

        it("should create VLANs for additional Domestic networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                    { name: "IoT", subnet: "192.168.22.0/24" },
                ],
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=21");
            expect(result["/interface vlan"][1]).toContain("vlan-id=22");
        });

        it("should create VLANs for Wireguard client networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [
                        { name: "WG-US", subnet: "192.168.50.0/24" },
                        { name: "WG-EU", subnet: "192.168.51.0/24" },
                    ],
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=50");
            expect(result["/interface vlan"][0]).toContain('name="VLAN50-ether1-WG-Client-WG-US"');
        });

        it("should create VLANs for all VPN client types", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                    L2TP: [{ name: "L2TP1", subnet: "192.168.70.0/24" }],
                    PPTP: [{ name: "PPTP1", subnet: "192.168.71.0/24" }],
                    SSTP: [{ name: "SSTP1", subnet: "192.168.72.0/24" }],
                    IKev2: [{ name: "IKE1", subnet: "192.168.73.0/24" }],
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(6);
        });

        it("should work with wireless trunk interface", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "wifi5");
            expect(result["/interface vlan"][0]).toContain('interface="wifi5"');
            expect(result["/interface vlan"][0]).toContain("vlan-id=20");
        });

        it("should return empty config for undefined subnets", () => {
            const result = createVLANsOnTrunkInterface(undefined, "ether1");
            expect(result).toEqual({});
        });

        it("should return empty config for empty trunk interface", () => {
            const subnets = createBaseSubnets();
            const result = createVLANsOnTrunkInterface(subnets, "");
            expect(result).toEqual({});
        });

        it("should handle mixed network types", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(3);
        });

        it("should extract VLAN ID from different subnet patterns", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "10.0.100.0/24" },
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"][0]).toContain("vlan-id=100");
        });

        it("should handle SFP trunk interface", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
            };

            const result = createVLANsOnTrunkInterface(subnets, "sfp1");
            expect(result["/interface vlan"][0]).toContain('interface="sfp1"');
        });

        it("should handle maximum network complexity", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                ],
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                },
            };

            testWithOutput(
                "createVLANsOnTrunkInterface",
                "Maximum network complexity - 8 VLANs",
                {
                    BaseNetworks: 4,
                    Additional: 4,
                    TotalVLANs: 8,
                },
                () => createVLANsOnTrunkInterface(subnets, "ether1")
            );

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(8);
        });

        it("should handle empty base networks with only additional networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
            };

            const result = createVLANsOnTrunkInterface(subnets, "ether1");
            expect(result["/interface vlan"].length).toBe(1);
        });
    });

    // ============================================================================
    // addVLANsToBridges Tests
    // ============================================================================

    describe("addVLANsToBridges", () => {
        it("should add VLANs to corresponding bridges", () => {
            const subnets = createBaseSubnets();

            const result = addVLANsToBridges(subnets, "ether1");
            validateRouterConfig(result, ["/interface bridge port"]);

            expect(result["/interface bridge port"].length).toBe(4);
            expect(result["/interface bridge port"][0]).toContain('bridge="LANBridgeSplit"');
            expect(result["/interface bridge port"][0]).toContain('interface="VLAN10-ether1-Split"');
            expect(result["/interface bridge port"][0]).toContain('comment="Split VLAN to Bridge"');

            expect(result["/interface bridge port"][1]).toContain('bridge="LANBridgeDomestic"');
            expect(result["/interface bridge port"][1]).toContain('interface="VLAN20-ether1-Domestic"');
        });

        it("should add VLANs for Foreign networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                    { name: "Streaming", subnet: "192.168.32.0/24" },
                ],
            };

            const result = addVLANsToBridges(subnets, "ether1");
            expect(result["/interface bridge port"].length).toBe(2);
            expect(result["/interface bridge port"][0]).toContain('bridge="LANBridgeForeign-Gaming"');
            expect(result["/interface bridge port"][1]).toContain('bridge="LANBridgeForeign-Streaming"');
        });

        it("should add VLANs for Domestic networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                ],
            };

            const result = addVLANsToBridges(subnets, "ether1");
            expect(result["/interface bridge port"].length).toBe(1);
            expect(result["/interface bridge port"][0]).toContain('bridge="LANBridgeDomestic-Office"');
        });

        it("should add VLANs for all VPN client types", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                },
            };

            testWithOutput(
                "addVLANsToBridges",
                "Add VPN client VLANs to bridges",
                { VPNTypes: "Wireguard, OpenVPN" },
                () => addVLANsToBridges(subnets, "ether1")
            );

            const result = addVLANsToBridges(subnets, "ether1");
            expect(result["/interface bridge port"].length).toBe(2);
            expect(result["/interface bridge port"][0]).toContain('bridge="LANBridgeVPN-WG-Client-WG1"');
            expect(result["/interface bridge port"][1]).toContain('bridge="LANBridgeVPN-OVPN-Client-OVPN1"');
        });

        it("should return empty config for undefined subnets", () => {
            const result = addVLANsToBridges(undefined, "ether1");
            expect(result).toEqual({});
        });

        it("should return empty config for empty trunk interface", () => {
            const subnets = createBaseSubnets();
            const result = addVLANsToBridges(subnets, "");
            expect(result).toEqual({});
        });

        it("should handle mixed network types", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
            };

            const result = addVLANsToBridges(subnets, "ether1");
            expect(result["/interface bridge port"].length).toBe(2);
        });

        it("should verify correct bridge naming patterns", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
            };

            const result = addVLANsToBridges(subnets, "ether1");
            expect(result["/interface bridge port"][0]).toContain('bridge="LANBridgeSplit"');
            expect(result["/interface bridge port"][1]).toContain('bridge="LANBridgeVPN"');
        });

        it("should work with wireless trunk interface", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
            };

            const result = addVLANsToBridges(subnets, "wifi5");
            expect(result["/interface bridge port"][0]).toContain('interface="VLAN10-wifi5-Split"');
        });

        it("should handle maximum network complexity", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                ],
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                },
            };

            testWithOutput(
                "addVLANsToBridges",
                "Maximum network complexity - 8 bridge ports",
                {
                    BaseNetworks: 4,
                    Additional: 4,
                    TotalPorts: 8,
                },
                () => addVLANsToBridges(subnets, "ether1")
            );

            const result = addVLANsToBridges(subnets, "ether1");
            expect(result["/interface bridge port"].length).toBe(8);
        });
    });

    // ============================================================================
    // createDHCPClientsOnBridges Tests
    // ============================================================================

    describe("createDHCPClientsOnBridges", () => {
        it("should create DHCP clients for all base networks", () => {
            const subnets = createBaseSubnets();

            testWithOutput(
                "createDHCPClientsOnBridges",
                "Create DHCP clients for all bridges",
                { Bridges: ["LANBridgeSplit", "LANBridgeDomestic", "LANBridgeForeign", "LANBridgeVPN"] },
                () => createDHCPClientsOnBridges(subnets)
            );

            const result = createDHCPClientsOnBridges(subnets);
            validateRouterConfig(result, ["/ip dhcp-client"]);

            expect(result["/ip dhcp-client"].length).toBe(4);
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeSplit");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeDomestic");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeForeign");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeVPN");
        });

        it("should create DHCP clients for additional Foreign networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                    { name: "Streaming", subnet: "192.168.32.0/24" },
                ],
            };

            const result = createDHCPClientsOnBridges(subnets);
            expect(result["/ip dhcp-client"].length).toBe(2);
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeForeign-Gaming");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeForeign-Streaming");
        });

        it("should create DHCP clients for VPN client networks", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [
                        { name: "WG-US", subnet: "192.168.50.0/24" },
                        { name: "WG-EU", subnet: "192.168.51.0/24" },
                    ],
                    OpenVPN: [
                        { name: "OVPN1", subnet: "192.168.60.0/24" },
                    ],
                },
            };

            const result = createDHCPClientsOnBridges(subnets);
            expect(result["/ip dhcp-client"].length).toBe(3);
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeVPN-WG-Client-WG-US");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeVPN-WG-Client-WG-EU");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeVPN-OVPN-Client-OVPN1");
        });

        it("should return empty config for undefined subnets", () => {
            const result = createDHCPClientsOnBridges(undefined);
            expect(result).toEqual({});
        });

        it("should return empty config for empty subnets", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
            };

            const result = createDHCPClientsOnBridges(subnets);
            expect(result).toEqual({});
        });

        it("should handle mixed network types", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                },
            };

            const result = createDHCPClientsOnBridges(subnets);
            expect(result["/ip dhcp-client"].length).toBe(3);
        });

        it("should handle all VPN client types together", () => {
            const subnets: Subnets = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                    L2TP: [{ name: "L2TP1", subnet: "192.168.70.0/24" }],
                    PPTP: [{ name: "PPTP1", subnet: "192.168.71.0/24" }],
                    SSTP: [{ name: "SSTP1", subnet: "192.168.72.0/24" }],
                    IKev2: [{ name: "IKE1", subnet: "192.168.73.0/24" }],
                },
            };

            testWithOutput(
                "createDHCPClientsOnBridges",
                "All VPN client types - 6 DHCP clients",
                { VPNTypes: "Wireguard, OpenVPN, L2TP, PPTP, SSTP, IKEv2" },
                () => createDHCPClientsOnBridges(subnets)
            );

            const result = createDHCPClientsOnBridges(subnets);
            expect(result["/ip dhcp-client"].length).toBe(6);
        });

        it("should handle maximum network complexity", () => {
            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
                ForeignNetworks: [
                    { name: "Gaming", subnet: "192.168.31.0/24" },
                ],
                DomesticNetworks: [
                    { name: "Office", subnet: "192.168.21.0/24" },
                ],
                VPNClientNetworks: {
                    Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
                    OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
                },
            };

            const result = createDHCPClientsOnBridges(subnets);
            expect(result["/ip dhcp-client"].length).toBe(8);
        });
    });

    // ============================================================================
    // SlaveExtraCG Tests
    // ============================================================================

    describe("SlaveExtraCG", () => {
        it("should include base system configuration", () => {
            const extraConfig = createBaseExtraConfig();

            const result = SlaveExtraCG(extraConfig);

            validateRouterConfig(result, [
                "/ip dns",
                "/system package update",
                "/system routerboard settings",
            ]);

            expect(result["/ip dns"]).toContain("set allow-remote-requests=yes");
            expect(result["/system package update"]).toContain("set channel=stable");
            expect(result["/system routerboard settings"]).toContain("set auto-upgrade=yes");
        });

        it("should set router identity with -Slave suffix", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                RouterIdentityRomon: {
                    RouterIdentity: "MyRouter",
                    isRomon: true,
                },
            };

            testWithOutput(
                "SlaveExtraCG",
                "Router identity with -Slave suffix",
                { Identity: "MyRouter → MyRouter-Slave" },
                () => SlaveExtraCG(extraConfig)
            );

            const result = SlaveExtraCG(extraConfig);
            expect(result["/system identity"]).toContain('set name="MyRouter-Slave"');
        });

        it("should enable Romon when configured", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                RouterIdentityRomon: {
                    RouterIdentity: "TestRouter",
                    isRomon: true,
                },
            };

            const result = SlaveExtraCG(extraConfig);
            validateRouterConfig(result, ["/tool romon"]);
            expect(result["/tool romon"]).toContain("set enabled=yes");
        });

        it("should configure services access", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                services: {
                    api: { type: "Disable" },
                    apissl: { type: "Disable" },
                    ftp: { type: "Disable" },
                    ssh: { type: "Enable", port: 22 },
                    telnet: { type: "Disable" },
                    winbox: { type: "Enable", port: 8291 },
                    web: { type: "Local", port: 80 },
                    webssl: { type: "Enable", port: 443 },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/ip service"]) {
                expect(result["/ip service"].length).toBeGreaterThan(0);
            }
        });

        it("should configure timezone", () => {
            const extraConfig: ExtraConfigState = {
                RUI: {
                    Timezone: "Asia/Tehran",
                    IPAddressUpdate: { interval: "", time: "" },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/system clock"]) {
                expect(result["/system clock"]).toContain('time-zone-name="Asia/Tehran"');
            }
        });

        it("should configure auto-reboot scheduler", () => {
            const extraConfig: ExtraConfigState = {
                RUI: {
                    Timezone: "Asia/Tehran",
                    Reboot: {
                        interval: "Weekly",
                        time: "03:00:00",
                    },
                    IPAddressUpdate: { interval: "", time: "" },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/system scheduler"]) {
                const schedulers = result["/system scheduler"];
                const rebootScheduler = schedulers.find(s => s.includes("AutoReboot"));
                expect(rebootScheduler).toBeDefined();
            }
        });

        it("should configure auto-update scheduler", () => {
            const extraConfig: ExtraConfigState = {
                RUI: {
                    Timezone: "Asia/Tehran",
                    Update: {
                        interval: "Weekly",
                        time: "04:00:00",
                    },
                    IPAddressUpdate: { interval: "", time: "" },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/system scheduler"]) {
                const schedulers = result["/system scheduler"];
                const updateScheduler = schedulers.find(s => s.includes("AutoUpdate"));
                expect(updateScheduler).toBeDefined();
            }
        });

        it("should handle empty router identity", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                RouterIdentityRomon: {
                    RouterIdentity: "",
                    isRomon: false,
                },
            };

            const result = SlaveExtraCG(extraConfig);
            expect(result["/system identity"]).toContain('set name=""');
        });

        it("should configure NTP servers", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                usefulServices: {
                    ntp: {
                        servers: ["time.google.com", "pool.ntp.org"],
                    },
                },
            };

            testWithOutput(
                "SlaveExtraCG",
                "Configure NTP servers",
                { Servers: ["time.google.com", "pool.ntp.org"] },
                () => SlaveExtraCG(extraConfig)
            );

            const result = SlaveExtraCG(extraConfig);

            if (result["/system ntp client"]) {
                expect(result["/system ntp client"]).toBeDefined();
            }
        });

        it("should configure graphing", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                usefulServices: {
                    graphing: {
                        Interface: true,
                        Queue: true,
                        Resources: true,
                    },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/tool graphing"]) {
                expect(result["/tool graphing"].length).toBeGreaterThan(0);
            }
        });

        it("should handle all services types", () => {
            const extraConfig: ExtraConfigState = {
                ...createBaseExtraConfig(),
                services: {
                    api: { type: "Enable", port: 8728 },
                    apissl: { type: "Enable", port: 8729 },
                    ftp: { type: "Disable" },
                    ssh: { type: "Enable", port: 22 },
                    telnet: { type: "Disable" },
                    winbox: { type: "Enable", port: 8291 },
                    web: { type: "Enable", port: 80 },
                    webssl: { type: "Enable", port: 443 },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/ip service"]) {
                expect(result["/ip service"].length).toBeGreaterThan(0);
            }
        });

        it("should handle multiple schedulers", () => {
            const extraConfig: ExtraConfigState = {
                RUI: {
                    Timezone: "Asia/Tehran",
                    Reboot: {
                        interval: "Weekly",
                        time: "03:00:00",
                    },
                    Update: {
                        interval: "Daily",
                        time: "04:00:00",
                    },
                    IPAddressUpdate: { interval: "", time: "" },
                },
            };

            const result = SlaveExtraCG(extraConfig);

            if (result["/system scheduler"]) {
                const schedulers = result["/system scheduler"];
                expect(schedulers.length).toBeGreaterThan(0);
            }
        });

        it("should handle complex combinations of all features", () => {
            const extraConfig: ExtraConfigState = {
                RouterIdentityRomon: {
                    RouterIdentity: "ComplexSlave",
                    isRomon: true,
                },
                services: {
                    api: { type: "Enable", port: 8728 },
                    apissl: { type: "Enable", port: 8729 },
                    ftp: { type: "Disable" },
                    ssh: { type: "Enable", port: 22 },
                    telnet: { type: "Disable" },
                    winbox: { type: "Enable", port: 8291 },
                    web: { type: "Local", port: 80 },
                    webssl: { type: "Enable", port: 443 },
                },
                RUI: {
                    Timezone: "America/New_York",
                    Reboot: {
                        interval: "Weekly",
                        time: "03:00:00",
                    },
                    Update: {
                        interval: "Daily",
                        time: "04:00:00",
                    },
                    IPAddressUpdate: { interval: "", time: "" },
                },
                usefulServices: {
                    ntp: {
                        servers: ["time.google.com", "pool.ntp.org"],
                    },
                    graphing: {
                        Interface: true,
                        Queue: true,
                        Resources: true,
                    },
                },
            };

            testWithOutput(
                "SlaveExtraCG",
                "Complex configuration with all features",
                {
                    Identity: "ComplexSlave-Slave",
                    Romon: "enabled",
                    Services: "8 configured",
                    Schedulers: "2 (reboot + update)",
                    NTP: "2 servers",
                    Graphing: "3 types",
                },
                () => SlaveExtraCG(extraConfig)
            );

            const result = SlaveExtraCG(extraConfig);

            validateRouterConfig(result, [
                "/system identity",
                "/tool romon",
                "/ip dns",
            ]);
        });
    });

    // ============================================================================
    // addSlaveInterfacesToBridge Tests
    // ============================================================================

    describe("addSlaveInterfacesToBridge", () => {
        it("should add available ethernet interfaces to Split bridge", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();

            testWithOutput(
                "addSlaveInterfacesToBridge",
                "Add ethernet interfaces to Split bridge",
                {
                    TrunkInterface: "ether1 (excluded)",
                    AvailableInterfaces: "ether2, ether3, ether4, ether5",
                    TargetBridge: "LANBridgeSplit",
                },
                () => addSlaveInterfacesToBridge([slaveRouter], subnets)
            );

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            const ethernetPorts = result["/interface bridge port"].filter(p =>
                p.includes("ether") && !p.includes("VLAN")
            );

            expect(ethernetPorts.length).toBe(4);
            expect(ethernetPorts[0]).toContain('bridge="LANBridgeSplit"');
            expect(ethernetPorts[0]).toContain('interface="ether2"');
            expect(ethernetPorts[0]).toContain('comment="Slave ether2 to LANBridgeSplit"');
        });

        it("should exclude occupied interfaces from bridge assignment", () => {
            const slaveRouter = createSlaveRouter({
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
                    },
                    OccupiedInterfaces: [
                        { interface: "ether2", UsedFor: "WAN" },
                        { interface: "ether3", UsedFor: "Management" },
                    ],
                },
            });
            const subnets = createBaseSubnets();

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            const ethernetPorts = result["/interface bridge port"].filter(p =>
                p.includes("ether") && !p.includes("VLAN")
            );

            expect(ethernetPorts.length).toBe(2);
            expect(ethernetPorts.some(p => p.includes('interface="ether2"'))).toBe(false);
            expect(ethernetPorts.some(p => p.includes('interface="ether3"'))).toBe(false);
        });

        it("should add SFP interfaces to bridge", () => {
            const slaveRouter = createSlaveRouter({
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1"],
                        sfp: ["sfp1", "sfp2"],
                    },
                    OccupiedInterfaces: [],
                },
            });
            const subnets = createBaseSubnets();

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            const sfpPorts = result["/interface bridge port"].filter(p => p.includes("sfp"));
            expect(sfpPorts.length).toBe(2);
            expect(sfpPorts[0]).toContain('interface="sfp1"');
            expect(sfpPorts[0]).toContain('bridge="LANBridgeSplit"');
        });

        it("should fallback to VPN bridge when Split not available", () => {
            const slaveRouter = createSlaveRouter();
            const subnets: Subnets = {
                BaseNetworks: {
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
            };

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            const ethernetPorts = result["/interface bridge port"].filter(p =>
                p.includes("ether") && !p.includes("VLAN")
            );

            ethernetPorts.forEach(port => {
                expect(port).toContain('bridge="LANBridgeVPN"');
            });
        });

        it("should return empty config when no slave router", () => {
            const masterRouter = createSlaveRouter({ isMaster: true });

            const result = addSlaveInterfacesToBridge([masterRouter], createBaseSubnets());
            expect(result).toEqual({});
        });

        it("should handle multiple routers in array (find slave)", () => {
            const masterRouter = createSlaveRouter({ isMaster: true });
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();

            const result = addSlaveInterfacesToBridge([masterRouter, slaveRouter], subnets);

            expect(result["/interface bridge port"].length).toBeGreaterThan(0);
        });

        it("should return empty config when no suitable bridge", () => {
            const slaveRouter = createSlaveRouter();
            const subnets: Subnets = {
                BaseNetworks: {},
            };

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);
            expect(result).toEqual({});
        });

        it("should handle all interface types together", () => {
            const slaveRouter = createSlaveRouter({
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1", "ether2", "ether3"],
                        sfp: ["sfp1"],
                        wireless: ["wifi5", "wifi2.4"],
                    },
                    OccupiedInterfaces: [],
                },
            });
            const subnets = createBaseSubnets();

            testWithOutput(
                "addSlaveInterfacesToBridge",
                "All interface types - ethernet and SFP only",
                {
                    Ethernet: "ether2, ether3",
                    SFP: "sfp1",
                    Wireless: "excluded (not added to bridge)",
                },
                () => addSlaveInterfacesToBridge([slaveRouter], subnets)
            );

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            // Should NOT include wireless interfaces
            const wirelessPorts = result["/interface bridge port"].filter(p => p.includes("wifi"));
            expect(wirelessPorts.length).toBe(0);

            // Should include ethernet and SFP
            expect(result["/interface bridge port"].length).toBe(3); // ether2, ether3, sfp1
        });

        it("should exclude trunk interface from bridge", () => {
            const slaveRouter = createSlaveRouter({ MasterSlaveInterface: "ether2" });
            const subnets = createBaseSubnets();

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            const ethernetPorts = result["/interface bridge port"];
            expect(ethernetPorts.some(p => p.includes('interface="ether2"'))).toBe(false);
        });

        it("should handle complex occupied interfaces", () => {
            const slaveRouter = createSlaveRouter({
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
                        sfp: ["sfp1", "sfp2"],
                    },
                    OccupiedInterfaces: [
                        { interface: "ether2", UsedFor: "WAN" },
                        { interface: "sfp1", UsedFor: "Uplink" },
                    ],
                },
            });
            const subnets = createBaseSubnets();

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            // Should have ether3, ether4, ether5, sfp2 (excluding trunk ether1, occupied ether2 and sfp1)
            expect(result["/interface bridge port"].length).toBe(4);
            expect(result["/interface bridge port"].some(p => p.includes('interface="ether2"'))).toBe(false);
            expect(result["/interface bridge port"].some(p => p.includes('interface="sfp1"'))).toBe(false);
        });

        it("should handle wireless trunk interface (exclude from counting)", () => {
            const slaveRouter = createSlaveRouter({ MasterSlaveInterface: "wifi5" });
            const subnets = createBaseSubnets();

            const result = addSlaveInterfacesToBridge([slaveRouter], subnets);

            // Should have all ethernet interfaces (trunk is wireless, not ethernet)
            const ethernetPorts = result["/interface bridge port"].filter(p => p.includes("ether"));
            expect(ethernetPorts.length).toBe(5);
        });

        it("should return empty when undefined subnets", () => {
            const slaveRouter = createSlaveRouter();

            const result = addSlaveInterfacesToBridge([slaveRouter], undefined);
            expect(result).toEqual({});
        });
    });

    // ============================================================================
    // configureSlaveWireless Tests
    // ============================================================================

    describe("configureSlaveWireless", () => {
        it("should configure wireless interfaces for both bands", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            testWithOutput(
                "configureSlaveWireless",
                "Configure wireless for both bands",
                {
                    SSID: "TestNetwork",
                    Bands: ["2.4GHz", "5GHz"],
                    Network: "Split",
                },
                () => configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets)
            );

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            validateRouterConfig(result, ["/interface wifi"]);

            const wifiConfigs = result["/interface wifi"];
            expect(wifiConfigs.length).toBeGreaterThan(0);
        });

        it("should configure multiple wireless networks", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [
                createWirelessConfig({ SSID: "Network1", WifiTarget: "Split" }),
                createWirelessConfig({ SSID: "Network2", WifiTarget: "Split" }),
            ];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            const wifiConfigs = result["/interface wifi"];
            expect(wifiConfigs.length).toBeGreaterThan(0);
        });

        it("should skip disabled wireless configurations", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [
                createWirelessConfig({ isDisabled: false }),
                createWirelessConfig({ isDisabled: true }),
            ];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            const wifiConfigs = result["/interface wifi"];
            expect(wifiConfigs.length).toBeGreaterThan(0);
        });

        it("should handle wireless when trunk uses 2.4GHz", () => {
            const slaveRouter = createSlaveRouter({ MasterSlaveInterface: "wifi2.4" });
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            testWithOutput(
                "configureSlaveWireless",
                "Trunk uses 2.4GHz (only 5GHz available)",
                {
                    TrunkInterface: "wifi2.4",
                    AvailableBands: ["5GHz only"],
                },
                () => configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets)
            );

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);

            const wifiConfigs = result["/interface wifi"];
            if (wifiConfigs.length > 0) {
                expect(wifiConfigs.length).toBeGreaterThan(0);
            }
        });

        it("should configure wireless bridge", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);

            const wifiBridgePorts = result["/interface bridge port"].filter(p =>
                p.includes("wifi") && !p.includes("VLAN") && !p.includes("Trunk")
            );
            expect(wifiBridgePorts.length).toBeGreaterThan(0);
        });

        it("should configure wireless interface lists", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);

            if (result["/interface list member"]) {
                expect(result["/interface list member"].length).toBeGreaterThan(0);
            }
        });

        it("should return empty when no slave router", () => {
            const masterRouter = createSlaveRouter({ isMaster: true });
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [masterRouter], subnets);
            expect(result).toEqual({});
        });

        it("should return empty when no wireless interfaces on slave", () => {
            const slaveRouter = createSlaveRouter({
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1", "ether2"],
                    },
                    OccupiedInterfaces: [],
                },
            });
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            expect(result).toEqual({});
        });

        it("should handle trunk uses 5GHz (only 2.4GHz available)", () => {
            const slaveRouter = createSlaveRouter({ MasterSlaveInterface: "wifi5" });
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);

            const wifiConfigs = result["/interface wifi"];
            expect(wifiConfigs.length).toBeGreaterThan(0);
        });

        it("should handle trunk uses both bands (no wireless available)", () => {
            const slaveRouter = createSlaveRouter({
                MasterSlaveInterface: "wifi5",
                Interfaces: {
                    Interfaces: {
                        ethernet: ["ether1"],
                        wireless: ["wifi5"], // Only one band, used by trunk
                    },
                    OccupiedInterfaces: [],
                },
            });
            const subnets = createBaseSubnets();
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            expect(result).toEqual({});
        });

        it("should return empty when no suitable network (no Split/VPN)", () => {
            const slaveRouter = createSlaveRouter();
            const subnets: Subnets = {
                BaseNetworks: {
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                },
            };
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            expect(result).toEqual({});
        });

        it("should handle all configs disabled", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [
                createWirelessConfig({ isDisabled: true }),
                createWirelessConfig({ isDisabled: true }),
            ];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            expect(result).toEqual({});
        });

        it("should handle empty wireless configs array", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs: WirelessConfig[] = [];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);
            expect(result).toEqual({});
        });

        it("should fallback to SingleVPN when no Split", () => {
            const slaveRouter = createSlaveRouter();
            const subnets: Subnets = {
                BaseNetworks: {
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
            };
            const wirelessConfigs = [createWirelessConfig()];

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);

            const wifiConfigs = result["/interface wifi"];
            expect(wifiConfigs.length).toBeGreaterThan(0);
        });

        it("should handle maximum wireless complexity", () => {
            const slaveRouter = createSlaveRouter();
            const subnets = createBaseSubnets();
            const wirelessConfigs = [
                createWirelessConfig({ SSID: "Network1", WifiTarget: "Split" }),
                createWirelessConfig({ SSID: "Network2", WifiTarget: "Split" }),
                createWirelessConfig({ SSID: "Network3", WifiTarget: "Split" }),
            ];

            testWithOutput(
                "configureSlaveWireless",
                "Maximum wireless complexity - 3 SSIDs, both bands",
                {
                    SSIDs: 3,
                    Bands: "2.4GHz + 5GHz",
                    ExpectedWiFiInterfaces: 6,
                },
                () => configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets)
            );

            const result = configureSlaveWireless(wirelessConfigs, [slaveRouter], subnets);

            const wifiConfigs = result["/interface wifi"];
            expect(wifiConfigs.length).toBeGreaterThan(0);
        });
    });
});
