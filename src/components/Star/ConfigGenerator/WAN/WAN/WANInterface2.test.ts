// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     testWithGenericOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import {
//     generateConnectionConfig,
//     generateInterfaceConfig,
//     generateWANLinkConfig,
//     generateWANLinksConfig,
//     DFSingleLink,
//     DFMultiLink,
// } from "./WANInterface";
// import type {
//     WANLinkConfig,
//     WANLinks,
//     WANLink,
// } from "../../../StarContext/Utils/WANLinkType";

// describe("WANInterface Module", () => {

//     // Note: Interface naming logic (including auto-MACVLAN creation) is now tested
//     // in WANUtils.test.ts via the GetWANInterface function


//     describe("generateWANLinksConfig", () => {
//         it("should generate configuration for single WAN link", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "WAN-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "generateWANLinksConfig",
//                 "Single WAN link with DHCP",
//                 { wanLinks },
//                 () => generateWANLinksConfig(wanLinks),
//             );

//             validateRouterConfig(result, [
//                 "/interface macvlan",
//                 "/interface ethernet", // Added: Interface comment
//                 "/interface list member",
//                 "/ip dhcp-client",
//             ]);

//             // Verify interface comment is present
//             expect(result["/interface ethernet"]).toBeDefined();
//             expect(result["/interface ethernet"][0]).toContain("Foreign WAN - WAN-1");
//         });

//         it("should generate configuration for multiple WAN links", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "WAN-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                         {
//                             name: "WAN-2",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether2",
//                             },
//                             ConnectionConfig: {
//                                 pppoe: {
//                                     username: "user2",
//                                     password: "pass2",
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "generateWANLinksConfig",
//                 "Two WAN links: DHCP and PPPoE",
//                 { wanLinks },
//                 () => generateWANLinksConfig(wanLinks),
//             );

//             validateRouterConfig(result, [
//                 "/interface macvlan",
//                 "/interface ethernet", // Added: Interface comments
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/interface pppoe-client",
//             ]);

//             // Verify interface comments are present for both interfaces
//             expect(result["/interface ethernet"]).toBeDefined();
//             expect(result["/interface ethernet"]).toHaveLength(2);
//         });

//         it("should handle multiple WANLink groups", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "Foreign-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                     ],
//                 },
//                 Domestic: {
//                     WANConfigs: [
//                         {
//                             name: "Domestic-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether2",
//                             },
//                             ConnectionConfig: {
//                                 static: {
//                                     ipAddress: "192.168.1.100",
//                                     subnet: "255.255.255.0",
//                                     gateway: "192.168.1.1",
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "generateWANLinksConfig",
//                 "Multiple WANLink groups: Foreign and Domestic",
//                 { wanLinks },
//                 () => generateWANLinksConfig(wanLinks),
//             );

//             validateRouterConfig(result, [
//                 "/interface macvlan",
//                 "/interface ethernet", // Added: Interface comments for both Foreign and Domestic
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/ip address",
//             ]);

//             // Verify interface comments for both Foreign and Domestic
//             expect(result["/interface ethernet"]).toBeDefined();
//             expect(result["/interface ethernet"]).toHaveLength(2);
//             expect(result["/interface ethernet"][0]).toContain("Foreign WAN");
//             expect(result["/interface ethernet"][1]).toContain("Domestic WAN");
//         });

//         it("should handle empty WAN links object", () => {
//             const wanLinks: WANLinks = {};

//             const result = testWithOutput(
//                 "generateWANLinksConfig",
//                 "Empty WAN links object",
//                 { wanLinks },
//                 () => generateWANLinksConfig(wanLinks),
//             );

//             validateRouterConfig(result, []);
//         });

//         it("should handle WANLink with empty WANConfigs", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [],
//                 },
//             };

//             const result = testWithOutput(
//                 "generateWANLinksConfig",
//                 "WANLink with empty WANConfigs",
//                 { wanLinks },
//                 () => generateWANLinksConfig(wanLinks),
//             );

//             validateRouterConfig(result, []);
//         });

