// import { describe, it } from "vitest";
// import {
//     ExportWireGuard,
//     WireguardPeerAddress,
//     WireguardServer,
//     WireguardServerUsers,
//     WireguardServerWrapper,
// } from "./Wireguard";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     WireguardInterfaceConfig,
//     WireguardServerConfig,
//     Credentials,
// } from "~/components/Star/StarContext/Utils/VPNServerType";

// describe("WireGuard Protocol Tests", () => {
//     describe("ExportWireGuard Function", () => {
//         it("should generate WireGuard client export script", () => {
//             testWithOutput(
//                 "ExportWireGuard",
//                 "Generate WireGuard client configuration export script",
//                 {},
//                 () => ExportWireGuard(),
//             );

//             const result = ExportWireGuard();
//             validateRouterConfig(result);
//         });
//     });

//     describe("WireguardPeerAddress Function", () => {
//         it("should generate peer address update script with default parameters", () => {
//             testWithOutput(
//                 "WireguardPeerAddress",
//                 "Generate peer address update script with defaults",
//                 { interfaceName: "wireguard-main" },
//                 () => WireguardPeerAddress("wireguard-main"),
//             );

//             const result = WireguardPeerAddress("wireguard-main");
//             validateRouterConfig(result, ["/system scheduler", "/system script"]);
//         });

//         it("should generate peer address update script with custom parameters", () => {
//             testWithOutput(
//                 "WireguardPeerAddress",
//                 "Generate peer address update script with custom name and time",
//                 {
//                     interfaceName: "wg-server",
//                     scriptName: "Custom-WG-Update",
//                     startTime: "00:00:00",
//                 },
//                 () => WireguardPeerAddress("wg-server", "Custom-WG-Update", "00:00:00"),
//             );

//             const result = WireguardPeerAddress("wg-server", "Custom-WG-Update", "00:00:00");
//             validateRouterConfig(result, ["/system scheduler", "/system script"]);
//         });

//         it("should handle multiple interface names", () => {
//             const interfaces = ["wg-main", "wg-backup", "wg-site2site"];

//             interfaces.forEach((interfaceName) => {
//                 testWithOutput(
//                     "WireguardPeerAddress",
//                     `Generate script for interface: ${interfaceName}`,
//                     { interfaceName },
//                     () => WireguardPeerAddress(interfaceName),
//                 );

//                 const result = WireguardPeerAddress(interfaceName);
//                 validateRouterConfig(result, ["/system scheduler", "/system script"]);
//             });
//         });
//     });

//     describe("WireguardServer Function", () => {
//         it("should generate basic WireGuard server configuration", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wireguard-server",
//                 PrivateKey: "privatekey123456789",
//                 InterfaceAddress: "192.168.170.1/24",
//                 ListenPort: 13231,
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "Basic WireGuard server configuration",
//                 { config },
//                 () => WireguardServer(config),
//             );

//             const result = WireguardServer(config);
//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/ip address",
//                 "/interface list member",
//             ]);
//         });

//         it("should generate WireGuard server with custom MTU", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wg-custom",
//                 PrivateKey: "customkey987654321",
//                 InterfaceAddress: "10.100.1.1/24",
//                 ListenPort: 51820,
//                 Mtu: 1280,
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "WireGuard server with custom MTU",
//                 { config },
//                 () => WireguardServer(config),
//             );

//             const result = WireguardServer(config);
//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/ip address",
//                 "/interface list member",
//             ]);
//         });

//         it("should handle different network configurations", () => {
//             const configs: WireguardInterfaceConfig[] = [
//                 {
//                     Name: "wg-production",
//                     PrivateKey: "prodkey123",
//                     InterfaceAddress: "10.0.0.1/24",
//                     ListenPort: 51820,
//                 },
//                 {
//                     Name: "wg-staging",
//                     PrivateKey: "stagekey456",
//                     InterfaceAddress: "10.1.0.1/24",
//                     ListenPort: 51821,
//                 },
//                 {
//                     Name: "wg-test",
//                     PrivateKey: "testkey789",
//                     InterfaceAddress: "10.2.0.1/28",
//                     ListenPort: 51822,
//                     Mtu: 1420,
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "WireguardServer",
//                     `WireGuard server: ${config.Name}`,
//                     { config },
//                     () => WireguardServer(config),
//                 );

