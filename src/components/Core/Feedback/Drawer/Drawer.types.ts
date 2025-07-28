import type { QRL } from "@builder.io/qwik";
import type { FeedbackSize } from "../utils/theme";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps {
  isOpen?: boolean;
  onClose$?: QRL<() => void>;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  hasOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  blockScroll?: boolean;
  zIndex?: number;
  customSize?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  drawerClass?: string;
  overlayClass?: string;
  id?: string;
  hasCloseButton?: boolean;
  disableAnimation?: boolean;
  class?: string;
  // New props for enhanced mobile experience
  enableSwipeGestures?: boolean;
  swipeThreshold?: number;
  showDragHandle?: boolean;
  backdropBlur?: "light" | "medium" | "heavy";
  responsiveSize?: FeedbackSize;
  mobileAnimation?: boolean;
}

export interface SwipeGestureState {
  isSwping: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  direction: "left" | "right" | "up" | "down" | null;
  velocity: number;
}
