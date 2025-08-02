import { component$, type QRL } from "@builder.io/qwik";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange$: QRL<(value: string) => void>;
  name: string;
  class?: string;
  orientation?: "horizontal" | "vertical";
}

export const RadioGroup = component$<RadioGroupProps>(
  ({
    options,
    value,
    onChange$,
    name,
    class: className = "",
    orientation = "horizontal",
  }) => {
    return (
      <div
        class={`flex ${orientation === "vertical" ? "flex-col space-y-3" : "flex-row space-x-6"} ${className}`}
      >
        {options.map((option) => (
          <div key={option.value} class="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange$={(_, el) => onChange$(el.value)}
              class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500
                   disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              for={`${name}-${option.value}`}
              class="text-text-default ml-2 block text-sm font-medium disabled:cursor-not-allowed
                   disabled:opacity-60 dark:text-text-dark-default"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  },
);
