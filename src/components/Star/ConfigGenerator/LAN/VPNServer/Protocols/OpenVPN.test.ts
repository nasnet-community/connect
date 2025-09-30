// import { describe, it } from "vitest";
// import {
//     ExportOpenVPN,
//     OVPNServer,
//     OVPNServerUsers,
//     OVPNServerWrapper,
// } from "./OpenVPN";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     OpenVpnServerConfig,
//     Credentials,
// } from "~/components/Star/StarContext/Utils/VPNServerType";

// describe("OpenVPN Protocol Tests", () => {
//     describe("ExportOpenVPN Function", () => {
//         it("should generate OpenVPN client export script", () => {
//             testWithOutput(
//                 "ExportOpenVPN",
//                 "Generate OpenVPN client configuration export script",
//                 {},
//                 () => ExportOpenVPN(),
//             );

//             const result = ExportOpenVPN();
//             validateRouterConfig(result);
//         });
//     });

//     describe("OVPNServer Function", () => {
//         it("should generate basic OpenVPN server configuration", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "openvpn-server",
//                 enabled: true,
//                 Port: 1194,
//                 Protocol: "udp",
//                 Mode: "ip",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256-cbc"],
//                 },
//                 IPV6: {},
//                 Certificate: {
//                     Certificate: "server-cert",
//                 },
//                 Address: {
//                     AddressPool: "ovpn-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "Basic OpenVPN server configuration",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result, [
//                 "/interface ovpn-server server",
//                 "/ip pool",
//                 "/ppp profile",
//             ]);
//         });

//         it("should generate OpenVPN server with TCP protocol", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "openvpn-tcp",
//                 enabled: true,
//                 Port: 443,
//                 Protocol: "tcp",
//                 Mode: "ip",
//                 Encryption: {
//                     Auth: ["sha512"],
//                     Cipher: ["aes256-gcm"],
//                 },
//                 IPV6: {},
//                 Certificate: {
//                     Certificate: "tcp-cert",
//                 },
//                 Address: {
//                     AddressPool: "tcp-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "OpenVPN server with TCP protocol",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result, [
//                 "/interface ovpn-server server",
//                 "/ip pool",
//                 "/ppp profile",
//             ]);
//         });

//         it("should generate OpenVPN server with ethernet mode", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "openvpn-ethernet",
//                 enabled: true,
//                 Port: 1195,
//                 Protocol: "udp",
//                 Mode: "ethernet",
//                 Encryption: {
//                     Auth: ["sha1", "md5"],
//                     Cipher: ["aes128-cbc", "aes192-cbc"],
//                 },
//                 IPV6: {
//                     enabled: true,
//                 },
//                 Certificate: {
//                     Certificate: "ethernet-cert",
//                 },
//                 Address: {
//                     AddressPool: "ethernet-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "OpenVPN server in ethernet mode",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple encryption algorithms", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "openvpn-multi-crypto",
//                 enabled: true,
//                 Port: 1196,
//                 Protocol: "udp",
//                 Mode: "ip",
//                 Encryption: {
//                     Auth: ["sha256", "sha384", "sha512"],
//                     Cipher: ["aes256-gcm", "aes128-gcm", "aes256-cbc"],
//                 },
//                 IPV6: {},
//                 Certificate: {
//                     Certificate: "multi-cert",
//                 },
//                 Address: {
//                     AddressPool: "multi-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "OpenVPN with multiple encryption options",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled server configuration", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "openvpn-disabled",
//                 enabled: false,
//                 Port: 1197,
//                 Protocol: "udp",
//                 Mode: "ip",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256-cbc"],
//                 },
//                 IPV6: {},
//                 Certificate: {
//                     Certificate: "disabled-cert",
//                 },
//                 Address: {
//                     AddressPool: "disabled-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "Disabled OpenVPN server",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result);
//         });
//     });

//     describe("OVPNServerUsers Function", () => {
//         it("should generate OpenVPN user credentials", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "vpnuser1",
//                     Password: "vpnpass1",
//                     VPNType: ["OpenVPN"],
//                 },
//                 {
//                     Username: "vpnuser2",
//                     Password: "vpnpass2",
//                     VPNType: ["OpenVPN"],
//                 },
//                 {
//                     Username: "vpnuser3",
//                     Password: "vpnpass3",
//                     VPNType: ["OpenVPN"],
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerUsers",
//                 "OpenVPN users configuration",
//                 { users },
//                 () => OVPNServerUsers(users),
//             );

