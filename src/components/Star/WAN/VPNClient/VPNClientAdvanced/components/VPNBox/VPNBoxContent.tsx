import { component$, type QRL } from "@builder.io/qwik";
import { Input, Select } from "~/components/Core";
import type {
  VPNClientConfig,
  VPNType,
} from "../../types/VPNClientAdvancedTypes";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface VPNBoxContentProps {
  vpn: VPNClientConfig;
  validationErrors?: Record<string, string[]>;
  onUpdate$?: QRL<(updates: Partial<VPNClientConfig>) => void>;
}

export const VPNBoxContent = component$<VPNBoxContentProps>(
  ({ vpn, validationErrors = {}, onUpdate$ }) => {
    const locale = useMessageLocale();
    const nameErrorKey = `vpn-${vpn.id}-name`;
    const typeErrorKey = `vpn-${vpn.id}-type`;
    const vpnTypeOptions = [
      { value: "Wireguard", label: "Wireguard" },
      { value: "OpenVPN", label: "OpenVPN" },
      { value: "L2TP", label: "L2TP" },
      { value: "PPTP", label: "PPTP" },
      { value: "SSTP", label: "SSTP" },
      { value: "IKeV2", label: "IKeV2" },
    ];

    return (
      <div class="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Basic Configuration */}
          <div class="space-y-4">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
              {semanticMessages.vpn_server_basic_configuration({}, { locale })}
            </h4>

            {/* VPN Name */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {semanticMessages.vpn_client_advanced_vpn_client_name(
                  {},
                  {
                    locale,
                  },
                )}
              </label>
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
                class="mt-1"
              />
              {nameErrorKey in validationErrors && (
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors[nameErrorKey][0]}
                </p>
              )}
            </div>

            {/* VPN Type */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {semanticMessages.vpn_client_advanced_protocol({}, { locale })}
              </label>
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
                class="mt-1"
              />
              {typeErrorKey in validationErrors && (
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors[typeErrorKey][0]}
                </p>
              )}
            </div>

            {/* Enabled/Disabled Toggle */}
            <div>
              <label class="flex items-center">
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
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {semanticMessages.vpn_client_advanced_enable_this_client(
                    {},
                    { locale },
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* Protocol-Specific Configuration */}
          <div class="space-y-4">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
              {semanticMessages.vpn_client_advanced_protocol_configuration_title(
                {},
                { locale },
              )}
            </h4>

            {vpn.type === "Wireguard" && vpn.connectionConfig?.wireguard && (
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.vpn_openvpn_server_address(
                      {},
                      {
                        locale,
                      },
                    )}
                  </label>
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
                    placeholder={semanticMessages.vpn_client_advanced_enter_server_address(
                      {},
                      { locale },
                    )}
                    class="mt-1"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.vpn_openvpn_server_port({}, { locale })}
                  </label>
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
                    class="mt-1"
                  />
                </div>
              </div>
            )}

            {vpn.type === "OpenVPN" && vpn.connectionConfig?.openvpn && (
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.vpn_openvpn_server_address(
                      {},
                      {
                        locale,
                      },
                    )}
                  </label>
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
                    placeholder={semanticMessages.vpn_client_advanced_enter_server_address(
                      {},
                      { locale },
                    )}
                    class="mt-1"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.vpn_openvpn_server_port({}, { locale })}
                  </label>
                  <Input
                    type="text"
                    value={vpn.connectionConfig.openvpn.Server.Port || ""}
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
                    class="mt-1"
                  />
                </div>
              </div>
            )}

            {!vpn.connectionConfig && (
              <div class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {semanticMessages.vpn_client_advanced_select_protocol_for_connection_settings(
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
