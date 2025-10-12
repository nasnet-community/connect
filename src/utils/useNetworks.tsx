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
   * and saves it to StarContext
   * @returns Networks object with current network configuration
   */
  const generateCurrentNetworks$ = $(() => {
    const networks = generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );

    // Update StarContext with generated networks
    starContext.updateChoose$({ Networks: networks });

    return networks;
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
   * Gets the current VPN client networks grouped by protocol
   * @returns VPNClientNetworks object with protocol-specific arrays or empty object
   */
  const getVPNClientNetworks$ = $(() => {
    const networks = generateNetworks(
      starContext.state.Choose.WANLinkType,
      starContext.state.WAN.WANLink,
      starContext.state.WAN.VPNClient
    );
    return networks.VPNClientNetworks || {};
  });
  
  /**
   * Gets the current base networks
   * @returns BaseNetworks object with availability flags
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
   * @returns Networks configuration preview
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
    getVPNClientNetworks$,
    getBaseNetworks$,
    getForeignNetworkNames$,
    getDomesticNetworkNames$,
    previewNetworks$,
  };
};
