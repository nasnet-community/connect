import { component$ } from "@builder.io/qwik";
import { HiSparklesOutline } from "@qwikest/icons/heroicons";
import type { QRL, Signal } from "@builder.io/qwik";
import { Spinner } from "~/components/Core/DataDisplay/Progress/Spinner";
import { Input, Toggle } from "~/components/Core";

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
  ({
    ssid,
    password,
    isHide,
    splitBand,
    generateSSID,
    generatePassword,
    toggleHide,
    toggleSplitBand,
    isLoading,
  }) => {
    return (
      <div class="space-y-6">
        <p class="dark:text-text-secondary-dark text-text-secondary">
          {$localize`Configure a single SSID for all networks`}
        </p>

        <div class="flex flex-wrap items-center justify-end gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <Toggle
            label={$localize`Hide`}
            labelPosition="left"
            checked={isHide.value}
            onChange$={toggleHide}
            size="md"
            color="primary"
          />

          <Toggle
            label={$localize`Split Band`}
            labelPosition="left"
            checked={splitBand.value}
            onChange$={toggleSplitBand}
            size="md"
            color="primary"
          />
        </div>

        <div class="mt-4 space-y-6">
          <div class="space-y-2">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
              for="ssid"
            >
              {$localize`Network Name (SSID)`}
              <span class="ml-1 text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <Input
                id="ssid"
                type="text"
                value={ssid.value}
                onInput$={(event: Event, value: string) => {
                  ssid.value = value;
                }}
                placeholder={$localize`Enter network name`}
                required
                class="h-11 flex-1"
              />
              <button
                onClick$={generateSSID}
                disabled={isLoading.value.singleSSID}
                class="flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600"
              >
                {isLoading.value.singleSSID ? (
                  <Spinner size="xs" color="white" variant="circle" />
                ) : (
                  <HiSparklesOutline class="h-5 w-5" />
                )}
                <span>{$localize`Generate SSID`}</span>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
              for="password"
            >
              {$localize`Network Password`}
              <span class="ml-1 text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <Input
                id="password"
                type="password"
                value={password.value}
                onInput$={(event: Event, value: string) => {
                  password.value = value;
                }}
                placeholder={$localize`Enter network password`}
                required
                class="h-11 flex-1"
              />
              <button
                onClick$={generatePassword}
                disabled={isLoading.value.singlePassword}
                class="flex h-11 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600"
              >
                {isLoading.value.singlePassword ? (
                  <Spinner size="xs" color="white" variant="circle" />
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
