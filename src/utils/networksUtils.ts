import type {
  Networks,
  NetworkName,
  BaseNetworks,
  VPNClientNetworks,
} from "~/components/Star/StarContext/Utils/Networks";
import type {
  WANLinkType
} from "~/components/Star/StarContext/ChooseType";
import type { VPNClient } from "~/components/Star/StarContext/Utils/VPNClientType";
import type { WANLinks } from "~/components/Star/StarContext/WANType";

/**
 * Generates the Networks configuration based on the current state
 * @param wanLinkType - The WAN link type that determines if domestic link is available
 * @param wanLinks - The WAN links configuration containing Foreign and Domestic links
 * @param vpnClient - The VPN client configuration containing VPN connections
 * @returns Networks configuration with BaseNetworks, ForeignNetworks, DomesticNetworks, and VPNClientNetworks
 */
export const generateNetworks = (
  wanLinkType: WANLinkType,
  wanLinks?: WANLinks,
  vpnClient?: VPNClient
): Networks => {
  // Determine what networks are available
  const hasDomesticLink = wanLinkType === "domestic" || wanLinkType === "both";
  const hasForeignLinks = !!(wanLinks?.Foreign?.WANConfigs && wanLinks.Foreign.WANConfigs.length > 0);
  const hasVPNClients = !!(vpnClient && (
    (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) ||
    (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) ||
    (vpnClient.PPTP && vpnClient.PPTP.length > 0) ||
    (vpnClient.L2TP && vpnClient.L2TP.length > 0) ||
    (vpnClient.SSTP && vpnClient.SSTP.length > 0) ||
    (vpnClient.IKeV2 && vpnClient.IKeV2.length > 0)
  ));

  // Build BaseNetworks with proper logic
  // Split network is only added when Domestic exists AND (Foreign OR VPN exists)
  const baseNetworks: BaseNetworks = {
    Foreign: hasForeignLinks,
    VPN: hasVPNClients,
    Domestic: hasDomesticLink,
    Split: hasDomesticLink && (hasForeignLinks || hasVPNClients),
  };

  // Extract Foreign network names from WANLinks configuration
  const foreignNetworks: NetworkName[] = [];
  if (wanLinks?.Foreign?.WANConfigs && wanLinks.Foreign.WANConfigs.length > 0) {
    wanLinks.Foreign.WANConfigs.forEach((config, index) => {
      const name = config.name || `Foreign-Link-${index + 1}`;
      foreignNetworks.push(name);
    });
  }

  // Extract Domestic network names from WANLinks configuration (only if domestic link is available)
  const domesticNetworks: NetworkName[] = [];
  if (hasDomesticLink && wanLinks?.Domestic?.WANConfigs && wanLinks.Domestic.WANConfigs.length > 0) {
    wanLinks.Domestic.WANConfigs.forEach((config, index) => {
      const name = config.name || `Domestic-Link-${index + 1}`;
      domesticNetworks.push(name);
    });
  }

  // Extract VPN client names grouped by protocol
  const vpnClientNetworks: VPNClientNetworks = {};

  if (vpnClient) {
    // Add Wireguard client names
    if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
      vpnClientNetworks.Wireguard = vpnClient.Wireguard.map((config, index) =>
        config.Name || `Wireguard-${index + 1}`
      );
    }

    // Add OpenVPN client names
    if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
      vpnClientNetworks.OpenVPN = vpnClient.OpenVPN.map((config, index) =>
        config.Name || `OpenVPN-${index + 1}`
      );
    }

    // Add PPTP client names
    if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
      vpnClientNetworks.PPTP = vpnClient.PPTP.map((config, index) =>
        config.Name || `PPTP-${index + 1}`
      );
    }

    // Add L2TP client names
    if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
      vpnClientNetworks.L2TP = vpnClient.L2TP.map((config, index) =>
        config.Name || `L2TP-${index + 1}`
      );
    }

    // Add SSTP client names
    if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
      vpnClientNetworks.SSTP = vpnClient.SSTP.map((config, index) =>
        config.Name || `SSTP-${index + 1}`
      );
    }

    // Add IKeV2 client names
    if (vpnClient.IKeV2 && vpnClient.IKeV2.length > 0) {
      vpnClientNetworks.IKev2 = vpnClient.IKeV2.map((config, index) =>
        config.Name || `IKev2-${index + 1}`
      );
    }
  }

  return {
    BaseNetworks: baseNetworks,
    ForeignNetworks: foreignNetworks.length > 0 ? foreignNetworks : undefined,
    DomesticNetworks: domesticNetworks.length > 0 ? domesticNetworks : undefined,
    VPNClientNetworks: Object.keys(vpnClientNetworks).length > 0 ? vpnClientNetworks : undefined,
  };
};

