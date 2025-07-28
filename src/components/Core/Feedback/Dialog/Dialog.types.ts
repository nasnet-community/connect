import type { QRL, Signal } from "@builder.io/qwik";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogProps {
  isOpen?: boolean | Signal<boolean>;
  openSignal?: Signal<boolean>;
  onClose$?: QRL<() => void>;
  onOpen$?: QRL<() => void>;
  size?: DialogSize;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  hasCloseButton?: boolean;
  initialFocus?: boolean;
  trapFocus?: boolean;
  ariaLabel?: string;
  closeButtonAriaLabel?: string;
  isCentered?: boolean;
  disableAnimation?: boolean;
  scrollable?: boolean;
  hasBackdrop?: boolean;
  class?: string;
  contentClass?: string;
  backdropClass?: string;
  zIndex?: number;
  ariaDescription?: string;
  id?: string;
  title?: string;
  children?: any;
  fullscreenOnMobile?: boolean;
  backdropVariant?: "light" | "medium" | "heavy";
  elevation?: "base" | "elevated" | "depressed";
  mobileBreakpoint?: "mobile" | "tablet";
}

export interface DialogHeaderProps {
  hasCloseButton?: boolean;
  closeButtonAriaLabel?: string;
  class?: string;
  onClose$?: QRL<() => void>;
  children?: any;
}

export interface DialogBodyProps {
  scrollable?: boolean;
  class?: string;
  children?: any;
}

export interface DialogFooterProps {
  class?: string;
  children?: any;
}
