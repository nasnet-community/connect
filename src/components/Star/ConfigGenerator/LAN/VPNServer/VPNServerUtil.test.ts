// import { describe, it, expect } from "vitest";
// import {
//     testWithGenericOutput,
//     testWithOutput,
//     validateRouterConfig,
//     validateRouterConfigStructure,
// } from "~/test-utils/test-helpers";
// import {
//     formatArrayValue,
//     formatBooleanValue,
//     VSInboundTraffic,
//     VSInterfaceList,
//     VSAddressList,
//     generateIPPool,
//     VSPorfile,
// } from "./VPNServerUtil";
// import type { VPNServer } from "~/components/Star/StarContext";

// describe("VPN Server Utility Functions Tests", () => {

//     describe("formatArrayValue Function", () => {
//         it("should format array values correctly", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format string array",
//                 { value: ["sha256", "sha512"] },
//                 () => formatArrayValue(["sha256", "sha512"]),
//             );

//             const result = formatArrayValue(["sha256", "sha512"]);
//             expect(result).toBe("sha256,sha512");
//         });

//         it("should handle empty arrays", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format empty array",
//                 { value: [] },
//                 () => formatArrayValue([]),
//             );

//             const result = formatArrayValue([]);
//             expect(result).toBe("");
//         });

//         it("should handle single item arrays", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format single item array",
//                 { value: ["sha256"] },
//                 () => formatArrayValue(["sha256"]),
//             );

//             const result = formatArrayValue(["sha256"]);
//             expect(result).toBe("sha256");
//         });

//         it("should handle null values", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format null value",
//                 { value: null },
//                 () => formatArrayValue(null),
//             );

//             const result = formatArrayValue(null);
//             expect(result).toBe("null");
//         });

//         it("should handle undefined values", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format undefined value",
//                 { value: undefined },
//                 () => formatArrayValue(undefined),
//             );

//             const result = formatArrayValue(undefined);
//             expect(result).toBe("undefined");
//         });

//         it("should handle mixed data types in arrays", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format mixed type array",
//                 { value: ["string", 123, true] },
//                 () => formatArrayValue(["string", 123, true]),
//             );

//             const result = formatArrayValue(["string", 123, true]);
//             expect(result).toBe("string,123,true");
//         });

//         it("should handle arrays with multiple encryption algorithms", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format encryption algorithms array",
//                 { value: ["aes-256-cbc", "aes-128-cbc", "3des"] },
//                 () => formatArrayValue(["aes-256-cbc", "aes-128-cbc", "3des"]),
//             );

//             const result = formatArrayValue(["aes-256-cbc", "aes-128-cbc", "3des"]);
//             expect(result).toBe("aes-256-cbc,aes-128-cbc,3des");
//         });

//         it("should handle arrays with hash algorithms", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format hash algorithms array",
//                 { value: ["sha256", "sha512", "sha1", "md5"] },
//                 () => formatArrayValue(["sha256", "sha512", "sha1", "md5"]),
//             );

//             const result = formatArrayValue(["sha256", "sha512", "sha1", "md5"]);
//             expect(result).toBe("sha256,sha512,sha1,md5");
//         });

//         it("should handle numeric arrays", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format numeric array",
//                 { value: [1, 2, 3, 4, 5] },
//                 () => formatArrayValue([1, 2, 3, 4, 5]),
//             );

//             const result = formatArrayValue([1, 2, 3, 4, 5]);
//             expect(result).toBe("1,2,3,4,5");
//         });
//     });

//     describe("formatBooleanValue Function", () => {
//         it("should format true to 'yes'", () => {
//             testWithGenericOutput(
//                 "formatBooleanValue",
//                 "Format boolean true to yes",
//                 { value: true },
//                 () => formatBooleanValue(true),
//             );

//             const result = formatBooleanValue(true);
//             expect(result).toBe("yes");
//         });

//         it("should format false to 'no'", () => {
//             testWithGenericOutput(
//                 "formatBooleanValue",
//                 "Format boolean false to no",
//                 { value: false },
//                 () => formatBooleanValue(false),
//             );

//             const result = formatBooleanValue(false);
//             expect(result).toBe("no");
//         });

//         it("should handle boolean true for NAT traversal", () => {
//             testWithGenericOutput(
//                 "formatBooleanValue",
//                 "NAT traversal enabled",
//                 { value: true },
//                 () => formatBooleanValue(true),
//             );

