import { component$, $, type QRL } from "@builder.io/qwik";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  class?: string;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  onChange$?: QRL<(value: string) => void>;
}

export const RadioGroup = component$<RadioGroupProps>(
  ({
    options,
    value,
    name,
    label,
    required = false,
    disabled = false,
    error,
    helperText,
    class: className,
    direction = "vertical",
    size = "md",
    ariaLabel,
    onChange$,
  }) => {
    // Generate unique IDs for accessibility
    const groupId = `radio-group-${Math.random().toString(36).substring(2, 9)}`;

    const handleChange$ = $((optionValue: string) => {
      if (!disabled && onChange$) {
        onChange$(optionValue);
      }
    });

    const hasError = Boolean(error);

    // Enhanced size-based classes for optimal touch targets and responsive design
    const sizeClasses = {
      sm: {
        radio: "h-4 w-4 mobile:h-5 mobile:w-5 tablet:h-4 tablet:w-4",
        label: "text-sm mobile:text-base tablet:text-sm",
        spacing: direction === "horizontal" ? "gap-4 mobile:gap-6 tablet:gap-5" : "gap-2 mobile:gap-3 tablet:gap-2.5",
        padding: "py-2 mobile:py-3 tablet:py-2.5 desktop:py-2",
        hitTarget: "mobile:min-h-[44px] tablet:min-h-[40px] desktop:min-h-[36px]",
      },
      md: {
        radio: "h-4 w-4 mobile:h-5 mobile:w-5 tablet:h-4 tablet:w-4",
        label: "text-sm mobile:text-base tablet:text-sm",
        spacing: direction === "horizontal" ? "gap-6 mobile:gap-8 tablet:gap-7" : "gap-3 mobile:gap-4 tablet:gap-3.5",
        padding: "py-2.5 mobile:py-3.5 tablet:py-3 desktop:py-2.5",
        hitTarget: "mobile:min-h-[44px] tablet:min-h-[40px] desktop:min-h-[40px]",
      },
      lg: {
        radio: "h-5 w-5 mobile:h-6 mobile:w-6 tablet:h-5 tablet:w-5",
        label: "text-base mobile:text-lg tablet:text-base",
        spacing: direction === "horizontal" ? "gap-8 mobile:gap-10 tablet:gap-9" : "gap-4 mobile:gap-5 tablet:gap-4.5",
        padding: "py-3 mobile:py-4 tablet:py-3.5 desktop:py-3",
        hitTarget: "mobile:min-h-[44px] tablet:min-h-[44px] desktop:min-h-[44px]",
      },
    }[size];

    const containerClass = direction === "horizontal" 
      ? `flex flex-wrap ${sizeClasses.spacing}`
      : `flex flex-col ${sizeClasses.spacing}`;

    return (
      <div class={["relative", className].filter(Boolean).join(" ")}>
        {label && (
          <FormLabel for={groupId} required={required} class="mb-1.5">
            {label}
          </FormLabel>
        )}

        <div
          id={groupId}
          role="radiogroup"
          aria-label={ariaLabel || label}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${groupId}-error`
              : helperText
                ? `${groupId}-helper`
                : undefined
          }
          class={containerClass}
        >
          {options.map((option, index) => {
            const optionId = `${groupId}-option-${index}`;
            const isSelected = value === option.value;
            const isDisabled = disabled || option.disabled;

            return (
              <label
                key={option.value}
                for={optionId}
                class={[
                  "relative flex items-start gap-3 cursor-pointer rounded-lg",
                  sizeClasses.padding,
                  sizeClasses.hitTarget,
                  // Enhanced mobile touch optimizations
                  "touch-manipulation",
                  // Responsive spacing and padding
                  "px-2 mobile:px-3 tablet:px-2.5 desktop:px-2",
                  // Interactive states with improved visual feedback
                  isDisabled
                    ? "cursor-not-allowed opacity-60"
                    : [
                        // Hover states with better contrast
                        "hover:bg-primary-50 dark:hover:bg-primary-950",
                        // Active states for touch feedback
                        "active:bg-primary-100 dark:active:bg-primary-900",
                        "active:scale-[0.99]",
                        // Focus states for accessibility
                        "focus-within:bg-primary-50 dark:focus-within:bg-primary-950",
                        "focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2",
                        "dark:focus-within:ring-primary-400 dark:focus-within:ring-offset-gray-900",
                      ].join(" "),
                  // Enhanced transitions with touch feedback
                  "transition-all duration-150",
                  "motion-safe:transition-all motion-reduce:transition-none",
                  // Better visual hierarchy
                  "-mx-2 mobile:-mx-3 tablet:-mx-2.5 desktop:-mx-2",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange$={() => handleChange$(option.value)}
                  aria-describedby={option.description ? `${optionId}-desc` : undefined}
                  class={[
                    sizeClasses.radio,
                    "mt-1 flex-shrink-0", // Proper alignment and prevent shrinking
                    // Enhanced base styles with better semantic colors
                    "border-2 rounded-full transition-all duration-200",
                    "motion-safe:transition-all motion-reduce:transition-none",
                    // Border and background states with improved contrast
                    hasError
                      ? "border-error-500 dark:border-error-400"
                      : "border-gray-300 dark:border-gray-600",
                    // Enhanced focus states for better accessibility
                    "focus:outline-none focus:ring-2 focus:ring-offset-2",
                    "focus:ring-offset-white dark:focus:ring-offset-gray-900",
                    hasError
                      ? "focus:ring-error-500 dark:focus:ring-error-400"
                      : "focus:ring-primary-500 dark:focus:ring-primary-400",
                    // Selection states with improved visual feedback
                    isSelected
                      ? [
                          hasError
                            ? "border-error-500 bg-error-500 dark:border-error-400 dark:bg-error-400"
                            : "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400",
                          "shadow-md ring-2 ring-inset",
                          hasError
                            ? "ring-error-600/30 dark:ring-error-400/30"
                            : "ring-primary-600/30 dark:ring-primary-500/30",
                          "text-white dark:text-gray-900",
                        ].join(" ")
                      : "bg-white dark:bg-gray-900",
                    // Enhanced hover states for better UX
                    !isDisabled && !isSelected && [
                      hasError
                        ? "hover:border-error-400 dark:hover:border-error-500"
                        : "hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950",
                    ].join(" "),
                    // Disabled state with better visual feedback
                    isDisabled && "cursor-not-allowed opacity-50",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />

                {/* Enhanced custom radio indicator */}
                {isSelected && (
                  <div
                    class={[
                      "absolute pointer-events-none",
                      "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      // Responsive indicator sizing
                      size === "lg" 
                        ? "w-2.5 h-2.5 mobile:w-3 mobile:h-3 tablet:w-2.5 tablet:h-2.5" 
                        : "w-2 h-2 mobile:w-2.5 mobile:h-2.5 tablet:w-2 tablet:h-2",
                      "rounded-full",
                      // Better contrast for indicator
                      "bg-white dark:bg-gray-900",
                      // Enhanced animations
                      "transition-all duration-200 scale-100",
                      "motion-safe:transition-all motion-reduce:transition-none",
                      "motion-safe:animate-scale-up",
                      // Shadow for better visibility
                      "shadow-sm",
                    ].join(" ")}
                    style={{
                      // Perfect centering with better positioning
                      transform: "translate(-50%, calc(-50% + 2px))",
                    }}
                  />
                )}

                <div class="flex-1 min-w-0">
                  <span
                    class={[
                      sizeClasses.label,
                      "font-medium leading-tight",
                      // Enhanced text colors with better semantic system
                      isDisabled
                        ? "text-gray-400 dark:text-gray-600"
                        : "text-gray-900 dark:text-gray-100",
                      // Enhanced selection state with better contrast
                      isSelected && !hasError && [
                        "text-primary-700 dark:text-primary-300",
                        "font-semibold",
                      ].join(" "),
                      // Error state with better visibility
                      hasError && "text-error-700 dark:text-error-300",
                      // Better text selection
                      "selection:bg-primary-500 selection:text-white",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {option.label}
                  </span>

                  {option.description && (
                    <p
                      id={`${optionId}-desc`}
                      class={[
                        "mt-1 text-xs mobile:text-sm tablet:text-xs",
                        "leading-relaxed",
                        // Enhanced description colors
                        isDisabled
                          ? "text-gray-400 dark:text-gray-600"
                          : "text-gray-600 dark:text-gray-400",
                        // Selection state for description
                        isSelected && !hasError && "text-primary-600 dark:text-primary-400",
                        hasError && "text-error-600 dark:text-error-400",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {option.description}
                    </p>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {helperText && !hasError && (
          <FormHelperText id={`${groupId}-helper`} class="mt-1.5">
            {helperText}
          </FormHelperText>
        )}

        {hasError && (
          <FormErrorMessage id={`${groupId}-error`} class="mt-1.5">
            {error}
          </FormErrorMessage>
        )}
      </div>
    );
  },
);
