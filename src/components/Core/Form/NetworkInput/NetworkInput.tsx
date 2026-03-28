import {
  component$,
  $,
  useSignal,
  useId,
  useComputed$,
} from "@builder.io/qwik";
import { Input } from "../../Input/Input";
import type { NetworkInputProps } from "./NetworkInput.types";
import {
  getNetworkPreset,
  buildNetworkString,
  validateNetworkInput,
  getSubnetMask,
} from "./NetworkInput.utils";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

/**
 * NetworkInput - Flexible network address input component
 *
 * Supports various network formats and input modes:
 * - Class A (10.x.y.0/8), Class B (172.16.x.0/16), Class C (192.168.x.0/24)
 * - Multiple input modes: octet, full, range
 * - Real-time validation and conflict detection
 * - Visual feedback and animations
 *
 * @example
 * <NetworkInput
 *   mode="octet"
 *   format="classC"
 *   value={subnet}
 *   onChange$={handleSubnetChange}
 *   label="Network Subnet"
 *   placeholder={10}
 * />
 */
export const NetworkInput = component$<NetworkInputProps>(
  ({
    mode,
    format,
    value,
    onChange$,

    // Content
    label,
    description,
    placeholder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultValue,
    helpText,

    // State
    error,
    disabled = false,
    required = false,
    loading = false,

    // Network config
    mask,
    customPrefix,
    customSuffix,

    // Validation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validation,

    // Visual
    visualFormat = {},
    size = "md",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    variant = "default",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    color = "default",

    // Accessibility
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    autoFocus = false,
    readonly = false,
    id: propId,
    name,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tabIndex,

    // Events
    onFocus$,
    onBlur$,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onValidate$,

    // Advanced
    suggestions = [],
    showSuggestions = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allowCustomFormat = false,
  }) => {
    const locale = useMessageLocale();
    const autoId = useId();
    const inputId = propId || `network-input-${autoId}`;
    const isFocused = useSignal(false);
    const _inputRef = useSignal<HTMLInputElement>();

    // Get network preset configuration
    const preset = useComputed$(() => getNetworkPreset(format));

    // Current mask value
    const currentMask = mask || preset.value.mask;

    // Build visual format configuration
    const visualConfig = useComputed$(() => ({
      prefix: customPrefix || preset.value.prefix,
      suffix: customSuffix || preset.value.suffix,
      showFullAddress: visualFormat.showFullAddress ?? true,
      showSubnetMask: visualFormat.showSubnetMask ?? true,
      highlightInput: visualFormat.highlightInput ?? true,
      compactMode: visualFormat.compactMode ?? false,
      ...visualFormat,
    }));

    // Size configurations
    const sizeConfig = {
      sm: {
        input: "text-sm px-2 py-1",
        container: "min-h-[36px]",
        label: "text-sm",
        description: "text-xs",
      },
      md: {
        input: "text-base px-3 py-2",
        container: "min-h-[42px]",
        label: "text-sm",
        description: "text-sm",
      },
      lg: {
        input: "text-lg px-4 py-3",
        container: "min-h-[48px]",
        label: "text-base",
        description: "text-sm",
      },
    };

    const config = sizeConfig[size];

    // Convert value for display
    const displayValue = useComputed$(() => {
      if (value === null) return "";

      if (mode === "octet" && typeof value === "number") {
        return value.toString();
      }

      if (Array.isArray(value)) {
        return value.join(".");
      }

      return value.toString();
    });

    // Generate full network string for display
    const networkString = useComputed$(() => {
      if (!value) {
        return `${visualConfig.value.prefix}${"_".repeat(preset.value.inputFields * 4 - 1)}${visualConfig.value.suffix}`;
      }

      let octets: (number | null)[] = [];

      if (typeof value === "number") {
        octets = [value];
      } else if (Array.isArray(value)) {
        octets = value;
      } else if (typeof value === "string") {
        return value;
      }

      return buildNetworkString(octets, currentMask, format);
    });

    // Handle input changes
    const handleInput$ = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      let inputValue = target.value.trim();

      // Limit input length based on mode
      if (mode === "octet") {
        // Single octet: max 3 characters
        if (inputValue.length > 3) {
          inputValue = inputValue.slice(0, 3);
          target.value = inputValue;
        }

        if (inputValue === "") {
          onChange$(null);
          return;
        }

        // Parse and validate single octet
        const numValue = parseInt(inputValue, 10);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
          onChange$(numValue);
        } else {
          // Reset to previous valid value
          target.value = displayValue.value;
        }
      } else {
        // Full IP or range mode
        onChange$(inputValue);
      }
    });

    // Handle focus events
    const handleFocus$ = $(() => {
      isFocused.value = true;
      if (onFocus$) {
        onFocus$();
      }
    });

    const handleBlur$ = $(() => {
      isFocused.value = false;
      if (onBlur$) {
        onBlur$();
      }
    });

    // Get current placeholder
    const currentPlaceholder = useComputed$(() => {
      if (typeof placeholder === "string") return placeholder;
      if (typeof placeholder === "number") return placeholder.toString();
      if (Array.isArray(placeholder)) return placeholder.join(".");

      // Use preset defaults
      if (mode === "octet") {
        return preset.value.placeholders[0]?.toString() || "10";
      }

      return preset.value.placeholders.join(".");
    });

    // Validation state
    const validationError = useComputed$(() => {
      if (error) return error;

      const validationResult = validateNetworkInput(
        value,
        format,
        undefined, // Skip custom validation in NetworkInput - handle at component level
      );

      return validationResult;
    });

    // Color scheme based on state
    const colorClasses = useComputed$(() => {
      const base = "transition-all duration-200";

      if (validationError.value) {
        return `${base} border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/10`;
      }

      if (isFocused.value) {
        return `${base} border-primary-300 bg-primary-50/50 dark:border-primary-600 dark:bg-primary-900/20`;
      }

      return `${base} border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800`;
    });

    return (
      <div class="space-y-2">
        {/* Label and Description */}
        <div class="flex items-center justify-between">
          <label
            for={inputId}
            class={`font-medium text-gray-700 dark:text-gray-300 ${config.label}`}
          >
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
          </label>
          {description && (
            <span
              class={`text-gray-500 dark:text-gray-400 ${config.description}`}
            >
              {description}
            </span>
          )}
        </div>

        {/* Visual Network Input Container */}
        <div class="relative">
          <div
            class={`
          flex items-center rounded-lg border ${config.container} ${colorClasses.value}
          ${disabled ? "cursor-not-allowed opacity-60" : ""}
        `}
          >
            {/* Network Prefix */}
            {visualConfig.value.prefix && (
              <div class="px-3 py-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                {visualConfig.value.prefix}
              </div>
            )}

            {/* Main Input Field */}
            <div class="relative flex-1">
              <Input
                id={inputId}
                name={name}
                type="text"
                value={displayValue.value}
                placeholder={currentPlaceholder.value}
                disabled={disabled || loading}
                readonly={readonly}
                onInput$={handleInput$}
                onFocus$={handleFocus$}
                onBlur$={handleBlur$}
                class={`
                ${config.input} w-full border-none bg-transparent
                text-center font-mono outline-none
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                ${validationError.value ? "text-red-600" : "text-gray-900 dark:text-white"}
              `}
                validation="default"
              />
            </div>

            {/* Network Suffix */}
            {visualConfig.value.suffix && (
              <div class="px-3 py-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                {visualConfig.value.suffix}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div class="px-3">
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
              </div>
            )}
          </div>

          {/* Focus Ring Effect */}
          {!disabled && (
            <div
              class={`
            pointer-events-none absolute inset-0 rounded-lg transition-all duration-200
            ${isFocused.value ? "ring-2 ring-primary-500/20 ring-offset-1" : ""}
          `}
            />
          )}
        </div>

        {/* Network String Display */}
        {visualConfig.value.showFullAddress && (
          <div class="flex items-center justify-between">
            <div
              class={`font-mono text-gray-500 dark:text-gray-400 ${config.description}`}
            >
              {networkString.value}
            </div>
            {value && !validationError.value && (
              <div class="flex items-center gap-1 text-green-600 dark:text-green-400">
                <div class="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span class={config.description}>
                  {semanticMessages.shared_valid({}, { locale })}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Subnet Mask Display */}
        {visualConfig.value.showSubnetMask && currentMask && (
          <div class={`text-gray-500 dark:text-gray-400 ${config.description}`}>
            {semanticMessages.shared_subnet_mask({}, { locale })}:{" "}
            {getSubnetMask(currentMask)}
          </div>
        )}

        {/* Error Message */}
        {validationError.value && (
          <div
            class={`animate-in slide-in-from-top-1 text-red-600 duration-300 dark:text-red-400 ${config.description}`}
          >
            <div class="flex items-center gap-2">
              <div class="h-1 w-1 animate-pulse rounded-full bg-red-500" />
              {validationError.value}
            </div>
          </div>
        )}

        {/* Help Text */}
        {helpText && !validationError.value && (
          <div class={`text-gray-500 dark:text-gray-400 ${config.description}`}>
            {helpText}
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && isFocused.value && (
          <div class="mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-600 dark:bg-gray-800">
            <div
              class={`mb-1 text-gray-600 dark:text-gray-400 ${config.description}`}
            >
              {semanticMessages.shared_suggestions({}, { locale })}:
            </div>
            <div class="flex flex-wrap gap-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick$={() => onChange$(suggestion)}
                  class={`rounded bg-gray-100 px-2 py-1 text-xs transition-colors hover:bg-primary-100 dark:bg-gray-700 dark:hover:bg-primary-900/20 ${config.description}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Success Feedback Animation */}
        {value && !validationError.value && (
          <div class="pointer-events-none absolute right-0 top-0 -translate-y-1 translate-x-1 transform">
            <div class="h-3 w-3 animate-ping rounded-full bg-green-500 opacity-75" />
            <div class="absolute inset-0 h-3 w-3 rounded-full bg-green-500 opacity-100" />
          </div>
        )}
      </div>
    );
  },
);
