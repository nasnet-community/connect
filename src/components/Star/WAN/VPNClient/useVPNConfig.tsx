import { useSignal, useContext, $ } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export const useVPNConfig = () => {
  const starContext = useContext(StarContext);
  const config = useSignal("");
  const isValid = useSignal(false);
  const vpnType = useSignal<VPNType | "">("");
  const errorMessage = useSignal("");
  
  // Initialize vpnType from context if it exists
  if (starContext.state.WAN.VPNClient) {
    // Check which VPN type has configurations
    if (starContext.state.WAN.VPNClient.Wireguard?.length) {
      vpnType.value = "Wireguard";
      isValid.value = true;
    } else if (starContext.state.WAN.VPNClient.OpenVPN?.length) {
      vpnType.value = "OpenVPN";
      isValid.value = true;
    } else if (starContext.state.WAN.VPNClient.L2TP?.length) {
      vpnType.value = "L2TP";
      isValid.value = true;
    } else if (starContext.state.WAN.VPNClient.PPTP?.length) {
      vpnType.value = "PPTP";
      isValid.value = true;
    } else if (starContext.state.WAN.VPNClient.SSTP?.length) {
      vpnType.value = "SSTP";
      isValid.value = true;
    } else if (starContext.state.WAN.VPNClient.IKeV2?.length) {
      vpnType.value = "IKeV2";
      isValid.value = true;
    }
  }
  
  // Save VPN selection to context
  const saveVPNSelection$ = $(async () => {
    // Make sure there's a VPN type selected
    if (!vpnType.value) {
      errorMessage.value = "Please select a VPN type";
      return false;
    }
    
    // Make sure the configuration is valid
    if (!isValid.value) {
      errorMessage.value = "Please complete the VPN configuration";
      return false;
    }
    
    // Get current VPNClient configuration from context
    // No action needed here as all the protocol-specific hooks have already updated the context
    // with their respective configurations

    console.log("Final VPN configuration saved to context:", starContext.state.WAN.VPNClient);
    return true;
  });

  return {
    config,
    isValid,
    vpnType,
    errorMessage,
    saveVPNSelection$
  };
};
