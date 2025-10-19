import { component$, type QRL, $ } from "@builder.io/qwik";

export type RadioInputSize = "sm" | "md" | "lg" | "xl";
export type RadioValidationState = "default" | "valid" | "invalid" | "warning";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioInputProps {
  id?: string;
  name: string;
  value?: string;
  options: RadioOption[];
  disabled?: boolean;
  required?: boolean;
  size?: RadioInputSize;
  validation?: RadioValidationState;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  warningMessage?: string;
  class?: string;
  direction?: "horizontal" | "vertical";
  animate?: boolean;
  onChange$?: QRL<(event: Event, value: string) => void>;
  onFocus$?: QRL<(event: FocusEvent) => void>;
  onBlur$?: QRL<(event: FocusEvent) => void>;
}

export const RadioInput = component$<RadioInputProps>(
  ({
    id,
    name,
    value,
    options,
    disabled = false,
    required = false,
    size = "md",
    validation = "default",
    label,
    helperText,
    errorMessage,
    warningMessage,
    direction = "vertical",
    animate = true,
    onChange$,
    onFocus$,
    onBlur$,
    // ...props
  }) => {
    const radioGroupId = id || `radio-group-${Math.random().toString(36).substring(2, 9)}`;

    const baseClasses = [
      "w-4 h-4 border focus:ring-2 focus:outline-none rounded-full",
      animate ? "transition-all duration-300 ease-out" : "transition-all duration-200",
      "touch-manipulation", // Better touch support
    ].join(" ");

    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4", 
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    const validationClasses = {
      default: [
        "border-gray-300 text-primary-600 bg-white",
        "focus:ring-primary-500/20 focus:border-primary-500",
        "hover:border-gray-400 hover:shadow-sm",
        // Clean dark mode matching project design system
        "dark:border-gray-600 dark:bg-gray-800",
        "dark:text-primary-400 dark:checked:bg-primary-500",
        "dark:focus:ring-primary-400/20 dark:focus:border-primary-400",
        "dark:hover:border-gray-500",
      ].join(" "),
      valid: [
        "border-success-500 text-success-600 bg-success-surface",
        "focus:ring-success-500/20 focus:border-success-600",
        "hover:shadow-sm hover:shadow-success-500/20",
        // Clean dark mode for valid radio state
        "dark:border-success-400 dark:bg-gray-800",
        "dark:text-success-400 dark:checked:bg-success-500",
        "dark:focus:ring-success-400/20 dark:focus:border-success-400",
        "dark:hover:border-gray-500",
      ].join(" "),
      invalid: [
        "border-error-500 text-error-600 bg-error-surface",
        "focus:ring-error-500/20 focus:border-error-600",
        "hover:shadow-sm hover:shadow-error-500/20",
        // Clean dark mode for invalid radio state
        "dark:border-error-400 dark:bg-gray-800",
        "dark:text-error-400 dark:checked:bg-error-500",
        "dark:focus:ring-error-400/20 dark:focus:border-error-400",
        "dark:hover:border-gray-500",
      ].join(" "),
      warning: [
        "border-warning-500 text-warning-600 bg-warning-surface",
        "focus:ring-warning-500/20 focus:border-warning-600",
        "hover:shadow-sm hover:shadow-warning-500/20",
        // Clean dark mode for warning radio state
        "dark:border-warning-400 dark:bg-gray-800",
        "dark:text-warning-400 dark:checked:bg-warning-500",
        "dark:focus:ring-warning-400/20 dark:focus:border-warning-400",
        "dark:hover:border-gray-500",
      ].join(" "),
    };

    const disabledClasses = disabled
      ? "cursor-not-allowed opacity-60 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 pointer-events-none"
      : "cursor-pointer hover:shadow-sm dark:hover:shadow-lg group-hover:scale-105";

    const radioClasses = [
      baseClasses,
      sizeClasses[size],
      validationClasses[validation],
      disabledClasses,
    ]
      .filter(Boolean)
      .join(" ");


    const optionLabelClasses = [
      "text-gray-900 dark:text-slate-100 cursor-pointer select-none transition-all duration-200",
      size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg",
      "rtl:text-end ltr:text-start",
      "dark:drop-shadow-sm group-hover:dark:text-slate-50",
    ].join(" ");

    const descriptionClasses = [
      "text-gray-500 dark:text-slate-400 transition-colors duration-200",
      size === "sm" ? "text-xs" : "text-xs",
      "rtl:text-end ltr:text-start",
      "dark:drop-shadow-sm",
    ].join(" ");

    const containerClasses = [
      direction === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3",
      animate ? "motion-safe:animate-fade-in" : "",
      "group",
    ].join(" ");

    const handleChange$ = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      onChange$?.(event, target.value);
    });

    const handleFocus$ = $((event: FocusEvent) => {
      onFocus$?.(event);
    });

    const handleBlur$ = $((event: FocusEvent) => {
      onBlur$?.(event);
    });

    return (
      <div class={`w-full ${animate ? "motion-safe:animate-fade-in" : ""} group`}>
        {label && (
          <fieldset>
            <legend
              class={[
                "mb-3 block font-medium text-gray-900 dark:text-slate-200 transition-colors duration-200",
                size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg",
                "rtl:text-end ltr:text-start",
                "dark:drop-shadow-sm",
              ].join(" ")}
            >
              {label}
              {required && (
                <span class="ms-1 text-error-500 dark:text-red-400 dark:drop-shadow-sm animate-pulse" aria-label="required">
                  *
                </span>
              )}
            </legend>

            <div 
              class={containerClasses}
              role="radiogroup"
              aria-required={required}
              aria-invalid={validation === "invalid"}
              aria-describedby={
                validation === "invalid" && errorMessage
                  ? `${radioGroupId}-error`
                  : validation === "warning" && warningMessage
                  ? `${radioGroupId}-warning`
                  : helperText
                  ? `${radioGroupId}-helper`
                  : undefined
              }
            >
              {options.map((option, index) => {
                const optionId = `${radioGroupId}-option-${index}`;
                const isChecked = value === option.value;
                const isOptionDisabled = disabled || option.disabled;

                return (
                  <div
                    key={option.value}
                    class={[
                      "flex items-start gap-3 group/option",
                      direction === "horizontal" ? "flex-row" : "flex-row",
                      isOptionDisabled ? "opacity-50" : "dark:hover:bg-gray-700/50 rounded-md p-1 transition-all duration-200",
                    ].join(" ")}
                  >
                    <input
                      id={optionId}
                      type="radio"
                      name={name}
                      value={option.value}
                      checked={isChecked}
                      disabled={isOptionDisabled}
                      required={required}
                      class={radioClasses}
                      onChange$={handleChange$}
                      onFocus$={handleFocus$}
                      onBlur$={handleBlur$}
                    />
                    <label
                      for={optionId}
                      class={[
                        optionLabelClasses,
                        isOptionDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer group-hover/option:translate-x-1 transition-transform duration-200",
                      ].join(" ")}
                    >
                      <div>
                        <div class="font-medium">{option.label}</div>
                        {option.description && (
                          <div class={descriptionClasses}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        )}

        {!label && (
          <div 
            class={containerClasses}
            role="radiogroup"
            aria-required={required}
            aria-invalid={validation === "invalid"}
            aria-describedby={
              validation === "invalid" && errorMessage
                ? `${radioGroupId}-error`
                : validation === "warning" && warningMessage
                ? `${radioGroupId}-warning`
                : helperText
                ? `${radioGroupId}-helper`
                : undefined
            }
          >
            {options.map((option, index) => {
              const optionId = `${radioGroupId}-option-${index}`;
              const isChecked = value === option.value;
              const isOptionDisabled = disabled || option.disabled;

              return (
                <div
                  key={option.value}
                  class={[
                    "flex items-start gap-3 group/option",
                    direction === "horizontal" ? "flex-row" : "flex-row",
                    isOptionDisabled ? "opacity-50" : "dark:hover:bg-gray-700/50 rounded-md p-1 transition-all duration-200",
                  ].join(" ")}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    disabled={isOptionDisabled}
                  required={required}
                    class={radioClasses}
                    onChange$={handleChange$}
                    onFocus$={handleFocus$}
                    onBlur$={handleBlur$}
                  />
                  <label
                    for={optionId}
                    class={[
                      optionLabelClasses,
                      isOptionDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer group-hover/option:translate-x-1 transition-transform duration-200",
                    ].join(" ")}
                  >
                    <div>
                      <div class="font-medium">{option.label}</div>
                      {option.description && (
                        <div class={descriptionClasses}>
                          {option.description}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        )}

        {validation === "invalid" && errorMessage && (
          <p 
            id={`${radioGroupId}-error`}
            class={[
              "mt-2 text-error-600 dark:text-red-300 dark:drop-shadow-md transition-all duration-300",
              size === "sm" ? "text-xs" : "text-sm",
              animate ? "motion-safe:animate-slide-down" : "",
              "rtl:text-end ltr:text-start",
              "dark:animate-pulse-subtle font-medium",
            ].join(" ")}
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {validation === "warning" && warningMessage && (
          <p 
            id={`${radioGroupId}-warning`}
            class={[
              "mt-2 text-warning-600 dark:text-amber-300 dark:drop-shadow-md transition-all duration-300",
              size === "sm" ? "text-xs" : "text-sm",
              animate ? "motion-safe:animate-slide-down" : "",
              "rtl:text-end ltr:text-start",
              "dark:animate-pulse-subtle font-medium",
            ].join(" ")}
            role="alert"
          >
            {warningMessage}
          </p>
        )}

        {helperText && validation !== "invalid" && validation !== "warning" && (
          <p 
            id={`${radioGroupId}-helper`}
            class={[
              "mt-2 text-gray-500 dark:text-slate-400 transition-colors duration-200",
              size === "sm" ? "text-xs" : "text-sm",
              "rtl:text-end ltr:text-start",
              "dark:drop-shadow-sm",
            ].join(" ")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);