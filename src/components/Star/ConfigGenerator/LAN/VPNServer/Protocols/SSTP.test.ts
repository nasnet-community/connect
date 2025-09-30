// import { describe, it } from "vitest";
// import {
//     SstpServer,
//     SstpServerUsers,
//     SstpServerWrapper,
// } from "./SSTP";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     SstpServerConfig,
//     Credentials,
// } from "~/components/Star/StarContext/Utils/VPNServerType";

// describe("SSTP Protocol Tests", () => {
//     describe("SstpServer Function", () => {
//         it("should generate basic SSTP server configuration", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "sstp-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "sstp-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "Basic SSTP server configuration",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result, [
//                 "/interface sstp-server server",
//                 "/ip pool",
//                 "/ppp profile",
//             ]);
//         });

//         it("should generate SSTP server with custom port", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 8443,
//                 Certificate: {
//                     Certificate: "custom-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap1", "mschap2"],
//                     Cipher: ["aes128", "aes256"],
//                 },
//                 Address: {
//                     AddressPool: "custom-sstp-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP server with custom port",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled SSTP server", () => {
//             const config: SstpServerConfig = {
//                 enabled: false,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "disabled-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "disabled-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "Disabled SSTP server",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple encryption algorithms", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "multi-cert",
//                 },
//                 Encryption: {
//                     Auth: ["pap", "chap", "mschap1", "mschap2"],
//                     Cipher: ["des", "3des", "aes128", "aes192", "aes256"],
//                 },
//                 Address: {
//                     AddressPool: "multi-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with multiple encryption algorithms",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle SSTP with strong encryption", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "strong-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2", "eap"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "strong-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with strong encryption settings",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle SSTP on alternative HTTPS port", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 8080,
//                 Certificate: {
//                     Certificate: "alt-port-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "alt-port-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP on alternative HTTPS port",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });
//     });

//     describe("SstpServerUsers Function", () => {
//         it("should generate SSTP user credentials", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "sstpuser1",
//                     Password: "sstppass1",
//                     VPNType: ["SSTP"],
//                 },
//                 {
//                     Username: "sstpuser2",
//                     Password: "sstppass2",
//                     VPNType: ["SSTP"],
//                 },
//                 {
//                     Username: "sstpuser3",
//                     Password: "sstppass3",
//                     VPNType: ["SSTP"],
//                 },
//             ];

//             testWithOutput(
//                 "SstpServerUsers",
//                 "SSTP users configuration",
//                 { users },
//                 () => SstpServerUsers(users),
//             );

//             const result = SstpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle single user configuration", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["SSTP"],
//                 },
//             ];

//             testWithOutput(
//                 "SstpServerUsers",
//                 "Single SSTP user",
//                 { users },
//                 () => SstpServerUsers(users),
//             );

//             const result = SstpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle empty users array", () => {
//             const users: Credentials[] = [];

//             testWithOutput(
//                 "SstpServerUsers",
//                 "SSTP with no users",
//                 { users },
//                 () => SstpServerUsers(users),
//             );

//             const result = SstpServerUsers(users);
//             validateRouterConfig(result);
//         });

//         it("should handle many users", () => {
//             const users: Credentials[] = Array.from({ length: 25 }, (_, i) => ({
//                 Username: `sstp_user${i + 1}`,
//                 Password: `sstp_pass${i + 1}`,
//                 VPNType: ["SSTP"],
//             }));

//             testWithOutput(
//                 "SstpServerUsers",
//                 "SSTP with multiple users",
//                 { users: `Array of ${users.length} users` },
//                 () => SstpServerUsers(users),
//             );

//             const result = SstpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with special characters", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "user-sstp.01",
//                     Password: "P@ssw0rd!SSTP#2024",
//                     VPNType: ["SSTP"],
//                 },
//                 {
//                     Username: "admin_sstp_secure",
//                     Password: "Str0ng&Secure*Pass",
//                     VPNType: ["SSTP"],
//                 },
//             ];

//             testWithOutput(
//                 "SstpServerUsers",
//                 "SSTP users with special characters",
//                 { users },
//                 () => SstpServerUsers(users),
//             );

//             const result = SstpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with long credentials", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "extremely_long_username_for_sstp_testing_purposes_2024",
//                     Password: "VeryLongAndComplexPasswordForSstpTestingWithNumbers123AndSpecialChars!@#",
//                     VPNType: ["SSTP"],
//                 },
//             ];

//             testWithOutput(
//                 "SstpServerUsers",
//                 "SSTP users with long credentials",
//                 { users },
//                 () => SstpServerUsers(users),
//             );

//             const result = SstpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });
//     });

