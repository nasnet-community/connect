import { component$, type QRL } from "@builder.io/qwik";
import type { ConnectionType } from "../../types";

export interface ConnectionTypeSelectorProps {
  connectionType?: ConnectionType;
  interfaceType: "Ethernet" | "Wireless" | "SFP" | "LTE";
  onUpdate$: QRL<(type: ConnectionType) => void>;
  mode: "easy" | "advanced";
}

const connectionTypeOptions = [
  {
    value: "DHCP" as ConnectionType,
    label: "DHCP Client",
    description: "Automatic configuration from ISP",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    value: "PPPoE" as ConnectionType,
    label: "PPPoE",
    description: "Username and password authentication",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v4H5v-4a1 1 0 01.293-.707L9 12.586V11a2 2 0 012-2h2.172a2 2 0 011.414.586l1.414 1.414A2 2 0 0116 12v1.586l4.293 4.293A1 1 0 0121 18v-4h-2a6 6 0 00-6-6z" />
      </svg>
    ),
  },
  {
    value: "Static" as ConnectionType,
    label: "Static IP",
    description: "Manual IP configuration",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export const ConnectionTypeSelector = component$<ConnectionTypeSelectorProps>(
  ({ connectionType, interfaceType, onUpdate$, mode }) => {
    // Simple non-reactive filtering to prevent loops
    const getAvailableTypes = () => 
      connectionTypeOptions.filter((type) => 
        type.value !== "Static" || mode === "advanced"
      );

    // LTE interfaces always use LTE connection type
    if (interfaceType === "LTE") {
      return (
        <div class="space-y-2" key="lte-selector">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
            {$localize`Connection Type`}
          </label>
          <div class="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
            <p class="text-sm text-blue-700 dark:text-blue-300">
              {$localize`LTE interfaces use LTE connection type`}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div class="space-y-2" key={`selector-${mode}`}>
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </span>
          {$localize`Connection Type`}
        </label>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {getAvailableTypes().map((type) => {
            const isSelected = connectionType === type.value;
            
            // Use template literals for direct class assignment
            const buttonClass = `group relative overflow-hidden rounded-xl border-2 p-4 transition-all hover:scale-105 ${
              isSelected 
                ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20" 
                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            }`;

            const iconClass = `flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
              isSelected 
                ? "bg-primary-500 text-white" 
                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600"
            }`;

            return (
              <button
                key={type.value}
                type="button"
                onClick$={() => onUpdate$(type.value)}
                class={buttonClass}
                data-selected={isSelected ? "true" : "false"}
              >
                <div class="relative z-10 flex flex-col items-center gap-3">
                  <div class={iconClass}>
                    {type.icon}
                  </div>
                  <div class="text-center">
                    <span class={`text-sm font-medium block ${isSelected ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}>
                      {$localize`${type.label}`}
                    </span>
                    <span class={`text-xs mt-1 block ${isSelected ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-500"}`}>
                      {$localize`${type.description}`}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div class="absolute top-2 right-2">
                    <div class="h-2 w-2 rounded-full bg-primary-500 animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
