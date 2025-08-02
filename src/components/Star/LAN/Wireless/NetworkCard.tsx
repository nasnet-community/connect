import { component$, type QRL } from "@builder.io/qwik";
import { HiSparklesOutline, HiWifiOutline } from "@qwikest/icons/heroicons";
import type { NetworkKey } from "./type";
import { NETWORK_DESCRIPTIONS } from "./constants";
import { Spinner } from "~/components/Core/DataDisplay/Progress/Spinner";

interface NetworkCardProps {
  networkKey: NetworkKey;
  ssid: string;
  password: string;
  isHide: boolean;
  isDisabled: boolean;
  splitBand: boolean;
  onSSIDChange: QRL<(value: string) => void>;
  onPasswordChange: QRL<(value: string) => void>;
  onHideToggle: QRL<() => void>;
  onDisabledToggle: QRL<() => void>;
  onSplitBandToggle: QRL<() => void>;
  generateNetworkSSID: QRL<() => Promise<void>>;
  generateNetworkPassword: QRL<() => Promise<void>>;
  isLoading: Record<string, boolean>;
}

export const NetworkCard = component$<NetworkCardProps>(
  ({
    networkKey,
    ssid,
    password,
    isHide,
    isDisabled,
    splitBand,
    onSSIDChange,
    onPasswordChange,
    onHideToggle,
    onDisabledToggle,
    onSplitBandToggle,
    generateNetworkSSID,
    generateNetworkPassword,
    isLoading,
  }) => {
    const displayName =
      networkKey.charAt(0).toUpperCase() + networkKey.slice(1);

    return (
      <div
        class={`rounded-xl border border-gray-200 bg-white shadow-sm 
                transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800
                ${isDisabled ? "opacity-60" : ""}`}
      >
        <div class="p-6">
          <div class="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-primary-50 p-2 dark:bg-primary-900/20">
                <HiWifiOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {$localize`${displayName} Network`}
                </h3>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {NETWORK_DESCRIPTIONS[networkKey]}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center">
                <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Hide`}
                </span>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isHide}
                    class="peer sr-only"
                    onChange$={onHideToggle}
                    disabled={isDisabled}
                  />
                  <div
                    class={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700 ${isDisabled ? "cursor-not-allowed" : ""}`}
                  ></div>
                </label>
              </div>

              <div class="flex items-center">
                <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Split Band`}
                </span>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={splitBand}
                    class="peer sr-only"
                    onChange$={onSplitBandToggle}
                    disabled={isDisabled}
                  />
                  <div
                    class={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700 ${isDisabled ? "cursor-not-allowed" : ""}`}
                  ></div>
                </label>
              </div>

              <div class="flex items-center">
                <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isDisabled ? $localize`Enable` : $localize`Disable`}
                </span>
                <label class="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={!isDisabled}
                    class="peer sr-only"
                    onChange$={onDisabledToggle}
                  />
                  <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`Network Name (SSID)`}
                {!isDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  value={ssid}
                  onChange$={(e) =>
                    onSSIDChange((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  disabled={isDisabled}
                  class={`h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 
                       text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       ${isDisabled ? "cursor-not-allowed" : ""}`}
                  placeholder={$localize`Enter ${displayName} network name`}
                  required={!isDisabled}
                />
                <button
                  onClick$={generateNetworkSSID}
                  disabled={isLoading[`${networkKey}SSID`] || isDisabled}
                  class={`flex h-11 min-w-[160px] items-center justify-center gap-2 
                       rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600
                       ${isDisabled ? "cursor-not-allowed opacity-75" : ""}`}
                >
                  {isLoading[`${networkKey}SSID`] ? (
                    <Spinner size="xs" color="white" variant="circle" />
                  ) : (
                    <HiSparklesOutline class="h-5 w-5" />
                  )}
                  <span>{$localize`Generate SSID`}</span>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`Network Password`}
                {!isDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  value={password}
                  onChange$={(e) =>
                    onPasswordChange((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  disabled={isDisabled}
                  class={`h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 
                       text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       ${isDisabled ? "cursor-not-allowed" : ""}`}
                  placeholder={$localize`Enter ${displayName} password`}
                  required={!isDisabled}
                />
                <button
                  onClick$={generateNetworkPassword}
                  disabled={isLoading[`${networkKey}Password`] || isDisabled}
                  class={`flex h-11 min-w-[160px] items-center justify-center gap-2 
                       rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600
                       ${isDisabled ? "cursor-not-allowed opacity-75" : ""}`}
                >
                  {isLoading[`${networkKey}Password`] ? (
                    <Spinner size="xs" color="white" variant="circle" />
                  ) : (
                    <HiSparklesOutline class="h-5 w-5" />
                  )}
                  <span>{$localize`Generate Pass`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
