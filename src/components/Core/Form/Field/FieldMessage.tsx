import { component$ } from "@builder.io/qwik";

export interface FieldMessageProps {
  text: string;
  isError?: boolean;
  id?: string;
}

export const FieldMessage = component$<FieldMessageProps>(
  ({ text, isError = false, id }) => {
    if (!text) return null;

    return (
      <p
        id={id}
        class={`
        mt-1 text-sm 
        ${isError ? "text-error" : "text-text-muted dark:text-text-dark-muted"}
      `}
      >
        {text}
      </p>
    );
  },
);