//         it("should generate complex multi-WAN scenario", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "WAN-Ethernet",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                         {
//                             name: "WAN-VLAN",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether2",
//                                 VLANID: "100",
//                             },
//                             ConnectionConfig: {
//                                 pppoe: {
//                                     username: "vlanuser",
//                                     password: "vlanpass",
//                                 },
//                             },
//                         },
//                         {
//                             name: "WAN-WiFi",
//                             InterfaceConfig: {
//                                 InterfaceName: "wifi5",
//                                 WirelessCredentials: {
//                                     SSID: "BackupWiFi",
//                                     Password: "wifipass",
//                                 },
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                         {
//                             name: "WAN-LTE",
//                             InterfaceConfig: {
//                                 InterfaceName: "lte1",
//                             },
//                             ConnectionConfig: {
//                                 lteSettings: {
//                                     apn: "mobile.internet",
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "generateWANLinksConfig",
//                 "Complex multi-WAN: Ethernet, VLAN+PPPoE, WiFi, LTE",
//                 { wanLinks },
//                 () => generateWANLinksConfig(wanLinks),
//             );

//             validateRouterConfig(result, [
//                 "/interface macvlan",
//                 "/interface vlan",
//                 "/interface ethernet", // Added: Interface comments for ethernet
//                 "/interface wifi", // Interface comment for wifi
//                 "/interface lte", // Interface comment for LTE
//                 "/interface list member",
//                 "/ip dhcp-client",
//                 "/interface pppoe-client",
//                 "/interface lte apn",
//             ]);

//             // Verify interface comments for all interface types
//             expect(result["/interface ethernet"]).toBeDefined();
//             expect(result["/interface ethernet"]).toHaveLength(2); // ether1 and ether2
//             expect(result["/interface wifi"]).toBeDefined();
//             expect(result["/interface wifi"]).toHaveLength(1); // wifi5 wireless config only (no separate comment, it's in wireless config)
//             expect(result["/interface lte"]).toBeDefined();
//             expect(result["/interface lte"]).toHaveLength(2); // LTE APN config + interface comment
//             expect(result["/interface lte"][1]).toContain("Foreign WAN - WAN-LTE");
//         });

//         it("should generate interface comments for all physical interfaces", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "Ether-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                     ],
//                 },
//                 Domestic: {
//                     WANConfigs: [
//                         {
//                             name: "Ether-2",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether2",
//                             },
//                             ConnectionConfig: {
//                                 isDHCP: true,
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = generateWANLinksConfig(wanLinks);

//             // Verify both Foreign and Domestic comments are present
//             expect(result["/interface ethernet"]).toBeDefined();
//             expect(result["/interface ethernet"]).toHaveLength(2);
            
//             const foreignComment = result["/interface ethernet"].find(cmd => 
//                 cmd.includes("Foreign WAN")
//             );
//             expect(foreignComment).toContain("Foreign WAN - Ether-1");
            
//             const domesticComment = result["/interface ethernet"].find(cmd => 
//                 cmd.includes("Domestic WAN")
//             );
//             expect(domesticComment).toContain("Domestic WAN - Ether-2");
//         });

//         describe("Advanced Multi-Link Scenarios - Foreign + Domestic Combinations", () => {
//             // Category 1: Both Networks with Multi-Link Strategies

//             it("should handle Foreign (2 links, PCC) + Domestic (2 links, NTH)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "203.0.113.1",
//                                         ipAddress: "203.0.113.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                             {
//                                 name: "Foreign-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "203.0.113.65",
//                                         ipAddress: "203.0.113.70",
//                                         subnet: "255.255.255.192",
//                                     },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-1",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "192.168.1.1",
//                                         ipAddress: "192.168.1.100",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                             {
//                                 name: "Domestic-2",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "192.168.2.1",
//                                         ipAddress: "192.168.2.100",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (2 links, PCC) + Domestic (2 links, NTH)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/interface list member",
//                     "/ip address",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Verify both routing tables exist
//                 expect(result["/ip route"]).toBeDefined();
//                 const routes = result["/ip route"];
//                 expect(routes.some((r) => r.includes("to-Foreign"))).toBe(true);
//                 expect(routes.some((r) => r.includes("to-Domestic"))).toBe(true);

//                 // Verify mangle rules for both networks
//                 expect(result["/ip firewall mangle"]).toBeDefined();
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Foreign-LAN"))).toBe(true);
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//             });

//             it("should handle Foreign (3 links, Failover) + Domestic (2 links, PCC)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Primary",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-Backup1",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Foreign-Backup2",
//                                 InterfaceConfig: { InterfaceName: "ether5" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 3,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-1",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-2",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (3 links, Failover) + Domestic (2 links, PCC)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/ip dhcp-client",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Foreign should have recursive failover routes (no mangle)
//                 const routes = result["/ip route"];
//                 const foreignRoutes = routes.filter((r) => r.includes("to-Foreign"));
//                 expect(foreignRoutes.length).toBeGreaterThan(0);

//                 // Domestic should have PCC mangle rules
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//                 // Foreign should NOT have mangle rules (failover only)
//                 const foreignMangle = mangleRules.filter((r) => r.includes("Foreign-LAN"));
//                 expect(foreignMangle.length).toBe(0);
//             });

//             it("should handle Foreign (2 links, Both) + Domestic (2 links, RoundRobin)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "100.64.1.1",
//                                         ipAddress: "100.64.1.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                             {
//                                 name: "Foreign-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "100.64.2.1",
//                                         ipAddress: "100.64.2.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Both",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-1",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-2",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "RoundRobin",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (Both strategy) + Domestic (RoundRobin)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Foreign with "Both" should have BOTH mangle and routes
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Foreign-LAN"))).toBe(true);

//                 const routes = result["/ip route"];
//                 expect(routes.some((r) => r.includes("to-Foreign"))).toBe(true);

//                 // Domestic with RoundRobin uses NTH
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//                 expect(routes.some((r) => r.includes("to-Domestic"))).toBe(true);
//             });

//             it("should handle Foreign (4 links, ECMP fallback) + Domestic (3 links, PCC)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F3",
//                                 InterfaceConfig: { InterfaceName: "wifi5" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F4",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "ECMP", // Should fallback to PCC
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "D1",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "D2",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "D3",
//                                 InterfaceConfig: { InterfaceName: "ether5" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (4 links, ECMP->PCC) + Domestic (3 links, PCC)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/interface lte",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Both should use PCC and have mangle rules
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Foreign-LAN"))).toBe(true);
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//             });

//             it("should handle Foreign (2 mixed PPPoE+Static) + Domestic (2 mixed DHCP+LTE)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-PPPoE",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "user1",
//                                         password: "pass1",
//                                     },
//                                 },
//                             },
//                             {
//                                 name: "Foreign-Static",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "203.0.113.1",
//                                         ipAddress: "203.0.113.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-DHCP",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-LTE",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "mobile.data" },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (PPPoE+Static) + Domestic (DHCP+LTE)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface pppoe-client",
//                     "/interface lte",
//                     "/ip dhcp-client",
//                     "/ip address",
//                     "/ip route",
//                 ]);

//                 // Verify PPPoE interface is created
//                 expect(result["/interface pppoe-client"]).toBeDefined();
//                 expect(result["/interface pppoe-client"][0]).toContain("Foreign-PPPoE");

//                 // Verify LTE config
//                 expect(result["/interface lte"]).toBeDefined();
//             });

//             it("should handle Foreign (5 links, NTH) + Domestic (4 links, PCC)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             { name: "F1", InterfaceConfig: { InterfaceName: "ether1" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "F2", InterfaceConfig: { InterfaceName: "ether2" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "F3", InterfaceConfig: { InterfaceName: "ether5" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "F4", InterfaceConfig: { InterfaceName: "ether6" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "F5", InterfaceConfig: { InterfaceName: "ether7" }, ConnectionConfig: { isDHCP: true } },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             { name: "D1", InterfaceConfig: { InterfaceName: "ether3" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D2", InterfaceConfig: { InterfaceName: "ether4" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D3", InterfaceConfig: { InterfaceName: "ether8" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D4", InterfaceConfig: { InterfaceName: "ether9" }, ConnectionConfig: { isDHCP: true } },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (5 links, NTH) + Domestic (4 links, PCC) - Scaling test",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/ip firewall mangle",
//                     "/ip route",
//                 ]);

//                 // Verify mangle rules scale properly
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.length).toBeGreaterThan(10); // Should have many rules for 9 total links

