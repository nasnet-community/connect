import { component$, type QRL } from "@builder.io/qwik";

export interface FormFieldProps {
  label: string;
  value: string;
  onInput$?: QRL<
    (event: Event, element: HTMLInputElement | HTMLTextAreaElement) => void
  >;
  type?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  class?: string;
  id?: string;
  disabled?: boolean;
}

export const FormField = component$<FormFieldProps>(
  ({
    label,
    value,
    onInput$,
    type = "text",
    required = false,
    placeholder = "",
    helperText,
    class: className = "",
    id,
    disabled = false,
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
            class="w-full rounded-lg border border-border bg-white px-3 py-2
                 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                 disabled:cursor-not-allowed disabled:opacity-75
                 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onInput$={onInput$}
            placeholder={placeholder}
            disabled={disabled}
            class="w-full rounded-lg border border-border bg-white px-3 py-2
                 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                 disabled:cursor-not-allowed disabled:opacity-75
                 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
          />
        )}

        {helperText && (
          <p class="text-text-muted dark:text-text-dark-muted mt-1 text-xs">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
