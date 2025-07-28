import { component$, Slot } from "@builder.io/qwik";
import type { DialogHeaderProps } from "./Dialog.types";
import { cn, getTouchTargetClasses } from "../utils/theme";

/**
 * DialogHeader Component
 *
 * Provides a styled header area for the Dialog with an optional close button.
 * Mobile-optimized with touch-friendly close button and safe area support.
 */
export const DialogHeader = component$<DialogHeaderProps>((props) => {
  const {
    hasCloseButton = true,
    closeButtonAriaLabel = "Close dialog",
    class: className,
    onClose$,
  } = props;

  return (
    <div
      class={cn(
        "flex items-center justify-between border-b border-gray-200 dark:border-gray-700",
        "px-4 py-3 mobile:px-6 mobile:py-4 tablet:px-6 tablet:py-4 desktop:px-6 desktop:py-4",
        "mobile:safe-area-top", // Add safe area padding on mobile
        className,
      )}
      q:slot="header"
    >
      {/* Content */}
      <div class="min-w-0 flex-1">
        <Slot />
      </div>

      {/* Close button */}
      {hasCloseButton && (
        <button
          type="button"
          class={cn(
            "ml-4 flex-shrink-0",
            "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "rounded-md p-1",
            getTouchTargetClasses("sm"),
          )}
          onClick$={onClose$}
          aria-label={closeButtonAriaLabel}
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
});
