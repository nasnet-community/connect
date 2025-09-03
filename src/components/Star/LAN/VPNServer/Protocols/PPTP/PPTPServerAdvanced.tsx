import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import { NetworkDropdown, type ExtendedNetworks } from "../../components/NetworkSelection";

export const PPTPServerAdvanced = component$(() => {
  const {
    advancedFormState,
    updateNetwork$,
  } = usePPTPServer();

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
            selectedNetwork={(advancedFormState.network as ExtendedNetworks) || "PPTP"}
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
