import { component$, type QRL } from "@builder.io/qwik";
import type { ConnectionType } from "../../types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface ConnectionTypeSelectorProps {
  connectionType?: ConnectionType;
  interfaceType: "Ethernet" | "Wireless" | "SFP" | "LTE";
  onUpdate$: QRL<(type: ConnectionType) => void>;
  mode: "easy" | "advanced";
}

export const ConnectionTypeSelector = component$<ConnectionTypeSelectorProps>(
  ({ connectionType, interfaceType, onUpdate$, mode }) => {
    const locale = useMessageLocale();
    const connectionTypeOptions = [
      {
        value: "DHCP" as ConnectionType,
        label: semanticMessages.wan_advanced_connection_type_dhcp(
          {},
          {
            locale,
          },
        ),
        description:
          semanticMessages.wan_advanced_connection_type_dhcp_description(
            {},
            { locale },
          ),
      },
      {
        value: "PPPoE" as ConnectionType,
        label: semanticMessages.wan_advanced_connection_type_pppoe(
          {},
          {
            locale,
          },
        ),
        description:
          semanticMessages.wan_advanced_connection_type_pppoe_description(
            {},
            { locale },
          ),
      },
      {
        value: "Static" as ConnectionType,
        label: semanticMessages.wan_advanced_connection_type_static(
          {},
          {
            locale,
          },
        ),
        description:
          semanticMessages.wan_advanced_connection_type_static_description(
            {},
            { locale },
          ),
      },
    ];

    // Simple non-reactive filtering to prevent loops
    const getAvailableTypes = () =>
      connectionTypeOptions.filter(
        (type) => type.value !== "Static" || mode === "advanced",
      );

    // LTE interfaces always use LTE connection type
    if (interfaceType === "LTE") {
      return (
        <div class="space-y-2" key="lte-selector">
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <svg
                class="h-4 w-4 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </span>
            {semanticMessages.wan_advanced_connection_type({}, { locale })}
          </label>
          <div class="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
            <p class="text-sm text-blue-700 dark:text-blue-300">
              {semanticMessages.wan_advanced_lte_connection_type(
                {},
                { locale },
              )}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div class="space-y-2" key={`selector-${mode}`}>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <svg
              class="h-4 w-4 text-primary-600 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </span>
          {semanticMessages.wan_advanced_connection_type({}, { locale })}
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

            return (
              <button
                key={type.value}
                type="button"
                onClick$={() => onUpdate$(type.value)}
                class={buttonClass}
                data-selected={isSelected ? "true" : "false"}
              >
                <div class="relative z-10 text-center">
                  <span
                    class={`block text-sm font-medium ${isSelected ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {type.label}
                  </span>
                  <span
                    class={`mt-1 block text-xs ${isSelected ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-500"}`}
                  >
                    {type.description}
                  </span>
                </div>
                {isSelected && (
                  <div class="absolute right-2 top-2">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-primary-500"></div>
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
