import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const responsiveToggle = useSignal(false);
  const mobileOptimized = useSignal(true);
  const tabletOptimized = useSignal(false);

  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Responsive Toggles</h3>
        
        <div class="space-y-6">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Responsive Size (Small on mobile, Medium on tablet, Large on desktop)
            </h4>
            <Toggle
              checked={responsiveToggle.value}
              onChange$={$((value) => {
                responsiveToggle.value = value;
              })}
              label="Responsive toggle"
              size={{
                base: "sm",
                md: "md",
                lg: "lg"
              }}
              color="primary"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Resize your browser window to see the size change at different breakpoints.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mobile-Optimized (Always Large for Touch)
            </h4>
            <Toggle
              checked={mobileOptimized.value}
              onChange$={$((value) => {
                mobileOptimized.value = value;
              })}
              label="Mobile-friendly toggle"
              size="lg"
              color="success"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Large size provides better touch targets on mobile devices.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Compact for Desktop
            </h4>
            <Toggle
              checked={tabletOptimized.value}
              onChange$={$((value) => {
                tabletOptimized.value = value;
              })}
              label="Compact toggle"
              size="sm"
              color="secondary"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Small size works well in dense desktop layouts.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h5 class="mb-2 text-sm font-medium">Mobile (sm)</h5>
          <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
            Large touch targets, clear visual feedback
          </p>
          <Toggle
            checked={true}
            onChange$={$(() => {})}
            label="Mobile toggle"
            size="lg"
            color="primary"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h5 class="mb-2 text-sm font-medium">Tablet (md)</h5>
          <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
            Medium size for mixed input methods
          </p>
          <Toggle
            checked={false}
            onChange$={$(() => {})}
            label="Tablet toggle"
            size="md"
            color="secondary"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h5 class="mb-2 text-sm font-medium">Desktop (lg+)</h5>
          <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
            Compact for dense interfaces
          </p>
          <Toggle
            checked={true}
            onChange$={$(() => {})}
            label="Desktop toggle"
            size="sm"
            color="info"
          />
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            <strong>Responsive Design:</strong> The toggle component automatically detects screen size and 
            adjusts accordingly. All sizes maintain a minimum 44px touch target on touch devices for optimal accessibility.
          </p>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h4 class="mb-2 text-sm font-semibold text-green-800 dark:text-green-200">
            Current Breakpoint Detection
          </h4>
          <p class="text-sm text-green-700 dark:text-green-300">
            The responsive toggle above automatically detects your current screen size:
          </p>
          <ul class="mt-2 text-xs text-green-600 dark:text-green-400 space-y-1">
            <li>• <strong>Small (base):</strong> &lt; 640px - Uses small size for compact mobile layouts</li>
            <li>• <strong>Medium (md):</strong> 768px+ - Uses medium size for tablets</li>
            <li>• <strong>Large (lg):</strong> 1024px+ - Uses large size for desktop interfaces</li>
          </ul>
          <p class="mt-2 text-xs text-green-600 dark:text-green-400">
            Try resizing your browser window to see the toggle size change in real-time!
          </p>
        </div>
      </div>
    </div>
  );
});