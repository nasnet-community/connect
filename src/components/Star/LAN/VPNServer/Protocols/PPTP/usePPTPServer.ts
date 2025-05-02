import { $ } from "@builder.io/qwik";
import type { PptpServerConfig } from "../../../../StarContext/LANType";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";

export const usePPTPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const pptpState = vpnServerState.PptpServer || {
    Profile: "default",
    Authentication: ["mschap2", "mschap1"],
    MaxMtu: 1450,
    MaxMru: 1450,
    KeepaliveTimeout: 30
  };


  const updatePPTPServer$ = $((config: Partial<PptpServerConfig>) => {
    const newConfig = {
      ...pptpState,
      ...config
    };
    
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