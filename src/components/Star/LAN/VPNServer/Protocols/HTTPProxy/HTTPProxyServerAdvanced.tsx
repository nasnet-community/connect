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
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const HTTPProxyServerAdvanced = component$(() => {
  const locale = useMessageLocale();
  const {
    advancedFormState,
    updateNetwork$: updateHttpProxyNetwork$,
    updatePort$: updateHttpProxyPort$,
    updateAllowedIPAddresses$: updateHttpProxyAllowedIPAddresses$,
  } = useHTTPProxyServer();

  // Local state for form fields
  const selectedNetwork = useSignal<BaseNetworksType>("Split");
  const port = useSignal<number>(8080);
  const allowedIPs = useSignal<string[]>(advancedFormState.AllowedIPAddresses);

  // Local handlers
  const updateNetwork$ = $((network: BaseNetworksType) => {
    selectedNetwork.value = network;
    updateHttpProxyNetwork$(network);
  });

  const updatePort$ = $((value: number) => {
    port.value = value;
    updateHttpProxyPort$(value);
  });

  const addIPAddress$ = $(() => {
    allowedIPs.value = [...allowedIPs.value, ""];
    updateHttpProxyAllowedIPAddresses$(allowedIPs.value);
  });

  const removeIPAddress$ = $((index: number) => {
    allowedIPs.value = allowedIPs.value.filter((_, i) => i !== index);
    updateHttpProxyAllowedIPAddresses$(allowedIPs.value);
  });

  const updateIPAddress$ = $((index: number, value: string) => {
    allowedIPs.value = allowedIPs.value.map((ip, i) =>
      i === index ? value : ip,
    );
    updateHttpProxyAllowedIPAddresses$(allowedIPs.value);
  });

  return (
    <ServerCard
      title={semanticMessages.vpn_server_http_proxy_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle
            title={semanticMessages.zerotier_network_configuration(
              {},
              {
                locale,
              },
            )}
          />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={(network) => {
              updateNetwork$(network as BaseNetworksType);
            }}
            label={semanticMessages.vpn_server_network_label({}, { locale })}
          />
        </div>

        {/* Port Configuration */}
        <div>
          <SectionTitle
            title={semanticMessages.vpn_server_port_configuration(
              {},
              {
                locale,
              },
            )}
          />
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {semanticMessages.shared_port({}, { locale })}
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
              {semanticMessages.vpn_server_http_proxy_port_help(
                {},
                {
                  locale,
                },
              )}
            </p>
          </div>
        </div>

        {/* Allowed IP Addresses */}
        <div>
          <div class="mb-4 flex items-center justify-between">
            <SectionTitle
              title={semanticMessages.vpn_server_http_proxy_allowed_ips(
                {},
                {
                  locale,
                },
              )}
            />
            <ServerButton
              onClick$={addIPAddress$}
              primary={false}
              class="flex items-center gap-1"
            >
              <HiPlusCircleOutline class="h-4 w-4" />
              {semanticMessages.vpn_server_http_proxy_add_ip({}, { locale })}
            </ServerButton>
          </div>
          <div class="space-y-3">
            {allowedIPs.value.length === 0 ? (
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {semanticMessages.vpn_server_http_proxy_no_ips({}, { locale })}
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
                    {semanticMessages.shared_remove({}, { locale })}
                  </ServerButton>
                </div>
              ))
            )}
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {semanticMessages.vpn_server_http_proxy_allowed_ips_help(
                {},
                {
                  locale,
                },
              )}
            </p>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});
