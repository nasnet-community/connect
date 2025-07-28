import { component$, useSignal } from "@builder.io/qwik";
import { Alert } from "./Alert";

export default component$(() => {
  const showSuccessAlert = useSignal(true);
  const showWarningAlert = useSignal(true);
  const showErrorAlert = useSignal(true);

  return (
    <div class="space-y-6 p-6">
      <h2 class="mb-4 text-xl font-semibold">Alert Component Examples</h2>
      <p class="mb-6 text-gray-600">
        Responsive alerts with theme-based styling, touch-friendly interactions,
        and mobile optimization.
      </p>

      {/* Basic Alerts */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Basic Alerts</h3>

        <Alert status="info">
          This is an informational alert with theme-based styling and responsive
          design.
        </Alert>

        <Alert status="success">
          Operation completed successfully. Your changes have been saved.
        </Alert>

        <Alert status="warning">
          Warning: This action cannot be undone once confirmed.
        </Alert>

        <Alert status="error">
          Error: Failed to save your changes. Please try again.
        </Alert>
      </div>

      {/* Alerts with titles */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alerts with Titles</h3>

        <Alert status="info" title="Account Information">
          Your account was created on January 15, 2023.
        </Alert>

        <Alert status="success" title="Payment Successful">
          Your payment of $24.99 was processed successfully.
        </Alert>

        <Alert status="warning" title="License Expiring">
          Your license will expire in 7 days. Please renew soon.
        </Alert>

        <Alert status="error" title="Connection Failed">
          Unable to establish connection to the server. Check your network
          settings.
        </Alert>
      </div>

      {/* Variant Examples */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alert Variants</h3>

        <Alert status="info" variant="solid" title="Solid Variant">
          The default solid variant with full background color.
        </Alert>

        <Alert status="success" variant="outline" title="Outline Variant">
          A lighter variant with just border and text color.
        </Alert>

        <Alert status="warning" variant="subtle" title="Subtle Variant">
          The most understated variant with very light background.
        </Alert>
      </div>

      {/* Responsive Sizes */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Responsive Sizes</h3>
        <p class="text-sm text-gray-600">
          Alerts automatically adjust padding and font sizes across device
          breakpoints.
        </p>

        <Alert status="info" size="sm" title="Small Alert" dismissible>
          Small alert with responsive padding and typography.
        </Alert>

        <Alert status="success" size="md" title="Medium Alert" dismissible>
          Medium alert (default) with balanced spacing for all devices.
        </Alert>

        <Alert status="warning" size="lg" title="Large Alert" dismissible>
          Large alert with generous padding and bigger text for important
          messages.
        </Alert>
      </div>

      {/* Animation Examples */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Animation Effects</h3>

        <Alert
          status="info"
          animation="fadeIn"
          title="Fade In Animation"
          message="This alert fades in smoothly when it appears."
        />

        <Alert
          status="success"
          animation="slideDown"
          title="Slide Down Animation"
          message="This alert slides down from the top."
        />

        <Alert
          status="warning"
          animation="scaleUp"
          title="Scale Up Animation"
          message="This alert scales up from a smaller size."
        />
      </div>

      {/* Touch-Friendly Dismiss */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Touch-Friendly Dismissible Alerts</h3>
        <p class="text-sm text-gray-600">
          Dismiss buttons meet mobile touch target guidelines (44x44px minimum).
        </p>

        {showSuccessAlert.value && (
          <Alert
            status="success"
            dismissible
            size="lg"
            title="Touch-Friendly Alert"
            onDismiss$={() => {
              showSuccessAlert.value = false;
            }}
          >
            This alert has a touch-friendly dismiss button optimized for mobile
            devices.
          </Alert>
        )}

        {showWarningAlert.value && (
          <Alert
            status="warning"
            dismissible
            title="Mobile Optimized"
            variant="outline"
            onDismiss$={() => {
              showWarningAlert.value = false;
            }}
          >
            The dismiss button automatically sizes for touch interactions.
          </Alert>
        )}

        {showErrorAlert.value && (
          <Alert
            status="error"
            dismissible
            variant="subtle"
            animation="slideUp"
            onDismiss$={() => {
              showErrorAlert.value = false;
            }}
          >
            This subtle error alert can be dismissed with smooth animation.
          </Alert>
        )}

        {!showSuccessAlert.value &&
          !showWarningAlert.value &&
          !showErrorAlert.value && (
            <button
              onClick$={() => {
                showSuccessAlert.value = true;
                showWarningAlert.value = true;
                showErrorAlert.value = true;
              }}
              class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Reset Alerts
            </button>
          )}
      </div>

      {/* Icon Variants */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Icon and Loading States</h3>

        <Alert status="info" icon={false} title="No Icon">
          This alert appears without an icon for a cleaner look.
        </Alert>

        <Alert status="success" loading title="Loading State">
          This alert shows a responsive loading spinner that scales with size.
        </Alert>

        <Alert
          status="info"
          size="lg"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          }
          title="Custom Icon"
        >
          This alert uses a custom icon that scales with the alert size.
        </Alert>
      </div>

      {/* Auto-Closing Alerts */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Auto-Dismiss Features</h3>

        <Alert
          status="info"
          title="Auto-Closing Alert"
          autoCloseDuration={5000}
          animation="fadeIn"
          dismissible
        >
          This alert will automatically dismiss after 5 seconds with fade
          animation.
        </Alert>

        <Alert
          status="success"
          title="Quick Notification"
          message="This notification disappears quickly after 3 seconds."
          autoCloseDuration={3000}
          animation="slideDown"
        />
      </div>

      {/* Mobile Text Wrapping */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Mobile Text Handling</h3>

        <Alert
          status="warning"
          title="Long Text Handling"
          size="md"
          dismissible
        >
          <p class="mb-2">
            This alert demonstrates proper text wrapping on mobile devices with
            very long content that would normally overflow.
          </p>
          <p>
            URLs and long strings break properly:
            https://example.com/very/long/url/that/would/normally/overflow/on/mobile/devices/but/now/wraps/correctly
          </p>
        </Alert>
      </div>
    </div>
  );
});
