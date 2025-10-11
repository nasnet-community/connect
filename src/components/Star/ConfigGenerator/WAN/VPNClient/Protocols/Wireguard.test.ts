import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import { WireguardClient, WireguardClientWrapper } from "./Wireguard";
import type { WireguardClientConfig } from "~/components/Star/StarContext";

describe("Wireguard Protocol Module", () => {
    describe("WireguardClient", () => {
        it("should configure basic Wireguard client", () => {
            const config: WireguardClientConfig = {
                Name: "wg-basic",
                InterfacePrivateKey: "oK56DE9Ue9zK76rAc8pBl6opph+1v36lm7cXXsQKrQM=",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "HIgo9xNzJMWLKASShiTqIybxZ0U3wGLiUeJ1PKf8ykw=",
                PeerEndpointAddress: "vpn.example.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Basic Wireguard client configuration",
                { config },
                () => WireguardClient(config),
            );

            validateRouterConfig(result, [
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/ip route",
            ]);

            // Check interface configuration
            expect(result["/interface wireguard"][0]).toContain("name=wireguard-client-wg-basic");
            expect(result["/interface wireguard"][0]).toContain(
                'private-key="oK56DE9Ue9zK76rAc8pBl6opph+1v36lm7cXXsQKrQM="',
            );

            // Check peer configuration
            expect(result["/interface wireguard peers"][0]).toContain(
                "interface=wireguard-client-wg-basic",
            );
            expect(result["/interface wireguard peers"][0]).toContain(
                'public-key="HIgo9xNzJMWLKASShiTqIybxZ0U3wGLiUeJ1PKf8ykw="',
            );
            expect(result["/interface wireguard peers"][0]).toContain(
                "endpoint-address=vpn.example.com",
            );
            expect(result["/interface wireguard peers"][0]).toContain("endpoint-port=51820");
            expect(result["/interface wireguard peers"][0]).toContain("allowed-address=0.0.0.0/0");

            // Check IP address assignment
            expect(result["/ip address"][0]).toContain("address=10.0.0.2/24");
            expect(result["/ip address"][0]).toContain("interface=wireguard-client-wg-basic");

            // Check default route
            expect(result["/ip route"][0]).toContain("dst-address=0.0.0.0/0");
            expect(result["/ip route"][0]).toContain("gateway=wireguard-client-wg-basic");
            expect(result["/ip route"][0]).toContain("routing-table=to-VPN");
        });

        it("should configure Wireguard with custom listen port", () => {
            const config: WireguardClientConfig = {
                Name: "wg-custom-port",
                InterfacePrivateKey: "privatekey123",
                InterfaceAddress: "10.0.0.2/24",
                InterfaceListenPort: 13231,
                PeerPublicKey: "publickey123",
                PeerEndpointAddress: "peer.example.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard with custom listen port",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard"][0]).toContain("listen-port=13231");
        });

        it("should omit listen port when not specified", () => {
            const config: WireguardClientConfig = {
                Name: "wg-no-port",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "peer.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard without listen port",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard"][0]).not.toContain("listen-port");
        });

        it("should configure custom MTU", () => {
            const mtuValues = [1280, 1420, 1500];

            mtuValues.forEach((mtu) => {
                const config: WireguardClientConfig = {
                    Name: `wg-mtu-${mtu}`,
                    InterfacePrivateKey: "privatekey",
                    InterfaceAddress: "10.0.0.2/24",
                    InterfaceMTU: mtu,
                    PeerPublicKey: "publickey",
                    PeerEndpointAddress: "peer.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                };

                const result = testWithOutput(
                    "WireguardClient",
                    `Wireguard with MTU ${mtu}`,
                    { config, mtu },
                    () => WireguardClient(config),
                );

                expect(result["/interface wireguard"][0]).toContain(`mtu=${mtu}`);
            });
        });

        it("should omit MTU when not specified", () => {
            const config: WireguardClientConfig = {
                Name: "wg-no-mtu",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "peer.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard without MTU setting",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard"][0]).not.toContain("mtu=");
        });

        it("should configure preshared key", () => {
            const config: WireguardClientConfig = {
                Name: "wg-psk",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "peer.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
                PeerPresharedKey: "presharedkey123456789012345678901234567890ab=",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard with preshared key",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard peers"][0]).toContain(
                'preshared-key="presharedkey123456789012345678901234567890ab="',
            );
        });

        it("should omit preshared key when not specified", () => {
            const config: WireguardClientConfig = {
                Name: "wg-no-psk",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "peer.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard without preshared key",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard peers"][0]).not.toContain("preshared-key");
        });

        it("should configure persistent keepalive", () => {
            const keepaliveValues = [10, 25, 60, 120];

            keepaliveValues.forEach((keepalive) => {
                const config: WireguardClientConfig = {
                    Name: `wg-ka-${keepalive}`,
                    InterfacePrivateKey: "privatekey",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey",
                    PeerEndpointAddress: "peer.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                    PeerPersistentKeepalive: keepalive,
                };

                const result = testWithOutput(
                    "WireguardClient",
                    `Wireguard with persistent keepalive ${keepalive}s`,
                    { config, keepalive },
                    () => WireguardClient(config),
                );

                expect(result["/interface wireguard peers"][0]).toContain(
                    `persistent-keepalive=${keepalive}s`,
                );
            });
        });

        it("should omit persistent keepalive when not specified", () => {
            const config: WireguardClientConfig = {
                Name: "wg-no-ka",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "peer.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard without persistent keepalive",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard peers"][0]).not.toContain("persistent-keepalive");
        });

        it("should configure multiple allowed IPs", () => {
            const config: WireguardClientConfig = {
                Name: "wg-multi-ips",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "peer.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard with multiple allowed IPs",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard peers"][0]).toContain(
                "allowed-address=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16",
            );
        });

        it("should handle IPv6 addresses and allowed IPs", () => {
            const config: WireguardClientConfig = {
                Name: "wg-ipv6",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "fd00::2/64",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "2001:db8::1",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "::/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard with IPv6",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/ip address"][0]).toContain("address=fd00::2/64");
            expect(result["/interface wireguard peers"][0]).toContain(
                "endpoint-address=2001:db8::1",
            );
            expect(result["/interface wireguard peers"][0]).toContain("allowed-address=::/0");
        });

        it("should handle endpoint as domain name", () => {
            const config: WireguardClientConfig = {
                Name: "wg-domain",
                InterfacePrivateKey: "privatekey",
                InterfaceAddress: "10.0.0.2/24",
                PeerPublicKey: "publickey",
                PeerEndpointAddress: "vpn.example.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0",
            };

            const result = testWithOutput(
                "WireguardClient",
                "Wireguard with domain endpoint",
                { config },
                () => WireguardClient(config),
            );

            expect(result["/interface wireguard peers"][0]).toContain(
                "endpoint-address=vpn.example.com",
            );
        });

        it("should configure complete Wireguard client with all options", () => {
            const config: WireguardClientConfig = {
                Name: "wg-complete",
                InterfacePrivateKey: "completePrivateKey1234567890=",
                InterfaceAddress: "10.13.13.2/24",
                InterfaceListenPort: 13231,
                InterfaceMTU: 1420,
                PeerPublicKey: "completePublicKey1234567890=",
                PeerEndpointAddress: "complete.vpn.com",
                PeerEndpointPort: 51820,
                PeerAllowedIPs: "0.0.0.0/0,::/0",
                PeerPresharedKey: "completePresharedKey1234567890=",
                PeerPersistentKeepalive: 25,
            };

            const result = testWithOutput(
                "WireguardClient",
                "Complete Wireguard configuration with all options",
                { config },
                () => WireguardClient(config),
            );

            // Check interface configuration
            const ifaceCommand = result["/interface wireguard"][0];
            expect(ifaceCommand).toContain("name=wireguard-client-wg-complete");
            expect(ifaceCommand).toContain('private-key="completePrivateKey1234567890="');
            expect(ifaceCommand).toContain("listen-port=13231");
            expect(ifaceCommand).toContain("mtu=1420");

            // Check peer configuration
            const peerCommand = result["/interface wireguard peers"][0];
            expect(peerCommand).toContain("interface=wireguard-client-wg-complete");
            expect(peerCommand).toContain('public-key="completePublicKey1234567890="');
            expect(peerCommand).toContain("endpoint-address=complete.vpn.com");
            expect(peerCommand).toContain("endpoint-port=51820");
            expect(peerCommand).toContain("allowed-address=0.0.0.0/0,::/0");
            expect(peerCommand).toContain('preshared-key="completePresharedKey1234567890="');
            expect(peerCommand).toContain("persistent-keepalive=25s");

            // Check IP address
            expect(result["/ip address"][0]).toContain("address=10.13.13.2/24");
            expect(result["/ip address"][0]).toContain("interface=wireguard-client-wg-complete");

            // Check routing
            expect(result["/ip route"][0]).toContain("dst-address=0.0.0.0/0");
            expect(result["/ip route"][0]).toContain("gateway=wireguard-client-wg-complete");
            expect(result["/ip route"][0]).toContain("routing-table=to-VPN");
        });
    });

    describe("WireguardClientWrapper", () => {
        it("should configure single Wireguard client with base config", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "vpn1",
                    InterfacePrivateKey: "privatekey1",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey1",
                    PeerEndpointAddress: "wg.example.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Single Wireguard client with base configuration",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            validateRouterConfig(result, [
                "/interface wireguard",
                "/interface wireguard peers",
                "/ip address",
                "/ip route",
                "/interface list member",
                "/ip firewall address-list",
                "/ip firewall mangle",
            ]);

            // Check client configuration
            expect(result["/interface wireguard"][0]).toContain("name=wireguard-client-vpn1");

            // Check base config is included
            expect(result["/interface list member"]).toBeDefined();
            expect(result["/ip firewall address-list"]).toBeDefined();
            expect(result["/ip firewall mangle"]).toBeDefined();
        });

        it("should configure multiple Wireguard clients", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "vpn1",
                    InterfacePrivateKey: "privatekey1",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey1",
                    PeerEndpointAddress: "wg1.example.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
                {
                    Name: "vpn2",
                    InterfacePrivateKey: "privatekey2",
                    InterfaceAddress: "10.0.1.2/24",
                    PeerPublicKey: "publickey2",
                    PeerEndpointAddress: "wg2.example.com",
                    PeerEndpointPort: 51821,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Multiple Wireguard clients configuration",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            // Should have configuration for both clients
            expect(result["/interface wireguard"].length).toBe(2);
            expect(result["/interface wireguard"][0]).toContain("name=wireguard-client-vpn1");
            expect(result["/interface wireguard"][1]).toContain("name=wireguard-client-vpn2");

            // Each client should have base config
            expect(result["/interface list member"].length).toBeGreaterThanOrEqual(4);
        });

        it("should generate correct interface names", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "test-vpn",
                    InterfacePrivateKey: "privatekey",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey",
                    PeerEndpointAddress: "test.wg.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Wireguard with interface name generation",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            // Check that interface name follows naming convention
            const hasCorrectInterface = result["/interface list member"].some(
                (cmd) => cmd.includes('interface="wireguard-client-test-vpn"'),
            );
            expect(hasCorrectInterface).toBe(true);
        });

        it("should route endpoint through correct routing table", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "route-test",
                    InterfacePrivateKey: "privatekey",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey",
                    PeerEndpointAddress: "1.2.3.4",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Wireguard with endpoint routing",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            // Check endpoint is in address list
            const hasEndpoint = result["/ip firewall address-list"].some(
                (cmd) => cmd.includes('address="1.2.3.4"'),
            );
            expect(hasEndpoint).toBe(true);

            // Check mangle rules exist for endpoint routing
            expect(result["/ip firewall mangle"].length).toBeGreaterThan(0);
        });

        it("should add interface to WAN and VPN-WAN lists", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "lists-test",
                    InterfacePrivateKey: "privatekey",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey",
                    PeerEndpointAddress: "lists.wg.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Wireguard interface list memberships",
                { configs },
                () => WireguardClientWrapper(configs),
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
                "WireguardClientWrapper",
                "Empty configuration array",
                { configs: [] },
                () => WireguardClientWrapper([]),
            );

            expect(result).toBeDefined();
            expect(Object.keys(result)).toHaveLength(0);
        });

        it("should handle mixed IPv4 and IPv6 configurations", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "ipv4-client",
                    InterfacePrivateKey: "privatekey1",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey1",
                    PeerEndpointAddress: "192.168.1.100",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
                {
                    Name: "ipv6-client",
                    InterfacePrivateKey: "privatekey2",
                    InterfaceAddress: "fd00::2/64",
                    PeerPublicKey: "publickey2",
                    PeerEndpointAddress: "2001:db8::1",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "::/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Mixed IPv4 and IPv6 Wireguard configurations",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            // Both clients should be configured
            expect(result["/interface wireguard"].length).toBe(2);

            // Check IPv4 addresses
            expect(result["/ip address"][0]).toContain("10.0.0.2/24");

            // Check IPv6 addresses
            expect(result["/ip address"][1]).toContain("fd00::2/64");
        });

        it("should handle clients with different MTU values", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "mtu1420",
                    InterfacePrivateKey: "privatekey1",
                    InterfaceAddress: "10.0.0.2/24",
                    InterfaceMTU: 1420,
                    PeerPublicKey: "publickey1",
                    PeerEndpointAddress: "peer1.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
                {
                    Name: "mtu1280",
                    InterfacePrivateKey: "privatekey2",
                    InterfaceAddress: "10.0.1.2/24",
                    InterfaceMTU: 1280,
                    PeerPublicKey: "publickey2",
                    PeerEndpointAddress: "peer2.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Wireguard clients with different MTU values",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            expect(result["/interface wireguard"][0]).toContain("mtu=1420");
            expect(result["/interface wireguard"][1]).toContain("mtu=1280");
        });

        it("should handle clients with and without persistent keepalive", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "with-ka",
                    InterfacePrivateKey: "privatekey1",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey1",
                    PeerEndpointAddress: "peer1.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                    PeerPersistentKeepalive: 25,
                },
                {
                    Name: "without-ka",
                    InterfacePrivateKey: "privatekey2",
                    InterfaceAddress: "10.0.1.2/24",
                    PeerPublicKey: "publickey2",
                    PeerEndpointAddress: "peer2.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "0.0.0.0/0",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Wireguard clients with mixed keepalive settings",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            expect(result["/interface wireguard peers"][0]).toContain("persistent-keepalive=25s");
            expect(result["/interface wireguard peers"][1]).not.toContain("persistent-keepalive");
        });

        it("should handle clients with split tunnel (specific allowed IPs)", () => {
            const configs: WireguardClientConfig[] = [
                {
                    Name: "split-tunnel",
                    InterfacePrivateKey: "privatekey",
                    InterfaceAddress: "10.0.0.2/24",
                    PeerPublicKey: "publickey",
                    PeerEndpointAddress: "peer.com",
                    PeerEndpointPort: 51820,
                    PeerAllowedIPs: "10.0.0.0/8,172.16.0.0/12",
                },
            ];

            const result = testWithOutput(
                "WireguardClientWrapper",
                "Wireguard with split tunnel configuration",
                { configs },
                () => WireguardClientWrapper(configs),
            );

            expect(result["/interface wireguard peers"][0]).toContain(
                "allowed-address=10.0.0.0/8,172.16.0.0/12",
            );
        });
    });
});
