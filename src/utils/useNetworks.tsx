import { useContext, $ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { generateNetworks } from "./networksUtils";

/**
 * Hook to interact with Networks configuration in StarContext
 * Provides functions to update Networks based on current state
 */
export const useNetworks = () => {
  const starContext = useContext(StarContext);
  
  /**
   * Generates the Networks configuration based on current state
   * @returns NetworksConfig object with current network configuration
   */
  const generateCurrentNetworks$ = $(() => {
    return generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
  });
  
  /**
   * Gets the current Networks configuration
   * @returns Current Networks configuration generated from current state
   */
  const getCurrentNetworks$ = $(() => {
    return generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
  });
  
  /**
   * Checks if domestic link is available in current configuration
   * @returns true if domestic link is available
   */
  const hasDomesticLink$ = $(() => {
    const wanLinkType = starContext.state.Choose.WANLinkType;
    return wanLinkType === "domestic" || wanLinkType === "both";
  });
  
  /**
   * Gets the current VPN network names
   * @returns Array of VPN network names or empty array
   */
  const getVPNNetworkNames$ = $(() => {
    const networks = generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
    return networks.VPNNetworks || [];
  });
  
  /**
   * Gets the current base networks
   * @returns Array of base network names
   */
  const getBaseNetworks$ = $(() => {
    const networks = generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
    return networks.BaseNetworks;
  });
  
  /**
   * Gets the current Foreign network names
   * @returns Array of Foreign network names or empty array
   */
  const getForeignNetworkNames$ = $(() => {
    const networks = generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
    return networks.ForeignNetworks || [];
  });
  
  /**
   * Gets the current Domestic network names
   * @returns Array of Domestic network names or empty array
   */
  const getDomesticNetworkNames$ = $(() => {
    const networks = generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
    return networks.DomesticNetworks || [];
  });
  
  /**
   * Generates a preview of what the Networks configuration would be
   * based on current state
   * @returns NetworksConfig configuration preview
   */
  const previewNetworks$ = $(() => {
    return generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
  });
  
  return {
    generateCurrentNetworks$,
    getCurrentNetworks$,
    hasDomesticLink$,
    getVPNNetworkNames$,
    getBaseNetworks$,
    getForeignNetworkNames$,
    getDomesticNetworkNames$,
    previewNetworks$,
  };
};
