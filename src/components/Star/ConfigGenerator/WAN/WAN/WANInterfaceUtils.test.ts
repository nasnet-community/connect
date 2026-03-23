import { describe, expect, it } from "vitest";

import {
  CheckLTEInterface,
  GetWANInterface,
  GetWANInterfaceWName,
  GetWANInterfaces,
  InterfaceComment,
  getInterfaceConfigPath,
  getInterfaceType,
} from "./WANInterfaceUtils";

describe("WANInterfaceUtils", () => {
  // Verifies physical interface names are classified into the RouterOS interface families used by downstream config builders.
  it("classifies interface names by their physical transport type", () => {
    expect(getInterfaceType("ether1")).toBe("ethernet");
    expect(getInterfaceType("wifi2.4")).toBe("wifi");
    expect(getInterfaceType("sfp-sfpplus1")).toBe("sfp");
    expect(getInterfaceType("lte1")).toBe("lte");
    expect(getInterfaceType("bridge1")).toBeNull();
  });

  // Verifies SFP ports reuse the ethernet config path while the other interface families keep their own RouterOS section.
  it("maps interface families to the correct RouterOS configuration path", () => {
    expect(getInterfaceConfigPath("ethernet")).toBe("/interface ethernet");
    expect(getInterfaceConfigPath("wifi")).toBe("/interface wifi");
    expect(getInterfaceConfigPath("sfp")).toBe("/interface ethernet");
    expect(getInterfaceConfigPath("lte")).toBe("/interface lte");
  });

  // Verifies interface comments merge multiple WAN roles on a shared physical port and skip wireless-with-credentials or LTE links.
  it("builds consolidated interface comments for shared non-wireless WAN ports", () => {
    const result = InterfaceComment({
      Foreign: {
        WANConfigs: [
          { name: "Primary", InterfaceConfig: { InterfaceName: "ether1" } },
          {
            name: "WiFi-WAN",
            InterfaceConfig: {
              InterfaceName: "wifi2.4",
              WirelessCredentials: { SSID: "SSID", Password: "Secret" },
            },
          },
        ],
      },
      Domestic: {
        WANConfigs: [
          { name: "Local", InterfaceConfig: { InterfaceName: "ether1" } },
          { name: "LTE", InterfaceConfig: { InterfaceName: "lte1" } },
        ],
      },
    } as any);

    expect(result["/interface ethernet"]).toHaveLength(1);
    expect(result["/interface ethernet"][0]).toContain("default-name=ether1");
    expect(result["/interface ethernet"][0]).toContain(
      'comment="WAN - Primary(Foreign), Local(Domestic)"',
    );
    expect(result["/interface wifi"]).toBeUndefined();
    expect(result["/interface lte"]).toBeUndefined();
  });

  // Verifies WAN interface naming follows the current PPPoE, VLAN, MACVLAN, and LTE naming rules used by generated configs.
  it("derives final WAN interface names from connection and encapsulation settings", () => {
    expect(
      GetWANInterface({
        name: "Fiber",
        InterfaceConfig: { InterfaceName: "ether1" },
        ConnectionConfig: { pppoe: { username: "u", password: "p" } },
      } as any),
    ).toBe("pppoe-client-Fiber");

    expect(
      GetWANInterface({
        name: "Tagged",
        InterfaceConfig: { InterfaceName: "ether2", VLANID: 110 },
      } as any),
    ).toBe("MacVLAN-VLAN110-ether2-Tagged-Tagged");

    expect(
      GetWANInterface({
        name: "LTE-Link",
        InterfaceConfig: { InterfaceName: "lte1" },
      } as any),
    ).toBe("lte1");
  });

  // Verifies named WAN lookups and list expansion reuse the same naming logic as single-link resolution.
  it("resolves WAN interfaces by link name and expands WANConfig arrays consistently", () => {
    const wanLinks = {
      Foreign: {
        WANConfigs: [
          { name: "Primary", InterfaceConfig: { InterfaceName: "ether1" } },
          {
            name: "Backup",
            InterfaceConfig: { InterfaceName: "ether2", MacAddress: "AA:BB:CC:DD:EE:FF" },
          },
        ],
      },
    } as any;

    expect(GetWANInterfaceWName(wanLinks, "Primary")).toBe("MacVLAN-ether1-Primary");
    expect(GetWANInterfaceWName(wanLinks, "Missing-Link")).toBe("Missing-Link");
    expect(GetWANInterfaces(wanLinks.Foreign)).toEqual([
      "MacVLAN-ether1-Primary",
      "MacVLAN-ether2-Backup",
    ]);
  });

  // Verifies LTE post-processing enables SMS only on configured LTE ports and disables any extra LTE modem discovered on the router.
  it("enables only the LTE interfaces referenced by WAN links and disables unused modems", () => {
    const result = CheckLTEInterface(
      {
        Foreign: {
          WANConfigs: [
            { name: "Cell", InterfaceConfig: { InterfaceName: "lte1" } },
          ],
        },
      } as any,
      ["lte1", "lte2"] as any,
    );

    expect(result["/tool sms"]).toEqual(["set port=lte1 receive-enabled=yes"]);
    expect(result["/interface lte"]).toEqual(["set lte2 disabled=yes"]);
  });
});
