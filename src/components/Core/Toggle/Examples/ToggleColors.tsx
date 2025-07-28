import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const primaryChecked = useSignal(true);
  const secondaryChecked = useSignal(false);
  const successChecked = useSignal(true);
  const errorChecked = useSignal(false);
  const warningChecked = useSignal(true);
  const infoChecked = useSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Primary</h4>
          <Toggle
            checked={primaryChecked.value}
            onChange$={$((value) => {
              primaryChecked.value = value;
            })}
            label="Primary toggle"
            color="primary"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Secondary</h4>
          <Toggle
            checked={secondaryChecked.value}
            onChange$={$((value) => {
              secondaryChecked.value = value;
            })}
            label="Secondary toggle"
            color="secondary"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Success</h4>
          <Toggle
            checked={successChecked.value}
            onChange$={$((value) => {
              successChecked.value = value;
            })}
            label="Success toggle"
            color="success"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Error</h4>
          <Toggle
            checked={errorChecked.value}
            onChange$={$((value) => {
              errorChecked.value = value;
            })}
            label="Error toggle"
            color="error"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Warning</h4>
          <Toggle
            checked={warningChecked.value}
            onChange$={$((value) => {
              warningChecked.value = value;
            })}
            label="Warning toggle"
            color="warning"
          />
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Info</h4>
          <Toggle
            checked={infoChecked.value}
            onChange$={$((value) => {
              infoChecked.value = value;
            })}
            label="Info toggle"
            color="info"
          />
        </div>
      </div>
    </div>
  );
});