// import { describe, it } from "vitest";
// import {
//     PptpServer,
//     PptpServerUsers,
//     PptpServerWrapper,
// } from "./PPTP";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     PptpServerConfig,
//     Credentials,
// } from "~/components/Star/StarContext/Utils/VPNServerType";

// describe("PPTP Protocol Tests", () => {
//     describe("PptpServer Function", () => {
//         it("should generate basic PPTP server configuration", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "pptp-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "Basic PPTP server configuration",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result, [
//                 "/interface pptp-server server",
//                 "/ip pool",
//                 "/ppp profile",
//             ]);
//         });

//         it("should generate PPTP server with custom port", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1724,
//                 Encryption: {
//                     Auth: ["mschap1", "mschap2"],
//                     Cipher: ["mppe40", "mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "custom-pptp-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP server with custom port",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled PPTP server", () => {
//             const config: PptpServerConfig = {
//                 enabled: false,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "disabled-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "Disabled PPTP server",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple authentication methods", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["pap", "chap", "mschap1", "mschap2"],
//                     Cipher: ["mppe40", "mppe56", "mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "multi-auth-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP with multiple authentication methods",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle PPTP with all MPPE encryption options", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["mppe40", "mppe56", "mppe128", "stateless"],
//                 },
//                 Address: {
//                     AddressPool: "all-mppe-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP with all MPPE encryption options",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle PPTP with minimal encryption", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["pap"],
//                     Cipher: ["none"],
//                 },
//                 Address: {
//                     AddressPool: "no-encryption-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP with minimal encryption",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });
//     });

//     describe("PptpServerUsers Function", () => {
//         it("should generate PPTP user credentials", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "pptpuser1",
//                     Password: "pptppass1",
//                     VPNType: ["PPTP"],
//                 },
//                 {
//                     Username: "pptpuser2",
//                     Password: "pptppass2",
//                     VPNType: ["PPTP"],
//                 },
//                 {
//                     Username: "pptpuser3",
//                     Password: "pptppass3",
//                     VPNType: ["PPTP"],
//                 },
//             ];

//             testWithOutput(
//                 "PptpServerUsers",
//                 "PPTP users configuration",
//                 { users },
//                 () => PptpServerUsers(users),
//             );

//             const result = PptpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle single user configuration", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["PPTP"],
//                 },
//             ];

//             testWithOutput(
//                 "PptpServerUsers",
//                 "Single PPTP user",
//                 { users },
//                 () => PptpServerUsers(users),
//             );

//             const result = PptpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle empty users array", () => {
//             const users: Credentials[] = [];

//             testWithOutput(
//                 "PptpServerUsers",
//                 "PPTP with no users",
//                 { users },
//                 () => PptpServerUsers(users),
//             );

//             const result = PptpServerUsers(users);
//             validateRouterConfig(result);
//         });

//         it("should handle many users", () => {
//             const users: Credentials[] = Array.from({ length: 20 }, (_, i) => ({
//                 Username: `pptp_user${i + 1}`,
//                 Password: `pptp_pass${i + 1}`,
//                 VPNType: ["PPTP"],
//             }));

//             testWithOutput(
//                 "PptpServerUsers",
//                 "PPTP with multiple users",
//                 { users: `Array of ${users.length} users` },
//                 () => PptpServerUsers(users),
//             );

//             const result = PptpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with special characters", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "user.pptp-01",
//                     Password: "P@ssw0rd!PPTP",
//                     VPNType: ["PPTP"],
//                 },
//                 {
//                     Username: "admin_pptp_2024",
//                     Password: "Str0ng#PPTP#Pass",
//                     VPNType: ["PPTP"],
//                 },
//             ];

//             testWithOutput(
//                 "PptpServerUsers",
//                 "PPTP users with special characters",
//                 { users },
//                 () => PptpServerUsers(users),
//             );

//             const result = PptpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with long usernames and passwords", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "very_long_username_for_pptp_testing_purposes",
//                     Password: "ExtremelyLongPasswordForPPTPTestingWithSpecialChars!@#$%",
//                     VPNType: ["PPTP"],
//                 },
//             ];

//             testWithOutput(
//                 "PptpServerUsers",
//                 "PPTP users with long credentials",
//                 { users },
//                 () => PptpServerUsers(users),
//             );

//             const result = PptpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });
//     });

//     describe("PptpServerWrapper Function", () => {
//         it("should generate complete PPTP configuration", () => {
//             const serverConfig: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "complete-pptp-pool",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "user1",
//                     Password: "pass1",
//                     VPNType: ["PPTP"],
//                 },
//                 {
//                     Username: "user2",
//                     Password: "pass2",
//                     VPNType: ["PPTP"],
//                 },
//             ];

