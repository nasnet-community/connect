import { component$ } from "@builder.io/qwik";

export interface FieldLabelProps {
  id: string;
  label: string;
  required?: boolean;
  inline?: boolean;
  class?: string;
}

export const FieldLabel = component$<FieldLabelProps>(
  ({ id, label, required = false, inline = false, class: className }) => {
    return (
      <label
        for={id}
        class={`
        ${inline ? "" : "block"} 
        text-text-secondary dark:text-text-dark-secondary text-sm 
        font-medium
        ${className || ""}
      `}
      >
        {label}
        {required && <span class="ml-1 text-error">*</span>}
      </label>
    );
  },
);
