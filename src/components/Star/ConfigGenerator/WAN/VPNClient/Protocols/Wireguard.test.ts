import { describe, expect, it } from "vitest";
import type { WireguardClientConfig } from "~/components/Star/StarContext";
import { WireguardClient, WireguardClientWrapper } from "./Wireguard";

const buildWireguardConfig = (
    overrides: Partial<WireguardClientConfig> = {},
): WireguardClientConfig => ({
    Name: "foreign",
    InterfacePrivateKey: "private-key-123=",
    InterfaceAddress: "10.10.10.2/24",
    PeerPublicKey: "public-key-123=",
    PeerEndpointAddress: "wg.example.com",
    PeerEndpointPort: 51820,
    PeerAllowedIPs: "0.0.0.0/0",
    ...overrides,
});

describe("Wireguard protocol", () => {
    // Verifies the base client generator emits the expected quoted interface, peer, and address commands.
    it("builds the current Wireguard client sections", () => {
        const result = WireguardClient(buildWireguardConfig());

        expect(result["/interface wireguard"]).toHaveLength(1);
        expect(result["/interface wireguard"][0]).toContain(
            'name="wireguard-client-foreign"',
        );
        expect(result["/interface wireguard"][0]).toContain(
            'comment="wg-client-foreign"',
        );

        expect(result["/interface wireguard peers"]).toHaveLength(1);
        expect(result["/interface wireguard peers"][0]).toContain(
            'interface="wireguard-client-foreign"',
        );
        expect(result["/interface wireguard peers"][0]).toContain(
            'endpoint-address="wg.example.com"',
        );
        expect(result["/interface wireguard peers"][0]).toContain(
            'allowed-address="0.0.0.0/0"',
        );

        expect(result["/ip address"]).toEqual([
            'add address="10.10.10.2/24" interface="wireguard-client-foreign" comment="VPN-client-foreign"',
        ]);
        expect(result["/ip route"]).toEqual([]);
    });

    // Verifies optional interface and peer fields are preserved and keepalive is always forced to 25s.
    it("includes optional listen port mtu and preshared key fields", () => {
        const result = WireguardClient(
            buildWireguardConfig({
                Name: "complete",
                InterfaceListenPort: 13231,
                InterfaceMTU: 1420,
                PeerPresharedKey: "psk-123=",
            }),
        );

        expect(result["/interface wireguard"][0]).toContain(
            'listen-port="13231"',
        );
        expect(result["/interface wireguard"][0]).toContain('mtu="1420"');
        expect(result["/interface wireguard peers"][0]).toContain(
            'preshared-key="psk-123="',
        );
        expect(result["/interface wireguard peers"][0]).toContain(
            "persistent-keepalive=25s",
        );
    });

    // Verifies /32 interface addresses are normalized to /30 before assignment.
    it("normalizes point to point interface addresses to /30", () => {
        const result = WireguardClient(
            buildWireguardConfig({ InterfaceAddress: "172.16.0.2/32" }),
        );

        expect(result["/ip address"][0]).toContain('address="172.16.0.2/30"');
    });

    // Verifies the wrapper merges the protocol config with the shared VPN base config sections.
    it("wraps a client with shared VPN routing and firewall rules", () => {
        const result = WireguardClientWrapper([
            buildWireguardConfig({
                Name: "wrapped",
                PeerEndpointAddress: "1.2.3.4",
            }),
        ]);

        expect(result["/interface wireguard"]).toHaveLength(1);
        expect(
            result["/interface list member"].some((command) =>
                command.includes('interface="wireguard-client-wrapped"'),
            ),
        ).toBe(true);
        expect(
            result["/ip firewall address-list"].some((command) =>
                command.includes('address="1.2.3.4"'),
            ),
        ).toBe(true);
        expect(result["/ip firewall mangle"]).toEqual([]);
        expect(
            result["/ip route"].some((command) =>
                command.includes('gateway="wireguard-client-wrapped"'),
            ),
        ).toBe(true);
    });

    // Verifies multiple wrapped clients are merged and an optional health-check route is added from the provided map.
    it("merges multiple clients and includes check IP routes when provided", () => {
        const checkIPMap = new Map<string, string>([["first", "8.8.8.8"]]);
        const result = WireguardClientWrapper(
            [
                buildWireguardConfig({ Name: "first" }),
                buildWireguardConfig({
                    Name: "second",
                    PeerEndpointAddress: "8.8.4.4",
                }),
            ],
            checkIPMap,
        );

        expect(result["/interface wireguard"]).toHaveLength(2);
        expect(result["/interface wireguard"][0]).toContain(
            'name="wireguard-client-first"',
        );
        expect(result["/interface wireguard"][1]).toContain(
            'name="wireguard-client-second"',
        );
        expect(
            result["/ip route"].some(
                (command) =>
                    command.includes('dst-address="8.8.8.8"') &&
                    command.includes('gateway="wireguard-client-first"'),
            ),
        ).toBe(true);
    });

    // Verifies the wrapper returns an empty RouterConfig when there are no clients to merge.
    it("returns an empty config for an empty client list", () => {
        expect(WireguardClientWrapper([])).toEqual({});
    });
});