//                 const result = WireguardServer(config);
//                 validateRouterConfig(result);
//             });
//         });
//     });

//     describe("WireguardServerUsers Function", () => {
//         it("should generate WireGuard peer configurations for users", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wireguard-main",
//                 PrivateKey: "serverkey123",
//                 InterfaceAddress: "192.168.170.1/24",
//                 ListenPort: 13231,
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "user1",
//                     Password: "pass1",
//                     VPNType: ["Wireguard"],
//                 },
//                 {
//                     Username: "user2",
//                     Password: "pass2",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "WireGuard users configuration",
//                 { serverConfig, users },
//                 () => WireguardServerUsers(serverConfig, users),
//             );

//             const result = WireguardServerUsers(serverConfig, users);
//             validateRouterConfig(result, ["/interface wireguard peers"]);
//         });

//         it("should handle single user configuration", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wg-single",
//                 PrivateKey: "singlekey456",
//                 InterfaceAddress: "10.10.10.1/24",
//                 ListenPort: 51820,
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "Single WireGuard user configuration",
//                 { serverConfig, users },
//                 () => WireguardServerUsers(serverConfig, users),
//             );

//             const result = WireguardServerUsers(serverConfig, users);
//             validateRouterConfig(result, ["/interface wireguard peers"]);
//         });

//         it("should handle empty users array", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wg-empty",
//                 PrivateKey: "emptykey789",
//                 InterfaceAddress: "10.20.20.1/24",
//                 ListenPort: 51820,
//             };

//             const users: Credentials[] = [];

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "WireGuard with no users",
//                 { serverConfig, users },
//                 () => WireguardServerUsers(serverConfig, users),
//             );

//             const result = WireguardServerUsers(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle many users configuration", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wg-multi",
//                 PrivateKey: "multikey999",
//                 InterfaceAddress: "10.30.30.1/24",
//                 ListenPort: 51820,
//             };

//             const users: Credentials[] = Array.from({ length: 10 }, (_, i) => ({
//                 Username: `user${i + 1}`,
//                 Password: `password${i + 1}`,
//                 VPNType: ["Wireguard"],
//             }));

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "WireGuard with multiple users",
//                 { serverConfig, users: `Array of ${users.length} users` },
//                 () => WireguardServerUsers(serverConfig, users),
//             );

//             const result = WireguardServerUsers(serverConfig, users);
//             validateRouterConfig(result, ["/interface wireguard peers"]);
//         });
//     });

//     describe("WireguardServerWrapper Function", () => {
//         it("should generate complete WireGuard configuration", () => {
//             const wireguardConfigs: WireguardServerConfig[] = [
//                 {
//                     Interface: {
//                         Name: "wireguard-main",
//                         PrivateKey: "mainkey123",
//                         InterfaceAddress: "192.168.170.1/24",
//                         ListenPort: 13231,
//                     },
//                     Peers: [
//                         {
//                             Username: "peer1",
//                             Password: "peerpass1",
//                             VPNType: ["Wireguard"],
//                         },
//                         {
//                             Username: "peer2",
//                             Password: "peerpass2",
//                             VPNType: ["Wireguard"],
//                         },
//                     ],
//                 },
//             ];

//             const users: Credentials[] = [
//                 {
//                     Username: "globaluser1",
//                     Password: "globalpass1",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Complete WireGuard server setup",
//                 { wireguardConfigs, users },
//                 () => WireguardServerWrapper(wireguardConfigs, users),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, users);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple WireGuard server configurations", () => {
//             const wireguardConfigs: WireguardServerConfig[] = [
//                 {
//                     Interface: {
//                         Name: "wg-primary",
//                         PrivateKey: "primarykey111",
//                         InterfaceAddress: "10.100.1.1/24",
//                         ListenPort: 51820,
//                     },
//                     Peers: [
//                         {
//                             Username: "primary_user1",
//                             Password: "primary_pass1",
//                             VPNType: ["Wireguard"],
//                         },
//                     ],
//                 },
//                 {
//                     Interface: {
//                         Name: "wg-secondary",
//                         PrivateKey: "secondarykey222",
//                         InterfaceAddress: "10.100.2.1/24",
//                         ListenPort: 51821,
//                     },
//                     Peers: [
//                         {
//                             Username: "secondary_user1",
//                             Password: "secondary_pass1",
//                             VPNType: ["Wireguard"],
//                         },
//                     ],
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Multiple WireGuard servers",
//                 { wireguardConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs);
//             validateRouterConfig(result);
//         });

