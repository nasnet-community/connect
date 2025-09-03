/**
 * PrefixedInput Components
 *
 * Input components with fixed prefix and editable suffix.
 * Perfect for interface names, identifiers, and structured input patterns.
 */

// Main component
export { PrefixedInput } from "./PrefixedInput";

// Variant components
export { InterfaceNameInput } from "./variants/InterfaceNameInput";
export { PortInput } from "./variants/PortInput";
export { ServiceInput } from "./variants/ServiceInput";
export { IdInput } from "./variants/IdInput";

// Types
export type {
  PrefixedInputProps,
  InterfaceNameInputProps,
  PortInputProps,
  ServiceInputProps,
  IdInputProps,
  PrefixedInputVariant,
  PrefixedInputSize,
  PrefixedInputColor,
  AnimationType,
  PrefixVariant,
  VariantConfig,
  AnimationConfig,
} from "./PrefixedInput.types";