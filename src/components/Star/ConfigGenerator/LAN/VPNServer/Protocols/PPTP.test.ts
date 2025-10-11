import { describe, it } from "vitest";
import {
    PptpServer,
    PptpServerUsers,
    PPTPVSBinding,
    PPTPServerFirewall,
    PptpServerWrapper,
} from "./PPTP";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    PptpServerConfig,
    VSCredentials,
    VSNetwork,
    SubnetConfig,
} from "~/components/Star/StarContext";

describe("PPTP Protocol Tests", () => {
    // Common test data
    const vsNetwork: VSNetwork = "VPN";
    const subnetConfig: SubnetConfig = {
        name: "pptp",
        subnet: "192.168.70.0/24",
    };

    describe("PptpServer Function", () => {
        it("should generate basic PPTP server configuration", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 30,
            };

            testWithOutput(
                "PptpServer",
                "Basic PPTP server configuration",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfig(result, [
                "/ip pool",
                "/ppp profile",
                "/interface pptp-server server",
            ]);
        });

        it("should handle different network types", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };
            const domesticSubnet: SubnetConfig = {
                name: "pptp-domestic",
                subnet: "192.168.20.0/24",
            };

            testWithOutput(
                "PptpServer",
                "PPTP with Domestic network",
                { config, vsNetwork: "Domestic", domesticSubnet },
                () => PptpServer(config, "Domestic", domesticSubnet),
            );

            const result = PptpServer(config, "Domestic", domesticSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle disabled PPTP server", () => {
            const config: PptpServerConfig = {
                enabled: false,
                Authentication: ["mschap2"],
            };

            testWithOutput(
                "PptpServer",
                "Disabled PPTP server",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom MTU/MRU packet sizes", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
                PacketSize: {
                    MaxMtu: 1400,
                    MaxMru: 1400,
                    mrru: 1600,
                },
            };

            testWithOutput(
                "PptpServer",
                "PPTP with custom packet sizes",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should configure multiple authentication methods", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["pap", "chap", "mschap1", "mschap2"],
                KeepaliveTimeout: 60,
            };

            testWithOutput(
                "PptpServer",
                "PPTP with multiple authentication methods",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom keepalive timeout", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 120,
            };

            testWithOutput(
                "PptpServer",
                "PPTP with custom keepalive timeout",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });

    describe("PptpServerUsers Function", () => {
        it("should generate PPTP user credentials", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "pptpuser1",
                    Password: "pptppass1",
                    VPNType: ["PPTP"],
                },
                {
                    Username: "pptpuser2",
                    Password: "pptppass2",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PptpServerUsers",
                "PPTP users configuration",
                { config, users },
                () => PptpServerUsers(config, users),
            );

            const result = PptpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should filter only PPTP users", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "pptpuser",
                    Password: "pass1",
                    VPNType: ["PPTP"],
                },
                {
                    Username: "l2tpuser",
                    Password: "pass2",
                    VPNType: ["L2TP"],
                },
                {
                    Username: "multiuser",
                    Password: "pass3",
                    VPNType: ["PPTP", "OpenVPN"],
                },
            ];

            testWithOutput(
                "PptpServerUsers",
                "Filter only PPTP users",
                { config, users },
                () => PptpServerUsers(config, users),
            );

            const result = PptpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle empty users array", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "PptpServerUsers",
                "PPTP with no users",
                { config, users },
                () => PptpServerUsers(config, users),
            );

            const result = PptpServerUsers(config, users);
            validateRouterConfigStructure(result);
        });

        it("should handle many PPTP users", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = Array.from({ length: 30 }, (_, i) => ({
                Username: `pptp_user${i + 1}`,
                Password: `pptp_pass${i + 1}`,
                VPNType: ["PPTP"],
            }));

            testWithOutput(
                "PptpServerUsers",
                "PPTP with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => PptpServerUsers(config, users),
            );

            const result = PptpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle users with special characters", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "user-pptp.01",
                    Password: "P@ssw0rd!PPTP#2024",
                    VPNType: ["PPTP"],
                },
                {
                    Username: "admin_pptp_secure",
                    Password: "Str0ng&PPTP*Pass",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PptpServerUsers",
                "PPTP users with special characters",
                { config, users },
                () => PptpServerUsers(config, users),
            );

            const result = PptpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });
    });

    describe("PPTPVSBinding Function", () => {
        it("should generate PPTP interface bindings", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "binduser1",
                    Password: "bindpass1",
                    VPNType: ["PPTP"],
                },
                {
                    Username: "binduser2",
                    Password: "bindpass2",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PPTPVSBinding",
                "PPTP interface bindings",
                { credentials, VSNetwork: vsNetwork },
                () => PPTPVSBinding(credentials, vsNetwork),
            );

            const result = PPTPVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface pptp-server"]);
        });

        it("should handle different network types for binding", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "splituser",
                    Password: "splitpass",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PPTPVSBinding",
                "PPTP bindings for Split network",
                { credentials, VSNetwork: "Split" },
                () => PPTPVSBinding(credentials, "Split"),
            );

            const result = PPTPVSBinding(credentials, "Split");
            validateRouterConfigStructure(result);
        });

        it("should handle empty credentials", () => {
            const credentials: VSCredentials[] = [];

            testWithOutput(
                "PPTPVSBinding",
                "PPTP bindings with no credentials",
                { credentials, VSNetwork: vsNetwork },
                () => PPTPVSBinding(credentials, vsNetwork),
            );

            const result = PPTPVSBinding(credentials, vsNetwork);
            validateRouterConfigStructure(result);
        });

        it("should handle multiple users for binding", () => {
            const credentials: VSCredentials[] = Array.from({ length: 20 }, (_, i) => ({
                Username: `binduser${i + 1}`,
                Password: `bindpass${i + 1}`,
                VPNType: ["PPTP"],
            }));

            testWithOutput(
                "PPTPVSBinding",
                "PPTP bindings with many users",
                { credentials: `Array of ${credentials.length} users`, VSNetwork: vsNetwork },
                () => PPTPVSBinding(credentials, vsNetwork),
            );

            const result = PPTPVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface pptp-server"]);
        });
    });

    describe("PPTPServerFirewall Function", () => {
        it("should generate firewall rules for PPTP server", () => {
            const serverConfigs: PptpServerConfig[] = [
                {
                    enabled: true,
                    Authentication: ["mschap2"],
                },
            ];

            testWithOutput(
                "PPTPServerFirewall",
                "Firewall rules for PPTP",
                { serverConfigs },
                () => PPTPServerFirewall(serverConfigs),
            );

            const result = PPTPServerFirewall(serverConfigs);
            validateRouterConfig(result, ["/ip firewall filter", "/ip firewall mangle"]);
        });

        it("should handle multiple PPTP server configs", () => {
            const serverConfigs: PptpServerConfig[] = [
                {
                    enabled: true,
                    Authentication: ["mschap2"],
                },
                {
                    enabled: true,
                    Authentication: ["pap", "chap"],
                },
            ];

            testWithOutput(
                "PPTPServerFirewall",
                "Firewall rules for multiple PPTP configs",
                { serverConfigs },
                () => PPTPServerFirewall(serverConfigs),
            );

            const result = PPTPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });

        it("should handle empty server configs array", () => {
            const serverConfigs: PptpServerConfig[] = [];

            testWithOutput(
                "PPTPServerFirewall",
                "Firewall with no PPTP servers",
                { serverConfigs },
                () => PPTPServerFirewall(serverConfigs),
            );

            const result = PPTPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });
    });

    describe("PptpServerWrapper Function", () => {
        it("should generate complete PPTP configuration", () => {
            const serverConfig: PptpServerConfig = {
                enabled: true,
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
                    VPNType: ["PPTP"],
                },
                {
                    Username: "user2",
                    Password: "pass2",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PptpServerWrapper",
                "Complete PPTP server setup",
                { serverConfig, users, subnetConfig },
                () => PptpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = PptpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });

        it("should use default subnet when not provided", () => {
            const serverConfig: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "defaultuser",
                    Password: "defaultpass",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PptpServerWrapper",
                "PPTP with default subnet",
                { serverConfig, users },
                () => PptpServerWrapper(serverConfig, users),
            );

            const result = PptpServerWrapper(serverConfig, users);
            validateRouterConfigStructure(result);
        });

        it("should handle configuration with no users", () => {
            const serverConfig: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap1", "mschap2"],
            };

            testWithOutput(
                "PptpServerWrapper",
                "PPTP server without users",
                { serverConfig, subnetConfig },
                () => PptpServerWrapper(serverConfig, [], subnetConfig),
            );

            const result = PptpServerWrapper(serverConfig, [], subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should integrate server, users, and firewall", () => {
            const serverConfig: PptpServerConfig = {
                enabled: true,
                Authentication: ["pap", "chap", "mschap1", "mschap2"],
                KeepaliveTimeout: 60,
                PacketSize: {
                    MaxMtu: 1400,
                    MaxMru: 1400,
                    mrru: 1600,
                },
            };

            const users: VSCredentials[] = Array.from({ length: 20 }, (_, i) => ({
                Username: `pptpuser${i + 1}`,
                Password: `pptppass${i + 1}`,
                VPNType: ["PPTP"],
            }));

            testWithOutput(
                "PptpServerWrapper",
                "Complete PPTP setup with many users",
                {
                    serverConfig,
                    users: `Array of ${users.length} users`,
                    subnetConfig,
                },
                () => PptpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = PptpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });

        it("should handle disabled server with users", () => {
            const serverConfig: PptpServerConfig = {
                enabled: false,
                Authentication: ["mschap2"],
            };

            const users: VSCredentials[] = [
                {
                    Username: "disableduser",
                    Password: "disabledpass",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "PptpServerWrapper",
                "Disabled PPTP server with users",
                { serverConfig, users, subnetConfig },
                () => PptpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = PptpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle minimal configuration", () => {
            const config: PptpServerConfig = {
                enabled: true,
            };

            testWithOutput(
                "PptpServer",
                "Minimal PPTP configuration",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle very small subnet", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };
            const smallSubnet: SubnetConfig = {
                name: "pptp-small",
                subnet: "10.10.10.0/30",
            };

            testWithOutput(
                "PptpServer",
                "PPTP with /30 subnet",
                { config, vsNetwork, smallSubnet },
                () => PptpServer(config, vsNetwork, smallSubnet),
            );

            const result = PptpServer(config, vsNetwork, smallSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle large subnet", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
            };
            const largeSubnet: SubnetConfig = {
                name: "pptp-large",
                subnet: "10.0.0.0/16",
            };

            testWithOutput(
                "PptpServer",
                "PPTP with /16 subnet",
                { config, vsNetwork, largeSubnet },
                () => PptpServer(config, vsNetwork, largeSubnet),
            );

            const result = PptpServer(config, vsNetwork, largeSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle extreme keepalive timeout values", () => {
            const config: PptpServerConfig = {
                enabled: true,
                Authentication: ["mschap2"],
                KeepaliveTimeout: 300,
            };

            testWithOutput(
                "PptpServer",
                "PPTP with high keepalive timeout",
                { config, vsNetwork, subnetConfig },
                () => PptpServer(config, vsNetwork, subnetConfig),
            );

            const result = PptpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle different VSNetwork types", () => {
            const networkTypes: VSNetwork[] = ["VPN", "Domestic", "Foreign", "Split"];

            networkTypes.forEach((network) => {
                const config: PptpServerConfig = {
                    enabled: true,
                    Authentication: ["mschap2"],
                };
                const networkSubnet: SubnetConfig = {
                    name: `pptp-${network.toLowerCase()}`,
                    subnet: "192.168.71.0/24",
                };

                testWithOutput(
                    "PptpServer",
                    `PPTP with ${network} network type`,
                    { config, vsNetwork: network, networkSubnet },
                    () => PptpServer(config, network, networkSubnet),
                );

                const result = PptpServer(config, network, networkSubnet);
                validateRouterConfigStructure(result);
            });
        });
    });
});
