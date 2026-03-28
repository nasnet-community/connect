import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useZeroTierServer } from "./useZeroTierServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { Input, Alert } from "~/components/Core";
import type { BaseNetworksType } from "~/components/Star/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const ZeroTierServerAdvanced = component$(() => {
  const locale = useMessageLocale();
  const { advancedFormState } = useZeroTierServer();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");
  const networkId = useSignal<string>("");

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    advancedFormState.Network = network;
  });

  const updateNetworkId$ = $((value: string) => {
    networkId.value = value;
    // Update the global state if needed
    advancedFormState.ZeroTierNetworkID = value;
  });

  return (
    <ServerCard
      title={semanticMessages.zerotier_server_title({}, { locale })}
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

        {/* ZeroTier Network ID */}
        <div>
          <SectionTitle
            title={semanticMessages.zerotier_configuration_title(
              {},
              {
                locale,
              },
            )}
          />
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {semanticMessages.zerotier_network_id_label({}, { locale })}
            </label>
            <Input
              type="text"
              value={networkId.value}
              onInput$={(e: any) => {
                updateNetworkId$(e.target.value);
              }}
              placeholder={semanticMessages.zerotier_network_id_placeholder(
                {},
                { locale },
              )}
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {semanticMessages.zerotier_network_id_help({}, { locale })}
            </p>
          </div>
        </div>

        {/* ZeroTier Package Warning */}
        <Alert
          status="warning"
          title={semanticMessages.zerotier_package_required_title(
            {},
            {
              locale,
            },
          )}
        >
          <p class="text-sm">
            {semanticMessages.zerotier_package_required_description(
              {},
              {
                locale,
              },
            )}
          </p>
        </Alert>

        {/* ZeroTier Information */}
        <div class="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <p class="text-sm text-purple-800 dark:text-purple-200">
            {semanticMessages.zerotier_information({}, { locale })}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});
