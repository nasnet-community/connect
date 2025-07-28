import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const CustomStyledSwitch = component$(() => {
  const gradientChecked = useSignal(true);
  const errorChecked = useSignal(false);
  const successChecked = useSignal(true);
  const customChecked = useSignal(false);

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Custom Styled Switches</h3>
        <div class="grid gap-6 sm:grid-cols-2">
          {/* Gradient Switch */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gradient Track
            </h4>
            <Switch
              checked={gradientChecked.value}
              onChange$={(checked) => (gradientChecked.value = checked)}
              label="Premium Feature"
              trackClass="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600"
              thumbClass="bg-white shadow-lg"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Using custom gradient background
            </p>
          </div>

          {/* Error State Switch */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Error State
            </h4>
            <Switch
              checked={errorChecked.value}
              onChange$={(checked) => (errorChecked.value = checked)}
              label="Delete Account"
              trackClass={errorChecked.value ? "!bg-error-500 dark:!bg-error-600" : ""}
              thumbClass={errorChecked.value ? "!bg-error-50 dark:!bg-error-950" : ""}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Dangerous actions with error colors
            </p>
          </div>

          {/* Success State Switch */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Success State
            </h4>
            <Switch
              checked={successChecked.value}
              onChange$={(checked) => (successChecked.value = checked)}
              label="Auto-save Enabled"
              trackClass={successChecked.value ? "!bg-success-500 dark:!bg-success-600" : ""}
              thumbClass={successChecked.value ? "!bg-success-50 dark:!bg-success-950" : ""}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Positive actions with success colors
            </p>
          </div>

          {/* Custom Animation Switch */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Animation
            </h4>
            <Switch
              checked={customChecked.value}
              onChange$={(checked) => (customChecked.value = checked)}
              label="Smooth Transition"
              trackClass="transition-all duration-500 ease-in-out"
              thumbClass="transition-all duration-500 ease-in-out transform hover:scale-110"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Extended animation duration
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <h4 class="mb-2 text-sm font-semibold">Code Example</h4>
        <pre class="overflow-x-auto rounded bg-gray-950 p-3">
          <code class="text-xs text-gray-300">{`<Switch
  checked={checked}
  onChange$={(val) => checked = val}
  label="Custom Switch"
  trackClass="bg-gradient-to-r from-purple-500 to-pink-500"
  thumbClass="bg-white shadow-lg"
/>`}</code>
        </pre>
      </div>

      <div class="text-sm text-gray-600 dark:text-gray-400">
        <p class="font-medium mb-2">Styling Tips:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Use <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">trackClass</code> to customize the background track</li>
          <li>Use <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">thumbClass</code> to customize the moving thumb</li>
          <li>Override default colors with <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">!</code> important flag when needed</li>
          <li>Add custom transitions and animations for unique interactions</li>
        </ul>
      </div>
    </div>
  );
});