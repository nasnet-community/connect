import { component$, $ } from "@builder.io/qwik";
import { HiWifiOutline } from "@qwikest/icons/heroicons";
import type { Signal } from "@builder.io/qwik";

interface SSIDModeSelectorProps {
  isMultiSSID: Signal<boolean>;
}

export const SSIDModeSelector = component$<SSIDModeSelectorProps>(
  ({ isMultiSSID }) => {
    const switchToSingleMode = $(() => {
      isMultiSSID.value = false;
    });

    const switchToMultiMode = $(() => {
      isMultiSSID.value = true;
    });

    return (
      <div class="mb-8 flex space-x-4">
        <label
          class={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all
        ${
          !isMultiSSID.value
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
            : "border-border dark:border-border-dark"
        }`}
        >
          <input
            type="radio"
            name="ssidMode"
            checked={!isMultiSSID.value}
            onChange$={switchToSingleMode}
            class="hidden"
          />
          <HiWifiOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <span class="ml-2 text-text dark:text-text-dark-default">{$localize`Single SSID`}</span>
        </label>

        <label
          class={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all
        ${
          isMultiSSID.value
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
            : "border-border dark:border-border-dark"
        }`}
        >
          <input
            type="radio"
            name="ssidMode"
            checked={isMultiSSID.value}
            onChange$={switchToMultiMode}
            class="hidden"
          />
          <HiWifiOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <span class="ml-2 text-text dark:text-text-dark-default">{$localize`Multi SSID`}</span>
        </label>
      </div>
    );
  },
);
