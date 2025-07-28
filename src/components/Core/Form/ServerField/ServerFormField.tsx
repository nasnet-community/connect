import { component$, Slot } from "@builder.io/qwik";

export interface ServerFormFieldProps {
  label: string;
  required?: boolean;
  errorMessage?: string;
  class?: string;
  inline?: boolean;
}

export const ServerFormField = component$<ServerFormFieldProps>(
  ({
    label,
    required = false,
    errorMessage,
    class: className = "",
    inline = false,
  }) => {
    return (
      <div class={`${inline ? "flex items-center gap-3" : ""} ${className}`}>
        {!inline && (
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div class={inline ? "flex-1" : ""}>
          <Slot />
        </div>

        {inline && (
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
          </label>
        )}

        {errorMessage && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
