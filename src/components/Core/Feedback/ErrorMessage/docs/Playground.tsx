import { component$, useSignal, $ } from "@builder.io/qwik";
import { ErrorMessage } from "~/components/Core/Feedback/ErrorMessage";

export default component$(() => {
  const message = useSignal(
    "This is an error message that can be customized in the playground.",
  );
  const title = useSignal("Error Message");
  const dismissible = useSignal(true);
  const autoDismissDuration = useSignal(0);
  const showError = useSignal(true);

  const handleDismiss = $(() => {
    showError.value = false;
  });

  const resetError = $(() => {
    showError.value = true;
  });

  return (
    <div class="space-y-6">
      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        {showError.value ? (
          <ErrorMessage
            title={title.value}
            message={message.value}
            dismissible={dismissible.value}
            autoDismissDuration={autoDismissDuration.value}
            onDismiss$={handleDismiss}
          />
        ) : (
          <div class="rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-700">
            <p class="text-gray-600 dark:text-gray-300">
              Error message was dismissed.
            </p>
            <button
              onClick$={resetError}
              class="mt-2 rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            >
              Show Error Again
            </button>
          </div>
        )}
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 class="mb-4 text-xl font-semibold">Customize Error Message</h2>

        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">Error Title</label>
            <input
              type="text"
              value={title.value}
              onInput$={(e) =>
                (title.value = (e.target as HTMLInputElement).value)
              }
              class="w-full rounded-md border bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">Error Message</label>
            <textarea
              value={message.value}
              onInput$={(e) =>
                (message.value = (e.target as HTMLTextAreaElement).value)
              }
              rows={3}
              class="w-full rounded-md border bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
            ></textarea>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="dismissible"
              checked={dismissible.value}
              onChange$={(e) =>
                (dismissible.value = (e.target as HTMLInputElement).checked)
              }
              class="mr-2"
            />
            <label for="dismissible" class="text-sm font-medium">
              Dismissible
            </label>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">
              Auto Dismiss Duration (ms) -{" "}
              {autoDismissDuration.value === 0
                ? "No auto-dismiss"
                : `${autoDismissDuration.value}ms`}
            </label>
            <select
              value={autoDismissDuration.value}
              onChange$={(e) =>
                (autoDismissDuration.value = parseInt(
                  (e.target as HTMLSelectElement).value,
                  10,
                ))
              }
              class="w-full rounded-md border bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="0">No auto-dismiss</option>
              <option value="2000">2000ms (2 seconds)</option>
              <option value="3000">3000ms (3 seconds)</option>
              <option value="5000">5000ms (5 seconds)</option>
              <option value="8000">8000ms (8 seconds)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});
