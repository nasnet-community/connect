import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import { L2TPClient, L2TPClientWrapper } from "./L2TP";
import type { L2tpClientConfig } from "~/components/Star/StarContext";

describe("L2TP Protocol Module", () => {
    describe("L2TPClient", () => {
        it("should configure basic L2TP client", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-basic",
                Server: { Address: "l2tp.example.com" },
                Credentials: { Username: "l2tpuser", Password: "l2tppass" },
            };

            const result = testWithOutput(
                "L2TPClient",
                "Basic L2TP client configuration",
                { config },
                () => L2TPClient(config),
            );

            validateRouterConfig(result, ["/interface l2tp-client"]);

            expect(result["/interface l2tp-client"][0]).toContain("name=l2tp-client-l2tp-basic");
            expect(result["/interface l2tp-client"][0]).toContain("connect-to=l2tp.example.com");
            expect(result["/interface l2tp-client"][0]).toContain('user="l2tpuser"');
            expect(result["/interface l2tp-client"][0]).toContain('password="l2tppass"');
            expect(result["/interface l2tp-client"][0]).toContain("disabled=no");
        });

        it("should configure L2TP with IPsec enabled", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-ipsec",
                Server: { Address: "secure.l2tp.com", Port: 1701 },
                Credentials: { Username: "user", Password: "pass" },
                UseIPsec: true,
                IPsecSecret: "shared-secret",
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client with IPsec",
                { config },
                () => L2TPClient(config),
            );

            validateRouterConfig(result, ["/interface l2tp-client"]);

            expect(result["/interface l2tp-client"][0]).toContain("use-ipsec=yes");
            expect(result["/interface l2tp-client"][0]).toContain('ipsec-secret="shared-secret"');
        });

        it("should configure L2TP without IPsec", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-no-ipsec",
                Server: { Address: "plain.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                UseIPsec: false,
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client without IPsec",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("use-ipsec=no");
        });

        it("should configure authentication methods", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-auth",
                Server: { Address: "auth.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                AuthMethod: ["mschap2", "chap", "pap"],
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client with multiple auth methods",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("allow=mschap2,chap,pap");
        });

        it("should configure protocol version", () => {
            const configs = [
                { version: "l2tpv2" as const, name: "v2" },
                { version: "l2tpv3" as const, name: "v3" },
            ];

            configs.forEach(({ version, name }) => {
                const config: L2tpClientConfig = {
                    Name: `l2tp-${name}`,
                    Server: { Address: "version.l2tp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                    ProtoVersion: version,
                };

                const result = testWithOutput(
                    "L2TPClient",
                    `L2TP client with ${version}`,
                    { config, version },
                    () => L2TPClient(config),
                );

                expect(result["/interface l2tp-client"][0]).toContain(
                    `l2tp-proto-version=${version}`,
                );
            });
        });

        it("should configure fast path", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-fastpath",
                Server: { Address: "fast.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                FastPath: true,
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client with fast path enabled",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("allow-fast-path=yes");
        });

        it("should configure keepalive timeout", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-keepalive",
                Server: { Address: "keepalive.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                keepAlive: "60",
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client with keepalive timeout",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("keepalive-timeout=60");
        });

        it("should omit keepalive when zero or not provided", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-no-keepalive",
                Server: { Address: "test.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                keepAlive: "0",
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client without keepalive",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).not.toContain("keepalive-timeout");
        });

        it("should configure dial-on-demand", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-dod",
                Server: { Address: "dod.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                DialOnDemand: true,
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client with dial-on-demand",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("dial-on-demand=yes");
        });

        it("should configure L2TPv3 cookie length", () => {
            const config: L2tpClientConfig = {
                Name: "l2tpv3-cookie",
                Server: { Address: "v3.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                ProtoVersion: "l2tpv3",
                CookieLength: 8,
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TPv3 client with cookie length",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("l2tpv3-cookie-length=8");
        });

        it("should configure L2TPv3 digest hash", () => {
            const config: L2tpClientConfig = {
                Name: "l2tpv3-digest",
                Server: { Address: "v3.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                ProtoVersion: "l2tpv3",
                DigestHash: "sha256",
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TPv3 client with digest hash",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain("l2tpv3-digest-hash=sha256");
        });

        it("should configure L2TPv3 circuit ID", () => {
            const config: L2tpClientConfig = {
                Name: "l2tpv3-circuit",
                Server: { Address: "v3.l2tp.com" },
                Credentials: { Username: "user", Password: "pass" },
                ProtoVersion: "l2tpv3",
                CircuitId: "circuit-123",
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TPv3 client with circuit ID",
                { config },
                () => L2TPClient(config),
            );

            expect(result["/interface l2tp-client"][0]).toContain(
                'l2tpv3-circuit-id="circuit-123"',
            );
        });

        it("should configure complete L2TPv3 client", () => {
            const config: L2tpClientConfig = {
                Name: "l2tpv3-complete",
                Server: { Address: "complete.v3.l2tp.com", Port: 1701 },
                Credentials: { Username: "testuser", Password: "testpass" },
                UseIPsec: true,
                IPsecSecret: "secret123",
                AuthMethod: ["mschap2"],
                ProtoVersion: "l2tpv3",
                FastPath: true,
                keepAlive: "30",
                DialOnDemand: false,
                CookieLength: 4,
                DigestHash: "sha1",
                CircuitId: "circuit-001",
            };

            const result = testWithOutput(
                "L2TPClient",
                "Complete L2TPv3 configuration",
                { config },
                () => L2TPClient(config),
            );

            const command = result["/interface l2tp-client"][0];

            expect(command).toContain("name=l2tp-client-l2tpv3-complete");
            expect(command).toContain("connect-to=complete.v3.l2tp.com");
            expect(command).toContain('user="testuser"');
            expect(command).toContain('password="testpass"');
            expect(command).toContain("use-ipsec=yes");
            expect(command).toContain('ipsec-secret="secret123"');
            expect(command).toContain("allow=mschap2");
            expect(command).toContain("l2tp-proto-version=l2tpv3");
            expect(command).toContain("allow-fast-path=yes");
            expect(command).toContain("keepalive-timeout=30");
            expect(command).toContain("dial-on-demand=no");
            expect(command).toContain("l2tpv3-cookie-length=4");
            expect(command).toContain("l2tpv3-digest-hash=sha1");
            expect(command).toContain('l2tpv3-circuit-id="circuit-001"');
            expect(command).toContain("disabled=no");
        });

        it("should handle special characters in credentials", () => {
            const config: L2tpClientConfig = {
                Name: "l2tp-special",
                Server: { Address: "special.l2tp.com" },
                Credentials: {
                    Username: 'user"with"quotes',
                    Password: 'pass$with$special',
                },
            };

            const result = testWithOutput(
                "L2TPClient",
                "L2TP client with special characters",
                { config },
                () => L2TPClient(config),
            );

            const command = result["/interface l2tp-client"][0];
            expect(command).toContain('user="user"with"quotes"');
            expect(command).toContain('password="pass$with$special"');
        });
    });

    describe("L2TPClientWrapper", () => {
        it("should configure single L2TP client with base config", () => {
            const configs: L2tpClientConfig[] = [
                {
                    Name: "vpn1",
                    Server: { Address: "l2tp.example.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                    UseIPsec: true,
                    IPsecSecret: "secret",
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "Single L2TP client with base configuration",
                { configs },
                () => L2TPClientWrapper(configs),
            );

            validateRouterConfig(result, [
                "/interface l2tp-client",
                "/interface list member",
                "/ip route",
                "/ip firewall address-list",
                "/ip firewall mangle",
            ]);

            // Check client configuration
            expect(result["/interface l2tp-client"][0]).toContain("name=l2tp-client-vpn1");

            // Check base config is included
            expect(result["/interface list member"]).toBeDefined();
            expect(result["/ip route"]).toBeDefined();
        });

        it("should configure multiple L2TP clients", () => {
            const configs: L2tpClientConfig[] = [
                {
                    Name: "vpn1",
                    Server: { Address: "l2tp1.example.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                },
                {
                    Name: "vpn2",
                    Server: { Address: "l2tp2.example.com" },
                    Credentials: { Username: "user2", Password: "pass2" },
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "Multiple L2TP clients configuration",
                { configs },
                () => L2TPClientWrapper(configs),
            );

            // Should have configuration for both clients
            expect(result["/interface l2tp-client"].length).toBe(2);
            expect(result["/interface l2tp-client"][0]).toContain("name=l2tp-client-vpn1");
            expect(result["/interface l2tp-client"][1]).toContain("name=l2tp-client-vpn2");

            // Each client should have base config (2 interface list entries each)
            expect(result["/interface list member"].length).toBeGreaterThanOrEqual(4);
        });

        it("should generate correct interface names", () => {
            const configs: L2tpClientConfig[] = [
                {
                    Name: "test-vpn",
                    Server: { Address: "test.l2tp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "L2TP client with interface name generation",
                { configs },
                () => L2TPClientWrapper(configs),
            );

            // Check that interface name follows naming convention
            const hasCorrectInterface = result["/interface list member"].some(
                (cmd) => cmd.includes('interface="l2tp-client-test-vpn"'),
            );
            expect(hasCorrectInterface).toBe(true);
        });

        it("should route endpoint through correct routing table", () => {
            const configs: L2tpClientConfig[] = [
                {
                    Name: "route-test",
                    Server: { Address: "1.2.3.4" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "L2TP client with endpoint routing",
                { configs },
                () => L2TPClientWrapper(configs),
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
            const configs: L2tpClientConfig[] = [
                {
                    Name: "routing-test",
                    Server: { Address: "routing.l2tp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "L2TP client with VPN routing",
                { configs },
                () => L2TPClientWrapper(configs),
            );

            // Check route is created in VPN routing table
            const hasVpnRoute = result["/ip route"].some(
                (cmd) => cmd.includes("routing-table=to-VPN-routing-test"),
            );
            expect(hasVpnRoute).toBe(true);
        });

        it("should add interface to WAN and VPN-WAN lists", () => {
            const configs: L2tpClientConfig[] = [
                {
                    Name: "lists-test",
                    Server: { Address: "lists.l2tp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "L2TP client interface list memberships",
                { configs },
                () => L2TPClientWrapper(configs),
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
                "L2TPClientWrapper",
                "Empty configuration array",
                { configs: [] },
                () => L2TPClientWrapper([]),
            );

            expect(result).toBeDefined();
            expect(Object.keys(result)).toHaveLength(0);
        });

        it("should handle mixed L2TPv2 and L2TPv3 configurations", () => {
            const configs: L2tpClientConfig[] = [
                {
                    Name: "v2-client",
                    Server: { Address: "v2.l2tp.com" },
                    Credentials: { Username: "user2", Password: "pass2" },
                    ProtoVersion: "l2tpv2",
                },
                {
                    Name: "v3-client",
                    Server: { Address: "v3.l2tp.com" },
                    Credentials: { Username: "user3", Password: "pass3" },
                    ProtoVersion: "l2tpv3",
                    CookieLength: 4,
                },
            ];

            const result = testWithOutput(
                "L2TPClientWrapper",
                "Mixed L2TPv2 and L2TPv3 configuration",
                { configs },
                () => L2TPClientWrapper(configs),
            );

            // Both clients should be configured
            expect(result["/interface l2tp-client"].length).toBe(2);
            expect(result["/interface l2tp-client"][0]).toContain("l2tp-proto-version=l2tpv2");
            expect(result["/interface l2tp-client"][1]).toContain("l2tp-proto-version=l2tpv3");
            expect(result["/interface l2tp-client"][1]).toContain("l2tpv3-cookie-length=4");
        });
    });
});
