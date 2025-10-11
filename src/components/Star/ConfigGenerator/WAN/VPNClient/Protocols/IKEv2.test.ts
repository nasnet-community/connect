import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    testWithGenericOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    IKeV2Profile,
    IKeV2Proposal,
    IKeV2Peer,
    IKeV2Identity,
    IKeV2Policy,
    IKeV2ModeConfig,
    IKeV2Client,
    IKeV2ClientWrapper,
} from "./IKEv2";
import type { Ike2ClientConfig } from "~/components/Star/StarContext";

describe("IKEv2 Protocol Module", () => {
    const baseConfig: Ike2ClientConfig = {
        Name: "ikev2-test",
        ServerAddress: "ikev2.example.com",
        AuthMethod: "pre-shared-key",
        PresharedKey: "shared-secret-key",
        EncAlgorithm: ["aes-256", "aes-128"],
        HashAlgorithm: ["sha256", "sha1"],
        DhGroup: ["modp2048", "modp1536"],
        Lifetime: "8h",
        NatTraversal: true,
        DpdInterval: "10m",
        PfsGroup: "modp2048",
        ProposalLifetime: "30m",
    };

    describe("IKeV2Profile", () => {
        it("should generate IPsec profile with all parameters", () => {
            const result = testWithGenericOutput(
                "IKeV2Profile",
                "IPsec profile with complete configuration",
                { config: baseConfig, profileName: "test-profile" },
                () => IKeV2Profile(baseConfig, "test-profile"),
            );

            expect(result).toContain("name=test-profile");
            expect(result).toContain("enc-algorithm=aes-256,aes-128");
            expect(result).toContain("hash-algorithm=sha256,sha1");
            expect(result).toContain("dh-group=modp2048,modp1536");
            expect(result).toContain("lifetime=8h");
            expect(result).toContain("nat-traversal=yes");
            expect(result).toContain("dpd-interval=10m");
        });

        it("should use default values when not provided", () => {
            const minimalConfig: Ike2ClientConfig = {
                Name: "minimal",
                ServerAddress: "minimal.example.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key123",
            };

            const result = testWithGenericOutput(
                "IKeV2Profile",
                "IPsec profile with default values",
                { config: minimalConfig, profileName: "minimal-profile" },
                () => IKeV2Profile(minimalConfig, "minimal-profile"),
            );

            expect(result).toContain("name=minimal-profile");
            expect(result).toContain("enc-algorithm=aes-256,aes-192,aes-128");
            expect(result).toContain("hash-algorithm=sha256,sha1");
            expect(result).toContain("dh-group=modp2048,modp1536");
            expect(result).toContain("lifetime=8h");
            expect(result).toContain("nat-traversal=yes");
        });

        it("should disable NAT traversal when configured", () => {
            const configNoNat: Ike2ClientConfig = {
                ...baseConfig,
                NatTraversal: false,
            };

            const result = testWithGenericOutput(
                "IKeV2Profile",
                "IPsec profile with NAT traversal disabled",
                { config: configNoNat },
                () => IKeV2Profile(configNoNat, "no-nat-profile"),
            );

            expect(result).toContain("nat-traversal=no");
        });

        it("should omit dpd-interval when not provided", () => {
            const configNoDpd: Ike2ClientConfig = {
                Name: "test",
                ServerAddress: "test.example.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key",
            };

            const result = testWithGenericOutput(
                "IKeV2Profile",
                "IPsec profile without DPD interval",
                { config: configNoDpd },
                () => IKeV2Profile(configNoDpd, "no-dpd-profile"),
            );

            expect(result).not.toContain("dpd-interval");
        });
    });

    describe("IKeV2Proposal", () => {
        it("should generate IPsec proposal for Phase 2", () => {
            const result = testWithGenericOutput(
                "IKeV2Proposal",
                "IPsec proposal with Phase 2 parameters",
                { config: baseConfig, proposalName: "test-proposal" },
                () => IKeV2Proposal(baseConfig, "test-proposal"),
            );

            expect(result).toContain("name=test-proposal");
            expect(result).toContain("pfs-group=modp2048");
            expect(result).toContain("enc-algorithms=aes-256-cbc,aes-128-cbc");
            expect(result).toContain("auth-algorithms=sha256,sha1");
            expect(result).toContain("lifetime=30m");
        });

        it("should convert encryption algorithms to CBC mode", () => {
            const config: Ike2ClientConfig = {
                Name: "test",
                ServerAddress: "test.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key",
                EncAlgorithm: ["aes-192", "aes-256", "aes-128"],
            };

            const result = testWithGenericOutput(
                "IKeV2Proposal",
                "Algorithm conversion to CBC mode",
                { config },
                () => IKeV2Proposal(config, "cbc-proposal"),
            );

            expect(result).toContain("enc-algorithms=aes-192-cbc,aes-256-cbc,aes-128-cbc");
        });

        it("should use default PFS group and lifetime", () => {
            const minimalConfig: Ike2ClientConfig = {
                Name: "minimal",
                ServerAddress: "minimal.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key",
            };

            const result = testWithGenericOutput(
                "IKeV2Proposal",
                "Proposal with default PFS group",
                { config: minimalConfig },
                () => IKeV2Proposal(minimalConfig, "default-proposal"),
            );

            expect(result).toContain("pfs-group=modp2048");
            expect(result).toContain("lifetime=30m");
        });
    });

    describe("IKeV2Peer", () => {
        it("should generate IPsec peer configuration", () => {
            const result = testWithGenericOutput(
                "IKeV2Peer",
                "IPsec peer with standard configuration",
                {
                    config: baseConfig,
                    peerName: "test-peer",
                    profileName: "test-profile",
                },
                () => IKeV2Peer(baseConfig, "test-peer", "test-profile"),
            );

            expect(result).toContain("name=test-peer");
            expect(result).toContain("address=ikev2.example.com");
            expect(result).toContain("profile=test-profile");
            expect(result).toContain("exchange-mode=ike2");
            expect(result).toContain("send-initial-contact=yes");
        });

        it("should include custom port when provided", () => {
            const configWithPort: Ike2ClientConfig = {
                ...baseConfig,
                Port: 4500,
            };

            const result = testWithGenericOutput(
                "IKeV2Peer",
                "IPsec peer with custom port",
                { config: configWithPort },
                () => IKeV2Peer(configWithPort, "peer-port", "profile"),
            );

            expect(result).toContain("port=4500");
        });

        it("should omit port when not provided or default", () => {
            const result = testWithGenericOutput(
                "IKeV2Peer",
                "IPsec peer without custom port",
                { config: baseConfig },
                () => IKeV2Peer(baseConfig, "peer-no-port", "profile"),
            );

            expect(result).not.toContain("port=");
        });

        it("should include local address when provided", () => {
            const configWithLocal: Ike2ClientConfig = {
                ...baseConfig,
                LocalAddress: "192.168.1.100",
            };

            const result = testWithGenericOutput(
                "IKeV2Peer",
                "IPsec peer with local address",
                { config: configWithLocal },
                () => IKeV2Peer(configWithLocal, "peer-local", "profile"),
            );

            expect(result).toContain("local-address=192.168.1.100");
        });

        it("should disable send-initial-contact when configured", () => {
            const configNoContact: Ike2ClientConfig = {
                ...baseConfig,
                SendInitialContact: false,
            };

            const result = testWithGenericOutput(
                "IKeV2Peer",
                "IPsec peer with send-initial-contact disabled",
                { config: configNoContact },
                () => IKeV2Peer(configNoContact, "peer-no-contact", "profile"),
            );

            expect(result).toContain("send-initial-contact=no");
        });
    });

    describe("IKeV2Identity", () => {
        it("should generate identity with pre-shared key", () => {
            const result = testWithGenericOutput(
                "IKeV2Identity",
                "IPsec identity with pre-shared key",
                {
                    config: baseConfig,
                    peerName: "peer",
                    modeConfigName: "modeconf",
                    policyGroupName: "policies",
                },
                () => IKeV2Identity(baseConfig, "peer", "modeconf", "policies"),
            );

            expect(result).toContain("peer=peer");
            expect(result).toContain("auth-method=pre-shared-key");
            expect(result).toContain('secret="shared-secret-key"');
            expect(result).toContain("mode-config=modeconf");
            expect(result).toContain("policy-template-group=policies");
        });

        it("should generate identity with EAP authentication", () => {
            const eapConfig: Ike2ClientConfig = {
                Name: "eap-test",
                ServerAddress: "eap.example.com",
                AuthMethod: "eap",
                Credentials: { Username: "testuser", Password: "testpass" },
                EapMethods: ["eap-mschapv2"],
                ClientCertificateName: "client-cert",
            };

            const result = testWithGenericOutput(
                "IKeV2Identity",
                "IPsec identity with EAP authentication",
                { config: eapConfig },
                () =>
                    IKeV2Identity(eapConfig, "eap-peer", "eap-modeconf", "eap-policies"),
            );

            expect(result).toContain("auth-method=eap");
            expect(result).toContain("eap-methods=eap-mschapv2");
            expect(result).toContain('username="testuser"');
            expect(result).toContain('password="testpass"');
            expect(result).toContain("certificate=client-cert");
        });

        it("should generate identity with digital signature", () => {
            const certConfig: Ike2ClientConfig = {
                Name: "cert-test",
                ServerAddress: "cert.example.com",
                AuthMethod: "digital-signature",
                ClientCertificateName: "my-client-cert",
            };

            const result = testWithGenericOutput(
                "IKeV2Identity",
                "IPsec identity with digital signature",
                { config: certConfig },
                () =>
                    IKeV2Identity(
                        certConfig,
                        "cert-peer",
                        "cert-modeconf",
                        "cert-policies",
                    ),
            );

            expect(result).toContain("auth-method=digital-signature");
            expect(result).toContain("certificate=my-client-cert");
        });

        it("should use custom ID values when provided", () => {
            const configWithIds: Ike2ClientConfig = {
                ...baseConfig,
                MyIdType: "fqdn",
                MyId: "client.example.com",
                RemoteIdType: "fqdn",
                RemoteId: "server.example.com",
            };

            const result = testWithGenericOutput(
                "IKeV2Identity",
                "IPsec identity with custom IDs",
                { config: configWithIds },
                () => IKeV2Identity(configWithIds, "peer", "modeconf", "policies"),
            );

            expect(result).toContain("my-id=fqdn:client.example.com");
            expect(result).toContain("remote-id=fqdn:server.example.com");
        });

        it("should use auto and FQDN defaults for IDs", () => {
            const result = testWithGenericOutput(
                "IKeV2Identity",
                "IPsec identity with default IDs",
                { config: baseConfig },
                () => IKeV2Identity(baseConfig, "peer", "modeconf", "policies"),
            );

            expect(result).toContain("my-id=auto");
            expect(result).toContain("remote-id=fqdn:ikev2.example.com");
        });

        it("should use custom generate-policy value", () => {
            const configWithPolicy: Ike2ClientConfig = {
                ...baseConfig,
                GeneratePolicy: "port-override",
            };

            const result = testWithGenericOutput(
                "IKeV2Identity",
                "IPsec identity with custom generate-policy",
                { config: configWithPolicy },
                () => IKeV2Identity(configWithPolicy, "peer", "modeconf", "policies"),
            );

            expect(result).toContain("generate-policy=port-override");
        });

        it("should throw error when EAP missing credentials", () => {
            const invalidConfig: Ike2ClientConfig = {
                Name: "invalid",
                ServerAddress: "test.com",
                AuthMethod: "eap",
            };

            expect(() => IKeV2Identity(invalidConfig, "peer", "mc", "pg")).toThrow(
                "Credentials are required when AuthMethod is eap",
            );
        });

        it("should throw error when digital-signature missing certificate", () => {
            const invalidConfig: Ike2ClientConfig = {
                Name: "invalid",
                ServerAddress: "test.com",
                AuthMethod: "digital-signature",
            };

            expect(() => IKeV2Identity(invalidConfig, "peer", "mc", "pg")).toThrow(
                "ClientCertificateName is required when AuthMethod is digital-signature",
            );
        });
    });

    describe("IKeV2Policy", () => {
        it("should generate IPsec policy template", () => {
            const result = testWithGenericOutput(
                "IKeV2Policy",
                "IPsec policy template with defaults",
                {
                    config: baseConfig,
                    policyGroupName: "test-policies",
                    proposalName: "test-proposal",
                },
                () => IKeV2Policy(baseConfig, "test-policies", "test-proposal"),
            );

            expect(result).toContain("group=test-policies");
            expect(result).toContain("template=yes");
            expect(result).toContain("src-address=0.0.0.0/0");
            expect(result).toContain("dst-address=0.0.0.0/0");
            expect(result).toContain("proposal=test-proposal");
            expect(result).toContain("action=encrypt");
            expect(result).toContain("level=require");
        });

        it("should use custom policy addresses", () => {
            const customConfig: Ike2ClientConfig = {
                ...baseConfig,
                PolicySrcAddress: "192.168.1.0/24",
                PolicyDstAddress: "10.0.0.0/8",
            };

            const result = testWithGenericOutput(
                "IKeV2Policy",
                "IPsec policy with custom addresses",
                { config: customConfig },
                () => IKeV2Policy(customConfig, "custom-policies", "proposal"),
            );

            expect(result).toContain("src-address=192.168.1.0/24");
            expect(result).toContain("dst-address=10.0.0.0/8");
        });

        it("should use custom policy action and level", () => {
            const customConfig: Ike2ClientConfig = {
                ...baseConfig,
                PolicyAction: "none",
                PolicyLevel: "use",
            };

            const result = testWithGenericOutput(
                "IKeV2Policy",
                "IPsec policy with custom action and level",
                { config: customConfig },
                () => IKeV2Policy(customConfig, "policies", "proposal"),
            );

            expect(result).toContain("action=none");
            expect(result).toContain("level=use");
        });
    });

    describe("IKeV2ModeConfig", () => {
        it("should generate mode config when enabled", () => {
            const result = testWithGenericOutput(
                "IKeV2ModeConfig",
                "IPsec mode config when enabled",
                { config: baseConfig, modeConfigName: "test-modeconf" },
                () => IKeV2ModeConfig(baseConfig, "test-modeconf"),
            );

            expect(result).toContain("name=test-modeconf");
            expect(result).toContain("responder=no");
        });

        it("should return null when mode config disabled", () => {
            const disabledConfig: Ike2ClientConfig = {
                ...baseConfig,
                EnableModeConfig: false,
            };

            const result = testWithGenericOutput(
                "IKeV2ModeConfig",
                "IPsec mode config when disabled",
                { config: disabledConfig },
                () => IKeV2ModeConfig(disabledConfig, "disabled-modeconf"),
            );

            expect(result).toBeNull();
        });

        it("should include src-address-list when provided", () => {
            const configWithSrcList: Ike2ClientConfig = {
                ...baseConfig,
                SrcAddressList: "vpn-clients",
            };

            const result = testWithGenericOutput(
                "IKeV2ModeConfig",
                "IPsec mode config with src-address-list",
                { config: configWithSrcList },
                () => IKeV2ModeConfig(configWithSrcList, "modeconf-srclist"),
            );

            expect(result).toContain("src-address-list=vpn-clients");
        });

        it("should include connection-mark when provided", () => {
            const configWithMark: Ike2ClientConfig = {
                ...baseConfig,
                ConnectionMark: "vpn-mark",
            };

            const result = testWithGenericOutput(
                "IKeV2ModeConfig",
                "IPsec mode config with connection-mark",
                { config: configWithMark },
                () => IKeV2ModeConfig(configWithMark, "modeconf-mark"),
            );

            expect(result).toContain("connection-mark=vpn-mark");
        });
    });

    describe("IKeV2Client", () => {
        it("should configure complete IKeV2 client", () => {
            const config: Ike2ClientConfig = {
                Name: "complete",
                ServerAddress: "ikev2.complete.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "shared-secret",
                EncAlgorithm: ["aes-256"],
                HashAlgorithm: ["sha256"],
                DhGroup: ["modp2048"],
            };

            const result = testWithOutput(
                "IKeV2Client",
                "Complete IKeV2 client configuration",
                { config },
                () => IKeV2Client(config),
            );

            validateRouterConfig(result, [
                "/ip ipsec profile",
                "/ip ipsec proposal",
                "/ip ipsec peer",
                "/ip ipsec identity",
                "/ip ipsec policy",
                "/ip ipsec policy group",
                "/ip ipsec mode-config",
            ]);

            expect(result["/ip ipsec profile"][0]).toContain("name=ike2-profile");
            expect(result["/ip ipsec proposal"][0]).toContain("name=ike2-proposal");
            expect(result["/ip ipsec peer"][0]).toContain("name=ike2-peer");
        });

        it("should use custom component names", () => {
            const config: Ike2ClientConfig = {
                Name: "custom",
                ServerAddress: "custom.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key",
                ProfileName: "my-profile",
                PeerName: "my-peer",
                ProposalName: "my-proposal",
                PolicyGroupName: "my-policies",
                ModeConfigName: "my-modeconf",
            };

            const result = testWithOutput(
                "IKeV2Client",
                "IKeV2 client with custom component names",
                { config },
                () => IKeV2Client(config),
            );

            expect(result["/ip ipsec profile"][0]).toContain("name=my-profile");
            expect(result["/ip ipsec proposal"][0]).toContain("name=my-proposal");
            expect(result["/ip ipsec peer"][0]).toContain("name=my-peer");
            expect(result["/ip ipsec policy group"][0]).toContain("name=my-policies");
        });

        it("should omit mode-config section when disabled", () => {
            const config: Ike2ClientConfig = {
                Name: "no-mc",
                ServerAddress: "test.com",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key",
                EnableModeConfig: false,
            };

            const result = testWithOutput(
                "IKeV2Client",
                "IKeV2 client without mode-config",
                { config },
                () => IKeV2Client(config),
            );

            expect(result["/ip ipsec mode-config"]).toEqual([]);
        });
    });

    describe("IKeV2ClientWrapper", () => {
        it("should configure single IKeV2 client with base config", () => {
            const configs: Ike2ClientConfig[] = [
                {
                    Name: "vpn1",
                    ServerAddress: "ikev2.example.com",
                    AuthMethod: "pre-shared-key",
                    PresharedKey: "secret123",
                },
            ];

            const result = testWithOutput(
                "IKeV2ClientWrapper",
                "Single IKeV2 client with base configuration",
                { configs },
                () => IKeV2ClientWrapper(configs),
            );

            validateRouterConfig(result, [
                "/ip ipsec profile",
                "/ip ipsec peer",
                "/ip ipsec identity",
                "/interface list member",
                "/ip route",
                "/ip firewall address-list",
                "/ip firewall mangle",
            ]);

            // Check base config is included
            expect(result["/interface list member"]).toBeDefined();
            expect(result["/ip route"]).toBeDefined();
        });

        it("should configure multiple IKeV2 clients", () => {
            const configs: Ike2ClientConfig[] = [
                {
                    Name: "vpn1",
                    ServerAddress: "ikev2-1.example.com",
                    AuthMethod: "pre-shared-key",
                    PresharedKey: "secret1",
                },
                {
                    Name: "vpn2",
                    ServerAddress: "ikev2-2.example.com",
                    AuthMethod: "pre-shared-key",
                    PresharedKey: "secret2",
                },
            ];

            const result = testWithOutput(
                "IKeV2ClientWrapper",
                "Multiple IKeV2 clients configuration",
                { configs },
                () => IKeV2ClientWrapper(configs),
            );

            // Should have configuration for both clients
            expect(result["/ip ipsec peer"].length).toBeGreaterThanOrEqual(2);
            expect(result["/interface list member"].length).toBeGreaterThanOrEqual(4); // 2 per client
        });

        it("should generate correct interface names", () => {
            const configs: Ike2ClientConfig[] = [
                {
                    Name: "test-vpn",
                    ServerAddress: "test.com",
                    AuthMethod: "pre-shared-key",
                    PresharedKey: "key",
                },
            ];

            const result = testWithOutput(
                "IKeV2ClientWrapper",
                "IKeV2 client with interface name generation",
                { configs },
                () => IKeV2ClientWrapper(configs),
            );

            // Check that interface name follows naming convention
            const hasCorrectInterface = result["/interface list member"].some(
                (cmd) => cmd.includes('interface="ike2-client-test-vpn"'),
            );
            expect(hasCorrectInterface).toBe(true);
        });

        it("should route endpoint through correct routing table", () => {
            const configs: Ike2ClientConfig[] = [
                {
                    Name: "route-test",
                    ServerAddress: "1.2.3.4",
                    AuthMethod: "pre-shared-key",
                    PresharedKey: "key",
                },
            ];

            const result = testWithOutput(
                "IKeV2ClientWrapper",
                "IKeV2 client with endpoint routing",
                { configs },
                () => IKeV2ClientWrapper(configs),
            );

            // Check endpoint is in address list
            const hasEndpoint = result["/ip firewall address-list"].some(
                (cmd) => cmd.includes('address="1.2.3.4"'),
            );
            expect(hasEndpoint).toBe(true);

            // Check mangle rules exist for endpoint routing
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should return empty config for empty array", () => {
            const result = testWithOutput(
                "IKeV2ClientWrapper",
                "Empty configuration array",
                { configs: [] },
                () => IKeV2ClientWrapper([]),
            );

            expect(result).toBeDefined();
            expect(Object.keys(result)).toHaveLength(0);
        });
    });
});
