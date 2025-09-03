import { component$, $, useId, useSignal } from "@builder.io/qwik";
import type { ToggleProps, ToggleSize, ToggleColor } from "./Toggle.types";
import { VisuallyHidden } from "../common";
import { Spinner } from "../DataDisplay/Progress/Spinner";

/**
 * Modern Toggle component for binary on/off states.
 * 
 * A clean, reliable toggle switch optimized for both light and dark themes.
 * Simplified implementation focused on performance and accessibility.
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
    required = false,
    id: propId,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    ...props
  }) => {
    const className = props.class;
    const autoId = useId();
    const toggleId = propId || `toggle-${autoId}`;
    const isFocused = useSignal(false);

    // Simplified size configurations
    const sizeConfig: Record<ToggleSize, {
      container: string;
      track: string;
      thumb: string;
      thumbTranslate: { on: string; off: string };
      text: string;
      icon: string;
    }> = {
      sm: {
        container: "min-h-[44px]", // Touch-friendly minimum
        track: "h-5 w-9",
        thumb: "h-4 w-4",
        thumbTranslate: { on: "translate-x-4", off: "translate-x-0.5" },
        text: "text-sm",
        icon: "h-2.5 w-2.5",
      },
      md: {
        container: "min-h-[48px]",
        track: "h-6 w-11",
        thumb: "h-5 w-5",
        thumbTranslate: { on: "translate-x-5", off: "translate-x-0.5" },
        text: "text-base",
        icon: "h-3 w-3",
      },
      lg: {
        container: "min-h-[52px]",
        track: "h-7 w-14",
        thumb: "h-6 w-6",
        thumbTranslate: { on: "translate-x-7", off: "translate-x-0.5" },
        text: "text-lg",
        icon: "h-3.5 w-3.5",
      },
    };

    // Simplified color configurations focusing on reliability
    const colorConfig: Record<ToggleColor, {
      track: { on: string; off: string };
      thumb: string;
      focus: string;
    }> = {
      primary: {
        track: {
          on: "bg-primary-500 dark:bg-primary-400",
          off: "bg-gray-300 dark:bg-gray-600"
        },
        thumb: "bg-white shadow-md border border-gray-200 dark:bg-gray-100 dark:border-gray-300",
        focus: "ring-2 ring-primary-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
      },
      secondary: {
        track: {
          on: "bg-secondary-500 dark:bg-secondary-400",
          off: "bg-gray-300 dark:bg-gray-600"
        },
        thumb: "bg-white shadow-md border border-gray-200 dark:bg-gray-100 dark:border-gray-300",
        focus: "ring-2 ring-secondary-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
      },
      success: {
        track: {
          on: "bg-green-500 dark:bg-green-400",
          off: "bg-gray-300 dark:bg-gray-600"
        },
        thumb: "bg-white shadow-md border border-gray-200 dark:bg-gray-100 dark:border-gray-300",
        focus: "ring-2 ring-green-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
      },
      error: {
        track: {
          on: "bg-red-500 dark:bg-red-400",
          off: "bg-gray-300 dark:bg-gray-600"
        },
        thumb: "bg-white shadow-md border border-gray-200 dark:bg-gray-100 dark:border-gray-300",
        focus: "ring-2 ring-red-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
      },
      warning: {
        track: {
          on: "bg-orange-500 dark:bg-orange-400",
          off: "bg-gray-300 dark:bg-gray-600"
        },
        thumb: "bg-white shadow-md border border-gray-200 dark:bg-gray-100 dark:border-gray-300",
        focus: "ring-2 ring-orange-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
      },
      info: {
        track: {
          on: "bg-blue-500 dark:bg-blue-400",
          off: "bg-gray-300 dark:bg-gray-600"
        },
        thumb: "bg-white shadow-md border border-gray-200 dark:bg-gray-100 dark:border-gray-300",
        focus: "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
      },
    };

    // Handle toggle change
    const handleToggle$ = $(() => {
      if (!disabled && !loading) {
        onChange$(!checked);
      }
    });

    // Handle focus events
    const handleFocus$ = $(() => {
      isFocused.value = true;
    });

    const handleBlur$ = $(() => {
      isFocused.value = false;
    });

    // Handle keyboard navigation
    const handleKeyDown$ = $((event: KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleToggle$();
      }
    });

    // Get current size config
    const currentSize = typeof size === "object" ? "md" : size;
    const sizeCfg = sizeConfig[currentSize];
    const colorCfg = colorConfig[color];

    // Static classes for better performance
    const containerClass = [
      "inline-flex items-center gap-3 select-none",
      disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      className,
    ].filter(Boolean).join(" ");

    // Label element
    const labelElement = label && (
      <span
        class={[
          "font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200",
          sizeCfg.text,
          disabled ? "text-gray-500 dark:text-gray-400" : "",
        ].filter(Boolean).join(" ")}
      >
        {label}
        {required && <span class="ml-1 text-red-500 dark:text-red-400">*</span>}
      </span>
    );

    // Simplified track classes
    const trackClass = [
      sizeCfg.track,
      "relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200",
      checked ? colorCfg.track.on : colorCfg.track.off,
      disabled || loading ? "cursor-not-allowed" : "cursor-pointer",
      !disabled && !loading && isFocused.value ? colorCfg.focus : "",
    ].filter(Boolean).join(" ");

    // Simplified thumb classes  
    const thumbClass = [
      "absolute top-1/2 -translate-y-1/2 rounded-full transition-transform duration-200",
      sizeCfg.thumb,
      colorCfg.thumb,
      "flex items-center justify-center",
      checked ? sizeCfg.thumbTranslate.on : sizeCfg.thumbTranslate.off,
    ].filter(Boolean).join(" ");

    return (
      <label for={toggleId} class={containerClass} aria-disabled={disabled || loading}>
        {/* Left-positioned label */}
        {labelPosition === "left" && labelElement}

        {/* Toggle control */}
        <div class="relative">
          {/* Hidden input for accessibility */}
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
            tabIndex={disabled ? -1 : 0}
            class="sr-only"
            {...props}
          />

          {/* Screen reader support */}
          {!label && <VisuallyHidden>{ariaLabel || "Toggle"}</VisuallyHidden>}
          
          {loading && (
            <VisuallyHidden aria-live="polite">
              {label || ariaLabel || "Toggle"} is loading
            </VisuallyHidden>
          )}

          {/* Track (background) */}
          <div 
            class={trackClass} 
            role="presentation" 
            aria-hidden="true"
            onClick$={handleToggle$}
          >
            {/* Thumb (moving circle) */}
            <div class={thumbClass} aria-hidden="true">
              {loading ? (
                <Spinner
                  size="inline"
                  class={`${sizeCfg.icon} text-gray-600 dark:text-gray-400`}
                />
              ) : (
                <>
                  {/* Custom icons */}
                  {checked && checkedIcon && (
                    <span 
                      class={`${sizeCfg.icon} text-gray-700 dark:text-gray-300 flex items-center justify-center`}
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
                      class={`${sizeCfg.icon} text-gray-500 dark:text-gray-400 flex items-center justify-center`}
                      aria-hidden="true"
                    >
                      {typeof uncheckedIcon === 'string' ? (
                        <span dangerouslySetInnerHTML={uncheckedIcon} />
                      ) : (
                        uncheckedIcon
                      )}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right-positioned label */}
        {labelPosition === "right" && labelElement}
      </label>
    );
  },
);