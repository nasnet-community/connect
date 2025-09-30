import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSocks5Server } from "./useSocks5Server";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { Input } from "~/components/Core";
import type { Networks } from "../../../../StarContext/CommonType";

export const Socks5ServerAdvanced = component$(() => {
  const { advancedFormState } = useSocks5Server();

  // Local state for form fields
  const selectedNetwork = useSignal<Networks>("Split");
  const port = useSignal<number>(1080);

  // Local handlers
  const updateNetwork$ = $((network: Networks) => {
    selectedNetwork.value = network;
    // Update the global state if needed
    if (advancedFormState) {
      advancedFormState.Network = network;
    }
  });

  const updatePort$ = $((value: number) => {
    port.value = value;
    // Update the global state if needed
    if (advancedFormState) {
      advancedFormState.Port = value;
    }
  });

  return (
    <ServerCard
      title={$localize`Socks5 Server`}
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

        {/* Port Configuration */}
        <div>
          <SectionTitle title={$localize`Port Configuration`} />
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Port`}
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
              {$localize`Default Socks5 port is 1080. Valid range is 1-65535.`}
            </p>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});