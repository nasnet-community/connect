// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import type { RouterConfig } from "../../ConfigGenerator";
// import type {
//     WireguardClientConfig,
//     OpenVpnClientConfig,
//     PptpClientConfig,
//     L2tpClientConfig,
//     SstpClientConfig,
//     Ike2ClientConfig,
//     VPNClient,
// } from "../../../StarContext/Utils/VPNClientType";

// import {
//     VPNSingleLink,
//     VPNMultiLink,
//     VPNClientWrapper,
// } from "./VPNClientCG";

// describe("VPNClientCG Module", () => {
//     describe("VPNSingleLink", () => {
//         it("should create single VPN link route configuration", () => {
//             const vpnClient: VPNClient = {
//                 Wireguard: [
//                     {
//                         Name: "vpn1",
//                         InterfacePrivateKey: "privatekey123",
//                         InterfaceAddress: "10.0.0.2/24",
//                         PeerPublicKey: "publickey123",
//                         PeerEndpointAddress: "1.2.3.4",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNSingleLink",
//                 "Single VPN link routing configuration",
//                 { vpnClient },
//                 () => VPNSingleLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have exactly one route for single link
//             expect(result["/ip route"]).toHaveLength(1);
//             expect(result["/ip route"][0]).toContain("dst-address=0.0.0.0/0");
//             expect(result["/ip route"][0]).toContain("routing-table=to-VPN");
//             expect(result["/ip route"][0]).toContain('comment="Route-to-VPN-vpn1"');
//         });

//         it("should return empty config for no VPN interfaces", () => {
//             const vpnClient: VPNClient = {};

//             const result = testWithOutput(
//                 "VPNSingleLink",
//                 "Empty config for no VPN interfaces",
//                 { vpnClient },
//                 () => VPNSingleLink(vpnClient),
//             );

//             expect(result).toBeDefined();
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should return empty config for multiple VPN interfaces", () => {
//             const vpnClient: VPNClient = {
//                 Wireguard: [
//                     {
//                         Name: "vpn1",
//                         InterfacePrivateKey: "key1",
//                         InterfaceAddress: "10.0.0.2/24",
//                         PeerPublicKey: "pub1",
//                         PeerEndpointAddress: "1.1.1.1",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                     {
//                         Name: "vpn2",
//                         InterfacePrivateKey: "key2",
//                         InterfaceAddress: "10.0.0.3/24",
//                         PeerPublicKey: "pub2",
//                         PeerEndpointAddress: "2.2.2.2",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNSingleLink",
//                 "Empty config for multiple interfaces (not single)",
//                 { vpnClient },
//                 () => VPNSingleLink(vpnClient),
//             );

//             expect(result).toBeDefined();
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should use correct gateway from VPN interface", () => {
//             const vpnClient: VPNClient = {
//                 OpenVPN: [
//                     {
//                         Name: "ovpn-main",
//                         Server: { Address: "vpn.example.com" },
//                         AuthType: "Credentials",
//                         Credentials: { Username: "user", Password: "pass" },
//                         Auth: "sha256",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNSingleLink",
//                 "Single OpenVPN link with correct gateway",
//                 { vpnClient },
//                 () => VPNSingleLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);
//             // Gateway should be the server address from convertVPNClientToMultiWAN
//             expect(result["/ip route"][0]).toContain("gateway=vpn.example.com");
//         });
//     });

//     describe("VPNMultiLink", () => {
//         const createDualWireguardVPN = (): VPNClient => ({
//             Wireguard: [
//                 {
//                     Name: "vpn1",
//                     InterfacePrivateKey: "key1",
//                     InterfaceAddress: "10.0.0.2/24",
//                     PeerPublicKey: "pub1",
//                     PeerEndpointAddress: "1.1.1.1",
//                     PeerEndpointPort: 51820,
//                     PeerAllowedIPs: "0.0.0.0/0",
//                 },
//                 {
//                     Name: "vpn2",
//                     InterfacePrivateKey: "key2",
//                     InterfaceAddress: "10.0.0.3/24",
//                     PeerPublicKey: "pub2",
//                     PeerEndpointAddress: "2.2.2.2",
//                     PeerEndpointPort: 51820,
//                     PeerAllowedIPs: "0.0.0.0/0",
//                 },
//             ],
//         });

