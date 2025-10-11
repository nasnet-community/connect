// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import { OpenVPNClient, OpenVPNClientWrapper } from "./OpenVPN";
// import type { OpenVpnClientConfig } from "~/components/Star/StarContext";

// describe("OpenVPN Protocol Module", () => {
//     describe("OpenVPNClient", () => {
//         it("should configure basic OpenVPN client with credentials", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-basic",
//                 Server: { Address: "vpn.example.com" },
//                 AuthType: "Credentials",
//                 Credentials: { Username: "ovpnuser", Password: "ovpnpass" },
//                 Auth: "sha256",
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "Basic OpenVPN client with credentials",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             validateRouterConfig(result, ["/interface ovpn-client"]);

//             const command = result["/interface ovpn-client"][0];
//             expect(command).toContain("name=ovpn-client-ovpn-basic");
//             expect(command).toContain('connect-to="vpn.example.com"');
//             expect(command).toContain('user="ovpnuser"');
//             expect(command).toContain('password="ovpnpass"');
//             expect(command).toContain("auth=sha256");
//             expect(command).toContain("disabled=no");
//         });

//         it("should configure OpenVPN with custom port", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-port",
//                 Server: { Address: "vpn.example.com", Port: 1194 },
//                 AuthType: "Credentials",
//                 Credentials: { Username: "user", Password: "pass" },
//                 Auth: "sha1",
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "OpenVPN client with custom port",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             expect(result["/interface ovpn-client"][0]).toContain("port=1194");
//         });

//         it("should configure protocol (UDP/TCP)", () => {
//             const protocols = [
//                 { protocol: "udp" as const, desc: "UDP protocol" },
//                 { protocol: "tcp-client" as const, desc: "TCP protocol" },
//             ];

//             protocols.forEach(({ protocol, desc }) => {
//                 const config: OpenVpnClientConfig = {
//                     Name: `ovpn-${protocol}`,
//                     Server: { Address: "vpn.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                     Protocol: protocol,
//                 };

//                 const result = testWithOutput(
//                     "OpenVPNClient",
//                     `OpenVPN with ${desc}`,
//                     { config, protocol },
//                     () => OpenVPNClient(config),
//                 );

//                 expect(result["/interface ovpn-client"][0]).toContain(`protocol=${protocol}`);
//             });
//         });

//         it("should configure mode (IP/Ethernet)", () => {
//             const modes = [
//                 { mode: "ip" as const, desc: "IP mode" },
//                 { mode: "ethernet" as const, desc: "Ethernet mode" },
//             ];

//             modes.forEach(({ mode, desc }) => {
//                 const config: OpenVpnClientConfig = {
//                     Name: `ovpn-${mode}`,
//                     Server: { Address: "vpn.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                     Mode: mode,
//                 };

//                 const result = testWithOutput(
//                     "OpenVPNClient",
//                     `OpenVPN with ${desc}`,
//                     { config, mode },
//                     () => OpenVPNClient(config),
//                 );

//                 expect(result["/interface ovpn-client"][0]).toContain(`mode=${mode}`);
//             });
//         });

//         it("should configure cipher", () => {
//             const ciphers = ["aes256-cbc", "aes128-gcm", "aes256-gcm"];

//             ciphers.forEach((cipher) => {
//                 const config: OpenVpnClientConfig = {
//                     Name: `ovpn-${cipher}`,
//                     Server: { Address: "vpn.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                     Cipher: cipher,
//                 };

//                 const result = testWithOutput(
//                     "OpenVPNClient",
//                     `OpenVPN with cipher ${cipher}`,
//                     { config, cipher },
//                     () => OpenVPNClient(config),
//                 );

//                 expect(result["/interface ovpn-client"][0]).toContain(`cipher=${cipher}`);
//             });
//         });

//         it("should configure TLS version", () => {
//             const tlsVersions = ["any", "only-1.2", "only-1.3"] as const;

//             tlsVersions.forEach((tls) => {
//                 const config: OpenVpnClientConfig = {
//                     Name: `ovpn-tls-${tls}`,
//                     Server: { Address: "vpn.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                     TlsVersion: tls,
//                 };

//                 const result = testWithOutput(
//                     "OpenVPNClient",
//                     `OpenVPN with TLS version ${tls}`,
//                     { config, tls },
//                     () => OpenVPNClient(config),
//                 );

//                 expect(result["/interface ovpn-client"][0]).toContain(`tls-version=${tls}`);
//             });
//         });

//         it("should configure certificate-based authentication", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-cert",
//                 Server: { Address: "secure.vpn.com" },
//                 AuthType: "Certificate",
//                 Auth: "sha256",
//                 Certificates: {
//                     ClientCertificateName: "my-client-cert",
//                 },
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "OpenVPN with certificate authentication",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             const command = result["/interface ovpn-client"][0];
//             expect(command).not.toContain("user=");
//             expect(command).not.toContain("password=");
//             expect(command).toContain("certificate=my-client-cert");
//         });

