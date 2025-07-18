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

export const RadioGroup = component$<RadioGroupProps>(({
  options,
  value,
  onChange$,
  name,
  class: className = "",
  orientation = "vertical"
}) => {
  const containerClass = orientation === "horizontal" 
    ? "flex flex-wrap gap-4" 
    : "flex flex-col space-y-2";
  
  return (
    <div class={`${containerClass} ${className}`}>
      {options.map((option) => (
        <label 
          key={option.value}
          class={`flex items-center ${option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange$={() => onChange$(option.value)}
            class="h-4 w-4 border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:ring-offset-surface-dark"
          />
          <span class="ml-2 text-text-default dark:text-text-dark-default">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}); 