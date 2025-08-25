import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "../../types/VPNClientAdvancedTypes";

export interface VPNProtocolSelectorProps {
  selectedProtocol?: VPNType;
  onSelect$: QRL<(protocol: VPNType) => void>;
}

export const VPNProtocolSelector = component$<VPNProtocolSelectorProps>(
  ({ selectedProtocol, onSelect$ }) => {
    const protocols: Array<{
      type: VPNType;
      name: string;
      description: string;
      recommended?: boolean;
      icon: string;
    }> = [
      {
        type: "Wireguard",
        name: "WireGuard",
        description: "Fast, modern, and secure VPN protocol",
        recommended: true,
        icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      },
      {
        type: "OpenVPN",
        name: "OpenVPN",
        description: "Industry standard, highly configurable",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      },
      {
        type: "L2TP",
        name: "L2TP",
        description: "Compatible with most devices and platforms",
        recommended: true,
        icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      },
      {
        type: "PPTP",
        name: "PPTP",
        description: "Legacy protocol, fast but less secure",
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
      },
      {
        type: "SSTP",
        name: "SSTP",
        description: "Microsoft's secure socket tunneling protocol",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      },
      {
        type: "IKeV2",
        name: "IKEv2/IPSec",
        description: "Mobile-optimized with auto-reconnect",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      }
    ];

    return (
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            {$localize`VPN Protocol`}
          </label>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {$localize`Choose a VPN protocol for your connection`}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {protocols.map((protocol) => (
            <button
              key={protocol.type}
              type="button"
              onClick$={() => onSelect$(protocol.type)}
              class={`
                group relative overflow-hidden rounded-xl border-2 p-4 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                ${selectedProtocol === protocol.type 
                  ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20" 
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"}
              `}
            >
              {/* Recommended Badge */}
              {protocol.recommended && (
                <div class="absolute top-2 right-2 z-20">
                  <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {$localize`Recommended`}
                  </span>
                </div>
              )}

              <div class="relative z-10 flex flex-col items-center gap-3 text-center">
                {/* Protocol Icon */}
                <div class={`
                  flex h-12 w-12 items-center justify-center rounded-lg transition-colors
                  ${selectedProtocol === protocol.type 
                    ? "bg-primary-500 text-white" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600"}
                `}>
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={protocol.icon} />
                  </svg>
                </div>

                {/* Protocol Name */}
                <div>
                  <h3 class={`font-semibold text-sm ${selectedProtocol === protocol.type ? "text-primary-700 dark:text-primary-300" : "text-gray-900 dark:text-gray-100"}`}>
                    {protocol.name}
                  </h3>
                  <p class={`text-xs mt-1 leading-tight ${selectedProtocol === protocol.type ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {protocol.description}
                  </p>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedProtocol === protocol.type && (
                <div class="absolute top-3 left-3">
                  <div class="h-3 w-3 rounded-full bg-primary-500 animate-pulse shadow-lg"></div>
                </div>
              )}

              {/* Hover Glow Effect */}
              <div class={`
                absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100
                ${selectedProtocol === protocol.type 
                  ? "bg-primary-500/5" 
                  : "bg-gray-500/5"}
              `}></div>
            </button>
          ))}
        </div>

        {/* Protocol Info */}
        {selectedProtocol && (
          <div class="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div class="flex">
              <svg class="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-blue-800 dark:text-blue-200">
                  {selectedProtocol === "Wireguard" && $localize`WireGuard is the recommended choice for new VPN setups. It's fast, secure, and has low overhead.`}
                  {selectedProtocol === "OpenVPN" && $localize`OpenVPN is highly configurable and works well in restrictive network environments.`}
                  {selectedProtocol === "L2TP" && $localize`L2TP/IPSec is widely supported and works on most devices without additional software.`}
                  {selectedProtocol === "PPTP" && $localize`PPTP is fast but less secure. Use only when other protocols are not available.`}
                  {selectedProtocol === "SSTP" && $localize`SSTP works well in environments where other VPN protocols are blocked.`}
                  {selectedProtocol === "IKeV2" && $localize`IKEv2/IPSec is excellent for mobile devices with automatic reconnection capabilities.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);