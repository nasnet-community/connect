import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { L2tpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import { StarContext } from "../../../../StarContext/StarContext";

export const useL2TPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const l2tpState = vpnServerState.L2tpServer || {
    enabled: true,
    DefaultProfile: "l2tp-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450
    },
    KeepaliveTimeout: 30,
    IPsec: {
      UseIpsec: "no",
      IpsecSecret: ""
    },
    allowFastPath: false,
    maxSessions: "unlimited",
    OneSessionPerHost: false,
    L2TPV3: {
      l2tpv3CircuitId: "",
      l2tpv3CookieLength: 0,
      l2tpv3DigestHash: "md5",
      l2tpv3EtherInterfaceList: ""
    },
    acceptProtoVersion: "all",
    callerIdType: "ip-address"
  };

  const secretError = useSignal("");

  const updateL2TPServer$ = $((config: Partial<L2tpServerConfig>) => {
    const newConfig = {
      ...l2tpState,
      ...config
    };
    
    // Validate IPsec secret if required
    if (config.IPsec?.IpsecSecret !== undefined) {
      const useIpsec = config.IPsec?.UseIpsec || newConfig.IPsec?.UseIpsec;
      if ((useIpsec === "yes" || useIpsec === "required") && 
          (!config.IPsec.IpsecSecret || !config.IPsec.IpsecSecret.trim())) {
        secretError.value = $localize`IPsec secret is required when IPsec is enabled`;
        return;
      } else {
        secretError.value = "";
      }
    }
    
    starContext.updateLAN$({ 
      VPNServer: {
        ...vpnServerState,
        L2tpServer: config.DefaultProfile === "" ? undefined : newConfig 
      }
    });
  });

  return {
    l2tpState,
    updateL2TPServer$,
    secretError
  };
}; 