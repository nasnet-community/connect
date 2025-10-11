import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    testWithGenericOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    generateConnectionConfig,
    generateInterfaceConfig,
    generateWANLinkConfig,
    generateWANLinksConfig,
    DFSingleLink,
    DFMultiLink,
} from "./WANInterface";
import type {
    WANLinkConfig,
    WANLinks,
    WANLink,
} from "../../../StarContext/Utils/WANLinkType";

describe("WANInterface Module", () => {
    describe("generateConnectionConfig", () => {
        it("should generate DHCP client configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
                ConnectionConfig: {
                    isDHCP: true,
                },
            };

            const result = testWithOutput(
                "generateConnectionConfig",
                "DHCP client configuration",
                {
                    wanLinkConfig,
                    Network: "Foreign",
                },
                () =>
                    generateConnectionConfig(
                        wanLinkConfig,
                        "Foreign",
                    ),
            );

            validateRouterConfig(result, ["/ip dhcp-client"]);
        });

        it("should generate PPPoE client configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
                ConnectionConfig: {
                    pppoe: {
                        username: "pppoeuser",
                        password: "pppoepass123",
                    },
                },
            };

            const result = testWithOutput(
                "generateConnectionConfig",
                "PPPoE client configuration",
                {
                    wanLinkConfig,
                    Network: "Foreign",
                },
                () =>
                    generateConnectionConfig(
                        wanLinkConfig,
                        "Foreign",
                    ),
            );

            validateRouterConfig(result, ["/interface pppoe-client"]);
        });

        it("should generate Static IP configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
                ConnectionConfig: {
                    static: {
                        ipAddress: "203.0.113.10",
                        subnet: "255.255.255.0",
                        gateway: "203.0.113.1",
                    },
                },
            };

            const result = testWithOutput(
                "generateConnectionConfig",
                "Static IP configuration",
                {
                    wanLinkConfig,
                    Network: "Foreign",
                },
                () =>
                    generateConnectionConfig(
                        wanLinkConfig,
                        "Foreign",
                    ),
            );

            validateRouterConfig(result, ["/ip address"]);
        });

        it("should generate LTE configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "LTE-1",
                InterfaceConfig: {
                    InterfaceName: "lte1",
                },
                ConnectionConfig: {
                    lteSettings: {
                        apn: "internet",
                    },
                },
            };

            const result = testWithOutput(
                "generateConnectionConfig",
                "LTE configuration",
                {
                    wanLinkConfig,
                    Network: "Foreign",
                },
                () =>
                    generateConnectionConfig(
                        wanLinkConfig,
                        "Foreign",
                    ),
            );

            validateRouterConfig(result, ["/interface lte", "/interface lte apn"]);
        });

        it("should generate combined DHCP and PPPoE configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
                ConnectionConfig: {
                    isDHCP: true,
                    pppoe: {
                        username: "user",
                        password: "pass",
                    },
                },
            };

            const result = testWithOutput(
                "generateConnectionConfig",
                "Combined DHCP and PPPoE configuration",
                {
                    wanLinkConfig,
                    Network: "Foreign",
                },
                () =>
                    generateConnectionConfig(
                        wanLinkConfig,
                        "Foreign",
                    ),
            );

            validateRouterConfig(result, [
                "/ip dhcp-client",
                "/interface pppoe-client",
            ]);
        });

        it("should handle empty connection config", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
                ConnectionConfig: {},
            };

            const result = testWithOutput(
                "generateConnectionConfig",
                "Empty connection config",
                {
                    wanLinkConfig,
                    Network: "Foreign",
                },
                () =>
                    generateConnectionConfig(
                        wanLinkConfig,
                        "Foreign",
                    ),
            );

            // Empty config should return empty RouterConfig
            validateRouterConfig(result, []);
        });
    });

    // Note: Interface naming logic (including auto-MACVLAN creation) is now tested
    // in WANUtils.test.ts via the GetWANInterface function

    describe("generateInterfaceConfig", () => {
        it("should generate basic ethernet MACVLAN configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "Basic ethernet with auto-MACVLAN",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface macvlan"]);
        });

        it("should generate MACVLAN configuration with custom MAC", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                    MacAddress: "AA:BB:CC:DD:EE:FF",
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "MACVLAN with custom MAC address",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface macvlan"]);
        });

        it("should generate VLAN configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                    VLANID: "100",
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "VLAN with auto-MACVLAN on top",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface macvlan"]);
        });

        it("should generate MACVLAN on VLAN configuration", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                    VLANID: "100",
                    MacAddress: "AA:BB:CC:DD:EE:FF",
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "MACVLAN on VLAN with custom MAC",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface vlan", "/interface macvlan"]);
        });

        it("should generate wireless station mode configuration for 2.4GHz", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "wifi2.4",
                    WirelessCredentials: {
                        SSID: "TestWiFi",
                        Password: "testpass123",
                    },
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "Wireless 2.4GHz station mode",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface wifi", "/interface macvlan"]);
        });

        it("should generate wireless station mode configuration for 5GHz", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "wifi5",
                    WirelessCredentials: {
                        SSID: "TestWiFi5G",
                        Password: "testpass456",
                    },
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "Wireless 5GHz station mode",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface wifi", "/interface macvlan"]);
        });

        it("should detect 2.4GHz band from interface name", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-WiFi24",
                InterfaceConfig: {
                    InterfaceName: "wifi2.4",
                    WirelessCredentials: {
                        SSID: "BandDetectionTest",
                        Password: "testpass",
                    },
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "Band detection from interface name (2.4GHz)",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            // Should detect 2.4GHz from interface name
            validateRouterConfig(result, ["/interface wifi", "/interface macvlan"]);
        });

        it("should handle wlan interface naming", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-WLAN",
                InterfaceConfig: {
                    InterfaceName: "wlan0",
                    WirelessCredentials: {
                        SSID: "WLANTest",
                        Password: "wlanpass",
                    },
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "WLAN interface (alternative wireless naming)",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            // wlan interfaces should also be recognized as wireless
            validateRouterConfig(result, ["/interface wifi", "/interface macvlan"]);
        });

        it("should generate MACVLAN for SFP interface", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "sfp-sfpplus1",
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "SFP+ interface with auto-MACVLAN",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            validateRouterConfig(result, ["/interface macvlan"]);
        });

        it("should handle bridge interface without MACVLAN", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "bridge1",
                },
            };

            const result = testWithOutput(
                "generateInterfaceConfig",
                "Bridge interface (no modifications)",
                { wanLinkConfig },
                () => generateInterfaceConfig(wanLinkConfig),
            );

            // Bridge doesn't require MACVLAN, should be empty or minimal config
            validateRouterConfig(result, []);
        });
    });

    describe("generateWANLinkConfig", () => {
        // Note: generateWANLinkConfig passes 'name' parameter to WANIfaceList
        // which expects a Network type ("Foreign"/"Domestic"). This results in
        // interface list members like "WAN-1-WAN" instead of "Foreign-WAN".
        // This behavior is maintained for backward compatibility.

        it("should generate complete WAN link with DHCP", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-1",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                },
                ConnectionConfig: {
                    isDHCP: true,
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "Complete WAN link with DHCP",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
            ]);
        });

        it("should generate WAN link with PPPoE", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-PPPoE",
                InterfaceConfig: {
                    InterfaceName: "ether2",
                },
                ConnectionConfig: {
                    pppoe: {
                        username: "pppoeuser",
                        password: "pppoepass",
                    },
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "WAN link with PPPoE connection",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/interface pppoe-client",
            ]);
        });

        it("should generate WAN link with Static IP", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-Static",
                InterfaceConfig: {
                    InterfaceName: "ether3",
                },
                ConnectionConfig: {
                    static: {
                        ipAddress: "203.0.113.10",
                        subnet: "255.255.255.0",
                        gateway: "203.0.113.1",
                    },
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "WAN link with Static IP",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip address",
            ]);
        });

        it("should generate WAN link with LTE", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "LTE-1",
                InterfaceConfig: {
                    InterfaceName: "lte1",
                },
                ConnectionConfig: {
                    lteSettings: {
                        apn: "internet",
                    },
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "WAN link with LTE connection",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface list member",
                "/interface lte",
                "/interface lte apn",
            ]);
        });

        it("should generate WAN link with VLAN and DHCP", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-VLAN",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                    VLANID: "100",
                },
                ConnectionConfig: {
                    isDHCP: true,
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "WAN link with VLAN 100 and DHCP",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface vlan",
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
            ]);
        });

        it("should generate wireless WAN link with DHCP", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-WiFi",
                InterfaceConfig: {
                    InterfaceName: "wifi2.4",
                    WirelessCredentials: {
                        SSID: "PublicWiFi",
                        Password: "password123",
                    },
                },
                ConnectionConfig: {
                    isDHCP: true,
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "Wireless WAN link with DHCP",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface wifi",
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
            ]);
        });

        it("should generate WAN link without connection config", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-Basic",
                InterfaceConfig: {
                    InterfaceName: "ether4",
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "WAN link without connection config",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
            ]);
        });

        it("should generate complex WAN link with VLAN, MAC, and PPPoE", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-Complex",
                InterfaceConfig: {
                    InterfaceName: "ether1",
                    VLANID: "200",
                    MacAddress: "AA:BB:CC:DD:EE:FF",
                },
                ConnectionConfig: {
                    pppoe: {
                        username: "complex_user",
                        password: "complex_pass",
                    },
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "Complex WAN: VLAN + Custom MAC + PPPoE",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface vlan",
                "/interface macvlan",
                "/interface list member",
                "/interface pppoe-client",
            ]);
        });

        it("should handle edge case with SFP interface", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-SFP",
                InterfaceConfig: {
                    InterfaceName: "sfp-sfpplus1",
                },
                ConnectionConfig: {
                    isDHCP: true,
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "SFP interface with DHCP",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
            ]);
        });

        it("should handle bridge interface as WAN (no auto-MACVLAN)", () => {
            const wanLinkConfig: WANLinkConfig = {
                name: "WAN-Bridge",
                InterfaceConfig: {
                    InterfaceName: "bridge-wan",
                },
                ConnectionConfig: {
                    static: {
                        ipAddress: "10.0.0.2",
                        subnet: "255.255.255.0",
                        gateway: "10.0.0.1",
                    },
                },
            };

            const result = testWithOutput(
                "generateWANLinkConfig",
                "Bridge interface as WAN (unusual but supported)",
                { wanLinkConfig },
                () => generateWANLinkConfig(wanLinkConfig, "Foreign"),
            );

            // Bridge should not get auto-MACVLAN
            validateRouterConfig(result, [
                "/interface list member",
                "/ip address",
            ]);
        });
    });

    describe("DFSingleLink", () => {
        it("should generate routing config for single Foreign link", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "Foreign-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                        ConnectionConfig: {
                            static: {
                                gateway: "203.0.113.1",
                                ipAddress: "203.0.113.10",
                                subnet: "255.255.255.0",
                            },
                        },
                        priority: 1,
                    },
                ],
            };

            const result = testWithOutput(
                "DFSingleLink",
                "Single Foreign link routing configuration",
                { wanLink, networkType: "Foreign" },
                () => DFSingleLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"]).toHaveLength(1);
            expect(result["/ip route"][0]).toContain("routing-table=to-Foreign");
            expect(result["/ip route"][0]).toContain("gateway=203.0.113.1%");
            expect(result["/ip route"][0]).toContain('comment="Route-to-Foreign-Foreign-1"');
        });

        it("should generate routing config for single Domestic link", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "Domestic-1",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                        ConnectionConfig: {
                            static: {
                                gateway: "192.168.1.1",
                                ipAddress: "192.168.1.100",
                                subnet: "255.255.255.0",
                            },
                        },
                        priority: 1,
                    },
                ],
            };

            const result = testWithOutput(
                "DFSingleLink",
                "Single Domestic link routing configuration",
                { wanLink, networkType: "Domestic" },
                () => DFSingleLink(wanLink, "Domestic"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"]).toHaveLength(1);
            expect(result["/ip route"][0]).toContain("routing-table=to-Domestic");
            expect(result["/ip route"][0]).toContain("gateway=192.168.1.1%");
            expect(result["/ip route"][0]).toContain('comment="Route-to-Domestic-Domestic-1"');
        });

        it("should return empty config for multiple WANConfigs", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                ],
            };

            const result = testWithOutput(
                "DFSingleLink",
                "Multiple WANConfigs should return empty",
                { wanLink, networkType: "Foreign" },
                () => DFSingleLink(wanLink, "Foreign"),
            );

            expect(result).toEqual({});
        });

        it("should return empty config for empty WANConfigs", () => {
            const wanLink: WANLink = {
                WANConfigs: [],
            };

            const result = testWithOutput(
                "DFSingleLink",
                "Empty WANConfigs should return empty",
                { wanLink, networkType: "Foreign" },
                () => DFSingleLink(wanLink, "Foreign"),
            );

            expect(result).toEqual({});
        });

        it("should use correct gateway from converted interface", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "Static-WAN",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                        ConnectionConfig: {
                            static: {
                                gateway: "10.0.0.1",
                                ipAddress: "10.0.0.100",
                                subnet: "255.255.255.0",
                            },
                        },
                        priority: 1,
                    },
                ],
            };

            const result = DFSingleLink(wanLink, "Foreign");

            expect(result["/ip route"][0]).toContain("gateway=10.0.0.1");
        });

        it("should handle DHCP connection with default gateway", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "DHCP-WAN",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                        ConnectionConfig: {
                            isDHCP: true,
                        },
                    },
                ],
            };

            const result = testWithOutput(
                "DFSingleLink",
                "DHCP connection with default gateway",
                { wanLink, networkType: "Foreign" },
                () => DFSingleLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip route"][0]).toContain("routing-table=to-Foreign");
            expect(result["/ip route"][0]).toContain("gateway=100.64.0.1%MacVLAN-ether1-DHCP-WAN");
        });
    });

    describe("DFMultiLink", () => {
        it("should generate load balancing config with PCC strategy", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                        ConnectionConfig: {
                            static: {
                                gateway: "203.0.113.1",
                                ipAddress: "203.0.113.10",
                                subnet: "255.255.255.0",
                            },
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                        ConnectionConfig: {
                            static: {
                                gateway: "198.51.100.1",
                                ipAddress: "198.51.100.10",
                                subnet: "255.255.255.0",
                            },
                        },
                    },
                ],
                MultiLinkConfig: {
                    strategy: "LoadBalance",
                    loadBalanceMethod: "PCC",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Multi-link with PCC load balancing",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route", "/ip firewall mangle"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
            // PCC should generate 8 mangle rules (4 per interface)
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should generate load balancing config with NTH strategy", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                ],
                MultiLinkConfig: {
                    strategy: "LoadBalance",
                    loadBalanceMethod: "NTH",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Multi-link with NTH load balancing",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route", "/ip firewall mangle"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
            // NTH should generate mangle rules
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should generate failover config with recursive gateway checking", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "Primary-WAN",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                        priority: 1,
                    },
                    {
                        name: "Backup-WAN",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                        priority: 2,
                    },
                ],
                MultiLinkConfig: {
                    strategy: "Failover",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Multi-link with failover strategy",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should generate round-robin config using NTH method", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                ],
                MultiLinkConfig: {
                    strategy: "RoundRobin",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Multi-link with round-robin strategy",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route", "/ip firewall mangle"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
            // RoundRobin uses NTH, should generate mangle rules
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should generate both load balancing and failover config", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                ],
                MultiLinkConfig: {
                    strategy: "Both",
                    loadBalanceMethod: "PCC",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Multi-link with both load balancing and failover",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route", "/ip firewall mangle"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
            // Both strategy uses PCC, should generate mangle rules
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should use default failover when no MultiLinkConfig provided", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                ],
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Multi-link with default failover (no MultiLinkConfig)",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should return empty config for single WAN link", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "Single-WAN",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                ],
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Single WAN link should return empty config",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            expect(result).toEqual({});
        });

        it("should return empty config for empty WANConfigs", () => {
            const wanLink: WANLink = {
                WANConfigs: [],
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Empty WANConfigs should return empty config",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            expect(result).toEqual({});
        });

        it("should handle ECMP load balance method fallback to PCC", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                ],
                MultiLinkConfig: {
                    strategy: "LoadBalance",
                    loadBalanceMethod: "ECMP",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "ECMP method should fallback to PCC",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route", "/ip firewall mangle"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
            // ECMP falls back to PCC, should generate mangle rules
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should handle 3 WAN links with load balancing", () => {
            const wanLink: WANLink = {
                WANConfigs: [
                    {
                        name: "WAN-1",
                        InterfaceConfig: {
                            InterfaceName: "ether1",
                        },
                    },
                    {
                        name: "WAN-2",
                        InterfaceConfig: {
                            InterfaceName: "ether2",
                        },
                    },
                    {
                        name: "WAN-3",
                        InterfaceConfig: {
                            InterfaceName: "ether3",
                        },
                    },
                ],
                MultiLinkConfig: {
                    strategy: "LoadBalance",
                    loadBalanceMethod: "NTH",
                },
            };

            const result = testWithOutput(
                "DFMultiLink",
                "Three WAN links with NTH load balancing",
                { wanLink },
                () => DFMultiLink(wanLink, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route", "/ip firewall mangle"]);
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
            // NTH with 3 WAN links should generate mangle rules
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });
    });
});
