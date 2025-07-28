import { component$, Slot } from "@builder.io/qwik";

export type FormHelperTextSize = "sm" | "md" | "lg";

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

export const FormHelperText = component$<FormHelperTextProps>(
  ({
    children,
    size = "md",
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
    // Enhanced size classes with responsive typography
    const sizeClasses = {
      sm: "text-xs mobile:text-xs tablet:text-xs desktop:text-xs",
      md: "text-sm mobile:text-sm tablet:text-sm desktop:text-sm",
      lg: "text-base mobile:text-sm tablet:text-base desktop:text-base",
    }[size];

    // Enhanced margin classes with responsive spacing
    const marginClasses = hasTopMargin ? "mt-1 mobile:mt-1.5 tablet:mt-1" : "";

    // Enhanced state classes using semantic color system
    const getStateClasses = () => {
      if (disabled) {
        return "text-gray-400 dark:text-gray-500 opacity-60";
      } else if (error) {
        return "text-error-600 dark:text-error-400";
      } else if (success) {
        return "text-success-600 dark:text-success-400";
      } else if (warning) {
        return "text-warning-600 dark:text-warning-400";
      } else {
        // Using semantic text-secondary colors for helper text
        return "text-gray-500 dark:text-gray-400";
      }
    };

    const stateClasses = getStateClasses();

    // Screen reader only classes
    const srOnlyClasses = srOnly ? "sr-only" : "";

    return (
      <p
        id={id}
        class={[
          // Typography and spacing with responsive design
          sizeClasses,
          marginClasses,
          // Semantic colors with proper contrast and accessibility
          stateClasses,
          // Enhanced text selection for better UX
          !error && "selection:bg-surface-light-secondary dark:selection:bg-surface-dark-secondary",
          error && "selection:bg-error-100 dark:selection:bg-error-900",
          success && "selection:bg-success-100 dark:selection:bg-success-900",
          warning && "selection:bg-warning-100 dark:selection:bg-warning-900",
          // Screen reader support
          srOnlyClasses,
          // Enhanced layout for icons with better alignment
          icon ? "flex items-start gap-1.5 mobile:gap-2 tablet:gap-2" : "block",
          // Improved mobile readability with proper line heights
          "leading-5 mobile:leading-6 tablet:leading-5 desktop:leading-5",
          // Better contrast and readability across devices
          "font-normal mobile:font-normal tablet:font-normal desktop:font-normal",
          // Enhanced contrast in high contrast mode
          "high-contrast:font-medium",
          "high-contrast:text-gray-800 high-contrast:dark:text-gray-200",
          // RTL support with logical properties
          "rtl:text-right ltr:text-left",
          // Touch optimization with adequate target sizes
          "mobile:min-h-[18px] tablet:min-h-[16px] desktop:min-h-[14px]",
          // Improved focus accessibility
          "focus-within:outline-none",
          // Smooth transitions with motion preferences
          "motion-safe:transition-colors motion-safe:duration-200",
          "motion-reduce:transition-none",
          // Additional classes
          className || "",
        ].filter(Boolean).join(" ")}
        role="status"
      >
        {icon && <span class="flex-shrink-0">{icon}</span>}
        <span>
          {children}
          <Slot />
        </span>
      </p>
    );
  },
);
