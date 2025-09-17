import type { 
  Networks
} from "~/components/Star/StarContext/CommonType";
import type { 
  WANLinkType 
} from "~/components/Star/StarContext/ChooseType";
import type { VPNClient } from "~/components/Star/StarContext/Utils/VPNClientType";
import type { WANLinks } from "~/components/Star/StarContext/WANType";

// Define the Networks configuration interface
export interface NetworksConfig {
  BaseNetworks: Networks[];
  ForeignNetworks?: string[];
  DomesticNetworks?: string[];
  VPNNetworks?: string[];
}

/**
 * Generates the Networks configuration based on the current state
 * @param wanLinkType - The WAN link type that determines if domestic link is available
 * @param wanLinks - The WAN links configuration containing Foreign and Domestic links
 * @param vpnClient - The VPN client configuration containing VPN connections
 * @returns Networks configuration with BaseNetworks, ForeignNetworks, DomesticNetworks, and VPNNetworks
 */
export const generateNetworks = (
  wanLinkType: WANLinkType,
  wanLinks?: WANLinks,
  vpnClient?: VPNClient
): NetworksConfig => {
  // Determine BaseNetworks based on WANLinkType
  const baseNetworks: Networks[] = ["Foreign", "VPN"];
  
  // Add Domestic and Split networks only if domestic link is available
  const hasDomesticLink = wanLinkType === "domestic" || wanLinkType === "both";
  
  if (hasDomesticLink) {
    baseNetworks.push("Domestic", "Split");
  }
  
  // Extract Foreign network names from WANLinks configuration
  const foreignNetworks: string[] = [];
  if (wanLinks?.Foreign?.WANConfigs && wanLinks.Foreign.WANConfigs.length > 0) {
    wanLinks.Foreign.WANConfigs.forEach((config, index) => {
      const name = config.name || `Foreign-Link-${index + 1}`;
      foreignNetworks.push(name);
    });
  }
  
  // Extract Domestic network names from WANLinks configuration (only if domestic link is available)
  const domesticNetworks: string[] = [];
  if (hasDomesticLink && wanLinks?.Domestic?.WANConfigs && wanLinks.Domestic.WANConfigs.length > 0) {
    wanLinks.Domestic.WANConfigs.forEach((config, index) => {
      const name = config.name || `Domestic-Link-${index + 1}`;
      domesticNetworks.push(name);
    });
  }
  
  // Extract VPN client names from VPNClient configuration
  const vpnNetworks: string[] = [];
  
  if (vpnClient) {
    // Add Wireguard client names
    if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
      vpnClient.Wireguard.forEach((_, index) => {
        vpnNetworks.push(`Wireguard-${index + 1}`);
      });
    }
    
    // Add OpenVPN client names
    if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
      vpnClient.OpenVPN.forEach((_, index) => {
        vpnNetworks.push(`OpenVPN-${index + 1}`);
      });
    }
    
    // Add PPTP client names
    if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
      vpnClient.PPTP.forEach((_, index) => {
        vpnNetworks.push(`PPTP-${index + 1}`);
      });
    }
    
    // Add L2TP client names
    if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
      vpnClient.L2TP.forEach((_, index) => {
        vpnNetworks.push(`L2TP-${index + 1}`);
      });
    }
    
    // Add SSTP client names
    if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
      vpnClient.SSTP.forEach((_, index) => {
        vpnNetworks.push(`SSTP-${index + 1}`);
      });
    }
    
    // Add IKeV2 client names
    if (vpnClient.IKeV2 && vpnClient.IKeV2.length > 0) {
      vpnClient.IKeV2.forEach((_, index) => {
        vpnNetworks.push(`IKeV2-${index + 1}`);
      });
    }
  }
  
  return {
    BaseNetworks: baseNetworks,
    ForeignNetworks: foreignNetworks.length > 0 ? foreignNetworks : undefined,
    DomesticNetworks: domesticNetworks.length > 0 ? domesticNetworks : undefined,
    VPNNetworks: vpnNetworks.length > 0 ? vpnNetworks : undefined
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
 * Gets the available base networks based on domestic link availability
 * @param wanLinkType - The WAN link type
 * @returns Array of available BaseNetworks
 */
export const getAvailableBaseNetworks = (wanLinkType: WANLinkType): Networks[] => {
  const baseNetworks: Networks[] = ["Foreign", "VPN"];
  
  if (hasDomesticLink(wanLinkType)) {
    baseNetworks.push("Domestic", "Split");
  }
  
  return baseNetworks;
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
 * Extracts VPN network names from VPNClient configuration
 * @param vpnClient - The VPN client configuration
 * @returns Array of VPN network names
 */
export const getVPNNetworkNames = (vpnClient?: VPNClient): string[] => {
  if (!vpnClient) return [];
  
  const vpnNetworks: string[] = [];
  
  // Helper function to add VPN clients with proper naming
  const addVPNClients = (clients: any[] | undefined, type: string) => {
    if (clients && clients.length > 0) {
      clients.forEach((_, index) => {
        vpnNetworks.push(`${type}-${index + 1}`);
      });
    }
  };
  
  addVPNClients(vpnClient.Wireguard, "Wireguard");
  addVPNClients(vpnClient.OpenVPN, "OpenVPN");
  addVPNClients(vpnClient.PPTP, "PPTP");
  addVPNClients(vpnClient.L2TP, "L2TP");
  addVPNClients(vpnClient.SSTP, "SSTP");
  addVPNClients(vpnClient.IKeV2, "IKeV2");
  
  return vpnNetworks;
};
