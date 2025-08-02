import { $, useVisibleTask$, type QRL } from "@builder.io/qwik";
import type { WANWizardState } from "../../../../StarContext/WANType";

const STORAGE_KEY = "wan-advanced-state";
const STORAGE_VERSION = "1.0";

interface StoredState {
  version: string;
  timestamp: number;
  state: WANWizardState;
}

export interface UseWANPersistenceReturn {
  saveState$: QRL<(state: WANWizardState) => void>;
  loadState$: QRL<() => WANWizardState | null>;
  clearState$: QRL<() => void>;
  hasStoredState$: QRL<() => boolean>;
}

export function useWANPersistence(): UseWANPersistenceReturn {
  // Save state to localStorage
  const saveState$ = $((state: WANWizardState) => {
    if (typeof window === "undefined") return;

    try {
      const storedState: StoredState = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        state: JSON.parse(JSON.stringify(state)), // Deep clone to avoid reference issues
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
    } catch (error) {
      console.error("Failed to save WAN advanced state:", error);
    }
  });

  // Load state from localStorage
  const loadState$ = $((): WANWizardState | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed: StoredState = JSON.parse(stored);

      // Check version compatibility
      if (parsed.version !== STORAGE_VERSION) {
        console.warn("Stored state version mismatch, clearing...");
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      // Check if state is older than 24 hours
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp > dayInMs) {
        console.warn("Stored state is too old, clearing...");
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      // Validate the loaded state structure
      if (!parsed.state.links || !Array.isArray(parsed.state.links)) {
        console.warn("Invalid stored state structure, clearing...");
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      // Ensure all links have required fields
      parsed.state.links = parsed.state.links.map((link) => ({
        ...link,
        id: link.id || crypto.randomUUID(),
        name: link.name || `WAN Link ${parsed.state.links.indexOf(link) + 1}`,
        interfaceType: link.interfaceType || "Ethernet",
        interfaceName: link.interfaceName || "",
        connectionType: link.connectionType || "DHCP",
      }));

      return parsed.state;
    } catch (error) {
      console.error("Failed to load WAN advanced state:", error);
      return null;
    }
  });

  // Clear stored state
  const clearState$ = $(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear WAN advanced state:", error);
    }
  });

  // Check if there's a stored state
  const hasStoredState$ = $((): boolean => {
    if (typeof window === "undefined") return false;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const parsed: StoredState = JSON.parse(stored);

      // Check if valid and not too old
      if (parsed.version !== STORAGE_VERSION) return false;

      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp > dayInMs) return false;

      return true;
    } catch {
      return false;
    }
  });

  // Auto-save on browser events
  useVisibleTask$(() => {
    if (typeof window === "undefined") return;

    // Save state before page unload
    const handleBeforeUnload = () => {
      const stateElement = document.querySelector("[data-wan-advanced-state]");
      if (stateElement) {
        const state = (stateElement as any).__qwik_state;
        if (state) {
          saveState$(state);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  return {
    saveState$,
    loadState$,
    clearState$,
    hasStoredState$,
  };
}
