import { component$ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";
import type { SwitchProps } from "./Switch";

/**
 * Compatibility wrapper for the legacy Switch component.
 * This redirects to the new Toggle component while maintaining API compatibility.
 */
export const SwitchCompatWrapper = component$<SwitchProps>(
  ({
    checked,
    onChange$,
    label,
    labelPosition = "right",
    size = "md",
    disabled = false,
    required = false,
    id,
    ...props
  }) => {
    return (
      <Toggle
        checked={checked}
        onChange$={onChange$}
        label={label}
        labelPosition={labelPosition}
        size={size}
        disabled={disabled}
        required={required}
        id={id}
        {...props}
      />
    );
  },
);
