import { $ } from "@builder.io/qwik";
import type { SstpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";

export const useSSTPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const sstpState = vpnServerState.SstpServer || {
    enabled: true,
    Certificate: "",
    Port: 443,
    ForceAes: false,
    Pfs: false,
    DefaultProfile: "sstp-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450
    },
    KeepaliveTimeout: 30,
    Ciphers: "aes256-gcm-sha384",
    VerifyClientCertificate: false,
    TlsVersion: "any"
  };

  const updateSSTPServer$ = $((config: Partial<SstpServerConfig>) => {
    const newConfig = {
      ...sstpState,
      ...config,
    };

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        SstpServer: newConfig,
      },
    });
  });

  return {
    sstpState,
    updateSSTPServer$,
  };
}; 