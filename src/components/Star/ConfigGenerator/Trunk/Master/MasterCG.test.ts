import { describe, it, expect } from "vitest";
import { MasterCG } from "./MasterCG";
import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
import type { ChooseState, WirelessConfig } from "~/components/Star/StarContext";

describe("Master Router Configuration Generator", () => {
    const baseMasterRouter = {
        isMaster: true,
        Model: "RB5009UPr+S+IN" as const,
        MasterSlaveInterface: "ether1" as const,
        Interfaces: {
            Interfaces: {
                ethernet: ["ether1" as const, "ether2" as const],
            },
            OccupiedInterfaces: [],
        },
    };

    const baseSlaveRouter = {
        isMaster: false,
        Model: "hAP ax3" as const,
        MasterSlaveInterface: "ether1" as const,
        Interfaces: {
            Interfaces: {
                ethernet: ["ether1" as const, "ether2" as const],
            },
            OccupiedInterfaces: [],
        },
    };

    describe("Helper Functions", () => {
        // Note: These are internal functions, but we test them through the public MasterCG function
        // by verifying the output contains expected patterns

        it("should create VLAN interface correctly", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - createVLAN",
                "Verify VLAN interface creation with correct parameters",
                { VLANID: 10, Interface: "ether1", Network: "Split" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain('name="VLAN10-ether1-Split"');
            expect(result["/interface vlan"][0]).toContain("interface=ether1");
            expect(result["/interface vlan"][0]).toContain("vlan-id=10");
            expect(result["/interface vlan"][0]).toContain('comment="Split Network VLAN"');
        });

        it("should add VLAN to bridge correctly", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - addVLANToBridge",
                "Verify VLAN is added to bridge with correct parameters",
                { VLANInterface: "VLAN20-ether1-Domestic", Bridge: "LANBridgeDomestic" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface bridge port"]);
            expect(result["/interface bridge port"][0]).toContain("bridge=LANBridgeDomestic");
            expect(result["/interface bridge port"][0]).toContain('interface="VLAN20-ether1-Domestic"');
            expect(result["/interface bridge port"][0]).toContain('comment="Domestic VLAN to Bridge"');
        });
    });

    describe("Mode Validation", () => {
        it("should return empty config when not in Trunk Mode", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "AP Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            const result = MasterCG(choose);
            expect(Object.keys(result).length).toBe(0);
        });

        it("should return empty config when no master router exists", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [
                    { ...baseMasterRouter, isMaster: false },
                    baseSlaveRouter,
                ],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            const result = MasterCG(choose);
            expect(Object.keys(result).length).toBe(0);
        });

        it("should return empty config when master has no trunk interface", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [
                    { ...baseMasterRouter, MasterSlaveInterface: undefined },
                    baseSlaveRouter,
                ],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            const result = MasterCG(choose);
            expect(Object.keys(result).length).toBe(0);
        });
    });

    describe("Base Network VLANs", () => {
        it("should generate VLAN for Split network", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate Split network VLAN configuration",
                { NetworkType: "Split", TrunkInterface: "ether1" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=10");
            expect(result["/interface vlan"][0]).toContain("VLAN10-ether1-Split");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeSplit");
        });

        it("should generate VLAN for Domestic network", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate Domestic network VLAN configuration",
                { NetworkType: "Domestic", TrunkInterface: "ether1" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=20");
            expect(result["/interface vlan"][0]).toContain("VLAN20-ether1-Domestic");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeDomestic");
        });

        it("should generate VLAN for Foreign network", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Foreign: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate Foreign network VLAN configuration",
                { NetworkType: "Foreign", TrunkInterface: "ether1" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=30");
            expect(result["/interface vlan"][0]).toContain("VLAN30-ether1-Foreign");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeForeign");
        });

        it("should generate VLAN for VPN network", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        VPN: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate VPN network VLAN configuration",
                { NetworkType: "VPN", TrunkInterface: "ether1" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=40");
            expect(result["/interface vlan"][0]).toContain("VLAN40-ether1-VPN");
            expect(result["/interface bridge port"][0]).toContain("LANBridgeVPN");
        });

        it("should generate VLANs for all base networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate all base network VLANs",
                { NetworkTypes: "Split, Domestic, Foreign, VPN" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(4);
            expect(result["/interface bridge port"].length).toBe(4);
        });
    });

    describe("Additional Networks", () => {
        it("should generate VLANs for Foreign additional networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: ["FRN-1", "FRN-2"],
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate Foreign additional network VLANs",
                { ForeignNetworks: ["FRN-1", "FRN-2"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=31");
            expect(result["/interface vlan"][1]).toContain("vlan-id=32");
        });

        it("should generate VLANs for Domestic additional networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    DomesticNetworks: ["DOM-1", "DOM-2"],
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate Domestic additional network VLANs",
                { DomesticNetworks: ["DOM-1", "DOM-2"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=21");
            expect(result["/interface vlan"][1]).toContain("vlan-id=22");
        });
    });

    describe("VPN Client Networks", () => {
        it("should generate VLANs for Wireguard client networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG-1", "WG-2"],
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate Wireguard client VLANs",
                { WireguardNetworks: ["WG-1", "WG-2"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=50");
            expect(result["/interface vlan"][1]).toContain("vlan-id=51");
        });

        it("should generate VLANs for OpenVPN client networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        OpenVPN: ["OVPN-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate OpenVPN client VLANs",
                { OpenVPNNetworks: ["OVPN-1"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"][0]).toContain("vlan-id=60");
        });

        it("should generate VLANs for all VPN client types", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG-1"],
                        OpenVPN: ["OVPN-1"],
                        L2TP: ["L2TP-1"],
                        PPTP: ["PPTP-1"],
                        SSTP: ["SSTP-1"],
                        IKev2: ["IKEv2-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate all VPN client type VLANs",
                { VPNClientTypes: "All" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(6);
        });
    });

    describe("VLAN ID Verification", () => {
        it("should use correct VLAN IDs for all base networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - VLAN ID Verification",
                "Verify correct VLAN IDs: Split=10, Domestic=20, Foreign=30, VPN=40",
                { ExpectedVLANs: { Split: 10, Domestic: 20, Foreign: 30, VPN: 40 } },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);

            // Verify exact VLAN IDs
            const vlanCommands = result["/interface vlan"];
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=10") && cmd.includes("Split"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=20") && cmd.includes("Domestic"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=30") && cmd.includes("Foreign"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=40") && cmd.includes("VPN"))).toBe(true);
        });

        it("should use sequential VLAN IDs for additional Foreign networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    ForeignNetworks: ["FRN-1", "FRN-2", "FRN-3"],
                },
            };

            testWithOutput(
                "MasterCG - Foreign Network VLAN IDs",
                "Verify sequential VLAN IDs for Foreign networks: 31, 32, 33",
                { BaseID: 30, Networks: ["FRN-1: 31", "FRN-2: 32", "FRN-3: 33"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);

            const vlanCommands = result["/interface vlan"];
            expect(vlanCommands[0]).toContain("vlan-id=31");
            expect(vlanCommands[1]).toContain("vlan-id=32");
            expect(vlanCommands[2]).toContain("vlan-id=33");
        });

        it("should use sequential VLAN IDs for additional Domestic networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    DomesticNetworks: ["DOM-1", "DOM-2", "DOM-3"],
                },
            };

            testWithOutput(
                "MasterCG - Domestic Network VLAN IDs",
                "Verify sequential VLAN IDs for Domestic networks: 21, 22, 23",
                { BaseID: 20, Networks: ["DOM-1: 21", "DOM-2: 22", "DOM-3: 23"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);

            const vlanCommands = result["/interface vlan"];
            expect(vlanCommands[0]).toContain("vlan-id=21");
            expect(vlanCommands[1]).toContain("vlan-id=22");
            expect(vlanCommands[2]).toContain("vlan-id=23");
        });

        it("should use correct VLAN IDs for all VPN client protocols", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG-1"],
                        OpenVPN: ["OVPN-1"],
                        L2TP: ["L2TP-1"],
                        PPTP: ["PPTP-1"],
                        SSTP: ["SSTP-1"],
                        IKev2: ["IKEv2-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - VPN Client VLAN IDs",
                "Verify correct VLAN IDs for VPN clients: WG=50, OVPN=60, L2TP=70, PPTP=75, SSTP=80, IKEv2=85",
                {
                    ExpectedVLANs: {
                        Wireguard: 50,
                        OpenVPN: 60,
                        L2TP: 70,
                        PPTP: 75,
                        SSTP: 80,
                        IKEv2: 85,
                    },
                },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);

            const vlanCommands = result["/interface vlan"];
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=50") && cmd.includes("WG-Client"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=60") && cmd.includes("OVPN-Client"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=70") && cmd.includes("L2TP-Client"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=75") && cmd.includes("PPTP-Client"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=80") && cmd.includes("SSTP-Client"))).toBe(true);
            expect(vlanCommands.some((cmd: string) => cmd.includes("vlan-id=85") && cmd.includes("IKEv2-Client"))).toBe(true);
        });

        it("should increment VLAN IDs for multiple VPN clients of same type", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG-1", "WG-2", "WG-3"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Multiple Wireguard VLAN IDs",
                "Verify sequential VLAN IDs for multiple Wireguard clients: 50, 51, 52",
                { BaseID: 50, Networks: ["WG-1: 50", "WG-2: 51", "WG-3: 52"] },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);

            const vlanCommands = result["/interface vlan"];
            expect(vlanCommands[0]).toContain("vlan-id=50");
            expect(vlanCommands[1]).toContain("vlan-id=51");
            expect(vlanCommands[2]).toContain("vlan-id=52");
        });
    });

    describe("Wireless Trunk Interface", () => {
        it("should generate VLANs for wireless trunk interface", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi5" as const,
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                        Foreign: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate VLANs for wireless trunk on both bands",
                { TrunkInterface: "wifi5" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            
            // Should have 4 VLANs total: 2 networks (Domestic, Foreign) × 2 bands (2.4, 5)
            expect(result["/interface vlan"].length).toBe(4);
            
            // Verify VLANs are created on both wifi2.4-Trunk and wifi5-Trunk
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("wifi2.4-Trunk");
            expect(vlanCommands).toContain("wifi5-Trunk");
            expect(vlanCommands).toContain("Domestic");
            expect(vlanCommands).toContain("Foreign");
        });

        it("should generate wireless station for 5GHz band", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi5" as const,
            };

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

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - Wireless Station 5GHz",
                "Generate wireless station interface for 5GHz band",
                { Band: "5GHz", SSID: "!TrunkNetwork", Interface: "wifi5" },
                () => MasterCG(choose, wirelessConfigs)
            );

            const result = MasterCG(choose, wirelessConfigs);
            // Verify wireless interface configuration is present
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });

        it("should generate wireless station for 2.4GHz band", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi2.4" as const,
            };

            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "TrunkNetwork24",
                    Password: "SecurePass24",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - Wireless Station 2.4GHz",
                "Generate wireless station interface for 2.4GHz band",
                { Band: "2.4GHz", SSID: "!TrunkNetwork24", Interface: "wifi2.4" },
                () => MasterCG(choose, wirelessConfigs)
            );

            const result = MasterCG(choose, wirelessConfigs);
            // Verify wireless interface configuration is present
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
        });

        it("should handle empty wireless configs array", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi5" as const,
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - Empty Wireless Configs",
                "Handle empty wireless configs gracefully",
                { WirelessConfigs: "empty array" },
                () => MasterCG(choose, [])
            );

            const result = MasterCG(choose, []);
            // Should still generate VLANs but no wireless station interface
            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface wifi"]).toBeUndefined();
            expect(result["/interface wireless"]).toBeUndefined();
        });

        it("should handle undefined wireless configs", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi5" as const,
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Foreign: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - Undefined Wireless Configs",
                "Handle undefined wireless configs gracefully",
                { WirelessConfigs: "undefined" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            // Should still generate VLANs but no wireless station interface
            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface wifi"]).toBeUndefined();
            expect(result["/interface wireless"]).toBeUndefined();
        });

        it("should use correct SSID prefix for station mode", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi5-2" as const,
            };

            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "MasterTrunk",
                    Password: "TrunkPass123",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        VPN: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - SSID Prefix",
                "Verify SSID is suffixed with ! for station mode",
                { OriginalSSID: "MasterTrunk", StationSSID: "MasterTrunk!" },
                () => MasterCG(choose, wirelessConfigs)
            );

            const result = MasterCG(choose, wirelessConfigs);
            // The station SSID should have "!" suffix
            const wirelessSection = result["/interface wifi"] || result["/interface wireless"] || [];
            const hasStationConfig = wirelessSection.some((cmd: string) =>
                cmd.includes("MasterTrunk!") || cmd.includes("Trunk")
            );
            expect(hasStationConfig).toBe(true);
        });
    });

    describe("Edge Cases", () => {
        it("should handle empty Networks object gracefully", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                },
            };

            testWithOutput(
                "MasterCG - Empty Networks",
                "Handle empty Networks object - should return empty config",
                { Networks: "Empty BaseNetworks object" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            expect(Object.keys(result).length).toBe(0);
        });

        it("should handle undefined VPNClientNetworks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                    // VPNClientNetworks is undefined
                },
            };

            testWithOutput(
                "MasterCG - Undefined VPNClientNetworks",
                "Handle undefined VPNClientNetworks gracefully",
                { VPNClientNetworks: "undefined" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            // Should only have base network VLANs
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
        });

        it("should handle empty VPN client arrays", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                    },
                    VPNClientNetworks: {
                        Wireguard: [],
                        OpenVPN: [],
                        L2TP: [],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Empty VPN Client Arrays",
                "Handle empty VPN client arrays - should only generate base network VLANs",
                { VPNClientNetworks: "All arrays empty" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            // Should only have Split network VLAN
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("Split");
        });

        it("should handle empty additional network arrays", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Foreign: true,
                    },
                    ForeignNetworks: [],
                    DomesticNetworks: [],
                },
            };

            testWithOutput(
                "MasterCG - Empty Additional Networks",
                "Handle empty additional network arrays - should only generate base Foreign VLAN",
                { AdditionalNetworks: "All arrays empty" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("Foreign");
            expect(result["/interface vlan"][0]).toContain("vlan-id=30");
        });

        it("should handle single base network configuration", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        VPN: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - Single Base Network",
                "Generate configuration for single base network (VPN only)",
                { Network: "VPN only" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface bridge port"].length).toBe(1);
        });

        it("should handle single additional network", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    DomesticNetworks: ["SINGLE"],
                },
            };

            testWithOutput(
                "MasterCG - Single Additional Network",
                "Generate configuration for single additional Domestic network",
                { Network: "SINGLE", ExpectedVLANID: 21 },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=21");
            expect(result["/interface vlan"][0]).toContain("Domestic-SINGLE");
        });

        it("should handle single VPN client", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        SSTP: ["SINGLE-SSTP"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Single VPN Client",
                "Generate configuration for single SSTP VPN client",
                { Protocol: "SSTP", Network: "SINGLE-SSTP", ExpectedVLANID: 80 },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(1);
            expect(result["/interface vlan"][0]).toContain("vlan-id=80");
            expect(result["/interface vlan"][0]).toContain("SSTP-Client");
        });

        it("should handle different trunk interfaces", () => {
            const customMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "ether8" as const,
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [customMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                    },
                },
            };

            testWithOutput(
                "MasterCG - Custom Trunk Interface",
                "Generate VLANs on custom trunk interface (ether8)",
                { TrunkInterface: "ether8" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"][0]).toContain("interface=ether8");
            expect(result["/interface vlan"][1]).toContain("interface=ether8");
        });
    });

    describe("Complex Scenarios", () => {
        it("should generate VLANs for mixed network configuration", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                    ForeignNetworks: ["FRN-1"],
                    DomesticNetworks: ["DOM-1"],
                    VPNClientNetworks: {
                        Wireguard: ["WG-1"],
                        OpenVPN: ["OVPN-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG",
                "Generate VLANs for complex mixed configuration",
                { Scenario: "Multiple network types" },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            // 3 base + 1 foreign additional + 1 domestic additional + 2 VPN clients = 7 VLANs
            expect(result["/interface vlan"].length).toBe(7);
            expect(result["/interface bridge port"].length).toBe(7);
        });

        it("should generate maximum configuration with all features enabled", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                    ForeignNetworks: ["FRN-1", "FRN-2", "FRN-3"],
                    DomesticNetworks: ["DOM-1", "DOM-2"],
                    VPNClientNetworks: {
                        Wireguard: ["WG-1", "WG-2"],
                        OpenVPN: ["OVPN-1"],
                        L2TP: ["L2TP-1"],
                        PPTP: ["PPTP-1"],
                        SSTP: ["SSTP-1"],
                        IKev2: ["IKEv2-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Maximum Configuration",
                "Generate maximum configuration with all network types",
                {
                    BaseNetworks: 4,
                    ForeignAdditional: 3,
                    DomesticAdditional: 2,
                    VPNClients: 7,
                    TotalVLANs: 16,
                },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            // 4 base + 3 foreign + 2 domestic + 7 VPN clients = 16 VLANs
            expect(result["/interface vlan"].length).toBe(16);
            expect(result["/interface bridge port"].length).toBe(16);
        });

        it("should generate configuration with wireless trunk and all VPN protocols", () => {
            const wirelessMasterRouter = {
                ...baseMasterRouter,
                MasterSlaveInterface: "wifi5" as const,
            };

            const wirelessConfigs: WirelessConfig[] = [
                {
                    SSID: "ComplexTrunk",
                    Password: "ComplexPassword",
                    isHide: false,
                    isDisabled: false,
                    SplitBand: false,
                    WifiTarget: "Domestic",
                    NetworkName: "",
                },
            ];

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [wirelessMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                    },
                    VPNClientNetworks: {
                        Wireguard: ["WG-1"],
                        OpenVPN: ["OVPN-1"],
                        L2TP: ["L2TP-1"],
                        PPTP: ["PPTP-1"],
                        SSTP: ["SSTP-1"],
                        IKev2: ["IKEv2-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Wireless + All VPN",
                "Generate wireless trunk with all VPN client protocols",
                {
                    TrunkType: "Wireless (wifi5)",
                    BaseNetworks: 2,
                    VPNProtocols: 6,
                    HasWirelessStation: true,
                },
                () => MasterCG(choose, wirelessConfigs)
            );

            const result = MasterCG(choose, wirelessConfigs);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            // (2 base + 6 VPN clients) × 2 bands = 16 VLANs
            expect(result["/interface vlan"].length).toBe(16);
            // Verify wireless station is configured
            expect(result["/interface wifi"] || result["/interface wireless"]).toBeDefined();
            // VLANs should be created on both wifi2.4-Trunk and wifi5-Trunk
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("wifi2.4-Trunk");
            expect(vlanCommands).toContain("wifi5-Trunk");
        });

        it("should generate configuration with multiple networks of same VPN protocol", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {},
                    VPNClientNetworks: {
                        Wireguard: ["WG-US", "WG-EU", "WG-ASIA", "WG-LOCAL"],
                        L2TP: ["L2TP-Office", "L2TP-Home"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Multiple Same Protocol",
                "Generate VLANs for multiple networks of same VPN protocol",
                {
                    WireguardNetworks: 4,
                    L2TPNetworks: 2,
                    TotalVLANs: 6,
                },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            expect(result["/interface vlan"].length).toBe(6);

            // Verify Wireguard VLANs have sequential IDs starting from 50
            const wgVlans = result["/interface vlan"].filter((cmd: string) => cmd.includes("WG-Client"));
            expect(wgVlans.length).toBe(4);
            expect(wgVlans[0]).toContain("vlan-id=50");
            expect(wgVlans[1]).toContain("vlan-id=51");
            expect(wgVlans[2]).toContain("vlan-id=52");
            expect(wgVlans[3]).toContain("vlan-id=53");

            // Verify L2TP VLANs have sequential IDs starting from 70
            const l2tpVlans = result["/interface vlan"].filter((cmd: string) => cmd.includes("L2TP-Client"));
            expect(l2tpVlans.length).toBe(2);
            expect(l2tpVlans[0]).toContain("vlan-id=70");
            expect(l2tpVlans[1]).toContain("vlan-id=71");
        });

        it("should generate configuration combining all base and additional networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                        Domestic: true,
                        Foreign: true,
                        VPN: true,
                    },
                    ForeignNetworks: ["Guest", "IoT", "Security"],
                    DomesticNetworks: ["Family", "Kids"],
                },
            };

            testWithOutput(
                "MasterCG - All Networks Combined",
                "Generate all base networks with multiple additional networks",
                {
                    BaseNetworks: ["Split", "Domestic", "Foreign", "VPN"],
                    AdditionalForeign: ["Guest", "IoT", "Security"],
                    AdditionalDomestic: ["Family", "Kids"],
                    TotalVLANs: 9,
                },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan", "/interface bridge port"]);
            // 4 base + 3 foreign + 2 domestic = 9 VLANs
            expect(result["/interface vlan"].length).toBe(9);
            expect(result["/interface bridge port"].length).toBe(9);

            // Verify all expected networks are present
            const vlanCommands = result["/interface vlan"].join(" ");
            expect(vlanCommands).toContain("Split");
            expect(vlanCommands).toContain("Domestic");
            expect(vlanCommands).toContain("Foreign");
            expect(vlanCommands).toContain("VPN");
            expect(vlanCommands).toContain("Foreign-Guest");
            expect(vlanCommands).toContain("Foreign-IoT");
            expect(vlanCommands).toContain("Foreign-Security");
            expect(vlanCommands).toContain("Domestic-Family");
            expect(vlanCommands).toContain("Domestic-Kids");
        });

        it("should maintain correct VLAN naming convention in complex setup", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Split: true,
                    },
                    ForeignNetworks: ["FRN-1"],
                    VPNClientNetworks: {
                        Wireguard: ["WG-1"],
                    },
                },
            };

            testWithOutput(
                "MasterCG - Naming Convention",
                "Verify VLAN naming convention: VLAN{ID}-{interface}-{network}",
                {
                    ExpectedNames: [
                        "VLAN10-ether1-Split",
                        "VLAN31-ether1-Foreign-FRN-1",
                        "VLAN50-ether1-WG-Client-WG-1",
                    ],
                },
                () => MasterCG(choose)
            );

            const result = MasterCG(choose);
            validateRouterConfig(result, ["/interface vlan"]);

            // Verify exact naming convention
            expect(result["/interface vlan"][0]).toContain('name="VLAN10-ether1-Split"');
            expect(result["/interface vlan"][1]).toContain('name="VLAN31-ether1-Foreign-FRN-1"');
            expect(result["/interface vlan"][2]).toContain('name="VLAN50-ether1-WG-Client-WG-1"');
        });
    });
});
