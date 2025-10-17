import { useContext, $ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { generateSubnets } from "./subnetsUtils";

/**
 * Hook to interact with Subnets configuration in StarContext
 * Provides functions to update Subnets based on current Networks state
 */
export const useSubnets = () => {
  const starContext = useContext(StarContext);

  /**
   * Generates the Subnets configuration based on current Networks state
   * and saves it to StarContext, preserving existing user configurations
   * @returns Subnets object with current subnet configuration
   */
  const generateCurrentSubnets$ = $(() => {
    const networks = starContext.state.Choose.Networks;

    // Only generate if Networks exists
    if (!networks) return;

    // Get existing subnets to preserve user configurations
    const existingSubnets = starContext.state.LAN.Subnets;

    // Generate new subnets structure
    const subnets = generateSubnets(networks, existingSubnets);

    // Update StarContext with generated subnets
    starContext.updateLAN$({ Subnets: subnets });

    return subnets;
  });

  /**
   * Gets the current Subnets configuration
   * @returns Current Subnets configuration generated from current state
   */
  const getCurrentSubnets$ = $(() => {
    const networks = starContext.state.Choose.Networks;
    if (!networks) return undefined;

    const existingSubnets = starContext.state.LAN.Subnets;
    return generateSubnets(networks, existingSubnets);
  });

  /**
   * Checks if subnets are configured
   * @returns true if subnets are configured
   */
  const hasSubnetsConfigured$ = $(() => {
    const subnets = starContext.state.LAN.Subnets;
    return !!(subnets && Object.keys(subnets).length > 0);
  });

  /**
   * Generates a preview of what the Subnets configuration would be
   * based on current state without saving
   * @returns Subnets configuration preview
   */
  const previewSubnets$ = $(() => {
    const networks = starContext.state.Choose.Networks;
    if (!networks) return undefined;

    const existingSubnets = starContext.state.LAN.Subnets;
    return generateSubnets(networks, existingSubnets);
  });

  return {
    generateCurrentSubnets$,
    getCurrentSubnets$,
    hasSubnetsConfigured$,
    previewSubnets$,
  };
};

