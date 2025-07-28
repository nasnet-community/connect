import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { FieldType } from "./Field.types";

export interface FieldInputProps {
  id: string;
  type?: FieldType;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  sizeClasses: string;
  error?: string;
  onInput$?: QRL<(event: Event) => void>;
  onChange$?: QRL<(event: Event) => void>;
  class?: string;
}

export const FieldInput = component$<FieldInputProps>(
  ({
    id,
    type = "text",
    value,
    placeholder,
    disabled = false,
    required = false,
    sizeClasses,
    error,
    onInput$,
    onChange$,
    class: className,
  }) => {
    return (
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onInput$={onInput$}
        onChange$={onChange$}
        class={`
        block w-full rounded-md border ${sizeClasses}
        border-border bg-white 
        focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
        dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default
        ${error ? "border-error dark:border-error" : ""}
        ${disabled ? "bg-surface-disabled dark:bg-surface-dark-disabled cursor-not-allowed opacity-60" : ""}
        ${className || ""}
      `}
      />
    );
  },
);
