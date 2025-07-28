import { component$, type QRL } from "@builder.io/qwik";

export interface InlineCheckboxProps {
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  class?: string;
}

export const InlineCheckbox = component$<InlineCheckboxProps>(
  ({ checked, onChange$, class: className = "" }) => {
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange$={(e) => onChange$((e.target as HTMLInputElement).checked)}
        class={`h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 ${className}`}
      />
    );
  },
);