//                 // Verify interface comments for many interfaces
//                 expect(result["/interface ethernet"]).toBeDefined();
//                 expect(result["/interface ethernet"].length).toBe(9); // All 9 ethernet interfaces
//             });

//             // Category 2: Mixed Single/Multi Combinations

//             it("should handle Foreign single (Static) + Domestic multi (3 links, Failover)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Only",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "203.0.113.1",
//                                         ipAddress: "203.0.113.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-Primary",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Domestic-Backup1",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 2,
//                             },
//                             {
//                                 name: "Domestic-Backup2",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 3,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign single + Domestic multi (3 links, Failover)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/ip address",
//                     "/ip dhcp-client",
//                     "/ip route",
//                 ]);

//                 const routes = result["/ip route"];

//                 // Foreign single link should use DFSingleLink
//                 const foreignRoute = routes.find((r) => r.includes("to-Foreign"));
//                 expect(foreignRoute).toBeDefined();
//                 expect(foreignRoute).toContain("203.0.113.1%");
//                 expect(foreignRoute).toContain('comment="Route-to-Foreign-Foreign-Only"');

//                 // Domestic multi-link should use DFMultiLink with failover
//                 const domesticRoutes = routes.filter((r) => r.includes("to-Domestic"));
//                 expect(domesticRoutes.length).toBeGreaterThan(1); // Multiple failover routes
//             });

//             it("should handle Foreign multi (2 links, PCC) + Domestic single (PPPoE)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Foreign-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-PPPoE",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: {
//                                     pppoe: {
//                                         username: "domestic_user",
//                                         password: "domestic_pass",
//                                     },
//                                 },
//                             },
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign multi (PCC) + Domestic single (PPPoE)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface pppoe-client",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Foreign multi should have PCC mangle rules
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Foreign-LAN"))).toBe(true);

//                 // Domestic single PPPoE should use DFSingleLink with pppoe-client interface
//                 const routes = result["/ip route"];
//                 const domesticRoute = routes.find((r) =>
//                     r.includes("to-Domestic") && r.includes("pppoe-client-Domestic-PPPoE")
//                 );
//                 expect(domesticRoute).toBeDefined();
//                 // PPPoE gateway should be interface-only (no IP address)
//                 expect(domesticRoute).toContain("gateway=pppoe-client-Domestic-PPPoE");
//                 expect(domesticRoute).not.toContain("%pppoe-client"); // Should not have % for PPPoE
//             });

//             it("should handle Foreign single (LTE) + Domestic multi (2 links, RoundRobin)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-LTE",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "RoundRobin",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign single (LTE) + Domestic multi (RoundRobin)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface lte",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Foreign LTE single should use interface-only gateway
//                 const routes = result["/ip route"];
//                 const foreignRoute = routes.find((r) => r.includes("to-Foreign"));
//                 expect(foreignRoute).toBeDefined();
//                 expect(foreignRoute).toContain("gateway=lte1");
//                 expect(foreignRoute).not.toContain("%"); // LTE uses interface-only gateway

//                 // Domestic should have NTH mangle rules (RoundRobin uses NTH)
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//             });

//             it("should handle Foreign single (DHCP) + Domestic single (Static)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-DHCP",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-Static",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "192.168.1.1",
//                                         ipAddress: "192.168.1.100",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign single (DHCP) + Domestic single (Static) - Both use DFSingleLink",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/ip dhcp-client",
//                     "/ip address",
//                     "/ip route",
//                 ]);

//                 const routes = result["/ip route"];

//                 // Foreign DHCP should use default gateway
//                 const foreignRoute = routes.find((r) => r.includes("to-Foreign"));
//                 expect(foreignRoute).toBeDefined();
//                 expect(foreignRoute).toContain("gateway=100.64.0.1%");

