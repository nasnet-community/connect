import { component$, Slot } from "@builder.io/qwik";

export interface LinkBoxContentProps {
  hasErrors?: boolean;
}

export const LinkBoxContent = component$<LinkBoxContentProps>(
  ({ hasErrors = false }) => {
    return (
      <div class={`space-y-4 ${hasErrors ? "pb-2" : ""}`}>
        <Slot />
      </div>
    );
  },
);
