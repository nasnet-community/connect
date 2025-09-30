// import { describe, it } from "vitest";
// import {
//     Ikev2Server,
//     Ikev2ServerUsers,
//     Ikev2ServerWrapper,
// } from "./IKEv2";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     Ikev2ServerConfig,
//     Credentials,
// } from "~/components/Star/StarContext/Utils/VPNServerType";

// describe("IKEv2 Protocol Tests", () => {
//     describe("Ikev2Server Function", () => {
//         it("should generate basic IKEv2 server configuration", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "ikev2-server-cert",
//                     CACertificate: "ikev2-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "ikev2-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "Basic IKEv2 server configuration",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result, [
//                 "/ip ipsec mode-config",
//                 "/ip ipsec policy group",
//                 "/ip ipsec profile",
//                 "/ip ipsec peer",
//                 "/ip ipsec proposal",
//                 "/ip ipsec identity",
//                 "/ip ipsec policy",
//             ]);
//         });

//         it("should generate IKEv2 server with custom port", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 4500,
//                 Certificate: {
//                     ServerCertificate: "custom-server-cert",
//                     CACertificate: "custom-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp3072"],
//                     },
//                     Phase2: {
//                         Auth: ["sha384"],
//                         Cipher: ["aes192"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "custom-ikev2-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 server with custom port",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled IKEv2 server", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: false,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "disabled-server-cert",
//                     CACertificate: "disabled-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "disabled-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "Disabled IKEv2 server",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple encryption algorithms for Phase 1", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "multi-server-cert",
//                     CACertificate: "multi-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256", "sha384", "sha512"],
//                         Cipher: ["aes128", "aes192", "aes256"],
//                         DhGroup: ["modp1024", "modp2048", "modp3072", "modp4096"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "multi-phase1-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with multiple Phase 1 algorithms",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle multiple encryption algorithms for Phase 2", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "multi2-server-cert",
//                     CACertificate: "multi2-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256", "sha384", "sha512"],
//                         Cipher: ["aes128", "aes192", "aes256"],
//                         PfsGroup: ["modp1024", "modp2048", "modp3072"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "multi-phase2-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with multiple Phase 2 algorithms",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle strong encryption configuration", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "strong-server-cert",
//                     CACertificate: "strong-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp4096", "modp8192"],
//                     },
//                     Phase2: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp4096", "modp8192"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "strong-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with strong encryption settings",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Ikev2ServerUsers Function", () => {
//         it("should generate IKEv2 user credentials", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "ikev2user1",
//                     Password: "ikev2pass1",
//                     VPNType: ["IKEv2"],
//                 },
//                 {
//                     Username: "ikev2user2",
//                     Password: "ikev2pass2",
//                     VPNType: ["IKEv2"],
//                 },
//                 {
//                     Username: "ikev2user3",
//                     Password: "ikev2pass3",
//                     VPNType: ["IKEv2"],
//                 },
//             ];

//             testWithOutput(
//                 "Ikev2ServerUsers",
//                 "IKEv2 users configuration",
//                 { users },
//                 () => Ikev2ServerUsers(users),
//             );

//             const result = Ikev2ServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle single user configuration", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "admin",
//                     Password: "adminpass",
//                     VPNType: ["IKEv2"],
//                 },
//             ];

//             testWithOutput(
//                 "Ikev2ServerUsers",
//                 "Single IKEv2 user",
//                 { users },
//                 () => Ikev2ServerUsers(users),
//             );

//             const result = Ikev2ServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle empty users array", () => {
//             const users: Credentials[] = [];

//             testWithOutput(
//                 "Ikev2ServerUsers",
//                 "IKEv2 with no users",
//                 { users },
//                 () => Ikev2ServerUsers(users),
//             );

//             const result = Ikev2ServerUsers(users);
//             validateRouterConfig(result);
//         });

//         it("should handle many users", () => {
//             const users: Credentials[] = Array.from({ length: 30 }, (_, i) => ({
//                 Username: `ikev2_user${i + 1}`,
//                 Password: `ikev2_pass${i + 1}`,
//                 VPNType: ["IKEv2"],
//             }));

//             testWithOutput(
//                 "Ikev2ServerUsers",
//                 "IKEv2 with multiple users",
//                 { users: `Array of ${users.length} users` },
//                 () => Ikev2ServerUsers(users),
//             );

