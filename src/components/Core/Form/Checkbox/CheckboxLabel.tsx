import { component$ } from "@builder.io/qwik";
import type { CheckboxSize } from "./Checkbox.types";

export interface CheckboxLabelProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  size?: CheckboxSize;
  helperText?: string;
  error?: string;
  helperId?: string;
  errorId?: string;
}

export const CheckboxLabel = component$<CheckboxLabelProps>(
  ({
    id,
    label,
    required = false,
    disabled = false,
    size = "md",
    helperText,
    error,
    helperId,
    errorId,
  }) => {
    // Size-specific classes for text
    const textSizeClass = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }[size];

    return (
      <div class="ml-2">
        <label
          for={id}
          class={`
          ${textSizeClass}
          text-text-primary
          dark:text-text-dark-primary
          font-medium
          ${disabled ? "cursor-not-allowed opacity-60" : ""}
        `}
        >
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </label>

        {helperText && !error && (
          <p
            id={helperId}
            class={`
            mt-1
            ${textSizeClass}
            text-text-secondary
            dark:text-text-dark-secondary
          `}
          >
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            class={`
            mt-1
            ${textSizeClass}
            text-error
          `}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
