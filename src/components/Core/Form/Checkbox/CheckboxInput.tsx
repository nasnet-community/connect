import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { CheckboxSize } from "./Checkbox.types";

export interface CheckboxInputProps {
  id: string;
  name?: string;
  value?: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: CheckboxSize;
  indeterminate?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  class?: string;
  onChange$: QRL<(event: Event) => void>;
  ref: { value: HTMLInputElement | undefined };
}

export const CheckboxInput = component$<CheckboxInputProps>(({
  id,
  name,
  value,
  checked,
  disabled = false,
  required = false,
  size = "md",
  ariaLabel,
  ariaDescribedBy,
  class: className,
  onChange$,
  ref
}) => {
  // Size-specific classes
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];

  return (
    <input
      ref={ref}
      type="checkbox"
      id={id}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      required={required}
      onChange$={onChange$}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      class={`
        ${sizeClasses}
        rounded
        border-border
        text-primary-600
        focus:ring-primary-500
        focus:ring-offset-1
        dark:border-border-dark
        dark:bg-surface-dark-secondary
        dark:focus:ring-primary-600
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className || ''}
      `}
    />
  );
}); 