//             const result = Ikev2ServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle users with special characters", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "user-ikev2.01",
//                     Password: "P@ssw0rd!IKEv2#2024",
//                     VPNType: ["IKEv2"],
//                 },
//                 {
//                     Username: "admin_ikev2_secure",
//                     Password: "Str0ng&IKEv2*Pass",
//                     VPNType: ["IKEv2"],
//                 },
//             ];

//             testWithOutput(
//                 "Ikev2ServerUsers",
//                 "IKEv2 users with special characters",
//                 { users },
//                 () => Ikev2ServerUsers(users),
//             );

//             const result = Ikev2ServerUsers(users);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });

//         it("should handle IKEv2 users with config parameter", () => {
//             const users: Credentials[] = [
//                 {
//                     Username: "configuser1",
//                     Password: "configpass1",
//                     VPNType: ["IKEv2"],
//                 },
//                 {
//                     Username: "configuser2",
//                     Password: "configpass2",
//                     VPNType: ["IKEv2"],
//                 },
//             ];

//             const ikev2Config = {
//                 modeConfig: "ikev2-mode-config",
//                 policyGroup: "ikev2-policy-group",
//             };

//             testWithOutput(
//                 "Ikev2ServerUsers",
//                 "IKEv2 users with additional config",
//                 { users, ikev2Config },
//                 () => Ikev2ServerUsers(users, ikev2Config),
//             );

//             const result = Ikev2ServerUsers(users, ikev2Config);
//             validateRouterConfig(result, ["/ppp secret"]);
//         });
//     });

//     describe("Ikev2ServerWrapper Function", () => {
//         it("should generate complete IKEv2 configuration", () => {
//             const serverConfig: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "complete-server-cert",
//                     CACertificate: "complete-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "complete-ikev2-pool",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "user1",
//                     Password: "pass1",
//                     VPNType: ["IKEv2"],
//                 },
//                 {
//                     Username: "user2",
//                     Password: "pass2",
//                     VPNType: ["IKEv2"],
//                 },
//             ];

//             testWithOutput(
//                 "Ikev2ServerWrapper",
//                 "Complete IKEv2 server setup",
//                 { serverConfig, users },
//                 () => Ikev2ServerWrapper(serverConfig, users),
//             );

//             const result = Ikev2ServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle configuration with no users", () => {
//             const serverConfig: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "nouser-server-cert",
//                     CACertificate: "nouser-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha384"],
//                         Cipher: ["aes192"],
//                         DhGroup: ["modp3072"],
//                     },
//                     Phase2: {
//                         Auth: ["sha384"],
//                         Cipher: ["aes192"],
//                         PfsGroup: ["modp3072"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "nouser-ikev2-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2ServerWrapper",
//                 "IKEv2 server without users",
//                 { serverConfig },
//                 () => Ikev2ServerWrapper(serverConfig, []),
//             );

//             const result = Ikev2ServerWrapper(serverConfig, []);
//             validateRouterConfig(result);
//         });

//         it("should handle disabled server with users", () => {
//             const serverConfig: Ikev2ServerConfig = {
//                 enabled: false,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "disabled-server-cert",
//                     CACertificate: "disabled-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "disabled-ikev2-pool",
//                 },
//             };

//             const users: Credentials[] = [
//                 {
//                     Username: "disableduser1",
//                     Password: "disabledpass1",
//                     VPNType: ["IKEv2"],
//                 },
//             ];

//             testWithOutput(
//                 "Ikev2ServerWrapper",
//                 "Disabled IKEv2 server with users",
//                 { serverConfig, users },
//                 () => Ikev2ServerWrapper(serverConfig, users),
//             );

//             const result = Ikev2ServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });

//         it("should handle complex configuration with many users", () => {
//             const serverConfig: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "complex-server-cert",
//                     CACertificate: "complex-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256", "sha384", "sha512"],
//                         Cipher: ["aes128", "aes192", "aes256"],
//                         DhGroup: ["modp1024", "modp2048", "modp3072", "modp4096"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256", "sha384", "sha512"],
//                         Cipher: ["aes128", "aes192", "aes256"],
//                         PfsGroup: ["modp1024", "modp2048", "modp3072"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "complex-ikev2-pool",
//                 },
//             };

//             const users: Credentials[] = Array.from({ length: 40 }, (_, i) => ({
//                 Username: `ikev2user${i + 1}`,
//                 Password: `ikev2pass${i + 1}`,
//                 VPNType: ["IKEv2"],
//             }));

