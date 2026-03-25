import { describe, expect, it } from "vitest";
import type {
    GreTunnelConfig,
    IpipTunnelConfig,
    SubnetConfig,
    Tunnel,
    VxlanInterfaceConfig,
} from "~/components/Star/StarContext";
import {
    IPIPInterface,
    TunnelAddressList,
    TunnelInboundTraffic,
    TunnelInterfaceList,
    VxlanInterface,
    buildTunnelIPAddress,
    extractSubnetPrefix,
    findSubnetByName,
    generateIPAddress,
    handleIPsecAndFastPath,
} from "./TunnelUtils";

describe("Tunnel utilities", () => {
    // Verifies IP address helper emits quoted address, interface, and optional comment fields.
    it("builds address commands for tunnel interfaces", () => {
        const result = generateIPAddress(
            "10.10.10.1/30",
            "ipip-1",
            "Tunnel ip",
        );

        expect(result["/ip address"]).toEqual([
            'add address="10.10.10.1/30" interface="ipip-1" comment="Tunnel ip"',
        ]);
    });

    // Verifies tunnel membership and address-list helpers add both LAN-scoped references.
    it("builds interface-list and address-list entries for tunnel networks", () => {
        const interfaceList = TunnelInterfaceList(
            "gre-1",
            "Foreign",
            "GRE uplink",
        );
        const addressList = TunnelAddressList(
            "10.20.0.0/30",
            "Foreign",
            "GRE subnet",
        );

        expect(interfaceList["/interface list member"]).toEqual([
            'add interface="gre-1" list="LAN" comment="GRE uplink"',
            'add interface="gre-1" list="Foreign-LAN" comment="GRE uplink"',
        ]);
        expect(addressList["/ip firewall address-list"]).toEqual([
            'add address="10.20.0.0/30" list="Foreign-LAN" comment="GRE subnet"',
        ]);
    });

    // Verifies subnet helpers preserve explicit addresses and fall back to the first usable host when needed.
    it("derives tunnel IP addresses from subnet definitions", () => {
        const subnet: SubnetConfig = {
            name: "Tunnel-A",
            subnet: "10.255.1.0/30",
        };

        expect(extractSubnetPrefix("10.255.1.0/30")).toBe("30");
        expect(buildTunnelIPAddress("10.255.1.2", subnet)).toBe(
            "10.255.1.2/30",
        );
        expect(buildTunnelIPAddress("", subnet)).toBe("10.255.1.1/30");
    });

    // Verifies IPsec-enabled tunnels force fast-path off, which is the current business rule.
    it("forces fast-path off when an IPsec secret is configured", () => {
        const params: string[] = [];
        handleIPsecAndFastPath(params, {
            ipsecSecret: "secret",
            allowFastPath: true,
        });

        expect(params).toEqual(["allow-fast-path=no"]);
    });

    // Verifies inbound tunnel mangle rules use the current quoted protocol and port fields plus the trailing output rule.
    it("builds inbound traffic rules for IPIP GRE and VXLAN tunnels", () => {
        const tunnel: Tunnel = {
            IPIP: [{ name: "ipip-1" } as IpipTunnelConfig],
            Eoip: [],
            Gre: [{ name: "gre-1" } as GreTunnelConfig],
            Vxlan: [
                {
                    name: "vxlan-1",
                    vni: 200,
                    port: 8472,
                } as VxlanInterfaceConfig,
            ],
        } as Tunnel;

        const result = TunnelInboundTraffic(tunnel)["/ip firewall mangle"];

        expect(result[0]).toContain('protocol="ipip"');
        expect(result[1]).toContain('protocol="gre"');
        expect(result[2]).toContain('protocol="udp"');
        expect(result[2]).toContain('dst-port="8472"');
        expect(result[result.length - 2]).toBe("");
        expect(result[result.length - 1]).toContain(
            'new-routing-mark="to-Domestic"',
        );
    });

    // Verifies subnet lookup follows exact, case-insensitive, and partial-name matching.
    it("finds matching subnets by exact case-insensitive and partial names", () => {
        const subnets: SubnetConfig[] = [
            { name: "Branch-A", subnet: "10.0.0.0/30" },
            { name: "gre-backhaul-1", subnet: "10.0.1.0/30" },
        ];

        expect(findSubnetByName("Branch-A", subnets)?.subnet).toBe(
            "10.0.0.0/30",
        );
        expect(findSubnetByName("branch-a", subnets)?.subnet).toBe(
            "10.0.0.0/30",
        );
        expect(findSubnetByName("backhaul", subnets)?.subnet).toBe(
            "10.0.1.0/30",
        );
    });

    // Verifies IPIP interfaces honor the current default comment and fast-path logic when IPsec is enabled.
    it("builds IPIP interface commands with IPsec-aware fast-path handling", () => {
        const config: IpipTunnelConfig = {
            name: "ipip-a",
            remoteAddress: "203.0.113.10",
            NetworkType: "Foreign",
            ipsecSecret: "ipsec-1",
            allowFastPath: true,
        } as IpipTunnelConfig;

        const result = IPIPInterface(config)["/interface ipip"][0];

        expect(result).toContain("name=ipip-a");
        expect(result).toContain("remote-address=203.0.113.10");
        expect(result).toContain(
            'comment="ipip-a IPIP Tunnel for Network Foreign"',
        );
        expect(result).toContain('ipsec-secret="ipsec-1"');
        expect(result).toContain("allow-fast-path=no");
    });

    // Verifies VXLAN interfaces auto-create a default VTEP when only remoteAddress is supplied.
    it("creates a default VTEP entry from remoteAddress when none are provided", () => {
        const config: VxlanInterfaceConfig = {
            name: "vxlan-a",
            vni: 100,
            remoteAddress: "198.51.100.20",
            bumMode: "unicast",
            NetworkType: "Foreign",
        } as VxlanInterfaceConfig;

        const result = VxlanInterface(config);

        expect(result["/interface vxlan"][0]).toContain("name=vxlan-a");
        expect(result["/interface vxlan"][0]).toContain("vni=100");
        expect(result["/interface vxlan vteps"]).toEqual([
            'add interface=vxlan-a remote-ip=198.51.100.20 comment="Default VTEP for vxlan-a"',
        ]);
    });
});
