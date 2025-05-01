import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Ikev2ServerConfig } from "../../../../StarContext/LANType";

export const useIKEv2Server = () => {
  const starContext = useContext(StarContext);
  
  // Get the current VPN server state
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  // Get the current IKEv2 config or initialize with defaults
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
  
  // Validate certificate when using digital-signature or EAP
  const validateCertificate = $((value: string, method: string) => {
    if ((method === "digital-signature" || method === "eap") && !value.trim()) {
      certificateError.value = $localize`Certificate is required for this authentication method`;
      return false;
    } else {
      certificateError.value = "";
      return true;
    }
  });

  // Validate preshared key when using pre-shared-key auth method
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

  // Validate address pool
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

  /**
   * Updates the IKEv2 server configuration and immediately persists to StarContext
   */
  const updateIKEv2Server$ = $((config: Partial<Ikev2ServerConfig>) => {
    const newConfig = {
      ...ikev2State,
      ...config
    };
    
    // Perform validations synchronously
    let isValid = true;
    
    // Validate based on auth method
    if (newConfig.ClientAuthMethod) {
      if (newConfig.ClientAuthMethod === "pre-shared-key") {
        // Manually check and set error for preshared key
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
        // Manually check and set error for certificate
        if ((newConfig.ClientAuthMethod === "digital-signature" || newConfig.ClientAuthMethod === "eap") && 
            (!newConfig.ServerCertificate || !newConfig.ServerCertificate.trim())) {
          certificateError.value = $localize`Certificate is required for this authentication method`;
          isValid = false;
        } else {
          certificateError.value = "";
        }
      }
    }
    
    // Validate address pool if it's being changed
    if (config.AddressPool !== undefined && config.AddressPool !== "") {
      // Manually check and set error for address pool
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
    
    // Only update if validation passes or we're disabling by setting empty address pool
    if (isValid || config.AddressPool === "") {
      starContext.updateLAN$({ 
        VPNServer: {
          // Preserve existing users and other protocols
          ...vpnServerState,
          // Update IKEv2 config
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