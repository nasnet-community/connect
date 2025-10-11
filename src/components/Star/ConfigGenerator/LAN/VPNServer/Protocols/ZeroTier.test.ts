// import { describe, it } from "vitest";
// import {
//     ZeroTierServer,
//     ZeroTierServerUsers,
//     ZeroTierServerFirewall,
//     ZeroTierServerWrapper,
// } from "./ZeroTier";
// import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
// import type { ZeroTierServerConfig } from "~/components/Star/StarContext";

// describe("ZeroTier Protocol Tests", () => {
//     describe("ZeroTierServer Function", () => {
//         it("should generate basic ZeroTier server configuration", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1234567890abcdef",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Basic ZeroTier server configuration",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });

//         it("should generate ZeroTier configuration with 16-character network ID", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "a1b2c3d4e5f6g7h8",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier with 16-character network ID",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });

//         it("should return empty config when disabled", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: false,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1234567890abcdef",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier disabled",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle ZeroTier with VSNetwork configuration", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "9876543210fedcba",
//                 VSNetwork: "VPN",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier with VSNetwork VPN",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });

//         it("should configure ZeroTier instance correctly", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "aaaaaaaaaaaaaaaa",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier instance configuration",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle various network ID formats", () => {
//             const networkIDs = [
//                 "0123456789abcdef",
//                 "fedcba9876543210",
//                 "1111111111111111",
//                 "ffffffffffffffff",
//                 "a1b2c3d4e5f6g7h8",
//             ];

//             networkIDs.forEach((networkID) => {
//                 const config: ZeroTierServerConfig = {
//                     enabled: true,
//                     Network: "LAN",
//                     ZeroTierNetworkID: networkID,
//                 };

//                 testWithOutput(
//                     "ZeroTierServer",
//                     `ZeroTier with network ID ${networkID}`,
//                     { config },
//                     () => ZeroTierServer(config),
//                 );

//                 const result = ZeroTierServer(config);
//                 validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//             });
//         });

//         it("should handle ZeroTier on WAN network", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "WAN",
//                 ZeroTierNetworkID: "1234567890abcdef",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier on WAN network",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should configure interface settings correctly", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "abc123def456ghi7",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Verify interface settings",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });
//     });

//     describe("ZeroTierServerUsers Function", () => {
//         it("should return empty configuration (not implemented)", () => {
//             testWithOutput(
//                 "ZeroTierServerUsers",
//                 "ZeroTier users - empty implementation",
//                 {},
//                 () => ZeroTierServerUsers(),
//             );

//             const result = ZeroTierServerUsers();
//             validateRouterConfigStructure(result);
//         });

//         it("should always return empty object", () => {
//             const result = ZeroTierServerUsers();
//             validateRouterConfigStructure(result);
//         });
//     });

//     describe("ZeroTierServerFirewall Function", () => {
//         it("should generate firewall rules for ZeroTier server", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1234567890abcdef",
//             };

//             testWithOutput(
//                 "ZeroTierServerFirewall",
//                 "Firewall rules for ZeroTier",
//                 { config },
//                 () => ZeroTierServerFirewall(config),
//             );

//             const result = ZeroTierServerFirewall(config);
//             validateRouterConfig(result, ["/ip firewall filter"]);
//         });

//         it("should return empty config when ZeroTier is disabled", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: false,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1234567890abcdef",
//             };

//             testWithOutput(
//                 "ZeroTierServerFirewall",
//                 "Firewall with ZeroTier disabled",
//                 { config },
//                 () => ZeroTierServerFirewall(config),
//             );

//             const result = ZeroTierServerFirewall(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should create accept rules for zerotier1 interface", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "abcdef1234567890",
//             };

//             testWithOutput(
//                 "ZeroTierServerFirewall",
//                 "ZeroTier firewall accept rules",
//                 { config },
//                 () => ZeroTierServerFirewall(config),
//             );

