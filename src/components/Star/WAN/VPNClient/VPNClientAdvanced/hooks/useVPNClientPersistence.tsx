import { $, useContext, type QRL } from "@builder.io/qwik";
import type {
  VPNClientAdvancedState,
  VPNConfig,
} from "../types/VPNClientAdvancedTypes";
import { StarContext, type StarContextType } from "~/components/Star/StarContext/StarContext";


export interface UseVPNClientPersistenceReturn {
  saveState$: QRL<(state: VPNClientAdvancedState) => Promise<void>>;
  loadState$: QRL<() => Promise<VPNClientAdvancedState | null>>;
  hasStoredState$: QRL<() => Promise<boolean>>;
  clearState$: QRL<() => Promise<void>>;
  syncToStarContext$: QRL<(state: VPNClientAdvancedState) => Promise<void>>;
  loadFromStarContext$: QRL<() => Promise<VPNClientAdvancedState | null>>;
}

const STORAGE_KEY = "vpn-client-advanced-state";

export const useVPNClientPersistence = (): UseVPNClientPersistenceReturn => {
  const starContext = useContext(StarContext) as StarContextType;

  const saveState$ = $(async (state: VPNClientAdvancedState) => {
    if (typeof window !== "undefined") {
      try {
        const stateToSave = JSON.stringify(state);
        // Only save if state actually changed
        const currentState = localStorage.getItem(STORAGE_KEY);
        if (currentState !== stateToSave) {
          localStorage.setItem(STORAGE_KEY, stateToSave);
        }
      } catch (error) {
        console.error("Failed to save VPN client state to localStorage:", error);
      }
    }
  });

  // Load state from localStorage
  const loadState$ = $(async (): Promise<VPNClientAdvancedState | null> => {
    if (typeof window !== "undefined") {
      try {
        const storedState = localStorage.getItem(STORAGE_KEY);
        if (storedState) {
          return JSON.parse(storedState) as VPNClientAdvancedState;
        }
      } catch (error) {
        console.error("Failed to load VPN client state from localStorage:", error);
      }
    }
    return null;
  });

  // Check if we have stored state
  const hasStoredState$ = $(async (): Promise<boolean> => {
    if (typeof window !== "undefined") {
      try {
        const storedState = localStorage.getItem(STORAGE_KEY);
        return storedState !== null;
      } catch (error) {
        console.error("Failed to check stored state:", error);
      }
    }
    return false;
  });

  // Clear stored state
  const clearState$ = $(async () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Failed to clear VPN client state:", error);
      }
    }
  });

  // Convert VPNConfig to legacy VPNClient format - simplified for now
  const convertToLegacyFormat$ = $((_vpnClients: VPNConfig[]) => {
    // TODO: Implement proper legacy conversion when needed
    return {};
  });

  // Sync wizard state to StarContext
  const syncToStarContext$ = $(async (state: VPNClientAdvancedState) => {
    try {
      // Convert to legacy format for backward compatibility
      const legacyVPNData = await convertToLegacyFormat$(state.vpnConfigs);
      
      // Update StarContext with new advanced VPN client data
      const vpnClientState = {
        mode: "advanced" as const,
        // Legacy format for backward compatibility
        ...legacyVPNData,
        // New advanced format
        VPNClients: state.vpnConfigs,
        MultiVPNConfig: state.multiVPNStrategy,
        ValidationErrors: state.validationErrors,
      };

      // Ensure WAN.VPNClient exists
      if (!starContext.state.WAN.VPNClient) {
        starContext.state.WAN.VPNClient = {};
      }

      // Update StarContext
      Object.assign(starContext.state.WAN.VPNClient, vpnClientState);
    } catch (error) {
      console.error("Failed to sync VPN client state to StarContext:", error);
    }
  });

  // Load wizard state from StarContext
  const loadFromStarContext$ = $(async (): Promise<VPNClientAdvancedState | null> => {
    try {
      const vpnClientData = starContext.state.WAN.VPNClient;
      
      if (!vpnClientData) {
        return null;
      }

      // Check if we have the new advanced format
      if (vpnClientData.VPNClients && Array.isArray(vpnClientData.VPNClients)) {
        // Get Foreign WAN count for minimum calculation
        const wanLinks = starContext.state.WAN.WANLinks || [];
        const foreignLinks = wanLinks.filter(
          (link) =>
            link.name.toLowerCase().includes("foreign") ||
            link.id.includes("foreign")
        );
        const minVPNCount = Math.max(foreignLinks.length, 1);

        return {
          mode: "advanced",
          vpnConfigs: vpnClientData.VPNClients || [],
          priorities: (vpnClientData.VPNClients || []).map((vpn: any) => vpn.id),
          multiVPNStrategy: vpnClientData.MultiVPNConfig,
          validationErrors: vpnClientData.ValidationErrors || {},
          minVPNCount,
        };
      }

      // Return empty state for now - legacy conversion can be implemented later
      return {
        mode: "advanced",
        vpnConfigs: [],
        priorities: [],
        validationErrors: {},
        minVPNCount: 1,
      };
    } catch (error) {
      console.error("Failed to load VPN client state from StarContext:", error);
      return null;
    }
  });

  return {
    saveState$,
    loadState$,
    hasStoredState$,
    clearState$,
    syncToStarContext$,
    loadFromStarContext$,
  };
}