import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { OpenVpnServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import { StarContext } from "../../../../StarContext/StarContext";

export const useOpenVPNServer = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  // Get the first OpenVPN server configuration or create a default one
  const openVpnState = (vpnServerState.OpenVpnServer && vpnServerState.OpenVpnServer[0]) || {
    name: "default",
    enabled: true,
    Port: 1194,
    Protocol: "udp",
    Mode: "ip",
    DefaultProfile: "ovpn-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450
    },
    KeepaliveTimeout: 30,
    VRF: "",
    RedirectGetway: "def1",
    PushRoutes: "",
    RenegSec: 3600,
    Encryption: {
      Auth: ["sha256"],
      UserAuthMethod: "mschap2",
      Cipher: ["aes256-cbc"],
      TlsVersion: "any"
    },
    IPV6: {
      EnableTunIPv6: false,
      IPv6PrefixLength: 64,
      TunServerIPv6: ""
    },
    Certificate: {
      Certificate: "default",
      RequireClientCertificate: false,
      CertificateKeyPassphrase: ""
    },
    Address: {
      Netmask: 24,
      MacAddress: "",
      MaxMtu: 1450,
      AddressPool: ""
    }
  };

  const certificateError = useSignal("");
  const passphraseError = useSignal("");

  const updateOpenVPNServer$ = $((configOrConfigs: Partial<OpenVpnServerConfig> | OpenVpnServerConfig[]) => {
    // Handle both single config and array of configs
    if (Array.isArray(configOrConfigs)) {
      // For array of configs (multiple servers)
      let isValid = true;
      
      // Validate all servers
      for (const config of configOrConfigs) {
        // Validate certificate
        if (!config.Certificate?.Certificate || !config.Certificate.Certificate.trim()) {
          certificateError.value = $localize`Certificate is required`;
          isValid = false;
        }
        
        // Validate passphrase
        if (config.Certificate?.CertificateKeyPassphrase && config.Certificate.CertificateKeyPassphrase.length < 10) {
          passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
          isValid = false;
        }
      }
      
      if (isValid) {
        certificateError.value = "";
        passphraseError.value = "";
        starContext.updateLAN$({ 
          VPNServer: {
            ...vpnServerState,
            OpenVpnServer: configOrConfigs
          }
        });
      }
    } else {
      // Handle single config (backward compatibility)
      const config = configOrConfigs;
      const newConfig = {
        ...openVpnState,
        ...config
      };
      
      let isValid = true;
      
      // Validate certificate
      if (config.Certificate?.Certificate !== undefined) {
        if (!newConfig.Certificate.Certificate || !newConfig.Certificate.Certificate.trim()) {
          certificateError.value = $localize`Certificate is required`;
          isValid = false;
        } else {
          certificateError.value = "";
        }
      }
      
      // Validate passphrase
      if (config.Certificate?.CertificateKeyPassphrase !== undefined) {
        if (newConfig.Certificate.CertificateKeyPassphrase && newConfig.Certificate.CertificateKeyPassphrase.length < 10) {
          passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
          isValid = false;
        } else {
          passphraseError.value = "";
        }
      }
      
      if (isValid || (config.name && config.name === "")) {
        starContext.updateLAN$({ 
          VPNServer: {
            ...vpnServerState,
            OpenVpnServer: (config.name && config.name === "") ? undefined : [newConfig]
          }
        });
      }
    }
  });

  return {
    openVpnState,
    updateOpenVPNServer$,
    certificateError,
    passphraseError
  };
}; 