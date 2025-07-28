import { component$, $, useId, useComputed$ } from "@builder.io/qwik";
import type {
  RadioProps,
  RadioSize,
} from "./Radio.types";

/**
 * Radio component for selecting a single option from a set of choices.
 *
 * This component provides a simple, accessible radio button that can be used
 * independently or as part of a RadioGroup.
 */
export const Radio = component$<RadioProps>(
  ({
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
    touchTarget = { minSize: 44, touchPadding: true },
    animation = { enabled: true, duration: 200, easing: "ease-out" },
    responsive = false,
    responsiveSizes,
    variant = "default",
    showFocusRing = true,
    highContrast = false,
    ...props
  }) => {
    // Generate a unique ID if one is not provided
    const autoId = useId();
    const radioId = propId || `radio-${autoId}`;

    // Compute responsive size based on breakpoints and configuration
    const effectiveSize = useComputed$(() => {
      if (!responsive) return size;

      // Default responsive behavior if no custom sizes provided
      if (!responsiveSizes) {
        return size; // Keep original size as base
      }

      // Use custom responsive sizes - will be handled via CSS classes
      return size;
    });

    // Enhanced size configuration with container queries and responsive support
    const sizeConfig: Record<
      RadioSize,
      {
        radio: string;
        dot: string;
        labelText: string;
        touchTarget: string;
        container: string;
      }
    > = {
      sm: {
        radio: "h-3.5 w-3.5 @xs/radio:h-4 @xs/radio:w-4 @md/radio:h-3.5 @md/radio:w-3.5",
        dot: "h-1.5 w-1.5 @xs/radio:h-2 @xs/radio:w-2 @md/radio:h-1.5 @md/radio:w-1.5",
        labelText: "text-xs @xs/radio:text-sm @md/radio:text-xs @lg/radio:text-sm",
        touchTarget:
          "min-h-[44px] min-w-[44px] @xs/radio:min-h-[48px] @xs/radio:min-w-[48px] @md/radio:min-h-[44px] @md/radio:min-w-[44px]",
        container: "py-1.5 @xs/radio:py-2 @md/radio:py-1.5 @lg/radio:py-2",
      },
      md: {
        radio: "h-4 w-4 @xs/radio:h-5 @xs/radio:w-5 @md/radio:h-4 @md/radio:w-4 @lg/radio:h-5 @lg/radio:w-5",
        dot: "h-2 w-2 @xs/radio:h-2.5 @xs/radio:w-2.5 @md/radio:h-2 @md/radio:w-2 @lg/radio:h-2.5 @lg/radio:w-2.5",
        labelText: "text-sm @xs/radio:text-base @md/radio:text-sm @lg/radio:text-base",
        touchTarget:
          "min-h-[44px] min-w-[44px] @xs/radio:min-h-[48px] @xs/radio:min-w-[48px] @lg/radio:min-h-[52px] @lg/radio:min-w-[52px]",
        container: "py-2 @xs/radio:py-2.5 @md/radio:py-2 @lg/radio:py-2.5",
      },
      lg: {
        radio: "h-5 w-5 @xs/radio:h-6 @xs/radio:w-6 @md/radio:h-5 @md/radio:w-5 @lg/radio:h-6 @lg/radio:w-6",
        dot: "h-2.5 w-2.5 @xs/radio:h-3 @xs/radio:w-3 @md/radio:h-2.5 @md/radio:w-2.5 @lg/radio:h-3 @lg/radio:w-3",
        labelText: "text-base @xs/radio:text-lg @md/radio:text-base @lg/radio:text-lg",
        touchTarget:
          "min-h-[44px] min-w-[44px] @xs/radio:min-h-[52px] @xs/radio:min-w-[52px] @lg/radio:min-h-[56px] @lg/radio:min-w-[56px]",
        container: "py-2.5 @xs/radio:py-3 @md/radio:py-2.5 @lg/radio:py-3",
      },
      xl: {
        radio: "h-6 w-6 @xs/radio:h-7 @xs/radio:w-7 @md/radio:h-6 @md/radio:w-6 @lg/radio:h-7 @lg/radio:w-7",
        dot: "h-3 w-3 @xs/radio:h-3.5 @xs/radio:w-3.5 @md/radio:h-3 @md/radio:w-3 @lg/radio:h-3.5 @lg/radio:w-3.5",
        labelText: "text-lg @xs/radio:text-xl @md/radio:text-lg @lg/radio:text-xl",
        touchTarget:
          "min-h-[48px] min-w-[48px] @xs/radio:min-h-[56px] @xs/radio:min-w-[56px] @lg/radio:min-h-[60px] @lg/radio:min-w-[60px]",
        container: "py-3 @xs/radio:py-3.5 @md/radio:py-3 @lg/radio:py-4",
      },
    };

    // Generate responsive classes if responsive is enabled
    const responsiveClasses = useComputed$(() => {
      if (!responsive || !responsiveSizes) return "";

      const classes = [];

      if (
        responsiveSizes.mobile &&
        responsiveSizes.mobile !== effectiveSize.value
      ) {
        classes.push(
          `max-mobile:[&_.radio-size]:${sizeConfig[responsiveSizes.mobile].radio}`,
        );
        classes.push(
          `max-mobile:[&_.dot-size]:${sizeConfig[responsiveSizes.mobile].dot}`,
        );
        classes.push(
          `max-mobile:[&_.label-size]:${sizeConfig[responsiveSizes.mobile].labelText}`,
        );
      }

      if (
        responsiveSizes.tablet &&
        responsiveSizes.tablet !== effectiveSize.value
      ) {
        classes.push(
          `tablet-only:[&_.radio-size]:${sizeConfig[responsiveSizes.tablet].radio}`,
        );
        classes.push(
          `tablet-only:[&_.dot-size]:${sizeConfig[responsiveSizes.tablet].dot}`,
        );
        classes.push(
          `tablet-only:[&_.label-size]:${sizeConfig[responsiveSizes.tablet].labelText}`,
        );
      }

      if (
        responsiveSizes.desktop &&
        responsiveSizes.desktop !== effectiveSize.value
      ) {
        classes.push(
          `desktop:[&_.radio-size]:${sizeConfig[responsiveSizes.desktop].radio}`,
        );
        classes.push(
          `desktop:[&_.dot-size]:${sizeConfig[responsiveSizes.desktop].dot}`,
        );
        classes.push(
          `desktop:[&_.label-size]:${sizeConfig[responsiveSizes.desktop].labelText}`,
        );
      }

      return classes.join(" ");
    });

    // Generate variant-specific styling with enhanced semantic colors
    const variantClasses = useComputed$(() => {
      const baseClasses =
        "flex items-center justify-center rounded-full border-2";

      switch (variant) {
        case "outlined":
          return `${baseClasses} bg-transparent`;
        case "filled":
          return `${baseClasses} ${colorClasses.value.background}`;
        case "minimal":
          return `${baseClasses} border-0 bg-transparent`;
        default:
          return `${baseClasses} ${colorClasses.value.background}`;
      }
    });

    // Generate theme-aware color classes with enhanced semantic tokens
    const colorClasses = useComputed$(() => {
      if (disabled) {
        return {
          border: "border-gray-300 dark:border-gray-600",
          dot: "bg-gray-400 dark:bg-gray-500",
          label: "text-gray-400 dark:text-gray-500",
          background: "bg-surface-light-secondary dark:bg-surface-dark-secondary",
        };
      }

      if (highContrast) {
        return checked
          ? {
              border: "border-gray-900 dark:border-white high-contrast:border-current",
              dot: "bg-gray-900 dark:bg-white high-contrast:bg-current",
              label: "text-gray-900 dark:text-white high-contrast:text-current",
              background: "bg-surface-light-elevated dark:bg-surface-dark-elevated high-contrast:bg-current",
            }
          : {
              border: "border-gray-600 dark:border-gray-300 high-contrast:border-current",
              dot: "bg-gray-600 dark:bg-gray-300 high-contrast:bg-current",
              label: "text-gray-900 dark:text-white high-contrast:text-current",
              background: "bg-surface-light-default dark:bg-surface-dark-default high-contrast:bg-transparent",
            };
      }

      return checked
        ? {
            border:
              "border-primary-600 dark:border-primary-400 hover:border-primary-700 dark:hover:border-primary-300 focus:border-primary-700 dark:focus:border-primary-300",
            dot: "bg-primary-600 dark:bg-primary-400",
            label: "text-gray-900 dark:text-gray-100",
            background: "bg-primary-50 dark:bg-primary-950",
          }
        : {
            border:
              "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-primary-500 dark:focus:border-primary-400",
            dot: "bg-gray-300 dark:bg-gray-600",
            label: "text-gray-700 dark:text-gray-300",
            background: "bg-surface-light-default dark:bg-surface-dark-default hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
          };
    });

    // Generate animation classes with enhanced tailwind config animations
    const animationClasses = useComputed$(() => {
      if (!animation.enabled) return "";

      const duration = `duration-${animation.duration || 200}`;
      const easing =
        animation.easing === "linear"
          ? "linear"
          : animation.easing === "ease-in"
            ? "ease-in"
            : animation.easing === "ease-in-out"
              ? "ease-in-out"
              : "ease-out";

      return `transition-all ${duration} ${easing} motion-reduce:transition-none motion-safe:animate-scale-up hover:motion-safe:animate-lift touch:active:motion-safe:animate-press`;
    });

    // Generate focus ring classes with enhanced semantic colors
    const focusClasses = useComputed$(() => {
      if (!showFocusRing) return "";

      return `focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 
              dark:focus-within:ring-primary-400 dark:focus-within:ring-offset-surface-dark-default
              focus-within:ring-offset-surface-light-default 
              high-contrast:focus-within:ring-gray-900 dark:high-contrast:focus-within:ring-white
              motion-safe:focus-within:animate-scale-up`;
    });

    // Generate touch target classes
    const touchTargetClasses = useComputed$(() => {
      if (!touchTarget.touchPadding) return "";

      const minSize = touchTarget.minSize || 44;
      const responsiveConfig = touchTarget.responsive;

      const classes = [`min-h-[${minSize}px]`, `min-w-[${minSize}px]`];

      if (responsiveConfig) {
        if (responsiveConfig.mobile) {
          classes.push(
            `mobile:min-h-[${responsiveConfig.mobile}px]`,
            `mobile:min-w-[${responsiveConfig.mobile}px]`,
          );
        }
        if (responsiveConfig.tablet) {
          classes.push(
            `tablet:min-h-[${responsiveConfig.tablet}px]`,
            `tablet:min-w-[${responsiveConfig.tablet}px]`,
          );
        }
        if (responsiveConfig.desktop) {
          classes.push(
            `desktop:min-h-[${responsiveConfig.desktop}px]`,
            `desktop:min-w-[${responsiveConfig.desktop}px]`,
          );
        }
      }

      return classes.join(" ");
    });

    // Handle radio change
    const handleChange$ = $(() => {
      if (!disabled && onChange$) {
        onChange$(value);
      }
    });

    // Container classes with enhanced responsiveness, accessibility, and semantic colors
    const containerClass = [
      "inline-flex items-center",
      sizeConfig[effectiveSize.value].container,
      touchTargetClasses.value,
      disabled
        ? "cursor-not-allowed opacity-60"
        : "cursor-pointer hover:opacity-90 can-hover:hover:scale-[1.02]",
      animationClasses.value,
      focusClasses.value,
      responsiveClasses.value,
      // Enhanced touch-friendly improvements with config animations
      "touch:active:scale-95 touch:active:motion-safe:animate-press",
      "can-hover:motion-safe:hover:animate-lift",
      // RTL support
      "rtl:flex-row-reverse",
      // Enhanced accessibility for high contrast
      "high-contrast:outline high-contrast:outline-1 high-contrast:outline-current",
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div class="@container/radio">
        <label for={radioId} class={containerClass} aria-disabled={disabled}>
          <div class="relative me-2 rtl:me-0 rtl:ms-2">
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
              class={[
                "peer sr-only",
                // Enhanced accessibility for screen readers
                "focus:ring-0 focus:ring-offset-0",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-checked={checked}
              aria-label={ariaLabel || (label ? undefined : "Radio button")}
              aria-describedby={ariaDescribedBy}
              // Enhanced keyboard navigation
              tabIndex={disabled ? -1 : 0}
              {...props}
            />

            {/* Custom radio visual with enhanced theming and animations */}
            <div
              class={[
                "radio-size",
                sizeConfig[effectiveSize.value].radio,
                variantClasses.value,
                colorClasses.value.border,
                animationClasses.value,
                // Enhanced focus states
                showFocusRing &&
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2",
                showFocusRing &&
                  "dark:peer-focus-visible:ring-primary-400 dark:peer-focus-visible:ring-offset-gray-900",
                // Touch feedback
                !disabled && "active:scale-95 touch:active:scale-90",
                // High contrast support
                highContrast && "high-contrast:border-2",
                // Container queries support
                "@container/radio",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Inner dot for checked state with smooth animations */}
              <div
                class={[
                  "dot-size",
                  sizeConfig[effectiveSize.value].dot,
                  "rounded-full",
                  animationClasses.value,
                  colorClasses.value.dot,
                  // Smooth scale animation for checked state
                  checked ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  // Enhanced animation timing
                  animation.enabled &&
                    "transition-opacity transition-transform",
                  animation.enabled && `duration-${animation.duration || 200}`,
                  // High contrast support
                  highContrast && "high-contrast:bg-current",
                ]
                  .filter(Boolean)
                  .join(" ")}
              ></div>
            </div>
          </div>

          {/* Enhanced label with better typography and spacing */}
          {label && (
            <span
              class={[
                "label-size",
                sizeConfig[effectiveSize.value].labelText,
                colorClasses.value.label,
                animationClasses.value,
                // Better spacing and alignment
                "ms-2 leading-relaxed",
                // Touch-friendly text selection
                "select-none",
                // RTL support
                "rtl:me-2 rtl:ms-0",
                // High contrast support
                highContrast && "high-contrast:text-current",
                // Responsive typography improvements
                "mobile:leading-normal tablet:leading-relaxed",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
              {required && (
                <span
                  class={[
                    "ms-1 text-error-600 dark:text-error-400",
                    "rtl:me-1 rtl:ms-0",
                    highContrast && "high-contrast:text-current",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label="required"
                >
                  *
                </span>
              )}
            </span>
          )}
        </label>
      </div>
    );
  },
);
