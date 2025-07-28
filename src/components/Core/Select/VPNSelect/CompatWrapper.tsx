import { component$, $, type QRL } from "@builder.io/qwik";
import { type VPNSelectProps } from "./VPNSelect";
import { UnifiedSelect } from "../UnifiedSelect";
import { type SelectProps } from "../UnifiedSelect.types";

/**
 * Compatibility wrapper for the VPNSelect component
 *
 * This component maps the old VPNSelect API to the new UnifiedSelect component.
 * It ensures backward compatibility for existing code.
 */
export const VPNSelectCompat = component$<VPNSelectProps>((props) => {
  // Map VPNSelect props to UnifiedSelect props
  const unifiedProps: SelectProps = {
    options: props.options,
    value: props.value,
    id: props.id,
    class: props.class,
    required: props.required,
    disabled: props.disabled,
    placeholder: props.placeholder,
    label: props.label,
    // Handle the different type signatures for onChange$
    onChange$: props.onChange$
      ? $((value: string | string[]) => {
          if (typeof value === "string") {
            // Type assertion to satisfy the compiler
            const callback = props.onChange$ as QRL<
              (value: string, element: HTMLSelectElement) => void
            >;
            // We don't have the element reference in this adapter layer
            callback(value, null as any);
          }
          // Silently ignore array values as the original component only handled strings
        })
      : undefined,
    errorMessage: props.error, // Map error to errorMessage
    helperText: props.helperText,
    mode: "native", // Always use native mode for backward compatibility
  };

  return <UnifiedSelect {...unifiedProps} />;
});

export default VPNSelectCompat;
