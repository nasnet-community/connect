import { component$, $, useId } from "@builder.io/qwik";
import type { ToggleProps, ToggleSize } from "./Toggle.types";
import { VisuallyHidden } from "../common";

/**
 * Toggle component for binary on/off states.
 * 
 * This component represents a toggle switch that can be used for enabling/disabling
 * features or settings. It replaces and unifies the previous Switch and RadioButtonSwitch components.
 */
export const Toggle = component$<ToggleProps>(({
  checked,
  onChange$,
  label,
  labelPosition = "right",
  size = "md",
  disabled = false,
  required = false,
  id: propId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) => {
  // Generate a unique ID if one is not provided
  const autoId = useId();
  const toggleId = propId || `toggle-${autoId}`;

  // Define size-specific styling
  const sizeConfig: Record<ToggleSize, {
    container: string;
    track: string;
    thumb: string;
    thumbPosition: {
      on: string;
      off: string;
    };
    text: string;
  }> = {
    sm: {
      container: "h-4",
      track: "h-4 w-7",
      thumb: "h-3 w-3",
      thumbPosition: {
        on: "translate-x-3",
        off: "translate-x-0.5",
      },
      text: "text-xs",
    },
    md: {
      container: "h-6",
      track: "h-6 w-11",
      thumb: "h-5 w-5",
      thumbPosition: {
        on: "translate-x-5",
        off: "translate-x-0.5",
      },
      text: "text-sm",
    },
    lg: {
      container: "h-7",
      track: "h-7 w-14",
      thumb: "h-6 w-6",
      thumbPosition: {
        on: "translate-x-7",
        off: "translate-x-0.5",
      },
      text: "text-base",
    },
  };

  // Handle toggle change
  const handleToggle$ = $(() => {
    if (!disabled) {
      onChange$(!checked);
    }
  });
  
  // Container classes
  const containerClass = [
    "inline-flex items-center",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    props.class,
  ].filter(Boolean).join(" ");
  
  // Label component based on position and existence
  const labelElement = label && (
    <span
      class={`font-medium ${sizeConfig[size].text} text-text-primary dark:text-text-dark-primary`}
    >
      {label}
      {required && <span class="ml-1 text-error">*</span>}
    </span>
  );

  return (
    <label 
      for={toggleId}
      class={containerClass}
      aria-disabled={disabled}
    >
      {/* Left-positioned label if applicable */}
      {labelPosition === "left" && labelElement && (
        <span class="mr-2">{labelElement}</span>
      )}
      
      {/* Toggle control */}
      <div class={`relative ${sizeConfig[size].container}`}>
        {/* Hidden input for accessibility and form submission */}
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange$={handleToggle$}
          disabled={disabled}
          required={required}
          aria-checked={checked}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedBy}
          class="sr-only"
          {...props}
        />
        
        {/* For screen readers */}
        {!label && (
          <VisuallyHidden>{ariaLabel || "Toggle"}</VisuallyHidden>
        )}
        
        {/* Track (background) */}
        <div
          class={`
            ${sizeConfig[size].track} 
            rounded-full 
            transition-colors duration-200 ease-in-out 
            ${checked 
              ? "bg-primary-500 dark:bg-primary-600" 
              : "bg-surface-secondary dark:bg-surface-dark-secondary"
            }
          `}
        />
        
        {/* Thumb (moving part) */}
        <div
          class={`
            absolute top-1/2 transform -translate-y-1/2
            ${sizeConfig[size].thumb}
            bg-surface-primary dark:bg-surface-dark-primary
            rounded-full shadow-sm
            transition-transform duration-200 ease-in-out
            ${checked 
              ? sizeConfig[size].thumbPosition.on 
              : sizeConfig[size].thumbPosition.off
            }
          `}
        />
      </div>
      
      {/* Right-positioned label if applicable */}
      {labelPosition === "right" && labelElement && (
        <span class="ml-2">{labelElement}</span>
      )}
    </label>
  );
});
