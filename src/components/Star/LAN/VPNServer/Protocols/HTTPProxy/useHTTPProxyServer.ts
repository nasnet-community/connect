import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Networks } from "../../../../StarContext/CommonType";

export const useHTTPProxyServer = () => {
  const starContext = useContext(StarContext);
  const vpnServer = starContext.state.LAN.VPNServer;

  // Initialize HTTP Proxy server config if not exists
  if (!vpnServer?.HTTPProxyServer) {
    if (vpnServer) {
      vpnServer.HTTPProxyServer = {
        enabled: false,
        Port: 8080,
        Network: "Split" as Networks,
      };
    }
  }

  return {
    advancedFormState: vpnServer?.HTTPProxyServer || {
      enabled: false,
      Port: 8080,
      Network: "Split" as Networks,
    },
  };
};