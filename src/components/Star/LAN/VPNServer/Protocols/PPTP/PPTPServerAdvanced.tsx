import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown, type ExtendedNetworks } from "../../components/NetworkSelection";

export const PPTPServerAdvanced = component$(() => {
  const {
    advancedFormState: _advancedFormState,
  } = usePPTPServer();
  
  // Local network state (not part of VPN server config)
  const selectedNetwork = useSignal<string>("PPTP");
  
  // Local handler for network updates
  const updateNetwork$ = $((network: string) => {
    selectedNetwork.value = network;
  });

  return (
    <ServerCard
      title={$localize`PPTP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle title={$localize`Network Configuration`} />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value as ExtendedNetworks}
            onNetworkChange$={(network) => {
              updateNetwork$(network);
            }}
            _vpnType="PPTP"
            label={$localize`Network`}
          />
        </div>

      </div>
    </ServerCard>
  );
});
