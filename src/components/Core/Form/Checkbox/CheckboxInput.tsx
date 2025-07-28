import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { CheckboxSize } from "./Checkbox.types";

export interface CheckboxInputProps {
  id: string;
  name?: string;
  value?: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: CheckboxSize;
  indeterminate?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  class?: string;
  onChange$: QRL<(event: Event) => void>;
  ref: { value: HTMLInputElement | undefined };
}

export const CheckboxInput = component$<CheckboxInputProps>(
  ({
    id,
    name,
    value,
    checked,
    disabled = false,
    required = false,
    size = "md",
    ariaLabel,
    ariaDescribedBy,
    class: className,
    onChange$,
    ref,
  }) => {
    // Size-specific classes with mobile-optimized touch targets
    const sizeClasses = {
      sm: "h-4 w-4 sm:h-3.5 sm:w-3.5",
      md: "h-5 w-5 sm:h-4 sm:w-4",
      lg: "h-6 w-6 sm:h-5 sm:w-5",
    }[size];

    return (
      <input
        ref={ref}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        onChange$={onChange$}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        class={`
        ${sizeClasses}
        dark:bg-surface-dark-secondary rounded border-2
        border-gray-300 bg-white text-primary-600
        transition-all duration-200
        checked:border-primary-600 checked:bg-primary-600
        indeterminate:border-primary-600 indeterminate:bg-primary-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500
        focus:ring-offset-2 dark:border-gray-600
        dark:text-primary-500 dark:checked:border-primary-500
        dark:checked:bg-primary-500 dark:indeterminate:border-primary-500
        dark:indeterminate:bg-primary-500 dark:hover:border-gray-500
        dark:focus:ring-primary-400 dark:focus:ring-offset-gray-800
        ${
          disabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60 dark:border-gray-700 dark:bg-gray-800"
            : "cursor-pointer touch-manipulation active:scale-95"
        }
        ${className || ""}
      `}
      />
    );
  },
);
