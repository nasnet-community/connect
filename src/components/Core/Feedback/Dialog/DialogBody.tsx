import { component$, Slot } from "@builder.io/qwik";
import type { DialogBodyProps } from "./Dialog.types";
import { cn } from "../utils/theme";

/**
 * DialogBody Component
 *
 * Provides a styled body area for the Dialog with responsive padding and optional scrolling.
 * Mobile-optimized with appropriate spacing and scroll behavior.
 */
export const DialogBody = component$<DialogBodyProps>((props) => {
  const { scrollable = true, class: className } = props;

  return (
    <div
      class={cn(
        // Responsive padding
        "px-4 py-3 mobile:px-6 mobile:py-4 tablet:px-6 tablet:py-4 desktop:px-6 desktop:py-4",
        // Scrollable behavior with mobile-optimized max height
        scrollable &&
          "touch:overflow-scrolling-touch overflow-y-auto mobile:max-h-[calc(100vh-180px)] tablet:max-h-[calc(100vh-200px)] desktop:max-h-[calc(100vh-220px)]",
        className,
      )}
    >
      <Slot />
    </div>
  );
});
