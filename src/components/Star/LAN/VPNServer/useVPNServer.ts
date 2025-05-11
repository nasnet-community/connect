import { useContext, $, useSignal, useStore, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { Credentials } from "../../StarContext/LANType";
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
  const passphraseValue = useSignal(vpnServerState.OpenVpnServer?.CertificateKeyPassphrase || "");
  const passphraseError = useSignal("");
  
  const enabledProtocols = useStore<Record<VPNType, boolean>>({
    Wireguard: (vpnServerState.WireguardServers?.length || 0) > 0,
    OpenVPN: !!vpnServerState.OpenVpnServer?.Profile || false,
    PPTP: !!vpnServerState.PptpServer?.Profile || false,
    L2TP: !!vpnServerState.L2tpServer?.Profile || false,
    SSTP: !!vpnServerState.SstpServer?.Profile || false,
    IKeV2: !!vpnServerState.Ikev2Server?.AddressPool || false
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
    // Ensure VPNType is initialized as an array
    if (!Array.isArray(users[index].VPNType)) {
      users[index].VPNType = [];
    }
    
    const userVpnTypes = users[index].VPNType;
    const typeIndex = userVpnTypes.indexOf(protocol);
    
    if (typeIndex === -1) {
      // Only add protocol if it's enabled in settings
      if (enabledProtocols[protocol]) {
        users[index].VPNType = [...userVpnTypes, protocol];
      }
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
      
      // Remove this protocol from all user permissions when disabled
      users.forEach((user, index) => {
        if (Array.isArray(user.VPNType) && user.VPNType.includes(protocol)) {
          users[index].VPNType = user.VPNType.filter(t => t !== protocol);
        }
      });
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

  const isValid = useComputed$(() => {
    if (!vpnServerEnabled.value) return true;

    const hasEnabledProtocol = Object.values(enabledProtocols).some(value => value);
    
    const hasValidUsers = users.every(user => {
      const hasCredentials = user.Username.trim() !== "" && user.Password.trim() !== "";
      const hasProtocols = Array.isArray(user.VPNType) && user.VPNType.length > 0;
      
      // Make sure user has only enabled protocols that are actually enabled in settings
      const hasValidProtocols = Array.isArray(user.VPNType) && 
        user.VPNType.every(protocol => enabledProtocols[protocol] === true);
      
      return hasCredentials && hasProtocols && hasValidProtocols;
    });

    if (enabledProtocols.OpenVPN) {
      if (passphraseValue.value.length < 10) {
        passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
        return false;
      } else {
        passphraseError.value = "";
      }
    }

    return hasEnabledProtocol && hasValidUsers;
  });

  const saveSettings = $((onComplete$?: QRL<() => void>) => {
    if (vpnServerEnabled.value) {
      const validUsers = users.filter(user => 
        user.Username.trim() !== "" && 
        user.Password.trim() !== "" && 
        Array.isArray(user.VPNType) && user.VPNType.length > 0
      );
      
      starContext.updateLAN$({
        VPNServer: {
          Users: validUsers,
          
          PptpServer: enabledProtocols.PPTP 
            ? vpnServerState.PptpServer || { Profile: "default" } 
            : undefined,
            
          L2tpServer: enabledProtocols.L2TP 
            ? vpnServerState.L2tpServer || { Profile: "default", UseIpsec: "yes" } 
            : undefined,
            
          SstpServer: enabledProtocols.SSTP 
            ? vpnServerState.SstpServer || { Profile: "default", Certificate: "default" } 
            : undefined,
            
          OpenVpnServer: enabledProtocols.OpenVPN 
            ? {
                ...(vpnServerState.OpenVpnServer || { Profile: "default", Certificate: "default" }),
                CertificateKeyPassphrase: passphraseValue.value,
              } 
            : undefined,
            
          Ikev2Server: enabledProtocols.IKeV2 
            ? vpnServerState.Ikev2Server || { AddressPool: "192.168.77.0/24", ClientAuthMethod: "pre-shared-key" } 
            : undefined,
            
          WireguardServers: enabledProtocols.Wireguard 
            ? vpnServerState.WireguardServers || [] 
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
    enabledProtocols,
    expandedSections,
    isValid,
    
    toggleSection,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    toggleProtocol,
    handlePassphraseChange,
    saveSettings,
    toggleVpnServerEnabled
  };
};