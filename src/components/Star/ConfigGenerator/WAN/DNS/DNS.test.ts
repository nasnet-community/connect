// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import { DNSForwarders, DNSmDNSRepeater } from "./DNS";
// import type { DNSConfig } from "../../../StarContext/WANType";
// import type { Networks } from "../../../StarContext/CommonType";

// describe("DNS Configuration Tests", () => {
//     describe("DNSForwarders", () => {
//         it("should create DNS forwarders for configured networks", () => {
//             const dnsConfig: DNSConfig = {
//                 ForeignDNS: "1.1.1.1",
//                 VPNDNS: "8.8.8.8",
//                 DomesticDNS: "178.22.122.100",
//                 SplitDNS: "4.2.2.4",
//                 DOH: {
//                     domain: "cloudflare-dns.com",
//                     bindingIP: "178.22.122.100",
//                 },
//             };

//             const baseNetworks: Networks[] = [
//                 "Foreign",
//                 "VPN",
//                 "Domestic",
//                 "Split",
//             ];

//             const result = DNSForwarders(dnsConfig, baseNetworks);

//             // Verify DNS forwarders are created
//             expect(result["/ip dns forwarders"]).toBeDefined();
//             expect(result["/ip dns forwarders"].length).toBe(4);

//             // Check specific forwarders
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=FOREIGN dns-servers=1.1.1.1",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=VPN dns-servers=8.8.8.8",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=DOMESTIC dns-servers=178.22.122.100 doh-servers=https://cloudflare-dns.com/dns-query verify-doh-cert=yes",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=SPLIT dns-servers=4.2.2.4",
//             );

//             // Verify only DNS forwarders are configured (no additional DNS settings)
//             expect(result["/ip dns forwarders"]).toBeDefined();
//             expect(result["/ip dns"]).toBeUndefined();
//         });

//         it("should handle empty DNS configurations", () => {
//             const dnsConfig: DNSConfig = {};
//             const baseNetworks: Networks[] = ["Foreign", "VPN"];

//             const result = DNSForwarders(dnsConfig, baseNetworks);

//             expect(result["/ip dns forwarders"]).toBeDefined();
//             expect(result["/ip dns forwarders"].length).toBe(0);
//             expect(result["/ip dns"]).toBeUndefined();
//         });

//         it("should only create forwarders for networks with DNS servers", () => {
//             const dnsConfig: DNSConfig = {
//                 ForeignDNS: "1.1.1.1",
//                 // VPN DNS is not configured
//                 DomesticDNS: "178.22.122.100",
//             };
//             const baseNetworks: Networks[] = ["Foreign", "VPN", "Domestic"];

//             const result = DNSForwarders(dnsConfig, baseNetworks);

//             expect(result["/ip dns forwarders"].length).toBe(2);
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=FOREIGN dns-servers=1.1.1.1",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=DOMESTIC dns-servers=178.22.122.100",
//             );

//             // Should not create VPN forwarder
//             expect(
//                 result["/ip dns forwarders"].some((cmd) => cmd.includes("VPN")),
//             ).toBe(false);

//             // No additional DNS settings should be configured
//             expect(result["/ip dns"]).toBeUndefined();
//         });

//         it("should handle DoH configuration correctly", () => {
//             const dnsConfig: DNSConfig = {
//                 ForeignDNS: "1.1.1.1",
//                 DomesticDNS: "178.22.122.100",
//                 DOH: {
//                     domain: "dns.google",
//                     bindingIP: "8.8.8.8",
//                 },
//             };
//             const baseNetworks: Networks[] = ["Foreign", "Domestic"];

//             const result = DNSForwarders(dnsConfig, baseNetworks);

//             // Foreign should NOT have DoH - only regular DNS
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=FOREIGN dns-servers=1.1.1.1",
//             );

//             // Domestic should use DoH domain (DoH is only configured for Domestic)
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=DOMESTIC dns-servers=178.22.122.100 doh-servers=https://dns.google/dns-query verify-doh-cert=yes",
//             );
//         });

//         it("should only configure DoH for Domestic network", () => {
//             const dnsConfig: DNSConfig = {
//                 ForeignDNS: "1.1.1.1",
//                 VPNDNS: "8.8.8.8",
//                 SplitDNS: "4.2.2.4",
//                 DomesticDNS: "178.22.122.100",
//                 DOH: {
//                     domain: "cloudflare-dns.com",
//                     bindingIP: "178.22.122.100",
//                 },
//             };
//             const baseNetworks: Networks[] = [
//                 "Foreign",
//                 "VPN",
//                 "Split",
//                 "Domestic",
//             ];