//                 // Domestic Static should use configured gateway
//                 const domesticRoute = routes.find((r) => r.includes("to-Domestic"));
//                 expect(domesticRoute).toBeDefined();
//                 expect(domesticRoute).toContain("gateway=192.168.1.1%");

//                 // Both networks should have routes
//                 expect(routes.some((r) => r.includes("to-Foreign"))).toBe(true);
//                 expect(routes.some((r) => r.includes("to-Domestic"))).toBe(true);
//             });

//             // Category 3: Edge Cases with Both Networks

//             it("should handle Foreign (2 PPPoE links, Failover) + Domestic (1 PPPoE link)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-PPPoE-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: {
//                                     pppoe: { username: "foreign1", password: "pass1" },
//                                 },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Foreign-PPPoE-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     pppoe: { username: "foreign2", password: "pass2" },
//                                 },
//                                 priority: 2,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-PPPoE",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: {
//                                     pppoe: { username: "domestic1", password: "pass3" },
//                                 },
//                             },
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "All PPPoE connections - Foreign multi + Domestic single",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface pppoe-client",
//                     "/ip route",
//                 ]);

//                 // Verify all PPPoE interfaces are created
//                 const pppoeInterfaces = result["/interface pppoe-client"];
//                 expect(pppoeInterfaces.length).toBe(3);
//                 expect(pppoeInterfaces.some((i) => i.includes("Foreign-PPPoE-1"))).toBe(true);
//                 expect(pppoeInterfaces.some((i) => i.includes("Foreign-PPPoE-2"))).toBe(true);
//                 expect(pppoeInterfaces.some((i) => i.includes("Domestic-PPPoE"))).toBe(true);

//                 // Verify gateways use interface names only (no IP + %)
//                 const routes = result["/ip route"];
//                 routes.forEach((route) => {
//                     if (route.includes("pppoe-client")) {
//                         // PPPoE routes should not have % separator
//                         expect(route).not.toContain("%pppoe");
//                     }
//                 });
//             });

//             it("should handle Foreign (wireless+ethernet, 2 links) + Domestic (wireless, 2 links)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-WiFi",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi5",
//                                     WirelessCredentials: {
//                                         SSID: "ForeignWiFi",
//                                         Password: "foreignpass",
//                                     },
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Foreign-Ether",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-WiFi1",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi2.4",
//                                     WirelessCredentials: {
//                                         SSID: "DomesticWiFi1",
//                                         Password: "domesticpass1",
//                                     },
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-WiFi2",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wlan0",
//                                     WirelessCredentials: {
//                                         SSID: "DomesticWiFi2",
//                                         Password: "domesticpass2",
//                                     },
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Wireless interfaces - Foreign (wifi+ether) + Domestic (2 wifi)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface wifi",
//                     "/interface macvlan",
//                     "/interface ethernet",
//                 ]);

//                 // Verify wireless config is created
//                 expect(result["/interface wifi"]).toBeDefined();

//                 // Verify interface comments - ethernet should have comment, wireless should NOT
//                 const etherComments = result["/interface ethernet"];
//                 expect(etherComments).toBeDefined();
//                 expect(etherComments.some((c) => c.includes("Foreign-Ether"))).toBe(true);

//                 // Wireless interfaces with credentials should NOT get separate comments
//                 expect(etherComments.every((c) => !c.includes("WiFi"))).toBe(true);
//             });

//             it("should handle Foreign empty + Domestic (3 links, LoadBalance)", () => {
//                 const wanLinks: WANLinks = {
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-3",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Domestic-only configuration (no Foreign)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/ip dhcp-client",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Should only have Domestic routing
//                 const routes = result["/ip route"];
//                 expect(routes.some((r) => r.includes("to-Domestic"))).toBe(true);
//                 expect(routes.every((r) => !r.includes("to-Foreign"))).toBe(true);

//                 // Should only have Domestic mangle rules
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//                 expect(mangleRules.every((r) => !r.includes("Foreign-LAN"))).toBe(true);
//             });

//             it("should handle Foreign (3 links, VLAN+MAC combos) + Domestic (2 links, basic)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-VLAN-MAC",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "100",
//                                     MacAddress: "AA:BB:CC:DD:EE:01",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F-MAC-Only",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                     MacAddress: "AA:BB:CC:DD:EE:02",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F-VLAN-Only",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                     VLANID: "200",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "D-Basic1",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "D-Basic2",
//                                 InterfaceConfig: { InterfaceName: "ether5" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Complex Foreign (VLAN+MAC combos) + Simple Domestic",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface vlan",
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Verify VLAN interfaces are created
//                 const vlanConfig = result["/interface vlan"];
//                 expect(vlanConfig).toBeDefined();
//                 expect(vlanConfig.some((v) => v.includes("vlan-id=100"))).toBe(true);
//                 expect(vlanConfig.some((v) => v.includes("vlan-id=200"))).toBe(true);

//                 // Verify MACVLAN interfaces are created for all configs
//                 const macvlanConfig = result["/interface macvlan"];
//                 expect(macvlanConfig).toBeDefined();
//                 expect(macvlanConfig.length).toBeGreaterThanOrEqual(5); // 3 Foreign + 2 Domestic
//             });

