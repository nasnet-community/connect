import { component$, type QRL, $ } from "@builder.io/qwik";
import type { VLANConfig, MACAddressConfig } from "../../types";
import { Input, Toggle, FormField } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface VLANMACFieldsProps {
  vlanConfig?: VLANConfig;
  macAddress?: MACAddressConfig;
  onUpdateVLAN$: QRL<(config?: VLANConfig) => void>;
  onUpdateMAC$: QRL<(config?: MACAddressConfig) => void>;
  _errors?: {
    vlan?: string[];
    mac?: string[];
  };
}

export const VLANMACFields = component$<VLANMACFieldsProps>(
  ({ vlanConfig, macAddress, onUpdateVLAN$, onUpdateMAC$ }) => {
    const locale = useMessageLocale();

    return (
      <div class="grid gap-4 sm:grid-cols-2">
        {/* VLAN Configuration Card */}
        <div class="group relative overflow-hidden rounded-xl border border-indigo-100 bg-white/80 p-4 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg dark:border-indigo-800/50 dark:bg-gray-800/80">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>

          <div class="relative space-y-3">
            {/* Toggle with modern design */}
            <label class="flex cursor-pointer items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                  <svg
                    class="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {semanticMessages.wan_advanced_vlan_tagging(
                      {},
                      { locale },
                    )}
                  </span>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {semanticMessages.wan_advanced_virtual_lan_isolation(
                      {},
                      { locale },
                    )}
                  </p>
                </div>
              </div>

              <Toggle
                checked={vlanConfig?.enabled || false}
                onChange$={$((checked: boolean) => {
                  if (checked) {
                    onUpdateVLAN$({
                      enabled: true,
                      id: vlanConfig?.id || 1,
                    });
                  } else {
                    onUpdateVLAN$(undefined);
                  }
                })}
                size="sm"
              />
            </label>

            {/* VLAN ID Input */}
            {vlanConfig?.enabled === true && (
              <FormField label="" helperText="VLAN ID (1-4094)">
                <Input
                  type="number"
                  min="1"
                  max="4094"
                  value={vlanConfig.id.toString() || "1"}
                  onInput$={(event: Event, value: string) => {
                    const numValue = parseInt(value) || 1;
                    onUpdateVLAN$({ enabled: true, id: numValue });
                  }}
                  placeholder="Enter VLAN ID"
                />
              </FormField>
            )}
          </div>
        </div>

        {/* MAC Address Configuration Card */}
        <div class="group relative overflow-hidden rounded-xl border border-purple-100 bg-white/80 p-4 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg dark:border-purple-800/50 dark:bg-gray-800/80">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>

          <div class="relative space-y-3">
            {/* Toggle with modern design */}
            <label class="flex cursor-pointer items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
                  <svg
                    class="h-4 w-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <div>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {semanticMessages.wan_advanced_mac_override(
                      {},
                      { locale },
                    )}
                  </span>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {semanticMessages.wan_advanced_custom_hardware_address(
                      {},
                      { locale },
                    )}
                  </p>
                </div>
              </div>

              <Toggle
                checked={macAddress?.enabled || false}
                onChange$={$((checked: boolean) => {
                  if (checked) {
                    onUpdateMAC$({
                      enabled: true,
                      address: macAddress?.address || "",
                    });
                  } else {
                    onUpdateMAC$(undefined);
                  }
                })}
                size="sm"
              />
            </label>

            {/* MAC Address Input */}
            {macAddress?.enabled === true && (
              <FormField label="" helperText="Format: XX:XX:XX:XX:XX:XX">
                <Input
                  type="text"
                  value={macAddress.address}
                  onInput$={(event: Event, value: string) => {
                    onUpdateMAC$({ enabled: true, address: value });
                  }}
                  placeholder="00:00:00:00:00:00"
                  class="font-mono"
                />
              </FormField>
            )}
          </div>
        </div>
      </div>
    );
  },
);