//         it("should return empty config for single VPN interface", () => {
//             const vpnClient: VPNClient = {
//                 PPTP: [
//                     {
//                         Name: "pptp1",
//                         ConnectTo: "pptp.example.com",
//                         Credentials: { Username: "user", Password: "pass" },
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Empty config for single interface (not multi)",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             expect(result).toBeDefined();
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should use failover by default when no MultiLinkConfig", () => {
//             const vpnClient = createDualWireguardVPN();

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Default failover routing for multi-link VPN",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have failover routes with different distances
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//             expect(result["/ip route"].some(r => r.includes("routing-table=to-VPN"))).toBe(true);
//         });

//         it("should configure LoadBalance with PCC method", () => {
//             const vpnClient: VPNClient = {
//                 ...createDualWireguardVPN(),
//                 MultiLinkConfig: {
//                     strategy: "LoadBalance",
//                     loadBalanceMethod: "PCC",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Load balance with PCC method",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have routes for load balancing and failover
//             expect(result["/ip route"]).toBeDefined();
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure LoadBalance with NTH method", () => {
//             const vpnClient: VPNClient = {
//                 ...createDualWireguardVPN(),
//                 MultiLinkConfig: {
//                     strategy: "LoadBalance",
//                     loadBalanceMethod: "NTH",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Load balance with NTH method",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have routes for NTH load balancing
//             expect(result["/ip route"]).toBeDefined();
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure LoadBalance with ECMP method (fallback to PCC)", () => {
//             const vpnClient: VPNClient = {
//                 ...createDualWireguardVPN(),
//                 MultiLinkConfig: {
//                     strategy: "LoadBalance",
//                     loadBalanceMethod: "ECMP",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Load balance with ECMP method (fallback to PCC)",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             // Should fallback to PCC configuration
//             validateRouterConfig(result, ["/ip route"]);
//             expect(result["/ip route"]).toBeDefined();
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure Failover strategy", () => {
//             const vpnClient: VPNClient = {
//                 ...createDualWireguardVPN(),
//                 MultiLinkConfig: {
//                     strategy: "Failover",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Failover strategy configuration",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have recursive failover routes
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//             const routes = result["/ip route"];
//             const hasVariedDistances = routes.some(r => r.includes("distance=1")) &&
//                                       routes.some(r => r.includes("distance=2"));
//             expect(hasVariedDistances).toBe(true);
//         });

//         it("should configure RoundRobin strategy", () => {
//             const vpnClient: VPNClient = {
//                 ...createDualWireguardVPN(),
//                 MultiLinkConfig: {
//                     strategy: "RoundRobin",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Round-robin strategy with NTH",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have NTH load balance routes and failover routes
//             expect(result["/ip route"]).toBeDefined();
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure Both strategy (load balance + failover)", () => {
//             const vpnClient: VPNClient = {
//                 ...createDualWireguardVPN(),
//                 MultiLinkConfig: {
//                     strategy: "Both",
//                     loadBalanceMethod: "PCC",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Both strategy with PCC load balancing",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have both PCC load balance routes and failover routes
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should handle mixed VPN types (Wireguard + OpenVPN)", () => {
//             const vpnClient: VPNClient = {
//                 Wireguard: [
//                     {
//                         Name: "wg1",
//                         InterfacePrivateKey: "key1",
//                         InterfaceAddress: "10.0.0.2/24",
//                         PeerPublicKey: "pub1",
//                         PeerEndpointAddress: "1.1.1.1",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                 ],
//                 OpenVPN: [
//                     {
//                         Name: "ovpn1",
//                         Server: { Address: "vpn.example.com" },
//                         AuthType: "Credentials",
//                         Credentials: { Username: "user", Password: "pass" },
//                         Auth: "sha256",
//                     },
//                 ],
//                 MultiLinkConfig: {
//                     strategy: "Failover",
//                 },
//             };

