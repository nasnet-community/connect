import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSSHServer } from "./useSSHServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import type { Networks } from "../../../../StarContext/CommonType";

export const SSHServerAdvanced = component$(() => {
  const { advancedFormState } = useSSHServer();

  // Local state for form fields
  const selectedNetwork = useSignal<Networks>("Split");

  // Local handlers
  const updateNetwork$ = $((network: Networks) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    if (advancedFormState) {
      advancedFormState.Network = network;
    }
  });

  return (
    <ServerCard
      title={$localize`SSH Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle title={$localize`Network Configuration`} />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={(network) => {
              updateNetwork$(network as Networks);
            }}
            label={$localize`Network`}
          />
        </div>

        {/* SSH Information */}
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            {$localize`SSH Server uses the standard SSH port 22 for secure remote access.`}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});