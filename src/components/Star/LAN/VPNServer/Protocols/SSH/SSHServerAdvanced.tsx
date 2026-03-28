import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSSHServer } from "./useSSHServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import type { BaseNetworksType } from "~/components/Star/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const SSHServerAdvanced = component$(() => {
  const locale = useMessageLocale();
  const { advancedFormState } = useSSHServer();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    advancedFormState.Network = network;
  });

  return (
    <ServerCard
      title={semanticMessages.vpn_server_ssh_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle
            title={semanticMessages.zerotier_network_configuration(
              {},
              {
                locale,
              },
            )}
          />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={(network) => {
              updateNetwork$(network as BaseNetworksType);
            }}
            label={semanticMessages.vpn_server_network_label({}, { locale })}
          />
        </div>

        {/* SSH Information */}
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            {semanticMessages.vpn_server_ssh_description({}, { locale })}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});
