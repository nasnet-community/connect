import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { IPv6, EthernetBridgePorts, LANCG } from "./LANCG";
import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { EthernetInterfaceConfig } from "~/components/Star/StarContext/LANType";
import type { RouterModeType } from "~/components/Star/StarContext/ChooseType";
import type { Networks } from "~/components/Star/StarContext/Utils/Networks";
import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";

describe("LANCG Module Tests", () => {
    // Mock Networks configuration for testing
    const mockNetworksAllEnabled: Networks = {
        BaseNetworks: {
            Split: true,
            Domestic: true,
            Foreign: true,
            VPN: true,
        },
    };

    const mockNetworksVPNOnly: Networks = {
        BaseNetworks: {
            Split: false,
            Domestic: false,
            Foreign: false,
            VPN: true,
        },
    };

    const mockNetworksWithForeign: Networks = {
        BaseNetworks: {
            Split: false,
            Domestic: false,
            Foreign: true,
            VPN: false,
        },
        ForeignNetworks: ["Game", "Streaming"],
    };

    const mockNetworksEmpty: Networks = {
        BaseNetworks: {
            Split: false,
            Domestic: false,
            Foreign: false,
            VPN: false,
        },
    };

    // Spy on console.warn for fallback testing
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });

    describe("IPv6 Function", () => {
        it("should generate IPv6 disable configuration", () => {
            testWithOutput(
                "IPv6",
                "Disable IPv6 and add firewall rules",
                {},
                () => IPv6(),
            );

            const result = IPv6();
            validateRouterConfig(result, [
                "/ipv6 settings",
                "/ipv6 firewall filter",
            ]);
        });
    });

    describe("EthernetBridgePorts Function", () => {
        it("should generate bridge port configuration for single interface", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                {
                    name: "ether2",
                    bridge: "VPN",
                },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "Bridge port for single ethernet interface",
                { etherConfigs, networks: mockNetworksVPNOnly },
                () => EthernetBridgePorts(etherConfigs, mockNetworksVPNOnly),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksVPNOnly);
            validateRouterConfig(result, ["/interface bridge port"]);
        });

        it("should generate bridge port configuration for multiple interfaces", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                { name: "ether2", bridge: "VPN" },
                { name: "ether3", bridge: "Domestic" },
                { name: "ether4", bridge: "Foreign" },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "Bridge ports for multiple ethernet interfaces",
                { etherConfigs, networks: mockNetworksAllEnabled },
                () => EthernetBridgePorts(etherConfigs, mockNetworksAllEnabled),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksAllEnabled);
            validateRouterConfig(result, ["/interface bridge port"]);
        });

        it("should handle empty ethernet interface array", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [];

            testWithOutput(
                "EthernetBridgePorts",
                "Empty ethernet interface array",
                { etherConfigs, networks: mockNetworksEmpty },
                () => EthernetBridgePorts(etherConfigs, mockNetworksEmpty),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksEmpty);
            // For empty array, we still have the section but with no content
            validateRouterConfig(result);
            expect(result["/interface bridge port"]).toBeDefined();
            expect(result["/interface bridge port"]).toHaveLength(0);
        });

        it("should map network names to correct bridge names with BaseNetworks", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                { name: "ether2", bridge: "VPN" },
                { name: "ether3", bridge: "Domestic" },
                { name: "ether4", bridge: "Foreign" },
                { name: "ether5", bridge: "Split" },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "Map all BaseNetworks to correct bridge names",
                { etherConfigs, networks: mockNetworksAllEnabled },
                () => EthernetBridgePorts(etherConfigs, mockNetworksAllEnabled),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksAllEnabled);
            validateRouterConfig(result, ["/interface bridge port"]);
        });

        it("should map ForeignNetworks array to bridge names", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                { name: "ether2", bridge: "Game" },
                { name: "ether3", bridge: "Streaming" },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "Map ForeignNetworks array to bridge names",
                { etherConfigs, networks: mockNetworksWithForeign },
                () => EthernetBridgePorts(etherConfigs, mockNetworksWithForeign),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksWithForeign);
            validateRouterConfig(result, ["/interface bridge port"]);
        });

        it("should use fallback bridge name when network not found", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                { name: "ether2", bridge: "NonExistentNetwork" },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "Fallback to LANBridge prefix when network not found",
                { etherConfigs, networks: mockNetworksEmpty },
                () => EthernetBridgePorts(etherConfigs, mockNetworksEmpty),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksEmpty);
            validateRouterConfig(result, ["/interface bridge port"]);
        });

        it("should call console.warn when network mapping fails", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                { name: "ether2", bridge: "UnknownNetwork" },
            ];

            EthernetBridgePorts(etherConfigs, mockNetworksEmpty);

            // Verify console.warn was called with the expected message
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining('Network "UnknownNetwork" not found')
            );
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining("ether2")
            );
        });
    });

    describe("LANCG Function", () => {
        it("should generate complete LAN configuration", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "both",
                    RouterMode: "AP Mode",
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: true, Foreign: true, VPN: true }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "VPN",
                        },
                        {
                            name: "ether3",
                            bridge: "Domestic",
                        },
                        {
                            name: "ether4",
                            bridge: "Foreign",
                        },
                    ],
                    VPNServer: {
                        Users: [
                            {
                                Username: "user1",
                                Password: "pass1",
                                VPNType: ["Wireguard"],
                            },
                        ],
                        WireguardServers: [
                            {
                                Interface: {
                                    Name: "wireguard-server",
                                    PrivateKey: "privatekey123",
                                    InterfaceAddress: "192.168.170.1/24",
                                    ListenPort: 13231,
                                },
                                Peers: [],
                            },
                        ],
                    },
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Complete LAN configuration with all components",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should generate minimal LAN configuration", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "easy",
                    Firmware: "MikroTik",
                    WANLinkType: "foreign",
                    RouterMode: "AP Mode",
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: false, Foreign: false, VPN: true }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "VPN",
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Minimal LAN configuration",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle LAN configuration without ethernet interfaces", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "easy",
                    Firmware: "MikroTik",
                    WANLinkType: "foreign",
                    RouterMode: "AP Mode",
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: false, Foreign: false, VPN: false }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {},
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "LAN configuration without ethernet interfaces",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle LAN configuration with only VPN server", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "both",
                    RouterMode: "AP Mode" as RouterModeType,
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: false, Foreign: false, VPN: true }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    VPNServer: {
                        Users: [
                            {
                                Username: "vpnuser1",
                                Password: "vpnpass1",
                                VPNType: ["OpenVPN"],
                            },
                            {
                                Username: "vpnuser2",
                                Password: "vpnpass2",
                                VPNType: ["Wireguard"],
                            },
                        ],
                        OpenVpnServer: [
                            {
                                name: "openvpn-server",
                                enabled: true,
                                Port: 1194,
                                Protocol: "udp",
                                Mode: "ip",
                                Encryption: {
                                    Auth: ["sha256"],
                                    Cipher: ["aes256-cbc"],
                                },
                                IPV6: {},
                                Certificate: {
                                    Certificate: "server-cert",
                                },
                                Address: {
                                    AddressPool: "ovpn-pool",
                                },
                            },
                        ],
                        WireguardServers: [
                            {
                                Interface: {
                                    Name: "wireguard-main",
                                    PrivateKey: "wgprivatekey456",
                                    InterfaceAddress: "192.168.180.1/24",
                                    ListenPort: 51820,
                                },
                                Peers: [],
                            },
                        ],
                    },
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "LAN configuration with only VPN server",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle complex LAN configuration with tunnels", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "both",
                    RouterMode: "AP Mode" as RouterModeType,
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: false, Foreign: false, VPN: true }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "VPN",
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Complex LAN configuration with tunnels and enterprise wireless",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });
    });

    describe("Edge Cases and Error Handling", () => {
        it("should handle empty LAN configuration", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "easy",
                    Firmware: "MikroTik",
                    WANLinkType: "foreign",
                    RouterMode: "AP Mode",
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: false, Foreign: false, VPN: false }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {},
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Empty LAN configuration",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle ethernet interface with incomplete VLAN config", () => {
            const etherConfigs: EthernetInterfaceConfig[] = [
                {
                    name: "ether5",
                    bridge: "VPN",
                },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "Ethernet interface with incomplete VLAN configuration",
                { etherConfigs, networks: mockNetworksVPNOnly },
                () => EthernetBridgePorts(etherConfigs, mockNetworksVPNOnly),
            );

            const result = EthernetBridgePorts(etherConfigs, mockNetworksVPNOnly);
            validateRouterConfig(result, ["/interface bridge port"]);
        });

        it("should handle LAN with mixed enabled/disabled components", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "both",
                    RouterMode: "AP Mode" as RouterModeType,
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: true, Foreign: false, VPN: true }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "VPN",
                        },
                        {
                            name: "ether3",
                            bridge: "Domestic",
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "LAN with mixed enabled/disabled components",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle Networks with all BaseNetworks disabled", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "easy",
                    Firmware: "MikroTik",
                    WANLinkType: "foreign",
                    RouterMode: "AP Mode",
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: false, Foreign: false, VPN: false }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "CustomNetwork",
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Networks with all BaseNetworks disabled (fallback scenario)",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle Networks with ForeignNetworks array", () => {
            const networksWithArrays: Networks = {
                BaseNetworks: {
                    Split: false,
                    Domestic: false,
                    Foreign: true,
                    VPN: false,
                },
                ForeignNetworks: ["Game", "Streaming", "Work"],
            };

            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "foreign",
                    RouterMode: "AP Mode" as RouterModeType,
                    RouterModels: [],
                    Networks: networksWithArrays,
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "Game",
                        },
                        {
                            name: "ether3",
                            bridge: "Streaming",
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Networks with ForeignNetworks array configuration",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle Networks with VPNClientNetworks", () => {
            const networksWithVPNClient: Networks = {
                BaseNetworks: {
                    Split: false,
                    Domestic: false,
                    Foreign: false,
                    VPN: true,
                },
                VPNClientNetworks: {
                    Wireguard: ["WG-Server1", "WG-Server2"],
                    OpenVPN: ["OpenVPN-Main"],
                },
            };

            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "both",
                    RouterMode: "AP Mode" as RouterModeType,
                    RouterModels: [],
                    Networks: networksWithVPNClient,
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "WG-Server1",
                        },
                        {
                            name: "ether3",
                            bridge: "OpenVPN-Main",
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Networks with VPNClientNetworks configuration",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);
        });

        it("should handle mismatched network configuration (interface bridge not in Networks)", () => {
            const testState: StarState = {
                Choose: {
                    Mode: "advance",
                    Firmware: "MikroTik",
                    WANLinkType: "both",
                    RouterMode: "AP Mode" as RouterModeType,
                    RouterModels: [],
                    Networks: {
                        BaseNetworks: { Split: false, Domestic: true, Foreign: false, VPN: false }
                    }
                },
                WAN: {
                    WANLink: {
                        Foreign: {
                            WANConfigs: [
                                {
                                    name: "Foreign-WAN",
                                    InterfaceConfig: {
                                        InterfaceName: "ether1",
                                    },
                                },
                            ],
                        },
                    },
                    VPNClient: {},
                },
                LAN: {
                    Interface: [
                        {
                            name: "ether2",
                            bridge: "Domestic",  // This exists in Networks
                        },
                        {
                            name: "ether3",
                            bridge: "VPN",  // This does NOT exist in Networks (VPN is disabled)
                        },
                    ],
                },
                ExtraConfig: {
                    RUI: {
                        Timezone: "UTC",
                        IPAddressUpdate: {
                            interval: "",
                            time: "",
                        },
                    },
                },
                ShowConfig: {},
            };

            testWithOutput(
                "LANCG",
                "Mismatched network configuration (should trigger fallback)",
                { state: testState },
                () => LANCG(testState),
            );

            const result = LANCG(testState);
            validateRouterConfig(result);

            // Verify console.warn was called for the mismatched network
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining('Network "VPN" not found')
            );
        });

        it("should handle EthernetBridgePorts with DomesticNetworks array", () => {
            const networksWithDomestic: Networks = {
                BaseNetworks: {
                    Split: false,
                    Domestic: true,
                    Foreign: false,
                    VPN: false,
                },
                DomesticNetworks: ["Office", "IoT", "Guest"],
            };

            const etherConfigs: EthernetInterfaceConfig[] = [
                { name: "ether2", bridge: "Office" },
                { name: "ether3", bridge: "IoT" },
                { name: "ether4", bridge: "Guest" },
            ];

            testWithOutput(
                "EthernetBridgePorts",
                "DomesticNetworks array mapping",
                { etherConfigs, networks: networksWithDomestic },
                () => EthernetBridgePorts(etherConfigs, networksWithDomestic),
            );

            const result = EthernetBridgePorts(etherConfigs, networksWithDomestic);
            validateRouterConfig(result, ["/interface bridge port"]);
        });
    });
});
