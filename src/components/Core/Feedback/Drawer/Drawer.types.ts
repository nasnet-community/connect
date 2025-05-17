import type { QRL, JSXNode } from '@builder.io/qwik';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

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
  header?: JSXNode;
  footer?: JSXNode;
  disableAnimation?: boolean;
  class?: string;
  children?: JSXNode;
}
