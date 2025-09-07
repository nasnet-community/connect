import { component$, $, useId } from "@builder.io/qwik";
import type { 
  SegmentedControlProps, 
  SegmentedControlSize, 
  SegmentedControlColor 
} from "./SegmentedControl.types";

/**
 * SegmentedControl component for selecting between mutually exclusive options.
 * 
 * A modern segmented control similar to iOS/macOS style toggles, optimized for 
 * both light and dark themes with full accessibility support.
 * 
 * @example
 * ```tsx
 * const enabledState = useSignal(false);
 * 
 * <SegmentedControl
 *   value={enabledState}
 *   options={[
 *     { value: "false", label: "Disable", icon: <HiXCircleOutline /> },
 *     { value: "true", label: "Enable", icon: <HiCheckCircleOutline /> }
 *   ]}
 *   onChange$={(value) => enabledState.value = value === "true"}
 * />
 * ```
 */
export const SegmentedControl = component$<SegmentedControlProps>(
  ({
    value,
    options,
    onChange$,
    size = "md",
    color = "primary",
    fullWidth = false,
    disabled = false,
    name,
    label,
    required = false,
    id: propId,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    ...props
  }) => {
    const className = props.class;
    const autoId = useId();
    const controlId = propId || `segmented-control-${autoId}`;
    const radioName = name || `segmented-control-${autoId}`;

    // Size configurations
    const sizeConfig: Record<SegmentedControlSize, {
      container: string;
      segment: string;
      text: string;
      icon: string;
      padding: string;
    }> = {
      sm: {
        container: "p-1",
        segment: "min-h-[32px] px-3 py-1.5",
        text: "text-sm",
        icon: "h-4 w-4",
        padding: "gap-1.5",
      },
      md: {
        container: "p-1.5",
        segment: "min-h-[36px] px-4 py-2",
        text: "text-base",
        icon: "h-5 w-5",
        padding: "gap-2",
      },
      lg: {
        container: "p-2",
        segment: "min-h-[44px] px-5 py-2.5",
        text: "text-lg",
        icon: "h-6 w-6",
        padding: "gap-2.5",
      },
    };

    // Color configurations using tailwind.config.js primary colors
    const colorConfig: Record<SegmentedControlColor, {
      container: string;
      activeSegment: string;
      inactiveSegment: string;
      activeText: string;
      inactiveText: string;
      focusRing: string;
    }> = {
      primary: {
        container: "bg-primary-100 dark:bg-primary-950/30",
        activeSegment: "bg-primary-500 text-white shadow-md dark:bg-primary-600 dark:text-primary-50",
        inactiveSegment: "text-primary-900 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200",
        activeText: "text-white font-semibold",
        inactiveText: "text-primary-900 dark:text-primary-300",
        focusRing: "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      },
      secondary: {
        container: "bg-secondary-100 dark:bg-secondary-950/30",
        activeSegment: "bg-secondary-500 text-white shadow-md dark:bg-secondary-600 dark:text-secondary-50",
        inactiveSegment: "text-secondary-900 hover:text-secondary-800 dark:text-secondary-300 dark:hover:text-secondary-200",
        activeText: "text-white font-semibold",
        inactiveText: "text-secondary-900 dark:text-secondary-300",
        focusRing: "focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2",
      },
      neutral: {
        container: "bg-gray-100 dark:bg-gray-800",
        activeSegment: "bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-white",
        inactiveSegment: "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
        activeText: "text-gray-900 dark:text-white font-semibold",
        inactiveText: "text-gray-700 dark:text-gray-400",
        focusRing: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
      },
    };

    const handleChange$ = $((optionValue: string) => {
      if (!disabled) {
        value.value = optionValue;
        if (onChange$) {
          onChange$(optionValue);
        }
      }
    });

    const sizeCfg = sizeConfig[size];
    const colorCfg = colorConfig[color];

    // Container classes with enhanced styling
    const containerClass = [
      "inline-flex rounded-lg border transition-all duration-200",
      sizeCfg.container,
      colorCfg.container,
      color === "primary" ? "border-primary-200 dark:border-primary-800" :
      color === "secondary" ? "border-secondary-200 dark:border-secondary-800" :
      "border-gray-200 dark:border-gray-700",
      fullWidth ? "w-full" : "",
      disabled ? "opacity-60 cursor-not-allowed" : "shadow-sm",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div class="flex flex-col gap-2">
        {label && (
          <label for={controlId} class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span class="ml-1 text-red-500 dark:text-red-400">*</span>}
          </label>
        )}
        
        <div
          id={controlId}
          role="radiogroup"
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled}
          class={containerClass}
        >
          {options.map((option, index) => {
            const optionId = `${controlId}-option-${index}`;
            const isSelected = value.value === option.value;
            const isDisabled = disabled || option.disabled;

            const segmentClass = [
              "relative flex items-center justify-center cursor-pointer rounded-md transition-all duration-200 ease-in-out",
              sizeCfg.segment,
              sizeCfg.padding,
              fullWidth ? "flex-1" : "",
              isSelected
                ? [
                    colorCfg.activeSegment,
                    "transform scale-[1.02]",
                  ].join(" ")
                : [
                    colorCfg.inactiveSegment,
                    !isDisabled ? 
                      color === "primary" ? "hover:bg-primary-50 dark:hover:bg-primary-900/20" :
                      color === "secondary" ? "hover:bg-secondary-50 dark:hover:bg-secondary-900/20" :
                      "hover:bg-gray-50 dark:hover:bg-gray-700/50" 
                    : "",
                    !isDisabled ? "hover:scale-[0.98] active:scale-[0.96]" : "",
                  ].filter(Boolean).join(" "),
              isDisabled ? "cursor-not-allowed opacity-50" : "",
              colorCfg.focusRing,
              "outline-none",
            ].filter(Boolean).join(" ");

            const textClass = [
              "font-medium",
              sizeCfg.text,
              isSelected ? colorCfg.activeText : colorCfg.inactiveText,
            ].filter(Boolean).join(" ");

            return (
              <label
                key={option.value}
                for={optionId}
                class={segmentClass}
                aria-label={option.ariaLabel || option.label}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={radioName}
                  value={option.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange$={() => handleChange$(option.value)}
                  class="sr-only"
                  aria-label={option.ariaLabel || option.label}
                />
                
                {option.icon && (
                  <span class={[sizeCfg.icon, "flex-shrink-0"].join(" ")}>
                    {option.icon}
                  </span>
                )}
                
                <span class={textClass}>
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  },
);