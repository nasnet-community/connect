// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import {
//     WANIfaceList,
//     Geteway,
//     Route,
//     getLinkCount,
// } from "./WANUtils";
// import type {
//     WANLinkConfig,
//     WANLink,
// } from "../../../StarContext/Utils/WANLinkType";

// describe("WANUtils Module - Routing Functions", () => {
//     describe("WANIfaceList", () => {
//         it("should add interface to WAN lists", () => {
//             const result = testWithOutput(
//                 "WANIfaceList",
//                 "Add interface to WAN and Foreign-WAN lists",
//                 { InterfaceName: "ether1", Network: "Foreign" },
//                 () => WANIfaceList("ether1", "Foreign"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"]).toHaveLength(2);
//             expect(result["/interface list member"][0]).toContain('list="WAN"');
//             expect(result["/interface list member"][1]).toContain('list="Foreign-WAN"');
//         });

//         it("should add interface to domestic WAN lists", () => {
//             const result = testWithOutput(
//                 "WANIfaceList",
//                 "Add interface to WAN and Domestic-WAN lists",
//                 { InterfaceName: "ether2", Network: "Domestic" },
//                 () => WANIfaceList("ether2", "Domestic"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"][1]).toContain('list="Domestic-WAN"');
//         });

//         it("should handle MACVLAN interface name", () => {
//             const result = testWithOutput(
//                 "WANIfaceList",
//                 "Add MACVLAN interface to WAN lists",
//                 { InterfaceName: "MacVLAN-ether1-WAN-1", Network: "Foreign" },
//                 () => WANIfaceList("MacVLAN-ether1-WAN-1", "Foreign"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"][0]).toContain("MacVLAN-ether1-WAN-1");
//         });

//         it("should handle PPPoE interface name", () => {
//             const result = WANIfaceList("pppoe-client-WAN-1", "Foreign");

//             expect(result["/interface list member"][0]).toContain("pppoe-client-WAN-1");
//         });

//         it("should handle wireless interface name", () => {
//             const result = WANIfaceList("MacVLAN-wifi2.4-WiFi-WAN", "Foreign");

//             expect(result["/interface list member"][0]).toContain("MacVLAN-wifi2.4-WiFi-WAN");
//         });

//         it("should handle LTE interface name", () => {
//             const result = WANIfaceList("lte1", "Foreign");

//             expect(result["/interface list member"][0]).toContain("lte1");
//         });
//     });

//     describe("Geteway", () => {
//         it("should configure default gateway route", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure default gateway",
//                 { gateway: "192.168.1.1", interfaceName: "ether1" },
//                 () => Geteway("192.168.1.1", "ether1"),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=192.168.1.1%ether1");
//         });

//         it("should configure gateway with custom network", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure gateway for specific network",
//                 {
//                     gateway: "10.0.0.1",
//                     interfaceName: "ether2",
//                     network: "Foreign",
//                 },
//                 () => Geteway("10.0.0.1", "ether2", "Foreign"),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain('comment="Route-to-Foreign"');
//         });

//         it("should configure gateway with custom distance", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure gateway with distance 10",
//                 {
//                     gateway: "192.168.1.1",
//                     interfaceName: "ether1",
//                     network: "Foreign",
//                     distance: 10,
//                 },
//                 () => Geteway("192.168.1.1", "ether1", "Foreign", 10),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("distance=10");
//         });

//         it("should configure gateway without interface", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure gateway without specific interface",
//                 { gateway: "203.0.113.1" },
//                 () => Geteway("203.0.113.1", undefined),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=203.0.113.1");
//             expect(result["/ip route"][0]).not.toContain("%");
//         });

//         it("should handle edge case with undefined gateway", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure route with undefined gateway (interface only)",
//                 { gateway: undefined, interfaceName: "ether1" },
//                 () => Geteway(undefined, "ether1"),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=ether1");
//             expect(result["/ip route"][0]).not.toContain("%");
//         });

//         it("should configure gateway with routing table", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure gateway with routing table",
//                 {
//                     gateway: "192.168.1.1",
//                     interfaceName: "ether1",
//                     network: "Foreign",
//                     distance: 1,
//                     table: "to-Foreign",
//                 },
//                 () => Geteway("192.168.1.1", "ether1", "Foreign", 1, "to-Foreign"),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("routing-table=to-Foreign");
//         });

