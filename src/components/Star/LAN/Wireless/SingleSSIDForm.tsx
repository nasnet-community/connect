import { component$ } from "@builder.io/qwik";
import { HiSparklesOutline } from "@qwikest/icons/heroicons";
import type { QRL, Signal } from "@builder.io/qwik";

interface SingleSSIDFormProps {
  ssid: Signal<string>;
  password: Signal<string>;
  isHide: Signal<boolean>;
  isDisabled: Signal<boolean>;
  splitBand: Signal<boolean>;
  generateSSID: QRL<() => Promise<void>>;
  generatePassword: QRL<() => Promise<void>>;
  toggleHide: QRL<() => void>;
  toggleDisabled: QRL<() => void>;
  toggleSplitBand: QRL<() => void>;
  isLoading: Signal<Record<string, boolean>>;
}

export const SingleSSIDForm = component$<SingleSSIDFormProps>(
  ({ ssid, password, isHide, splitBand, generateSSID, generatePassword, toggleHide, toggleSplitBand, isLoading }) => {
    return (
      <div class="space-y-6">
        <p class="text-text-secondary dark:text-text-secondary-dark">
          {$localize`Configure a single SSID for all networks`}
        </p>
        
        <div class="flex flex-wrap items-center justify-end gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <div class="flex items-center">
            <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Hide`}
            </span>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isHide.value}
                class="peer sr-only"
                onChange$={toggleHide}
              />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
          
          <div class="flex items-center">
            <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Split Band`}
            </span>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={splitBand.value}
                class="peer sr-only"
                onChange$={toggleSplitBand}
              />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
        </div>

        <div class="mt-4 space-y-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300" for="ssid">
              {$localize`Network Name (SSID)`}<span class="ml-1 text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <input
                id="ssid"
                type="text"
                value={ssid.value}
                onChange$={(e) => (ssid.value = (e.target as HTMLInputElement).value)}
                class="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder={$localize`Enter network name`}
                required
              />
              <button
                onClick$={generateSSID}
                disabled={isLoading.value.singleSSID}
                class="flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600"
              >
                {isLoading.value.singleSSID ? (
                  <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <HiSparklesOutline class="h-5 w-5" />
                )}
                <span>{$localize`Generate SSID`}</span>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300" for="password">
              {$localize`Network Password`}<span class="ml-1 text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <input
                id="password"
                type="text"
                value={password.value}
                onChange$={(e) => (password.value = (e.target as HTMLInputElement).value)}
                class="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder={$localize`Enter network password`}
                required
              />
              <button
                onClick$={generatePassword}
                disabled={isLoading.value.singlePassword}
                class="flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600"
              >
                {isLoading.value.singlePassword ? (
                  <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <HiSparklesOutline class="h-5 w-5" />
                )}
                <span>{$localize`Generate Pass`}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Info Note */}
        <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {$localize`Note: Both Network Name and Password are required to save your configuration.`}
          </p>
        </div>
      </div>
    );
  },
);
