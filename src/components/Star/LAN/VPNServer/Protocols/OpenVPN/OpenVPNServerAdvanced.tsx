import { component$, $, useComputed$ } from "@builder.io/qwik";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { Card } from "~/components/Core/Card";
import { Field as FormField } from "~/components/Core/Form/Field";
import { InterfaceNameInput } from "~/components/Core/Form/PrefixedInput";
import { Input } from "~/components/Core/Input";
import { ServerButton } from "~/components/Core/Form/ServerField";
import { TabNavigation } from "~/components/Core/Navigation/TabNavigation";
import { UnifiedSelect as Select } from "~/components/Core/Select/UnifiedSelect";
import { NetworkDropdown } from "../../components/NetworkSelection";
import type { ExtendedNetworks } from "../../components/NetworkSelection";
import {
  HiServerOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";

export const OpenVPNServerAdvanced = component$(() => {
  const {
    draftConfigs,
    activeTabIndex,
    addServerTab$,
    removeServerTab$,
    switchTab$,
    protocolOptions,
    updateProtocol$,
    updatePort$,
    updateTcpPort$,
    updateUdpPort$,
    updateName$,
    // updateCertificate$,
    // updateAddressPool$,
    updateVSNetwork$,
    // certificateError,
    portError,
  } = useOpenVPNServer();

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

          {/* Tab Navigation for Interfaces */}
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

          {/* Interface Settings */}
          <div class="space-y-4">
            {/* Interface Name */}
            <InterfaceNameInput
              type="openvpn"
              value={currentDraft.value.name.replace("openvpn-", "")}
              onChange$={(event: Event, value: string) => {
                updateName$(`openvpn-${value || "1"}`);
              }}
              label={$localize`Interface Name`}
              placeholder="1"
            />



            {/* Network Selection */}
            <NetworkDropdown
              selectedNetwork={currentDraft.value.vsNetwork as ExtendedNetworks}
              onNetworkChange$={(network) => {
                updateVSNetwork$(network as any);
              }}
              label={$localize`Network`}
            />

            {/* Protocol */}
            <FormField label={$localize`Protocol`}>
              <Select
                options={protocolOptions}
                value={currentDraft.value.protocol}
                onChange$={(value) => {
                  updateProtocol$(Array.isArray(value) ? value[0] as any : value as any);
                }}
              />
            </FormField>

            {/* Port Configuration - Conditional rendering based on protocol */}
            {(currentDraft.value.protocol !== "tcp" && currentDraft.value.protocol !== "udp") ? (
              <>
                {/* TCP Port */}
                <FormField
                  label={$localize`TCP Port`}
                  helperText={portError.value && portError.value.includes("TCP") ? portError.value : undefined}
                >
                  <Input
                    type="number"
                    value={currentDraft.value.tcpPort.toString()}
                    onChange$={(event: Event, value: string) => {
                      const port = parseInt(value, 10);
                      if (!isNaN(port)) {
                        updateTcpPort$(port);
                      }
                    }}
                    placeholder="1194"
                    validation={portError.value && portError.value.includes("TCP") ? "invalid" : "default"}
                  />
                </FormField>
                
                {/* UDP Port */}
                <FormField
                  label={$localize`UDP Port`}
                  helperText={portError.value && portError.value.includes("UDP") ? portError.value : undefined}
                >
                  <Input
                    type="number"
                    value={currentDraft.value.udpPort.toString()}
                    onChange$={(event: Event, value: string) => {
                      const port = parseInt(value, 10);
                      if (!isNaN(port)) {
                        updateUdpPort$(port);
                      }
                    }}
                    placeholder="1195"
                    validation={portError.value && portError.value.includes("UDP") ? "invalid" : "default"}
                  />
                </FormField>
              </>
            ) : (
              /* Single Port for TCP or UDP */
              <FormField
                label={$localize`Port`}
                helperText={portError.value ? portError.value : undefined}
              >
                <Input
                  type="number"
                  value={currentDraft.value.port.toString()}
                  onChange$={(event: Event, value: string) => {
                    const port = parseInt(value, 10);
                    if (!isNaN(port)) {
                      updatePort$(port);
                    }
                  }}
                  placeholder="1-65535"
                  validation={portError.value ? "invalid" : "default"}
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
