import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import { HiEyeOutline, HiEyeSlashOutline } from "@qwikest/icons/heroicons";


export interface PasswordFieldProps {

  value: string;

  label?: string;

  placeholder?: string;

  required?: boolean;

  disabled?: boolean;

  id?: string;

  class?: string;

  error?: string;

  helperText?: string;

  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;

  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;

  onValueChange$?: QRL<(value: string) => void>;

  size?: "sm" | "md" | "lg";

  initiallyVisible?: boolean;
  
  toggleLabel?: string;

  showStrength?: boolean;
}


export const PasswordField = component$<PasswordFieldProps>(({
  value,
  label,
  placeholder,
  required = false,
  disabled = false,
  id,
  class: className = "",
  error,
  helperText,
  onInput$,
  onChange$,
  onValueChange$,
  size = "md",
  initiallyVisible = false,
  toggleLabel,
  showStrength = false,
}) => {
  // Control password visibility state
  const showPassword = useSignal(initiallyVisible);
  
  // Generate a unique ID for the input if not provided
  const inputId = id || `password-field-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle toggling password visibility
  const togglePasswordVisibility = $(() => {
    showPassword.value = !showPassword.value;
  });
  
  // Handle input events
  const handleInput$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    if (onInput$) {
      onInput$(event, element);
    }
    if (onValueChange$) {
      onValueChange$(element.value);
    }
  });
  
  // Handle change events
  const handleChange$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    if (onChange$) {
      onChange$(event, element);
    }
    if (onValueChange$ && !onInput$) {
      onValueChange$(element.value);
    }
  });
  
  // Determine size classes
  const sizeClasses = {
    sm: "py-1 px-2 text-xs",
    md: "py-2 px-3 text-sm",
    lg: "py-3 px-4 text-base",
  }[size];
  
  // Determine toggle button position based on size
  const toggleButtonClasses = {
    sm: "px-1",
    md: "px-2", 
    lg: "px-3",
  }[size];
  
  return (
    <div class="w-full">
      {/* Field label */}
      {label && (
        <label 
          for={inputId} 
          class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
        >
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </label>
      )}
      
      {/* Password input with toggle button */}
      <div class="relative mt-1">
        <input
          type={showPassword.value ? "text" : "password"}
          id={inputId}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onInput$={handleInput$}
          onChange$={handleChange$}
          class={`
            block w-full rounded-md border 
            ${sizeClasses}
            pr-10 
            border-border 
            ${error ? 'border-error dark:border-error focus:border-error focus:ring-error/30' : 
                   'focus:border-primary-500 focus:ring-primary-500/30'}
            focus:outline-none focus:ring-4
            dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default
            ${disabled ? 'opacity-60 cursor-not-allowed bg-surface-disabled dark:bg-surface-dark-disabled' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
        />
        
        {/* Toggle visibility button */}
        <button
          type="button"
          onClick$={togglePasswordVisibility}
          disabled={disabled}
          aria-label={toggleLabel || (showPassword.value ? "Hide password" : "Show password")}
          class={`
            absolute inset-y-0 right-0 flex items-center ${toggleButtonClasses}
            text-text-secondary dark:text-text-dark-secondary
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:text-text-primary dark:hover:text-text-dark-primary'}
          `}
          tabIndex={-1} 
        >
          {showPassword.value ? (
            <HiEyeSlashOutline class="h-5 w-5" />
          ) : (
            <HiEyeOutline class="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Password strength indicator (optional) */}
      {showStrength && value && !error && (
        <div class="mt-1">
          <PasswordStrengthIndicator password={value} />
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <p class="mt-1 text-sm text-error">
          {error}
        </p>
      )}
      
      {/* Helper text */}
      {helperText && !error && (
        <p class="mt-1 text-sm text-text-muted dark:text-text-dark-muted">
          {helperText}
        </p>
      )}
    </div>
  );
});


export const PasswordStrengthIndicator = component$<{ password: string }>(({ 
  password 
}) => {
  // Calculate password strength from 0-100
  const strength = calculatePasswordStrength(password);
  
  // Determine color based on strength
  const getStrengthColor = () => {
    if (strength < 30) return "bg-error";
    if (strength < 60) return "bg-warning-500";
    return "bg-success-500";
  };
  
  // Get text description
  const getStrengthText = () => {
    if (strength < 30) return "Weak";
    if (strength < 60) return "Medium";
    if (strength < 80) return "Strong";
    return "Very strong";
  };
  
  return (
    <div class="space-y-1">
      <div class="flex items-center justify-between">
        <div class="h-1.5 w-full rounded-full bg-surface-secondary dark:bg-surface-dark-secondary">
          <div 
            class={`h-1.5 rounded-full ${getStrengthColor()}`} 
            style={{ width: `${strength}%` }}
          ></div>
        </div>
        <span class="ml-2 text-xs text-text-muted dark:text-text-dark-muted">
          {getStrengthText()}
        </span>
      </div>
    </div>
  );
});


function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  let score = 0;
  
  // Basic length check (up to 50 points)
  score += Math.min(password.length * 5, 50);
  
  // Check for character variety (up to 50 points)
  if (/[A-Z]/.test(password)) score += 10; // Uppercase
  if (/[a-z]/.test(password)) score += 10; // Lowercase
  if (/[0-9]/.test(password)) score += 10; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 20; // Special characters
  
  return score;
}
