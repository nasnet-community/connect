import { component$ } from "@builder.io/qwik";
import type { CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./hooks/useCheckbox";
import { CheckboxInput } from "./CheckboxInput";
import { CheckboxLabel } from "./CheckboxLabel";

/**
 * Checkbox component for selecting boolean options.
 *
 * This component provides an accessible checkbox input with customizable
 * styling, sizes, and states including an optional indeterminate state.
 */
export const Checkbox = component$<CheckboxProps>(
  ({
    checked,
    onChange$,
    onValueChange$,
    label,
    required = false,
    disabled = false,
    id: propId,
    name,
    value,
    size = "md",
    error,
    helperText,
    inline = false,
    indeterminate = false,
    class: className,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
  }) => {
    const { checkboxId, inputRef, handleChange$, helperId, errorId } =
      useCheckbox({
        id: propId,
        checked,
        onChange$,
        onValueChange$,
        indeterminate,
        size,
        helperText,
        error,
      });

    // Combine aria-describedby values
    const describedBy =
      [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") ||
      undefined;

    // For a standalone checkbox input without a label container
    if (inline) {
      return (
        <CheckboxInput
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          required={required}
          onChange$={handleChange$}
          ariaLabel={ariaLabel}
          ariaDescribedBy={describedBy}
          class={className}
          size={size}
          ref={inputRef}
        />
      );
    }

    // Full checkbox with label and optional helper/error messages
    return (
      <div class={className}>
        <div class="flex items-start gap-2 sm:gap-3">
          <div class="mt-0.5 flex items-center justify-center sm:mt-0">
            <CheckboxInput
              id={checkboxId}
              name={name}
              value={value}
              checked={checked}
              disabled={disabled}
              required={required}
              onChange$={handleChange$}
              ariaDescribedBy={describedBy}
              size={size}
              ref={inputRef}
            />
          </div>

          {label && (
            <div class="min-w-0 flex-1">
              <CheckboxLabel
                id={checkboxId}
                label={label}
                required={required}
                disabled={disabled}
                size={size}
                helperText={helperText}
                error={error}
                helperId={helperId}
                errorId={errorId}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);