//             expect(formatBooleanValue(true)).toBe("yes");
//         });

//         it("should handle boolean false for encryption", () => {
//             testWithGenericOutput(
//                 "formatBooleanValue",
//                 "Encryption disabled",
//                 { value: false },
//                 () => formatBooleanValue(false),
//             );

//             expect(formatBooleanValue(false)).toBe("no");
//         });
//     });

//     describe("Edge Cases and Type Coercion", () => {
//         it("should handle string values in formatArrayValue", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format string value (non-array)",
//                 { value: "single-value" },
//                 () => formatArrayValue("single-value"),
//             );

//             const result = formatArrayValue("single-value");
//             expect(result).toBe("single-value");
//         });

//         it("should handle number values in formatArrayValue", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format number value (non-array)",
//                 { value: 42 },
//                 () => formatArrayValue(42),
//             );

//             const result = formatArrayValue(42);
//             expect(result).toBe("42");
//         });

//         it("should handle objects in formatArrayValue", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format object value",
//                 { value: { key: "value" } },
//                 () => formatArrayValue({ key: "value" }),
//             );

//             const result = formatArrayValue({ key: "value" });
//             expect(result).toBe("[object Object]");
//         });

//         it("should handle arrays with special characters", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format array with special characters",
//                 { value: ["value-1", "value_2", "value.3"] },
//                 () => formatArrayValue(["value-1", "value_2", "value.3"]),
//             );

//             const result = formatArrayValue(["value-1", "value_2", "value.3"]);
//             expect(result).toBe("value-1,value_2,value.3");
//         });

//         it("should handle arrays with empty strings", () => {
//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format array with empty strings",
//                 { value: ["", "value", ""] },
//                 () => formatArrayValue(["", "value", ""]),
//             );

//             const result = formatArrayValue(["", "value", ""]);
//             expect(result).toBe(",value,");
//         });

//         it("should handle very long arrays", () => {
//             const longArray = Array.from({ length: 100 }, (_, i) => `value${i}`);

//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format very long array (100 items)",
//                 { value: `Array with ${longArray.length} items` },
//                 () => formatArrayValue(longArray),
//             );

//             const result = formatArrayValue(longArray);
//             expect(result).toContain("value0,value1");
//             expect(result).toContain("value99");
//         });
//     });

//     describe("Real-World VPN Configuration Scenarios", () => {
//         it("should format DH groups array", () => {
//             const dhGroups = ["modp2048", "modp1536", "modp1024"];

//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format DH groups for IKEv2",
//                 { value: dhGroups },
//                 () => formatArrayValue(dhGroups),
//             );

//             const result = formatArrayValue(dhGroups);
//             expect(result).toBe("modp2048,modp1536,modp1024");
//         });

//         it("should format encryption algorithms array", () => {
//             const encAlgorithms = ["aes-256-cbc", "aes-192-cbc", "aes-128-cbc"];

//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format encryption algorithms for OpenVPN",
//                 { value: encAlgorithms },
//                 () => formatArrayValue(encAlgorithms),
//             );

//             const result = formatArrayValue(encAlgorithms);
//             expect(result).toBe("aes-256-cbc,aes-192-cbc,aes-128-cbc");
//         });

//         it("should format authentication methods array", () => {
//             const authMethods = ["pre-shared-key", "rsa-signature", "eap"];

//             testWithGenericOutput(
//                 "formatArrayValue",
//                 "Format authentication methods for IKEv2",
//                 { value: authMethods },
//                 () => formatArrayValue(authMethods),
//             );

//             const result = formatArrayValue(authMethods);
//             expect(result).toBe("pre-shared-key,rsa-signature,eap");
//         });

//         it("should format NAT traversal boolean", () => {
//             testWithGenericOutput(
//                 "formatBooleanValue",
//                 "NAT traversal enabled for IKEv2",
//                 { value: true },
//                 () => formatBooleanValue(true),
//             );

//             expect(formatBooleanValue(true)).toBe("yes");
//         });

//         it("should format encryption boolean", () => {
//             testWithGenericOutput(
//                 "formatBooleanValue",
//                 "Encryption required for PPP",
//                 { value: true },
//                 () => formatBooleanValue(true),
//             );

//             expect(formatBooleanValue(true)).toBe("yes");
//         });
//     });

