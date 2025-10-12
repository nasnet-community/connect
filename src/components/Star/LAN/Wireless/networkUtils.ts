import type { Networks } from "../../StarContext/Utils/Networks";
import type { WifiTarget } from "../../StarContext/LANType";

export interface NetworkOption {
  name: string;
  category: string;
  wifiTarget: WifiTarget;
  displayName: string;
}

/**
 * Extracts all available networks from Networks state
 * @param networks - Networks object from StarContext
 * @returns Array of network options
 */
export function getAvailableNetworks(networks: Networks | undefined): NetworkOption[] {
  if (!networks) return [];

  const options: NetworkOption[] = [];

  // Add base networks
  if (networks.BaseNetworks) {
    if (networks.BaseNetworks.Foreign) {
      options.push({
        name: "Foreign",
        category: "Base",
        wifiTarget: "Foreign",
        displayName: $localize`Foreign Network`,
      });
    }
    if (networks.BaseNetworks.Domestic) {
      options.push({
        name: "Domestic",
        category: "Base",
        wifiTarget: "Domestic",
        displayName: $localize`Domestic Network`,
      });
    }
    if (networks.BaseNetworks.Split) {
      options.push({
        name: "Split",
        category: "Base",
        wifiTarget: "Split",
        displayName: $localize`Split Network`,
      });
    }
    if (networks.BaseNetworks.VPN) {
      options.push({
        name: "VPN",
        category: "Base",
        wifiTarget: "VPN",
        displayName: $localize`VPN Network`,
      });
    }
  }

  // Add extra Foreign networks
  if (networks.ForeignNetworks && Array.isArray(networks.ForeignNetworks)) {
    networks.ForeignNetworks.forEach((networkName) => {
      options.push({
        name: networkName,
        category: "Foreign",
        wifiTarget: "Foreign",
        displayName: networkName,
      });
    });
  }

  // Add extra Domestic networks
  if (networks.DomesticNetworks && Array.isArray(networks.DomesticNetworks)) {
    networks.DomesticNetworks.forEach((networkName) => {
      options.push({
        name: networkName,
        category: "Domestic",
        wifiTarget: "Domestic",
        displayName: networkName,
      });
    });
  }

  // Add VPN Client networks
  if (networks.VPNClientNetworks) {
    const vpnClient = networks.VPNClientNetworks;

    if (vpnClient.Wireguard && Array.isArray(vpnClient.Wireguard)) {
      vpnClient.Wireguard.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Client (Wireguard)",
          wifiTarget: "VPN",
          displayName: `${networkName} (WireGuard)`,
        });
      });
    }

    if (vpnClient.OpenVPN && Array.isArray(vpnClient.OpenVPN)) {
      vpnClient.OpenVPN.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Client (OpenVPN)",
          wifiTarget: "VPN",
          displayName: `${networkName} (OpenVPN)`,
        });
      });
    }

    if (vpnClient.L2TP && Array.isArray(vpnClient.L2TP)) {
      vpnClient.L2TP.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Client (L2TP)",
          wifiTarget: "VPN",
          displayName: `${networkName} (L2TP)`,
        });
      });
    }

    if (vpnClient.PPTP && Array.isArray(vpnClient.PPTP)) {
      vpnClient.PPTP.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Client (PPTP)",
          wifiTarget: "VPN",
          displayName: `${networkName} (PPTP)`,
        });
      });
    }

    if (vpnClient.SSTP && Array.isArray(vpnClient.SSTP)) {
      vpnClient.SSTP.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Client (SSTP)",
          wifiTarget: "VPN",
          displayName: `${networkName} (SSTP)`,
        });
      });
    }

    if (vpnClient.IKev2 && Array.isArray(vpnClient.IKev2)) {
      vpnClient.IKev2.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Client (IKEv2)",
          wifiTarget: "VPN",
          displayName: `${networkName} (IKEv2)`,
        });
      });
    }
  }

  // Add VPN Server networks (Wireguard and OpenVPN support multiple instances)
  if (networks.VPNServerNetworks) {
    const vpnServer = networks.VPNServerNetworks;

    if (vpnServer.Wireguard && Array.isArray(vpnServer.Wireguard)) {
      vpnServer.Wireguard.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Server (Wireguard)",
          wifiTarget: "VPN",
          displayName: `${networkName} (WireGuard Server)`,
        });
      });
    }

    if (vpnServer.OpenVPN && Array.isArray(vpnServer.OpenVPN)) {
      vpnServer.OpenVPN.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "VPN Server (OpenVPN)",
          wifiTarget: "VPN",
          displayName: `${networkName} (OpenVPN Server)`,
        });
      });
    }
  }

  // Add Tunnel networks
  if (networks.TunnelNetworks) {
    const tunnel = networks.TunnelNetworks;

    if (tunnel.IPIP && Array.isArray(tunnel.IPIP)) {
      tunnel.IPIP.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "Tunnel (IPIP)",
          wifiTarget: "VPN",
          displayName: `${networkName} (IPIP)`,
        });
      });
    }

    if (tunnel.Eoip && Array.isArray(tunnel.Eoip)) {
      tunnel.Eoip.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "Tunnel (EoIP)",
          wifiTarget: "VPN",
          displayName: `${networkName} (EoIP)`,
        });
      });
    }

    if (tunnel.Gre && Array.isArray(tunnel.Gre)) {
      tunnel.Gre.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "Tunnel (GRE)",
          wifiTarget: "VPN",
          displayName: `${networkName} (GRE)`,
        });
      });
    }

    if (tunnel.Vxlan && Array.isArray(tunnel.Vxlan)) {
      tunnel.Vxlan.forEach((networkName) => {
        options.push({
          name: networkName,
          category: "Tunnel (VXLAN)",
          wifiTarget: "VPN",
          displayName: `${networkName} (VXLAN)`,
        });
      });
    }
  }

  return options;
}

