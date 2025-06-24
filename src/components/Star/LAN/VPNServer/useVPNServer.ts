import { useContext, $, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { Credentials } from "../../StarContext/Utils/VPNServerType";
import type { VPNType } from "../../StarContext/CommonType";
import type { QRL } from "@builder.io/qwik";

export const useVPNServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const users = useStore<Credentials[]>(
    vpnServerState.Users?.length 
      ? [...vpnServerState.Users] 
      : [{ Username: "", Password: "", VPNType: [] }]
  );
  
  const vpnServerEnabled = useSignal(true);
  const passphraseValue = useSignal(vpnServerState.OpenVpnServer?.[0]?.Certificate?.CertificateKeyPassphrase || "");
  const passphraseError = useSignal("");
  const isValid = useSignal(true);
  
  const enabledProtocols = useStore<Record<VPNType, boolean>>({
    Wireguard: (vpnServerState.WireguardServers?.length || 0) > 0,
    OpenVPN: !!vpnServerState.OpenVpnServer?.[0]?.enabled || false,
    PPTP: !!vpnServerState.PptpServer?.enabled || false,
    L2TP: !!vpnServerState.L2tpServer?.enabled || false,
    SSTP: !!vpnServerState.SstpServer?.enabled || false,
    IKeV2: !!vpnServerState.Ikev2Server?.ipPools?.Ranges || false
  });

  const expandedSections = useStore<Record<string, boolean>>({
    users: true,
    protocols: true,
    pptp: false,
    l2tp: false,
    sstp: false,
    ikev2: false,
    openvpn: false,
    wireguard: false
  });

  // Replace useComputed$ with useTask$ to properly handle state mutations
  useTask$(({ track }) => {
    track(() => vpnServerEnabled.value);
    track(() => enabledProtocols.Wireguard);
    track(() => enabledProtocols.OpenVPN);
    track(() => enabledProtocols.PPTP);
    track(() => enabledProtocols.L2TP);
    track(() => enabledProtocols.SSTP);
    track(() => enabledProtocols.IKeV2);
    track(() => passphraseValue.value);
    track(() => users);
    
    // Track changes to OpenVPN certificate passphrase in StarContext
    track(() => starContext.state.LAN.VPNServer?.OpenVpnServer?.[0]?.Certificate?.CertificateKeyPassphrase);
    
    // Update local passphraseValue when StarContext changes
    const currentPassphrase = starContext.state.LAN.VPNServer?.OpenVpnServer?.[0]?.Certificate?.CertificateKeyPassphrase;
    if (currentPassphrase !== undefined && currentPassphrase !== passphraseValue.value) {
      passphraseValue.value = currentPassphrase;
    }
    
    if (!vpnServerEnabled.value) {
      isValid.value = true;
      return;
    }

    const hasEnabledProtocol = Object.values(enabledProtocols).some(value => value);
    
    const hasValidUsers = users.every(user => {
      const hasCredentials = user.Username.trim() !== "" && user.Password.trim() !== "";
      const hasProtocols = (user.VPNType?.length || 0) > 0;
      return hasCredentials && hasProtocols;
    });

    if (enabledProtocols.OpenVPN) {
      if (passphraseValue.value.length < 10) {
        passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
        isValid.value = false;
        return;
      } else {
        passphraseError.value = "";
      }
    }

    isValid.value = hasEnabledProtocol && hasValidUsers;
  });

  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });

  const addUser = $(() => {
    users.push({ Username: "", Password: "", VPNType: [] });
  });

  const removeUser = $((index: number) => {
    if (users.length > 1) {
      users.splice(index, 1);
    }
  });
  
  const handleUsernameChange = $((value: string, index: number) => {
    users[index].Username = value;
  });
  
  const handlePasswordChange = $((value: string, index: number) => {
    users[index].Password = value;
  });
  
  const handleProtocolToggle = $((protocol: VPNType, index: number) => {
    const userVpnTypes = users[index].VPNType || [];
    const typeIndex = userVpnTypes.indexOf(protocol);
    
    if (typeIndex === -1) {
      users[index].VPNType = [...userVpnTypes, protocol];
    } else {
      users[index].VPNType = userVpnTypes.filter(t => t !== protocol);
    }
  });

  const toggleProtocol = $((protocol: VPNType) => {
    // Toggle the protocol state
    enabledProtocols[protocol] = !enabledProtocols[protocol];
    
    // Update expand sections based on new state
    if (!enabledProtocols[protocol]) {
      expandedSections[protocol.toLowerCase()] = false;
    } else {
      expandedSections[protocol.toLowerCase()] = true;
    }
  });
  
  const handlePassphraseChange = $((value: string) => {
    passphraseValue.value = value;
    if (passphraseValue.value.length < 10) {
      passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
    } else {
      passphraseError.value = "";
    }
  });

  const saveSettings = $((onComplete$?: QRL<() => void>) => {
    if (vpnServerEnabled.value) {
      const validUsers = users.filter(user => 
        user.Username.trim() !== "" && 
        user.Password.trim() !== "" && 
        (user.VPNType?.length || 0) > 0
      );
      
      starContext.updateLAN$({
        VPNServer: {
          Users: validUsers,
          
          PptpServer: enabledProtocols.PPTP 
            ? vpnServerState.PptpServer || { enabled: true, DefaultProfile: "pptp-profile", Authentication: ["mschap2"], PacketSize: { MaxMtu: 1450, MaxMru: 1450 }, KeepaliveTimeout: 30 } 
            : undefined,
            
          L2tpServer: enabledProtocols.L2TP 
            ? vpnServerState.L2tpServer || { 
                enabled: true, 
                DefaultProfile: "l2tp-profile", 
                Authentication: ["mschap2"], 
                PacketSize: { MaxMtu: 1450, MaxMru: 1450 }, 
                KeepaliveTimeout: 30,
                IPsec: { UseIpsec: "no", IpsecSecret: "" },
                allowFastPath: true,
                maxSessions: "unlimited",
                OneSessionPerHost: false,
                L2TPV3: { l2tpv3CircuitId: "", l2tpv3CookieLength: 0, l2tpv3DigestHash: "md5", l2tpv3EtherInterfaceList: "" },
                acceptProtoVersion: "all",
                callerIdType: "ip-address"
              } 
            : undefined,
            
          SstpServer: enabledProtocols.SSTP 
            ? vpnServerState.SstpServer || { 
                enabled: true, 
                Certificate: "default", 
                DefaultProfile: "sstp-profile", 
                Authentication: ["mschap2"], 
                PacketSize: { MaxMtu: 1450, MaxMru: 1450 }, 
                KeepaliveTimeout: 30,
                Port: 4443,
                ForceAes: false,
                Pfs: false,
                Ciphers: "aes256-sha",
                VerifyClientCertificate: false,
                TlsVersion: "any"
              } 
            : undefined,
            
          OpenVpnServer: enabledProtocols.OpenVPN 
            ? (vpnServerState.OpenVpnServer && vpnServerState.OpenVpnServer.length > 0
                ? vpnServerState.OpenVpnServer.map((server) => ({
                    ...server,
                    // Preserve existing certificate configuration to avoid overriding user input
                    Certificate: server.Certificate 
                      ? {
                          ...server.Certificate,
                          // Only override passphrase if local value is different and not empty
                          CertificateKeyPassphrase: passphraseValue.value || server.Certificate.CertificateKeyPassphrase || "",
                        }
                      : {
                          Certificate: "server-cert",
                          RequireClientCertificate: false,
                          CertificateKeyPassphrase: passphraseValue.value,
                        }
                  }))
                : [
                    // UDP Server (Standard OpenVPN)
                    {
                      name: "openvpn-udp", 
                      enabled: true, 
                      Port: 1194, 
                      Protocol: "udp", 
                      Mode: "ip",
                      DefaultProfile: "ovpn-profile",
                      Authentication: ["mschap2"],
                      PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
                      KeepaliveTimeout: 30,
                      VRF: "",
                      RedirectGetway: "def1",
                      PushRoutes: "",
                      RenegSec: 3600,
                      Encryption: { Auth: ["sha256"], UserAuthMethod: "mschap2", Cipher: ["aes256-cbc"], TlsVersion: "any" },
                      IPV6: { EnableTunIPv6: false, IPv6PrefixLength: 64, TunServerIPv6: "" },
                      Certificate: { Certificate: "server-cert", RequireClientCertificate: false, CertificateKeyPassphrase: passphraseValue.value },
                      Address: { Netmask: 24, MacAddress: "", MaxMtu: 1450, AddressPool: "ovpn-pool" }
                    },
                    // TCP Server (Better firewall traversal)
                    {
                      name: "openvpn-tcp", 
                      enabled: true, 
                      Port: 1195, 
                      Protocol: "tcp", 
                      Mode: "ip",
                      DefaultProfile: "ovpn-profile",
                      Authentication: ["mschap2"],
                      PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
                      KeepaliveTimeout: 30,
                      VRF: "",
                      RedirectGetway: "def1",
                      PushRoutes: "",
                      RenegSec: 3600,
                      Encryption: { Auth: ["sha256"], UserAuthMethod: "mschap2", Cipher: ["aes256-cbc"], TlsVersion: "any" },
                      IPV6: { EnableTunIPv6: false, IPv6PrefixLength: 64, TunServerIPv6: "" },
                      Certificate: { Certificate: "server-cert", RequireClientCertificate: false, CertificateKeyPassphrase: passphraseValue.value },
                      Address: { Netmask: 24, MacAddress: "", MaxMtu: 1450, AddressPool: "ovpn-pool" }
                    }
                  ])
            : undefined,
            
          Ikev2Server: enabledProtocols.IKeV2 
            ? vpnServerState.Ikev2Server || { 
                ipPools: { Name: "ike2-pool", Ranges: "192.168.77.2-192.168.77.254" },
                profile: { name: "ike2", hashAlgorithm: "sha1", encAlgorithm: "aes-128", dhGroup: "modp1024" },
                proposal: { name: "ike2", authAlgorithms: "sha1", encAlgorithms: "aes-256-cbc", pfsGroup: "none" },
                policyGroup: { name: "ike2-policies" },
                policyTemplates: { group: "ike2-policies", proposal: "ike2", srcAddress: "0.0.0.0/0", dstAddress: "192.168.77.0/24" },
                peer: { name: "ike2", exchangeMode: "ike2", passive: true, profile: "ike2" },
                identities: { authMethod: "digital-signature", peer: "ike2", generatePolicy: "port-strict", policyTemplateGroup: "ike2-policies" },
                modeConfigs: { name: "ike2-conf", addressPool: "ike2-pool", addressPrefixLength: 32, responder: true }
              } 
            : undefined,
            
          WireguardServers: enabledProtocols.Wireguard 
            ? (vpnServerState.WireguardServers && vpnServerState.WireguardServers.length > 0
                ? vpnServerState.WireguardServers
                : [{
                    Interface: {
                      Name: "wg-server",
                      PrivateKey: "",
                      PublicKey: "",
                      InterfaceAddress: "192.168.110.1/24",
                      ListenPort: 51820,
                      Mtu: 1420
                    },
                    Peers: []
                  }])
            : undefined,
        }
      });
    } else {
      starContext.updateLAN$({
        VPNServer: {
          Users: [],
          PptpServer: undefined,
          L2tpServer: undefined,
          SstpServer: undefined,
          OpenVpnServer: undefined,
          Ikev2Server: undefined,
          WireguardServers: undefined,
        }
      });
    }
    
    if (onComplete$) {
      onComplete$();
    }
  });

  const toggleVpnServerEnabled = $(() => {
    vpnServerEnabled.value = !vpnServerEnabled.value;
  });

  return {
    users,
    vpnServerEnabled,
    passphraseValue,
    passphraseError,
    isValid,
    enabledProtocols,
    expandedSections,
    
    // Actions
    toggleSection,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    toggleProtocol,
    handlePassphraseChange,
    saveSettings,
    toggleVpnServerEnabled,
  };
}; 