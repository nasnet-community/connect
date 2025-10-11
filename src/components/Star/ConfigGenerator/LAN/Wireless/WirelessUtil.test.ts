import { describe, it, expect } from "vitest";
import {
  DefaultBandToInterfaceName,
  hasWirelessInterfaces,
  CheckWireless,
  DisableInterfaces,
  CheckWANMaster,
  CheckTrunkMaster,
  CheckMasters,
  Hide,
  SSIDListGenerator,
  Passphrase,
  StationMode,
  Slave,
  Master,
  WirelessBridge,
  WirelessInterfaceList,
} from "./WirelessUtil";
import type {
  WirelessConfig,
  WifiTarget,
  Band,
  RouterModels,
  WANLinks,
} from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import {
  testWithOutput,
  testWithGenericOutput,
  validateRouterConfig,
  validateRouterConfigStructure,
} from "~/test-utils/test-helpers";

describe("Wireless Utility Functions", () => {
  describe("DefaultBandToInterfaceName", () => {
    it("should return wifi2 for 2.4GHz band", () => {
      const result = testWithGenericOutput(
        "DefaultBandToInterfaceName",
        "Convert 2.4GHz band to default interface name",
        { band: "2.4" },
        () => DefaultBandToInterfaceName("2.4" as Band),
      );

      expect(result).toBe("wifi2");
    });

    it("should return wifi1 for 5GHz band", () => {
      const result = testWithGenericOutput(
        "DefaultBandToInterfaceName",
        "Convert 5GHz band to default interface name",
        { band: "5" },
        () => DefaultBandToInterfaceName("5" as Band),
      );

      expect(result).toBe("wifi1");
    });
  });

  describe("hasWirelessInterfaces", () => {
    it("should return true when router has wireless interfaces", () => {
      const routerModels: RouterModels[] = [
        {
          id: "test-router",
          model: "hEX",
          isMaster: true,
          Interfaces: {
            Interfaces: {
              wireless: ["wifi1", "wifi2"],
              ethernet: ["ether1", "ether2"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "hasWirelessInterfaces",
        "Check router with wireless interfaces",
        { routerModels },
        () => hasWirelessInterfaces(routerModels),
      );

      expect(result).toBe(true);
    });

    it("should return false when router has no wireless interfaces", () => {
      const routerModels: RouterModels[] = [
        {
          id: "test-router",
          model: "hEX",
          isMaster: true,
          Interfaces: {
            Interfaces: {
              wireless: [],
              ethernet: ["ether1", "ether2"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "hasWirelessInterfaces",
        "Check router without wireless interfaces",
        { routerModels },
        () => hasWirelessInterfaces(routerModels),
      );

      expect(result).toBe(false);
    });
  });

  describe("CheckWireless", () => {
    it("should return false for empty wireless configs array", () => {
      const result = testWithGenericOutput(
        "CheckWireless",
        "Check empty wireless configurations",
        { wirelessConfigs: [] },
        () => CheckWireless([]),
      );

      expect(result).toBe(false);
    });

    it("should return true when at least one config is enabled", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "TestNetwork",
          Password: "password123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
      ];

      const result = testWithGenericOutput(
        "CheckWireless",
        "Check with one enabled wireless configuration",
        { wirelessConfigs },
        () => CheckWireless(wirelessConfigs),
      );

      expect(result).toBe(true);
    });

    it("should return false when all configs are disabled", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "TestNetwork",
          Password: "password123",
          isHide: false,
          SplitBand: false,
          isDisabled: true,
        },
      ];

      const result = testWithGenericOutput(
        "CheckWireless",
        "Check with all disabled wireless configurations",
        { wirelessConfigs },
        () => CheckWireless(wirelessConfigs),
      );

      expect(result).toBe(false);
    });
  });

  describe("DisableInterfaces", () => {
    it("should generate commands to disable both wifi interfaces", () => {
      const result = testWithOutput(
        "DisableInterfaces",
        "Disable all wireless interfaces",
        {},
        () => DisableInterfaces(),
      );

      expect(result["/interface wifi"]).toContain(
        "set [ find default-name=wifi1 ] disabled=yes",
      );
      expect(result["/interface wifi"]).toContain(
        "set [ find default-name=wifi2 ] disabled=yes",
      );
      expect(result["/interface wifi"]).toHaveLength(2);
      validateRouterConfig(result, ["/interface wifi"]);
    });
  });

  describe("CheckWANMaster", () => {
    it("should return '2.4' when wifi2.4 is used as WAN", () => {
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            {
              name: "Foreign-WAN",
              InterfaceConfig: {
                InterfaceName: "wifi2.4",
              },
            },
          ],
        },
      };

      const result = testWithGenericOutput(
        "CheckWANMaster",
        "Check WAN master when wifi2.4 is used",
        { wanLinks },
        () => CheckWANMaster(wanLinks),
      );

      expect(result).toBe("2.4");
    });

    it("should return '5' when wifi5 is used as WAN", () => {
      const wanLinks: WANLinks = {
        Domestic: {
          WANConfigs: [
            {
              name: "Domestic-WAN",
              InterfaceConfig: {
                InterfaceName: "wifi5",
              },
            },
          ],
        },
      };

      const result = testWithGenericOutput(
        "CheckWANMaster",
        "Check WAN master when wifi5 is used",
        { wanLinks },
        () => CheckWANMaster(wanLinks),
      );

      expect(result).toBe("5");
    });

    it("should return 'none' when no wifi interfaces are used as WAN", () => {
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            {
              name: "Foreign-WAN",
              InterfaceConfig: {
                InterfaceName: "ether1",
              },
            },
          ],
        },
      };

      const result = testWithGenericOutput(
        "CheckWANMaster",
        "Check WAN master when ethernet is used",
        { wanLinks },
        () => CheckWANMaster(wanLinks),
      );

      expect(result).toBe("none");
    });
  });

  describe("CheckTrunkMaster", () => {
    it("should return '2.4' when wifi2.4 is used as trunk master", () => {
      const routerModels: RouterModels[] = [
        {
          id: "master-router",
          model: "hEX",
          isMaster: true,
          MasterSlaveInterface: "wifi2.4",
          Interfaces: {
            Interfaces: {
              wireless: ["wifi1", "wifi2"],
              ethernet: ["ether1"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "CheckTrunkMaster",
        "Check trunk master when wifi2.4 is used",
        { routerModels },
        () => CheckTrunkMaster(routerModels),
      );

      expect(result).toBe("2.4");
    });

    it("should return '5' when wifi5 is used as trunk master", () => {
      const routerModels: RouterModels[] = [
        {
          id: "master-router",
          model: "hEX",
          isMaster: true,
          MasterSlaveInterface: "wifi5",
          Interfaces: {
            Interfaces: {
              wireless: ["wifi1", "wifi2"],
              ethernet: ["ether1"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "CheckTrunkMaster",
        "Check trunk master when wifi5 is used",
        { routerModels },
        () => CheckTrunkMaster(routerModels),
      );

      expect(result).toBe("5");
    });

    it("should return 'none' when no master router configured", () => {
      const routerModels: RouterModels[] = [
        {
          id: "router",
          model: "hEX",
          isMaster: false,
          Interfaces: {
            Interfaces: {
              wireless: ["wifi1", "wifi2"],
              ethernet: ["ether1"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "CheckTrunkMaster",
        "Check trunk master when no master router",
        { routerModels },
        () => CheckTrunkMaster(routerModels),
      );

      expect(result).toBe("none");
    });
  });

  describe("CheckMasters", () => {
    it("should detect wifi2.4 as WAN master", () => {
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            {
              name: "Foreign-WAN",
              InterfaceConfig: {
                InterfaceName: "wifi2.4",
              },
            },
          ],
        },
      };
      const routerModels: RouterModels[] = [];

      const result = testWithGenericOutput(
        "CheckMasters",
        "Check masters with wifi2.4 as WAN",
        { wanLinks, routerModels },
        () => CheckMasters(wanLinks, routerModels),
      );

      expect(result.isWifi2_4).toBe(true);
      expect(result.isWifi5).toBe(false);
    });

    it("should detect wifi5 as trunk master", () => {
      const wanLinks: WANLinks = {};
      const routerModels: RouterModels[] = [
        {
          id: "master-router",
          model: "hEX",
          isMaster: true,
          MasterSlaveInterface: "wifi5",
          Interfaces: {
            Interfaces: {
              wireless: ["wifi1", "wifi2"],
              ethernet: ["ether1"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "CheckMasters",
        "Check masters with wifi5 as trunk",
        { wanLinks, routerModels },
        () => CheckMasters(wanLinks, routerModels),
      );

      expect(result.isWifi2_4).toBe(false);
      expect(result.isWifi5).toBe(true);
    });

    it("should detect both bands in use", () => {
      const wanLinks: WANLinks = {
        Foreign: {
          WANConfigs: [
            {
              name: "Foreign-WAN",
              InterfaceConfig: {
                InterfaceName: "wifi2.4",
              },
            },
          ],
        },
      };
      const routerModels: RouterModels[] = [
        {
          id: "master-router",
          model: "hEX",
          isMaster: true,
          MasterSlaveInterface: "wifi5",
          Interfaces: {
            Interfaces: {
              wireless: ["wifi1", "wifi2"],
              ethernet: ["ether1"],
            },
          },
        } as RouterModels,
      ];

      const result = testWithGenericOutput(
        "CheckMasters",
        "Check masters with both bands in use",
        { wanLinks, routerModels },
        () => CheckMasters(wanLinks, routerModels),
      );

      expect(result.isWifi2_4).toBe(true);
      expect(result.isWifi5).toBe(true);
    });
  });

  describe("Hide", () => {
    it("should add hide-ssid=yes when Hide is true", () => {
      const result = testWithGenericOutput(
        "Hide",
        "Add hide SSID configuration",
        { command: "base command", Hide: true },
        () => Hide("base command", true),
      );

      expect(result).toBe("base command configuration.hide-ssid=yes");
    });

    it("should add hide-ssid=no when Hide is false", () => {
      const result = testWithGenericOutput(
        "Hide",
        "Add visible SSID configuration",
        { command: "base command", Hide: false },
        () => Hide("base command", false),
      );

      expect(result).toBe("base command configuration.hide-ssid=no");
    });
  });

  describe("SSIDListGenerator", () => {
    it("should generate split SSIDs when SplitBand is true", () => {
      const result = testWithGenericOutput(
        "SSIDListGenerator",
        "Generate split band SSIDs",
        { SSID: "MyNetwork", SplitBand: true },
        () => SSIDListGenerator("MyNetwork", true),
      );

      expect(result).toEqual({
        "2.4": "MyNetwork 2.4",
        "5": "MyNetwork 5",
      });
    });

    it("should generate same SSID when SplitBand is false", () => {
      const result = testWithGenericOutput(
        "SSIDListGenerator",
        "Generate unified band SSID",
        { SSID: "MyNetwork", SplitBand: false },
        () => SSIDListGenerator("MyNetwork", false),
      );

      expect(result).toEqual({
        "2.4": "MyNetwork",
        "5": "MyNetwork",
      });
    });
  });

  describe("Passphrase", () => {
    it("should append WPA2/WPA3 security settings", () => {
      const result = testWithGenericOutput(
        "Passphrase",
        "Add security passphrase configuration",
        { passphrase: "MyPassword123", command: "base command" },
        () => Passphrase("MyPassword123", "base command"),
      );

      expect(result).toBe(
        'base command security.authentication-types=wpa2-psk,wpa3-psk .passphrase="MyPassword123" disabled=no',
      );
    });

    it("should handle special characters in passphrase", () => {
      const passphrase = "P@ssw0rd#123$%";
      const result = testWithGenericOutput(
        "Passphrase",
        "Handle special characters in passphrase",
        { passphrase, command: "base command" },
        () => Passphrase(passphrase, "base command"),
      );

      expect(result).toContain(`.passphrase="${passphrase}"`);
    });
  });

  describe("StationMode", () => {
    it("should generate station mode configuration for 2.4GHz", () => {
      const result = testWithOutput(
        "StationMode",
        "Generate station mode config for 2.4GHz band",
        { SSID: "UpstreamAP", Password: "upstream123", Band: "2.4", name: "Foreign" },
        () => StationMode("UpstreamAP", "upstream123", "2.4" as Band, "Foreign"),
      );

      const commands = result["/interface wifi"];
      expect(commands).toHaveLength(1);
      expect(commands[0]).toContain("set [ find default-name=wifi2 ]");
      expect(commands[0]).toContain('comment="Foreign 2.4WAN"');
      expect(commands[0]).toContain("configuration.mode=station");
      expect(commands[0]).toContain('.ssid="UpstreamAP"');
      expect(commands[0]).toContain('security.passphrase="upstream123"');
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should generate station mode configuration for 5GHz", () => {
      const result = testWithOutput(
        "StationMode",
        "Generate station mode config for 5GHz band",
        { SSID: "UpstreamAP5", Password: "password5", Band: "5", name: "Domestic" },
        () => StationMode("UpstreamAP5", "password5", "5" as Band, "Domestic"),
      );

      const commands = result["/interface wifi"];
      expect(commands).toHaveLength(1);
      expect(commands[0]).toContain("set [ find default-name=wifi1 ]");
      expect(commands[0]).toContain('comment="Domestic 5WAN"');
      validateRouterConfig(result, ["/interface wifi"]);
    });
  });

  describe("Slave", () => {
    const baseWirelessConfig: WirelessConfig = {
      WifiTarget: "Domestic",
      SSID: "TestNetwork",
      Password: "password123",
      isHide: false,
      SplitBand: false,
      isDisabled: false,
    };

    it("should generate slave interface for Domestic network", () => {
      const result = testWithOutput(
        "Slave",
        "Generate slave interface for Domestic network",
        { Network: "Domestic", Band: "2.4", WirelessConfig: baseWirelessConfig },
        () => Slave("Domestic" as WifiTarget, "2.4" as Band, baseWirelessConfig),
      );

      const commands = result["/interface wifi"].join(" ");
      expect(commands).toContain("add configuration.mode=ap");
      expect(commands).toContain('.ssid="TestNetwork"');
      expect(commands).toContain("master-interface=[ find default-name=wifi2 ]");
      expect(commands).toContain('name="wifi2.4-DomesticLAN"');
      expect(commands).toContain('comment="DomesticLAN"');
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should generate slave interface with split band SSID", () => {
      const splitConfig: WirelessConfig = {
        ...baseWirelessConfig,
        SSID: "SplitNetwork",
        SplitBand: true,
      };

      const result = testWithOutput(
        "Slave",
        "Generate slave interface with split band SSID",
        { Network: "Foreign", Band: "5", WirelessConfig: splitConfig },
        () => Slave("Foreign" as WifiTarget, "5" as Band, splitConfig),
      );

      const commands = result["/interface wifi"].join(" ");
      expect(commands).toContain('.ssid="SplitNetwork 5"');
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should generate slave interface with hidden SSID", () => {
      const hiddenConfig: WirelessConfig = {
        ...baseWirelessConfig,
        isHide: true,
      };

      const result = testWithOutput(
        "Slave",
        "Generate slave interface with hidden SSID",
        { Network: "VPNClient", Band: "2.4", WirelessConfig: hiddenConfig },
        () => Slave("VPNClient" as WifiTarget, "2.4" as Band, hiddenConfig),
      );

      const commands = result["/interface wifi"].join(" ");
      expect(commands).toContain("configuration.hide-ssid=yes");
      validateRouterConfig(result, ["/interface wifi"]);
    });
  });

  describe("Master", () => {
    const baseMasterConfig: WirelessConfig = {
      WifiTarget: "Domestic",
      SSID: "MasterNetwork",
      Password: "masterpass123",
      isHide: false,
      SplitBand: false,
      isDisabled: false,
    };

    it("should generate master interface for Domestic network", () => {
      const result = testWithOutput(
        "Master",
        "Generate master interface for Domestic network",
        { Network: "Domestic", Band: "2.4", WirelessConfig: baseMasterConfig },
        () => Master("Domestic" as WifiTarget, "2.4" as Band, baseMasterConfig),
      );

      const commands = result["/interface wifi"].join(" ");
      expect(commands).toContain("set [ find default-name=wifi2 ]");
      expect(commands).toContain("configuration.country=Japan");
      expect(commands).toContain(".mode=ap");
      expect(commands).toContain('.ssid="MasterNetwork"');
      expect(commands).toContain('name="wifi2.4-DomesticLAN"');
      expect(commands).toContain('comment="DomesticLAN"');
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should generate master interface with split band SSID", () => {
      const splitConfig: WirelessConfig = {
        ...baseMasterConfig,
        SSID: "SplitMaster",
        SplitBand: true,
      };

      const result = testWithOutput(
        "Master",
        "Generate master interface with split band SSID",
        { Network: "Foreign", Band: "5", WirelessConfig: splitConfig },
        () => Master("Foreign" as WifiTarget, "5" as Band, splitConfig),
      );

      const commands = result["/interface wifi"].join(" ");
      expect(commands).toContain('.ssid="SplitMaster 5"');
      expect(commands).toContain("set [ find default-name=wifi1 ]");
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should generate master interface with hidden SSID", () => {
      const hiddenConfig: WirelessConfig = {
        ...baseMasterConfig,
        isHide: true,
      };

      const result = testWithOutput(
        "Master",
        "Generate master interface with hidden SSID",
        { Network: "Split", Band: "2.4", WirelessConfig: hiddenConfig },
        () => Master("Split" as WifiTarget, "2.4" as Band, hiddenConfig),
      );

      const commands = result["/interface wifi"].join(" ");
      expect(commands).toContain("configuration.hide-ssid=yes");
      validateRouterConfig(result, ["/interface wifi"]);
    });
  });

  describe("WirelessBridge", () => {
    it("should generate bridge ports for single wireless config", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "TestNetwork",
          Password: "password123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
      ];

      const result = testWithOutput(
        "WirelessBridge",
        "Generate bridge ports for single wireless configuration",
        { wirelessConfigs },
        () => WirelessBridge(wirelessConfigs),
      );

      expect(result["/interface bridge port"]).toContain(
        "add bridge=LANBridgeDomestic interface=wifi2.4-DomesticLAN comment=\"DomesticLAN\"",
      );
      expect(result["/interface bridge port"]).toContain(
        "add bridge=LANBridgeDomestic interface=wifi5-DomesticLAN comment=\"DomesticLAN\"",
      );
      validateRouterConfig(result, ["/interface bridge port"]);
    });

    it("should generate bridge ports for named network", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          NetworkName: "Guest",
          SSID: "GuestNetwork",
          Password: "guest123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
      ];

      const result = testWithOutput(
        "WirelessBridge",
        "Generate bridge ports for named network",
        { wirelessConfigs },
        () => WirelessBridge(wirelessConfigs),
      );

      expect(result["/interface bridge port"]).toContain(
        "add bridge=LANBridgeDomestic-Guest interface=wifi2.4-Domestic-GuestLAN comment=\"Domestic-GuestLAN\"",
      );
      expect(result["/interface bridge port"]).toContain(
        "add bridge=LANBridgeDomestic-Guest interface=wifi5-Domestic-GuestLAN comment=\"Domestic-GuestLAN\"",
      );
      validateRouterConfig(result, ["/interface bridge port"]);
    });

    it("should skip disabled wireless configs", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "EnabledNetwork",
          Password: "password123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
        {
          WifiTarget: "Foreign",
          SSID: "DisabledNetwork",
          Password: "password456",
          isHide: false,
          SplitBand: false,
          isDisabled: true,
        },
      ];

      const result = testWithOutput(
        "WirelessBridge",
        "Skip disabled wireless configurations",
        { wirelessConfigs },
        () => WirelessBridge(wirelessConfigs),
      );

      const commands = result["/interface bridge port"].join(" ");
      expect(commands).toContain("DomesticLAN");
      expect(commands).not.toContain("ForeignLAN");
      validateRouterConfig(result, ["/interface bridge port"]);
    });
  });

  describe("WirelessInterfaceList", () => {
    it("should generate interface list for single wireless config", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "TestNetwork",
          Password: "password123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
      ];

      const result = testWithOutput(
        "WirelessInterfaceList",
        "Generate interface list for single wireless configuration",
        { wirelessConfigs },
        () => WirelessInterfaceList(wirelessConfigs),
      );

      // Should add to specific network list
      expect(result["/interface list member"]).toContain(
        "add interface=wifi2.4-DomesticLAN list=Domestic-LAN comment=\"DomesticLAN\"",
      );
      expect(result["/interface list member"]).toContain(
        "add interface=wifi5-DomesticLAN list=Domestic-LAN comment=\"DomesticLAN\"",
      );
      // Should add to general LAN list
      expect(result["/interface list member"]).toContain(
        "add interface=wifi2.4-DomesticLAN list=LAN comment=\"DomesticLAN\"",
      );
      expect(result["/interface list member"]).toContain(
        "add interface=wifi5-DomesticLAN list=LAN comment=\"DomesticLAN\"",
      );
      validateRouterConfig(result, ["/interface list member"]);
    });

    it("should generate interface list for named network", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Foreign",
          NetworkName: "Office",
          SSID: "OfficeNetwork",
          Password: "office123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
      ];

      const result = testWithOutput(
        "WirelessInterfaceList",
        "Generate interface list for named network",
        { wirelessConfigs },
        () => WirelessInterfaceList(wirelessConfigs),
      );

      expect(result["/interface list member"]).toContain(
        "add interface=wifi2.4-Foreign-OfficeLAN list=Foreign-Office-LAN comment=\"Foreign-OfficeLAN\"",
      );
      expect(result["/interface list member"]).toContain(
        "add interface=wifi5-Foreign-OfficeLAN list=Foreign-Office-LAN comment=\"Foreign-OfficeLAN\"",
      );
      validateRouterConfig(result, ["/interface list member"]);
    });

    it("should skip disabled wireless configs", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "EnabledNetwork",
          Password: "password123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
        {
          WifiTarget: "VPNClient",
          SSID: "DisabledNetwork",
          Password: "password456",
          isHide: false,
          SplitBand: false,
          isDisabled: true,
        },
      ];

      const result = testWithOutput(
        "WirelessInterfaceList",
        "Skip disabled wireless configurations in interface list",
        { wirelessConfigs },
        () => WirelessInterfaceList(wirelessConfigs),
      );

      const commands = result["/interface list member"].join(" ");
      expect(commands).toContain("DomesticLAN");
      expect(commands).not.toContain("VPNLAN");
      validateRouterConfig(result, ["/interface list member"]);
    });

    it("should handle multiple wireless configs", () => {
      const wirelessConfigs: WirelessConfig[] = [
        {
          WifiTarget: "Domestic",
          SSID: "DomesticWiFi",
          Password: "domestic123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
        {
          WifiTarget: "Foreign",
          SSID: "ForeignWiFi",
          Password: "foreign123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        },
      ];

      const result = testWithOutput(
        "WirelessInterfaceList",
        "Handle multiple wireless configurations",
        { wirelessConfigs },
        () => WirelessInterfaceList(wirelessConfigs),
      );

      const commands = result["/interface list member"].join(" ");
      expect(commands).toContain("DomesticLAN");
      expect(commands).toContain("ForeignLAN");
      expect(result["/interface list member"]).toHaveLength(8); // 2 configs × 2 bands × 2 lists (specific + LAN)
      validateRouterConfig(result, ["/interface list member"]);
    });
  });
});
