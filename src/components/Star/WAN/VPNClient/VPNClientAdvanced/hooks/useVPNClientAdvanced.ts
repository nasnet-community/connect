import { $, useSignal, useStore, useContext, type QRL } from "@builder.io/qwik";
import type {
  VPNConfig,
  VPNClientAdvancedState,
  MultiVPNConfig,
  VPNType,
} from "../types/VPNClientAdvancedTypes";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { generateUniqueId } from "~/components/Core/common/utils";
import { useNetworks } from "~/utils/useNetworks";
import type { VPNClient } from "~/components/Star/StarContext/Utils/VPNClientType";
import type { MultiLinkConfig } from "~/components/Star/StarContext/WANType";

export interface UseVPNClientAdvancedReturn {
  state: VPNClientAdvancedState;
  addVPNClient$: QRL<() => void>;
  removeVPNClient$: QRL<(id: string) => void>;
  updateVPNClient$: QRL<(id: string, updates: Partial<VPNConfig>) => void>;
  batchUpdateVPNs$: QRL<(updates: Array<{ id: string; updates: Partial<VPNConfig> }>) => void>;
  toggleMode$: QRL<() => void>;
  setViewMode$: QRL<(mode: "expanded" | "compact") => void>;
  setMultiVPNStrategy$: QRL<(strategy: MultiVPNConfig) => void>;
  updateMultiVPN: QRL<(updates: Partial<MultiVPNConfig>) => void>;
  resetAdvanced$: QRL<() => void>;
  refreshForeignWANCount$: QRL<() => Promise<void>>;
  generateVPNClientName$: QRL<(index: number, type?: VPNType) => string>;
  moveVPNPriority$: QRL<(id: string, direction: "up" | "down") => void>;
  syncWithStarContext$: QRL<() => void>;
  foreignWANCount: number;
  // Aliases for component compatibility
  addVPN$: QRL<(config: Partial<VPNConfig>) => Promise<void>>;
  removeVPN$: QRL<(id: string) => void>;
  updateVPN$: QRL<(id: string, updates: Partial<VPNConfig>) => void>;
  validateAll$: QRL<() => boolean>;
  applyConfiguration$: QRL<() => void>;
}

