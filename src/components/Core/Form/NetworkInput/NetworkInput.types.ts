import type { QRL } from "@builder.io/qwik";

// Network format types
export type NetworkFormat = "classA" | "classB" | "classC" | "custom";

// Input modes
export type NetworkInputMode = "octet" | "full" | "range";

// Network classes with their default configurations
export interface NetworkClass {
  prefix: string;
  suffix: string;
  mask: number;
  inputFields: number;  // Number of octets to input
  placeholders: number[];
  defaultValues: number[];
  allowedRange: {
    min: number[];
    max: number[];
  };
  description: string;
}

// Validation configuration
export interface ValidationConfig {
  allowedRanges?: string[];
  excludedValues?: number[];
  conflictCheck?: QRL<(value: string) => boolean>;
  customValidation?: QRL<(value: string | number | null) => string | null>;
  reservedAddresses?: number[];
}

// Visual format configuration
export interface VisualFormatConfig {
  prefix?: string;
  suffix?: string;
  showFullAddress?: boolean;
  showSubnetMask?: boolean;
  highlightInput?: boolean;
  compactMode?: boolean;
}

// Main component props
export interface NetworkInputProps {
  // Core functionality
  mode: NetworkInputMode;
  format: NetworkFormat;
  value: string | number | number[] | null;
  onChange$: QRL<(value: string | number | number[] | null) => void>;
  
  // Content and labeling
  label?: string;
  description?: string;
  placeholder?: string | number | number[];
  defaultValue?: string | number | number[];
  helpText?: string;
  
  // Validation and state
  error?: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  
  // Network configuration
  mask?: number;
  customPrefix?: string;
  customSuffix?: string;
  
  // Validation rules
  validation?: ValidationConfig;
  
  // Visual customization
  visualFormat?: VisualFormatConfig;
  
  // Styling
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  color?: "default" | "primary" | "success" | "warning" | "error";
  
  // Accessibility and interaction
  autoFocus?: boolean;
  readonly?: boolean;
  id?: string;
  name?: string;
  tabIndex?: number;
  
  // Event handlers
  onFocus$?: QRL<() => void>;
  onBlur$?: QRL<() => void>;
  onValidate$?: QRL<(isValid: boolean) => void>;
  
  // Advanced features
  suggestions?: string[];
  showSuggestions?: boolean;
  allowCustomFormat?: boolean;
}

// Preset configurations for common network types
export interface NetworkPresets {
  classA: NetworkClass;
  classB: NetworkClass;
  classC: NetworkClass;
  custom: NetworkClass;
}

// Internal value representation
export interface NetworkValue {
  octets: number[];
  mask: number;
  full: string;
  isValid: boolean;
}

// Octet input component props
export interface OctetInputProps {
  value: number | null;
  onChange$: QRL<(value: number | null) => void>;
  placeholder?: number;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  autoFocus?: boolean;
  onFocus$?: QRL<() => void>;
  onBlur$?: QRL<() => void>;
  maxValue?: number;
  minValue?: number;
}

// Component variants
export interface IPv4InputProps extends Omit<NetworkInputProps, 'mode' | 'format'> {
  format?: NetworkFormat;
}

export interface SubnetInputProps extends Omit<NetworkInputProps, 'mode'> {
  showMask?: boolean;
  defaultMask?: number;
}

export interface RangeInputProps extends Omit<NetworkInputProps, 'mode'> {
  startValue?: string | number[];
  endValue?: string | number[];
  onRangeChange$?: QRL<(start: string, end: string) => void>;
}

// Example component props
export interface NetworkInputExampleProps {
  variant?: "basic" | "class-a" | "class-b" | "class-c" | "subnet" | "range" | "multiple";
  title?: string;
  description?: string;
}