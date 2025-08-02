import { $, useTask$, useContext, type QRL } from "@builder.io/qwik";
import type { AdvancedVPNState, VPNConfig } from "../types/AdvancedVPNState";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { VPNClient } from "~/components/Star/StarContext/Utils/VPNClientType";

export interface UseVPNPersistenceReturn {
  saveToLocalStorage$: QRL<(state: AdvancedVPNState) => void>;
  loadFromLocalStorage$: QRL<() => AdvancedVPNState | null>;
  syncToStarContext$: QRL<(state: AdvancedVPNState) => Promise<void>>;
  loadFromStarContext$: QRL<() => Promise<AdvancedVPNState | null>>;
  clearLocalStorage$: QRL<() => void>;
}

const STORAGE_KEY = "vpn-client-advanced-state";
const STORAGE_VERSION = "1.0";

interface StoredState extends AdvancedVPNState {
  version: string;
  timestamp: number;
}

export function useVPNPersistence(): UseVPNPersistenceReturn {
  const starContext = useContext(StarContext);

  // Save state to localStorage
  const saveToLocalStorage$ = $((state: AdvancedVPNState) => {
    if (typeof window === "undefined") return;

    try {
      const storedState: StoredState = {
        ...state,
        version: STORAGE_VERSION,
        timestamp: Date.now(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
    } catch (error) {
      console.error("Failed to save VPN state to localStorage:", error);
    }
  });

  // Load state from localStorage
  const loadFromLocalStorage$ = $((): AdvancedVPNState | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed: StoredState = JSON.parse(stored);

      // Check version compatibility
      if (parsed.version !== STORAGE_VERSION) {
        console.warn("Stored VPN state version mismatch, ignoring saved state");
        return null;
      }

      // Check if data is too old (24 hours)
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp > dayInMs) {
        console.warn("Stored VPN state is older than 24 hours, ignoring");
        return null;
      }

      // Return state without metadata
      const { version, timestamp, ...state } = parsed;
      // Suppress unused variable warnings
      void version;
      void timestamp;
      return state;
    } catch (error) {
      console.error("Failed to load VPN state from localStorage:", error);
      return null;
    }
  });

  // Convert advanced VPN state to StarContext VPNClient format
  const convertToVPNClient$ = $((vpnConfigs: VPNConfig[]): VPNClient => {
    const vpnClient: VPNClient = {};

    // Sort by priority and take the highest priority (enabled) VPN of each type
    const sortedConfigs = [...vpnConfigs]
      .filter((vpn) => vpn.enabled)
      .sort((a, b) => a.priority - b.priority);

    for (const vpn of sortedConfigs) {
      switch (vpn.type) {
        case "Wireguard":
          if (!vpnClient.Wireguard) {
            vpnClient.Wireguard = vpn.config as any;
          }
          break;

        case "OpenVPN":
          if (!vpnClient.OpenVPN) {
            vpnClient.OpenVPN = vpn.config as any;
          }
          break;

        case "PPTP":
          if (!vpnClient.PPTP) {
            vpnClient.PPTP = vpn.config as any;
          }
          break;

        case "L2TP":
          if (!vpnClient.L2TP) {
            vpnClient.L2TP = vpn.config as any;
          }
          break;

        case "SSTP":
          if (!vpnClient.SSTP) {
            vpnClient.SSTP = vpn.config as any;
          }
          break;

        case "IKeV2":
          if (!vpnClient.IKeV2) {
            vpnClient.IKeV2 = vpn.config as any;
          }
          break;
      }
    }

    return vpnClient;
  });

  // Convert StarContext VPNClient to advanced VPN state
  const convertFromVPNClient$ = $(
    (vpnClient: VPNClient | undefined): VPNConfig[] => {
      if (!vpnClient) return [];

      const configs: VPNConfig[] = [];
      let priority = 1;

      // Convert each VPN type if present
      if (vpnClient.Wireguard) {
        configs.push({
          id: crypto.randomUUID(),
          name: "Wireguard VPN",
          type: "Wireguard",
          priority: priority++,
          enabled: true,
          config: vpnClient.Wireguard,
        });
      }

      if (vpnClient.OpenVPN) {
        configs.push({
          id: crypto.randomUUID(),
          name: "OpenVPN",
          type: "OpenVPN",
          priority: priority++,
          enabled: true,
          config: vpnClient.OpenVPN,
        });
      }

      if (vpnClient.PPTP) {
        configs.push({
          id: crypto.randomUUID(),
          name: "PPTP VPN",
          type: "PPTP",
          priority: priority++,
          enabled: true,
          config: vpnClient.PPTP,
        });
      }

      if (vpnClient.L2TP) {
        configs.push({
          id: crypto.randomUUID(),
          name: "L2TP VPN",
          type: "L2TP",
          priority: priority++,
          enabled: true,
          config: vpnClient.L2TP,
        });
      }

      if (vpnClient.SSTP) {
        configs.push({
          id: crypto.randomUUID(),
          name: "SSTP VPN",
          type: "SSTP",
          priority: priority++,
          enabled: true,
          config: vpnClient.SSTP,
        });
      }

      if (vpnClient.IKeV2) {
        configs.push({
          id: crypto.randomUUID(),
          name: "IKEv2 VPN",
          type: "IKeV2",
          priority: priority++,
          enabled: true,
          config: vpnClient.IKeV2,
        });
      }

      return configs;
    },
  );

  // Sync advanced VPN state to StarContext
  const syncToStarContext$ = $(async (state: AdvancedVPNState) => {
    const vpnClient = await convertToVPNClient$(state.vpnConfigs);

    // Update StarContext WAN state with VPN client configuration
    await starContext.updateWAN$({
      ...starContext.state.WAN,
      VPNClient: vpnClient,
    });
  });

  // Load VPN configuration from StarContext
  const loadFromStarContext$ = $(async (): Promise<AdvancedVPNState | null> => {
    const vpnClient = starContext.state.WAN.VPNClient;
    if (!vpnClient) return null;

    const configs = await convertFromVPNClient$(vpnClient);
    if (configs.length === 0) return null;

    // Calculate min VPN count based on WAN links
    const wanLinks = starContext.state.WAN.WANLinks || [];
    const foreignLinks = wanLinks.filter(
      (link) =>
        link.name.toLowerCase().includes("foreign") ||
        link.id.includes("foreign"),
    );
    const minVPNCount = Math.max(foreignLinks.length, 1);

    return {
      vpnConfigs: configs,
      priorities: configs.map((c) => c.id),
      validationErrors: {},
      minVPNCount,
    };
  });

  // Clear localStorage
  const clearLocalStorage$ = $(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear VPN state from localStorage:", error);
    }
  });

  // Auto-save to localStorage on state changes
  useTask$(({ cleanup }) => {
    if (typeof window === "undefined") return;

    // Set up periodic save (every 30 seconds)
    const interval = setInterval(() => {
      // This would need access to the current state
      // In practice, this would be called from the component using this hook
    }, 30000);

    cleanup(() => clearInterval(interval));
  });

  return {
    saveToLocalStorage$,
    loadFromLocalStorage$,
    syncToStarContext$: syncToStarContext$,
    loadFromStarContext$: loadFromStarContext$,
    clearLocalStorage$,
  };
}
