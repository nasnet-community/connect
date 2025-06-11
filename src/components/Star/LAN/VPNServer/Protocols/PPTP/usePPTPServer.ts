import { $ } from "@builder.io/qwik";
import type { PptpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";

export const usePPTPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const pptpState = vpnServerState.PptpServer || {
    enabled: true,
    DefaultProfile: "default",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450
    },
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
        PptpServer: config.DefaultProfile === "" ? undefined : newConfig 
      }
    });
  });

  return {
    pptpState,
    updatePPTPServer$
  };
}; 