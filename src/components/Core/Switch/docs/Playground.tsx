import { component$, useSignal, $ } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export default component$(() => {
  const isChecked = useSignal(false);
  const size = useSignal<"sm" | "md" | "lg">("md");
  const variant = useSignal<"default" | "success" | "warning" | "error">("default");
  const isDisabled = useSignal(false);
  const withLabel = useSignal(true);
  const labelPosition = useSignal<"left" | "right">("right");
  const showCode = useSignal(false);

  const handleToggleCode = $(() => {
    showCode.value = !showCode.value;
  });

  return (
    <div class="space-y-8">
      <div class="rounded-lg border bg-white p-6 dark:bg-gray-800">
        <div class="flex flex-col items-center justify-center gap-8">
          <Switch
            checked={isChecked.value}
            onChange$={(checked: boolean) => (isChecked.value = checked)}
            size={size.value}
            variant={variant.value}
            disabled={isDisabled.value}
            label={withLabel.value ? "Interactive Switch" : undefined}
            labelPosition={labelPosition.value}
            aria-label={!withLabel.value ? "Playground switch" : undefined}
          />

          <div class="text-center">
            <p class="text-lg font-medium">
              Switch is <span class={`font-bold ${isChecked.value ? 'text-success-600 dark:text-success-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {isChecked.value ? "ON" : "OFF"}
              </span>
            </p>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary mt-1">
              Variant: <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">{variant.value}</code> • 
              Size: <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">{size.value}</code>
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Options</h3>

          <div class="space-y-2">
            <p class="font-medium">State</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => (isChecked.value = false)}
                class={`rounded px-3 py-1 ${!isChecked.value ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                OFF
              </button>
              <button
                onClick$={() => (isChecked.value = true)}
                class={`rounded px-3 py-1 ${isChecked.value ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                ON
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <p class="font-medium">Size</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => (size.value = "sm")}
                class={`rounded px-3 py-1 ${size.value === "sm" ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Small
              </button>
              <button
                onClick$={() => (size.value = "md")}
                class={`rounded px-3 py-1 ${size.value === "md" ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Medium
              </button>
              <button
                onClick$={() => (size.value = "lg")}
                class={`rounded px-3 py-1 ${size.value === "lg" ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Large
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <p class="font-medium">Variant</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick$={() => (variant.value = "default")}
                class={`rounded px-3 py-1 text-sm ${variant.value === "default" ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Default
              </button>
              <button
                onClick$={() => (variant.value = "success")}
                class={`rounded px-3 py-1 text-sm ${variant.value === "success" ? "bg-success-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Success
              </button>
              <button
                onClick$={() => (variant.value = "warning")}
                class={`rounded px-3 py-1 text-sm ${variant.value === "warning" ? "bg-warning-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Warning
              </button>
              <button
                onClick$={() => (variant.value = "error")}
                class={`rounded px-3 py-1 text-sm ${variant.value === "error" ? "bg-error-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Error
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <p class="font-medium">Label</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => (withLabel.value = true)}
                class={`rounded px-3 py-1 ${withLabel.value ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                With Label
              </button>
              <button
                onClick$={() => (withLabel.value = false)}
                class={`rounded px-3 py-1 ${!withLabel.value ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                No Label
              </button>
            </div>
          </div>

          {withLabel.value && (
            <div class="space-y-2">
              <p class="font-medium">Label Position</p>
              <div class="flex items-center gap-4">
                <button
                  onClick$={() => (labelPosition.value = "left")}
                  class={`rounded px-3 py-1 ${labelPosition.value === "left" ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  Left
                </button>
                <button
                  onClick$={() => (labelPosition.value = "right")}
                  class={`rounded px-3 py-1 ${labelPosition.value === "right" ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  Right
                </button>
              </div>
            </div>
          )}

          <div class="space-y-2">
            <p class="font-medium">Disabled</p>
            <div class="flex items-center gap-4">
              <button
                onClick$={() => (isDisabled.value = false)}
                class={`rounded px-3 py-1 ${!isDisabled.value ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Enabled
              </button>
              <button
                onClick$={() => (isDisabled.value = true)}
                class={`rounded px-3 py-1 ${isDisabled.value ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                Disabled
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Code</h3>
            <button
              onClick$={handleToggleCode}
              class="text-sm text-primary-500 hover:text-primary-600"
            >
              {showCode.value ? "Hide Code" : "Show Code"}
            </button>
          </div>

          {showCode.value && (
            <div class="rounded-lg bg-gray-950 p-4">
              <pre class="overflow-x-auto">
                <code class="text-sm text-gray-300">{`import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export default component$(() => {
  const isChecked = useSignal(${isChecked.value});
  
  return (
    <Switch
      checked={isChecked.value}
      onChange$={(checked) => isChecked.value = checked}
      size="${size.value}"${variant.value !== "default" ? `\n      variant="${variant.value}"` : ''}${withLabel.value ? `\n      label="Interactive Switch"` : ''}${withLabel.value && labelPosition.value !== "right" ? `\n      labelPosition="${labelPosition.value}"` : ''}${isDisabled.value ? '\n      disabled' : ''}${!withLabel.value ? '\n      aria-label="My switch"' : ''}
    />
  );
});`}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
