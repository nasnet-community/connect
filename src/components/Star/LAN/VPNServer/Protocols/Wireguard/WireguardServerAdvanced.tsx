import { component$, useSignal, $, useComputed$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField, ServerButton, SectionTitle } from "~/components/Core/Form/ServerField";
import { InterfaceNameInput } from "~/components/Core/Form/PrefixedInput";
import { Input } from "~/components/Core/Input";
import { TabNavigation } from "~/components/Core/Navigation/TabNavigation";
import { NetworkDropdown, type ExtendedNetworks } from "../../components/NetworkSelection";
import { useWireguardServer } from "./useWireguardServer";

export const WireguardServerAdvanced = component$(() => {
  const {
    advancedFormState,
    updateServerConfig,
  } = useWireguardServer();

  // Local network state (not part of VPN server config)
  const selectedNetwork = useSignal<string>("Wireguard");

  // Tab management for multiple interfaces
  const activeTab = useSignal("interface-1");
  const interfaces = useSignal([
    { id: "interface-1", suffix: "1" },
  ]);

  // Add new interface
  const addInterface$ = $(() => {
    const newId = `interface-${interfaces.value.length + 1}`;
    interfaces.value = [
      ...interfaces.value,
      { id: newId, suffix: (interfaces.value.length + 1).toString() },
    ];
    activeTab.value = newId;
  });

  // Update interface suffix
  const updateInterfaceSuffix$ = $((interfaceId: string, newSuffix: string) => {
    interfaces.value = interfaces.value.map(iface => 
      iface.id === interfaceId 
        ? { ...iface, suffix: newSuffix || "1" }
        : iface
    );
  });

  // Remove interface
  const removeInterface$ = $((interfaceId: string) => {
    if (interfaces.value.length > 1) {
      const filteredInterfaces = interfaces.value.filter(iface => iface.id !== interfaceId);
      interfaces.value = filteredInterfaces;
      if (activeTab.value === interfaceId) {
        activeTab.value = filteredInterfaces[0].id;
      }
    }
  });

  // Generate tab options for TabNavigation
  const tabOptions = useComputed$(() =>
    interfaces.value.map(iface => ({
      id: iface.id,
      label: `wg-server-${iface.suffix}`,
      icon: <HiServerOutline class="h-4 w-4" />,
    }))
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
              onClick$={addInterface$}
              primary={false}
              class="flex items-center gap-1"
            >
              <HiPlusCircleOutline class="h-4 w-4" />
              {$localize`Add Interface`}
            </ServerButton>
            {interfaces.value.length > 1 && (
              <ServerButton
                onClick$={() => removeInterface$(activeTab.value)}
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
          activeTab={activeTab.value}
          onSelect$={$((tabId: string) => {
            activeTab.value = tabId;
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
              value={interfaces.value.find(iface => iface.id === activeTab.value)?.suffix || ""}
              onChange$={(event: Event, value: string) => updateInterfaceSuffix$(activeTab.value, value)}
              label={$localize`Interface Name`}
              placeholder="1"
            />

            {/* Network Selection */}
            <ServerFormField label={$localize`Network`}>
              <NetworkDropdown
                selectedNetwork={selectedNetwork.value as ExtendedNetworks}
                onNetworkChange$={(network) => {
                  selectedNetwork.value = network;
                }}
              />
            </ServerFormField>




            {/* Listen Port */}
            <ServerFormField label={$localize`Listen Port`}>
              <Input
                type="number"
                value={advancedFormState.listenPort.toString()}
                onChange$={(_, value) =>
                  updateServerConfig({
                    listenPort: parseInt(value, 10) || 51820,
                  })
                }
                placeholder="51820"
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