//     describe("VSInboundTraffic Function", () => {
//         it("should handle basic inbound traffic marking with valid VPN server", () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: "user1", Password: "pass1", VPNType: ["Wireguard"] },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "Basic inbound traffic marking with valid VPN server",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//             expect(Array.isArray(result["/ip firewall mangle"])).toBe(true);
//         });

//         it("should handle empty VPN server object", () => {
//             const vpnServer: VPNServer = {
//                 Users: [],
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "Empty VPN server object",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//             expect(Array.isArray(result["/ip firewall mangle"])).toBe(true);
//         });

//         it("should handle VPN server with multiple protocols enabled", () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: "user1", Password: "pass1", VPNType: ["Wireguard", "OpenVPN"] },
//                     { Username: "user2", Password: "pass2", VPNType: ["PPTP", "L2TP"] },
//                 ],
//                 PptpServer: { enabled: true },
//                 L2tpServer: { enabled: true, IPsec: { UseIpsec: "yes" } },
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "VPN server with multiple protocols enabled",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//         });

//         it("should verify mangle structure for connection marking", () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: "test", Password: "test123", VPNType: ["Wireguard"] },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "Verify mangle structure for connection marking",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(result["/ip firewall mangle"]).toBeDefined();
//             expect(Array.isArray(result["/ip firewall mangle"])).toBe(true);
//         });

//         it("should handle null vpnServer gracefully", () => {
//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "Null vpnServer",
//                 { vpnServer: null },
//                 () => VSInboundTraffic(null as any),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//         });

//         it("should handle undefined vpnServer gracefully", () => {
//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "Undefined vpnServer",
//                 { vpnServer: undefined },
//                 () => VSInboundTraffic(undefined as any),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//         });

//         it("should handle VPN server with WireGuard configuration", () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: "wg_user", Password: "wg_pass", VPNType: ["Wireguard"] },
//                 ],
//                 WireguardServers: [
//                     {
//                         Interface: {
//                             Name: "wg-server",
//                             PrivateKey: "privatekey123",
//                             InterfaceAddress: "10.10.10.1/24",
//                             ListenPort: 51820,
//                         },
//                         Peers: [],
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "VPN server with WireGuard configuration",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//         });

//         it("should handle VPN server with OpenVPN configuration", () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: "ovpn_user", Password: "ovpn_pass", VPNType: ["OpenVPN"] },
//                 ],
//                 OpenVpnServer: [
//                     {
//                         name: "ovpn-server",
//                         enabled: true,
//                         Encryption: { Auth: ["sha256"] },
//                         IPV6: {},
//                         Certificate: { Certificate: "cert1" },
//                         Address: {},
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "VPN server with OpenVPN configuration",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall mangle");
//         });

//         it("should return valid RouterConfig structure", () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: "user", Password: "pass", VPNType: ["L2TP"] },
//                 ],
//                 L2tpServer: {
//                     enabled: true,
//                     IPsec: { UseIpsec: "required", IpsecSecret: "secret123" },
//                 },
//             };

//             const result = testWithOutput(
//                 "VSInboundTraffic",
//                 "Return valid RouterConfig structure",
//                 { vpnServer },
//                 () => VSInboundTraffic(vpnServer),
//             );

//             validateRouterConfigStructure(result);
//             expect(typeof result).toBe("object");
//             expect(result["/ip firewall mangle"]).toBeDefined();
//         });
//     });

//     describe("VSInterfaceList Function", () => {
//         it("should create basic interface list for VPN network", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Basic interface list for VPN network",
//                 { interfaceName: "wg-server", VSNetwork: "VPN" },
//                 () => VSInterfaceList("wg-server", "VPN"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].length).toBe(2);
//         });

//         it("should handle Domestic VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Interface list for Domestic network",
//                 { interfaceName: "ovpn-server", VSNetwork: "Domestic" },
//                 () => VSInterfaceList("ovpn-server", "Domestic"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes("Domestic-LAN"))).toBe(true);
//         });

//         it("should handle Foreign VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Interface list for Foreign network",
//                 { interfaceName: "pptp-server", VSNetwork: "Foreign" },
//                 () => VSInterfaceList("pptp-server", "Foreign"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes("Foreign-LAN"))).toBe(true);
//         });

//         it("should handle Split VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Interface list for Split network",
//                 { interfaceName: "l2tp-server", VSNetwork: "Split" },
//                 () => VSInterfaceList("l2tp-server", "Split"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes("Split-LAN"))).toBe(true);
//         });

