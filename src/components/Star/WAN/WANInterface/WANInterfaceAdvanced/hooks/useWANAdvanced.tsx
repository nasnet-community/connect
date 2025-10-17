import { $, useSignal, useStore, useContext, type QRL } from "@builder.io/qwik";
import type {
  WANLinkConfig,
  WANWizardState,
  MultiLinkUIConfig,
} from "../types";
import { generateUniqueId } from "~/components/Core/common/utils";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { InterfaceType } from "~/components/Star/StarContext/CommonType";
import { useInterfaceManagement } from "~/components/Star/hooks/useInterfaceManagement";
import { useNetworks } from "~/utils/useNetworks";
import { useSubnets } from "~/utils/useSubnets";

export interface UseWANAdvancedReturn {
  state: WANWizardState;
  addLink$: QRL<() => void>;
  removeLink$: QRL<(id: string) => void>;
  updateLink$: QRL<(id: string, updates: Partial<WANLinkConfig>) => void>;
  batchUpdateLinks$: QRL<(updates: Array<{ id: string; updates: Partial<WANLinkConfig> }>) => void>;
  toggleMode$: QRL<() => void>;
  setViewMode$: QRL<(mode: "expanded" | "compact") => void>;
  setMultiLinkStrategy$: QRL<(strategy: MultiLinkUIConfig) => void>;
  updateMultiLink: QRL<(updates: Partial<MultiLinkUIConfig>) => void>;
  resetAdvanced$: QRL<() => void>;
  generateLinkName$: QRL<(index: number) => string>;
  syncWithStarContext$: QRL<() => void>;
}

