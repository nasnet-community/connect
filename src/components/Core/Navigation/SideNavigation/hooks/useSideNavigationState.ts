import { useSignal, $, useOnDocument } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseSideNavigationStateProps {
  isCollapsed?: boolean;
  onToggleCollapse$?: QRL<() => void>;
  isMobileOpen?: boolean;
  onCloseMobile$?: QRL<() => void>;
  enableSwipeGestures?: boolean;
  swipeThreshold?: number;
  onSwipeGesture$?: QRL<(direction: 'left' | 'right', distance: number) => void>;
}

export function useSideNavigationState(props: UseSideNavigationStateProps) {
  const {
    isCollapsed: propIsCollapsed = false,
    onToggleCollapse$,
    isMobileOpen: _isMobileOpen,
    onCloseMobile$,
    enableSwipeGestures = true,
    swipeThreshold = 50,
    onSwipeGesture$,
  } = props;

  // Internal collapsed state (respects the prop value)
  const isCollapsed = useSignal(propIsCollapsed);
  
  // Swipe gesture state
  const swipeState = useSignal({
    isTracking: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
  });

  // Handle collapse toggle
  const handleToggleCollapse$ = $(() => {
    isCollapsed.value = !isCollapsed.value;
    onToggleCollapse$?.();
  });

  // Handle mobile close
  const handleCloseMobile$ = $(() => {
    onCloseMobile$?.();
  });

  // Handle touch start
  const handleTouchStart$ = $((event: TouchEvent) => {
    if (!enableSwipeGestures) return;
    
    const touch = event.touches[0];
    swipeState.value = {
      isTracking: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
    };
  });

  // Handle touch move
  const handleTouchMove$ = $((event: TouchEvent) => {
    if (!enableSwipeGestures || !swipeState.value.isTracking) return;
    
    const touch = event.touches[0];
    const deltaX = touch.clientX - swipeState.value.startX;
    const deltaY = touch.clientY - swipeState.value.startY;
    
    // Only handle horizontal swipes (prevent vertical scrolling interference)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
    }
    
    swipeState.value = {
      ...swipeState.value,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
    };
  });

  // Handle touch end
  const handleTouchEnd$ = $((_event: TouchEvent) => {
    if (!enableSwipeGestures || !swipeState.value.isTracking) return;
    
    const { deltaX, deltaY } = swipeState.value;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Check if it's a horizontal swipe and meets threshold
    if (absDeltaX > absDeltaY && absDeltaX >= swipeThreshold) {
      const direction = deltaX > 0 ? 'right' : 'left';
      onSwipeGesture$?.(direction, absDeltaX);
    }
    
    // Reset swipe state
    swipeState.value = {
      isTracking: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
    };
  });

  // Handle escape key for mobile close
  const handleKeyDown$ = $((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseMobile$();
    }
  });

  // Add keyboard event listener for escape key
  useOnDocument('keydown', handleKeyDown$);

  return {
    isCollapsed,
    swipeState,
    handleToggleCollapse$,
    handleCloseMobile$,
    handleTouchStart$,
    handleTouchMove$,
    handleTouchEnd$,
  };
}
