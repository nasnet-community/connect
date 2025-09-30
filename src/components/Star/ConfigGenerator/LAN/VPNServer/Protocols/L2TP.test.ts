// import { describe, it } from "vitest";
// import {
//     L2tpServer,
//     L2tpServerUsers,
//     L2tpServerWrapper,
// } from "./L2TP";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     L2tpServerConfig,
//     Credentials,
// } from "~/components/Star/StarContext/Utils/VPNServerType";

// describe("L2TP Protocol Tests", () => {
//     describe("L2tpServer Function", () => {
//         it("should generate basic L2TP server configuration", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "mysecretkey123",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "l2tp-pool",
//                 },
//                 Certificate: {
//                     Certificate: "l2tp-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "Basic L2TP server configuration",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result, [
//                 "/interface l2tp-server server",
//                 "/ip pool",
//                 "/ppp profile",
//                 "/ip ipsec profile",
//                 "/ip ipsec proposal",
//             ]);
//         });

//         it("should generate L2TP server with custom port", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1702,
//                 IPsecSecret: "customsecret456",
//                 Encryption: {
//                     Auth: ["sha512"],
//                     Cipher: ["aes128"],
//                 },
//                 Address: {
//                     AddressPool: "custom-pool",
//                 },
//                 Certificate: {
//                     Certificate: "custom-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP server with custom port",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled L2TP server", () => {
//             const config: L2tpServerConfig = {
//                 enabled: false,
//                 Port: 1701,
//                 IPsecSecret: "disabledsecret",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "disabled-pool",
//                 },
//                 Certificate: {
//                     Certificate: "disabled-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "Disabled L2TP server",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple encryption algorithms", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "multialgo789",
//                 Encryption: {
//                     Auth: ["sha256", "sha384", "sha512"],
//                     Cipher: ["aes256", "aes192", "aes128"],
//                 },
//                 Address: {
//                     AddressPool: "multi-pool",
//                 },
//                 Certificate: {
//                     Certificate: "multi-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP with multiple encryption algorithms",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle L2TP with strong IPSec configuration", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "strongipsec999",
//                 Encryption: {
//                     Auth: ["sha512"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "strong-pool",
//                 },
//                 Certificate: {
//                     Certificate: "strong-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP with strong IPSec settings",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result, [
//                 "/interface l2tp-server server",
//                 "/ip ipsec profile",
//                 "/ip ipsec proposal",
//             ]);
//         });
//     });

//     describe("L2tpServerUsers Function", () => {
//         it("should generate L2TP user credentials", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "l2tpuser1",
//                     Password: "l2tppass1",
//                     VPNType: ["L2TP"],
//                 },
//                 {
//                     Username: "l2tpuser2",
//                     Password: "l2tppass2",
//                     VPNType: ["L2TP"],
//                 },
//                 {
//                     Username: "l2tpuser3",
//                     Password: "l2tppass3",
//                     VPNType: ["L2TP"],
//                 },
//             ];

//             testWithOutput(
//                 "L2tpServerUsers",
//                 "L2TP users configuration",
//                 { users },
//                 () => L2tpServerUsers(users),
//             );

//             const result = L2tpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle single user configuration", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["L2TP"],
//                 },
//             ];

//             testWithOutput(
//                 "L2tpServerUsers",
//                 "Single L2TP user",
//                 { users },
//                 () => L2tpServerUsers(users),
//             );

//             const result = L2tpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle empty users array", () => {
//             const users: Credentials[] = [];

//             testWithOutput(
//                 "L2tpServerUsers",
//                 "L2TP with no users",
//                 { users },
//                 () => L2tpServerUsers(users),
//             );

//             const result = L2tpServerUsers(users);
//             validateRouterConfig(result);
//         });

//         it("should handle many users", () => {
//             const users: Credentials[] = Array.from({ length: 25 }, (_, i) => ({
//                 Username: `l2tp_user${i + 1}`,
//                 Password: `l2tp_pass${i + 1}`,
//                 VPNType: ["L2TP"],
//             }));

//             testWithOutput(
//                 "L2tpServerUsers",
//                 "L2TP with multiple users",
//                 { users: `Array of ${users.length} users` },
//                 () => L2tpServerUsers(users),
//             );

//             const result = L2tpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with special characters", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "user-test.01",
//                     Password: "P@ssw0rd!L2TP",
//                     VPNType: ["L2TP"],
//                 },
//                 {
//                     Username: "admin_l2tp",
//                     Password: "Str0ng#L2TP#Pass",
//                     VPNType: ["L2TP"],
//                 },
//             ];

//             testWithOutput(
//                 "L2tpServerUsers",
//                 "L2TP users with special characters",
//                 { users },
//                 () => L2tpServerUsers(users),
//             );

//             const result = L2tpServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });
//     });

//     describe("L2tpServerWrapper Function", () => {
//         it("should generate complete L2TP configuration", () => {
//             const serverConfig: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "completesecret123",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "complete-pool",
//                 },
//                 Certificate: {
//                     Certificate: "complete-cert",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "user1",
//                     Password: "pass1",
//                     VPNType: ["L2TP"],
//                 },
//                 {
//                     Username: "user2",
//                     Password: "pass2",
//                     VPNType: ["L2TP"],
//                 },
//             ];

