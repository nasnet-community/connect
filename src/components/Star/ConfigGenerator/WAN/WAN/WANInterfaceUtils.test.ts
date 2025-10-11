// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     testWithGenericOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import {
//     MACVLAN,
//     VLAN,
//     MACVLANOnVLAN,
//     WirelessWAN,
//     GetWANInterface,
//     GetWANInterfaceWName,
//     GetWANInterfaces,
//     getInterfaceType,
//     getInterfaceConfigPath,
//     collectInterfaceInfo,
//     InterfaceComment,
//     requiresAutoMACVLAN,
//     getUnderlyingInterface,
//     type InterfaceInfo,
// } from "./WANInterfaceUtils";
// import type {
//     WANLinkConfig,
//     WANLinks,
//     WANLink,
// } from "../../../StarContext/Utils/WANLinkType";

// describe("WANInterfaceUtils Module", () => {
//     describe("MACVLAN", () => {
//         it("should create MACVLAN without custom MAC address", () => {
//             const result = testWithOutput(
//                 "MACVLAN",
//                 "Create MACVLAN without custom MAC",
//                 { name: "WAN-1", interfaceName: "ether1" },
//                 () => MACVLAN("WAN-1", "ether1"),
//             );

//             validateRouterConfig(result, ["/interface macvlan"]);
//             expect(result["/interface macvlan"][0]).toContain('name="MacVLAN-ether1-WAN-1"');
//             expect(result["/interface macvlan"][0]).toContain("interface=ether1");
//             expect(result["/interface macvlan"][0]).toContain("mode=private");
//         });

//         it("should create MACVLAN with custom MAC address", () => {
//             const result = testWithOutput(
//                 "MACVLAN",
//                 "Create MACVLAN with custom MAC",
//                 {
//                     name: "WAN-1",
//                     interfaceName: "ether1",
//                     macAddress: "AA:BB:CC:DD:EE:FF",
//                 },
//                 () => MACVLAN("WAN-1", "ether1", "AA:BB:CC:DD:EE:FF"),
//             );

//             validateRouterConfig(result, ["/interface macvlan"]);
//             expect(result["/interface macvlan"][0]).toContain("mac-address=AA:BB:CC:DD:EE:FF");
//         });

//         it("should create MACVLAN on wireless interface", () => {
//             const result = testWithOutput(
//                 "MACVLAN",
//                 "Create MACVLAN on wireless interface",
//                 { name: "WiFi-WAN", interfaceName: "wifi2.4" },
//                 () => MACVLAN("WiFi-WAN", "wifi2.4"),
//             );

//             validateRouterConfig(result, ["/interface macvlan"]);
//             expect(result["/interface macvlan"][0]).toContain("wifi2.4");
//         });

//         it("should create MACVLAN on SFP interface", () => {
//             const result = testWithOutput(
//                 "MACVLAN",
//                 "Create MACVLAN on SFP interface",
//                 { name: "SFP-WAN", interfaceName: "sfp-sfpplus1" },
//                 () => MACVLAN("SFP-WAN", "sfp-sfpplus1"),
//             );

//             validateRouterConfig(result, ["/interface macvlan"]);
//         });

//         it("should include descriptive comment", () => {
//             const result = MACVLAN("Test-WAN", "ether2");

//             expect(result["/interface macvlan"][0]).toContain('comment="Test-WAN MACVLAN on ether2"');
//         });
//     });

//     describe("VLAN", () => {
//         it("should create VLAN with ID 100", () => {
//             const result = testWithOutput(
//                 "VLAN",
//                 "Create VLAN 100 on ether1",
//                 { name: "WAN-1", interfaceName: "ether1", vlanId: 100 },
//                 () => VLAN("WAN-1", "ether1", 100),
//             );

//             validateRouterConfig(result, ["/interface vlan"]);
//             expect(result["/interface vlan"][0]).toContain("vlan-id=100");
//         });

//         it("should create VLAN with ID 200", () => {
//             const result = testWithOutput(
//                 "VLAN",
//                 "Create VLAN 200 on ether2",
//                 { name: "WAN-2", interfaceName: "ether2", vlanId: 200 },
//                 () => VLAN("WAN-2", "ether2", 200),
//             );

//             validateRouterConfig(result, ["/interface vlan"]);
//             expect(result["/interface vlan"][0]).toContain("VLAN200-ether2-WAN-2");
//         });

//         it("should create VLAN with ID 4094 (max VLAN ID)", () => {
//             const result = testWithOutput(
//                 "VLAN",
//                 "Create VLAN 4094 (maximum VLAN ID)",
//                 { name: "WAN-Max", interfaceName: "ether1", vlanId: 4094 },
//                 () => VLAN("WAN-Max", "ether1", 4094),
//             );

