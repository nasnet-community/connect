import { component$, $, type QRL } from "@builder.io/qwik";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  class?: string;
  direction?: "horizontal" | "vertical";
  onChange$?: QRL<(value: string) => void>;
}


export const RadioGroup = component$<RadioGroupProps>(({
  options,
  value,
  name,
  label,
  required = false,
  disabled = false,
  error,
  class: className,
  direction = "horizontal",
  onChange$,
}) => {
  
  const handleChange$ = $((optionValue: string) => {
    if (onChange$) {
      onChange$(optionValue);
    }
  });
  
  const directionClass = direction === "horizontal" 
    ? "flex space-x-4" 
    : "flex flex-col space-y-2";
  
  return (
    <div class={`${className || ""}`}>
      {label && (
        <label 
          class="mb-2 block text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
        >
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div class={directionClass}>
        {options.map((option) => (
          <label 
            key={option.value}
            class="flex items-center"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={disabled || option.disabled}
              onChange$={() => handleChange$(option.value)}
              class="h-4 w-4 border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
            />
            <span class="ml-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p class="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}); 