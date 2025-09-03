import { describe, it, expect } from "vitest";
import {
  DisableInterfaces,
  CheckMasters,
  Hide,
  GetNetworks,
  SSIDListGenerator,
  Passphrase,
  StationMode,
  Slave,
  Master,
  WirelessBridgePortsSingle,
  WirelessBridgePortsMulti,
  CheckWireless,
} from "./WirelessUtil";
import type {
  Wireless,
  WirelessConfig as WirelessConfigType,
  MultiMode,
} from "~/components/Star/StarContext/LANType";
import type { WANLink, WANConfig } from "~/components/Star/StarContext/WANType";
import type { RouterConfig } from "../../ConfigGenerator";
import type { Networks, Band } from "~/components/Star/StarContext/CommonType";
import {
  testWithOutput,
  testWithGenericOutput,
  validateRouterConfig,
} from "~/test-utils/test-helpers";

describe("Wireless Helper Function Tests", () => {
  describe("DisableInterfaces", () => {
    it("should generate commands to disable both wifi interfaces", () => {
      testWithOutput(
        "DisableInterfaces",
        "Disable all wireless interfaces when no wireless config is needed",
        {},
        () => DisableInterfaces(),
      );

      const result = DisableInterfaces();
      const expectedConfig: RouterConfig = {
        "/interface wifi": [
          `set [ find default-name=wifi1 ] disabled=yes`,
          `set [ find default-name=wifi2 ] disabled=yes`,
        ],
      };
      expect(result).toEqual(expectedConfig);
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should return valid RouterConfig structure", () => {
      const result = DisableInterfaces();
      expect(result).toHaveProperty("/interface wifi");
      expect(Array.isArray(result["/interface wifi"])).toBe(true);
      expect(result["/interface wifi"]).toHaveLength(2);
    });
  });

  describe("CheckMasters", () => {
    it("should return true for both bands if present in WANLink", () => {
      const wanLink: WANLink = {
        Foreign: { InterfaceName: "wifi2.4" },
        Domestic: { InterfaceName: "wifi5" },
      };

      testWithGenericOutput(
        "CheckMasters",
        "Check master interfaces when both wifi bands are in use",
        { wanLink },
        () => CheckMasters(wanLink),
      );

      const result = CheckMasters(wanLink);
      expect(result).toEqual({ isWifi2_4: true, isWifi5: true });
    });

    it("should return true for 2.4GHz only", () => {
      const wanLink: WANLink = {
        Foreign: { InterfaceName: "wifi2.4" },
      };

      testWithGenericOutput(
        "CheckMasters",
        "Check master interfaces when only 2.4GHz wifi is in use",
        { wanLink },
        () => CheckMasters(wanLink),
      );

      const result = CheckMasters(wanLink);
      expect(result).toEqual({ isWifi2_4: true, isWifi5: false });
    });

    it("should return true for 5GHz only", () => {
      const wanLink: WANLink = {
        Foreign: { InterfaceName: "wifi5" },
      };

      testWithGenericOutput(
        "CheckMasters",
        "Check master interfaces when only 5GHz wifi is in use",
        { wanLink },
        () => CheckMasters(wanLink),
      );

      const result = CheckMasters(wanLink);
      expect(result).toEqual({ isWifi2_4: false, isWifi5: true });
    });

    it("should return false for both if not wifi interfaces", () => {
      const wanLink: WANLink = {
        Foreign: { InterfaceName: "ether1" },
      };

      testWithGenericOutput(
        "CheckMasters",
        "Check master interfaces when no wifi interfaces are in use",
        { wanLink },
        () => CheckMasters(wanLink),
      );

      const result = CheckMasters(wanLink);
      expect(result).toEqual({ isWifi2_4: false, isWifi5: false });
    });

    it("should handle interface names with wifi pattern variations", () => {
      const wanLink: WANLink = {
        Foreign: { InterfaceName: "wifi2.4" },
        Domestic: { InterfaceName: "wifi5" },
      };

      testWithGenericOutput(
        "CheckMasters",
        "Check master interfaces with standard wifi interface names",
        { wanLink },
        () => CheckMasters(wanLink),
      );

      const result = CheckMasters(wanLink);
      expect(result).toEqual({ isWifi2_4: true, isWifi5: true });
    });

    it("should handle undefined domestic interface", () => {
      const wanLink: WANLink = {
        Foreign: { InterfaceName: "wifi2.4" },
        // Domestic is undefined
      };

      testWithGenericOutput(
        "CheckMasters",
        "Check master interfaces when domestic interface is undefined",
        { wanLink },
        () => CheckMasters(wanLink),
      );

      const result = CheckMasters(wanLink);
      expect(result).toEqual({ isWifi2_4: true, isWifi5: false });
    });
  });

  describe("Hide", () => {
    it("should add configuration.hide-ssid=yes when Hide is true", () => {
      testWithGenericOutput(
        "Hide",
        "Add hide SSID configuration when enabled",
        { command: "base command", Hide: true },
        () => Hide("base command", true),
      );

      const result = Hide("base command", true);
      expect(result).toBe("base command configuration.hide-ssid=yes");
    });

    it("should add configuration.hide-ssid=no when Hide is false", () => {
      testWithGenericOutput(
        "Hide",
        "Add visible SSID configuration when disabled",
        { command: "base command", Hide: false },
        () => Hide("base command", false),
      );

      const result = Hide("base command", false);
      expect(result).toBe("base command configuration.hide-ssid=no");
    });

    it("should handle empty command", () => {
      testWithGenericOutput(
        "Hide",
        "Handle empty command string",
        { command: "", Hide: true },
        () => Hide("", true),
      );

      const result = Hide("", true);
      expect(result).toBe(" configuration.hide-ssid=yes");
    });
  });

  describe("GetNetworks", () => {
    it("should return all networks if they exist", () => {
      const multiMode: MultiMode = {
        Split: {} as WirelessConfigType,
        Foreign: {} as WirelessConfigType,
        Domestic: {} as WirelessConfigType,
        VPN: {} as WirelessConfigType,
      };
      expect(GetNetworks(multiMode)).toEqual([
        "Split",
        "Foreign",
        "Domestic",
        "VPN",
      ]);
    });

    it("should return a subset of networks", () => {
      const multiMode: MultiMode = {
        Foreign: {} as WirelessConfigType,
        VPN: {} as WirelessConfigType,
      };
      expect(GetNetworks(multiMode)).toEqual(["Foreign", "VPN"]);
    });

    it("should return an empty array for an empty multimode config", () => {
      const multiMode: MultiMode = {};
      expect(GetNetworks(multiMode)).toEqual([]);
    });
  });

  describe("SSIDListGenerator", () => {
    it("should generate split SSIDs when SplitBand is true", () => {
      const result = SSIDListGenerator("MyWiFi", true);
      expect(result).toEqual({ "2.4": "MyWiFi 2.4", "5": "MyWiFi 5" });
    });

    it("should generate same SSIDs when SplitBand is false", () => {
      const result = SSIDListGenerator("MyWiFi", false);
      expect(result).toEqual({ "2.4": "MyWiFi", "5": "MyWiFi" });
    });
  });

  describe("Passphrase", () => {
    it("should append security settings to the command", () => {
      const command = "base command";
      const passphrase = "password123";
      const expected = `${command} security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${passphrase}" disabled=no`;
      expect(Passphrase(passphrase, command)).toBe(expected);
    });
  });

  describe("StationMode", () => {
    it("should generate station mode command with credentials", () => {
      const wanConfig: WANConfig = {
        InterfaceName: "wifi2.4",
        WirelessCredentials: { SSID: "TargetSSID", Password: "TargetPassword" },
      };

      testWithOutput(
        "StationMode",
        "Generate station mode configuration with wireless credentials",
        { wanConfig, Link: "Foreign" },
        () => StationMode(wanConfig, "Foreign"),
      );

      const result = StationMode(wanConfig, "Foreign");
      const commands = result["/interface wifi"];

      // Since CommandShortner may add line breaks, check that the command contains key parts
      expect(commands).toHaveLength(1);
      expect(commands[0]).toContain(
        "set [ find default-name=wifi2 ] comment=ForeignWAN",
      );
      expect(commands[0]).toContain("configuration.mode=station");
      expect(commands[0]).toContain('.ssid="TargetSSID"');
      expect(commands[0]).toContain('security.passphrase="TargetPassword"');
      validateRouterConfig(result, ["/interface wifi"]);
    });

    it("should return empty config if no wireless credentials", () => {
      const wanConfig: WANConfig = { InterfaceName: "wifi2.4" };

      testWithOutput(
        "StationMode",
        "Handle missing wireless credentials by returning empty config",
        { wanConfig, Link: "Foreign" },
        () => StationMode(wanConfig, "Foreign"),
      );

      const result = StationMode(wanConfig, "Foreign");
      expect(result["/interface wifi"]).toEqual([]);
      validateRouterConfig(result);
    });
  });

  describe("Slave", () => {
    const baseWirelessConfig: WirelessConfigType = {
      SSID: "TestNetwork",
      Password: "testpass123",
      isHide: false,
      SplitBand: false,
      isDisabled: false,
    };
    const wanLinkWithWifi: WANLink = {
      Foreign: { InterfaceName: "wifi2.4" },
      Domestic: { InterfaceName: "wifi5" },
    };

    describe("Basic Slave Interface Generation", () => {
      it("should generate basic slave interface configuration for Domestic network", () => {
        testWithOutput(
          "Slave",
          "Generate basic slave interface configuration for Domestic network",
          {
            Network: "Domestic",
            Band: "5",
            WirelessConfig: baseWirelessConfig,
          },
          () => Slave("Domestic" as Networks, "5" as Band, baseWirelessConfig),
        );

        const result = Slave(
          "Domestic" as Networks,
          "5" as Band,
          baseWirelessConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("add configuration.mode=ap");
        expect(commands).toContain('.ssid="TestNetwork"');
        expect(commands).toContain(
          "master-interface=[ find default-name=wifi1 ]",
        );
        expect(commands).toContain('name="wifi5-DomesticLAN"');
        expect(commands).toContain('comment="DomesticLAN"');
        expect(commands).toContain("configuration.hide-ssid=no");
        expect(commands).toContain(
          "security.authentication-types=wpa2-psk,wpa3-psk",
        );
        expect(commands).toContain('.passphrase="testpass123"');
        expect(commands).toContain("disabled=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate slave interface for 2.4GHz band", () => {
        testWithOutput(
          "Slave",
          "Generate slave interface configuration for 2.4GHz band",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: baseWirelessConfig,
          },
          () => Slave("Foreign" as Networks, "2.4" as Band, baseWirelessConfig),
        );

        const result = Slave(
          "Foreign" as Networks,
          "2.4" as Band,
          baseWirelessConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(
          "master-interface=[ find default-name=wifi2 ]",
        );
        expect(commands).toContain('name="wifi2.4-ForeignLAN"');
        expect(commands).toContain('comment="ForeignLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate slave interface for VPN network", () => {
        testWithOutput(
          "Slave",
          "Generate slave interface configuration for VPN network",
          {
            Network: "VPN",
            Band: "5",
            WirelessConfig: baseWirelessConfig,
          },
          () => Slave("VPN" as Networks, "5" as Band, baseWirelessConfig),
        );

        const result = Slave(
          "VPN" as Networks,
          "5" as Band,
          baseWirelessConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(
          "master-interface=[ find default-name=wifi1 ]",
        );
        expect(commands).toContain('name="wifi5-VPNLAN"');
        expect(commands).toContain('comment="VPNLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate slave interface for Split network", () => {
        testWithOutput(
          "Slave",
          "Generate slave interface configuration for Split network",
          {
            Network: "Split",
            Band: "2.4",
            WirelessConfig: baseWirelessConfig,
          },
          () => Slave("Split" as Networks, "2.4" as Band, baseWirelessConfig),
        );

        const result = Slave(
          "Split" as Networks,
          "2.4" as Band,
          baseWirelessConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(
          "master-interface=[ find default-name=wifi2 ]",
        );
        expect(commands).toContain('name="wifi2.4-SplitLAN"');
        expect(commands).toContain('comment="SplitLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Hidden SSID Configuration", () => {
      it("should generate slave interface with hidden SSID", () => {
        const hiddenConfig: WirelessConfigType = {
          ...baseWirelessConfig,
          isHide: true,
        };

        testWithOutput(
          "Slave",
          "Generate slave interface with hidden SSID configuration",
          {
            Network: "Domestic",
            Band: "5",
            WirelessConfig: hiddenConfig,
          },
          () => Slave("Domestic" as Networks, "5" as Band, hiddenConfig),
        );

        const result = Slave("Domestic" as Networks, "5" as Band, hiddenConfig);
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("configuration.hide-ssid=yes");
        expect(commands).toContain('.ssid="TestNetwork"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate slave interface with visible SSID", () => {
        const visibleConfig: WirelessConfigType = {
          ...baseWirelessConfig,
          isHide: false,
        };

        testWithOutput(
          "Slave",
          "Generate slave interface with visible SSID configuration",
          {
            Network: "VPN",
            Band: "2.4",
            WirelessConfig: visibleConfig,
          },
          () => Slave("VPN" as Networks, "2.4" as Band, visibleConfig),
        );

        const result = Slave("VPN" as Networks, "2.4" as Band, visibleConfig);
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("configuration.hide-ssid=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Split Band SSID Configuration", () => {
      it("should generate slave interface with split band enabled for 2.4GHz", () => {
        const splitBandConfig: WirelessConfigType = {
          SSID: "CorporateWiFi",
          Password: "corp2024!",
          isHide: false,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Generate slave interface with split band SSID for 2.4GHz",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: splitBandConfig,
          },
          () => Slave("Foreign" as Networks, "2.4" as Band, splitBandConfig),
        );

        const result = Slave(
          "Foreign" as Networks,
          "2.4" as Band,
          splitBandConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="CorporateWiFi 2.4"');
        expect(commands).toContain('.passphrase="corp2024!"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate slave interface with split band enabled for 5GHz", () => {
        const splitBandConfig: WirelessConfigType = {
          SSID: "CorporateWiFi",
          Password: "corp2024!",
          isHide: false,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Generate slave interface with split band SSID for 5GHz",
          {
            Network: "Domestic",
            Band: "5",
            WirelessConfig: splitBandConfig,
          },
          () => Slave("Domestic" as Networks, "5" as Band, splitBandConfig),
        );

        const result = Slave(
          "Domestic" as Networks,
          "5" as Band,
          splitBandConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="CorporateWiFi 5"');
        expect(commands).toContain('.passphrase="corp2024!"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate slave interface with unified SSID when split band disabled", () => {
        const unifiedConfig: WirelessConfigType = {
          SSID: "UnifiedWiFi",
          Password: "unified123",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Generate slave interface with unified SSID when split band disabled",
          {
            Network: "VPN",
            Band: "5",
            WirelessConfig: unifiedConfig,
          },
          () => Slave("VPN" as Networks, "5" as Band, unifiedConfig),
        );

        const result = Slave("VPN" as Networks, "5" as Band, unifiedConfig);
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="UnifiedWiFi"');
        expect(commands).not.toContain('.ssid="UnifiedWiFi 5"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Complex Password and SSID Handling", () => {
      it("should handle special characters in SSID and password", () => {
        const specialConfig: WirelessConfigType = {
          SSID: "Test-Network_2024@Company!",
          Password: "P@ssw0rd#123$%^&*()",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Handle special characters in SSID and password",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: specialConfig,
          },
          () => Slave("Foreign" as Networks, "2.4" as Band, specialConfig),
        );

        const result = Slave(
          "Foreign" as Networks,
          "2.4" as Band,
          specialConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="Test-Network_2024@Company!"');
        expect(commands).toContain('.passphrase="P@ssw0rd#123$%^&*()"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should handle long SSID and password strings", () => {
        const longConfig: WirelessConfigType = {
          SSID: "VeryLongSSIDNameForTestingPurposesOnly",
          Password:
            "VeryLongPasswordForTestingComplexConfigurationHandling123456789",
          isHide: true,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Handle long SSID and password strings",
          {
            Network: "VPN",
            Band: "5",
            WirelessConfig: longConfig,
          },
          () => Slave("VPN" as Networks, "5" as Band, longConfig),
        );

        const result = Slave("VPN" as Networks, "5" as Band, longConfig);
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(
          '.ssid="VeryLongSSIDNameForTestingPurposesOnly 5"',
        );
        expect(commands).toContain(
          '.passphrase="VeryLongPasswordForTestingComplexConfigurationHandling123456789"',
        );
        expect(commands).toContain("configuration.hide-ssid=yes");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should handle empty or minimal configurations", () => {
        const minimalConfig: WirelessConfigType = {
          SSID: "A",
          Password: "12345678",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Handle minimal SSID and password configurations",
          {
            Network: "Split",
            Band: "2.4",
            WirelessConfig: minimalConfig,
          },
          () => Slave("Split" as Networks, "2.4" as Band, minimalConfig),
        );

        const result = Slave("Split" as Networks, "2.4" as Band, minimalConfig);
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="A"');
        expect(commands).toContain('.passphrase="12345678"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Master Interface Integration", () => {
      it("should correctly reference master interface for all networks", () => {
        const testCases = [
          { Network: "Domestic", Band: "2.4" },
          { Network: "VPN", Band: "5" },
          { Network: "Split", Band: "2.4" },
          { Network: "Foreign", Band: "5" },
        ] as const;

        for (const testCase of testCases) {
          testWithOutput(
            "Slave",
            `Basic slave interface configuration for ${testCase.Network} on ${testCase.Band}GHz`,
            testCase,
            () =>
              Slave(
                testCase.Network,
                testCase.Band as Band,
                baseWirelessConfig,
              ),
          );

          const result = Slave(
            testCase.Network,
            testCase.Band as Band,
            baseWirelessConfig,
          );
          const commands = result["/interface wifi"].join(" ");
          expect(commands).toContain("add configuration.mode=ap");
          expect(commands).toContain(
            `name="wifi${testCase.Band}-${testCase.Network}LAN"`,
          );
          expect(commands).toContain(`comment="${testCase.Network}LAN"`);

          // Check correct master interface reference
          const expectedMaster = testCase.Band === "2.4" ? "wifi2" : "wifi1";
          expect(commands).toContain(
            `master-interface=[ find default-name=${expectedMaster} ]`,
          );

          validateRouterConfig(result, ["/interface wifi"]);
        }
      });

      it("should handle different WAN link configurations", () => {
        testWithOutput(
          "Slave",
          "Handle slave interface configuration for Domestic network",
          {
            Network: "Domestic",
            Band: "2.4",
            WirelessConfig: baseWirelessConfig,
          },
          () =>
            Slave("Domestic" as Networks, "2.4" as Band, baseWirelessConfig),
        );

        const result = Slave(
          "Domestic" as Networks,
          "2.4" as Band,
          baseWirelessConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(
          "master-interface=[ find default-name=wifi2 ]",
        );
        expect(commands).toContain('name="wifi2.4-DomesticLAN"');
        expect(commands).toContain('comment="DomesticLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Command Structure Validation", () => {
      it("should generate complete and properly formatted command", () => {
        const completeConfig: WirelessConfigType = {
          SSID: "Enterprise-WiFi",
          Password: "Enterprise2024!",
          isHide: true,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Slave",
          "Generate complete and properly formatted slave interface command",
          {
            Network: "Foreign",
            Band: "5",
            WirelessConfig: completeConfig,
          },
          () => Slave("Foreign" as Networks, "5" as Band, completeConfig),
        );

        const result = Slave(
          "Foreign" as Networks,
          "5" as Band,
          completeConfig,
        );
        const commands = result["/interface wifi"].join(" ");

        // Verify all required components are present
        expect(commands).toMatch(/add configuration\.mode=ap/);
        expect(commands).toContain('.ssid="Enterprise-WiFi 5"');
        expect(commands).toContain(
          "master-interface=[ find default-name=wifi1 ]",
        );
        expect(commands).toContain('name="wifi5-ForeignLAN"');
        expect(commands).toContain('comment="ForeignLAN"');
        expect(commands).toContain("configuration.hide-ssid=yes");
        expect(commands).toContain(
          "security.authentication-types=wpa2-psk,wpa3-psk",
        );
        expect(commands).toContain('.passphrase="Enterprise2024!"');
        expect(commands).toContain("disabled=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should maintain proper command order and syntax", () => {
        testWithOutput(
          "Slave",
          "Validate command order and syntax for slave interface",
          {
            Network: "VPN",
            Band: "2.4",
            WirelessConfig: baseWirelessConfig,
          },
          () => Slave("VPN" as Networks, "2.4" as Band, baseWirelessConfig),
        );

        const result = Slave(
          "VPN" as Networks,
          "2.4" as Band,
          baseWirelessConfig,
        );
        const commands = result["/interface wifi"].join(" ");

        // Check that the command follows MikroTik syntax
        expect(commands.split(" ").length).toBeGreaterThan(5); // Should be a substantial command
        expect(commands).not.toContain('""'); // No empty quoted strings
        // Note: Commands may contain double spaces due to line break formatting in CommandShortner
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Edge Cases and Error Scenarios", () => {
      it("should handle all network types consistently", () => {
        const networks: Networks[] = ["Foreign", "Domestic", "VPN", "Split"];
        const results: Record<string, RouterConfig> = {};

        for (const network of networks) {
          results[network] = Slave(network, "2.4" as Band, baseWirelessConfig);
        }

        testWithGenericOutput(
          "Slave",
          "Handle all network types consistently",
          { networks, baseWirelessConfig, wanLinkWithWifi },
          () => results,
        );

        for (const [network, result] of Object.entries(results)) {
          const commands = result["/interface wifi"].join(" ");
          expect(commands).toContain(
            "master-interface=[ find default-name=wifi2 ]",
          );
          expect(commands).toContain(`name="wifi2.4-${network}LAN"`);
          expect(commands).toContain(`comment="${network}LAN"`);
          validateRouterConfig(result, ["/interface wifi"]);
        }
      });

      it("should handle both bands consistently", () => {
        const bands: Band[] = ["2.4", "5"];
        const results: Record<string, RouterConfig> = {};

        for (const band of bands) {
          results[band] = Slave(
            "Domestic" as Networks,
            band,
            baseWirelessConfig,
          );
        }

        testWithGenericOutput(
          "Slave",
          "Handle both wireless bands consistently",
          { bands, baseWirelessConfig, wanLinkWithWifi },
          () => results,
        );

        const commands24 = results["2.4"]["/interface wifi"].join(" ");
        const commands5 = results["5"]["/interface wifi"].join(" ");

        expect(commands24).toContain(
          "master-interface=[ find default-name=wifi2 ]",
        );
        expect(commands24).toContain('name="wifi2.4-DomesticLAN"');
        expect(commands5).toContain(
          "master-interface=[ find default-name=wifi1 ]",
        );
        expect(commands5).toContain('name="wifi5-DomesticLAN"');

        validateRouterConfig(results["2.4"], ["/interface wifi"]);
        validateRouterConfig(results["5"], ["/interface wifi"]);
      });
    });
  });

  describe("Master", () => {
    const baseMasterConfig: WirelessConfigType = {
      SSID: "MasterNetwork",
      Password: "masterpass123",
      isHide: false,
      SplitBand: false,
      isDisabled: false,
    };

    describe("Basic Master Interface Generation", () => {
      it("should generate basic master interface configuration for Foreign network", () => {
        testWithOutput(
          "Master",
          "Generate basic master interface configuration for Foreign network",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("Foreign" as Networks, "2.4" as Band, baseMasterConfig),
        );

        const result = Master(
          "Foreign" as Networks,
          "2.4" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("set [ find default-name=wifi2 ]");
        expect(commands).toContain("configuration.country=Japan");
        expect(commands).toContain(".mode=ap");
        expect(commands).toContain('.ssid="MasterNetwork"');
        expect(commands).toContain('name="wifi2.4-ForeignLAN"');
        expect(commands).toContain('comment="ForeignLAN"');
        expect(commands).toContain("configuration.hide-ssid=no");
        expect(commands).toContain(
          "security.authentication-types=wpa2-psk,wpa3-psk",
        );
        expect(commands).toContain('.passphrase="masterpass123"');
        expect(commands).toContain("disabled=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate master interface for 5GHz band", () => {
        testWithOutput(
          "Master",
          "Generate master interface configuration for 5GHz band",
          {
            Network: "Domestic",
            Band: "5",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("Domestic" as Networks, "5" as Band, baseMasterConfig),
        );

        const result = Master(
          "Domestic" as Networks,
          "5" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("set [ find default-name=wifi1 ]");
        expect(commands).toContain('name="wifi5-DomesticLAN"');
        expect(commands).toContain('comment="DomesticLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate master interface for VPN network", () => {
        testWithOutput(
          "Master",
          "Generate master interface configuration for VPN network",
          {
            Network: "VPN",
            Band: "2.4",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("VPN" as Networks, "2.4" as Band, baseMasterConfig),
        );

        const result = Master(
          "VPN" as Networks,
          "2.4" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("set [ find default-name=wifi2 ]");
        expect(commands).toContain('name="wifi2.4-VPNLAN"');
        expect(commands).toContain('comment="VPNLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate master interface for Split network", () => {
        testWithOutput(
          "Master",
          "Generate master interface configuration for Split network",
          {
            Network: "Split",
            Band: "5",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("Split" as Networks, "5" as Band, baseMasterConfig),
        );

        const result = Master(
          "Split" as Networks,
          "5" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("set [ find default-name=wifi1 ]");
        expect(commands).toContain('name="wifi5-SplitLAN"');
        expect(commands).toContain('comment="SplitLAN"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Hidden SSID Configuration", () => {
      it("should generate master interface with hidden SSID", () => {
        const hiddenMasterConfig: WirelessConfigType = {
          ...baseMasterConfig,
          isHide: true,
        };

        testWithOutput(
          "Master",
          "Generate master interface with hidden SSID configuration",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: hiddenMasterConfig,
          },
          () =>
            Master("Foreign" as Networks, "2.4" as Band, hiddenMasterConfig),
        );

        const result = Master(
          "Foreign" as Networks,
          "2.4" as Band,
          hiddenMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("configuration.hide-ssid=yes");
        expect(commands).toContain('.ssid="MasterNetwork"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate master interface with visible SSID", () => {
        const visibleMasterConfig: WirelessConfigType = {
          ...baseMasterConfig,
          isHide: false,
        };

        testWithOutput(
          "Master",
          "Generate master interface with visible SSID configuration",
          {
            Network: "Domestic",
            Band: "5",
            WirelessConfig: visibleMasterConfig,
          },
          () =>
            Master("Domestic" as Networks, "5" as Band, visibleMasterConfig),
        );

        const result = Master(
          "Domestic" as Networks,
          "5" as Band,
          visibleMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("configuration.hide-ssid=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Split Band SSID Configuration", () => {
      it("should generate master interface with split band enabled for 2.4GHz", () => {
        const splitBandMasterConfig: WirelessConfigType = {
          SSID: "EnterpriseWiFi",
          Password: "enterprise2024!",
          isHide: false,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Generate master interface with split band SSID for 2.4GHz",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: splitBandMasterConfig,
          },
          () =>
            Master("Foreign" as Networks, "2.4" as Band, splitBandMasterConfig),
        );

        const result = Master(
          "Foreign" as Networks,
          "2.4" as Band,
          splitBandMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="EnterpriseWiFi 2.4"');
        expect(commands).toContain('.passphrase="enterprise2024!"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate master interface with split band enabled for 5GHz", () => {
        const splitBandMasterConfig: WirelessConfigType = {
          SSID: "EnterpriseWiFi",
          Password: "enterprise2024!",
          isHide: false,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Generate master interface with split band SSID for 5GHz",
          {
            Network: "VPN",
            Band: "5",
            WirelessConfig: splitBandMasterConfig,
          },
          () => Master("VPN" as Networks, "5" as Band, splitBandMasterConfig),
        );

        const result = Master(
          "VPN" as Networks,
          "5" as Band,
          splitBandMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="EnterpriseWiFi 5"');
        expect(commands).toContain('.passphrase="enterprise2024!"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should generate master interface with unified SSID when split band disabled", () => {
        const unifiedMasterConfig: WirelessConfigType = {
          SSID: "UnifiedMasterWiFi",
          Password: "unified456",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Generate master interface with unified SSID when split band disabled",
          {
            Network: "Split",
            Band: "2.4",
            WirelessConfig: unifiedMasterConfig,
          },
          () => Master("Split" as Networks, "2.4" as Band, unifiedMasterConfig),
        );

        const result = Master(
          "Split" as Networks,
          "2.4" as Band,
          unifiedMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="UnifiedMasterWiFi"');
        expect(commands).not.toContain('.ssid="UnifiedMasterWiFi 2.4"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Complex Password and SSID Handling", () => {
      it("should handle special characters in SSID and password", () => {
        const specialMasterConfig: WirelessConfigType = {
          SSID: "Master-Network_2024@Corp!",
          Password: "M@st3rP@ssw0rd#123$%^&*()",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Handle special characters in SSID and password for master interface",
          {
            Network: "Foreign",
            Band: "5",
            WirelessConfig: specialMasterConfig,
          },
          () => Master("Foreign" as Networks, "5" as Band, specialMasterConfig),
        );

        const result = Master(
          "Foreign" as Networks,
          "5" as Band,
          specialMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="Master-Network_2024@Corp!"');
        expect(commands).toContain('.passphrase="M@st3rP@ssw0rd#123$%^&*()"');
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should handle long SSID and password strings", () => {
        const longMasterConfig: WirelessConfigType = {
          SSID: "VeryLongMasterSSIDNameForTestingPurposesOnly",
          Password:
            "VeryLongMasterPasswordForTestingComplexConfigurationHandling123456789",
          isHide: true,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Handle long SSID and password strings for master interface",
          {
            Network: "Domestic",
            Band: "2.4",
            WirelessConfig: longMasterConfig,
          },
          () => Master("Domestic" as Networks, "2.4" as Band, longMasterConfig),
        );

        const result = Master(
          "Domestic" as Networks,
          "2.4" as Band,
          longMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(
          '.ssid="VeryLongMasterSSIDNameForTestingPurposesOnly 2.4"',
        );
        expect(commands).toContain(
          '.passphrase="VeryLongMasterPasswordForTestingComplexConfigurationHandling123456789"',
        );
        expect(commands).toContain("configuration.hide-ssid=yes");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should handle minimal configurations", () => {
        const minimalMasterConfig: WirelessConfigType = {
          SSID: "M",
          Password: "87654321",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Handle minimal SSID and password configurations for master interface",
          {
            Network: "VPN",
            Band: "5",
            WirelessConfig: minimalMasterConfig,
          },
          () => Master("VPN" as Networks, "5" as Band, minimalMasterConfig),
        );

        const result = Master(
          "VPN" as Networks,
          "5" as Band,
          minimalMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain('.ssid="M"');
        expect(commands).toContain('.passphrase="87654321"');
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("MikroTik WiFi Configuration Standards", () => {
      it("should generate master interface following MikroTik WiFi documentation", () => {
        const mikrotikStandardConfig: WirelessConfigType = {
          SSID: "MikroTik",
          Password: "diceware makes good passwords",
          isHide: false,
          SplitBand: false,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Generate master interface following MikroTik WiFi documentation standards",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: mikrotikStandardConfig,
          },
          () =>
            Master(
              "Foreign" as Networks,
              "2.4" as Band,
              mikrotikStandardConfig,
            ),
        );

        const result = Master(
          "Foreign" as Networks,
          "2.4" as Band,
          mikrotikStandardConfig,
        );
        const commands = result["/interface wifi"].join(" ");

        // Verify MikroTik standard compliance
        expect(commands).toContain("configuration.country=Japan");
        expect(commands).toContain(".mode=ap");
        expect(commands).toContain('.ssid="MikroTik"');
        expect(commands).toContain(
          "security.authentication-types=wpa2-psk,wpa3-psk",
        );
        expect(commands).toContain(
          '.passphrase="diceware makes good passwords"',
        );
        expect(commands).toContain("disabled=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should set proper country configuration", () => {
        testWithOutput(
          "Master",
          "Verify proper country configuration in master interface",
          {
            Network: "Domestic",
            Band: "5",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("Domestic" as Networks, "5" as Band, baseMasterConfig),
        );

        const result = Master(
          "Domestic" as Networks,
          "5" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain("configuration.country=Japan");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should set proper access point mode", () => {
        testWithOutput(
          "Master",
          "Verify proper access point mode configuration",
          {
            Network: "VPN",
            Band: "2.4",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("VPN" as Networks, "2.4" as Band, baseMasterConfig),
        );

        const result = Master(
          "VPN" as Networks,
          "2.4" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");
        expect(commands).toContain(".mode=ap");
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Command Structure Validation", () => {
      it("should generate complete and properly formatted command", () => {
        const completeConfig: WirelessConfigType = {
          SSID: "Complete-Master-WiFi",
          Password: "CompletePassword2024!",
          isHide: true,
          SplitBand: true,
          isDisabled: false,
        };

        testWithOutput(
          "Master",
          "Generate complete and properly formatted master interface command",
          {
            Network: "Split",
            Band: "5",
            WirelessConfig: completeConfig,
          },
          () => Master("Split" as Networks, "5" as Band, completeConfig),
        );

        const result = Master("Split" as Networks, "5" as Band, completeConfig);
        const commands = result["/interface wifi"].join(" ");

        // Verify all required components are present
        expect(commands).toMatch(/^set \[ find name=wifi5 \]/);
        expect(commands).toContain("configuration.country=Japan");
        expect(commands).toContain(".mode=ap");
        expect(commands).toContain('.ssid="Complete-Master-WiFi 5"');
        expect(commands).toContain('name="wifi5-SplitLAN"');
        expect(commands).toContain('comment="SplitLAN"');
        expect(commands).toContain("configuration.hide-ssid=yes");
        expect(commands).toContain(
          "security.authentication-types=wpa2-psk,wpa3-psk",
        );
        expect(commands).toContain('.passphrase="CompletePassword2024!"');
        expect(commands).toContain("disabled=no");
        validateRouterConfig(result, ["/interface wifi"]);
      });

      it("should maintain proper command order and syntax", () => {
        testWithOutput(
          "Master",
          "Validate command order and syntax for master interface",
          {
            Network: "Foreign",
            Band: "2.4",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("Foreign" as Networks, "2.4" as Band, baseMasterConfig),
        );

        const result = Master(
          "Foreign" as Networks,
          "2.4" as Band,
          baseMasterConfig,
        );
        const commands = result["/interface wifi"].join(" ");

        // Check that the command follows MikroTik syntax
        expect(commands.split(" ").length).toBeGreaterThan(5); // Should be a substantial command
        expect(commands).not.toContain('""'); // No empty quoted strings
        // Note: Commands may contain double spaces due to line break formatting in CommandShortner
        expect(commands).toMatch(/^set \[ find name=wifi\d+\.?\d* \]/); // Proper set command format
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });

    describe("Edge Cases and Error Scenarios", () => {
      it("should handle all network types consistently", () => {
        const networks: Networks[] = ["Foreign", "Domestic", "VPN", "Split"];
        const results: Record<string, RouterConfig> = {};

        for (const network of networks) {
          results[network] = Master(network, "5" as Band, baseMasterConfig);
        }

        testWithGenericOutput(
          "Master",
          "Handle all network types consistently",
          { networks, baseMasterConfig },
          () => results,
        );

        for (const [network, result] of Object.entries(results)) {
          const commands = result["/interface wifi"].join(" ");
          expect(commands).toContain("set [ find name=wifi5 ]");
          expect(commands).toContain(`name="wifi5-${network}LAN"`);
          expect(commands).toContain(`comment="${network}LAN"`);
          validateRouterConfig(result, ["/interface wifi"]);
        }
      });

      it("should handle both bands consistently", () => {
        const bands: Band[] = ["2.4", "5"];
        const results: Record<string, RouterConfig> = {};

        for (const band of bands) {
          results[band] = Master("Foreign" as Networks, band, baseMasterConfig);
        }

        testWithGenericOutput(
          "Master",
          "Handle both wireless bands consistently",
          { bands, baseMasterConfig },
          () => results,
        );

        const commands24 = results["2.4"]["/interface wifi"].join(" ");
        const commands5 = results["5"]["/interface wifi"].join(" ");

        expect(commands24).toContain("set [ find name=wifi2.4 ]");
        expect(commands24).toContain('name="wifi2.4-ForeignLAN"');
        expect(commands5).toContain("set [ find name=wifi5 ]");
        expect(commands5).toContain('name="wifi5-ForeignLAN"');

        validateRouterConfig(results["2.4"], ["/interface wifi"]);
        validateRouterConfig(results["5"], ["/interface wifi"]);
      });

      it("should generate consistent configuration structure", () => {
        testWithOutput(
          "Master",
          "Ensure consistent RouterConfig structure across all master interface generations",
          {
            Network: "Domestic",
            Band: "2.4",
            WirelessConfig: baseMasterConfig,
          },
          () => Master("Domestic" as Networks, "2.4" as Band, baseMasterConfig),
        );

        const result = Master(
          "Domestic" as Networks,
          "2.4" as Band,
          baseMasterConfig,
        );

        // Verify RouterConfig structure
        expect(result).toHaveProperty("/interface wifi");
        expect(Array.isArray(result["/interface wifi"])).toBe(true);
        expect(result["/interface wifi"]).toHaveLength(1);
        expect(typeof result["/interface wifi"][0]).toBe("string");
        validateRouterConfig(result, ["/interface wifi"]);
      });
    });
  });

  describe("WirelessBridgePortsSingle", () => {
    describe("Domestic Link Configuration", () => {
      it("should generate split bridge ports for domestic link", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Generate split bridge ports for domestic link configuration",
          { WANLinkType: "both" },
          () => WirelessBridgePortsSingle(true),
        );

        const result = WirelessBridgePortsSingle(true);
        const expectedPorts = [
          "add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN",
          "add bridge=LANBridgeSplit interface=wifi5-SplitLAN",
        ];

        expect(result["/interface bridge port"]).toEqual(expectedPorts);
        expect(result["/interface bridge port"]).toHaveLength(2);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should use LANBridgeSplit bridge for domestic link", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Verify LANBridgeSplit bridge usage for domestic link",
          { WANLinkType: "both" },
          () => WirelessBridgePortsSingle(true),
        );

        const result = WirelessBridgePortsSingle(true);
        const commands = result["/interface bridge port"];

        for (const command of commands) {
          expect(command).toContain("bridge=LANBridgeSplit");
          expect(command).not.toContain("bridge=LANBridgeVPN");
        }
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should configure both 2.4GHz and 5GHz interfaces for split LAN", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Configure both wireless bands for split LAN",
          { WANLinkType: "both" },
          () => WirelessBridgePortsSingle(true),
        );

        const result = WirelessBridgePortsSingle(true);
        const commands = result["/interface bridge port"];

        expect(
          commands.some((cmd: string) => cmd.includes("wifi2.4-SplitLAN")),
        ).toBe(true);
        expect(
          commands.some((cmd: string) => cmd.includes("wifi5-SplitLAN")),
        ).toBe(true);
        validateRouterConfig(result, ["/interface bridge port"]);
      });
    });

    describe("Non-Domestic Link Configuration", () => {
      it("should generate VPN bridge ports for non-domestic link", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Generate VPN bridge ports for non-domestic link configuration",
          { WANLinkType: "foreign-only" },
          () => WirelessBridgePortsSingle(false),
        );

        const result = WirelessBridgePortsSingle(false);
        const expectedPorts = [
          "add bridge=LANBridgeVPN interface=wifi2.4-VPNLAN",
          "add bridge=LANBridgeVPN interface=wifi5-VPNLAN",
        ];

        expect(result["/interface bridge port"]).toEqual(expectedPorts);
        expect(result["/interface bridge port"]).toHaveLength(2);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should use LANBridgeVPN bridge for non-domestic link", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Verify LANBridgeVPN bridge usage for non-domestic link",
          { WANLinkType: "foreign-only" },
          () => WirelessBridgePortsSingle(false),
        );

        const result = WirelessBridgePortsSingle(false);
        const commands = result["/interface bridge port"];

        for (const command of commands) {
          expect(command).toContain("bridge=LANBridgeVPN");
          expect(command).not.toContain("bridge=LANBridgeSplit");
        }
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should configure both 2.4GHz and 5GHz interfaces for VPN LAN", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Configure both wireless bands for VPN LAN",
          { WANLinkType: "foreign-only" },
          () => WirelessBridgePortsSingle(false),
        );

        const result = WirelessBridgePortsSingle(false);
        const commands = result["/interface bridge port"];

        expect(
          commands.some((cmd: string) => cmd.includes("wifi2.4-VPNLAN")),
        ).toBe(true);
        expect(
          commands.some((cmd: string) => cmd.includes("wifi5-VPNLAN")),
        ).toBe(true);
        validateRouterConfig(result, ["/interface bridge port"]);
      });
    });

    describe("Router Config Structure Validation", () => {
      it("should return valid RouterConfig structure for domestic link", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Validate RouterConfig structure for domestic link",
          { WANLinkType: "both" },
          () => WirelessBridgePortsSingle(true),
        );

        const result = WirelessBridgePortsSingle(true);

        expect(result).toHaveProperty("/interface bridge port");
        expect(Array.isArray(result["/interface bridge port"])).toBe(true);
        expect(
          result["/interface bridge port"].every(
            (cmd: string) => typeof cmd === "string",
          ),
        ).toBe(true);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should return valid RouterConfig structure for non-domestic link", () => {
        testWithOutput(
          "WirelessBridgePortsSingle",
          "Validate RouterConfig structure for non-domestic link",
          { WANLinkType: "foreign-only" },
          () => WirelessBridgePortsSingle(false),
        );

        const result = WirelessBridgePortsSingle(false);

        expect(result).toHaveProperty("/interface bridge port");
        expect(Array.isArray(result["/interface bridge port"])).toBe(true);
        expect(
          result["/interface bridge port"].every(
            (cmd: string) => typeof cmd === "string",
          ),
        ).toBe(true);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should generate consistent command format", () => {
        const domesticResult = WirelessBridgePortsSingle(true);
        const vpnResult = WirelessBridgePortsSingle(false);

        testWithGenericOutput(
          "WirelessBridgePortsSingle",
          "Verify consistent command format across configurations",
          { domesticResult, vpnResult },
          () => ({ domesticResult, vpnResult }),
        );

        // Both should have same number of commands
        expect(domesticResult["/interface bridge port"]).toHaveLength(2);
        expect(vpnResult["/interface bridge port"]).toHaveLength(2);

        // All commands should start with 'add'
        const allCommands = [
          ...domesticResult["/interface bridge port"],
          ...vpnResult["/interface bridge port"],
        ];

        for (const command of allCommands) {
          expect(command).toMatch(/^add bridge=/);
          expect(command).toContain("interface=wifi");
        }
      });
    });
  });

  describe("WirelessBridgePortsMulti", () => {
    describe("MultiMode Network Configurations", () => {
      it("should generate bridge ports for all networks in multimode", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            Domestic: {} as WirelessConfigType,
            VPN: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Generate bridge ports for all configured networks in multimode",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const expectedPorts = [
          "add bridge=LANBridgeSplit interface=wifi2.4-FRNLAN",
          "add bridge=LANBridgeSplit interface=wifi5-FRNLAN",
          "add bridge=LANBridgeSplit interface=wifi2.4-DOMLAN",
          "add bridge=LANBridgeSplit interface=wifi5-DOMLAN",
          "add bridge=LANBridgeSplit interface=wifi2.4-VPNLAN",
          "add bridge=LANBridgeSplit interface=wifi5-VPNLAN",
        ];

        expect(result["/interface bridge port"]).toEqual(
          expect.arrayContaining(expectedPorts),
        );
        expect(result["/interface bridge port"]).toHaveLength(6);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should generate bridge ports for Foreign and VPN networks only", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            VPN: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Generate bridge ports for subset of networks (Foreign and VPN)",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const expectedPorts = [
          "add bridge=LANBridgeSplit interface=wifi2.4-FRNLAN",
          "add bridge=LANBridgeSplit interface=wifi5-FRNLAN",
          "add bridge=LANBridgeSplit interface=wifi2.4-VPNLAN",
          "add bridge=LANBridgeSplit interface=wifi5-VPNLAN",
        ];

        expect(result["/interface bridge port"]).toEqual(
          expect.arrayContaining(expectedPorts),
        );
        expect(result["/interface bridge port"]).toHaveLength(4);

        // Should not contain Domestic or Split networks
        const commands = result["/interface bridge port"].join(" ");
        expect(commands).not.toContain("DOMLAN");
        expect(commands).not.toContain("SplitLAN");
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should generate bridge ports for Split network only", () => {
        const wireless: Wireless = {
          MultiMode: {
            Split: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Generate bridge ports for single Split network",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const expectedPorts = [
          "add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN",
          "add bridge=LANBridgeSplit interface=wifi5-SplitLAN",
        ];

        expect(result["/interface bridge port"]).toEqual(expectedPorts);
        expect(result["/interface bridge port"]).toHaveLength(2);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should generate bridge ports for Domestic network only", () => {
        const wireless: Wireless = {
          MultiMode: {
            Domestic: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Generate bridge ports for single Domestic network",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const expectedPorts = [
          "add bridge=LANBridgeSplit interface=wifi2.4-DOMLAN",
          "add bridge=LANBridgeSplit interface=wifi5-DOMLAN",
        ];

        expect(result["/interface bridge port"]).toEqual(expectedPorts);
        expect(result["/interface bridge port"]).toHaveLength(2);
        validateRouterConfig(result, ["/interface bridge port"]);
      });
    });

    describe("Edge Cases and Error Handling", () => {
      it("should return empty config if no multimode", () => {
        const wireless: Wireless = { SingleMode: {} as WirelessConfigType };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Handle wireless configuration without MultiMode",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        expect(result["/interface bridge port"]).toEqual([]);
        expect(result["/interface bridge port"]).toHaveLength(0);
        validateRouterConfig(result);
      });

      it("should return empty config if MultiMode is undefined", () => {
        const wireless: Wireless = {};

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Handle wireless configuration with undefined MultiMode",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        expect(result["/interface bridge port"]).toEqual([]);
        validateRouterConfig(result);
      });

      it("should return empty config if MultiMode is empty object", () => {
        const wireless: Wireless = {
          MultiMode: {},
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Handle empty MultiMode configuration",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        expect(result["/interface bridge port"]).toEqual([]);
        expect(result["/interface bridge port"]).toHaveLength(0);
        validateRouterConfig(result);
      });

      it("should handle wireless configuration with both SingleMode and MultiMode", () => {
        const wireless: Wireless = {
          SingleMode: {} as WirelessConfigType,
          MultiMode: {
            Foreign: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Handle wireless configuration with both SingleMode and MultiMode",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        // Should only process MultiMode and ignore SingleMode
        expect(result["/interface bridge port"]).toHaveLength(2);
        expect(result["/interface bridge port"]).toEqual([
          "add bridge=LANBridgeSplit interface=wifi2.4-FRNLAN",
          "add bridge=LANBridgeSplit interface=wifi5-FRNLAN",
        ]);
        validateRouterConfig(result, ["/interface bridge port"]);
      });
    });

    describe("Network Naming Convention Validation", () => {
      it("should use correct abbreviated network names", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            Domestic: {} as WirelessConfigType,
            VPN: {} as WirelessConfigType,
            Split: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Validate network name abbreviation conventions",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const commands = result["/interface bridge port"].join(" ");

        // Verify abbreviated forms are used
        expect(commands).toContain("FRNLAN"); // Foreign -> FRN
        expect(commands).toContain("DOMLAN"); // Domestic -> DOM
        expect(commands).toContain("VPNLAN"); // VPN -> VPN
        expect(commands).toContain("SplitLAN"); // Split -> Split

        // Verify full names are not used
        expect(commands).not.toContain("ForeignLAN");
        expect(commands).not.toContain("DomesticLAN");

        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should configure both 2.4GHz and 5GHz for each network", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            VPN: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Ensure both wireless bands are configured for each network",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const commands = result["/interface bridge port"];

        // Each network should have both 2.4GHz and 5GHz interfaces
        expect(
          commands.filter((cmd: string) => cmd.includes("wifi2.4-FRNLAN")),
        ).toHaveLength(1);
        expect(
          commands.filter((cmd: string) => cmd.includes("wifi5-FRNLAN")),
        ).toHaveLength(1);
        expect(
          commands.filter((cmd: string) => cmd.includes("wifi2.4-VPNLAN")),
        ).toHaveLength(1);
        expect(
          commands.filter((cmd: string) => cmd.includes("wifi5-VPNLAN")),
        ).toHaveLength(1);

        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should always use LANBridgeSplit bridge for all networks", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            Domestic: {} as WirelessConfigType,
            VPN: {} as WirelessConfigType,
            Split: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Verify all networks use LANBridgeSplit bridge",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const commands = result["/interface bridge port"];

        for (const command of commands) {
          expect(command).toContain("bridge=LANBridgeSplit");
          expect(command).not.toContain("bridge=LANBridgeVPN");
        }
        validateRouterConfig(result, ["/interface bridge port"]);
      });
    });

    describe("Router Config Structure Validation", () => {
      it("should return valid RouterConfig structure", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            VPN: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Validate RouterConfig structure for multimode configuration",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);

        expect(result).toHaveProperty("/interface bridge port");
        expect(Array.isArray(result["/interface bridge port"])).toBe(true);
        expect(
          result["/interface bridge port"].every(
            (cmd: string) => typeof cmd === "string",
          ),
        ).toBe(true);
        expect(
          result["/interface bridge port"].every((cmd: string) =>
            cmd.startsWith("add bridge="),
          ),
        ).toBe(true);
        validateRouterConfig(result, ["/interface bridge port"]);
      });

      it("should generate commands in consistent format", () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: {} as WirelessConfigType,
            Domestic: {} as WirelessConfigType,
          },
        };

        testWithOutput(
          "WirelessBridgePortsMulti",
          "Verify consistent command format across all generated commands",
          { wireless },
          () => WirelessBridgePortsMulti(wireless),
        );

        const result = WirelessBridgePortsMulti(wireless);
        const commands = result["/interface bridge port"];

        for (const command of commands) {
          // Each command should follow the pattern: add bridge=<bridge> interface=<interface>
          expect(command).toMatch(
            /^add bridge=LANBridgeSplit interface=wifi(2\.4|5)-\w+LAN$/,
          );
        }
        validateRouterConfig(result, ["/interface bridge port"]);
      });
    });
  });

  describe("CheckWireless", () => {
    it("should return false for undefined or empty config", () => {
      expect(CheckWireless(undefined as any)).toBe(false);
      expect(CheckWireless({})).toBe(false);
    });

    it("should return true if SingleMode is present", () => {
      expect(CheckWireless({ SingleMode: {} as WirelessConfigType })).toBe(
        true,
      );
    });

    it("should return true if MultiMode is present", () => {
      expect(CheckWireless({ MultiMode: {} })).toBe(true);
    });
  });
});