//             validateRouterConfig(result, ["/interface vlan"]);
//             expect(result["/interface vlan"][0]).toContain("vlan-id=4094");
//         });

//         it("should include descriptive comment", () => {
//             const result = VLAN("My-WAN", "ether1", 150);

//             expect(result["/interface vlan"][0]).toContain('comment="My-WAN VLAN 150 on ether1"');
//         });
//     });

//     describe("MACVLANOnVLAN", () => {
//         it("should create MACVLAN on VLAN 100", () => {
//             const result = testWithOutput(
//                 "MACVLANOnVLAN",
//                 "Create MACVLAN on VLAN 100",
//                 {
//                     name: "WAN-1",
//                     interfaceName: "ether1",
//                     macAddress: "AA:BB:CC:DD:EE:FF",
//                     vlanId: 100,
//                 },
//                 () => MACVLANOnVLAN("WAN-1", "ether1", "AA:BB:CC:DD:EE:FF", 100),
//             );

//             validateRouterConfig(result, ["/interface vlan", "/interface macvlan"]);
//         });

//         it("should create MACVLAN on VLAN 200 with different interface", () => {
//             const result = testWithOutput(
//                 "MACVLANOnVLAN",
//                 "Create MACVLAN on VLAN 200 on ether2",
//                 {
//                     name: "WAN-2",
//                     interfaceName: "ether2",
//                     macAddress: "11:22:33:44:55:66",
//                     vlanId: 200,
//                 },
//                 () => MACVLANOnVLAN("WAN-2", "ether2", "11:22:33:44:55:66", 200),
//             );

//             validateRouterConfig(result, ["/interface vlan", "/interface macvlan"]);
//         });

//         it("should create correct VLAN interface name", () => {
//             const result = MACVLANOnVLAN("Test-WAN", "ether1", "AA:BB:CC:DD:EE:FF", 100);

//             expect(result["/interface vlan"][0]).toContain("VLAN100-ether1-Test-WAN");
//         });

//         it("should create MACVLAN on top of VLAN interface", () => {
//             const result = MACVLANOnVLAN("Test-WAN", "ether1", "AA:BB:CC:DD:EE:FF", 100);

//             expect(result["/interface macvlan"][0]).toContain("MacVLAN-VLAN100-ether1-Test-WAN-Test-WAN");
//             expect(result["/interface macvlan"][0]).toContain("mac-address=AA:BB:CC:DD:EE:FF");
//         });
//     });

//     describe("WirelessWAN", () => {
//         it("should configure wireless WAN for 2.4GHz", () => {
//             const result = testWithOutput(
//                 "WirelessWAN",
//                 "Configure wireless WAN for 2.4GHz",
//                 {
//                     SSID: "TestWiFi24",
//                     password: "password123",
//                     band: "2.4",
//                     name: "WiFi-WAN",
//                 },
//                 () => WirelessWAN("TestWiFi24", "password123", "2.4", "WiFi-WAN"),
//             );

//             validateRouterConfig(result, ["/interface wifi"]);
//         });

//         it("should configure wireless WAN for 5GHz", () => {
//             const result = testWithOutput(
//                 "WirelessWAN",
//                 "Configure wireless WAN for 5GHz",
//                 {
//                     SSID: "TestWiFi5G",
//                     password: "password456",
//                     band: "5",
//                     name: "WiFi5-WAN",
//                 },
//                 () => WirelessWAN("TestWiFi5G", "password456", "5", "WiFi5-WAN"),
//             );

//             validateRouterConfig(result, ["/interface wifi"]);
//         });

//         it("should configure wireless WAN without name", () => {
//             const result = testWithOutput(
//                 "WirelessWAN",
//                 "Configure wireless WAN without name",
//                 { SSID: "PublicWiFi", password: "publicpass", band: "2.4" },
//                 () => WirelessWAN("PublicWiFi", "publicpass", "2.4"),
//             );

//             validateRouterConfig(result, ["/interface wifi"]);
//         });
//     });

//     describe("requiresAutoMACVLAN", () => {
//         it("should return true for ethernet interfaces", () => {
//             expect(requiresAutoMACVLAN("ether1")).toBe(true);
//             expect(requiresAutoMACVLAN("ether5")).toBe(true);
//             expect(requiresAutoMACVLAN("ether10")).toBe(true);
//         });