//             const result = testWithOutput(
//                 "VPNMultiLink",
//                 "Mixed VPN types with failover",
//                 { vpnClient },
//                 () => VPNMultiLink(vpnClient),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have routes for both VPN types (check for gateway values, not interface names)
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//             expect(result["/ip route"].some(r => r.includes("10.0.0.2"))).toBe(true); // Wireguard gateway
//             expect(result["/ip route"].some(r => r.includes("vpn.example.com"))).toBe(true); // OpenVPN gateway
//         });

//         it("should route to to-VPN table for all strategies", () => {
//             const vpnClient = createDualWireguardVPN();
//             const strategies = ["Failover", "LoadBalance", "RoundRobin", "Both"] as const;

//             strategies.forEach(strategy => {
//                 const testVPN: VPNClient = {
//                     ...vpnClient,
//                     MultiLinkConfig: { strategy, loadBalanceMethod: "PCC" },
//                 };

//                 const result = testWithOutput(
//                     "VPNMultiLink",
//                     `Verify to-VPN routing table for ${strategy}`,
//                     { vpnClient: testVPN, strategy },
//                     () => VPNMultiLink(testVPN),
//                 );

//                 // Routes should include VPN-related routing tables (to-VPN or to-{interface-name})
//                 if (result["/ip route"]) {
//                     const hasVPNRoutes = result["/ip route"].some(
//                         r => r.includes("routing-table=to-") || r.includes("routing-table=\"to-")
//                     );
//                     expect(hasVPNRoutes).toBe(true);
//                 }
//             });
//         });
//     });

//     describe("VPNClientWrapper", () => {
//         it("should configure Wireguard VPN with base config", () => {
//             const vpnClient: VPNClient = {
//                 Wireguard: [
//                     {
//                         Name: "wg-main",
//                         InterfacePrivateKey: "privatekey123",
//                         InterfaceAddress: "10.0.0.2/24",
//                         PeerPublicKey: "publickey123",
//                         PeerEndpointAddress: "1.2.3.4",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "Wireguard VPN with base config",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             validateRouterConfig(result, [
//                 "/interface wireguard",
//                 "/interface wireguard peers",
//                 "/ip address",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Verify Wireguard interface configuration
//             expect(result["/interface wireguard"].length).toBeGreaterThan(0);
//             expect(result["/interface wireguard peers"].length).toBeGreaterThan(0);

//             // Verify interface list membership
//             expect(result["/interface list member"].length).toBeGreaterThan(0);

//             // Verify routing configuration
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure OpenVPN with base config", () => {
//             const vpnClient: VPNClient = {
//                 OpenVPN: [
//                     {
//                         Name: "ovpn-main",
//                         Server: { Address: "vpn.example.com" },
//                         AuthType: "Credentials",
//                         Credentials: { Username: "user", Password: "pass" },
//                         Auth: "sha256",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "OpenVPN with base config",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             validateRouterConfig(result, [
//                 "/interface ovpn-client",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Verify OpenVPN interface configuration
//             expect(result["/interface ovpn-client"].length).toBeGreaterThan(0);

//             // Verify interface list membership
//             expect(result["/interface list member"].length).toBeGreaterThan(0);

