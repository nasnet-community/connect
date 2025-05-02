import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { L2tpServerConfig } from "../../../../StarContext/LANType";

export const useL2TPServer = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const l2tpState = vpnServerState.L2tpServer || {
    Profile: "default",
    UseIpsec: "required",
    IpsecSecret: "",
    Authentication: ["mschap2", "mschap1"],
    MaxMtu: 1450,
    MaxMru: 1450,
    KeepaliveTimeout: 30,
    OneSessionPerHost: true
  };

  const secretError = useSignal("");
  const profileError = useSignal("");
  

  const updateL2TPServer$ = $((config: Partial<L2tpServerConfig>) => {
    const newConfig = {
      ...l2tpState,
      ...config
    };
    
    let isValid = true;
    
    if ((newConfig.UseIpsec === "required" || newConfig.UseIpsec === "yes") && 
        (!newConfig.IpsecSecret || !newConfig.IpsecSecret.trim())) {
      secretError.value = $localize`IPsec secret is required`;
      isValid = false;
    } else {
      secretError.value = "";
    }
    
    if (config.Profile !== undefined) {
      if (!newConfig.Profile || !newConfig.Profile.trim()) {
        profileError.value = $localize`Profile name is required`;
        isValid = false;
      } else {
        profileError.value = "";
      }
    }
    
    if (isValid || config.Profile === "") {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          L2tpServer: config.Profile === "" ? undefined : newConfig
        }
      });
    }
  });

  return {
    l2tpState,
    updateL2TPServer$,
    secretError,
    profileError
  };
}; 