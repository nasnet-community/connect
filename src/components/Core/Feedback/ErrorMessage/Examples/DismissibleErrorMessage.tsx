import { component$, useSignal, $ } from "@builder.io/qwik";
import { ErrorMessage } from "~/components/Core/Feedback/ErrorMessage";

export const DismissibleErrorMessage = component$(() => {
  const isVisible = useSignal(true);
  const showError = useSignal(true);

  const handleDismiss = $(() => {
    isVisible.value = false;
  });

  const handleReset = $(() => {
    isVisible.value = true;
  });

  return (
    <div class="space-y-4">
      {showError.value && (
        <div class="space-y-4">
          {isVisible.value ? (
            <ErrorMessage
              title="Invalid Input"
              message="Please provide a valid email address format."
              dismissible={true}
              onDismiss$={handleDismiss}
            />
          ) : (
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Error message was dismissed.
              </p>
            </div>
          )}

          {!isVisible.value && (
            <button
              onClick$={handleReset}
              class="rounded-md bg-primary-500 px-4 py-2 text-white"
            >
              Reset Example
            </button>
          )}
        </div>
      )}
    </div>
  );
});
