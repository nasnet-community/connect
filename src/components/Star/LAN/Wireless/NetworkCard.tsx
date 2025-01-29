import { component$, type QRL } from "@builder.io/qwik";
import { HiSparklesOutline, HiWifiOutline } from "@qwikest/icons/heroicons";
import type { NetworkKey } from "./type";
import { NETWORK_DESCRIPTIONS } from "./constants";

interface NetworkCardProps {
  networkKey: NetworkKey;
  ssid: string;
  password: string;
  onSSIDChange: QRL<(value: string) => void>;
  onPasswordChange: QRL<(value: string) => void>;
  generateNetworkSSID: QRL<() => Promise<void>>;
  generateNetworkPassword: QRL<() => Promise<void>>;
  isLoading: Record<string, boolean>;
}

export const NetworkCard = component$<NetworkCardProps>(
  ({
    networkKey,
    ssid,
    password,
    onSSIDChange,
    onPasswordChange,
    generateNetworkSSID,
    generateNetworkPassword,
    isLoading,
  }) => {
    const displayName =
      networkKey.charAt(0).toUpperCase() + networkKey.slice(1);

    return (
      <div
        class="rounded-xl border border-gray-200 bg-white shadow-sm 
                transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="p-6">
          <div class="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
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

          <div class="mt-6 space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`Network Name (SSID)`}
              </label>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  value={ssid}
                  onChange$={(e) =>
                    onSSIDChange((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  class="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 
                       text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter ${displayName} network name`}
                />
                <button
                  onClick$={generateNetworkSSID}
                  disabled={isLoading[`${networkKey}SSID`]}
                  class="flex h-11 min-w-[160px] items-center justify-center gap-2 
                       rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600"
                >
                  {isLoading[`${networkKey}SSID`] ? (
                    <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
              </label>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  value={password}
                  onChange$={(e) =>
                    onPasswordChange((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  class="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 
                       text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter ${displayName} password`}
                />
                <button
                  onClick$={generateNetworkPassword}
                  disabled={isLoading[`${networkKey}Password`]}
                  class="flex h-11 min-w-[160px] items-center justify-center gap-2 
                       rounded-lg bg-primary-500 px-6 text-white transition-all duration-200 hover:bg-primary-600"
                >
                  {isLoading[`${networkKey}Password`] ? (
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
      </div>
    );
  },
);
