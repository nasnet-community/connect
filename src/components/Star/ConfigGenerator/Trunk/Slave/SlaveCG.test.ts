import { describe, it, expect } from "vitest";
import { SlaveCG } from "./Slave";
import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
import type { ChooseState, WirelessConfig, Networks } from "~/components/Star/StarContext";

describe("Slave Router Configuration Generator", () => {
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
                ethernet: ["ether1" as const, "ether2" as const, "ether3" as const, "ether4" as const, "ether5" as const],
                wireless: ["wifi5" as const, "wifi2.4" as const],
            },
            OccupiedInterfaces: [],
        },
    };

    const baseNetworks: Networks = {
        BaseNetworks: {
            Split: true,
            Domestic: true,
            Foreign: true,
            VPN: true,
        },
    };

    const baseWirelessConfig: WirelessConfig = {
        SSID: "TestSSID",
        Password: "password123",
        isHide: false,
        isDisabled: false,
        SplitBand: false,
        WifiTarget: "Split",
        NetworkName: "",
    };

    describe("Mode Validation", () => {
        it("should return empty config when not in Trunk Mode", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "AP Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            expect(Object.keys(result).length).toBe(0);
        });

        it("should return empty config when no slave router exists", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [
                    baseMasterRouter,
                    { ...baseSlaveRouter, isMaster: true },
                ],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            expect(Object.keys(result).length).toBe(0);
        });

        it("should return empty config when slave has no trunk interface", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [
                    baseMasterRouter,
                    { ...baseSlaveRouter, MasterSlaveInterface: undefined },
                ],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            expect(Object.keys(result).length).toBe(0);
        });
    });

    describe("Bridge Configuration", () => {
        it("should create bridges for all base networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            testWithOutput(
                "SlaveCG",
                "Create bridges for all base networks",
                { NetworkTypes: "Split, Domestic, Foreign, VPN" },
                () => SlaveCG(choose, baseNetworks, [])
            );

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/interface bridge"]);
            expect(result["/interface bridge"].length).toBe(4);
            expect(result["/interface bridge"]).toContain("add name=LANBridgeSplit comment=\"Split\"");
            expect(result["/interface bridge"]).toContain("add name=LANBridgeDomestic comment=\"Domestic\"");
            expect(result["/interface bridge"]).toContain("add name=LANBridgeForeign comment=\"Foreign\"");
            expect(result["/interface bridge"]).toContain("add name=LANBridgeVPN comment=\"VPN\"");
        });
    });

    describe("VLAN Configuration", () => {
        it("should create VLANs for all base networks on trunk interface", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            testWithOutput(
                "SlaveCG",
                "Create VLANs on trunk interface",
                { TrunkInterface: "ether1" },
                () => SlaveCG(choose, baseNetworks, [])
            );

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/interface vlan"]);
            expect(result["/interface vlan"].length).toBe(4);
            expect(result["/interface vlan"][0]).toContain("vlan-id=10");
            expect(result["/interface vlan"][0]).toContain("interface=ether1");
            expect(result["/interface vlan"][1]).toContain("vlan-id=20");
            expect(result["/interface vlan"][2]).toContain("vlan-id=30");
            expect(result["/interface vlan"][3]).toContain("vlan-id=40");
        });

        it("should use correct VLAN naming convention", () => {
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

            const result = SlaveCG(choose, choose.Networks, []);
            expect(result["/interface vlan"][0]).toContain("name=vlan10-Split");
        });
    });

    describe("Bridge Port Configuration", () => {
        it("should add VLANs to bridges", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/interface bridge port"]);

            // Should have VLAN bridge ports + ethernet bridge ports
            const vlanPorts = result["/interface bridge port"].filter(p => p.includes("vlan"));
            expect(vlanPorts.length).toBe(4);
            expect(vlanPorts[0]).toContain("bridge=LANBridgeSplit");
            expect(vlanPorts[0]).toContain("interface=vlan10-Split");
        });

        it("should add ethernet interfaces to bridges", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            testWithOutput(
                "SlaveCG",
                "Add ethernet interfaces to bridges",
                { AvailableEthernets: "ether2-ether5" },
                () => SlaveCG(choose, baseNetworks, [])
            );

            const result = SlaveCG(choose, baseNetworks, []);

            // Should have ethernet ports (ether2-ether5, excluding trunk ether1)
            const ethernetPorts = result["/interface bridge port"].filter(p => p.includes("ether"));
            expect(ethernetPorts.length).toBe(4); // ether2, ether3, ether4, ether5
        });
    });

    describe("DHCP Client Configuration", () => {
        it("should create DHCP clients for all bridges", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            testWithOutput(
                "SlaveCG",
                "Create DHCP clients for all bridges",
                { Bridges: "Split, Domestic, Foreign, VPN" },
                () => SlaveCG(choose, baseNetworks, [])
            );

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/ip dhcp-client"]);
            expect(result["/ip dhcp-client"].length).toBe(4);
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeSplit");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeDomestic");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeForeign");
            expect(result["/ip dhcp-client"]).toContain("add interface=LANBridgeVPN");
        });
    });

    describe("System Configuration", () => {
        it("should include DNS configuration", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/ip dns"]);
            expect(result["/ip dns"]).toContain("set allow-remote-requests=yes");
        });

        it("should include system package update configuration", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/system package update"]);
            expect(result["/system package update"]).toContain("set channel=stable");
        });

        it("should include routerboard settings", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/system routerboard settings"]);
            expect(result["/system routerboard settings"]).toContain("set auto-upgrade=yes");
        });

        it("should include romon configuration", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const result = SlaveCG(choose, baseNetworks, []);
            validateRouterConfig(result, ["/tool romon"]);
            expect(result["/tool romon"]).toContain("set enabled=yes");
        });
    });

    describe("Wireless Configuration", () => {
        it("should configure WiFi interfaces when wireless configs provided", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const wirelessConfigs: WirelessConfig[] = [baseWirelessConfig];

            testWithOutput(
                "SlaveCG",
                "Configure WiFi with wireless configs",
                { WirelessConfigs: 1 },
                () => SlaveCG(choose, baseNetworks, wirelessConfigs)
            );

            const result = SlaveCG(choose, baseNetworks, wirelessConfigs);
            validateRouterConfig(result, ["/interface wifi", "/interface wifi security"]);
        });

        it("should configure multiple WiFi networks", () => {
            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: baseNetworks,
            };

            const wirelessConfigs: WirelessConfig[] = [
                { ...baseWirelessConfig, WifiTarget: "Split", NetworkName: "" },
                { ...baseWirelessConfig, WifiTarget: "Domestic", NetworkName: "" },
            ];

            const result = SlaveCG(choose, baseNetworks, wirelessConfigs);
            validateRouterConfig(result, ["/interface wifi"]);

            // Should have WiFi bridge ports
            const wifiBridgePorts = result["/interface bridge port"].filter(p => p.includes("wifi"));
            expect(wifiBridgePorts.length).toBeGreaterThan(0);
        });
    });

    describe("Additional Networks", () => {
        it("should create VLANs for additional Foreign networks", () => {
            const networks: Networks = {
                BaseNetworks: {},
                ForeignNetworks: ["FRN-1", "FRN-2"],
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: networks,
            };

            testWithOutput(
                "SlaveCG",
                "Create VLANs for additional Foreign networks",
                { ForeignNetworks: ["FRN-1", "FRN-2"] },
                () => SlaveCG(choose, networks, [])
            );

            const result = SlaveCG(choose, networks, []);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=31");
            expect(result["/interface vlan"][1]).toContain("vlan-id=32");
        });

        it("should create VLANs for additional Domestic networks", () => {
            const networks: Networks = {
                BaseNetworks: {},
                DomesticNetworks: ["DOM-1", "DOM-2"],
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: networks,
            };

            const result = SlaveCG(choose, networks, []);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=21");
            expect(result["/interface vlan"][1]).toContain("vlan-id=22");
        });
    });

    describe("VPN Client Networks", () => {
        it("should create VLANs for Wireguard client networks", () => {
            const networks: Networks = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: ["WG-1", "WG-2"],
                },
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: networks,
            };

            testWithOutput(
                "SlaveCG",
                "Create VLANs for Wireguard client networks",
                { WireguardNetworks: ["WG-1", "WG-2"] },
                () => SlaveCG(choose, networks, [])
            );

            const result = SlaveCG(choose, networks, []);
            expect(result["/interface vlan"].length).toBe(2);
            expect(result["/interface vlan"][0]).toContain("vlan-id=50");
            expect(result["/interface vlan"][1]).toContain("vlan-id=51");
        });

        it("should handle all VPN client types", () => {
            const networks: Networks = {
                BaseNetworks: {},
                VPNClientNetworks: {
                    Wireguard: ["WG-1"],
                    OpenVPN: ["OVPN-1"],
                    L2TP: ["L2TP-1"],
                    PPTP: ["PPTP-1"],
                    SSTP: ["SSTP-1"],
                    IKev2: ["IKEv2-1"],
                },
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: networks,
            };

            const result = SlaveCG(choose, networks, []);
            expect(result["/interface vlan"].length).toBe(6);
        });
    });

    describe("Complex Scenarios", () => {
        it("should generate complete configuration for mixed networks", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                    Domestic: true,
                },
                ForeignNetworks: ["FRN-1"],
                VPNClientNetworks: {
                    Wireguard: ["WG-1"],
                },
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                RouterModels: [baseMasterRouter, baseSlaveRouter],
                Networks: networks,
            };

            const wirelessConfigs: WirelessConfig[] = [
                { ...baseWirelessConfig, WifiTarget: "Split" },
            ];

            testWithOutput(
                "SlaveCG",
                "Complete configuration with mixed networks and WiFi",
                { Scenario: "Complex mixed configuration" },
                () => SlaveCG(choose, networks, wirelessConfigs)
            );

            const result = SlaveCG(choose, networks, wirelessConfigs);

            // Validate all major sections exist
            validateRouterConfig(result, [
                "/interface bridge",
                "/interface vlan",
                "/interface bridge port",
                "/ip dhcp-client",
                "/ip dns",
                "/system package update",
                "/system routerboard settings",
                "/tool romon",
            ]);

            // 2 base + 1 foreign + 1 VPN client = 4 networks
            expect(result["/interface bridge"].length).toBe(4);
            expect(result["/interface vlan"].length).toBe(4);
        });
    });

    describe("Wireless Trunk Interface", () => {
        it("should work with wireless trunk interface", () => {
            const wirelessSlaveRouter = {
                ...baseSlaveRouter,
                MasterSlaveInterface: "wifi5" as const,
            };

            const choose: ChooseState = {
                Mode: "easy" as const,
                Firmware: "MikroTik" as const,
                WANLinkType: "both" as const,
                RouterMode: "Trunk Mode" as const,
                TrunkInterfaceType: "wireless" as const,
                RouterModels: [baseMasterRouter, wirelessSlaveRouter],
                Networks: {
                    BaseNetworks: {
                        Domestic: true,
                    },
                },
            };

            testWithOutput(
                "SlaveCG",
                "Configuration with wireless trunk",
                { TrunkInterface: "wifi5" },
                () => SlaveCG(choose, choose.Networks, [])
            );

            const result = SlaveCG(choose, choose.Networks, []);
            expect(result["/interface vlan"][0]).toContain("interface=wifi5");
        });
    });
});
