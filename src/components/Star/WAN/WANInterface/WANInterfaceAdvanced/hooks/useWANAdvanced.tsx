import { $, useSignal, useStore, useTask$, type QRL } from "@builder.io/qwik";
import type {
  WANLinkConfig,
  WANWizardState,
  MultiLinkConfig,
} from "../../../../StarContext/WANType";

export interface UseWANAdvancedReturn {
  state: WANWizardState;
  addLink$: QRL<() => void>;
  removeLink$: QRL<(id: string) => void>;
  updateLink$: QRL<(id: string, updates: Partial<WANLinkConfig>) => void>;
  toggleMode$: QRL<() => void>;
  setViewMode$: QRL<(mode: "expanded" | "compact") => void>;
  setMultiLinkStrategy$: QRL<(strategy: MultiLinkConfig) => void>;
  resetAdvanced$: QRL<() => void>;
  generateLinkName$: QRL<(index: number) => string>;
}

export function useWANAdvanced(): UseWANAdvancedReturn {
  // Initialize state with at least one link
  const state = useStore<WANWizardState>({
    mode: "advanced", // Always use advanced mode
    links: [
      {
        id: crypto.randomUUID(),
        name: "WAN Link 1",
        interfaceType: "Ethernet",
        interfaceName: "",
        connectionType: "DHCP",
        weight: 50,
        priority: 1,
      },
    ],
    validationErrors: {},
  });

  // Track link count for naming
  const linkCounter = useSignal(1);

  // Generate consistent link names
  const generateLinkName$ = $((index: number) => {
    return `WAN Link ${index}`;
  });

  // Add a new link
  const addLink$ = $(async () => {
    linkCounter.value++;
    const newLink: WANLinkConfig = {
      id: crypto.randomUUID(),
      name: await generateLinkName$(linkCounter.value),
      interfaceType: "Ethernet",
      interfaceName: "",
      connectionType: state.mode === "easy" ? "DHCP" : "DHCP",
      weight: 50,
      priority: state.links.length + 1,
    };

    state.links = [...state.links, newLink];

    // Recalculate weights if in load balance mode
    if (
      state.multiLinkStrategy?.strategy === "LoadBalance" &&
      state.links.length > 1
    ) {
      const equalWeight = Math.floor(100 / state.links.length);
      const remainder = 100 - equalWeight * state.links.length;

      state.links = state.links.map((link, index) => ({
        ...link,
        weight: index === 0 ? equalWeight + remainder : equalWeight,
      }));
    }
  });

  // Remove a link
  const removeLink$ = $((id: string) => {
    if (state.links.length <= 1) {
      console.warn("Cannot remove the last link");
      return;
    }

    state.links = state.links.filter((link) => link.id !== id);

    // Recalculate priorities
    state.links = state.links.map((link, index) => ({
      ...link,
      priority: index + 1,
    }));

    // Recalculate weights
    if (
      state.multiLinkStrategy?.strategy === "LoadBalance" &&
      state.links.length > 0
    ) {
      const equalWeight = Math.floor(100 / state.links.length);
      const remainder = 100 - equalWeight * state.links.length;

      state.links = state.links.map((link, index) => ({
        ...link,
        weight: index === 0 ? equalWeight + remainder : equalWeight,
      }));
    }

    // Remove validation errors for this link
    const newErrors = { ...state.validationErrors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`link-${id}`)) {
        delete newErrors[key];
      }
    });
    state.validationErrors = newErrors;
  });

  // Update a specific link
  const updateLink$ = $((id: string, updates: Partial<WANLinkConfig>) => {
    const linkIndex = state.links.findIndex((link) => link.id === id);
    if (linkIndex === -1) return;

    const updatedLink = { ...state.links[linkIndex], ...updates };

    // Clear certain fields when interface type changes
    if (
      updates.interfaceType &&
      updates.interfaceType !== state.links[linkIndex].interfaceType
    ) {
      updatedLink.interfaceName = "";
      updatedLink.wirelessCredentials = undefined;
      updatedLink.lteSettings = undefined;

      // Reset connection type for LTE
      if (updates.interfaceType === "LTE") {
        updatedLink.connectionType = "LTE";
      }
    }

    // Clear connection config when type changes
    if (
      updates.connectionType &&
      updates.connectionType !== state.links[linkIndex].connectionType
    ) {
      updatedLink.connectionConfig = undefined;
    }

    // Direct mutation for Qwik reactivity
    state.links[linkIndex] = updatedLink;
  });

  // Toggle between easy and advanced mode (disabled in advanced interface - always advanced)
  const toggleMode$ = $(() => {
    // Mode toggling is disabled in the advanced interface
    // The advanced interface is only used for advanced mode
    console.warn("Mode toggling is disabled in the WAN Advanced interface");
  });

  // Set view mode for compact/expanded display
  const setViewMode$ = $((mode: "expanded" | "compact") => {
    state.viewMode = mode;
  });

  // Set multi-link strategy
  const setMultiLinkStrategy$ = $((strategy: MultiLinkConfig) => {
    state.multiLinkStrategy = strategy;

    // Initialize weights for load balance
    if (strategy.strategy === "LoadBalance" || strategy.strategy === "Both") {
      const equalWeight = Math.floor(100 / state.links.length);
      const remainder = 100 - equalWeight * state.links.length;

      state.links = state.links.map((link, index) => ({
        ...link,
        weight: index === 0 ? equalWeight + remainder : equalWeight,
      }));
    }
  });

  // Reset advanced configuration to initial state
  const resetAdvanced$ = $(() => {
    linkCounter.value = 1;
    state.mode = "advanced";
    state.links = [
      {
        id: crypto.randomUUID(),
        name: "WAN Link 1",
        interfaceType: "Ethernet",
        interfaceName: "",
        connectionType: "DHCP",
        weight: 50,
        priority: 1,
      },
    ];
    state.multiLinkStrategy = undefined;
    state.validationErrors = {};
  });

  // Auto-save to localStorage
  useTask$(({ track }) => {
    track(() => state);

    if (typeof window !== "undefined") {
      localStorage.setItem("wan-advanced-state", JSON.stringify(state));
    }
  });

  return {
    state,
    addLink$,
    removeLink$,
    updateLink$,
    toggleMode$,
    setViewMode$,
    setMultiLinkStrategy$,
    resetAdvanced$,
    generateLinkName$,
  };
}
