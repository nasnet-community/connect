import type { QRL, JSXChildren, Signal } from "@builder.io/qwik";

export type SubnetCategory = "base" | "vpn" | "tunnel" | "wan-domestic" | "wan-foreign" | "vpn-client";
export type SubnetMask = 24 | 30;

export interface SubnetConfig {
  key: string;
  label: string;
  placeholder: number; // Third octet value (e.g., 10, 20, 30)
  value: number | null;
  description?: string;
  category: SubnetCategory;
  isRequired?: boolean;
  mask: SubnetMask;
  color?: "primary" | "secondary" | "tertiary";
}

export interface SubnetInputProps {
  config: SubnetConfig;
  value: number | null;
  onChange$: QRL<(value: number | null) => void>;
  error?: string;
  disabled?: boolean;
}

export interface SubnetCardProps {
  title: string;
  description?: string;
  icon?: JSXChildren;
  category: SubnetCategory;
  configs: SubnetConfig[];
  values: Record<string, number | null>;
  onChange$: QRL<(key: string, value: number | null) => void>;
  errors?: Record<string, string>;
  disabled?: boolean;
  gradient?: boolean;
  class?: string;
}

export interface UseSubnetsReturn {
  subnetConfigs: SubnetConfig[];
  groupedConfigs: {
    base: SubnetConfig[];
    vpn: SubnetConfig[];
    tunnel: SubnetConfig[];
    "wan-domestic": SubnetConfig[];
    "wan-foreign": SubnetConfig[];
    "vpn-client": SubnetConfig[];
  };
  values: Signal<Record<string, number | null>>;
  errors: Signal<Record<string, string>>;
  isValid: Signal<boolean>;
  handleChange$: QRL<(key: string, value: number | null) => void>;
  validateAll$: QRL<() => Promise<boolean>>;
  reset$: QRL<() => void>;
  getSubnetString: QRL<(config: SubnetConfig, value: number | null) => string>;
  getSuggestedValue: QRL<(category: SubnetCategory) => number>;
  getTabsWithContent: QRL<() => SubnetCategory[]>;
  getCategoryProgress: QRL<(category: SubnetCategory) => { configured: number; total: number; percentage: number }>;
}

export interface SubnetValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  reserved?: number[];
  custom?: QRL<(value: number, allValues: Record<string, number | null>) => string | null>;
}

export interface NetworkVisualizationProps {
  configs: SubnetConfig[];
  values: Record<string, number | null>;
  showPreview?: boolean;
  compact?: boolean;
}