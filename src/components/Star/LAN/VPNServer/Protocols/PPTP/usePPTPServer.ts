import { $ } from "@builder.io/qwik";
import type { PptpServerConfig } from "../../../../StarContext/LANType";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";

export const usePPTPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  // Get the current PPTP config or initialize with defaults
  const pptpState = vpnServerState.PptpServer || {
    Profile: "default",
    Authentication: ["mschap2", "mschap1"],
    MaxMtu: 1450,
    MaxMru: 1450,
    KeepaliveTimeout: 30
  };

  /**
   * Updates the PPTP server configuration
   */
  const updatePPTPServer$ = $((config: Partial<PptpServerConfig>) => {
    const newConfig = {
      ...pptpState,
      ...config
    };
    
    // Update the VPN server state directly
    starContext.updateLAN$({ 
      VPNServer: {
        ...vpnServerState,
        PptpServer: newConfig 
      }
    });
  });

  return {
    pptpState,
    updatePPTPServer$
  };
}; 