/**
 * Checks if the domestic link is available based on WANLinkType
 * @param wanLinkType - The WAN link type
 * @returns true if domestic link is available
 */
export const hasDomesticLink = (wanLinkType: WANLinkType): boolean => {
  return wanLinkType === "domestic" || wanLinkType === "both";
};

/**
 * Gets the available base networks based on configuration
 * @param wanLinkType - The WAN link type
 * @param hasForeign - Whether foreign links are configured
 * @param hasVPN - Whether VPN clients are configured
 * @returns BaseNetworks object with availability flags
 */
export const getAvailableBaseNetworks = (
  wanLinkType: WANLinkType,
  hasForeign: boolean = false,
  hasVPN: boolean = false
): BaseNetworks => {
  const domestic = hasDomesticLink(wanLinkType);

  return {
    Foreign: hasForeign,
    VPN: hasVPN,
    Domestic: domestic,
    Split: domestic && (hasForeign || hasVPN),
  };
};

/**
 * Extracts Foreign network names from WANLinks configuration
 * @param wanLinks - The WAN links configuration
 * @returns Array of Foreign network names
 */
export const getForeignNetworkNames = (wanLinks?: WANLinks): string[] => {
  if (!wanLinks?.Foreign?.WANConfigs) return [];
  
  return wanLinks.Foreign.WANConfigs.map((config, index) => 
    config.name || `Foreign-Link-${index + 1}`
  );
};

/**
 * Extracts Domestic network names from WANLinks configuration
 * @param wanLinks - The WAN links configuration
 * @param wanLinkType - The WAN link type to check if domestic is available
 * @returns Array of Domestic network names
 */
export const getDomesticNetworkNames = (wanLinks?: WANLinks, wanLinkType?: WANLinkType): string[] => {
  if (!wanLinkType || !hasDomesticLink(wanLinkType)) return [];
  if (!wanLinks?.Domestic?.WANConfigs) return [];
  
  return wanLinks.Domestic.WANConfigs.map((config, index) => 
    config.name || `Domestic-Link-${index + 1}`
  );
};

/**
 * Extracts VPN network names grouped by protocol from VPNClient configuration
 * @param vpnClient - The VPN client configuration
 * @returns VPNClientNetworks object with protocol-specific network arrays
 */
export const getVPNClientNetworks = (vpnClient?: VPNClient): VPNClientNetworks => {
  if (!vpnClient) return {};

  const vpnClientNetworks: VPNClientNetworks = {};

  // Add Wireguard client names
  if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
    vpnClientNetworks.Wireguard = vpnClient.Wireguard.map((config, index) =>
      config.Name || `Wireguard-${index + 1}`
    );
  }

  // Add OpenVPN client names
  if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
    vpnClientNetworks.OpenVPN = vpnClient.OpenVPN.map((config, index) =>
      config.Name || `OpenVPN-${index + 1}`
    );
  }

  // Add PPTP client names
  if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
    vpnClientNetworks.PPTP = vpnClient.PPTP.map((config, index) =>
      config.Name || `PPTP-${index + 1}`
    );
  }

  // Add L2TP client names
  if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
    vpnClientNetworks.L2TP = vpnClient.L2TP.map((config, index) =>
      config.Name || `L2TP-${index + 1}`
    );
  }

  // Add SSTP client names
  if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
    vpnClientNetworks.SSTP = vpnClient.SSTP.map((config, index) =>
      config.Name || `SSTP-${index + 1}`
    );
  }

  // Add IKeV2 client names
  if (vpnClient.IKeV2 && vpnClient.IKeV2.length > 0) {
    vpnClientNetworks.IKev2 = vpnClient.IKeV2.map((config, index) =>
      config.Name || `IKev2-${index + 1}`
    );
  }

  return vpnClientNetworks;
};
