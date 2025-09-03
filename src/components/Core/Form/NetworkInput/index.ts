/**
 * NetworkInput Components
 * 
 * Flexible network address input components supporting various formats:
 * - IPv4 addresses with CIDR notation
 * - Subnet configuration with visual formatting
 * - IP range selection
 * - Class A, B, C network formats
 */

// Main component
export { NetworkInput } from "./NetworkInput";

// Variants
export { IPv4Input } from "./variants/IPv4Input";
export { SubnetInput } from "./variants/SubnetInput";
export { RangeInput } from "./variants/RangeInput";

// Types
export type {
  NetworkInputProps,
  NetworkInputMode,
  NetworkFormat,
  NetworkClass,
  ValidationConfig,
  VisualFormatConfig,
  NetworkPresets,
  NetworkValue,
  OctetInputProps,
  IPv4InputProps,
  SubnetInputProps,
  RangeInputProps,
  NetworkInputExampleProps,
} from "./NetworkInput.types";

// Utilities
export {
  NETWORK_PRESETS,
  RESERVED_ADDRESSES,
  getNetworkPreset,
  generateSuggestions,
  parseNetworkString,
  buildNetworkString,
  validateNetworkInput,
  hasNetworkConflict,
  getSubnetMask,
  getNetworkInfo,
} from "./NetworkInput.utils";