import { component$, Slot, type QRL } from "@builder.io/qwik";

export interface InputFieldProps {
  label: string;
  value: string;
  onInput$?: QRL<
    (event: Event, element: HTMLInputElement | HTMLTextAreaElement) => void
  >;
  type?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  class?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const InputField = component$<InputFieldProps>(
  ({
    label,
    value,
    onInput$,
    type = "text",
    required = false,
    placeholder = "",
    helperText,
    errorMessage,
    class: className = "",
    id,
    disabled = false,
    readOnly = false,
  }) => {
    return (
      <div class={`w-full ${className}`}>
        <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">
          {label} {required && <span class="text-error-600">*</span>}
        </label>

        {type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onInput$={onInput$}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            class={`w-full rounded-lg border border-border bg-white px-3 py-2
                 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                 disabled:cursor-not-allowed disabled:opacity-75
                 ${errorMessage ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
                 ${readOnly ? "bg-surface-lighter dark:bg-surface-dark-lighter" : ""}
                 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default`}
          />
        ) : (
          <div class="relative w-full">
            <input
              id={id}
              type={type}
              value={value}
              onInput$={onInput$}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              class={`w-full rounded-lg border border-border bg-white px-3 py-2
                  focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                  disabled:cursor-not-allowed disabled:opacity-75
                  ${errorMessage ? "border-error-500 focus:border-error-500 focus:ring-error-500" : ""}
                  ${readOnly ? "bg-surface-lighter dark:bg-surface-dark-lighter" : ""}
                  dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default`}
            />
            <Slot name="suffix" />
          </div>
        )}

        {helperText && !errorMessage && (
          <p class="text-text-muted dark:text-text-dark-muted mt-1 text-xs">
            {helperText}
          </p>
        )}

        {errorMessage && (
          <p class="mt-1 text-xs text-error-600 dark:text-error-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
