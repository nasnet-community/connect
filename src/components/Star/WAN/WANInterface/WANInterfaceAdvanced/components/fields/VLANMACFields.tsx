import { component$, type QRL } from "@builder.io/qwik";
import type {
  VLANConfig,
  MACAddressConfig,
} from "../../../../../StarContext/WANType";
import { Input, Toggle, FormField } from "~/components/Core";

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
    return (
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 p-5">
        {/* Background decoration */}
        <div class="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-2xl"></div>
        
        <div class="relative space-y-4">
          {/* Header with icon */}
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-100 dark:to-purple-100 bg-clip-text text-transparent">
              {$localize`Advanced Network Settings`}
            </h4>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            {/* VLAN Configuration Card */}
            <div class="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-indigo-100 dark:border-indigo-800/50 p-4 transition-all hover:shadow-lg hover:scale-[1.02]">
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="relative space-y-3">
                {/* Toggle with modern design */}
                <label class="flex items-center justify-between cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                      <svg class="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <span class="text-sm font-semibold text-gray-900 dark:text-white">
                        {$localize`VLAN Tagging`}
                      </span>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {$localize`Virtual LAN isolation`}
                      </p>
                    </div>
                  </div>
                  
                  <Toggle
                    checked={vlanConfig?.enabled || false}
                    onChange$={(checked: boolean) => {
                      if (checked) {
                        onUpdateVLAN$({ enabled: true, id: vlanConfig?.id || 1 });
                      } else {
                        onUpdateVLAN$(undefined);
                      }
                    }}
                    size="sm"
                  />
                </label>
                
                {/* VLAN ID Input */}
                {vlanConfig?.enabled === true && (
                  <FormField
                    label=""
                    helperText="VLAN ID (1-4094)"
                  >
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
            <div class="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-100 dark:border-purple-800/50 p-4 transition-all hover:shadow-lg hover:scale-[1.02]">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="relative space-y-3">
                {/* Toggle with modern design */}
                <label class="flex items-center justify-between cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
                      <svg class="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <div>
                      <span class="text-sm font-semibold text-gray-900 dark:text-white">
                        {$localize`MAC Override`}
                      </span>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {$localize`Custom hardware address`}
                      </p>
                    </div>
                  </div>
                  
                  <Toggle
                    checked={macAddress?.enabled || false}
                    onChange$={(checked: boolean) => {
                      if (checked) {
                        onUpdateMAC$({
                          enabled: true,
                          address: macAddress?.address || "",
                        });
                      } else {
                        onUpdateMAC$(undefined);
                      }
                    }}
                    size="sm"
                  />
                </label>
                
                {/* MAC Address Input */}
                {macAddress?.enabled === true && (
                  <FormField
                    label=""
                    helperText="Format: XX:XX:XX:XX:XX:XX"
                  >
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
        </div>
      </div>
    );
  },
);
