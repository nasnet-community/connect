import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    testWithGenericOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    GenerateVCInterfaceName,
    RouteToVPN,
    InterfaceList,
    AddressList,
    AddressListEntry,
    VPNEndpointMangle,
    IPAddress,
    BaseVPNConfig,
} from "./VPNClientUtils";
import type { VPNClientType } from "../../../StarContext/CommonType";

describe("VPNClientUtils Module", () => {
    describe("GenerateVCInterfaceName", () => {
        it("should generate Wireguard interface name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Generate Wireguard interface name",
                { Name: "vpn1", protocol: "Wireguard" },
                () => GenerateVCInterfaceName("vpn1", "Wireguard"),
            );

            expect(result).toBe("wireguard-client-vpn1");
        });

        it("should generate OpenVPN interface name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Generate OpenVPN interface name",
                { Name: "ovpn-server", protocol: "OpenVPN" },
                () => GenerateVCInterfaceName("ovpn-server", "OpenVPN"),
            );

            expect(result).toBe("ovpn-client-ovpn-server");
        });

        it("should generate PPTP interface name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Generate PPTP interface name",
                { Name: "pptp1", protocol: "PPTP" },
                () => GenerateVCInterfaceName("pptp1", "PPTP"),
            );

            expect(result).toBe("pptp-client-pptp1");
        });

        it("should generate L2TP interface name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Generate L2TP interface name",
                { Name: "l2tp-main", protocol: "L2TP" },
                () => GenerateVCInterfaceName("l2tp-main", "L2TP"),
            );

            expect(result).toBe("l2tp-client-l2tp-main");
        });

        it("should generate SSTP interface name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Generate SSTP interface name",
                { Name: "sstp-vpn", protocol: "SSTP" },
                () => GenerateVCInterfaceName("sstp-vpn", "SSTP"),
            );

            expect(result).toBe("sstp-client-sstp-vpn");
        });

        it("should generate IKeV2 interface name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Generate IKeV2 interface name",
                { Name: "ikev2-test", protocol: "IKeV2" },
                () => GenerateVCInterfaceName("ikev2-test", "IKeV2"),
            );

            expect(result).toBe("ike2-client-ikev2-test");
        });

        it("should handle default case for unknown protocol", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Handle unknown protocol type",
                { Name: "unknown", protocol: "Unknown" as VPNClientType },
                () => GenerateVCInterfaceName("unknown", "Unknown" as VPNClientType),
            );

            expect(result).toBe("vpn-client-unknown");
        });

        it("should handle names with special characters", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Handle names with special characters",
                { Name: "vpn-server-01", protocol: "Wireguard" },
                () => GenerateVCInterfaceName("vpn-server-01", "Wireguard"),
            );

            expect(result).toBe("wireguard-client-vpn-server-01");
        });

        it("should handle empty name", () => {
            const result = testWithGenericOutput(
                "GenerateVCInterfaceName",
                "Handle empty name",
                { Name: "", protocol: "OpenVPN" },
                () => GenerateVCInterfaceName("", "OpenVPN"),
            );

            expect(result).toBe("ovpn-client-");
        });
    });

    describe("RouteToVPN", () => {
        it("should create route to VPN for Wireguard interface", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Create route to VPN for Wireguard",
                { InterfaceName: "wireguard-client-vpn1", name: "vpn1" },
                () => RouteToVPN("wireguard-client-vpn1", "vpn1"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"]).toHaveLength(1);
            expect(result["/ip route"][0]).toContain("to-VPN-vpn1");
            expect(result["/ip route"][0]).toContain("wireguard-client-vpn1");
            expect(result["/ip route"][0]).toContain("Route-to-VPN-vpn1");
        });

        it("should create route to VPN for OpenVPN interface", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Create route to VPN for OpenVPN",
                { InterfaceName: "ovpn-client-main", name: "main" },
                () => RouteToVPN("ovpn-client-main", "main"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("to-VPN-main");
            expect(result["/ip route"][0]).toContain("ovpn-client-main");
        });

        it("should create route with correct distance", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Verify route distance is 1",
                { InterfaceName: "l2tp-client-vpn", name: "vpn" },
                () => RouteToVPN("l2tp-client-vpn", "vpn"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("distance=1");
        });

        it("should create route with default destination 0.0.0.0/0", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Verify default destination route",
                { InterfaceName: "pptp-client-test", name: "test" },
                () => RouteToVPN("pptp-client-test", "test"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("dst-address=0.0.0.0/0");
        });

        it("should create route with correct scope and target-scope", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Verify route scope settings",
                { InterfaceName: "sstp-client-vpn1", name: "vpn1" },
                () => RouteToVPN("sstp-client-vpn1", "vpn1"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("scope=30");
            expect(result["/ip route"][0]).toContain("target-scope=10");
        });

        it("should disable hardware offload", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Verify hardware offload is disabled",
                { InterfaceName: "ike2-client-vpn", name: "vpn" },
                () => RouteToVPN("ike2-client-vpn", "vpn"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("suppress-hw-offload=no");
        });

        it("should handle interface names with special characters", () => {
            const result = testWithOutput(
                "RouteToVPN",
                "Handle interface names with hyphens and numbers",
                { InterfaceName: "wireguard-client-vpn-server-01", name: "vpn-server-01" },
                () => RouteToVPN("wireguard-client-vpn-server-01", "vpn-server-01"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("to-VPN-vpn-server-01");
        });
    });

    describe("InterfaceList", () => {
        it("should add interface to WAN list", () => {
            const result = testWithOutput(
                "InterfaceList",
                "Add interface to WAN list",
                { InterfaceName: "wireguard-client-vpn1" },
                () => InterfaceList("wireguard-client-vpn1"),
            );

            validateRouterConfig(result, ["/interface list member"]);
            expect(result["/interface list member"]).toHaveLength(2);
        });

        it("should add interface to both WAN and VPN-WAN lists", () => {
            const result = testWithOutput(
                "InterfaceList",
                "Add interface to WAN and VPN-WAN lists",
                { InterfaceName: "ovpn-client-main" },
                () => InterfaceList("ovpn-client-main"),
            );

            validateRouterConfig(result, ["/interface list member"]);

            // Should have 2 entries
            expect(result["/interface list member"]).toHaveLength(2);

            // First entry: WAN list
            expect(result["/interface list member"][0]).toContain('list="WAN"');
            expect(result["/interface list member"][0]).toContain('interface="ovpn-client-main"');

            // Second entry: VPN-WAN list
            expect(result["/interface list member"][1]).toContain('list="VPN-WAN"');
            expect(result["/interface list member"][1]).toContain('interface="ovpn-client-main"');
        });

        it("should include correct comments for WAN list", () => {
            const result = testWithOutput(
                "InterfaceList",
                "Verify WAN list comments",
                { InterfaceName: "l2tp-client-vpn" },
                () => InterfaceList("l2tp-client-vpn"),
            );

            validateRouterConfig(result, ["/interface list member"]);
            expect(result["/interface list member"][0]).toContain('comment="VPN-l2tp-client-vpn"');
        });

        it("should include correct comments for VPN-WAN list", () => {
            const result = testWithOutput(
                "InterfaceList",
                "Verify VPN-WAN list comments",
                { InterfaceName: "pptp-client-test" },
                () => InterfaceList("pptp-client-test"),
            );

            validateRouterConfig(result, ["/interface list member"]);
            expect(result["/interface list member"][1]).toContain('comment="VPN-pptp-client-test"');
        });

        it("should handle interface names with special characters", () => {
            const result = testWithOutput(
                "InterfaceList",
                "Handle interface names with special characters",
                { InterfaceName: "wireguard-client-vpn-server-01" },
                () => InterfaceList("wireguard-client-vpn-server-01"),
            );

            validateRouterConfig(result, ["/interface list member"]);
            expect(result["/interface list member"][0]).toContain('interface="wireguard-client-vpn-server-01"');
        });

        it("should handle short interface names", () => {
            const result = testWithOutput(
                "InterfaceList",
                "Handle short interface name",
                { InterfaceName: "wg1" },
                () => InterfaceList("wg1"),
            );

            validateRouterConfig(result, ["/interface list member"]);
            expect(result["/interface list member"]).toHaveLength(2);
        });
    });

    describe("AddressList", () => {
        it("should create address list entry for VPN endpoint", () => {
            const result = testWithOutput(
                "AddressList",
                "Create address list for VPN endpoint",
                { Address: "203.0.113.50", InterfaceName: "ovpn-client-test", name: "test" },
                () => AddressList("203.0.113.50", "ovpn-client-test", "test"),
            );

            validateRouterConfig(result, [
                "/ip firewall address-list",
                "/ip firewall mangle",
            ]);
        });

        it("should add address to VPNE list", () => {
            const result = testWithOutput(
                "AddressList",
                "Add address to VPNE list",
                { Address: "1.2.3.4", InterfaceName: "wireguard-client-wg1", name: "wg1" },
                () => AddressList("1.2.3.4", "wireguard-client-wg1", "wg1"),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"]).toHaveLength(1);
            expect(result["/ip firewall address-list"][0]).toContain('address="1.2.3.4"');
            expect(result["/ip firewall address-list"][0]).toContain('list=VPNE');
        });

        it("should create mangle rules for VPN endpoint routing", () => {
            const result = testWithOutput(
                "AddressList",
                "Create mangle rules for endpoint routing",
                { Address: "8.8.8.8", InterfaceName: "pptp-client-pptp1", name: "pptp1" },
                () => AddressList("8.8.8.8", "pptp-client-pptp1", "pptp1"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            expect(result["/ip firewall mangle"]).toHaveLength(3);
        });

        it("should mark connection for VPN endpoint", () => {
            const result = testWithOutput(
                "AddressList",
                "Mark connection for VPN endpoint",
                { Address: "1.1.1.1", InterfaceName: "l2tp-client-l2tp1", name: "l2tp1" },
                () => AddressList("1.1.1.1", "l2tp-client-l2tp1", "l2tp1"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            expect(result["/ip firewall mangle"][0]).toContain("mark-connection");
            expect(result["/ip firewall mangle"][0]).toContain("new-connection-mark=conn-VPNE");
            expect(result["/ip firewall mangle"][0]).toContain("dst-address-list=VPNE");
        });

        it("should mark routing for VPN endpoint", () => {
            const result = testWithOutput(
                "AddressList",
                "Mark routing for VPN endpoint",
                { Address: "9.9.9.9", InterfaceName: "sstp-client-sstp1", name: "sstp1" },
                () => AddressList("9.9.9.9", "sstp-client-sstp1", "sstp1"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);

            // Should have 3 mangle rules total
            expect(result["/ip firewall mangle"]).toHaveLength(3);

            // Second and third rules should mark routing
            expect(result["/ip firewall mangle"][1]).toContain("mark-routing");
            expect(result["/ip firewall mangle"][1]).toContain("new-routing-mark=to-Foreign");

            expect(result["/ip firewall mangle"][2]).toContain("mark-routing");
            expect(result["/ip firewall mangle"][2]).toContain("new-routing-mark=to-Foreign");
        });

        it("should route VPN endpoint through main routing table (to-Foreign)", () => {
            const result = testWithOutput(
                "AddressList",
                "Route endpoint through to-Foreign table",
                { Address: "203.0.113.1", InterfaceName: "ike2-client-ike1", name: "ike1" },
                () => AddressList("203.0.113.1", "ike2-client-ike1", "ike1"),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            expect(result["/ip firewall mangle"][1]).toContain("to-Foreign");
            expect(result["/ip firewall mangle"][2]).toContain("to-Foreign");
        });

        it("should handle IPv4 addresses", () => {
            const result = testWithOutput(
                "AddressList",
                "Handle standard IPv4 address",
                { Address: "192.168.1.100", InterfaceName: "ovpn-client-prod", name: "prod" },
                () => AddressList("192.168.1.100", "ovpn-client-prod", "prod"),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"][0]).toContain('address="192.168.1.100"');
        });

        it("should include descriptive comments", () => {
            const result = testWithOutput(
                "AddressList",
                "Verify descriptive comments",
                { Address: "10.0.0.1", InterfaceName: "wireguard-client-main", name: "main", WanInterface: { WANType: "Foreign", WANName: "ether1" } },
                () => AddressList("10.0.0.1", "wireguard-client-main", "main", { WANType: "Foreign", WANName: "ether1" }),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"][0]).toContain('comment="VPN-main Interface:wireguard-client-main WanInterface:Foreign:ether1 Endpoint:10.0.0.1 - Endpoint for routing"');
        });

        it("should handle FQDN addresses", () => {
            const result = testWithOutput(
                "AddressList",
                "Handle FQDN address",
                { Address: "vpn.example.com", InterfaceName: "ovpn-client-example", name: "example" },
                () => AddressList("vpn.example.com", "ovpn-client-example", "example"),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"][0]).toContain('address="vpn.example.com"');
        });
    });

    describe("AddressListEntry", () => {
        it("should create only address list entry for VPN endpoint", () => {
            const result = testWithOutput(
                "AddressListEntry",
                "Create address list entry without mangle rules",
                { Address: "vpn.server.com", InterfaceName: "ovpn-client-server", name: "server" },
                () => AddressListEntry("vpn.server.com", "ovpn-client-server", "server"),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"]).toHaveLength(1);
            expect(result["/ip firewall address-list"][0]).toContain('address="vpn.server.com"');
            expect(result["/ip firewall address-list"][0]).toContain('list=VPNE');
            expect(result["/ip firewall mangle"]).toBeUndefined();
        });

        it("should add address to VPNE list with proper comment", () => {
            const result = testWithOutput(
                "AddressListEntry",
                "Add address with descriptive comment",
                { Address: "10.20.30.40", InterfaceName: "wireguard-client-test", name: "test", WanInterface: { WANType: "Domestic", WANName: "ether2" } },
                () => AddressListEntry("10.20.30.40", "wireguard-client-test", "test", { WANType: "Domestic", WANName: "ether2" }),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"][0]).toContain('comment="VPN-test Interface:wireguard-client-test WanInterface:Domestic:ether2 Endpoint:10.20.30.40 - Endpoint for routing"');
        });
    });

    describe("VPNEndpointMangle", () => {
        it("should create mangle rules for VPN endpoint routing", () => {
            const result = testWithOutput(
                "VPNEndpointMangle",
                "Create mangle rules for VPNE address list",
                {},
                () => VPNEndpointMangle(),
            );

            validateRouterConfig(result, ["/ip firewall mangle"]);
            expect(result["/ip firewall mangle"]).toHaveLength(3);
            expect(result["/ip firewall address-list"]).toBeUndefined();
        });

        it("should mark connection for VPN endpoint", () => {
            const result = testWithOutput(
                "VPNEndpointMangle",
                "Mark connection for VPNE traffic",
                {},
                () => VPNEndpointMangle(),
            );

            const mangleRules = result["/ip firewall mangle"];
            expect(mangleRules.some(r => r.includes('action=mark-connection'))).toBe(true);
            expect(mangleRules.some(r => r.includes('new-connection-mark=conn-VPNE'))).toBe(true);
        });

        it("should mark routing for VPN endpoint", () => {
            const result = testWithOutput(
                "VPNEndpointMangle",
                "Mark routing for VPNE traffic",
                {},
                () => VPNEndpointMangle(),
            );

            const mangleRules = result["/ip firewall mangle"];
            expect(mangleRules.some(r => r.includes('action=mark-routing'))).toBe(true);
            expect(mangleRules.some(r => r.includes('new-routing-mark=to-Foreign'))).toBe(true);
        });

        it("should route VPN endpoint through Foreign table", () => {
            const result = testWithOutput(
                "VPNEndpointMangle",
                "Route endpoint through to-Foreign table",
                {},
                () => VPNEndpointMangle(),
            );

            const mangleRules = result["/ip firewall mangle"];
            expect(mangleRules.filter(r => r.includes('to-Foreign')).length).toBe(2);
        });
    });

    describe("IPAddress", () => {
        it("should add IP address to interface", () => {
            const result = testWithOutput(
                "IPAddress",
                "Add IP address to interface",
                { InterfaceName: "wireguard-client-vpn1", Address: "10.0.0.2/24" },
                () => IPAddress("wireguard-client-vpn1", "10.0.0.2/24"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"]).toHaveLength(1);
        });

        it("should use correct CIDR notation", () => {
            const result = testWithOutput(
                "IPAddress",
                "Use CIDR notation for IP address",
                { InterfaceName: "ovpn-client-main", Address: "192.168.100.1/24" },
                () => IPAddress("ovpn-client-main", "192.168.100.1/24"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain('address=192.168.100.1/24');
        });

        it("should assign address to correct interface", () => {
            const result = testWithOutput(
                "IPAddress",
                "Assign to correct interface",
                { InterfaceName: "l2tp-client-vpn", Address: "172.16.0.2/16" },
                () => IPAddress("l2tp-client-vpn", "172.16.0.2/16"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain('interface=l2tp-client-vpn');
        });

        it("should include interface name in comment", () => {
            const result = testWithOutput(
                "IPAddress",
                "Include interface name in comment",
                { InterfaceName: "pptp-client-test", Address: "10.10.10.1/30" },
                () => IPAddress("pptp-client-test", "10.10.10.1/30"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain('comment="VPN-pptp-client-test"');
        });

        it("should handle /32 subnet mask", () => {
            const result = testWithOutput(
                "IPAddress",
                "Handle /32 subnet mask",
                { InterfaceName: "sstp-client-vpn", Address: "10.0.0.1/32" },
                () => IPAddress("sstp-client-vpn", "10.0.0.1/32"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain('address=10.0.0.1/32');
        });

        it("should handle /8 subnet mask", () => {
            const result = testWithOutput(
                "IPAddress",
                "Handle /8 subnet mask",
                { InterfaceName: "ike2-client-vpn", Address: "10.0.0.1/8" },
                () => IPAddress("ike2-client-vpn", "10.0.0.1/8"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain('address=10.0.0.1/8');
        });

        it("should handle interface names with special characters", () => {
            const result = testWithOutput(
                "IPAddress",
                "Handle interface names with special characters",
                { InterfaceName: "wireguard-client-vpn-server-01", Address: "10.99.99.1/24" },
                () => IPAddress("wireguard-client-vpn-server-01", "10.99.99.1/24"),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain('interface=wireguard-client-vpn-server-01');
        });
    });

    describe("BaseVPNConfig", () => {
        it("should create complete base VPN configuration", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Create complete base VPN configuration",
                {
                    InterfaceName: "wireguard-client-vpn1",
                    EndpointAddress: "203.0.113.50",
                    name: "vpn1"
                },
                () => BaseVPNConfig("wireguard-client-vpn1", "203.0.113.50", "vpn1"),
            );

            // Only validate sections that have content
            // Note: Mangle rules are not included anymore, they are added separately in VPNClientWrapper
            validateRouterConfig(result, [
                "/interface list member",
                "/ip route",
                "/ip firewall address-list",
            ]);

            // Verify all sections exist in the config
            expect(result).toHaveProperty("/ip address");
            expect(result).toHaveProperty("/ip firewall nat");
        });

        it("should add interface to WAN and VPN-WAN lists", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Add interface to interface lists",
                {
                    InterfaceName: "ovpn-client-main",
                    EndpointAddress: "1.2.3.4",
                    name: "main"
                },
                () => BaseVPNConfig("ovpn-client-main", "1.2.3.4", "main"),
            );

            validateRouterConfig(result, ["/interface list member"]);
            expect(result["/interface list member"]).toHaveLength(2);
            expect(result["/interface list member"][0]).toContain('list="WAN"');
            expect(result["/interface list member"][1]).toContain('list="VPN-WAN"');
        });

        it("should create route to VPN routing table", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Create route to VPN table",
                {
                    InterfaceName: "l2tp-client-vpn",
                    EndpointAddress: "8.8.8.8",
                    name: "vpn"
                },
                () => BaseVPNConfig("l2tp-client-vpn", "8.8.8.8", "vpn"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"]).toHaveLength(1);
            expect(result["/ip route"][0]).toContain("to-VPN-vpn");
        });

        it("should add endpoint to address list", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Add endpoint to address list",
                {
                    InterfaceName: "pptp-client-test",
                    EndpointAddress: "9.9.9.9",
                    name: "test"
                },
                () => BaseVPNConfig("pptp-client-test", "9.9.9.9", "test"),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"]).toHaveLength(1);
            expect(result["/ip firewall address-list"][0]).toContain('address="9.9.9.9"');
            expect(result["/ip firewall address-list"][0]).toContain('list=VPNE');
        });

        it("should add endpoint address to VPNE list without mangle rules", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Add endpoint to VPNE without mangle rules",
                {
                    InterfaceName: "sstp-client-vpn1",
                    EndpointAddress: "1.1.1.1",
                    name: "vpn1"
                },
                () => BaseVPNConfig("sstp-client-vpn1", "1.1.1.1", "vpn1"),
            );

            // BaseVPNConfig should NOT include mangle rules (they are added separately)
            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"]).toHaveLength(1);
            expect(result["/ip firewall address-list"][0]).toContain('list=VPNE');
            // Mangle rules are added once in VPNClientWrapper, not per VPN client
            expect(result["/ip firewall mangle"]).toBeUndefined();
        });

        it("should handle multiple VPN interfaces with different names", () => {
            const result1 = testWithOutput(
                "BaseVPNConfig",
                "Create config for VPN1",
                {
                    InterfaceName: "wireguard-client-vpn1",
                    EndpointAddress: "10.0.0.1",
                    name: "vpn1"
                },
                () => BaseVPNConfig("wireguard-client-vpn1", "10.0.0.1", "vpn1"),
            );

            const result2 = testWithOutput(
                "BaseVPNConfig",
                "Create config for VPN2",
                {
                    InterfaceName: "wireguard-client-vpn2",
                    EndpointAddress: "10.0.0.2",
                    name: "vpn2"
                },
                () => BaseVPNConfig("wireguard-client-vpn2", "10.0.0.2", "vpn2"),
            );

            // Both should have unique routing tables
            expect(result1["/ip route"][0]).toContain("to-VPN-vpn1");
            expect(result2["/ip route"][0]).toContain("to-VPN-vpn2");
        });

        it("should handle FQDN endpoint addresses", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Handle FQDN endpoint address",
                {
                    InterfaceName: "ike2-client-vpn",
                    EndpointAddress: "vpn.example.com",
                    name: "vpn"
                },
                () => BaseVPNConfig("ike2-client-vpn", "vpn.example.com", "vpn"),
            );

            validateRouterConfig(result, ["/ip firewall address-list"]);
            expect(result["/ip firewall address-list"][0]).toContain('address="vpn.example.com"');
        });

        it("should include all necessary sections", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Verify all config sections are present",
                {
                    InterfaceName: "wireguard-client-complete",
                    EndpointAddress: "203.0.113.100",
                    name: "complete"
                },
                () => BaseVPNConfig("wireguard-client-complete", "203.0.113.100", "complete"),
            );

            // Verify all expected sections exist
            expect(result).toHaveProperty("/ip address");
            expect(result).toHaveProperty("/ip firewall nat");
            expect(result).toHaveProperty("/interface list member");
            expect(result).toHaveProperty("/ip route");
            expect(result).toHaveProperty("/ip firewall address-list");
            // Note: Mangle rules are no longer included in BaseVPNConfig
        });

        it("should create config with proper integration between components", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Verify integration between components",
                {
                    InterfaceName: "ovpn-client-integrated",
                    EndpointAddress: "192.0.2.50",
                    name: "integrated"
                },
                () => BaseVPNConfig("ovpn-client-integrated", "192.0.2.50", "integrated"),
            );

            // Interface list should reference the interface name
            expect(result["/interface list member"][0]).toContain("ovpn-client-integrated");

            // Route should reference the interface name
            expect(result["/ip route"][0]).toContain("ovpn-client-integrated");

            // Address list should reference the endpoint
            expect(result["/ip firewall address-list"][0]).toContain("192.0.2.50");

            // Verify VPNE address list entry exists
            expect(result["/ip firewall address-list"][0]).toContain("VPNE");
        });

        it("should handle short names", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Handle short VPN name",
                {
                    InterfaceName: "wg1",
                    EndpointAddress: "1.2.3.4",
                    name: "v1"
                },
                () => BaseVPNConfig("wg1", "1.2.3.4", "v1"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("to-VPN-v1");
        });

        it("should handle names with special characters", () => {
            const result = testWithOutput(
                "BaseVPNConfig",
                "Handle names with hyphens and numbers",
                {
                    InterfaceName: "wireguard-client-vpn-server-01",
                    EndpointAddress: "198.51.100.50",
                    name: "vpn-server-01"
                },
                () => BaseVPNConfig("wireguard-client-vpn-server-01", "198.51.100.50", "vpn-server-01"),
            );

            validateRouterConfig(result, ["/ip route"]);
            expect(result["/ip route"][0]).toContain("to-VPN-vpn-server-01");
        });
    });
});
