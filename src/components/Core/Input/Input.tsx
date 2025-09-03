import { component$, type QRL, Slot, $ } from "@builder.io/qwik";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local";
export type InputSize = "sm" | "md" | "lg" | "xl";
export type ValidationState = "default" | "valid" | "invalid" | "warning";

export interface InputProps {
  type?: InputType;
  id?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  size?: InputSize;
  validation?: ValidationState;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  warningMessage?: string;
  class?: string;
  hasPrefixSlot?: boolean;
  hasSuffixSlot?: boolean;
  fluid?: boolean;
  animate?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  onChange$?: QRL<(event: Event, value: string) => void>;
  onInput$?: QRL<(event: Event, value: string) => void>;
  onFocus$?: QRL<(event: FocusEvent) => void>;
  onBlur$?: QRL<(event: FocusEvent) => void>;
  onKeyDown$?: QRL<(event: KeyboardEvent) => void>;
  onKeyUp$?: QRL<(event: KeyboardEvent) => void>;
}

export const Input = component$<InputProps>(
  ({
    type = "text",
    id,
    name,
    value,
    placeholder,
    disabled = false,
    readonly = false,
    required = false,
    size = "md",
    validation = "default",
    label,
    helperText,
    errorMessage,
    warningMessage,
    hasPrefixSlot = false,
    hasSuffixSlot = false,
    fluid = false,
    animate = true,
    min,
    max,
    step,
    pattern,
    autoComplete,
    autoFocus = false,
    onChange$,
    onInput$,
    onFocus$,
    onBlur$,
    onKeyDown$,
    onKeyUp$,
    ...props
  }) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    const baseClasses = [
      "block",
      fluid ? "w-full" : "w-full",
      "border focus:outline-none focus:ring-2",
      animate ? "transition-all duration-300 ease-out" : "transition-all duration-200",
      "touch-manipulation", // Better touch support
    ].join(" ");

    const sizeClasses = {
      sm: "text-xs px-2.5 py-1.5 rounded-md min-h-[2rem] mobile:min-h-[2.5rem]",
      md: "text-sm px-3 py-2 rounded-lg min-h-[2.5rem] mobile:min-h-[3rem]",
      lg: "text-base px-4 py-2.5 rounded-xl min-h-[3rem] mobile:min-h-[3.5rem]",
      xl: "text-lg px-5 py-3 rounded-2xl min-h-[3.5rem] mobile:min-h-[4rem]",
    };

    const validationClasses = {
      default: [
        "border-gray-300 bg-surface-light-DEFAULT text-gray-900",
        "focus:border-primary-500 focus:ring-primary-500/20",
        "hover:border-gray-400 hover:shadow-sm",
        // Clean dark mode matching project design system
        "dark:border-gray-600 dark:bg-gray-800",
        "dark:text-gray-100 dark:placeholder-gray-400",
        "dark:focus:border-primary-400 dark:focus:ring-primary-400/20",
        "dark:hover:border-gray-500",
        // RTL support
        "rtl:text-end ltr:text-start",
      ].join(" "),
      valid: [
        "border-success-500 bg-success-surface text-gray-900",
        "focus:border-success-600 focus:ring-success-500/20",
        "hover:shadow-sm hover:shadow-success-500/20",
        // Clean dark mode for valid state
        "dark:border-success-400 dark:bg-gray-800",
        "dark:text-gray-100",
        "dark:focus:border-success-400 dark:focus:ring-success-400/20",
        "dark:hover:border-gray-500",
        "rtl:text-end ltr:text-start",
      ].join(" "),
      invalid: [
        "border-error-500 bg-error-surface text-gray-900",
        "focus:border-error-600 focus:ring-error-500/20",
        "hover:shadow-sm hover:shadow-error-500/20",
        // Clean dark mode for invalid state
        "dark:border-error-400 dark:bg-gray-800",
        "dark:text-gray-100",
        "dark:focus:border-error-400 dark:focus:ring-error-400/20",
        "dark:hover:border-gray-500",
        "rtl:text-end ltr:text-start",
      ].join(" "),
      warning: [
        "border-warning-500 bg-warning-surface text-gray-900",
        "focus:border-warning-600 focus:ring-warning-500/20",
        "hover:shadow-sm hover:shadow-warning-500/20",
        // Clean dark mode for warning state
        "dark:border-warning-400 dark:bg-gray-800",
        "dark:text-gray-100",
        "dark:focus:border-warning-400 dark:focus:ring-warning-400/20",
        "dark:hover:border-gray-500",
        "rtl:text-end ltr:text-start",
      ].join(" "),
    };

    const disabledClasses = disabled
      ? "cursor-not-allowed opacity-60 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 pointer-events-none select-none"
      : "hover:shadow-sm focus:shadow-md dark:hover:shadow-lg dark:focus:shadow-xl";


    const prefixSuffixClasses = {
      wrapper: "relative",
      prefix: hasPrefixSlot ? (size === "sm" ? "ps-9" : size === "md" ? "ps-10" : size === "lg" ? "ps-12" : "ps-14") : "",
      suffix: hasSuffixSlot ? (size === "sm" ? "pe-9" : size === "md" ? "pe-10" : size === "lg" ? "pe-12" : "pe-14") : "",
      slotPrefix: [
        "absolute inset-y-0 start-0 flex items-center",
        size === "sm" ? "ps-2.5" : size === "md" ? "ps-3" : size === "lg" ? "ps-4" : "ps-5",
        "text-gray-500 dark:text-gray-400 transition-colors duration-200"
      ].join(" "),
      slotSuffix: [
        "absolute inset-y-0 end-0 flex items-center",
        size === "sm" ? "pe-2.5" : size === "md" ? "pe-3" : size === "lg" ? "pe-4" : "pe-5",
        "text-gray-500 dark:text-gray-400 transition-colors duration-200"
      ].join(" "),
    };

    const inputClasses = [
      baseClasses,
      sizeClasses[size],
      validationClasses[validation],
      disabledClasses,
      prefixSuffixClasses.prefix,
      prefixSuffixClasses.suffix,
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange$ = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      onChange$?.(event, target.value);
    });

    const handleInput$ = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      onInput$?.(event, target.value);
    });

    const handleFocus$ = $((event: FocusEvent) => {
      onFocus$?.(event);
    });

    const handleBlur$ = $((event: FocusEvent) => {
      onBlur$?.(event);
    });

    const handleKeyDown$ = $((event: KeyboardEvent) => {
      onKeyDown$?.(event);
    });

    const handleKeyUp$ = $((event: KeyboardEvent) => {
      onKeyUp$?.(event);
    });

    return (
      <div class={`w-full ${animate ? "motion-safe:animate-fade-in" : ""} group`}>
        {label && (
          <label
            for={inputId}
            class={[
              "mb-2 block font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200",
              size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg",
              "rtl:text-end ltr:text-start",
            ].join(" ")}
          >
            {label}
            {required && (
              <span class="ms-1 text-error-500 dark:text-error-400 animate-pulse" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div class={prefixSuffixClasses.wrapper}>
          {hasPrefixSlot && (
            <div class={prefixSuffixClasses.slotPrefix}>
              <Slot name="prefix" />
            </div>
          )}

          <input
            id={inputId}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            required={required}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            aria-invalid={validation === "invalid"}
            aria-describedby={
              validation === "invalid" && errorMessage
                ? `${inputId}-error`
                : validation === "warning" && warningMessage
                ? `${inputId}-warning`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
            class={inputClasses}
            onChange$={handleChange$}
            onInput$={handleInput$}
            onFocus$={handleFocus$}
            onBlur$={handleBlur$}
            onKeyDown$={handleKeyDown$}
            onKeyUp$={handleKeyUp$}
          />

          {hasSuffixSlot && (
            <div class={prefixSuffixClasses.slotSuffix}>
              <Slot name="suffix" />
            </div>
          )}
        </div>

        {validation === "invalid" && errorMessage && (
          <p 
            id={`${inputId}-error`}
            class={[
              "mt-2 text-error-600 dark:text-error-400 transition-colors duration-200",
              size === "sm" ? "text-xs" : "text-sm",
              animate ? "motion-safe:animate-slide-down" : "",
              "rtl:text-end ltr:text-start",
            ].join(" ")}
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {validation === "warning" && warningMessage && (
          <p 
            id={`${inputId}-warning`}
            class={[
              "mt-2 text-warning-600 dark:text-warning-400 transition-colors duration-200",
              size === "sm" ? "text-xs" : "text-sm",
              animate ? "motion-safe:animate-slide-down" : "",
              "rtl:text-end ltr:text-start",
            ].join(" ")}
            role="alert"
          >
            {warningMessage}
          </p>
        )}

        {helperText && validation !== "invalid" && validation !== "warning" && (
          <p 
            id={`${inputId}-helper`}
            class={[
              "mt-2 text-gray-500 dark:text-gray-400 transition-colors duration-200",
              size === "sm" ? "text-xs" : "text-sm",
              "rtl:text-end ltr:text-start",
            ].join(" ")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
