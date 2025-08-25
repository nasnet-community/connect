import { component$, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField, SectionTitle } from "~/components/Core/Form/ServerField";
import { CheckboxGroup } from "~/components/Core/Form/Checkbox";
import { Input } from "~/components/Core/Input";
import { NetworkDropdown, type ExtendedNetworks } from "../../components/NetworkSelection";

export const PPTPServerAdvanced = component$(() => {
  const {
    advancedFormState,
    authOptions,
    toggleAuthMethod,
    updateDefaultProfile$,
    updateMaxMtu$,
    updateMaxMru$,
    updateKeepaliveTimeout$,
    updateNetwork$,
  } = usePPTPServer();

  // Create a wrapper for toggleAuthMethod that matches CheckboxGroup's expected signature
  const handleToggleAuthMethod = $((method: string) => {
    const isSelected = advancedFormState.authentication.includes(method as any);
    toggleAuthMethod(method, !isSelected);
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
            selectedNetwork={(advancedFormState.network as ExtendedNetworks) || "PPTP"}
            onNetworkChange$={(network) => {
              updateNetwork$(network);
            }}
            _vpnType="PPTP"
            label={$localize`Network`}
          />
        </div>

        {/* Authentication Methods */}
        <div>
          <SectionTitle title={$localize`Authentication Methods`} />
          <CheckboxGroup
            options={authOptions}
            selected={advancedFormState.authentication}
            onToggle$={handleToggleAuthMethod}
          />
        </div>

        {/* Connection Settings */}
        <div>
          <SectionTitle title={$localize`Connection Settings`} />
          <div class="grid gap-4 md:grid-cols-2">
            {/* Profile Name */}
            <ServerFormField label={$localize`Profile Name`}>
              <Input
                type="text"
                value={advancedFormState.defaultProfile}
                onChange$={(_, value) => updateDefaultProfile$(value)}
              />
            </ServerFormField>

            {/* MTU */}
            <ServerFormField label={$localize`Maximum MTU`}>
              <Input
                type="number"
                value={advancedFormState.maxMtu.toString()}
                onChange$={(_, value) =>
                  updateMaxMtu$(parseInt(value, 10) || 1450)
                }
              />
            </ServerFormField>

            {/* MRU */}
            <ServerFormField label={$localize`Maximum MRU`}>
              <Input
                type="number"
                value={advancedFormState.maxMru.toString()}
                onChange$={(_, value) =>
                  updateMaxMru$(parseInt(value, 10) || 1450)
                }
              />
            </ServerFormField>

            {/* Keepalive Timeout */}
            <ServerFormField label={$localize`Keepalive Timeout (s)`}>
              <Input
                type="number"
                value={advancedFormState.keepaliveTimeout.toString()}
                onChange$={(_, value) =>
                  updateKeepaliveTimeout$(parseInt(value, 10) || 30)
                }
              />
            </ServerFormField>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});
