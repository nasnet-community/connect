import { useSignal, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseErrorMessageParams {
  initialMessage?: string;
  initialVisible?: boolean;
  autoHideDuration?: number;
  onHide$?: QRL<() => void>;
}

export interface UseErrorMessageReturn {
  message: { value: string };
  visible: { value: boolean };
  setMessage$: QRL<(msg: string) => void>;
  showError$: QRL<(msg: string) => void>;
  hideError$: QRL<() => void>;
}

/**
 * Hook for managing error message state with optional auto-hide functionality
 */
export function useErrorMessage({
  initialMessage = "",
  initialVisible = false,
  autoHideDuration = 0,
  onHide$,
}: UseErrorMessageParams = {}): UseErrorMessageReturn {
  // State for the error message and visibility
  const message = useSignal<string>(initialMessage);
  const visible = useSignal<boolean>(initialVisible);
  const timeoutId = useSignal<number | undefined>(undefined);

  // Set the error message
  const setMessage$ = $((msg: string) => {
    message.value = msg;
  });

  // Hide the error message
  const hideError$ = $(() => {
    visible.value = false;

    // Clear any existing timeout
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = undefined;
    }

    // Call the onHide callback if provided
    onHide$?.();
  });

  // Show an error message
  const showError$ = $((msg: string) => {
    // Clear any existing timeout
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = undefined;
    }

    // Set the message and make it visible
    message.value = msg;
    visible.value = true;

    // Set up auto-hide if duration is provided
    if (autoHideDuration && autoHideDuration > 0) {
      timeoutId.value = setTimeout(() => {
        hideError$();
      }, autoHideDuration) as unknown as number;
    }
  });

  return {
    message,
    visible,
    setMessage$,
    showError$,
    hideError$,
  };
}
