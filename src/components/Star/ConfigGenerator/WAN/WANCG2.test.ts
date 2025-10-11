import { describe, it } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import type { WANState } from "~/components/Star/StarContext";
import { WANCG } from "./WANCG";

describe("WANCG Module - Complex Integration Test Suite", () => {
    describe("All tests include Foreign + Domestic + VPN Client configurations", () => {
        it("Test 1: Minimal Complete Setup - 1 Foreign + 1 Domestic + 1 VPN", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-Main",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                            },
                        ],
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-Main",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                            },
                        ],
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Main",
                            InterfacePrivateKey: "WGMainPrivateKey123456=",
                            InterfaceAddress: "10.100.0.2/24",
                            InterfaceDNS: "10.100.0.1",
                            PeerPublicKey: "WGMainPublicKey123456=",
                            PeerEndpointAddress: "vpn.example.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                        },
                    ],
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 1: Minimal Complete - 1F + 1D + 1VPN",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/interface ethernet",
            ]);
        });

        it("Test 2: Balanced Multi-Link with Same Strategies - 2F + 2D + 2VPN Failover", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-Primary",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Foreign-Backup",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-Primary",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Domestic-Backup",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Primary",
                            InterfacePrivateKey: "WGPrimaryKey123456=",
                            InterfaceAddress: "10.110.0.2/24",
                            InterfaceDNS: "10.110.0.1",
                            PeerPublicKey: "WGPrimaryPublicKey=",
                            PeerEndpointAddress: "vpn1.example.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                        },
                        {
                            Name: "WG-Backup",
                            InterfacePrivateKey: "WGBackupKey123456=",
                            InterfaceAddress: "10.111.0.2/24",
                            InterfaceDNS: "10.111.0.1",
                            PeerPublicKey: "WGBackupPublicKey=",
                            PeerEndpointAddress: "vpn2.example.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 2,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 2: Balanced Multi-Link - 2F + 2D + 2VPN Failover",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/interface ethernet",
            ]);
        });

        it("Test 3: Mixed Connection Types - 2F (DHCP+Static) + 2D (PPPoE+Static) + 2VPN (WG+OpenVPN)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-DHCP",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Foreign-Static",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    static: {
                                        ipAddress: "203.0.113.10",
                                        subnet: "255.255.255.0",
                                        gateway: "203.0.113.1",
                                        DNS: "8.8.8.8",
                                    },
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-PPPoE",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    pppoe: {
                                        username: "domestic@isp.local",
                                        password: "domestic-pass",
                                    },
                                },
                                priority: 1,
                            },
                            {
                                name: "Domestic-Static",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                },
                                ConnectionConfig: {
                                    static: {
                                        ipAddress: "192.168.200.10",
                                        subnet: "255.255.255.0",
                                        gateway: "192.168.200.1",
                                        DNS: "192.168.200.1",
                                    },
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Mixed",
                            InterfacePrivateKey: "WGMixedKey123456=",
                            InterfaceAddress: "10.120.0.2/24",
                            InterfaceDNS: "10.120.0.1",
                            PeerPublicKey: "WGMixedPublicKey=",
                            PeerEndpointAddress: "wg.vpn.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                        },
                    ],
                    OpenVPN: [
                        {
                            Name: "OpenVPN-Mixed",
                            Server: {
                                Address: "ovpn.vpn.com",
                                Port: 1194,
                            },
                            AuthType: "Credentials",
                            Credentials: {
                                Username: "ovpn-user",
                                Password: "ovpn-pass",
                            },
                            Auth: "sha256",
                            Protocol: "tcp",
                            Cipher: "aes256-cbc",
                            priority: 2,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 3: Mixed Connection Types - 2F + 2D + 2VPN",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
                "/interface pppoe-client",
                "/ip address",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/interface ovpn-client",
                "/interface ethernet",
            ]);
        });

        it("Test 4: Advanced Multi-Link Strategies - 3F (PCC) + 3D (NTH) + 3VPN (LoadBalance)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-LB-1",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                                weight: 2,
                            },
                            {
                                name: "Foreign-LB-2",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                                weight: 1,
                            },
                            {
                                name: "Foreign-LB-3",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 3,
                                weight: 1,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "LoadBalance",
                            loadBalanceMethod: "PCC",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-LB-1",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                                weight: 1,
                            },
                            {
                                name: "Domestic-LB-2",
                                InterfaceConfig: {
                                    InterfaceName: "ether5",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                                weight: 1,
                            },
                            {
                                name: "Domestic-LB-3",
                                InterfaceConfig: {
                                    InterfaceName: "sfp1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 3,
                                weight: 1,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "LoadBalance",
                            loadBalanceMethod: "NTH",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-LB-1",
                            InterfacePrivateKey: "WG1Key123456=",
                            InterfaceAddress: "10.130.0.2/24",
                            InterfaceDNS: "10.130.0.1",
                            PeerPublicKey: "WG1PublicKey=",
                            PeerEndpointAddress: "wg1.vpn.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                            weight: 2,
                        },
                        {
                            Name: "WG-LB-2",
                            InterfacePrivateKey: "WG2Key123456=",
                            InterfaceAddress: "10.131.0.2/24",
                            InterfaceDNS: "10.131.0.1",
                            PeerPublicKey: "WG2PublicKey=",
                            PeerEndpointAddress: "wg2.vpn.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 2,
                            weight: 1,
                        },
                        {
                            Name: "WG-LB-3",
                            InterfacePrivateKey: "WG3Key123456=",
                            InterfaceAddress: "10.132.0.2/24",
                            InterfaceDNS: "10.132.0.1",
                            PeerPublicKey: "WG3PublicKey=",
                            PeerEndpointAddress: "wg3.vpn.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 3,
                            weight: 1,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "LoadBalance",
                        loadBalanceMethod: "PCC",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 4: Advanced Strategies - 3F (PCC) + 3D (NTH) + 3VPN (PCC)",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
                "/ip route",
                "/ip firewall mangle",
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/interface ethernet",
            ]);
        });

        it("Test 5: Wireless and Wired Integration - 2F (WiFi) + 2D (Fiber+Cable) + 2VPN (WG+L2TP)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-WiFi-2.4",
                                InterfaceConfig: {
                                    InterfaceName: "wifi2.4",
                                    WirelessCredentials: {
                                        SSID: "CoffeeShop-2.4GHz",
                                        Password: "coffee-pass",
                                    },
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Foreign-WiFi-5",
                                InterfaceConfig: {
                                    InterfaceName: "wifi5",
                                    WirelessCredentials: {
                                        SSID: "CoffeeShop-5GHz",
                                        Password: "coffee-pass-5",
                                    },
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-Fiber",
                                InterfaceConfig: {
                                    InterfaceName: "sfp1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Domestic-Cable",
                                InterfaceConfig: {
                                    InterfaceName: "ether5",
                                },
                                ConnectionConfig: {
                                    static: {
                                        ipAddress: "192.168.150.10",
                                        subnet: "255.255.255.0",
                                        gateway: "192.168.150.1",
                                        DNS: "192.168.150.1",
                                    },
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Wireless",
                            InterfacePrivateKey: "WGWirelessKey=",
                            InterfaceAddress: "10.140.0.2/24",
                            InterfaceDNS: "10.140.0.1",
                            PeerPublicKey: "WGWirelessPublicKey=",
                            PeerEndpointAddress: "wireless.vpn.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                        },
                    ],
                    L2TP: [
                        {
                            Name: "L2TP-Wireless",
                            Server: {
                                Address: "l2tp.vpn.com",
                                Port: 1701,
                            },
                            Credentials: {
                                Username: "l2tp-user",
                                Password: "l2tp-pass",
                            },
                            UseIPsec: true,
                            IPsecSecret: "l2tp-ipsec-secret",
                            AuthMethod: ["mschap2"],
                            priority: 2,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 5: Wireless+Wired - 2F (WiFi) + 2D (Fiber+Cable) + 2VPN",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface wifi",
                "/ip dhcp-client",
                "/ip address",
                "/interface list member",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/interface l2tp-client",
            ]);
        });

        it("Test 6: VLAN/MACVLAN Tagged Setup - 2F (VLAN) + 2D (MACVLAN) + 2VPN (WG+PPTP)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-VLAN100",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                    VLANID: "100",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Foreign-VLAN200",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                    VLANID: "200",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-MACVLAN",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                    MacAddress: "AA:BB:CC:11:22:33",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Domestic-VLAN-MAC",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                    VLANID: "500",
                                    MacAddress: "DD:EE:FF:44:55:66",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Tagged",
                            InterfacePrivateKey: "WGTaggedKey=",
                            InterfaceAddress: "10.150.0.2/24",
                            InterfaceDNS: "10.150.0.1",
                            PeerPublicKey: "WGTaggedPublicKey=",
                            PeerEndpointAddress: "tagged.vpn.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                        },
                    ],
                    PPTP: [
                        {
                            Name: "PPTP-Tagged",
                            ConnectTo: "pptp.vpn.com",
                            Credentials: {
                                Username: "pptp-user",
                                Password: "pptp-pass",
                            },
                            AuthMethod: ["mschap2"],
                            priority: 2,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 6: VLAN/MACVLAN - 2F (VLAN) + 2D (MACVLAN) + 2VPN",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface vlan",
                "/interface macvlan",
                "/ip dhcp-client",
                "/interface list member",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/interface pptp-client",
            ]);
        });

        it("Test 7: Maximum Load Balancing - 4F (Both) + 4D (Both) + 4VPN (Both)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-Max-1",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                                weight: 3,
                            },
                            {
                                name: "Foreign-Max-2",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                                weight: 2,
                            },
                            {
                                name: "Foreign-Max-3",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 3,
                                weight: 1,
                            },
                            {
                                name: "Foreign-Max-4",
                                InterfaceConfig: {
                                    InterfaceName: "sfp1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 4,
                                weight: 1,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Both",
                            loadBalanceMethod: "PCC",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-Max-1",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                                weight: 2,
                            },
                            {
                                name: "Domestic-Max-2",
                                InterfaceConfig: {
                                    InterfaceName: "ether5",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                                weight: 2,
                            },
                            {
                                name: "Domestic-Max-3",
                                InterfaceConfig: {
                                    InterfaceName: "ether6",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 3,
                                weight: 1,
                            },
                            {
                                name: "Domestic-Max-4",
                                InterfaceConfig: {
                                    InterfaceName: "sfp2",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 4,
                                weight: 1,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Both",
                            loadBalanceMethod: "NTH",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Max-1",
                            InterfacePrivateKey: "WGMax1Key=",
                            InterfaceAddress: "10.160.0.2/24",
                            InterfaceDNS: "10.160.0.1",
                            PeerPublicKey: "WGMax1PublicKey=",
                            PeerEndpointAddress: "wg1.max.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                            weight: 3,
                        },
                        {
                            Name: "WG-Max-2",
                            InterfacePrivateKey: "WGMax2Key=",
                            InterfaceAddress: "10.161.0.2/24",
                            InterfaceDNS: "10.161.0.1",
                            PeerPublicKey: "WGMax2PublicKey=",
                            PeerEndpointAddress: "wg2.max.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 2,
                            weight: 2,
                        },
                        {
                            Name: "WG-Max-3",
                            InterfacePrivateKey: "WGMax3Key=",
                            InterfaceAddress: "10.162.0.2/24",
                            InterfaceDNS: "10.162.0.1",
                            PeerPublicKey: "WGMax3PublicKey=",
                            PeerEndpointAddress: "wg3.max.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 3,
                            weight: 1,
                        },
                        {
                            Name: "WG-Max-4",
                            InterfacePrivateKey: "WGMax4Key=",
                            InterfaceAddress: "10.163.0.2/24",
                            InterfaceDNS: "10.163.0.1",
                            PeerPublicKey: "WGMax4PublicKey=",
                            PeerEndpointAddress: "wg4.max.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 4,
                            weight: 1,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Both",
                        loadBalanceMethod: "PCC",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 7: Maximum Load Balancing - 4F + 4D + 4VPN (All Both strategy)",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface macvlan",
                "/interface list member",
                "/ip dhcp-client",
                "/ip route",
                "/ip firewall mangle",
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/interface ethernet",
            ]);
        });

        it("Test 8: Enterprise High-Availability - 3F (DHCP+PPPoE+LTE) + 3D (Fiber+DSL+Cable) + 3VPN (WG+OVPN+L2TP)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-Enterprise-DHCP",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                                weight: 3,
                            },
                            {
                                name: "Foreign-Enterprise-PPPoE",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    pppoe: {
                                        username: "foreign-ent@isp.com",
                                        password: "foreign-pppoe",
                                    },
                                },
                                priority: 2,
                                weight: 2,
                            },
                            {
                                name: "Foreign-Enterprise-LTE",
                                InterfaceConfig: {
                                    InterfaceName: "lte1",
                                },
                                ConnectionConfig: {
                                    lteSettings: {
                                        apn: "enterprise.lte",
                                        username: "lte-ent",
                                        password: "lte-pass",
                                    },
                                },
                                priority: 3,
                                weight: 1,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-Enterprise-Fiber",
                                InterfaceConfig: {
                                    InterfaceName: "sfp1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                                weight: 4,
                            },
                            {
                                name: "Domestic-Enterprise-DSL",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    pppoe: {
                                        username: "dsl@local.isp",
                                        password: "dsl-pass",
                                    },
                                },
                                priority: 2,
                                weight: 2,
                            },
                            {
                                name: "Domestic-Enterprise-Cable",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                },
                                ConnectionConfig: {
                                    static: {
                                        ipAddress: "192.168.250.10",
                                        subnet: "255.255.255.0",
                                        gateway: "192.168.250.1",
                                        DNS: "192.168.250.1",
                                    },
                                },
                                priority: 3,
                                weight: 1,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Enterprise",
                            InterfacePrivateKey: "WGEntKey=",
                            InterfaceAddress: "10.170.0.2/24",
                            InterfaceDNS: "10.170.0.1",
                            InterfaceListenPort: 51821,
                            InterfaceMTU: 1420,
                            PeerPublicKey: "WGEntPublicKey=",
                            PeerEndpointAddress: "enterprise.wg.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            PeerPersistentKeepalive: 25,
                            priority: 1,
                            weight: 3,
                        },
                    ],
                    OpenVPN: [
                        {
                            Name: "OpenVPN-Enterprise",
                            Server: {
                                Address: "enterprise.ovpn.com",
                                Port: 1194,
                            },
                            AuthType: "Credentials",
                            Credentials: {
                                Username: "ent-ovpn-user",
                                Password: "ent-ovpn-pass",
                            },
                            Auth: "sha512",
                            Protocol: "tcp",
                            Cipher: "aes256-gcm",
                            TlsVersion: "only-1.2",
                            priority: 2,
                            weight: 2,
                        },
                    ],
                    L2TP: [
                        {
                            Name: "L2TP-Enterprise",
                            Server: {
                                Address: "enterprise.l2tp.com",
                                Port: 1701,
                            },
                            Credentials: {
                                Username: "ent-l2tp-user",
                                Password: "ent-l2tp-pass",
                            },
                            UseIPsec: true,
                            IPsecSecret: "ent-ipsec-secret",
                            AuthMethod: ["mschap2"],
                            ProtoVersion: "l2tpv3-udp",
                            priority: 3,
                            weight: 1,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 8: Enterprise HA - 3F (DHCP+PPPoE+LTE) + 3D + 3VPN",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/ip dhcp-client",
                "/interface pppoe-client",
                "/interface lte apn",
                "/ip address",
                "/interface list member",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/interface ovpn-client",
                "/interface l2tp-client",
            ]);
        });

        it("Test 9: All VPN Protocols Suite - 2F + 2D + 6VPN (All protocols)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-VPN-Suite-1",
                                InterfaceConfig: {
                                    InterfaceName: "ether1",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 1,
                            },
                            {
                                name: "Foreign-VPN-Suite-2",
                                InterfaceConfig: {
                                    InterfaceName: "ether2",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-VPN-Suite-1",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    pppoe: {
                                        username: "domestic-vpn@isp.com",
                                        password: "domestic-vpn-pass",
                                    },
                                },
                                priority: 1,
                            },
                            {
                                name: "Domestic-VPN-Suite-2",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                },
                                ConnectionConfig: {
                                    pppoe: {
                                        username: "domestic-vpn2@isp.com",
                                        password: "domestic-vpn-pass2",
                                    },
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    Wireguard: [
                        {
                            Name: "WG-Suite",
                            InterfacePrivateKey: "WGSuiteKey=",
                            InterfaceAddress: "10.180.0.2/24",
                            InterfaceDNS: "10.180.0.1",
                            PeerPublicKey: "WGSuitePublicKey=",
                            PeerEndpointAddress: "wg.suite.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            priority: 1,
                        },
                    ],
                    OpenVPN: [
                        {
                            Name: "OpenVPN-Suite",
                            Server: {
                                Address: "ovpn.suite.com",
                                Port: 1194,
                            },
                            AuthType: "Credentials",
                            Credentials: {
                                Username: "ovpn-suite-user",
                                Password: "ovpn-suite-pass",
                            },
                            Auth: "sha256",
                            Protocol: "udp",
                            Cipher: "aes256-cbc",
                            priority: 2,
                        },
                    ],
                    L2TP: [
                        {
                            Name: "L2TP-Suite",
                            Server: {
                                Address: "l2tp.suite.com",
                                Port: 1701,
                            },
                            Credentials: {
                                Username: "l2tp-suite-user",
                                Password: "l2tp-suite-pass",
                            },
                            UseIPsec: true,
                            IPsecSecret: "l2tp-ipsec",
                            AuthMethod: ["mschap2"],
                            priority: 3,
                        },
                    ],
                    PPTP: [
                        {
                            Name: "PPTP-Suite",
                            ConnectTo: "pptp.suite.com",
                            Credentials: {
                                Username: "pptp-suite-user",
                                Password: "pptp-suite-pass",
                            },
                            AuthMethod: ["mschap2"],
                            priority: 4,
                        },
                    ],
                    SSTP: [
                        {
                            Name: "SSTP-Suite",
                            Server: {
                                Address: "sstp.suite.com",
                                Port: 443,
                            },
                            Credentials: {
                                Username: "sstp-suite-user",
                                Password: "sstp-suite-pass",
                            },
                            AuthMethod: ["mschap2"],
                            TlsVersion: "only-1.2",
                            priority: 5,
                        },
                    ],
                    IKeV2: [
                        {
                            Name: "IKeV2-Suite",
                            Server: {
                                Address: "ikev2.suite.com",
                                Port: 500,
                            },
                            Credentials: {
                                Username: "ikev2-suite-user",
                                Password: "ikev2-suite-pass",
                            },
                            priority: 6,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 9: All VPN Protocols - 2F + 2D + 6VPN (WG+OVPN+L2TP+PPTP+SSTP+IKeV2)",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/ip dhcp-client",
                "/interface pppoe-client",
                "/interface list member",
                "/ip route",
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/interface ovpn-client",
                "/interface l2tp-client",
                "/interface pptp-client",
                "/interface sstp-client",
            ]);
        });

        it("Test 10: Edge Cases - 2F (LTE+WiFi) + 2D (Static+VLAN) + 2VPN (Certificate+Advanced)", () => {
            const wanState: WANState = {
                WANLink: {
                    Foreign: {
                        WANConfigs: [
                            {
                                name: "Foreign-Edge-LTE",
                                InterfaceConfig: {
                                    InterfaceName: "lte1",
                                },
                                ConnectionConfig: {
                                    lteSettings: {
                                        apn: "edge.mobile",
                                        username: "edge-mobile",
                                        password: "edge-mobile-pass",
                                    },
                                },
                                priority: 1,
                            },
                            {
                                name: "Foreign-Edge-WiFi",
                                InterfaceConfig: {
                                    InterfaceName: "wifi5",
                                    WirelessCredentials: {
                                        SSID: "Edge-WiFi-5GHz",
                                        Password: "edge-wifi-pass",
                                    },
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                    Domestic: {
                        WANConfigs: [
                            {
                                name: "Domestic-Edge-Static",
                                InterfaceConfig: {
                                    InterfaceName: "ether3",
                                },
                                ConnectionConfig: {
                                    static: {
                                        ipAddress: "172.20.0.10",
                                        subnet: "255.255.255.0",
                                        gateway: "172.20.0.1",
                                        DNS: "172.20.0.1",
                                    },
                                },
                                priority: 1,
                            },
                            {
                                name: "Domestic-Edge-VLAN",
                                InterfaceConfig: {
                                    InterfaceName: "ether4",
                                    VLANID: "999",
                                },
                                ConnectionConfig: {
                                    isDHCP: true,
                                },
                                priority: 2,
                            },
                        ],
                        MultiLinkConfig: {
                            strategy: "Failover",
                        },
                    },
                },
                VPNClient: {
                    OpenVPN: [
                        {
                            Name: "OpenVPN-Edge-Certificate",
                            Server: {
                                Address: "edge-cert.ovpn.com",
                                Port: 1194,
                            },
                            AuthType: "Certificate",
                            Auth: "sha512",
                            Protocol: "tcp",
                            Cipher: "aes256-gcm",
                            TlsVersion: "only-1.2",
                            VerifyServerCertificate: true,
                            Certificates: {
                                CaCertificateName: "edge-ca-cert",
                                ClientCertificateName: "edge-client-cert",
                                CaCertificateContent: "-----BEGIN CERTIFICATE-----\nEDGE_CA_CERT\n-----END CERTIFICATE-----",
                                ClientCertificateContent: "-----BEGIN CERTIFICATE-----\nEDGE_CLIENT_CERT\n-----END CERTIFICATE-----",
                                ClientKeyContent: "-----BEGIN PRIVATE KEY-----\nEDGE_CLIENT_KEY\n-----END PRIVATE KEY-----",
                            },
                            priority: 1,
                        },
                    ],
                    Wireguard: [
                        {
                            Name: "WG-Edge-Advanced",
                            InterfacePrivateKey: "WGEdgeAdvancedKey=",
                            InterfaceAddress: "10.190.0.2/24",
                            InterfaceDNS: "10.190.0.1",
                            InterfaceListenPort: 51899,
                            InterfaceMTU: 1380,
                            PeerPublicKey: "WGEdgeAdvancedPublicKey=",
                            PeerEndpointAddress: "edge.wg.advanced.com",
                            PeerEndpointPort: 51820,
                            PeerAllowedIPs: "0.0.0.0/0",
                            PeerPresharedKey: "EdgePresharedKey123456=",
                            PeerPersistentKeepalive: 20,
                            priority: 2,
                        },
                    ],
                    MultiLinkConfig: {
                        strategy: "Failover",
                    },
                },
            };

            const result = testWithOutput(
                "WANCG",
                "Test 10: Edge Cases - 2F (LTE+WiFi) + 2D (Static+VLAN) + 2VPN (Cert+Advanced)",
                { wanState },
                () => WANCG(wanState),
            );

            validateRouterConfig(result, [
                "/interface lte apn",
                "/interface wifi",
                "/ip dhcp-client",
                "/ip address",
                "/interface vlan",
                "/interface macvlan",
                "/interface list member",
                "/ip route",
                "/interface ovpn-client",
                "/interface wireguard",
                "/interface wireguard peers",
            ]);
        });
    });
});
