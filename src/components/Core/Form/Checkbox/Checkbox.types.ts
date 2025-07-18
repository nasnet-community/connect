import { type QRL } from "@builder.io/qwik";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  onValueChange$?: QRL<(checked: boolean) => void>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  size?: CheckboxSize;
  error?: string;
  helperText?: string;
  inline?: boolean;
  indeterminate?: boolean;
  class?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  class?: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  selected: string[];
  label?: string;
  id?: string;
  helperText?: string;
  error?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  size?: CheckboxSize;
  onToggle$: QRL<(value: string) => void>;
  onSelectionChange$?: QRL<(selectedValues: string[]) => void>;
  class?: string;
}
