import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import { useHTTPProxyServer } from "./useHTTPProxyServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle, ServerButton } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { Input } from "~/components/Core";
import type { BaseNetworksType } from "~/components/Star/StarContext";

export const HTTPProxyServerAdvanced = component$(() => {
  const { advancedFormState } = useHTTPProxyServer();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");
  const port = useSignal<number>(8080);
  const allowedIPs = useSignal<string[]>(
    advancedFormState?.AllowedIPAddresses || []
  );

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
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

  const addIPAddress$ = $(() => {
    allowedIPs.value = [...allowedIPs.value, ""];
    if (advancedFormState) {
      advancedFormState.AllowedIPAddresses = allowedIPs.value;
    }
  });

  const removeIPAddress$ = $((index: number) => {
    allowedIPs.value = allowedIPs.value.filter((_, i) => i !== index);
    if (advancedFormState) {
      advancedFormState.AllowedIPAddresses = allowedIPs.value;
    }
  });

  const updateIPAddress$ = $((index: number, value: string) => {
    allowedIPs.value = allowedIPs.value.map((ip, i) =>
      i === index ? value : ip
    );
    if (advancedFormState) {
      advancedFormState.AllowedIPAddresses = allowedIPs.value;
    }
  });

  return (
    <ServerCard
      title={$localize`HTTP Proxy Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle title={$localize`Network Configuration`} />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={(network) => {
              updateNetwork$(network as BaseNetworksType);
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
              placeholder="8080"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {$localize`Default HTTP Proxy port is 8080. Valid range is 1-65535.`}
            </p>
          </div>
        </div>

        {/* Allowed IP Addresses */}
        <div>
          <div class="flex items-center justify-between mb-4">
            <SectionTitle title={$localize`Allowed IP Addresses`} />
            <ServerButton
              onClick$={addIPAddress$}
              primary={false}
              class="flex items-center gap-1"
            >
              <HiPlusCircleOutline class="h-4 w-4" />
              {$localize`Add IP`}
            </ServerButton>
          </div>
          <div class="space-y-3">
            {allowedIPs.value.length === 0 ? (
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$localize`No IP addresses configured. Click "Add IP" to allow specific networks or hosts.`}
              </p>
            ) : (
              allowedIPs.value.map((ip, index) => (
                <div key={index} class="flex items-center gap-2">
                  <div class="flex-1">
                    <Input
                      type="text"
                      value={ip}
                      onInput$={(e: any) => {
                        updateIPAddress$(index, e.target.value);
                      }}
                      placeholder="192.168.1.0/24 or 10.0.0.1"
                    />
                  </div>
                  <ServerButton
                    onClick$={() => removeIPAddress$(index)}
                    danger={true}
                    primary={false}
                    class="flex items-center gap-1"
                  >
                    <HiTrashOutline class="h-4 w-4" />
                    {$localize`Remove`}
                  </ServerButton>
                </div>
              ))
            )}
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {$localize`Enter IP addresses or CIDR ranges (e.g., 192.168.1.0/24, 10.0.0.1). Only these IPs will be allowed to use the proxy.`}
            </p>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});