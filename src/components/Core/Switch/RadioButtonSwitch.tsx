import { component$, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import { VisuallyHidden } from "../common";

export interface RadioButtonSwitchProps {
  /**
   * The ID of the input element
   */
  id?: string;
  /**
   * The name of the input element
   */
  name?: string;
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  /**
   * Event handler for when the switch is toggled
   */
  onChange$?: QRL<(checked: boolean) => void>;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * The size of the switch
   */
  size?: "sm" | "md" | "lg";
  /**
   * Additional CSS classes to apply to the switch
   */
  class?: string;
  /**
   * The label for the switch
   */
  label?: string;
}

/**
 * RadioButtonSwitch component that provides a toggle switch UI.
 * Despite its original name, this is functionally a toggle switch, not a radio button.
 */
export const RadioButtonSwitch = component$<RadioButtonSwitchProps>(
  ({
    id,
    name,
    checked = false,
    onChange$,
    disabled = false,
    size = "md",
    class: className = "",
    label,
  }) => {
    const isChecked = useSignal(checked);

    // Track internal changes to trigger event
    const internalChange = useSignal<boolean | null>(null);

    // Sync checked prop with internal state
    useTask$(({ track }) => {
      track(() => checked);
      isChecked.value = checked;
    });

    // Watch for internal changes and emit event
    useTask$(({ track }) => {
      const change = track(() => internalChange.value);
      if (change !== null && onChange$) {
        onChange$(change);
      }
    });

    // Size classes mapping
    const sizeClasses = {
      sm: "w-8 h-4",
      md: "w-10 h-5",
      lg: "w-12 h-6",
    }[size];

    const thumbSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }[size];

    const thumbPositionClasses = {
      sm: isChecked.value ? "translate-x-4" : "translate-x-0.5",
      md: isChecked.value ? "translate-x-5" : "translate-x-0.5",
      lg: isChecked.value ? "translate-x-6" : "translate-x-0.5",
    }[size];

    return (
      <label
        class={`inline-flex cursor-pointer items-center ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
      >
        <div class="relative">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={isChecked.value}
            disabled={disabled}
            onChange$={() => {
              if (!disabled) {
                const newValue = !isChecked.value;
                isChecked.value = newValue;
                internalChange.value = newValue;
              }
            }}
            class="sr-only"
            aria-checked={isChecked.value}
            aria-disabled={disabled}
          />
          <VisuallyHidden>{label || "Toggle switch"}</VisuallyHidden>
          <div
            class={`${sizeClasses} rounded-full bg-gray-200 transition-colors duration-200 ease-in-out dark:bg-gray-700 ${
              isChecked.value ? "bg-primary-500 dark:bg-primary-600" : ""
            }`}
          ></div>
          <div
            class={`absolute left-0 top-0.5 ${thumbSizeClasses} transform rounded-full bg-white transition-transform duration-200 ease-in-out ${thumbPositionClasses}`}
          ></div>
        </div>
        {label && <span class="ml-2">{label}</span>}
      </label>
    );
  },
);
