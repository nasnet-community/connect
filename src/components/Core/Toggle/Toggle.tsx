import { component$, $, useId, useSignal, useComputed$, useVisibleTask$ } from "@builder.io/qwik";
import type { ToggleProps, ToggleSize, ToggleColor, ResponsiveSize } from "./Toggle.types";
import { VisuallyHidden } from "../common";
import { Spinner } from "../DataDisplay/Progress/Spinner";

/**
 * Toggle component for binary on/off states.
 *
 * This component represents a toggle switch that can be used for enabling/disabling
 * features or settings. It replaces and unifies the previous Switch and RadioButtonSwitch components.
 */
export const Toggle = component$<ToggleProps>(
  ({
    checked = false,
    onChange$,
    label,
    labelPosition = "right",
    size = "md",
    color = "primary",
    disabled = false,
    loading = false,
    checkedIcon,
    uncheckedIcon,
    showIconsWithIndicator = false,
    required = false,
    id: propId,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    focusVisibleOnly = true,
    ...props
  }) => {
    // Extract class from props for use in computed values
    const className = props.class;
    
    // Generate a unique ID if one is not provided
    const autoId = useId();
    const toggleId = propId || `toggle-${autoId}`;
    const isFocused = useSignal(false);
    const currentBreakpoint = useSignal('base');

    // Determine if size is responsive or static
    const isResponsiveSize = typeof size === "object";
    
    // Set up breakpoint detection for responsive sizing
    useVisibleTask$(() => {
      if (!isResponsiveSize) return;
      
      const updateBreakpoint = () => {
        const width = window.innerWidth;
        if (width >= 1280) currentBreakpoint.value = 'xl';
        else if (width >= 1024) currentBreakpoint.value = 'lg';
        else if (width >= 768) currentBreakpoint.value = 'md';
        else if (width >= 640) currentBreakpoint.value = 'sm';
        else currentBreakpoint.value = 'base';
      };
      
      updateBreakpoint();
      window.addEventListener('resize', updateBreakpoint);
      
      return () => window.removeEventListener('resize', updateBreakpoint);
    });
    
    // Compute current size based on responsive config and breakpoint
    const currentSize = useComputed$(() => {
      if (!isResponsiveSize) return size as ToggleSize;
      
      const responsiveSize = size as ResponsiveSize;
      const breakpoint = currentBreakpoint.value;
      
      // Check from largest to smallest breakpoint
      if (breakpoint === 'xl' && responsiveSize.xl) return responsiveSize.xl;
      if ((breakpoint === 'xl' || breakpoint === 'lg') && responsiveSize.lg) return responsiveSize.lg;
      if ((breakpoint === 'xl' || breakpoint === 'lg' || breakpoint === 'md') && responsiveSize.md) return responsiveSize.md;
      if (breakpoint !== 'base' && responsiveSize.sm) return responsiveSize.sm;
      
      return responsiveSize.base || "md";
    });

    // Define size-specific styling with mobile-optimized touch targets
    const sizeConfig: Record<
      ToggleSize,
      {
        container: string;
        track: string;
        thumb: string;
        thumbPosition: {
          on: string;
          off: string;
        };
        text: string;
        icon: string;
        spinner: string;
        minHeight: string;
      }
    > = {
      sm: {
        container: "h-5 min-h-[2.75rem] touch:min-h-[2.75rem]",
        track: "h-5 w-9",
        thumb: "h-4 w-4",
        thumbPosition: {
          on: "translate-x-4",
          off: "translate-x-0.5",
        },
        text: "text-sm",
        icon: "h-2.5 w-2.5",
        spinner: "h-3 w-3",
        minHeight: "min-h-[2.75rem]",
      },
      md: {
        container: "h-6 min-h-[2.75rem] touch:min-h-[2.75rem]",
        track: "h-6 w-11",
        thumb: "h-5 w-5",
        thumbPosition: {
          on: "translate-x-5",
          off: "translate-x-0.5",
        },
        text: "text-base",
        icon: "h-3 w-3",
        spinner: "h-3.5 w-3.5",
        minHeight: "min-h-[2.75rem]",
      },
      lg: {
        container: "h-7 min-h-[3rem] touch:min-h-[3rem]",
        track: "h-7 w-14",
        thumb: "h-6 w-6",
        thumbPosition: {
          on: "translate-x-7",
          off: "translate-x-0.5",
        },
        text: "text-lg",
        icon: "h-3.5 w-3.5",
        spinner: "h-4 w-4",
        minHeight: "min-h-[3rem]",
      },
    };

    // Define color variants using theme colors
    const colorConfig: Record<
      ToggleColor,
      {
        checked: string;
        unchecked: string;
        focus: string;
      }
    > = {
      primary: {
        checked: "bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500",
        unchecked: "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
        focus: "focus-visible:ring-primary-500/20 dark:focus-visible:ring-primary-400/20",
      },
      secondary: {
        checked: "bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-500",
        unchecked: "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
        focus: "focus-visible:ring-secondary-500/20 dark:focus-visible:ring-secondary-400/20",
      },
      success: {
        checked: "bg-success-500 hover:bg-success-600 dark:bg-success-600 dark:hover:bg-success-500",
        unchecked: "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
        focus: "focus-visible:ring-success-500/20 dark:focus-visible:ring-success-400/20",
      },
      error: {
        checked: "bg-error-500 hover:bg-error-600 dark:bg-error-600 dark:hover:bg-error-500",
        unchecked: "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
        focus: "focus-visible:ring-error-500/20 dark:focus-visible:ring-error-400/20",
      },
      warning: {
        checked: "bg-warning-500 hover:bg-warning-600 dark:bg-warning-600 dark:hover:bg-warning-500",
        unchecked: "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
        focus: "focus-visible:ring-warning-500/20 dark:focus-visible:ring-warning-400/20",
      },
      info: {
        checked: "bg-info-500 hover:bg-info-600 dark:bg-info-600 dark:hover:bg-info-500",
        unchecked: "bg-surface-light-tertiary hover:bg-surface-light-quaternary dark:bg-surface-dark-tertiary dark:hover:bg-surface-dark-quaternary",
        focus: "focus-visible:ring-info-500/20 dark:focus-visible:ring-info-400/20",
      },
    };

    // Handle toggle change
    const handleToggle$ = $(() => {
      if (!disabled && !loading) {
        onChange$(!checked);
      }
    });

    // Handle focus events with better keyboard navigation
    const handleFocus$ = $(() => {
      isFocused.value = true;
    });

    const handleBlur$ = $(() => {
      isFocused.value = false;
    });

    // Handle keyboard navigation (Space and Enter)
    const handleKeyDown$ = $((event: KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        if (!disabled && !loading) {
          onChange$(!checked);
        }
      }
    });

    // Enhanced touch support with gesture handling
    const handleTouchStart$ = $((event: TouchEvent) => {
      if (!disabled && !loading) {
        // Prevent text selection on touch
        event.preventDefault();
      }
    });

    const handleTouchEnd$ = $((event: TouchEvent) => {
      if (!disabled && !loading) {
        event.preventDefault();
        // Trigger change on touch end for better mobile UX
        onChange$(!checked);
      }
    });

    // Memoized responsive size classes calculation
    const getResponsiveSizeClasses = useComputed$(() => {
      if (!isResponsiveSize) return "";
      
      const responsiveSize = size as ResponsiveSize;
      const classes: string[] = [];
      
      if (responsiveSize.sm) classes.push(`sm:${sizeConfig[responsiveSize.sm].track}`);
      if (responsiveSize.md) classes.push(`md:${sizeConfig[responsiveSize.md].track}`);
      if (responsiveSize.lg) classes.push(`lg:${sizeConfig[responsiveSize.lg].track}`);
      if (responsiveSize.xl) classes.push(`xl:${sizeConfig[responsiveSize.xl].track}`);
      
      return classes.join(" ");
    });

    // Memoized configuration objects
    const sizeCfg = useComputed$(() => sizeConfig[currentSize.value]);
    const colorCfg = useComputed$(() => colorConfig[color]);

    // Memoized container classes
    const containerClass = useComputed$(() => [
      "inline-flex items-center gap-2 select-none",
      sizeCfg.value.minHeight,
      disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      className,
    ]
      .filter(Boolean)
      .join(" "));

    // Label component based on position and existence
    const labelElement = label && (
      <span
        class={[
          "font-medium transition-colors duration-200",
          sizeCfg.value.text,
          "text-gray-900 dark:text-gray-100",
          disabled ? "text-gray-500 dark:text-gray-400" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
        {required && <span class="ml-1 text-error-500 dark:text-error-400">*</span>}
      </span>
    );

    // Memoized track classes with responsive support
    const trackClass = useComputed$(() => [
      sizeCfg.value.track,
      getResponsiveSizeClasses.value,
      "relative inline-flex flex-shrink-0 rounded-full transition-all duration-200 ease-in-out",
      checked ? colorCfg.value.checked : colorCfg.value.unchecked,
      disabled || loading ? "" : "cursor-pointer",
      !focusVisibleOnly || isFocused.value
        ? `ring-2 ring-offset-2 ring-offset-surface-light-DEFAULT dark:ring-offset-surface-dark-DEFAULT ${colorCfg.value.focus}`
        : "",
    ]
      .filter(Boolean)
      .join(" "));

    // Memoized thumb classes
    const thumbClass = useComputed$(() => [
      "absolute top-1/2 -translate-y-1/2 transform",
      sizeCfg.value.thumb,
      "bg-white dark:bg-surface-dark-elevated",
      "rounded-full shadow-md",
      "transition-all duration-200 ease-in-out",
      "flex items-center justify-center",
      checked
        ? sizeCfg.value.thumbPosition.on
        : sizeCfg.value.thumbPosition.off,
    ]
      .filter(Boolean)
      .join(" "));

    return (
      <label for={toggleId} class={containerClass.value} aria-disabled={disabled || loading}>
        {/* Left-positioned label if applicable */}
        {labelPosition === "left" && labelElement}

        {/* Toggle control */}
        <div class={`relative ${sizeCfg.value.container}`}>
          {/* Hidden input for accessibility and form submission */}
          <input
            type="checkbox"
            id={toggleId}
            checked={checked}
            onChange$={handleToggle$}
            onFocus$={handleFocus$}
            onBlur$={handleBlur$}
            onKeyDown$={handleKeyDown$}
            disabled={disabled || loading}
            required={required}
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel || label}
            aria-describedby={ariaDescribedBy}
            aria-busy={loading}
            aria-live={loading ? "polite" : undefined}
            tabIndex={disabled ? -1 : 0}
            class="sr-only peer"
            {...props}
          />

          {/* For screen readers */}
          {!label && <VisuallyHidden>{ariaLabel || "Toggle"}</VisuallyHidden>}
          
          {/* Loading state announcement for screen readers */}
          {loading && (
            <VisuallyHidden aria-live="polite">
              {label || ariaLabel || "Toggle"} is loading
            </VisuallyHidden>
          )}

          {/* Track (background) */}
          <div 
            class={trackClass.value} 
            role="presentation" 
            aria-hidden="true"
            onTouchStart$={handleTouchStart$}
            onTouchEnd$={handleTouchEnd$}
            style={{ touchAction: 'manipulation' }}
          />

          {/* Thumb (moving part) */}
          <div class={thumbClass.value} aria-hidden="true">
            {loading ? (
              <Spinner
                size="inline"
                class={[sizeCfg.value.spinner, "text-gray-600 dark:text-gray-400"].join(" ")}
              />
            ) : (
              <>
                {/* Show icons when available */}
                {checked && checkedIcon && (
                  <span 
                    class={[
                      sizeCfg.value.icon, 
                      "text-gray-700 dark:text-gray-300",
                      "flex items-center justify-center"
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {typeof checkedIcon === 'string' ? (
                      <span dangerouslySetInnerHTML={checkedIcon} />
                    ) : (
                      checkedIcon
                    )}
                  </span>
                )}
                {!checked && uncheckedIcon && (
                  <span 
                    class={[
                      sizeCfg.value.icon, 
                      "text-gray-500 dark:text-gray-400",
                      "flex items-center justify-center"
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {typeof uncheckedIcon === 'string' ? (
                      <span dangerouslySetInnerHTML={uncheckedIcon} />
                    ) : (
                      uncheckedIcon
                    )}
                  </span>
                )}
                
                {/* Default indicator dot when no icons or with icons if showIconsWithIndicator is true */}
                {(!checkedIcon && !uncheckedIcon) || showIconsWithIndicator && (
                  <div 
                    class={[
                      "w-1 h-1 rounded-full transition-opacity duration-200",
                      checked ? "bg-gray-600 dark:bg-gray-400" : "bg-gray-400 dark:bg-gray-500",
                      (checkedIcon || uncheckedIcon) ? "opacity-30" : "opacity-100"
                    ].join(" ")}
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Right-positioned label if applicable */}
        {labelPosition === "right" && labelElement}
      </label>
    );
  },
);