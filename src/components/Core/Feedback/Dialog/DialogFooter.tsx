import { component$, Slot } from "@builder.io/qwik";
import type { DialogFooterProps } from "./Dialog.types";
import { cn } from "../utils/theme";

/**
 * DialogFooter Component
 *
 * Provides a styled footer area for the Dialog, typically for action buttons.
 * Mobile-optimized with safe area support and responsive padding.
 */
export const DialogFooter = component$<DialogFooterProps>((props) => {
  const { class: className } = props;

  return (
    <div
      class={cn(
        // Base styling
        "border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50",
        // Responsive padding
        "px-4 py-3 mobile:px-6 mobile:py-4 tablet:px-6 tablet:py-4 desktop:px-6 desktop:py-4",
        // Mobile safe area for bottom gestures
        "mobile:safe-area-bottom",
        // Rounded corners (only on non-fullscreen mobile)
        "rounded-b-lg mobile:rounded-none tablet:rounded-b-lg desktop:rounded-b-lg",
        className,
      )}
      q:slot="footer"
    >
      <Slot />
    </div>
  );
});
