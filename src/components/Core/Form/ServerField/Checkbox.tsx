import { component$, type QRL } from "@builder.io/qwik";

export interface CheckboxProps {
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  label?: string;
  class?: string;
}

export const Checkbox = component$<CheckboxProps>(
  ({ checked, onChange$, label, class: className = "" }) => {
    return (
      <div class={`flex items-center ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange$={(e) => onChange$((e.target as HTMLInputElement).checked)}
          class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
        />
        {label && (
          <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
      </div>
    );
  },
);
