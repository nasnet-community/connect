import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Ikev2ServerConfig } from "../../../../StarContext/LANType";

export const useIKEv2Server = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const ikev2State = vpnServerState.Ikev2Server || {
    AddressPool: "192.168.77.0/24",
    ClientAuthMethod: "digital-signature",
    PresharedKey: "",
    EapMethods: "eap-mschapv2,eap-tls",
    ServerCertificate: "",
    ClientCaCertificate: "",
    DnsServers: "",
    PeerName: "",
    IpsecProfile: "default",
    IpsecProposal: "default",
    PolicyTemplateGroup: "default"
  };

  const certificateError = useSignal("");
  const presharedKeyError = useSignal("");
  const addressPoolError = useSignal("");
  
  const validateCertificate = $((value: string, method: string) => {
    if ((method === "digital-signature" || method === "eap") && !value.trim()) {
      certificateError.value = $localize`Certificate is required for this authentication method`;
      return false;
    } else {
      certificateError.value = "";
      return true;
    }
  });

  const validatePresharedKey = $((value: string, method: string) => {
    if (method === "pre-shared-key" && !value.trim()) {
      presharedKeyError.value = $localize`Pre-shared key is required for this authentication method`;
      return false;
    } else if (method === "pre-shared-key" && value.length < 8) {
      presharedKeyError.value = $localize`Pre-shared key should be at least 8 characters long`;
      return false;
    } else {
      presharedKeyError.value = "";
      return true;
    }
  });

  const validateAddressPool = $((value: string) => {
    if (!value.trim()) {
      addressPoolError.value = $localize`Address pool is required`;
      return false;
    } else if (!value.includes("/")) {
      addressPoolError.value = $localize`Address pool must include subnet mask (e.g., 192.168.77.0/24)`;
      return false;
    } else {
      addressPoolError.value = "";
      return true;
    }
  });


  const updateIKEv2Server$ = $((config: Partial<Ikev2ServerConfig>) => {
    const newConfig = {
      ...ikev2State,
      ...config
    };
    
    let isValid = true;
    
    if (newConfig.ClientAuthMethod) {
      if (newConfig.ClientAuthMethod === "pre-shared-key") {
        if (newConfig.ClientAuthMethod === "pre-shared-key" && (!newConfig.PresharedKey || !newConfig.PresharedKey.trim())) {
          presharedKeyError.value = $localize`Pre-shared key is required for this authentication method`;
          isValid = false;
        } else if (newConfig.ClientAuthMethod === "pre-shared-key" && newConfig.PresharedKey && newConfig.PresharedKey.length < 8) {
          presharedKeyError.value = $localize`Pre-shared key should be at least 8 characters long`;
          isValid = false;
        } else {
          presharedKeyError.value = "";
        }
      } else {
        if ((newConfig.ClientAuthMethod === "digital-signature" || newConfig.ClientAuthMethod === "eap") && 
            (!newConfig.ServerCertificate || !newConfig.ServerCertificate.trim())) {
          certificateError.value = $localize`Certificate is required for this authentication method`;
          isValid = false;
        } else {
          certificateError.value = "";
        }
      }
    }
    
    if (config.AddressPool !== undefined && config.AddressPool !== "") {
      if (!newConfig.AddressPool.trim()) {
        addressPoolError.value = $localize`Address pool is required`;
        isValid = false;
      } else if (!newConfig.AddressPool.includes("/")) {
        addressPoolError.value = $localize`Address pool must include subnet mask (e.g., 192.168.77.0/24)`;
        isValid = false;
      } else {
        addressPoolError.value = "";
      }
    }
    
    if (isValid || config.AddressPool === "") {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          Ikev2Server: config.AddressPool === "" ? undefined : newConfig
        }
      });
    }
  });

  return {
    ikev2State,
    updateIKEv2Server$,
    certificateError,
    presharedKeyError,
    addressPoolError,
    validateCertificate,
    validatePresharedKey,
    validateAddressPool
  };
}; 