import { component$, $, useId, useComputed$ } from "@builder.io/qwik";
import type { RadioGroupProps } from "./Radio.types";
import { Radio } from "./Radio";

/**
 * Enhanced RadioGroup component for managing a group of related radio options.
 *
 * This component provides comprehensive responsive design, enhanced accessibility,
 * touch optimization, and consistent theming with the enhanced Radio component.
 * 
 * Features:
 * - Responsive layout system with adaptive direction changes
 * - Enhanced spacing system with theme-aware values
 * - Touch-friendly design with optimized targets
 * - Grid layouts for larger screens
 * - Staggered animations for smooth interactions
 * - Full accessibility compliance
 * - Theme consistency with Radio component
 */
export const RadioGroup = component$<RadioGroupProps>(
  ({
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
    responsive = false,
    responsiveSizes,
    touchTarget = { minSize: 44, touchPadding: true },
    animation = { enabled: true, duration: 200, easing: "ease-out" },
    variant = "default",
    showFocusRing = true,
    highContrast = false,
    gridLayout,
    spacing = { gap: "md" },
    staggeredAnimation = false,
    ...props
  }) => {
    // Generate a unique ID if one is not provided
    const autoId = useId();
    const groupId = propId || `radio-group-${autoId}`;
    const helperId = `${groupId}-helper`;
    const errorId = `${groupId}-error`;

    // Enhanced spacing configuration with theme values
    const spacingConfig = {
      xs: "gap-1 mobile:gap-1.5",
      sm: "gap-2 mobile:gap-2.5",
      md: "gap-3 mobile:gap-4",
      lg: "gap-4 mobile:gap-5",
      xl: "gap-6 mobile:gap-8",
    };

    // Grid column configuration
    const gridConfig = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    // Generate responsive direction classes
    const directionClasses = useComputed$(() => {
      const baseDirection = direction || "vertical";
      
      switch (baseDirection) {
        case "responsive-vertical":
          return "flex flex-col mobile:flex-col tablet:flex-col desktop:flex-col";
        case "responsive-horizontal":
          return "flex flex-col mobile:flex-row tablet:flex-row desktop:flex-row";
        case "horizontal":
          return "flex flex-wrap";
        case "vertical":
        default:
          return "flex flex-col";
      }
    });

    // Generate spacing classes with responsive support
    const spacingClasses = useComputed$(() => {
      const baseGap = spacing.gap || "md";
      const classes = [spacingConfig[baseGap]];

      // Add responsive spacing if configured
      if (spacing.responsive) {
        if (spacing.responsive.mobile && spacing.responsive.mobile !== baseGap) {
          classes.push(`max-mobile:${spacingConfig[spacing.responsive.mobile]}`);
        }
        if (spacing.responsive.tablet && spacing.responsive.tablet !== baseGap) {
          classes.push(`tablet-only:${spacingConfig[spacing.responsive.tablet]}`);
        }
        if (spacing.responsive.desktop && spacing.responsive.desktop !== baseGap) {
          classes.push(`desktop:${spacingConfig[spacing.responsive.desktop]}`);
        }
      }

      return classes.join(" ");
    });

    // Generate grid layout classes
    const gridClasses = useComputed$(() => {
      if (!gridLayout) return "";

      const classes = [];

      // Base grid columns
      if (gridLayout.columns && gridLayout.columns <= 6) {
        classes.push("grid");
        classes.push(gridConfig[gridLayout.columns as keyof typeof gridConfig]);
      }

      // Responsive grid columns
      if (gridLayout.responsive) {
        if (gridLayout.responsive.mobile && gridLayout.responsive.mobile <= 6) {
          classes.push(`mobile:${gridConfig[gridLayout.responsive.mobile as keyof typeof gridConfig]}`);
        }
        if (gridLayout.responsive.tablet && gridLayout.responsive.tablet <= 6) {
          classes.push(`tablet:${gridConfig[gridLayout.responsive.tablet as keyof typeof gridConfig]}`);
        }
        if (gridLayout.responsive.desktop && gridLayout.responsive.desktop <= 6) {
          classes.push(`desktop:${gridConfig[gridLayout.responsive.desktop as keyof typeof gridConfig]}`);
        }
      }

      // Auto-fit support
      if (gridLayout.autoFit) {
        classes.push("grid-cols-[repeat(auto-fit,minmax(200px,1fr))]");
      }

      return classes.join(" ");
    });

    // Extract props.class value for serialization
    const customClass = props.class;
    
    // Generate container classes with enhanced responsiveness
    const containerClasses = useComputed$(() => {
      return [
        "@container/radio-group",
        // Enhanced fieldset styling
        "border-0 p-0 m-0",
        // Touch-friendly spacing
        "touch:py-2",
        // High contrast support
        highContrast && "high-contrast:border high-contrast:border-current high-contrast:p-2",
        // Animation support
        animation.enabled && "transition-all duration-200 ease-out",
        // Custom classes
        customClass,
      ]
        .filter(Boolean)
        .join(" ");
    });

    // Generate options container classes with enhanced container queries
    const optionsContainerClass = useComputed$(() => {
      return [
        "mt-2 @xs/radio-group:mt-3 @md/radio-group:mt-2 @lg/radio-group:mt-3",
        // Direction and layout classes with container query support
        gridLayout ? gridClasses.value : directionClasses.value,
        // Enhanced spacing classes with container-based adjustments
        spacingClasses.value,
        // Container-based density adjustments
        "@xs/radio-group:space-y-1 @md/radio-group:space-y-2 @lg/radio-group:space-y-3",
        // Touch optimization with container awareness
        "touch-action-manipulation",
        // Animation container with container-based stagger delays
        staggeredAnimation && "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300",
        staggeredAnimation && "@lg/radio-group:motion-safe:duration-200",
        // Enhanced container queries support
        "@container/radio-options",
        // Container-based layout optimizations
        "@xs/radio-group:text-sm @md/radio-group:text-base @lg/radio-group:text-lg",
      ]
        .filter(Boolean)
        .join(" ");
    });

    // Generate legend classes with enhanced responsive typography and semantic colors
    const legendClasses = useComputed$(() => {
      return [
        // Base typography
        "text-sm mobile:text-base tablet:text-sm desktop:text-base font-medium leading-relaxed",
        // Enhanced theme colors using semantic tokens
        "text-gray-900 dark:text-gray-100",
        // Spacing
        "mb-2 mobile:mb-3",
        // Touch targets
        "min-h-[44px] mobile:min-h-auto flex items-center",
        // High contrast support with enhanced colors
        highContrast && "high-contrast:text-current high-contrast:font-bold high-contrast:outline high-contrast:outline-1",
        // Enhanced animation with config animations
        animation.enabled && "transition-colors duration-200 ease-out motion-safe:animate-fade-in",
      ]
        .filter(Boolean)
        .join(" ");
    });

    // Generate helper text classes with enhanced responsive typography and semantic colors
    const helperTextClasses = useComputed$(() => {
      return [
        // Responsive typography
        "text-xs mobile:text-sm tablet:text-xs desktop:text-sm leading-relaxed",
        // Enhanced theme colors using semantic tokens
        "text-gray-600 dark:text-gray-400",
        // Spacing
        "mb-2 mobile:mb-3",
        // High contrast support with enhanced accessibility
        highContrast && "high-contrast:text-current high-contrast:font-medium",
        // Enhanced animation with config animations
        animation.enabled && "transition-colors duration-200 ease-out motion-safe:animate-fade-in",
      ]
        .filter(Boolean)
        .join(" ");
    });

    // Generate error message classes with enhanced responsive typography and semantic colors
    const errorClasses = useComputed$(() => {
      return [
        // Responsive typography
        "text-xs mobile:text-sm tablet:text-xs desktop:text-sm leading-relaxed",
        // Enhanced error colors using semantic tokens
        "text-error-600 dark:text-error-400",
        // Spacing
        "mt-2 mobile:mt-3",
        // Touch-friendly height
        "min-h-[20px] mobile:min-h-[24px]",
        // Enhanced high contrast support with accessibility
        highContrast && "high-contrast:text-current high-contrast:font-bold high-contrast:bg-error-surface high-contrast:p-1",
        // Enhanced animation with config animations
        animation.enabled && "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200",
      ]
        .filter(Boolean)
        .join(" ");
    });

    // Handle radio change with enhanced feedback
    const handleChange$ = $((optionValue: string) => {
      if (!disabled && onChange$) {
        onChange$(optionValue);
      }
    });

    // Determine describedby references for enhanced accessibility
    const describedBy = [
      ariaDescribedBy,
      helperText ? helperId : "",
      error ? errorId : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div class="@container/radio-group">
        <fieldset
          id={groupId}
          class={containerClasses.value}
          disabled={disabled}
          aria-describedby={describedBy || undefined}
        >
          {/* Enhanced group label with responsive design */}
          {label && (
            <legend class={legendClasses.value}>
              <span class="flex items-center">
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
            </legend>
          )}

          {/* Enhanced helper text with responsive typography */}
          {helperText && !error && (
            <p
              id={helperId}
              class={helperTextClasses.value}
            >
              {helperText}
            </p>
          )}

          {/* Enhanced radio options container with responsive layouts */}
          <div
            class={optionsContainerClass.value}
            role="radiogroup"
            aria-label={ariaLabel || label}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                class={[
                  // Staggered animation support
                  staggeredAnimation && animation.enabled && 
                    `motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300`,
                  staggeredAnimation && animation.enabled && 
                    `motion-safe:animation-delay-[${index * 100}ms]`,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Radio
                  value={option.value}
                  name={name}
                  checked={value === option.value}
                  label={option.label}
                  disabled={disabled || option.disabled}
                  required={required}
                  size={size}
                  onChange$={handleChange$}
                  class={option.class}
                  // Pass through enhanced Radio component props
                  responsive={responsive}
                  responsiveSizes={responsiveSizes}
                  touchTarget={touchTarget}
                  animation={animation}
                  variant={variant}
                  showFocusRing={showFocusRing}
                  highContrast={highContrast}
                />
              </div>
            ))}
          </div>

          {/* Enhanced error message with responsive typography */}
          {error && (
            <p 
              id={errorId} 
              class={errorClasses.value}
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}
        </fieldset>
      </div>
    );
  },
);
