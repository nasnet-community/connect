// import { describe, it } from "vitest";
// import {
//     ExportWireGuard,
//     WireguardPeerAddress,
//     WireguardServer,
//     WireguardServerUsers,
//     WireguardServerFirewall,
//     SingleWSWrapper,
//     WireguardServerWrapper,
// } from "./Wireguard";
// import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
// import type {
//     WireguardInterfaceConfig,
//     WireguardServerConfig,
//     VSCredentials,
//     SubnetConfig,
// } from "~/components/Star/StarContext";

// describe("WireGuard Protocol Tests", () => {
//     // Common test data
//     const subnetConfig: SubnetConfig = {
//         name: "wireguard",
//         subnet: "192.168.170.0/24",
//     };

//     describe("ExportWireGuard Function", () => {
//         it("should generate WireGuard client export script", () => {
//             testWithOutput(
//                 "ExportWireGuard",
//                 "Generate WireGuard client configuration export script",
//                 {},
//                 () => ExportWireGuard(),
//             );

//             const result = ExportWireGuard();
//             validateRouterConfig(result, ["/system script", "/system scheduler"]);
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
//                 VSNetwork: "VPN",
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "Basic WireGuard server configuration",
//                 { config, subnetConfig },
//                 () => WireguardServer(config, subnetConfig),
//             );

//             const result = WireguardServer(config, subnetConfig);
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
//                 VSNetwork: "VPN",
//             };

//             const customSubnet: SubnetConfig = {
//                 name: "wg-custom",
//                 subnet: "10.100.1.0/24",
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "WireGuard server with custom MTU",
//                 { config, customSubnet },
//                 () => WireguardServer(config, customSubnet),
//             );

//             const result = WireguardServer(config, customSubnet);
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
//                     VSNetwork: "VPN",
//                 },
//                 {
//                     Name: "wg-staging",
//                     PrivateKey: "stagekey456",
//                     InterfaceAddress: "10.1.0.1/24",
//                     ListenPort: 51821,
//                     VSNetwork: "Domestic",
//                 },
//                 {
//                     Name: "wg-test",
//                     PrivateKey: "testkey789",
//                     InterfaceAddress: "10.2.0.1/28",
//                     ListenPort: 51822,
//                     Mtu: 1420,
//                     VSNetwork: "Foreign",
//                 },
//             ];

//             const subnets: SubnetConfig[] = [
//                 { name: "wg-production", subnet: "10.0.0.0/24" },
//                 { name: "wg-staging", subnet: "10.1.0.0/24" },
//                 { name: "wg-test", subnet: "10.2.0.0/28" },
//             ];

//             configs.forEach((config, index) => {
//                 testWithOutput(
//                     "WireguardServer",
//                     `WireGuard server: ${config.Name}`,
//                     { config, subnet: subnets[index] },
//                     () => WireguardServer(config, subnets[index]),
//                 );

//                 const result = WireguardServer(config, subnets[index]);
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
//                 VSNetwork: "VPN",
//             };

//             const users: VSCredentials[] = [
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
//                 { serverConfig, users, subnetConfig },
//                 () => WireguardServerUsers(serverConfig, users, subnetConfig),
//             );

//             const result = WireguardServerUsers(serverConfig, users, subnetConfig);
//             validateRouterConfig(result, ["/interface wireguard peers"]);
//         });

//         it("should handle single user configuration", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wg-single",
//                 PrivateKey: "singlekey456",
//                 InterfaceAddress: "10.10.10.1/24",
//                 ListenPort: 51820,
//                 VSNetwork: "VPN",
//             };

//             const users: VSCredentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             const singleSubnet: SubnetConfig = {
//                 name: "wg-single",
//                 subnet: "10.10.10.0/24",
//             };

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "Single WireGuard user configuration",
//                 { serverConfig, users, singleSubnet },
//                 () => WireguardServerUsers(serverConfig, users, singleSubnet),
//             );

//             const result = WireguardServerUsers(serverConfig, users, singleSubnet);
//             validateRouterConfig(result, ["/interface wireguard peers"]);
//         });

//         it("should handle empty users array", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wg-empty",
//                 PrivateKey: "emptykey789",
//                 InterfaceAddress: "10.20.20.1/24",
//                 ListenPort: 51820,
//                 VSNetwork: "VPN",
//             };

//             const users: VSCredentials[] = [];

