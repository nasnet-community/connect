import { $, component$, type QRL, useContext } from "@builder.io/qwik";
import { HiExclamationTriangleOutline, HiSparklesOutline } from "@qwikest/icons/heroicons";
import { NetworkCard } from "./NetworkCard";
import type { NetworkKey, Networks } from "./type";
import { NETWORK_KEYS } from "./constants";
import { StarContext } from "../../StarContext/StarContext";
import { Button } from "~/components/Core";

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
    const starContext = useContext(StarContext);
    const isDomesticLinkEnabled =
      (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");

    // Filter network keys based on DomesticLink value
    const filteredNetworkKeys = NETWORK_KEYS.filter(
      (key) => isDomesticLinkEnabled || (key !== "domestic" && key !== "split"),
    );

    return (
      <div class="space-y-8">
        {/* Warning and Actions Header */}
        <div
          class="rounded-xl border border-warning-200 bg-gradient-to-r 
                  from-warning-50 to-warning-100 dark:border-warning-800 dark:from-warning-900/20 dark:to-warning-800/20"
        >
          <div class="p-4 sm:p-6">
            <div class="flex flex-col gap-6 lg:flex-row">
              <div class="flex flex-1 items-start space-x-3">
                <HiExclamationTriangleOutline class="mt-1 h-6 w-6 flex-shrink-0 text-warning-500" />
                <div>
                  <h3 class="font-medium text-warning-700 dark:text-warning-300">
                    {$localize`Multiple Networks`}
                  </h3>
                  <p class="mt-1 text-sm text-warning-600 dark:text-warning-400">
                    {$localize`Setting up multiple SSIDs will create separate networks for different purposes`}
                  </p>
                </div>
              </div>

              <Button
                onClick$={generateAllPasswords}
                disabled={isLoading.allPasswords}
                loading={isLoading.allPasswords}
                variant="primary"
                size="md"
                leftIcon
                class="w-full lg:w-auto min-w-[200px]"
              >
                <HiSparklesOutline q:slot="leftIcon" class="h-5 w-5" />
                {$localize`Generate Common Password`}
              </Button>
            </div>
          </div>
        </div>

        {/* Networks Grid */}
        <div class="grid gap-8">
          {filteredNetworkKeys.map((networkKey) => (
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