//             testWithOutput(
//                 "L2tpServerWrapper",
//                 "Complete L2TP server setup",
//                 { serverConfig, users },
//                 () => L2tpServerWrapper(serverConfig, users),
//             );

//             const result = L2tpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle configuration with no users", () => {
//             const serverConfig: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "nousersecret456",
//                 Encryption: {
//                     Auth: ["sha384"],
//                     Cipher: ["aes192"],
//                 },
//                 Address: {
//                     AddressPool: "nouser-pool",
//                 },
//                 Certificate: {
//                     Certificate: "nouser-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServerWrapper",
//                 "L2TP server without users",
//                 { serverConfig },
//                 () => L2tpServerWrapper(serverConfig, []),
//             );

//             const result = L2tpServerWrapper(serverConfig, []);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled server with users", () => {
//             const serverConfig: L2tpServerConfig = {
//                 enabled: false,
//                 Port: 1701,
//                 IPsecSecret: "disabledwithusers",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "disabled-pool",
//                 },
//                 Certificate: {
//                     Certificate: "disabled-cert",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "disableduser1",
//                     Password: "disabledpass1",
//                     VPNType: ["L2TP"],
//                 },
//             ];

//             testWithOutput(
//                 "L2tpServerWrapper",
//                 "Disabled L2TP server with users",
//                 { serverConfig, users },
//                 () => L2tpServerWrapper(serverConfig, users),
//             );

//             const result = L2tpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle complex configuration with many users", () => {
//             const serverConfig: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "complexsecret999",
//                 Encryption: {
//                     Auth: ["sha512", "sha384", "sha256"],
//                     Cipher: ["aes256", "aes192", "aes128"],
//                 },
//                 Address: {
//                     AddressPool: "complex-pool",
//                 },
//                 Certificate: {
//                     Certificate: "complex-cert",
//                 },
//             };

//             const users: Credentials[] = Array.from({ length: 30 }, (_, i) => ({
//                 Username: `l2tpuser${i + 1}`,
//                 Password: `l2tppass${i + 1}`,
//                 VPNType: ["L2TP"],
//             }));

//             testWithOutput(
//                 "L2tpServerWrapper",
//                 "Complex L2TP setup with many users",
//                 {
//                     serverConfig,
//                     users: `Array of ${users.length} users`,
//                 },
//                 () => L2tpServerWrapper(serverConfig, users),
//             );

//             const result = L2tpServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle very long IPSec secrets", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "ThisIsAVeryLongIPSecSecretKeyThatShouldStillWorkProperly1234567890ABCDEFGHIJ",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "longsecret-pool",
//                 },
//                 Certificate: {
//                     Certificate: "longsecret-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP with very long IPSec secret",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle non-standard ports", () => {
//             const configs = [
//                 {
//                     enabled: true,
//                     Port: 1700,
//                     IPsecSecret: "lowport",
//                     Encryption: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                     },
//                     Address: {
//                         AddressPool: "lowport-pool",
//                     },
//                     Certificate: {
//                         Certificate: "lowport-cert",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 65000,
//                     IPsecSecret: "highport",
//                     Encryption: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes128"],
//                     },
//                     Address: {
//                         AddressPool: "highport-pool",
//                     },
//                     Certificate: {
//                         Certificate: "highport-cert",
//                     },
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "L2tpServer",
//                     `L2TP with port ${config.Port}`,
//                     { config },
//                     () => L2tpServer(config),
//                 );

//                 const result = L2tpServer(config);
//                 validateRouterConfig(result);
//             });
//         });

//         it("should handle minimal encryption configuration", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "minimalsecret",
//                 Encryption: {
//                     Auth: ["md5"],
//                     Cipher: ["des"],
//                 },
//                 Address: {
//                     AddressPool: "minimal-pool",
//                 },
//                 Certificate: {
//                     Certificate: "minimal-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP with minimal encryption",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle IPSec secret with special characters", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "S3cr3t!@#$%^&*()_+Key",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "special-pool",
//                 },
//                 Certificate: {
//                     Certificate: "special-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP with special characters in IPSec secret",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });

//         it("should handle duplicate pool names", () => {
//             const config: L2tpServerConfig = {
//                 enabled: true,
//                 Port: 1701,
//                 IPsecSecret: "duplicatepool",
//                 Encryption: {
//                     Auth: ["sha256"],
//                     Cipher: ["aes256"],
//                 },
//                 Address: {
//                     AddressPool: "common-pool",
//                 },
//                 Certificate: {
//                     Certificate: "common-cert",
//                 },
//             };

//             testWithOutput(
//                 "L2tpServer",
//                 "L2TP with common pool name",
//                 { config },
//                 () => L2tpServer(config),
//             );

//             const result = L2tpServer(config);
//             validateRouterConfig(result);
//         });
//     });
// });