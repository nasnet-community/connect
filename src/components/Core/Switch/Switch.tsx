import { $, component$, type QRL, useId } from "@builder.io/qwik";

export type SwitchSize = "sm" | "md" | "lg";
export type SwitchVariant = "default" | "success" | "warning" | "error";

export interface SwitchProps {
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  label?: string;
  labelPosition?: "left" | "right";
  size?: SwitchSize;
  variant?: SwitchVariant;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  class?: string;
  trackClass?: string;
  thumbClass?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/**
 * Switch component for toggling binary states with enhanced accessibility and responsiveness.
 * 
 * Features:
 * - Responsive design optimized for mobile, tablet, and desktop
 * - Full dark mode support using Tailwind theme colors
 * - Semantic color variants (default, success, warning, error)
 * - Motion-safe/reduce-motion support from Tailwind config
 * - Customizable track and thumb styling
 * - WCAG AA compliant with proper ARIA attributes
 * - Touch-friendly with minimum 44px touch targets
 */
export const Switch = component$<SwitchProps>(
  ({
    checked,
    onChange$,
    label,
    labelPosition = "right",
    size = "md",
    variant = "default",
    disabled = false,
    required = false,
    trackClass,
    thumbClass,
    id: propId,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...props
  }) => {
    const autoId = useId();
    const switchId = propId || `switch-${autoId}`;

    // Size configurations with mobile-first approach
    const sizeClasses = {
      sm: {
        container: "min-h-[44px] sm:min-h-0", // Touch-friendly on mobile
        track: "h-5 w-9 sm:h-4 sm:w-7",
        thumb: "h-4 w-4 sm:h-3 sm:w-3",
        translate: "translate-x-4 sm:translate-x-3",
        text: "text-sm sm:text-xs",
        spacing: "gap-2 sm:gap-2",
      },
      md: {
        container: "min-h-[44px]",
        track: "h-6 w-11",
        thumb: "h-5 w-5",
        translate: "translate-x-5",
        text: "text-base sm:text-sm",
        spacing: "gap-3",
      },
      lg: {
        container: "min-h-[48px]",
        track: "h-8 w-14 sm:h-7 sm:w-14",
        thumb: "h-7 w-7 sm:h-6 sm:w-6",
        translate: "translate-x-6 sm:translate-x-7",
        text: "text-lg sm:text-base",
        spacing: "gap-4 sm:gap-3",
      },
    };

    // Variant color configurations using Tailwind config colors
    const variantColors = {
      default: {
        trackChecked: "bg-primary-500 dark:bg-primary-600",
        trackUnchecked: "bg-surface-quaternary dark:bg-surface-dark-tertiary",
        focusRing: "ring-primary-400 dark:ring-primary-500",
        thumb: "bg-surface-elevated dark:bg-surface-dark-elevated",
      },
      success: {
        trackChecked: "bg-success-500 dark:bg-success-600",
        trackUnchecked: "bg-surface-quaternary dark:bg-surface-dark-tertiary",
        focusRing: "ring-success-400 dark:ring-success-500",
        thumb: "bg-surface-elevated dark:bg-surface-dark-elevated",
      },
      warning: {
        trackChecked: "bg-warning-500 dark:bg-warning-600",
        trackUnchecked: "bg-surface-quaternary dark:bg-surface-dark-tertiary",
        focusRing: "ring-warning-400 dark:ring-warning-500",
        thumb: "bg-surface-elevated dark:bg-surface-dark-elevated",
      },
      error: {
        trackChecked: "bg-error-500 dark:bg-error-600",
        trackUnchecked: "bg-surface-quaternary dark:bg-surface-dark-tertiary",
        focusRing: "ring-error-400 dark:ring-error-500",
        thumb: "bg-surface-elevated dark:bg-surface-dark-elevated",
      },
    };

    const handleClick$ = $(() => {
      if (!disabled) {
        onChange$(!checked);
      }
    });

    // Container classes with proper focus management
    const containerClass = [
      "inline-flex items-center",
      sizeClasses[size].container,
      sizeClasses[size].spacing,
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      "group", // For hover states
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    // Track classes using variant-aware theme colors
    const currentVariant = variantColors[variant];
    const trackClasses = [
      sizeClasses[size].track,
      "relative inline-flex rounded-full",
      "transition-colors duration-200 ease-in-out motion-safe:transition-all motion-reduce:transition-none",
      "focus-within:ring-2 focus-within:ring-offset-2",
      currentVariant.focusRing,
      "dark:focus-within:ring-offset-surface-dark",
      checked ? currentVariant.trackChecked : currentVariant.trackUnchecked,
      !disabled && "group-hover:shadow-md motion-safe:group-hover:scale-[1.02] motion-reduce:group-hover:scale-100",
      trackClass,
    ]
      .filter(Boolean)
      .join(" ");

    // Thumb classes with proper shadows and transitions
    const thumbClasses = [
      sizeClasses[size].thumb,
      "absolute top-0.5 left-0.5",
      "inline-block rounded-full",
      currentVariant.thumb,
      "shadow-sm dark:shadow-dark-sm",
      "transition-transform duration-200 ease-in-out motion-safe:transition-all motion-reduce:transition-none",
      "ring-0", // Reset ring
      checked ? sizeClasses[size].translate : "translate-x-0",
      "motion-safe:hover:shadow-md motion-reduce:hover:shadow-sm",
      thumbClass,
    ]
      .filter(Boolean)
      .join(" ");

    // Label classes with proper text colors
    const labelClasses = [
      sizeClasses[size].text,
      "font-medium select-none",
      "text-text-primary dark:text-text-dark-primary",
      disabled && "opacity-60",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label 
        for={switchId} 
        class={containerClass}
        aria-disabled={disabled}
      >
        {label && labelPosition === "left" && (
          <span class={labelClasses}>
            {label}
            {required && <span class="ml-1 text-error">*</span>}
          </span>
        )}

        <span class="sr-only">
          {label || ariaLabel || "Toggle switch"}
        </span>
        
        <input
          type="checkbox"
          role="switch"
          id={switchId}
          checked={checked}
          onChange$={handleClick$}
          class="sr-only peer"
          disabled={disabled}
          required={required}
          aria-checked={checked}
          aria-label={ariaLabel || label}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        
        <span class={trackClasses}>
          <span class={thumbClasses} />
        </span>

        {label && labelPosition === "right" && (
          <span class={labelClasses}>
            {label}
            {required && <span class="ml-1 text-error">*</span>}
          </span>
        )}
      </label>
    );
  },
);