//         it("should handle configuration with no peers", () => {
//             const wireguardConfigs: WireguardServerConfig[] = [
//                 {
//                     Interface: {
//                         Name: "wg-nopeers",
//                         PrivateKey: "nopeerskey333",
//                         InterfaceAddress: "10.100.3.1/24",
//                         ListenPort: 51822,
//                     },
//                     Peers: [],
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "WireGuard server without peers",
//                 { wireguardConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs, []),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, []);
//             validateRouterConfig(result);
//         });

//         it("should handle complex multi-server setup", () => {
//             const wireguardConfigs: WireguardServerConfig[] = [
//                 {
//                     Interface: {
//                         Name: "wg-us",
//                         PrivateKey: "uskey444",
//                         InterfaceAddress: "10.200.1.1/24",
//                         ListenPort: 51820,
//                         Mtu: 1420,
//                     },
//                     Peers: Array.from({ length: 5 }, (_, i) => ({
//                         Username: `us_user${i + 1}`,
//                         Password: `us_pass${i + 1}`,
//                         VPNType: ["Wireguard"] as ("Wireguard")[],
//                     })),
//                 },
//                 {
//                     Interface: {
//                         Name: "wg-eu",
//                         PrivateKey: "eukey555",
//                         InterfaceAddress: "10.200.2.1/24",
//                         ListenPort: 51821,
//                     },
//                     Peers: Array.from({ length: 3 }, (_, i) => ({
//                         Username: `eu_user${i + 1}`,
//                         Password: `eu_pass${i + 1}`,
//                         VPNType: ["Wireguard"] as ("Wireguard")[],
//                     })),
//                 },
//                 {
//                     Interface: {
//                         Name: "wg-asia",
//                         PrivateKey: "asiakey666",
//                         InterfaceAddress: "10.200.3.1/24",
//                         ListenPort: 51822,
//                         Mtu: 1280,
//                     },
//                     Peers: [],
//                 },
//             ];

//             const globalUsers: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["Wireguard"],
//                 },
//                 {
//                     Username: "support",
//                     Password: "supportpass",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Complex multi-server WireGuard setup",
//                 {
//                     wireguardConfigs: `${wireguardConfigs.length} servers`,
//                     globalUsers: `${globalUsers.length} global users`,
//                 },
//                 () => WireguardServerWrapper(wireguardConfigs, globalUsers),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, globalUsers);
//             validateRouterConfig(result);
//         });

//         it("should handle empty configuration array", () => {
//             const wireguardConfigs: WireguardServerConfig[] = [];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Empty WireGuard configuration",
//                 { wireguardConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle special characters in interface names", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wg_special-01",
//                 PrivateKey: "specialkey777",
//                 InterfaceAddress: "10.50.50.1/24",
//                 ListenPort: 51823,
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "WireGuard with special characters in name",
//                 { config },
//                 () => WireguardServer(config),
//             );

//             const result = WireguardServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle very small subnet masks", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wg-tiny",
//                 PrivateKey: "tinykey888",
//                 InterfaceAddress: "10.60.60.1/30",
//                 ListenPort: 51824,
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "WireGuard with /30 subnet",
//                 { config },
//                 () => WireguardServer(config),
//             );

//             const result = WireguardServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle non-standard port numbers", () => {
//             const configs = [
//                 {
//                     Name: "wg-port-low",
//                     PrivateKey: "lowkey111",
//                     InterfaceAddress: "10.70.70.1/24",
//                     ListenPort: 1024,
//                 },
//                 {
//                     Name: "wg-port-high",
//                     PrivateKey: "highkey222",
//                     InterfaceAddress: "10.80.80.1/24",
//                     ListenPort: 65535,
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "WireguardServer",
//                     `WireGuard with port ${config.ListenPort}`,
//                     { config },
//                     () => WireguardServer(config),
//                 );

//                 const result = WireguardServer(config);
//                 validateRouterConfig(result);
//             });
//         });
//     });
// });