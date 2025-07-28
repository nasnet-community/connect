import { component$, useSignal } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback/Alert";

export const AlertSizesAndDismissible = component$(() => {
  const showSmallAlert = useSignal(true);
  const showMediumAlert = useSignal(true);
  const showLargeAlert = useSignal(true);
  const showAutoDismissAlert = useSignal(true);

  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Alert Sizes</h3>
        <div class="flex flex-col gap-4">
          {showSmallAlert.value && (
            <Alert
              size="sm"
              status="info"
              title="Small Alert"
              message="This is a small size alert."
              dismissible={true}
              onDismiss$={() => (showSmallAlert.value = false)}
            />
          )}

          {showMediumAlert.value && (
            <Alert
              size="md"
              status="info"
              title="Medium Alert"
              message="This is a medium size alert (default)."
              dismissible={true}
              onDismiss$={() => (showMediumAlert.value = false)}
            />
          )}

          {showLargeAlert.value && (
            <Alert
              size="lg"
              status="info"
              title="Large Alert"
              message="This is a large size alert with more padding and larger text."
              dismissible={true}
              onDismiss$={() => (showLargeAlert.value = false)}
            />
          )}
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Auto-Dismissing Alert</h3>
        <div class="mb-4">
          {showAutoDismissAlert.value ? (
            <Alert
              status="success"
              title="Auto-Dismiss Alert"
              message="This alert will automatically dismiss after 5 seconds."
              autoCloseDuration={5000}
              onDismiss$={() => (showAutoDismissAlert.value = false)}
            />
          ) : (
            <button
              onClick$={() => (showAutoDismissAlert.value = true)}
              class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Show Auto-Dismiss Alert Again
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Loading Alert</h3>
        <Alert
          status="info"
          title="Processing"
          message="Please wait while we process your request."
          loading={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Alert with Children</h3>
        <Alert status="info" title="Alert with Custom Content">
          <div class="mt-2 rounded bg-white bg-opacity-10 p-3">
            <p>
              This alert contains custom child content instead of a simple
              message.
            </p>
            <div class="mt-2 flex gap-2">
              <button class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                Action
              </button>
              <button class="rounded border border-blue-300 bg-transparent px-3 py-1 text-blue-300 hover:bg-blue-500 hover:bg-opacity-10">
                Dismiss
              </button>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
});
