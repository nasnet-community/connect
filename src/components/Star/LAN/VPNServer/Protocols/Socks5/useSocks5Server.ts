import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Networks } from "../../../../StarContext/CommonType";

export const useSocks5Server = () => {
  const starContext = useContext(StarContext);
  const vpnServer = starContext.state.LAN.VPNServer;

  // Initialize Socks5 server config if not exists
  if (!vpnServer?.Socks5Server) {
    if (vpnServer) {
      vpnServer.Socks5Server = {
        enabled: false,
        Port: 1080,
        Network: "Split" as Networks,
      };
    }
  }

  return {
    advancedFormState: vpnServer?.Socks5Server || {
      enabled: false,
      Port: 1080,
      Network: "Split" as Networks,
    },
  };
};