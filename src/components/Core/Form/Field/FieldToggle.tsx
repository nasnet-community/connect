import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface FieldToggleProps {
  id: string;
  type: "checkbox" | "radio";
  checked?: boolean;
  disabled?: boolean;
  onChange$?: QRL<(event: Event) => void>;
  class?: string;
}

export const FieldToggle = component$<FieldToggleProps>(
  ({
    id,
    type,
    checked = false,
    disabled = false,
    onChange$,
    class: className,
  }) => {
    return (
      <input
        type={type}
        id={id}
        checked={checked}
        disabled={disabled}
        onChange$={onChange$}
        class={`
        h-4 w-4 
        ${type === "checkbox" ? "rounded" : "rounded-full"} 
        border-border text-primary-600 focus:ring-primary-500 
        dark:border-border-dark
        ${disabled ? "cursor-not-allowed opacity-60" : ""}
        ${className || ""}
      `}
      />
    );
  },
);
