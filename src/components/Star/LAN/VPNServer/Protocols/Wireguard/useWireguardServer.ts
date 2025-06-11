import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { WireguardPeerConfig, WireguardServerConfig } from "../../../../StarContext/Utils/VPNServerType";

export const useWireguardServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const privateKeyError = useSignal("");
  const addressError = useSignal("");

  const generatePrivateKey = $(() => {
    // Generate a random private key (simplified for demo)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let result = "";
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  });

  const addServer = $(() => {
    const newServer: WireguardServerConfig = {
      Interface: {
        Name: `wg-server-${Date.now()}`,
        PrivateKey: "",
        PublicKey: "",
        InterfaceAddress: "192.168.79.1/24",
        ListenPort: 51820,
        Mtu: 1420
      },
      Peers: []
    };

    const currentServers = vpnServerState.WireguardServers || [];
    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        WireguardServers: [...currentServers, newServer]
      }
    });
  });

  const updateServer = $((index: number, config: Partial<WireguardServerConfig>) => {
    const currentServers = vpnServerState.WireguardServers || [];
    if (index >= 0 && index < currentServers.length) {
      const updatedServers = [...currentServers];
      updatedServers[index] = { ...updatedServers[index], ...config };
      
      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          WireguardServers: updatedServers
        }
      });
    }
  });

  const addPeer = $((serverIndex: number) => {
    const newPeer: WireguardPeerConfig = {
      PublicKey: "",
      AllowedAddress: "",
      PresharedKey: "",
      EndpointAddress: "",
      EndpointPort: 0,
      PersistentKeepalive: 25,
      Responder: false,
      Comment: ""
    };

    const currentServers = vpnServerState.WireguardServers || [];
    if (serverIndex >= 0 && serverIndex < currentServers.length) {
      const updatedServers = [...currentServers];
      updatedServers[serverIndex] = {
        ...updatedServers[serverIndex],
        Peers: [...updatedServers[serverIndex].Peers, newPeer]
      };

      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          WireguardServers: updatedServers
        }
      });
    }
  });

  const updatePeer$ = $((serverIndex: number, peerIndex: number, config: Partial<WireguardPeerConfig>) => {
    const currentServers = vpnServerState.WireguardServers || [];
    if (serverIndex >= 0 && serverIndex < currentServers.length) {
      const server = currentServers[serverIndex];
      if (peerIndex >= 0 && peerIndex < server.Peers.length) {
        const updatedServers = [...currentServers];
        const updatedPeers = [...server.Peers];
        updatedPeers[peerIndex] = { ...updatedPeers[peerIndex], ...config };
        updatedServers[serverIndex] = { ...server, Peers: updatedPeers };

        starContext.updateLAN$({
          VPNServer: {
            ...vpnServerState,
            WireguardServers: updatedServers
          }
        });
      }
    }
  });

  const deleteServer$ = $((index: number) => {
    const currentServers = vpnServerState.WireguardServers || [];
    if (index >= 0 && index < currentServers.length) {
      const updatedServers = currentServers.filter((_, i) => i !== index);
      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          WireguardServers: updatedServers.length > 0 ? updatedServers : undefined
        }
      });
    }
  });

  const selectServer$ = $((index: number) => {
    // This would be used if there's a selected server concept
    console.log("Selected server:", index);
  });

  const wireguardState = vpnServerState.WireguardServers?.[0] || {
    Interface: {
      Name: "wg-server",
      PrivateKey: "",
      PublicKey: "",
      InterfaceAddress: "192.168.79.1/24",
      ListenPort: 51820,
      Mtu: 1420
    },
    Peers: []
  };

  const updateWireguardServer$ = $((config: Partial<WireguardServerConfig>) => {
    const newConfig = {
      ...wireguardState,
      ...config
    };
    
    let isValid = true;
    
    if (config.Interface?.PrivateKey !== undefined) {
      if (!newConfig.Interface.PrivateKey || !newConfig.Interface.PrivateKey.trim()) {
        privateKeyError.value = $localize`Private key is required`;
        isValid = false;
      } else {
        privateKeyError.value = "";
      }
    }
    
    if (config.Interface?.InterfaceAddress !== undefined) {
      if (!newConfig.Interface.InterfaceAddress || !newConfig.Interface.InterfaceAddress.trim()) {
        addressError.value = $localize`Interface address is required`;
        isValid = false;
      } else if (!newConfig.Interface.InterfaceAddress.includes("/")) {
        addressError.value = $localize`Interface address must include subnet mask (e.g., 192.168.79.1/24)`;
        isValid = false;
      } else {
        addressError.value = "";
      }
    }
    
    if (isValid || (config.Interface && config.Interface.PrivateKey === "")) {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          WireguardServers: (config.Interface && config.Interface.PrivateKey === "") ? undefined : [newConfig]
        }
      });
    }
  });

  return {
    privateKeyError,
    addressError,
    generatePrivateKey,
    addServer,
    updateServer,
    addPeer,
    updatePeer$,
    deleteServer$,
    selectServer$,
    updateWireguardServer$,
    wireguardState
  };
}; 