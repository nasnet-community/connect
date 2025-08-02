import { component$, type QRL } from "@builder.io/qwik";
import type {
  VLANConfig,
  MACAddressConfig,
} from "../../../../../StarContext/WANType";

export interface VLANMACFieldsProps {
  vlanConfig?: VLANConfig;
  macAddress?: MACAddressConfig;
  onUpdateVLAN$: QRL<(config?: VLANConfig) => void>;
  onUpdateMAC$: QRL<(config?: MACAddressConfig) => void>;
  errors?: {
    vlan?: string[];
    mac?: string[];
  };
}

export const VLANMACFields = component$<VLANMACFieldsProps>(
  ({ vlanConfig, macAddress, onUpdateVLAN$, onUpdateMAC$, errors }) => {
    return (
      <div class="space-y-4 rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">
          {$localize`Advanced Network Settings`}
        </h4>

        {/* VLAN Configuration */}
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 
                   dark:border-gray-600 dark:bg-gray-700"
              checked={vlanConfig?.enabled || false}
              onChange$={(e) => {
                const checked = (e.target as HTMLInputElement).checked;
                if (checked) {
                  onUpdateVLAN$({ enabled: true, id: vlanConfig?.id || 1 });
                } else {
                  onUpdateVLAN$(undefined);
                }
              }}
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Use VLAN`}
            </span>
          </label>

          {vlanConfig?.enabled && (
            <div class="ml-6">
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`VLAN ID`}
              </label>
              <input
                type="number"
                min="1"
                max="4094"
                class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                     dark:bg-gray-700 dark:text-white
                     ${
                       errors?.vlan
                         ? "border-error-500 focus:border-error-500"
                         : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                     }`}
                value={vlanConfig.id}
                onInput$={(e) => {
                  const value =
                    parseInt((e.target as HTMLInputElement).value) || 1;
                  onUpdateVLAN$({ enabled: true, id: value });
                }}
                placeholder="1-4094"
              />
              {errors?.vlan && (
                <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                  {errors.vlan[0]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* MAC Address Configuration */}
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 
                   dark:border-gray-600 dark:bg-gray-700"
              checked={macAddress?.enabled || false}
              onChange$={(e) => {
                const checked = (e.target as HTMLInputElement).checked;
                if (checked) {
                  onUpdateMAC$({
                    enabled: true,
                    address: macAddress?.address || "",
                  });
                } else {
                  onUpdateMAC$(undefined);
                }
              }}
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Use specific MAC address`}
            </span>
          </label>

          {macAddress?.enabled && (
            <div class="ml-6">
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`MAC Address`}
              </label>
              <input
                type="text"
                class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                     dark:bg-gray-700 dark:text-white
                     ${
                       errors?.mac
                         ? "border-error-500 focus:border-error-500"
                         : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                     }`}
                value={macAddress.address}
                onInput$={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  onUpdateMAC$({ enabled: true, address: value });
                }}
                placeholder="00:00:00:00:00:00"
              />
              {errors?.mac && (
                <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                  {errors.mac[0]}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
