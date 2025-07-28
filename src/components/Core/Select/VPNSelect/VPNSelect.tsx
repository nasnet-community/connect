import { type QRL } from "@builder.io/qwik";

export interface VPNSelectOption {
  value: string;

  label: string;

  disabled?: boolean;
}

export interface VPNSelectProps {
  options: VPNSelectOption[];

  value: string;

  label?: string;

  placeholder?: string;

  required?: boolean;

  disabled?: boolean;

  error?: string;

  helperText?: string;

  id?: string;

  class?: string;

  onChange$?: QRL<(value: string, element: HTMLSelectElement) => void>;
}

// Re-export the compatibility wrapper component that uses UnifiedSelect under the hood
import { VPNSelectCompat } from "./CompatWrapper";
export const VPNSelect = VPNSelectCompat;

// Original implementation is preserved below for reference
// but is no longer used
/* 
export const VPNSelect_Original = component$<VPNSelectProps>(({
  options,
  value,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  id,
  class: className,
  onChange$,
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  const handleChange$ = $((event: Event) => {
    const element = event.target as HTMLSelectElement;
    if (onChange$) {
      onChange$(element.value, element);
    }
  });
  
  return (
    <div class={`w-full ${className || ""}`}>
      {label && (
        <label 
          for={selectId}
          class="mb-2 block text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
        >
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        value={value}
        disabled={disabled}
        required={required}
        onChange$={handleChange$}
        class={`
          mt-1 block w-full rounded-md border 
          border-border bg-white px-3 py-2 
          focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
          dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default
          ${error ? 'border-error dark:border-error' : ''}
        `}
      >
        {placeholder && (
          <option value="" disabled={required}>
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
      
      {error && (
        <p class="mt-1 text-sm text-error">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p class="mt-1 text-sm text-text-muted dark:text-text-dark-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}); 
*/
