import { component$ } from "@builder.io/qwik";
import { HiWifiOutline } from "@qwikest/icons/heroicons";

export const WirelessHeader = component$(() => {
  return (
    <div class="mb-6 flex items-center">
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
  );
});
