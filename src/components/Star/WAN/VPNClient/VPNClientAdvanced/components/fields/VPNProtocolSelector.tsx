import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "../../types/VPNClientAdvancedTypes";

export interface VPNProtocolSelectorProps {
  selectedProtocol?: VPNType | undefined;
  onSelect$: QRL<(protocol: VPNType) => void>;
}

export const VPNProtocolSelector = component$<VPNProtocolSelectorProps>(
  ({ selectedProtocol, onSelect$ }) => {
    const protocols: Array<{
      type: VPNType;
      name: string;
      description: string;
      recommended?: boolean;
      disabled?: boolean;
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
          {!selectedProtocol && (
            <div class="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <p class="text-sm text-blue-800 dark:text-blue-300">
                {$localize`Please select a VPN protocol to continue`}
              </p>
            </div>
          )}
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {protocols.map((protocol) => (
            <button
              key={protocol.type}
              type="button"
              disabled={protocol.disabled}
              onClick$={() => !protocol.disabled && onSelect$(protocol.type)}
              class={`
                group relative overflow-hidden rounded-xl border-2 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                ${protocol.disabled
                  ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
                  : selectedProtocol === protocol.type
                  ? "border-primary-500 bg-primary-50 hover:scale-105 dark:border-primary-400 dark:bg-primary-900/20"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"}
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
                  ${protocol.disabled
                    ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                    : selectedProtocol === protocol.type
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600"}
                `}>
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={protocol.icon} />
                  </svg>
                </div>

                {/* Protocol Name */}
                <div>
                  <h3 class={`font-semibold text-sm ${
                    protocol.disabled
                      ? "text-gray-400 dark:text-gray-600"
                      : selectedProtocol === protocol.type
                      ? "text-primary-700 dark:text-primary-300"
                      : "text-gray-900 dark:text-gray-100"
                  }`}>
                    {protocol.name}
                    {protocol.disabled && " (Coming Soon)"}
                  </h3>
                  <p class={`text-xs mt-1 leading-tight ${
                    protocol.disabled
                      ? "text-gray-400 dark:text-gray-600"
                      : selectedProtocol === protocol.type
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
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
              {!protocol.disabled && (
                <div class={`
                  absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100
                  ${selectedProtocol === protocol.type
                    ? "bg-primary-500/5"
                    : "bg-gray-500/5"}
                `}></div>
              )}
            </button>
          ))}
        </div>

      </div>
    );
  }
);