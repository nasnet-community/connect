import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL, Signal } from "@builder.io/qwik";

export interface UseSwipeGestureOptions {
  onSwipeLeft?: QRL<() => void>;
  onSwipeRight?: QRL<() => void>;
  onSwipeUp?: QRL<() => void>;
  onSwipeDown?: QRL<() => void>;
  threshold?: number;
  preventScroll?: boolean;
  enabled?: boolean;
}

export interface UseSwipeGestureReturn {
  elementRef: Signal<HTMLElement | undefined>;
  swipeOffset: Signal<{ x: number; y: number }>;
  isDragging: Signal<boolean>;
  swipeDirection: Signal<"left" | "right" | "up" | "down" | null>;
}

export function useSwipeGesture(
  options: UseSwipeGestureOptions = {},
): UseSwipeGestureReturn {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventScroll = true,
    enabled = true,
  } = options;

  const elementRef = useSignal<HTMLElement | undefined>();
  const swipeOffset = useSignal({ x: 0, y: 0 });
  const isDragging = useSignal(false);
  const swipeDirection = useSignal<"left" | "right" | "up" | "down" | null>(
    null,
  );

  const touchStart = useSignal({ x: 0, y: 0 });
  const touchCurrent = useSignal({ x: 0, y: 0 });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => elementRef.value);
    track(() => enabled);

    const element = elementRef.value;
    if (!element || !enabled) return;

    let animationFrameId: number;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!enabled) return;

      isDragging.value = true;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      touchStart.value = { x: startX, y: startY };
      currentX = startX;
      currentY = startY;

      if (preventScroll) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.value || !enabled) return;

      const touch = e.touches[0];
      currentX = touch.clientX;
      currentY = touch.clientY;
      touchCurrent.value = { x: currentX, y: currentY };

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      // Update swipe offset for visual feedback
      animationFrameId = requestAnimationFrame(() => {
        swipeOffset.value = { x: deltaX, y: deltaY };

        // Determine swipe direction
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (absX > absY) {
          swipeDirection.value = deltaX > 0 ? "right" : "left";
        } else {
          swipeDirection.value = deltaY > 0 ? "down" : "up";
        }
      });

      if (preventScroll) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = async (e: TouchEvent) => {
      if (!isDragging.value || !enabled) return;

      isDragging.value = false;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Check if swipe exceeded threshold
      if (absX > threshold || absY > threshold) {
        if (absX > absY) {
          // Horizontal swipe
          if (deltaX > threshold && onSwipeRight) {
            await onSwipeRight();
          } else if (deltaX < -threshold && onSwipeLeft) {
            await onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > threshold && onSwipeDown) {
            await onSwipeDown();
          } else if (deltaY < -threshold && onSwipeUp) {
            await onSwipeUp();
          }
        }
      }

      // Reset offset with animation
      animationFrameId = requestAnimationFrame(() => {
        swipeOffset.value = { x: 0, y: 0 };
        swipeDirection.value = null;
      });

      if (preventScroll) {
        e.preventDefault();
      }
    };

    const handleTouchCancel = () => {
      isDragging.value = false;
      swipeOffset.value = { x: 0, y: 0 };
      swipeDirection.value = null;
    };

    // Add event listeners
    element.addEventListener("touchstart", handleTouchStart, {
      passive: !preventScroll,
    });
    element.addEventListener("touchmove", handleTouchMove, {
      passive: !preventScroll,
    });
    element.addEventListener("touchend", handleTouchEnd, {
      passive: !preventScroll,
    });
    element.addEventListener("touchcancel", handleTouchCancel);

    // Cleanup
    cleanup(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchCancel);
    });
  });

  return {
    elementRef,
    swipeOffset,
    isDragging,
    swipeDirection,
  };
}
