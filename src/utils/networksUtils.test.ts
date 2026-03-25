import { describe, expect, it } from "vitest";

import {
  generateNetworks,
  getAvailableBaseNetworks,
  getDomesticNetworkNames,
  getForeignNetworkNames,
  getVPNClientNetworks,
  hasDomesticLink,
} from "./networksUtils";

const buildWanLinks = () =>
  ({
    Foreign: {
      WANConfigs: [
        { name: "ISP-Primary", InterfaceConfig: { InterfaceName: "ether1" } },
        { InterfaceConfig: { InterfaceName: "ether2" } },
      ],
    },
    Domestic: {
      WANConfigs: [
        { name: "Local-Primary", InterfaceConfig: { InterfaceName: "ether3" } },
      ],
    },
  }) as any;

const buildVpnClient = () =>
  ({
    Wireguard: [{ Name: "WG-Main" }],
    OpenVPN: [{}],
    IKeV2: [{ Name: "IKev2-Branch" }],
  }) as any;

describe("networksUtils", () => {
  // Verifies domestic-aware logic only treats domestic and dual-link modes as domestic-capable.
  it("detects whether the selected WAN mode includes a domestic uplink", () => {
    expect(hasDomesticLink("domestic")).toBe(true);
    expect(hasDomesticLink("both")).toBe(true);
    expect(hasDomesticLink("foreign")).toBe(false);
  });

  // Verifies the base-network availability flags derive Split from domestic plus either foreign or VPN connectivity.
  it("builds base-network availability flags from the current WAN and VPN inputs", () => {
    expect(getAvailableBaseNetworks("both", true, false)).toEqual({
      Foreign: true,
      VPN: false,
      Domestic: true,
      Split: true,
    });

    expect(getAvailableBaseNetworks("domestic", false, false)).toEqual({
      Foreign: false,
      VPN: false,
      Domestic: true,
      Split: false,
    });
  });

  // Verifies WAN link names fall back to numbered defaults when a config omits a label.
  it("extracts foreign and domestic network names with stable fallback labels", () => {
    const wanLinks = buildWanLinks();

    expect(getForeignNetworkNames(wanLinks)).toEqual([
      "ISP-Primary",
      "Foreign-Link-2",
    ]);
    expect(getDomesticNetworkNames(wanLinks, "both")).toEqual([
      "Local-Primary",
    ]);
    expect(getDomesticNetworkNames(wanLinks, "foreign")).toEqual([]);
  });

  // Verifies VPN client names are grouped by protocol and receive protocol-specific fallbacks when a name is missing.
  it("extracts VPN client networks by protocol using current fallback naming", () => {
    const result = getVPNClientNetworks(buildVpnClient());

    expect(result.Wireguard).toEqual(["WG-Main"]);
    expect(result.OpenVPN).toEqual(["OpenVPN-1"]);
    expect(result.IKev2).toEqual(["IKev2-Branch"]);
  });

  // Verifies the aggregate network object combines base flags, WAN labels, and VPN client labels into the current return shape.
  it("generates the complete Networks object for a dual-link router with VPN clients", () => {
    const result = generateNetworks("both", buildWanLinks(), buildVpnClient());

    expect(result.BaseNetworks).toEqual({
      Foreign: true,
      VPN: true,
      Domestic: true,
      Split: true,
    });
    expect(result.ForeignNetworks).toEqual(["ISP-Primary", "Foreign-Link-2"]);
    expect(result.DomesticNetworks).toEqual(["Local-Primary"]);
    expect(result.VPNClientNetworks).toEqual({
      Wireguard: ["WG-Main"],
      OpenVPN: ["OpenVPN-1"],
      IKev2: ["IKev2-Branch"],
    });
  });

  // Verifies Split stays disabled when the router has only a domestic uplink and no foreign or VPN path to split between.
  it("keeps Split disabled when domestic is the only available path", () => {
    const result = generateNetworks("domestic", {
      Domestic: {
        WANConfigs: [
          { name: "Local-Only", InterfaceConfig: { InterfaceName: "ether1" } },
        ],
      },
    } as any);

    expect(result.BaseNetworks).toEqual({
      Foreign: false,
      VPN: false,
      Domestic: true,
      Split: false,
    });
    expect(result.ForeignNetworks).toBeUndefined();
    expect(result.DomesticNetworks).toEqual(["Local-Only"]);
    expect(result.VPNClientNetworks).toBeUndefined();
  });
});
