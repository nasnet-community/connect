import { describe, it } from "vitest";
import {
    L2tpServer,
    L2tpServerUsers,
    L2TPVSBinding,
    L2TPServerFirewall,
    L2tpServerWrapper,
} from "./L2TP";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    L2tpServerConfig,
    VSCredentials,
    VSNetwork,
    SubnetConfig,
} from "~/components/Star/StarContext";

describe("L2TP Protocol Tests", () => {
    // Common test data
    const vsNetwork: VSNetwork = "VPN";
    const subnetConfig: SubnetConfig = {
        name: "l2tp",
        subnet: "192.168.80.0/24",
    };

    describe("L2tpServer Function", () => {
        it("should generate basic L2TP server configuration", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "sharedsecret123",
                },
                Authentication: ["mschap2"],
                KeepaliveTimeout: 30,
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "Basic L2TP server configuration",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfig(result, [
                "/ip pool",
                "/ppp profile",
                "/interface l2tp-server server",
            ]);
        });

        it("should configure L2TP with IPsec required", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "MyStrongSecret2024!",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "L2TP with IPsec required",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should configure L2TP without IPsec", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                Authentication: ["pap", "chap", "mschap1", "mschap2"],
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "L2TP without IPsec",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom MTU/MRU packet sizes", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                PacketSize: {
                    MaxMtu: 1400,
                    MaxMru: 1400,
                    mrru: 1600,
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "L2TP with custom packet sizes",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should configure fast path and session limits", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                allowFastPath: true,
                maxSessions: 100,
                OneSessionPerHost: true,
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "L2TP with fast path and session limits",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle disabled L2TP server", () => {
            const config: L2tpServerConfig = {
                enabled: false,
                IPsec: {
                    UseIpsec: "no",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "Disabled L2TP server",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle different network types", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "domesticsecret",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };
            const domesticSubnet: SubnetConfig = {
                name: "l2tp-domestic",
                subnet: "192.168.20.0/24",
            };

            testWithOutput(
                "L2tpServer",
                "L2TP with Domestic network",
                { config, vsNetwork: "Domestic", domesticSubnet },
                () => L2tpServer(config, "Domestic", domesticSubnet),
            );

            const result = L2tpServer(config, "Domestic", domesticSubnet);
            validateRouterConfigStructure(result);
        });
    });

    describe("L2tpServerUsers Function", () => {
        it("should generate L2TP user credentials", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "l2tpuser1",
                    Password: "l2tppass1",
                    VPNType: ["L2TP"],
                },
                {
                    Username: "l2tpuser2",
                    Password: "l2tppass2",
                    VPNType: ["L2TP"],
                },
            ];

            testWithOutput(
                "L2tpServerUsers",
                "L2TP users configuration",
                { config, users },
                () => L2tpServerUsers(config, users),
            );

            const result = L2tpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should filter only L2TP users", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "l2tpuser",
                    Password: "pass1",
                    VPNType: ["L2TP"],
                },
                {
                    Username: "pptpuser",
                    Password: "pass2",
                    VPNType: ["PPTP"],
                },
                {
                    Username: "multiuser",
                    Password: "pass3",
                    VPNType: ["L2TP", "OpenVPN"],
                },
            ];

            testWithOutput(
                "L2tpServerUsers",
                "Filter only L2TP users",
                { config, users },
                () => L2tpServerUsers(config, users),
            );

            const result = L2tpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle empty users array", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "L2tpServerUsers",
                "L2TP with no users",
                { config, users },
                () => L2tpServerUsers(config, users),
            );

            const result = L2tpServerUsers(config, users);
            validateRouterConfigStructure(result);
        });

        it("should handle many L2TP users", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "sharedsecret",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = Array.from({ length: 30 }, (_, i) => ({
                Username: `l2tp_user${i + 1}`,
                Password: `l2tp_pass${i + 1}`,
                VPNType: ["L2TP"],
            }));

            testWithOutput(
                "L2tpServerUsers",
                "L2TP with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => L2tpServerUsers(config, users),
            );

            const result = L2tpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });
    });

    describe("L2TPVSBinding Function", () => {
        it("should generate L2TP interface bindings", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "binduser1",
                    Password: "bindpass1",
                    VPNType: ["L2TP"],
                },
                {
                    Username: "binduser2",
                    Password: "bindpass2",
                    VPNType: ["L2TP"],
                },
            ];

            testWithOutput(
                "L2TPVSBinding",
                "L2TP interface bindings",
                { credentials, VSNetwork: vsNetwork },
                () => L2TPVSBinding(credentials, vsNetwork),
            );

            const result = L2TPVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface l2tp-server"]);
        });

        it("should handle different network types for binding", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "foreignuser",
                    Password: "foreignpass",
                    VPNType: ["L2TP"],
                },
            ];

            testWithOutput(
                "L2TPVSBinding",
                "L2TP bindings for Foreign network",
                { credentials, VSNetwork: "Foreign" },
                () => L2TPVSBinding(credentials, "Foreign"),
            );

            const result = L2TPVSBinding(credentials, "Foreign");
            validateRouterConfigStructure(result);
        });

        it("should handle empty credentials", () => {
            const credentials: VSCredentials[] = [];

            testWithOutput(
                "L2TPVSBinding",
                "L2TP bindings with no credentials",
                { credentials, VSNetwork: vsNetwork },
                () => L2TPVSBinding(credentials, vsNetwork),
            );

            const result = L2TPVSBinding(credentials, vsNetwork);
            validateRouterConfigStructure(result);
        });
    });

    describe("L2TPServerFirewall Function", () => {
        it("should generate firewall rules for L2TP server", () => {
            const serverConfigs: L2tpServerConfig[] = [
                {
                    enabled: true,
                    IPsec: {
                        UseIpsec: "required",
                    },
                    L2TPV3: {
                        l2tpv3EtherInterfaceList: "LAN",
                    },
                },
            ];

            testWithOutput(
                "L2TPServerFirewall",
                "Firewall rules for L2TP",
                { serverConfigs },
                () => L2TPServerFirewall(serverConfigs),
            );

            const result = L2TPServerFirewall(serverConfigs);
            validateRouterConfig(result, ["/ip firewall filter", "/ip firewall mangle"]);
        });

        it("should handle multiple L2TP servers", () => {
            const serverConfigs: L2tpServerConfig[] = [
                {
                    enabled: true,
                    IPsec: {
                        UseIpsec: "required",
                    },
                    L2TPV3: {
                        l2tpv3EtherInterfaceList: "LAN",
                    },
                },
                {
                    enabled: true,
                    IPsec: {
                        UseIpsec: "no",
                    },
                    L2TPV3: {
                        l2tpv3EtherInterfaceList: "LAN",
                    },
                },
            ];

            testWithOutput(
                "L2TPServerFirewall",
                "Firewall rules for multiple L2TP servers",
                { serverConfigs },
                () => L2TPServerFirewall(serverConfigs),
            );

            const result = L2TPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });

        it("should handle empty server configs", () => {
            const serverConfigs: L2tpServerConfig[] = [];

            testWithOutput(
                "L2TPServerFirewall",
                "Firewall with no L2TP servers",
                { serverConfigs },
                () => L2TPServerFirewall(serverConfigs),
            );

            const result = L2TPServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });
    });

    describe("L2tpServerWrapper Function", () => {
        it("should generate complete L2TP configuration", () => {
            const serverConfig: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "MyL2TPSecret2024!",
                },
                Authentication: ["mschap2"],
                KeepaliveTimeout: 30,
                PacketSize: {
                    MaxMtu: 1460,
                    MaxMru: 1460,
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["L2TP"],
                },
                {
                    Username: "user2",
                    Password: "pass2",
                    VPNType: ["L2TP"],
                },
            ];

            testWithOutput(
                "L2tpServerWrapper",
                "Complete L2TP server setup",
                { serverConfig, users, subnetConfig },
                () => L2tpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = L2tpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });

        it("should use default subnet when not provided", () => {
            const serverConfig: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "defaultuser",
                    Password: "defaultpass",
                    VPNType: ["L2TP"],
                },
            ];

            testWithOutput(
                "L2tpServerWrapper",
                "L2TP with default subnet",
                { serverConfig, users },
                () => L2tpServerWrapper(serverConfig, users),
            );

            const result = L2tpServerWrapper(serverConfig, users);
            validateRouterConfigStructure(result);
        });

        it("should handle configuration with no users", () => {
            const serverConfig: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "secret123",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServerWrapper",
                "L2TP server without users",
                { serverConfig, subnetConfig },
                () => L2tpServerWrapper(serverConfig, [], subnetConfig),
            );

            const result = L2tpServerWrapper(serverConfig, [], subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should integrate server, users, and firewall", () => {
            const serverConfig: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "ComplexSecret!2024",
                },
                Authentication: ["pap", "chap", "mschap1", "mschap2"],
                allowFastPath: false,
                maxSessions: 50,
                OneSessionPerHost: true,
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = Array.from({ length: 20 }, (_, i) => ({
                Username: `l2tpuser${i + 1}`,
                Password: `l2tppass${i + 1}`,
                VPNType: ["L2TP"],
            }));

            testWithOutput(
                "L2tpServerWrapper",
                "Complete L2TP setup with many users",
                {
                    serverConfig,
                    users: `Array of ${users.length} users`,
                    subnetConfig,
                },
                () => L2tpServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = L2tpServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle special characters in IPsec secret", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "required",
                    IpsecSecret: "Complex!@#Secret$%^2024&*()_+",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            testWithOutput(
                "L2tpServer",
                "L2TP with special characters in secret",
                { config, vsNetwork, subnetConfig },
                () => L2tpServer(config, vsNetwork, subnetConfig),
            );

            const result = L2tpServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle users with special characters", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user-l2tp.01",
                    Password: "P@ssw0rd!L2TP#2024",
                    VPNType: ["L2TP"],
                },
            ];

            testWithOutput(
                "L2tpServerUsers",
                "L2TP users with special characters",
                { config, users },
                () => L2tpServerUsers(config, users),
            );

            const result = L2tpServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle very small subnet", () => {
            const config: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: "no",
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: "LAN",
                },
            };
            const smallSubnet: SubnetConfig = {
                name: "l2tp-small",
                subnet: "10.10.10.0/30",
            };

            testWithOutput(
                "L2tpServer",
                "L2TP with /30 subnet",
                { config, vsNetwork, smallSubnet },
                () => L2tpServer(config, vsNetwork, smallSubnet),
            );

            const result = L2tpServer(config, vsNetwork, smallSubnet);
            validateRouterConfigStructure(result);
        });
    });
});
