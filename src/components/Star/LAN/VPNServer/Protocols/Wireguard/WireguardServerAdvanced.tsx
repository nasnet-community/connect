import { component$, $, useComputed$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
  // HiEyeOutline,
  // HiEyeSlashOutline,
} from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField, ServerButton, SectionTitle } from "~/components/Core/Form/ServerField";
import { InterfaceNameInput } from "~/components/Core/Form/PrefixedInput";
import { Input } from "~/components/Core/Input";
import { TabNavigation } from "~/components/Core/Navigation/TabNavigation";
import { NetworkDropdown, type ExtendedNetworks } from "../../components/NetworkSelection";
import { useWireguardServer } from "./useWireguardServer";

interface WireguardServerAdvancedProps {
  hook: ReturnType<typeof useWireguardServer>;
}

export const WireguardServerAdvanced = component$<WireguardServerAdvancedProps>(({ hook }) => {
  const {
    draftConfigs,
    activeTabIndex,
    addServerTab$,
    removeServerTab$,
    switchTab$,
    updateName$,
    // updatePrivateKey$,
    // updateInterfaceAddress$,
    // updateMtu$,
    updateListenPort$,
    updateVSNetwork$,
    // handleGeneratePrivateKey,
    // showPrivateKey,
    // togglePrivateKeyVisibility,
    // privateKeyError,
    // addressError,
    portError,
  } = hook;

  // Generate tab options for TabNavigation
  const tabOptions = useComputed$(() =>
    draftConfigs.value.map((config, index) => ({
      id: `interface-${index}`,
      label: config.name,
      icon: <HiServerOutline class="h-4 w-4" />,
    }))
  );

  // Get current draft as a reactive computed value
  const currentDraft = useComputed$(() =>
    draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0]
  );

  return (
    <ServerCard
      title={$localize`WireGuard Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6 md:space-y-8">
        {/* Interface Management */}
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {$localize`WireGuard Interfaces`}
          </h3>
          <div class="flex items-center gap-2">
            <ServerButton
              onClick$={addServerTab$}
              primary={false}
              class="flex items-center gap-1"
            >
              <HiPlusCircleOutline class="h-4 w-4" />
              {$localize`Add Interface`}
            </ServerButton>
            {draftConfigs.value.length > 1 && (
              <ServerButton
                onClick$={() => removeServerTab$(activeTabIndex.value)}
                danger={true}
                primary={false}
                class="flex items-center gap-1"
              >
                <HiTrashOutline class="h-4 w-4" />
                {$localize`Remove`}
              </ServerButton>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabOptions.value}
          activeTab={`interface-${activeTabIndex.value}`}
          onSelect$={$((tabId: string) => {
            const index = parseInt(tabId.split("-")[1]);
            switchTab$(index);
          })}
          variant="underline"
          size="sm"
        />

        {/* Interface Configuration */}
        <div>
          <SectionTitle title={$localize`Interface Configuration`} />
          <div class="space-y-4">
            {/* Interface Name */}
            <InterfaceNameInput
              type="wireguard"
              value={currentDraft.value.name.replace("wg-server-", "")}
              onChange$={(event: Event, value: string) => {
                updateName$(`wg-server-${value || "1"}`);
              }}
              label={$localize`Interface Name`}
              placeholder="1"
            />

       

            {/* Network Selection */}
            <ServerFormField label={$localize`Network`}>
              <NetworkDropdown
                selectedNetwork={currentDraft.value.vsNetwork as ExtendedNetworks}
                onNetworkChange$={(network) => {
                  updateVSNetwork$(network as any);
                }}
              />
            </ServerFormField>

            {/* Listen Port */}
            <ServerFormField
              label={$localize`Listen Port`}
              errorMessage={portError.value}
            >
              <Input
                type="number"
                value={currentDraft.value.listenPort.toString()}
                onChange$={(_, value) => {
                  const port = parseInt(value, 10);
                  if (!isNaN(port)) {
                    updateListenPort$(port);
                  }
                }}
                placeholder="51820"
                validation={portError.value ? "invalid" : "default"}
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`UDP port for WireGuard connections`}
              </p>
            </ServerFormField>
          </div>
        </div>

        {/* Peer Configuration Note */}
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 class="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
            {$localize`Peer Configuration`}
          </h4>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {$localize`WireGuard peers are automatically configured based on the users you create in the Users step. Each user will get their own peer configuration with appropriate keys and allowed addresses.`}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});
