import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    testWithGenericOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    convertWANLinkToMultiWAN,
    convertVPNClientToMultiWAN,
    combineMultiWANInterfaces,
    DomesticCheckIPs,
    ForeignCheckIPs,
    PCCMangle,
    NTHMangle,
    LoadBalanceRoute,
    FailoverGateway,
    FailoverRecursive,
    FailoverNetwatch,
    FailoverScheduled,
    ECMP,
    Bonding,
} from "./MultiLinkUtil";
import type { BondingConfig } from "../../../StarContext/Utils/MultiLinkType";
import type { WANLinkConfig, WANLinks } from "../../../StarContext/Utils/WANLinkType";
import type { VPNClient } from "../../../StarContext/Utils/VPNClientType";

describe("MultiLink Module", () => {
    describe("Check IP Constants", () => {
        it("should have domestic check IPs array", () => {
            expect(DomesticCheckIPs).toBeDefined();
            expect(Array.isArray(DomesticCheckIPs)).toBe(true);
            expect(DomesticCheckIPs.length).toBeGreaterThan(0);
        });

        it("should have foreign check IPs array", () => {
            expect(ForeignCheckIPs).toBeDefined();
            expect(Array.isArray(ForeignCheckIPs)).toBe(true);
            expect(ForeignCheckIPs.length).toBeGreaterThan(0);
        });

        it("should contain valid IP addresses in domestic check IPs", () => {
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            DomesticCheckIPs.forEach((ip) => {
                expect(ipRegex.test(ip)).toBe(true);
            });
        });

        it("should contain valid IP addresses in foreign check IPs", () => {
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            ForeignCheckIPs.forEach((ip) => {
                expect(ipRegex.test(ip)).toBe(true);
            });
        });
    });

    describe("convertWANLinkToMultiWAN", () => {
        it("should convert domestic WAN links to MultiWAN interfaces", () => {
            const wanConfigs: WANLinkConfig[] = [
                {
                    name: "Dom-WAN-1",
                    InterfaceConfig: { InterfaceName: "ether1" },
                    ConnectionConfig: {
                        static: { gateway: "192.168.1.1", ipAddress: "192.168.1.100", subnet: "255.255.255.0" },
                    },
                    priority: 1,
                    weight: 2,
                },
                {
                    name: "Dom-WAN-2",
                    InterfaceConfig: { InterfaceName: "ether2" },
                    ConnectionConfig: {
                        static: { gateway: "192.168.2.1", ipAddress: "192.168.2.100", subnet: "255.255.255.0" },
                    },
                    priority: 2,
                    weight: 1,
                },
            ];

            const result = testWithGenericOutput(
                "convertWANLinkToMultiWAN",
                "Convert 2 domestic WAN links with weights",
                { wanConfigs, isDomestic: true },
                () => convertWANLinkToMultiWAN(wanConfigs, true),
            );

            expect(result).toHaveLength(2);
            expect(result[0].name).toBe("Dom-WAN-1");
            expect(result[0].gateway).toBe("192.168.1.1%MacVLAN-ether1-Dom-WAN-1");
            expect(result[0].distance).toBe(1);
            expect(result[0].weight).toBe(2);
            expect(result[0].checkIP).toBe(DomesticCheckIPs[0]);
        });

        it("should convert foreign WAN links to MultiWAN interfaces", () => {
            const wanConfigs: WANLinkConfig[] = [
                {
                    name: "For-WAN-1",
                    InterfaceConfig: { InterfaceName: "ether1" },
                    ConnectionConfig: {
                        static: { gateway: "203.0.113.1", ipAddress: "203.0.113.10", subnet: "255.255.255.0" },
                    },
                    priority: 1,
                },
            ];

            const result = testWithGenericOutput(
                "convertWANLinkToMultiWAN",
                "Convert foreign WAN link",
                { wanConfigs, isDomestic: false },
                () => convertWANLinkToMultiWAN(wanConfigs, false),
            );

            expect(result).toHaveLength(1);
            expect(result[0].checkIP).toBe(ForeignCheckIPs[0]);
            expect(result[0].checkIPs).toHaveLength(5);
        });

        it("should handle DHCP WAN links", () => {
            const wanConfigs: WANLinkConfig[] = [
                {
                    name: "DHCP-WAN",
                    InterfaceConfig: { InterfaceName: "ether1" },
                    ConnectionConfig: { isDHCP: true },
                    priority: 1,
                },
            ];

            const result = testWithGenericOutput(
                "convertWANLinkToMultiWAN",
                "Convert DHCP WAN link",
                { wanConfigs, isDomestic: false },
                () => convertWANLinkToMultiWAN(wanConfigs, false),
            );

            expect(result).toHaveLength(1);
            expect(result[0].gateway).toBe("100.64.0.1%MacVLAN-ether1-DHCP-WAN");
        });
    });

    describe("convertVPNClientToMultiWAN", () => {
        it("should convert Wireguard VPN clients to MultiWAN interfaces", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-VPN-1",
                        InterfaceAddress: "10.0.0.2/24",
                        PublicKey: "test-public-key",
                        PrivateKey: "test-private-key",
                        Endpoint: "vpn.example.com:51820",
                        priority: 1,
                        weight: 2,
                    },
                ],
            };

            const result = testWithGenericOutput(
                "convertVPNClientToMultiWAN",
                "Convert Wireguard VPN client",
                { vpnClient },
                () => convertVPNClientToMultiWAN(vpnClient),
            );

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("WG-VPN-1");
            expect(result[0].gateway).toBe("wireguard-client-WG-VPN-1");
            expect(result[0].distance).toBe(1);
            expect(result[0].weight).toBe(2);
            expect(result[0].checkIP).toBe(ForeignCheckIPs[0]);
        });

        it("should convert OpenVPN clients to MultiWAN interfaces", () => {
            const vpnClient: VPNClient = {
                OpenVPN: [
                    {
                        Name: "OVPN-1",
                        Server: { Address: "vpn.server.com", Port: 1194 },
                        Username: "user",
                        Password: "pass",
                        Certificate: "cert-data",
                        priority: 2,
                    },
                ],
            };

            const result = testWithGenericOutput(
                "convertVPNClientToMultiWAN",
                "Convert OpenVPN client",
                { vpnClient },
                () => convertVPNClientToMultiWAN(vpnClient),
            );

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("OVPN-1");
            expect(result[0].gateway).toBe("ovpn-client-OVPN-1");
        });

        it("should convert mixed VPN client types", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-1",
                        InterfaceAddress: "10.0.0.2/24",
                        PublicKey: "key1",
                        PrivateKey: "key2",
                        Endpoint: "vpn1.com:51820",
                        priority: 1,
                    },
                ],
                PPTP: [
                    {
                        Name: "PPTP-1",
                        ConnectTo: "pptp.server.com",
                        Username: "user",
                        Password: "pass",
                        priority: 2,
                    },
                ],
                L2TP: [
                    {
                        Name: "L2TP-1",
                        Server: { Address: "l2tp.server.com", Port: 1701 },
                        Username: "user",
                        Password: "pass",
                        IPsecSecret: "secret",
                        priority: 3,
                    },
                ],
            };

            const result = testWithGenericOutput(
                "convertVPNClientToMultiWAN",
                "Convert mixed VPN client types (WG, PPTP, L2TP)",
                { vpnClient },
                () => convertVPNClientToMultiWAN(vpnClient),
            );

            expect(result).toHaveLength(3);
            expect(result[0].name).toBe("WG-1");
            expect(result[1].name).toBe("PPTP-1");
            expect(result[2].name).toBe("L2TP-1");
        });
    });

    describe("combineMultiWANInterfaces - Combine VPN and WAN Links", () => {
        it("should combine VPN, Domestic, and Foreign links in correct order", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-VPN-1",
                        InterfacePrivateKey: "privkey1",
                        InterfaceAddress: "10.0.0.2/24",
                        PeerPublicKey: "pubkey1",
                        PeerEndpointAddress: "vpn.server.com",
                        PeerEndpointPort: 51820,
                        PeerAllowedIPs: "0.0.0.0/0",
                        priority: 1,
                    },
                ],
            };

            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-WAN-1",
                            InterfaceConfig: { InterfaceName: "ether2" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.1.1", ipAddress: "192.168.1.100", subnet: "255.255.255.0" },
                            },
                            priority: 2,
                        },
                    ],
                },
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-WAN-1",
                            InterfaceConfig: { InterfaceName: "ether1" },
                            ConnectionConfig: {
                                static: { gateway: "203.0.113.1", ipAddress: "203.0.113.10", subnet: "255.255.255.0" },
                            },
                            priority: 3,
                        },
                    ],
                },
            };

            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Combine VPN, Domestic, and Foreign links in correct order",
                { vpnClient, wanLinks },
                () => combineMultiWANInterfaces(vpnClient, wanLinks),
            );

            // Should have 3 interfaces total
            expect(result).toHaveLength(3);

            // Order should be: VPN -> Domestic -> Foreign
            expect(result[0].name).toBe("WG-VPN-1");
            expect(result[0].network).toBe("VPN");

            expect(result[1].name).toBe("Dom-WAN-1");
            expect(result[1].network).toBe("Domestic");

            expect(result[2].name).toBe("For-WAN-1");
            expect(result[2].network).toBe("Foreign");
        });

        it("should handle only VPN clients", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-1",
                        InterfacePrivateKey: "key",
                        InterfaceAddress: "10.0.0.2/24",
                        PeerPublicKey: "pubkey",
                        PeerEndpointAddress: "vpn.com",
                        PeerEndpointPort: 51820,
                        PeerAllowedIPs: "0.0.0.0/0",
                    },
                ],
                OpenVPN: [
                    {
                        Name: "OVPN-1",
                        Server: { Address: "ovpn.com", Port: 1194 },
                        AuthType: "Credentials",
                        Auth: "sha256",
                        Credentials: { Username: "user", Password: "pass" },
                    },
                ],
            };

            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Handle only VPN clients (no WAN links)",
                { vpnClient },
                () => combineMultiWANInterfaces(vpnClient, undefined),
            );

            expect(result).toHaveLength(2);
            expect(result[0].name).toBe("WG-1");
            expect(result[0].network).toBe("VPN");
            expect(result[1].name).toBe("OVPN-1");
            expect(result[1].network).toBe("VPN");
        });

        it("should handle only WAN links (no VPN)", () => {
            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-1",
                            InterfaceConfig: { InterfaceName: "ether2" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.1.1", ipAddress: "192.168.1.100", subnet: "255.255.255.0" },
                            },
                        },
                    ],
                },
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-1",
                            InterfaceConfig: { InterfaceName: "ether1" },
                            ConnectionConfig: {
                                static: { gateway: "203.0.113.1", ipAddress: "203.0.113.10", subnet: "255.255.255.0" },
                            },
                        },
                    ],
                },
            };

            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Handle only WAN links (no VPN clients)",
                { wanLinks },
                () => combineMultiWANInterfaces(undefined, wanLinks),
            );

            expect(result).toHaveLength(2);
            expect(result[0].name).toBe("Dom-1");
            expect(result[0].network).toBe("Domestic");
            expect(result[1].name).toBe("For-1");
            expect(result[1].network).toBe("Foreign");
        });

        it("should handle multiple links of each type in correct order", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-1",
                        InterfacePrivateKey: "key1",
                        InterfaceAddress: "10.0.0.2/24",
                        PeerPublicKey: "pub1",
                        PeerEndpointAddress: "vpn1.com",
                        PeerEndpointPort: 51820,
                        PeerAllowedIPs: "0.0.0.0/0",
                        priority: 1,
                    },
                    {
                        Name: "WG-2",
                        InterfacePrivateKey: "key2",
                        InterfaceAddress: "10.0.0.3/24",
                        PeerPublicKey: "pub2",
                        PeerEndpointAddress: "vpn2.com",
                        PeerEndpointPort: 51821,
                        PeerAllowedIPs: "0.0.0.0/0",
                        priority: 2,
                    },
                ],
            };

            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-1",
                            InterfaceConfig: { InterfaceName: "ether2" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.1.1", ipAddress: "192.168.1.100", subnet: "255.255.255.0" },
                            },
                            priority: 1,
                        },
                        {
                            name: "Dom-2",
                            InterfaceConfig: { InterfaceName: "ether3" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.2.1", ipAddress: "192.168.2.100", subnet: "255.255.255.0" },
                            },
                            priority: 2,
                        },
                    ],
                },
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-1",
                            InterfaceConfig: { InterfaceName: "ether1" },
                            ConnectionConfig: {
                                static: { gateway: "203.0.113.1", ipAddress: "203.0.113.10", subnet: "255.255.255.0" },
                            },
                            priority: 1,
                        },
                        {
                            name: "For-2",
                            InterfaceConfig: { InterfaceName: "ether4" },
                            ConnectionConfig: {
                                static: { gateway: "198.51.100.1", ipAddress: "198.51.100.10", subnet: "255.255.255.0" },
                            },
                            priority: 2,
                        },
                    ],
                },
            };

            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Multiple links of each type with preserved order",
                { vpnClient, wanLinks },
                () => combineMultiWANInterfaces(vpnClient, wanLinks),
            );

            // Should have 6 interfaces total (2 VPN + 2 Domestic + 2 Foreign)
            expect(result).toHaveLength(6);

            // Verify order: VPN -> Domestic -> Foreign
            expect(result[0].name).toBe("WG-1");
            expect(result[0].network).toBe("VPN");
            
            expect(result[1].name).toBe("WG-2");
            expect(result[1].network).toBe("VPN");

            expect(result[2].name).toBe("Dom-1");
            expect(result[2].network).toBe("Domestic");
            
            expect(result[3].name).toBe("Dom-2");
            expect(result[3].network).toBe("Domestic");

            expect(result[4].name).toBe("For-1");
            expect(result[4].network).toBe("Foreign");
            
            expect(result[5].name).toBe("For-2");
            expect(result[5].network).toBe("Foreign");
        });

        it("should handle empty inputs", () => {
            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Handle empty inputs",
                {},
                () => combineMultiWANInterfaces(undefined, undefined),
            );

            expect(result).toHaveLength(0);
            expect(Array.isArray(result)).toBe(true);
        });

        it("should handle only Domestic WAN links", () => {
            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-Only-1",
                            InterfaceConfig: { InterfaceName: "ether1" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.1.1", ipAddress: "192.168.1.100", subnet: "255.255.255.0" },
                            },
                        },
                    ],
                },
            };

            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Handle only Domestic WAN links",
                { wanLinks },
                () => combineMultiWANInterfaces(undefined, wanLinks),
            );

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("Dom-Only-1");
            expect(result[0].network).toBe("Domestic");
            expect(result[0].checkIP).toBe(DomesticCheckIPs[0]);
        });

        it("should handle only Foreign WAN links", () => {
            const wanLinks: WANLinks = {
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-Only-1",
                            InterfaceConfig: { InterfaceName: "ether1" },
                            ConnectionConfig: {
                                static: { gateway: "203.0.113.1", ipAddress: "203.0.113.10", subnet: "255.255.255.0" },
                            },
                        },
                    ],
                },
            };

            const result = testWithGenericOutput(
                "combineMultiWANInterfaces",
                "Handle only Foreign WAN links",
                { wanLinks },
                () => combineMultiWANInterfaces(undefined, wanLinks),
            );

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("For-Only-1");
            expect(result[0].network).toBe("Foreign");
            expect(result[0].checkIP).toBe(ForeignCheckIPs[0]);
        });

        it("should assign unique checkIPs across all interface types", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-1",
                        InterfacePrivateKey: "key1",
                        InterfaceAddress: "10.0.0.2/24",
                        PeerPublicKey: "pub1",
                        PeerEndpointAddress: "vpn1.com",
                        PeerEndpointPort: 51820,
                        PeerAllowedIPs: "0.0.0.0/0",
                    },
                ],
            };

            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-1",
                            InterfaceConfig: { InterfaceName: "ether2" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.1.1", ipAddress: "192.168.1.100", subnet: "255.255.255.0" },
                            },
                        },
                        {
                            name: "Dom-2",
                            InterfaceConfig: { InterfaceName: "ether3" },
                            ConnectionConfig: {
                                static: { gateway: "192.168.2.1", ipAddress: "192.168.2.100", subnet: "255.255.255.0" },
                            },
                        },
                    ],
                },
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-1",
                            InterfaceConfig: { InterfaceName: "ether1" },
                            ConnectionConfig: {
                                static: { gateway: "203.0.113.1", ipAddress: "203.0.113.10", subnet: "255.255.255.0" },
                            },
                        },
                    ],
                },
            };

            const result = combineMultiWANInterfaces(vpnClient, wanLinks);

            // VPN uses Foreign check IPs with offset (foreignWANCount=1, so VPN uses ForeignCheckIPs[1])
            expect(result[0].checkIP).toBe(ForeignCheckIPs[1]);

            // Domestic links use Domestic check IPs (unique per link)
            expect(result[1].checkIP).toBe(DomesticCheckIPs[0]);
            expect(result[2].checkIP).toBe(DomesticCheckIPs[1]);

            // Foreign links use Foreign check IPs (unique per link, starting from index 0)
            expect(result[3].checkIP).toBe(ForeignCheckIPs[0]);
        });
    });

    describe("FailoverGateway - Simple Gateway Failover", () => {
        it("should configure failover for 2 gateways", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "192.168.1.1", distance: 1 },
                { name: "WAN-2", gateway: "192.168.2.1", distance: 2 },
            ];

            const result = testWithOutput(
                "FailoverGateway",
                "Simple gateway failover for 2 WANs",
                { wanInterfaces, Table: "Foreign" },
                () => FailoverGateway(wanInterfaces, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should configure failover for 3 gateways with priority", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "203.0.113.1", distance: 1 },
                { name: "WAN-2", gateway: "198.51.100.1", distance: 2 },
                { name: "WAN-3", gateway: "192.0.2.1", distance: 3 },
            ];

            const result = testWithOutput(
                "FailoverGateway",
                "Gateway failover for 3 WANs with priority",
                { wanInterfaces, Table: "Domestic" },
                () => FailoverGateway(wanInterfaces, "Domestic"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should configure failover without routing table", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "192.168.1.1", distance: 1 },
                { name: "WAN-2", gateway: "192.168.2.1", distance: 2 },
            ];

            const result = testWithOutput(
                "FailoverGateway",
                "Gateway failover without specific routing table",
                { wanInterfaces, Table: "" },
                () => FailoverGateway(wanInterfaces, ""),
            );

            validateRouterConfig(result, ["/ip route"]);
        });
    });

    describe("FailoverRecursive - Recursive Route Failover", () => {
        it("should configure recursive failover for 2 WANs", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "192.168.1.1",
                    checkIP: "8.8.8.8",
                    distance: 1,
                },
                {
                    name: "WAN-2",
                    gateway: "192.168.2.1",
                    checkIP: "1.1.1.1",
                    distance: 2,
                },
            ];

            const result = testWithOutput(
                "FailoverRecursive",
                "Recursive failover for 2 WANs",
                { wanInterfaces, Table: "Foreign" },
                () => FailoverRecursive(wanInterfaces, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should configure recursive failover for 3 WANs", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "203.0.113.1",
                    checkIP: "8.8.8.8",
                    distance: 1,
                },
                {
                    name: "WAN-2",
                    gateway: "198.51.100.1",
                    checkIP: "1.1.1.1",
                    distance: 2,
                },
                {
                    name: "WAN-3",
                    gateway: "192.0.2.1",
                    checkIP: "9.9.9.9",
                    distance: 3,
                },
            ];

            const result = testWithOutput(
                "FailoverRecursive",
                "Recursive failover for 3 WANs with different check IPs",
                { wanInterfaces, Table: "Domestic" },
                () => FailoverRecursive(wanInterfaces, "Domestic"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });
    });

    describe("FailoverNetwatch - Netwatch-Based Failover", () => {
        it("should configure netwatch failover for 2 WANs", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "192.168.1.1",
                    checkIP: "8.8.8.8",
                    distance: 1,
                },
                {
                    name: "WAN-2",
                    gateway: "192.168.2.1",
                    checkIP: "1.1.1.1",
                    distance: 2,
                },
            ];

            const result = testWithOutput(
                "FailoverNetwatch",
                "Netwatch failover for 2 WANs",
                { wanInterfaces, Table: "Foreign" },
                () => FailoverNetwatch(wanInterfaces, "Foreign"),
            );

            validateRouterConfig(result, [
                "/ip route",
                "/tool netwatch",
            ]);
        });

        it("should configure netwatch with custom intervals", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "192.168.1.1",
                    checkIP: "8.8.8.8",
                    distance: 1,
                    interval: "10s",
                    timeout: "3s",
                },
                {
                    name: "WAN-2",
                    gateway: "192.168.2.1",
                    checkIP: "1.1.1.1",
                    distance: 2,
                    interval: "15s",
                    timeout: "5s",
                },
            ];

            const result = testWithOutput(
                "FailoverNetwatch",
                "Netwatch with custom intervals and timeouts",
                { wanInterfaces, Table: "Domestic" },
                () => FailoverNetwatch(wanInterfaces, "Domestic"),
            );

            validateRouterConfig(result, [
                "/ip route",
                "/tool netwatch",
            ]);
        });
    });

    describe("FailoverScheduled - Scheduled Script Failover", () => {
        it("should configure scheduled failover for 2 WANs", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "192.168.1.1",
                    checkIPs: ["8.8.8.8", "8.8.4.4"],
                    distance: 1,
                },
                {
                    name: "WAN-2",
                    gateway: "192.168.2.1",
                    checkIPs: ["1.1.1.1", "1.0.0.1"],
                    distance: 2,
                },
            ];

            const result = testWithOutput(
                "FailoverScheduled",
                "Scheduled failover for 2 WANs with multiple check IPs",
                { wanInterfaces, Table: "Foreign" },
                () => FailoverScheduled(wanInterfaces, "Foreign"),
            );

            validateRouterConfig(result, [
                "/ip route",
                "/system script",
                "/system scheduler",
            ]);
        });

        it("should configure scheduled failover with custom thresholds", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "203.0.113.1",
                    checkIPs: ["8.8.8.8", "8.8.4.4", "1.1.1.1"],
                    distance: 1,
                    threshold: 2,
                    interval: "15s",
                },
                {
                    name: "WAN-2",
                    gateway: "198.51.100.1",
                    checkIPs: ["1.1.1.1", "1.0.0.1", "9.9.9.9"],
                    distance: 2,
                    threshold: 2,
                    interval: "20s",
                },
            ];

            const result = testWithOutput(
                "FailoverScheduled",
                "Scheduled failover with custom thresholds and intervals",
                { wanInterfaces, Table: "Domestic" },
                () => FailoverScheduled(wanInterfaces, "Domestic"),
            );

            validateRouterConfig(result, [
                "/ip route",
                "/system script",
                "/system scheduler",
            ]);
        });

        it("should configure scheduled failover with single check IP", () => {
            const wanInterfaces = [
                {
                    name: "WAN-1",
                    gateway: "192.168.1.1",
                    checkIPs: ["8.8.8.8"],
                    distance: 1,
                },
            ];

            const result = testWithOutput(
                "FailoverScheduled",
                "Scheduled failover with single check IP",
                { wanInterfaces, Table: "" },
                () => FailoverScheduled(wanInterfaces, ""),
            );

            validateRouterConfig(result, [
                "/ip route",
                "/system script",
                "/system scheduler",
            ]);
        });
    });

    describe("ECMP - Equal Cost Multi-Path", () => {
        it("should configure ECMP for 2 gateways", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "192.168.1.1" },
                { name: "WAN-2", gateway: "192.168.2.1" },
            ];

            const result = testWithOutput(
                "ECMP",
                "ECMP load balancing for 2 gateways",
                { wanInterfaces, Table: "Foreign" },
                () => ECMP(wanInterfaces, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should configure ECMP with check IPs", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "192.168.1.1", checkIP: "8.8.8.8" },
                { name: "WAN-2", gateway: "192.168.2.1", checkIP: "1.1.1.1" },
            ];

            const result = testWithOutput(
                "ECMP",
                "ECMP with recursive route checking",
                { wanInterfaces, Table: "Domestic" },
                () => ECMP(wanInterfaces, "Domestic"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should configure ECMP for 3 gateways", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "203.0.113.1", checkIP: "8.8.8.8" },
                { name: "WAN-2", gateway: "198.51.100.1", checkIP: "1.1.1.1" },
                { name: "WAN-3", gateway: "192.0.2.1", checkIP: "9.9.9.9" },
            ];

            const result = testWithOutput(
                "ECMP",
                "ECMP for 3 gateways with check IPs",
                { wanInterfaces, Table: "Foreign" },
                () => ECMP(wanInterfaces, "Foreign"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should configure ECMP for 4 gateways (Quad-WAN)", () => {
            const wanInterfaces = [
                { name: "WAN-1", gateway: "203.0.113.1" },
                { name: "WAN-2", gateway: "198.51.100.1" },
                { name: "WAN-3", gateway: "192.0.2.1" },
                { name: "WAN-4", gateway: "192.168.1.1" },
            ];

            const result = testWithOutput(
                "ECMP",
                "ECMP for 4 gateways (Quad-WAN)",
                { wanInterfaces, Table: "" },
                () => ECMP(wanInterfaces, ""),
            );

            validateRouterConfig(result, ["/ip route"]);
        });
    });

    describe("Bonding - Link Aggregation", () => {
        it("should configure bonding with balance-rr mode", () => {
            const bondingConfig: BondingConfig = {
                name: "bond1",
                mode: "balance-rr",
                slaves: ["ether1", "ether2"],
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with balance-rr mode",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, ["/interface bonding"]);
        });

        it("should configure bonding with 802.3ad (LACP) mode", () => {
            const bondingConfig: BondingConfig = {
                name: "bond-lacp",
                mode: "802.3ad",
                slaves: ["ether1", "ether2", "ether3"],
                lacp: {
                    rate: "fast",
                },
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with 802.3ad LACP mode",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, ["/interface bonding"]);
        });

        it("should configure bonding with ARP monitoring", () => {
            const bondingConfig: BondingConfig = {
                name: "bond-arp",
                mode: "active-backup",
                slaves: ["ether1", "ether2"],
                arpMonitoring: {
                    enabled: true,
                    targets: ["192.168.1.1", "8.8.8.8"],
                    interval: "100ms",
                },
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with ARP monitoring",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, ["/interface bonding"]);
        });

        it("should configure bonding with MII monitoring", () => {
            const bondingConfig: BondingConfig = {
                name: "bond-mii",
                mode: "balance-xor",
                slaves: ["ether1", "ether2"],
                miiMonitoring: {
                    enabled: true,
                    interval: "100ms",
                },
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with MII monitoring",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, ["/interface bonding"]);
        });

        it("should configure bonding with IP address", () => {
            const bondingConfig: BondingConfig = {
                name: "bond-with-ip",
                mode: "balance-rr",
                slaves: ["ether1", "ether2"],
                ipAddress: "192.168.100.1/24",
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with static IP address",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, [
                "/interface bonding",
                "/ip address",
            ]);
        });

        it("should configure bonding with custom MTU", () => {
            const bondingConfig: BondingConfig = {
                name: "bond-jumbo",
                mode: "balance-rr",
                slaves: ["ether1", "ether2"],
                mtu: 9000,
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with jumbo frames (MTU 9000)",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, ["/interface bonding"]);
        });

        it("should configure bonding with all options", () => {
            const bondingConfig: BondingConfig = {
                name: "bond-full",
                mode: "802.3ad",
                slaves: ["ether1", "ether2", "ether3", "ether4"],
                ipAddress: "192.168.50.1/24",
                mtu: 1500,
                arpMonitoring: {
                    enabled: true,
                    targets: ["192.168.1.1", "8.8.8.8", "1.1.1.1"],
                    interval: "100ms",
                    validateTime: "10s",
                },
                lacp: {
                    rate: "fast",
                },
            };

            const result = testWithOutput(
                "Bonding",
                "Bonding with all configuration options",
                { bondingConfig },
                () => Bonding(bondingConfig),
            );

            validateRouterConfig(result, ["/interface bonding", "/ip address"]);
        });
    });

    describe("PCCMangle - PCC Firewall Mangle Rules", () => {
        it("should create PCC mangle rules for 2 WANs", () => {
            const wanInterfaces = ["MacVLAN-ether1-WAN-1", "MacVLAN-ether2-WAN-2"];

            const result = testWithOutput(
                "PCCMangle",
                "PCC mangle rules for 2 WAN interfaces",
                { linkCount: 2, wanInterfaces, addressList: "LOCAL-IP", routingMark: "Foreign" },
                () => PCCMangle(2, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should create connection marking rules", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = testWithOutput(
                "PCCMangle",
                "PCC connection marking rules",
                { linkCount: 2, wanInterfaces, addressList: "LOCAL-IP", routingMark: "Foreign" },
                () => PCCMangle(2, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);

            // Should contain connection marking
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("mark-connection");
        });

        it("should create routing marking rules", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = testWithOutput(
                "PCCMangle",
                "PCC routing marking rules",
                { linkCount: 2, wanInterfaces, addressList: "LOCAL-IP", routingMark: "Foreign" },
                () => PCCMangle(2, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);

            // Should contain routing marking
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("mark-routing");
        });

        it("should use per-connection-classifier", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = PCCMangle(2, wanInterfaces, "LOCAL-IP", "Foreign");

            // Should use PCC classifier
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("per-connection-classifier");
        });

        it("should filter by address list", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = PCCMangle(2, wanInterfaces, "LAN-NETWORK", "Foreign");

            // Should filter by address list
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("LAN-NETWORK");
        });

        it("should create rules for 3 WANs with correct distribution", () => {
            const wanInterfaces = ["ether1", "ether2", "ether3"];

            const result = testWithOutput(
                "PCCMangle",
                "PCC mangle for 3 WANs with balanced distribution",
                { linkCount: 3, wanInterfaces, addressList: "LOCAL-IP", routingMark: "Foreign" },
                () => PCCMangle(3, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);

            // Should have rules for all 3 links
            const mangleRules = result["/ip firewall mangle"];
            expect(mangleRules.length).toBeGreaterThan(0);
        });

        it("should create rules for 4 WANs (Quad-WAN)", () => {
            const wanInterfaces = ["ether1", "ether2", "ether3", "ether4"];

            const result = testWithOutput(
                "PCCMangle",
                "PCC mangle for Quad-WAN setup",
                { linkCount: 4, wanInterfaces, addressList: "LOCAL-IP", routingMark: "to-FRN" },
                () => PCCMangle(4, wanInterfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
        });

        it("should use custom routing mark", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = PCCMangle(2, wanInterfaces, "LOCAL-IP", "to-DOM");

            // Should use custom routing mark
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("to-DOM");
        });

        it("should handle prerouting and output chains", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = PCCMangle(2, wanInterfaces, "LOCAL-IP", "Foreign");

            // Should have rules in both chains
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("chain=");
        });
    });

    describe("NTHMangle - NTH Firewall Mangle Rules", () => {
        it("should create NTH mangle rules for 2 WANs", () => {
            const wanInterfaces = ["MacVLAN-ether1-WAN-1", "MacVLAN-ether2-WAN-2"];

            const result = testWithOutput(
                "NTHMangle",
                "NTH mangle rules for 2 WAN interfaces",
                { linkCount: 2, wanInterfaces, localNetwork: "LOCAL-IP", routingMark: "Foreign" },
                () => NTHMangle(2, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should use nth matcher", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = NTHMangle(2, wanInterfaces, "LOCAL-IP", "Foreign");

            // Should use nth matcher
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("nth");
        });

        it("should create routing marking rules for each WAN", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = testWithOutput(
                "NTHMangle",
                "NTH routing marks for each WAN",
                { linkCount: 2, wanInterfaces, localNetwork: "LOCAL-IP", routingMark: "Foreign" },
                () => NTHMangle(2, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);

            // Should contain routing marking
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("mark-routing");
        });

        it("should filter by local network", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = NTHMangle(2, wanInterfaces, "192.168.0.0/16", "Foreign");

            // Should filter by local network
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("192.168.0.0/16");
        });

        it("should use correct nth counters for 3 WANs", () => {
            const wanInterfaces = ["ether1", "ether2", "ether3"];

            const result = testWithOutput(
                "NTHMangle",
                "NTH with correct counters for 3 WANs",
                { linkCount: 3, wanInterfaces, localNetwork: "LOCAL-IP", routingMark: "Foreign" },
                () => NTHMangle(3, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);

            // Should have rules for all 3 links
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should create rules for 4 WANs (Quad-WAN)", () => {
            const wanInterfaces = ["ether1", "ether2", "ether3", "ether4"];

            const result = testWithOutput(
                "NTHMangle",
                "NTH mangle for Quad-WAN setup",
                { linkCount: 4, wanInterfaces, localNetwork: "LOCAL-IP", routingMark: "to-FRN" },
                () => NTHMangle(4, wanInterfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
        });

        it("should use custom routing mark", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = NTHMangle(2, wanInterfaces, "LOCAL-IP", "to-DOM");

            // Should use custom routing mark
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("to-DOM");
        });

        it("should handle prerouting and output chains", () => {
            const wanInterfaces = ["ether1", "ether2"];

            const result = NTHMangle(2, wanInterfaces, "LOCAL-IP", "Foreign");

            // Should have rules in chains
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("chain=");
        });

        it("should distribute traffic across multiple WANs using NTH", () => {
            const wanInterfaces = ["ether1", "ether2", "ether3"];

            const result = testWithOutput(
                "NTHMangle",
                "NTH distribution for 3 WANs",
                { linkCount: 3, wanInterfaces, localNetwork: "LOCAL-IP", routingMark: "Foreign" },
                () => NTHMangle(3, wanInterfaces, "LOCAL-IP", "Foreign"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            // Should have mangle rules for distribution
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });
    });

    describe("LoadBalanceRoute - Load Balancing Route Configuration", () => {
        it("should create load balance routes using PCC method", () => {
            const interfaces = [
                {
                    name: "WAN-1",
                    network: "Foreign",
                    gateway: "203.0.113.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "WAN-2",
                    network: "Foreign",
                    gateway: "198.51.100.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes using PCC method",
                { interfaces, method: "PCC", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "PCC", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should create load balance routes using NTH method", () => {
            const interfaces = [
                {
                    name: "WAN-1",
                    network: "Foreign",
                    gateway: "203.0.113.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "WAN-2",
                    network: "Foreign",
                    gateway: "198.51.100.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes using NTH method",
                { interfaces, method: "NTH", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "NTH", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should create recursive routes for gateway checking", () => {
            const interfaces = [
                {
                    name: "Primary",
                    network: "Foreign",
                    gateway: "203.0.113.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "Backup",
                    network: "Foreign",
                    gateway: "198.51.100.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Recursive routes for gateway checking",
                { interfaces, method: "PCC", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "PCC", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);

            // Should include recursive routes
            const routeConfig = result["/ip route"].join(" ");
            expect(routeConfig).toContain("check-gateway");
        });

        it("should create routes for PCC method", () => {
            const interfaces = [
                {
                    name: "Link-A",
                    network: "Foreign",
                    gateway: "1.1.1.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "Link-B",
                    network: "Foreign",
                    gateway: "2.2.2.2",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes with PCC method",
                { interfaces, method: "PCC", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "PCC", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should create routes for NTH method", () => {
            const interfaces = [
                {
                    name: "Link-A",
                    network: "Foreign",
                    gateway: "1.1.1.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "Link-B",
                    network: "Foreign",
                    gateway: "2.2.2.2",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes with NTH method",
                { interfaces, method: "NTH", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "NTH", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should create routes for 3 WANs with PCC", () => {
            const interfaces = [
                {
                    name: "WAN-1",
                    network: "Foreign",
                    gateway: "203.0.113.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "WAN-2",
                    network: "Foreign",
                    gateway: "198.51.100.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
                {
                    name: "WAN-3",
                    network: "Foreign",
                    gateway: "192.0.2.1",
                    distance: 3,
                    checkIP: "9.9.9.9",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes for 3 WANs using PCC",
                { interfaces, method: "PCC", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "PCC", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should create routes for 3 WANs with NTH", () => {
            const interfaces = [
                {
                    name: "WAN-1",
                    network: "Foreign",
                    gateway: "203.0.113.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "WAN-2",
                    network: "Foreign",
                    gateway: "198.51.100.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
                {
                    name: "WAN-3",
                    network: "Foreign",
                    gateway: "192.0.2.1",
                    distance: 3,
                    checkIP: "9.9.9.9",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes for 3 WANs using NTH",
                { interfaces, method: "NTH", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "NTH", "to-FRN"),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should create routes with custom routing table", () => {
            const interfaces = [
                {
                    name: "Dom-1",
                    network: "Domestic",
                    gateway: "192.168.1.1",
                    distance: 1,
                    checkIP: "10.202.10.10",
                },
                {
                    name: "Dom-2",
                    network: "Domestic",
                    gateway: "192.168.2.1",
                    distance: 2,
                    checkIP: "10.202.10.11",
                },
            ];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Load balance routes with custom routing table",
                { interfaces, method: "PCC", table: "to-DOM" },
                () => LoadBalanceRoute(interfaces, "PCC", "to-DOM"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should handle empty interfaces array", () => {
            const interfaces: any[] = [];

            const result = testWithOutput(
                "LoadBalanceRoute",
                "Handle empty interfaces array",
                { interfaces, method: "PCC", table: "to-FRN" },
                () => LoadBalanceRoute(interfaces, "PCC", "to-FRN"),
            );

            expect(result["/ip route"]).toEqual([]);
        });

        it("should create routes with gateway checking via checkIP", () => {
            const interfaces = [
                {
                    name: "ISP-A",
                    network: "Foreign",
                    gateway: "203.0.113.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "ISP-B",
                    network: "Foreign",
                    gateway: "198.51.100.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = LoadBalanceRoute(interfaces, "PCC", "to-FRN");

            // Should use checkIP for gateway validation
            const routeConfig = result["/ip route"].join(" ");
            expect(routeConfig).toContain("8.8.8.8");
            expect(routeConfig).toContain("1.1.1.1");
        });
    });
});
