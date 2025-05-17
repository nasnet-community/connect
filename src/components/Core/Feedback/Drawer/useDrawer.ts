import { $, useComputed$, useOnDocument, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';
import type { DrawerPlacement, DrawerSize } from './Drawer.types';

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
}

export interface UseDrawerReturn {
  state: {
    isVisible: boolean;
    previousActiveElement: Element | null;
    firstFocusableElement: HTMLElement | null;
    lastFocusableElement: HTMLElement | null;
  };
  drawerRef: ReturnType<typeof useSignal<Element | undefined>>;
  sizeClass: ReturnType<typeof useComputed$<string>>;
  positionClass: string;
  transformClass: string;
  handleOverlayClick$: QRL<(event: MouseEvent) => void>;
  handleCloseClick$: QRL<() => void>;
}

export function useDrawer({
  isOpen,
  onClose$,
  placement = 'right',
  size = 'md',
  customSize,
  closeOnEsc = true,
  trapFocus = true,
  restoreFocus = true,
  blockScroll = true,
  closeOnOverlayClick = true
}: UseDrawerParams): UseDrawerReturn {
  // State for animation and focus management
  const state = useStore({
    isVisible: false,
    previousActiveElement: null as Element | null,
    firstFocusableElement: null as HTMLElement | null,
    lastFocusableElement: null as HTMLElement | null,
  });
  
  // Ref for the drawer
  const drawerRef = useSignal<Element | undefined>();
  
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
        document.body.style.overflow = 'hidden';
      }
      
      // Delay setting visible for animation
      setTimeout(() => {
        state.isVisible = true;
      }, 10);
      
      // Find focusable elements for focus trapping
      if (trapFocus && drawerRef.value) {
        const focusableElements = drawerRef.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          state.firstFocusableElement = focusableElements[0] as HTMLElement;
          state.lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          // Set focus to the first focusable element
          setTimeout(() => {
            // First try to focus a heading, if available
            const heading = drawerRef.value?.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement;
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
        document.body.style.overflow = '';
      }
      
      // Restore focus
      if (restoreFocus && state.previousActiveElement) {
        setTimeout(() => {
          (state.previousActiveElement as HTMLElement)?.focus?.();
        }, 100);
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      if (blockScroll) {
        document.body.style.overflow = '';
      }
    };
  });
  
  // Handle keydown events for accessibility
  useOnDocument(
    'keydown',
    $((event: KeyboardEvent) => {
      if (!isOpen) return;
      
      // Close on Escape key press
      if (closeOnEsc && event.key === 'Escape') {
        event.preventDefault();
        onClose$?.();
      }
      
      // Handle focus trapping
      if (trapFocus && event.key === 'Tab') {
        if (!state.firstFocusableElement || !state.lastFocusableElement) return;
        
        // Shift + Tab
        if (event.shiftKey && document.activeElement === state.firstFocusableElement) {
          event.preventDefault();
          state.lastFocusableElement.focus();
        }
        
        // Tab
        else if (!event.shiftKey && document.activeElement === state.lastFocusableElement) {
          event.preventDefault();
          state.firstFocusableElement.focus();
        }
      }
    })
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
    // Base on placement (horizontal vs vertical)
    const isHorizontal = placement === 'left' || placement === 'right';
    
    if (customSize) {
      return isHorizontal ? `width: ${customSize};` : `height: ${customSize};`;
    }
    
    // Width for left/right placement
    if (isHorizontal) {
      return {
        xs: 'w-xs max-w-[20rem]',
        sm: 'w-sm max-w-[24rem]',
        md: 'w-md max-w-[28rem]',
        lg: 'w-lg max-w-[32rem]',
        xl: 'w-xl max-w-[36rem]',
        full: 'w-full'
      }[size];
    }
    
    // Height for top/bottom placement
    return {
      xs: 'h-xs max-h-[20vh]',
      sm: 'h-sm max-h-[30vh]',
      md: 'h-md max-h-[40vh]',
      lg: 'h-lg max-h-[60vh]',
      xl: 'h-xl max-h-[80vh]',
      full: 'h-full'
    }[size];
  });
  
  // Compute position classes based on placement
  const positionClass = {
    left: 'inset-y-0 left-0',
    right: 'inset-y-0 right-0',
    top: 'inset-x-0 top-0',
    bottom: 'inset-x-0 bottom-0'
  }[placement];
  
  // Compute transform classes for animations
  const transformClass = {
    left: state.isVisible ? 'translate-x-0' : '-translate-x-full',
    right: state.isVisible ? 'translate-x-0' : 'translate-x-full',
    top: state.isVisible ? 'translate-y-0' : '-translate-y-full',
    bottom: state.isVisible ? 'translate-y-0' : 'translate-y-full'
  }[placement];
  
  return {
    state,
    drawerRef,
    sizeClass,
    positionClass,
    transformClass,
    handleOverlayClick$,
    handleCloseClick$
  };
} 