//             const result = ZeroTierServerFirewall(config);
//             validateRouterConfig(result, ["/ip firewall filter"]);
//         });

//         it("should handle firewall rules with VSNetwork", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "9876543210fedcba",
//                 VSNetwork: "VPN",
//             };

//             testWithOutput(
//                 "ZeroTierServerFirewall",
//                 "ZeroTier firewall with VSNetwork",
//                 { config },
//                 () => ZeroTierServerFirewall(config),
//             );

//             const result = ZeroTierServerFirewall(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should create both forward and input rules", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1111111111111111",
//             };

//             testWithOutput(
//                 "ZeroTierServerFirewall",
//                 "ZeroTier forward and input rules",
//                 { config },
//                 () => ZeroTierServerFirewall(config),
//             );

//             const result = ZeroTierServerFirewall(config);
//             validateRouterConfig(result, ["/ip firewall filter"]);
//         });
//     });

//     describe("ZeroTierServerWrapper Function", () => {
//         it("should return empty configuration (not implemented)", () => {
//             testWithOutput(
//                 "ZeroTierServerWrapper",
//                 "ZeroTier wrapper - empty implementation",
//                 {},
//                 () => ZeroTierServerWrapper(),
//             );

//             const result = ZeroTierServerWrapper();
//             validateRouterConfigStructure(result);
//         });

//         it("should always return empty object", () => {
//             const result = ZeroTierServerWrapper();
//             validateRouterConfigStructure(result);
//         });
//     });

//     describe("Edge Cases and Integration", () => {
//         it("should handle minimal ZeroTier configuration", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "0000000000000000",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Minimal ZeroTier configuration",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle ZeroTier with all optional parameters", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "ffffffffffffffff",
//                 VSNetwork: "Domestic",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier with all parameters",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });

//         it("should handle different VSNetwork types", () => {
//             const vsNetworks: Array<"VPN" | "Domestic" | "Foreign" | "Split"> = [
//                 "VPN",
//                 "Domestic",
//                 "Foreign",
//                 "Split",
//             ];

//             vsNetworks.forEach((vsNetwork) => {
//                 const config: ZeroTierServerConfig = {
//                     enabled: true,
//                     Network: "LAN",
//                     ZeroTierNetworkID: "1234567890abcdef",
//                     VSNetwork: vsNetwork,
//                 };

//                 testWithOutput(
//                     "ZeroTierServer",
//                     `ZeroTier with VSNetwork ${vsNetwork}`,
//                     { config },
//                     () => ZeroTierServer(config),
//                 );

//                 const result = ZeroTierServer(config);
//                 validateRouterConfigStructure(result);
//             });
//         });

//         it("should verify zerotier1 interface name consistency", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "a1a1a1a1a1a1a1a1",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Verify zerotier1 interface name",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier interface"]);
//         });

//         it("should handle network ID with mixed case characters", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "AaBbCcDdEeFfGgHh",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "ZeroTier with mixed case network ID",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle disabled state with various configurations", () => {
//             const configs: ZeroTierServerConfig[] = [
//                 {
//                     enabled: false,
//                     Network: "LAN",
//                     ZeroTierNetworkID: "1234567890abcdef",
//                 },
//                 {
//                     enabled: false,
//                     Network: "WAN",
//                     ZeroTierNetworkID: "fedcba0987654321",
//                     VSNetwork: "VPN",
//                 },
//                 {
//                     enabled: false,
//                     Network: "LAN",
//                     ZeroTierNetworkID: "aaaaaaaaaaaaaaaa",
//                     VSNetwork: "Foreign",
//                 },
//             ];

//             configs.forEach((config, index) => {
//                 testWithOutput(
//                     "ZeroTierServer",
//                     `Disabled ZeroTier config ${index + 1}`,
//                     { config },
//                     () => ZeroTierServer(config),
//                 );

//                 const result = ZeroTierServer(config);
//                 validateRouterConfigStructure(result);
//             });
//         });
//     });

