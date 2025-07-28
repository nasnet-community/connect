/**
 * Checkbox Components
 *
 * This file exports the enhanced Checkbox components and related types.
 * Checkbox components provide accessible, customizable inputs for boolean
 * or multiple selection options.
 */

import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxLabel } from "./CheckboxLabel";
import { useCheckbox } from "./hooks/useCheckbox";
import { useCheckboxGroup } from "./hooks/useCheckboxGroup";
import type {
  CheckboxProps,
  CheckboxSize,
  CheckboxOption,
  CheckboxGroupProps,
} from "./Checkbox.types";

export {
  Checkbox,
  CheckboxGroup,
  CheckboxInput,
  CheckboxLabel,
  useCheckbox,
  useCheckboxGroup,

  // Types
  type CheckboxProps,
  type CheckboxSize,
  type CheckboxOption,
  type CheckboxGroupProps,
};
