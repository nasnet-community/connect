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
    availableInterfaces,
    onSelect,
    isInterfaceSelectedInOtherMode,
    mode,
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
        <label class="text-text-secondary dark:text-text-dark-secondary text-sm font-medium">
          {$localize`Select ${mode} Interface`}
        </label>
        <Resource
          value={disabledStates}
          onPending={() => (
            <Select
              value={selectedInterface}
              onChange$={(value: string | string[]) => onSelect(value as string)}
              options={[
                { value: "", label: $localize`Select interface` },
                ...availableInterfaces.map((iface) => ({
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
                ...availableInterfaces.map((iface, index) => ({
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