//             const result = DNSForwarders(dnsConfig, baseNetworks);

//             // Only Domestic should have DoH configured
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=DOMESTIC dns-servers=178.22.122.100 doh-servers=https://cloudflare-dns.com/dns-query verify-doh-cert=yes",
//             );

//             // All other networks should NOT have DoH
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=FOREIGN dns-servers=1.1.1.1",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=VPN dns-servers=8.8.8.8",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=SPLIT dns-servers=4.2.2.4",
//             );

//             // Verify no DoH configuration in non-domestic forwarders
//             const nonDomesticForwarders = result["/ip dns forwarders"].filter(
//                 (cmd) => !cmd.includes("DOMESTIC"),
//             );
//             nonDomesticForwarders.forEach((forwarder) => {
//                 expect(forwarder).not.toContain("doh-servers");
//                 expect(forwarder).not.toContain("verify-doh-cert");
//             });
//         });

//         it("should work with no base networks provided", () => {
//             const dnsConfig: DNSConfig = {
//                 ForeignDNS: "1.1.1.1",
//                 VPNDNS: "8.8.8.8",
//             };

//             const result = DNSForwarders(dnsConfig);

//             expect(result["/ip dns forwarders"]).toBeDefined();
//             expect(result["/ip dns forwarders"].length).toBe(0);
//             expect(result["/ip dns"]).toBeUndefined();
//         });

//         it("should ignore empty or whitespace DNS servers", () => {
//             const dnsConfig: DNSConfig = {
//                 ForeignDNS: "1.1.1.1",
//                 VPNDNS: "   ", // whitespace only
//                 DomesticDNS: "", // empty string
//                 SplitDNS: "4.2.2.4",
//             };
//             const baseNetworks: Networks[] = [
//                 "Foreign",
//                 "VPN",
//                 "Domestic",
//                 "Split",
//             ];

//             const result = DNSForwarders(dnsConfig, baseNetworks);

//             expect(result["/ip dns forwarders"].length).toBe(2);
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=FOREIGN dns-servers=1.1.1.1",
//             );
//             expect(result["/ip dns forwarders"]).toContain(
//                 "add name=SPLIT dns-servers=4.2.2.4",
//             );

//             // No additional DNS settings should be configured
//             expect(result["/ip dns"]).toBeUndefined();
//         });
//     });

//     describe("DNSmDNSRepeater", () => {
//         it("should create mDNS repeater configuration for base networks", () => {
//             const baseNetworks: Networks[] = [
//                 "Foreign",
//                 "VPN",
//                 "Domestic",
//                 "Split",
//             ];

//             const result = DNSmDNSRepeater(baseNetworks);

//             expect(result["/ip dns"]).toBeDefined();
//             expect(result["/ip dns"].length).toBe(1);
//             expect(result["/ip dns"]).toContain(
//                 "set mdns-repeat-ifaces=LANBridgeFRN,LANBridgeVPN,LANBridgeDOM,LANBridgeSplit",
//             );
//         });

//         it("should handle single network", () => {
//             const baseNetworks: Networks[] = ["Foreign"];

//             const result = DNSmDNSRepeater(baseNetworks);

//             expect(result["/ip dns"]).toBeDefined();
//             expect(result["/ip dns"]).toContain(
//                 "set mdns-repeat-ifaces=LANBridgeFRN",
//             );
//         });

//         it("should handle empty base networks array", () => {
//             const baseNetworks: Networks[] = [];

//             const result = DNSmDNSRepeater(baseNetworks);

//             expect(result["/ip dns"]).toBeDefined();
//             expect(result["/ip dns"].length).toBe(0);
//         });

//         it("should handle no parameters", () => {
//             const result = DNSmDNSRepeater();

//             expect(result["/ip dns"]).toBeDefined();
//             expect(result["/ip dns"].length).toBe(0);
//         });

//         it("should create correct bridge interface names", () => {
//             const baseNetworks: Networks[] = ["Domestic", "VPN"];

//             const result = DNSmDNSRepeater(baseNetworks);

//             expect(result["/ip dns"]).toContain(
//                 "set mdns-repeat-ifaces=LANBridgeDOM,LANBridgeVPN",
//             );
//         });
//     });
// });
