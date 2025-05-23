import { component$, type QRL, Slot } from "@builder.io/qwik";

/**
 * Validation states for the input field
 */
export type ValidationState = "default" | "valid" | "invalid";

export interface InputProps {
  /**
   * Input type (text, password, email, etc.)
   */
  type?: string;
  
  /**
   * Current value of the input
   */
  value?: string;
  
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input is readonly
   */
  readonly?: boolean;
  
  /**
   * CSS class to apply to the input
   */
  class?: string;
  
  /**
   * Validation state of the input
   */
  validation?: ValidationState;
  
  /**
   * Whether the input has a suffix element
   */
  hasSuffixSlot?: boolean;
  
  /**
   * Event handler for input changes
   */
  onChange$?: QRL<(event: Event, value: string) => void>;
}

export const Input = component$<InputProps>(({
  type = "text",
  value = "",
  placeholder = "",
  disabled = false,
  readonly = false,
  class: className = "",
  validation = "default",
  hasSuffixSlot = false,
  onChange$,
}) => {
  // Generate border styles based on validation state
  const getBorderStyles = (validation: ValidationState) => {
    switch (validation) {
      case "valid":
        return "border-success-500 dark:border-success-400 focus:border-success-500 focus:ring-success-500";
      case "invalid":
        return "border-error-500 dark:border-error-400 focus:border-error-500 focus:ring-error-500";
      default:
        return "border-border dark:border-border-dark focus:border-primary-500 focus:ring-primary-500";
    }
  };

  const borderStyles = getBorderStyles(validation);

  return (
    <div class="relative w-full">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        class={`w-full rounded-md ${borderStyles} shadow-sm 
          ${hasSuffixSlot ? 'pr-10' : ''} 
          ${readonly ? 'bg-surface-lighter dark:bg-surface-dark-lighter' : ''}
          ${disabled ? 'cursor-not-allowed bg-surface-lighter text-text-muted dark:bg-surface-dark-lighter dark:text-text-dark-muted' : ''}
          ${className}
          dark:bg-surface-dark dark:text-text-dark-default`}
        onChange$={(e) => {
          if (onChange$) {
            const target = e.target as HTMLInputElement;
            onChange$(e, target.value);
          }
        }}
      />
      {hasSuffixSlot && (
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <Slot name="suffix" />
        </div>
      )}
    </div>
  );
}); 