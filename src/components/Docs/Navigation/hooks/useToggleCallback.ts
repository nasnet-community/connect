import type { PropFunction } from "@builder.io/qwik";
import { $, useSignal } from "@builder.io/qwik";

/**
 * Hook to safely handle callback functions in Qwik
 * @param callback The callback function to wrap
 * @returns A function that safely calls the callback
 */
export function useToggleCallback(callback?: PropFunction<() => void>) {
  // Create a signal to store a reference to the function
  const callbackExists = useSignal(!!callback);

  // Create a wrapper function that captures the callback in closure
  const execute$ = $(() => {
    if (callback && callbackExists.value) {
      callback();
    }
  });

  return execute$;
}
