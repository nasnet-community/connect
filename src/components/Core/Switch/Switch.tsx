import { $, component$, type QRL } from "@builder.io/qwik";

// Re-export types from the new Toggle component
import { type ToggleSize as SwitchSize } from "../Toggle/Toggle.types";
export { SwitchSize };

/**
 * @deprecated Use Toggle component instead
 */
export interface SwitchProps {
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  label?: string;
  labelPosition?: "left" | "right";
  size?: SwitchSize;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  class?: string;
  id?: string;
}

export const Switch = component$<SwitchProps>(
  ({
    checked,
    onChange$,
    label,
    labelPosition = "right",
    size = "md",
    disabled = false,
    required = false,
    id,
    ...props
  }) => {
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

    const sizeClasses = {
      sm: {
        switch: "h-4 w-7",
        dot: "h-3 w-3 after:h-2 after:w-2",
        translate: "translate-x-3",
        text: "text-xs",
      },
      md: {
        switch: "h-6 w-11",
        dot: "h-5 w-5 after:h-4 after:w-4",
        translate: "translate-x-5",
        text: "text-sm",
      },
      lg: {
        switch: "h-7 w-14",
        dot: "h-6 w-6 after:h-5 after:w-5",
        translate: "translate-x-7",
        text: "text-base",
      },
    };

    const switchClass = [
      "relative inline-flex flex-shrink-0 cursor-pointer items-center",
      disabled ? "opacity-50 cursor-not-allowed" : "",
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick$ = $(() => {
      if (!disabled) {
        onChange$(!checked);
      }
    });

    return (
      <label for={switchId} class={switchClass}>
        {label && labelPosition === "left" && (
          <span
            class={`mr-3 ${sizeClasses[size].text} font-medium text-gray-900 dark:text-gray-300`}
          >
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
          </span>
        )}
        
        <span class="sr-only">Switch</span>
        <input
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange$={handleClick$}
          class="sr-only"
          disabled={disabled}
          required={required}
          {...props}
        />
        <span
          class={`${sizeClasses[size].switch} rounded-full bg-gray-200 dark:bg-gray-700 
          ${checked ? "bg-primary-600 dark:bg-primary-600" : ""}
          transition-colors duration-200 ease-in-out`}
        >
          <span
            class={`${sizeClasses[size].dot} pointer-events-none inline-block rounded-full bg-white 
            shadow-lg ring-0 transition-transform duration-200 ease-in-out 
            ${checked ? sizeClasses[size].translate : "translate-x-0"}`}
          ></span>
        </span>
        
        {label && labelPosition === "right" && (
          <span
            class={`ml-3 ${sizeClasses[size].text} font-medium text-gray-900 dark:text-gray-300`}
          >
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
          </span>
        )}
      </label>
    );
  }
); 


// Import the compatibility wrapper
// import { SwitchCompatWrapper } from "./SwitchCompatWrapper";

/**
 * Switch component for toggling binary states.
 * 
 * @deprecated This component is being replaced by the Toggle component.
 * It currently uses the new Toggle internally and provides the same API for backward compatibility.
 */
// export const Switch = SwitchCompatWrapper;