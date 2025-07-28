import type { QRL, Signal } from "@builder.io/qwik";

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export type PopoverTrigger = "click" | "hover" | "focus" | "manual";
export type PopoverSize = "sm" | "md" | "lg";

export interface PopoverProps {
  isOpen?: boolean | Signal<boolean>;
  openSignal?: Signal<boolean>;
  onOpen$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  size?: PopoverSize;
  hasArrow?: boolean;
  offset?: number;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  usePortal?: boolean;
  openDelay?: number;
  closeDelay?: number;
  id?: string;
  ariaLabel?: string;
  class?: string;
  contentClass?: string;
  triggerClass?: string;
  disableAnimation?: boolean;
  gapInPx?: number;
  zIndex?: number;
  popoverId?: string;
  children?: any;
  /** Enable mobile fullscreen mode for small screens */
  mobileFullscreen?: boolean;
  /** Enable touch-optimized interaction areas */
  touchOptimized?: boolean;
  /** Surface elevation level for consistent styling */
  surfaceElevation?: "base" | "elevated" | "depressed";
  /** Animation type for popover entrance */
  animationType?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleUp";
}

export interface PopoverTriggerProps {
  class?: string;
  disabled?: boolean;
  ariaLabel?: string;
  children?: any;
}

export interface PopoverContentProps {
  class?: string;
  ariaLabel?: string;
  children?: any;
}

export interface PopoverArrowProps {
  class?: string;
}