//         it("should return true for wifi interfaces", () => {
//             expect(requiresAutoMACVLAN("wifi2.4")).toBe(true);
//             expect(requiresAutoMACVLAN("wifi5")).toBe(true);
//         });

//         it("should return true for wlan interfaces", () => {
//             expect(requiresAutoMACVLAN("wlan1")).toBe(true);
//             expect(requiresAutoMACVLAN("wlan2")).toBe(true);
//         });

//         it("should return true for SFP interfaces", () => {
//             expect(requiresAutoMACVLAN("sfp1")).toBe(true);
//             expect(requiresAutoMACVLAN("sfp-sfpplus1")).toBe(true);
//         });

//         it("should return false for LTE interfaces", () => {
//             expect(requiresAutoMACVLAN("lte1")).toBe(false);
//             expect(requiresAutoMACVLAN("lte2")).toBe(false);
//         });

//         it("should return false for bridge interfaces", () => {
//             expect(requiresAutoMACVLAN("bridge1")).toBe(false);
//             expect(requiresAutoMACVLAN("bridge-wan")).toBe(false);
//         });

//         it("should return false for PPPoE interfaces", () => {
//             expect(requiresAutoMACVLAN("pppoe-client-1")).toBe(false);
//         });
//     });

//     describe("getUnderlyingInterface", () => {
//         it("should return base interface for simple ethernet", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-1",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//             };

//             const result = getUnderlyingInterface(wanLinkConfig);
//             expect(result).toBe("MacVLAN-ether1-WAN-1");
//         });

//         it("should return MACVLAN name for custom MAC", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-1",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     MacAddress: "AA:BB:CC:DD:EE:FF",
//                 },
//             };

//             const result = getUnderlyingInterface(wanLinkConfig);
//             expect(result).toBe("MacVLAN-ether1-WAN-1");
//         });

//         it("should return MACVLAN on VLAN name", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-1",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     VLANID: "100",
//                 },
//             };

//             const result = getUnderlyingInterface(wanLinkConfig);
//             expect(result).toBe("MacVLAN-VLAN100-ether1-WAN-1-WAN-1");
//         });

//         it("should return MACVLAN on VLAN with custom MAC", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-1",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     VLANID: "100",
//                     MacAddress: "AA:BB:CC:DD:EE:FF",
//                 },
//             };

//             const result = getUnderlyingInterface(wanLinkConfig);
//             expect(result).toBe("MacVLAN-VLAN100-ether1-WAN-1-WAN-1");
//         });

//         it("should return LTE interface as-is", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "LTE-1",
//                 InterfaceConfig: {
//                     InterfaceName: "lte1",
//                 },
//             };

//             const result = getUnderlyingInterface(wanLinkConfig);
//             expect(result).toBe("lte1");
//         });
//     });

//     describe("GetWANInterface", () => {
//         it("should get interface name for basic ethernet", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-1",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for basic ethernet",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("MacVLAN-ether1-WAN-1");
//         });

//         it("should get interface name for PPPoE connection", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-PPPoE",
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

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for PPPoE connection",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("pppoe-client-WAN-PPPoE");
//         });

//         it("should get interface name for LTE", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "LTE-1",
//                 InterfaceConfig: {
//                     InterfaceName: "lte1",
//                 },
//                 ConnectionConfig: {
//                     lteSettings: {
//                         apn: "internet",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for LTE",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("lte1");
//         });

//         it("should get interface name for VLAN configuration", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-VLAN",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     VLANID: "100",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for VLAN configuration",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("MacVLAN-VLAN100-ether1-WAN-VLAN-WAN-VLAN");
//         });

//         it("should get interface name for MACVLAN configuration", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WAN-MAC",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     MacAddress: "AA:BB:CC:DD:EE:FF",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for MACVLAN configuration",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("MacVLAN-ether1-WAN-MAC");
//         });

//         it("should get interface name for wireless station", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "WiFi-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "wifi2.4",
//                     WirelessCredentials: {
//                         SSID: "TestWiFi",
//                         Password: "password",
//                     },
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for wireless station",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("MacVLAN-wifi2.4-WiFi-WAN");
//         });

//         it("should get interface name for MACVLAN on VLAN configuration", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "Complex-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "ether1",
//                     VLANID: "100",
//                     MacAddress: "AA:BB:CC:DD:EE:FF",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for MACVLAN on VLAN",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("MacVLAN-VLAN100-ether1-Complex-WAN-Complex-WAN");
//         });

//         it("should handle LTE with InterfaceName starting with lte", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "LTE-Auto",
//                 InterfaceConfig: {
//                     InterfaceName: "lte2",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "LTE interface detection",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("lte2");
//         });

