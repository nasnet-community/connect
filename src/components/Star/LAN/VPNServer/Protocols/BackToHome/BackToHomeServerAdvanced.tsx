import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useBackToHomeServer } from "./useBackToHomeServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import type { BaseNetworksType } from "~/components/Star/StarContext";

export const BackToHomeServerAdvanced = component$(() => {
  const { advancedFormState } = useBackToHomeServer();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    if (advancedFormState) {
      advancedFormState.Network = network;
    }
  });

  return (
    <ServerCard
      title={$localize`BackToHome Server`}
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

        {/* BackToHome Information */}
        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <p class="text-sm text-green-800 dark:text-green-200">
            {$localize`BackToHome provides secure remote access to your home network from anywhere in the world.`}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});