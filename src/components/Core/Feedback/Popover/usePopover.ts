import {
  useSignal,
  useStore,
  useVisibleTask$,
  useOnDocument,
  $,
  useId,
  useTask$,
  createContextId,
  type Signal,
  type QRL,
} from "@builder.io/qwik";
import type { PopoverProps, PopoverPlacement } from "./Popover.types";

// Create context for sharing popover state across components
export const PopoverContext = createContextId<PopoverState>(
  "connect.popover-context",
);

export interface PopoverState {
  isOpen: Signal<boolean>;
  popoverId: string;
  triggerRef: Signal<Element | undefined>;
  contentRef: Signal<Element | undefined>;
  arrowRef: Signal<Element | undefined>;
  placement: PopoverPlacement;
  togglePopover: QRL<() => void>;
  closePopover: QRL<() => void>;
  openPopover: QRL<() => void>;
}

export interface UsePopoverReturn {
  state: PopoverState;
  timers: {
    open: number | undefined;
    close: number | undefined;
  };
  handleTriggerHover$: QRL<() => void>;
  handleTriggerLeave$: QRL<() => void>;
  handleContentHover$: QRL<() => void>;
  handleContentLeave$: QRL<() => void>;
  positionPopover$: QRL<() => void>;
}

export function usePopover(props: PopoverProps): UsePopoverReturn {
  const {
    isOpen: propIsOpen,
    openSignal,
    placement = "bottom",
    trigger = "click",
    offset = 8,
    closeOnOutsideClick = true,
    closeOnEsc = true,
    openDelay = 200,
    closeDelay = 200,
    hasArrow = true,
    gapInPx = 8,
    popoverId: providedPopoverId,
    onOpen$,
    onClose$,
  } = props;

  // Generate a unique ID if not provided
  const autoId = useId();
  const popoverId = providedPopoverId || `popover-${autoId}`;

  // Set up signals
  const isOpenSignal = useSignal<boolean>(
    propIsOpen === true || (openSignal && openSignal.value === true) || false,
  );
  const triggerRef = useSignal<Element | undefined>(undefined);
  const contentRef = useSignal<Element | undefined>(undefined);
  const arrowRef = useSignal<Element | undefined>(undefined);

  // Open/close timers for hover trigger
  const timers = useStore({
    open: undefined as number | undefined,
    close: undefined as number | undefined,
  });

  // Handle external isOpen prop changes
  useTask$(({ track }) => {
    const isOpenProp = track(() => propIsOpen);
    if (isOpenProp !== undefined) {
      isOpenSignal.value = !!isOpenProp;
    }
  });

  // Handle external openSignal changes
  useTask$(({ track }) => {
    const signalValue = track(() => openSignal?.value);
    if (openSignal && signalValue !== undefined) {
      isOpenSignal.value = signalValue;
    }
  });

  // Create state object for context
  const popoverState = useStore<PopoverState>({
    isOpen: isOpenSignal,
    popoverId,
    triggerRef,
    contentRef,
    arrowRef,
    placement,

    togglePopover: $(() => {
      isOpenSignal.value = !isOpenSignal.value;
      if (isOpenSignal.value) {
        onOpen$?.();
      } else {
        onClose$?.();
      }
    }),

    closePopover: $(() => {
      isOpenSignal.value = false;
      onClose$?.();
    }),

    openPopover: $(() => {
      isOpenSignal.value = true;
      onOpen$?.();
    }),
  });

  // Listen for Escape key press
  useOnDocument(
    "keydown",
    $((e: KeyboardEvent) => {
      if (closeOnEsc && isOpenSignal.value && e.key === "Escape") {
        e.preventDefault();
        popoverState.closePopover();
      }
    }),
  );

  // Handle click outside
  useOnDocument(
    "click",
    $((e: MouseEvent) => {
      if (!isOpenSignal.value || !closeOnOutsideClick) return;

      const target = e.target as Node;
      if (
        triggerRef.value &&
        contentRef.value &&
        !triggerRef.value.contains(target) &&
        !contentRef.value.contains(target)
      ) {
        popoverState.closePopover();
      }
    }),
  );

  // Position the popover
  const positionPopover$ = $(() => {
    const triggerEl = triggerRef.value as HTMLElement | undefined;
    const contentEl = contentRef.value as HTMLElement | undefined;
    const arrowEl = arrowRef.value as HTMLElement | undefined;

    if (!triggerEl || !contentEl || !isOpenSignal.value) return;

    // Position logic
    const triggerRect = triggerEl.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();

    // Default positions for arrow
    let arrowTop = 0;
    let arrowLeft = 0;

    // Calculate position based on placement
    let top = 0;
    let left = 0;
    const totalOffset = offset + gapInPx;

    switch (placement) {
      case "top":
        top = triggerRect.top - contentRect.height - totalOffset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        arrowLeft = contentRect.width / 2;
        arrowTop = contentRect.height;
        break;
      case "top-start":
        top = triggerRect.top - contentRect.height - totalOffset;
        left = triggerRect.left;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        arrowTop = contentRect.height;
        break;
      case "top-end":
        top = triggerRect.top - contentRect.height - totalOffset;
        left = triggerRect.right - contentRect.width;
        arrowLeft = contentRect.width - Math.min(triggerRect.width / 2, 20);
        arrowTop = contentRect.height;
        break;
      case "bottom":
        top = triggerRect.bottom + totalOffset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        arrowLeft = contentRect.width / 2;
        arrowTop = -8; // Arrow height
        break;
      case "bottom-start":
        top = triggerRect.bottom + totalOffset;
        left = triggerRect.left;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        arrowTop = -8;
        break;
      case "bottom-end":
        top = triggerRect.bottom + totalOffset;
        left = triggerRect.right - contentRect.width;
        arrowLeft = contentRect.width - Math.min(triggerRect.width / 2, 20);
        arrowTop = -8;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - totalOffset;
        arrowLeft = contentRect.width;
        arrowTop = contentRect.height / 2;
        break;
      case "left-start":
        top = triggerRect.top;
        left = triggerRect.left - contentRect.width - totalOffset;
        arrowLeft = contentRect.width;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        break;
      case "left-end":
        top = triggerRect.bottom - contentRect.height;
        left = triggerRect.left - contentRect.width - totalOffset;
        arrowLeft = contentRect.width;
        arrowTop = contentRect.height - Math.min(triggerRect.height / 2, 20);
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + totalOffset;
        arrowLeft = -8;
        arrowTop = contentRect.height / 2;
        break;
      case "right-start":
        top = triggerRect.top;
        left = triggerRect.right + totalOffset;
        arrowLeft = -8;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        break;
      case "right-end":
        top = triggerRect.bottom - contentRect.height;
        left = triggerRect.right + totalOffset;
        arrowLeft = -8;
        arrowTop = contentRect.height - Math.min(triggerRect.height / 2, 20);
        break;
    }

    // Apply positions
    contentEl.style.top = `${top + window.scrollY}px`;
    contentEl.style.left = `${left + window.scrollX}px`;

    // Position arrow if needed
    if (arrowEl && hasArrow) {
      arrowEl.style.top = `${arrowTop}px`;
      arrowEl.style.left = `${arrowLeft}px`;

      // Set arrow direction based on placement
      const arrowClasses = [
        "popover-arrow",
        `arrow-${placement.split("-")[0]}`,
      ];

      arrowEl.className = "";
      arrowClasses.forEach((cls) => arrowEl.classList.add(cls));
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => isOpenSignal.value);
    track(() => placement);
    track(() => triggerRef.value);
    track(() => contentRef.value);
    track(() => arrowRef.value);

    positionPopover$();
  });

  // Focus management
  useVisibleTask$(({ track }) => {
    const isOpen = track(() => isOpenSignal.value);
    const content = contentRef.value as HTMLElement | undefined;

    if (isOpen && content) {
      // Find the first focusable element
      const focusableElements = content.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length > 0) {
        // Focus the first focusable element
        (focusableElements[0] as HTMLElement).focus();
      } else {
        // If no focusable elements, focus the content itself
        content.setAttribute("tabindex", "-1");
        content.focus();
      }
    }
  });

  // Track hover events for trigger type "hover"
  const handleTriggerHover$ = $(() => {
    if (trigger !== "hover") return;

    // Clear any existing timers
    if (timers.close) {
      clearTimeout(timers.close);
      timers.close = undefined;
    }

    if (!isOpenSignal.value) {
      timers.open = setTimeout(() => {
        popoverState.openPopover();
      }, openDelay) as unknown as number;
    }
  });

  const handleTriggerLeave$ = $(() => {
    if (trigger !== "hover") return;

    // Clear any existing timers
    if (timers.open) {
      clearTimeout(timers.open);
      timers.open = undefined;
    }

    timers.close = setTimeout(() => {
      popoverState.closePopover();
    }, closeDelay) as unknown as number;
  });

  const handleContentHover$ = $(() => {
    if (trigger !== "hover") return;

    // Clear close timer when hovering content
    if (timers.close) {
      clearTimeout(timers.close);
      timers.close = undefined;
    }
  });

  const handleContentLeave$ = $(() => {
    if (trigger !== "hover") return;

    timers.close = setTimeout(() => {
      popoverState.closePopover();
    }, closeDelay) as unknown as number;
  });

  // Clean up timers
  useVisibleTask$(({ cleanup }) => {
    cleanup(() => {
      if (timers.open) clearTimeout(timers.open);
      if (timers.close) clearTimeout(timers.close);
    });
  });

  return {
    state: popoverState,
    timers,
    handleTriggerHover$,
    handleTriggerLeave$,
    handleContentHover$,
    handleContentLeave$,
    positionPopover$,
  };
}