/**
 * Gets only extra networks (excludes the 4 base networks)
 * @param networks - Networks object from StarContext
 * @returns Array of extra network options only
 */
export function getExtraNetworks(networks: Networks | undefined): NetworkOption[] {
  const allNetworks = getAvailableNetworks(networks);
  const baseNetworkNames = ["Foreign", "Domestic", "Split", "VPN"];

  return allNetworks.filter(
    (network) => !baseNetworkNames.includes(network.name)
  );
}

/**
 * Determines WifiTarget from network name by checking which collection it belongs to
 * @param networkName - Name of the network (e.g., "Foreign2", "WG1")
 * @param networks - Networks object from StarContext
 * @returns WifiTarget for the network
 */
export function determineWifiTarget(
  networkName: string,
  networks: Networks | undefined
): WifiTarget {
  if (!networks) return "Foreign";

  // Check base networks
  if (networkName === "Foreign") return "Foreign";
  if (networkName === "Domestic") return "Domestic";
  if (networkName === "Split") return "Split";
  if (networkName === "VPN") return "VPN";

  // Check Foreign networks
  if (
    networks.ForeignNetworks &&
    networks.ForeignNetworks.includes(networkName)
  ) {
    return "Foreign";
  }

  // Check Domestic networks
  if (
    networks.DomesticNetworks &&
    networks.DomesticNetworks.includes(networkName)
  ) {
    return "Domestic";
  }

  // Check VPN Client networks
  if (networks.VPNClientNetworks) {
    const vpnClient = networks.VPNClientNetworks;
    for (const protocol of Object.values(vpnClient)) {
      if (Array.isArray(protocol) && protocol.includes(networkName)) {
        return "VPN";
      }
    }
  }

  // Check VPN Server networks
  if (networks.VPNServerNetworks) {
    const vpnServer = networks.VPNServerNetworks;
    if (vpnServer.Wireguard && vpnServer.Wireguard.includes(networkName)) {
      return "VPN";
    }
    if (vpnServer.OpenVPN && vpnServer.OpenVPN.includes(networkName)) {
      return "VPN";
    }
  }

  // Check Tunnel networks
  if (networks.TunnelNetworks) {
    const tunnel = networks.TunnelNetworks;
    for (const protocol of Object.values(tunnel)) {
      if (Array.isArray(protocol) && protocol.includes(networkName)) {
        return "VPN";
      }
    }
  }

  // Default fallback
  return "Foreign";
}

/**
 * Checks if a network name is a base network
 * @param networkName - Name to check
 * @returns true if it's one of the 4 base networks
 */
export function isBaseNetwork(networkName: string): boolean {
  const baseNetworkNames = ["Foreign", "Domestic", "Split", "VPN", "single-network"];
  return baseNetworkNames.includes(networkName);
}
