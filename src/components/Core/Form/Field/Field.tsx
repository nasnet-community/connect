import { component$, Slot, $, type QRL } from "@builder.io/qwik";

export interface FieldProps {

  type?: "text" | "password" | "checkbox" | "radio";
  
  label?: string;
  

  value?: string | boolean;

  placeholder?: string;
  

  required?: boolean;
  

  disabled?: boolean;
  

  id?: string;
  

  class?: string;
  

  error?: string;

  helperText?: string;
  

  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  

  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;
}

export const Field = component$<FieldProps>(({
  type = "text",
  label,
  value,
  placeholder,
  required = false,
  disabled = false,
  id,
  class: className,
  error,
  helperText,
  onInput$,
  onChange$,
}) => {
  const inputId = id || `field-${Math.random().toString(36).substring(2, 9)}`;
  
  const handleInput$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    if (onInput$) {
      onInput$(event, element);
    }
  });
  
  const handleChange$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    if (onChange$) {
      onChange$(event, element);
    }
  });
  
  if (type === "checkbox" || type === "radio") {
    return (
      <div class="flex items-center">
        <input
          type={type}
          id={inputId}
          checked={value === true}
          disabled={disabled}
          onChange$={handleChange$}
          class={`h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark ${className || ""}`}
        />
        {label && (
          <label 
            for={inputId} 
            class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary"
          >
            {label}
            {required && <span class="ml-1 text-error">*</span>}
          </label>
        )}
      </div>
    );
  }
  
  return (
    <div class="w-full">
      {label && (
        <label 
          for={inputId} 
          class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
        >
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div class="relative mt-1">
        <Slot name="prefix" />
        
        <input
          type={type}
          id={inputId}
          value={value as string}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onInput$={handleInput$}
          onChange$={handleChange$}
          class={`
            mt-1 block w-full rounded-md border 
            border-border bg-white px-3 py-2 
            focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
            dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default
            ${error ? 'border-error dark:border-error' : ''}
            ${className || ""}
          `}
        />
        
        <Slot name="suffix" />
      </div>
      
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