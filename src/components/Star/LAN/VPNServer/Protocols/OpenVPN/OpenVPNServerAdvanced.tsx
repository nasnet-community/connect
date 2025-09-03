import { component$, useSignal, $ } from "@builder.io/qwik";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { Card } from "~/components/Core/Card";
import { Field as FormField } from "~/components/Core/Form/Field";
import { InterfaceNameInput } from "~/components/Core/Form/PrefixedInput";
import { Input } from "~/components/Core/Input";
import { Button } from "~/components/Core/button";
import { TabNavigation } from "~/components/Core/Navigation/TabNavigation";
import { UnifiedSelect as Select } from "~/components/Core/Select/UnifiedSelect";
import { NetworkDropdown } from "../../components/NetworkSelection";
import {
  HiServerOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";

export const OpenVPNServerAdvanced = component$(() => {
  const {
    advancedFormState,
    protocolOptions,
    updateProtocol$,
    updatePort$,
    updateTcpPort$,
    updateUdpPort$,
    updateNetwork$,
  } = useOpenVPNServer();

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
      interfaces.value = interfaces.value.filter(iface => iface.id !== interfaceId);
      if (activeTab.value === interfaceId) {
        activeTab.value = interfaces.value[0].id;
      }
    }
  });

  // Generate tab options for TabNavigation
  const tabOptions = interfaces.value.map(iface => ({
    id: iface.id,
    label: `ovpn-server-${iface.suffix}`,
    icon: <HiServerOutline class="h-4 w-4" />,
  }));

  return (
    <Card hasHeader>
      <div q:slot="header" class="flex items-center gap-2">
        <HiServerOutline class="h-5 w-5" />
        <span class="font-medium">{$localize`OpenVPN Server`}</span>
      </div>
      
      <div class="space-y-6">
          {/* Interface Management */}
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {$localize`OpenVPN Interfaces`}
            </h3>
            <div class="flex items-center gap-2">
              <Button
                onClick$={addInterface$}
                variant="secondary"
                class="flex items-center gap-1"
              >
                <HiPlusCircleOutline class="h-4 w-4" />
                {$localize`Add Interface`}
              </Button>
              {interfaces.value.length > 1 && (
                <Button
                  onClick$={() => removeInterface$(activeTab.value)}
                  variant="secondary"
                  class="flex items-center gap-1 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/10"
                >
                  <HiTrashOutline class="h-4 w-4" />
                  {$localize`Remove`}
                </Button>
              )}
            </div>
          </div>

          {/* Tab Navigation for Interfaces */}
          <TabNavigation
            tabs={tabOptions}
            activeTab={activeTab.value}
            onSelect$={(tabId: string) => {
              activeTab.value = tabId;
            }}
            variant="underline"
            size="sm"
          />

          {/* Interface Settings */}
          <div class="space-y-4">
            {/* Interface Name */}
            <InterfaceNameInput
              type="openvpn"
              value={interfaces.value.find(iface => iface.id === activeTab.value)?.suffix || ""}
              onChange$={(event: Event, value: string) => updateInterfaceSuffix$(activeTab.value, value)}
              label={$localize`Interface Name`}
              placeholder="1"
            />

            {/* Network Selection */}
            <NetworkDropdown
              selectedNetwork={advancedFormState.network}
              onNetworkChange$={updateNetwork$}
              label={$localize`Network`}
            />

            {/* Protocol */}
            <FormField label={$localize`Protocol`}>
              <Select
                options={protocolOptions}
                value={advancedFormState.protocol}
                onChange$={(value) => {
                  updateProtocol$(Array.isArray(value) ? value[0] as any : value as any);
                }}
              />
            </FormField>

            {/* Port Configuration - Conditional rendering based on protocol */}
            {advancedFormState.protocol === "both" ? (
              <>
                {/* TCP Port */}
                <FormField label={$localize`TCP Port`}>
                  <Input
                    type="number"
                    value={advancedFormState.tcpPort.toString()}
                    onChange$={(event: Event, value: string) => {
                      updateTcpPort$(parseInt(value, 10) || 1194);
                    }}
                    placeholder="1194"
                  />
                </FormField>
                
                {/* UDP Port */}
                <FormField label={$localize`UDP Port`}>
                  <Input
                    type="number"
                    value={advancedFormState.udpPort.toString()}
                    onChange$={(event: Event, value: string) => {
                      updateUdpPort$(parseInt(value, 10) || 1195);
                    }}
                    placeholder="1195"
                  />
                </FormField>
              </>
            ) : (
              /* Single Port for TCP or UDP */
              <FormField label={$localize`Port`}>
                <Input
                  type="number"
                  value={advancedFormState.port.toString()}
                  onChange$={(event: Event, value: string) => {
                    updatePort$(parseInt(value, 10) || 1194);
                  }}
                  placeholder="1-65535"
                />
              </FormField>
            )}
          </div>

          {/* Certificate Configuration Note */}
          <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h4 class="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
              {$localize`Certificate Configuration`}
            </h4>
            <p class="text-sm text-blue-700 dark:text-blue-300">
              {$localize`Server certificates and security settings are configured in the Certificate step. This ensures consistent certificate management across all protocols that require them.`}
            </p>
          </div>
      </div>
    </Card>
  );
});
