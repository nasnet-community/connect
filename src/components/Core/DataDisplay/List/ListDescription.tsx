import { component$, Slot } from "@builder.io/qwik";
import type { ListDescriptionProps } from "./List.types";

/**
 * ListDescription component for definition list descriptions
 */
export const ListDescription = component$<ListDescriptionProps>((props) => {
  const { class: className = "" } = props;

  return (
    <dd class={`mb-4 text-gray-600 dark:text-gray-400 ${className}`}>
      <Slot />
    </dd>
  );
});
