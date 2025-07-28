import { component$, type QRL } from "@builder.io/qwik";

export interface CheckboxOption {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  selected: string[];
  onToggle$: QRL<(value: string) => void>;
  class?: string;
}

export const CheckboxGroup = component$<CheckboxGroupProps>(
  ({ options, selected, onToggle$, class: className = "" }) => {
    return (
      <div class={`flex flex-wrap gap-3 ${className}`}>
        {options.map((option) => (
          <label key={option.value} class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange$={() => onToggle$(option.value)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  },
);
