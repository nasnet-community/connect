import { component$, $ } from "@builder.io/qwik";
import type { CheckboxGroupProps } from "./Checkbox.types";
import { Checkbox } from "./Checkbox";
import { useCheckboxGroup } from "./hooks/useCheckboxGroup";

/**
 * CheckboxGroup component for managing a group of related checkbox options.
 *
 * This component simplifies the creation and management of a set of checkboxes,
 * handling the relationship between them and centralizing state management.
 */
export const CheckboxGroup = component$<CheckboxGroupProps>(
  ({
    options,
    selected,
    label,
    id: propId,
    helperText,
    error,
    name,
    required = false,
    disabled = false,
    direction = "vertical",
    size = "md",
    onToggle$,
    onSelectionChange$,
    class: className,
  }) => {
    const {
      groupId,
      helperId,
      errorId,
      describedBy,
      handleToggle$,
      containerClass,
    } = useCheckboxGroup({
      id: propId,
      selected,
      direction,
      helperText,
      error,
      onToggle$,
      onSelectionChange$,
      class: className,
    });

    return (
      <fieldset id={groupId} aria-describedby={describedBy} class="w-full">
        {/* Group label (legend) */}
        {label && (
          <legend class="text-text-primary dark:text-text-dark-primary mb-2 text-sm font-medium">
            {label}
            {required && <span class="ml-1 text-error">*</span>}
          </legend>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperId}
            class="text-text-secondary dark:text-text-dark-secondary mb-2 text-xs"
          >
            {helperText}
          </p>
        )}

        {/* Checkbox options */}
        <div class={containerClass} role="group">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              id={`${groupId}-${option.value}`}
              name={name}
              value={option.value}
              label={option.label}
              checked={selected.includes(option.value)}
              onChange$={$(() => handleToggle$(option.value))}
              disabled={disabled || option.disabled}
              required={required}
              size={size}
              class={option.class}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} class="mt-1 text-sm text-error">
            {error}
          </p>
        )}
      </fieldset>
    );
  },
);
