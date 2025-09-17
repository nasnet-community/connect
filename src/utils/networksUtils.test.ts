import { describe, it, expect } from "vitest";
import { 
  generateNetworks, 
  hasDomesticLink, 
  getAvailableBaseNetworks, 
  getVPNNetworkNames,
  getForeignNetworkNames,
  getDomesticNetworkNames
} from "./networksUtils";
import type { WANLinkType } from "~/components/Star/StarContext/ChooseType";
import type { VPNClient } from "~/components/Star/StarContext/Utils/VPNClientType";
import type { WANLinks } from "~/components/Star/StarContext/WANType";

describe("Networks Utilities", () => {
  describe("hasDomesticLink", () => {
    it("should return true when WANLinkType is 'domestic'", () => {
      expect(hasDomesticLink("domestic")).toBe(true);
    });

    it("should return true when WANLinkType is 'both'", () => {
      expect(hasDomesticLink("both")).toBe(true);
    });

    it("should return false when WANLinkType is 'foreign'", () => {
      expect(hasDomesticLink("foreign")).toBe(false);
    });
  });

  describe("getAvailableBaseNetworks", () => {
    it("should include Split and Domestic when domestic link is available", () => {
      const networks = getAvailableBaseNetworks("both");
      expect(networks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
    });

    it("should exclude Split and Domestic when no domestic link", () => {
      const networks = getAvailableBaseNetworks("foreign");
      expect(networks).toEqual(["Foreign", "VPN"]);
    });

    it("should include Split and Domestic for domestic-only configuration", () => {
      const networks = getAvailableBaseNetworks("domestic");
      expect(networks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
    });
  });

  describe("getVPNNetworkNames", () => {
    it("should return empty array when no VPN client provided", () => {
      const vpnNames = getVPNNetworkNames();
      expect(vpnNames).toEqual([]);
    });

    it("should return empty array when VPN client is empty", () => {
      const vpnClient: VPNClient = {};
      const vpnNames = getVPNNetworkNames(vpnClient);
      expect(vpnNames).toEqual([]);
    });

    it("should generate names for Wireguard clients", () => {
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "server1.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
          {
            InterfacePrivateKey: "key2",
            InterfaceAddress: "10.0.0.3/24",
            PeerPublicKey: "pubkey2",
            PeerEndpointAddress: "server2.com",
            PeerEndpointPort: 51821,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
      };
      const vpnNames = getVPNNetworkNames(vpnClient);
      expect(vpnNames).toEqual(["Wireguard-1", "Wireguard-2"]);
    });

    it("should generate names for multiple VPN types", () => {
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "server1.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        OpenVPN: [
          {
            Server: { Address: "vpn.example.com", Port: 1194 },
            AuthType: "Credentials",
            Auth: "sha256",
          },
        ],
        PPTP: [
          {
            ConnectTo: "pptp.example.com",
            Credentials: { Username: "user", Password: "pass" },
          },
        ],
      };
      const vpnNames = getVPNNetworkNames(vpnClient);
      expect(vpnNames).toEqual(["Wireguard-1", "OpenVPN-1", "PPTP-1"]);
    });
  });

  describe("getForeignNetworkNames", () => {
    it("should return empty array when no WAN links provided", () => {
      const foreignNames = getForeignNetworkNames();
      expect(foreignNames).toEqual([]);
    });

    it("should return empty array when no Foreign WANConfigs", () => {
      const wanLinks: WANLinks = {
        Foreign: { WANConfigs: [] },
      };
      const foreignNames = getForeignNetworkNames(wanLinks);
      expect(foreignNames).toEqual([]);
    });

    it("should extract Foreign network names from WANConfigs", () => {
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "ISP-Primary", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "ISP-Secondary", InterfaceConfig: { InterfaceName: "ether2" } },
          ],
        },
      };
      const foreignNames = getForeignNetworkNames(wanLinks);
      expect(foreignNames).toEqual(["ISP-Primary", "ISP-Secondary"]);
    });

    it("should generate default names when config name is missing", () => {
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "", InterfaceConfig: { InterfaceName: "ether1" } },
            { InterfaceConfig: { InterfaceName: "ether2" } } as any,
          ],
        },
      };
      const foreignNames = getForeignNetworkNames(wanLinks);
      expect(foreignNames).toEqual(["Foreign-Link-1", "Foreign-Link-2"]);
    });
  });

  describe("getDomesticNetworkNames", () => {
    it("should return empty array when no domestic link available", () => {
      const wanLinks: WANLinks = {
        Foreign: { WANConfigs: [] },
        Domestic: {
          WANConfigs: [
            { name: "Should-Not-Appear", InterfaceConfig: { InterfaceName: "ether1" } },
          ],
        },
      };
      const domesticNames = getDomesticNetworkNames(wanLinks, "foreign");
      expect(domesticNames).toEqual([]);
    });

    it("should return empty array when no Domestic WANConfigs", () => {
      const wanLinks: WANLinks = {
        Foreign: { WANConfigs: [] },
        Domestic: { WANConfigs: [] },
      };
      const domesticNames = getDomesticNetworkNames(wanLinks, "both");
      expect(domesticNames).toEqual([]);
    });

    it("should extract Domestic network names when domestic link is available", () => {
      const wanLinks: WANLinks = {
        Foreign: { WANConfigs: [] },
        Domestic: {
          WANConfigs: [
            { name: "Local-Provider-1", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "Local-Provider-2", InterfaceConfig: { InterfaceName: "ether2" } },
          ],
        },
      };
      const domesticNames = getDomesticNetworkNames(wanLinks, "both");
      expect(domesticNames).toEqual(["Local-Provider-1", "Local-Provider-2"]);
    });

    it("should generate default names when config name is missing", () => {
      const wanLinks: WANLinks = {
        Foreign: { WANConfigs: [] },
        Domestic: {
          WANConfigs: [
            { name: "", InterfaceConfig: { InterfaceName: "ether1" } },
            { InterfaceConfig: { InterfaceName: "ether2" } } as any,
          ],
        },
      };
      const domesticNames = getDomesticNetworkNames(wanLinks, "domestic");
      expect(domesticNames).toEqual(["Domestic-Link-1", "Domestic-Link-2"]);
    });
  });

  describe("generateNetworks", () => {
    it("should generate Networks with Split when domestic link is available", () => {
      const wanLinkType: WANLinkType = "both";
      const networks = generateNetworks(wanLinkType);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      expect(networks.ForeignNetworks).toBeUndefined();
      expect(networks.DomesticNetworks).toBeUndefined();
      expect(networks.VPNNetworks).toBeUndefined();
    });

    it("should exclude Split when no domestic link", () => {
      const wanLinkType: WANLinkType = "foreign";
      const networks = generateNetworks(wanLinkType);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN"]);
      expect(networks.ForeignNetworks).toBeUndefined();
      expect(networks.DomesticNetworks).toBeUndefined();
      expect(networks.VPNNetworks).toBeUndefined();
    });

    it("should include Foreign and Domestic networks from WANLinks", () => {
      const wanLinkType: WANLinkType = "both";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "ISP-Primary", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "ISP-Backup", InterfaceConfig: { InterfaceName: "ether2" } },
          ],
        },
        Domestic: {
          WANConfigs: [
            { name: "Local-Provider", InterfaceConfig: { InterfaceName: "ether3" } },
          ],
        },
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      expect(networks.ForeignNetworks).toEqual(["ISP-Primary", "ISP-Backup"]);
      expect(networks.DomesticNetworks).toEqual(["Local-Provider"]);
      expect(networks.VPNNetworks).toBeUndefined();
    });

    it("should include VPN client names when VPN clients are configured", () => {
      const wanLinkType: WANLinkType = "both";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "Main-ISP", InterfaceConfig: { InterfaceName: "ether1" } },
          ],
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "server1.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        OpenVPN: [
          {
            Server: { Address: "vpn.example.com", Port: 1194 },
            AuthType: "Credentials",
            Auth: "sha256",
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      expect(networks.ForeignNetworks).toEqual(["Main-ISP"]);
      expect(networks.DomesticNetworks).toBeUndefined();
      expect(networks.VPNNetworks).toEqual(["Wireguard-1", "OpenVPN-1"]);
    });

    it("should handle combination of no domestic link and multiple network types", () => {
      const wanLinkType: WANLinkType = "foreign";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "Primary-Foreign", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "Secondary-Foreign", InterfaceConfig: { InterfaceName: "ether2" } },
          ],
        },
        Domestic: {
          WANConfigs: [
            { name: "Should-Not-Appear", InterfaceConfig: { InterfaceName: "ether3" } },
          ],
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "server1.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
          {
            InterfacePrivateKey: "key2",
            InterfaceAddress: "10.0.0.3/24",
            PeerPublicKey: "pubkey2",
            PeerEndpointAddress: "server2.com",
            PeerEndpointPort: 51821,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        L2TP: [
          {
            Server: { Address: "l2tp.example.com", Port: 1701 },
            Credentials: { Username: "user", Password: "pass" },
            UseIPsec: true,
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN"]);
      expect(networks.ForeignNetworks).toEqual(["Primary-Foreign", "Secondary-Foreign"]);
      expect(networks.DomesticNetworks).toBeUndefined(); // Should not appear because no domestic link
      expect(networks.VPNNetworks).toEqual(["Wireguard-1", "Wireguard-2", "L2TP-1"]);
    });

    it("should handle complete configuration with all network types", () => {
      const wanLinkType: WANLinkType = "both";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "ISP-A", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "ISP-B", InterfaceConfig: { InterfaceName: "ether2" } },
          ],
        },
        Domestic: {
          WANConfigs: [
            { name: "Local-ISP-1", InterfaceConfig: { InterfaceName: "ether3" } },
            { name: "Local-ISP-2", InterfaceConfig: { InterfaceName: "ether4" } },
          ],
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "server1.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        OpenVPN: [
          {
            Server: { Address: "vpn.example.com", Port: 1194 },
            AuthType: "Credentials",
            Auth: "sha256",
          },
        ],
        PPTP: [
          {
            ConnectTo: "pptp.example.com",
            Credentials: { Username: "user", Password: "pass" },
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      expect(networks.ForeignNetworks).toEqual(["ISP-A", "ISP-B"]);
      expect(networks.DomesticNetworks).toEqual(["Local-ISP-1", "Local-ISP-2"]);
      expect(networks.VPNNetworks).toEqual(["Wireguard-1", "OpenVPN-1", "PPTP-1"]);
    });
  });
});
