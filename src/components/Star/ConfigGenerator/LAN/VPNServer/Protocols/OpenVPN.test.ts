import { describe, it } from "vitest";
import {
    ExportOpenVPN,
    OVPNServer,
    OVPNServerUsers,
    OVPNVSBinding,
    OVPNServerFirewall,
    SingleOVPNWrapper,
    OVPNServerWrapper,
} from "./OpenVPN";
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from "~/test-utils/test-helpers";
import type {
    OpenVpnServerConfig,
    VSCredentials,
    VSNetwork,
    SubnetConfig,
} from "~/components/Star/StarContext";

describe("OpenVPN Protocol Tests", () => {
    // Common test data
    const vsNetwork: VSNetwork = "VPN";
    const subnetConfig: SubnetConfig = {
        name: "openvpn",
        subnet: "10.8.0.0/24",
    };

    describe("ExportOpenVPN Function", () => {
        it("should generate OpenVPN client export script", () => {
            testWithOutput(
                "ExportOpenVPN",
                "Generate OpenVPN client configuration export script",
                {},
                () => ExportOpenVPN(),
            );

            const result = ExportOpenVPN();
            validateRouterConfig(result, ["/system script"]);
        });
    });

    describe("OVPNServer Function", () => {
        it("should generate basic OpenVPN server configuration", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-main",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "server-cert",
                },
                Address: {
                    AddressPool: "ovpn-pool",
                },
            };

            testWithOutput(
                "OVPNServer",
                "Basic OpenVPN server configuration",
                { config, vsNetwork, subnetConfig },
                () => OVPNServer(config, vsNetwork, subnetConfig),
            );

            const result = OVPNServer(config, vsNetwork, subnetConfig);
            validateRouterConfig(result, [
                "/ip pool",
                "/ppp profile",
                "/interface ovpn-server server",
            ]);
        });

        it("should generate OpenVPN server with TCP protocol", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-tcp",
                enabled: true,
                Port: 443,
                Protocol: "tcp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha512"],
                    Cipher: ["aes256-gcm"],
                },
                Certificate: {
                    Certificate: "tcp-cert",
                },
                Address: {
                    AddressPool: "tcp-pool",
                },
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN server with TCP protocol",
                { config, vsNetwork, subnetConfig },
                () => OVPNServer(config, vsNetwork, subnetConfig),
            );

            const result = OVPNServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle different network types", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-domestic",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "domestic-cert",
                },
                Address: {
                    AddressPool: "domestic-pool",
                },
            };
            const domesticSubnet: SubnetConfig = {
                name: "ovpn-domestic",
                subnet: "192.168.20.0/24",
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN with Domestic network",
                { config, vsNetwork: "Domestic", domesticSubnet },
                () => OVPNServer(config, "Domestic", domesticSubnet),
            );

            const result = OVPNServer(config, "Domestic", domesticSubnet);
            validateRouterConfigStructure(result);
        });

        it("should generate OpenVPN server with ethernet mode", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-ethernet",
                enabled: true,
                Port: 1195,
                Protocol: "udp",
                Mode: "ethernet",
                Encryption: {
                    Auth: ["sha1", "md5"],
                    Cipher: ["aes128-cbc", "aes192-cbc"],
                },
                Certificate: {
                    Certificate: "ethernet-cert",
                },
                Address: {
                    AddressPool: "ethernet-pool",
                },
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN server in ethernet mode",
                { config, vsNetwork, subnetConfig },
                () => OVPNServer(config, vsNetwork, subnetConfig),
            );

            const result = OVPNServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle disabled server configuration", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-disabled",
                enabled: false,
                Port: 1197,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "disabled-cert",
                },
                Address: {
                    AddressPool: "disabled-pool",
                },
            };

            testWithOutput(
                "OVPNServer",
                "Disabled OpenVPN server",
                { config, vsNetwork, subnetConfig },
                () => OVPNServer(config, vsNetwork, subnetConfig),
            );

            const result = OVPNServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle custom keepalive and redirect gateway", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-custom",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                KeepaliveTimeout: 120,
                RedirectGetway: "def1",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "custom-cert",
                },
                Address: {
                    AddressPool: "custom-pool",
                    MaxMtu: 1400,
                },
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN with custom keepalive and redirect",
                { config, vsNetwork, subnetConfig },
                () => OVPNServer(config, vsNetwork, subnetConfig),
            );

            const result = OVPNServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });

    describe("OVPNServerUsers Function", () => {
        it("should generate OpenVPN user credentials", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-server",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "server-cert",
                },
                Address: {
                    AddressPool: "ovpn-pool",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "ovpnuser1",
                    Password: "ovpnpass1",
                    VPNType: ["OpenVPN"],
                },
                {
                    Username: "ovpnuser2",
                    Password: "ovpnpass2",
                    VPNType: ["OpenVPN"],
                },
            ];

            testWithOutput(
                "OVPNServerUsers",
                "OpenVPN users configuration",
                { config, users },
                () => OVPNServerUsers(config, users),
            );

            const result = OVPNServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should filter only OpenVPN users", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-filter",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "filter-cert",
                },
                Address: {
                    AddressPool: "filter-pool",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "ovpnuser",
                    Password: "pass1",
                    VPNType: ["OpenVPN"],
                },
                {
                    Username: "wireguarduser",
                    Password: "pass2",
                    VPNType: ["Wireguard"],
                },
                {
                    Username: "multiuser",
                    Password: "pass3",
                    VPNType: ["OpenVPN", "L2TP"],
                },
            ];

            testWithOutput(
                "OVPNServerUsers",
                "Filter only OpenVPN users",
                { config, users },
                () => OVPNServerUsers(config, users),
            );

            const result = OVPNServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle empty users array", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-empty",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "empty-cert",
                },
                Address: {
                    AddressPool: "empty-pool",
                },
            };
            const users: VSCredentials[] = [];

            testWithOutput(
                "OVPNServerUsers",
                "OpenVPN with no users",
                { config, users },
                () => OVPNServerUsers(config, users),
            );

            const result = OVPNServerUsers(config, users);
            validateRouterConfigStructure(result);
        });

        it("should handle many users efficiently", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-many",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "many-cert",
                },
                Address: {
                    AddressPool: "many-pool",
                },
            };

            const users: VSCredentials[] = Array.from({ length: 30 }, (_, i) => ({
                Username: `ovpn_user${i + 1}`,
                Password: `ovpn_pass${i + 1}`,
                VPNType: ["OpenVPN"],
            }));

            testWithOutput(
                "OVPNServerUsers",
                "OpenVPN with multiple users",
                { config, users: `Array of ${users.length} users` },
                () => OVPNServerUsers(config, users),
            );

            const result = OVPNServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });

        it("should handle users with special characters", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-special",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "special-cert",
                },
                Address: {
                    AddressPool: "special-pool",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user-ovpn.01",
                    Password: "P@ssw0rd!OVPN#2024",
                    VPNType: ["OpenVPN"],
                },
                {
                    Username: "admin_ovpn_secure",
                    Password: "Str0ng&OVPN*Pass",
                    VPNType: ["OpenVPN"],
                },
            ];

            testWithOutput(
                "OVPNServerUsers",
                "OpenVPN users with special characters",
                { config, users },
                () => OVPNServerUsers(config, users),
            );

            const result = OVPNServerUsers(config, users);
            validateRouterConfig(result, ["/ppp secret"]);
        });
    });

    describe("OVPNVSBinding Function", () => {
        it("should generate OpenVPN interface bindings", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "binduser1",
                    Password: "bindpass1",
                    VPNType: ["OpenVPN"],
                },
                {
                    Username: "binduser2",
                    Password: "bindpass2",
                    VPNType: ["OpenVPN"],
                },
            ];

            testWithOutput(
                "OVPNVSBinding",
                "OpenVPN interface bindings",
                { credentials, VSNetwork: vsNetwork },
                () => OVPNVSBinding(credentials, vsNetwork),
            );

            const result = OVPNVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface ovpn-server"]);
        });

        it("should handle different network types for binding", () => {
            const credentials: VSCredentials[] = [
                {
                    Username: "foreignuser",
                    Password: "foreignpass",
                    VPNType: ["OpenVPN"],
                },
            ];

            testWithOutput(
                "OVPNVSBinding",
                "OpenVPN bindings for Foreign network",
                { credentials, VSNetwork: "Foreign" },
                () => OVPNVSBinding(credentials, "Foreign"),
            );

            const result = OVPNVSBinding(credentials, "Foreign");
            validateRouterConfigStructure(result);
        });

        it("should handle empty credentials", () => {
            const credentials: VSCredentials[] = [];

            testWithOutput(
                "OVPNVSBinding",
                "OpenVPN bindings with no credentials",
                { credentials, VSNetwork: vsNetwork },
                () => OVPNVSBinding(credentials, vsNetwork),
            );

            const result = OVPNVSBinding(credentials, vsNetwork);
            validateRouterConfigStructure(result);
        });

        it("should handle multiple users for binding", () => {
            const credentials: VSCredentials[] = Array.from({ length: 20 }, (_, i) => ({
                Username: `binduser${i + 1}`,
                Password: `bindpass${i + 1}`,
                VPNType: ["OpenVPN"],
            }));

            testWithOutput(
                "OVPNVSBinding",
                "OpenVPN bindings with many users",
                { credentials: `Array of ${credentials.length} users`, VSNetwork: vsNetwork },
                () => OVPNVSBinding(credentials, vsNetwork),
            );

            const result = OVPNVSBinding(credentials, vsNetwork);
            validateRouterConfig(result, ["/interface ovpn-server"]);
        });
    });

    describe("OVPNServerFirewall Function", () => {
        it("should generate firewall rules for OpenVPN server", () => {
            const serverConfigs: OpenVpnServerConfig[] = [
                {
                    name: "ovpn-fw",
                    enabled: true,
                    Port: 1194,
                    Protocol: "udp",
                    Mode: "ip",
                    Encryption: {
                        Auth: ["sha256"],
                        Cipher: ["aes256-cbc"],
                    },
                    Certificate: {
                        Certificate: "fw-cert",
                    },
                    Address: {
                        AddressPool: "fw-pool",
                    },
                },
            ];

            testWithOutput(
                "OVPNServerFirewall",
                "Firewall rules for OpenVPN",
                { serverConfigs },
                () => OVPNServerFirewall(serverConfigs),
            );

            const result = OVPNServerFirewall(serverConfigs);
            validateRouterConfig(result, ["/ip firewall filter", "/ip firewall mangle"]);
        });

        it("should generate rules for multiple OpenVPN servers", () => {
            const serverConfigs: OpenVpnServerConfig[] = [
                {
                    name: "ovpn-primary",
                    Port: 1194,
                    Protocol: "udp",
                },
                {
                    name: "ovpn-secondary",
                    Port: 443,
                    Protocol: "tcp",
                },
            ];

            testWithOutput(
                "OVPNServerFirewall",
                "Firewall rules for multiple OpenVPN servers",
                { serverConfigs },
                () => OVPNServerFirewall(serverConfigs),
            );

            const result = OVPNServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });

        it("should handle empty server configs array", () => {
            const serverConfigs: OpenVpnServerConfig[] = [];

            testWithOutput(
                "OVPNServerFirewall",
                "Firewall with no OpenVPN servers",
                { serverConfigs },
                () => OVPNServerFirewall(serverConfigs),
            );

            const result = OVPNServerFirewall(serverConfigs);
            validateRouterConfigStructure(result);
        });
    });

    describe("SingleOVPNWrapper Function", () => {
        it("should generate complete single OpenVPN configuration", () => {
            const serverConfig: OpenVpnServerConfig = {
                name: "ovpn-single",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "single-cert",
                },
                Address: {
                    AddressPool: "single-pool",
                },
            };

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["OpenVPN"],
                },
            ];

            testWithOutput(
                "SingleOVPNWrapper",
                "Complete single OpenVPN server setup",
                { serverConfig, users, vsNetwork, subnetConfig },
                () => SingleOVPNWrapper(serverConfig, users, vsNetwork, subnetConfig),
            );

            const result = SingleOVPNWrapper(serverConfig, users, vsNetwork, subnetConfig);
            validateRouterConfig(result);
        });

        it("should handle configuration with no users", () => {
            const serverConfig: OpenVpnServerConfig = {
                name: "ovpn-nouser",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "nouser-cert",
                },
                Address: {
                    AddressPool: "nouser-pool",
                },
            };

            testWithOutput(
                "SingleOVPNWrapper",
                "Single OpenVPN server without users",
                { serverConfig, vsNetwork, subnetConfig },
                () => SingleOVPNWrapper(serverConfig, [], vsNetwork, subnetConfig),
            );

            const result = SingleOVPNWrapper(serverConfig, [], vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });
    });

    describe("OVPNServerWrapper Function", () => {
        it("should generate complete OpenVPN configuration", () => {
            const serverConfigs: OpenVpnServerConfig[] = [
                {
                    name: "ovpn-main",
                    enabled: true,
                    Port: 1194,
                    Protocol: "udp",
                    Mode: "ip",
                    Encryption: {
                        Auth: ["sha256"],
                        Cipher: ["aes256-cbc"],
                    },
                    Certificate: {
                        Certificate: "main-cert",
                    },
                    Address: {
                        AddressPool: "main-pool",
                    },
                },
            ];

            const users: VSCredentials[] = [
                {
                    Username: "user1",
                    Password: "pass1",
                    VPNType: ["OpenVPN"],
                },
                {
                    Username: "user2",
                    Password: "pass2",
                    VPNType: ["OpenVPN"],
                },
            ];

            const subnetConfigs: SubnetConfig[] = [
                {
                    name: "ovpn-main",
                    subnet: "10.8.0.0/24",
                },
            ];

            testWithOutput(
                "OVPNServerWrapper",
                "Complete OpenVPN server setup",
                { serverConfigs, users, subnetConfigs },
                () => OVPNServerWrapper(serverConfigs, users, subnetConfigs),
            );

            const result = OVPNServerWrapper(serverConfigs, users, subnetConfigs);
            validateRouterConfig(result);
        });

        it("should handle multiple OpenVPN servers", () => {
            const serverConfigs: OpenVpnServerConfig[] = [
                {
                    name: "ovpn-primary",
                    enabled: true,
                    Port: 1194,
                    Protocol: "udp",
                    Mode: "ip",
                    Encryption: {
                        Auth: ["sha256"],
                        Cipher: ["aes256-cbc"],
                    },
                    Certificate: {
                        Certificate: "primary-cert",
                    },
                    Address: {
                        AddressPool: "primary-pool",
                    },
                },
                {
                    name: "ovpn-secondary",
                    enabled: true,
                    Port: 443,
                    Protocol: "tcp",
                    Mode: "ip",
                    Encryption: {
                        Auth: ["sha512"],
                        Cipher: ["aes256-gcm"],
                    },
                    Certificate: {
                        Certificate: "secondary-cert",
                    },
                    Address: {
                        AddressPool: "secondary-pool",
                    },
                },
            ];

            const subnetConfigs: SubnetConfig[] = [
                {
                    name: "ovpn-primary",
                    subnet: "10.8.0.0/24",
                },
                {
                    name: "ovpn-secondary",
                    subnet: "10.9.0.0/24",
                },
            ];

            testWithOutput(
                "OVPNServerWrapper",
                "Multiple OpenVPN servers",
                { serverConfigs: `${serverConfigs.length} servers`, subnetConfigs },
                () => OVPNServerWrapper(serverConfigs, [], subnetConfigs),
            );

            const result = OVPNServerWrapper(serverConfigs, [], subnetConfigs);
            validateRouterConfig(result);
        });

        it("should handle configuration with many users", () => {
            const serverConfigs: OpenVpnServerConfig[] = [
                {
                    name: "ovpn-production",
                    enabled: true,
                    Port: 1194,
                    Protocol: "udp",
                    Mode: "ip",
                    Encryption: {
                        Auth: ["sha512", "sha384", "sha256"],
                        Cipher: ["aes256-gcm", "aes256-cbc"],
                    },
                    Certificate: {
                        Certificate: "prod-cert",
                    },
                    Address: {
                        AddressPool: "prod-pool",
                    },
                },
            ];

            const users: VSCredentials[] = Array.from({ length: 25 }, (_, i) => ({
                Username: `ovpnuser${i + 1}`,
                Password: `pass${i + 1}`,
                VPNType: ["OpenVPN"],
            }));

            const subnetConfigs: SubnetConfig[] = [
                {
                    name: "ovpn-production",
                    subnet: "10.8.0.0/24",
                },
            ];

            testWithOutput(
                "OVPNServerWrapper",
                "Complex OpenVPN setup with many users",
                {
                    serverConfigs: `${serverConfigs.length} servers`,
                    users: `${users.length} users`,
                    subnetConfigs,
                },
                () => OVPNServerWrapper(serverConfigs, users, subnetConfigs),
            );

            const result = OVPNServerWrapper(serverConfigs, users, subnetConfigs);
            validateRouterConfig(result);
        });

        it("should handle empty server configuration array", () => {
            const serverConfigs: OpenVpnServerConfig[] = [];
            const users: VSCredentials[] = [
                {
                    Username: "orphanuser",
                    Password: "orphanpass",
                    VPNType: ["OpenVPN"],
                },
            ];
            const subnetConfigs: SubnetConfig[] = [];

            testWithOutput(
                "OVPNServerWrapper",
                "Empty OpenVPN configuration with users",
                { serverConfigs, users, subnetConfigs },
                () => OVPNServerWrapper(serverConfigs, users, subnetConfigs),
            );

            const result = OVPNServerWrapper(serverConfigs, users, subnetConfigs);
            validateRouterConfigStructure(result);
        });
    });

    describe("Edge Cases and Error Scenarios", () => {
        it("should handle non-standard ports", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-custom-port",
                enabled: true,
                Port: 8080,
                Protocol: "tcp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "custom-port-cert",
                },
                Address: {
                    AddressPool: "custom-port-pool",
                },
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN with custom port 8080",
                { config, vsNetwork, subnetConfig },
                () => OVPNServer(config, vsNetwork, subnetConfig),
            );

            const result = OVPNServer(config, vsNetwork, subnetConfig);
            validateRouterConfigStructure(result);
        });

        it("should handle very small subnet", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-small",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "small-cert",
                },
                Address: {
                    AddressPool: "small-pool",
                },
            };
            const smallSubnet: SubnetConfig = {
                name: "ovpn-small",
                subnet: "10.10.10.0/30",
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN with /30 subnet",
                { config, vsNetwork, smallSubnet },
                () => OVPNServer(config, vsNetwork, smallSubnet),
            );

            const result = OVPNServer(config, vsNetwork, smallSubnet);
            validateRouterConfigStructure(result);
        });

        it("should handle large subnet", () => {
            const config: OpenVpnServerConfig = {
                name: "ovpn-large",
                enabled: true,
                Port: 1194,
                Protocol: "udp",
                Mode: "ip",
                Encryption: {
                    Auth: ["sha256"],
                    Cipher: ["aes256-cbc"],
                },
                Certificate: {
                    Certificate: "large-cert",
                },
                Address: {
                    AddressPool: "large-pool",
                },
            };
            const largeSubnet: SubnetConfig = {
                name: "ovpn-large",
                subnet: "10.0.0.0/16",
            };

            testWithOutput(
                "OVPNServer",
                "OpenVPN with /16 subnet",
                { config, vsNetwork, largeSubnet },
                () => OVPNServer(config, vsNetwork, largeSubnet),
            );

            const result = OVPNServer(config, vsNetwork, largeSubnet);
            validateRouterConfigStructure(result);
        });
    });
});
