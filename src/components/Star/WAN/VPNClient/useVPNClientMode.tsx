import { useContext, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export interface UseVPNClientModeReturn {
  vpnMode: { value: "easy" | "advanced" };
}

export const useVPNClientMode = (): UseVPNClientModeReturn => {
  const starContext = useContext(StarContext);

  // Get mode from global Choose.Mode first, then VPNClient.mode, or default to 'easy'
  const vpnMode = useComputed$(() => {
    const globalMode = starContext.state.Choose.Mode;
    const vpnClientMode = starContext.state.WAN.VPNClient?.mode;
    
    // If global mode is "advance", VPNClient should be in advanced mode
    if (globalMode === "advance") {
      return "advanced";
    }
    
    // Otherwise, use the VPNClient specific mode or default to easy
    return vpnClientMode || "easy";
  });

  return {
    vpnMode,
  };
};
