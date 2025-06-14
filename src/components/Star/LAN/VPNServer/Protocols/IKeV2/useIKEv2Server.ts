import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Ikev2ServerConfig } from "../../../../StarContext/Utils/VPNServerType";

export const useIKEv2Server = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const ikev2State = vpnServerState.Ikev2Server || {
    ipPools: { Name: "ike2-pool", Ranges: "192.168.77.2-192.168.77.254" },
    profile: { name: "ike2", hashAlgorithm: "sha1", encAlgorithm: "aes-128", dhGroup: "modp1024" },
    proposal: { name: "ike2", authAlgorithms: "sha1", encAlgorithms: "aes-256-cbc", pfsGroup: "none" },
    policyGroup: { name: "ike2-policies" },
    policyTemplates: { 
      group: "ike2-policies", 
      proposal: "ike2", 
      srcAddress: "0.0.0.0/0", 
      dstAddress: "192.168.77.0/24" 
    },
    peer: { name: "ike2", exchangeMode: "ike2", passive: true, profile: "ike2" },
    identities: { 
      authMethod: "pre-shared-key", 
      peer: "ike2", 
      generatePolicy: "port-strict", 
      policyTemplateGroup: "ike2-policies" 
    },
    modeConfigs: { 
      name: "ike2-conf", 
      addressPool: "ike2-pool", 
      addressPrefixLength: 32, 
      responder: true 
    }
  };

  const certificateError = useSignal("");
  const presharedKeyError = useSignal("");
  const addressPoolError = useSignal("");
  
  const updateIKEv2Server$ = $((config: Partial<Ikev2ServerConfig>) => {
    const newConfig = {
      ...ikev2State,
      ...config
    };
    
    let isValid = true;
    
    // Validate auth method and related fields
    if (newConfig.identities?.authMethod) {
      if (newConfig.identities.authMethod === "pre-shared-key") {
        if (!newConfig.identities.secret || !newConfig.identities.secret.trim()) {
          presharedKeyError.value = $localize`Pre-shared key is required for this authentication method`;
          isValid = false;
        } else if (newConfig.identities.secret.length < 8) {
          presharedKeyError.value = $localize`Pre-shared key should be at least 8 characters long`;
          isValid = false;
        } else {
          presharedKeyError.value = "";
        }
      } else {
        presharedKeyError.value = "";
        if ((newConfig.identities.authMethod === "digital-signature" || newConfig.identities.authMethod === "eap") && 
            (!newConfig.identities.certificate || !newConfig.identities.certificate.trim())) {
          certificateError.value = $localize`Certificate is required for this authentication method`;
          isValid = false;
        } else {
          certificateError.value = "";
        }
      }
    }
    
    // Validate address pool
    if (config.ipPools?.Ranges !== undefined) {
      if (config.ipPools.Ranges === "") {
        // Allow empty to disable server
        addressPoolError.value = "";
      } else if (!newConfig.ipPools?.Ranges || !newConfig.ipPools.Ranges.trim()) {
        addressPoolError.value = $localize`Address pool is required`;
        isValid = false;
      } else if (!newConfig.ipPools.Ranges.includes("-")) {
        addressPoolError.value = $localize`Address pool must include range (e.g., 192.168.77.2-192.168.77.254)`;
        isValid = false;
      } else {
        addressPoolError.value = "";
      }
    }
    
    if (isValid || (config.ipPools && config.ipPools.Ranges === "")) {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          Ikev2Server: (config.ipPools && config.ipPools.Ranges === "") ? undefined : newConfig
        }
      });
    }
  });

  return {
    ikev2State,
    updateIKEv2Server$,
    certificateError,
    presharedKeyError,
    addressPoolError
  };
}; 