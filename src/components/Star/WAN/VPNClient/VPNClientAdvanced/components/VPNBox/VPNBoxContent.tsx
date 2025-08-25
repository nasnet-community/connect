import { component$, type QRL } from "@builder.io/qwik";
import { Input, Select } from "~/components/Core";
import type { VPNClientConfig, VPNType } from "../../types/VPNClientAdvancedTypes";

export interface VPNBoxContentProps {
  vpn: VPNClientConfig;
  validationErrors?: Record<string, string[]>;
  onUpdate$?: QRL<(updates: Partial<VPNClientConfig>) => void>;
}

export const VPNBoxContent = component$<VPNBoxContentProps>(
  ({ vpn, validationErrors = {}, onUpdate$ }) => {
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
              {$localize`Basic Configuration`}
            </h4>

            {/* VPN Name */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`VPN Client Name`}
              </label>
              <Input
                type="text"
                value={vpn.name || ""}
                onInput$={(e) => {
                  if (onUpdate$) {
                    onUpdate$({ name: (e.target as HTMLInputElement).value });
                  }
                }}
                placeholder={$localize`Enter VPN client name`}
                class="mt-1"
              />
              {validationErrors[`vpn-${vpn.id}-name`] && (
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors[`vpn-${vpn.id}-name`][0]}
                </p>
              )}
            </div>

            {/* VPN Type */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`VPN Protocol`}
              </label>
              <Select
                value={vpn.type}
                onChange$={(value) => {
                  if (onUpdate$) {
                    onUpdate$({ type: value as VPNType });
                  }
                }}
                options={vpnTypeOptions}
                placeholder={$localize`Select VPN protocol`}
                class="mt-1"
              />
              {validationErrors[`vpn-${vpn.id}-type`] && (
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors[`vpn-${vpn.id}-type`][0]}
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
                      onUpdate$({ enabled: (e.target as HTMLInputElement).checked });
                    }
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {$localize`Enable this VPN client`}
                </span>
              </label>
            </div>
          </div>

          {/* Protocol-Specific Configuration */}
          <div class="space-y-4">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white">
              {$localize`Protocol Configuration`}
            </h4>

            {vpn.type === "Wireguard" && vpn.connectionConfig?.wireguard && (
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Server Address`}
                  </label>
                  <Input
                    type="text"
                    value={vpn.connectionConfig.wireguard.PeerEndpointAddress || ""}
                    onInput$={(e) => {
                      if (onUpdate$ && vpn.connectionConfig?.wireguard) {
                        onUpdate$({
                          connectionConfig: {
                            ...vpn.connectionConfig,
                            wireguard: {
                              ...vpn.connectionConfig.wireguard,
                              PeerEndpointAddress: (e.target as HTMLInputElement).value,
                            },
                          },
                        });
                      }
                    }}
                    placeholder={$localize`Enter server address`}
                    class="mt-1"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Server Port`}
                  </label>
                  <Input
                    type="number"
                    value={vpn.connectionConfig.wireguard.PeerEndpointPort.toString() || ""}
                    onInput$={(e) => {
                      if (onUpdate$ && vpn.connectionConfig?.wireguard) {
                        onUpdate$({
                          connectionConfig: {
                            ...vpn.connectionConfig,
                            wireguard: {
                              ...vpn.connectionConfig.wireguard,
                              PeerEndpointPort: parseInt((e.target as HTMLInputElement).value) || 51820,
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
                    {$localize`Server Address`}
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
                    placeholder={$localize`Enter server address`}
                    class="mt-1"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Server Port`}
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
                                Port: parseInt((e.target as HTMLInputElement).value) || 1194,
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
                  {$localize`Select a VPN protocol to configure connection settings`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