export function useWANAdvanced(mode: "Foreign" | "Domestic" = "Foreign"): UseWANAdvancedReturn {
  const starContext = useContext(StarContext);
  const interfaceManagement = useInterfaceManagement();
  const networks = useNetworks();
  const subnets = useSubnets();

  // Initialize state with zero links (empty state pattern)
  const state = useStore<WANWizardState>({
    mode: "advanced", // Always use advanced mode
    links: [], // Start with zero links
    validationErrors: {},
  });

  // Track link count for naming
  const linkCounter = useSignal(0);

  // Generate consistent link names based on mode
  const generateLinkName$ = $((index: number) => {
    return `${mode} Link ${index}`;
  });

  // Helper function to sync local state with StarContext
  const syncWithStarContext$ = $(() => {
    // Convert local WANWizardState to StarContext WANLinks format
    const updatedWANLink = { ...starContext.state.WAN.WANLink };

    // Build proper WANLinkConfig structures from UI state
    const wanConfigs = state.links.map(link => {
      // Build InterfaceConfig with proper type mapping
      const interfaceConfig = {
        InterfaceName: (link.interfaceName || link.InterfaceConfig.InterfaceName || "ether1") as InterfaceType,
        WirelessCredentials: link.wirelessCredentials,
        VLANID: link.vlanConfig?.enabled ? String(link.vlanConfig.id) : undefined,
        MacAddress: link.macAddress?.enabled ? link.macAddress.address : undefined,
      };

      // Build ConnectionConfig based on connection type
      let connectionConfig = undefined;
      if (link.connectionType === "DHCP") {
        connectionConfig = { isDHCP: true };
      } else if (link.connectionType === "PPPoE" && link.pppoe) {
        connectionConfig = { pppoe: link.pppoe };
      } else if (link.connectionType === "Static" && link.staticIP) {
        connectionConfig = { static: link.staticIP };
      } else if (link.connectionType === "LTE" || link.interfaceType === "LTE") {
        // LTE: Add lteSettings to ConnectionConfig
        connectionConfig = link.lteSettings ? { lteSettings: link.lteSettings } : undefined;
      } else if (link.connectionConfig) {
        // Use existing connectionConfig if available
        connectionConfig = link.connectionConfig;
      }

      return {
        name: link.name,
        InterfaceConfig: interfaceConfig,
        ConnectionConfig: connectionConfig,
        priority: link.priority,
        weight: link.weight,
      };
    });

    // Create the WANLink structure with MultiLinkConfig if applicable
    const wanLink = {
      WANConfigs: wanConfigs,
      MultiLinkConfig: state.multiLinkStrategy ? {
        strategy: state.multiLinkStrategy.strategy,
        // Only include optional properties if they are defined
        ...(state.multiLinkStrategy.loadBalanceMethod && { loadBalanceMethod: state.multiLinkStrategy.loadBalanceMethod }),
        ...(state.multiLinkStrategy.FailoverConfig && { FailoverConfig: state.multiLinkStrategy.FailoverConfig }),
        ...(state.multiLinkStrategy.roundRobinInterval !== undefined && { roundRobinInterval: state.multiLinkStrategy.roundRobinInterval }),
      } : undefined,
    };

    // Update the appropriate mode in StarContext
    if (mode === "Foreign") {
      updatedWANLink.Foreign = wanLink;
    } else if (mode === "Domestic") {
      updatedWANLink.Domestic = wanLink;
    }

    // Update StarContext with the new WAN configuration
    starContext.updateWAN$({ WANLink: updatedWANLink });
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
      connectionType: "DHCP", // Default to DHCP
      connectionConfirmed: true, // DHCP doesn't require additional configuration
      weight: equalWeight, // Set appropriate weight
      priority: state.links.length + 1,
      InterfaceConfig: {
        InterfaceName: "ether1"
      },
      connectionConfig: {
        isDHCP: true
      },
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

    // Sync with StarContext and update Networks configuration
    syncWithStarContext$();
    networks.generateCurrentNetworks$();
    subnets.generateCurrentSubnets$();
  });

  // Remove a link
  const removeLink$ = $(async (id: string) => {
    if (state.links.length <= 1) {
      console.warn("Cannot remove the last link");
      return;
    }

    // Release the interface before removing the link
    const linkToRemove = state.links.find((link) => link.id === id);
    if (linkToRemove?.interfaceName) {
      await interfaceManagement.releaseInterface$(linkToRemove.interfaceName as InterfaceType);
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

    // Sync with StarContext and update Networks configuration
    syncWithStarContext$();
    networks.generateCurrentNetworks$();
    subnets.generateCurrentSubnets$();
  });

  // Update a specific link with batching to prevent multiple renders
  const updateLink$ = $(async (id: string, updates: Partial<WANLinkConfig>) => {
    const linkIndex = state.links.findIndex((link) => link.id === id);
    if (linkIndex === -1) return;

    // Create a copy to work with
    const currentLink = state.links[linkIndex];
    const updatedLink = { ...currentLink };

    // Handle interface name changes and update occupied interfaces
    if (updates.interfaceName !== undefined && updates.interfaceName !== currentLink.interfaceName) {
      await interfaceManagement.updateInterfaceOccupation$(
        currentLink.interfaceName ? (currentLink.interfaceName as InterfaceType) : null,
        updates.interfaceName ? (updates.interfaceName as InterfaceType) : null,
        "WAN"
      );
    }

    // Apply updates
    Object.assign(updatedLink, updates);

    // Clear certain fields when interface type changes
    if (
      updates.interfaceType &&
      updates.interfaceType !== currentLink.interfaceType
    ) {
      // Release the old interface when type changes
      if (updatedLink.interfaceName) {
        await interfaceManagement.releaseInterface$(updatedLink.interfaceName as InterfaceType);
      }

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

    // Sync with StarContext and update Networks configuration
    syncWithStarContext$();
    networks.generateCurrentNetworks$();
    subnets.generateCurrentSubnets$();
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

    // Sync with StarContext and update Networks configuration
    syncWithStarContext$();
    networks.generateCurrentNetworks$();
    subnets.generateCurrentSubnets$();
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
  const setMultiLinkStrategy$ = $((strategy: MultiLinkUIConfig) => {
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
  const updateMultiLink = $((updates: Partial<MultiLinkUIConfig>) => {
    // Use single assignment to prevent multiple renders
    if (!state.multiLinkStrategy) {
      state.multiLinkStrategy = updates as MultiLinkUIConfig;
    } else {
      // Create new object to ensure change detection
      const newStrategy = { ...state.multiLinkStrategy, ...updates };
      state.multiLinkStrategy = newStrategy;
    }
  });

  // Reset advanced configuration to initial state
  const resetAdvanced$ = $(() => {
    linkCounter.value = 0; // Reset counter to 0
    state.mode = "advanced";
    state.links = []; // Reset to empty state
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
    syncWithStarContext$,
  };
}
