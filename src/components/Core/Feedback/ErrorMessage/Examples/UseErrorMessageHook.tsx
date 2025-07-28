import { component$, $ } from "@builder.io/qwik";
import {
  ErrorMessage,
  useErrorMessage,
} from "~/components/Core/Feedback/ErrorMessage";

export const UseErrorMessageHook = component$(() => {
  // Initialize the error message hook
  const { message, visible, showError$, hideError$ } = useErrorMessage({
    autoHideDuration: 5000, // Auto-hide after 5 seconds
  });

  // Mock errors to demonstrate hook usage
  const errors = [
    "Unable to authenticate. Please check your credentials.",
    "Network connection lost. Please check your connection and try again.",
    "Permission denied. You don't have access to this resource.",
    "Invalid input. Please check the form fields and try again.",
  ];

  // Show a random error message
  const showRandomError = $(() => {
    const randomIndex = Math.floor(Math.random() * errors.length);
    showError$(errors[randomIndex]);
  });

  return (
    <div class="space-y-4">
      {visible.value && (
        <ErrorMessage
          message={message.value}
          title="Hook Example"
          dismissible={true}
          onDismiss$={hideError$}
        />
      )}

      <div class="flex space-x-4">
        <button
          onClick$={showRandomError}
          class="rounded-md bg-primary-500 px-4 py-2 text-white"
        >
          Show Random Error
        </button>

        {visible.value && (
          <button
            onClick$={hideError$}
            class="rounded-md bg-gray-500 px-4 py-2 text-white"
          >
            Hide Error
          </button>
        )}
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-400">
        This example uses the <code>useErrorMessage</code> hook to manage error
        state. Errors will auto-dismiss after 5 seconds, or you can manually
        dismiss them.
      </p>
    </div>
  );
});