//             const result = OVPNServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle single user configuration", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["OpenVPN"],
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerUsers",
//                 "Single OpenVPN user",
//                 { users },
//                 () => OVPNServerUsers(users),
//             );

//             const result = OVPNServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle empty users array", () => {
//             const users: Credentials[] = [];

//             testWithOutput(
//                 "OVPNServerUsers",
//                 "OpenVPN with no users",
//                 { users },
//                 () => OVPNServerUsers(users),
//             );

//             const result = OVPNServerUsers(users);
//             validateRouterConfig(result);
//         });

//         it("should handle many users", () => {
//             const users: Credentials[] = Array.from({ length: 20 }, (_, i) => ({
//                 Username: `ovpnuser${i + 1}`,
//                 Password: `ovpnpass${i + 1}`,
//                 VPNType: ["OpenVPN"],
//             }));

//             testWithOutput(
//                 "OVPNServerUsers",
//                 "OpenVPN with multiple users",
//                 { users: `Array of ${users.length} users` },
//                 () => OVPNServerUsers(users),
//             );

//             const result = OVPNServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with special characters", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "user_test-01",
//                     Password: "P@ssw0rd!123",
//                     VPNType: ["OpenVPN"],
//                 },
//                 {
//                     Username: "admin.vpn",
//                     Password: "Str0ng#Pass",
//                     VPNType: ["OpenVPN"],
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerUsers",
//                 "OpenVPN users with special characters",
//                 { users },
//                 () => OVPNServerUsers(users),
//             );

//             const result = OVPNServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });
//     });

//     describe("OVPNServerWrapper Function", () => {
//         it("should generate complete OpenVPN configuration", () => {
//             const serverConfigs: OpenVpnServerConfig[] = [
//                 {
//                     name: "openvpn-main",
//                     enabled: true,
//                     Port: 1194,
//                     Protocol: "udp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256-cbc"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "main-cert",
//                     },
//                     Address: {
//                         AddressPool: "main-pool",
//                     },
//                 },
//             ];

//             const users: Credentials[] = [
//                 {
//                     Username: "user1",
//                     Password: "pass1",
//                     VPNType: ["OpenVPN"],
//                 },
//                 {
//                     Username: "user2",
//                     Password: "pass2",
//                     VPNType: ["OpenVPN"],
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerWrapper",
//                 "Complete OpenVPN server setup",
//                 { serverConfigs, users },
//                 () => OVPNServerWrapper(serverConfigs, users),
//             );

//             const result = OVPNServerWrapper(serverConfigs, users);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple OpenVPN server configurations", () => {
//             const serverConfigs: OpenVpnServerConfig[] = [
//                 {
//                     name: "ovpn-primary",
//                     enabled: true,
//                     Port: 1194,
//                     Protocol: "udp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256-cbc"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "primary-cert",
//                     },
//                     Address: {
//                         AddressPool: "primary-pool",
//                     },
//                 },
//                 {
//                     name: "ovpn-secondary",
//                     enabled: true,
//                     Port: 443,
//                     Protocol: "tcp",
//                     Mode: "ethernet",
//                     Encryption: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256-gcm"],
//                     },
//                     IPV6: {
//                         enabled: true,
//                     },
//                     Certificate: {
//                         Certificate: "secondary-cert",
//                     },
//                     Address: {
//                         AddressPool: "secondary-pool",
//                     },
//                 },
//                 {
//                     name: "ovpn-backup",
//                     enabled: false,
//                     Port: 1195,
//                     Protocol: "udp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha384"],
//                         Cipher: ["aes128-cbc"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "backup-cert",
//                     },
//                     Address: {
//                         AddressPool: "backup-pool",
//                     },
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerWrapper",
//                 "Multiple OpenVPN servers",
//                 { serverConfigs: `${serverConfigs.length} servers` },
//                 () => OVPNServerWrapper(serverConfigs),
//             );

//             const result = OVPNServerWrapper(serverConfigs);
//             validateRouterConfig(result);
//         });

//         it("should handle configuration with no users", () => {
//             const serverConfigs: OpenVpnServerConfig[] = [
//                 {
//                     name: "ovpn-nousers",
//                     enabled: true,
//                     Port: 1194,
//                     Protocol: "udp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256-cbc"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "nousers-cert",
//                     },
//                     Address: {
//                         AddressPool: "nousers-pool",
//                     },
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerWrapper",
//                 "OpenVPN server without users",
//                 { serverConfigs },
//                 () => OVPNServerWrapper(serverConfigs, []),
//             );