//         it("should configure gateway with routing table and custom distance", () => {
//             const result = testWithOutput(
//                 "Geteway",
//                 "Configure gateway with routing table and distance",
//                 {
//                     gateway: "10.0.0.1",
//                     interfaceName: "ether2",
//                     network: "Domestic",
//                     distance: 10,
//                     table: "to-Domestic",
//                 },
//                 () => Geteway("10.0.0.1", "ether2", "Domestic", 10, "to-Domestic"),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("distance=10");
//             expect(result["/ip route"][0]).toContain("routing-table=to-Domestic");
//         });

//         it("should not show default distance of 1", () => {
//             const result = Geteway("192.168.1.1", "ether1", "Foreign", 1);

//             expect(result["/ip route"][0]).not.toContain("distance=1");
//         });

//         it("should handle interface-only gateway (for PPPoE/LTE)", () => {
//             const result = Geteway(undefined, "pppoe-client-WAN-1", "Foreign");

//             expect(result["/ip route"][0]).toContain("gateway=pppoe-client-WAN-1");
//             expect(result["/ip route"][0]).not.toContain("%");
//         });

//         it("should create default route to 0.0.0.0/0", () => {
//             const result = Geteway("192.168.1.1", "ether1", "Foreign");

//             expect(result["/ip route"][0]).toContain("dst-address=0.0.0.0/0");
//         });
//     });

//     describe("Route", () => {
//         it("should create route for PPPoE connection (interface only)", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "PPPoE-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//                 ConnectionConfig: {
//                     pppoe: {
//                         username: "user",
//                         password: "pass",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for PPPoE connection",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=pppoe-client-PPPoE-WAN");
//             expect(result["/ip route"][0]).toContain("routing-table=to-PPPoE-WAN");
//             expect(result["/ip route"][0]).toContain('comment="Route-to-PPPoE-WAN"');
//         });

//         it("should create route for LTE connection (interface only)", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "LTE-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "lte1",
//                 },
//                 ConnectionConfig: {
//                     lteSettings: {
//                         apn: "internet",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for LTE connection",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=lte1");
//             expect(result["/ip route"][0]).toContain("routing-table=to-LTE-WAN");
//             expect(result["/ip route"][0]).not.toContain("%");
//         });

//         it("should create route for Static IP connection", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "Static-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//                 ConnectionConfig: {
//                     static: {
//                         ipAddress: "203.0.113.10",
//                         subnet: "255.255.255.0",
//                         gateway: "203.0.113.1",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for Static IP connection",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=203.0.113.1%MacVLAN-ether1-Static-WAN");
//             expect(result["/ip route"][0]).toContain("routing-table=to-Static-WAN");
//         });

//         it("should create route for DHCP Foreign connection with default gateway", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "DHCP-Foreign",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//                 ConnectionConfig: {
//                     isDHCP: true,
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for DHCP Foreign connection",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=100.64.0.1%MacVLAN-ether1-DHCP-Foreign");
//             expect(result["/ip route"][0]).toContain("routing-table=to-DHCP-Foreign");
//         });

//         it("should create route for DHCP Domestic connection with default gateway", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "DHCP-Domestic",
//                 InterfaceConfig: {
//                     InterfaceName: "ether2",
//                 },
//                 ConnectionConfig: {
//                     isDHCP: true,
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for DHCP Domestic connection",
//                 { wanLinkConfig, networkType: "Domestic", distance: 1 },
//                 () => Route(wanLinkConfig, "Domestic", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=192.168.2.1%MacVLAN-ether2-DHCP-Domestic");
//             expect(result["/ip route"][0]).toContain("routing-table=to-DHCP-Domestic");
//         });

//         it("should create route for DHCP without explicit isDHCP flag (default)", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "Default-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route with no ConnectionConfig (defaults to DHCP)",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=100.64.0.1%MacVLAN-ether1-Default-WAN");
//         });

//         it("should create route with custom distance", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "Custom-Distance",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//                 ConnectionConfig: {
//                     isDHCP: true,
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route with custom distance",
//                 { wanLinkConfig, networkType: "Foreign", distance: 10 },
//                 () => Route(wanLinkConfig, "Foreign", 10),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("distance=10");
//             expect(result["/ip route"][0]).toContain("routing-table=to-Custom-Distance");
//         });

//         it("should create route for PPPoE on VLAN interface", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "VLAN-PPPoE",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     VLANID: "35",
//                 },
//                 ConnectionConfig: {
//                     pppoe: {
//                         username: "vlan_user",
//                         password: "vlan_pass",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for PPPoE on VLAN",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=pppoe-client-VLAN-PPPoE");
//             expect(result["/ip route"][0]).toContain("routing-table=to-VLAN-PPPoE");
//         });