//             // Verify routing configuration
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure PPTP VPN with base config", () => {
//             const vpnClient: VPNClient = {
//                 PPTP: [
//                     {
//                         Name: "pptp-main",
//                         ConnectTo: "pptp.example.com",
//                         Credentials: {
//                             Username: "pptpuser",
//                             Password: "pptppass",
//                         },
//                         AuthMethod: ["mschap2"],
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "PPTP VPN with base config",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             validateRouterConfig(result, [
//                 "/interface pptp-client",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Verify PPTP interface configuration
//             expect(result["/interface pptp-client"].length).toBeGreaterThan(0);

//             // Verify interface list membership
//             expect(result["/interface list member"].length).toBeGreaterThan(0);

//             // Verify routing configuration
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure L2TP VPN with base config", () => {
//             const vpnClient: VPNClient = {
//                 L2TP: [
//                     {
//                         Name: "l2tp-main",
//                         Server: { Address: "l2tp.example.com", Port: 1701 },
//                         Credentials: {
//                             Username: "l2tpuser",
//                             Password: "l2tppass",
//                         },
//                         UseIPsec: true,
//                         IPsecSecret: "sharedsecret",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "L2TP VPN with base config",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             validateRouterConfig(result, [
//                 "/interface l2tp-client",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Verify L2TP interface configuration
//             expect(result["/interface l2tp-client"].length).toBeGreaterThan(0);

//             // Verify interface list membership and routing
//             expect(result["/interface list member"].length).toBeGreaterThan(0);
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure SSTP VPN with base config", () => {
//             const vpnClient: VPNClient = {
//                 SSTP: [
//                     {
//                         Name: "sstp-main",
//                         Server: { Address: "sstp.example.com", Port: 443 },
//                         Credentials: {
//                             Username: "sstpuser",
//                             Password: "sstppass",
//                         },
//                         AuthMethod: ["mschap2"],
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "SSTP VPN with base config",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             validateRouterConfig(result, [
//                 "/interface sstp-client",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Verify SSTP interface configuration
//             expect(result["/interface sstp-client"].length).toBeGreaterThan(0);

//             // Verify interface list membership and routing
//             expect(result["/interface list member"].length).toBeGreaterThan(0);
//             expect(result["/ip route"].length).toBeGreaterThan(0);
//         });

//         it("should configure IKeV2 VPN with base config", () => {
//             const vpnClient: VPNClient = {
//                 IKeV2: [
//                     {
//                         Name: "ikev2-main",
//                         ServerAddress: "ikev2.example.com",
//                         AuthMethod: "pre-shared-key",
//                         PresharedKey: "sharedsecret123",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "IKeV2 VPN with base config",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             validateRouterConfig(result, [
//                 "/ip ipsec profile",
//                 "/ip ipsec proposal",
//                 "/ip ipsec peer",
//                 "/ip ipsec identity",
//                 "/ip ipsec policy",
//                 "/interface list member",
//                 "/ip route",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//             ]);

//             // Verify IKeV2 IPsec configuration
//             expect(result["/ip ipsec peer"].length).toBeGreaterThan(0);
//             expect(result["/ip ipsec identity"].length).toBeGreaterThan(0);

//             // Verify base config (interface list and routes)
//             expect(result["/interface list member"].length).toBeGreaterThan(0);
//             expect(result["/ip route"].length).toBeGreaterThan(0);

//             // Verify address-list and mangle rules
//             expect(result["/ip firewall address-list"].length).toBeGreaterThan(0);
//             expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
//         });

//         it("should return empty config for undefined VPN", () => {
//             const vpnClient: VPNClient = {};

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "Empty config for undefined VPN",
//                 { vpnClient },
//                 () => VPNClientWrapper(vpnClient),
//             );

//             // Empty config should still be a valid RouterConfig object
//             expect(result).toBeDefined();
//             expect(typeof result).toBe("object");

//             // Should have no configuration sections
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should handle all VPN types with proper interface mapping", () => {
//             const vpnTypes = [
//                 {
//                     config: {
//                         Wireguard: [
//                             {
//                                 InterfacePrivateKey: "key",
//                                 InterfaceAddress: "10.0.0.1/24",
//                                 PeerPublicKey: "pubkey",
//                                 PeerEndpointAddress: "1.1.1.1",
//                                 PeerEndpointPort: 51820,
//                                 PeerAllowedIPs: "0.0.0.0/0",
//                             },
//                         ],
//                     },
//                     expectedInterface: "wireguard-client",
//                     type: "Wireguard",
//                 },
//                 {
//                     config: {
//                         OpenVPN: [
//                             {
//                                 Server: { Address: "ovpn.test.com" },
//                                 AuthType: "Credentials" as const,
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                                 Auth: "sha256" as const,
//                             },
//                         ],
//                     },
//                     expectedInterface: "ovpn-client",
//                     type: "OpenVPN",
//                 },
//                 {
//                     config: {
//                         PPTP: [
//                             {
//                                 ConnectTo: "pptp.test.com",
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                             },
//                         ],
//                     },
//                     expectedInterface: "pptp-client",
//                     type: "PPTP",
//                 },
//                 {
//                     config: {
//                         L2TP: [
//                             {
//                                 Server: { Address: "l2tp.test.com" },
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                             },
//                         ],
//                     },
//                     expectedInterface: "l2tp-client",
//                     type: "L2TP",
//                 },
//                 {
//                     config: {
//                         SSTP: [
//                             {
//                                 Server: { Address: "sstp.test.com" },
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                             },
//                         ],
//                     },
//                     expectedInterface: "sstp-client",
//                     type: "SSTP",
//                 },
//                 {
//                     config: {
//                         IKeV2: [
//                             {
//                                 ServerAddress: "ikev2.test.com",
//                                 AuthMethod: "pre-shared-key" as const,
//                                 PresharedKey: "secret",
//                             },
//                         ],
//                     },
//                     expectedInterface: "ike2-client",
//                     type: "IKeV2",
//                 },
//             ];

//             vpnTypes.forEach(({ config, expectedInterface, type }) => {
//                 const result = testWithOutput(
//                     "VPNClientWrapper",
//                     `${type} interface mapping verification`,
//                     { vpnClient: config, domesticLink: false },
//                     () => VPNClientWrapper(config, false),
//                 );

//                 // Verify correct interface name is used in base configuration
//                 if (type !== "IKeV2") {
//                     expect(
//                         result["/interface list member"].some((rule) =>
//                             rule.includes(`interface="${expectedInterface}"`),
//                         ),
//                     ).toBe(true);
//                     expect(
//                         result["/ip route"].some(
//                             (rule) =>
//                                 rule.includes(`gateway=${expectedInterface}`) ||
//                                 rule.includes("routing-table=to-VPN"),
//                         ),
//                     ).toBe(true);
//                 }
//                 // All VPN types now get base configuration including interface lists and routes
//             });
//         });

//         it("should duplicate routes with main table when DomesticLink is false", () => {
//             const vpnClient: VPNClient = {
//                 Wireguard: [
//                     {
//                         InterfacePrivateKey: "test-private-key",
//                         InterfaceAddress: "10.0.0.2/24",
//                         InterfaceDNS: "8.8.8.8",
//                         PeerPublicKey: "test-public-key",
//                         PeerEndpointAddress: "1.2.3.4",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "Route duplication with main table when DomesticLink is false",
//                 { vpnClient, domesticLink: false },
//                 () => VPNClientWrapper(vpnClient, false),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have original routes plus duplicated routes with main table
//             expect(result["/ip route"]).toBeDefined();
//             expect(result["/ip route"].length).toBeGreaterThan(2);

//             // Check for original routes with to-VPN table
//             const vpnTableRoutes = result["/ip route"].filter((route) =>
//                 route.includes("routing-table=to-VPN"),
//             );
//             expect(vpnTableRoutes.length).toBeGreaterThan(0);

//             // Check for duplicated routes with main table
//             const mainTableRoutes = result["/ip route"].filter((route) =>
//                 route.includes("routing-table=main"),
//             );
//             expect(mainTableRoutes.length).toBeGreaterThan(0);

//             // Verify that main table routes are duplicates (same content except table)
//             vpnTableRoutes.forEach((vpnRoute) => {
//                 const expectedMainRoute = vpnRoute.replace(
//                     "routing-table=to-VPN",
//                     "routing-table=main",
//                 );
//                 expect(mainTableRoutes).toContain(expectedMainRoute);
//             });
//         });

//         it("should not duplicate routes when DomesticLink is true", () => {
//             const vpnClient: VPNClient = {
//                 OpenVPN: [
//                     {
//                         Server: { Address: "vpn.example.com" },
//                         AuthType: "Credentials",
//                         Credentials: { Username: "user", Password: "pass" },
//                         Auth: "sha256",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "No route duplication when DomesticLink is true",
//                 { vpnClient, domesticLink: true },
//                 () => VPNClientWrapper(vpnClient, true),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             // Should have only original routes, no duplicates
//             const allRoutes = result["/ip route"] || [];
//             const vpnTableRoutes = allRoutes.filter((route) =>
//                 route.includes("routing-table=to-VPN"),
//             );
//             const mainTableRoutes = allRoutes.filter((route) =>
//                 route.includes("routing-table=main"),
//             );

//             // Should have VPN table routes but no main table routes
//             expect(vpnTableRoutes.length).toBeGreaterThan(0);
//             expect(mainTableRoutes.length).toBe(0);
//         });

//         it("should duplicate routes correctly for all VPN types when DomesticLink is false", () => {
//             const vpnTypes = [
//                 {
//                     name: "Wireguard",
//                     config: {
//                         Wireguard: [
//                             {
//                                 InterfacePrivateKey: "key",
//                                 InterfaceAddress: "10.0.0.1/24",
//                                 PeerPublicKey: "pubkey",
//                                 PeerEndpointAddress: "1.1.1.1",
//                                 PeerEndpointPort: 51820,
//                                 PeerAllowedIPs: "0.0.0.0/0",
//                             },
//                         ],
//                     },
//                 },
//                 {
//                     name: "OpenVPN",
//                     config: {
//                         OpenVPN: [
//                             {
//                                 Server: { Address: "ovpn.test.com" },
//                                 AuthType: "Credentials" as const,
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                                 Auth: "sha256" as const,
//                             },
//                         ],
//                     },
//                 },
//                 {
//                     name: "PPTP",
//                     config: {
//                         PPTP: [
//                             {
//                                 ConnectTo: "pptp.test.com",
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 {
//                     name: "L2TP",
//                     config: {
//                         L2TP: [
//                             {
//                                 Server: { Address: "l2tp.test.com" },
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                             },
//                         ],
//                     },
//                 },
//                 {
//                     name: "SSTP",
//                     config: {
//                         SSTP: [
//                             {
//                                 Server: { Address: "sstp.test.com" },
//                                 Credentials: {
//                                     Username: "user",
//                                     Password: "pass",
//                                 },
//                             },
//                         ],
//                     },
//                 },
//             ];

//             vpnTypes.forEach(({ name, config }) => {
//                 const result = testWithOutput(
//                     "VPNClientWrapper",
//                     `Route duplication for ${name} when DomesticLink is false`,
//                     { vpnClient: config, domesticLink: false },
//                     () => VPNClientWrapper(config, false),
//                 );

//                 if (result["/ip route"]) {
//                     // Check for both VPN table and main table routes
//                     const vpnTableRoutes = result["/ip route"].filter((route) =>
//                         route.includes("routing-table=to-VPN"),
//                     );
//                     const mainTableRoutes = result["/ip route"].filter(
//                         (route) => route.includes("routing-table=main"),
//                     );

//                     expect(vpnTableRoutes.length).toBeGreaterThan(0);
//                     expect(mainTableRoutes.length).toBeGreaterThan(0);

//                     // Verify route duplication
//                     vpnTableRoutes.forEach((vpnRoute) => {
//                         const expectedMainRoute = vpnRoute.replace(
//                             "routing-table=to-VPN",
//                             "routing-table=main",
//                         );
//                         expect(mainTableRoutes).toContain(expectedMainRoute);
//                     });
//                 }
//             });
//         });

//         it("should handle IKeV2 correctly without route duplication", () => {
//             const vpnClient: VPNClient = {
//                 IKeV2: [
//                     {
//                         ServerAddress: "ikev2.test.com",
//                         AuthMethod: "pre-shared-key",
//                         PresharedKey: "secret",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "IKeV2 should not have route duplication (no interface-based routes)",
//                 { vpnClient, domesticLink: false },
//                 () => VPNClientWrapper(vpnClient, false),
//             );

//             // IKeV2 also gets base config with routes and interface lists
//             expect(result["/ip route"]).toBeDefined();
//             expect(result["/interface list member"]).toBeDefined();

//             // But should have other IKeV2-specific configuration
//             expect(result["/ip ipsec peer"]).toBeDefined();
//             expect(result["/ip ipsec identity"]).toBeDefined();
//         });

//         it("should preserve original routes and add duplicates when DomesticLink is false", () => {
//             const vpnClient: VPNClient = {
//                 Wireguard: [
//                     {
//                         InterfacePrivateKey: "preservation-test-key",
//                         InterfaceAddress: "10.0.0.5/24",
//                         PeerPublicKey: "preservation-pub-key",
//                         PeerEndpointAddress: "preserve.test.com",
//                         PeerEndpointPort: 51820,
//                         PeerAllowedIPs: "0.0.0.0/0",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "Preserve original routes and add duplicates",
//                 { vpnClient, domesticLink: false },
//                 () => VPNClientWrapper(vpnClient, false),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             const allRoutes = result["/ip route"];
//             expect(allRoutes).toBeDefined();
//             expect(allRoutes.length).toBeGreaterThanOrEqual(3); // At least 1 original + 2 duplicated (no endpoint route for FQDN)

//             // Should have original Wireguard routes
//             const originalWgRoute = allRoutes.find(
//                 (route) =>
//                     route.includes("dst-address=0.0.0.0/0") &&
//                     route.includes("gateway=wireguard-client") &&
//                     route.includes("routing-table=to-VPN"),
//             );
//             expect(originalWgRoute).toBeDefined();

//             // Should have duplicated route with main table
//             const duplicatedWgRoute = allRoutes.find(
//                 (route) =>
//                     route.includes("dst-address=0.0.0.0/0") &&
//                     route.includes("gateway=wireguard-client") &&
//                     route.includes("routing-table=main"),
//             );
//             expect(duplicatedWgRoute).toBeDefined();

//             // Note: preserve.test.com is a FQDN, so no endpoint route is created
//             // (endpoint routes are only created for IP addresses)
//         });

//         it("should handle empty VPN configuration gracefully", () => {
//             const vpnClient: VPNClient = {};

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "Handle empty VPN configuration",
//                 { vpnClient, domesticLink: false },
//                 () => VPNClientWrapper(vpnClient, false),
//             );

//             // Should return empty config without errors
//             expect(result).toBeDefined();
//             expect(typeof result).toBe("object");
//             expect(Object.keys(result)).toHaveLength(0);
//         });

//         it("should verify route table replacement regex works correctly", () => {
//             // Test the regex replacement logic directly through the wrapper
//             const vpnClient: VPNClient = {
//                 OpenVPN: [
//                     {
//                         Server: { Address: "regex.test.com" },
//                         AuthType: "Credentials",
//                         Credentials: { Username: "user", Password: "pass" },
//                         Auth: "sha256",
//                     },
//                 ],
//             };

//             const result = testWithOutput(
//                 "VPNClientWrapper",
//                 "Verify routing table regex replacement",
//                 { vpnClient, domesticLink: false },
//                 () => VPNClientWrapper(vpnClient, false),
//             );

//             validateRouterConfig(result, ["/ip route"]);

//             const allRoutes = result["/ip route"];

//             // Find routes that should have been converted
//             const mainTableRoutes = allRoutes.filter((route) =>
//                 route.includes("routing-table=main"),
//             );

//             // Verify no route has malformed table names from regex replacement
//             mainTableRoutes.forEach((route) => {
//                 expect(route).not.toMatch(/routing-table=to-VPNmain/); // Should not have concatenated names
//                 expect(route).not.toMatch(/routing-table=mainVPN/); // Should not have partial replacements
//                 expect(route).toMatch(/routing-table=main(\s|$)/); // Should have clean 'main' table
//             });

//             // Verify original routes still exist with correct table names
//             const vpnTableRoutes = allRoutes.filter((route) =>
//                 route.includes("routing-table=to-VPN"),
//             );

//             vpnTableRoutes.forEach((route) => {
//                 expect(route).toMatch(/routing-table=to-VPN(\s|$)/); // Should have clean 'to-VPN' table
//                 expect(route).not.toMatch(/routing-table=to-VPNmain/); // Should not be corrupted
//             });
//         });
//     });
// });
