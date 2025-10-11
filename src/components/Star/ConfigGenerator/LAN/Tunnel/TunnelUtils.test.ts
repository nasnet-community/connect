import { describe, it, expect } from "vitest";
import {
  generateIPAddress,
  TunnelInterfaceList,
  TunnelAddressList,
  extractSubnetPrefix,
  buildTunnelIPAddress,
  handleIPsecAndFastPath,
  addTunnelSubnetConfigurations,
  TunnelInboundTraffic,
  findSubnetByName,
  IPIPInterface,
  EoipInterface,
  GreInterface,
  VxlanInterface,
} from "./TunnelUtils";
import type {
  IpipTunnelConfig,
  EoipTunnelConfig,
  GreTunnelConfig,
  VxlanInterfaceConfig,
  Tunnel,
  SubnetConfig,
} from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import {
  testWithOutput,
  testWithGenericOutput,
  validateRouterConfig,
} from "~/test-utils/test-helpers";

describe("Tunnel Utility Functions", () => {
  describe("extractSubnetPrefix", () => {
    it("should extract CIDR prefix from subnet string", () => {
      const result = testWithGenericOutput(
        "extractSubnetPrefix",
        "Extract prefix from 192.168.1.0/24",
        { subnet: "192.168.1.0/24" },
        () => extractSubnetPrefix("192.168.1.0/24"),
      );

      expect(result).toBe("24");
    });

    it("should extract prefix from /16 subnet", () => {
      const result = testWithGenericOutput(
        "extractSubnetPrefix",
        "Extract prefix from 10.0.0.0/16",
        { subnet: "10.0.0.0/16" },
        () => extractSubnetPrefix("10.0.0.0/16"),
      );

      expect(result).toBe("16");
    });

    it("should return default 24 when no prefix specified", () => {
      const result = testWithGenericOutput(
        "extractSubnetPrefix",
        "Return default prefix for subnet without CIDR",
        { subnet: "192.168.1.0" },
        () => extractSubnetPrefix("192.168.1.0"),
      );

      expect(result).toBe("24");
    });

    it("should handle /30 subnet for point-to-point", () => {
      const result = testWithGenericOutput(
        "extractSubnetPrefix",
        "Extract /30 prefix for point-to-point",
        { subnet: "10.10.10.0/30" },
        () => extractSubnetPrefix("10.10.10.0/30"),
      );

      expect(result).toBe("30");
    });
  });

  describe("buildTunnelIPAddress", () => {
    it("should build tunnel IP address with subnet prefix", () => {
      const subnet: SubnetConfig = {
        name: "tunnel-subnet",
        subnet: "10.255.1.0/30",
      };

      const result = testWithGenericOutput(
        "buildTunnelIPAddress",
        "Build tunnel IP with /30 prefix",
        { localAddress: "10.255.1.1", subnet },
        () => buildTunnelIPAddress("10.255.1.1", subnet),
      );

      expect(result).toBe("10.255.1.1/30");
    });

    it("should build tunnel IP with /24 prefix", () => {
      const subnet: SubnetConfig = {
        name: "lan-subnet",
        subnet: "192.168.100.0/24",
      };

      const result = testWithGenericOutput(
        "buildTunnelIPAddress",
        "Build tunnel IP with /24 prefix",
        { localAddress: "192.168.100.1", subnet },
        () => buildTunnelIPAddress("192.168.100.1", subnet),
      );

      expect(result).toBe("192.168.100.1/24");
    });

    it("should use default /24 when subnet has no prefix", () => {
      const subnet: SubnetConfig = {
        name: "default-subnet",
        subnet: "172.16.0.0",
      };

      const result = testWithGenericOutput(
        "buildTunnelIPAddress",
        "Build tunnel IP with default /24 prefix",
        { localAddress: "172.16.0.1", subnet },
        () => buildTunnelIPAddress("172.16.0.1", subnet),
      );

      expect(result).toBe("172.16.0.1/24");
    });
  });

  describe("handleIPsecAndFastPath", () => {
    it("should disable fast path when IPsec secret is provided", () => {
      const params: string[] = [];
      const config = {
        ipsecSecret: "secret123",
        allowFastPath: true, // Should be overridden
      };

      testWithGenericOutput(
        "handleIPsecAndFastPath",
        "Disable fast path when IPsec secret is set",
        { params: [...params], config },
        () => {
          handleIPsecAndFastPath(params, config);
          return params;
        },
      );

      expect(params).toContain("allow-fast-path=no");
      expect(params).not.toContain("allow-fast-path=yes");
    });

    it("should set fast path to yes when enabled and no IPsec", () => {
      const params: string[] = [];
      const config = { allowFastPath: true };

      testWithGenericOutput(
        "handleIPsecAndFastPath",
        "Enable fast path when no IPsec",
        { params: [...params], config },
        () => {
          handleIPsecAndFastPath(params, config);
          return params;
        },
      );

      expect(params).toContain("allow-fast-path=yes");
    });

    it("should set fast path to no when explicitly disabled", () => {
      const params: string[] = [];
      const config = { allowFastPath: false };

      testWithGenericOutput(
        "handleIPsecAndFastPath",
        "Disable fast path when explicitly set",
        { params: [...params], config },
        () => {
          handleIPsecAndFastPath(params, config);
          return params;
        },
      );

      expect(params).toContain("allow-fast-path=no");
    });

    it("should not add fast path parameter when undefined and no IPsec", () => {
      const params: string[] = [];
      const config = {};

      testWithGenericOutput(
        "handleIPsecAndFastPath",
        "No fast path parameter when undefined",
        { params: [...params], config },
        () => {
          handleIPsecAndFastPath(params, config);
          return params;
        },
      );

      expect(params).toHaveLength(0);
    });
  });

  describe("generateIPAddress", () => {
    it("should generate IP address configuration", () => {
      const result = testWithOutput(
        "generateIPAddress",
        "Generate basic IP address config",
        {
          address: "10.255.1.1/30",
          interfaceName: "ipip-tunnel1",
          comment: "IPIP tunnel IP",
        },
        () =>
          generateIPAddress("10.255.1.1/30", "ipip-tunnel1", "IPIP tunnel IP"),
      );

      expect(result["/ip address"]).toHaveLength(1);
      expect(result["/ip address"][0]).toContain('address="10.255.1.1/30"');
      expect(result["/ip address"][0]).toContain('interface="ipip-tunnel1"');
      expect(result["/ip address"][0]).toContain('comment="IPIP tunnel IP"');
      validateRouterConfig(result, ["/ip address"]);
    });

    it("should generate IP address without comment", () => {
      const result = testWithOutput(
        "generateIPAddress",
        "Generate IP address without comment",
        { address: "192.168.100.1/24", interfaceName: "gre-tunnel1" },
        () => generateIPAddress("192.168.100.1/24", "gre-tunnel1"),
      );

      expect(result["/ip address"]).toHaveLength(1);
      expect(result["/ip address"][0]).toContain('address="192.168.100.1/24"');
      expect(result["/ip address"][0]).toContain('interface="gre-tunnel1"');
      expect(result["/ip address"][0]).not.toContain("comment");
      validateRouterConfig(result, ["/ip address"]);
    });

    it("should handle IPv6 address", () => {
      const result = testWithOutput(
        "generateIPAddress",
        "Generate IPv6 address config",
        {
          address: "2001:db8::1/64",
          interfaceName: "vxlan1",
          comment: "IPv6 tunnel",
        },
        () =>
          generateIPAddress("2001:db8::1/64", "vxlan1", "IPv6 tunnel"),
      );

      expect(result["/ip address"][0]).toContain('address="2001:db8::1/64"');
      validateRouterConfig(result, ["/ip address"]);
    });
  });

  describe("TunnelInterfaceList", () => {
    it("should generate interface list members", () => {
      const result = testWithOutput(
        "TunnelInterfaceList",
        "Generate interface list for VPN network",
        {
          interfaceName: "ipip-tunnel1",
          networkType: "VPN",
          comment: "IPIP tunnel interface",
        },
        () =>
          TunnelInterfaceList("ipip-tunnel1", "VPN", "IPIP tunnel interface"),
      );

      expect(result["/interface list member"]).toHaveLength(2);
      expect(result["/interface list member"][0]).toContain(
        'interface="ipip-tunnel1"',
      );
      expect(result["/interface list member"][0]).toContain('list="LAN"');
      expect(result["/interface list member"][1]).toContain('list="VPN-LAN"');
      expect(result["/interface list member"][0]).toContain(
        'comment="IPIP tunnel interface"',
      );
      validateRouterConfig(result, ["/interface list member"]);
    });

    it("should generate interface list for Domestic network", () => {
      const result = testWithOutput(
        "TunnelInterfaceList",
        "Generate interface list for Domestic network",
        { interfaceName: "eoip-branch", networkType: "Domestic" },
        () => TunnelInterfaceList("eoip-branch", "Domestic"),
      );

      expect(result["/interface list member"]).toHaveLength(2);
      expect(result["/interface list member"][0]).toContain('list="LAN"');
      expect(result["/interface list member"][1]).toContain(
        'list="Domestic-LAN"',
      );
      validateRouterConfig(result, ["/interface list member"]);
    });

    it("should generate interface list without comment", () => {
      const result = testWithOutput(
        "TunnelInterfaceList",
        "Generate interface list without comment",
        { interfaceName: "gre-tunnel1", networkType: "Foreign" },
        () => TunnelInterfaceList("gre-tunnel1", "Foreign"),
      );

      expect(result["/interface list member"]).toHaveLength(2);
      expect(result["/interface list member"][0]).toContain(
        'interface="gre-tunnel1"',
      );
      expect(result["/interface list member"][1]).toContain(
        'list="Foreign-LAN"',
      );
      validateRouterConfig(result, ["/interface list member"]);
    });
  });

  describe("TunnelAddressList", () => {
    it("should generate address list entry", () => {
      const result = testWithOutput(
        "TunnelAddressList",
        "Generate address list for VPN subnet",
        {
          subnet: "10.255.1.0/30",
          networkType: "VPN",
          comment: "IPIP tunnel subnet",
        },
        () =>
          TunnelAddressList("10.255.1.0/30", "VPN", "IPIP tunnel subnet"),
      );

      expect(result["/ip firewall address-list"]).toHaveLength(1);
      expect(result["/ip firewall address-list"][0]).toContain(
        'address="10.255.1.0/30"',
      );
      expect(result["/ip firewall address-list"][0]).toContain('list="VPN-LAN"');
      expect(result["/ip firewall address-list"][0]).toContain(
        'comment="IPIP tunnel subnet"',
      );
      validateRouterConfig(result, ["/ip firewall address-list"]);
    });

    it("should generate address list for Foreign network", () => {
      const result = testWithOutput(
        "TunnelAddressList",
        "Generate address list for Foreign network",
        { subnet: "192.168.200.0/24", networkType: "Foreign" },
        () => TunnelAddressList("192.168.200.0/24", "Foreign"),
      );

      expect(result["/ip firewall address-list"]).toHaveLength(1);
      expect(result["/ip firewall address-list"][0]).toContain(
        'list="Foreign-LAN"',
      );
      validateRouterConfig(result, ["/ip firewall address-list"]);
    });

    it("should generate address list without comment", () => {
      const result = testWithOutput(
        "TunnelAddressList",
        "Generate address list without comment",
        { subnet: "10.10.10.0/24", networkType: "Domestic" },
        () => TunnelAddressList("10.10.10.0/24", "Domestic"),
      );

      expect(result["/ip firewall address-list"]).toHaveLength(1);
      expect(result["/ip firewall address-list"][0]).toContain(
        'address="10.10.10.0/24"',
      );
      expect(result["/ip firewall address-list"][0]).toContain(
        'list="Domestic-LAN"',
      );
      validateRouterConfig(result, ["/ip firewall address-list"]);
    });
  });

  describe("addTunnelSubnetConfigurations", () => {
    it("should add all subnet configurations for IPIP tunnel", () => {
      const configs: RouterConfig[] = [];
      const tunnelConfig: IpipTunnelConfig = {
        name: "ipip-test",
        localAddress: "10.255.1.1",
        remoteAddress: "203.0.113.1",
        NetworkType: "VPN",
      };
      const subnet: SubnetConfig = {
        name: "ipip-subnet",
        subnet: "10.255.1.0/30",
      };

      testWithGenericOutput(
        "addTunnelSubnetConfigurations",
        "Add subnet configurations for IPIP tunnel",
        { configs: [], tunnelConfig, subnet, tunnelType: "IPIP" },
        () => {
          addTunnelSubnetConfigurations(configs, tunnelConfig, subnet, "IPIP");
          return { configsAdded: configs.length };
        },
      );

      // Should add 3 configurations: IP address, interface list, address list
      expect(configs).toHaveLength(3);

      // Verify IP address config
      expect(configs[0]).toHaveProperty("/ip address");
      expect(configs[0]["/ip address"][0]).toContain("10.255.1.1/30");

      // Verify interface list config
      expect(configs[1]).toHaveProperty("/interface list member");
      expect(configs[1]["/interface list member"]).toHaveLength(2);

      // Verify address list config
      expect(configs[2]).toHaveProperty("/ip firewall address-list");
      expect(configs[2]["/ip firewall address-list"][0]).toContain("VPN-LAN");
    });

    it("should add configurations for VXLAN tunnel", () => {
      const configs: RouterConfig[] = [];
      const tunnelConfig: VxlanInterfaceConfig = {
        name: "vxlan-overlay",
        localAddress: "10.0.1.1",
        remoteAddress: "10.0.1.2",
        vni: 100,
        NetworkType: "Domestic",
      };
      const subnet: SubnetConfig = {
        name: "vxlan-subnet",
        subnet: "192.168.100.0/24",
      };

      testWithGenericOutput(
        "addTunnelSubnetConfigurations",
        "Add subnet configurations for VXLAN tunnel",
        { configs: [], tunnelConfig, subnet, tunnelType: "VXLAN" },
        () => {
          addTunnelSubnetConfigurations(
            configs,
            tunnelConfig,
            subnet,
            "VXLAN",
          );
          return { configsAdded: configs.length };
        },
      );

      expect(configs).toHaveLength(3);
      // Note: IP address uses localAddress with subnet prefix, not subnet IP
      expect(configs[0]["/ip address"][0]).toContain("10.0.1.1/24");
      expect(configs[1]["/interface list member"][1]).toContain(
        "Domestic-LAN",
      );
    });

    it("should use VPN as default network type when not specified", () => {
      const configs: RouterConfig[] = [];
      const tunnelConfig: GreTunnelConfig = {
        name: "gre-test",
        localAddress: "172.16.1.1",
        remoteAddress: "172.16.1.2",
        // NetworkType not specified
      };
      const subnet: SubnetConfig = {
        name: "gre-subnet",
        subnet: "172.16.1.0/30",
      };

      testWithGenericOutput(
        "addTunnelSubnetConfigurations",
        "Use VPN as default network type",
        { configs: [], tunnelConfig, subnet, tunnelType: "GRE" },
        () => {
          addTunnelSubnetConfigurations(configs, tunnelConfig, subnet, "GRE");
          return { configsAdded: configs.length };
        },
      );

      expect(configs).toHaveLength(3);
      expect(configs[1]["/interface list member"][1]).toContain("VPN-LAN");
      expect(configs[2]["/ip firewall address-list"][0]).toContain("VPN-LAN");
    });
  });

  describe("TunnelInboundTraffic", () => {
    it("should generate mangle rules for IPIP tunnel", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-test",
            localAddress: "10.255.1.1",
            remoteAddress: "203.0.113.1",
          },
        ],
      };

      const result = testWithOutput(
        "TunnelInboundTraffic",
        "Generate inbound traffic marking for IPIP",
        { tunnel },
        () => TunnelInboundTraffic(tunnel),
      );

      const mangleRules = result["/ip firewall mangle"];
      expect(mangleRules.length).toBeGreaterThan(0);
      expect(mangleRules.join(" ")).toContain("protocol=ipip");
      expect(mangleRules.join(" ")).toContain("conn-tunnel-server");
      expect(mangleRules.join(" ")).toContain("to-Domestic");
      validateRouterConfig(result, ["/ip firewall mangle"]);
    });

    it("should generate mangle rules for GRE and EoIP tunnels", () => {
      const tunnel: Tunnel = {
        Gre: [
          {
            name: "gre-test",
            localAddress: "192.168.1.1",
            remoteAddress: "203.0.113.1",
          },
        ],
        Eoip: [
          {
            name: "eoip-test",
            localAddress: "192.168.2.1",
            remoteAddress: "203.0.113.2",
            tunnelId: 100,
          },
        ],
      };

      const result = testWithOutput(
        "TunnelInboundTraffic",
        "Generate inbound traffic marking for GRE/EoIP",
        { tunnel },
        () => TunnelInboundTraffic(tunnel),
      );

      const mangleRules = result["/ip firewall mangle"];
      expect(mangleRules.join(" ")).toContain("protocol=gre");
      expect(mangleRules.join(" ")).toContain("GRE/EoIP");
      validateRouterConfig(result, ["/ip firewall mangle"]);
    });

    it("should generate mangle rules for VXLAN tunnels with port specification", () => {
      const tunnel: Tunnel = {
        Vxlan: [
          {
            name: "vxlan1",
            localAddress: "10.0.1.1",
            remoteAddress: "10.0.1.2",
            vni: 100,
            port: 4789,
          },
          {
            name: "vxlan2",
            localAddress: "10.0.2.1",
            remoteAddress: "10.0.2.2",
            vni: 200,
            port: 8472, // Custom port
          },
        ],
      };

      const result = testWithOutput(
        "TunnelInboundTraffic",
        "Generate inbound traffic marking for VXLAN with ports",
        { tunnel },
        () => TunnelInboundTraffic(tunnel),
      );

      const mangleRules = result["/ip firewall mangle"];
      expect(mangleRules.join(" ")).toContain("dst-port=4789");
      expect(mangleRules.join(" ")).toContain("dst-port=8472");
      expect(mangleRules.join(" ")).toContain("VNI 100");
      expect(mangleRules.join(" ")).toContain("VNI 200");
      validateRouterConfig(result, ["/ip firewall mangle"]);
    });

    it("should generate rules for multiple tunnel types", () => {
      const tunnel: Tunnel = {
        IPIP: [
          { name: "ipip1", localAddress: "10.1.1.1", remoteAddress: "1.1.1.1" },
        ],
        Gre: [
          { name: "gre1", localAddress: "10.2.2.1", remoteAddress: "2.2.2.2" },
        ],
        Vxlan: [
          {
            name: "vxlan1",
            localAddress: "10.3.3.1",
            remoteAddress: "10.3.3.2",
            vni: 100,
          },
        ],
      };

      const result = testWithOutput(
        "TunnelInboundTraffic",
        "Generate inbound traffic for all tunnel types",
        { tunnel },
        () => TunnelInboundTraffic(tunnel),
      );

      const mangleRules = result["/ip firewall mangle"];
      expect(mangleRules.join(" ")).toContain("protocol=ipip");
      expect(mangleRules.join(" ")).toContain("protocol=gre");
      expect(mangleRules.join(" ")).toContain("protocol=udp");
      expect(mangleRules.join(" ")).toContain("VXLAN");
      validateRouterConfig(result, ["/ip firewall mangle"]);
    });

    it("should return empty config for empty tunnel object", () => {
      const tunnel: Tunnel = {};

      const result = testWithOutput(
        "TunnelInboundTraffic",
        "Handle empty tunnel configuration",
        { tunnel },
        () => TunnelInboundTraffic(tunnel),
      );

      // Should have header comments but no actual rules
      const mangleRules = result["/ip firewall mangle"];
      expect(mangleRules).toHaveLength(2); // Just the comment headers
      expect(mangleRules[0]).toContain("# ---");
      validateRouterConfig(result, ["/ip firewall mangle"]);
    });
  });

  describe("findSubnetByName", () => {
    const subnetList: SubnetConfig[] = [
      { name: "ipip-tunnel1", subnet: "10.255.1.0/30" },
      { name: "gre-tunnel1", subnet: "10.255.2.0/30" },
      { name: "VXLAN-Overlay", subnet: "192.168.100.0/24" },
    ];

    it("should find subnet by exact name match", () => {
      const result = testWithGenericOutput(
        "findSubnetByName",
        "Find subnet by exact name match",
        { tunnelName: "ipip-tunnel1", subnetList },
        () => findSubnetByName("ipip-tunnel1", subnetList),
      );

      expect(result).toEqual({ name: "ipip-tunnel1", subnet: "10.255.1.0/30" });
    });

    it("should find subnet by case-insensitive match", () => {
      const result = testWithGenericOutput(
        "findSubnetByName",
        "Find subnet by case-insensitive match",
        { tunnelName: "vxlan-overlay", subnetList },
        () => findSubnetByName("vxlan-overlay", subnetList),
      );

      expect(result).toEqual({
        name: "VXLAN-Overlay",
        subnet: "192.168.100.0/24",
      });
    });

    it("should find subnet by partial name match", () => {
      const result = testWithGenericOutput(
        "findSubnetByName",
        "Find subnet by partial name match",
        { tunnelName: "gre", subnetList },
        () => findSubnetByName("gre", subnetList),
      );

      expect(result).toEqual({ name: "gre-tunnel1", subnet: "10.255.2.0/30" });
    });

    it("should return undefined when subnet not found", () => {
      const result = testWithGenericOutput(
        "findSubnetByName",
        "Return undefined when subnet not found",
        { tunnelName: "non-existent", subnetList },
        () => findSubnetByName("non-existent", subnetList),
      );

      expect(result).toBeUndefined();
    });

    it("should return undefined for empty subnet list", () => {
      const result = testWithGenericOutput(
        "findSubnetByName",
        "Return undefined for empty subnet list",
        { tunnelName: "tunnel1", subnetList: [] },
        () => findSubnetByName("tunnel1", []),
      );

      expect(result).toBeUndefined();
    });

    it("should return undefined when subnet list is undefined", () => {
      const result = testWithGenericOutput(
        "findSubnetByName",
        "Return undefined when subnet list is undefined",
        { tunnelName: "tunnel1", subnetList: undefined },
        () => findSubnetByName("tunnel1", undefined),
      );

      expect(result).toBeUndefined();
    });
  });

  describe("Edge Cases for Utility Functions", () => {
    describe("extractSubnetPrefix Edge Cases", () => {
      it("should handle empty string subnet", () => {
        const result = testWithGenericOutput(
          "extractSubnetPrefix",
          "Handle empty string subnet",
          { subnet: "" },
          () => extractSubnetPrefix("")
        );

        expect(result).toBe("24");
      });

      it("should handle subnet with just slash", () => {
        const result = testWithGenericOutput(
          "extractSubnetPrefix",
          "Handle subnet with just slash",
          { subnet: "/" },
          () => extractSubnetPrefix("/")
        );

        expect(result).toBe("24");
      });

      it("should handle IPv6 prefix", () => {
        const result = testWithGenericOutput(
          "extractSubnetPrefix",
          "Extract IPv6 prefix",
          { subnet: "2001:db8::/64" },
          () => extractSubnetPrefix("2001:db8::/64")
        );

        expect(result).toBe("64");
      });

      it("should handle /32 prefix for single host", () => {
        const result = testWithGenericOutput(
          "extractSubnetPrefix",
          "Extract /32 prefix",
          { subnet: "192.168.1.1/32" },
          () => extractSubnetPrefix("192.168.1.1/32")
        );

        expect(result).toBe("32");
      });

      it("should handle /8 prefix for large networks", () => {
        const result = testWithGenericOutput(
          "extractSubnetPrefix",
          "Extract /8 prefix",
          { subnet: "10.0.0.0/8" },
          () => extractSubnetPrefix("10.0.0.0/8")
        );

        expect(result).toBe("8");
      });
    });

    describe("buildTunnelIPAddress Edge Cases", () => {
      it("should handle IPv6 addresses", () => {
        const subnet: SubnetConfig = {
          name: "ipv6-tunnel",
          subnet: "2001:db8::/64",
        };

        const result = testWithGenericOutput(
          "buildTunnelIPAddress",
          "Build IPv6 tunnel address",
          { localAddress: "2001:db8::1", subnet },
          () => buildTunnelIPAddress("2001:db8::1", subnet)
        );

        expect(result).toBe("2001:db8::1/64");
      });

      it("should handle unusual prefix lengths", () => {
        const subnet: SubnetConfig = {
          name: "odd-prefix",
          subnet: "192.168.1.0/25",
        };

        const result = testWithGenericOutput(
          "buildTunnelIPAddress",
          "Build address with /25 prefix",
          { localAddress: "192.168.1.100", subnet },
          () => buildTunnelIPAddress("192.168.1.100", subnet)
        );

        expect(result).toBe("192.168.1.100/25");
      });
    });

    describe("handleIPsecAndFastPath Edge Cases", () => {
      it("should handle both IPsec and explicit fast path=false", () => {
        const params: string[] = [];
        const config = {
          ipsecSecret: "secret",
          allowFastPath: false,
        };

        testWithGenericOutput(
          "handleIPsecAndFastPath",
          "IPsec with explicit fast path false",
          { params: [...params], config },
          () => {
            handleIPsecAndFastPath(params, config);
            return params;
          }
        );

        // IPsec takes precedence
        expect(params).toContain("allow-fast-path=no");
        expect(params).toHaveLength(1);
      });

      it("should not add parameter when both are undefined", () => {
        const params: string[] = [];
        const config = {};

        testWithGenericOutput(
          "handleIPsecAndFastPath",
          "No parameters when undefined",
          { params: [...params], config },
          () => {
            handleIPsecAndFastPath(params, config);
            return params;
          }
        );

        expect(params).toHaveLength(0);
      });
    });
  });

  describe("Network Type Variations", () => {
    describe("Split Network Type", () => {
      it("should handle Split network in interface lists", () => {
        const result = testWithOutput(
          "TunnelInterfaceList",
          "Generate interface list for Split network",
          { interfaceName: "tunnel-split", networkType: "Split" },
          () => TunnelInterfaceList("tunnel-split", "Split", "Split tunnel")
        );

        expect(result["/interface list member"]).toHaveLength(2);
        expect(result["/interface list member"][1]).toContain('list="Split-LAN"');
        expect(result["/interface list member"][0]).toContain(
          'comment="Split tunnel"'
        );
        validateRouterConfig(result, ["/interface list member"]);
      });

      it("should handle Split network in address lists", () => {
        const result = testWithOutput(
          "TunnelAddressList",
          "Generate address list for Split network",
          { subnet: "172.20.1.0/24", networkType: "Split" },
          () => TunnelAddressList("172.20.1.0/24", "Split", "Split subnet")
        );

        expect(result["/ip firewall address-list"]).toHaveLength(1);
        expect(result["/ip firewall address-list"][0]).toContain(
          'list="Split-LAN"'
        );
        expect(result["/ip firewall address-list"][0]).toContain(
          'comment="Split subnet"'
        );
        validateRouterConfig(result, ["/ip firewall address-list"]);
      });

      it("should handle Split network in subnet configurations", () => {
        const configs: RouterConfig[] = [];
        const tunnelConfig: IpipTunnelConfig = {
          name: "ipip-split",
          localAddress: "172.20.1.1",
          remoteAddress: "203.0.113.100",
          NetworkType: "Split",
        };
        const subnet: SubnetConfig = {
          name: "ipip-split",
          subnet: "172.20.1.0/30",
        };

        testWithGenericOutput(
          "addTunnelSubnetConfigurations",
          "Add Split network subnet configs",
          { tunnelConfig, subnet, networkType: "Split" },
          () => {
            addTunnelSubnetConfigurations(configs, tunnelConfig, subnet, "IPIP");
            return { configsAdded: configs.length };
          }
        );

        expect(configs).toHaveLength(3);
        expect(configs[1]["/interface list member"][1]).toContain("Split-LAN");
        expect(configs[2]["/ip firewall address-list"][0]).toContain(
          "Split-LAN"
        );
      });
    });

    describe("All Network Types Comprehensive", () => {
      it("should handle all network types in TunnelInterfaceList", () => {
        const networkTypes = ["Split", "Domestic", "Foreign", "VPN"];
        const results = networkTypes.map((networkType) =>
          TunnelInterfaceList(`tunnel-${networkType}`, networkType)
        );

        results.forEach((result, index) => {
          const networkType = networkTypes[index];
          expect(result["/interface list member"][1]).toContain(
            `${networkType}-LAN`
          );
        });
      });

      it("should handle all network types in TunnelAddressList", () => {
        const networkTypes = ["Split", "Domestic", "Foreign", "VPN"];
        const results = networkTypes.map((networkType) =>
          TunnelAddressList("10.0.0.0/24", networkType)
        );

        results.forEach((result, index) => {
          const networkType = networkTypes[index];
          expect(result["/ip firewall address-list"][0]).toContain(
            `${networkType}-LAN`
          );
        });
      });
    });
  });

  describe("Complex Scenarios", () => {
    describe("TunnelInboundTraffic Complex Cases", () => {
      it("should handle VXLAN tunnels with multiple custom ports", () => {
        const tunnel: Tunnel = {
          Vxlan: [
            {
              name: "vxlan-port1",
              localAddress: "10.0.1.1",
              remoteAddress: "10.0.1.2",
              vni: 100,
              port: 4789,
            },
            {
              name: "vxlan-port2",
              localAddress: "10.0.2.1",
              remoteAddress: "10.0.2.2",
              vni: 200,
              port: 8472,
            },
            {
              name: "vxlan-port3",
              localAddress: "10.0.3.1",
              remoteAddress: "10.0.3.2",
              vni: 300,
              port: 9999,
            },
          ],
        };

        const result = testWithOutput(
          "TunnelInboundTraffic",
          "Handle multiple VXLAN tunnels with different ports",
          { vxlanCount: 3, ports: [4789, 8472, 9999] },
          () => TunnelInboundTraffic(tunnel)
        );

        const mangleRules = result["/ip firewall mangle"];
        expect(mangleRules.join(" ")).toContain("dst-port=4789");
        expect(mangleRules.join(" ")).toContain("dst-port=8472");
        expect(mangleRules.join(" ")).toContain("dst-port=9999");
        expect(mangleRules.join(" ")).toContain("VNI 100");
        expect(mangleRules.join(" ")).toContain("VNI 200");
        expect(mangleRules.join(" ")).toContain("VNI 300");
        validateRouterConfig(result, ["/ip firewall mangle"]);
      });

      it("should handle mixed protocols with complex configuration", () => {
        const tunnel: Tunnel = {
          IPIP: [
            { name: "ipip1", localAddress: "10.1.1.1", remoteAddress: "1.1.1.1" },
            { name: "ipip2", localAddress: "10.1.2.1", remoteAddress: "1.1.1.2" },
          ],
          Gre: [
            { name: "gre1", localAddress: "10.2.1.1", remoteAddress: "2.2.2.1" },
          ],
          Eoip: [
            { name: "eoip1", localAddress: "10.3.1.1", remoteAddress: "3.3.3.1", tunnelId: 100 },
            { name: "eoip2", localAddress: "10.3.2.1", remoteAddress: "3.3.3.2", tunnelId: 200 },
          ],
          Vxlan: [
            {
              name: "vxlan1",
              localAddress: "10.4.1.1",
              remoteAddress: "10.4.1.2",
              vni: 1000,
              port: 4789,
            },
            {
              name: "vxlan2",
              localAddress: "10.4.2.1",
              remoteAddress: "10.4.2.2",
              vni: 2000,
              port: 8472,
            },
          ],
        };

        const result = testWithOutput(
          "TunnelInboundTraffic",
          "Handle all protocols with multiple instances",
          {
            IPIP: 2,
            GRE: 1,
            EoIP: 2,
            VXLAN: 2,
          },
          () => TunnelInboundTraffic(tunnel)
        );

        const mangleRules = result["/ip firewall mangle"];
        expect(mangleRules.join(" ")).toContain("protocol=ipip");
        expect(mangleRules.join(" ")).toContain("protocol=gre");
        expect(mangleRules.join(" ")).toContain("protocol=udp");
        expect(mangleRules.join(" ")).toContain("conn-tunnel-server");
        expect(mangleRules.join(" ")).toContain("to-Domestic");
        validateRouterConfig(result, ["/ip firewall mangle"]);
      });
    });

    describe("addTunnelSubnetConfigurations Complex Cases", () => {
      it("should handle all tunnel types with all network types", () => {
        const tunnelTypes = ["IPIP", "EoIP", "GRE", "VXLAN"] as const;
        const networkTypes: Array<"Split" | "Domestic" | "Foreign" | "VPN"> = [
          "Split",
          "Domestic",
          "Foreign",
          "VPN",
        ];

        tunnelTypes.forEach((tunnelType) => {
          networkTypes.forEach((networkType) => {
            const configs: RouterConfig[] = [];
            const tunnelConfig:
              | IpipTunnelConfig
              | EoipTunnelConfig
              | GreTunnelConfig
              | VxlanInterfaceConfig =
              tunnelType === "EoIP"
                ? {
                    name: `${tunnelType.toLowerCase()}-${networkType}`,
                    localAddress: "10.0.0.1",
                    remoteAddress: "10.0.0.2",
                    tunnelId: 100,
                    NetworkType: networkType,
                  }
                : tunnelType === "VXLAN"
                ? {
                    name: `${tunnelType.toLowerCase()}-${networkType}`,
                    localAddress: "10.0.0.1",
                    remoteAddress: "10.0.0.2",
                    vni: 100,
                    NetworkType: networkType,
                  }
                : {
                    name: `${tunnelType.toLowerCase()}-${networkType}`,
                    localAddress: "10.0.0.1",
                    remoteAddress: "10.0.0.2",
                    NetworkType: networkType,
                  };

            const subnet: SubnetConfig = {
              name: `${tunnelType.toLowerCase()}-${networkType}`,
              subnet: "10.0.0.0/30",
            };

            addTunnelSubnetConfigurations(
              configs,
              tunnelConfig,
              subnet,
              tunnelType
            );

            expect(configs).toHaveLength(3);
            expect(configs[1]["/interface list member"][1]).toContain(
              `${networkType}-LAN`
            );
            expect(configs[2]["/ip firewall address-list"][0]).toContain(
              `${networkType}-LAN`
            );
          });
        });
      });
    });

    describe("findSubnetByName Complex Matching", () => {
      const complexSubnetList: SubnetConfig[] = [
        { name: "IPIP-Tunnel-Site1", subnet: "10.1.1.0/30" },
        { name: "gre_tunnel_site2", subnet: "10.2.2.0/30" },
        { name: "eoip.tunnel.site3", subnet: "10.3.3.0/30" },
        { name: "vxlan-TUNNEL-site4", subnet: "10.4.4.0/24" },
      ];

      it("should find subnet with case-insensitive matching for complex names", () => {
        const result = testWithGenericOutput(
          "findSubnetByName",
          "Find with case-insensitive complex name",
          { tunnelName: "ipip-tunnel-site1", subnetList: complexSubnetList },
          () => findSubnetByName("ipip-tunnel-site1", complexSubnetList)
        );

        expect(result).toEqual({
          name: "IPIP-Tunnel-Site1",
          subnet: "10.1.1.0/30",
        });
      });

      it("should find subnet with partial matching", () => {
        const result = testWithGenericOutput(
          "findSubnetByName",
          "Find with partial name match",
          { tunnelName: "site2", subnetList: complexSubnetList },
          () => findSubnetByName("site2", complexSubnetList)
        );

        expect(result).toEqual({
          name: "gre_tunnel_site2",
          subnet: "10.2.2.0/30",
        });
      });

      it("should prioritize exact match over partial match", () => {
        const subnetListWithDuplicates: SubnetConfig[] = [
          { name: "tunnel", subnet: "10.0.0.0/30" },
          { name: "ipip-tunnel", subnet: "10.1.1.0/30" },
          { name: "tunnel-exact", subnet: "10.2.2.0/30" },
        ];

        const result = testWithGenericOutput(
          "findSubnetByName",
          "Prioritize exact match",
          { tunnelName: "tunnel", subnetList: subnetListWithDuplicates },
          () => findSubnetByName("tunnel", subnetListWithDuplicates)
        );

        // Should find exact match first
        expect(result?.name).toBe("tunnel");
      });
    });

    describe("Comment Handling Comprehensive", () => {
      it("should handle very long comments", () => {
        const longComment =
          "This is a very long comment for a tunnel interface that describes the purpose and configuration details for this specific IPIP tunnel connecting our main office to the remote site with full redundancy and IPsec encryption enabled for security purposes";

        const result = testWithOutput(
          "generateIPAddress",
          "Handle very long comment",
          { comment: longComment },
          () => generateIPAddress("10.0.0.1/24", "tunnel1", longComment)
        );

        expect(result["/ip address"][0]).toContain(`comment="${longComment}"`);
        validateRouterConfig(result, ["/ip address"]);
      });

      it("should handle comments with special characters", () => {
        const specialComment = 'Tunnel with "quotes" and \\backslashes\\';

        const result = testWithOutput(
          "TunnelInterfaceList",
          "Handle special characters in comment",
          { comment: specialComment },
          () => TunnelInterfaceList("tunnel1", "VPN", specialComment)
        );

        expect(result["/interface list member"][0]).toContain("comment=");
        validateRouterConfig(result, ["/interface list member"]);
      });
    });
  });

  describe("Protocol Interface Functions", () => {
    describe("IPIPInterface", () => {
      it("should generate basic IPIP tunnel", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-hq",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.1",
        };

        const result = testWithOutput(
          "IPIPInterface",
          "Generate basic IPIP tunnel configuration",
          { ipip: ipipConfig },
          () => IPIPInterface(ipipConfig),
        );

        expect(result["/interface ipip"]).toHaveLength(1);
        expect(result["/interface ipip"][0]).toContain("name=ipip-hq");
        expect(result["/interface ipip"][0]).toContain("remote-address=203.0.113.1");
        validateRouterConfig(result, ["/interface ipip"]);
      });

      it("should generate IPIP tunnel with IPsec secret", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-secure",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.1",
          ipsecSecret: "mySecretKey123",
          comment: "Secure IPIP to HQ",
        };

        const result = testWithOutput(
          "IPIPInterface",
          "Generate IPIP tunnel with IPsec secret",
          { ipip: ipipConfig },
          () => IPIPInterface(ipipConfig),
        );

        expect(result["/interface ipip"][0]).toContain('ipsec-secret="mySecretKey123"');
        expect(result["/interface ipip"][0]).toContain('comment="Secure IPIP to HQ"');
        expect(result["/interface ipip"][0]).toContain("allow-fast-path=no");
        validateRouterConfig(result, ["/interface ipip"]);
      });

      it("should handle disabled IPIP tunnel", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-disabled",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.1",
          disabled: true,
        };

        const result = testWithOutput(
          "IPIPInterface",
          "Generate disabled IPIP tunnel",
          { ipip: ipipConfig },
          () => IPIPInterface(ipipConfig),
        );

        expect(result["/interface ipip"][0]).toContain("disabled=yes");
        validateRouterConfig(result, ["/interface ipip"]);
      });

      it("should handle IPIP tunnel with fast path enabled", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-fastpath",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.1",
          allowFastPath: true,
        };

        const result = testWithOutput(
          "IPIPInterface",
          "Generate IPIP tunnel with fast path enabled",
          { ipip: ipipConfig },
          () => IPIPInterface(ipipConfig),
        );

        expect(result["/interface ipip"][0]).toContain("allow-fast-path=yes");
        validateRouterConfig(result, ["/interface ipip"]);
      });

      it("should handle IPIP tunnel with dont-fragment setting", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-df",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.1",
          dontFragment: "enabled",
        };

        const result = testWithOutput(
          "IPIPInterface",
          "Generate IPIP tunnel with dont-fragment enabled",
          { ipip: ipipConfig },
          () => IPIPInterface(ipipConfig),
        );

        expect(result["/interface ipip"][0]).toContain("dont-fragment=enabled");
        validateRouterConfig(result, ["/interface ipip"]);
      });
    });

    describe("EoipInterface", () => {
      it("should generate basic EoIP tunnel", () => {
        const eoipConfig: EoipTunnelConfig = {
          name: "eoip-branch",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.2",
          tunnelId: 100,
        };

        const result = testWithOutput(
          "EoipInterface",
          "Generate basic EoIP tunnel configuration",
          { eoip: eoipConfig },
          () => EoipInterface(eoipConfig),
        );

        expect(result["/interface eoip"]).toHaveLength(1);
        expect(result["/interface eoip"][0]).toContain("name=eoip-branch");
        expect(result["/interface eoip"][0]).toContain("remote-address=203.0.113.2");
        expect(result["/interface eoip"][0]).toContain("tunnel-id=100");
        validateRouterConfig(result, ["/interface eoip"]);
      });

      it("should generate EoIP tunnel with IPsec and loop protection", () => {
        const eoipConfig: EoipTunnelConfig = {
          name: "eoip-secure",
          localAddress: "192.168.2.1",
          remoteAddress: "203.0.113.10",
          tunnelId: 200,
          ipsecSecret: "eoipSecret456",
          loopProtect: "on",
          loopProtectDisableTime: 5000,
          loopProtectSendInterval: 5000,
          comment: "Secure EoIP with loop protection",
        };

        const result = testWithOutput(
          "EoipInterface",
          "Generate EoIP with IPsec and loop protection",
          { eoip: eoipConfig },
          () => EoipInterface(eoipConfig),
        );

        expect(result["/interface eoip"][0]).toContain('ipsec-secret="eoipSecret456"');
        expect(result["/interface eoip"][0]).toContain("allow-fast-path=no");
        expect(result["/interface eoip"][0]).toContain("loop-protect=on");
        expect(result["/interface eoip"][0]).toContain("loop-protect-disable-time=5000");
        expect(result["/interface eoip"][0]).toContain("loop-protect-send-interval=5000");
        validateRouterConfig(result, ["/interface eoip"]);
      });

      it("should handle disabled EoIP tunnel", () => {
        const eoipConfig: EoipTunnelConfig = {
          name: "eoip-disabled",
          localAddress: "192.168.3.1",
          remoteAddress: "203.0.113.4",
          tunnelId: 400,
          disabled: true,
        };

        const result = testWithOutput(
          "EoipInterface",
          "Generate disabled EoIP tunnel",
          { eoip: eoipConfig },
          () => EoipInterface(eoipConfig),
        );

        expect(result["/interface eoip"][0]).toContain("disabled=yes");
        validateRouterConfig(result, ["/interface eoip"]);
      });

      it("should handle EoIP tunnel with dont-fragment setting", () => {
        const eoipConfig: EoipTunnelConfig = {
          name: "eoip-df",
          localAddress: "192.168.4.1",
          remoteAddress: "203.0.113.5",
          tunnelId: 500,
          dontFragment: "disabled",
        };

        const result = testWithOutput(
          "EoipInterface",
          "Generate EoIP tunnel with dont-fragment disabled",
          { eoip: eoipConfig },
          () => EoipInterface(eoipConfig),
        );

        expect(result["/interface eoip"][0]).toContain("dont-fragment=disabled");
        validateRouterConfig(result, ["/interface eoip"]);
      });
    });

    describe("GreInterface", () => {
      it("should generate basic GRE tunnel", () => {
        const greConfig: GreTunnelConfig = {
          name: "gre-site1",
          localAddress: "10.1.1.1",
          remoteAddress: "10.2.2.2",
        };

        const result = testWithOutput(
          "GreInterface",
          "Generate basic GRE tunnel configuration",
          { gre: greConfig },
          () => GreInterface(greConfig),
        );

        expect(result["/interface gre"]).toHaveLength(1);
        expect(result["/interface gre"][0]).toContain("name=gre-site1");
        expect(result["/interface gre"][0]).toContain("remote-address=10.2.2.2");
        validateRouterConfig(result, ["/interface gre"]);
      });

      it("should generate GRE tunnel with IPsec secret", () => {
        const greConfig: GreTunnelConfig = {
          name: "gre-secure",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.6",
          ipsecSecret: "greSecret789",
          comment: "Secure GRE tunnel",
        };

        const result = testWithOutput(
          "GreInterface",
          "Generate GRE tunnel with IPsec secret",
          { gre: greConfig },
          () => GreInterface(greConfig),
        );

        expect(result["/interface gre"][0]).toContain('ipsec-secret="greSecret789"');
        expect(result["/interface gre"][0]).toContain('comment="Secure GRE tunnel"');
        expect(result["/interface gre"][0]).toContain("allow-fast-path=no");
        validateRouterConfig(result, ["/interface gre"]);
      });

      it("should handle disabled GRE tunnel", () => {
        const greConfig: GreTunnelConfig = {
          name: "gre-disabled",
          localAddress: "192.168.5.1",
          remoteAddress: "203.0.113.8",
          disabled: true,
        };

        const result = testWithOutput(
          "GreInterface",
          "Generate disabled GRE tunnel",
          { gre: greConfig },
          () => GreInterface(greConfig),
        );

        expect(result["/interface gre"][0]).toContain("disabled=yes");
        validateRouterConfig(result, ["/interface gre"]);
      });

      it("should handle GRE tunnel with dont-fragment setting", () => {
        const greConfig: GreTunnelConfig = {
          name: "gre-df",
          localAddress: "192.168.6.1",
          remoteAddress: "203.0.113.9",
          dontFragment: "enabled",
        };

        const result = testWithOutput(
          "GreInterface",
          "Generate GRE tunnel with dont-fragment enabled",
          { gre: greConfig },
          () => GreInterface(greConfig),
        );

        expect(result["/interface gre"][0]).toContain("dont-fragment=enabled");
        validateRouterConfig(result, ["/interface gre"]);
      });
    });

    describe("VxlanInterface", () => {
      it("should generate basic VXLAN with unicast mode", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-datacenter",
          localAddress: "10.0.1.1",
          remoteAddress: "10.0.1.2",
          vni: 100,
        };

        const result = testWithOutput(
          "VxlanInterface",
          "Generate basic VXLAN with unicast mode",
          { vxlan: vxlanConfig },
          () => VxlanInterface(vxlanConfig),
        );

        expect(result["/interface vxlan"]).toHaveLength(1);
        expect(result["/interface vxlan"][0]).toContain("name=vxlan-datacenter");
        expect(result["/interface vxlan"][0]).toContain("vni=100");

        // Should auto-create VTEP from remoteAddress
        expect(result["/interface vxlan vteps"]).toHaveLength(1);
        expect(result["/interface vxlan vteps"][0]).toContain("remote-ip=10.0.1.2");
        validateRouterConfig(result, ["/interface vxlan", "/interface vxlan vteps"]);
      });

      it("should generate VXLAN with multicast mode", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-multicast",
          localAddress: "192.168.1.1",
          remoteAddress: "",
          vni: 200,
          bumMode: "multicast",
          group: "239.1.1.1",
          multicastInterface: "ether1",
          port: 4789,
          learning: true,
          hw: true,
        };

        const result = testWithOutput(
          "VxlanInterface",
          "Generate VXLAN with multicast BUM mode",
          { vxlan: vxlanConfig },
          () => VxlanInterface(vxlanConfig),
        );

        expect(result["/interface vxlan"][0]).toContain("group=239.1.1.1");
        expect(result["/interface vxlan"][0]).toContain("interface=ether1");
        expect(result["/interface vxlan"][0]).toContain("port=4789");
        expect(result["/interface vxlan"][0]).toContain("learning=yes");
        expect(result["/interface vxlan"][0]).toContain("hw=yes");
        validateRouterConfig(result, ["/interface vxlan"]);
      });

      it("should generate VXLAN with explicit VTEPs", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-unicast",
          localAddress: "10.10.10.1",
          remoteAddress: "",
          vni: 300,
          bumMode: "unicast",
          vteps: [
            { remoteAddress: "10.10.10.2", comment: "Peer 1" },
            { remoteAddress: "10.10.10.3", comment: "Peer 2" },
            { remoteAddress: "10.10.10.4", comment: "Peer 3" },
          ],
        };

        const result = testWithOutput(
          "VxlanInterface",
          "Generate VXLAN with explicit VTEP peers",
          { vxlan: vxlanConfig },
          () => VxlanInterface(vxlanConfig),
        );

        expect(result["/interface vxlan vteps"]).toHaveLength(3);
        expect(result["/interface vxlan vteps"][0]).toContain("remote-ip=10.10.10.2");
        expect(result["/interface vxlan vteps"][0]).toContain('comment="Peer 1"');
        expect(result["/interface vxlan vteps"][1]).toContain("remote-ip=10.10.10.3");
        expect(result["/interface vxlan vteps"][2]).toContain("remote-ip=10.10.10.4");
        validateRouterConfig(result, ["/interface vxlan", "/interface vxlan vteps"]);
      });

      it("should generate VXLAN with advanced parameters", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-advanced",
          localAddress: "172.16.1.1",
          remoteAddress: "172.16.1.2",
          vni: 4095,
          port: 8472,
          disabled: false,
          comment: "Advanced VXLAN config",
          hw: false,
          learning: false,
          allowFastPath: false,
          bridge: "br-overlay",
          bridgePVID: 200,
          checkSum: true,
          dontFragment: "enabled",
          maxFdbSize: 8192,
          ttl: 64,
          vrf: "overlay-vrf",
          vtepsIpVersion: "ipv4",
        };

        const result = testWithOutput(
          "VxlanInterface",
          "Generate VXLAN with advanced parameters",
          { vxlan: vxlanConfig },
          () => VxlanInterface(vxlanConfig),
        );

        const vxlanCommand = result["/interface vxlan"][0];
        expect(vxlanCommand).toContain("vni=4095");
        expect(vxlanCommand).toContain("port=8472");
        expect(vxlanCommand).toContain("disabled=no");
        expect(vxlanCommand).toContain("hw=no");
        expect(vxlanCommand).toContain("learning=no");
        expect(vxlanCommand).toContain("allow-fast-path=no");
        expect(vxlanCommand).toContain("bridge=br-overlay");
        expect(vxlanCommand).toContain("bridge-pvid=200");
        expect(vxlanCommand).toContain("checksum=yes");
        expect(vxlanCommand).toContain("dont-fragment=enabled");
        expect(vxlanCommand).toContain("max-fdb-size=8192");
        expect(vxlanCommand).toContain("ttl=64");
        expect(vxlanCommand).toContain("vrf=overlay-vrf");
        expect(vxlanCommand).toContain("vteps-ip-version=ipv4");
        validateRouterConfig(result, ["/interface vxlan", "/interface vxlan vteps"]);
      });

      it("should generate IPv6 VXLAN configuration", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-ipv6",
          localAddress: "2001:db8::1",
          remoteAddress: "",
          vni: 600,
          bumMode: "unicast",
          vtepsIpVersion: "ipv6",
          vteps: [{ remoteAddress: "2001:db8::2", comment: "IPv6 peer" }],
        };

        const result = testWithOutput(
          "VxlanInterface",
          "Generate IPv6 VXLAN configuration",
          { vxlan: vxlanConfig },
          () => VxlanInterface(vxlanConfig),
        );

        expect(result["/interface vxlan"][0]).toContain("vteps-ip-version=ipv6");
        expect(result["/interface vxlan vteps"][0]).toContain("remote-ip=2001:db8::2");
        validateRouterConfig(result, ["/interface vxlan", "/interface vxlan vteps"]);
      });

      it("should throw error for unicast mode without VTEPs", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-no-vtep",
          localAddress: "10.0.1.1",
          remoteAddress: "",
          vni: 700,
          bumMode: "unicast",
        };

        expect(() => VxlanInterface(vxlanConfig)).toThrow(
          "VXLAN vxlan-no-vtep in unicast mode requires at least one VTEP configuration",
        );
      });
    });
  });
});
