import { useSignal, useContext, $, useComputed$, useTask$, type QRL } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export interface UseVPNClientEnabledReturn {
  enabled: { value: string };
  hasForeignLink: { value: boolean };
  handleToggle$: QRL<(value: string) => Promise<void>>;
}

/**
 * Hook to manage VPNClient enabled/disabled state
 *
 * When user has Foreign Links, VPNClient is always required (toggle hidden)
 * When user has only Domestic Links, toggle is shown and user can disable VPNClient
 */
export const useVPNClientEnabled = (): UseVPNClientEnabledReturn => {
  const starContext = useContext(StarContext);

  // Check if user has foreign link
  const hasForeignLink = useComputed$(() => {
    const wanLinkType = starContext.state.Choose.WANLinkType;
    return wanLinkType === "foreign" || wanLinkType === "both";
  });

  // Local state for enabled/disabled (stored as string for SegmentedControl)
  const enabled = useSignal("true");

  // Initialize from existing VPNClient config
  useTask$(({ track }) => {
    track(() => starContext.state.WAN.VPNClient);

    const hasVPNClient = Boolean(starContext.state.WAN.VPNClient);
    enabled.value = hasVPNClient ? "true" : "true"; // Default to enabled
  });

  // Handler to toggle and clear VPNClient when disabled
  const handleToggle$ = $(async (value: string) => {
    enabled.value = value;

    if (value === "false") {
      // Clear VPNClient from StarContext when disabled
      await starContext.updateWAN$({ VPNClient: undefined });
    }
  });

  return {
    enabled,
    hasForeignLink,
    handleToggle$
  };
};