//     describe("Configuration Consistency", () => {
//         it("should maintain consistent configuration format across different network IDs", () => {
//             const networkIDs = [
//                 "1111111111111111",
//                 "2222222222222222",
//                 "3333333333333333",
//             ];

//             const results = networkIDs.map((networkID) => {
//                 const config: ZeroTierServerConfig = {
//                     enabled: true,
//                     Network: "LAN",
//                     ZeroTierNetworkID: networkID,
//                 };
//                 return ZeroTierServer(config);
//             });

//             results.forEach((result) => {
//                 validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//             });
//         });

//         it("should handle rapid enable/disable toggling", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1234567890abcdef",
//             };

//             // Enabled
//             let result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);

//             // Disabled
//             config.enabled = false;
//             result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);

//             // Enabled again
//             config.enabled = true;
//             result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });

//         it("should verify firewall rules consistency", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "9999999999999999",
//             };

//             const result = ZeroTierServerFirewall(config);
//             validateRouterConfig(result, ["/ip firewall filter"]);
//         });
//     });

//     describe("Integration Tests", () => {
//         it("should combine server and firewall configurations", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "abcd1234efgh5678",
//             };

//             testWithOutput(
//                 "ZeroTierServer + Firewall",
//                 "Combined ZeroTier server and firewall",
//                 { config },
//                 () => {
//                     const serverConfig = ZeroTierServer(config);
//                     const firewallConfig = ZeroTierServerFirewall(config);
//                     return { serverConfig, firewallConfig };
//                 },
//             );

//             const serverResult = ZeroTierServer(config);
//             const firewallResult = ZeroTierServerFirewall(config);

//             validateRouterConfig(serverResult, ["/zerotier", "/zerotier interface"]);
//             validateRouterConfig(firewallResult, ["/ip firewall filter"]);
//         });

//         it("should handle complete ZeroTier setup for VPN network", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "vpn1234567890abc",
//                 VSNetwork: "VPN",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Complete ZeroTier setup for VPN",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const serverResult = ZeroTierServer(config);
//             const firewallResult = ZeroTierServerFirewall(config);

//             validateRouterConfigStructure(serverResult);
//             validateRouterConfigStructure(firewallResult);
//         });

//         it("should verify instance zt1 is always used", () => {
//             const configs: ZeroTierServerConfig[] = [
//                 {
//                     enabled: true,
//                     Network: "LAN",
//                     ZeroTierNetworkID: "1111111111111111",
//                 },
//                 {
//                     enabled: true,
//                     Network: "WAN",
//                     ZeroTierNetworkID: "2222222222222222",
//                     VSNetwork: "VPN",
//                 },
//             ];

//             configs.forEach((config, index) => {
//                 testWithOutput(
//                     "ZeroTierServer",
//                     `Verify zt1 instance config ${index + 1}`,
//                     { config },
//                     () => ZeroTierServer(config),
//                 );

//                 const result = ZeroTierServer(config);
//                 validateRouterConfig(result, ["/zerotier"]);
//             });
//         });

//         it("should verify interface settings (allow-default, allow-global, allow-managed)", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "settings123456789",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Verify interface allow settings",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier interface"]);
//         });
//     });

//     describe("Network ID Validation Scenarios", () => {
//         it("should handle numeric-only network IDs", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "1234567890123456",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Numeric-only network ID",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle alphabetic-only network IDs", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "abcdefghijklmnop",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Alphabetic-only network ID",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle hexadecimal network IDs", () => {
//             const config: ZeroTierServerConfig = {
//                 enabled: true,
//                 Network: "LAN",
//                 ZeroTierNetworkID: "0123456789abcdef",
//             };

//             testWithOutput(
//                 "ZeroTierServer",
//                 "Hexadecimal network ID",
//                 { config },
//                 () => ZeroTierServer(config),
//             );

//             const result = ZeroTierServer(config);
//             validateRouterConfig(result, ["/zerotier", "/zerotier interface"]);
//         });
//     });
// });
