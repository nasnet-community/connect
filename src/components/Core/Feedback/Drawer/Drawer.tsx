import { component$, Slot } from "@builder.io/qwik";
import type { DrawerProps } from "./Drawer.types";
import { useDrawer } from "./useDrawer";
import { useSwipeGestures } from "./useSwipeGestures";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerContent } from "./DrawerContent";
import { DrawerFooter } from "./DrawerFooter";
import {
  getBackdropClasses,
  getSurfaceElevation,
  getMobileDrawerAnimation,
  cn,
} from "../utils/theme";

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
export const Drawer = component$<DrawerProps>(
  ({
    isOpen = false,
    onClose$,
    placement = "right",
    size = "md",
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
    disableAnimation = false,
    class: className,
    // New props
    enableSwipeGestures = true,
    swipeThreshold = 0.4,
    showDragHandle = true,
    backdropBlur = "medium",
    responsiveSize = "md",
    mobileAnimation = true,
  }) => {
    const {
      state,
      drawerRef,
      sizeClass,
      positionClass,
      transformClass,
      handleOverlayClick$,
      handleCloseClick$,
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
      disableAnimation,
      responsiveSize,
      mobileAnimation,
    });

    // Use swipe gestures hook
    const { swipeStyle } = useSwipeGestures({
      isOpen,
      onClose$,
      placement,
      enabled: enableSwipeGestures,
      threshold: swipeThreshold,
      drawerRef,
    });

    // If not open or in the process of closing, don't render anything
    if (!isOpen && !state.isVisible) {
      return null;
    }

    return (
      <div
        class={`fixed inset-0 z-[${zIndex}] overflow-hidden ${isOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
        data-placement={placement}
      >
        {/* Overlay */}
        {hasOverlay && (
          <div
            class={cn(
              "fixed inset-0 transition-opacity duration-300",
              getBackdropClasses(backdropBlur),
              state.isVisible ? "opacity-100" : "opacity-0",
              overlayClass,
            )}
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
          class={cn(
            "fixed flex flex-col",
            positionClass.value,
            sizeClass.value,
            getSurfaceElevation("elevated"),
            !disableAnimation && "transition-transform duration-300",
            state.isMobile && mobileAnimation
              ? getMobileDrawerAnimation(placement, state.isVisible)
              : transformClass,
            // Mobile-specific styles
            ...(state.isMobile &&
              mobileAnimation &&
              placement === "bottom"
              ? [
                  "rounded-t-2xl",
                  "max-h-[90vh]",
                  "overflow-hidden",
                ]
              : []),
            drawerClass,
            className,
          )}
          style={swipeStyle}
          tabIndex={-1}
          data-testid="drawer"
        >
          {/* Drag handle for mobile */}
          {showDragHandle &&
            state.isMobile &&
            (placement === "bottom" || placement === "top") && (
              <div
                class={cn(
                  "absolute left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gray-300 dark:bg-gray-600",
                  placement === "bottom" ? "top-3" : "bottom-3",
                )}
                aria-hidden="true"
              />
            )}
          {/* Drawer Header */}
          <DrawerHeader
            hasCloseButton={hasCloseButton}
            onClose$={handleCloseClick$}
          >
            <Slot name="header" />
          </DrawerHeader>

          {/* Drawer Content */}
          <DrawerContent>
            <Slot />
          </DrawerContent>

          {/* Drawer Footer */}
          <DrawerFooter>
            <Slot name="footer" />
          </DrawerFooter>
        </section>
      </div>
    );
  },
);

export default Drawer;
