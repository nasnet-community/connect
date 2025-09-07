import { $, useSignal, useStore, type QRL } from "@builder.io/qwik";
import type {
  WANLinkConfig,
  WANWizardState,
  MultiLinkConfig,
} from "../../../../StarContext/WANType";
import { generateUniqueId } from "~/components/Core/common/utils";

export interface UseWANAdvancedReturn {
  state: WANWizardState;
  addLink$: QRL<() => void>;
  removeLink$: QRL<(id: string) => void>;
  updateLink$: QRL<(id: string, updates: Partial<WANLinkConfig>) => void>;
  batchUpdateLinks$: QRL<(updates: Array<{ id: string; updates: Partial<WANLinkConfig> }>) => void>;
  toggleMode$: QRL<() => void>;
  setViewMode$: QRL<(mode: "expanded" | "compact") => void>;
  setMultiLinkStrategy$: QRL<(strategy: MultiLinkConfig) => void>;
  updateMultiLink: QRL<(updates: Partial<MultiLinkConfig>) => void>;
  resetAdvanced$: QRL<() => void>;
  generateLinkName$: QRL<(index: number) => string>;
}

export function useWANAdvanced(mode: "Foreign" | "Domestic" = "Foreign"): UseWANAdvancedReturn {
  // Initialize state with at least one link
  const state = useStore<WANWizardState>({
    mode: "advanced", // Always use advanced mode
    links: [
      {
        id: generateUniqueId("wan"),
        name: `${mode} Link 1`,
        interfaceType: "Ethernet",
        interfaceName: "",
        connectionConfirmed: false, // User must confirm connection settings
        weight: 100, // Default to 100% for single link
        priority: 1,
      },
    ],
    validationErrors: {},
  });

  // Track link count for naming
  const linkCounter = useSignal(1);

  // Generate consistent link names based on mode
  const generateLinkName$ = $((index: number) => {
    return `${mode} Link ${index}`;
  });

  // Add a new link
  const addLink$ = $(async () => {
    linkCounter.value++;
    
    // Calculate appropriate weight for new link
    const linkCount = state.links.length + 1;
    const equalWeight = Math.floor(100 / linkCount);
    
    const newLink: WANLinkConfig = {
      id: generateUniqueId("wan"),
      name: await generateLinkName$(linkCounter.value),
      interfaceType: "Ethernet",
      interfaceName: "",
      connectionConfirmed: false, // User must confirm connection settings
      weight: equalWeight, // Set appropriate weight
      priority: state.links.length + 1,
    };

    state.links = [...state.links, newLink];

    // Recalculate weights for all links to maintain 100% total
    if (state.links.length > 1) {
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

  // Update a specific link with batching to prevent multiple renders
  const updateLink$ = $((id: string, updates: Partial<WANLinkConfig>) => {
    const linkIndex = state.links.findIndex((link) => link.id === id);
    if (linkIndex === -1) return;

    // Create a copy to work with
    const currentLink = state.links[linkIndex];
    const updatedLink = { ...currentLink };

    // Apply updates
    Object.assign(updatedLink, updates);

    // Clear certain fields when interface type changes
    if (
      updates.interfaceType &&
      updates.interfaceType !== currentLink.interfaceType
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
      updates.connectionType !== currentLink.connectionType
    ) {
      updatedLink.connectionConfig = undefined;
    }

    // Update state in one operation to minimize renders
    // Create new array to ensure proper change detection
    const newLinks = [...state.links];
    newLinks[linkIndex] = updatedLink;
    state.links = newLinks;
  });

  // Batch update multiple links in a single operation to prevent multiple renders
  const batchUpdateLinks$ = $((updates: Array<{ id: string; updates: Partial<WANLinkConfig> }>) => {
    if (!updates || updates.length === 0) return;

    // Create a copy of all links
    const newLinks = [...state.links];
    
    // Apply all updates
    updates.forEach(({ id, updates: linkUpdates }) => {
      const linkIndex = newLinks.findIndex((link) => link.id === id);
      if (linkIndex === -1) return;

      const currentLink = newLinks[linkIndex];
      const updatedLink = { ...currentLink };

      // Apply updates
      Object.assign(updatedLink, linkUpdates);

      // Clear certain fields when interface type changes
      if (
        linkUpdates.interfaceType &&
        linkUpdates.interfaceType !== currentLink.interfaceType
      ) {
        updatedLink.interfaceName = "";
        updatedLink.wirelessCredentials = undefined;
        updatedLink.lteSettings = undefined;

        // Reset connection type for LTE
        if (linkUpdates.interfaceType === "LTE") {
          updatedLink.connectionType = "LTE";
        }
      }

      // Clear connection config when type changes
      if (
        linkUpdates.connectionType &&
        linkUpdates.connectionType !== currentLink.connectionType
      ) {
        updatedLink.connectionConfig = undefined;
      }

      newLinks[linkIndex] = updatedLink;
    });

    // Update state once with all changes
    state.links = newLinks;
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

    // Initialize weights and priorities based on strategy
    const updates: Array<{ id: string; updates: Partial<WANLinkConfig> }> = [];
    
    // Initialize weights for load balance
    if (strategy.strategy === "LoadBalance" || strategy.strategy === "Both") {
      const equalWeight = Math.floor(100 / state.links.length);
      const remainder = 100 - equalWeight * state.links.length;

      state.links.forEach((link, index) => {
        if (!link.weight || link.weight === 0) {
          updates.push({
            id: link.id,
            updates: { weight: index === 0 ? equalWeight + remainder : equalWeight }
          });
        }
      });
    }
    
    // Initialize priorities for failover
    if (strategy.strategy === "Failover" || strategy.strategy === "Both") {
      state.links.forEach((link, index) => {
        if (!link.priority || link.priority === 0) {
          const existingUpdate = updates.find(u => u.id === link.id);
          if (existingUpdate) {
            existingUpdate.updates.priority = index + 1;
          } else {
            updates.push({
              id: link.id,
              updates: { priority: index + 1 }
            });
          }
        }
      });
    }
    
    // Apply updates if any
    if (updates.length > 0) {
      batchUpdateLinks$(updates);
    }
  });

  // Update multi-link configuration with proper state management
  const updateMultiLink = $((updates: Partial<MultiLinkConfig>) => {
    // Use single assignment to prevent multiple renders
    if (!state.multiLinkStrategy) {
      state.multiLinkStrategy = updates as MultiLinkConfig;
    } else {
      // Create new object to ensure change detection
      const newStrategy = { ...state.multiLinkStrategy, ...updates };
      state.multiLinkStrategy = newStrategy;
    }
  });

  // Reset advanced configuration to initial state
  const resetAdvanced$ = $(() => {
    linkCounter.value = 1;
    state.mode = "advanced";
    state.links = [
      {
        id: generateUniqueId("wan"),
        name: `${mode} Link 1`,
        interfaceType: "Ethernet",
        interfaceName: "",
        connectionConfirmed: false, // User must confirm connection settings
        weight: 100, // Default to 100% for single link
        priority: 1,
      },
    ];
    state.multiLinkStrategy = undefined;
    state.validationErrors = {};
  });

  // Note: Removed auto-save to localStorage to prevent infinite loops
  // State is saved manually when needed only

  return {
    state,
    addLink$,
    removeLink$,
    updateLink$,
    batchUpdateLinks$,
    toggleMode$,
    setViewMode$,
    setMultiLinkStrategy$,
    updateMultiLink,
    resetAdvanced$,
    generateLinkName$,
  };
}