//             testWithOutput(
//                 "Ikev2ServerWrapper",
//                 "Complex IKEv2 setup with many users",
//                 {
//                     serverConfig,
//                     users: `Array of ${users.length} users`,
//                 },
//                 () => Ikev2ServerWrapper(serverConfig, users),
//             );

//             const result = Ikev2ServerWrapper(serverConfig, users);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle non-standard ports", () => {
//             const configs = [
//                 {
//                     enabled: true,
//                     Port: 499,
//                     Certificate: {
//                         ServerCertificate: "lowport-server-cert",
//                         CACertificate: "lowport-ca-cert",
//                     },
//                     Encryption: {
//                         Phase1: {
//                             Auth: ["sha256"],
//                             Cipher: ["aes256"],
//                             DhGroup: ["modp2048"],
//                         },
//                         Phase2: {
//                             Auth: ["sha256"],
//                             Cipher: ["aes256"],
//                             PfsGroup: ["modp2048"],
//                         },
//                     },
//                     Address: {
//                         AddressPool: "lowport-pool",
//                     },
//                 },
//                 {
//                     enabled: true,
//                     Port: 65000,
//                     Certificate: {
//                         ServerCertificate: "highport-server-cert",
//                         CACertificate: "highport-ca-cert",
//                     },
//                     Encryption: {
//                         Phase1: {
//                             Auth: ["sha256"],
//                             Cipher: ["aes256"],
//                             DhGroup: ["modp2048"],
//                         },
//                         Phase2: {
//                             Auth: ["sha256"],
//                             Cipher: ["aes256"],
//                             PfsGroup: ["modp2048"],
//                         },
//                     },
//                     Address: {
//                         AddressPool: "highport-pool",
//                     },
//                 },
//             ];

//             configs.forEach((config) => {
//                 testWithOutput(
//                     "Ikev2Server",
//                     `IKEv2 with port ${config.Port}`,
//                     { config },
//                     () => Ikev2Server(config),
//                 );

//                 const result = Ikev2Server(config);
//                 validateRouterConfig(result);
//             });
//         });

//         it("should handle minimal DH group configuration", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "minimal-server-cert",
//                     CACertificate: "minimal-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["md5"],
//                         Cipher: ["des"],
//                         DhGroup: ["modp768"],
//                     },
//                     Phase2: {
//                         Auth: ["md5"],
//                         Cipher: ["des"],
//                         PfsGroup: ["modp768"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "minimal-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with minimal encryption",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle certificate names with special characters", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "ikev2-server_cert.2024",
//                     CACertificate: "ikev2-ca_cert.root",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "special-cert-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with special characters in certificate names",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle elliptic curve DH groups", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "ecc-server-cert",
//                     CACertificate: "ecc-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["ecp256", "ecp384", "ecp521"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["ecp256", "ecp384", "ecp521"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "ecc-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with elliptic curve DH groups",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle maximum encryption strength", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "max-server-cert",
//                     CACertificate: "max-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256-gcm", "aes256-cbc"],
//                         DhGroup: ["modp8192", "ecp521"],
//                     },
//                     Phase2: {
//                         Auth: ["sha512"],
//                         Cipher: ["aes256-gcm", "aes256-cbc"],
//                         PfsGroup: ["modp8192", "ecp521"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "max-strength-pool",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with maximum encryption strength",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });

//         it("should handle long pool names", () => {
//             const config: Ikev2ServerConfig = {
//                 enabled: true,
//                 Port: 500,
//                 Certificate: {
//                     ServerCertificate: "longpool-server-cert",
//                     CACertificate: "longpool-ca-cert",
//                 },
//                 Encryption: {
//                     Phase1: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         DhGroup: ["modp2048"],
//                     },
//                     Phase2: {
//                         Auth: ["sha256"],
//                         Cipher: ["aes256"],
//                         PfsGroup: ["modp2048"],
//                     },
//                 },
//                 Address: {
//                     AddressPool: "very-long-pool-name-for-ikev2-server-testing-purposes-2024",
//                 },
//             };

//             testWithOutput(
//                 "Ikev2Server",
//                 "IKEv2 with long pool name",
//                 { config },
//                 () => Ikev2Server(config),
//             );

//             const result = Ikev2Server(config);
//             validateRouterConfig(result);
//         });
//     });
// });