/**
 * Core Form Components
 *
 * This file exports all form-related components for the Connect design system.
 */

// Field components
export * from "./Field";
export * from "./FormLabel";
export * from "./FormHelperText";
export * from "./FormErrorMessage";
export * from "./Container";
export * from "./Form";

// Enhanced components (prioritized over legacy components)
import { PasswordField } from "./PasswordField/PasswordField";
import type { PasswordFieldProps } from "./PasswordField/PasswordField";
export { PasswordField, type PasswordFieldProps };

import { Checkbox } from "./Checkbox/Checkbox";
import { CheckboxGroup } from "./Checkbox/CheckboxGroup";
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxOption,
  CheckboxSize,
} from "./Checkbox/Checkbox.types";
export {
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  type CheckboxGroupProps,
  type CheckboxOption,
  type CheckboxSize,
};

export * from "./RadioGroup";
export * from "./DatePicker";
export * from "./Slider";
export * from "./TextArea";
export * from "./FileUpload";
export * from "./NumberInput";
export * from "./PinInput";
export * from "./Autocomplete";
export * from "./Rating";
export * from "./NetworkInput";
export * from "./PrefixedInput";

// Legacy ServerField components - for backward compatibility only
// @deprecated Use Field, Select, and other Core Form components instead
export * as ServerField from "./ServerField";
