import { describe, expect, it } from "vitest";

import type { PptpClientConfig } from "~/components/Star/StarContext";

import { PPTPClient, PPTPClientWrapper } from "./PPTP";

describe("PPTP", () => {
    // Verifies the PPTP client builder emits the quoted RouterOS command shape used by the current implementation.
    it("builds a basic PPTP client command", () => {
        const config: PptpClientConfig = {
            Name: "pptp-basic",
            ConnectTo: "pptp.example.com",
            Credentials: { Username: "pptpuser", Password: "pptppass" },
        };

        const result = PPTPClient(config);
        const command = result["/interface pptp-client"][0];

        expect(command).toContain('name="pptp-client-pptp-basic"');
        expect(command).toContain('connect-to="pptp.example.com"');
        expect(command).toContain('comment="pptp-basic PPTP"');
        expect(command).toContain('user="pptpuser"');
        expect(command).toContain('password="pptppass"');
        expect(command).toContain("disabled=no");
    });

    // Verifies optional authentication, keepalive, and dial-on-demand fields are appended only when configured.
    it("appends optional PPTP client settings when they are provided", () => {
        const result = PPTPClient({
            Name: "pptp-complete",
            ConnectTo: "complete.pptp.com",
            Credentials: { Username: "completeuser", Password: "completepass" },
            AuthMethod: ["mschap2", "chap"],
            KeepaliveTimeout: 60,
            DialOnDemand: false,
        });

        const command = result["/interface pptp-client"][0];
        expect(command).toContain("allow=mschap2,chap");
        expect(command).toContain("keepalive-timeout=60");
        expect(command).toContain("dial-on-demand=no");
    });

    // Verifies omitted optional fields stay out of the command so the builder does not add stale defaults.
    it("omits optional PPTP settings when they are not configured", () => {
        const result = PPTPClient({
            Name: "pptp-minimal",
            ConnectTo: "minimal.pptp.com",
            Credentials: { Username: "user", Password: "pass" },
        });

        const command = result["/interface pptp-client"][0];
        expect(command).not.toContain("allow=");
        expect(command).not.toContain("keepalive-timeout=");
        expect(command).not.toContain("dial-on-demand=");
    });

    // Verifies the client command preserves literal credential values, including special characters, in the current quoted form.
    it("preserves special characters in PPTP credentials", () => {
        const result = PPTPClient({
            Name: "pptp-special",
            ConnectTo: "special.pptp.com",
            Credentials: {
                Username: 'user"with"quotes',
                Password: "pass$with$special",
            },
        });

        const command = result["/interface pptp-client"][0];
        expect(command).toContain('user="user"with"quotes"');
        expect(command).toContain('password="pass$with$special"');
    });

    // Verifies the wrapper merges the PPTP interface config with the current base VPN helper sections for each configured client.
    it("wraps a single PPTP client with base VPN sections", () => {
        const result = PPTPClientWrapper([
            {
                Name: "vpn1",
                ConnectTo: "pptp.example.com",
                Credentials: { Username: "user1", Password: "pass1" },
            },
        ]);

        expect(result["/interface pptp-client"]).toHaveLength(1);
        expect(result["/interface list member"]).toHaveLength(2);
        expect(result["/ip route"]).toHaveLength(1);
        expect(result["/ip firewall address-list"]).toHaveLength(1);
        expect(result["/ip firewall mangle"]).toEqual([]);
        expect(result["/interface pptp-client"][0]).toContain(
            'name="pptp-client-vpn1"',
        );
        expect(result["/ip route"][0]).toContain('routing-table="to-VPN-vpn1"');
    });

    // Verifies wrapper output scales across multiple PPTP clients and preserves per-client names and endpoint tracking.
    it("wraps multiple PPTP clients into a merged RouterConfig", () => {
        const result = PPTPClientWrapper([
            {
                Name: "vpn1",
                ConnectTo: "pptp1.example.com",
                Credentials: { Username: "user1", Password: "pass1" },
            },
            {
                Name: "vpn2",
                ConnectTo: "pptp2.example.com",
                Credentials: { Username: "user2", Password: "pass2" },
            },
        ]);

        expect(result["/interface pptp-client"]).toHaveLength(2);
        expect(result["/interface list member"]).toHaveLength(4);
        expect(result["/ip route"]).toHaveLength(2);
        expect(result["/ip firewall address-list"]).toHaveLength(2);
        expect(result["/interface pptp-client"][0]).toContain(
            'name="pptp-client-vpn1"',
        );
        expect(result["/interface pptp-client"][1]).toContain(
            'name="pptp-client-vpn2"',
        );
        expect(result["/ip firewall address-list"][0]).toContain(
            'address="pptp1.example.com"',
        );
        expect(result["/ip firewall address-list"][1]).toContain(
            'address="pptp2.example.com"',
        );
    });

    // Verifies the wrapper still returns an empty config object when there are no PPTP clients to build.
    it("returns an empty config for an empty PPTP client list", () => {
        expect(PPTPClientWrapper([])).toEqual({});
    });
});
