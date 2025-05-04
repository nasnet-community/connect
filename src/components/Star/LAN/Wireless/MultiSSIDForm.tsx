import { $, component$, type QRL } from "@builder.io/qwik";
import { HiExclamationTriangleOutline } from "@qwikest/icons/heroicons";
import { NetworkCard } from "./NetworkCard";
import type { NetworkKey, Networks } from "./type";
import { NETWORK_KEYS } from "./constants";

interface MultiSSIDFormProps {
  networks: Networks;
  isLoading: Record<string, boolean>;
  generateNetworkSSID: QRL<(network: NetworkKey) => Promise<void>>;
  generateNetworkPassword: QRL<(network: NetworkKey) => Promise<void>>;
  generateAllPasswords: QRL<() => Promise<void>>;
  toggleNetworkHide: QRL<(network: NetworkKey) => void>;
  toggleNetworkDisabled: QRL<(network: NetworkKey) => void>;
  toggleNetworkSplitBand: QRL<(network: NetworkKey) => void>;
}

export const MultiSSIDForm = component$<MultiSSIDFormProps>(
  ({
    networks,
    isLoading,
    generateNetworkSSID,
    generateNetworkPassword,
    generateAllPasswords,
    toggleNetworkHide,
    toggleNetworkDisabled,
    toggleNetworkSplitBand,
  }) => {
    return (
      <div class="space-y-8">
        {/* Warning and Actions Header */}
        <div
          class="from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20 
                  border-warning-200 dark:border-warning-800 rounded-xl border bg-gradient-to-r"
        >
          <div class="p-4 sm:p-6">
            <div class="flex flex-col gap-6 lg:flex-row">
              <div class="flex flex-1 items-start space-x-3">
                <HiExclamationTriangleOutline class="text-warning-500 mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 class="text-warning-700 dark:text-warning-300 font-medium">
                    {$localize`Multiple Networks`}
                  </h3>
                  <p class="text-warning-600 dark:text-warning-400 mt-1 text-sm">
                    {$localize`Setting up multiple SSIDs will create separate networks for different purposes`}
                  </p>
                </div>
              </div>

              <button
                onClick$={generateAllPasswords}
                disabled={isLoading.allPasswords}
                class="flex w-full min-w-[200px] items-center justify-center gap-2 
                     rounded-lg bg-primary-500 px-6 py-3 text-white transition-all 
                     duration-200 hover:bg-primary-600 lg:w-auto"
              >
                {isLoading.allPasswords ? (
                  <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  $localize`Generate Common Password`
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Networks Grid */}
        <div class="grid gap-8">
          {NETWORK_KEYS.map((networkKey) => (
            <NetworkCard
              key={networkKey}
              networkKey={networkKey}
              ssid={networks[networkKey].ssid}
              password={networks[networkKey].password}
              isHide={networks[networkKey].isHide}
              isDisabled={networks[networkKey].isDisabled}
              splitBand={networks[networkKey].splitBand}
              onSSIDChange={$((value: string) => {
                networks[networkKey].ssid = value;
              })}
              onPasswordChange={$((value: string) => {
                networks[networkKey].password = value;
              })}
              onHideToggle={$(() => toggleNetworkHide(networkKey))}
              onDisabledToggle={$(() => toggleNetworkDisabled(networkKey))}
              onSplitBandToggle={$(() => toggleNetworkSplitBand(networkKey))}
              generateNetworkSSID={$(() => generateNetworkSSID(networkKey))}
              generateNetworkPassword={$(() =>
                generateNetworkPassword(networkKey),
              )}
              isLoading={isLoading}
            />
          ))}
        </div>
        
        {/* Info Note */}
        <div class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {$localize`Note: At least one network must remain enabled. To save, fill out all required fields for enabled networks.`}
          </p>
        </div>
      </div>
    );
  },
);
