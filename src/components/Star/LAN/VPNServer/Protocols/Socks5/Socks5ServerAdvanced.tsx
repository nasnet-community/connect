import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSocks5Server } from "./useSocks5Server";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { Input } from "~/components/Core";
import type { BaseNetworksType } from "~/components/Star/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const Socks5ServerAdvanced = component$(() => {
  const locale = useMessageLocale();
  const { advancedFormState } = useSocks5Server();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");
  const port = useSignal<number>(1080);

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    advancedFormState.Network = network;
  });

  const updatePort$ = $((value: number) => {
    port.value = value;
    // Update the global state if needed
    advancedFormState.Port = value;
  });

  return (
    <ServerCard
      title={semanticMessages.vpn_server_socks5_title({}, { locale })}
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

        {/* Port Configuration */}
        <div>
          <SectionTitle
            title={semanticMessages.vpn_server_port_configuration(
              {},
              {
                locale,
              },
            )}
          />
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {semanticMessages.shared_port({}, { locale })}
            </label>
            <Input
              type="number"
              value={port.value.toString()}
              onInput$={(e: any) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value > 0 && value <= 65535) {
                  updatePort$(value);
                }
              }}
              min={1}
              max={65535}
              placeholder="1080"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {semanticMessages.vpn_server_socks5_port_help({}, { locale })}
            </p>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});