//     describe("SstpServerWrapper Function", () => {
//         it("should generate complete SSTP configuration", () => {
//             const serverConfig: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "complete-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "complete-sstp-pool",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "user1",
//                     Password: "pass1",
//                     VPNType: ["SSTP"],
//                 },
//                 {
//                     Username: "user2",
//                     Password: "pass2",
//                     VPNType: ["SSTP"],
//                 },
//             ];

//             testWithOutput(
//                 "SstpServerWrapper",
//                 "Complete SSTP server setup",
//                 { serverConfig, users },
//                 () => SstpServerWrapper(serverConfig, users),
//             );

//             const result = SstpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle configuration with no users", () => {
//             const serverConfig: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "nouser-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap1", "mschap2"],
//                     Cipher: ["aes128", "aes256"],
//                 },
//                 Address: {
//                     AddressPool: "nouser-sstp-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServerWrapper",
//                 "SSTP server without users",
//                 { serverConfig },
//                 () => SstpServerWrapper(serverConfig, []),
//             );

//             const result = SstpServerWrapper(serverConfig, []);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled server with users", () => {
//             const serverConfig: SstpServerConfig = {
//                 enabled: false,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "disabled-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "disabled-sstp-pool",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "disableduser1",
//                     Password: "disabledpass1",
//                     VPNType: ["SSTP"],
//                 },
//             ];

//             testWithOutput(
//                 "SstpServerWrapper",
//                 "Disabled SSTP server with users",
//                 { serverConfig, users },
//                 () => SstpServerWrapper(serverConfig, users),
//             );

//             const result = SstpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle complex configuration with many users", () => {
//             const serverConfig: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "complex-cert",
//                 },
//                 Encryption: {
//                     Auth: ["pap", "chap", "mschap1", "mschap2", "eap"],
//                     Cipher: ["des", "3des", "aes128", "aes192", "aes256"],
//                 },
//                 Address: {
//                     AddressPool: "complex-sstp-pool",
//                 },
//             };

//             const users: Credentials[] = Array.from({ length: 35 }, (_, i) => ({
//                 Username: `sstpuser${i + 1}`,
//                 Password: `sstppass${i + 1}`,
//                 VPNType: ["SSTP"],
//             }));

//             testWithOutput(
//                 "SstpServerWrapper",
//                 "Complex SSTP setup with many users",
//                 {
//                     serverConfig,
//                     users: `Array of ${users.length} users`,
//                 },
//                 () => SstpServerWrapper(serverConfig, users),
//             );

//             const result = SstpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle non-standard HTTPS ports", () => {
//             const configs = [
//                 {
//                     enabled: true,
//                     Port: 80,
//                     Certificate: {
//                         Certificate: "http-cert",
//                     },
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["aes256"],
//                     },
//                     Address: {
//                         AddressPool: "http-pool",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 10443,
//                     Certificate: {
//                         Certificate: "highport-cert",
//                     },
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["aes256"],
//                     },
//                     Address: {
//                         AddressPool: "highport-pool",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 65535,
//                     Certificate: {
//                         Certificate: "maxport-cert",
//                     },
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["aes256"],
//                     },
//                     Address: {
//                         AddressPool: "maxport-pool",
//                     },
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "SstpServer",
//                     `SSTP with port ${config.Port}`,
//                     { config },
//                     () => SstpServer(config),
//                 );

//                 const result = SstpServer(config);
//                 validateRouterConfig(result);
//             });
//         });

//         it("should handle minimal encryption configuration", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "minimal-cert",
//                 },
//                 Encryption: {
//                     Auth: ["pap"],
//                     Cipher: ["des"],
//                 },
//                 Address: {
//                     AddressPool: "minimal-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with minimal encryption",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle certificate names with special characters", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "sstp-cert_2024.production",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "special-cert-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with special characters in certificate name",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle pool names with dots and dashes", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "pool-test-cert",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "sstp-pool.test-01",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with special characters in pool name",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle all available authentication methods", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "all-auth-cert",
//                 },
//                 Encryption: {
//                     Auth: ["pap", "chap", "mschap1", "mschap2", "eap", "eap-tls"],
//                     Cipher: ["none", "des", "3des", "aes128", "aes192", "aes256"],
//                 },
//                 Address: {
//                     AddressPool: "all-auth-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with all authentication methods",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle long certificate names", () => {
//             const config: SstpServerConfig = {
//                 enabled: true,
//                 Port: 443,
//                 Certificate: {
//                     Certificate: "very-long-certificate-name-for-sstp-server-testing-purposes-2024-production",
//                 },
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "longcert-pool",
//                 },
//             };

//             testWithOutput(
//                 "SstpServer",
//                 "SSTP with long certificate name",
//                 { config },
//                 () => SstpServer(config),
//             );

//             const result = SstpServer(config);
//             validateRouterConfig(result);
//         });
//     });
// });