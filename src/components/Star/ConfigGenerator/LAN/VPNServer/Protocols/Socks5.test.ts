import { describe, it } from "vitest";
import {
    Socks5Server,
    Socks5ServerUsers,
    Scoks5ServerFirewall,
    Scoks5ServerWrapper,
} from "./Socks5";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    Socks5ServerConfig,
    VSCredentials,
} from "~/components/Star/StarContext";

describe("Socks5 Protocol Tests", () => {
    describe("Socks5Server Function", () => {
        it("should generate basic Socks5 server configuration when enabled", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Basic Socks5 server configuration",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should return empty config when Socks5 is disabled", () => {
            const config: Socks5ServerConfig = {
                enabled: false,
                Port: 1080,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server disabled state",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfigStructure(result);
        });

        it("should handle custom port configuration", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 8080,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with custom port 8080",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should handle high port numbers", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 65535,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with high port number",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should handle Socks5 server for Domestic network", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "Domestic",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with Domestic network",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should handle Socks5 server for Foreign network", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "Foreign",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with Foreign network",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should handle Socks5 server for Split network", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "Split",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with Split network",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should configure version 5 and password authentication", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 with v5 protocol and password auth",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfigStructure(result);
        });
    });

    describe("Socks5ServerUsers Function", () => {
        it("should generate Socks5 users with password authentication", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "socks5user1",
                    Password: "socks5pass1",
                    VPNType: ["Socks5"],
                },
                {
                    Username: "socks5user2",
                    Password: "socks5pass2",
                    VPNType: ["Socks5"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "Socks5 users with password auth",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should filter only Socks5 users", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "socks5user",
                    Password: "socks5pass",
                    VPNType: ["Socks5"],
                },
                {
                    Username: "wireguarduser",
                    Password: "wgpass",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "multiuser",
                    Password: "multipass",
                    VPNType: ["Socks5", "SSH"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "Filter only Socks5 users",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should return empty config when no Socks5 users", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
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
                "Socks5ServerUsers",
                "No Socks5 users in array",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfigStructure(result);
        });

        it("should handle empty users array", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "Socks5ServerUsers",
                "Socks5 with no users",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfigStructure(result);
        });

        it("should handle many Socks5 users", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = Array.from({ length: 25 }, (_, i) => ({
                Username: `socks5_user${i + 1}`,
                Password: `socks5_pass${i + 1}`,
                VPNType: ["Socks5"],
            }));

            testWithOutput(
                "Socks5ServerUsers",
                "Socks5 with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should handle users with special characters in credentials", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "socks5-user.01",
                    Password: "P@ssw0rd!Socks5#2024",
                    VPNType: ["Socks5"],
                },
                {
                    Username: "admin_socks5_secure",
                    Password: "Str0ng&Socks5*Pass",
                    VPNType: ["Socks5"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "Socks5 users with special characters",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should work without config parameter", () => {
            const users: VSCredentials[] = [
                {
                    Username: "socks5user",
                    Password: "socks5pass",
                    VPNType: ["Socks5"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "Socks5 users without config parameter",
                { users },
                () => Socks5ServerUsers(users),
            );

            const result = Socks5ServerUsers(users);
            validateRouterConfig(result, ["/ip socks users"]);
        });
    });

    describe("Scoks5ServerFirewall Function (typo in name)", () => {
        it("should return empty configuration (not implemented)", () => {
            testWithOutput(
                "Scoks5ServerFirewall",
                "Socks5 firewall (empty implementation, note typo)",
                {},
                () => Scoks5ServerFirewall(),
            );

            const result = Scoks5ServerFirewall();
            validateRouterConfigStructure(result);
        });
    });

    describe("Scoks5ServerWrapper Function (typo in name)", () => {
        it("should return empty configuration (not implemented)", () => {
            testWithOutput(
                "Scoks5ServerWrapper",
                "Socks5 wrapper (empty implementation, note typo)",
                {},
                () => Scoks5ServerWrapper(),
            );

            const result = Scoks5ServerWrapper();
            validateRouterConfigStructure(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle minimal Socks5 configuration", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Minimal Socks5 configuration",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfigStructure(result);
        });

        it("should handle users with very long usernames and passwords", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "very_long_socks5_username_with_many_characters_12345",
                    Password: "VeryLongP@ssw0rd!Socks5#Many$Special%Characters&12345",
                    VPNType: ["Socks5"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "Socks5 users with long credentials",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should handle all network types", () => {
            const networks: Array<Socks5ServerConfig["Network"]> = ["VPN", "Domestic", "Foreign", "Split"];

            networks.forEach((network) => {
                const config: Socks5ServerConfig = {
                    enabled: true,
                    Port: 1080,
                    Network: network,
                };

                testWithOutput(
                    "Socks5Server",
                    `Socks5 server for ${network} network`,
                    { config, network },
                    () => Socks5Server(config),
                );

                const result = Socks5Server(config);
                validateRouterConfig(result, ["/ip socks"]);
            });
        });

        it("should handle different port configurations", () => {
            const ports = [1080, 1081, 3128, 8080, 9050, 9150, 10800, 65535];

            ports.forEach((port) => {
                const config: Socks5ServerConfig = {
                    enabled: true,
                    Port: port,
                    Network: "VPN",
                };

                testWithOutput(
                    "Socks5Server",
                    `Socks5 server with port ${port}`,
                    { config, port },
                    () => Socks5Server(config),
                );

                const result = Socks5Server(config);
                validateRouterConfig(result, ["/ip socks"]);
            });
        });

        it("should handle users with only Socks5 in multi-VPN setup", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "allmethods",
                    Password: "allpass",
                    VPNType: ["Socks5", "Wireguard", "OpenVPN", "PPTP", "L2TP", "SSTP", "IKeV2", "SSH", "BackToHome"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "User with all VPN types including Socks5",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should handle disabled state with users", () => {
            const config: Socks5ServerConfig = {
                enabled: false,
                Port: 1080,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "socks5user",
                    Password: "socks5pass",
                    VPNType: ["Socks5"],
                },
            ];

            testWithOutput(
                "Socks5Server",
                "Disabled Socks5 server (users ignored)",
                { config, users },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfigStructure(result);
        });

        it("should handle single user scenario", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "Domestic",
            };

            const users: VSCredentials[] = [
                {
                    Username: "singleuser",
                    Password: "singlepass",
                    VPNType: ["Socks5"],
                },
            ];

            testWithOutput(
                "Socks5ServerUsers",
                "Single Socks5 user",
                { config, users },
                () => Socks5ServerUsers(users, config),
            );

            const result = Socks5ServerUsers(users, config);
            validateRouterConfig(result, ["/ip socks users"]);
        });

        it("should handle low port numbers", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 80,
                Network: "VPN",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with low port number (80)",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfig(result, ["/ip socks"]);
        });

        it("should handle standard Socks5 default port", () => {
            const config: Socks5ServerConfig = {
                enabled: true,
                Port: 1080,
                Network: "Foreign",
            };

            testWithOutput(
                "Socks5Server",
                "Socks5 server with standard port 1080",
                { config },
                () => Socks5Server(config),
            );

            const result = Socks5Server(config);
            validateRouterConfigStructure(result);
        });
    });
});
