import { component$, $, useId } from "@builder.io/qwik";
import type { RadioProps, RadioSize } from "./Radio.types";

/**
 * Radio component for selecting a single option from a set of choices.
 * 
 * This component provides a simple, accessible radio button that can be used 
 * independently or as part of a RadioGroup.
 */
export const Radio = component$<RadioProps>(({
  value,
  name,
  checked = false,
  onChange$,
  label,
  disabled = false,
  size = "md",
  required = false,
  id: propId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) => {
  // Generate a unique ID if one is not provided
  const autoId = useId();
  const radioId = propId || `radio-${autoId}`;
  
  // Define size-specific styling
  const sizeConfig: Record<RadioSize, {
    radio: string;
    dot: string;
    labelText: string;
  }> = {
    sm: {
      radio: "h-3.5 w-3.5",
      dot: "h-1.5 w-1.5",
      labelText: "text-xs",
    },
    md: {
      radio: "h-4 w-4",
      dot: "h-2 w-2",
      labelText: "text-sm",
    },
    lg: {
      radio: "h-5 w-5",
      dot: "h-2.5 w-2.5",
      labelText: "text-base",
    },
  };
  
  // Handle radio change
  const handleChange$ = $(() => {
    if (!disabled && onChange$) {
      onChange$(value);
    }
  });
  
  // Container classes
  const containerClass = [
    "inline-flex items-center",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    props.class,
  ].filter(Boolean).join(" ");

  return (
    <label 
      for={radioId}
      class={containerClass}
      aria-disabled={disabled}
    >
      <div class="relative mr-2">
        {/* Hidden native radio input for accessibility and form submission */}
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange$={handleChange$}
          disabled={disabled}
          required={required}
          class="sr-only"
          aria-checked={checked}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        
        {/* Custom radio visual */}
        <div 
          class={`
            ${sizeConfig[size].radio}
            rounded-full border-2
            flex items-center justify-center
            ${disabled 
              ? "opacity-60 border-border-disabled dark:border-border-dark-disabled"
              : checked
                ? "border-primary-600 dark:border-primary-500"
                : "border-border dark:border-border-dark"
            }
          `}
        >
          {/* Inner dot for checked state */}
          {checked && (
            <div 
              class={`
                ${sizeConfig[size].dot}
                rounded-full
                ${disabled
                  ? "bg-border-disabled dark:bg-border-dark-disabled"
                  : "bg-primary-600 dark:bg-primary-500"
                }
              `}
            ></div>
          )}
        </div>
      </div>
      
      {/* Label */}
      {label && (
        <span 
          class={`
            ${sizeConfig[size].labelText}
            ${disabled
              ? "text-text-disabled dark:text-text-dark-disabled"
              : "text-text-primary dark:text-text-dark-primary"
            }
          `}
        >
          {label}
          {required && <span class="ml-1 text-error">*</span>}
        </span>
      )}
    </label>
  );
});
