import type { InterfaceSelectorProps } from "./types";
import { component$, useResource$, Resource } from "@builder.io/qwik";
import { Select } from "~/components/Core";

const interfaceDisplayNames: Record<string, string> = {
  ether1: "Ethernet 1",
  ether2: "Ethernet 2",
  ether3: "Ethernet 3",
  ether4: "Ethernet 4",
  ether5: "Ethernet 5",
  ether6: "Ethernet 6",
  ether7: "Ethernet 7",
  ether8: "Ethernet 8",

  wlan1: "Wi-Fi 2.4GHz",
  wlan2: "Wi-Fi 5GHz",

  "sfp-sfpplus1": "SFP+ Port",
};

export const InterfaceSelector = component$<InterfaceSelectorProps>(
  ({
    selectedInterface,
    selectedInterfaceType,
    availableInterfaces,
    onSelect,
    isInterfaceSelectedInOtherMode,
    mode,
  }) => {
    const getInterfacesForType = () => {
      switch (selectedInterfaceType.toLowerCase()) {
        case "ethernet":
          return availableInterfaces.ethernet;
        case "wireless":
          return availableInterfaces.wireless;
        case "sfp":
          return availableInterfaces.sfp;
        case "lte":
          return availableInterfaces.lte;
        default:
          return [];
      }
    };

    const currentInterfaces = getInterfacesForType();

    const disabledStates = useResource$<boolean[]>(async ({ track }) => {
      track(() => selectedInterfaceType);
      track(() => availableInterfaces);

      if (!currentInterfaces.length) return [];

      return Promise.all(
        currentInterfaces.map((iface) =>
          isInterfaceSelectedInOtherMode(iface),
        ),
      );
    });

    const getDisplayName = (iface: string) => {
      return interfaceDisplayNames[iface] || iface;
    };

    if (!selectedInterfaceType || !currentInterfaces.length) {
      return (
        <div class="space-y-2">
          <label class="text-text-secondary dark:text-text-dark-secondary text-sm font-medium">
            {$localize`Select ${mode} Interface`}
          </label>
          <div class="rounded-lg bg-gray-100 p-4 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {!selectedInterfaceType 
              ? $localize`Please select an interface type first`
              : $localize`No ${selectedInterfaceType} interfaces available`
            }
          </div>
        </div>
      );
    }

    return (
      <div class="space-y-2">
        <label class="text-text-secondary dark:text-text-dark-secondary text-sm font-medium">
          {$localize`Select ${selectedInterfaceType} Interface`}
        </label>
        <Resource
          value={disabledStates}
          onPending={() => (
            <Select
              value={selectedInterface}
              onChange$={(value: string | string[]) => onSelect(value as string)}
              options={[
                { value: "", label: $localize`Select interface` },
                ...currentInterfaces.map((iface) => ({
                  value: iface,
                  label: getDisplayName(iface),
                  disabled: true,
                })),
              ]}
            />
          )}
          onResolved={(states) => (
            <Select
              value={selectedInterface}
              onChange$={(value: string | string[]) => onSelect(value as string)}
              options={[
                { value: "", label: $localize`Select interface` },
                ...currentInterfaces.map((iface, index) => ({
                  value: iface,
                  label: getDisplayName(iface),
                  disabled: states[index],
                })),
              ]}
            />
          )}
        />
      </div>
    );
  },
);
