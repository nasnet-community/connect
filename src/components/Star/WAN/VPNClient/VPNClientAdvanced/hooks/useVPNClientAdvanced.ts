import { $, useSignal, useStore, useContext, type QRL } from "@builder.io/qwik";
import type {
  VPNConfig,
  VPNClientAdvancedState,
  MultiVPNConfig,
  VPNType,
} from "../types/VPNClientAdvancedTypes";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { generateUniqueId } from "~/components/Core/common/utils";

export interface UseVPNClientAdvancedReturn {
  state: VPNClientAdvancedState;
  addVPNClient$: QRL<() => void>;
  removeVPNClient$: QRL<(id: string) => void>;
  updateVPNClient$: QRL<(id: string, updates: Partial<VPNConfig>) => void>;
  toggleMode$: QRL<() => void>;
  setViewMode$: QRL<(mode: "expanded" | "compact") => void>;
  setMultiVPNStrategy$: QRL<(strategy: MultiVPNConfig) => void>;
  updateMultiVPN: QRL<(updates: Partial<MultiVPNConfig>) => void>;
  resetAdvanced$: QRL<() => void>;
  generateVPNClientName$: QRL<(index: number, type?: VPNType) => string>;
  moveVPNPriority$: QRL<(id: string, direction: "up" | "down") => void>;
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

  // Calculate Foreign WAN count from StarContext (non-reactive to prevent loops)
  const getForeignWANCount = $(() => {
    const wanLinks = starContext.state.WAN.WANLinks || [];
    const foreignLinks = wanLinks.filter(
      (link) =>
        link.name.toLowerCase().includes("foreign") ||
        link.id.includes("foreign")
    );
    
    // If no WANLinks available, check if Foreign WAN is configured in WANLink
    if (wanLinks.length === 0 && starContext.state.WAN.WANLink.Foreign) {
      return 1; // At least 1 VPN required for Foreign WAN
    }
    
    return Math.max(foreignLinks.length, 1); // At least 1 VPN required
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
  const createDefaultConfig$ = $((type: VPNType) => {
    const baseConfig = {
      id: generateUniqueId("vpn"),
      name: "",
      type,
      enabled: true,
      priority: state.vpnConfigs.length + 1,
      weight: 50,
      assignedLink: undefined as string | undefined,
    };

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
    const newVPNClient = await createDefaultConfig$("Wireguard");
    newVPNClient.name = await generateVPNClientName$(vpnCounter.value, "Wireguard");

    state.vpnConfigs = [...state.vpnConfigs, newVPNClient as VPNConfig];

    // Auto-assign to available Foreign WAN link
    const wanLinks = starContext.state.WAN.WANLinks || [];
    const foreignLinks = wanLinks.filter(
      (link) =>
        link.name.toLowerCase().includes("foreign") ||
        link.id.includes("foreign")
    );

    if (foreignLinks.length > 0) {
      const assignedLinks = state.vpnConfigs
        .map((vpn) => vpn.assignedLink)
        .filter(Boolean);
      const availableLink = foreignLinks.find(
        (link) => !assignedLinks.includes(link.id)
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
  });

  // Remove a VPN client
  const removeVPNClient$ = $((id: string) => {
    // Cannot remove if we're at minimum count
    if (state.vpnConfigs.length <= (state.minVPNCount || 1)) {
      console.warn(`Cannot remove VPN client - minimum ${state.minVPNCount || 1} required`);
      return;
    }

    state.vpnConfigs = state.vpnConfigs.filter((vpn) => vpn.id !== id);

    // Recalculate priorities (optimized)
    state.vpnConfigs.forEach((vpn, index) => {
      vpn.priority = index + 1;
    });

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
    }

    // Remove validation errors for this VPN
    const newErrors = { ...state.validationErrors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`vpn-${id}`)) {
        delete newErrors[key];
      }
    });
    state.validationErrors = newErrors;
  });

  // Update a specific VPN client
  const updateVPNClient$ = $((id: string, updates: Partial<VPNConfig>) => {
    const vpnIndex = state.vpnConfigs.findIndex((vpn) => vpn.id === id);
    if (vpnIndex === -1) return;

    const updatedVPN = { ...state.vpnConfigs[vpnIndex], ...updates };

    // Clear connection config when type changes
    if (
      updates.type &&
      updates.type !== state.vpnConfigs[vpnIndex].type
    ) {
      // Create default config for new type (sync)
      updatedVPN.config = createDefaultConfig$(updates.type) as any;
    }

    // Use Object.assign for proper Qwik reactivity
    Object.assign(state.vpnConfigs[vpnIndex], updatedVPN);
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
    const defaultConfig = await createDefaultConfig$(config.type || "Wireguard");
    const newVPN = { ...defaultConfig, ...config };
    if (!newVPN.name) {
      newVPN.name = await generateVPNClientName$(vpnCounter.value, newVPN.type);
    }
    state.vpnConfigs = [...state.vpnConfigs, newVPN as VPNConfig];
  });

  const removeVPN$ = $((id: string) => {
    removeVPNClient$(id);
  });

  const updateVPN$ = $((id: string, updates: Partial<VPNConfig>) => {
    updateVPNClient$(id, updates);
  });

  const validateAll$ = $(() => {
    // Basic validation - check if all VPNs have required fields
    return state.vpnConfigs.every(vpn => vpn.name && vpn.type && vpn.enabled !== undefined);
  });

  const applyConfiguration$ = $(() => {
    // Apply configuration to StarContext
    console.log('Applying VPN configuration to StarContext', state.vpnConfigs);
  });

  return {
    state,
    addVPNClient$,
    removeVPNClient$,
    updateVPNClient$,
    toggleMode$,
    setViewMode$,
    setMultiVPNStrategy$,
    updateMultiVPN,
    resetAdvanced$,
    generateVPNClientName$,
    moveVPNPriority$,
    foreignWANCount: state.minVPNCount || 1, // Use the stored minVPNCount with fallback
    // Aliases
    addVPN$,
    removeVPN$,
    updateVPN$,
    validateAll$,
    applyConfiguration$,
  };
}