export const useVPNClientAdvanced = (): UseVPNClientAdvancedReturn => {
  const starContext = useContext(StarContext);
  const networks = useNetworks();

  // Calculate Foreign WAN count from StarContext (non-reactive to prevent loops)
  const getForeignWANCount = $(() => {
    // Get Foreign WAN configs count from WANLink structure  
    const foreignWANConfigs = starContext.state.WAN.WANLink.Foreign.WANConfigs || [];
    console.log('[useVPNClientAdvanced] getForeignWANCount - Foreign WANConfigs:', foreignWANConfigs);
    console.log('[useVPNClientAdvanced] getForeignWANCount - Foreign WANConfigs length:', foreignWANConfigs.length);
    
    // If no Foreign WAN configs, check if Foreign WAN is configured
    if (foreignWANConfigs.length === 0 && starContext.state.WAN.WANLink.Foreign) {
      console.log('[useVPNClientAdvanced] Foreign WAN exists but no configs, returning 1');
      return 1; // At least 1 VPN required for Foreign WAN
    }
    
    console.log('[useVPNClientAdvanced] Final foreign count:', Math.max(1, foreignWANConfigs.length));
    return Math.max(1, foreignWANConfigs.length); // At least 1 VPN required
  });

  // Initialize state with minimum required VPN clients
  const state = useStore<VPNClientAdvancedState>({
    mode: "advanced",
    vpnConfigs: [],
    priorities: [],
    validationErrors: {},
    minVPNCount: 1, // Will be updated after initialization
  });

  // Track VPN counter for naming
  const vpnCounter = useSignal(1);

  // Generate consistent VPN client names
  const generateVPNClientName$ = $((index: number, type: VPNType = "Wireguard") => {
    return `${type} VPN ${index}`;
  });

  // Create default config based on VPN type
  const createDefaultConfig$ = $((type?: VPNType) => {
    const baseConfig = {
      id: generateUniqueId("vpn"),
      name: "",
      type,
      enabled: true,
      priority: state.vpnConfigs.length + 1,
      weight: 50,
      assignedLink: undefined as string | undefined,
    };

    // If no type provided, return uninitialized config
    if (!type) {
      return baseConfig;
    }

    switch (type) {
      case "Wireguard":
        return {
          ...baseConfig,
          config: {
            InterfacePrivateKey: "",
            InterfaceAddress: "",
            PeerPublicKey: "",
            PeerEndpointAddress: "",
            PeerEndpointPort: 51820,
            PeerAllowedIPs: "0.0.0.0/0",
          },
        };

      case "OpenVPN":
        return {
          ...baseConfig,
          config: {
            Server: { Address: "", Port: "1194" },
            AuthType: "Credentials" as const,
            Auth: "sha256" as const,
            Mode: "layer3" as const,
            Protocol: "udp" as const,
          },
        };

      case "PPTP":
        return {
          ...baseConfig,
          config: {
            ConnectTo: "",
            Credentials: { Username: "", Password: "" },
            AuthMethod: ["pap", "chap", "mschap1", "mschap2"] as const,
          },
        };

      case "L2TP":
        return {
          ...baseConfig,
          config: {
            Server: { Address: "", Port: "1701" },
            Credentials: { Username: "", Password: "" },
            UseIPsec: true,
            IPsecSecret: "",
          },
        };

      case "SSTP":
        return {
          ...baseConfig,
          config: {
            Server: { Address: "", Port: "443" },
            Credentials: { Username: "", Password: "" },
            AuthMethod: ["pap", "chap", "mschap1", "mschap2"] as const,
            TlsVersion: "tls1.2" as const,
          },
        };

      case "IKeV2":
        return {
          ...baseConfig,
          config: {
            Server: { Address: "", Port: "500" },
            Credentials: { Username: "", Password: "" },
            AuthMethod: ["eap-mschapv2"] as const,
          },
        };

      default:
        return baseConfig;
    }
  });

  // Add a new VPN client
  const addVPNClient$ = $(async () => {
    vpnCounter.value++;
    const newVPNClient = await createDefaultConfig$();
    newVPNClient.name = `VPN ${vpnCounter.value}`;

    state.vpnConfigs = [...state.vpnConfigs, newVPNClient as VPNConfig];

    // Auto-assign to available Foreign WAN link
    const foreignWANConfigs = starContext.state.WAN.WANLink.Foreign.WANConfigs || [];
    const foreignLinks = foreignWANConfigs.map((config, index) => ({
      id: config.name || `foreign-${index}`,
      name: config.name || `Foreign Link ${index + 1}`,
    }));

    if (foreignLinks.length > 0) {
      const assignedLinks = state.vpnConfigs
        .map((vpn) => vpn.assignedLink)
        .filter(Boolean);
      const availableLink = foreignLinks.find(
        (link: any) => !assignedLinks.includes(link.id)
      );
      
      if (availableLink) {
        newVPNClient.assignedLink = availableLink.id;
      }
    } else if (starContext.state.WAN.WANLink.Foreign) {
      // If no WANLinks but Foreign WAN exists, use a generic assignment
      newVPNClient.assignedLink = "foreign-wan";
    }

    // Recalculate weights if in load balance mode (optimized)
    if (
      state.multiVPNStrategy?.strategy === "RoundRobin" &&
      state.vpnConfigs.length > 1
    ) {
      const equalWeight = Math.floor(100 / state.vpnConfigs.length);
      const remainder = 100 - equalWeight * state.vpnConfigs.length;

      // Use direct property updates instead of array replacement
      state.vpnConfigs.forEach((vpn, index) => {
        vpn.weight = index === 0 ? equalWeight + remainder : equalWeight;
      });
    }
    
    // Update Networks configuration when VPN clients change
    networks.generateCurrentNetworks$();
  });

  // Remove a VPN client
  const removeVPNClient$ = $((id: string) => {
    // Cannot remove if we're at minimum count
    if (state.vpnConfigs.length <= (state.minVPNCount || 1)) {
      console.warn(`Cannot remove VPN client - minimum ${state.minVPNCount || 1} required`);
      return;
    }

    console.log(`[useVPNClientAdvanced] Removing VPN: ${id}`);
    state.vpnConfigs = state.vpnConfigs.filter((vpn) => vpn.id !== id);

    // Recalculate priorities (optimized)
    state.vpnConfigs.forEach((vpn, index) => {
      vpn.priority = index + 1;
    });
    
    // Update the priorities array
    state.priorities = state.vpnConfigs.map(vpn => vpn.id);
    console.log('[useVPNClientAdvanced] Priorities recalculated after removal:', state.vpnConfigs.map(v => ({ name: v.name, priority: v.priority })));
    console.log('[useVPNClientAdvanced] Updated priorities array after removal:', state.priorities);

    // Remove multi-VPN strategy if we're back to single VPN
    if (state.vpnConfigs.length <= 1) {
      console.log('[useVPNClientAdvanced] Single VPN remaining, removing multi-VPN strategy');
      state.multiVPNStrategy = undefined;
    }

    // Recalculate weights (optimized)
    if (
      state.multiVPNStrategy?.strategy === "RoundRobin" &&
      state.vpnConfigs.length > 0
    ) {
      const equalWeight = Math.floor(100 / state.vpnConfigs.length);
      const remainder = 100 - equalWeight * state.vpnConfigs.length;

      state.vpnConfigs.forEach((vpn, index) => {
        vpn.weight = index === 0 ? equalWeight + remainder : equalWeight;
      });
      console.log('[useVPNClientAdvanced] Weights recalculated after removal:', state.vpnConfigs.map(v => ({ name: v.name, weight: v.weight })));
    }

    // Remove validation errors for this VPN
    const newErrors = { ...state.validationErrors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`vpn-${id}`)) {
        delete newErrors[key];
      }
    });
    state.validationErrors = newErrors;
    
    // Update Networks configuration when VPN clients change
    networks.generateCurrentNetworks$();
  });

  // Update a specific VPN client
  const updateVPNClient$ = $(async (id: string, updates: Partial<VPNConfig>) => {
    console.log(`[useVPNClientAdvanced] updateVPNClient$ called for ${id}:`, updates);
    const vpnIndex = state.vpnConfigs.findIndex((vpn) => vpn.id === id);
    if (vpnIndex === -1) {
      console.log(`[useVPNClientAdvanced] VPN with id ${id} not found`);
      return;
    }

    const currentVPN = state.vpnConfigs[vpnIndex];
    console.log(`[useVPNClientAdvanced] Current VPN before update:`, currentVPN);
    
    const updatedVPN = { ...currentVPN, ...updates };

    // Clear connection config when type changes
    if (
      updates.type &&
      updates.type !== currentVPN.type
    ) {
      console.log(`[useVPNClientAdvanced] VPN type changed from ${currentVPN.type} to ${updates.type}, creating new config`);
      // Create default config for new type
      const newConfig = await createDefaultConfig$(updates.type);
      if ('config' in newConfig && newConfig.config) {
        (updatedVPN as any).config = newConfig.config;
      }
    }

    // Use Object.assign for proper Qwik reactivity
    Object.assign(state.vpnConfigs[vpnIndex], updatedVPN);
    console.log(`[useVPNClientAdvanced] VPN updated, new state:`, state.vpnConfigs[vpnIndex]);
    
    // Update priorities array to maintain consistency
    state.priorities = state.vpnConfigs.map(vpn => vpn.id);
    console.log('[useVPNClientAdvanced] Updated priorities array after VPN update:', state.priorities);
    
    // Update Networks configuration when VPN clients change
    networks.generateCurrentNetworks$();
  });

  // Batch update multiple VPN clients at once
  const batchUpdateVPNs$ = $(async (updates: Array<{ id: string; updates: Partial<VPNConfig> }>) => {
    // Create a new array with all updates applied
    const newVPNs = [...state.vpnConfigs];
    
    for (const { id, updates: vpnUpdates } of updates) {
      const vpnIndex = newVPNs.findIndex((vpn) => vpn.id === id);
      if (vpnIndex === -1) continue;

      const currentVPN = newVPNs[vpnIndex];
      const updatedVPN = { ...currentVPN, ...vpnUpdates };

      // Clear connection config when type changes
      if (
        vpnUpdates.type &&
        vpnUpdates.type !== currentVPN.type
      ) {
        // Create default config for new type
        const newConfig = await createDefaultConfig$(vpnUpdates.type);
        if ('config' in newConfig && newConfig.config) {
          (updatedVPN as any).config = newConfig.config;
        }
      }

      newVPNs[vpnIndex] = updatedVPN as VPNConfig;
    }

    // Update state once with all changes
    state.vpnConfigs = newVPNs;
    
    // Update priorities array to maintain consistency
    state.priorities = state.vpnConfigs.map(vpn => vpn.id);
    console.log('[useVPNClientAdvanced] Batch update completed, updated priorities array:', state.priorities);
    
    // Update Networks configuration when VPN clients change
    networks.generateCurrentNetworks$();
  });

  // Toggle between easy and advanced mode (disabled in advanced interface)
  const toggleMode$ = $(() => {
    console.warn("Mode toggling is disabled in the VPN Client Advanced interface");
  });

  // Set view mode for compact/expanded display
  const setViewMode$ = $((mode: "expanded" | "compact") => {
    state.viewMode = mode;
  });

  // Set multi-VPN strategy
  const setMultiVPNStrategy$ = $((strategy: MultiVPNConfig) => {
    state.multiVPNStrategy = strategy;

    // Initialize weights for round robin (optimized)
    if (strategy.strategy === "RoundRobin" && state.vpnConfigs.length > 0) {
      const equalWeight = Math.floor(100 / state.vpnConfigs.length);
      const remainder = 100 - equalWeight * state.vpnConfigs.length;

      state.vpnConfigs.forEach((vpn, index) => {
        vpn.weight = index === 0 ? equalWeight + remainder : equalWeight;
      });
    }
  });

  // Update multi-VPN configuration
  const updateMultiVPN = $((updates: Partial<MultiVPNConfig>) => {
    if (!state.multiVPNStrategy) {
      state.multiVPNStrategy = updates as MultiVPNConfig;
    } else {
      state.multiVPNStrategy = { ...state.multiVPNStrategy, ...updates };
    }
  });

  // Move VPN priority up or down
  const moveVPNPriority$ = $((id: string, direction: "up" | "down") => {
    const currentIndex = state.vpnConfigs.findIndex((vpn) => vpn.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= state.vpnConfigs.length) return;

    // Swap the VPN clients
    const vpns = [...state.vpnConfigs];
    [vpns[currentIndex], vpns[newIndex]] = [vpns[newIndex], vpns[currentIndex]];
    
    // Update priorities
    vpns.forEach((vpn, index) => {
      vpn.priority = index + 1;
    });

    state.vpnConfigs = vpns;
  });

  // Refresh foreign WAN count from StarContext
  const refreshForeignWANCount$ = $(async () => {
    console.log('[useVPNClientAdvanced] refreshForeignWANCount$ called');
    const newCount = await getForeignWANCount();
    console.log('[useVPNClientAdvanced] refreshForeignWANCount$ - old minVPNCount:', state.minVPNCount);
    console.log('[useVPNClientAdvanced] refreshForeignWANCount$ - new minVPNCount:', newCount);
    state.minVPNCount = newCount;
    console.log('[useVPNClientAdvanced] refreshForeignWANCount$ - updated state.minVPNCount:', state.minVPNCount);
  });

  // Reset advanced configuration to initial state
  const resetAdvanced$ = $(async () => {
    vpnCounter.value = 1;
    state.mode = "advanced";
    state.vpnConfigs = [];
    state.priorities = [];
    state.multiVPNStrategy = undefined;
    state.validationErrors = {};
    state.minVPNCount = await getForeignWANCount();
  });

  // Alias methods for component compatibility
  const addVPN$ = $(async (config: Partial<VPNConfig>) => {
    vpnCounter.value++;
    const defaultConfig = await createDefaultConfig$(config.type);
    const newVPN = { ...defaultConfig, ...config };
    if (!newVPN.name) {
      // Only generate type-specific name if type is provided
      if (newVPN.type) {
        newVPN.name = await generateVPNClientName$(vpnCounter.value, newVPN.type);
      } else {
        newVPN.name = `VPN ${vpnCounter.value}`;
      }
    }
    
    // Ensure priority is set for proper multi-VPN validation
    if (!newVPN.priority) {
      newVPN.priority = state.vpnConfigs.length + 1;
    }
    
    console.log(`[useVPNClientAdvanced] Adding VPN with priority ${newVPN.priority}:`, newVPN);
    state.vpnConfigs = [...state.vpnConfigs, newVPN as VPNConfig];
    
    // Update the priorities array with the new VPN order
    state.priorities = state.vpnConfigs.map(vpn => vpn.id);
    console.log('[useVPNClientAdvanced] Updated priorities array:', state.priorities);
    
    // Initialize multi-VPN strategy if we now have multiple VPNs
    if (state.vpnConfigs.length > 1 && !state.multiVPNStrategy) {
      console.log('[useVPNClientAdvanced] Multiple VPNs detected, initializing default strategy');
      state.multiVPNStrategy = {
        strategy: "Failover",
        failoverCheckInterval: 10,
        failoverTimeout: 30
      };
    }
  });

  const removeVPN$ = $((id: string) => {
    removeVPNClient$(id);
  });

  const updateVPN$ = $((id: string, updates: Partial<VPNConfig>) => {
    console.log(`[useVPNClientAdvanced] updateVPN$ called for ${id}:`, updates);
    updateVPNClient$(id, updates);
  });

  const validateAll$ = $(() => {
    // Basic validation - check if all VPNs have required fields
    return state.vpnConfigs.every(vpn => vpn.name && vpn.type && vpn.enabled !== undefined);
  });

  // Helper function to sync local state with StarContext
  const syncWithStarContext$ = $(() => {
    console.log('[useVPNClientAdvanced] syncWithStarContext$ called');
    console.log('[useVPNClientAdvanced] Current vpnConfigs:', state.vpnConfigs);

    // Convert VPNClientAdvancedState to StarContext VPNClient structure
    const vpnClient: VPNClient = {};

    // Group VPN configs by type and convert to StarContext format
    const wireguardConfigs = state.vpnConfigs
      .filter(vpn => vpn.type === "Wireguard" && 'config' in vpn)
      .map(vpn => (vpn as any).config);

    const openVPNConfigs = state.vpnConfigs
      .filter(vpn => vpn.type === "OpenVPN" && 'config' in vpn)
      .map(vpn => (vpn as any).config);

    const pptpConfigs = state.vpnConfigs
      .filter(vpn => vpn.type === "PPTP" && 'config' in vpn)
      .map(vpn => (vpn as any).config);

    const l2tpConfigs = state.vpnConfigs
      .filter(vpn => vpn.type === "L2TP" && 'config' in vpn)
      .map(vpn => (vpn as any).config);

    const sstpConfigs = state.vpnConfigs
      .filter(vpn => vpn.type === "SSTP" && 'config' in vpn)
      .map(vpn => (vpn as any).config);

    const ikev2Configs = state.vpnConfigs
      .filter(vpn => vpn.type === "IKeV2" && 'config' in vpn)
      .map(vpn => (vpn as any).config);

    // Only add non-empty arrays to vpnClient
    if (wireguardConfigs.length > 0) {
      vpnClient.Wireguard = wireguardConfigs;
    }
    if (openVPNConfigs.length > 0) {
      vpnClient.OpenVPN = openVPNConfigs;
    }
    if (pptpConfigs.length > 0) {
      vpnClient.PPTP = pptpConfigs;
    }
    if (l2tpConfigs.length > 0) {
      vpnClient.L2TP = l2tpConfigs;
    }
    if (sstpConfigs.length > 0) {
      vpnClient.SSTP = sstpConfigs;
    }
    if (ikev2Configs.length > 0) {
      vpnClient.IKeV2 = ikev2Configs;
    }

    // Convert MultiVPNConfig to MultiLinkConfig if present
    if (state.multiVPNStrategy) {
      const multiLinkConfig: MultiLinkConfig = {
        strategy: state.multiVPNStrategy.strategy as any,
      };

      if (state.multiVPNStrategy.loadBalanceMethod) {
        multiLinkConfig.loadBalanceMethod = state.multiVPNStrategy.loadBalanceMethod;
      }

      if (state.multiVPNStrategy.failoverCheckInterval || state.multiVPNStrategy.failoverTimeout) {
        multiLinkConfig.FailoverConfig = {
          failoverCheckInterval: state.multiVPNStrategy.failoverCheckInterval,
          failoverTimeout: state.multiVPNStrategy.failoverTimeout,
        };
      }

      if (state.multiVPNStrategy.roundRobinInterval) {
        multiLinkConfig.roundRobinInterval = state.multiVPNStrategy.roundRobinInterval;
      }

      vpnClient.MultiLinkConfig = multiLinkConfig;
    }

    // Update StarContext with the new VPN configuration
    starContext.state.WAN.VPNClient = vpnClient;

    console.log('[useVPNClientAdvanced] StarContext updated with VPN configuration:', vpnClient);
    console.log('[useVPNClientAdvanced] StarContext.state.WAN.VPNClient:', starContext.state.WAN.VPNClient);

    // Update Networks configuration after syncing
    networks.generateCurrentNetworks$();
  });

  const applyConfiguration$ = $(() => {
    // Apply configuration to StarContext
    console.log('[useVPNClientAdvanced] Applying VPN configuration to StarContext');

    // Sync with StarContext
    syncWithStarContext$();

    console.log('[useVPNClientAdvanced] Configuration applied successfully');
  });

  return {
    state,
    addVPNClient$,
    removeVPNClient$,
    updateVPNClient$,
    batchUpdateVPNs$,
    toggleMode$,
    setViewMode$,
    setMultiVPNStrategy$,
    updateMultiVPN,
    resetAdvanced$,
    refreshForeignWANCount$,
    generateVPNClientName$,
    moveVPNPriority$,
    syncWithStarContext$,
    foreignWANCount: state.minVPNCount || 1, // Use the stored minVPNCount with fallback
    // Aliases
    addVPN$,
    removeVPN$,
    updateVPN$,
    validateAll$,
    applyConfiguration$,
  };
}

