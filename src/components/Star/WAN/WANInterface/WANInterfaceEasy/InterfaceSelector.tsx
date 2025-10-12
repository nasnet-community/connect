import type { InterfaceSelectorProps } from "./types";
import { component$, useResource$, Resource, useContext } from "@builder.io/qwik";
import { Select } from "~/components/Core";
import { StarContext } from "../../../StarContext/StarContext";
import {
  getMasterOccupiedInterfaces,
  getUsedLTEInterfaces
} from "../../../utils/InterfaceManagementUtils";

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
    mode,
  }) => {
    const starContext = useContext(StarContext);
    const getInterfacesForType = () => {
      switch (selectedInterfaceType.toLowerCase()) {
        case "ethernet":
          return availableInterfaces.Interfaces.ethernet || [];
        case "wireless":
          return availableInterfaces.Interfaces.wireless || [];
        case "sfp":
          return availableInterfaces.Interfaces.sfp || [];
        case "lte":
          return availableInterfaces.Interfaces.lte || [];
        default:
          return [];
      }
    };

    const currentInterfaces = getInterfacesForType();

    const disabledStates = useResource$<Array<{ disabled: boolean; reason?: string }>>(async ({ track }) => {
      track(() => selectedInterfaceType);
      track(() => availableInterfaces);
      track(() => starContext.state.Choose.RouterModels);
      track(() => starContext.state.WAN.WANLink);

      if (!currentInterfaces.length) return [];

      // Only check master router's occupied interfaces
      const occupiedInterfaces = getMasterOccupiedInterfaces(
        starContext.state.Choose.RouterModels
      );

      // Get list of LTE interfaces currently in use (excluding current link)
      const linkName = `${mode} Link`; // Easy mode uses consistent naming: "Foreign Link" or "Domestic Link"
      const usedLTEInterfaces = getUsedLTEInterfaces(
        starContext.state.WAN.WANLink,
        linkName
      );

      return Promise.all(
        currentInterfaces.map(async (iface) => {
          // Check if interface is occupied by Trunk (always block Trunk interfaces)
          const usage = occupiedInterfaces.find(item => item.interface === iface)?.UsedFor;
          const isTrunk = usage === "Trunk";

          // Check if this is an LTE interface and if it's already in use
          const isLTEInUse = selectedInterfaceType.toLowerCase() === "lte" &&
                            usedLTEInterfaces.includes(iface);

          const disabled = isTrunk || isLTEInUse;
          const reason = isTrunk ? "Trunk" : isLTEInUse ? "In Use" : undefined;

          return { disabled, reason };
        }),
      );
    });

    const getDisplayName = (iface: string, state: { disabled: boolean; reason?: string }) => {
      const baseName = interfaceDisplayNames[iface] || iface;
      if (state.disabled && state.reason) {
        return `${baseName} (${state.reason})`;
      }
      return baseName;
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
                  label: getDisplayName(iface, { disabled: true }),
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
                  label: getDisplayName(iface, states[index]),
                  disabled: states[index].disabled,
                })),
              ]}
            />
          )}
        />
      </div>
    );
  },
);
