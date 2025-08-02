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

export interface VPNConfigBase {
  id: string;
  name: string;
  type: VPNType;
  priority: number;
  enabled: boolean;
  description?: string;
  assignedLink?: string; // Foreign WAN link ID this VPN is assigned to
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
}

// Helper type for creating new VPN configs
export interface NewVPNConfig {
  type: VPNType;
  name: string;
  description?: string;
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
  | "global-duplicate";
