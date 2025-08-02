import { component$, Slot } from "@builder.io/qwik";

export interface VPNBoxProps {
  id: string;
  name: string;
  type: string;
  error?: boolean;
  class?: string;
}

export const VPNBox = component$<VPNBoxProps>(
  ({ id, error, class: className }) => {
    return (
      <div
        class={`rounded-lg border ${
          error
            ? "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/10"
            : "border-border bg-surface dark:border-border-dark dark:bg-surface-dark"
        } p-4 transition-all ${className || ""}`}
        data-vpn-id={id}
      >
        <Slot />
      </div>
    );
  },
);
