import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { OpenVpnServerConfig } from "../../../../StarContext/LANType";

export const useOpenVPNServer = () => {
  const starContext = useContext(StarContext);
  
  // Get the current VPN server state
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  // Get the current OpenVPN config or initialize with defaults
  const openVpnState = vpnServerState.OpenVpnServer || {
    Profile: "default",
    Certificate: "",
    Enabled: true,
    Port: 1194,
    Protocol: "tcp",
    Mode: "ip",
    Netmask: 24,
    AddressPool: "192.168.78.0/24",
    RequireClientCertificate: false,
    Auth: "sha256",
    Cipher: "aes256-gcm",
    CertificateKeyPassphrase: "",
    MaxSessions: 10,
    DefaultProfile: "default",
    TlsVersion: "only-1.2"
  };

  // Error states for validation
  const certificateError = useSignal("");
  const passphraseError = useSignal("");
  const profileError = useSignal("");
  const addressPoolError = useSignal("");
  const portError = useSignal("");
  
  /**
   * Updates the OpenVPN server configuration and immediately persists to StarContext
   */
  const updateOpenVPNServer$ = $((config: Partial<OpenVpnServerConfig>) => {
    const newConfig = {
      ...openVpnState,
      ...config
    };
    
    let isValid = true;
    
    // Validate certificate
    if (config.Certificate !== undefined || (config.Profile !== undefined && config.Profile !== "")) {
      if (!newConfig.Certificate || !newConfig.Certificate.trim()) {
        certificateError.value = $localize`Certificate is required`;
        isValid = false;
      } else {
        certificateError.value = "";
      }
    }
    
    // Validate passphrase
    if (config.CertificateKeyPassphrase !== undefined) {
      if (newConfig.CertificateKeyPassphrase && newConfig.CertificateKeyPassphrase.length < 10) {
        passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
        isValid = false;
      } else {
        passphraseError.value = "";
      }
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
    
    // Validate address pool
    if (config.AddressPool !== undefined) {
      if (!newConfig.AddressPool || !newConfig.AddressPool.trim()) {
        addressPoolError.value = $localize`Address pool is required`;
        isValid = false;
      } else if (!newConfig.AddressPool.includes("/")) {
        addressPoolError.value = $localize`Address pool must include subnet mask (e.g., 192.168.78.0/24)`;
        isValid = false;
      } else {
        addressPoolError.value = "";
      }
    }
    
    // Validate port
    if (config.Port !== undefined) {
      if (!newConfig.Port || newConfig.Port < 1 || newConfig.Port > 65535) {
        portError.value = $localize`Valid port number (1-65535) is required`;
        isValid = false;
      } else {
        portError.value = "";
      }
    }
    
    // Only update if validation passes or we're disabling by setting empty profile
    if (isValid || config.Profile === "") {
      starContext.updateLAN$({ 
        VPNServer: {
          // Preserve existing users and other protocols
          ...vpnServerState,
          // Update OpenVPN config
          OpenVpnServer: config.Profile === "" ? undefined : newConfig
        }
      });
    }
  });

  return {
    openVpnState,
    updateOpenVPNServer$,
    certificateError,
    passphraseError,
    profileError,
    addressPoolError,
    portError
  };
}; 