//             it("should handle Foreign (2 LTE links, LoadBalance) + Domestic (2 SFP links, Failover)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-LTE1",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet1" },
//                                 },
//                             },
//                             {
//                                 name: "Foreign-LTE2",
//                                 InterfaceConfig: { InterfaceName: "lte2" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet2" },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-SFP1",
//                                 InterfaceConfig: { InterfaceName: "sfp-sfpplus1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-SFP2",
//                                 InterfaceConfig: { InterfaceName: "sfp-sfpplus2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Foreign (2 LTE, LoadBalance) + Domestic (2 SFP, Failover)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface lte",
//                     "/interface macvlan", // SFP gets auto-MACVLAN
//                     "/interface ethernet", // SFP uses ethernet config path
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Verify LTE interfaces
//                 const lteConfig = result["/interface lte"];
//                 expect(lteConfig).toBeDefined();
//                 expect(lteConfig.some((l) => l.includes("lte1"))).toBe(true);
//                 expect(lteConfig.some((l) => l.includes("lte2"))).toBe(true);

//                 // Verify SFP interfaces get MACVLAN
//                 const macvlanConfig = result["/interface macvlan"];
//                 expect(macvlanConfig).toBeDefined();
//                 expect(macvlanConfig.some((m) => m.includes("sfp-sfpplus1"))).toBe(true);
//                 expect(macvlanConfig.some((m) => m.includes("sfp-sfpplus2"))).toBe(true);

//                 // LTE routes should not have % in gateway
//                 const routes = result["/ip route"];
//                 const foreignRoutes = routes.filter((r) => r.includes("to-Foreign"));
//                 foreignRoutes.forEach((route) => {
//                     if (route.includes("lte")) {
//                         expect(route).not.toContain("%");
//                     }
//                 });
//             });

//             // Category 4: Interface Comments with Both Networks

//             it("should handle mixed interface types across both networks", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Ether1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Foreign-Ether2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Foreign-WiFi",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi5",
//                                     WirelessCredentials: {
//                                         SSID: "ForeignSSID",
//                                         Password: "foreignpass",
//                                     },
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-LTE",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                             {
//                                 name: "Domestic-SFP",
//                                 InterfaceConfig: { InterfaceName: "sfp-sfpplus1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Domestic-Ether",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Mixed interface types - Comments on physical interfaces only",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface ethernet",
//                     "/interface wifi",
//                     "/interface lte",
//                 ]);

//                 // Verify ethernet comments (ether1, ether2, ether3, sfp-sfpplus1)
//                 const etherComments = result["/interface ethernet"];
//                 expect(etherComments).toBeDefined();
//                 expect(etherComments.some((c) => c.includes("ether1") && c.includes("Foreign"))).toBe(true);
//                 expect(etherComments.some((c) => c.includes("ether2") && c.includes("Foreign"))).toBe(true);
//                 expect(etherComments.some((c) => c.includes("ether3") && c.includes("Domestic"))).toBe(true);
//                 expect(etherComments.some((c) => c.includes("sfp-sfpplus1") && c.includes("Domestic"))).toBe(true);

//                 // Wireless with credentials should NOT have separate comment in /interface ethernet
//                 expect(etherComments.every((c) => !c.includes("wifi5"))).toBe(true);

//                 // LTE should have comment
//                 const lteComments = result["/interface lte"];
//                 expect(lteComments.some((c) => c.includes("lte1") && c.includes("Domestic"))).toBe(true);
//             });

//             it("should handle same physical interface used in both networks (VLAN separation)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-VLAN100",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "100",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-VLAN200",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "200",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Same physical interface (ether1) used for both networks via VLANs",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface vlan",
//                     "/interface macvlan",
//                     "/interface ethernet",
//                 ]);

//                 // Both VLANs should be created on ether1
//                 const vlanConfig = result["/interface vlan"];
//                 expect(vlanConfig).toBeDefined();
//                 expect(vlanConfig.some((v) => v.includes("ether1") && v.includes("vlan-id=100"))).toBe(true);
//                 expect(vlanConfig.some((v) => v.includes("ether1") && v.includes("vlan-id=200"))).toBe(true);

//                 // Interface comments: ether1 appears in both networks, so comments get merged
//                 // The Map in InterfaceComment will collect both link names for the same interface
//                 const etherComments = result["/interface ethernet"];
//                 expect(etherComments).toBeDefined();

//                 // Should have at least 1 comment for ether1
//                 const ether1Comment = etherComments.find((c) => c.includes("ether1"));
//                 expect(ether1Comment).toBeDefined();

//                 // The comment should reference at least one of the VLANs
//                 // Note: The actual behavior depends on Map iteration order - last network wins
//                 expect(
//                     ether1Comment.includes("Foreign-VLAN100") ||
//                     ether1Comment.includes("Domestic-VLAN200")
//                 ).toBe(true);
//             });

//             // Category 1: Default Behavior & Edge Cases

//             it("should default to Failover when MultiLinkConfig is undefined", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Foreign-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         // MultiLinkConfig is undefined - should default to Failover
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Undefined MultiLinkConfig defaults to Failover",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/ip route",
//                 ]);

//                 // Should have recursive failover routes (no mangle rules)
//                 const routes = result["/ip route"];
//                 expect(routes).toBeDefined();
//                 expect(routes.some((r) => r.includes("to-Foreign"))).toBe(true);

//                 // Should NOT have mangle rules (failover only)
//                 expect(result["/ip firewall mangle"]).toBeUndefined();
//             });

//             it("should handle empty WANConfigs with MultiLinkConfig gracefully", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Empty WANConfigs with MultiLinkConfig",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 // Should return empty config
//                 expect(Object.keys(result).length).toBe(0);
//             });

