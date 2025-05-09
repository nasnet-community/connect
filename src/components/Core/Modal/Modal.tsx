import { component$, type PropFunction, Slot, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen: boolean;
  onClose: PropFunction<() => void>;
  size?: ModalSize;
  title?: string;
  closeOnBackdropClick?: boolean;
  hasCloseButton?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  class?: string;
  backdropClass?: string;
  centered?: boolean;
  preventScroll?: boolean;
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
    ...props
  }) => {
    const dialogRef = useSignal<HTMLDialogElement>();
    const wasOpened = useSignal(false);

    useVisibleTask$(({ track }) => {
      track(() => isOpen);
      
      if (isOpen && preventScroll) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      
      return () => {
        document.body.style.overflow = "";
      };
    });

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
      } else if (!isOpen && wasOpened.value) {
        dialog.close();
        wasOpened.value = false;
      }
    });

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full mx-4",
    };

    const alignmentClasses = centered
      ? "items-center justify-center"
      : "items-start justify-center pt-16";

    const backdropClasses = [
      "fixed inset-0 flex transition-opacity duration-300 ease-out backdrop:bg-gray-900 backdrop:bg-opacity-50 backdrop:backdrop-blur-sm",
      alignmentClasses,
      props.backdropClass,
    ]
      .filter(Boolean)
      .join(" ");

    const modalClasses = [
      "relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 w-full transition-all duration-300 ease-out",
      sizeClasses[size],
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
      >
        <div class={modalClasses}>
          {hasHeader && (
            <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4 px-6">
              <div class="text-lg font-medium text-gray-900 dark:text-white">
                {title ? title : <Slot name="title" />}
              </div>
              {hasCloseButton && (
                <button
                  type="button"
                  class="rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white p-1.5"
                  onClick$={onClose}
                  aria-label="Close"
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

          <div class="px-6 py-5">
            <Slot />
          </div>

          {hasFooter && (
            <div class="flex justify-end border-t border-gray-200 dark:border-gray-700 px-6 py-4 gap-3">
              <Slot name="footer" />
            </div>
          )}
        </div>
      </dialog>
    );
  }
); 