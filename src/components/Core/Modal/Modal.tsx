import {
  component$,
  type QRL,
  Slot,
  useSignal,
  useVisibleTask$,
  $,
  useId,
  type PropFunction,
} from "@builder.io/qwik";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type BackdropVariant = "light" | "medium" | "dark";
export type AnimationVariant = "fade" | "scale" | "slide";
export type Elevation = "none" | "low" | "medium" | "high" | "elevated";

export interface ModalProps {
  /** Controls whether the modal is visible */
  isOpen: boolean;
  /** Handler called when modal is closed */
  onClose: QRL<() => void>;
  /** Modal size variant */
  size?: ModalSize;
  /** Title text for the modal header */
  title?: string;
  /** Whether clicking outside closes the modal */
  closeOnBackdropClick?: boolean;
  /** Whether to show a close button in the header */
  hasCloseButton?: boolean;
  /** Whether to show the header section */
  hasHeader?: boolean;
  /** Whether to show the footer section */
  hasFooter?: boolean;
  /** Additional CSS classes for the modal container */
  class?: string;
  /** Additional CSS classes for the backdrop */
  backdropClass?: string;
  /** Whether to center the modal vertically */
  centered?: boolean;
  /** Whether to prevent page scrolling when modal is open */
  preventScroll?: boolean;
  /** Enable fullscreen mode on mobile devices */
  fullscreenOnMobile?: boolean;
  /** Backdrop darkness variant */
  backdropVariant?: BackdropVariant;
  /** Shadow elevation level */
  elevation?: Elevation;
  /** Mobile breakpoint for fullscreen behavior */
  mobileBreakpoint?: "mobile" | "tablet";
  /** Disable animations for reduced motion preference */
  disableAnimation?: boolean;
  /** Animation variant for modal entrance/exit */
  animationVariant?: AnimationVariant;
  /** ARIA description for the modal */
  ariaDescription?: string;
  /** Optional callback when open state changes */
  onOpenChange?: PropFunction<(isOpen: boolean) => void>;
  /** Element to focus when modal opens */
  initialFocusElement?: string;
  /** Z-index for modal stacking */
  zIndex?: number;
  /** Custom close button aria-label */
  closeButtonAriaLabel?: string;
}

