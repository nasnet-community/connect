import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    BaseDNSSettins,
    DNSForwarders,
    MDNS,
    IRTLDRegex,
    BlockWANDNS,
    DOH,
    DNSForeward,
    FRNDNSFWD,
    DNS,
} from "./DNS";
import type { Networks, Subnets } from "~/components/Star/StarContext";

describe("DNS Configuration Module", () => {
    describe("BaseDNSSettins", () => {
        it("should configure base DNS settings", () => {
            const result = testWithOutput(
                "BaseDNSSettins",
                "Base DNS configuration",
                {},
                () => BaseDNSSettins(),
            );

            validateRouterConfig(result, ["/ip dns"]);

            // Verify DNS settings
            expect(result["/ip dns"][0]).toContain("allow-remote-requests=yes");
            expect(result["/ip dns"][0]).toContain("max-concurrent-queries=200");
            expect(result["/ip dns"][0]).toContain("cache-size=51200KiB");
            expect(result["/ip dns"][0]).toContain("cache-max-ttl=7d");
        });
    });

    describe("DNSForwarders", () => {
        it("should return empty forwarders when networks is undefined", () => {
            const result = testWithOutput(
                "DNSForwarders",
                "Undefined networks",
                { networks: undefined },
                () => DNSForwarders(undefined),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            expect(result["/ip dns forwarders"].length).toBe(0);
        });

        it("should return empty forwarders when BaseNetworks is undefined", () => {
            const networks: Networks = {};

            const result = testWithOutput(
                "DNSForwarders",
                "No BaseNetworks defined",
                { networks },
                () => DNSForwarders(networks),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            expect(result["/ip dns forwarders"].length).toBe(0);
        });

        it("should configure Domestic DNS forwarder", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Domestic: true,
                },
            };

            const result = testWithOutput(
                "DNSForwarders",
                "Domestic network only",
                { networks },
                () => DNSForwarders(networks),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            expect(result["/ip dns forwarders"].length).toBe(1);
            expect(result["/ip dns forwarders"][0]).toContain("name=Domestic");
            expect(result["/ip dns forwarders"][0]).toContain("dns-servers=");
            // Should use first 5 Domestic CheckIPs
            expect(result["/ip dns forwarders"][0]).toContain("10.202.10.10");
        });

        it("should configure Foreign DNS forwarder", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Foreign: true,
                },
            };

            const result = testWithOutput(
                "DNSForwarders",
                "Foreign network only",
                { networks },
                () => DNSForwarders(networks),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            expect(result["/ip dns forwarders"].length).toBe(1);
            expect(result["/ip dns forwarders"][0]).toContain("name=Foreign");
            expect(result["/ip dns forwarders"][0]).toContain("dns-servers=");
            // Should use first 5 Foreign CheckIPs (Google, Cloudflare, etc.)
            expect(result["/ip dns forwarders"][0]).toContain("8.8.8.8");
            expect(result["/ip dns forwarders"][0]).toContain("1.1.1.1");
        });

        it("should configure VPN DNS forwarder", () => {
            const networks: Networks = {
                BaseNetworks: {
                    VPN: true,
                },
            };

            const result = testWithOutput(
                "DNSForwarders",
                "VPN network only",
                { networks },
                () => DNSForwarders(networks),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            expect(result["/ip dns forwarders"].length).toBe(1);
            expect(result["/ip dns forwarders"][0]).toContain("name=VPN");
            expect(result["/ip dns forwarders"][0]).toContain("dns-servers=");
            // Should use different Foreign CheckIPs (offset by 5)
            expect(result["/ip dns forwarders"][0]).toContain("9.9.9.9");
        });

        it("should configure all three DNS forwarders", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Domestic: true,
                    Foreign: true,
                    VPN: true,
                },
            };

            const result = testWithOutput(
                "DNSForwarders",
                "All networks enabled",
                { networks },
                () => DNSForwarders(networks),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            expect(result["/ip dns forwarders"].length).toBe(3);

            // Check all three forwarders exist
            const hasDomestic = result["/ip dns forwarders"].some(
                (cmd) => cmd.includes("name=Domestic"),
            );
            const hasForeign = result["/ip dns forwarders"].some(
                (cmd) => cmd.includes("name=Foreign"),
            );
            const hasVPN = result["/ip dns forwarders"].some((cmd) => cmd.includes("name=VPN"));

            expect(hasDomestic).toBe(true);
            expect(hasForeign).toBe(true);
            expect(hasVPN).toBe(true);
        });

        it("should configure Split network (no DNS forwarder)", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                },
            };

            const result = testWithOutput(
                "DNSForwarders",
                "Split network only",
                { networks },
                () => DNSForwarders(networks),
            );

            validateRouterConfig(result, ["/ip dns forwarders"]);
            // Split doesn't create a DNS forwarder
            expect(result["/ip dns forwarders"].length).toBe(0);
        });
    });

    describe("MDNS", () => {
        it("should return empty config when no bridge interfaces exist", () => {
            const networks: Networks = {
                BaseNetworks: {},
            };

            const result = testWithOutput(
                "MDNS",
                "No bridge interfaces",
                { networks },
                () => MDNS(networks),
            );

            validateRouterConfig(result, ["/ip dns"]);
            expect(result["/ip dns"].length).toBe(0);
        });

        it("should configure mDNS for single bridge", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                },
            };

            const subnets: Subnets = {
                BaseNetworks: {
                    Split: {
                        name: "Split",
                        subnet: "192.168.10.0/24",
                    },
                },
            };

            const result = testWithOutput(
                "MDNS",
                "Single bridge (Split network)",
                { networks, subnets },
                () => MDNS(networks, subnets),
            );

            validateRouterConfig(result, ["/ip dns"]);
            expect(result["/ip dns"][0]).toContain("mdns-repeat-ifaces=LANBridgeSplit");
        });

        it("should configure mDNS for multiple bridges", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                    Domestic: true,
                    Foreign: true,
                    VPN: true,
                },
            };

            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
            };

            const result = testWithOutput(
                "MDNS",
                "Multiple bridges (all base networks)",
                { networks, subnets },
                () => MDNS(networks, subnets),
            );

            validateRouterConfig(result, ["/ip dns"]);
            expect(result["/ip dns"][0]).toContain("mdns-repeat-ifaces=");
            expect(result["/ip dns"][0]).toContain("LANBridgeSplit");
            expect(result["/ip dns"][0]).toContain("LANBridgeDomestic");
            expect(result["/ip dns"][0]).toContain("LANBridgeForeign");
            expect(result["/ip dns"][0]).toContain("LANBridgeVPN");
        });

        it("should only include bridges with valid subnets", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                    Domestic: true,
                    Foreign: true,
                },
            };

            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    // Domestic has network enabled but no subnet
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                },
            };

            const result = testWithOutput(
                "MDNS",
                "Networks with partial subnets",
                { networks, subnets },
                () => MDNS(networks, subnets),
            );

            validateRouterConfig(result, ["/ip dns"]);
            expect(result["/ip dns"][0]).toContain("LANBridgeSplit");
            expect(result["/ip dns"][0]).toContain("LANBridgeForeign");
            // Should not include Domestic since it has no subnet
            expect(result["/ip dns"][0]).not.toContain("LANBridgeDomestic");
        });
    });

    describe("IRTLDRegex", () => {
        it("should configure .ir TLD forwarding rule", () => {
            const result = testWithOutput(
                "IRTLDRegex",
                "Iranian TLD forwarding",
                {},
                () => IRTLDRegex(),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"].length).toBe(1);
            expect(result["/ip dns static"][0]).toContain("name=IRTLD");
            expect(result["/ip dns static"][0]).toContain("type=FWD");
            expect(result["/ip dns static"][0]).toContain('regexp=".*\\\\.ir\\$"');
            expect(result["/ip dns static"][0]).toContain("forward-to=Domestic");
            expect(result["/ip dns static"][0]).toContain("match-subdomain=yes");
            expect(result["/ip dns static"][0]).toContain(
                "Forward .ir TLD queries via domestic DNS",
            );
        });
    });

    describe("BlockWANDNS", () => {
        it("should configure firewall rules to block open recursive DNS", () => {
            const result = testWithOutput(
                "BlockWANDNS",
                "Block open recursive DNS on WAN",
                {},
                () => BlockWANDNS(),
            );

            validateRouterConfig(result, ["/ip firewall filter"]);
            expect(result["/ip firewall filter"].length).toBe(2);

            // Check TCP rule
            const tcpRule = result["/ip firewall filter"].find((cmd) =>
                cmd.includes("protocol=tcp"),
            );
            expect(tcpRule).toBeDefined();
            expect(tcpRule).toContain("chain=input");
            expect(tcpRule).toContain("dst-port=53");
            expect(tcpRule).toContain("in-interface-list=WAN");
            expect(tcpRule).toContain("action=drop");

            // Check UDP rule
            const udpRule = result["/ip firewall filter"].find((cmd) =>
                cmd.includes("protocol=udp"),
            );
            expect(udpRule).toBeDefined();
            expect(udpRule).toContain("chain=input");
            expect(udpRule).toContain("dst-port=53");
            expect(udpRule).toContain("in-interface-list=WAN");
            expect(udpRule).toContain("action=drop");
        });
    });

    describe("DOH", () => {
        it("should configure DNS over HTTPS with Google DNS", () => {
            const result = testWithOutput(
                "DOH",
                "DNS over HTTPS configuration",
                {},
                () => DOH(),
            );

            validateRouterConfig(result, ["/ip dns static", "/ip dns"]);

            // Check static DNS entry for google.com
            expect(result["/ip dns static"].length).toBe(1);
            expect(result["/ip dns static"][0]).toContain("address=8.8.8.8");
            expect(result["/ip dns static"][0]).toContain('name="google.com"');
            expect(result["/ip dns static"][0]).toContain("DOH-Domain-Static-Entry");

            // Check DoH server configuration
            expect(result["/ip dns"].length).toBe(1);
            expect(result["/ip dns"][0]).toContain('use-doh-server="https://8.8.8.8/dns-query"');
            expect(result["/ip dns"][0]).toContain("verify-doh-cert=yes");
        });
    });

    describe("DNSForeward", () => {
        it("should create DNS forward to Domestic network", () => {
            const result = testWithOutput(
                "DNSForeward",
                "Forward to Domestic network",
                { address: "example.ir", network: "Domestic" },
                () => DNSForeward("example.ir", "Domestic"),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"].length).toBe(1);
            expect(result["/ip dns static"][0]).toContain("name=example.ir");
            expect(result["/ip dns static"][0]).toContain("type=FWD");
            expect(result["/ip dns static"][0]).toContain("forward-to=Domestic");
        });

        it("should create DNS forward to Foreign network", () => {
            const result = testWithOutput(
                "DNSForeward",
                "Forward to Foreign network",
                { address: "example.com", network: "Foreign" },
                () => DNSForeward("example.com", "Foreign"),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"][0]).toContain("name=example.com");
            expect(result["/ip dns static"][0]).toContain("forward-to=Foreign");
        });

        it("should create DNS forward to VPN network", () => {
            const result = testWithOutput(
                "DNSForeward",
                "Forward to VPN network",
                { address: "vpn.example.com", network: "VPN" },
                () => DNSForeward("vpn.example.com", "VPN"),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"][0]).toContain("name=vpn.example.com");
            expect(result["/ip dns static"][0]).toContain("forward-to=VPN");
        });

        it("should create DNS forward with custom comment", () => {
            const comment = "Custom domain routing";
            const result = testWithOutput(
                "DNSForeward",
                "Forward with custom comment",
                { address: "custom.example.com", network: "Foreign", comment },
                () => DNSForeward("custom.example.com", "Foreign", comment),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"][0]).toContain('comment="Custom domain routing"');
        });

        it("should create DNS forward without comment when not provided", () => {
            const result = testWithOutput(
                "DNSForeward",
                "Forward without comment",
                { address: "nocomment.com", network: "Foreign" },
                () => DNSForeward("nocomment.com", "Foreign"),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"][0]).not.toContain("comment=");
        });
    });

    describe("FRNDNSFWD", () => {
        it("should configure DNS forwarding for s4i.co and starlink4iran.com", () => {
            const result = testWithOutput(
                "FRNDNSFWD",
                "Forward FRN domains via Foreign DNS",
                {},
                () => FRNDNSFWD(),
            );

            validateRouterConfig(result, ["/ip dns static"]);
            expect(result["/ip dns static"].length).toBe(2);

            // Check s4i.co forward
            const s4iForward = result["/ip dns static"].find((cmd) => cmd.includes("name=s4i.co"));
            expect(s4iForward).toBeDefined();
            expect(s4iForward).toContain("type=FWD");
            expect(s4iForward).toContain("forward-to=Foreign");
            expect(s4iForward).toContain("Forward s4i.co via Foreign DNS");

            // Check starlink4iran.com forward
            const starlinkForward = result["/ip dns static"].find((cmd) =>
                cmd.includes("name=starlink4iran.com"),
            );
            expect(starlinkForward).toBeDefined();
            expect(starlinkForward).toContain("type=FWD");
            expect(starlinkForward).toContain("forward-to=Foreign");
            expect(starlinkForward).toContain("Forward starlink4iran.com via Foreign DNS");
        });
    });

    describe("DNS", () => {
        it("should merge all DNS configurations with minimal setup", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                },
            };

            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                },
            };

            const result = testWithOutput(
                "DNS",
                "Complete DNS configuration - minimal setup",
                { networks, subnets },
                () => DNS(networks, subnets),
            );

            // Should include sections from all DNS functions
            validateRouterConfig(result, [
                "/ip dns",
                "/ip dns forwarders",
                "/ip dns static",
                "/ip firewall filter",
            ]);

            // Verify base DNS settings are included
            const dnsSetCommand = result["/ip dns"].find((cmd) =>
                cmd.includes("allow-remote-requests=yes"),
            );
            expect(dnsSetCommand).toBeDefined();

            // Verify mDNS is configured
            const mdnsCommand = result["/ip dns"].find((cmd) =>
                cmd.includes("mdns-repeat-ifaces="),
            );
            expect(mdnsCommand).toBeDefined();

            // Verify .ir TLD regex is included
            const irTldCommand = result["/ip dns static"].find((cmd) => cmd.includes("name=IRTLD"));
            expect(irTldCommand).toBeDefined();

            // Verify WAN DNS blocking
            expect(result["/ip firewall filter"].length).toBeGreaterThanOrEqual(2);

            // Verify DoH configuration
            const dohCommand = result["/ip dns"].find((cmd) => cmd.includes("use-doh-server="));
            expect(dohCommand).toBeDefined();

            // Verify FRN domain forwarding
            const s4iCommand = result["/ip dns static"].find((cmd) => cmd.includes("s4i.co"));
            expect(s4iCommand).toBeDefined();
        });

        it("should merge all DNS configurations with full setup", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Split: true,
                    Domestic: true,
                    Foreign: true,
                    VPN: true,
                },
            };

            const subnets: Subnets = {
                BaseNetworks: {
                    Split: { name: "Split", subnet: "192.168.10.0/24" },
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                    VPN: { name: "VPN", subnet: "192.168.40.0/24" },
                },
            };

            const result = testWithOutput(
                "DNS",
                "Complete DNS configuration - full setup",
                { networks, subnets },
                () => DNS(networks, subnets),
            );

            // Should have all DNS forwarders
            expect(result["/ip dns forwarders"].length).toBe(3);

            // Should have all bridge interfaces in mDNS
            const mdnsCommand = result["/ip dns"].find((cmd) =>
                cmd.includes("mdns-repeat-ifaces="),
            );
            expect(mdnsCommand).toContain("LANBridgeSplit");
            expect(mdnsCommand).toContain("LANBridgeDomestic");
            expect(mdnsCommand).toContain("LANBridgeForeign");
            expect(mdnsCommand).toContain("LANBridgeVPN");

            // Verify all static DNS entries
            // Should include: DoH google.com, IRTLD regex, s4i.co, starlink4iran.com
            expect(result["/ip dns static"].length).toBeGreaterThanOrEqual(4);
        });

        it("should handle empty networks gracefully", () => {
            const networks: Networks = {
                BaseNetworks: {},
            };

            const result = testWithOutput(
                "DNS",
                "DNS configuration with empty networks",
                { networks },
                () => DNS(networks),
            );

            // Should still have base configurations
            validateRouterConfig(result, ["/ip dns", "/ip dns static", "/ip firewall filter"]);

            // Base DNS settings should be present
            expect(result["/ip dns"].length).toBeGreaterThan(0);

            // Static DNS entries (DoH, IRTLD, FRN domains) should be present
            expect(result["/ip dns static"].length).toBeGreaterThan(0);

            // Firewall rules should be present
            expect(result["/ip firewall filter"].length).toBeGreaterThanOrEqual(2);
        });

        it("should configure all components correctly", () => {
            const networks: Networks = {
                BaseNetworks: {
                    Domestic: true,
                    Foreign: true,
                },
            };

            const subnets: Subnets = {
                BaseNetworks: {
                    Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
                    Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
                },
            };

            const result = testWithOutput(
                "DNS",
                "Complete DNS with Domestic and Foreign networks",
                { networks, subnets },
                () => DNS(networks, subnets),
            );

            // Verify DNS forwarders
            const domesticForwarder = result["/ip dns forwarders"].find((cmd) =>
                cmd.includes("name=Domestic"),
            );
            const foreignForwarder = result["/ip dns forwarders"].find((cmd) =>
                cmd.includes("name=Foreign"),
            );
            expect(domesticForwarder).toBeDefined();
            expect(foreignForwarder).toBeDefined();

            // Verify mDNS bridges
            const mdnsCommand = result["/ip dns"].find((cmd) =>
                cmd.includes("mdns-repeat-ifaces="),
            );
            expect(mdnsCommand).toContain("LANBridgeDomestic");
            expect(mdnsCommand).toContain("LANBridgeForeign");

            // Verify all static configurations are present
            expect(
                result["/ip dns static"].some((cmd) => cmd.includes("name=IRTLD")),
            ).toBe(true);
            expect(
                result["/ip dns static"].some((cmd) => cmd.includes("name=s4i.co")),
            ).toBe(true);
            expect(
                result["/ip dns static"].some((cmd) => cmd.includes("starlink4iran.com")),
            ).toBe(true);
            expect(
                result["/ip dns static"].some((cmd) => cmd.includes('name="google.com"')),
            ).toBe(true);
        });
    });
});
