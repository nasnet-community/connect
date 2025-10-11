import { describe, it } from "vitest";
import {
    SstpServer,
    SstpServerUsers,
    SSTPVSBinding,
    SSTPServerFirewall,
    SstpServerWrapper,
} from "./SSTP";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    SstpServerConfig,
    VSCredentials,
    VSNetwork,
    SubnetConfig,
} from "~/components/Star/StarContext";

describe("SSTP Protocol Tests", () => {
    // Common test data
    const vsNetwork: VSNetwork = "VPN";
    const subnetConfig: SubnetConfig = {
        name: "sstp",
        subnet: "192.168.90.0/24",
    };

    describe("SstpServer Function", () => {
        it("should generate basic SSTP server configuration", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 30,
            };

            testWithOutput(
                "SstpServer",
                "Basic SSTP server configuration",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfig(result, [
                "/ip pool",
                "/ppp profile",
                "/interface sstp-server server",
            ]);
        });

        it("should handle different network types", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };
            const foreignSubnet: SubnetConfig = {
                name: "sstp-foreign",
                subnet: "192.168.30.0/24",
            };

            testWithOutput(
                "SstpServer",
                "SSTP with Foreign network",
                { config, vsNetwork: "Foreign", foreignSubnet },
                () => SstpServer(config, "Foreign", foreignSubnet),
            );

            const result = SstpServer(config, "Foreign", foreignSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle custom port configuration", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 8443,
                Authentication: ["mschap2"],
            };

            testWithOutput(
                "SstpServer",
                "SSTP with custom port",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle disabled SSTP server", () => {
            const config: SstpServerConfig = {
                enabled: false,
                Port: 443,
                Authentication: ["mschap2"],
            };

            testWithOutput(
                "SstpServer",
                "Disabled SSTP server",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom MTU/MRU packet sizes", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                PacketSize: {
                    MaxMtu: 1400,
                    MaxMru: 1400,
                    mrru: 1600,
                },
            };

            testWithOutput(
                "SstpServer",
                "SSTP with custom packet sizes",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should configure multiple authentication methods", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["pap", "chap", "mschap1", "mschap2"],
                KeepaliveTimeout: 60,
            };

            testWithOutput(
                "SstpServer",
                "SSTP with multiple authentication methods",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle TLS configuration options", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                Pfs: true,
                Ciphers: ["aes256-sha", "aes256-gcm-sha384"],
                TlsVersion: "any",
            };

            testWithOutput(
                "SstpServer",
                "SSTP with TLS configuration",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle certificate verification settings", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                VerifyClientCertificate: false,
            };

            testWithOutput(
                "SstpServer",
                "SSTP with certificate verification disabled",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });

    describe("SstpServerUsers Function", () => {
        it("should generate SSTP user credentials", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "sstpuser1",
                    Password: "sstppass1",
                    VPNType: ["SSTP"],
                },
                {
                    Username: "sstpuser2",
                    Password: "sstppass2",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SstpServerUsers",
                "SSTP users configuration",
                { config, users },
                () => SstpServerUsers(config, users),
            );

            const result = SstpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should filter only SSTP users", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "sstpuser",
                    Password: "pass1",
                    VPNType: ["SSTP"],
                },
                {
                    Username: "wireguarduser",
                    Password: "pass2",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "multiuser",
                    Password: "pass3",
                    VPNType: ["SSTP", "IKeV2"],
                },
            ];

            testWithOutput(
                "SstpServerUsers",
                "Filter only SSTP users",
                { config, users },
                () => SstpServerUsers(config, users),
            );

            const result = SstpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle empty users array", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "SstpServerUsers",
                "SSTP with no users",
                { config, users },
                () => SstpServerUsers(config, users),
            );

            const result = SstpServerUsers(config, users);
            validateRouterConfigStructure(result);
        });

        it("should handle many SSTP users", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = Array.from({ length: 25 }, (_, i) => ({
                Username: `sstp_user${i + 1}`,
                Password: `sstp_pass${i + 1}`,
                VPNType: ["SSTP"],
            }));

            testWithOutput(
                "SstpServerUsers",
                "SSTP with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => SstpServerUsers(config, users),
            );

            const result = SstpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle users with special characters", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "user-sstp.01",
                    Password: "P@ssw0rd!SSTP#2024",
                    VPNType: ["SSTP"],
                },
                {
                    Username: "admin_sstp_secure",
                    Password: "Str0ng&SSTP*Pass",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SstpServerUsers",
                "SSTP users with special characters",
                { config, users },
                () => SstpServerUsers(config, users),
            );

            const result = SstpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });
    });

    describe("SSTPVSBinding Function", () => {
        it("should generate SSTP interface bindings", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "binduser1",
                    Password: "bindpass1",
                    VPNType: ["SSTP"],
                },
                {
                    Username: "binduser2",
                    Password: "bindpass2",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SSTPVSBinding",
                "SSTP interface bindings",
                { credentials, VSNetwork: vsNetwork },
                () => SSTPVSBinding(credentials, vsNetwork),
            );

            const result = SSTPVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface sstp-server"]);
        });

        it("should handle different network types for binding", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "domesticuser",
                    Password: "domesticpass",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SSTPVSBinding",
                "SSTP bindings for Domestic network",
                { credentials, VSNetwork: "Domestic" },
                () => SSTPVSBinding(credentials, "Domestic"),
            );

            const result = SSTPVSBinding(credentials, "Domestic");
            validateRouterConfigStructure(result);
        });

        it("should handle empty credentials", () => {
            const credentials: VSCredentials[] = [];

            testWithOutput(
                "SSTPVSBinding",
                "SSTP bindings with no credentials",
                { credentials, VSNetwork: vsNetwork },
                () => SSTPVSBinding(credentials, vsNetwork),
            );

            const result = SSTPVSBinding(credentials, vsNetwork);
            validateRouterConfigStructure(result);
        });

        it("should handle multiple users for binding", () => {
            const credentials: VSCredentials[] = Array.from({ length: 20 }, (_, i) => ({
                Username: `binduser${i + 1}`,
                Password: `bindpass${i + 1}`,
                VPNType: ["SSTP"],
            }));

            testWithOutput(
                "SSTPVSBinding",
                "SSTP bindings with many users",
                { credentials: `Array of ${credentials.length} users`, VSNetwork: vsNetwork },
                () => SSTPVSBinding(credentials, vsNetwork),
            );

            const result = SSTPVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface sstp-server"]);
        });
    });

    describe("SSTPServerFirewall Function", () => {
        it("should generate firewall rules for SSTP server", () => {
            const serverConfigs: SstpServerConfig[] = [
                {
                    enabled: true,
                    Port: 443,
                    Authentication: ["mschap2"],
                },
            ];

            testWithOutput(
                "SSTPServerFirewall",
                "Firewall rules for SSTP",
                { serverConfigs },
                () => SSTPServerFirewall(serverConfigs),
            );

            const result = SSTPServerFirewall(serverConfigs);
            validateRouterConfig(result, ["/ip firewall filter", "/ip firewall mangle"]);
        });

        it("should handle custom ports in firewall rules", () => {
            const serverConfigs: SstpServerConfig[] = [
                {
                    enabled: true,
                    Port: 8443,
                    Authentication: ["mschap2"],
                },
            ];

            testWithOutput(
                "SSTPServerFirewall",
                "Firewall rules for SSTP with custom port",
                { serverConfigs },
                () => SSTPServerFirewall(serverConfigs),
            );

            const result = SSTPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });

        it("should handle multiple SSTP server configs", () => {
            const serverConfigs: SstpServerConfig[] = [
                {
                    enabled: true,
                    Port: 443,
                    Authentication: ["mschap2"],
                },
                {
                    enabled: true,
                    Port: 8443,
                    Authentication: ["pap", "chap"],
                },
            ];

            testWithOutput(
                "SSTPServerFirewall",
                "Firewall rules for multiple SSTP servers",
                { serverConfigs },
                () => SSTPServerFirewall(serverConfigs),
            );

            const result = SSTPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });

        it("should handle empty server configs array", () => {
            const serverConfigs: SstpServerConfig[] = [];

            testWithOutput(
                "SSTPServerFirewall",
                "Firewall with no SSTP servers",
                { serverConfigs },
                () => SSTPServerFirewall(serverConfigs),
            );

            const result = SSTPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });
    });

    describe("SstpServerWrapper Function", () => {
        it("should generate complete SSTP configuration", () => {
            const serverConfig: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 30,
                PacketSize: {
                    MaxMtu: 1460,
                    MaxMru: 1460,
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["SSTP"],
                },
                {
                    Username: "user2",
                    Password: "pass2",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SstpServerWrapper",
                "Complete SSTP server setup",
                { serverConfig, users, subnetConfig },
                () => SstpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = SstpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });

        it("should use default subnet when not provided", () => {
            const serverConfig: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "defaultuser",
                    Password: "defaultpass",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SstpServerWrapper",
                "SSTP with default subnet",
                { serverConfig, users },
                () => SstpServerWrapper(serverConfig, users),
            );

            const result = SstpServerWrapper(serverConfig, users);
            validateRouterConfigStructure(result);
        });

        it("should handle configuration with no users", () => {
            const serverConfig: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap1", "mschap2"],
            };

            testWithOutput(
                "SstpServerWrapper",
                "SSTP server without users",
                { serverConfig, subnetConfig },
                () => SstpServerWrapper(serverConfig, [], subnetConfig),
            );

            const result = SstpServerWrapper(serverConfig, [], subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should integrate server, users, and firewall", () => {
            const serverConfig: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["pap", "chap", "mschap1", "mschap2"],
                KeepaliveTimeout: 60,
                PacketSize: {
                    MaxMtu: 1400,
                    MaxMru: 1400,
                    mrru: 1600,
                },
                Pfs: true,
                Ciphers: ["aes256-sha", "aes256-gcm-sha384"],
                TlsVersion: "any",
            };

            const users: VSCredentials[] = Array.from({ length: 30 }, (_, i) => ({
                Username: `sstpuser${i + 1}`,
                Password: `sstppass${i + 1}`,
                VPNType: ["SSTP"],
            }));

            testWithOutput(
                "SstpServerWrapper",
                "Complete SSTP setup with many users",
                {
                    serverConfig,
                    users: `Array of ${users.length} users`,
                    subnetConfig,
                },
                () => SstpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = SstpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });

        it("should handle disabled server with users", () => {
            const serverConfig: SstpServerConfig = {
                enabled: false,
                Port: 443,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "disableduser",
                    Password: "disabledpass",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SstpServerWrapper",
                "Disabled SSTP server with users",
                { serverConfig, users, subnetConfig },
                () => SstpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = SstpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom port configuration in wrapper", () => {
            const serverConfig: SstpServerConfig = {
                enabled: true,
                Port: 10443,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 120,
            };

            const users: VSCredentials[] = [
                {
                    Username: "customuser",
                    Password: "custompass",
                    VPNType: ["SSTP"],
                },
            ];

            testWithOutput(
                "SstpServerWrapper",
                "SSTP with custom port in wrapper",
                { serverConfig, users, subnetConfig },
                () => SstpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = SstpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle minimal configuration", () => {
            const config: SstpServerConfig = {
                enabled: true,
            };

            testWithOutput(
                "SstpServer",
                "Minimal SSTP configuration",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle non-standard ports", () => {
            const ports = [80, 8080, 10443, 65535];

            ports.forEach((port) => {
                const config: SstpServerConfig = {
                    enabled: true,
                    Port: port,
                    Authentication: ["mschap2"],
                };

                testWithOutput(
                    "SstpServer",
                    `SSTP with port ${port}`,
                    { config, vsNetwork, subnetConfig },
                    () => SstpServer(config, vsNetwork, subnetConfig),
                );

                const result = SstpServer(config, vsNetwork, subnetConfig);
                validateRouterConfigStructure(result);
            });
        });

        it("should handle very small subnet", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };
            const smallSubnet: SubnetConfig = {
                name: "sstp-small",
                subnet: "10.10.10.0/30",
            };

            testWithOutput(
                "SstpServer",
                "SSTP with /30 subnet",
                { config, vsNetwork, smallSubnet },
                () => SstpServer(config, vsNetwork, smallSubnet),
            );

            const result = SstpServer(config, vsNetwork, smallSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle large subnet", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
            };
            const largeSubnet: SubnetConfig = {
                name: "sstp-large",
                subnet: "10.0.0.0/16",
            };

            testWithOutput(
                "SstpServer",
                "SSTP with /16 subnet",
                { config, vsNetwork, largeSubnet },
                () => SstpServer(config, vsNetwork, largeSubnet),
            );

            const result = SstpServer(config, vsNetwork, largeSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle extreme keepalive timeout values", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 600,
            };

            testWithOutput(
                "SstpServer",
                "SSTP with very high keepalive timeout",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle different VSNetwork types", () => {
            const networkTypes: VSNetwork[] = ["VPN", "Domestic", "Foreign", "Split"];

            networkTypes.forEach((network) => {
                const config: SstpServerConfig = {
                    enabled: true,
                    Port: 443,
                    Authentication: ["mschap2"],
                };
                const networkSubnet: SubnetConfig = {
                    name: `sstp-${network.toLowerCase()}`,
                    subnet: "192.168.91.0/24",
                };

                testWithOutput(
                    "SstpServer",
                    `SSTP with ${network} network type`,
                    { config, vsNetwork: network, networkSubnet },
                    () => SstpServer(config, network, networkSubnet),
                );

                const result = SstpServer(config, network, networkSubnet);
                validateRouterConfigStructure(result);
            });
        });

        it("should handle complex TLS configuration", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                Pfs: true,
                Ciphers: ["aes256-sha", "aes256-gcm-sha384", "aes128-sha"],
                TlsVersion: "only-1.2",
                VerifyClientCertificate: true,
            };

            testWithOutput(
                "SstpServer",
                "SSTP with complex TLS configuration",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom packet sizes with mrru disabled", () => {
            const config: SstpServerConfig = {
                enabled: true,
                Port: 443,
                Authentication: ["mschap2"],
                PacketSize: {
                    MaxMtu: 1300,
                    MaxMru: 1300,
                    mrru: "disabled",
                },
            };

            testWithOutput(
                "SstpServer",
                "SSTP with custom packet sizes and disabled mrru",
                { config, vsNetwork, subnetConfig },
                () => SstpServer(config, vsNetwork, subnetConfig),
            );

            const result = SstpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });
});
