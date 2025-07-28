import { $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseAlertParams {
  autoCloseDuration?: number;
  onDismiss$?: QRL<() => void>;
}

export interface UseAlertReturn {
  state: {
    isVisible: boolean;
    isMounted: boolean;
  };
  handleDismiss$: QRL<() => void>;
}

export function useAlert({
  autoCloseDuration,
  onDismiss$,
}: UseAlertParams = {}): UseAlertReturn {
  const state = useStore({
    isVisible: true,
    isMounted: false,
  });

  // Handle auto-close functionality
  useVisibleTask$(({ cleanup }) => {
    // Set mounted state for animations
    setTimeout(() => {
      state.isMounted = true;
    }, 10);

    // Setup auto-close timer if duration is provided
    let timerId: number | undefined;
    if (autoCloseDuration && autoCloseDuration > 0) {
      timerId = setTimeout(() => {
        state.isVisible = false;
        onDismiss$?.();
      }, autoCloseDuration) as unknown as number;
    }

    // Clean up timer when component unmounts
    cleanup(() => {
      if (timerId) {
        clearTimeout(timerId);
      }
      state.isMounted = false;
    });
  });

  // Handle dismiss action
  const handleDismiss$ = $(() => {
    state.isVisible = false;
    onDismiss$?.();
  });

  return {
    state,
    handleDismiss$,
  };
}
