import { component$, type Signal } from "@builder.io/qwik";
import { HiWifiOutline, HiExclamationTriangleOutline, HiCheckCircleOutline, HiXCircleOutline } from "@qwikest/icons/heroicons";

interface WirelessHeaderProps {
  wirelessEnabled: Signal<boolean>;
}

export const WirelessHeader = component$<WirelessHeaderProps>(({ wirelessEnabled }) => {
  return (
    <div class="mb-6 space-y-4">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div class="flex items-center">
          <HiWifiOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
          <div class="ml-4">
            <h2 class="text-2xl font-bold text-text dark:text-text-dark-default">
              {$localize`Wireless Settings`}
            </h2>
            <p class="text-text-secondary dark:text-text-dark-secondary">
              {$localize`Configure your wireless network settings`}
            </p>
          </div>
        </div>

        {/* Enable/Disable Toggle */}
        <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
          <label
            class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
            ${
              !wirelessEnabled.value
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <input
              type="radio"
              name="wireless"
              checked={!wirelessEnabled.value}
              onChange$={() => wirelessEnabled.value = false}
              class="hidden"
            />
            <HiXCircleOutline class="h-5 w-5" />
            <span>{$localize`Disable`}</span>
          </label>
          <label
            class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
            ${
              wirelessEnabled.value
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <input
              type="radio"
              name="wireless"
              checked={wirelessEnabled.value}
              onChange$={() => wirelessEnabled.value = true}
              class="hidden"
            />
            <HiCheckCircleOutline class="h-5 w-5" />
            <span>{$localize`Enable`}</span>
          </label>
        </div>
      </div>

      <div class="flex items-center space-x-2 rounded-lg bg-yellow-50 px-4 py-3 dark:bg-yellow-900/30">
        <HiExclamationTriangleOutline class="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        <p class="text-sm text-yellow-700 dark:text-yellow-300">
          {$localize`Please avoid using the following words in your SSID as they may indicate the type of network: "star", "starlink", "VPN", "Iran", etc.`}
        </p>
      </div>
    </div>
  );
});
