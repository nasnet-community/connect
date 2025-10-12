import { $, useSignal, useStore, useContext, type QRL } from "@builder.io/qwik";
import type {
  VPNClientAdvancedState,
  VPNConfig,
  VPNType,
  NewVPNConfig,
} from "../types/VPNClientAdvancedTypes";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { generateUniqueId } from "~/components/Core/common/utils";

export interface UseAdvancedVPNReturn {
  state: VPNClientAdvancedState;
  addVPN$: QRL<(config: NewVPNConfig) => void>;
  removeVPN$: QRL<(id: string) => void>;
  updateVPN$: QRL<(id: string, updates: Partial<VPNConfig>) => Promise<void>>;
  setPriorities$: QRL<(priorities: string[]) => void>;
  resetVPNs$: QRL<() => void>;
  moveVPNPriority$: QRL<(id: string, direction: "up" | "down") => void>;
  generateVPNName$: QRL<(type: VPNType, index: number) => string>;
  minVPNCount: number;
}

export function useAdvancedVPN(): UseAdvancedVPNReturn {
  const starContext = useContext(StarContext);

  // Calculate minimum VPN count based on Foreign WAN links
  // In advanced mode, we need to check the WAN configuration
  const calculateMinVPNCount = () => {
    // Get Foreign WAN configs count from WANLink structure
    const foreignWANConfigs = starContext.state.WAN.WANLink.Foreign?.WANConfigs || [];
    return foreignWANConfigs.length || 1; // At least 1 VPN required, or match Foreign WAN configs count
  };

  const minVPNCount = calculateMinVPNCount();

  // Initialize state
  const state = useStore<VPNClientAdvancedState>({
    vpnConfigs: [],
    priorities: [],
    validationErrors: {},
    minVPNCount,
    mode: "advanced",
  });

  // Track VPN counter for naming
  const vpnCounter = useSignal(0);

  // Generate consistent VPN names
  const generateVPNName$ = $((type: VPNType | undefined, index: number) => {
    if (!type) {
      return `VPN ${index}`;
    }
    return `${type} VPN ${index}`;
  });

  // Create default config based on VPN type
  const createDefaultConfig$ = $((type: VPNType | undefined): any => {
    if (!type) {
      return undefined;
    }
    switch (type) {
      case "Wireguard":
        return {
          InterfacePrivateKey: "",
          InterfaceAddress: "",
          PeerPublicKey: "",
          PeerEndpointAddress: "",
          PeerEndpointPort: 51820,
          PeerAllowedIPs: "0.0.0.0/0",
        };

      case "OpenVPN":
        return {
          Server: { Address: "", Port: "1194" },
          AuthType: "Credentials",
          Auth: "sha256",
          Mode: "layer3",
          Protocol: "udp",
        };

      case "PPTP":
        return {
          ConnectTo: "",
          Credentials: { Username: "", Password: "" },
          AuthMethod: ["pap", "chap", "mschap1", "mschap2"],
        };

      case "L2TP":
        return {
          Server: { Address: "", Port: "1701" },
          Credentials: { Username: "", Password: "" },
          UseIPsec: true,
          IPsecSecret: "",
        };

      case "SSTP":
        return {
          Server: { Address: "", Port: "443" },
          Credentials: { Username: "", Password: "" },
          AuthMethod: ["pap", "chap", "mschap1", "mschap2"],
          TlsVersion: "tls1.2",
        };

      case "IKeV2":
        return {
          ServerAddress: "",
          AuthMethod: "pre-shared-key",
          PresharedKey: "",
          EncAlgorithm: ["aes-256"],
          HashAlgorithm: ["sha256"],
          DhGroup: ["modp2048"],
        };

      default:
        return {};
    }
  });

  // Add a new VPN configuration
  const addVPN$ = $(async (newConfig: NewVPNConfig) => {
    vpnCounter.value++;

    const id = generateUniqueId("vpn");
    const name =
      newConfig.name ||
      (await generateVPNName$(newConfig.type, vpnCounter.value));
    const config = await createDefaultConfig$(newConfig.type);

    const vpnConfig: VPNConfig = {
      id,
      name,
      type: newConfig.type,
      priority: state.vpnConfigs.length + 1,
      enabled: true,
      description: newConfig.description,
      config,
    } as VPNConfig;

    state.vpnConfigs = [...state.vpnConfigs, vpnConfig];
    state.priorities = [...state.priorities, id];

    // Clear min count error if we now meet the requirement
    if (state.vpnConfigs.length >= minVPNCount) {
      const newErrors = { ...state.validationErrors };
      delete newErrors["global-minCount"];
      state.validationErrors = newErrors;
    }
  });

  // Remove a VPN configuration
  const removeVPN$ = $((id: string) => {
    // Check if removal would violate min count
    if (state.vpnConfigs.length <= minVPNCount) {
      state.validationErrors = {
        ...state.validationErrors,
        "global-minCount": [
          `Minimum ${minVPNCount} VPN configuration(s) required based on Foreign WAN links`,
        ],
      };
      return;
    }

    state.vpnConfigs = state.vpnConfigs.filter((vpn) => vpn.id !== id);
    state.priorities = state.priorities.filter((pid) => pid !== id);

    // Recalculate priorities
    state.vpnConfigs = state.vpnConfigs.map((vpn, index) => ({
      ...vpn,
      priority: index + 1,
    }));

    // Remove validation errors for this VPN
    const newErrors = { ...state.validationErrors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`vpn-${id}`)) {
        delete newErrors[key];
      }
    });
    state.validationErrors = newErrors;
  });

  // Update a specific VPN configuration
  const updateVPN$ = $(async (id: string, updates: Partial<VPNConfig>) => {
    const vpnIndex = state.vpnConfigs.findIndex((vpn) => vpn.id === id);
    if (vpnIndex === -1) return;

    const currentVPN = state.vpnConfigs[vpnIndex];

    // Handle type changes - reset config if type changes
    if (updates.type && updates.type !== currentVPN.type) {
      const newConfig = await createDefaultConfig$(updates.type);
      updates = { ...updates, config: newConfig };
    }

    const updatedVPN = { ...currentVPN, ...updates } as VPNConfig;

    state.vpnConfigs = [
      ...state.vpnConfigs.slice(0, vpnIndex),
      updatedVPN,
      ...state.vpnConfigs.slice(vpnIndex + 1),
    ];

    // Clear validation errors for updated fields
    const newErrors = { ...state.validationErrors };
    Object.keys(updates).forEach((field) => {
      const errorKey = `vpn-${id}-${field}`;
      if (newErrors[errorKey]) {
        delete newErrors[errorKey];
      }
    });
    state.validationErrors = newErrors;
  });

  // Set priority order for VPNs (used for drag and drop)
  const setPriorities$ = $((priorities: string[]) => {
    state.priorities = priorities;

    // Update priority values in configs
    state.vpnConfigs = state.vpnConfigs.map((vpn) => ({
      ...vpn,
      priority: priorities.indexOf(vpn.id) + 1,
    }));
  });

  // Move VPN priority up or down
  const moveVPNPriority$ = $((id: string, direction: "up" | "down") => {
    const currentIndex = state.priorities.indexOf(id);
    if (currentIndex === -1) return;

    const newIndex =
      direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(state.priorities.length - 1, currentIndex + 1);

    if (currentIndex === newIndex) return;

    const newPriorities = [...state.priorities];
    [newPriorities[currentIndex], newPriorities[newIndex]] = [
      newPriorities[newIndex],
      newPriorities[currentIndex],
    ];

    setPriorities$(newPriorities);
  });


  // Reset VPNs to initial state
  const resetVPNs$ = $(() => {
    vpnCounter.value = 0;
    state.vpnConfigs = [];
    state.priorities = [];
    state.validationErrors = {};

    // Add warning about minimum VPN count if needed
    if (minVPNCount > 0) {
      state.validationErrors = {
        "global-minCount": [
          `Please add at least ${minVPNCount} VPN configuration(s) to match Foreign WAN links`,
        ],
      };
    }
  });

  return {
    state,
    addVPN$,
    removeVPN$,
    updateVPN$,
    setPriorities$,
    resetVPNs$,
    moveVPNPriority$,
    generateVPNName$,
    minVPNCount,
  };
}
