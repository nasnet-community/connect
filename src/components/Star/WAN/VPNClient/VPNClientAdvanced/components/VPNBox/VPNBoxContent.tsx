import { component$, Slot } from "@builder.io/qwik";

interface VPNBoxContentProps {
  class?: string;
}

export const VPNBoxContent = component$<VPNBoxContentProps>(
  ({ class: className }) => {
    return (
      <div class={`space-y-4 ${className || ""}`}>
        <Slot />
      </div>
    );
  },
);
