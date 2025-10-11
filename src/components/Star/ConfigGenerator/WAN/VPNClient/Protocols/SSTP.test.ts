import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import { SSTPClient, SSTPClientWrapper } from "./SSTP";
import type { SstpClientConfig } from "~/components/Star/StarContext";

describe("SSTP Protocol Module", () => {
    describe("SSTPClient", () => {
        it("should configure basic SSTP client", () => {
            const config: SstpClientConfig = {
                Name: "sstp-basic",
                Server: { Address: "sstp.example.com" },
                Credentials: { Username: "sstpuser", Password: "sstppass" },
            };

            const result = testWithOutput(
                "SSTPClient",
                "Basic SSTP client configuration",
                { config },
                () => SSTPClient(config),
            );

            validateRouterConfig(result, ["/interface sstp-client"]);

            const command = result["/interface sstp-client"][0];
            expect(command).toContain("name=sstp-client-sstp-basic");
            expect(command).toContain("connect-to=sstp.example.com");
            expect(command).toContain('user="sstpuser"');
            expect(command).toContain("disabled=no");
        });

        it("should configure authentication methods", () => {
            const config: SstpClientConfig = {
                Name: "sstp-auth",
                Server: { Address: "auth.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                AuthMethod: ["mschap2", "mschap1", "chap", "pap"],
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with multiple authentication methods",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain(
                "authentication=mschap2,mschap1,chap,pap",
            );
        });

        it("should configure single authentication method", () => {
            const config: SstpClientConfig = {
                Name: "sstp-mschap2",
                Server: { Address: "mschap2.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                AuthMethod: ["mschap2"],
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with single authentication method",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain("authentication=mschap2");
        });

        it("should configure ciphers", () => {
            const config: SstpClientConfig = {
                Name: "sstp-ciphers",
                Server: { Address: "ciphers.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                Ciphers: ["aes256-sha256", "aes128-sha1"],
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with cipher configuration",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain(
                "ciphers=aes256-sha256,aes128-sha1",
            );
        });

        it("should configure TLS version", () => {
            const tlsVersions = ["any", "only-1.2", "only-1.3"] as const;

            tlsVersions.forEach((tls) => {
                const config: SstpClientConfig = {
                    Name: `sstp-tls-${tls}`,
                    Server: { Address: "tls.sstp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                    TlsVersion: tls,
                };

                const result = testWithOutput(
                    "SSTPClient",
                    `SSTP with TLS version ${tls}`,
                    { config, tls },
                    () => SSTPClient(config),
                );

                expect(result["/interface sstp-client"][0]).toContain(`tls-version=${tls}`);
            });
        });

        it("should configure HTTP proxy", () => {
            const config: SstpClientConfig = {
                Name: "sstp-proxy",
                Server: { Address: "proxy.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                Proxy: { Address: "192.168.1.100", Port: 3128 },
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with HTTP proxy configuration",
                { config },
                () => SSTPClient(config),
            );

            const command = result["/interface sstp-client"][0];
            expect(command).toContain("http-proxy=192.168.1.100");
            expect(command).toContain("proxy-port=3128");
        });

        it("should use default proxy port when not specified", () => {
            const config: SstpClientConfig = {
                Name: "sstp-proxy-default",
                Server: { Address: "proxy.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                Proxy: { Address: "proxy.local" },
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with proxy default port",
                { config },
                () => SSTPClient(config),
            );

            const command = result["/interface sstp-client"][0];
            expect(command).toContain("http-proxy=proxy.local");
            expect(command).toContain("proxy-port=8080");
        });

        it("should configure SNI (Server Name Indication)", () => {
            const config: SstpClientConfig = {
                Name: "sstp-sni-yes",
                Server: { Address: "sni.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                SNI: true,
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with SNI enabled",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain("add-sni=yes");
        });

        it("should disable SNI when configured", () => {
            const config: SstpClientConfig = {
                Name: "sstp-sni-no",
                Server: { Address: "sni.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                SNI: false,
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with SNI disabled",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain("add-sni=no");
        });

        it("should configure PFS (Perfect Forward Secrecy)", () => {
            const pfsGroups = ["modp1024", "modp1536", "modp2048"];

            pfsGroups.forEach((pfs) => {
                const config: SstpClientConfig = {
                    Name: `sstp-pfs-${pfs}`,
                    Server: { Address: "pfs.sstp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                    PFS: pfs,
                };

                const result = testWithOutput(
                    "SSTPClient",
                    `SSTP with PFS group ${pfs}`,
                    { config, pfs },
                    () => SSTPClient(config),
                );

                expect(result["/interface sstp-client"][0]).toContain(`pfs=${pfs}`);
            });
        });

        it("should configure dial-on-demand enabled", () => {
            const config: SstpClientConfig = {
                Name: "sstp-dod-yes",
                Server: { Address: "dod.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                DialOnDemand: true,
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with dial-on-demand enabled",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain("dial-on-demand=yes");
        });

        it("should configure dial-on-demand disabled", () => {
            const config: SstpClientConfig = {
                Name: "sstp-dod-no",
                Server: { Address: "dod.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                DialOnDemand: false,
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with dial-on-demand disabled",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain("dial-on-demand=no");
        });

        it("should configure keepalive", () => {
            const keepalives = ["10s", "30s", "1m", "5m"];

            keepalives.forEach((ka) => {
                const config: SstpClientConfig = {
                    Name: `sstp-ka-${ka}`,
                    Server: { Address: "keepalive.sstp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                    KeepAlive: ka,
                };

                const result = testWithOutput(
                    "SSTPClient",
                    `SSTP with keepalive ${ka}`,
                    { config, ka },
                    () => SSTPClient(config),
                );

                expect(result["/interface sstp-client"][0]).toContain(`keepalive=${ka}`);
            });
        });

        it("should configure verify server certificate", () => {
            const config: SstpClientConfig = {
                Name: "sstp-verify-yes",
                Server: { Address: "verify.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                VerifyServerCertificate: true,
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with server certificate verification enabled",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain(
                "verify-server-certificate=yes",
            );
        });

        it("should configure verify server address from certificate", () => {
            const config: SstpClientConfig = {
                Name: "sstp-verify-addr",
                Server: { Address: "verifyaddr.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                VerifyServerAddressFromCertificate: true,
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with server address verification from certificate",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain(
                "verify-server-address-from-certificate=yes",
            );
        });

        it("should configure client certificate", () => {
            const config: SstpClientConfig = {
                Name: "sstp-client-cert",
                Server: { Address: "cert.sstp.com" },
                Credentials: { Username: "user", Password: "pass" },
                ClientCertificateName: "my-client-certificate",
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with client certificate",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain(
                "certificate=my-client-certificate",
            );
        });

        it("should configure complete SSTP client with all options", () => {
            const config: SstpClientConfig = {
                Name: "sstp-complete",
                Server: { Address: "complete.sstp.com", Port: 443 },
                Credentials: { Username: "completeuser", Password: "completepass" },
                AuthMethod: ["mschap2", "chap"],
                Ciphers: ["aes256-sha256", "aes128-sha1"],
                TlsVersion: "only-1.2",
                Proxy: { Address: "proxy.example.com", Port: 3128 },
                SNI: true,
                PFS: "modp2048",
                DialOnDemand: false,
                KeepAlive: "30s",
                VerifyServerCertificate: true,
                VerifyServerAddressFromCertificate: true,
                ClientCertificateName: "my-cert",
            };

            const result = testWithOutput(
                "SSTPClient",
                "Complete SSTP configuration with all options",
                { config },
                () => SSTPClient(config),
            );

            const command = result["/interface sstp-client"][0];

            expect(command).toContain("name=sstp-client-sstp-complete");
            expect(command).toContain("connect-to=complete.sstp.com");
            expect(command).toContain('user="completeuser"');
            expect(command).toContain("authentication=mschap2,chap");
            expect(command).toContain("ciphers=aes256-sha256,aes128-sha1");
            expect(command).toContain("tls-version=only-1.2");
            expect(command).toContain("http-proxy=proxy.example.com");
            expect(command).toContain("proxy-port=3128");
            expect(command).toContain("add-sni=yes");
            expect(command).toContain("pfs=modp2048");
            expect(command).toContain("dial-on-demand=no");
            expect(command).toContain("keepalive=30s");
            expect(command).toContain("verify-server-certificate=yes");
            expect(command).toContain("verify-server-address-from-certificate=yes");
            expect(command).toContain("certificate=my-cert");
            expect(command).toContain("disabled=no");
        });

        it("should handle special characters in credentials", () => {
            const config: SstpClientConfig = {
                Name: "sstp-special",
                Server: { Address: "special.sstp.com" },
                Credentials: {
                    Username: 'user"with"quotes',
                    Password: 'pass$with$special',
                },
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with special characters in credentials",
                { config },
                () => SSTPClient(config),
            );

            const command = result["/interface sstp-client"][0];
            expect(command).toContain('user="user"with"quotes"');
        });

        it("should handle IP address as server", () => {
            const config: SstpClientConfig = {
                Name: "sstp-ip",
                Server: { Address: "192.168.1.100" },
                Credentials: { Username: "user", Password: "pass" },
            };

            const result = testWithOutput(
                "SSTPClient",
                "SSTP with IP address as server",
                { config },
                () => SSTPClient(config),
            );

            expect(result["/interface sstp-client"][0]).toContain("connect-to=192.168.1.100");
        });
    });

    describe("SSTPClientWrapper", () => {
        it("should configure single SSTP client with base config", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "vpn1",
                    Server: { Address: "sstp.example.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "Single SSTP client with base configuration",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            validateRouterConfig(result, [
                "/interface sstp-client",
                "/interface list member",
                "/ip route",
                "/ip firewall address-list",
                "/ip firewall mangle",
            ]);

            // Check client configuration
            expect(result["/interface sstp-client"][0]).toContain("name=sstp-client-vpn1");

            // Check base config is included
            expect(result["/interface list member"]).toBeDefined();
            expect(result["/ip route"]).toBeDefined();
        });

        it("should configure multiple SSTP clients", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "vpn1",
                    Server: { Address: "sstp1.example.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                },
                {
                    Name: "vpn2",
                    Server: { Address: "sstp2.example.com" },
                    Credentials: { Username: "user2", Password: "pass2" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "Multiple SSTP clients configuration",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            // Should have configuration for both clients
            expect(result["/interface sstp-client"].length).toBe(2);
            expect(result["/interface sstp-client"][0]).toContain("name=sstp-client-vpn1");
            expect(result["/interface sstp-client"][1]).toContain("name=sstp-client-vpn2");

            // Each client should have base config (2 interface list entries each)
            expect(result["/interface list member"].length).toBeGreaterThanOrEqual(4);
        });

        it("should generate correct interface names", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "test-vpn",
                    Server: { Address: "test.sstp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP with interface name generation",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            // Check that interface name follows naming convention
            const hasCorrectInterface = result["/interface list member"].some(
                (cmd) => cmd.includes('interface="sstp-client-test-vpn"'),
            );
            expect(hasCorrectInterface).toBe(true);
        });

        it("should route endpoint through correct routing table", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "route-test",
                    Server: { Address: "1.2.3.4" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP with endpoint routing",
                { configs },
                () => SSTPClientWrapper(configs),
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
            const configs: SstpClientConfig[] = [
                {
                    Name: "routing-test",
                    Server: { Address: "routing.sstp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP with VPN routing",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            // Check route is created in VPN routing table
            const hasVpnRoute = result["/ip route"].some(
                (cmd) => cmd.includes("routing-table=to-VPN-routing-test"),
            );
            expect(hasVpnRoute).toBe(true);
        });

        it("should add interface to WAN and VPN-WAN lists", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "lists-test",
                    Server: { Address: "lists.sstp.com" },
                    Credentials: { Username: "user", Password: "pass" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP interface list memberships",
                { configs },
                () => SSTPClientWrapper(configs),
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
                "SSTPClientWrapper",
                "Empty configuration array",
                { configs: [] },
                () => SSTPClientWrapper([]),
            );

            expect(result).toBeDefined();
            expect(Object.keys(result)).toHaveLength(0);
        });

        it("should handle clients with different TLS versions", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "tls12",
                    Server: { Address: "tls12.sstp.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                    TlsVersion: "only-1.2",
                },
                {
                    Name: "tls13",
                    Server: { Address: "tls13.sstp.com" },
                    Credentials: { Username: "user2", Password: "pass2" },
                    TlsVersion: "only-1.3",
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP clients with different TLS versions",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            expect(result["/interface sstp-client"][0]).toContain("tls-version=only-1.2");
            expect(result["/interface sstp-client"][1]).toContain("tls-version=only-1.3");
        });

        it("should handle mixed proxy configurations", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "with-proxy",
                    Server: { Address: "proxy1.sstp.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                    Proxy: { Address: "proxy.local", Port: 8080 },
                },
                {
                    Name: "without-proxy",
                    Server: { Address: "proxy2.sstp.com" },
                    Credentials: { Username: "user2", Password: "pass2" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP clients with mixed proxy configurations",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            // First client should have proxy settings
            expect(result["/interface sstp-client"][0]).toContain("http-proxy=proxy.local");
            expect(result["/interface sstp-client"][0]).toContain("proxy-port=8080");

            // Second client should not have proxy settings
            expect(result["/interface sstp-client"][1]).not.toContain("http-proxy");
        });

        it("should handle clients with and without certificates", () => {
            const configs: SstpClientConfig[] = [
                {
                    Name: "with-cert",
                    Server: { Address: "cert.sstp.com" },
                    Credentials: { Username: "user1", Password: "pass1" },
                    ClientCertificateName: "client-cert-1",
                },
                {
                    Name: "without-cert",
                    Server: { Address: "nocert.sstp.com" },
                    Credentials: { Username: "user2", Password: "pass2" },
                },
            ];

            const result = testWithOutput(
                "SSTPClientWrapper",
                "SSTP clients with mixed certificate configurations",
                { configs },
                () => SSTPClientWrapper(configs),
            );

            expect(result["/interface sstp-client"][0]).toContain("certificate=client-cert-1");
            expect(result["/interface sstp-client"][1]).not.toContain("certificate=");
        });
    });
});
