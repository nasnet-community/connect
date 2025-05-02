import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { SstpServerConfig } from "../../../../StarContext/LANType";

export const useSSTPServer = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const sstpState = vpnServerState.SstpServer || {
    Profile: "default",
    Certificate: "",
    Port: 443,
    Authentication: ["mschap2", "mschap1"],
    ForceAes: true,
    Pfs: true,
    VerifyClientCertificate: false,
    TlsVersion: "only-1.2"
  };

  const certificateError = useSignal("");
  const profileError = useSignal("");
  const portError = useSignal("");


  const updateSSTPServer$ = $((config: Partial<SstpServerConfig>) => {
    const newConfig = {
      ...sstpState,
      ...config
    };
    
    let isValid = true;
    
    if (config.Certificate !== undefined || config.Profile !== "") {
      if (!newConfig.Certificate || !newConfig.Certificate.trim()) {
        certificateError.value = $localize`Certificate is required`;
        isValid = false;
      } else {
        certificateError.value = "";
      }
    }
    
    if (config.Profile !== undefined) {
      if (!newConfig.Profile || !newConfig.Profile.trim()) {
        profileError.value = $localize`Profile name is required`;
        isValid = false;
      } else {
        profileError.value = "";
      }
    }
    
    if (config.Port !== undefined) {
      if (!newConfig.Port || newConfig.Port < 1 || newConfig.Port > 65535) {
        portError.value = $localize`Valid port number (1-65535) is required`;
        isValid = false;
      } else {
        portError.value = "";
      }
    }
    
    if (isValid || config.Profile === "") {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          SstpServer: config.Profile === "" ? undefined : newConfig
        }
      });
    }
  });

  return {
    sstpState,
    updateSSTPServer$,
    certificateError,
    profileError,
    portError
  };
}; 