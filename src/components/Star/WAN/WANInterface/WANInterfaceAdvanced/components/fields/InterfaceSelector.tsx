import { component$, useContext, type QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../../StarContext/StarContext";
import type { WANLinkConfig } from "../../../../../StarContext/WANType";

export interface InterfaceSelectorProps {
  link: WANLinkConfig;
  onUpdate$: QRL<(updates: Partial<WANLinkConfig>) => void>;
  usedInterfaces: string[];
  mode: "easy" | "advanced";
}

export const InterfaceSelector = component$<InterfaceSelectorProps>(
  ({ link, onUpdate$, usedInterfaces }) => {
    const starContext = useContext(StarContext);

    // Get available interfaces from master router
    const masterRouter = starContext.state.Choose.RouterModels.find(
      (rm) => rm.isMaster,
    );

    const getAvailableInterfaces = () => {
      if (!masterRouter)
        return { ethernet: [], wireless: [], sfp: [], lte: [] };

      return {
        ethernet: masterRouter.Interfaces.ethernet || [],
        wireless: masterRouter.Interfaces.wireless || [],
        sfp: masterRouter.Interfaces.sfp || [],
        lte: masterRouter.Interfaces.lte || [],
      };
    };

    const interfaces = getAvailableInterfaces();

    // Check if interface is used by another link
    const isInterfaceUsed = (iface: string) => {
      return usedInterfaces.includes(iface) && iface !== link.interfaceName;
    };

    return (
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Interface Type`}
          </label>
          <select
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 
                 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 
                 dark:text-white"
            value={link.interfaceType}
            onChange$={(e) => {
              const value = (e.target as HTMLSelectElement)
                .value as WANLinkConfig["interfaceType"];
              onUpdate$({ interfaceType: value });
            }}
          >
            <option value="Ethernet">{$localize`Ethernet`}</option>
            <option value="Wireless">{$localize`Wireless`}</option>
            <option value="SFP">{$localize`SFP`}</option>
            <option value="LTE">{$localize`LTE`}</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Interface`}
          </label>
          <select
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 
                 focus:ring-primary-500 disabled:opacity-50 dark:border-gray-600 
                 dark:bg-gray-700 dark:text-white"
            value={link.interfaceName}
            onChange$={(e) => {
              onUpdate$({
                interfaceName: (e.target as HTMLSelectElement).value,
              });
            }}
          >
            <option value="">{$localize`Select Interface`}</option>

            {link.interfaceType === "Ethernet" &&
              interfaces.ethernet.map((iface) => (
                <option
                  key={iface}
                  value={iface}
                  disabled={isInterfaceUsed(iface)}
                >
                  {`${iface}${isInterfaceUsed(iface) ? " (In use)" : ""}`}
                </option>
              ))}

            {link.interfaceType === "Wireless" &&
              interfaces.wireless.map((iface) => (
                <option
                  key={iface}
                  value={iface}
                  disabled={isInterfaceUsed(iface)}
                >
                  {`${iface}${isInterfaceUsed(iface) ? " (In use)" : ""}`}
                </option>
              ))}

            {link.interfaceType === "SFP" &&
              interfaces.sfp.map((iface) => (
                <option
                  key={iface}
                  value={iface}
                  disabled={isInterfaceUsed(iface)}
                >
                  {`${iface}${isInterfaceUsed(iface) ? " (In use)" : ""}`}
                </option>
              ))}

            {link.interfaceType === "LTE" &&
              interfaces.lte.map((iface) => (
                <option
                  key={iface}
                  value={iface}
                  disabled={isInterfaceUsed(iface)}
                >
                  {`${iface}${isInterfaceUsed(iface) ? " (In use)" : ""}`}
                </option>
              ))}
          </select>
        </div>
      </div>
    );
  },
);
