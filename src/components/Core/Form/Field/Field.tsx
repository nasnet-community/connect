import { component$, Slot } from "@builder.io/qwik";
import type { FieldProps } from "./Field.types";
import { useField } from "./hooks/useField";
import { FieldLabel } from "./FieldLabel";
import { FieldInput } from "./FieldInput";
import { FieldToggle } from "./FieldToggle";
import { FieldMessage } from "./FieldMessage";

/**
 * Field component for form inputs with various layout options and styling.
 *
 * This component provides a flexible form field with support for various input types,
 * validation states, and layout configurations. It can be used either with a standard
 * value/onChange pattern or with a child Slot for more custom content.
 */
export const Field = component$<FieldProps>(
  ({
    type = "text",
    label,
    value,
    placeholder,
    required = false,
    disabled = false,
    id,
    class: className,
    error,
    helperText,
    inline = false,
    onInput$,
    onChange$,
    onValueChange$,
    size = "md",
  }) => {
    const {
      inputId,
      sizeClasses,
      handleInput$,
      handleChange$,
      isToggleInput,
      containerClass,
    } = useField({
      type,
      id,
      value,
      error,
      helperText,
      inline,
      onInput$,
      onChange$,
      onValueChange$,
      size,
    });

    // Handle checkbox and radio inputs, which have a different layout
    if (isToggleInput) {
      return (
        <div class={`${containerClass} ${className || ""}`}>
          <FieldToggle
            id={inputId}
            type={type as "checkbox" | "radio"}
            checked={value === true}
            disabled={disabled}
            onChange$={handleChange$}
          />

          {label && (
            <div class="ml-2">
              <FieldLabel id={inputId} label={label} required={required} />
            </div>
          )}
        </div>
      );
    }

    // For standard inputs with potential inline layout
    return (
      <div class={`${containerClass} ${className || ""}`}>
        {/* Left-positioned label for inline mode - responsive */}
        {inline && label && (
          <div class="whitespace-nowrap sm:min-w-0 sm:flex-shrink-0">
            <FieldLabel
              id={inputId}
              label={label}
              required={required}
              inline={inline}
            />
          </div>
        )}

        {/* Field container with relative positioning for prefix/suffix - responsive */}
        <div class={`${inline ? "min-w-0 flex-1" : "w-full"}`}>
          {/* Top-positioned label for standard mode */}
          {!inline && label && (
            <div class="mb-1">
              <FieldLabel id={inputId} label={label} required={required} />
            </div>
          )}

          {/* Input area - check for slot content first */}
          <div class="relative">
            <Slot name="prefix" />

            <Slot>
              {/* Default input if no slot content is provided */}
              <FieldInput
                id={inputId}
                type={type}
                value={value as string | number}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                sizeClasses={sizeClasses}
                error={error}
                onInput$={handleInput$}
                onChange$={handleChange$}
              />
            </Slot>

            <Slot name="suffix" />
          </div>

          {/* Messages */}
          <FieldMessage text={error || ""} isError={true} />
          {!error && <FieldMessage text={helperText || ""} />}
        </div>
      </div>
    );
  },
);
