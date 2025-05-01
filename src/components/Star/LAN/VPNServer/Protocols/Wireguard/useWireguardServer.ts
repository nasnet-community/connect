import { $, useSignal, useStore } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { WireguardInterfaceConfig, WireguardPeerConfig, WireguardServerInstanceConfig } from "../../../../StarContext/LANType";

export const useWireguardServer = () => {
  const starContext = useContext(StarContext);
  
  // Get the current VPN server state
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  // Get the current Wireguard servers or initialize with an empty array
  const wireguardServers = useStore<WireguardServerInstanceConfig[]>(
    vpnServerState.WireguardServers || []
  );

  // Signal for generating a new server
  const isGeneratingKeys = useSignal(false);
  
  // Currently selected server index
  const currentServerIndex = useSignal(0);
  
  // Error signals
  const privateKeyError = useSignal("");
  const interfaceAddressError = useSignal("");
  const peerPublicKeyError = useSignal("");
  const peerAddressError = useSignal("");
  
  // Validation functions
  const validatePrivateKey = $((value: string) => {
    if (!value.trim()) {
      privateKeyError.value = $localize`Private key is required`;
      return false;
    } else if (value.length < 32) {
      privateKeyError.value = $localize`Private key should be at least 32 characters`;
      return false;
    } else {
      privateKeyError.value = "";
      return true;
    }
  });
  
  const validateInterfaceAddress = $((value: string) => {
    if (!value.trim()) {
      interfaceAddressError.value = $localize`Interface address is required`;
      return false;
    } else if (!value.includes("/")) {
      interfaceAddressError.value = $localize`Address must include subnet mask (e.g., 10.0.0.1/24)`;
      return false;
    } else {
      interfaceAddressError.value = "";
      return true;
    }
  });
  
  const validatePeerPublicKey = $((value: string) => {
    if (!value.trim()) {
      peerPublicKeyError.value = $localize`Public key is required`;
      return false;
    } else if (value.length < 32) {
      peerPublicKeyError.value = $localize`Public key should be at least 32 characters`;
      return false;
    } else {
      peerPublicKeyError.value = "";
      return true;
    }
  });
  
  const validatePeerAddress = $((value: string) => {
    if (!value.trim()) {
      peerAddressError.value = $localize`Allowed address is required`;
      return false;
    } else {
      peerAddressError.value = "";
      return true;
    }
  });

  // Generate a new Wireguard server with random keys (in a real app, these would be cryptographically secure)
  const generateWireguardServer$ = $(() => {
    isGeneratingKeys.value = true;
    
    // In a real implementation, this would call an API to generate proper Wireguard keys
    // For now, simulate with placeholder values
    setTimeout(() => {
      const newServer: WireguardServerInstanceConfig = {
        Interface: {
          Name: `wg${wireguardServers.length}`,
          PrivateKey: "private_key_" + Math.random().toString(36).substring(2, 15),
          InterfaceAddress: `10.10.${wireguardServers.length}.1/24`,
          ListenPort: 51820 + wireguardServers.length,
          Mtu: 1420
        },
        Peers: []
      };
      
      wireguardServers.push(newServer);
      currentServerIndex.value = wireguardServers.length - 1;
      isGeneratingKeys.value = false;
      
      // Persist to StarContext
      updateWireguardServers$();
    }, 500);
  });
  
  // Add a new peer to the current server
  const addPeer$ = $(() => {
    if (wireguardServers.length === 0) return;
    
    const newPeer: WireguardPeerConfig = {
      PublicKey: "",
      AllowedAddress: `10.10.${currentServerIndex.value}.0/24`,
      PresharedKey: "",
      PersistentKeepalive: 25,
      Comment: ""
    };
    
    wireguardServers[currentServerIndex.value].Peers.push(newPeer);
    
    // Persist to StarContext
    updateWireguardServers$();
  });
  
  // Remove a peer from the current server
  const removePeer$ = $((peerIndex: number) => {
    if (wireguardServers.length === 0) return;
    
    wireguardServers[currentServerIndex.value].Peers.splice(peerIndex, 1);
    
    // Persist to StarContext
    updateWireguardServers$();
  });
  
  // Update server interface properties
  const updateInterface$ = $(<K extends keyof WireguardInterfaceConfig>(property: K, value: WireguardInterfaceConfig[K]) => {
    if (wireguardServers.length === 0) return;
    
    // Validate key properties
    if (property === 'PrivateKey' && typeof value === 'string') {
      if (!validatePrivateKey(value)) return;
    } else if (property === 'InterfaceAddress' && typeof value === 'string') {
      if (!validateInterfaceAddress(value)) return;
    }
    
    // Skip updating PublicKey as it's read-only
    if (property === 'PublicKey') return;
    
    wireguardServers[currentServerIndex.value].Interface[property] = value;
    
    // Persist to StarContext
    updateWireguardServers$();
  });
  
  // Update peer properties
  const updatePeer$ = $(<K extends keyof WireguardPeerConfig>(peerIndex: number, property: K, value: WireguardPeerConfig[K]) => {
    if (wireguardServers.length === 0) return;
    
    // Validate key properties
    if (property === 'PublicKey' && typeof value === 'string') {
      if (!validatePeerPublicKey(value)) return;
    } else if (property === 'AllowedAddress' && typeof value === 'string') {
      if (!validatePeerAddress(value)) return;
    }
    
    wireguardServers[currentServerIndex.value].Peers[peerIndex][property] = value;
    
    // Persist to StarContext
    updateWireguardServers$();
  });
  
  // Delete the current server
  const deleteServer$ = $(() => {
    if (wireguardServers.length === 0) return;
    
    wireguardServers.splice(currentServerIndex.value, 1);
    
    if (currentServerIndex.value >= wireguardServers.length) {
      currentServerIndex.value = Math.max(0, wireguardServers.length - 1);
    }
    
    // Persist to StarContext
    updateWireguardServers$();
  });
  
  // Select a different server
  const selectServer$ = $((index: number) => {
    if (index >= 0 && index < wireguardServers.length) {
      currentServerIndex.value = index;
    }
  });
  
  // Update the StarContext with the current servers
  const updateWireguardServers$ = $(() => {
    starContext.updateLAN$({ 
      VPNServer: {
        // Preserve existing users and other protocols
        ...vpnServerState,
        // Update Wireguard config
        WireguardServers: wireguardServers.length > 0 ? [...wireguardServers] : undefined
      }
    });
  });

  return {
    wireguardServers,
    currentServerIndex,
    isGeneratingKeys,
    privateKeyError,
    interfaceAddressError,
    peerPublicKeyError,
    peerAddressError,
    generateWireguardServer$,
    addPeer$,
    removePeer$,
    updateInterface$,
    updatePeer$,
    deleteServer$,
    selectServer$
  };
}; 