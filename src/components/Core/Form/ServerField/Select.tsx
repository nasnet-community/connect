import { component$, type QRL } from "@builder.io/qwik";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange$: QRL<(value: string) => void>;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  class?: string;
}

export const Select = component$<SelectProps>(
  ({
    value,
    onChange$,
    options,
    placeholder,
    error = false,
    class: className = "",
  }) => {
    return (
      <select
        value={value}
        onChange$={(e) => onChange$((e.target as HTMLSelectElement).value)}
        class={`w-full rounded-lg border px-4 py-2 ${
          error
            ? "border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500"
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        } ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);
