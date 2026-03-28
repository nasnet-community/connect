import { component$, type QRL } from "@builder.io/qwik";
import { Input, Select, FormField } from "~/components/Core";
import type {
  VPNClientConfig,
  VPNType,
} from "../../types/VPNClientAdvancedTypes";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface VPNLinkContentProps {
  vpn: VPNClientConfig;
  validationErrors?: Record<string, string[]>;
  onUpdate$?: QRL<(updates: Partial<VPNClientConfig>) => void>;
}

export const VPNLinkContent = component$<VPNLinkContentProps>(
  ({ vpn, validationErrors = {}, onUpdate$ }) => {
    const locale = useMessageLocale();
    const vpnTypeOptions = [
      { value: "Wireguard", label: "WireGuard" },
      { value: "OpenVPN", label: "OpenVPN" },
      { value: "L2TP", label: "L2TP/IPSec" },
      { value: "PPTP", label: "PPTP" },
      { value: "SSTP", label: "SSTP" },
      { value: "IKeV2", label: "IKEv2/IPSec" },
    ];

    return (
      <div class="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Basic Configuration */}
          <div class="space-y-6">
            <div class="border-b border-gray-200 pb-4 dark:border-gray-700">
              <h4 class="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg
                    class="h-3 w-3 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                {semanticMessages.vpn_server_basic_configuration(
                  {},
                  { locale },
                )}
              </h4>
            </div>

            {/* VPN Name */}
            <FormField
              label={semanticMessages.vpn_client_advanced_vpn_client_name(
                {},
                {
                  locale,
                },
              )}
              error={validationErrors[`vpn-${vpn.id}-name`][0]}
            >
              <Input
                type="text"
                value={vpn.name || ""}
                onInput$={(e) => {
                  if (onUpdate$) {
                    onUpdate$({ name: (e.target as HTMLInputElement).value });
                  }
                }}
                placeholder={semanticMessages.vpn_client_advanced_enter_vpn_client_name(
                  {},
                  { locale },
                )}
              />
            </FormField>

            {/* Description */}
            <FormField
              label={semanticMessages.vpn_client_advanced_description_optional(
                {},
                { locale },
              )}
              error={validationErrors[`vpn-${vpn.id}-description`][0]}
            >
              <Input
                type="text"
                value={vpn.description || ""}
                onInput$={(e) => {
                  if (onUpdate$) {
                    onUpdate$({
                      description: (e.target as HTMLInputElement).value,
                    });
                  }
                }}
                placeholder={semanticMessages.vpn_client_advanced_describe_connection(
                  {},
                  { locale },
                )}
              />
            </FormField>

            {/* VPN Type */}
            <FormField
              label={semanticMessages.vpn_client_advanced_protocol(
                {},
                { locale },
              )}
              error={validationErrors[`vpn-${vpn.id}-type`][0]}
            >
              <Select
                value={vpn.type}
                onChange$={(value) => {
                  if (onUpdate$) {
                    onUpdate$({ type: value as VPNType });
                  }
                }}
                options={vpnTypeOptions}
                placeholder={semanticMessages.vpn_client_advanced_select_protocol(
                  {},
                  { locale },
                )}
              />
            </FormField>

            {/* Priority */}
            <FormField
              label={semanticMessages.wan_advanced_priority({}, { locale })}
              error={validationErrors[`vpn-${vpn.id}-priority`][0]}
            >
              <Input
                type="number"
                value={vpn.priority.toString() || "1"}
                onInput$={(e) => {
                  if (onUpdate$) {
                    const priority =
                      parseInt((e.target as HTMLInputElement).value) || 1;
                    onUpdate$({ priority });
                  }
                }}
                placeholder="1"
                min="1"
                max="10"
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_priority_order_note(
                  {},
                  {
                    locale,
                  },
                )}
              </p>
            </FormField>

            {/* Enabled/Disabled Toggle */}
            <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div>
                <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                  {semanticMessages.vpn_client_advanced_enable_vpn_client(
                    {},
                    {
                      locale,
                    },
                  )}
                </h5>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {semanticMessages.vpn_client_advanced_enable_or_disable_connection(
                    {},
                    { locale },
                  )}
                </p>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={vpn.enabled}
                  onChange$={(e) => {
                    if (onUpdate$) {
                      onUpdate$({
                        enabled: (e.target as HTMLInputElement).checked,
                      });
                    }
                  }}
                  class="peer sr-only"
                />
                <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-primary-800"></div>
              </label>
            </div>
          </div>

          {/* Protocol-Specific Configuration */}
          <div class="space-y-6">
            <div class="border-b border-gray-200 pb-4 dark:border-gray-700">
              <h4 class="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <svg
                    class="h-3 w-3 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                {semanticMessages.vpn_client_advanced_protocol_configuration_title(
                  {},
                  { locale },
                )}
              </h4>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_protocol_specific_settings(
                  {
                    type:
                      vpn.type ||
                      semanticMessages.vpn_client_advanced_protocol(
                        {},
                        {
                          locale,
                        },
                      ),
                  },
                  { locale },
                )}
              </p>
            </div>

            {vpn.type === "Wireguard" && vpn.connectionConfig?.wireguard && (
              <div class="space-y-4">
                <FormField
                  label={semanticMessages.vpn_openvpn_server_address(
                    {},
                    {
                      locale,
                    },
                  )}
                  error={validationErrors[`vpn-${vpn.id}-server-address`][0]}
                >
                  <Input
                    type="text"
                    value={
                      vpn.connectionConfig.wireguard.PeerEndpointAddress || ""
                    }
                    onInput$={(e) => {
                      if (onUpdate$ && vpn.connectionConfig?.wireguard) {
                        onUpdate$({
                          connectionConfig: {
                            ...vpn.connectionConfig,
                            wireguard: {
                              ...vpn.connectionConfig.wireguard,
                              PeerEndpointAddress: (
                                e.target as HTMLInputElement
                              ).value,
                            },
                          },
                        });
                      }
                    }}
                    placeholder={semanticMessages.vpn_client_advanced_server_example(
                      {},
                      { locale },
                    )}
                  />
                </FormField>

                <FormField
                  label={semanticMessages.vpn_openvpn_server_port(
                    {},
                    {
                      locale,
                    },
                  )}
                  error={validationErrors[`vpn-${vpn.id}-server-port`][0]}
                >
                  <Input
                    type="number"
                    value={
                      vpn.connectionConfig.wireguard.PeerEndpointPort.toString() ||
                      ""
                    }
                    onInput$={(e) => {
                      if (onUpdate$ && vpn.connectionConfig?.wireguard) {
                        onUpdate$({
                          connectionConfig: {
                            ...vpn.connectionConfig,
                            wireguard: {
                              ...vpn.connectionConfig.wireguard,
                              PeerEndpointPort:
                                parseInt(
                                  (e.target as HTMLInputElement).value,
                                ) || 51820,
                            },
                          },
                        });
                      }
                    }}
                    placeholder="51820"
                  />
                </FormField>
              </div>
            )}

            {vpn.type === "OpenVPN" && vpn.connectionConfig?.openvpn && (
              <div class="space-y-4">
                <FormField
                  label={semanticMessages.vpn_openvpn_server_address(
                    {},
                    {
                      locale,
                    },
                  )}
                  error={validationErrors[`vpn-${vpn.id}-server-address`][0]}
                >
                  <Input
                    type="text"
                    value={vpn.connectionConfig.openvpn.Server.Address || ""}
                    onInput$={(e) => {
                      if (onUpdate$ && vpn.connectionConfig?.openvpn) {
                        onUpdate$({
                          connectionConfig: {
                            ...vpn.connectionConfig,
                            openvpn: {
                              ...vpn.connectionConfig.openvpn,
                              Server: {
                                ...vpn.connectionConfig.openvpn.Server,
                                Address: (e.target as HTMLInputElement).value,
                              },
                            },
                          },
                        });
                      }
                    }}
                    placeholder={semanticMessages.vpn_client_advanced_server_example(
                      {},
                      { locale },
                    )}
                  />
                </FormField>

                <FormField
                  label={semanticMessages.vpn_openvpn_server_port(
                    {},
                    {
                      locale,
                    },
                  )}
                  error={validationErrors[`vpn-${vpn.id}-server-port`][0]}
                >
                  <Input
                    type="number"
                    value={
                      vpn.connectionConfig.openvpn.Server.Port?.toString() || ""
                    }
                    onInput$={(e) => {
                      if (onUpdate$ && vpn.connectionConfig?.openvpn) {
                        onUpdate$({
                          connectionConfig: {
                            ...vpn.connectionConfig,
                            openvpn: {
                              ...vpn.connectionConfig.openvpn,
                              Server: {
                                ...vpn.connectionConfig.openvpn.Server,
                                Port:
                                  parseInt(
                                    (e.target as HTMLInputElement).value,
                                  ) || 1194,
                              },
                            },
                          },
                        });
                      }
                    }}
                    placeholder="1194"
                  />
                </FormField>
              </div>
            )}

            {/* Other protocols would go here */}

            {!vpn.connectionConfig && (
              <div class="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {semanticMessages.vpn_client_advanced_select_protocol_for_connection_settings(
                    {},
                    { locale },
                  )}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500">
                  {semanticMessages.vpn_client_advanced_configuration_fields_appear(
                    {},
                    { locale },
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
