// Local types for WAN Interface Advanced UI
// These are UI-specific types that don't belong in StarContext

import type { 
  WANLinkConfig as CoreWANLinkConfig,
  LTESettings,
  PPPoEConfig,
  StaticIPConfig,
  WANLink,
} from "../../../StarContext/Utils/WANLinkType";
import type { WANState } from "../../../StarContext/WANType";
import type { MultiLinkConfig } from "../../../StarContext/Utils/MultiLinkType";

// Re-export core types that are used directly
export type {
  LTESettings,
  PPPoEConfig,
  StaticIPConfig,
  MultiLinkConfig,
  WANState,
  WANLink,
};

// Connection type for UI
export type ConnectionType = "DHCP" | "PPPoE" | "Static" | "LTE";

// VLAN configuration for UI
export interface VLANConfig {
  enabled: boolean;
  id: number;
}

// MAC Address configuration for UI
export interface MACAddressConfig {
  enabled: boolean;
  address: string;
}

// Extended WAN Link Config for UI with additional UI-specific properties
export interface WANLinkConfig extends Omit<CoreWANLinkConfig, "name"> {
  id: string; // UI tracking ID
  name: string; // Link name for identification
  priority?: number; // Priority for multi-link setup
  weight?: number; // Weight for load balancing
  interfaceType?: "Ethernet" | "Wireless" | "SFP" | "LTE";
  interfaceName?: string;
  connectionType?: ConnectionType;
  connectionConfirmed?: boolean;
  
  // UI-specific connection settings
  vlanConfig?: VLANConfig;
  macAddress?: MACAddressConfig;
  lteSettings?: LTESettings;
  pppoe?: PPPoEConfig;
  staticIP?: StaticIPConfig;
  
  // Interface-specific settings
  wirelessCredentials?: import("../../../StarContext/CommonType").WirelessCredentials;
  connectionConfig?: {
    isDHCP?: boolean;
    pppoe?: PPPoEConfig;
    static?: StaticIPConfig;
    lteSettings?: LTESettings;
  };
}

// Wizard state for managing the UI flow
export interface WANWizardState {
  mode: "easy" | "advanced";
  links: WANLinkConfig[];
  multiLinkStrategy?: MultiLinkUIConfig;
  validationErrors?: Record<string, string[]>;
  viewMode?: "expanded" | "compact";
}

// Configuration output that maps to WANState
export interface WANConfig extends Partial<WANState> {
  // This extends WANState for UI purposes
}

// Helper type for managing multi-link configuration in UI
export interface MultiLinkUIConfig extends MultiLinkConfig {
  failoverCheckInterval?: number;
  failoverTimeout?: number;
  packetMode?: "connection" | "packet";
}