//         it("should create route for Static IP on MACVLAN", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "MAC-Static",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     MacAddress: "AA:BB:CC:DD:EE:FF",
//                 },
//                 ConnectionConfig: {
//                     static: {
//                         ipAddress: "10.0.0.100",
//                         subnet: "255.255.255.0",
//                         gateway: "10.0.0.1",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for Static IP on MACVLAN",
//                 { wanLinkConfig, networkType: "Domestic", distance: 1 },
//                 () => Route(wanLinkConfig, "Domestic", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=10.0.0.1%MacVLAN-ether1-MAC-Static");
//             expect(result["/ip route"][0]).toContain("routing-table=to-MAC-Static");
//         });

//         it("should create route for LTE detected by interface name", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "LTE-Auto",
//                 InterfaceConfig: {
//                     InterfaceName: "lte2",
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for LTE detected by name",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=lte2");
//             expect(result["/ip route"][0]).toContain("routing-table=to-LTE-Auto");
//             expect(result["/ip route"][0]).not.toContain("%");
//         });

//         it("should create route for Wireless WAN with DHCP", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "wifi2.4",
//                     WirelessCredentials: {
//                         SSID: "TestWiFi",
//                         Password: "password123",
//                     },
//                 },
//                 ConnectionConfig: {
//                     isDHCP: true,
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for Wireless WAN",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=100.64.0.1%MacVLAN-wifi2.4-WiFi-WAN");
//             expect(result["/ip route"][0]).toContain("routing-table=to-WiFi-WAN");
//         });

//         it("should create route for SFP interface with Static IP", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "SFP-Static",
//                 InterfaceConfig: {
//                     InterfaceName: "sfp-sfpplus1",
//                 },
//                 ConnectionConfig: {
//                     static: {
//                         ipAddress: "198.51.100.10",
//                         subnet: "255.255.255.252",
//                         gateway: "198.51.100.1",
//                     },
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route for SFP with Static IP",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"][0]).toContain("gateway=198.51.100.1%MacVLAN-sfp-sfpplus1-SFP-Static");
//             expect(result["/ip route"][0]).toContain("routing-table=to-SFP-Static");
//         });

//         it("should create route with default distance of 1 when not specified", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "Default-Distance",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//             };

//             const result = testWithOutput(
//                 "Route",
//                 "Create route with default distance",
//                 { wanLinkConfig, networkType: "Foreign", distance: 1 },
//                 () => Route(wanLinkConfig, "Foreign", 1),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             // Default distance of 1 should not be explicitly shown
//             expect(result["/ip route"][0]).not.toContain("distance=");
//         });

//         it("should create correct routing table name format", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "My-Custom-WAN-Link",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//             };

//             const result = Route(wanLinkConfig, "Foreign", 1);

//             expect(result["/ip route"][0]).toContain("routing-table=to-My-Custom-WAN-Link");
//         });
//     });

//     describe("getLinkCount", () => {
//         it("should return count for single WAN link", () => {
//             const wanLink: WANLink = {
//                 WANConfigs: [
//                     {
//                         name: "WAN-1",
//                         InterfaceConfig: {
//                             InterfaceName: "ether1",
//                         },
//                     },
//                 ],
//             };

//             const count = getLinkCount(wanLink);
//             expect(count).toBe(1);
//         });

//         it("should return count for multiple WAN links", () => {
//             const wanLink: WANLink = {
//                 WANConfigs: [
//                     {
//                         name: "WAN-1",
//                         InterfaceConfig: {
//                             InterfaceName: "ether1",
//                         },
//                     },
//                     {
//                         name: "WAN-2",
//                         InterfaceConfig: {
//                             InterfaceName: "ether2",
//                         },
//                     },
//                     {
//                         name: "WAN-3",
//                         InterfaceConfig: {
//                             InterfaceName: "lte1",
//                         },
//                     },
//                 ],
//             };

//             const count = getLinkCount(wanLink);
//             expect(count).toBe(3);
//         });

//         it("should return 0 for empty WANConfigs", () => {
//             const wanLink: WANLink = {
//                 WANConfigs: [],
//             };

//             const count = getLinkCount(wanLink);
//             expect(count).toBe(0);
//         });

//         it("should handle large number of links", () => {
//             const configs = Array.from({ length: 50 }, (_, i) => ({
//                 name: `WAN-${i + 1}`,
//                 InterfaceConfig: {
//                     InterfaceName: `ether${i + 1}`,
//                 },
//             }));

//             const wanLink: WANLink = {
//                 WANConfigs: configs,
//             };

//             const count = getLinkCount(wanLink);
//             expect(count).toBe(50);
//         });
//     });
// });