//         it("should add interface to both LAN and VSNetwork-LAN lists", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Add to both LAN and VPN-LAN lists",
//                 { interfaceName: "vpn-interface", VSNetwork: "VPN" },
//                 () => VSInterfaceList("vpn-interface", "VPN"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes('list="LAN"'))).toBe(true);
//             expect(result["/interface list member"].some(cmd => cmd.includes('list="VPN-LAN"'))).toBe(true);
//         });

//         it("should include custom comment when provided", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Interface list with custom comment",
//                 { interfaceName: "wg-vpn", VSNetwork: "VPN", comment: "WireGuard VPN Server" },
//                 () => VSInterfaceList("wg-vpn", "VPN", "WireGuard VPN Server"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes('comment="WireGuard VPN Server"'))).toBe(true);
//         });

//         it("should omit comment when not provided", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Interface list without comment",
//                 { interfaceName: "sstp-server", VSNetwork: "Domestic" },
//                 () => VSInterfaceList("sstp-server", "Domestic"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             const allCommands = result["/interface list member"].join(" ");
//             expect(allCommands.includes("comment=")).toBe(false);
//         });

//         it("should handle interface names with special characters", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Interface name with special characters",
//                 { interfaceName: "vpn-server-01", VSNetwork: "VPN" },
//                 () => VSInterfaceList("vpn-server-01", "VPN"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes('interface="vpn-server-01"'))).toBe(true);
//         });

//         it("should handle multiple interface configurations", () => {
//             const result1 = testWithOutput(
//                 "VSInterfaceList",
//                 "First interface configuration",
//                 { interfaceName: "wg-1", VSNetwork: "VPN" },
//                 () => VSInterfaceList("wg-1", "VPN"),
//             );

//             const result2 = testWithOutput(
//                 "VSInterfaceList",
//                 "Second interface configuration",
//                 { interfaceName: "wg-2", VSNetwork: "Domestic" },
//                 () => VSInterfaceList("wg-2", "Domestic"),
//             );

//             validateRouterConfig(result1, ["/interface list member"]);
//             validateRouterConfig(result2, ["/interface list member"]);
//             expect(result1["/interface list member"].length).toBe(2);
//             expect(result2["/interface list member"].length).toBe(2);
//         });

//         it("should generate correct RouterConfig structure", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Correct RouterConfig structure",
//                 { interfaceName: "ikev2-server", VSNetwork: "Foreign" },
//                 () => VSInterfaceList("ikev2-server", "Foreign"),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/interface list member");
//             expect(Array.isArray(result["/interface list member"])).toBe(true);
//         });

//         it("should handle interface with long descriptive name", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Long interface name",
//                 { interfaceName: "wireguard-corporate-vpn-server", VSNetwork: "VPN" },
//                 () => VSInterfaceList("wireguard-corporate-vpn-server", "VPN"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             expect(result["/interface list member"].some(cmd => cmd.includes("wireguard-corporate-vpn-server"))).toBe(true);
//         });

//         it("should create valid MikroTik commands", () => {
//             const result = testWithOutput(
//                 "VSInterfaceList",
//                 "Valid MikroTik commands",
//                 { interfaceName: "vpn-server", VSNetwork: "Split" },
//                 () => VSInterfaceList("vpn-server", "Split"),
//             );

//             validateRouterConfig(result, ["/interface list member"]);
//             result["/interface list member"].forEach(cmd => {
//                 expect(cmd).toContain('add interface=');
//                 expect(cmd).toContain('list=');
//             });
//         });
//     });

//     describe("VSAddressList Function", () => {
//         it("should create basic address list for VPN network", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Basic address list for VPN network",
//                 { subnet: "192.168.40.0/24", VSNetwork: "VPN" },
//                 () => VSAddressList("192.168.40.0/24", "VPN"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].length).toBeGreaterThan(0);
//         });

//         it("should handle Domestic VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Address list for Domestic network",
//                 { subnet: "192.168.20.0/24", VSNetwork: "Domestic" },
//                 () => VSAddressList("192.168.20.0/24", "Domestic"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes('list="Domestic-LAN"'))).toBe(true);
//         });

//         it("should handle Foreign VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Address list for Foreign network",
//                 { subnet: "192.168.30.0/24", VSNetwork: "Foreign" },
//                 () => VSAddressList("192.168.30.0/24", "Foreign"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes('list="Foreign-LAN"'))).toBe(true);
//         });