//         it("should get interface name for SFP interface", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "SFP-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "sfp-sfpplus1",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for SFP",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("MacVLAN-sfp-sfpplus1-SFP-WAN");
//         });

//         it("should get interface name for bridge interface", () => {
//             const wanLinkConfig: WANLinkConfig = {
//                 name: "Bridge-WAN",
//                 InterfaceConfig: {
//                     InterfaceName: "bridge1",
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "Get interface name for bridge (no transformation)",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("bridge1");
//         });

//         it("should handle PPPoE with VLAN configuration", () => {
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

//             const result = testWithGenericOutput(
//                 "GetWANInterface",
//                 "PPPoE takes precedence over VLAN",
//                 { wanLinkConfig },
//                 () => GetWANInterface(wanLinkConfig),
//             );

//             expect(result).toBe("pppoe-client-VLAN-PPPoE");
//         });
//     });

//     describe("GetWANInterfaces", () => {
//         it("should get interfaces from single WANConfig", () => {
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

//             const result = testWithGenericOutput(
//                 "GetWANInterfaces",
//                 "Get interfaces from single WANConfig",
//                 { wanLink },
//                 () => GetWANInterfaces(wanLink),
//             );

//             expect(result).toHaveLength(1);
//             expect(result[0]).toBe("MacVLAN-ether1-WAN-1");
//         });

//         it("should get interfaces from multiple WANConfigs", () => {
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
//                         ConnectionConfig: {
//                             pppoe: {
//                                 username: "user",
//                                 password: "pass",
//                             },
//                         },
//                     },
//                 ],
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterfaces",
//                 "Get interfaces from multiple WANConfigs",
//                 { wanLink },
//                 () => GetWANInterfaces(wanLink),
//             );

//             expect(result).toHaveLength(2);
//             expect(result[0]).toBe("MacVLAN-ether1-WAN-1");
//             expect(result[1]).toBe("pppoe-client-WAN-2");
//         });

//         it("should return empty array for empty WANConfigs", () => {
//             const wanLink: WANLink = {
//                 WANConfigs: [],
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterfaces",
//                 "Empty WANConfigs returns empty array",
//                 { wanLink },
//                 () => GetWANInterfaces(wanLink),
//             );

//             expect(result).toHaveLength(0);
//         });
//     });

//     describe("GetWANInterfaceWName", () => {
//         it("should get interface by name from Foreign WAN", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "Foreign-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterfaceWName",
//                 "Get interface by name from Foreign WAN",
//                 { wanLinks, name: "Foreign-1" },
//                 () => GetWANInterfaceWName(wanLinks, "Foreign-1"),
//             );

//             expect(result).toBe("MacVLAN-ether1-Foreign-1");
//         });

//         it("should get interface by name from Domestic WAN", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [],
//                 },
//                 Domestic: {
//                     WANConfigs: [
//                         {
//                             name: "Domestic-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether2",
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterfaceWName",
//                 "Get interface by name from Domestic WAN",
//                 { wanLinks, name: "Domestic-1" },
//                 () => GetWANInterfaceWName(wanLinks, "Domestic-1"),
//             );

//             expect(result).toBe("MacVLAN-ether2-Domestic-1");
//         });

//         it("should return name itself when not found", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [],
//                 },
//             };

//             const result = testWithGenericOutput(
//                 "GetWANInterfaceWName",
//                 "Return name itself when not found",
//                 { wanLinks, name: "NotFound" },
//                 () => GetWANInterfaceWName(wanLinks, "NotFound"),
//             );

//             expect(result).toBe("NotFound");
//         });
//     });

//     describe("getInterfaceType", () => {
//         it("should identify ethernet interfaces", () => {
//             expect(getInterfaceType("ether1")).toBe("ethernet");
//             expect(getInterfaceType("ether5")).toBe("ethernet");
//             expect(getInterfaceType("ETHER1")).toBe("ethernet");
//         });

//         it("should identify wifi interfaces", () => {
//             expect(getInterfaceType("wifi2.4")).toBe("wifi");
//             expect(getInterfaceType("wifi5")).toBe("wifi");
//             expect(getInterfaceType("wlan1")).toBe("wifi");
//         });

//         it("should identify SFP interfaces", () => {
//             expect(getInterfaceType("sfp1")).toBe("sfp");
//             expect(getInterfaceType("sfp-sfpplus1")).toBe("sfp");
//         });

//         it("should identify LTE interfaces", () => {
//             expect(getInterfaceType("lte1")).toBe("lte");
//             expect(getInterfaceType("lte2")).toBe("lte");
//         });

