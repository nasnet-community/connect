import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseToastItemParams {
  id: string;
  duration?: number;
  persistent?: boolean;
  onDismiss$?: QRL<(id: string) => void>;
}

export interface UseToastItemReturn {
  isVisible: { value: boolean };
  isMounted: { value: boolean };
  progress: { value: number };
  progressIntervalId: { value: number | undefined };
  dismissToast: QRL<() => void>;
  handleMouseEnter: QRL<() => void>;
  handleMouseLeave: QRL<() => void>;
}

export function useToastItem({
  id,
  duration = 0,
  persistent = false,
  onDismiss$,
}: UseToastItemParams): UseToastItemReturn {
  const isVisible = useSignal(true);
  const isMounted = useSignal(false);
  const progress = useSignal(100);
  const progressIntervalId = useSignal<number | undefined>(undefined);

  // Set up auto-dismiss timer if not persistent
  useVisibleTask$(({ cleanup }) => {
    // Set component as mounted for animation
    setTimeout(() => {
      isMounted.value = true;
    }, 10);

    let dismissTimerId: number | undefined;
    let progressTimerId: number | undefined;

    // Only set up auto-dismiss if duration is provided and toast is not persistent
    if (duration && duration > 0 && !persistent) {
      // Set up progress bar
      const updateInterval = 10; // Update every 10ms
      const decrementPerStep = 100 / (duration / updateInterval);

      progressTimerId = setInterval(() => {
        progress.value = Math.max(0, progress.value - decrementPerStep);
      }, updateInterval) as unknown as number;

      progressIntervalId.value = progressTimerId;

      // Set up auto-dismiss
      dismissTimerId = setTimeout(() => {
        dismissToast();
      }, duration) as unknown as number;
    }

    // Cleanup timers on unmount
    cleanup(() => {
      if (dismissTimerId) clearTimeout(dismissTimerId);
      if (progressTimerId) clearInterval(progressTimerId);
      isMounted.value = false;
    });
  });

  // Function to dismiss the toast
  const dismissToast = $(() => {
    isVisible.value = false;
    // Clear progress interval if it exists
    if (progressIntervalId.value) {
      clearInterval(progressIntervalId.value);
    }
    // Call the onDismiss callback if provided
    onDismiss$?.(id);
  });

  // Pause progress when hovering
  const handleMouseEnter = $(() => {
    if (progressIntervalId.value) {
      clearInterval(progressIntervalId.value);
      progressIntervalId.value = undefined;
    }
  });

  // Resume progress when no longer hovering
  const handleMouseLeave = $(() => {
    // Only resume if not persistent and duration is set
    if (!persistent && duration && duration > 0 && progress.value > 0) {
      const updateInterval = 10; // Update every 10ms
      const decrementPerStep = 100 / (duration / updateInterval);

      const intervalId = setInterval(() => {
        progress.value = Math.max(0, progress.value - decrementPerStep);
        if (progress.value <= 0) {
          clearInterval(intervalId);
          dismissToast();
        }
      }, updateInterval) as unknown as number;

      progressIntervalId.value = intervalId;
    }
  });

  return {
    isVisible,
    isMounted,
    progress,
    progressIntervalId,
    dismissToast,
    handleMouseEnter,
    handleMouseLeave,
  };
}
