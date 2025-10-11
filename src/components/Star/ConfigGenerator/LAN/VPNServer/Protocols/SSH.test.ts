import { describe, it } from "vitest";
import {
    SSHServer,
    SSHServerUsers,
    SSHServerFirewall,
    SSHServerWrapper,
} from "./SSH";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    SSHServerConfig,
    VSCredentials,
} from "~/components/Star/StarContext";

describe("SSH Protocol Tests", () => {
    describe("SSHServer Function", () => {
        it("should generate basic SSH server configuration when enabled", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            testWithOutput(
                "SSHServer",
                "Basic SSH server configuration",
                { config },
                () => SSHServer(config),
            );

            const result = SSHServer(config);
            validateRouterConfig(result, ["/ip ssh"]);
        });

        it("should return empty config when SSH is disabled", () => {
            const config: SSHServerConfig = {
                enabled: false,
                Network: "VPN",
            };

            testWithOutput(
                "SSHServer",
                "SSH server disabled state",
                { config },
                () => SSHServer(config),
            );

            const result = SSHServer(config);
            validateRouterConfigStructure(result);
        });

        it("should handle SSH server for Domestic network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "Domestic",
            };

            testWithOutput(
                "SSHServer",
                "SSH server with Domestic network",
                { config },
                () => SSHServer(config),
            );

            const result = SSHServer(config);
            validateRouterConfig(result, ["/ip ssh"]);
        });

        it("should handle SSH server for Foreign network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "Foreign",
            };

            testWithOutput(
                "SSHServer",
                "SSH server with Foreign network",
                { config },
                () => SSHServer(config),
            );

            const result = SSHServer(config);
            validateRouterConfig(result, ["/ip ssh"]);
        });

        it("should handle SSH server for Split network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "Split",
            };

            testWithOutput(
                "SSHServer",
                "SSH server with Split network",
                { config },
                () => SSHServer(config),
            );

            const result = SSHServer(config);
            validateRouterConfig(result, ["/ip ssh"]);
        });
    });

    describe("SSHServerUsers Function", () => {
        it("should generate SSH user group and users", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "sshuser1",
                    Password: "sshpass1",
                    VPNType: ["SSH"],
                },
                {
                    Username: "sshuser2",
                    Password: "sshpass2",
                    VPNType: ["SSH"],
                },
            ];

            testWithOutput(
                "SSHServerUsers",
                "SSH users with group creation",
                { config, users },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfig(result, ["/user group", "/user"]);
        });

        it("should filter only SSH users", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "sshuser",
                    Password: "sshpass",
                    VPNType: ["SSH"],
                },
                {
                    Username: "wireguarduser",
                    Password: "wgpass",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "multiuser",
                    Password: "multipass",
                    VPNType: ["SSH", "Socks5"],
                },
            ];

            testWithOutput(
                "SSHServerUsers",
                "Filter only SSH users",
                { config, users },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfig(result, ["/user group", "/user"]);
        });

        it("should return empty config when no SSH users", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "openvpnuser",
                    Password: "ovpnpass",
                    VPNType: ["OpenVPN"],
                },
                {
                    Username: "pptpuser",
                    Password: "pptppass",
                    VPNType: ["PPTP"],
                },
            ];

            testWithOutput(
                "SSHServerUsers",
                "No SSH users in array",
                { config, users },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfigStructure(result);
        });

        it("should handle empty users array", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "SSHServerUsers",
                "SSH with no users",
                { config, users },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfigStructure(result);
        });

        it("should handle many SSH users", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = Array.from({ length: 30 }, (_, i) => ({
                Username: `ssh_user${i + 1}`,
                Password: `ssh_pass${i + 1}`,
                VPNType: ["SSH"],
            }));

            testWithOutput(
                "SSHServerUsers",
                "SSH with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfig(result, ["/user group", "/user"]);
        });

        it("should handle users with special characters in credentials", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "ssh-user.01",
                    Password: "P@ssw0rd!SSH#2024",
                    VPNType: ["SSH"],
                },
                {
                    Username: "admin_ssh_secure",
                    Password: "Str0ng&SSH*Pass",
                    VPNType: ["SSH"],
                },
            ];

            testWithOutput(
                "SSHServerUsers",
                "SSH users with special characters",
                { config, users },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfig(result, ["/user group", "/user"]);
        });

        it("should work without config parameter", () => {
            const users: VSCredentials[] = [
                {
                    Username: "sshuser",
                    Password: "sshpass",
                    VPNType: ["SSH"],
                },
            ];

            testWithOutput(
                "SSHServerUsers",
                "SSH users without config parameter",
                { users },
                () => SSHServerUsers(users),
            );

            const result = SSHServerUsers(users);
            validateRouterConfig(result, ["/user group", "/user"]);
        });
    });

    describe("SSHServerFirewall Function", () => {
        it("should generate firewall rules for VPN network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            testWithOutput(
                "SSHServerFirewall",
                "SSH firewall rules for VPN network",
                { config },
                () => SSHServerFirewall(config),
            );

            const result = SSHServerFirewall(config);
            validateRouterConfig(result, ["/ip firewall mangle", "/ip firewall raw"]);
        });

        it("should generate firewall rules for Domestic network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "Domestic",
            };

            testWithOutput(
                "SSHServerFirewall",
                "SSH firewall rules for Domestic network",
                { config },
                () => SSHServerFirewall(config),
            );

            const result = SSHServerFirewall(config);
            validateRouterConfig(result, ["/ip firewall mangle", "/ip firewall raw"]);
        });

        it("should generate firewall rules for Foreign network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "Foreign",
            };

            testWithOutput(
                "SSHServerFirewall",
                "SSH firewall rules for Foreign network",
                { config },
                () => SSHServerFirewall(config),
            );

            const result = SSHServerFirewall(config);
            validateRouterConfig(result, ["/ip firewall mangle", "/ip firewall raw"]);
        });

        it("should generate firewall rules for Split network", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "Split",
            };

            testWithOutput(
                "SSHServerFirewall",
                "SSH firewall rules for Split network",
                { config },
                () => SSHServerFirewall(config),
            );

            const result = SSHServerFirewall(config);
            validateRouterConfig(result, ["/ip firewall mangle", "/ip firewall raw"]);
        });

        it("should return empty config when SSH is disabled", () => {
            const config: SSHServerConfig = {
                enabled: false,
                Network: "VPN",
            };

            testWithOutput(
                "SSHServerFirewall",
                "SSH firewall with SSH disabled",
                { config },
                () => SSHServerFirewall(config),
            );

            const result = SSHServerFirewall(config);
            validateRouterConfigStructure(result);
        });
    });

    describe("SSHServerWrapper Function", () => {
        it("should generate complete SSH configuration", () => {
            const serverConfig: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["SSH"],
                },
                {
                    Username: "user2",
                    Password: "pass2",
                    VPNType: ["SSH"],
                },
            ];

            testWithOutput(
                "SSHServerWrapper",
                "Complete SSH server setup",
                { serverConfig, users },
                () => SSHServerWrapper(serverConfig, users),
            );

            const result = SSHServerWrapper(serverConfig, users);
            validateRouterConfig(result);
        });

        it("should handle SSH server with no users", () => {
            const serverConfig: SSHServerConfig = {
                enabled: true,
                Network: "Foreign",
            };

            testWithOutput(
                "SSHServerWrapper",
                "SSH server without users",
                { serverConfig },
                () => SSHServerWrapper(serverConfig, []),
            );

            const result = SSHServerWrapper(serverConfig, []);
            validateRouterConfigStructure(result);
        });

        it("should handle disabled SSH server", () => {
            const serverConfig: SSHServerConfig = {
                enabled: false,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["SSH"],
                },
            ];

            testWithOutput(
                "SSHServerWrapper",
                "Disabled SSH server with users",
                { serverConfig, users },
                () => SSHServerWrapper(serverConfig, users),
            );

            const result = SSHServerWrapper(serverConfig, users);
            validateRouterConfigStructure(result);
        });

        it("should integrate server, users, and firewall for Domestic network", () => {
            const serverConfig: SSHServerConfig = {
                enabled: true,
                Network: "Domestic",
            };

            const users: VSCredentials[] = Array.from({ length: 10 }, (_, i) => ({
                Username: `domesticuser${i + 1}`,
                Password: `domesticpass${i + 1}`,
                VPNType: ["SSH"],
            }));

            testWithOutput(
                "SSHServerWrapper",
                "Complete SSH setup for Domestic network with many users",
                {
                    serverConfig,
                    users: `Array of ${users.length} users`,
                },
                () => SSHServerWrapper(serverConfig, users),
            );

            const result = SSHServerWrapper(serverConfig, users);
            validateRouterConfig(result);
        });

        it("should filter mixed VPN types correctly", () => {
            const serverConfig: SSHServerConfig = {
                enabled: true,
                Network: "Split",
            };

            const users: VSCredentials[] = [
                {
                    Username: "sshonly",
                    Password: "pass1",
                    VPNType: ["SSH"],
                },
                {
                    Username: "wireguardonly",
                    Password: "pass2",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "sshsocks5",
                    Password: "pass3",
                    VPNType: ["SSH", "Socks5"],
                },
                {
                    Username: "openvpnonly",
                    Password: "pass4",
                    VPNType: ["OpenVPN"],
                },
            ];

            testWithOutput(
                "SSHServerWrapper",
                "SSH server with mixed VPN types",
                { serverConfig, users },
                () => SSHServerWrapper(serverConfig, users),
            );

            const result = SSHServerWrapper(serverConfig, users);
            validateRouterConfig(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle minimal SSH configuration", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            testWithOutput(
                "SSHServer",
                "Minimal SSH configuration",
                { config },
                () => SSHServer(config),
            );

            const result = SSHServer(config);
            validateRouterConfigStructure(result);
        });

        it("should handle users with very long usernames and passwords", () => {
            const config: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "very_long_username_with_many_characters_12345",
                    Password: "VeryLongP@ssw0rd!With#Many$Special%Characters&12345",
                    VPNType: ["SSH"],
                },
            ];

            testWithOutput(
                "SSHServerUsers",
                "SSH users with long credentials",
                { config, users },
                () => SSHServerUsers(users, config),
            );

            const result = SSHServerUsers(users, config);
            validateRouterConfig(result, ["/user group", "/user"]);
        });

        it("should handle all network types in wrapper", () => {
            const networks: Array<SSHServerConfig["Network"]> = ["VPN", "Domestic", "Foreign", "Split"];

            networks.forEach((network) => {
                const serverConfig: SSHServerConfig = {
                    enabled: true,
                    Network: network,
                };

                const users: VSCredentials[] = [
                    {
                        Username: `${network.toLowerCase()}user`,
                        Password: `${network.toLowerCase()}pass`,
                        VPNType: ["SSH"],
                    },
                ];

                testWithOutput(
                    "SSHServerWrapper",
                    `SSH server for ${network} network`,
                    { serverConfig, users, network },
                    () => SSHServerWrapper(serverConfig, users),
                );

                const result = SSHServerWrapper(serverConfig, users);
                validateRouterConfig(result);
            });
        });

        it("should handle users with only SSH in multi-VPN setup", () => {
            const serverConfig: SSHServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "allmethods",
                    Password: "allpass",
                    VPNType: ["SSH", "Wireguard", "OpenVPN", "PPTP", "L2TP", "SSTP", "IKeV2", "Socks5"],
                },
            ];

            testWithOutput(
                "SSHServerWrapper",
                "User with all VPN types including SSH",
                { serverConfig, users },
                () => SSHServerWrapper(serverConfig, users),
            );

            const result = SSHServerWrapper(serverConfig, users);
            validateRouterConfig(result);
        });
    });
});
