import { component$, Slot } from '@builder.io/qwik';
import type { DrawerProps } from './Drawer.types';
import { useDrawer } from './useDrawer';
import { DrawerHeader } from './DrawerHeader';
import { DrawerContent } from './DrawerContent';
import { DrawerFooter } from './DrawerFooter';

/**
 * Drawer component for sliding panels that appear from the edge of the screen.
 * 
 * Designed with accessibility as a priority:
 * - Manages focus properly when opened and closed
 * - Uses appropriate ARIA roles and attributes
 * - Supports keyboard navigation (Escape to close)
 * - Traps focus within the drawer when open
 * 
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={isDrawerOpen.value}
 *   onClose$={() => isDrawerOpen.value = false}
 *   placement="right"
 *   size="md"
 * >
 *   <div q:slot="header">Drawer Title</div>
 *   <div>Drawer content goes here</div>
 *   <div q:slot="footer">
 *     <button>Cancel</button>
 *     <button>Save</button>
 *   </div>
 * </Drawer>
 * ```
 */
export const Drawer = component$<DrawerProps>(({
  isOpen = false,
  onClose$,
  placement = 'right',
  size = 'md',
  hasOverlay = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  trapFocus = true,
  restoreFocus = true,
  blockScroll = true,
  zIndex = 1000,
  customSize,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  drawerClass,
  overlayClass,
  id,
  hasCloseButton = true,
  header,
  footer,
  children,
  disableAnimation = false,
  class: className,
}) => {
  const {
    state,
    drawerRef,
    sizeClass,
    positionClass,
    transformClass,
    handleOverlayClick$,
    handleCloseClick$
  } = useDrawer({
    isOpen,
    onClose$,
    placement,
    size,
    customSize,
    closeOnEsc,
    trapFocus,
    restoreFocus,
    blockScroll,
    closeOnOverlayClick,
    disableAnimation
  });
  
  // If not open or in the process of closing, don't render anything
  if (!isOpen && !state.isVisible) {
    return null;
  }
  
  return (
    <div
      class={`fixed inset-0 z-[${zIndex}] overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
      data-placement={placement}
    >
      {/* Overlay */}
      {hasOverlay && (
        <div
          class={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            state.isVisible ? 'opacity-100' : 'opacity-0'
          } ${overlayClass || ''}`}
          onClick$={handleOverlayClick$}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <section
        id={id}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        class={`fixed ${positionClass} ${sizeClass.value} bg-white dark:bg-gray-800 shadow-xl flex flex-col ${
          disableAnimation ? '' : 'transition-transform duration-300'
        } ${transformClass} ${drawerClass || ''} ${className || ''}`}
        tabIndex={-1}
        data-testid="drawer"
      >
        {/* Drawer Header */}
        {(header || hasCloseButton) && (
          <DrawerHeader 
            hasCloseButton={hasCloseButton} 
            onClose$={handleCloseClick$}
          >
            {header}
            <Slot name="header" />
          </DrawerHeader>
        )}
        
        {/* Drawer Content */}
        <DrawerContent>
          {children}
          <Slot />
        </DrawerContent>
        
        {/* Drawer Footer */}
        {footer && (
          <DrawerFooter>
            {footer}
            <Slot name="footer" />
          </DrawerFooter>
        )}
      </section>
    </div>
  );
});

export default Drawer;