//             const result = OVPNServerWrapper(serverConfigs, []);
//             validateRouterConfig(result);
//         });

//         it("should handle empty server configuration array", () => {
//             const serverConfigs: OpenVpnServerConfig[] = [];
//             const users: Credentials[] = [
//                 {
//                     Username: "orphanuser",
//                     Password: "orphanpass",
//                     VPNType: ["OpenVPN"],
//                 },
//             ];

//             testWithOutput(
//                 "OVPNServerWrapper",
//                 "Empty OpenVPN configuration with users",
//                 { serverConfigs, users },
//                 () => OVPNServerWrapper(serverConfigs, users),
//             );

//             const result = OVPNServerWrapper(serverConfigs, users);
//             validateRouterConfig(result);
//         });

//         it("should handle complex multi-server setup with different modes", () => {
//             const serverConfigs: OpenVpnServerConfig[] = [
//                 {
//                     name: "ovpn-production",
//                     enabled: true,
//                     Port: 1194,
//                     Protocol: "udp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha512", "sha384", "sha256"],
//                         Cipher: ["aes256-gcm", "aes256-cbc"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "prod-cert",
//                     },
//                     Address: {
//                         AddressPool: "prod-pool",
//                     },
//                 },
//                 {
//                     name: "ovpn-development",
//                     enabled: true,
//                     Port: 1195,
//                     Protocol: "udp",
//                     Mode: "ethernet",
//                     Encryption: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes128-cbc"],
//                     },
//                     IPV6: {
//                         enabled: true,
//                     },
//                     Certificate: {
//                         Certificate: "dev-cert",
//                     },
//                     Address: {
//                         AddressPool: "dev-pool",
//                     },
//                 },
//             ];

//             const users: Credentials[] = Array.from({ length: 15 }, (_, i) => ({
//                 Username: `ovpnuser${i + 1}`,
//                 Password: `pass${i + 1}`,
//                 VPNType: ["OpenVPN"],
//             }));

//             testWithOutput(
//                 "OVPNServerWrapper",
//                 "Complex multi-server OpenVPN setup",
//                 {
//                     serverConfigs: `${serverConfigs.length} servers`,
//                     users: `${users.length} users`,
//                 },
//                 () => OVPNServerWrapper(serverConfigs, users),
//             );

//             const result = OVPNServerWrapper(serverConfigs, users);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle non-standard ports", () => {
//             const configs = [
//                 {
//                     name: "ovpn-lowport",
//                     enabled: true,
//                     Port: 80,
//                     Protocol: "tcp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256-cbc"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "lowport-cert",
//                     },
//                     Address: {
//                         AddressPool: "lowport-pool",
//                     },
//                 },
//                 {
//                     name: "ovpn-highport",
//                     enabled: true,
//                     Port: 65000,
//                     Protocol: "udp",
//                     Mode: "ip",
//                     Encryption: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256-gcm"],
//                     },
//                     IPV6: {},
//                     Certificate: {
//                         Certificate: "highport-cert",
//                     },
//                     Address: {
//                         AddressPool: "highport-pool",
//                     },
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "OVPNServer",
//                     `OpenVPN with port ${config.Port}`,
//                     { config },
//                     () => OVPNServer(config),
//                 );

//                 const result = OVPNServer(config);
//                 validateRouterConfig(result);
//             });
//         });

//         it("should handle minimal encryption configuration", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "ovpn-minimal",
//                 enabled: true,
//                 Port: 1194,
//                 Protocol: "udp",
//                 Mode: "ip",
//                 Encryption: {
//                     Auth: ["md5"],
//                     Cipher: ["des-cbc"],
//                 },
//                 IPV6: {},
//                 Certificate: {
//                     Certificate: "minimal-cert",
//                 },
//                 Address: {
//                     AddressPool: "minimal-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "OpenVPN with minimal encryption",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle long server names", () => {
//             const config: OpenVpnServerConfig = {
//                 name: "openvpn-server-production-primary-instance-01",
//                 enabled: true,
//                 Port: 1194,
//                 Protocol: "udp",
//                 Mode: "ip",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256-cbc"],
//                 },
//                 IPV6: {},
//                 Certificate: {
//                     Certificate: "longname-cert",
//                 },
//                 Address: {
//                     AddressPool: "longname-pool",
//                 },
//             };

//             testWithOutput(
//                 "OVPNServer",
//                 "OpenVPN with long server name",
//                 { config },
//                 () => OVPNServer(config),
//             );

//             const result = OVPNServer(config);
//             validateRouterConfig(result);
//         });
//     });
// });