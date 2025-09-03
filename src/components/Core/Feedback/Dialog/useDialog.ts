import {
  useSignal,
  useVisibleTask$,
  useOnDocument,
  $,
  useId,
  useTask$,
  type QRL,
  type Signal,
} from "@builder.io/qwik";

export interface UseDialogParams {
  isOpen?: boolean | Signal<boolean>;
  openSignal?: Signal<boolean>;
  onClose$?: QRL<() => void>;
  onOpen$?: QRL<() => void>;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  initialFocus?: boolean;
  trapFocus?: boolean;
  id?: string;
}

export interface UseDialogReturn {
  dialogId: string;
  isOpenSignal: Signal<boolean>;
  dialogRef: Signal<Element | undefined>;
  prevActiveElement: Signal<Element | null>;
  focusableElements: Signal<HTMLElement[]>;
  mounted: Signal<boolean>;
  handleClose$: QRL<() => void>;
  handleOutsideClick$: QRL<(event: MouseEvent) => void>;
}

export function useDialog(params: UseDialogParams): UseDialogReturn {
  const {
    isOpen: propIsOpen,
    openSignal,
    onClose$,
    onOpen$,
    closeOnEsc = true,
    closeOnOutsideClick = true,
    initialFocus = true,
    trapFocus = true,
    id,
  } = params;

  // Generate a unique ID if not provided
  const autoId = useId();
  const dialogId = id || `dialog-${autoId}`;

  // Controlled state - initialize with proper boolean value
  const initialIsOpen =
    typeof propIsOpen === "boolean"
      ? propIsOpen
      : openSignal
        ? openSignal.value
        : false;
  const isOpenSignal = useSignal<boolean>(initialIsOpen);
  const dialogRef = useSignal<Element | undefined>(undefined);
  const prevActiveElement = useSignal<Element | null>(null);
  const focusableElements = useSignal<HTMLElement[]>([]);
  const mounted = useSignal(false);

  // Forward state changes to callback props
  useTask$(({ track }) => {
    const isOpen = track(() => isOpenSignal.value);
    if (isOpen) {
      onOpen$?.();
    } else if (mounted.value) {
      onClose$?.();
    }
  });

  // Track external isOpen prop changes
  useTask$(({ track }) => {
    if (typeof propIsOpen === "boolean") {
      const externalIsOpen = track(() => propIsOpen);
      isOpenSignal.value = externalIsOpen;
    } else if (propIsOpen) {
      const externalIsOpen = track(() => propIsOpen.value);
      isOpenSignal.value = externalIsOpen;
    }
  });

  // Track external openSignal changes
  useTask$(({ track }) => {
    const signalValue = track(() => openSignal?.value);
    if (openSignal && typeof signalValue === "boolean") {
      isOpenSignal.value = signalValue;
    }
  });

  // Handle close functionality
  const handleClose$ = $(() => {
    isOpenSignal.value = false;
  });

  // Handle clicking outside the dialog
  const handleOutsideClick$ = $((event: MouseEvent) => {
    if (!closeOnOutsideClick) return;

    const target = event.target as HTMLElement;
    const dialog = dialogRef.value as HTMLElement | undefined;

    if (dialog && !dialog.contains(target)) {
      handleClose$();
    }
  });

  // Focus management and body scroll locking
  useVisibleTask$(({ track, cleanup }) => {
    const isOpen = track(() => isOpenSignal.value);

    if (isOpen) {
      // Store the currently focused element to restore focus later
      prevActiveElement.value = document.activeElement;

      // Lock body scroll
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const originalPaddingRight = window.getComputedStyle(
        document.body,
      ).paddingRight;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Find all focusable elements in the dialog
      setTimeout(() => {
        if (dialogRef.value) {
          const elements = dialogRef.value.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

          focusableElements.value = Array.from(elements);

          // Set initial focus if enabled
          if (initialFocus && focusableElements.value.length > 0) {
            focusableElements.value[0].focus();
          } else if (dialogRef.value instanceof HTMLElement) {
            // If no focusable elements, set the dialog itself as focusable
            dialogRef.value.setAttribute("tabindex", "-1");
            dialogRef.value.focus();
          }
        }
      }, 50);

      // Set mounted state to true after first open
      mounted.value = true;

      // Clean up when component is unmounted or dialog closes
      cleanup(() => {
        // Restore body scroll
        document.body.style.overflow = "";
        document.body.style.paddingRight = originalPaddingRight;

        // Restore focus to previously active element
        if (prevActiveElement.value instanceof HTMLElement) {
          prevActiveElement.value.focus();
        }
      });
    }
  });

  // Listen for Escape key press and handle focus trapping
  useOnDocument(
    "keydown",
    $((event: KeyboardEvent) => {
      if (closeOnEsc && isOpenSignal.value && event.key === "Escape") {
        event.preventDefault();
        handleClose$();
      }

      // Handle focus trapping with Tab key
      if (
        trapFocus &&
        isOpenSignal.value &&
        event.key === "Tab" &&
        focusableElements.value.length > 0
      ) {
        const firstElement = focusableElements.value[0];
        const lastElement =
          focusableElements.value[focusableElements.value.length - 1];

        // If shift+tab on first element, move to last element
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        // If tab on last element, move to first element
        else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }),
  );

  return {
    dialogId,
    isOpenSignal,
    dialogRef,
    prevActiveElement,
    focusableElements,
    mounted,
    handleClose$,
    handleOutsideClick$,
  };
}
