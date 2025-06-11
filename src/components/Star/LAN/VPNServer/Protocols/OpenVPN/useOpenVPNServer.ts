import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { OpenVpnServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import { StarContext } from "../../../../StarContext/StarContext";

export const useOpenVPNServer = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const openVpnState = vpnServerState.OpenVpnServer || {
    name: "default",
    enabled: true,
    Port: 1194,
    Protocol: "udp",
    Mode: "ip",
    DefaultProfile: "default",
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

  const updateOpenVPNServer$ = $((config: Partial<OpenVpnServerConfig>) => {
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
          OpenVpnServer: (config.name && config.name === "") ? undefined : newConfig
        }
      });
    }
  });

  return {
    openVpnState,
    updateOpenVPNServer$,
    certificateError,
    passphraseError
  };
}; 