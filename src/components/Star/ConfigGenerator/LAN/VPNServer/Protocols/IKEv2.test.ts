import { describe, it } from "vitest";
import {
    Ikev2Server,
    Ikev2ServerUsers,
    Ikev2ServerWrapper,
    IKEv2ServerFirewall,
} from "./IKEv2";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    Ikev2ServerConfig,
    VSCredentials,
    VSNetwork,
    SubnetConfig,
} from "~/components/Star/StarContext";

describe("IKEv2 Protocol Tests", () => {
    // Common test data
    const vsNetwork: VSNetwork = "VPN";
    const subnetConfig: SubnetConfig = {
        name: "ikev2",
        subnet: "10.10.10.0/24",
    };

    describe("Ikev2Server Function", () => {
        it("should generate basic IKEv2 server configuration", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {
                    name: "ikev2",
                    lifetime: "24h",
                    dpdInterval: "30s",
                    dpdMaximumFailures: 3,
                    natTraversal: true,
                },
                proposal: {
                    name: "ikev2",
                    lifetime: "8h",
                },
                policyGroup: {
                    name: "ikev2-policies",
                },
                modeConfigs: {
                    name: "ikev2-conf",
                    systemDns: true,
                },
                peer: {
                    name: "ikev2",
                },
            };

            testWithOutput(
                "Ikev2Server",
                "Basic IKEv2 server configuration",
                { config, vsNetwork, subnetConfig },
                () => Ikev2Server(config, vsNetwork, subnetConfig),
            );

            const result = Ikev2Server(config, vsNetwork, subnetConfig);
            validateRouterConfig(result, [
                "/ip pool",
                "/ip ipsec profile",
                "/ip ipsec proposal",
                "/ip ipsec policy group",
                "/ip ipsec policy",
                "/ip ipsec peer",
                "/ip ipsec mode-config",
            ]);
        });

        it("should handle different VSNetwork types", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "Domestic",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };
            const domesticSubnet: SubnetConfig = {
                name: "ikev2-domestic",
                subnet: "192.168.20.0/24",
            };

            testWithOutput(
                "Ikev2Server",
                "IKEv2 server with Domestic network",
                { config, vsNetwork: "Domestic", domesticSubnet },
                () => Ikev2Server(config, "Domestic", domesticSubnet),
            );

            const result = Ikev2Server(config, "Domestic", domesticSubnet);
            validateRouterConfigStructure(result);
        });

        it("should generate configuration with custom subnet", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "Foreign",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };
            const customSubnet: SubnetConfig = {
                name: "ikev2-foreign",
                subnet: "172.16.0.0/24",
            };

            testWithOutput(
                "Ikev2Server",
                "IKEv2 with custom subnet",
                { config, vsNetwork: "Foreign", customSubnet },
                () => Ikev2Server(config, "Foreign", customSubnet),
            );

            const result = Ikev2Server(config, "Foreign", customSubnet);
            validateRouterConfig(result, ["/ip pool"]);
        });

        it("should configure split DNS when specified", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
                modeConfigs: {
                    name: "ikev2-conf",
                    systemDns: false,
                    staticDns: "1.1.1.1,8.8.8.8",
                },
            };

            testWithOutput(
                "Ikev2Server",
                "IKEv2 with static DNS",
                { config, vsNetwork, subnetConfig },
                () => Ikev2Server(config, vsNetwork, subnetConfig),
            );

            const result = Ikev2Server(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle split tunneling configuration", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
                modeConfigs: {
                    name: "ikev2-conf",
                    systemDns: true,
                    splitInclude: "192.168.0.0/16,10.0.0.0/8",
                },
            };

            testWithOutput(
                "Ikev2Server",
                "IKEv2 with split tunneling",
                { config, vsNetwork, subnetConfig },
                () => Ikev2Server(config, vsNetwork, subnetConfig),
            );

            const result = Ikev2Server(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });

    describe("Ikev2ServerUsers Function", () => {
        it("should generate IKEv2 user credentials with EAP authentication", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: {
                    authMethod: "eap",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "ikev2user1",
                    Password: "ikev2pass1",
                    VPNType: ["IKeV2"],
                },
                {
                    Username: "ikev2user2",
                    Password: "ikev2pass2",
                    VPNType: ["IKeV2"],
                },
            ];

            testWithOutput(
                "Ikev2ServerUsers",
                "IKEv2 users with EAP authentication",
                { config, users, subnetConfig },
                () => Ikev2ServerUsers(config, users, subnetConfig),
            );

            const result = Ikev2ServerUsers(config, users, subnetConfig);
            validateRouterConfig(result, ["/ppp secret", "/ip ipsec identity"]);
        });

        it("should generate users with pre-shared key authentication", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: {
                    authMethod: "pre-shared-key",
                    secret: "MySecretKey2024!",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "pskuser1",
                    Password: "pskpass1",
                    VPNType: ["IKeV2"],
                },
            ];

            testWithOutput(
                "Ikev2ServerUsers",
                "IKEv2 users with PSK authentication",
                { config, users, subnetConfig },
                () => Ikev2ServerUsers(config, users, subnetConfig),
            );

            const result = Ikev2ServerUsers(config, users, subnetConfig);
            validateRouterConfig(result, ["/ip ipsec identity"]);
        });

        it("should handle empty users array", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "Ikev2ServerUsers",
                "IKEv2 with no users",
                { config, users, subnetConfig },
                () => Ikev2ServerUsers(config, users, subnetConfig),
            );

            const result = Ikev2ServerUsers(config, users, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should filter only IKeV2 users", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: {
                    authMethod: "eap",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "ikev2user",
                    Password: "pass1",
                    VPNType: ["IKeV2"],
                },
                {
                    Username: "wireguarduser",
                    Password: "pass2",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "multiuser",
                    Password: "pass3",
                    VPNType: ["IKeV2", "OpenVPN"],
                },
            ];

            testWithOutput(
                "Ikev2ServerUsers",
                "Filter only IKeV2 users",
                { config, users, subnetConfig },
                () => Ikev2ServerUsers(config, users, subnetConfig),
            );

            const result = Ikev2ServerUsers(config, users, subnetConfig);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle many users efficiently", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: {
                    authMethod: "eap",
                },
            };

            const users: VSCredentials[] = Array.from({ length: 25 }, (_, i) => ({
                Username: `ikev2_user${i + 1}`,
                Password: `ikev2_pass${i + 1}`,
                VPNType: ["IKeV2"],
            }));

            testWithOutput(
                "Ikev2ServerUsers",
                "IKEv2 with multiple users",
                { config, users: `Array of ${users.length} users`, subnetConfig },
                () => Ikev2ServerUsers(config, users, subnetConfig),
            );

            const result = Ikev2ServerUsers(config, users, subnetConfig);
            validateRouterConfig(result, ["/ppp secret"]);
        });
    });

    describe("IKEv2ServerFirewall Function", () => {
        it("should generate firewall rules for IKEv2 server", () => {
            const serverConfigs: Ikev2ServerConfig[] = [
                {
                    VSNetwork: "VPN",
                },
            ];

            testWithOutput(
                "IKEv2ServerFirewall",
                "Firewall rules for IKEv2",
                { serverConfigs },
                () => IKEv2ServerFirewall(serverConfigs),
            );

            const result = IKEv2ServerFirewall(serverConfigs);
            validateRouterConfig(result, ["/ip firewall filter", "/ip firewall mangle"]);
        });

        it("should generate rules for multiple IKEv2 servers", () => {
            const serverConfigs: Ikev2ServerConfig[] = [
                {
                    VSNetwork: "VPN",
                },
                {
                    VSNetwork: "Domestic",
                },
            ];

            testWithOutput(
                "IKEv2ServerFirewall",
                "Firewall rules for multiple IKEv2 servers",
                { serverConfigs },
                () => IKEv2ServerFirewall(serverConfigs),
            );

            const result = IKEv2ServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });

        it("should handle empty server configs array", () => {
            const serverConfigs: Ikev2ServerConfig[] = [];

            testWithOutput(
                "IKEv2ServerFirewall",
                "Firewall with no IKEv2 servers",
                { serverConfigs },
                () => IKEv2ServerFirewall(serverConfigs),
            );

            const result = IKEv2ServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });
    });

    describe("Ikev2ServerWrapper Function", () => {
        it("should generate complete IKEv2 configuration", () => {
            const serverConfig: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {
                    name: "ikev2-profile",
                    lifetime: "24h",
                },
                proposal: {
                    name: "ikev2-proposal",
                    lifetime: "8h",
                },
                peer: {},
                identities: { authMethod: "eap" },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["IKeV2"],
                },
                {
                    Username: "user2",
                    Password: "pass2",
                    VPNType: ["IKeV2"],
                },
            ];

            testWithOutput(
                "Ikev2ServerWrapper",
                "Complete IKEv2 server setup",
                { serverConfig, users, subnetConfig },
                () => Ikev2ServerWrapper(serverConfig, users, subnetConfig),
            );

            const result = Ikev2ServerWrapper(serverConfig, users, subnetConfig);
            validateRouterConfig(result);
        });

        it("should use default subnet when not provided", () => {
            const serverConfig: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };

            const users: VSCredentials[] = [
                {
                    Username: "defaultuser",
                    Password: "defaultpass",
                    VPNType: ["IKeV2"],
                },
            ];

            testWithOutput(
                "Ikev2ServerWrapper",
                "IKEv2 with default subnet",
                { serverConfig, users },
                () => Ikev2ServerWrapper(serverConfig, users),
            );

            const result = Ikev2ServerWrapper(serverConfig, users);
            validateRouterConfigStructure(result);
        });

        it("should handle configuration with no users", () => {
            const serverConfig: Ikev2ServerConfig = {
                VSNetwork: "Foreign",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };

            testWithOutput(
                "Ikev2ServerWrapper",
                "IKEv2 server without users",
                { serverConfig, subnetConfig },
                () => Ikev2ServerWrapper(serverConfig, [], subnetConfig),
            );

            const result = Ikev2ServerWrapper(serverConfig, [], subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should integrate server, users, and firewall", () => {
            const serverConfig: Ikev2ServerConfig = {
                VSNetwork: "Split",
                profile: {
                    name: "ikev2-split",
                },
                proposal: {},
                peer: {},
                identities: {
                    authMethod: "pre-shared-key",
                    secret: "SplitNetworkKey123!",
                },
            };

            const users: VSCredentials[] = Array.from({ length: 15 }, (_, i) => ({
                Username: `splituser${i + 1}`,
                Password: `splitpass${i + 1}`,
                VPNType: ["IKeV2"],
            }));

            const customSubnet: SubnetConfig = {
                name: "ikev2-split",
                subnet: "192.168.50.0/24",
            };

            testWithOutput(
                "Ikev2ServerWrapper",
                "Complete IKEv2 setup for Split network with many users",
                {
                    serverConfig,
                    users: `Array of ${users.length} users`,
                    customSubnet,
                },
                () => Ikev2ServerWrapper(serverConfig, users, customSubnet),
            );

            const result = Ikev2ServerWrapper(serverConfig, users, customSubnet);
            validateRouterConfig(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle minimal configuration", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };

            testWithOutput(
                "Ikev2Server",
                "Minimal IKEv2 configuration",
                { config, vsNetwork, subnetConfig },
                () => Ikev2Server(config, vsNetwork, subnetConfig),
            );

            const result = Ikev2Server(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle users with special characters in credentials", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: {
                    authMethod: "eap",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user-ikev2.01",
                    Password: "P@ssw0rd!IKEv2#2024",
                    VPNType: ["IKeV2"],
                },
                {
                    Username: "admin_ikev2_secure",
                    Password: "Str0ng&IKEv2*Pass",
                    VPNType: ["IKeV2"],
                },
            ];

            testWithOutput(
                "Ikev2ServerUsers",
                "IKEv2 users with special characters",
                { config, users, subnetConfig },
                () => Ikev2ServerUsers(config, users, subnetConfig),
            );

            const result = Ikev2ServerUsers(config, users, subnetConfig);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle very small subnet", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };
            const smallSubnet: SubnetConfig = {
                name: "ikev2-small",
                subnet: "10.10.10.0/30",
            };

            testWithOutput(
                "Ikev2Server",
                "IKEv2 with /30 subnet",
                { config, vsNetwork, smallSubnet },
                () => Ikev2Server(config, vsNetwork, smallSubnet),
            );

            const result = Ikev2Server(config, vsNetwork, smallSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle large subnet", () => {
            const config: Ikev2ServerConfig = {
                VSNetwork: "VPN",
                profile: {},
                proposal: {},
                peer: {},
                identities: { authMethod: "eap" },
            };
            const largeSubnet: SubnetConfig = {
                name: "ikev2-large",
                subnet: "10.0.0.0/16",
            };

            testWithOutput(
                "Ikev2Server",
                "IKEv2 with /16 subnet",
                { config, vsNetwork, largeSubnet },
                () => Ikev2Server(config, vsNetwork, largeSubnet),
            );

            const result = Ikev2Server(config, vsNetwork, largeSubnet);
            validateRouterConfigStructure(result);
        });
    });
});
