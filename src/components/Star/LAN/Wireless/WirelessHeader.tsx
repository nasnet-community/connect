import { component$ } from "@builder.io/qwik";
import { HiWifiOutline } from "@qwikest/icons/heroicons";
import { HiExclamationTriangleOutline } from "@qwikest/icons/heroicons";

export const WirelessHeader = component$(() => {
  return (
    <div class="mb-6 space-y-4">
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

      <div class="flex items-center space-x-2 rounded-lg bg-yellow-50 px-4 py-3 dark:bg-yellow-900/30">
        <HiExclamationTriangleOutline class="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        <p class="text-sm text-yellow-700 dark:text-yellow-300">
          {$localize`Please avoid using the following words in your SSID as they may indicate the type of network: "star", "starlink", "VPN", "Iran", etc.`}
        </p>
      </div>
    </div>
  );
});
