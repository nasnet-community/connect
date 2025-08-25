import { component$, type QRL } from "@builder.io/qwik";
import { Input, Select, FormField } from "~/components/Core";
import type { VPNClientConfig, VPNType } from "../../types/VPNClientAdvancedTypes";

export interface VPNLinkContentProps {
  vpn: VPNClientConfig;
  validationErrors?: Record<string, string[]>;
  onUpdate$?: QRL<(updates: Partial<VPNClientConfig>) => void>;
}

export const VPNLinkContent = component$<VPNLinkContentProps>(
  ({ vpn, validationErrors = {}, onUpdate$ }) => {
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
            <div class="pb-4 border-b border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg class="h-3 w-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                {$localize`Basic Configuration`}
              </h4>
            </div>

            {/* VPN Name */}
            <FormField
              label={$localize`VPN Client Name`}
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
                placeholder={$localize`Enter VPN client name`}
              />
            </FormField>

            {/* Description */}
            <FormField
              label={$localize`Description (Optional)`}
              error={validationErrors[`vpn-${vpn.id}-description`][0]}
            >
              <Input
                type="text"
                value={vpn.description || ""}
                onInput$={(e) => {
                  if (onUpdate$) {
                    onUpdate$({ description: (e.target as HTMLInputElement).value });
                  }
                }}
                placeholder={$localize`Describe this VPN connection`}
              />
            </FormField>

            {/* VPN Type */}
            <FormField
              label={$localize`VPN Protocol`}
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
                placeholder={$localize`Select VPN protocol`}
              />
            </FormField>

            {/* Priority */}
            <FormField
              label={$localize`Priority`}
              error={validationErrors[`vpn-${vpn.id}-priority`][0]}
            >
              <Input
                type="number"
                value={vpn.priority.toString() || "1"}
                onInput$={(e) => {
                  if (onUpdate$) {
                    const priority = parseInt((e.target as HTMLInputElement).value) || 1;
                    onUpdate$({ priority });
                  }
                }}
                placeholder="1"
                min="1"
                max="10"
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`Lower numbers have higher priority (1 = highest priority)`}
              </p>
            </FormField>

            {/* Enabled/Disabled Toggle */}
            <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                  {$localize`Enable VPN Client`}
                </h5>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {$localize`Enable or disable this VPN connection`}
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={vpn.enabled}
                  onChange$={(e) => {
                    if (onUpdate$) {
                      onUpdate$({ enabled: (e.target as HTMLInputElement).checked });
                    }
                  }}
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          {/* Protocol-Specific Configuration */}
          <div class="space-y-6">
            <div class="pb-4 border-b border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <svg class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                {$localize`Protocol Configuration`}
              </h4>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`${vpn.type} specific settings`}
              </p>
            </div>

            {vpn.type === "Wireguard" && vpn.connectionConfig?.wireguard && (
              <div class="space-y-4">
                <FormField
                  label={$localize`Server Address`}
                  error={validationErrors[`vpn-${vpn.id}-server-address`][0]}
                >
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
                    placeholder={$localize`vpn.example.com or 192.168.1.1`}
                  />
                </FormField>

                <FormField
                  label={$localize`Server Port`}
                  error={validationErrors[`vpn-${vpn.id}-server-port`][0]}
                >
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
                  />
                </FormField>
              </div>
            )}

            {vpn.type === "OpenVPN" && vpn.connectionConfig?.openvpn && (
              <div class="space-y-4">
                <FormField
                  label={$localize`Server Address`}
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
                    placeholder={$localize`vpn.example.com or 192.168.1.1`}
                  />
                </FormField>

                <FormField
                  label={$localize`Server Port`}
                  error={validationErrors[`vpn-${vpn.id}-server-port`][0]}
                >
                  <Input
                    type="number"
                    value={vpn.connectionConfig.openvpn.Server.Port?.toString() || ""}
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
                  />
                </FormField>
              </div>
            )}

            {/* Other protocols would go here */}

            {!vpn.connectionConfig && (
              <div class="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {$localize`Select a VPN protocol to configure connection settings`}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500">
                  {$localize`Configuration fields will appear here based on your protocol choice`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);