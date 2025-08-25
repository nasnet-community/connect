import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const smallToggle = useSignal(false);
  const mediumToggle = useSignal(true);
  const largeToggle = useSignal(false);

  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Toggle Sizes</h3>
        
        <div class="space-y-6">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Small Size - Compact for Dense Layouts
            </h4>
            <Toggle
              checked={smallToggle.value}
              onChange$={$((value) => {
                smallToggle.value = value;
              })}
              label="Small toggle"
              size="sm"
              color="primary"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Ideal for compact interfaces and forms with limited space.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Medium Size - Default Balanced Size
            </h4>
            <Toggle
              checked={mediumToggle.value}
              onChange$={$((value) => {
                mediumToggle.value = value;
              })}
              label="Medium toggle (default)"
              size="md"
              color="success"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Perfect balance between size and usability for most interfaces.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Large Size - Better Touch Targets
            </h4>
            <Toggle
              checked={largeToggle.value}
              onChange$={$((value) => {
                largeToggle.value = value;
              })}
              label="Large toggle"
              size="lg"
              color="secondary"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Larger size provides better touch targets for mobile and accessibility.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h5 class="mb-2 text-sm font-medium">Small (sm)</h5>
          <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
            20px track height - Compact design
          </p>
          <Toggle
            checked={true}
            onChange$={$(() => {})}
            label="Small example"
            size="sm"
            color="primary"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h5 class="mb-2 text-sm font-medium">Medium (md)</h5>
          <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
            24px track height - Default size
          </p>
          <Toggle
            checked={false}
            onChange$={$(() => {})}
            label="Medium example"
            size="md"
            color="secondary"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h5 class="mb-2 text-sm font-medium">Large (lg)</h5>
          <p class="mb-3 text-xs text-gray-600 dark:text-gray-400">
            28px track height - Touch-friendly
          </p>
          <Toggle
            checked={true}
            onChange$={$(() => {})}
            label="Large example"
            size="lg"
            color="info"
          />
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            <strong>Accessibility:</strong> All toggle sizes maintain minimum 44px touch targets 
            through adequate padding to ensure optimal usability on touch devices.
          </p>
        </div>

        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h4 class="mb-2 text-sm font-semibold text-green-800 dark:text-green-200">
            Size Guidelines
          </h4>
          <ul class="mt-2 text-sm text-green-700 dark:text-green-300 space-y-2">
            <li>• <strong>Small:</strong> Use in dense layouts, secondary settings, or when space is limited</li>
            <li>• <strong>Medium:</strong> Default size for most use cases, balanced appearance</li>
            <li>• <strong>Large:</strong> Primary actions, mobile interfaces, or accessibility requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
});