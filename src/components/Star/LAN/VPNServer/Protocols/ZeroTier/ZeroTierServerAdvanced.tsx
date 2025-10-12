import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useZeroTierServer } from "./useZeroTierServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { Input, Alert } from "~/components/Core";
import type { BaseNetworksType } from "~/components/Star/StarContext";

export const ZeroTierServerAdvanced = component$(() => {
  const { advancedFormState } = useZeroTierServer();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");
  const networkId = useSignal<string>("");

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    if (advancedFormState) {
      advancedFormState.Network = network;
    }
  });

  const updateNetworkId$ = $((value: string) => {
    networkId.value = value;
    // Update the global state if needed
    if (advancedFormState) {
      advancedFormState.ZeroTierNetworkID = value;
    }
  });

  return (
    <ServerCard
      title={$localize`ZeroTier Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle title={$localize`Network Configuration`} />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={(network) => {
              updateNetwork$(network as BaseNetworksType);
            }}
            label={$localize`Network`}
          />
        </div>

        {/* ZeroTier Network ID */}
        <div>
          <SectionTitle title={$localize`ZeroTier Configuration`} />
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`ZeroTier Network ID`}
            </label>
            <Input
              type="text"
              value={networkId.value}
              onInput$={(e: any) => {
                updateNetworkId$(e.target.value);
              }}
              placeholder="Enter 16-digit network ID"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {$localize`Enter your 16-digit ZeroTier network ID from your ZeroTier Central account.`}
            </p>
          </div>
        </div>

        {/* ZeroTier Package Warning */}
        <Alert
          status="warning"
          title={$localize`Package Installation Required`}
        >
          <p class="text-sm">
            {$localize`You must install the ZeroTier package on your MikroTik router before importing this configuration. Visit the MikroTik package repository to download and install the zerotier package.`}
          </p>
        </Alert>

        {/* ZeroTier Information */}
        <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <p class="text-sm text-purple-800 dark:text-purple-200">
            {$localize`ZeroTier creates a secure, peer-to-peer virtual network that works anywhere.`}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});