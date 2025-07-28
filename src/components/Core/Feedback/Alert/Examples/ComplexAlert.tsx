import { component$, useSignal } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback/Alert";

export const ComplexAlert = component$(() => {
  const showNotification = useSignal(true);
  const showWarning = useSignal(true);
  const showError = useSignal(true);

  return (
    <div class="flex flex-col gap-6 p-4">
      <section>
        <h3 class="mb-4 text-lg font-semibold">Interactive Alerts</h3>
        <div class="flex flex-col gap-4">
          {showNotification.value && (
            <Alert
              status="info"
              variant="solid"
              size="md"
              title="System Update Available"
              dismissible
              onDismiss$={() => {
                showNotification.value = false;
                console.log("Notification dismissed");
              }}
            >
              <p class="mb-2">A new version of the application is available.</p>
              <button class="text-sm font-medium underline hover:no-underline">
                Update Now
              </button>
            </Alert>
          )}

          {!showNotification.value && (
            <button
              onClick$={() => (showNotification.value = true)}
              class="self-start rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Show Notification Again
            </button>
          )}
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Loading States</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            loading={true}
            title="Processing Request"
            message="Please wait while we process your request..."
          />

          <Alert
            status="success"
            loading={true}
            size="lg"
            title="Uploading Files"
          >
            <div class="space-y-2">
              <p>Uploading 3 files...</p>
              <div class="h-2 w-full rounded-full bg-gray-200">
                <div class="h-2 w-3/4 animate-pulse rounded-full bg-green-500"></div>
              </div>
              <p class="text-sm text-gray-600">75% complete</p>
            </div>
          </Alert>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Custom Icons</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            }
            title="Documentation Update"
            message="New documentation is available for the latest features."
          />

          <Alert
            status="warning"
            icon={false}
            title="No Icon Alert"
            message="This alert is displayed without an icon for a cleaner look."
          />
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Complex Content</h3>
        <div class="flex flex-col gap-4">
          {showWarning.value && (
            <Alert
              status="warning"
              size="lg"
              variant="solid"
              dismissible
              onDismiss$={() => (showWarning.value = false)}
              title="Account Security Notice"
            >
              <div class="space-y-3">
                <p>We've detected unusual activity on your account:</p>
                <ul class="list-inside list-disc space-y-1 text-sm">
                  <li>Login from new device: iPhone 13 Pro</li>
                  <li>Location: San Francisco, CA</li>
                  <li>Time: 2:34 PM PST</li>
                </ul>
                <div class="mt-4 flex gap-3">
                  <button class="rounded bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-yellow-700">
                    Verify Activity
                  </button>
                  <button class="rounded border border-yellow-600 px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50">
                    Not Me
                  </button>
                </div>
              </div>
            </Alert>
          )}

          {showError.value && (
            <Alert
              status="error"
              variant="outline"
              dismissible
              onDismiss$={() => (showError.value = false)}
              title="Form Validation Errors"
            >
              <div class="mt-2">
                <p class="mb-2">Please fix the following errors:</p>
                <ul class="space-y-1 text-sm">
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 text-red-500">•</span>
                    <span>Email address is required</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 text-red-500">•</span>
                    <span>Password must be at least 8 characters long</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 text-red-500">•</span>
                    <span>Please accept the terms and conditions</span>
                  </li>
                </ul>
              </div>
            </Alert>
          )}
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Stacked Alerts</h3>
        <div class="flex flex-col gap-2">
          <Alert
            status="info"
            size="sm"
            message="First notification in the stack"
            autoCloseDuration={10000}
          />
          <Alert
            status="success"
            size="sm"
            message="Second notification with different status"
            autoCloseDuration={8000}
          />
          <Alert
            status="warning"
            size="sm"
            message="Third notification that stays longer"
            autoCloseDuration={15000}
          />
        </div>
      </section>
    </div>
  );
});
