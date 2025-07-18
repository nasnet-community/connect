import type { InterfaceSelectorProps } from "./types";
import { component$, useResource$, Resource } from "@builder.io/qwik";

const interfaceDisplayNames: Record<string, string> = {
  "ether1": "Ethernet 1",
  "ether2": "Ethernet 2",
  "ether3": "Ethernet 3",
  "ether4": "Ethernet 4",
  "ether5": "Ethernet 5",
  "ether6": "Ethernet 6",
  "ether7": "Ethernet 7",
  "ether8": "Ethernet 8",
  
  "wlan1": "Wi-Fi 2.4GHz",
  "wlan2": "Wi-Fi 5GHz",
  
  "sfp-sfpplus1": "SFP+ Port",
};

export const InterfaceSelector = component$<InterfaceSelectorProps>(
  ({
    selectedInterface,
    availableInterfaces,
    onSelect,
    isInterfaceSelectedInOtherMode,
    mode
  }) => {
    const disabledStates = useResource$<boolean[]>(async ({ track }) => {
      track(() => availableInterfaces);

      if (!availableInterfaces) return [];

      return Promise.all(
        availableInterfaces.map((iface) =>
          isInterfaceSelectedInOtherMode(iface),
        ),
      );
    });

    const getDisplayName = (iface: string) => {
      return interfaceDisplayNames[iface] || iface;
    };

    return (
      <div class="space-y-2">
        <label class="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
          {$localize`Select ${mode} Interface`}
        </label>
        <select
          value={selectedInterface}
          onChange$={(_, el) => onSelect(el.value)}
          class="text-text-default focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-lg 
                    border border-border
                    bg-white px-4
                    py-2 focus:border-transparent
                    focus:ring-2 dark:border-border-dark dark:bg-surface-dark
                    dark:text-text-dark-default"
        >
          <option
            value=""
            class="dark:bg-surface-dark dark:text-text-dark-default"
          >
            {$localize`Select interface`}
          </option>
          <Resource
            value={disabledStates}
            onPending={() =>
              availableInterfaces?.map((iface) => (
                <option
                  key={iface}
                  value={iface}
                  disabled
                  class="dark:bg-surface-dark dark:text-text-dark-default"
                >
                  {getDisplayName(iface)}
                </option>
              ))
            }
            onResolved={(states) =>
              availableInterfaces?.map((iface, index) => (
                <option
                  key={iface}
                  value={iface}
                  disabled={states[index]}
                  class="dark:bg-surface-dark dark:text-text-dark-default"
                >
                  {getDisplayName(iface)}
                </option>
              ))
            }
          />
        </select>
      </div>
    );
  },
);
