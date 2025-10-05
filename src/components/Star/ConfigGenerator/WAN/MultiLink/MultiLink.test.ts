import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    PCC,
    NTH,
    MainTableRoute,
} from "./MultiLink";
import type { MultiWANInterface } from "./MultiLinkUtil";
import type { VPNClient } from "../../../StarContext/Utils/VPNClientType";
import type { WANLinks } from "../../../StarContext/Utils/WANLinkType";

describe("MultiLink Module - High-Level Functions", () => {
    describe("PCC - Per Connection Classifier", () => {
        it("should configure complete PCC load balancing for 2 WANs", () => {
            const interfaces: MultiWANInterface[] = [
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
                "PCC",
                "Complete PCC configuration for 2 WANs",
                { interfaces, addressList: "LOCAL-IP", routingMark: "to-FRN" },
                () => PCC(interfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);
        });

        it("should configure PCC load balancing for 3 WANs", () => {
            const interfaces: MultiWANInterface[] = [
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
                "PCC",
                "PCC configuration for 3 WANs",
                { interfaces, addressList: "LOCAL-IP", routingMark: "to-FRN" },
                () => PCC(interfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);

            // Should have mangle rules
            expect(result["/ip firewall mangle"]).toBeDefined();
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);

            // Should have route rules
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should configure PCC with custom address list", () => {
            const interfaces: MultiWANInterface[] = [
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
                "PCC",
                "PCC with custom address list",
                { interfaces, addressList: "LAN-NETWORK", routingMark: "Foreign" },
                () => PCC(interfaces, "LAN-NETWORK", "Foreign"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);

            // Verify address list is used in mangle rules
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("LAN-NETWORK");
        });

        it("should configure PCC with custom routing mark", () => {
            const interfaces: MultiWANInterface[] = [
                {
                    name: "Primary",
                    network: "Domestic",
                    gateway: "192.168.1.1",
                    distance: 1,
                    checkIP: "10.202.10.10",
                },
                {
                    name: "Backup",
                    network: "Domestic",
                    gateway: "192.168.2.1",
                    distance: 2,
                    checkIP: "10.202.10.11",
                },
            ];

            const result = testWithOutput(
                "PCC",
                "PCC with custom routing mark for Domestic",
                { interfaces, addressList: "LOCAL-IP", routingMark: "to-DOM" },
                () => PCC(interfaces, "LOCAL-IP", "to-DOM"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);

            // Verify routing mark is used in mangle rules
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("to-DOM");
        });

        it("should configure PCC for 4 WANs (Quad-WAN)", () => {
            const interfaces: MultiWANInterface[] = [
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
                {
                    name: "WAN-4",
                    network: "Foreign",
                    gateway: "192.168.1.1",
                    distance: 4,
                    checkIP: "208.67.222.222",
                },
            ];

            const result = testWithOutput(
                "PCC",
                "PCC for Quad-WAN setup",
                { interfaces, addressList: "LOCAL-IP", routingMark: "to-FRN" },
                () => PCC(interfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);
        });

        it("should include both mangle and routing configurations", () => {
            const interfaces: MultiWANInterface[] = [
                {
                    name: "ISP-1",
                    network: "Foreign",
                    gateway: "100.64.0.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "ISP-2",
                    network: "Foreign",
                    gateway: "100.64.1.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = PCC(interfaces, "LOCAL-IP", "Foreign");

            // Should have both mangle and route sections
            expect(result["/ip firewall mangle"]).toBeDefined();
            expect(result["/ip route"]).toBeDefined();

            // Mangle should mark connections and routes
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);

            // Routes should include recursive checks and main routes
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });
    });

    describe("NTH - Nth Packet Load Balancing", () => {
        it("should configure complete NTH load balancing for 2 WANs", () => {
            const interfaces: MultiWANInterface[] = [
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
                "NTH",
                "Complete NTH configuration for 2 WANs",
                { interfaces, localNetwork: "LOCAL-IP", routingMark: "to-FRN" },
                () => NTH(interfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);
        });

        it("should configure NTH load balancing for 3 WANs", () => {
            const interfaces: MultiWANInterface[] = [
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
                "NTH",
                "NTH configuration for 3 WANs",
                { interfaces, localNetwork: "LOCAL-IP", routingMark: "to-FRN" },
                () => NTH(interfaces, "LOCAL-IP", "to-FRN"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);

            // Should have mangle rules with NTH counters
            expect(result["/ip firewall mangle"]).toBeDefined();
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);

            // Should have route rules
            expect(result["/ip route"]).toBeDefined();
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should configure NTH with custom local network", () => {
            const interfaces: MultiWANInterface[] = [
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
                "NTH",
                "NTH with custom local network",
                { interfaces, localNetwork: "192.168.0.0/16", routingMark: "Foreign" },
                () => NTH(interfaces, "192.168.0.0/16", "Foreign"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);

            // Verify local network is used in mangle rules
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("192.168.0.0/16");
        });

        it("should configure NTH with custom routing mark for Domestic", () => {
            const interfaces: MultiWANInterface[] = [
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
                "NTH",
                "NTH with routing mark for Domestic network",
                { interfaces, localNetwork: "LOCAL-IP", routingMark: "to-DOM" },
                () => NTH(interfaces, "LOCAL-IP", "to-DOM"),
            );

            validateRouterConfig(result, [
                "/ip firewall mangle",
                "/ip route",
            ]);

            // Verify routing mark is used in mangle rules
            const mangleRules = result["/ip firewall mangle"].join(" ");
            expect(mangleRules).toContain("to-DOM");
        });

        it("should include both mangle and routing configurations", () => {
            const interfaces: MultiWANInterface[] = [
                {
                    name: "Link-1",
                    network: "Foreign",
                    gateway: "100.64.0.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "Link-2",
                    network: "Foreign",
                    gateway: "100.64.1.1",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = NTH(interfaces, "LOCAL-IP", "Foreign");

            // Should have both mangle and route sections
            expect(result["/ip firewall mangle"]).toBeDefined();
            expect(result["/ip route"]).toBeDefined();

            // Mangle should mark connections with NTH counters
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);

            // Routes should include recursive checks and main routes
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should use NTH method for load balancing routes", () => {
            const interfaces: MultiWANInterface[] = [
                {
                    name: "A",
                    network: "Foreign",
                    gateway: "1.1.1.1",
                    distance: 1,
                    checkIP: "8.8.8.8",
                },
                {
                    name: "B",
                    network: "Foreign",
                    gateway: "2.2.2.2",
                    distance: 2,
                    checkIP: "1.1.1.1",
                },
            ];

            const result = NTH(interfaces, "LOCAL-IP", "to-FRN");

            // Verify NTH is mentioned in comments
            const routeConfig = result["/ip route"].join(" ");
            expect(routeConfig).toContain("NTH");
        });
    });

    describe("MainTableRoute", () => {
        it("should generate main table routes with VPN only", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-VPN-1",
                        InterfaceAddress: "10.0.0.2/24",
                        PublicKey: "test-pub-key",
                        PrivateKey: "test-priv-key",
                        Endpoint: "vpn.server.com:51820",
                        priority: 1,
                    },
                    {
                        Name: "WG-VPN-2",
                        InterfaceAddress: "10.0.1.2/24",
                        PublicKey: "test-pub-key-2",
                        PrivateKey: "test-priv-key-2",
                        Endpoint: "vpn2.server.com:51820",
                        priority: 2,
                    },
                ],
            };

            const result = testWithOutput(
                "MainTableRoute",
                "Main table routes with VPN clients only",
                { vpnClient },
                () => MainTableRoute(vpnClient, undefined),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should generate main table routes with Domestic WAN only", () => {
            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-WAN-1",
                            InterfaceConfig: {
                                InterfaceName: "ether1",
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
                },
            };

            const result = testWithOutput(
                "MainTableRoute",
                "Main table routes with Domestic WAN only",
                { wanLinks },
                () => MainTableRoute(undefined, wanLinks),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should generate main table routes with Foreign WAN only", () => {
            const wanLinks: WANLinks = {
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-WAN-1",
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
                },
            };

            const result = testWithOutput(
                "MainTableRoute",
                "Main table routes with Foreign WAN only",
                { wanLinks },
                () => MainTableRoute(undefined, wanLinks),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should combine VPN, Domestic, and Foreign in priority order", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-VPN",
                        InterfaceAddress: "10.0.0.2/24",
                        PublicKey: "pub-key",
                        PrivateKey: "priv-key",
                        Endpoint: "vpn.com:51820",
                        priority: 1,
                    },
                ],
            };

            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-1",
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
                            priority: 2,
                        },
                    ],
                },
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-1",
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
                            priority: 3,
                        },
                    ],
                },
            };

            const result = testWithOutput(
                "MainTableRoute",
                "Main table with VPN, Domestic, and Foreign (priority order)",
                { vpnClient, wanLinks },
                () => MainTableRoute(vpnClient, wanLinks),
            );

            validateRouterConfig(result, ["/ip route"]);

            // Should have routes for all 3 types
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should handle multiple interfaces of each type", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-1",
                        InterfaceAddress: "10.0.0.2/24",
                        PublicKey: "key1",
                        PrivateKey: "priv1",
                        Endpoint: "vpn1.com:51820",
                        priority: 1,
                    },
                    {
                        Name: "WG-2",
                        InterfaceAddress: "10.0.1.2/24",
                        PublicKey: "key2",
                        PrivateKey: "priv2",
                        Endpoint: "vpn2.com:51820",
                        priority: 2,
                    },
                ],
                OpenVPN: [
                    {
                        Name: "OVPN-1",
                        Server: { Address: "ovpn.com", Port: 1194 },
                        Username: "user",
                        Password: "pass",
                        Certificate: "cert",
                        priority: 3,
                    },
                ],
            };

            const wanLinks: WANLinks = {
                Domestic: {
                    WANConfigs: [
                        {
                            name: "Dom-1",
                            InterfaceConfig: {
                                InterfaceName: "ether2",
                            },
                            priority: 4,
                        },
                        {
                            name: "Dom-2",
                            InterfaceConfig: {
                                InterfaceName: "ether3",
                            },
                            priority: 5,
                        },
                    ],
                },
                Foreign: {
                    WANConfigs: [
                        {
                            name: "For-1",
                            InterfaceConfig: {
                                InterfaceName: "ether1",
                            },
                            priority: 6,
                        },
                    ],
                },
            };

            const result = testWithOutput(
                "MainTableRoute",
                "Main table with multiple interfaces of each type",
                { vpnClient, wanLinks },
                () => MainTableRoute(vpnClient, wanLinks),
            );

            validateRouterConfig(result, ["/ip route"]);

            // Should have routes for all 6 interfaces (2 WG + 1 OVPN + 2 Dom + 1 For)
            expect(result["/ip route"].length).toBeGreaterThan(0);
        });

        it("should return empty config for no interfaces", () => {
            const result = testWithOutput(
                "MainTableRoute",
                "Empty inputs should return minimal config",
                {},
                () => MainTableRoute(undefined, undefined),
            );

            expect(result).toEqual({ "/ip route": [] });
        });

        it("should handle empty WAN links but with VPN", () => {
            const vpnClient: VPNClient = {
                Wireguard: [
                    {
                        Name: "WG-Only",
                        InterfaceAddress: "10.0.0.2/24",
                        PublicKey: "pub",
                        PrivateKey: "priv",
                        Endpoint: "vpn.com:51820",
                    },
                ],
            };

            const wanLinks: WANLinks = {};

            const result = testWithOutput(
                "MainTableRoute",
                "VPN with empty WAN links",
                { vpnClient, wanLinks },
                () => MainTableRoute(vpnClient, wanLinks),
            );

            validateRouterConfig(result, ["/ip route"]);
        });

        it("should use main routing table", () => {
            const wanLinks: WANLinks = {
                Foreign: {
                    WANConfigs: [
                        {
                            name: "Foreign-1",
                            InterfaceConfig: {
                                InterfaceName: "ether1",
                            },
                        },
                    ],
                },
            };

            const result = MainTableRoute(undefined, wanLinks);

            // Routes should be in main table
            const routeConfig = result["/ip route"].join(" ");
            expect(routeConfig).toContain("main");
        });

        it("should implement recursive failover by default", () => {
            const wanLinks: WANLinks = {
                Foreign: {
                    WANConfigs: [
                        {
                            name: "Primary",
                            InterfaceConfig: {
                                InterfaceName: "ether1",
                            },
                            priority: 1,
                        },
                        {
                            name: "Backup",
                            InterfaceConfig: {
                                InterfaceName: "ether2",
                            },
                            priority: 2,
                        },
                    ],
                },
            };

            const result = MainTableRoute(undefined, wanLinks);

            // Should have recursive route checking
            const routeConfig = result["/ip route"].join(" ");
            expect(routeConfig).toContain("Recursive");
        });
    });
});
