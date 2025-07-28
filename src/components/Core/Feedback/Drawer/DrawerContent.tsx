import { component$, Slot } from "@builder.io/qwik";

export interface DrawerContentProps {
  class?: string;
}

export const DrawerContent = component$<DrawerContentProps>(
  ({ class: className }) => {
    return (
      <div class={`flex-1 overflow-y-auto p-4 ${className || ""}`}>
        <Slot />
      </div>
    );
  },
);
