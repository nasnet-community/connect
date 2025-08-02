import { useContext, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export interface UseVPNClientModeReturn {
  vpnMode: { value: "easy" | "advanced" };
}

export const useVPNClientMode = (): UseVPNClientModeReturn => {
  const starContext = useContext(StarContext);

  // Get mode from StarContext or default to 'easy'
  const vpnMode = useComputed$(() => 
    starContext.state.WAN.VPNClient?.mode || "easy"
  );

  return {
    vpnMode,
  };
};
