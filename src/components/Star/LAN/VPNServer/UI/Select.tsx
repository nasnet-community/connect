import { component$, type QRL, useId } from "@builder.io/qwik";
import { HiChevronDownOutline } from "@qwikest/icons/heroicons";

export interface SelectOption {
  /**
   * The value of the option
   */
  value: string;
  
  /**
   * The display label for the option
   */
  label: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  
  /**
   * Option group (for grouped selects)
   */
  group?: string;
}

export type SelectSize = "sm" | "md" | "lg";
export type ValidationState = "default" | "valid" | "invalid";

export interface SelectProps {
  /**
   * The options for the select
   */
  options: SelectOption[];
  
  /**
   * The currently selected value
   */
  value?: string;
  
  /**
   * Unique ID for the select element
   */
  id?: string;
  
  /**
   * Name attribute for the select
   */
  name?: string;
  
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the select is required
   */
  required?: boolean;
  
  /**
   * Size variant of the select
   */
  size?: SelectSize;
  
  /**
   * Validation state of the select
   */
  validation?: ValidationState;
  
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  
  /**
   * CSS class for the component
   */
  class?: string;
  
  /**
   * Handler for when the selection changes
   */
  onChange$?: QRL<(value: string) => void>;
}

export const Select = component$<SelectProps>(({ 
  options,
  value = "",
  id,
  name,
  disabled = false,
  required = false,
  size = "md",
  validation = "default",
  placeholder = "Select an option",
  class: className = "",
  onChange$,
}) => {
  const uniqueId = useId();
  const selectId = id || `select-${uniqueId}`;
  
  // Size-based classes
  const sizeClasses = {
    sm: "py-1.5 text-xs",
    md: "py-2 text-sm",
    lg: "py-2.5 text-base"
  };
  
  // Validation-based classes
  const validationClasses = {
    default: "border-border focus:border-primary-500 focus:ring-primary-500 dark:border-border-dark",
    valid: "border-success-500 focus:border-success-500 focus:ring-success-500 dark:border-success-500",
    invalid: "border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-500"
  };
  
  return (
    <div class="relative">
      <select
        id={selectId}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        class={`block w-full rounded-lg border bg-white pr-10 pl-3 ${sizeClasses[size]} ${validationClasses[validation]}
          appearance-none shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          disabled:cursor-not-allowed disabled:bg-surface-lighter disabled:text-text-muted 
          dark:bg-surface-dark dark:text-text-dark-default 
          dark:disabled:bg-surface-dark-lighter dark:disabled:text-text-dark-muted
          ${className}`}
        onChange$={(e) => {
          if (onChange$) {
            const target = e.target as HTMLSelectElement;
            onChange$(target.value);
          }
        }}
      >
        {placeholder && !value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
        <HiChevronDownOutline class="h-5 w-5" />
      </div>
    </div>
  );
});