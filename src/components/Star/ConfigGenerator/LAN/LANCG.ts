import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterConfig } from "../ConfigGenerator";
import { WirelessConfig } from "./Wireless/Wireless";
import { DisableInterfaces } from "./Wireless/WirelessUtil";
import type { EthernetInterfaceConfig } from "~/components/Star/StarContext/LANType";
import { TunnelWrapper } from "./TunnelCG";
import { VPNServerWrapper } from "./VPNServer/VPNServerWrapper";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";
import { hasWirelessInterfaces } from "./Wireless/WirelessUtil";
import { calculateSubnetInfo } from "../utils/IPAddress";

export const IPv6 = (): RouterConfig => {
  const config: RouterConfig = {
    "/ipv6 settings": ["set disable-ipv6=yes"],
    "/ipv6 firewall filter": [
      "add chain=input action=drop",
      "add chain=forward action=drop",
    ],
  };

  return config;
};

export const EthernetBridgePorts = (
  Ethernet: EthernetInterfaceConfig[],
): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge port": [],
  };

  // Map network types to bridge names
  const bridgeNameMap: Record<string, string> = {
    Foreign: "FRN",
    Domestic: "DOM",
    VPN: "VPN",
    Split: "Split",
  };

  Ethernet.forEach((iface) => {
    const bridgeName = bridgeNameMap[iface.bridge] || iface.bridge;
    config["/interface bridge port"].push(
      `add bridge=LANBridge${bridgeName} interface=${iface.name}`,
    );
  });

  return config;
};

export const SubnetIPConfigurations = (
  subnets: Record<string, string> | undefined,
): RouterConfig => {
  if (!subnets) return {};

  const config: RouterConfig = {
    "/ip address": [],
  };

  // Map network types to bridge names
  const bridgeNameMap: Record<string, string> = {
    Foreign: "FRN",
    Domestic: "DOM",
    VPN: "VPN",
    Split: "Split",
  };

  Object.entries(subnets).forEach(([networkType, subnet]) => {
    const subnetInfo = calculateSubnetInfo(
      subnet.split("/")[0],
      subnet.split("/")[1],
    );
    if (!subnetInfo) return;

    // For base networks (DOM, FRN, VPN, Split)
    if (bridgeNameMap[networkType]) {
      const bridgeName = bridgeNameMap[networkType];
      config["/ip address"].push(
        `add address=${subnetInfo.firstHostAddress}/${subnetInfo.prefixLength} interface=LANBridge${bridgeName} network=${subnetInfo.networkAddress}`,
      );
    }
    // For VPN servers - these will be handled by VPNServerWrapper
    // For tunnels - these will be handled by TunnelWrapper
  });

  return config;
};

export const LANCG = (state: StarState): RouterConfig => {
  const configs: RouterConfig[] = [IPv6()];

  // Use helper function for backwards compatibility
  const hasDomesticLink = state.Choose.WANLinkType === "domestic-only" || state.Choose.WANLinkType === "both";

  // Only configure wireless if router models have wireless interfaces AND LAN.Wireless is defined
  const hasWireless = hasWirelessInterfaces(state.Choose.RouterModels);

  if (hasWireless) {
    if (state.LAN.Wireless) {
      configs.push(
        WirelessConfig(
          state.LAN.Wireless,
          state.WAN.WANLink,
          hasDomesticLink,
        ),
      );
    } else {
      // Only disable interfaces if the router actually has wireless interfaces
      configs.push(DisableInterfaces());
    }
  }

  if (state.LAN.Tunnel) {
    configs.push(TunnelWrapper(state.LAN.Tunnel));
  }

  if (state.LAN.VPNServer) {
    configs.push(VPNServerWrapper(state.LAN.VPNServer));
  }

  // Only add Ethernet bridge ports if LAN.Interface exists
  if (state.LAN.Interface && Array.isArray(state.LAN.Interface)) {
    configs.push(EthernetBridgePorts(state.LAN.Interface));
  }

  // Add subnet IP configurations if defined
  if (state.LAN.Subnets) {
    configs.push(SubnetIPConfigurations(state.LAN.Subnets));
  }

  return mergeMultipleConfigs(...configs);
};
