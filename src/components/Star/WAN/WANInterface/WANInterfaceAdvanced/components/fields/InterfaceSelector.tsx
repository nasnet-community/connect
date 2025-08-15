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

    // Get icon for interface type
    const getInterfaceTypeIcon = (type: string) => {
      switch (type) {
        case "Ethernet":
          return "ethernet-icon";
        case "Wireless":
          return "wireless-icon";
        case "SFP":
          return "sfp-icon";
        case "LTE":
          return "lte-icon";
        default:
          return "default-icon";
      }
    };

    return (
      <div class="space-y-6">
        {/* Interface Type Selection */}
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            {$localize`Interface Type`}
          </label>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Ethernet", "Wireless", "SFP", "LTE"].map((type) => (
              <button
                key={type}
                type="button"
                onClick$={() => onUpdate$({ interfaceType: type as WANLinkConfig["interfaceType"] })}
                class={`
                  group relative overflow-hidden rounded-xl border-2 p-3 transition-all hover:scale-105
                  ${link.interfaceType === type 
                    ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20" 
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"}
                `}
              >
                <div class="relative z-10 flex flex-col items-center gap-2">
                  <div class={`
                    flex h-10 w-10 items-center justify-center rounded-lg transition-colors
                    ${link.interfaceType === type 
                      ? "bg-primary-500 text-white" 
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600"}
                  `}>
                    {type === "Ethernet" && (
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                    {type === "Wireless" && (
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    )}
                    {type === "SFP" && (
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    )}
                    {type === "LTE" && (
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <span class={`text-xs font-medium ${link.interfaceType === type ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}>
                    {type}
                  </span>
                </div>
                {link.interfaceType === type && (
                  <div class="absolute top-1 right-1">
                    <div class="h-2 w-2 rounded-full bg-primary-500 animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Interface Selection */}
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
              <svg class="h-4 w-4 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </span>
            {$localize`Interface`}
          </label>
          <div class="relative">
            <select
              class="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm transition-all 
                   focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 
                   hover:border-gray-300 disabled:opacity-50 dark:border-gray-700 
                   dark:bg-gray-800 dark:text-white dark:hover:border-gray-600"
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
            
            {/* Custom dropdown arrow */}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Available interfaces indicator */}
          {link.interfaceName && (
            <div class="mt-2 flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 px-3 py-2">
              <svg class="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-green-700 dark:text-green-300">
                {$localize`Interface ${link.interfaceName} selected`}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);
