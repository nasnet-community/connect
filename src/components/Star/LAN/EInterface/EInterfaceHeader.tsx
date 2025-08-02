import { component$, $ } from "@builder.io/qwik";
import { HiCpuChipOutline } from "@qwikest/icons/heroicons";
import type { Signal, PropFunction } from "@builder.io/qwik";

interface EInterfaceHeaderProps {
  interfaceEnabled: Signal<boolean>;
  toggleEnabled?: PropFunction<() => void>;
}

export const EInterfaceHeader = component$<EInterfaceHeaderProps>(
  ({ interfaceEnabled, toggleEnabled }) => {
    const handleToggle = $(() => {
      if (toggleEnabled) {
        toggleEnabled();
      }
    });

    return (
      <div class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900">
            <HiCpuChipOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {$localize`LAN Interfaces`}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {$localize`Configure Ethernet interfaces and assign them to network bridges`}
            </p>
          </div>
        </div>

        <div class="flex items-center">
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={interfaceEnabled.value}
              class="peer sr-only"
              onChange$={handleToggle}
            />
            <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-primary-800"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {interfaceEnabled.value
                ? $localize`Enabled`
                : $localize`Disabled`}
            </span>
          </label>
        </div>
      </div>
    );
  },
);