//             it("should handle completely empty WANLinks object", () => {
//                 const wanLinks: WANLinks = {};

//                 const result = generateWANLinksConfig(wanLinks);

//                 // Should return empty config
//                 expect(Object.keys(result).length).toBe(0);
//             });

//             it("should ignore MultiLinkConfig for single link", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-Only",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Single link ignores MultiLinkConfig",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 // Should use DFSingleLink (simple route, no mangle)
//                 const routes = result["/ip route"];
//                 expect(routes).toBeDefined();
//                 expect(routes.some((r) => r.includes("to-Foreign"))).toBe(true);

//                 // Should NOT have mangle rules (single link)
//                 expect(result["/ip firewall mangle"]).toBeUndefined();
//             });

//             it("should skip connection config when ConnectionConfig is undefined", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-NoConnection",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 // ConnectionConfig is undefined
//                             } as WANLinkConfig,
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Undefined ConnectionConfig skips connection generation",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 // Should still have interface config and list membership
//                 expect(result["/interface macvlan"]).toBeDefined();
//                 expect(result["/interface list member"]).toBeDefined();

//                 // Should NOT have DHCP, Static, PPPoE, or LTE config
//                 expect(result["/ip dhcp-client"]).toBeUndefined();
//                 expect(result["/interface pppoe-client"]).toBeUndefined();
//                 expect(result["/ip address"]).toBeUndefined();
//                 expect(result["/interface lte"]).toBeUndefined();
//             });

//             // Category 2: Gateway Format Verification

//             it("should use correct default gateway IPs for DHCP connections", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Foreign-DHCP",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "Domestic-DHCP",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "DHCP default gateways: Foreign=100.64.0.1, Domestic=192.168.2.1",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const routes = result["/ip route"];

//                 // Foreign should use 100.64.0.1
//                 const foreignRoute = routes.find((r) => r.includes("to-Foreign"));
//                 expect(foreignRoute).toBeDefined();
//                 expect(foreignRoute).toContain("gateway=100.64.0.1%");

//                 // Domestic should use 192.168.2.1
//                 const domesticRoute = routes.find((r) => r.includes("to-Domestic"));
//                 expect(domesticRoute).toBeDefined();
//                 expect(domesticRoute).toContain("gateway=192.168.2.1%");
//             });

//             it("should verify gateway format consistency across connection types", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Static-Link",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "203.0.113.1",
//                                         ipAddress: "203.0.113.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                             {
//                                 name: "PPPoE-Link",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     pppoe: { username: "user", password: "pass" },
//                                 },
//                             },
//                             {
//                                 name: "LTE-Link",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = generateWANLinksConfig(wanLinks);
//                 const routes = result["/ip route"];

//                 // Static should have IP%interface format
//                 const staticRoutes = routes.filter((r) => r.includes("Static-Link"));
//                 expect(staticRoutes.some((r) => r.includes("203.0.113.1%"))).toBe(true);

//                 // PPPoE should have interface-only gateway (no %)
//                 const pppoeRoutes = routes.filter((r) => r.includes("PPPoE-Link"));
//                 expect(pppoeRoutes.some((r) => r.includes("pppoe-client-PPPoE-Link"))).toBe(true);
//                 pppoeRoutes.forEach((route) => {
//                     if (route.includes("pppoe-client")) {
//                         expect(route).not.toContain("%pppoe");
//                     }
//                 });

//                 // LTE should have interface-only gateway (no %)
//                 const lteRoutes = routes.filter((r) => r.includes("LTE-Link"));
//                 expect(lteRoutes.some((r) => r.includes("gateway=lte1"))).toBe(true);
//                 lteRoutes.forEach((route) => {
//                     if (route.includes("lte1")) {
//                         expect(route).not.toContain("%");
//                     }
//                 });
//             });

//             it("should handle mixed gateway formats in multi-link configuration", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-DHCP",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F-Static",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "10.0.0.1",
//                                         ipAddress: "10.0.0.2",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Mixed gateway formats in PCC load balancing",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const routes = result["/ip route"];

//                 // Both links should have properly formatted gateways in routes
//                 expect(routes.some((r) => r.includes("100.64.0.1%") || r.includes("MacVLAN-ether1"))).toBe(true);
//                 expect(routes.some((r) => r.includes("10.0.0.1%") || r.includes("MacVLAN-ether2"))).toBe(true);
//             });

//             it("should use recursive gateway checking for failover routes", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Primary",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 1,
//                             },
//                             {
//                                 name: "Backup",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                                 priority: 2,
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Failover with recursive gateway checking",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const routes = result["/ip route"];

//                 // Should have multiple routes with distance/priority for failover
//                 expect(routes.length).toBeGreaterThan(1);
//                 expect(routes.some((r) => r.includes("to-Foreign"))).toBe(true);

//                 // Failover routes should use check-gateway
//                 expect(routes.some((r) => r.includes("check-gateway=ping"))).toBe(true);
//             });

//             // Category 3: Routing Table & Mangle Rules

//             it("should use correct routing table names (to-Foreign, to-Domestic)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "D-1",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                 };

//                 const result = generateWANLinksConfig(wanLinks);
//                 const routes = result["/ip route"];

//                 // Verify exact routing table names
//                 const foreignRoute = routes.find((r) => r.includes("routing-table=to-Foreign"));
//                 expect(foreignRoute).toBeDefined();