//             const emptySubnet: SubnetConfig = {
//                 name: "wg-empty",
//                 subnet: "10.20.20.0/24",
//             };

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "WireGuard with no users",
//                 { serverConfig, users, emptySubnet },
//                 () => WireguardServerUsers(serverConfig, users, emptySubnet),
//             );

//             const result = WireguardServerUsers(serverConfig, users, emptySubnet);
//             validateRouterConfigStructure(result);
//         });

//         it("should handle many users configuration", () => {
//             const serverConfig: WireguardInterfaceConfig = {
//                 Name: "wg-multi",
//                 PrivateKey: "multikey999",
//                 InterfaceAddress: "10.30.30.1/24",
//                 ListenPort: 51820,
//                 VSNetwork: "VPN",
//             };

//             const users: VSCredentials[] = Array.from({ length: 10 }, (_, i) => ({
//                 Username: `user${i + 1}`,
//                 Password: `password${i + 1}`,
//                 VPNType: ["Wireguard"],
//             }));

//             const multiSubnet: SubnetConfig = {
//                 name: "wg-multi",
//                 subnet: "10.30.30.0/24",
//             };

//             testWithOutput(
//                 "WireguardServerUsers",
//                 "WireGuard with multiple users",
//                 { serverConfig, users: `Array of ${users.length} users`, multiSubnet },
//                 () => WireguardServerUsers(serverConfig, users, multiSubnet),
//             );

//             const result = WireguardServerUsers(serverConfig, users, multiSubnet);
//             validateRouterConfig(result, ["/interface wireguard peers"]);
//         });
//     });

//     describe("WireguardServerFirewall Function", () => {
//         it("should generate firewall rules for WireGuard server", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wireguard-main",
//                 PrivateKey: "mainkey123",
//                 InterfaceAddress: "192.168.170.1/24",
//                 ListenPort: 13231,
//                 VSNetwork: "VPN",
//             };

//             testWithOutput(
//                 "WireguardServerFirewall",
//                 "Firewall rules for WireGuard server",
//                 { config },
//                 () => WireguardServerFirewall(config),
//             );

//             const result = WireguardServerFirewall(config);
//             validateRouterConfig(result, ["/ip firewall filter", "/ip firewall mangle"]);
//         });
//     });

//     describe("SingleWSWrapper Function", () => {
//         it("should generate complete single WireGuard server setup", () => {
//             const wireguardConfig: WireguardServerConfig = {
//                 Interface: {
//                     Name: "wireguard-main",
//                     PrivateKey: "mainkey123",
//                     InterfaceAddress: "192.168.170.1/24",
//                     ListenPort: 13231,
//                     VSNetwork: "VPN",
//                 },
//                 Peers: [
//                     {
//                         Username: "peer1",
//                         Password: "peerpass1",
//                         VPNType: ["Wireguard"],
//                     },
//                     {
//                         Username: "peer2",
//                         Password: "peerpass2",
//                         VPNType: ["Wireguard"],
//                     },
//                 ],
//             };

//             const users: VSCredentials[] = [
//                 {
//                     Username: "globaluser1",
//                     Password: "globalpass1",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             testWithOutput(
//                 "SingleWSWrapper",
//                 "Complete single WireGuard server setup",
//                 { wireguardConfig, users, subnetConfig },
//                 () => SingleWSWrapper(wireguardConfig, users, subnetConfig),
//             );

//             const result = SingleWSWrapper(wireguardConfig, users, subnetConfig);
//             validateRouterConfig(result);
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
//                         VSNetwork: "VPN",
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

//             const users: VSCredentials[] = [
//                 {
//                     Username: "globaluser1",
//                     Password: "globalpass1",
//                     VPNType: ["Wireguard"],
//                 },
//             ];

//             const subnetConfigs: SubnetConfig[] = [
//                 {
//                     name: "wireguard-main",
//                     subnet: "192.168.170.0/24",
//                 },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Complete WireGuard server setup",
//                 { wireguardConfigs, users, subnetConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs, users, subnetConfigs),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, users, subnetConfigs);
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
//                         VSNetwork: "VPN",
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
//                         VSNetwork: "Domestic",
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

//             const subnetConfigs: SubnetConfig[] = [
//                 { name: "wg-primary", subnet: "10.100.1.0/24" },
//                 { name: "wg-secondary", subnet: "10.100.2.0/24" },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Multiple WireGuard servers",
//                 { wireguardConfigs, subnetConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs, [], subnetConfigs),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, [], subnetConfigs);
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
//                         VSNetwork: "VPN",
//                     },
//                     Peers: [],
//                 },
//             ];