//         it("should handle Split VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Address list for Split network",
//                 { subnet: "192.168.10.0/24", VSNetwork: "Split" },
//                 () => VSAddressList("192.168.10.0/24", "Split"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes('list="Split-LAN"'))).toBe(true);
//         });

//         it("should handle /24 subnet format", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Subnet with /24 prefix",
//                 { subnet: "10.10.10.0/24", VSNetwork: "VPN" },
//                 () => VSAddressList("10.10.10.0/24", "VPN"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes("10.10.10.0/24"))).toBe(true);
//         });

//         it("should handle /30 subnet format", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Subnet with /30 prefix",
//                 { subnet: "172.16.0.0/30", VSNetwork: "VPN" },
//                 () => VSAddressList("172.16.0.0/30", "VPN"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes("172.16.0.0/30"))).toBe(true);
//         });

//         it("should handle /16 subnet format", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Subnet with /16 prefix",
//                 { subnet: "172.16.0.0/16", VSNetwork: "Domestic" },
//                 () => VSAddressList("172.16.0.0/16", "Domestic"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes("172.16.0.0/16"))).toBe(true);
//         });

//         it("should handle /8 subnet format", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Subnet with /8 prefix",
//                 { subnet: "10.0.0.0/8", VSNetwork: "Foreign" },
//                 () => VSAddressList("10.0.0.0/8", "Foreign"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes("10.0.0.0/8"))).toBe(true);
//         });

//         it("should include custom comment when provided", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Address list with custom comment",
//                 { subnet: "192.168.100.0/24", VSNetwork: "VPN", comment: "Corporate VPN Network" },
//                 () => VSAddressList("192.168.100.0/24", "VPN", "Corporate VPN Network"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes('comment="Corporate VPN Network"'))).toBe(true);
//         });

//         it("should omit comment when not provided", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Address list without comment",
//                 { subnet: "192.168.50.0/24", VSNetwork: "Split" },
//                 () => VSAddressList("192.168.50.0/24", "Split"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             const allCommands = result["/ip firewall address-list"].join(" ");
//             expect(allCommands.includes('comment=')).toBe(false);
//         });

//         it("should handle Class A private subnet (10.x.x.x/24)", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Class A private subnet",
//                 { subnet: "10.20.30.0/24", VSNetwork: "VPN" },
//                 () => VSAddressList("10.20.30.0/24", "VPN"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes("10.20.30.0/24"))).toBe(true);
//         });

//         it("should handle Class B private subnet (172.16.x.x/24)", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Class B private subnet",
//                 { subnet: "172.16.50.0/24", VSNetwork: "Domestic" },
//                 () => VSAddressList("172.16.50.0/24", "Domestic"),
//             );

//             validateRouterConfig(result, ["/ip firewall address-list"]);
//             expect(result["/ip firewall address-list"].some(cmd => cmd.includes("172.16.50.0/24"))).toBe(true);
//         });

//         it("should generate valid RouterConfig structure", () => {
//             const result = testWithOutput(
//                 "VSAddressList",
//                 "Valid RouterConfig structure",
//                 { subnet: "192.168.70.0/24", VSNetwork: "Foreign" },
//                 () => VSAddressList("192.168.70.0/24", "Foreign"),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ip firewall address-list");
//             expect(Array.isArray(result["/ip firewall address-list"])).toBe(true);
//         });
//     });

//     describe("generateIPPool Function", () => {
//         it("should generate basic IP pool with name and ranges", () => {
//             const poolConfig = {
//                 name: "vpn-users",
//                 ranges: "192.168.40.10-192.168.40.100",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Basic IP pool with name and ranges",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result.length).toBe(1);
//             expect(result[0]).toContain('name="vpn-users-pool"');
//             expect(result[0]).toContain('ranges=192.168.40.10-192.168.40.100');
//         });

//         it("should include nextPool parameter when provided", () => {
//             const poolConfig = {
//                 name: "primary-pool",
//                 ranges: "192.168.50.10-192.168.50.50",
//                 nextPool: "secondary-pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Pool with nextPool parameter",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('next-pool=secondary-pool');
//         });

//         it("should include comment parameter when provided", () => {
//             const poolConfig = {
//                 name: "wireguard",
//                 ranges: "10.10.10.10-10.10.10.50",
//                 comment: "WireGuard VPN Pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Pool with comment parameter",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('comment="WireGuard VPN Pool"');
//         });