//                 const domesticRoute = routes.find((r) => r.includes("routing-table=to-Domestic"));
//                 expect(domesticRoute).toBeDefined();
//             });

//             it("should use correct address list names in mangle rules", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "D-1",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "D-2",
//                                 InterfaceConfig: { InterfaceName: "ether4" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Address list names: Foreign-LAN, Domestic-LAN",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules).toBeDefined();

//                 // Verify address list names (with quotes)
//                 expect(mangleRules.some((r) => r.includes('src-address-list="Foreign-LAN"'))).toBe(true);
//                 expect(mangleRules.some((r) => r.includes('src-address-list="Domestic-LAN"'))).toBe(true);
//             });

//             it("should ensure routing marks match routing table names", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Routing marks match routing tables",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const mangleRules = result["/ip firewall mangle"];
//                 const routes = result["/ip route"];

//                 // Routing marks in mangle should match routing tables in routes (with quotes)
//                 expect(mangleRules.some((r) => r.includes('new-routing-mark="to-Foreign"'))).toBe(true);
//                 expect(routes.some((r) => r.includes("routing-table=to-Foreign"))).toBe(true);
//             });

//             it("should place mangle rules in correct chains (prerouting, output)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-1",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "F-2",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Mangle chain placement verification",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules).toBeDefined();

//                 // Should have both prerouting and output chain rules
//                 expect(mangleRules.some((r) => r.includes("chain=prerouting"))).toBe(true);
//                 expect(mangleRules.some((r) => r.includes("chain=output"))).toBe(true);
//             });

//             // Category 4: Interface Comment Edge Cases

//             it("should merge comments for same interface used multiple times", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "VLAN-100",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "100",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "VLAN-200",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     VLANID: "200",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Same interface multiple times - comment merging with '--'",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const etherComments = result["/interface ethernet"];
//                 expect(etherComments).toBeDefined();

//                 // Should have one comment for ether1 with both link names
//                 const ether1Comment = etherComments.find((c) => c.includes("ether1"));
//                 expect(ether1Comment).toBeDefined();

//                 // Comment should contain both VLAN names separated by "--"
//                 expect(ether1Comment).toContain("VLAN-100");
//                 expect(ether1Comment).toContain("VLAN-200");
//                 expect(ether1Comment).toContain(" -- ");
//             });

//             it("should only add comments for non-wireless physical interfaces", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Ether",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "WiFi-Creds",
//                                 InterfaceConfig: {
//                                     InterfaceName: "wifi5",
//                                     WirelessCredentials: {
//                                         SSID: "TestSSID",
//                                         Password: "TestPass",
//                                     },
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "LTE",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "Failover",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Comments only for physical interfaces (not wireless with creds)",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 // Ethernet should have comment
//                 expect(result["/interface ethernet"]).toBeDefined();
//                 expect(result["/interface ethernet"].some((c) => c.includes("ether1"))).toBe(true);

//                 // Wireless with credentials should NOT have separate comment in ethernet section
//                 expect(result["/interface ethernet"].every((c) => !c.includes("wifi5"))).toBe(true);

//                 // LTE should have comment
//                 expect(result["/interface lte"]).toBeDefined();
//                 expect(result["/interface lte"].some((c) => c.includes("lte1"))).toBe(true);
//             });

//             it("should generate comments for all physical interface types", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "Ether",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "SFP",
//                                 InterfaceConfig: { InterfaceName: "sfp-sfpplus1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             {
//                                 name: "LTE",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                         ],
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Comments for all interface types: ethernet, sfp, lte",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 // Ethernet comment (includes both ether and sfp)
//                 const etherComments = result["/interface ethernet"];
//                 expect(etherComments).toBeDefined();
//                 expect(etherComments.some((c) => c.includes("ether1") && c.includes("Foreign"))).toBe(true);
//                 expect(etherComments.some((c) => c.includes("sfp-sfpplus1") && c.includes("Foreign"))).toBe(true);

//                 // LTE comment
//                 const lteComments = result["/interface lte"];
//                 expect(lteComments).toBeDefined();
//                 expect(lteComments.some((c) => c.includes("lte1") && c.includes("Domestic"))).toBe(true);
//             });

//             // Category 5: Advanced Scenarios

//             it("should handle all connection types in single network", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "DHCP-Link",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Static-Link",
//                                 InterfaceConfig: { InterfaceName: "ether2" },
//                                 ConnectionConfig: {
//                                     static: {
//                                         gateway: "203.0.113.1",
//                                         ipAddress: "203.0.113.10",
//                                         subnet: "255.255.255.0",
//                                     },
//                                 },
//                             },
//                             {
//                                 name: "PPPoE-Link",
//                                 InterfaceConfig: { InterfaceName: "ether3" },
//                                 ConnectionConfig: {
//                                     pppoe: { username: "user", password: "pass" },
//                                 },
//                             },
//                             {
//                                 name: "LTE-Link",
//                                 InterfaceConfig: { InterfaceName: "lte1" },
//                                 ConnectionConfig: {
//                                     lteSettings: { apn: "internet" },
//                                 },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "All connection types: DHCP, Static, PPPoE, LTE",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/interface pppoe-client",
//                     "/interface lte",
//                     "/ip dhcp-client",
//                     "/ip address",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Verify all connection types are configured
//                 expect(result["/ip dhcp-client"]).toBeDefined();
//                 expect(result["/ip address"]).toBeDefined();
//                 expect(result["/interface pppoe-client"]).toBeDefined();
//                 expect(result["/interface lte"]).toBeDefined();

