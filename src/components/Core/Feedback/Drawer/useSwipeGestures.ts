import { $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { DrawerPlacement, SwipeGestureState } from "./Drawer.types";

export interface UseSwipeGesturesParams {
  isOpen: boolean;
  onClose$?: QRL<() => void>;
  placement: DrawerPlacement;
  enabled?: boolean;
  threshold?: number;
  drawerRef: { value: Element | undefined };
}

export interface UseSwipeGesturesReturn {
  swipeState: SwipeGestureState;
  swipeStyle: string;
  handleTouchStart$: QRL<(event: TouchEvent) => void>;
  handleTouchMove$: QRL<(event: TouchEvent) => void>;
  handleTouchEnd$: QRL<(event: TouchEvent) => void>;
}

const VELOCITY_THRESHOLD = 0.5;
const DEFAULT_THRESHOLD = 0.4; // 40% of drawer width/height

export function useSwipeGestures({
  isOpen,
  onClose$,
  placement,
  enabled = true,
  threshold = DEFAULT_THRESHOLD,
  drawerRef,
}: UseSwipeGesturesParams): UseSwipeGesturesReturn {
  const swipeState = useStore<SwipeGestureState>({
    isSwping: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    direction: null,
    velocity: 0,
  });

  const timeState = useStore({
    startTime: 0,
  });

  const getSwipeDirection$ = $((deltaX: number, deltaY: number) => {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > absY) {
      return deltaX > 0 ? "right" : "left";
    } else {
      return deltaY > 0 ? "down" : "up";
    }
  });

  const shouldAllowSwipe$ = $((direction: "left" | "right" | "up" | "down") => {
    // Allow swipe to close based on drawer placement
    switch (placement) {
      case "left":
        return direction === "left";
      case "right":
        return direction === "right";
      case "top":
        return direction === "up";
      case "bottom":
        return direction === "down";
      default:
        return false;
    }
  });

  const handleTouchStart$ = $((event: TouchEvent) => {
    if (!enabled || !isOpen) return;

    const touch = event.touches[0];
    swipeState.isSwping = true;
    swipeState.startX = touch.clientX;
    swipeState.startY = touch.clientY;
    swipeState.currentX = touch.clientX;
    swipeState.currentY = touch.clientY;
    swipeState.deltaX = 0;
    swipeState.deltaY = 0;
    swipeState.velocity = 0;
    timeState.startTime = Date.now();
  });

  const handleTouchMove$ = $(async (event: TouchEvent) => {
    if (!swipeState.isSwping || !enabled || !isOpen) return;

    const touch = event.touches[0];
    swipeState.currentX = touch.clientX;
    swipeState.currentY = touch.clientY;
    swipeState.deltaX = touch.clientX - swipeState.startX;
    swipeState.deltaY = touch.clientY - swipeState.startY;

    const direction = await getSwipeDirection$(swipeState.deltaX, swipeState.deltaY);
    swipeState.direction = direction;

    // Prevent default scrolling if swiping in the direction to close
    if (await shouldAllowSwipe$(direction)) {
      event.preventDefault();
    }

    // Calculate velocity
    const elapsedTime = Date.now() - timeState.startTime;
    if (elapsedTime > 0) {
      const distance =
        placement === "left" || placement === "right"
          ? Math.abs(swipeState.deltaX)
          : Math.abs(swipeState.deltaY);
      swipeState.velocity = distance / elapsedTime;
    }
  });

  const handleTouchEnd$ = $(async () => {
    if (!swipeState.isSwping || !enabled || !isOpen) return;

    const drawerElement = drawerRef.value as HTMLElement;
    if (!drawerElement) return;

    const isHorizontal = placement === "left" || placement === "right";
    const dimension = isHorizontal
      ? drawerElement.offsetWidth
      : drawerElement.offsetHeight;
    const delta = isHorizontal
      ? Math.abs(swipeState.deltaX)
      : Math.abs(swipeState.deltaY);

    // Check if swipe distance or velocity is enough to close
    const thresholdMet = delta > dimension * threshold;
    const velocityMet = swipeState.velocity > VELOCITY_THRESHOLD;

    if (
      swipeState.direction &&
      await shouldAllowSwipe$(swipeState.direction) &&
      (thresholdMet || velocityMet)
    ) {
      if (onClose$) {
        onClose$();
      }
    }

    // Reset swipe state
    swipeState.isSwping = false;
    swipeState.deltaX = 0;
    swipeState.deltaY = 0;
    swipeState.velocity = 0;
    swipeState.direction = null;
  });

  // Compute transform style based on swipe progress
  const swipeStyle = (() => {
    if (!swipeState.isSwping || !swipeState.direction) return "";

    let transform = "";
    const progress = (() => {
      switch (placement) {
        case "left":
          return swipeState.direction === "left"
            ? Math.min(0, swipeState.deltaX)
            : 0;
        case "right":
          return swipeState.direction === "right"
            ? Math.max(0, swipeState.deltaX)
            : 0;
        case "top":
          return swipeState.direction === "up"
            ? Math.min(0, swipeState.deltaY)
            : 0;
        case "bottom":
          return swipeState.direction === "down"
            ? Math.max(0, swipeState.deltaY)
            : 0;
        default:
          return 0;
      }
    })();

    if (progress !== 0) {
      const axis = placement === "left" || placement === "right" ? "X" : "Y";
      transform = `translate${axis}(${progress}px)`;
    }

    return transform ? `transform: ${transform};` : "";
  })();

  // Add passive touch event listeners
  useVisibleTask$(({ track }) => {
    track(() => isOpen);
    track(() => enabled);

    if (!isOpen || !enabled || !drawerRef.value) return;

    const element = drawerRef.value as HTMLElement;

    // Add touch event listeners with passive option for better performance
    const options = { passive: false };
    element.addEventListener("touchstart", handleTouchStart$ as any, options);
    element.addEventListener("touchmove", handleTouchMove$ as any, options);
    element.addEventListener("touchend", handleTouchEnd$ as any, options);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart$ as any);
      element.removeEventListener("touchmove", handleTouchMove$ as any);
      element.removeEventListener("touchend", handleTouchEnd$ as any);
    };
  });

  return {
    swipeState,
    swipeStyle,
    handleTouchStart$,
    handleTouchMove$,
    handleTouchEnd$,
  };
}
