import { component$ } from "@builder.io/qwik";
import { Alert } from "~/components/Core/Feedback/Alert";

export const ResponsiveAlert = component$(() => {
  return (
    <div class="flex flex-col gap-6 p-4">
      <section>
        <h3 class="mb-4 text-lg font-semibold">Responsive Sizes</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            size="sm"
            title="Small Alert"
            message="This alert adapts its padding and font size on different screen sizes."
            dismissible
          />

          <Alert
            status="success"
            size="md"
            title="Medium Alert"
            message="The default size provides balanced spacing for all devices."
            dismissible
          />

          <Alert
            status="warning"
            size="lg"
            title="Large Alert"
            message="Larger alerts have more generous padding and bigger text, especially useful for important messages."
            dismissible
          />
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Different Variants</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            variant="solid"
            title="Solid Variant"
            message="The default solid variant with theme-based colors."
            dismissible
          />

          <Alert
            status="success"
            variant="outline"
            title="Outline Variant"
            message="A lighter variant with just a border and text color."
            dismissible
          />

          <Alert
            status="error"
            variant="subtle"
            title="Subtle Variant"
            message="The most understated variant with very light background colors."
            dismissible
          />
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Animation Effects</h3>
        <div class="flex flex-col gap-4">
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
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Mobile Optimization</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            size="lg"
            title="Touch-Friendly Dismiss Button"
            message="The dismiss button is sized to meet mobile touch target guidelines (44x44px minimum)."
            dismissible
          />

          <Alert status="success" title="Responsive Text Wrapping" dismissible>
            <p class="mb-2">
              This alert contains a longer message that demonstrates how text
              wraps properly on mobile devices with responsive typography.
            </p>
            <p class="break-words">
              The content area uses break-words to ensure long URLs or text
              strings don't overflow on small screens:
              <span class="font-mono text-sm">
                https://example.com/very/long/url/that/would/normally/overflow/on/mobile/devices
              </span>
            </p>
          </Alert>

          <Alert
            status="warning"
            title="Safe Area Support"
            message="On devices with notches or rounded corners, alerts automatically respect safe areas for optimal display."
            dismissible
            size="md"
          />

          <Alert
            status="error"
            title="Haptic Feedback Ready"
            dismissible
            size="lg"
          >
            <div class="space-y-2">
              <p>
                This alert is optimized for devices that support haptic feedback
                for enhanced mobile user experience.
              </p>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="rounded bg-red-100 p-2 dark:bg-red-900/20">
                  <span class="font-medium">Touch Target:</span> 44px+
                </div>
                <div class="rounded bg-red-100 p-2 dark:bg-red-900/20">
                  <span class="font-medium">Text Size:</span> Responsive
                </div>
              </div>
            </div>
          </Alert>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Auto-Dismiss Feature</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            autoCloseDuration={5000}
            title="Auto-Closing Alert"
            message="This alert will automatically dismiss after 5 seconds."
            dismissible
          />

          <Alert
            status="success"
            autoCloseDuration={3000}
            animation="slideUp"
            title="Quick Notification"
            message="A quick 3-second notification with slide up animation."
          />

          <Alert
            status="warning"
            autoCloseDuration={7000}
            animation="fadeIn"
            title="Progressive Disclosure"
            dismissible
          >
            <div class="space-y-3">
              <p>This alert demonstrates progressive disclosure with mobile-optimized content:</p>
              <div class="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                <h5 class="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Mobile Features:
                </h5>
                <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Smooth animations with hardware acceleration</li>
                  <li>• Respects prefers-reduced-motion settings</li>
                  <li>• Touch-friendly interaction zones</li>
                  <li>• Optimized for one-handed usage</li>
                </ul>
              </div>
            </div>
          </Alert>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-semibold">Theme Integration</h3>
        <div class="flex flex-col gap-4">
          <Alert
            status="info"
            title="Theme-Aware Colors"
            message="All colors automatically adapt to light and dark themes with proper contrast ratios."
            dismissible
            size="md"
          />

          <Alert
            status="success"
            title="Accessibility Compliant"
            dismissible
            size="lg"
          >
            <div class="space-y-2">
              <p>
                This alert meets WCAG 2.1 AA accessibility standards:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div class="rounded bg-green-100 p-2 dark:bg-green-900/20">
                  <span class="font-medium">Contrast:</span> 4.5:1 minimum
                </div>
                <div class="rounded bg-green-100 p-2 dark:bg-green-900/20">
                  <span class="font-medium">Focus:</span> Visible indicators
                </div>
                <div class="rounded bg-green-100 p-2 dark:bg-green-900/20">
                  <span class="font-medium">Screen Readers:</span> ARIA labels
                </div>
                <div class="rounded bg-green-100 p-2 dark:bg-green-900/20">
                  <span class="font-medium">Keyboard:</span> Full navigation
                </div>
              </div>
            </div>
          </Alert>
        </div>
      </section>
    </div>
  );
});
