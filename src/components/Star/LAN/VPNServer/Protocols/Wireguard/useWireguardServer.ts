import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { WireguardServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { VSNetwork } from "../../../../StarContext/Utils/VPNServerType";
import { validatePort, getAllVPNServerPorts } from "../../utils/portValidation";

// Define ViewMode type if it doesn't exist
type ViewMode = "easy" | "advanced";

// Draft configuration for a single WireGuard server
interface WireguardDraftConfig {
  name: string;
  privateKey: string;
  interfaceAddress: string;
  listenPort: number;
  mtu: number;
  vsNetwork: VSNetwork;
}

export const useWireguardServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [], CertificatePassphrase: "" };

  // Get all existing WireGuard servers from StarContext
  const wireguardServers = vpnServerState.WireguardServers || [];

  // Active tab index for managing which server is being edited
  const activeTabIndex = useSignal(0);

  // Error signals
  const privateKeyError = useSignal("");
  const addressError = useSignal("");
  const portError = useSignal("");

  // UI state
  const showPrivateKey = useSignal(false);
  const isEnabled = useSignal(wireguardServers.length > 0);
  const viewMode = useSignal<ViewMode>("advanced");

  // Draft configurations for each tab (not saved to StarContext until explicit save)
  const draftConfigs = useSignal<WireguardDraftConfig[]>(
    wireguardServers && wireguardServers.length > 0
      ? wireguardServers
          .filter((server: WireguardServerConfig) => server && server.Interface) // Filter out invalid servers
          .map((server: WireguardServerConfig) => ({
            name: server.Interface.Name,
            privateKey: server.Interface.PrivateKey || "",
            interfaceAddress: server.Interface.InterfaceAddress,
            listenPort: server.Interface.ListenPort || 51820,
            mtu: server.Interface.Mtu || 1420,
            vsNetwork: server.Interface.VSNetwork || "VPN",
          }))
      : [
          {
            name: "wg-server-1",
            privateKey: "",
            interfaceAddress: "192.168.110.1/24",
            listenPort: 51820,
            mtu: 1420,
            vsNetwork: "VPN",
          },
        ]
  );

  // Update draft configuration for current tab
  const updateDraftConfig$ = $((updates: Partial<WireguardDraftConfig>) => {
    const currentIndex = activeTabIndex.value;
    const next = [...draftConfigs.value];
    next[currentIndex] = { ...next[currentIndex], ...updates };
    draftConfigs.value = next;
  });

  // Add a new server tab with default configuration
  const addServerTab$ = $(() => {
    const newServerNumber = draftConfigs.value.length + 1;
    
    // Get all existing VPN ports to avoid conflicts
    const allPorts = getAllVPNServerPorts(starContext.state);
    
    // Also get ports from current draft configs (unsaved servers)
    const draftPorts = draftConfigs.value.map(draft => ({
      protocol: "Wireguard" as const,
      serverName: draft.name,
      port: draft.listenPort
    }));
    
    // Combine saved and draft ports
    const combinedPorts = [...allPorts, ...draftPorts];
    
    let nextPort = 51820 + newServerNumber - 1;
    
    // Find next available port
    while (combinedPorts.some(p => p.port === nextPort)) {
      nextPort++;
    }
    
    const newDraft: WireguardDraftConfig = {
      name: `wg-server-${newServerNumber}`,
      privateKey: "",
      interfaceAddress: `192.168.${110 + newServerNumber - 1}.1/24`,
      listenPort: nextPort,
      mtu: 1420,
      vsNetwork: "VPN",
    };
    draftConfigs.value = [...draftConfigs.value, newDraft];
    activeTabIndex.value = draftConfigs.value.length - 1;
  });

  // Remove a server tab
  const removeServerTab$ = $((index: number) => {
    if (draftConfigs.value.length > 1) {
      const next = [...draftConfigs.value];
      next.splice(index, 1);
      draftConfigs.value = next;
      // Adjust active tab if needed
      if (activeTabIndex.value >= draftConfigs.value.length) {
        activeTabIndex.value = draftConfigs.value.length - 1;
      }
      // Also remove from StarContext
      const updatedServers = [...wireguardServers];
      updatedServers.splice(index, 1);
      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          WireguardServers: updatedServers.length > 0 ? updatedServers : undefined,
        },
      });
    }
  });

  // Save current tab configuration to StarContext
  const saveCurrentServer$ = $(() => {
    const currentIndex = activeTabIndex.value;
    const currentDraft = draftConfigs.value[currentIndex] || draftConfigs.value[0];

    // Reset errors
    privateKeyError.value = "";
    addressError.value = "";
    portError.value = "";

    let isValid = true;

    // Private key validation removed - not required for this implementation
    // if (!currentDraft.privateKey || !currentDraft.privateKey.trim()) {
    //   privateKeyError.value = $localize`Private key is required`;
    //   isValid = false;
    // }

    // Validate interface address
    if (!currentDraft.interfaceAddress || !currentDraft.interfaceAddress.includes("/")) {
      addressError.value = $localize`Valid interface address with subnet is required (e.g., 192.168.110.1/24)`;
      isValid = false;
    }

    // Validate port
    const allPorts = getAllVPNServerPorts(starContext.state);
    const portValidation = validatePort(
      currentDraft.listenPort,
      currentDraft.name,
      allPorts
    );

    if (!portValidation.valid) {
      portError.value = portValidation.error || "";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Create server config from draft
    const serverConfig: WireguardServerConfig = {
      Interface: {
        Name: currentDraft.name,
        PrivateKey: currentDraft.privateKey || "",  // Empty is acceptable
        PublicKey: "", // Would be derived from private key
        InterfaceAddress: currentDraft.interfaceAddress,
        ListenPort: currentDraft.listenPort,
        Mtu: currentDraft.mtu,
        VSNetwork: currentDraft.vsNetwork,
      },
      Peers: wireguardServers[currentIndex]?.Peers || [],
    };

    // Update StarContext with the saved server
    const updatedServers = [...wireguardServers];
    if (currentIndex < updatedServers.length) {
      updatedServers[currentIndex] = serverConfig;
    } else {
      updatedServers.push(serverConfig);
    }

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        WireguardServers: updatedServers,
      },
    });
  });

  // Save all servers (all tabs) to StarContext
  const saveAllServers$ = $(() => {
    const validServers: WireguardServerConfig[] = [];
    const errors: string[] = [];

    // Get all existing VPN ports to avoid conflicts
    const allPorts = getAllVPNServerPorts(starContext.state);

    // Validate and collect all drafts
    for (let i = 0; i < draftConfigs.value.length; i++) {
      const draft = draftConfigs.value[i];
      let hasError = false;

      // Private key validation removed - not required for this implementation
      // if (!draft.privateKey || !draft.privateKey.trim()) {
      //   errors.push(`${draft.name}: Private key is required`);
      //   hasError = true;
      // }

      // Validate interface address
      if (!draft.interfaceAddress || !draft.interfaceAddress.includes("/")) {
        errors.push(`${draft.name}: Valid interface address with subnet is required`);
        hasError = true;
      }

      // Validate port
      const portValidation = validatePort(
        draft.listenPort,
        draft.name,
        allPorts
      );

      if (!portValidation.valid) {
        errors.push(`${draft.name}: ${portValidation.error}`);
        hasError = true;
      }

      // If valid, add to valid servers list
      if (!hasError) {
        const serverConfig: WireguardServerConfig = {
          Interface: {
            Name: draft.name,
            PrivateKey: draft.privateKey || "",  // Empty is acceptable
            PublicKey: "", // Would be derived from private key
            InterfaceAddress: draft.interfaceAddress,
            ListenPort: draft.listenPort,
            Mtu: draft.mtu,
            VSNetwork: draft.vsNetwork,
          },
          Peers: wireguardServers[i]?.Peers || [],
        };
        validServers.push(serverConfig);
      }
    }

    // Get FRESH state instead of using stale vpnServerState captured at initialization
    const currentVPNState = starContext.state.LAN.VPNServer || { Users: [], CertificatePassphrase: "" };

    // Save all valid servers to StarContext
    // If we have valid servers, use them; otherwise keep existing servers
    starContext.updateLAN$({
      VPNServer: {
        ...currentVPNState,
        WireguardServers: validServers.length > 0 ? validServers : currentVPNState.WireguardServers,
      },
    });

    return {
      saved: validServers.length,
      total: draftConfigs.value.length,
      errors,
    };
  });

  // Switch to a different tab
  const switchTab$ = $((index: number) => {
    if (index >= 0 && index < draftConfigs.value.length) {
      activeTabIndex.value = index;
    }
  });

  // Update individual fields in the current draft
  const updateName$ = $((value: string) => {
    updateDraftConfig$({ name: value });
  });

  const updatePrivateKey$ = $((value: string) => {
    updateDraftConfig$({ privateKey: value });
    privateKeyError.value = "";
  });

  const updateInterfaceAddress$ = $((value: string) => {
    updateDraftConfig$({ interfaceAddress: value });
    addressError.value = "";
  });

  const updateListenPort$ = $((value: number) => {
    updateDraftConfig$({ listenPort: value });
    
    // Get all saved ports
    const allPorts = getAllVPNServerPorts(starContext.state);
    
    // Add draft ports (excluding current draft)
    const currentIndex = activeTabIndex.value;
    const draftPorts = draftConfigs.value
      .filter((_, index) => index !== currentIndex)
      .map(draft => ({
        protocol: "Wireguard" as const,
        serverName: draft.name,
        port: draft.listenPort
      }));
    
    const combinedPorts = [...allPorts, ...draftPorts];
    const currentDraft = draftConfigs.value[currentIndex];
    const validation = validatePort(value, currentDraft.name, combinedPorts);
    
    if (!validation.valid) {
      portError.value = validation.error || "";
    } else {
      portError.value = "";
    }
  });

  const updateMtu$ = $((value: number) => {
    updateDraftConfig$({ mtu: value });
  });

  const updateVSNetwork$ = $((value: VSNetwork) => {
    updateDraftConfig$({ vsNetwork: value });
  });

  // For easy mode compatibility
  const updateEasyConfig = $((updatedValues: Partial<WireguardDraftConfig>) => {
    updateDraftConfig$(updatedValues);
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
    // Generate a random private key
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const newPrivateKey = btoa(String.fromCharCode(...array));

    // Update the private key in the current draft
    updatePrivateKey$(newPrivateKey);
  });

  // Toggle private key visibility
  const togglePrivateKeyVisibility = $(() => {
    showPrivateKey.value = !showPrivateKey.value;
  });

  // Toggle server enable status
  const toggleServerEnabled = $(() => {
    const newStatus = !isEnabled.value;
    isEnabled.value = newStatus;

    // If disabling, clear all servers
    if (!newStatus) {
      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          WireguardServers: undefined,
        },
      });
    }
  });

  // Set view mode (easy or advanced)
  const setViewMode = $((mode: ViewMode) => {
    viewMode.value = mode;
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.WireguardServers || vpnServerState.WireguardServers.length === 0) {
      // Initialize with one default server
      if (draftConfigs.value.length === 0) {
        draftConfigs.value = [
          ...draftConfigs.value,
          {
            name: "wg-server-1",
            privateKey: "",
            interfaceAddress: "192.168.110.1/24",
            listenPort: 51820,
            mtu: 1420,
            vsNetwork: "VPN",
          }
        ];
      }
    }
  });

  return {
    // State
    wireguardServers,
    draftConfigs,
    activeTabIndex,

    // For backward compatibility with existing components
    get advancedFormState() {
      return draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
    },
    get easyFormState() {
      return draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
    },
    viewMode,

    // UI state
    showPrivateKey,
    isEnabled,

    // Errors
    privateKeyError,
    addressError,
    portError,

    // Tab management
    addServerTab$,
    removeServerTab$,
    switchTab$,

    // Core functions
    updateDraftConfig$,
    saveCurrentServer$,
    saveAllServers$,
    ensureDefaultConfig,
    setViewMode,

    // Individual field updates
    updateName$,
    updatePrivateKey$,
    updateInterfaceAddress$,
    updateListenPort$,
    updateMtu$,
    updateVSNetwork$,

    // Easy mode compatibility
    updateEasyConfig,
    updateEasyForm$: updateEasyConfig,
    updateEasyName$: updateName$,
    updateEasyPrivateKey$: updatePrivateKey$,
    updateEasyInterfaceAddress$: updateInterfaceAddress$,

    // Key generation
    generatePrivateKey,
    handleGeneratePrivateKey,

    // UI controls
    togglePrivateKeyVisibility,
    toggleServerEnabled,
    handleToggle: toggleServerEnabled,

    // Backward compatibility aliases
    updateServerConfig: updateDraftConfig$,
  };
};
