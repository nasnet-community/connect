import { component$, useSignal, $ } from "@builder.io/qwik";
import { ErrorMessage } from "~/components/Core/Feedback/ErrorMessage";

export const AutoDismissErrorMessage = component$(() => {
  const isVisible = useSignal(false);
  const errorMessage = useSignal(
    "This error will automatically disappear in 3 seconds.",
  );

  const handleDismiss = $(() => {
    isVisible.value = false;
  });

  const showError = $(() => {
    isVisible.value = true;

    // Reset after auto-dismiss to allow showing the error again
    setTimeout(() => {
      // This timeout is just for UI purposes and doesn't affect the actual auto-dismiss
      // which is handled by the ErrorMessage component
    }, 3500);
  });

  return (
    <div class="space-y-4">
      {isVisible.value && (
        <ErrorMessage
          title="Auto-dismiss Example"
          message={errorMessage.value}
          autoDismissDuration={3000}
          onDismiss$={handleDismiss}
        />
      )}

      <button
        onClick$={showError}
        class="rounded-md bg-primary-500 px-4 py-2 text-white"
        disabled={isVisible.value}
      >
        {isVisible.value ? "Error Showing..." : "Show Auto-dismiss Error"}
      </button>
    </div>
  );
});
