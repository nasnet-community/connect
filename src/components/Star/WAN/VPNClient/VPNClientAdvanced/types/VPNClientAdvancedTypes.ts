import type {
  WireguardClientConfig,
  OpenVpnClientConfig,
  PptpClientConfig,
  L2tpClientConfig,
  SstpClientConfig,
  Ike2ClientConfig,
} from "../../../../StarContext/Utils/VPNClientType";

export type VPNType =
  | "Wireguard"
  | "OpenVPN"
  | "L2TP"
  | "PPTP"
  | "SSTP"
  | "IKeV2";

export type MultiVPNStrategy = "Failover" | "RoundRobin" | "LoadBalance" | "Both";

export interface MultiVPNConfig {
  strategy: MultiVPNStrategy;
  failoverCheckInterval?: number; // seconds
  failoverTimeout?: number; // seconds
  roundRobinInterval?: number; // for RoundRobin strategy
}

export interface VPNClientConfig {
  id: string;
  name: string;
  type: VPNType;
  enabled: boolean;
  priority: number;
  weight?: number; // for load balancing
  assignedWANLink?: string; // Foreign WAN link ID this VPN is assigned to
  description?: string;
  
  // Connection configuration based on VPN type
  connectionConfig?: {
    wireguard?: WireguardClientConfig;
    openvpn?: OpenVpnClientConfig;
    pptp?: PptpClientConfig;
    l2tp?: L2tpClientConfig;
    sstp?: SstpClientConfig;
    ikev2?: Ike2ClientConfig;
  };
}

export interface VPNClientWizardState {
  mode: "advanced";
  vpnClients: VPNClientConfig[];
  multiVPNStrategy?: MultiVPNConfig;
  validationErrors: Record<string, string[]>;
  viewMode?: "expanded" | "compact";
  minVPNCount: number; // Minimum required based on Foreign WAN count
}

// Legacy interface for backward compatibility
export interface VPNConfigBase {
  id: string;
  name: string;
  type: VPNType;
  priority: number;
  enabled: boolean;
  description?: string;
  assignedLink?: string; // Foreign WAN link ID this VPN is assigned to
  weight?: number; // for load balancing
}

export interface WireguardVPNConfig extends VPNConfigBase {
  type: "Wireguard";
  config: WireguardClientConfig;
}

export interface OpenVPNConfig extends VPNConfigBase {
  type: "OpenVPN";
  config: OpenVpnClientConfig;
}

export interface PPTPVPNConfig extends VPNConfigBase {
  type: "PPTP";
  config: PptpClientConfig;
}

export interface L2TPVPNConfig extends VPNConfigBase {
  type: "L2TP";
  config: L2tpClientConfig;
}

export interface SSTPVPNConfig extends VPNConfigBase {
  type: "SSTP";
  config: SstpClientConfig;
}

export interface IKeV2VPNConfig extends VPNConfigBase {
  type: "IKeV2";
  config: Ike2ClientConfig;
}

export type VPNConfig =
  | WireguardVPNConfig
  | OpenVPNConfig
  | PPTPVPNConfig
  | L2TPVPNConfig
  | SSTPVPNConfig
  | IKeV2VPNConfig;

export interface VPNClientAdvancedState {
  vpnConfigs: VPNConfig[];
  priorities: string[]; // Array of VPN config IDs in priority order
  validationErrors: Record<string, string[]>;
  minVPNCount?: number; // Minimum required VPN configs (from Foreign WAN links)
  multiVPNStrategy?: MultiVPNConfig;
  viewMode?: "expanded" | "compact";
  mode: "advanced";
}

// Helper type for creating new VPN configs
export interface NewVPNConfig {
  type: VPNType;
  name: string;
  description?: string;
  assignedWANLink?: string;
}

// Validation error keys
export type VPNValidationKey =
  | `vpn-${string}-name`
  | `vpn-${string}-config`
  | `vpn-${string}-credentials`
  | `vpn-${string}-server`
  | `vpn-${string}-certificates`
  | "global-minCount"
  | "global-priorities"
  | "global-duplicate"
  | "step-incomplete";