//         it("should not include certificate name if content is provided", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-cert-content",
//                 Server: { Address: "vpn.com" },
//                 AuthType: "Certificate",
//                 Auth: "sha256",
//                 Certificates: {
//                     ClientCertificateName: "my-cert",
//                     ClientCertificateContent: "---BEGIN CERT---",
//                 },
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "OpenVPN with certificate content (not name)",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             // Should not include certificate name when content is provided
//             expect(result["/interface ovpn-client"][0]).not.toContain("certificate=");
//         });

//         it("should configure verify server certificate", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-verify",
//                 Server: { Address: "vpn.com" },
//                 AuthType: "Credentials",
//                 Credentials: { Username: "user", Password: "pass" },
//                 Auth: "sha256",
//                 VerifyServerCertificate: true,
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "OpenVPN with server certificate verification",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             expect(result["/interface ovpn-client"][0]).toContain(
//                 "verify-server-certificate=yes",
//             );
//         });

//         it("should configure route-nopull (add-default-route)", () => {
//             const testCases = [
//                 { RouteNoPull: true, expected: "add-default-route=no" },
//                 { RouteNoPull: false, expected: "add-default-route=yes" },
//             ];

//             testCases.forEach(({ RouteNoPull, expected }) => {
//                 const config: OpenVpnClientConfig = {
//                     Name: "ovpn-route",
//                     Server: { Address: "vpn.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                     RouteNoPull,
//                 };

//                 const result = testWithOutput(
//                     "OpenVPNClient",
//                     `OpenVPN with RouteNoPull=${RouteNoPull}`,
//                     { config, RouteNoPull, expected },
//                     () => OpenVPNClient(config),
//                 );

//                 expect(result["/interface ovpn-client"][0]).toContain(expected);
//             });
//         });

//         it("should configure complete OpenVPN client with all options", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-complete",
//                 Server: { Address: "complete.vpn.com", Port: 1194 },
//                 Mode: "ip",
//                 Protocol: "udp",
//                 AuthType: "Credentials",
//                 Credentials: { Username: "completeuser", Password: "completepass" },
//                 Auth: "sha512",
//                 Cipher: "aes256-gcm",
//                 TlsVersion: "only-1.2",
//                 VerifyServerCertificate: true,
//                 RouteNoPull: false,
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "Complete OpenVPN configuration with all options",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             const command = result["/interface ovpn-client"][0];

//             expect(command).toContain("name=ovpn-client-ovpn-complete");
//             expect(command).toContain('connect-to="complete.vpn.com"');
//             expect(command).toContain("port=1194");
//             expect(command).toContain("protocol=udp");
//             expect(command).toContain("mode=ip");
//             expect(command).toContain('user="completeuser"');
//             expect(command).toContain('password="completepass"');
//             expect(command).toContain("auth=sha512");
//             expect(command).toContain("cipher=aes256-gcm");
//             expect(command).toContain("tls-version=only-1.2");
//             expect(command).toContain("verify-server-certificate=yes");
//             expect(command).toContain("add-default-route=yes");
//             expect(command).toContain("disabled=no");
//         });

//         it("should handle special characters in credentials", () => {
//             const config: OpenVpnClientConfig = {
//                 Name: "ovpn-special",
//                 Server: { Address: "special.vpn.com" },
//                 AuthType: "Credentials",
//                 Credentials: {
//                     Username: 'user"with"quotes',
//                     Password: 'pass$with$special',
//                 },
//                 Auth: "sha256",
//             };

//             const result = testWithOutput(
//                 "OpenVPNClient",
//                 "OpenVPN with special characters in credentials",
//                 { config },
//                 () => OpenVPNClient(config),
//             );

//             const command = result["/interface ovpn-client"][0];
//             expect(command).toContain('user="user"with"quotes"');
//             expect(command).toContain('password="pass$with$special"');
//         });
//     });

//     describe("OpenVPNClientWrapper", () => {
//         it("should configure single OpenVPN client with base config", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "vpn1",
//                     Server: { Address: "vpn.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user1", Password: "pass1" },
//                     Auth: "sha256",
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "Single OpenVPN client with base configuration",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             validateRouterConfig(result, [
//                 "/interface ovpn-client",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Check client configuration
//             expect(result["/interface ovpn-client"][0]).toContain("name=ovpn-client-vpn1");

//             // Check base config is included
//             expect(result["/interface list member"]).toBeDefined();
//             expect(result["/ip route"]).toBeDefined();
//         });

//         it("should configure multiple OpenVPN clients", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "vpn1",
//                     Server: { Address: "vpn1.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user1", Password: "pass1" },
//                     Auth: "sha256",
//                 },
//                 {
//                     Name: "vpn2",
//                     Server: { Address: "vpn2.example.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user2", Password: "pass2" },
//                     Auth: "sha512",
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "Multiple OpenVPN clients configuration",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Should have configuration for both clients
//             expect(result["/interface ovpn-client"].length).toBe(2);
//             expect(result["/interface ovpn-client"][0]).toContain("name=ovpn-client-vpn1");
//             expect(result["/interface ovpn-client"][1]).toContain("name=ovpn-client-vpn2");

//             // Each client should have base config (2 interface list entries each)
//             expect(result["/interface list member"].length).toBeGreaterThanOrEqual(4);
//         });

//         it("should include certificate script when certificates provided", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "vpn-cert",
//                     Server: { Address: "secure.vpn.com" },
//                     AuthType: "Certificate",
//                     Auth: "sha256",
//                     Certificates: {
//                         CaCertificateName: "ca-cert",
//                         CaCertificateContent: "---BEGIN CA CERT---",
//                         ClientCertificateName: "client-cert",
//                         ClientCertificateContent: "---BEGIN CLIENT CERT---",
//                         ClientKeyContent: "---BEGIN KEY---",
//                     },
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "OpenVPN with certificate installation script",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Should include system script for certificate installation
//             expect(result["/system script"]).toBeDefined();
//             expect(result["/system scheduler"]).toBeDefined();

//             // Check certificate script contains certificates
//             const scriptCommand = result["/system script"][0];
//             expect(scriptCommand).toContain("InstallOVPN-Certs");
//         });

//         it("should generate correct interface names", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "test-vpn",
//                     Server: { Address: "test.vpn.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "OpenVPN with interface name generation",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Check that interface name follows naming convention
//             const hasCorrectInterface = result["/interface list member"].some(
//                 (cmd) => cmd.includes('interface="ovpn-client-test-vpn"'),
//             );
//             expect(hasCorrectInterface).toBe(true);
//         });

//         it("should route endpoint through correct routing table", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "route-test",
//                     Server: { Address: "1.2.3.4" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "OpenVPN with endpoint routing",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Check endpoint is in address list
//             const hasEndpoint = result["/ip firewall address-list"].some(
//                 (cmd) => cmd.includes('address="1.2.3.4"'),
//             );
//             expect(hasEndpoint).toBe(true);

//             // Check mangle rules exist for endpoint routing
//             expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
//         });

//         it("should create VPN routing table entries", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "routing-test",
//                     Server: { Address: "routing.vpn.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "OpenVPN with VPN routing",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Check route is created in VPN routing table
//             const hasVpnRoute = result["/ip route"].some(
//                 (cmd) => cmd.includes("routing-table=to-VPN-routing-test"),
//             );
//             expect(hasVpnRoute).toBe(true);
//         });

//         it("should add interface to WAN and VPN-WAN lists", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "lists-test",
//                     Server: { Address: "lists.vpn.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "OpenVPN interface list memberships",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Check both WAN and VPN-WAN list memberships
//             const hasWanList = result["/interface list member"].some(
//                 (cmd) => cmd.includes('list="WAN"'),
//             );
//             const hasVpnWanList = result["/interface list member"].some(
//                 (cmd) => cmd.includes('list="VPN-WAN"'),
//             );

//             expect(hasWanList).toBe(true);
//             expect(hasVpnWanList).toBe(true);
//         });

//         it("should return empty config for empty array", () => {
//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "Empty configuration array",
//                 { configs: [] },
//                 () => OpenVPNClientWrapper([]),
//             );

//             expect(result).toBeDefined();
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should handle mixed credential and certificate auth", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "cred-vpn",
//                     Server: { Address: "cred.vpn.com" },
//                     AuthType: "Credentials",
//                     Credentials: { Username: "user", Password: "pass" },
//                     Auth: "sha256",
//                 },
//                 {
//                     Name: "cert-vpn",
//                     Server: { Address: "cert.vpn.com" },
//                     AuthType: "Certificate",
//                     Auth: "sha256",
//                     Certificates: {
//                         ClientCertificateName: "my-cert",
//                     },
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "Mixed credential and certificate authentication",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Both clients should be configured
//             expect(result["/interface ovpn-client"].length).toBe(2);
//             expect(result["/interface ovpn-client"][0]).toContain('user="user"');
//             expect(result["/interface ovpn-client"][1]).toContain("certificate=my-cert");
//         });

//         it("should handle both inline certificates and named certificates", () => {
//             const configs: OpenVpnClientConfig[] = [
//                 {
//                     Name: "inline-cert",
//                     Server: { Address: "inline.vpn.com" },
//                     AuthType: "Certificate",
//                     Auth: "sha256",
//                     Certificates: {
//                         CaCertificateContent: "---CA---",
//                         ClientCertificateContent: "---CERT---",
//                         ClientKeyContent: "---KEY---",
//                     },
//                 },
//                 {
//                     Name: "named-cert",
//                     Server: { Address: "named.vpn.com" },
//                     AuthType: "Certificate",
//                     Auth: "sha256",
//                     Certificates: {
//                         ClientCertificateName: "existing-cert",
//                     },
//                 },
//             ];

//             const result = testWithOutput(
//                 "OpenVPNClientWrapper",
//                 "Mixed inline and named certificates",
//                 { configs },
//                 () => OpenVPNClientWrapper(configs),
//             );

//             // Inline cert should have installation script
//             expect(result["/system script"]).toBeDefined();

//             // Named cert should reference the certificate
//             expect(result["/interface ovpn-client"][1]).toContain("certificate=existing-cert");
//         });
//     });
// });
