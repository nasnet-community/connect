import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const ResponsiveSwitch = component$(() => {
  const mobileOptimized = useSignal(true);
  const adaptiveLayout = useSignal(false);
  const touchGestures = useSignal(true);

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 class="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Mobile View (&lt; 640px)
        </h3>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            On mobile devices, switches have larger touch targets (44px minimum) for better usability.
          </p>
          <div class="flex flex-col gap-4">
            <Switch
              checked={mobileOptimized.value}
              onChange$={(checked) => (mobileOptimized.value = checked)}
              label="Mobile Optimized"
              size="sm"
            />
            <Switch
              checked={adaptiveLayout.value}
              onChange$={(checked) => (adaptiveLayout.value = checked)}
              label="Adaptive Layout"
              size="md"
            />
            <Switch
              checked={touchGestures.value}
              onChange$={(checked) => (touchGestures.value = checked)}
              label="Touch Gestures"
              size="lg"
            />
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 class="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Desktop View (≥ 640px)
        </h3>
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            On larger screens, switches adapt to more compact sizes while maintaining clarity.
          </p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="rounded bg-white p-3 shadow-sm dark:bg-gray-800">
              <Switch
                checked={mobileOptimized.value}
                onChange$={(checked) => (mobileOptimized.value = checked)}
                label="Compact"
                size="sm"
                class="justify-between"
              />
            </div>
            <div class="rounded bg-white p-3 shadow-sm dark:bg-gray-800">
              <Switch
                checked={adaptiveLayout.value}
                onChange$={(checked) => (adaptiveLayout.value = checked)}
                label="Standard"
                size="md"
                class="justify-between"
              />
            </div>
            <div class="rounded bg-white p-3 shadow-sm dark:bg-gray-800">
              <Switch
                checked={touchGestures.value}
                onChange$={(checked) => (touchGestures.value = checked)}
                label="Large"
                size="lg"
                class="justify-between"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="text-sm text-gray-600 dark:text-gray-400">
        <p class="font-medium">Responsive Features:</p>
        <ul class="mt-2 list-disc pl-5 space-y-1">
          <li>Touch-friendly sizes on mobile devices</li>
          <li>Automatic size adjustments based on screen size</li>
          <li>Proper spacing for different input methods</li>
          <li>Optimized focus indicators for keyboard navigation</li>
        </ul>
      </div>
    </div>
  );
});