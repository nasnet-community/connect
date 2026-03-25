import { describe, expect, it } from "vitest";

import {
    AddressList,
    AddressListEntry,
    BaseVPNConfig,
    GenerateVCInterfaceName,
    IPAddress,
    InterfaceList,
    RouteToVPN,
    VPNEndpointMangle,
} from "./VPNClientUtils";

describe("VPNClientUtils", () => {
    // Verifies protocol-specific VPN client interface names use the current RouterOS naming convention and preserve the fallback branch.
    it("generates interface names for each VPN client protocol", () => {
        expect(GenerateVCInterfaceName("wg-main", "Wireguard")).toBe(
            "wireguard-client-wg-main",
        );
        expect(GenerateVCInterfaceName("ovpn-main", "OpenVPN")).toBe(
            "ovpn-client-ovpn-main",
        );
        expect(GenerateVCInterfaceName("pptp-main", "PPTP")).toBe(
            "pptp-client-pptp-main",
        );
        expect(GenerateVCInterfaceName("l2tp-main", "L2TP")).toBe(
            "l2tp-client-l2tp-main",
        );
        expect(GenerateVCInterfaceName("sstp-main", "SSTP")).toBe(
            "sstp-client-sstp-main",
        );
        expect(GenerateVCInterfaceName("ike-main", "IKeV2")).toBe(
            "ike2-client-ike-main",
        );
        expect(GenerateVCInterfaceName("fallback", "Unknown" as any)).toBe(
            "vpn-client-fallback",
        );
    });

    // Verifies the VPN route builder creates the main default route and adds an optional health-check route when a probe address is supplied.
    it("builds VPN routing entries for the interface and optional check IP", () => {
        const result = RouteToVPN("wireguard-client-vpn1", "vpn1", "1.1.1.1");

        expect(result["/ip route"]).toHaveLength(2);
        expect(result["/ip route"][0]).toContain('dst-address="0.0.0.0/0"');
        expect(result["/ip route"][0]).toContain(
            'gateway="wireguard-client-vpn1"',
        );
        expect(result["/ip route"][0]).toContain('routing-table="to-VPN-vpn1"');
        expect(result["/ip route"][0]).toContain("scope=30");
        expect(result["/ip route"][0]).toContain("target-scope=10");
        expect(result["/ip route"][0]).toContain('comment="Route-to-VPN-vpn1"');

        expect(result["/ip route"][1]).toContain("check-gateway=ping");
        expect(result["/ip route"][1]).toContain('dst-address="1.1.1.1"');
        expect(result["/ip route"][1]).toContain("distance=1");
    });

    // Verifies VPN client interfaces are always added to both WAN and VPN-WAN interface lists with the current comment format.
    it("adds VPN interfaces to the WAN and VPN-WAN interface lists", () => {
        const result = InterfaceList("ovpn-client-main");

        expect(result["/interface list member"]).toEqual([
            'add interface="ovpn-client-main" list="WAN" comment="VPN-ovpn-client-main"',
            'add interface="ovpn-client-main" list="VPN-WAN" comment="VPN-ovpn-client-main"',
        ]);
    });

    // Verifies endpoint address-list entries embed the current WAN interface metadata format that joins WAN type and name with a hyphen.
    it("records VPN endpoint metadata in the VPNE address list", () => {
        const result = AddressListEntry(
            "10.20.30.40",
            "wireguard-client-test",
            "test",
            { WANType: "Domestic", WANName: "ether2" } as any,
        );

        expect(result["/ip firewall address-list"]).toEqual([
            'add address="10.20.30.40" list=VPNE comment="VPN-test Interface:wireguard-client-test WanInterface:Domestic-ether2 Endpoint:10.20.30.40 - Endpoint for routing"',
        ]);
    });

    // Verifies the endpoint helper combines a single VPNE address-list entry with the three current output-chain mangle rules used for endpoint routing.
    it("combines endpoint address tracking with output-chain mangle rules", () => {
        const result = AddressList("1.2.3.4", "ike2-client-edge", "edge");

        expect(result["/ip firewall address-list"]).toHaveLength(1);
        expect(result["/ip firewall mangle"]).toHaveLength(3);
        expect(result["/ip firewall mangle"][0]).toContain(
            "action=mark-connection",
        );
        expect(result["/ip firewall mangle"][0]).toContain(
            'new-connection-mark="conn-VPNE"',
        );
        expect(result["/ip firewall mangle"][1]).toContain(
            "action=mark-routing",
        );
        expect(result["/ip firewall mangle"][1]).toContain(
            'new-routing-mark="to-Foreign"',
        );
        expect(result["/ip firewall mangle"][2]).toContain(
            'dst-address-list="VPNE"',
        );
    });

    // Verifies the standalone mangle helper emits the same three endpoint-routing rules as the combined address-list wrapper.
    it("creates the raw endpoint mangle rules used for VPN endpoint routing", () => {
        const result = VPNEndpointMangle();

        expect(result["/ip firewall mangle"]).toHaveLength(3);
        expect(
            result["/ip firewall mangle"].every((rule) =>
                rule.includes('comment="VPN Endpoint"'),
            ),
        ).toBe(true);
        expect(
            result["/ip firewall mangle"].some((rule) =>
                rule.includes('new-connection-mark="conn-VPNE"'),
            ),
        ).toBe(true);
        expect(
            result["/ip firewall mangle"].some((rule) =>
                rule.includes('new-routing-mark="to-Foreign"'),
            ),
        ).toBe(true);
    });

    // Verifies VPN IP address assignment keeps the quoted address and interface fields used by the current config generator output.
    it("assigns interface addresses using the current quoted RouterOS command format", () => {
        const result = IPAddress("sstp-client-vpn", "10.0.0.1/32");

        expect(result["/ip address"]).toEqual([
            'add address="10.0.0.1/32" interface="sstp-client-vpn" comment="VPN-sstp-client-vpn"',
        ]);
    });

    // Verifies the base VPN helper composes interface lists, the default route, and the VPNE entry while intentionally leaving the mangle and NAT sections empty.
    it("builds the base VPN config shell without adding mangle rules", () => {
        const result = BaseVPNConfig(
            "wireguard-client-core",
            "203.0.113.5",
            "core",
            { WANType: "Foreign", WANName: "ether1" } as any,
        );

        expect(result["/interface list member"]).toHaveLength(2);
        expect(result["/ip route"]).toHaveLength(1);
        expect(result["/ip firewall address-list"]).toHaveLength(1);
        expect(result["/ip firewall mangle"]).toEqual([]);
        expect(result["/ip firewall nat"]).toEqual([]);
        expect(result["/ip address"]).toEqual([]);
        expect(result["/ip firewall address-list"][0]).toContain(
            "WanInterface:Foreign-ether1",
        );
    });
});
