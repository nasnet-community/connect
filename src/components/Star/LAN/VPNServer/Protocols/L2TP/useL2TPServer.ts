import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { L2tpServerConfig } from "../../../../StarContext/LANType";

export const useL2TPServer = () => {
  const starContext = useContext(StarContext);
  
  // Get the current VPN server state
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  // Get the current L2TP config or initialize with defaults
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

  // Error states for inputs
  const secretError = useSignal("");
  const profileError = useSignal("");
  
  /**
   * Updates the L2TP server configuration and immediately persists to StarContext
   */
  const updateL2TPServer$ = $((config: Partial<L2tpServerConfig>) => {
    const newConfig = {
      ...l2tpState,
      ...config
    };
    
    let isValid = true;
    
    // Validate IPsec secret if needed
    if ((newConfig.UseIpsec === "required" || newConfig.UseIpsec === "yes") && 
        (!newConfig.IpsecSecret || !newConfig.IpsecSecret.trim())) {
      secretError.value = $localize`IPsec secret is required`;
      isValid = false;
    } else {
      secretError.value = "";
    }
    
    // Validate profile
    if (config.Profile !== undefined) {
      if (!newConfig.Profile || !newConfig.Profile.trim()) {
        profileError.value = $localize`Profile name is required`;
        isValid = false;
      } else {
        profileError.value = "";
      }
    }
    
    // Only update if validation passes or we're disabling by setting empty profile
    if (isValid || config.Profile === "") {
      starContext.updateLAN$({ 
        VPNServer: {
          // Preserve existing users and other protocols
          ...vpnServerState,
          // Update L2TP config
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