import type { Networks } from "~/components/Star/StarContext/Utils/Networks";

export interface NetworkOption {
  value: string;
  label: string;
  category?: string;
}

/**
 * Builds network options from the Networks structure for game routing selection
 * Excludes Split network as per requirements
 */
export const buildNetworkOptions = (networks?: Networks): NetworkOption[] => {
  const options: NetworkOption[] = [];

  if (!networks) {
    return options;
  }

  // Add Base Networks (exclude Split)
  if (networks.BaseNetworks) {
    if (networks.BaseNetworks.Domestic) {
      options.push({ value: "Domestic", label: $localize`Domestic`, category: "Base" });
    }
    if (networks.BaseNetworks.Foreign) {
      options.push({ value: "Foreign", label: $localize`Foreign`, category: "Base" });
    }
    if (networks.BaseNetworks.VPN) {
      options.push({ value: "VPN", label: $localize`VPN`, category: "Base" });
    }
  }

  // Add Foreign Networks (multiple WAN links)
  if (networks.ForeignNetworks && networks.ForeignNetworks.length > 0) {
    networks.ForeignNetworks.forEach((networkName) => {
      options.push({
        value: networkName,
        label: networkName,
        category: "Foreign Links",
      });
    });
  }

  // Add Domestic Networks (multiple WAN links)
  if (networks.DomesticNetworks && networks.DomesticNetworks.length > 0) {
    networks.DomesticNetworks.forEach((networkName) => {
      options.push({
        value: networkName,
        label: networkName,
        category: "Domestic Links",
      });
    });
  }

  // Add VPN Client Networks
  if (networks.VPNClientNetworks) {
    const vpnClients = networks.VPNClientNetworks;

    if (vpnClients.Wireguard && vpnClients.Wireguard.length > 0) {
      vpnClients.Wireguard.forEach((networkName) => {
        options.push({
          value: networkName,
          label: `${networkName} (Wireguard)`,
          category: "VPN Clients",
        });
      });
    }

    if (vpnClients.OpenVPN && vpnClients.OpenVPN.length > 0) {
      vpnClients.OpenVPN.forEach((networkName) => {
        options.push({
          value: networkName,
          label: `${networkName} (OpenVPN)`,
          category: "VPN Clients",
        });
      });
    }

    if (vpnClients.L2TP && vpnClients.L2TP.length > 0) {
      vpnClients.L2TP.forEach((networkName) => {
        options.push({
          value: networkName,
          label: `${networkName} (L2TP)`,
          category: "VPN Clients",
        });
      });
    }

    if (vpnClients.PPTP && vpnClients.PPTP.length > 0) {
      vpnClients.PPTP.forEach((networkName) => {
        options.push({
          value: networkName,
          label: `${networkName} (PPTP)`,
          category: "VPN Clients",
        });
      });
    }

    if (vpnClients.SSTP && vpnClients.SSTP.length > 0) {
      vpnClients.SSTP.forEach((networkName) => {
        options.push({
          value: networkName,
          label: `${networkName} (SSTP)`,
          category: "VPN Clients",
        });
      });
    }

    if (vpnClients.IKev2 && vpnClients.IKev2.length > 0) {
      vpnClients.IKev2.forEach((networkName) => {
        options.push({
          value: networkName,
          label: `${networkName} (IKev2)`,
          category: "VPN Clients",
        });
      });
    }
  }

  return options;
};

/**
 * Groups network options by category for better UI organization
 */
export const groupNetworkOptions = (
  options: NetworkOption[],
): Record<string, NetworkOption[]> => {
  const grouped: Record<string, NetworkOption[]> = {};

  options.forEach((option) => {
    const category = option.category || "Other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(option);
  });

  return grouped;
};
