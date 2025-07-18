import { useSignal, useContext, $, useTask$ } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export const useVPNConfig = () => {
  const starContext = useContext(StarContext);
  const config = useSignal("");
  const isValid = useSignal(false);
  const vpnType = useSignal<VPNType | "">("");
  const errorMessage = useSignal("");
  
  useTask$(({ track }) => {
    track(() => starContext.state.WAN.VPNClient);
    
    if (starContext.state.WAN.VPNClient) {
      if (starContext.state.WAN.VPNClient.Wireguard) {
        vpnType.value = "Wireguard";
        isValid.value = true;
      } else if (starContext.state.WAN.VPNClient.OpenVPN) {
        vpnType.value = "OpenVPN";
        isValid.value = true;
      } else if (starContext.state.WAN.VPNClient.L2TP) {
        vpnType.value = "L2TP";
        isValid.value = true;
      } else if (starContext.state.WAN.VPNClient.PPTP) {
        vpnType.value = "PPTP";
        isValid.value = true;
      } else if (starContext.state.WAN.VPNClient.SSTP) {
        vpnType.value = "SSTP";
        isValid.value = true;
      } else if (starContext.state.WAN.VPNClient.IKeV2) {
        vpnType.value = "IKeV2";
        isValid.value = true;
      } else {
        vpnType.value = "";
        isValid.value = false;
      }
    }
  });
  
  const saveVPNSelection$ = $(async () => {
    if (!vpnType.value) {
      errorMessage.value = "Please select a VPN type";
      return false;
    }
    
    if (!isValid.value) {
      errorMessage.value = "Please complete the VPN configuration";
      return false;
    }
    
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
