import { $, useSignal, useStore } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { WireguardServerConfig } from "../../../../StarContext/Utils/VPNServerType";

// Define ViewMode type if it doesn't exist
type ViewMode = "easy" | "advanced";

export const useWireguardServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };

  const wireguardState = vpnServerState.WireguardServers?.[0] || {
    Network: "VPN",
    Interface: {
      Name: "wg-server",
      PrivateKey: "",
      PublicKey: "",
      InterfaceAddress: "192.168.110.1/24",
      ListenPort: 51820,
      Mtu: 1420,
    },
    Peers: [],
  };

  // Error signals
  const privateKeyError = useSignal("");
  const addressError = useSignal("");

  // UI state
  const showPrivateKey = useSignal(false);
  const isEnabled = useSignal(!!wireguardState.Interface.PrivateKey);
  const viewMode = useSignal<ViewMode>("advanced");

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    name: wireguardState.Interface.Name || "wg-server",
    // network property removed as it doesn't exist in WireguardServerConfig
    privateKey: wireguardState.Interface.PrivateKey || "",
    interfaceAddress:
      wireguardState.Interface.InterfaceAddress || "192.168.110.1/24",
    listenPort: wireguardState.Interface.ListenPort || 51820,
    mtu: wireguardState.Interface.Mtu || 1420,
  });

  // Core update function
  const updateWireguardServer$ = $((config: Partial<WireguardServerConfig>) => {
    const newConfig = {
      ...wireguardState,
      ...config,
    };

    let isValid = true;

    // Validate private key
    if (config.Interface?.PrivateKey !== undefined) {
      if (
        !newConfig.Interface.PrivateKey ||
        !newConfig.Interface.PrivateKey.trim()
      ) {
        privateKeyError.value = $localize`Private key is required`;
        isValid = false;
      } else {
        privateKeyError.value = "";
      }
    }

    // Validate interface address
    if (config.Interface?.InterfaceAddress !== undefined) {
      const address = newConfig.Interface.InterfaceAddress;
      if (!address || !address.includes("/")) {
        addressError.value = $localize`Valid interface address with subnet is required (e.g., 192.168.110.1/24)`;
        isValid = false;
      } else {
        addressError.value = "";
      }
    }

    if (
      isValid ||
      (config.Interface?.PrivateKey && config.Interface.PrivateKey === "")
    ) {
      const current = (starContext.state.LAN.VPNServer || {}) as any;
      starContext.updateLAN$({
        VPNServer: {
          ...current,
          WireguardServers:
            config.Interface?.PrivateKey && config.Interface.PrivateKey === ""
              ? undefined
              : [newConfig],
        },
      });
    }
  });

  // Helper function to update the server configuration (from component logic)
  const updateServerConfig = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config with proper StarContext structure
    updateWireguardServer$({
      Interface: {
        Name: formState.name,
        PrivateKey: formState.privateKey,
        PublicKey: "", // Public key would be derived from private key
        InterfaceAddress: formState.interfaceAddress,
        ListenPort: formState.listenPort,
        Mtu: formState.mtu,
      },
      Peers: wireguardState.Peers || [],
    });
  });

  // Helper function to update the server configuration for easy mode
  const updateEasyConfig = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config with proper StarContext structure
    updateWireguardServer$({
      Interface: {
        Name: formState.name,
        PrivateKey: formState.privateKey,
        PublicKey: "", // Public key would be derived from private key
        InterfaceAddress: formState.interfaceAddress,
        ListenPort: 51820, // Default values for easy mode
        Mtu: 1420, // Default values for easy mode
      },
    });
  });

  // Generate private key function
  const generatePrivateKey = $(async (): Promise<string> => {
    try {
      // In a real implementation, this would generate a proper WireGuard private key
      // For now, we'll generate a base64-like string
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      const privateKey = btoa(String.fromCharCode(...array));

      return privateKey;
    } catch (error) {
      console.error("Failed to generate private key:", error);
      throw new Error($localize`Failed to generate private key`);
    }
  });

  // Handle generate private key from component
  const handleGeneratePrivateKey = $(async () => {
    // Simulate generating a private key
    console.log("Generating private key...");
    const newPrivateKey = "YKZRdzOIFrA9ufcYALAfMZyzkAarXXZ+Va8TnXy4uX8=";

    // Update the private key in the unified form state
    updateServerConfig({ privateKey: newPrivateKey });
  });

  // Toggle private key visibility
  const togglePrivateKeyVisibility = $(() => {
    showPrivateKey.value = !showPrivateKey.value;
  });

  // Toggle server enable status
  const toggleServerEnabled = $(() => {
    const newStatus = !isEnabled.value;
    isEnabled.value = newStatus;

    // If disabling, clear the private key
    if (!newStatus) {
      updateServerConfig({ privateKey: "" });
    }
  });

  // Set view mode (easy or advanced)
  const setViewMode = $((mode: ViewMode) => {
    viewMode.value = mode;
  });

  // Peer management functions
  const addPeer = $((peer: any) => {
    const newPeers = [...(wireguardState.Peers || []), peer];
    updateWireguardServer$({
      Interface: wireguardState.Interface,
      Peers: newPeers,
    });
  });

  const removePeer = $((index: number) => {
    const newPeers = [...(wireguardState.Peers || [])];
    newPeers.splice(index, 1);
    updateWireguardServer$({
      Interface: wireguardState.Interface,
      Peers: newPeers,
    });
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (
      !vpnServerState.WireguardServers ||
      vpnServerState.WireguardServers.length === 0
    ) {
      updateWireguardServer$({
        Interface: {
          Name: "wg-server",
          PrivateKey: "",
          PublicKey: "",
          InterfaceAddress: "192.168.110.1/24",
          ListenPort: 51820,
          Mtu: 1420,
        },
        Peers: [],
      });
    }
  });

  return {
    // State
    wireguardState,
    formState, // Unified state
    // For backward compatibility with existing components
    get advancedFormState() {
      return formState;
    },
    get easyFormState() {
      return formState;
    },
    viewMode,

    // UI state
    showPrivateKey,

    // Errors
    privateKeyError,
    addressError,

    // Core functions
    updateWireguardServer$,
    updateServerConfig,
    updateEasyConfig,
    ensureDefaultConfig,
    setViewMode,

    // Individual field updates (backward compatibility)
    updateName$: $(function (value: string) {
      updateServerConfig({ name: value });
    }),
    updatePrivateKey$: $(function (value: string) {
      updateServerConfig({ privateKey: value });
    }),
    updateInterfaceAddress$: $(function (value: string) {
      updateServerConfig({ interfaceAddress: value });
    }),
    updateListenPort$: $(function (value: number) {
      updateServerConfig({ listenPort: value });
    }),
    updateMtu$: $(function (value: number) {
      updateServerConfig({ mtu: value });
    }),

    // Easy mode field updates (backward compatibility)
    updateEasyName$: $(function (value: string) {
      updateEasyConfig({ name: value });
    }),
    updateEasyPrivateKey$: $(function (value: string) {
      updateEasyConfig({ privateKey: value });
    }),
    updateEasyInterfaceAddress$: $(function (value: string) {
      updateEasyConfig({ interfaceAddress: value });
    }),

    // Legacy function aliases for backward compatibility
    updateEasyForm$: updateEasyConfig,

    // Key generation
    generatePrivateKey,
    handleGeneratePrivateKey,

    // UI controls
    togglePrivateKeyVisibility,
    toggleServerEnabled,
    handleToggle: toggleServerEnabled,

    // Peer management
    addPeer,
    removePeer,
  };
};
