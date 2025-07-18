import { component$, Slot } from "@builder.io/qwik";

export type FormLabelSize = 'sm' | 'md' | 'lg';

export interface FormLabelProps {

  children?: string;

  for?: string;

  required?: boolean;

  size?: FormLabelSize;

  disabled?: boolean;

  error?: boolean;

  success?: boolean;

  warning?: boolean;

  id?: string;

  srOnly?: boolean;

  class?: string;
}

export const FormLabel = component$<FormLabelProps>(({ 
  children,
  for: htmlFor,
  required = false,
  size = 'md',
  disabled = false,
  error = false,
  success = false,
  warning = false,
  id,
  srOnly = false,
  class: className,
}) => {
  // Base classes
  const baseClasses = "font-medium";
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }[size];
  
  // State classes
  let stateClasses = "text-text-secondary dark:text-text-dark-secondary";
  
  if (disabled) {
    stateClasses = "text-text-disabled dark:text-text-dark-disabled cursor-not-allowed";
  } else if (error) {
    stateClasses = "text-error dark:text-error-300";
  } else if (success) {
    stateClasses = "text-success dark:text-success-300";
  } else if (warning) {
    stateClasses = "text-warning dark:text-warning-300";
  }
  
  // Screen reader only classes
  const srOnlyClasses = srOnly ? "sr-only" : "block";
  
  return (
    <label 
      id={id}
      for={htmlFor} 
      class={`${baseClasses} ${sizeClasses} ${stateClasses} ${srOnlyClasses} ${className || ""}`}
      aria-disabled={disabled ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      aria-invalid={error ? 'true' : undefined}
    >
      {children}
      <Slot />
      {required && !srOnly && <span class="ml-1 text-error" aria-hidden="true">*</span>}
    </label>
  );
});