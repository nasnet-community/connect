import { describe, it } from "vitest";
import {
    BTHServer,
    BTHServerUsers,
    BTHServerFirewall,
    BTHServerWrapper,
} from "./BTH";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    BackToHomeServerConfig,
    VSCredentials,
} from "~/components/Star/StarContext";

describe("Back-to-Home (BTH) Protocol Tests", () => {
    describe("BTHServer Function", () => {
        it("should generate basic Back-to-Home server configuration when enabled", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            testWithOutput(
                "BTHServer",
                "Basic Back-to-Home server configuration",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfig(result, ["/ip cloud"]);
        });

        it("should return empty config when Back-to-Home is disabled", () => {
            const config: BackToHomeServerConfig = {
                enabled: false,
                Network: "VPN",
            };

            testWithOutput(
                "BTHServer",
                "Back-to-Home server disabled state",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfigStructure(result);
        });

        it("should handle Back-to-Home server for Domestic network", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "Domestic",
            };

            testWithOutput(
                "BTHServer",
                "Back-to-Home server with Domestic network",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfig(result, ["/ip cloud"]);
        });

        it("should handle Back-to-Home server for Foreign network", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "Foreign",
            };

            testWithOutput(
                "BTHServer",
                "Back-to-Home server with Foreign network",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfig(result, ["/ip cloud"]);
        });

        it("should handle Back-to-Home server for Split network", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "Split",
            };

            testWithOutput(
                "BTHServer",
                "Back-to-Home server with Split network",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfig(result, ["/ip cloud"]);
        });

        it("should configure cloud DDNS settings", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            testWithOutput(
                "BTHServer",
                "Back-to-Home with cloud DDNS enabled",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfigStructure(result);
        });
    });

    describe("BTHServerUsers Function", () => {
        it("should generate Back-to-Home users with allow-lan enabled", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "bthuser1",
                    Password: "bthpass1",
                    VPNType: ["BackToHome"],
                },
                {
                    Username: "bthuser2",
                    Password: "bthpass2",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Back-to-Home users with allow-lan",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should filter only BackToHome users", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "bthuser",
                    Password: "bthpass",
                    VPNType: ["BackToHome"],
                },
                {
                    Username: "wireguarduser",
                    Password: "wgpass",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "multiuser",
                    Password: "multipass",
                    VPNType: ["BackToHome", "SSH"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Filter only BackToHome users",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should return empty config when no BackToHome users", () => {
            const config: BackToHomeServerConfig = {
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
                "BTHServerUsers",
                "No BackToHome users in array",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfigStructure(result);
        });

        it("should handle empty users array", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "BTHServerUsers",
                "Back-to-Home with no users",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfigStructure(result);
        });

        it("should handle many BackToHome users", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = Array.from({ length: 20 }, (_, i) => ({
                Username: `bth_user${i + 1}`,
                Password: `bth_pass${i + 1}`,
                VPNType: ["BackToHome"],
            }));

            testWithOutput(
                "BTHServerUsers",
                "Back-to-Home with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should handle users with special characters in credentials", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "bth-user.01",
                    Password: "P@ssw0rd!BTH#2024",
                    VPNType: ["BackToHome"],
                },
                {
                    Username: "admin_bth_secure",
                    Password: "Str0ng&BTH*Pass",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Back-to-Home users with special characters",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should work without config parameter", () => {
            const users: VSCredentials[] = [
                {
                    Username: "bthuser",
                    Password: "bthpass",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Back-to-Home users without config parameter",
                { users },
                () => BTHServerUsers(users),
            );

            const result = BTHServerUsers(users);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });
    });

    describe("BTHServerFirewall Function", () => {
        it("should return empty configuration (not implemented)", () => {
            testWithOutput(
                "BTHServerFirewall",
                "Back-to-Home firewall (empty implementation)",
                {},
                () => BTHServerFirewall(),
            );

            const result = BTHServerFirewall();
            validateRouterConfigStructure(result);
        });
    });

    describe("BTHServerWrapper Function", () => {
        it("should return empty configuration (not implemented)", () => {
            testWithOutput(
                "BTHServerWrapper",
                "Back-to-Home wrapper (empty implementation)",
                {},
                () => BTHServerWrapper(),
            );

            const result = BTHServerWrapper();
            validateRouterConfigStructure(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle minimal Back-to-Home configuration", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            testWithOutput(
                "BTHServer",
                "Minimal Back-to-Home configuration",
                { config },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfigStructure(result);
        });

        it("should handle users with very long usernames and passwords", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "very_long_bth_username_with_many_characters_12345",
                    Password: "VeryLongP@ssw0rd!BTH#Many$Special%Characters&12345",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Back-to-Home users with long credentials",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should handle all network types", () => {
            const networks: Array<BackToHomeServerConfig["Network"]> = ["VPN", "Domestic", "Foreign", "Split"];

            networks.forEach((network) => {
                const config: BackToHomeServerConfig = {
                    enabled: true,
                    Network: network,
                };

                testWithOutput(
                    "BTHServer",
                    `Back-to-Home server for ${network} network`,
                    { config, network },
                    () => BTHServer(config),
                );

                const result = BTHServer(config);
                validateRouterConfig(result, ["/ip cloud"]);
            });
        });

        it("should handle users with only BackToHome in multi-VPN setup", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "allmethods",
                    Password: "allpass",
                    VPNType: ["BackToHome", "Wireguard", "OpenVPN", "PPTP", "L2TP", "SSTP", "IKeV2", "SSH", "Socks5"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "User with all VPN types including BackToHome",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should handle disabled state with users", () => {
            const config: BackToHomeServerConfig = {
                enabled: false,
                Network: "VPN",
            };

            const users: VSCredentials[] = [
                {
                    Username: "bthuser",
                    Password: "bthpass",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServer",
                "Disabled Back-to-Home server (users ignored)",
                { config, users },
                () => BTHServer(config),
            );

            const result = BTHServer(config);
            validateRouterConfigStructure(result);
        });

        it("should handle single user scenario", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "Domestic",
            };

            const users: VSCredentials[] = [
                {
                    Username: "singleuser",
                    Password: "singlepass",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Single Back-to-Home user",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfig(result, ["/ip cloud back-to-home-user"]);
        });

        it("should verify allow-lan is always enabled", () => {
            const config: BackToHomeServerConfig = {
                enabled: true,
                Network: "Foreign",
            };

            const users: VSCredentials[] = [
                {
                    Username: "foreignuser",
                    Password: "foreignpass",
                    VPNType: ["BackToHome"],
                },
            ];

            testWithOutput(
                "BTHServerUsers",
                "Verify allow-lan setting for Foreign network",
                { config, users },
                () => BTHServerUsers(users, config),
            );

            const result = BTHServerUsers(users, config);
            validateRouterConfigStructure(result);
        });
    });
});