//                 // Verify PCC mangle rules for all links
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.length).toBeGreaterThan(10); // Many rules for 4 links
//             });

//             it("should handle maximum link scaling (10+ links)", () => {
//                 const generateLinks = (count: number, prefix: string, startEther: number) => {
//                     return Array.from({ length: count }, (_, i) => ({
//                         name: `${prefix}-${i + 1}`,
//                         InterfaceConfig: { InterfaceName: `ether${startEther + i}` },
//                         ConnectionConfig: { isDHCP: true },
//                     }));
//                 };

//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: generateLinks(12, "F", 1) as WANLinkConfig[],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Stress test: 12 links with NTH load balancing",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface macvlan",
//                     "/interface ethernet",
//                     "/ip dhcp-client",
//                     "/ip route",
//                     "/ip firewall mangle",
//                 ]);

//                 // Verify all 12 interfaces are created
//                 const macvlanConfig = result["/interface macvlan"];
//                 expect(macvlanConfig.length).toBe(12);

//                 // Verify all 12 interface comments
//                 const etherComments = result["/interface ethernet"];
//                 expect(etherComments.length).toBe(12);

//                 // Verify mangle rules scale appropriately
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.length).toBeGreaterThan(20); // Many rules for 12 links
//             });

//             it("should handle asymmetric Foreign/Domestic link counts (1 vs 7)", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "F-Single",
//                                 InterfaceConfig: { InterfaceName: "ether1" },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                     },
//                     Domestic: {
//                         WANConfigs: [
//                             { name: "D1", InterfaceConfig: { InterfaceName: "ether2" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D2", InterfaceConfig: { InterfaceName: "ether3" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D3", InterfaceConfig: { InterfaceName: "ether4" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D4", InterfaceConfig: { InterfaceName: "ether5" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D5", InterfaceConfig: { InterfaceName: "ether6" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D6", InterfaceConfig: { InterfaceName: "ether7" }, ConnectionConfig: { isDHCP: true } },
//                             { name: "D7", InterfaceConfig: { InterfaceName: "ether8" }, ConnectionConfig: { isDHCP: true } },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "PCC",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Asymmetric: 1 Foreign link vs 7 Domestic links",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 const routes = result["/ip route"];

//                 // Foreign should use DFSingleLink (may have multiple routes including link-specific)
//                 const foreignRoutes = routes.filter((r) => r.includes("to-Foreign"));
//                 expect(foreignRoutes.length).toBeGreaterThanOrEqual(1);

//                 // Domestic should use DFMultiLink (PCC with 7 links)
//                 const domesticRoutes = routes.filter((r) => r.includes("to-Domestic"));
//                 expect(domesticRoutes.length).toBeGreaterThan(1);

//                 // Only Domestic should have mangle rules
//                 const mangleRules = result["/ip firewall mangle"];
//                 expect(mangleRules.some((r) => r.includes("Domestic-LAN"))).toBe(true);
//                 expect(mangleRules.every((r) => !r.includes("Foreign-LAN"))).toBe(true);
//             });

//             it("should handle complex MACVLAN scenarios", () => {
//                 const wanLinks: WANLinks = {
//                     Foreign: {
//                         WANConfigs: [
//                             {
//                                 name: "MAC-Only",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether1",
//                                     MacAddress: "AA:BB:CC:DD:EE:01",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "VLAN-Only",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether2",
//                                     VLANID: "100",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "MAC-VLAN-Combo",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether3",
//                                     MacAddress: "AA:BB:CC:DD:EE:03",
//                                     VLANID: "200",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                             {
//                                 name: "Auto-MACVLAN",
//                                 InterfaceConfig: {
//                                     InterfaceName: "ether4",
//                                 },
//                                 ConnectionConfig: { isDHCP: true },
//                             },
//                         ],
//                         MultiLinkConfig: {
//                             strategy: "LoadBalance",
//                             loadBalanceMethod: "NTH",
//                         },
//                     },
//                 };

//                 const result = testWithOutput(
//                     "generateWANLinksConfig",
//                     "Complex MACVLAN: MAC-only, VLAN-only, MAC+VLAN, Auto",
//                     { wanLinks },
//                     () => generateWANLinksConfig(wanLinks),
//                 );

//                 validateRouterConfig(result, [
//                     "/interface vlan",
//                     "/interface macvlan",
//                     "/interface ethernet",
//                 ]);

//                 // Verify VLAN interfaces
//                 const vlanConfig = result["/interface vlan"];
//                 expect(vlanConfig).toBeDefined();
//                 expect(vlanConfig.some((v) => v.includes("vlan-id=100"))).toBe(true);
//                 expect(vlanConfig.some((v) => v.includes("vlan-id=200"))).toBe(true);

//                 // Verify MACVLAN interfaces (all 4 should have MACVLAN)
//                 const macvlanConfig = result["/interface macvlan"];
//                 expect(macvlanConfig).toBeDefined();
//                 expect(macvlanConfig.length).toBeGreaterThanOrEqual(4);

//                 // Verify custom MAC addresses
//                 expect(macvlanConfig.some((m) => m.includes("AA:BB:CC:DD:EE:01"))).toBe(true);
//                 expect(macvlanConfig.some((m) => m.includes("AA:BB:CC:DD:EE:03"))).toBe(true);
//             });
//         });
//     });

// });
