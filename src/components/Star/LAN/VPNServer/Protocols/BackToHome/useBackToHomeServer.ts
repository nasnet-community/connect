import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Networks } from "../../../../StarContext/CommonType";

export const useBackToHomeServer = () => {
  const starContext = useContext(StarContext);
  const vpnServer = starContext.state.LAN.VPNServer;

  // Initialize BackToHome server config if not exists
  if (!vpnServer?.BackToHomeServer) {
    if (vpnServer) {
      vpnServer.BackToHomeServer = {
        enabled: false,
        Network: "Split" as Networks,
      };
    }
  }

  return {
    advancedFormState: vpnServer?.BackToHomeServer || {
      enabled: false,
      Network: "Split" as Networks,
    },
  };
};