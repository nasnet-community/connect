import { describe, it, expect } from "vitest";
import { generateNetworks } from "./networksUtils";
import type { WANLinkType } from "~/components/Star/StarContext/ChooseType";
import type { VPNClient } from "~/components/Star/StarContext/Utils/VPNClientType";
import type { WANLinks } from "~/components/Star/StarContext/WANType";

describe("Networks Integration Tests", () => {
  describe("Complete Networks Configuration Scenarios", () => {
    it("should handle enterprise setup with multiple Foreign WAN links and VPN clients", () => {
      const wanLinkType: WANLinkType = "both";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "Primary-ISP", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "Backup-ISP", InterfaceConfig: { InterfaceName: "ether2" } },
            { name: "LTE-Failover", InterfaceConfig: { InterfaceName: "lte1" } },
          ],
          MultiLinkConfig: {
            strategy: "LoadBalance",
            loadBalanceMethod: "PCC",
          },
        },
        Domestic: {
          WANConfigs: [
            { name: "Domestic-Primary", InterfaceConfig: { InterfaceName: "ether3" } },
            { name: "Domestic-Secondary", InterfaceConfig: { InterfaceName: "ether4" } },
          ],
          MultiLinkConfig: {
            strategy: "Failover",
          },
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "primary.vpn.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
          {
            InterfacePrivateKey: "key2",
            InterfaceAddress: "10.0.0.3/24",
            PeerPublicKey: "pubkey2",
            PeerEndpointAddress: "backup.vpn.com",
            PeerEndpointPort: 51821,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        OpenVPN: [
          {
            Server: { Address: "enterprise.vpn.com", Port: 1194 },
            AuthType: "Certificate",
            Auth: "sha256",
          },
        ],
        L2TP: [
          {
            Server: { Address: "l2tp.enterprise.com", Port: 1701 },
            Credentials: { Username: "enterprise", Password: "securepass" },
            UseIPsec: true,
            IPsecSecret: "sharedsecret",
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      // Should include all base networks since domestic link is available
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      
      // Should include all Foreign WAN link names
      expect(networks.ForeignNetworks).toEqual([
        "Primary-ISP", 
        "Backup-ISP", 
        "LTE-Failover"
      ]);
      
      // Should include all Domestic WAN link names
      expect(networks.DomesticNetworks).toEqual([
        "Domestic-Primary", 
        "Domestic-Secondary"
      ]);
      
      // Should include all VPN client names
      expect(networks.VPNNetworks).toEqual([
        "Wireguard-1", 
        "Wireguard-2", 
        "OpenVPN-1", 
        "L2TP-1"
      ]);
    });

    it("should handle foreign-only setup with load-balanced Foreign links and VPN clients", () => {
      const wanLinkType: WANLinkType = "foreign";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "Cable-ISP", InterfaceConfig: { InterfaceName: "ether1" } },
            { name: "Fiber-ISP", InterfaceConfig: { InterfaceName: "ether2" } },
            { name: "5G-Backup", InterfaceConfig: { InterfaceName: "lte1" } },
          ],
          MultiLinkConfig: {
            strategy: "LoadBalance",
            loadBalanceMethod: "ECMP",
          },
        },
        // Domestic configuration exists but should be ignored
        Domestic: {
          WANConfigs: [
            { name: "Should-Be-Ignored", InterfaceConfig: { InterfaceName: "ether3" } },
          ],
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "global.vpn.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        OpenVPN: [
          {
            Server: { Address: "backup.vpn.com", Port: 1194 },
            AuthType: "Credentials",
            Auth: "sha256",
          },
        ],
        SSTP: [
          {
            Server: { Address: "secure.vpn.com", Port: 443 },
            Credentials: { Username: "user", Password: "pass" },
            AuthMethod: ["mschap2"],
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      // Should exclude Domestic and Split since no domestic link
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN"]);
      
      // Should include all Foreign WAN link names
      expect(networks.ForeignNetworks).toEqual([
        "Cable-ISP", 
        "Fiber-ISP", 
        "5G-Backup"
      ]);
      
      // Should NOT include Domestic networks since no domestic link
      expect(networks.DomesticNetworks).toBeUndefined();
      
      // Should include all VPN client names
      expect(networks.VPNNetworks).toEqual([
        "Wireguard-1", 
        "OpenVPN-1", 
        "SSTP-1"
      ]);
    });

    it("should handle minimal configuration with single links", () => {
      const wanLinkType: WANLinkType = "domestic";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "Single-ISP", InterfaceConfig: { InterfaceName: "ether1" } },
          ],
        },
        Domestic: {
          WANConfigs: [
            { name: "Local-Connection", InterfaceConfig: { InterfaceName: "ether2" } },
          ],
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "vpn.example.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      expect(networks.ForeignNetworks).toEqual(["Single-ISP"]);
      expect(networks.DomesticNetworks).toEqual(["Local-Connection"]);
      expect(networks.VPNNetworks).toEqual(["Wireguard-1"]);
    });

    it("should handle empty configurations gracefully", () => {
      const wanLinkType: WANLinkType = "both";
      const wanLinks: WANLinks = {
        Foreign: { WANConfigs: [] },
        Domestic: { WANConfigs: [] },
      };
      const vpnClient: VPNClient = {};
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN", "Domestic", "Split"]);
      expect(networks.ForeignNetworks).toBeUndefined();
      expect(networks.DomesticNetworks).toBeUndefined();
      expect(networks.VPNNetworks).toBeUndefined();
    });

    it("should handle complex VPN client scenarios", () => {
      const wanLinkType: WANLinkType = "foreign";
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            { name: "Main-Connection", InterfaceConfig: { InterfaceName: "ether1" } },
          ],
        },
      };
      const vpnClient: VPNClient = {
        Wireguard: [
          {
            InterfacePrivateKey: "key1",
            InterfaceAddress: "10.0.0.2/24",
            PeerPublicKey: "pubkey1",
            PeerEndpointAddress: "wg1.example.com",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
          {
            InterfacePrivateKey: "key2",
            InterfaceAddress: "10.0.0.3/24",
            PeerPublicKey: "pubkey2",
            PeerEndpointAddress: "wg2.example.com",
            PeerEndpointPort: 51821,
            PeerAllowedIPs: "0.0.0.0/0",
          },
          {
            InterfacePrivateKey: "key3",
            InterfaceAddress: "10.0.0.4/24",
            PeerPublicKey: "pubkey3",
            PeerEndpointAddress: "wg3.example.com",
            PeerEndpointPort: 51822,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        ],
        OpenVPN: [
          {
            Server: { Address: "ovpn1.example.com", Port: 1194 },
            AuthType: "Credentials",
            Auth: "sha256",
          },
          {
            Server: { Address: "ovpn2.example.com", Port: 1195 },
            AuthType: "Certificate",
            Auth: "sha512",
          },
        ],
        PPTP: [
          {
            ConnectTo: "pptp.example.com",
            Credentials: { Username: "user", Password: "pass" },
          },
        ],
        L2TP: [
          {
            Server: { Address: "l2tp1.example.com", Port: 1701 },
            Credentials: { Username: "user1", Password: "pass1" },
            UseIPsec: true,
          },
          {
            Server: { Address: "l2tp2.example.com", Port: 1702 },
            Credentials: { Username: "user2", Password: "pass2" },
            UseIPsec: false,
          },
        ],
        SSTP: [
          {
            Server: { Address: "sstp.example.com", Port: 443 },
            Credentials: { Username: "user", Password: "pass" },
            AuthMethod: ["mschap2"],
          },
        ],
        IKeV2: [
          {
            ServerAddress: "ikev2.example.com",
            AuthMethod: "pre-shared-key",
            PresharedKey: "secret",
          },
        ],
      };
      
      const networks = generateNetworks(wanLinkType, wanLinks, vpnClient);
      
      expect(networks.BaseNetworks).toEqual(["Foreign", "VPN"]);
      expect(networks.ForeignNetworks).toEqual(["Main-Connection"]);
      expect(networks.DomesticNetworks).toBeUndefined();
      expect(networks.VPNNetworks).toEqual([
        "Wireguard-1", "Wireguard-2", "Wireguard-3",
        "OpenVPN-1", "OpenVPN-2",
        "PPTP-1",
        "L2TP-1", "L2TP-2",
        "SSTP-1",
        "IKeV2-1"
      ]);
    });
  });
});






