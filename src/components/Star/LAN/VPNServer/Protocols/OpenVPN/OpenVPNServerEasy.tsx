import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { Input } from "~/components/Core";
import { NetworkDropdown, type ExtendedNetworks } from "../../components/NetworkSelection";

export const OpenVPNServerEasy = component$(() => {
  const { easyFormState, passphraseError, updateEasyPassphrase$ } =
    useOpenVPNServer();
  
  // Local network state (not part of VPN server config)
  const selectedNetwork = useSignal<ExtendedNetworks>("VPN" as const);

  // Local handler for network updates
  const updateNetwork$ = $((network: ExtendedNetworks) => {
    selectedNetwork.value = network;
  });

  return (
    <ServerCard
      title={$localize`OpenVPN Server (TCP & UDP)`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <ServerFormField label={$localize`Network`}>
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={updateNetwork$}
          />
        </ServerFormField>

        {/* Certificate Key Passphrase */}
        <ServerFormField
          label={$localize`Certificate Key Passphrase`}
          errorMessage={passphraseError.value || (!passphraseError.value ? $localize`Creates both TCP and UDP OpenVPN servers with this passphrase` : undefined)}
        >
          <div class="relative">
            <Input
              type="password"
              value={easyFormState.certificateKeyPassphrase}
              onInput$={(event: Event, value: string) => {
                updateEasyPassphrase$(value);
              }}
              placeholder={$localize`Enter passphrase for both servers`}
              class="pr-10"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HiLockClosedOutline class="h-5 w-5" />
            </button>
          </div>
        </ServerFormField>
      </div>
    </ServerCard>
  );
});