//         it("should return null for non-physical interfaces", () => {
//             expect(getInterfaceType("bridge1")).toBeNull();
//             expect(getInterfaceType("bond1")).toBeNull();
//             expect(getInterfaceType("vlan100")).toBeNull();
//         });
//     });

//     describe("getInterfaceConfigPath", () => {
//         it("should return ethernet config path for ethernet type", () => {
//             expect(getInterfaceConfigPath("ethernet")).toBe("/interface ethernet");
//         });

//         it("should return ethernet config path for sfp type", () => {
//             expect(getInterfaceConfigPath("sfp")).toBe("/interface ethernet");
//         });

//         it("should return wifi config path for wifi type", () => {
//             expect(getInterfaceConfigPath("wifi")).toBe("/interface wifi");
//         });

//         it("should return lte config path for lte type", () => {
//             expect(getInterfaceConfigPath("lte")).toBe("/interface lte");
//         });
//     });

//     describe("collectInterfaceInfo", () => {
//         it("should add new ethernet interface to map", () => {
//             const interfaceMap = new Map<string, InterfaceInfo>();

//             collectInterfaceInfo(interfaceMap, "ether1", "Foreign-1", "Foreign");

//             expect(interfaceMap.size).toBe(1);
//             expect(interfaceMap.has("ether1")).toBe(true);
            
//             const info = interfaceMap.get("ether1");
//             expect(info?.type).toBe("ethernet");
//             expect(info?.networkType).toBe("Foreign");
//             expect(info?.linkNames).toEqual(["Foreign-1"]);
//         });

//         it("should append to existing interface linkNames", () => {
//             const interfaceMap = new Map<string, InterfaceInfo>();

//             collectInterfaceInfo(interfaceMap, "ether1", "Foreign-1", "Foreign");
//             collectInterfaceInfo(interfaceMap, "ether1", "Foreign-2", "Foreign");

//             expect(interfaceMap.size).toBe(1);
//             const info = interfaceMap.get("ether1");
//             expect(info?.linkNames).toEqual(["Foreign-1", "Foreign-2"]);
//         });

//         it("should skip non-physical interfaces", () => {
//             const interfaceMap = new Map<string, InterfaceInfo>();

//             collectInterfaceInfo(interfaceMap, "bridge1", "Bridge-WAN", "Foreign");

//             expect(interfaceMap.size).toBe(0);
//         });
//     });

//     describe("InterfaceComment", () => {
//         it("should generate comments for single Foreign WAN link", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "Foreign-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "InterfaceComment",
//                 "Generate comment for single Foreign WAN",
//                 { wanLinks },
//                 () => InterfaceComment(wanLinks),
//             );

//             validateRouterConfig(result, ["/interface ethernet"]);
//             expect(result["/interface ethernet"]).toHaveLength(1);
//             expect(result["/interface ethernet"][0]).toContain("Foreign WAN - Foreign-1");
//         });

//         it("should combine multiple links on same interface with --", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "Foreign-1",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                         },
//                         {
//                             name: "Foreign-2",
//                             InterfaceConfig: {
//                                 InterfaceName: "ether1",
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "InterfaceComment",
//                 "Combine multiple links on same interface",
//                 { wanLinks },
//                 () => InterfaceComment(wanLinks),
//             );

//             validateRouterConfig(result, ["/interface ethernet"]);
//             expect(result["/interface ethernet"]).toHaveLength(1);
//             expect(result["/interface ethernet"][0]).toContain("Foreign WAN - Foreign-1 -- Foreign-2");
//         });

//         it("should skip WiFi interfaces with wireless credentials (already commented in wireless config)", () => {
//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     WANConfigs: [
//                         {
//                             name: "WiFi-WAN",
//                             InterfaceConfig: {
//                                 InterfaceName: "wifi2.4",
//                                 WirelessCredentials: {
//                                     SSID: "TestWiFi",
//                                     Password: "password",
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             };

//             const result = testWithOutput(
//                 "InterfaceComment",
//                 "Skip WiFi interface with credentials (already has comment in wireless config)",
//                 { wanLinks },
//                 () => InterfaceComment(wanLinks),
//             );

//             // Wireless interfaces with credentials should not have a separate comment command
//             // They already get comments during wireless station mode configuration
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should return empty config for no WAN links", () => {
//             const wanLinks: WANLinks = {};

//             const result = testWithOutput(
//                 "InterfaceComment",
//                 "Handle empty WAN links",
//                 { wanLinks },
//                 () => InterfaceComment(wanLinks),
//             );

//             expect(Object.keys(result)).toHaveLength(0);
//         });
//     });
// });

