import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import { PPTPClient, PPTPClientWrapper } from "./PPTP";
import type { PptpClientConfig } from "~/components/Star/StarContext";

describe("PPTP Protocol Module", () => {
    describe("PPTPClient", () => {
        it("should configure basic PPTP client", () => {
            const config: PptpClientConfig = {
                Name: "pptp-basic",
                ConnectTo: "pptp.example.com",
                Credentials: { Username: "pptpuser", Password: "pptppass" },
            };

            const result = testWithOutput(
                "PPTPClient",
                "Basic PPTP client configuration",
                { config },
                () => PPTPClient(config),
            );

            validateRouterConfig(result, ["/interface pptp-client"]);

            const command = result["/interface pptp-client"][0];
            expect(command).toContain("name=pptp-client-pptp-basic");
            expect(command).toContain('connect-to="pptp.example.com"');
            expect(command).toContain('user="pptpuser"');
            expect(command).toContain('password="pptppass"');
            expect(command).toContain("disabled=no");
        });

        it("should configure authentication methods", () => {
            const config: PptpClientConfig = {
                Name: "pptp-auth",
                ConnectTo: "auth.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
                AuthMethod: ["mschap2", "mschap1", "chap", "pap"],
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with multiple auth methods",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).toContain(
                "allow=mschap2,mschap1,chap,pap",
            );
        });

        it("should configure single authentication method", () => {
            const config: PptpClientConfig = {
                Name: "pptp-mschap2",
                ConnectTo: "mschap2.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
                AuthMethod: ["mschap2"],
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with single auth method",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).toContain("allow=mschap2");
        });

        it("should omit auth method when not provided", () => {
            const config: PptpClientConfig = {
                Name: "pptp-no-auth",
                ConnectTo: "test.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP without explicit auth method",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).not.toContain("allow=");
        });

        it("should configure keepalive timeout", () => {
            const timeouts = [10, 30, 60, 120];

            timeouts.forEach((timeout) => {
                const config: PptpClientConfig = {
                    Name: `pptp-ka-${timeout}`,
                    ConnectTo: "keepalive.pptp.com",
                    Credentials: { Username: "user", Password: "pass" },
                    KeepaliveTimeout: timeout,
                };

                const result = testWithOutput(
                    "PPTPClient",
                    `PPTP with keepalive timeout ${timeout}s`,
                    { config, timeout },
                    () => PPTPClient(config),
                );

                expect(result["/interface pptp-client"][0]).toContain(
                    `keepalive-timeout=${timeout}`,
                );
            });
        });

        it("should omit keepalive when not provided", () => {
            const config: PptpClientConfig = {
                Name: "pptp-no-keepalive",
                ConnectTo: "test.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP without keepalive timeout",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).not.toContain("keepalive-timeout");
        });

        it("should configure dial-on-demand enabled", () => {
            const config: PptpClientConfig = {
                Name: "pptp-dod-yes",
                ConnectTo: "dod.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
                DialOnDemand: true,
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with dial-on-demand enabled",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).toContain("dial-on-demand=yes");
        });

        it("should configure dial-on-demand disabled", () => {
            const config: PptpClientConfig = {
                Name: "pptp-dod-no",
                ConnectTo: "dod.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
                DialOnDemand: false,
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with dial-on-demand disabled",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).toContain("dial-on-demand=no");
        });

        it("should omit dial-on-demand when not provided", () => {
            const config: PptpClientConfig = {
                Name: "pptp-no-dod",
                ConnectTo: "test.pptp.com",
                Credentials: { Username: "user", Password: "pass" },
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP without dial-on-demand setting",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).not.toContain("dial-on-demand");
        });

        it("should configure complete PPTP client with all options", () => {
            const config: PptpClientConfig = {
                Name: "pptp-complete",
                ConnectTo: "complete.pptp.com",
                Credentials: { Username: "completeuser", Password: "completepass" },
                AuthMethod: ["mschap2", "chap"],
                KeepaliveTimeout: 60,
                DialOnDemand: false,
            };

            const result = testWithOutput(
                "PPTPClient",
                "Complete PPTP configuration with all options",
                { config },
                () => PPTPClient(config),
            );

            const command = result["/interface pptp-client"][0];

            expect(command).toContain("name=pptp-client-pptp-complete");
            expect(command).toContain('connect-to="complete.pptp.com"');
            expect(command).toContain('user="completeuser"');
            expect(command).toContain('password="completepass"');
            expect(command).toContain("allow=mschap2,chap");
            expect(command).toContain("keepalive-timeout=60");
            expect(command).toContain("dial-on-demand=no");
            expect(command).toContain("disabled=no");
        });

        it("should handle special characters in credentials", () => {
            const config: PptpClientConfig = {
                Name: "pptp-special",
                ConnectTo: "special.pptp.com",
                Credentials: {
                    Username: 'user"with"quotes',
                    Password: 'pass$with$special',
                },
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with special characters in credentials",
                { config },
                () => PPTPClient(config),
            );

            const command = result["/interface pptp-client"][0];
            expect(command).toContain('user="user"with"quotes"');
            expect(command).toContain('password="pass$with$special"');
        });

        it("should handle IP address as connect-to", () => {
            const config: PptpClientConfig = {
                Name: "pptp-ip",
                ConnectTo: "192.168.1.100",
                Credentials: { Username: "user", Password: "pass" },
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with IP address",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).toContain(
                'connect-to="192.168.1.100"',
            );
        });

        it("should handle domain name with subdomain", () => {
            const config: PptpClientConfig = {
                Name: "pptp-subdomain",
                ConnectTo: "vpn.subdomain.example.com",
                Credentials: { Username: "user", Password: "pass" },
            };

            const result = testWithOutput(
                "PPTPClient",
                "PPTP with subdomain",
                { config },
                () => PPTPClient(config),
            );

            expect(result["/interface pptp-client"][0]).toContain(
                'connect-to="vpn.subdomain.example.com"',
            );
        });
    });

    describe("PPTPClientWrapper", () => {
        it("should configure single PPTP client with base config", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "vpn1",
                    ConnectTo: "pptp.example.com",
                    Credentials: { Username: "user1", Password: "pass1" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "Single PPTP client with base configuration",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            validateRouterConfig(result, [
                "/interface pptp-client",
                "/interface list member",
                "/ip route",
                "/ip firewall address-list",
                "/ip firewall mangle",
            ]);

            // Check client configuration
            expect(result["/interface pptp-client"][0]).toContain("name=pptp-client-vpn1");

            // Check base config is included
            expect(result["/interface list member"]).toBeDefined();
            expect(result["/ip route"]).toBeDefined();
        });

        it("should configure multiple PPTP clients", () => {
            const configs: PptpClientConfig[] = [
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
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "Multiple PPTP clients configuration",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Should have configuration for both clients
            expect(result["/interface pptp-client"].length).toBe(2);
            expect(result["/interface pptp-client"][0]).toContain("name=pptp-client-vpn1");
            expect(result["/interface pptp-client"][1]).toContain("name=pptp-client-vpn2");

            // Each client should have base config (2 interface list entries each)
            expect(result["/interface list member"].length).toBeGreaterThanOrEqual(4);
        });

        it("should generate correct interface names", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "test-vpn",
                    ConnectTo: "test.pptp.com",
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP with interface name generation",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Check that interface name follows naming convention
            const hasCorrectInterface = result["/interface list member"].some(
                (cmd) => cmd.includes('interface="pptp-client-test-vpn"'),
            );
            expect(hasCorrectInterface).toBe(true);
        });

        it("should route endpoint through correct routing table", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "route-test",
                    ConnectTo: "1.2.3.4",
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP with endpoint routing",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Check endpoint is in address list
            const hasEndpoint = result["/ip firewall address-list"].some(
                (cmd) => cmd.includes('address="1.2.3.4"'),
            );
            expect(hasEndpoint).toBe(true);

            // Check mangle rules exist for endpoint routing
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should create VPN routing table entries", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "routing-test",
                    ConnectTo: "routing.pptp.com",
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP with VPN routing",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Check route is created in VPN routing table
            const hasVpnRoute = result["/ip route"].some(
                (cmd) => cmd.includes("routing-table=to-VPN-routing-test"),
            );
            expect(hasVpnRoute).toBe(true);
        });

        it("should add interface to WAN and VPN-WAN lists", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "lists-test",
                    ConnectTo: "lists.pptp.com",
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP interface list memberships",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Check both WAN and VPN-WAN list memberships
            const hasWanList = result["/interface list member"].some(
                (cmd) => cmd.includes('list="WAN"'),
            );
            const hasVpnWanList = result["/interface list member"].some(
                (cmd) => cmd.includes('list="VPN-WAN"'),
            );

            expect(hasWanList).toBe(true);
            expect(hasVpnWanList).toBe(true);
        });

        it("should return empty config for empty array", () => {
            const result = testWithOutput(
                "PPTPClientWrapper",
                "Empty configuration array",
                { configs: [] },
                () => PPTPClientWrapper([]),
            );

            expect(result).toBeDefined();
            expect(Object.keys(result)).toHaveLength(0);
        });

        it("should handle clients with different authentication methods", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "mschap2-client",
                    ConnectTo: "mschap2.pptp.com",
                    Credentials: { Username: "user1", Password: "pass1" },
                    AuthMethod: ["mschap2"],
                },
                {
                    Name: "pap-client",
                    ConnectTo: "pap.pptp.com",
                    Credentials: { Username: "user2", Password: "pass2" },
                    AuthMethod: ["pap"],
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP clients with different auth methods",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Both clients should be configured with their respective auth methods
            expect(result["/interface pptp-client"][0]).toContain("allow=mschap2");
            expect(result["/interface pptp-client"][1]).toContain("allow=pap");
        });

        it("should handle mixed keepalive configurations", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "ka-30",
                    ConnectTo: "ka30.pptp.com",
                    Credentials: { Username: "user1", Password: "pass1" },
                    KeepaliveTimeout: 30,
                },
                {
                    Name: "ka-60",
                    ConnectTo: "ka60.pptp.com",
                    Credentials: { Username: "user2", Password: "pass2" },
                    KeepaliveTimeout: 60,
                },
                {
                    Name: "no-ka",
                    ConnectTo: "noka.pptp.com",
                    Credentials: { Username: "user3", Password: "pass3" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP clients with mixed keepalive settings",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Check each client has correct keepalive setting
            expect(result["/interface pptp-client"][0]).toContain("keepalive-timeout=30");
            expect(result["/interface pptp-client"][1]).toContain("keepalive-timeout=60");
            expect(result["/interface pptp-client"][2]).not.toContain("keepalive-timeout");
        });

        it("should handle clients with dial-on-demand variations", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "dod-yes",
                    ConnectTo: "dod1.pptp.com",
                    Credentials: { Username: "user1", Password: "pass1" },
                    DialOnDemand: true,
                },
                {
                    Name: "dod-no",
                    ConnectTo: "dod2.pptp.com",
                    Credentials: { Username: "user2", Password: "pass2" },
                    DialOnDemand: false,
                },
                {
                    Name: "dod-unset",
                    ConnectTo: "dod3.pptp.com",
                    Credentials: { Username: "user3", Password: "pass3" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP clients with dial-on-demand variations",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            expect(result["/interface pptp-client"][0]).toContain("dial-on-demand=yes");
            expect(result["/interface pptp-client"][1]).toContain("dial-on-demand=no");
            expect(result["/interface pptp-client"][2]).not.toContain("dial-on-demand");
        });

        it("should handle combination of IP and domain endpoints", () => {
            const configs: PptpClientConfig[] = [
                {
                    Name: "ip-endpoint",
                    ConnectTo: "10.20.30.40",
                    Credentials: { Username: "user1", Password: "pass1" },
                },
                {
                    Name: "domain-endpoint",
                    ConnectTo: "domain.example.com",
                    Credentials: { Username: "user2", Password: "pass2" },
                },
            ];

            const result = testWithOutput(
                "PPTPClientWrapper",
                "PPTP with IP and domain endpoints",
                { configs },
                () => PPTPClientWrapper(configs),
            );

            // Both IP and domain endpoints should be in address lists
            const hasIpEndpoint = result["/ip firewall address-list"].some(
                (cmd) => cmd.includes('address="10.20.30.40"'),
            );
            const hasDomainEndpoint = result["/ip firewall address-list"].some(
                (cmd) => cmd.includes('address="domain.example.com"'),
            );

            expect(hasIpEndpoint).toBe(true);
            expect(hasDomainEndpoint).toBe(true);
        });
    });
});
