import { component$, Slot, $, type QRL, useId } from "@builder.io/qwik";

export type InputSize = "sm" | "md" | "lg";
export type ValidationState = "default" | "valid" | "invalid";

export interface FormFieldProps {
  /**
   * Label text for the form field
   */
  label: string;
  
  /**
   * Input field ID
   */
  id?: string;
  
  /**
   * Error message to display for validation errors
   */
  errorMessage?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Input field size
   */
  size?: InputSize;
  
  /**
   * Validation state
   */
  validation?: ValidationState;
  
  /**
   * Additional CSS classes
   */
  class?: string;
}

/**
 * FormField component for form layout and validation
 * Follows modern design patterns with accessible features
 */
export const FormField = component$<FormFieldProps>(({ 
  label,
  id,
  errorMessage,
  required = false,
  helperText,
  size = "md",
  validation = "default",
  class: className = "",
}) => {
  const uniqueId = useId();
  const fieldId = id || `form-field-${uniqueId}`;
  const hasError = validation === "invalid" || !!errorMessage;
  const isValid = validation === "valid";
  
  // Size-based classes
  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  
  // Validation-based classes
  const messageClasses = hasError 
    ? "text-error-600 dark:text-error-500" 
    : isValid 
      ? "text-success-600 dark:text-success-500" 
      : "text-text-muted dark:text-text-dark-muted";
  
  return (
    <div class={`w-full mb-4 ${className}`}>
      <label 
        for={fieldId}
        class={`block mb-1.5 font-medium text-text-secondary dark:text-text-dark-secondary ${labelSizeClasses[size]}`}
      >
        {label}
        {required && <span class="ml-1 text-error-600 dark:text-error-500">*</span>}
      </label>
      <div class="w-full">
        <Slot />
      </div>
      {(errorMessage || helperText) && (
        <p class={`mt-1.5 ${size === "sm" ? "text-xs" : "text-sm"} ${messageClasses}`}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

/**
 * SectionTitle component for form sections
 */
export const SectionTitle = component$<{ title: string }>(({ title }) => {
  return (
    <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
      {title}
    </h3>
  );
});

/**
 * Button component for form actions
 */
export interface ButtonProps {
  /**
   * Whether the button is primary style
   */
  primary?: boolean;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the button represents a dangerous action
   */
  danger?: boolean;
  
  /**
   * Additional CSS classes
   */
  class?: string;
  
  /**
   * Click handler
   */
  onClick$?: QRL<() => void>;
}

export const Button = component$<ButtonProps>(({
  primary = true,
  disabled = false,
  danger = false,
  class: className = "",
  onClick$,
}) => {
  // Create a safe handler for click
  const handleClick = $(() => {
    if (onClick$) {
      onClick$();
    }
  });

  // Dynamic class based on props
  const buttonClass = primary 
    ? `bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 ${danger ? "bg-error-500 hover:bg-error-600 dark:bg-error-600 dark:hover:bg-error-700" : ""}`
    : `bg-white text-text-default border border-border hover:bg-surface-lighter dark:bg-surface-dark dark:text-text-dark-default dark:border-border-dark dark:hover:bg-surface-dark-lighter ${danger ? "text-error-600 hover:text-error-700 dark:text-error-500 dark:hover:text-error-400" : ""}`;

  return (
    <button
      onClick$={handleClick}
      disabled={disabled}
      class={`rounded-lg px-4 py-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${buttonClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <Slot />
    </button>
  );
}); 