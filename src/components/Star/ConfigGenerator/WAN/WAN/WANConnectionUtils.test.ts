import { describe, it, expect } from "vitest";
import {
    testWithOutput,
    validateRouterConfig,
} from "~/test-utils/test-helpers";
import {
    LTE,
    DHCPClient,
    PPPOEClient,
    StaticIP,
    calculateCIDR,
} from "./WANConnectionUtils";
import type {
    LTESettings,
    PPPoEConfig,
    StaticIPConfig,
} from "../../../StarContext/Utils/WANLinkType";

describe("WANConnectionUtils Module", () => {
    describe("LTE", () => {
        it("should configure basic LTE with APN", () => {
            const lteSettings: LTESettings = {
                apn: "internet",
            };

            const result = testWithOutput(
                "LTE",
                "Configure LTE with basic APN",
                { name: "WAN-1", Network: "Foreign", lteSettings },
                () => LTE("WAN-1", "Foreign", lteSettings),
            );

            validateRouterConfig(result, ["/interface lte", "/interface lte apn"]);
            expect(result["/interface lte"][0]).toContain('comment="WAN-1 to Foreign"');
        });

        it("should configure LTE with custom APN", () => {
            const lteSettings: LTESettings = {
                apn: "mobile.internet",
            };

            const result = testWithOutput(
                "LTE",
                "Configure LTE with custom APN",
                { name: "WAN-2", Network: "Domestic", lteSettings },
                () => LTE("WAN-2", "Domestic", lteSettings),
            );

            validateRouterConfig(result, ["/interface lte", "/interface lte apn"]);
            expect(result["/interface lte"][0]).toContain('comment="WAN-2 to Domestic"');
        });

        it("should configure LTE with enterprise APN", () => {
            const lteSettings: LTESettings = {
                apn: "enterprise.apn.carrier.com",
            };

            const result = testWithOutput(
                "LTE",
                "Configure LTE with enterprise APN",
                { name: "WAN-LTE", Network: "Foreign", lteSettings },
                () => LTE("WAN-LTE", "Foreign", lteSettings),
            );

            validateRouterConfig(result, ["/interface lte", "/interface lte apn"]);
            expect(result["/interface lte"][0]).toContain('comment="WAN-LTE to Foreign"');
            expect(result["/interface lte apn"][0]).toContain("enterprise.apn.carrier.com");
        });
    });

    describe("DHCPClient", () => {
        it("should configure DHCP client on ether1", () => {
            const result = testWithOutput(
                "DHCPClient",
                "Configure DHCP client on ether1",
                { name: "WAN-1", Network: "Foreign", Interface: "ether1" },
                () => DHCPClient("WAN-1", "Foreign", "ether1"),
            );

            validateRouterConfig(result, ["/ip dhcp-client"]);
        });

        it("should configure DHCP client with script for route management", () => {
            const result = testWithOutput(
                "DHCPClient",
                "DHCP client with route management script",
                { name: "WAN-2", Network: "Domestic", Interface: "ether2" },
                () => DHCPClient("WAN-2", "Domestic", "ether2"),
            );

            validateRouterConfig(result, ["/ip dhcp-client"]);
            expect(result["/ip dhcp-client"][0]).toContain("Route-to-Domestic");
        });

        it("should configure DHCP client on MACVLAN interface", () => {
            const result = testWithOutput(
                "DHCPClient",
                "Configure DHCP client on MACVLAN",
                {
                    name: "WAN-VLAN",
                    Network: "Foreign",
                    Interface: "MacVLAN-ether1-WAN-1",
                },
                () => DHCPClient("WAN-VLAN", "Foreign", "MacVLAN-ether1-WAN-1"),
            );

            validateRouterConfig(result, ["/ip dhcp-client"]);
        });

        it("should include proper script for dynamic route updates", () => {
            const result = DHCPClient("Test-WAN", "Foreign", "ether3");

            expect(result["/ip dhcp-client"][0]).toContain("script=");
            expect(result["/ip dhcp-client"][0]).toContain("bound=1");
            expect(result["/ip dhcp-client"][0]).toContain("gateway-address");
        });

        it("should set add-default-route to no", () => {
            const result = DHCPClient("Test-WAN", "Foreign", "ether1");

            expect(result["/ip dhcp-client"][0]).toContain("add-default-route=no");
        });

        it("should disable peer DNS and NTP", () => {
            const result = DHCPClient("Test-WAN", "Foreign", "ether1");

            expect(result["/ip dhcp-client"][0]).toContain("use-peer-dns=no");
            expect(result["/ip dhcp-client"][0]).toContain("use-peer-ntp=no");
        });
    });

    describe("PPPOEClient", () => {
        it("should configure PPPoE client with basic credentials", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "pppoeuser",
                password: "pppoepass123",
            };

            const result = testWithOutput(
                "PPPOEClient",
                "Configure PPPoE client with credentials",
                { name: "WAN-1", interfaceName: "ether1", pppoeConfig },
                () => PPPOEClient("WAN-1", "ether1", pppoeConfig),
            );

            validateRouterConfig(result, ["/interface pppoe-client"]);
        });

        it("should configure PPPoE client on VLAN interface", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "vlanuser",
                password: "vlanpass456",
            };

            const result = testWithOutput(
                "PPPOEClient",
                "Configure PPPoE on VLAN interface",
                {
                    name: "WAN-VLAN",
                    interfaceName: "VLAN100-ether1-WAN-1",
                    pppoeConfig,
                },
                () => PPPOEClient("WAN-VLAN", "VLAN100-ether1-WAN-1", pppoeConfig),
            );

            validateRouterConfig(result, ["/interface pppoe-client"]);
        });

        it("should configure PPPoE with special characters in password", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "user@domain.com",
                password: "P@ss!w0rd#123",
            };

            const result = testWithOutput(
                "PPPOEClient",
                "PPPoE with special characters in password",
                { name: "WAN-Special", interfaceName: "ether2", pppoeConfig },
                () => PPPOEClient("WAN-Special", "ether2", pppoeConfig),
            );

            validateRouterConfig(result, ["/interface pppoe-client"]);
        });

        it("should set dial-on-demand to yes", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "testuser",
                password: "testpass",
            };

            const result = PPPOEClient("Test-WAN", "ether1", pppoeConfig);

            expect(result["/interface pppoe-client"][0]).toContain("dial-on-demand=yes");
        });

        it("should set add-default-route to no", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "testuser",
                password: "testpass",
            };

            const result = PPPOEClient("Test-WAN", "ether1", pppoeConfig);

            expect(result["/interface pppoe-client"][0]).toContain("add-default-route=no");
        });

        it("should allow multiple authentication methods", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "testuser",
                password: "testpass",
            };

            const result = PPPOEClient("Test-WAN", "ether1", pppoeConfig);

            expect(result["/interface pppoe-client"][0]).toContain("allow=chap,pap,mschap1,mschap2");
        });

        it("should create interface with correct naming convention", () => {
            const pppoeConfig: PPPoEConfig = {
                username: "testuser",
                password: "testpass",
            };

            const result = PPPOEClient("My-WAN", "ether1", pppoeConfig);

            expect(result["/interface pppoe-client"][0]).toContain('name="pppoe-client-My-WAN"');
        });
    });

    describe("StaticIP", () => {
        it("should configure static IP with /24 subnet", () => {
            const staticIPConfig: StaticIPConfig = {
                ipAddress: "203.0.113.10",
                subnet: "255.255.255.0",
                gateway: "203.0.113.1",
            };

            const result = testWithOutput(
                "StaticIP",
                "Configure static IP with /24 subnet",
                { name: "WAN-1", interfaceName: "ether1", staticIPConfig },
                () => StaticIP("WAN-1", "ether1", staticIPConfig),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain("203.0.113.10/24");
        });

        it("should configure static IP with /30 subnet", () => {
            const staticIPConfig: StaticIPConfig = {
                ipAddress: "203.0.113.2",
                subnet: "255.255.255.252",
                gateway: "203.0.113.1",
            };

            const result = testWithOutput(
                "StaticIP",
                "Configure static IP with /30 subnet",
                { name: "WAN-2", interfaceName: "ether2", staticIPConfig },
                () => StaticIP("WAN-2", "ether2", staticIPConfig),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain("203.0.113.2/30");
        });

        it("should configure static IP with /16 subnet", () => {
            const staticIPConfig: StaticIPConfig = {
                ipAddress: "10.0.1.100",
                subnet: "255.255.0.0",
                gateway: "10.0.0.1",
            };

            const result = testWithOutput(
                "StaticIP",
                "Configure static IP with /16 subnet",
                { name: "WAN-Large", interfaceName: "ether3", staticIPConfig },
                () => StaticIP("WAN-Large", "ether3", staticIPConfig),
            );

            validateRouterConfig(result, ["/ip address"]);
            expect(result["/ip address"][0]).toContain("10.0.1.100/16");
        });

        it("should configure static IP with /8 subnet", () => {
            const staticIPConfig: StaticIPConfig = {
                ipAddress: "10.0.0.1",
                subnet: "255.0.0.0",
                gateway: "10.0.0.254",
            };

            const result = StaticIP("WAN-8", "ether1", staticIPConfig);

            expect(result["/ip address"][0]).toContain("10.0.0.1/8");
        });

        it("should include comment with WAN name", () => {
            const staticIPConfig: StaticIPConfig = {
                ipAddress: "192.168.1.100",
                subnet: "255.255.255.0",
                gateway: "192.168.1.1",
            };

            const result = StaticIP("My-Static-WAN", "ether1", staticIPConfig);

            expect(result["/ip address"][0]).toContain('comment="My-Static-WAN"');
        });
    });

    describe("calculateCIDR", () => {
        it("should calculate CIDR /24 from 255.255.255.0", () => {
            const cidr = calculateCIDR("255.255.255.0");
            expect(cidr).toBe(24);
        });

        it("should calculate CIDR /16 from 255.255.0.0", () => {
            const cidr = calculateCIDR("255.255.0.0");
            expect(cidr).toBe(16);
        });

        it("should calculate CIDR /8 from 255.0.0.0", () => {
            const cidr = calculateCIDR("255.0.0.0");
            expect(cidr).toBe(8);
        });

        it("should calculate CIDR /30 from 255.255.255.252", () => {
            const cidr = calculateCIDR("255.255.255.252");
            expect(cidr).toBe(30);
        });

        it("should calculate CIDR /32 from 255.255.255.255", () => {
            const cidr = calculateCIDR("255.255.255.255");
            expect(cidr).toBe(32);
        });

        it("should calculate CIDR /0 from 0.0.0.0", () => {
            const cidr = calculateCIDR("0.0.0.0");
            expect(cidr).toBe(0);
        });

        it("should calculate CIDR /28 from 255.255.255.240", () => {
            const cidr = calculateCIDR("255.255.255.240");
            expect(cidr).toBe(28);
        });

        it("should calculate CIDR /25 from 255.255.255.128", () => {
            const cidr = calculateCIDR("255.255.255.128");
            expect(cidr).toBe(25);
        });

        it("should calculate CIDR /26 from 255.255.255.192", () => {
            const cidr = calculateCIDR("255.255.255.192");
            expect(cidr).toBe(26);
        });

        it("should calculate CIDR /29 from 255.255.255.248", () => {
            const cidr = calculateCIDR("255.255.255.248");
            expect(cidr).toBe(29);
        });

        it("should calculate CIDR /27 from 255.255.255.224", () => {
            const cidr = calculateCIDR("255.255.255.224");
            expect(cidr).toBe(27);
        });

        it("should calculate CIDR /31 from 255.255.255.254", () => {
            const cidr = calculateCIDR("255.255.255.254");
            expect(cidr).toBe(31);
        });

        it("should calculate CIDR /20 from 255.255.240.0", () => {
            const cidr = calculateCIDR("255.255.240.0");
            expect(cidr).toBe(20);
        });

        it("should calculate CIDR /22 from 255.255.252.0", () => {
            const cidr = calculateCIDR("255.255.252.0");
            expect(cidr).toBe(22);
        });

        it("should calculate CIDR /12 from 255.240.0.0", () => {
            const cidr = calculateCIDR("255.240.0.0");
            expect(cidr).toBe(12);
        });
    });
});

