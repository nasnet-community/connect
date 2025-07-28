import { component$, Slot } from "@builder.io/qwik";

export type FormLabelSize = "sm" | "md" | "lg";
export type FormLabelFluidSize = "fluid" | "auto";

export interface FormLabelProps {
  children?: string;

  for?: string;

  required?: boolean;

  size?: FormLabelSize;

  fluidSize?: FormLabelFluidSize;

  disabled?: boolean;

  error?: boolean;

  success?: boolean;

  warning?: boolean;

  id?: string;

  srOnly?: boolean;

  touchOptimized?: boolean;

  class?: string;
}

export const FormLabel = component$<FormLabelProps>(
  ({
    children,
    for: htmlFor,
    required = false,
    size = "md",
    fluidSize,
    disabled = false,
    error = false,
    success = false,
    warning = false,
    id,
    srOnly = false,
    touchOptimized = false,
    class: className,
  }) => {
    // Base classes with enhanced responsive behavior
    const baseClasses = "font-medium transition-colors duration-200 motion-safe:transition-all motion-reduce:transition-none";

    // Enhanced size classes with responsive support
    const getSizeClasses = () => {
      if (fluidSize === "fluid") {
        return {
          sm: "text-fluid-xs mobile:text-xs tablet:text-sm",
          md: "text-fluid-sm mobile:text-sm tablet:text-base",
          lg: "text-fluid-base mobile:text-base tablet:text-lg",
        }[size];
      } else if (fluidSize === "auto") {
        return {
          sm: "text-xs mobile:text-xs tablet:text-sm desktop:text-sm",
          md: "text-sm mobile:text-sm tablet:text-base desktop:text-base", 
          lg: "text-base mobile:text-base tablet:text-lg desktop:text-xl",
        }[size];
      } else {
        return {
          sm: "text-xs",
          md: "text-sm",
          lg: "text-base",
        }[size];
      }
    };

    // Enhanced state classes using semantic color system
    const getStateClasses = () => {
      if (disabled) {
        return "text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60";
      } else if (error) {
        return "text-error-600 dark:text-error-400";
      } else if (success) {
        return "text-success-600 dark:text-success-400";
      } else if (warning) {
        return "text-warning-600 dark:text-warning-400";
      } else {
        // Using semantic text colors for labels based on tailwind config
        return "text-gray-700 dark:text-gray-200";
      }
    };

    // Enhanced touch optimization classes
    const touchClasses = touchOptimized 
      ? "touch:min-h-11 touch:flex touch:items-center mobile:min-h-[44px] tablet:min-h-[40px]" 
      : "mobile:min-h-[20px] tablet:min-h-[18px]";

    // Screen reader only classes with better positioning
    const srOnlyClasses = srOnly ? "sr-only" : "block";

    // Enhanced responsive spacing and layout
    const layoutClasses = "leading-6 mobile:leading-5 tablet:leading-6 desktop:leading-6 select-none";

    // Enhanced focus states for accessibility with semantic colors
    const focusClasses = !disabled 
      ? "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-primary-400 dark:focus-within:ring-offset-surface-dark-DEFAULT" 
      : "";

    // RTL support with logical properties
    const rtlClasses = "rtl:text-end ltr:text-start";

    return (
      <label
        id={id}
        for={htmlFor}
        class={[
          // Base styling with enhanced responsive behavior
          baseClasses,
          // Typography with responsive sizes
          getSizeClasses(),
          // Semantic state colors with accessibility enhancements
          getStateClasses(),
          // Enhanced text selection for better UX
          !error && !disabled && "selection:bg-surface-light-secondary dark:selection:bg-surface-dark-secondary",
          error && "selection:bg-error-100 dark:selection:bg-error-900",
          success && "selection:bg-success-100 dark:selection:bg-success-900",
          warning && "selection:bg-warning-100 dark:selection:bg-warning-900",
          // Accessibility
          srOnlyClasses,
          // Touch optimization with improved mobile targets
          touchClasses,
          // Layout and spacing with responsive improvements
          layoutClasses,
          // Enhanced focus states with semantic colors
          focusClasses,
          // RTL support with logical properties
          rtlClasses,
          // Enhanced mobile readability with consistent typography
          "font-medium mobile:font-medium tablet:font-semibold desktop:font-medium",
          // Enhanced contrast ratios for accessibility
          "high-contrast:font-semibold high-contrast:text-gray-900",
          "high-contrast:dark:text-gray-100",
          // Improved accessibility with proper cursor and hover states
          "cursor-pointer select-none",
          !disabled && "hover:text-gray-900 dark:hover:text-gray-100",
          // Enhanced interactive states for better UX
          !disabled && "active:text-gray-900 dark:active:text-gray-100",
          // Motion preferences with accessibility considerations
          "motion-safe:transition-colors motion-safe:duration-200",
          "motion-reduce:transition-none",
          // Enhanced accessibility for assistive technologies
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          "dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2",
          "dark:focus-visible:ring-offset-surface-dark-DEFAULT",
          // Additional classes
          className || "",
        ].filter(Boolean).join(" ")}
        aria-disabled={disabled ? "true" : undefined}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        role="label"
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
        <Slot />
        {required && !srOnly && (
          <span 
            class={[
              "ms-1 rtl:me-1 rtl:ms-0",
              // Semantic error colors for required indicator
              "text-error-600 dark:text-error-400",
              // Enhanced typography
              "font-semibold mobile:font-bold tablet:font-semibold",
              // Better visibility
              "select-none",
              // Touch optimization
              "mobile:text-base tablet:text-sm desktop:text-sm",
            ].filter(Boolean).join(" ")}
            aria-hidden="true"
            aria-label="required"
          >
            *
          </span>
        )}
      </label>
    );
  },
);
