import { describe, expect, it } from "vitest";

import type { Ike2ClientConfig } from "~/components/Star/StarContext";

import {
    IKeV2Client,
    IKeV2ClientWrapper,
    IKeV2Identity,
    IKeV2ModeConfig,
    IKeV2Peer,
    IKeV2Policy,
    IKeV2Profile,
    IKeV2Proposal,
} from "./IKEv2";

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

describe("IKEv2", () => {
    // Verifies the phase-1 profile builder preserves configured encryption and DH values while using the current fixed `sha1` hash output.
    it("builds the IKEv2 profile with current phase-1 defaults and overrides", () => {
        const result = IKeV2Profile(baseConfig, "test-profile");

        expect(result).toContain("name=test-profile");
        expect(result).toContain("enc-algorithm=aes-256,aes-128");
        expect(result).toContain("hash-algorithm=sha1");
        expect(result).toContain("dh-group=modp2048,modp1536");
        expect(result).toContain("lifetime=8h");
        expect(result).toContain("nat-traversal=yes");
        expect(result).toContain("dpd-interval=10m");
    });

    // Verifies the phase-2 proposal converts AES names into the RouterOS CBC form and keeps the configured auth algorithms.
    it("builds the phase-2 proposal with CBC algorithm conversion", () => {
        const result = IKeV2Proposal(baseConfig, "test-proposal");

        expect(result).toContain("name=test-proposal");
        expect(result).toContain("pfs-group=modp2048");
        expect(result).toContain("enc-algorithms=aes-256-cbc,aes-128-cbc");
        expect(result).toContain("auth-algorithms=sha256,sha1");
        expect(result).toContain("lifetime=30m");
    });

    // Verifies peer generation includes the IKEv2 exchange mode and conditionally appends local-address and non-default port values.
    it("builds peer commands with optional port and local-address fields", () => {
        const result = IKeV2Peer(
            {
                ...baseConfig,
                Port: 4500,
                LocalAddress: "192.168.1.100",
                SendInitialContact: false,
            },
            "peer-name",
            "profile-name",
        );

        expect(result).toContain("name=peer-name");
        expect(result).toContain("address=ikev2.example.com");
        expect(result).toContain("profile=profile-name");
        expect(result).toContain("exchange-mode=ike2");
        expect(result).toContain("port=4500");
        expect(result).toContain("local-address=192.168.1.100");
        expect(result).toContain("send-initial-contact=no");
    });

    // Verifies pre-shared-key identities append the current mode-config and policy-group naming convention that adds a `-client` suffix.
    it("builds pre-shared-key identities with the current policy-group suffixing", () => {
        const result = IKeV2Identity(
            baseConfig,
            "peer",
            "modeconf",
            "policies",
        );

        expect(result).toContain("peer=peer");
        expect(result).toContain("auth-method=pre-shared-key");
        expect(result).toContain('secret="shared-secret-key"');
        expect(result).toContain("my-id=auto");
        expect(result).toContain("remote-id=fqdn:ikev2.example.com");
        expect(result).toContain("mode-config=modeconf");
        expect(result).toContain('policy-template-group="policies-client"');
    });

    // Verifies EAP and certificate-based branches add their respective credential material even though the current builder keeps the shared-key auth token.
    it("adds EAP and certificate parameters for non-PSK identity branches", () => {
        const eapResult = IKeV2Identity(
            {
                ...baseConfig,
                ServerAddress: "eap.example.com",
                AuthMethod: "eap",
                Credentials: { Username: "testuser", Password: "testpass" },
                ClientCertificateName: "client-cert",
            },
            "eap-peer",
            "eap-modeconf",
            "eap-policies",
        );
        const certResult = IKeV2Identity(
            {
                ...baseConfig,
                ServerAddress: "cert.example.com",
                AuthMethod: "digital-signature",
                ClientCertificateName: "my-client-cert",
            },
            "cert-peer",
            "cert-modeconf",
            "cert-policies",
        );

        expect(eapResult).toContain("eap-methods=eap-mschapv2");
        expect(eapResult).toContain('username="testuser"');
        expect(eapResult).toContain('password="testpass"');
        expect(eapResult).toContain("certificate=client-cert");
        expect(certResult).toContain("certificate=my-client-cert");
    });

    // Verifies policy and mode-config builders both use quoted names where the current implementation emits quoted RouterOS values.
    it("builds policy and mode-config commands using the current quoted naming format", () => {
        const policyResult = IKeV2Policy(
            baseConfig,
            "test-policies",
            "test-proposal",
        );
        const modeConfigResult = IKeV2ModeConfig(
            {
                ...baseConfig,
                SrcAddressList: "vpn-clients",
                ConnectionMark: "vpn-mark",
            },
            "test-modeconf",
        );

        expect(policyResult).toContain('group="test-policies-client"');
        expect(policyResult).toContain("template=yes");
        expect(policyResult).toContain("proposal=test-proposal");
        expect(modeConfigResult).toContain('name="test-modeconf"');
        expect(modeConfigResult).toContain('src-address-list="vpn-clients"');
        expect(modeConfigResult).toContain('connection-mark="vpn-mark"');
    });

    // Verifies the full client builder emits all of the IPsec sections and applies custom names with the same `-client` policy-group suffix.
    it("assembles the full IKEv2 client configuration with custom component names", () => {
        const result = IKeV2Client({
            ...baseConfig,
            ProfileName: "my-profile",
            PeerName: "my-peer",
            ProposalName: "my-proposal",
            PolicyGroupName: "my-policies",
            ModeConfigName: "my-modeconf",
        });

        expect(result["/ip ipsec profile"][0]).toContain("name=my-profile");
        expect(result["/ip ipsec proposal"][0]).toContain("name=my-proposal");
        expect(result["/ip ipsec peer"][0]).toContain("name=my-peer");
        expect(result["/ip ipsec policy group"][0]).toContain(
            'name="my-policies-client"',
        );
        expect(result["/ip ipsec mode-config"][0]).toContain(
            'name="my-modeconf"',
        );
    });

    // Verifies the wrapper currently merges only the IPsec sections plus the endpoint address-list entry and intentionally omits interface-list, route, and mangle sections.
    it("wraps IKEv2 clients with endpoint tracking but no WAN list or route sections", () => {
        const result = IKeV2ClientWrapper([
            {
                Name: "route-test",
                ServerAddress: "1.2.3.4",
                AuthMethod: "pre-shared-key",
                PresharedKey: "key",
            },
        ]);

        expect(result["/ip ipsec peer"]).toHaveLength(1);
        expect(result["/ip firewall address-list"]).toEqual([
            'add address="1.2.3.4" list=VPNE comment="VPN-route-test Interface:ike2-client-route-test WanInterface:undefined-undefined Endpoint:1.2.3.4 - Endpoint for routing"',
        ]);
        expect(result["/interface list member"]).toBeUndefined();
        expect(result["/ip route"]).toBeUndefined();
        expect(result["/ip firewall mangle"]).toEqual([]);
    });
});
