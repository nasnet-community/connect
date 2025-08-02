import { component$, type QRL, $ } from "@builder.io/qwik";
import type { StaticIPConfig } from "../../../../../StarContext/WANType";

export interface StaticIPFieldsProps {
  config?: StaticIPConfig;
  onUpdate$: QRL<(config: StaticIPConfig) => void>;
  errors?: {
    ipAddress?: string[];
    subnet?: string[];
    gateway?: string[];
    primaryDns?: string[];
    secondaryDns?: string[];
  };
}

export const StaticIPFields = component$<StaticIPFieldsProps>(
  ({ config, onUpdate$, errors }) => {
    const updateField = $((field: keyof StaticIPConfig, value: string) => {
      onUpdate$({
        ipAddress: config?.ipAddress || "",
        subnet: config?.subnet || "",
        gateway: config?.gateway || "",
        primaryDns: config?.primaryDns || "",
        secondaryDns: config?.secondaryDns,
        [field]: value,
      });
    });

    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Static IP Settings`}
        </h4>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`IP Address`} <span class="text-error-500">*</span>
            </label>
            <input
              type="text"
              class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                   dark:bg-gray-700 dark:text-white
                   ${
                     errors?.ipAddress
                       ? "border-error-500 focus:border-error-500"
                       : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                   }`}
              value={config?.ipAddress || ""}
              onInput$={(e) =>
                updateField("ipAddress", (e.target as HTMLInputElement).value)
              }
              placeholder="192.168.1.100"
            />
            {errors?.ipAddress && (
              <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                {errors.ipAddress[0]}
              </p>
            )}
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Subnet Mask`} <span class="text-error-500">*</span>
            </label>
            <input
              type="text"
              class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                   dark:bg-gray-700 dark:text-white
                   ${
                     errors?.subnet
                       ? "border-error-500 focus:border-error-500"
                       : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                   }`}
              value={config?.subnet || ""}
              onInput$={(e) =>
                updateField("subnet", (e.target as HTMLInputElement).value)
              }
              placeholder="255.255.255.0"
            />
            {errors?.subnet && (
              <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                {errors.subnet[0]}
              </p>
            )}
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Gateway`} <span class="text-error-500">*</span>
            </label>
            <input
              type="text"
              class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                   dark:bg-gray-700 dark:text-white
                   ${
                     errors?.gateway
                       ? "border-error-500 focus:border-error-500"
                       : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                   }`}
              value={config?.gateway || ""}
              onInput$={(e) =>
                updateField("gateway", (e.target as HTMLInputElement).value)
              }
              placeholder="192.168.1.1"
            />
            {errors?.gateway && (
              <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                {errors.gateway[0]}
              </p>
            )}
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Primary DNS`} <span class="text-error-500">*</span>
            </label>
            <input
              type="text"
              class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                   dark:bg-gray-700 dark:text-white
                   ${
                     errors?.primaryDns
                       ? "border-error-500 focus:border-error-500"
                       : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                   }`}
              value={config?.primaryDns || ""}
              onInput$={(e) =>
                updateField("primaryDns", (e.target as HTMLInputElement).value)
              }
              placeholder="8.8.8.8"
            />
            {errors?.primaryDns && (
              <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                {errors.primaryDns[0]}
              </p>
            )}
          </div>

          <div class="md:col-span-2">
            <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Secondary DNS`}{" "}
              <span class="text-xs text-gray-400">{$localize`(Optional)`}</span>
            </label>
            <input
              type="text"
              class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                   dark:bg-gray-700 dark:text-white
                   ${
                     errors?.secondaryDns
                       ? "border-error-500 focus:border-error-500"
                       : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                   }`}
              value={config?.secondaryDns || ""}
              onInput$={(e) =>
                updateField(
                  "secondaryDns",
                  (e.target as HTMLInputElement).value,
                )
              }
              placeholder="8.8.4.4"
            />
            {errors?.secondaryDns && (
              <p class="mt-1 text-sm text-error-500 dark:text-error-400">
                {errors.secondaryDns[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },
);