//             testWithOutput(
//                 "PptpServerWrapper",
//                 "Complete PPTP server setup",
//                 { serverConfig, users },
//                 () => PptpServerWrapper(serverConfig, users),
//             );

//             const result = PptpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle configuration with no users", () => {
//             const serverConfig: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap1", "mschap2"],
//                     Cipher: ["mppe56", "mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "nouser-pptp-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServerWrapper",
//                 "PPTP server without users",
//                 { serverConfig },
//                 () => PptpServerWrapper(serverConfig, []),
//             );

//             const result = PptpServerWrapper(serverConfig, []);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled server with users", () => {
//             const serverConfig: PptpServerConfig = {
//                 enabled: false,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "disabled-pptp-pool",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "disableduser1",
//                     Password: "disabledpass1",
//                     VPNType: ["PPTP"],
//                 },
//                 {
//                     Username: "disableduser2",
//                     Password: "disabledpass2",
//                     VPNType: ["PPTP"],
//                 },
//             ];

//             testWithOutput(
//                 "PptpServerWrapper",
//                 "Disabled PPTP server with users",
//                 { serverConfig, users },
//                 () => PptpServerWrapper(serverConfig, users),
//             );

//             const result = PptpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle complex configuration with many users", () => {
//             const serverConfig: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["pap", "chap", "mschap1", "mschap2"],
//                     Cipher: ["mppe40", "mppe56", "mppe128", "stateless"],
//                 },
//                 Address: {
//                     AddressPool: "complex-pptp-pool",
//                 },
//             };

//             const users: Credentials[] = Array.from({ length: 30 }, (_, i) => ({
//                 Username: `pptpuser${i + 1}`,
//                 Password: `pptppass${i + 1}`,
//                 VPNType: ["PPTP"],
//             }));

//             testWithOutput(
//                 "PptpServerWrapper",
//                 "Complex PPTP setup with many users",
//                 {
//                     serverConfig,
//                     users: `Array of ${users.length} users`,
//                 },
//                 () => PptpServerWrapper(serverConfig, users),
//             );

//             const result = PptpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle non-standard ports", () => {
//             const configs = [
//                 {
//                     enabled: true,
//                     Port: 1720,
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["mppe128"],
//                     },
//                     Address: {
//                         AddressPool: "lowport-pool",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 65000,
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["mppe128"],
//                     },
//                     Address: {
//                         AddressPool: "highport-pool",
//                     },
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "PptpServer",
//                     `PPTP with port ${config.Port}`,
//                     { config },
//                     () => PptpServer(config),
//                 );

//                 const result = PptpServer(config);
//                 validateRouterConfig(result);
//             });
//         });

//         it("should handle legacy authentication methods", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["pap", "chap"],
//                     Cipher: ["none"],
//                 },
//                 Address: {
//                     AddressPool: "legacy-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP with legacy authentication",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle mixed encryption configurations", () => {
//             const configs = [
//                 {
//                     enabled: true,
//                     Port: 1723,
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["mppe40"],
//                     },
//                     Address: {
//                         AddressPool: "weak-pool",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 1723,
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["mppe56"],
//                     },
//                     Address: {
//                         AddressPool: "medium-pool",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 1723,
//                     Encryption: {
//                         Auth: ["mschap2"],
//                         Cipher: ["mppe128", "stateless"],
//                     },
//                     Address: {
//                         AddressPool: "strong-pool",
//                     },
//                 },
//             ];

//             configs.forEach((config, index) => {
//                 testWithOutput(
//                     "PptpServer",
//                     `PPTP with encryption level ${index + 1}`,
//                     { config },
//                     () => PptpServer(config),
//                 );

//                 const result = PptpServer(config);
//                 validateRouterConfig(result);
//             });
//         });

//         it("should handle pool names with special characters", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["mschap2"],
//                     Cipher: ["mppe128"],
//                 },
//                 Address: {
//                     AddressPool: "pptp-pool_01.test",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP with special characters in pool name",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle maximum number of authentication methods", () => {
//             const config: PptpServerConfig = {
//                 enabled: true,
//                 Port: 1723,
//                 Encryption: {
//                     Auth: ["pap", "chap", "mschap1", "mschap2", "eap"],
//                     Cipher: ["none", "mppe40", "mppe56", "mppe128", "stateless", "stateful"],
//                 },
//                 Address: {
//                     AddressPool: "max-auth-pool",
//                 },
//             };

//             testWithOutput(
//                 "PptpServer",
//                 "PPTP with all possible authentication and encryption methods",
//                 { config },
//                 () => PptpServer(config),
//             );

//             const result = PptpServer(config);
//             validateRouterConfig(result);
//         });
//     });
// });