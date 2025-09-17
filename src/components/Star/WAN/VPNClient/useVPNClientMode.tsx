import { useContext, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export interface UseVPNClientModeReturn {
  vpnMode: { value: "easy" | "advanced" };
}

export const useVPNClientMode = (): UseVPNClientModeReturn => {
  const starContext = useContext(StarContext);

  // Get mode from global Choose.Mode since VPNClient doesn't have a mode property
  const vpnMode = useComputed$(() => {
    const globalMode = starContext.state.Choose.Mode;
    
    // If global mode is "advance", VPNClient should be in advanced mode
    if (globalMode === "advance") {
      return "advanced";
    }
    
    // Otherwise, default to easy mode
    return "easy";
  });

  return {
    vpnMode,
  };
};
