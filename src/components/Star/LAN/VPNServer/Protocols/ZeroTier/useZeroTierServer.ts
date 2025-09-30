import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Networks } from "../../../../StarContext/CommonType";

export const useZeroTierServer = () => {
  const starContext = useContext(StarContext);
  const vpnServer = starContext.state.LAN.VPNServer;

  // Initialize ZeroTier server config if not exists
  if (!vpnServer?.ZeroTierServer) {
    if (vpnServer) {
      vpnServer.ZeroTierServer = {
        enabled: false,
        Network: "Split" as Networks,
        ZeroTierNetworkID: "",
      };
    }
  }

  return {
    advancedFormState: vpnServer?.ZeroTierServer || {
      enabled: false,
      Network: "Split" as Networks,
      ZeroTierNetworkID: "",
    },
  };
};