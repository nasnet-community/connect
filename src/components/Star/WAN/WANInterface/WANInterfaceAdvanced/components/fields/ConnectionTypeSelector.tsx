import { component$, type QRL } from "@builder.io/qwik";
import type { ConnectionType } from "../../../../../StarContext/WANType";

export interface ConnectionTypeSelectorProps {
  connectionType: ConnectionType;
  interfaceType: "Ethernet" | "Wireless" | "SFP" | "LTE";
  onUpdate$: QRL<(type: ConnectionType) => void>;
  mode: "easy" | "advanced";
}

export const ConnectionTypeSelector = component$<ConnectionTypeSelectorProps>(
  ({ connectionType, interfaceType, onUpdate$, mode }) => {
    // LTE interfaces always use LTE connection type
    if (interfaceType === "LTE") {
      return (
        <div class="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {$localize`LTE interfaces use LTE connection type`}
          </p>
        </div>
      );
    }

    const connectionTypes: Array<{
      value: ConnectionType;
      label: string;
      description: string;
    }> = [
      {
        value: "DHCP",
        label: $localize`DHCP Client`,
        description: $localize`Automatic configuration from ISP`,
      },
      {
        value: "PPPoE",
        label: $localize`PPPoE`,
        description: $localize`Username and password authentication`,
      },
      ...(mode === "advanced"
        ? [
            {
              value: "Static" as ConnectionType,
              label: $localize`Static IP`,
              description: $localize`Manual IP configuration`,
            },
          ]
        : []),
    ];

    return (
      <div class="space-y-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Connection Type`}
        </h4>

        <div class="space-y-2">
          {connectionTypes.map((type) => (
            <label
              key={type.value}
              class={`
              flex cursor-pointer items-start rounded-lg border p-3 transition-all
              ${
                connectionType === type.value
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }
            `}
            >
              <input
                type="radio"
                name={`connection-type-${Date.now()}`}
                class="mt-0.5 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
                checked={connectionType === type.value}
                onChange$={() => onUpdate$(type.value)}
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {type.label}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {type.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  },
);