//             const subnetConfigs: SubnetConfig[] = [
//                 { name: "wg-nopeers", subnet: "10.100.3.0/24" },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "WireGuard server without peers",
//                 { wireguardConfigs, subnetConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs, [], subnetConfigs),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, [], subnetConfigs);
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
//                         VSNetwork: "VPN",
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
//                         VSNetwork: "Domestic",
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
//                         VSNetwork: "Foreign",
//                     },
//                     Peers: [],
//                 },
//             ];

//             const globalUsers: VSCredentials[] = [
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

//             const subnetConfigs: SubnetConfig[] = [
//                 { name: "wg-us", subnet: "10.200.1.0/24" },
//                 { name: "wg-eu", subnet: "10.200.2.0/24" },
//                 { name: "wg-asia", subnet: "10.200.3.0/24" },
//             ];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Complex multi-server WireGuard setup",
//                 {
//                     wireguardConfigs: `${wireguardConfigs.length} servers`,
//                     globalUsers: `${globalUsers.length} global users`,
//                     subnetConfigs: `${subnetConfigs.length} subnets`,
//                 },
//                 () => WireguardServerWrapper(wireguardConfigs, globalUsers, subnetConfigs),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, globalUsers, subnetConfigs);
//             validateRouterConfig(result);
//         });

//         it("should handle empty configuration array", () => {
//             const wireguardConfigs: WireguardServerConfig[] = [];

//             testWithOutput(
//                 "WireguardServerWrapper",
//                 "Empty WireGuard configuration",
//                 { wireguardConfigs },
//                 () => WireguardServerWrapper(wireguardConfigs, [], []),
//             );

//             const result = WireguardServerWrapper(wireguardConfigs, [], []);
//             validateRouterConfigStructure(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle special characters in interface names", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wg_special-01",
//                 PrivateKey: "specialkey777",
//                 InterfaceAddress: "10.50.50.1/24",
//                 ListenPort: 51823,
//                 VSNetwork: "VPN",
//             };

//             const specialSubnet: SubnetConfig = {
//                 name: "wg_special-01",
//                 subnet: "10.50.50.0/24",
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "WireGuard with special characters in name",
//                 { config, specialSubnet },
//                 () => WireguardServer(config, specialSubnet),
//             );

//             const result = WireguardServer(config, specialSubnet);
//             validateRouterConfig(result);
//         });

//         it("should handle very small subnet masks", () => {
//             const config: WireguardInterfaceConfig = {
//                 Name: "wg-tiny",
//                 PrivateKey: "tinykey888",
//                 InterfaceAddress: "10.60.60.1/30",
//                 ListenPort: 51824,
//                 VSNetwork: "VPN",
//             };

//             const tinySubnet: SubnetConfig = {
//                 name: "wg-tiny",
//                 subnet: "10.60.60.0/30",
//             };

//             testWithOutput(
//                 "WireguardServer",
//                 "WireGuard with /30 subnet",
//                 { config, tinySubnet },
//                 () => WireguardServer(config, tinySubnet),
//             );

//             const result = WireguardServer(config, tinySubnet);
//             validateRouterConfig(result);
//         });

//         it("should handle non-standard port numbers", () => {
//             const configs = [
//                 {
//                     Name: "wg-port-low",
//                     PrivateKey: "lowkey111",
//                     InterfaceAddress: "10.70.70.1/24",
//                     ListenPort: 1024,
//                     VSNetwork: "VPN" as const,
//                 },
//                 {
//                     Name: "wg-port-high",
//                     PrivateKey: "highkey222",
//                     InterfaceAddress: "10.80.80.1/24",
//                     ListenPort: 65535,
//                     VSNetwork: "VPN" as const,
//                 },
//             ];

//             const subnets = [
//                 { name: "wg-port-low", subnet: "10.70.70.0/24" },
//                 { name: "wg-port-high", subnet: "10.80.80.0/24" },
//             ];

//             configs.forEach((config, index) => {
//                 testWithOutput(
//                     "WireguardServer",
//                     `WireGuard with port ${config.ListenPort}`,
//                     { config, subnet: subnets[index] },
//                     () => WireguardServer(config, subnets[index]),
//                 );

//                 const result = WireguardServer(config, subnets[index]);
//                 validateRouterConfig(result);
//             });
//         });
//     });
// });