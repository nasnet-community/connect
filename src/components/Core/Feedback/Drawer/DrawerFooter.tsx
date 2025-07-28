import { component$, Slot } from "@builder.io/qwik";

export interface DrawerFooterProps {
  class?: string;
}

export const DrawerFooter = component$<DrawerFooterProps>(
  ({ class: className }) => {
    return (
      <footer
        class={`border-t border-gray-200 p-4 dark:border-gray-700 ${className || ""}`}
      >
        <Slot />
      </footer>
    );
  },
);
