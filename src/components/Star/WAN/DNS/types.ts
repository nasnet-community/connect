import type { QRL } from "@builder.io/qwik";

export type NetworkType = "Foreign" | "VPN" | "Split" | "Domestic";

export type DOHTargetNetwork = "Domestic" | "VPN";

export interface NetworkDNSConfig {
  type: NetworkType;
  dns: string;
  label: string;
  description: string;
  required: boolean;
  placeholder: string;
  icon?: string;
  gradient?: string;
}

export interface DNSStepProps {
  isComplete?: boolean;
  onComplete$: QRL<() => void>;
  onDisabled$?: QRL<() => void>;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface DOHNetworkInfo {
  target: DOHTargetNetwork;
  label: string;
  description: string;
  networkColor: string;
  networkIcon: string;
}

export interface DNSPreset {
  name: string;
  description: string;
  primary: string;
  secondary: string;
  category: "public" | "secure" | "fast" | "filtered" | "privacy" | "family" | "adblock";
  icon?: string;
}