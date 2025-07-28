import { component$, Slot } from "@builder.io/qwik";
import type { ListTermProps } from "./List.types";

/**
 * ListTerm component for definition list terms
 */
export const ListTerm = component$<ListTermProps>((props) => {
  const { class: className = "" } = props;

  return (
    <dt
      class={`mb-1 font-medium text-gray-900 dark:text-gray-100 ${className}`}
    >
      <Slot />
    </dt>
  );
});
