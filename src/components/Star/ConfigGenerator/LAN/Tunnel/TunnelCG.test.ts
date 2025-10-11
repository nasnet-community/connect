import { describe, it, expect } from "vitest";
import {
  IPIPInterfaceWrapper,
  EoipInterfaceWrapper,
  GreInterfaceWrapper,
  VxlanInterfaceWrapper,
  TunnelWrapper,
} from "./TunnelCG";
import type {
  IpipTunnelConfig,
  EoipTunnelConfig,
  GreTunnelConfig,
  VxlanInterfaceConfig,
  Tunnel,
  SubnetConfig,
  TunnelNetworksSubnets,
} from "~/components/Star/StarContext";
import {
  testWithOutput,
  validateRouterConfig,
} from "~/test-utils/test-helpers";

describe("Tunnel Configuration Wrapper Generator", () => {
  describe("Wrapper Functions", () => {
    describe("IPIPInterfaceWrapper", () => {
      it("should generate IPIP with subnet configuration", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-wrapper1",
          localAddress: "10.255.10.1",
          remoteAddress: "203.0.113.100",
          NetworkType: "VPN",
        };
        const subnet: SubnetConfig = {
          name: "ipip-wrapper1",
          subnet: "10.255.10.0/30",
        };

        const result = testWithOutput(
          "IPIPInterfaceWrapper",
          "Generate IPIP with complete subnet configuration",
          { ipip: ipipConfig, subnet },
          () => IPIPInterfaceWrapper(ipipConfig, subnet)
        );

        validateRouterConfig(result, [
          "/interface ipip",
          "/ip address",
          "/interface list member",
          "/ip firewall address-list",
        ]);
        expect(result["/ip address"][0]).toContain("10.255.10.1/30");
        expect(result["/interface list member"].join(" ")).toContain("VPN-LAN");
      });

      it("should generate IPIP without subnet", () => {
        const ipipConfig: IpipTunnelConfig = {
          name: "ipip-no-subnet",
          localAddress: "192.168.1.1",
          remoteAddress: "203.0.113.101",
        };

        const result = testWithOutput(
          "IPIPInterfaceWrapper",
          "Generate IPIP without subnet",
          { ipip: ipipConfig, subnet: "undefined" },
          () => IPIPInterfaceWrapper(ipipConfig)
        );

        expect(result["/interface ipip"]).toBeDefined();
        expect(result["/ip address"]).toBeUndefined();
        expect(result["/interface list member"]).toBeUndefined();
        validateRouterConfig(result, ["/interface ipip"]);
      });

      it("should handle different network types", () => {
        const subnet: SubnetConfig = {
          name: "ipip-domestic",
          subnet: "172.16.1.0/30",
        };

        const domesticConfig: IpipTunnelConfig = {
          name: "ipip-domestic",
          localAddress: "172.16.1.1",
          remoteAddress: "203.0.113.102",
          NetworkType: "Domestic",
        };

        const result = testWithOutput(
          "IPIPInterfaceWrapper",
          "Generate IPIP for Domestic network",
          { NetworkType: "Domestic" },
          () => IPIPInterfaceWrapper(domesticConfig, subnet)
        );

        expect(result["/interface list member"].join(" ")).toContain(
          "Domestic-LAN"
        );
        expect(result["/ip firewall address-list"][0]).toContain(
          "Domestic-LAN"
        );
        validateRouterConfig(result, [
          "/interface ipip",
          "/ip address",
          "/interface list member",
          "/ip firewall address-list",
        ]);
      });
    });

    describe("EoipInterfaceWrapper", () => {
      it("should generate EoIP with subnet configuration", () => {
        const eoipConfig: EoipTunnelConfig = {
          name: "eoip-wrapper1",
          localAddress: "10.255.20.1",
          remoteAddress: "203.0.113.200",
          tunnelId: 1000,
          NetworkType: "Foreign",
        };
        const subnet: SubnetConfig = {
          name: "eoip-wrapper1",
          subnet: "10.255.20.0/30",
        };

        const result = testWithOutput(
          "EoipInterfaceWrapper",
          "Generate EoIP with complete subnet configuration",
          { eoip: eoipConfig, subnet },
          () => EoipInterfaceWrapper(eoipConfig, subnet)
        );

        validateRouterConfig(result, [
          "/interface eoip",
          "/ip address",
          "/interface list member",
          "/ip firewall address-list",
        ]);
        expect(result["/interface eoip"][0]).toContain("tunnel-id=1000");
        expect(result["/interface list member"].join(" ")).toContain(
          "Foreign-LAN"
        );
      });

      it("should generate EoIP without subnet", () => {
        const eoipConfig: EoipTunnelConfig = {
          name: "eoip-no-subnet",
          localAddress: "192.168.2.1",
          remoteAddress: "203.0.113.201",
          tunnelId: 2000,
        };

        const result = testWithOutput(
          "EoipInterfaceWrapper",
          "Generate EoIP without subnet",
          { eoip: eoipConfig, subnet: "undefined" },
          () => EoipInterfaceWrapper(eoipConfig)
        );

        expect(result["/interface eoip"]).toBeDefined();
        expect(result["/ip address"]).toBeUndefined();
        validateRouterConfig(result, ["/interface eoip"]);
      });
    });

    describe("GreInterfaceWrapper", () => {
      it("should generate GRE with subnet configuration", () => {
        const greConfig: GreTunnelConfig = {
          name: "gre-wrapper1",
          localAddress: "10.255.30.1",
          remoteAddress: "203.0.113.300",
          NetworkType: "Split",
        };
        const subnet: SubnetConfig = {
          name: "gre-wrapper1",
          subnet: "10.255.30.0/30",
        };

        const result = testWithOutput(
          "GreInterfaceWrapper",
          "Generate GRE with complete subnet configuration for Split network",
          { gre: greConfig, subnet, NetworkType: "Split" },
          () => GreInterfaceWrapper(greConfig, subnet)
        );

        validateRouterConfig(result, [
          "/interface gre",
          "/ip address",
          "/interface list member",
          "/ip firewall address-list",
        ]);
        expect(result["/interface list member"].join(" ")).toContain(
          "Split-LAN"
        );
      });

      it("should generate GRE without subnet", () => {
        const greConfig: GreTunnelConfig = {
          name: "gre-no-subnet",
          localAddress: "192.168.3.1",
          remoteAddress: "203.0.113.301",
        };

        const result = testWithOutput(
          "GreInterfaceWrapper",
          "Generate GRE without subnet",
          { gre: greConfig, subnet: "undefined" },
          () => GreInterfaceWrapper(greConfig)
        );

        expect(result["/interface gre"]).toBeDefined();
        expect(result["/ip address"]).toBeUndefined();
        validateRouterConfig(result, ["/interface gre"]);
      });
    });

    describe("VxlanInterfaceWrapper", () => {
      it("should generate VXLAN with subnet configuration", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-wrapper1",
          localAddress: "10.255.40.1",
          remoteAddress: "10.255.40.2",
          vni: 5000,
          NetworkType: "VPN",
        };
        const subnet: SubnetConfig = {
          name: "vxlan-wrapper1",
          subnet: "192.168.250.0/24",
        };

        const result = testWithOutput(
          "VxlanInterfaceWrapper",
          "Generate VXLAN with complete subnet configuration",
          { vxlan: vxlanConfig, subnet },
          () => VxlanInterfaceWrapper(vxlanConfig, subnet)
        );

        validateRouterConfig(result, [
          "/interface vxlan",
          "/interface vxlan vteps",
          "/ip address",
          "/interface list member",
          "/ip firewall address-list",
        ]);
        // IP uses localAddress with subnet prefix, not subnet IP
        expect(result["/ip address"][0]).toContain("10.255.40.1/24");
      });

      it("should generate VXLAN without subnet", () => {
        const vxlanConfig: VxlanInterfaceConfig = {
          name: "vxlan-no-subnet",
          localAddress: "10.0.10.1",
          remoteAddress: "10.0.10.2",
          vni: 6000,
        };

        const result = testWithOutput(
          "VxlanInterfaceWrapper",
          "Generate VXLAN without subnet",
          { vxlan: vxlanConfig, subnet: "undefined" },
          () => VxlanInterfaceWrapper(vxlanConfig)
        );

        expect(result["/interface vxlan"]).toBeDefined();
        expect(result["/interface vxlan vteps"]).toBeDefined();
        expect(result["/ip address"]).toBeUndefined();
        validateRouterConfig(result, [
          "/interface vxlan",
          "/interface vxlan vteps",
        ]);
      });
    });
  });

  describe("TunnelWrapper", () => {
    it("should process single IPIP tunnel", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-site1",
            localAddress: "192.168.1.1",
            remoteAddress: "203.0.113.1",
          },
        ],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Process single IPIP tunnel",
        { tunnel },
        () => TunnelWrapper(tunnel),
      );

      expect(result["/interface ipip"]).toBeDefined();
      expect(result["/ip firewall mangle"]).toBeDefined();
      expect(result["/ip firewall mangle"].join(" ")).toContain("protocol=ipip");
      validateRouterConfig(result, ["/interface ipip", "/ip firewall mangle"]);
    });

    it("should process multiple tunnel types", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-test",
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
        Gre: [
          {
            name: "gre-test",
            localAddress: "192.168.3.1",
            remoteAddress: "203.0.113.3",
          },
        ],
        Vxlan: [
          {
            name: "vxlan-test",
            localAddress: "10.0.1.1",
            remoteAddress: "10.0.1.2",
            vni: 100,
          },
        ],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Process multiple tunnel types",
        { tunnel },
        () => TunnelWrapper(tunnel),
      );

      expect(result["/interface ipip"]).toBeDefined();
      expect(result["/interface eoip"]).toBeDefined();
      expect(result["/interface gre"]).toBeDefined();
      expect(result["/interface vxlan"]).toBeDefined();
      expect(result["/interface vxlan vteps"]).toBeDefined();
      expect(result["/ip firewall mangle"]).toBeDefined();
      validateRouterConfig(result, [
        "/interface ipip",
        "/interface eoip",
        "/interface gre",
        "/interface vxlan",
        "/interface vxlan vteps",
        "/ip firewall mangle",
      ]);
    });

    it("should process tunnels with subnet matching", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-wan",
            localAddress: "10.255.1.1",
            remoteAddress: "203.0.113.1",
            NetworkType: "VPN",
          },
        ],
        Gre: [
          {
            name: "gre-lan",
            localAddress: "172.16.1.1",
            remoteAddress: "203.0.113.2",
            NetworkType: "Domestic",
          },
        ],
      };

      const tunnelSubnets: TunnelNetworksSubnets = {
        IPIP: [{ name: "ipip-wan", subnet: "10.255.1.0/30" }],
        Gre: [{ name: "gre-lan", subnet: "172.16.1.0/30" }],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Process tunnels with subnet matching",
        { tunnel, tunnelSubnets },
        () => TunnelWrapper(tunnel, tunnelSubnets),
      );

      expect(result["/interface ipip"]).toBeDefined();
      expect(result["/interface gre"]).toBeDefined();
      expect(result["/ip address"]).toBeDefined();
      expect(result["/ip address"].join(" ")).toContain("10.255.1.1/30");
      expect(result["/ip address"].join(" ")).toContain("172.16.1.1/30");
      expect(result["/interface list member"]).toBeDefined();
      expect(result["/ip firewall address-list"]).toBeDefined();
      validateRouterConfig(result, [
        "/interface ipip",
        "/interface gre",
        "/ip address",
        "/interface list member",
        "/ip firewall address-list",
        "/ip firewall mangle",
      ]);
    });

    it("should handle empty tunnel configuration", () => {
      const tunnel: Tunnel = {};

      const result = testWithOutput(
        "TunnelWrapper",
        "Handle empty tunnel configuration",
        { tunnel },
        () => TunnelWrapper(tunnel),
      );

      // Should only have comment headers in mangle
      expect(result["/ip firewall mangle"]).toHaveLength(2);
      expect(result["/ip firewall mangle"][0]).toContain("# ---");
      validateRouterConfig(result, ["/ip firewall mangle"]);
    });

    it("should process multiple tunnels of same type", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-site1",
            localAddress: "10.1.1.1",
            remoteAddress: "203.0.113.1",
          },
          {
            name: "ipip-site2",
            localAddress: "10.2.2.1",
            remoteAddress: "203.0.113.2",
          },
          {
            name: "ipip-site3",
            localAddress: "10.3.3.1",
            remoteAddress: "203.0.113.3",
          },
        ],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Process multiple tunnels of same type",
        { tunnel },
        () => TunnelWrapper(tunnel),
      );

      expect(result["/interface ipip"]).toHaveLength(3);
      expect(result["/interface ipip"].join(" ")).toContain("ipip-site1");
      expect(result["/interface ipip"].join(" ")).toContain("ipip-site2");
      expect(result["/interface ipip"].join(" ")).toContain("ipip-site3");
      expect(result["/ip firewall mangle"]).toBeDefined();
      validateRouterConfig(result, ["/interface ipip", "/ip firewall mangle"]);
    });

    it("should handle complex tunnel scenario with all features", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-secure",
            localAddress: "10.255.1.1",
            remoteAddress: "203.0.113.1",
            ipsecSecret: "secret123",
            NetworkType: "VPN",
          },
        ],
        Vxlan: [
          {
            name: "vxlan-datacenter",
            localAddress: "10.0.1.1",
            remoteAddress: "",
            vni: 100,
            bumMode: "unicast",
            vteps: [
              { remoteAddress: "10.0.1.2", comment: "DC1" },
              { remoteAddress: "10.0.1.3", comment: "DC2" },
            ],
            NetworkType: "Foreign",
          },
        ],
      };

      const tunnelSubnets: TunnelNetworksSubnets = {
        IPIP: [{ name: "ipip-secure", subnet: "10.255.1.0/30" }],
        Vxlan: [{ name: "vxlan-datacenter", subnet: "192.168.100.0/24" }],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Handle complex tunnel scenario with all features",
        { tunnel, tunnelSubnets },
        () => TunnelWrapper(tunnel, tunnelSubnets),
      );

      // Verify IPIP with IPsec
      expect(result["/interface ipip"][0]).toContain('ipsec-secret="secret123"');
      expect(result["/interface ipip"][0]).toContain("allow-fast-path=no");

      // Verify VXLAN with VTEPs
      expect(result["/interface vxlan vteps"]).toHaveLength(2);

      // Verify subnet configurations
      expect(result["/ip address"]).toHaveLength(2);
      expect(result["/interface list member"].join(" ")).toContain("VPN-LAN");
      expect(result["/interface list member"].join(" ")).toContain("Foreign-LAN");

      // Verify inbound traffic marking
      expect(result["/ip firewall mangle"].join(" ")).toContain("protocol=ipip");
      expect(result["/ip firewall mangle"].join(" ")).toContain("VXLAN");

      validateRouterConfig(result, [
        "/interface ipip",
        "/interface vxlan",
        "/interface vxlan vteps",
        "/ip address",
        "/interface list member",
        "/ip firewall address-list",
        "/ip firewall mangle",
      ]);
    });
  });

  describe("Edge Cases & Error Handling", () => {
    it("should handle all network type variations", () => {
      const subnet: SubnetConfig = { name: "test", subnet: "10.0.0.0/24" };

      const splitConfig = testWithOutput(
        "Network Types",
        "Test Split network type",
        { NetworkType: "Split" },
        () => IPIPInterfaceWrapper({ name: "ipip-split", localAddress: "10.1.1.1", remoteAddress: "10.1.1.2", NetworkType: "Split" }, subnet)
      );

      expect(splitConfig["/interface list member"].join(" ")).toContain("Split-LAN");
      expect(splitConfig["/ip firewall address-list"][0]).toContain("Split-LAN");
    });
  });

  describe("Integration Tests", () => {
    it("should generate complete site-to-site VPN with all protocols", () => {
      const tunnel: Tunnel = {
        IPIP: [{ name: "ipip-site1", localAddress: "10.1.1.1", remoteAddress: "203.0.113.1", NetworkType: "VPN", ipsecSecret: "secret1" }],
        Eoip: [{ name: "eoip-site1", localAddress: "10.2.2.1", remoteAddress: "203.0.113.2", tunnelId: 100, NetworkType: "Domestic", loopProtect: "on", loopProtectDisableTime: 5000, loopProtectSendInterval: 5000 }],
        Gre: [{ name: "gre-site1", localAddress: "10.3.3.1", remoteAddress: "203.0.113.3", NetworkType: "Foreign", ipsecSecret: "secret2" }],
        Vxlan: [{ name: "vxlan-site1", localAddress: "10.4.4.1", remoteAddress: "10.4.4.2", vni: 100, NetworkType: "VPN" }],
      };

      const tunnelSubnets: TunnelNetworksSubnets = {
        IPIP: [{ name: "ipip-site1", subnet: "10.1.1.0/30" }],
        Eoip: [{ name: "eoip-site1", subnet: "10.2.2.0/30" }],
        Gre: [{ name: "gre-site1", subnet: "10.3.3.0/30" }],
        Vxlan: [{ name: "vxlan-site1", subnet: "192.168.100.0/24" }],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Complete site-to-site VPN with all protocols and subnets",
        { tunnel, tunnelSubnets },
        () => TunnelWrapper(tunnel, tunnelSubnets)
      );

      validateRouterConfig(result, [
        "/interface ipip",
        "/interface eoip",
        "/interface gre",
        "/interface vxlan",
        "/interface vxlan vteps",
        "/ip address",
        "/interface list member",
        "/ip firewall address-list",
        "/ip firewall mangle",
      ]);

      // Verify IPsec
      expect(result["/interface ipip"][0]).toContain("ipsec-secret");
      expect(result["/interface gre"][0]).toContain("ipsec-secret");

      // Verify loop protection
      expect(result["/interface eoip"][0]).toContain("loop-protect=on");

      // Verify subnets
      expect(result["/ip address"]).toHaveLength(4);

      // Verify network types
      expect(result["/interface list member"].join(" ")).toContain("VPN-LAN");
      expect(result["/interface list member"].join(" ")).toContain("Domestic-LAN");
      expect(result["/interface list member"].join(" ")).toContain("Foreign-LAN");
    });

    it("should generate datacenter overlay network scenario", () => {
      const tunnel: Tunnel = {
        Vxlan: [
          {
            name: "vxlan-compute",
            localAddress: "10.0.1.1",
            remoteAddress: "",
            vni: 1000,
            bumMode: "unicast",
            vteps: [
              { remoteAddress: "10.0.1.2", comment: "Compute-1" },
              { remoteAddress: "10.0.1.3", comment: "Compute-2" },
              { remoteAddress: "10.0.1.4", comment: "Compute-3" },
            ],
            NetworkType: "Domestic",
            bridge: "br-compute",
            bridgePVID: 100,
            learning: true,
            hw: true,
          },
          {
            name: "vxlan-storage",
            localAddress: "10.0.2.1",
            remoteAddress: "",
            vni: 2000,
            bumMode: "multicast",
            group: "239.1.1.2",
            multicastInterface: "ether2",
            NetworkType: "Foreign",
            bridge: "br-storage",
            bridgePVID: 200,
          },
        ],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Datacenter overlay with separate compute and storage networks",
        { scenario: "Datacenter Overlay" },
        () => TunnelWrapper(tunnel)
      );

      expect(result["/interface vxlan"]).toHaveLength(2);
      expect(result["/interface vxlan vteps"]).toHaveLength(3);
      expect(result["/interface vxlan"].join(" ")).toContain("vni=1000");
      expect(result["/interface vxlan"].join(" ")).toContain("vni=2000");
      expect(result["/interface vxlan"].join(" ")).toContain("group=239.1.1.2");
      validateRouterConfig(result, [
        "/interface vxlan",
        "/interface vxlan vteps",
        "/ip firewall mangle",
      ]);
    });

    it("should generate multi-site branch office network", () => {
      const tunnel: Tunnel = {
        IPIP: [
          { name: "ipip-branch1", localAddress: "10.255.1.1", remoteAddress: "203.0.113.1", NetworkType: "VPN", ipsecSecret: "branch1-secret" },
          { name: "ipip-branch2", localAddress: "10.255.2.1", remoteAddress: "203.0.113.2", NetworkType: "VPN", ipsecSecret: "branch2-secret" },
        ],
        Gre: [
          { name: "gre-branch1", localAddress: "10.255.3.1", remoteAddress: "203.0.113.3", NetworkType: "Domestic" },
          { name: "gre-branch2", localAddress: "10.255.4.1", remoteAddress: "203.0.113.4", NetworkType: "Domestic" },
        ],
      };

      const tunnelSubnets: TunnelNetworksSubnets = {
        IPIP: [
          { name: "ipip-branch1", subnet: "10.255.1.0/30" },
          { name: "ipip-branch2", subnet: "10.255.2.0/30" },
        ],
        Gre: [
          { name: "gre-branch1", subnet: "10.255.3.0/30" },
          { name: "gre-branch2", subnet: "10.255.4.0/30" },
        ],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Multi-site branch office with redundant tunnels",
        { branches: 2, tunnelsPerBranch: 2 },
        () => TunnelWrapper(tunnel, tunnelSubnets)
      );

      expect(result["/interface ipip"]).toHaveLength(2);
      expect(result["/interface gre"]).toHaveLength(2);
      expect(result["/ip address"]).toHaveLength(4);
      expect(result["/ip firewall address-list"]).toHaveLength(4);
      validateRouterConfig(result, [
        "/interface ipip",
        "/interface gre",
        "/ip address",
        "/interface list member",
        "/ip firewall address-list",
        "/ip firewall mangle",
      ]);
    });

    it("should handle maximum configuration with all features enabled", () => {
      const tunnel: Tunnel = {
        IPIP: [
          {
            name: "ipip-max",
            localAddress: "10.1.1.1",
            remoteAddress: "203.0.113.1",
            NetworkType: "VPN",
            ipsecSecret: "maxSecret",
            dontFragment: "enabled",
            comment: "Maximum IPIP config",
          },
        ],
        Eoip: [
          {
            name: "eoip-max",
            localAddress: "10.2.2.1",
            remoteAddress: "203.0.113.2",
            tunnelId: 999,
            NetworkType: "Domestic",
            ipsecSecret: "maxEoipSecret",
            loopProtect: "on",
            loopProtectDisableTime: 30000,
            loopProtectSendInterval: 3000,
            dontFragment: "disabled",
            comment: "Maximum EoIP config",
          },
        ],
        Gre: [
          {
            name: "gre-max",
            localAddress: "10.3.3.1",
            remoteAddress: "203.0.113.3",
            NetworkType: "Foreign",
            ipsecSecret: "maxGreSecret",
            dontFragment: "enabled",
            comment: "Maximum GRE config",
          },
        ],
        Vxlan: [
          {
            name: "vxlan-max",
            localAddress: "10.4.4.1",
            remoteAddress: "",
            vni: 4095,
            NetworkType: "VPN",
            bumMode: "unicast",
            vteps: [
              { remoteAddress: "10.4.4.2", comment: "Peer 1" },
              { remoteAddress: "10.4.4.3", comment: "Peer 2" },
            ],
            port: 8472,
            learning: true,
            hw: true,
            bridge: "br-max",
            bridgePVID: 4094,
            checkSum: true,
            dontFragment: "enabled",
            maxFdbSize: 16384,
            ttl: 255,
            vrf: "vrf-max",
            vtepsIpVersion: "ipv4",
            comment: "Maximum VXLAN config",
          },
        ],
      };

      const tunnelSubnets: TunnelNetworksSubnets = {
        IPIP: [{ name: "ipip-max", subnet: "10.1.1.0/30" }],
        Eoip: [{ name: "eoip-max", subnet: "10.2.2.0/30" }],
        Gre: [{ name: "gre-max", subnet: "10.3.3.0/30" }],
        Vxlan: [{ name: "vxlan-max", subnet: "192.168.255.0/24" }],
      };

      const result = testWithOutput(
        "TunnelWrapper",
        "Maximum configuration with all features enabled for all protocols",
        { scenario: "Maximum Features" },
        () => TunnelWrapper(tunnel, tunnelSubnets)
      );

      // Verify all protocols present
      expect(result["/interface ipip"]).toBeDefined();
      expect(result["/interface eoip"]).toBeDefined();
      expect(result["/interface gre"]).toBeDefined();
      expect(result["/interface vxlan"]).toBeDefined();

      // Verify VXLAN advanced settings
      expect(result["/interface vxlan"][0]).toContain("vni=4095");
      expect(result["/interface vxlan"][0]).toContain("port=8472");
      expect(result["/interface vxlan"][0]).toContain("max-fdb-size=16384");
      expect(result["/interface vxlan"][0]).toContain("ttl=255");
      expect(result["/interface vxlan"][0]).toContain("vrf=vrf-max");

      // Verify EoIP loop protection
      expect(result["/interface eoip"][0]).toContain("loop-protect=on");
      expect(result["/interface eoip"][0]).toContain("loop-protect-disable-time=30000");

      // Verify all have subnets
      expect(result["/ip address"]).toHaveLength(4);

      validateRouterConfig(result, [
        "/interface ipip",
        "/interface eoip",
        "/interface gre",
        "/interface vxlan",
        "/interface vxlan vteps",
        "/ip address",
        "/interface list member",
        "/ip firewall address-list",
        "/ip firewall mangle",
      ]);
    });
  });
});
