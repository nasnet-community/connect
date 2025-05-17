import { component$, $, useId } from "@builder.io/qwik";
import type { RadioGroupProps } from "./Radio.types";
import { Radio } from "./Radio";

/**
 * RadioGroup component for managing a group of related radio options.
 * 
 * This component simplifies the creation and management of a set of radio buttons,
 * handling the relationship between them and centralizing state management.
 */
export const RadioGroup = component$<RadioGroupProps>(({
  options,
  value,
  name,
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  direction = "vertical",
  size = "md",
  onChange$,
  id: propId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) => {
  // Generate a unique ID if one is not provided
  const autoId = useId();
  const groupId = propId || `radio-group-${autoId}`;
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;
  
  // Handle radio change
  const handleChange$ = $((optionValue: string) => {
    if (!disabled && onChange$) {
      onChange$(optionValue);
    }
  });
  
  // Set up container classes
  const containerClass = [
    props.class,
  ].filter(Boolean).join(" ");
  
  // Set up direction classes
  const optionsContainerClass = [
    "mt-1",
    direction === "horizontal" 
      ? "flex flex-wrap gap-4" 
      : "flex flex-col gap-2",
  ].join(" ");
  
  // Determine describedby references for accessibility
  const describedBy = [
    ariaDescribedBy,
    helperText ? helperId : "",
    error ? errorId : "",
  ].filter(Boolean).join(" ");

  return (
    <fieldset
      id={groupId}
      class={containerClass}
      disabled={disabled}
      aria-describedby={describedBy || undefined}
    >
      {/* Group label */}
      {label && (
        <legend class="mb-2 text-sm font-medium text-text-primary dark:text-text-dark-primary">
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </legend>
      )}
      
      {/* Helper text */}
      {helperText && !error && (
        <p 
          id={helperId}
          class="mb-2 text-xs text-text-secondary dark:text-text-dark-secondary"
        >
          {helperText}
        </p>
      )}
      
      {/* Radio options */}
      <div 
        class={optionsContainerClass}
        role="radiogroup"
        aria-label={ariaLabel || label}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            name={name}
            checked={value === option.value}
            label={option.label}
            disabled={disabled || option.disabled}
            required={required}
            size={size}
            onChange$={handleChange$}
            class={option.class}
          />
        ))}
      </div>
      
      {/* Error message */}
      {error && (
        <p 
          id={errorId}
          class="mt-1 text-xs text-error"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
});