export const Modal = component$<ModalProps>(
  ({
    isOpen,
    onClose,
    size = "md",
    title,
    closeOnBackdropClick = true,
    hasCloseButton = true,
    hasHeader = true,
    hasFooter = false,
    centered = true,
    preventScroll = true,
    fullscreenOnMobile = false,
    backdropVariant = "medium",
    elevation = "elevated",
    mobileBreakpoint = "mobile",
    disableAnimation = false,
    animationVariant = "scale",
    ariaDescription,
    onOpenChange,
    initialFocusElement,
    zIndex = 1050,
    closeButtonAriaLabel = "Close modal",
    ...props
  }) => {
    const dialogRef = useSignal<HTMLDialogElement>();
    const wasOpened = useSignal(false);
    const modalId = useId();
    const titleId = `${modalId}-title`;
    const descriptionId = `${modalId}-description`;

    // Handle body scroll locking
    useVisibleTask$(({ track, cleanup }) => {
      track(() => isOpen);

      if (isOpen && preventScroll) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }

      cleanup(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      });
    });

    // Handle dialog open/close and focus management
    useVisibleTask$(({ track }) => {
      const dialog = dialogRef.value;
      track(() => isOpen);
      track(() => dialog);

      if (!dialog) return;

      if (isOpen && !wasOpened.value) {
        if (!dialog.open) {
          dialog.showModal();
        }
        wasOpened.value = true;

        // Call onOpenChange callback
        if (onOpenChange) {
          onOpenChange(true);
        }

        // Handle initial focus
        if (initialFocusElement) {
          const focusElement = dialog.querySelector(initialFocusElement) as HTMLElement;
          if (focusElement) {
            focusElement.focus();
          }
        } else {
          // Default focus to close button or first focusable element
          const closeButton = dialog.querySelector('[aria-label="Close modal"]') as HTMLElement;
          const firstFocusable = dialog.querySelector('input, button, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
          if (closeButton) {
            closeButton.focus();
          } else if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      } else if (!isOpen && wasOpened.value) {
        dialog.close();
        wasOpened.value = false;

        // Call onOpenChange callback
        if (onOpenChange) {
          onOpenChange(false);
        }
      }
    });

    // Handle escape key
    useVisibleTask$(({ track, cleanup }) => {
      track(() => isOpen);

      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && closeOnBackdropClick) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      cleanup(() => document.removeEventListener("keydown", handleEscape));
    });

    // Size classes with mobile fullscreen support
    const getSizeClasses = () => {
      const baseClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full mx-4",
      };

      if (fullscreenOnMobile) {
        const mobileClasses = mobileBreakpoint === "mobile" 
          ? "max-sm:fixed max-sm:inset-0 max-sm:max-w-full max-sm:h-full max-sm:rounded-none"
          : "max-md:fixed max-md:inset-0 max-md:max-w-full max-md:h-full max-md:rounded-none";
        return `${baseClasses[size]} ${mobileClasses}`;
      }

      return baseClasses[size];
    };

    // Backdrop variant classes
    const backdropVariantClasses = {
      light: "backdrop:bg-contrast-low",
      medium: "backdrop:bg-contrast-medium",
      dark: "backdrop:bg-contrast-high",
    };

    // Elevation classes
    const elevationClasses = {
      none: "",
      low: "shadow-sm dark:shadow-dark-sm",
      medium: "shadow-md dark:shadow-dark-md",
      high: "shadow-lg dark:shadow-dark-lg",
      elevated: "shadow-xl dark:shadow-dark-xl",
    };

    // Animation classes with reduced motion support
    const getAnimationClasses = () => {
      if (disableAnimation) return "motion-reduce:animate-none";
      
      const animations = {
        fade: "animate-fade-in",
        scale: "animate-scale-up",
        slide: "animate-slide-up",
      };

      return `motion-safe:${animations[animationVariant]} motion-reduce:animate-none`;
    };

    const alignmentClasses = centered
      ? "items-center justify-center"
      : "items-start justify-center pt-16";

    const backdropClasses = [
      "fixed inset-0 flex backdrop:backdrop-blur-sm",
      "motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out",
      "motion-reduce:transition-none",
      backdropVariantClasses[backdropVariant],
      alignmentClasses,
      props.backdropClass,
    ]
      .filter(Boolean)
      .join(" ");

    const modalClasses = [
      "relative overflow-hidden rounded-lg",
      "bg-surface-light-DEFAULT dark:bg-surface-dark-secondary",
      "border border-border-DEFAULT dark:border-border-dark",
      "w-full",
      "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
      "motion-reduce:transition-none",
      getSizeClasses(),
      elevationClasses[elevation],
      getAnimationClasses(),
      // Safe area padding for mobile
      fullscreenOnMobile && "pbe-safe",
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    const handleBackdropClick = $((event: MouseEvent) => {
      if (
        closeOnBackdropClick &&
        dialogRef.value &&
        event.target === dialogRef.value
      ) {
        onClose();
      }
    });

    return (
      <dialog
        ref={dialogRef}
        class={backdropClasses}
        onClick$={handleBackdropClick}
        aria-modal="true"
        aria-labelledby={hasHeader && title ? titleId : undefined}
        aria-describedby={ariaDescription ? descriptionId : undefined}
        role="dialog"
        style={{ zIndex: zIndex }}
      >
        <div class={modalClasses} role="document" data-focus-trap="true">
          {hasHeader && (
            <div class="flex items-center justify-between border-b border-border-DEFAULT px-6 py-4 dark:border-border-dark">
              <div 
                id={titleId}
                class="text-lg font-medium text-text-DEFAULT dark:text-text-dark-default"
              >
                {title ? title : <Slot name="title" />}
              </div>
              {hasCloseButton && (
                <button
                  type="button"
                  class={[
                    "rounded-lg p-2 transition-colors",
                    "text-gray-400 hover:text-text-DEFAULT dark:hover:text-text-dark-default",
                    "hover:bg-surface-light-tertiary dark:hover:bg-surface-dark-tertiary",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    "dark:focus:ring-offset-surface-dark-secondary",
                    // Touch target size for mobile
                    "min-h-[44px] min-w-[44px] flex items-center justify-center"
                  ].join(" ")}
                  onClick$={onClose}
                  aria-label={closeButtonAriaLabel}
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          )}

          <div class={[
            "px-6 py-5",
            fullscreenOnMobile && "max-sm:flex-1 max-sm:overflow-y-auto max-sm:ps-safe max-sm:pe-safe max-md:flex-1 max-md:overflow-y-auto",
          ].filter(Boolean).join(" ")}>
            {ariaDescription && (
              <div id={descriptionId} class="sr-only">
                {ariaDescription}
              </div>
            )}
            <Slot />
          </div>

          {hasFooter && (
            <div class={[
              "flex justify-end gap-3 px-6 py-4",
              "border-t border-border-DEFAULT dark:border-border-dark",
              fullscreenOnMobile && "pbe-safe ps-safe pe-safe",
            ].filter(Boolean).join(" ")}>
              <Slot name="footer" />
            </div>
          )}
        </div>
      </dialog>
    );
  },
);