//         it("should include all parameters when provided", () => {
//             const poolConfig = {
//                 name: "full-pool",
//                 ranges: "172.16.0.10-172.16.0.100",
//                 nextPool: "overflow-pool",
//                 comment: "Full configuration pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Pool with all parameters",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('name="full-pool-pool"');
//             expect(result[0]).toContain('ranges=172.16.0.10-172.16.0.100');
//             expect(result[0]).toContain('next-pool=overflow-pool');
//             expect(result[0]).toContain('comment="Full configuration pool"');
//         });

//         it("should handle small /30 IP range", () => {
//             const poolConfig = {
//                 name: "small-pool",
//                 ranges: "192.168.1.1-192.168.1.2",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Small /30 IP range",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain("192.168.1.1-192.168.1.2");
//         });

//         it("should handle standard /24 IP range", () => {
//             const poolConfig = {
//                 name: "standard-pool",
//                 ranges: "192.168.100.5-192.168.100.254",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Standard /24 IP range",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain("192.168.100.5-192.168.100.254");
//         });

//         it("should handle large /16 IP range", () => {
//             const poolConfig = {
//                 name: "large-pool",
//                 ranges: "10.20.0.1-10.20.255.254",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Large /16 IP range",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain("10.20.0.1-10.20.255.254");
//         });

//         it("should handle IP range in format 10.10.10.10-10.10.10.50", () => {
//             const poolConfig = {
//                 name: "custom-range",
//                 ranges: "10.10.10.10-10.10.10.50",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Custom IP range format",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain("10.10.10.10-10.10.10.50");
//         });

//         it("should handle minimal configuration", () => {
//             const poolConfig = {
//                 name: "minimal",
//                 ranges: "192.168.1.100-192.168.1.200",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Minimal configuration",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('name="minimal-pool"');
//             expect(result[0]).toContain('ranges=192.168.1.100-192.168.1.200');
//             expect(result[0]).not.toContain('next-pool');
//             expect(result[0]).not.toContain('comment');
//         });

//         it("should append -pool suffix to name", () => {
//             const poolConfig = {
//                 name: "openvpn",
//                 ranges: "192.168.60.10-192.168.60.100",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Name with -pool suffix",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('name="openvpn-pool"');
//         });

//         it("should generate valid MikroTik add command", () => {
//             const poolConfig = {
//                 name: "test-pool",
//                 ranges: "192.168.70.5-192.168.70.250",
//                 comment: "Test Pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Valid MikroTik add command",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toMatch(/^add /);
//             expect(result[0]).toContain('name=');
//             expect(result[0]).toContain('ranges=');
//         });

//         it("should handle pool for PPTP server", () => {
//             const poolConfig = {
//                 name: "pptp",
//                 ranges: "192.168.70.5-192.168.70.250",
//                 comment: "PPTP VPN Server Pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "PPTP server pool",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('name="pptp-pool"');
//         });

//         it("should handle pool for L2TP server", () => {
//             const poolConfig = {
//                 name: "l2tp",
//                 ranges: "192.168.80.5-192.168.80.250",
//                 comment: "L2TP VPN Server Pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "L2TP server pool",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('name="l2tp-pool"');
//         });

//         it("should handle pool for SSTP server", () => {
//             const poolConfig = {
//                 name: "sstp",
//                 ranges: "192.168.90.5-192.168.90.250",
//                 comment: "SSTP VPN Server Pool",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "SSTP server pool",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toContain('name="sstp-pool"');
//         });

//         it("should return array with single command string", () => {
//             const poolConfig = {
//                 name: "verify-structure",
//                 ranges: "10.0.0.1-10.0.0.100",
//             };

//             const result = testWithGenericOutput(
//                 "generateIPPool",
//                 "Verify return structure",
//                 { poolConfig },
//                 () => generateIPPool(poolConfig),
//             );

//             expect(Array.isArray(result)).toBe(true);
//             expect(result.length).toBe(1);
//             expect(typeof result[0]).toBe("string");
//         });
//     });

//     describe("VSPorfile Function", () => {
//         it("should create basic profile for VPN network", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Basic profile for VPN network",
//                 { subnet: "192.168.40.0/24", VSNetwork: "VPN", name: "wg-vpn" },
//                 () => VSPorfile("192.168.40.0/24", "VPN", "wg-vpn"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].length).toBeGreaterThan(0);
//         });

