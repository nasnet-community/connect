import { component$ } from "@builder.io/qwik";
import { HiSparklesOutline } from "@qwikest/icons/heroicons";
import type { QRL, Signal } from "@builder.io/qwik";

interface SingleSSIDFormProps {
  ssid: Signal<string>;
  password: Signal<string>;
  generateSSID: QRL<() => Promise<void>>;
  generatePassword: QRL<() => Promise<void>>;
  isLoading: Signal<Record<string, boolean>>;
}

export const SingleSSIDForm = component$<SingleSSIDFormProps>(
  ({ ssid, password, generateSSID, generatePassword, isLoading }) => {
    return (
      <div class="space-y-6">
        <p class="text-text-secondary dark:text-text-dark-secondary">
          {$localize`Configure a single wireless network for all your devices`}
        </p>
        <div class="grid gap-6">
          <div>
            <label class="mb-2 block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
              {$localize`SSID`}
            </label>
            <div class="flex gap-2">
              <input
                bind:value={ssid}
                type="text"
                class="flex-1 rounded-lg border border-border bg-surface px-4 py-2 
                     text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter network name`}
              />
              <button
                onClick$={generateSSID}
                disabled={isLoading.value.singleSSID}
                class="flex min-w-[140px] items-center gap-2 rounded-lg bg-primary-500 
                     px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-600"
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
          <div>
            <label class="mb-2 block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
              {$localize`Password`}
            </label>
            <div class="flex gap-2">
              <input
                bind:value={password}
                type="text"
                class="flex-1 rounded-lg border border-border bg-surface px-4 py-2 
                     text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter network password`}
              />
              <button
                onClick$={generatePassword}
                disabled={isLoading.value.singlePassword}
                class="flex min-w-[140px] items-center gap-2 rounded-lg bg-primary-500 
                     px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-600"
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
      </div>
    );
  },
);
