import {
  $,
  useComputed$,
  useOnDocument,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { DrawerPlacement, DrawerSize } from "./Drawer.types";
import type { FeedbackSize } from "../utils/theme";
import {
  getResponsiveSizeClasses,
  getSafeAreaClasses,
  cn,
} from "../utils/theme";

export interface UseDrawerParams {
  isOpen: boolean;
  onClose$?: QRL<() => void>;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  customSize?: string;
  closeOnEsc?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  blockScroll?: boolean;
  closeOnOverlayClick?: boolean;
  disableAnimation?: boolean;
  responsiveSize?: FeedbackSize;
  mobileAnimation?: boolean;
}

export interface UseDrawerReturn {
  state: {
    isVisible: boolean;
    previousActiveElement: Element | null;
    firstFocusableElement: HTMLElement | null;
    lastFocusableElement: HTMLElement | null;
    isMobile: boolean;
  };
  drawerRef: ReturnType<typeof useSignal<Element | undefined>>;
  sizeClass: ReturnType<typeof useComputed$<string>>;
  positionClass: ReturnType<typeof useComputed$<string>>;
  transformClass: string;
  handleOverlayClick$: QRL<(event: MouseEvent) => void>;
  handleCloseClick$: QRL<() => void>;
}

export function useDrawer({
  isOpen,
  onClose$,
  placement = "right",
  size = "md",
  customSize,
  closeOnEsc = true,
  trapFocus = true,
  restoreFocus = true,
  blockScroll = true,
  closeOnOverlayClick = true,
  responsiveSize = "md",
  mobileAnimation = true,
}: UseDrawerParams): UseDrawerReturn {
  // State for animation and focus management
  const state = useStore({
    isVisible: false,
    previousActiveElement: null as Element | null,
    firstFocusableElement: null as HTMLElement | null,
    lastFocusableElement: null as HTMLElement | null,
    isMobile: false,
  });

  // Ref for the drawer
  const drawerRef = useSignal<Element | undefined>();

  // Check if mobile on mount and resize
  useVisibleTask$(() => {
    const checkMobile = () => {
      state.isMobile = window.innerWidth < 768;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  });

  // Handle animation state - wait for drawer to be visible before animating in
  useVisibleTask$(({ track }) => {
    track(() => isOpen);

    if (isOpen) {
      // Store the active element to restore focus later
      if (restoreFocus) {
        state.previousActiveElement = document.activeElement;
      }

      // Block scrolling on the body if needed
      if (blockScroll) {
        document.body.style.overflow = "hidden";
        // Add padding to compensate for scrollbar on desktop
        if (!state.isMobile) {
          const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
          if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
          }
        }
      }

      // Delay setting visible for animation
      setTimeout(() => {
        state.isVisible = true;
      }, 10);

      // Find focusable elements for focus trapping
      if (trapFocus && drawerRef.value) {
        const focusableElements = drawerRef.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length > 0) {
          state.firstFocusableElement = focusableElements[0] as HTMLElement;
          state.lastFocusableElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          // Set focus to the first focusable element
          setTimeout(() => {
            // First try to focus a heading, if available
            const heading = drawerRef.value?.querySelector(
              "h1, h2, h3, h4, h5, h6",
            ) as HTMLElement;
            if (heading) {
              heading.focus();
            } else {
              state.firstFocusableElement?.focus();
            }
          }, 100);
        }
      }
    } else {
      // Start closing animation
      state.isVisible = false;

      // Reset scroll blocking
      if (blockScroll) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }

      // Restore focus
      if (restoreFocus && state.previousActiveElement) {
        setTimeout(() => {
          (state.previousActiveElement as HTMLElement).focus();
        }, 100);
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (blockScroll) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
  });

  // Handle keydown events for accessibility
  useOnDocument(
    "keydown",
    $((event: KeyboardEvent) => {
      if (!isOpen) return;

      // Close on Escape key press
      if (closeOnEsc && event.key === "Escape") {
        event.preventDefault();
        onClose$?.();
      }

      // Handle focus trapping
      if (trapFocus && event.key === "Tab") {
        if (!state.firstFocusableElement || !state.lastFocusableElement) return;

        // Shift + Tab
        if (
          event.shiftKey &&
          document.activeElement === state.firstFocusableElement
        ) {
          event.preventDefault();
          state.lastFocusableElement.focus();
        }

        // Tab
        else if (
          !event.shiftKey &&
          document.activeElement === state.lastFocusableElement
        ) {
          event.preventDefault();
          state.firstFocusableElement.focus();
        }
      }
    }),
  );

  // Handle overlay click
  const handleOverlayClick$ = $((event: MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose$?.();
    }
  });

  // Handle close button click
  const handleCloseClick$ = $(() => {
    onClose$?.();
  });

  // Compute drawer size classes based on placement and size
  const sizeClass = useComputed$(() => {
    // Use responsive size classes from theme for mobile
    if (state.isMobile && responsiveSize) {
      return getResponsiveSizeClasses(responsiveSize, "drawer");
    }

    // Base on placement (horizontal vs vertical)
    const isHorizontal = placement === "left" || placement === "right";

    if (customSize) {
      return isHorizontal ? `width: ${customSize};` : `height: ${customSize};`;
    }

    // Width for left/right placement
    if (isHorizontal) {
      return {
        xs: "w-64 max-w-[16rem]",
        sm: "w-80 max-w-[20rem]",
        md: "w-96 max-w-[24rem]",
        lg: "w-[28rem] max-w-[28rem]",
        xl: "w-[32rem] max-w-[32rem]",
        full: "w-full",
      }[size];
    }

    // Height for top/bottom placement
    return {
      xs: "h-32 max-h-[8rem]",
      sm: "h-48 max-h-[12rem]",
      md: "h-64 max-h-[16rem]",
      lg: "h-96 max-h-[24rem]",
      xl: "h-[32rem] max-h-[32rem]",
      full: "h-full",
    }[size];
  });

  // Compute position classes based on placement
  const positionClass = useComputed$(() => {
    // On mobile, bottom drawers should account for safe areas
    if (state.isMobile && mobileAnimation && placement === "bottom") {
      return cn("inset-x-0 bottom-0", getSafeAreaClasses("bottom"));
    }

    return {
      left: "inset-y-0 left-0",
      right: "inset-y-0 right-0",
      top: "inset-x-0 top-0",
      bottom: "inset-x-0 bottom-0",
    }[placement];
  });

  // Compute transform classes for animations
  const transformClass = {
    left: state.isVisible ? "translate-x-0" : "-translate-x-full",
    right: state.isVisible ? "translate-x-0" : "translate-x-full",
    top: state.isVisible ? "translate-y-0" : "-translate-y-full",
    bottom: state.isVisible ? "translate-y-0" : "translate-y-full",
  }[placement];

  return {
    state,
    drawerRef,
    sizeClass,
    positionClass,
    transformClass,
    handleOverlayClick$,
    handleCloseClick$,
  };
}
