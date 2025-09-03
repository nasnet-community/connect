import { component$, Slot, useComputed$ } from "@builder.io/qwik";
import type { DialogProps } from "./Dialog.types";
import { useDialog } from "./useDialog";
import {
  getResponsiveSizeClasses,
  getSurfaceElevation,
  getBackdropClasses,
  getTouchTargetClasses,
  getSafeAreaClasses,
  getAnimationClasses,
  cn,
} from "../utils/theme";

/**
 * Dialog Component
 *
 * An accessible dialog/modal component that follows WAI-ARIA best practices
 * with mobile-optimized fullscreen support and responsive sizing.
 */
export const Dialog = component$<DialogProps>((props) => {
  const {
    size = "md",
    closeButtonAriaLabel = "Close dialog",
    isCentered = true,
    disableAnimation = false,
    hasBackdrop = true,
    class: className,
    contentClass,
    backdropClass,
    zIndex = 1050,
    ariaDescription,
    title,
    fullscreenOnMobile = true,
    backdropVariant = "medium",
    elevation = "elevated",
    mobileBreakpoint = "mobile",
  } = props;

  const {
    dialogId,
    isOpenSignal,
    dialogRef,
    handleClose$,
    handleOutsideClick$,
  } = useDialog(props);

  const ariaLabelId = `${dialogId}-title`;
  const ariaDescriptionId = `${dialogId}-description`;

  // Compute responsive classes
  const dialogClasses = useComputed$(() => {
    const baseClasses = [
      "relative w-full",
      getSurfaceElevation(elevation),
      "rounded-lg",
    ];

    // Add fullscreen on mobile if enabled
    if (fullscreenOnMobile) {
      baseClasses.push(
        `${mobileBreakpoint}:h-full ${mobileBreakpoint}:max-h-full ${mobileBreakpoint}:rounded-none`,
      );
    }

    // Add responsive size classes
    if (!fullscreenOnMobile || size !== "full") {
      // Map DialogSize to FeedbackSize
      const feedbackSize = size === "xl" ? "lg" : (size as "sm" | "md" | "lg");
      baseClasses.push(getResponsiveSizeClasses(feedbackSize, "dialog"));
    }

    // Add animation classes
    if (!disableAnimation) {
      baseClasses.push(
        fullscreenOnMobile
          ? `${mobileBreakpoint}:animate-slide-up tablet:animate-scale-up desktop:animate-scale-up`
          : getAnimationClasses("scaleUp"),
      );
    }

    return cn(...baseClasses, className);
  });

  return (
    <>
      {isOpenSignal.value && (
        <div
          style={{ zIndex: zIndex }}
          class="fixed inset-0 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title || props.ariaLabel ? ariaLabelId : undefined}
          aria-describedby={ariaDescription ? ariaDescriptionId : undefined}
          aria-label={!title && props.ariaLabel ? props.ariaLabel : undefined}
        >
          {/* Backdrop */}
          {hasBackdrop && (
            <div
              class={cn(
                "fixed inset-0",
                getBackdropClasses(backdropVariant),
                !disableAnimation && getAnimationClasses("fadeIn"),
                backdropClass,
              )}
              onClick$={handleOutsideClick$}
              data-testid="dialog-backdrop"
            ></div>
          )}

          {/* Dialog centering container */}
          <div
            class={cn(
              "fixed inset-0 overflow-y-auto",
              fullscreenOnMobile
                ? `${mobileBreakpoint}:flex ${mobileBreakpoint}:items-end tablet:items-center tablet:justify-center desktop:items-center desktop:justify-center`
                : isCentered
                  ? "flex items-center justify-center"
                  : "pt-16",
            )}
          >
            {/* Dialog */}
            <div
              ref={dialogRef}
              id={dialogId}
              class={dialogClasses.value}
              data-testid="dialog"
            >
              {/* Title (if provided via prop) */}
              {title && (
                <div
                  class={cn(
                    "border-b border-gray-200 px-6 py-4 dark:border-gray-700",
                    fullscreenOnMobile && getSafeAreaClasses("top"),
                  )}
                >
                  <h3
                    id={ariaLabelId}
                    class="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    {title}
                  </h3>
                  {props.hasCloseButton !== false && (
                    <button
                      type="button"
                      class={cn(
                        "absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
                        "transition-colors duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                        "rounded-md p-1",
                        getTouchTargetClasses("sm"),
                      )}
                      onClick$={handleClose$}
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
              )}

              {/* Content */}
              <div
                class={cn(
                  contentClass,
                  fullscreenOnMobile &&
                    `${mobileBreakpoint}:flex ${mobileBreakpoint}:flex-col ${mobileBreakpoint}:h-full`,
                )}
              >
                {/* Header slot */}
                <Slot name="header" />

                {/* Description (if provided) */}
                {ariaDescription && (
                  <div id={ariaDescriptionId} class="sr-only">
                    {ariaDescription}
                  </div>
                )}

                {/* Default slot (body) - Make it flex-grow on mobile fullscreen */}
                <div
                  class={cn(
                    fullscreenOnMobile &&
                      `${mobileBreakpoint}:flex-1 ${mobileBreakpoint}:overflow-y-auto`,
                  )}
                >
                  <Slot />
                </div>

                {/* Footer slot */}
                <Slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