//         it("should handle Domestic VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Profile for Domestic network",
//                 { subnet: "192.168.20.0/24", VSNetwork: "Domestic", name: "domestic-vpn" },
//                 () => VSPorfile("192.168.20.0/24", "Domestic", "domestic-vpn"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('address-list="Domestic-LAN"'))).toBe(true);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('interface-list="Domestic-LAN"'))).toBe(true);
//         });

//         it("should handle Foreign VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Profile for Foreign network",
//                 { subnet: "192.168.30.0/24", VSNetwork: "Foreign", name: "foreign-vpn" },
//                 () => VSPorfile("192.168.30.0/24", "Foreign", "foreign-vpn"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('address-list="Foreign-LAN"'))).toBe(true);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('interface-list="Foreign-LAN"'))).toBe(true);
//         });

//         it("should handle Split VSNetwork type", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Profile for Split network",
//                 { subnet: "192.168.10.0/24", VSNetwork: "Split", name: "split-vpn" },
//                 () => VSPorfile("192.168.10.0/24", "Split", "split-vpn"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('address-list="Split-LAN"'))).toBe(true);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('interface-list="Split-LAN"'))).toBe(true);
//         });

//         it("should set DNS server to first IP of subnet", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "DNS server as first IP of subnet",
//                 { subnet: "192.168.100.0/24", VSNetwork: "VPN", name: "test-vpn" },
//                 () => VSPorfile("192.168.100.0/24", "VPN", "test-vpn"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('dns-server="192.168.100.1"'))).toBe(true);
//         });

//         it("should set local-address to first IP of subnet", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Local address as first IP of subnet",
//                 { subnet: "10.10.10.0/24", VSNetwork: "VPN", name: "local-test" },
//                 () => VSPorfile("10.10.10.0/24", "VPN", "local-test"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('local-address="10.10.10.1"'))).toBe(true);
//         });

//         it("should set pool name to {name}-pool", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Pool name format",
//                 { subnet: "172.16.0.0/24", VSNetwork: "VPN", name: "ovpn" },
//                 () => VSPorfile("172.16.0.0/24", "VPN", "ovpn"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('remote-address="ovpn-pool"'))).toBe(true);
//         });

//         it("should set profile name to {name}-profile", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Profile name format",
//                 { subnet: "192.168.60.0/24", VSNetwork: "VPN", name: "pptp" },
//                 () => VSPorfile("192.168.60.0/24", "VPN", "pptp"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('name="pptp-profile"'))).toBe(true);
//         });

//         it("should verify use-encryption=yes", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Verify encryption enabled",
//                 { subnet: "192.168.70.0/24", VSNetwork: "VPN", name: "l2tp" },
//                 () => VSPorfile("192.168.70.0/24", "VPN", "l2tp"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('use-encryption=yes'))).toBe(true);
//         });

//         it("should verify use-ipv6=no", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Verify IPv6 disabled",
//                 { subnet: "192.168.80.0/24", VSNetwork: "VPN", name: "sstp" },
//                 () => VSPorfile("192.168.80.0/24", "VPN", "sstp"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('use-ipv6=no'))).toBe(true);
//         });

//         it("should verify use-upnp=yes", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Verify UPnP enabled",
//                 { subnet: "192.168.90.0/24", VSNetwork: "VPN", name: "ikev2" },
//                 () => VSPorfile("192.168.90.0/24", "VPN", "ikev2"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('use-upnp=yes'))).toBe(true);
//         });

//         it("should handle profile with descriptive name", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Descriptive profile name",
//                 { subnet: "10.20.30.0/24", VSNetwork: "Domestic", name: "corporate-vpn-users" },
//                 () => VSPorfile("10.20.30.0/24", "Domestic", "corporate-vpn-users"),
//             );

//             validateRouterConfig(result, ["/ppp profile"]);
//             expect(result["/ppp profile"].some(cmd => cmd.includes('name="corporate-vpn-users-profile"'))).toBe(true);
//         });

//         it("should generate valid RouterConfig structure", () => {
//             const result = testWithOutput(
//                 "VSPorfile",
//                 "Valid RouterConfig structure",
//                 { subnet: "192.168.50.0/24", VSNetwork: "Foreign", name: "test-profile" },
//                 () => VSPorfile("192.168.50.0/24", "Foreign", "test-profile"),
//             );

//             validateRouterConfigStructure(result);
//             expect(result).toHaveProperty("/ppp profile");
//             expect(Array.isArray(result["/ppp profile"])).toBe(true);
//         });
//     });
// });
