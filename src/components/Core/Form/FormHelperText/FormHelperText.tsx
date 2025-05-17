import { component$, Slot } from "@builder.io/qwik";

export type FormHelperTextSize = 'sm' | 'md' | 'lg';

export interface FormHelperTextProps {

  children?: string;

  size?: FormHelperTextSize;

  icon?: any; 

  disabled?: boolean;

  error?: boolean;

  success?: boolean;

  warning?: boolean;
  

  id?: string;

  hasTopMargin?: boolean;
  

  srOnly?: boolean;

  class?: string;
}


export const FormHelperText = component$<FormHelperTextProps>(({ 
  children,
  size = 'md',
  icon,
  disabled = false,
  error = false,
  success = false,
  warning = false,
  id,
  hasTopMargin = true,
  srOnly = false,
  class: className,
}) => {
  // Size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }[size];
  
  // Margin classes
  const marginClasses = hasTopMargin ? "mt-1" : "";
  
  // State classes
  let stateClasses = "text-text-muted dark:text-text-dark-muted";
  
  if (disabled) {
    stateClasses = "text-text-disabled dark:text-text-dark-disabled";
  } else if (error) {
    stateClasses = "text-error-600 dark:text-error-300";
  } else if (success) {
    stateClasses = "text-success-600 dark:text-success-300";
  } else if (warning) {
    stateClasses = "text-warning-600 dark:text-warning-300";
  }
  
  // Screen reader only classes
  const srOnlyClasses = srOnly ? "sr-only" : "";
  
  return (
    <p 
      id={id}
      class={`${sizeClasses} ${marginClasses} ${stateClasses} ${srOnlyClasses} ${icon ? 'flex items-center gap-1' : ''} ${className || ""}`}
      role="status"
    >
      {icon && <span class="flex-shrink-0">{icon}</span>}
      <span>
        {children}
        <Slot />
      </span>
    </p>
  );
});