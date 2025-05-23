import { component$, type QRL, Slot, $ } from "@builder.io/qwik";

export type InputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search";
export type InputSize = "sm" | "md" | "lg";
export type ValidationState = "default" | "valid" | "invalid";

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
  class?: string;
  hasPrefixSlot?: boolean;
  hasSuffixSlot?: boolean;
  onChange$?: QRL<(event: Event, value: string) => void>;
  onInput$?: QRL<(event: Event, value: string) => void>;
  onFocus$?: QRL<(event: FocusEvent) => void>;
  onBlur$?: QRL<(event: FocusEvent) => void>;
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
    hasPrefixSlot = false,
    hasSuffixSlot = false,
    onChange$,
    onInput$,
    ...props
  }) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    const baseClasses = "block w-full border focus:outline-none focus:ring-2 transition-colors";

    const sizeClasses = {
      sm: "text-xs px-2.5 py-1.5 rounded-md",
      md: "text-sm px-3 py-2 rounded-lg",
      lg: "text-base px-4 py-2.5 rounded-xl",
    };

    const validationClasses = {
      default:
        "border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
      valid:
        "border-green-500 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500",
      invalid:
        "border-red-500 bg-white text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500",
    };

    const disabledClasses = disabled
      ? "cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800"
      : "";

    const prefixSuffixClasses = {
      wrapper: "relative",
      prefix: hasPrefixSlot ? "pl-10" : "",
      suffix: hasSuffixSlot ? "pr-10" : "",
      slotPrefix: "absolute inset-y-0 left-0 flex items-center pl-3",
      slotSuffix: "absolute inset-y-0 right-0 flex items-center pr-3",
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

    return (
      <div class="w-full">
        {label && (
          <label
            for={inputId}
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
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
            {...props}
            class={inputClasses}
            onChange$={handleChange$}
            onInput$={handleInput$}
          />
          
          {hasSuffixSlot && (
            <div class={prefixSuffixClasses.slotSuffix}>
              <Slot name="suffix" />
            </div>
          )}
        </div>
        
        {validation === "invalid" && errorMessage && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorMessage}
          </p>
        )}
        
        {helperText && validation !== "invalid" && (
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
