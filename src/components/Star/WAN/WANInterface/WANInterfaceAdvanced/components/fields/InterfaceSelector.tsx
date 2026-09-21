import { component$, useContext, type JSXOutput, type QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../../StarContext/StarContext";
import type { WANLinkConfig } from "../../types";
import { Select, FormField } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import { renderInterfaceTypeIcon } from "../../utils/interfaceTypeIcons";
import {
  addOccupiedInterface,
  removeOccupiedInterface,
  getOccupiedInterfacesForRouter,
  getInterfaceUsage,
  getUsedLTEInterfaces,
} from "../../../../../utils/InterfaceManagementUtils";
import type { InterfaceType } from "../../../../../StarContext/CommonType";

export interface InterfaceSelectorProps {
  link: WANLinkConfig;
  onUpdate$: QRL<(updates: Partial<WANLinkConfig>) => void>;
  mode: "easy" | "advanced";
}

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
  ({ link, onUpdate$ }) => {
    const locale = useMessageLocale();

    const starContext = useContext(StarContext);

    // Get available interfaces from master router
    const masterRouter = starContext.state.Choose.RouterModels.find(
      (rm) => rm.isMaster,
    );

    const getAvailableInterfaces = () => {
      if (!masterRouter)
        return { ethernet: [], wireless: [], sfp: [], lte: [] };

      return {
        ethernet: masterRouter.Interfaces.Interfaces.ethernet || [],
        wireless: masterRouter.Interfaces.Interfaces.wireless || [],
        sfp: masterRouter.Interfaces.Interfaces.sfp || [],
        lte: masterRouter.Interfaces.Interfaces.lte || [],
      };
    };

    const interfaces = getAvailableInterfaces();

    // Only consider master's occupied interfaces for disabling
    const occupiedInterfaces = masterRouter
      ? getOccupiedInterfacesForRouter(masterRouter)
      : [];

    const currentInterfaces = [
      ...interfaces.ethernet.map((iface: string) => ({
        interfaceName: iface,
        interfaceType: "Ethernet" as WANLinkConfig["interfaceType"],
      })),
      ...interfaces.wireless.map((iface: string) => ({
        interfaceName: iface,
        interfaceType: "Wireless" as WANLinkConfig["interfaceType"],
      })),
      ...interfaces.sfp.map((iface: string) => ({
        interfaceName: iface,
        interfaceType: "SFP" as WANLinkConfig["interfaceType"],
      })),
      ...interfaces.lte.map((iface: string) => ({
        interfaceName: iface,
        interfaceType: "LTE" as WANLinkConfig["interfaceType"],
      })),
    ];

    const getDisplayName = (
      iface: string,
      state?: { disabled: boolean; reason?: string },
    ) => {
      const baseName =
        interfaceDisplayNames[iface] ||
        (iface.startsWith("lte")
          ? `LTE ${iface.replace(/^lte/, "") || "Interface"}`
          : iface);

      if (state?.disabled && state.reason) {
        return `${baseName} (${state.reason})`;
      }

      return baseName;
    };

    const getSelectOptions = () => {
      let options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
        icon?: JSXOutput;
      }> = [];

      const usedLTEInterfaces = getUsedLTEInterfaces(
        starContext.state.WAN.WANLink,
        link.name,
      );

      const buildOption = (
        iface: string,
        interfaceType: WANLinkConfig["interfaceType"],
      ) => {
        const usage = getInterfaceUsage(occupiedInterfaces, iface);
        const isTrunk = usage === "Trunk";

        const isLTEInUse =
          interfaceType === "LTE" && usedLTEInterfaces.includes(iface);

        const disabled = isTrunk || isLTEInUse;
        const reason = isTrunk ? "Trunk" : isLTEInUse ? "In Use" : undefined;

        return {
          value: iface,
          label: getDisplayName(iface, { disabled, reason }),
          disabled,
          icon: renderInterfaceTypeIcon(interfaceType || "Ethernet"),
        };
      };

      options = currentInterfaces.map(({ interfaceName, interfaceType }) =>
        buildOption(interfaceName, interfaceType),
      );

      return options;
    };

    return (
      <div class="space-y-6">
        <FormField
          label={semanticMessages.wan_advanced_interface({}, { locale })}
        >
          <Select
            value={link.interfaceName || ""}
            onChange$={(value: string | string[]) => {
              const selectedValue = Array.isArray(value) ? value[0] : value;
              const previousInterface = link.interfaceName;
              const selectedInterface = currentInterfaces.find(
                ({ interfaceName }) => interfaceName === selectedValue,
              );

              onUpdate$({
                interfaceName: selectedValue,
                interfaceType: selectedInterface?.interfaceType,
              });

              const updatedModels = starContext.state.Choose.RouterModels.map(
                (model) => {
                  if (!model.isMaster) return model;

                  const updatedModel = { ...model };

                  // Remove previous interface from occupied list
                  if (previousInterface) {
                    updatedModel.Interfaces.OccupiedInterfaces =
                      removeOccupiedInterface(
                        updatedModel.Interfaces.OccupiedInterfaces,
                        previousInterface as InterfaceType,
                      );
                  }

                  // Add new interface to occupied list
                  if (selectedValue) {
                    updatedModel.Interfaces.OccupiedInterfaces =
                      addOccupiedInterface(
                        updatedModel.Interfaces.OccupiedInterfaces,
                        selectedValue as InterfaceType,
                        "WAN",
                      );
                  }

                  return updatedModel;
                },
              );

              starContext.updateChoose$({
                RouterModels: updatedModels,
              });
            }}
            placeholder={semanticMessages.wan_advanced_select_interface(
              {},
              { locale },
            )}
            options={getSelectOptions()}
            data-testid={`wan-advanced-interface-select-${link.id}`}
            clearable={false}
            key={link.id}
          />
        </FormField>
      </div>
    );
  },
);
