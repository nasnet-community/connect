import { component$, Slot } from "@builder.io/qwik";

export interface SectionTitleProps {
  title?: string;
  class?: string;
}

export const SectionTitle = component$<SectionTitleProps>(
  ({ title, class: className = "" }) => {
    return (
      <h4
        class={`mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 ${className}`}
      >
        {title}
        <Slot />
      </h4>
    );
  },
);
