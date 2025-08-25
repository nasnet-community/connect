import { component$, useSignal, $ } from "@builder.io/qwik";
import type { JSXChildren, QRL } from "@builder.io/qwik";

interface TouchGestureProps {
  children?: JSXChildren;
  onSwipeLeft$?: QRL<() => void>;
  onSwipeRight$?: QRL<() => void>;
  onSwipeUp$?: QRL<() => void>;
  onSwipeDown$?: QRL<() => void>;
  onPinch$?: QRL<(scale: number) => void>;
  onLongPress$?: QRL<() => void>;
  longPressDelay?: number;
  swipeThreshold?: number;
  class?: string;
}

/**
 * Touch gesture handler component for mobile interactions
 */
export const TouchGesture = component$<TouchGestureProps>((props) => {
  const {
    children,
    onSwipeLeft$,
    onSwipeRight$,
    onSwipeUp$,
    onSwipeDown$,
    onPinch$,
    onLongPress$,
    longPressDelay = 500,
    swipeThreshold = 50,
    class: className = "",
  } = props;

  const touchStart = useSignal<{ x: number; y: number; time: number } | null>(
    null,
  );
  const longPressTimer = useSignal<number | null>(null);
  const initialPinchDistance = useSignal<number | null>(null);

  // Calculate distance between two touches
  const getTouchDistance$ = $((touches: TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2),
    );
  });

  const handleTouchStart$ = $(async (event: TouchEvent) => {
    const touch = event.touches[0];

    if (event.touches.length === 1) {
      // Single touch - track for swipe and long press
      touchStart.value = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };

      // Start long press timer
      if (onLongPress$) {
        longPressTimer.value = window.setTimeout(async () => {
          if (onLongPress$) {
            await onLongPress$();
          }
          longPressTimer.value = null;
        }, longPressDelay);
      }
    } else if (event.touches.length === 2 && onPinch$) {
      // Two touches - track for pinch
      initialPinchDistance.value = await getTouchDistance$(event.touches);

      // Clear long press timer for multi-touch
      if (longPressTimer.value) {
        window.clearTimeout(longPressTimer.value);
        longPressTimer.value = null;
      }
    }
  });

  const handleTouchMove$ = $(async (event: TouchEvent) => {
    // Clear long press timer on move
    if (longPressTimer.value) {
      window.clearTimeout(longPressTimer.value);
      longPressTimer.value = null;
    }

    if (event.touches.length === 2 && onPinch$ && initialPinchDistance.value) {
      // Handle pinch gesture
      event.preventDefault();
      const currentDistance = await getTouchDistance$(event.touches);
      const scale = currentDistance / initialPinchDistance.value;
      if (onPinch$) {
        await onPinch$(scale);
      }
    }
  });

  const handleTouchEnd$ = $(async (event: TouchEvent) => {
    // Clear long press timer
    if (longPressTimer.value) {
      window.clearTimeout(longPressTimer.value);
      longPressTimer.value = null;
    }

    if (!touchStart.value || event.touches.length > 0) {
      touchStart.value = null;
      initialPinchDistance.value = null;
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.value.x;
    const deltaY = touch.clientY - touchStart.value.y;
    const deltaTime = Date.now() - touchStart.value.time;

    // Reset pinch tracking
    initialPinchDistance.value = null;

    // Check if it's a swipe (fast movement over threshold)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const isSwipe = distance > swipeThreshold && deltaTime < 300;

    if (isSwipe) {
      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight$) {
          await onSwipeRight$();
        } else if (deltaX < 0 && onSwipeLeft$) {
          await onSwipeLeft$();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown$) {
          await onSwipeDown$();
        } else if (deltaY < 0 && onSwipeUp$) {
          await onSwipeUp$();
        }
      }
    }

    touchStart.value = null;
  });

  return (
    <div
      class={["touch-manipulation", "select-none", className]
        .filter(Boolean)
        .join(" ")}
      onTouchStart$={handleTouchStart$}
      onTouchMove$={handleTouchMove$}
      onTouchEnd$={handleTouchEnd$}
    >
      {children}
    </div>
  );
});
