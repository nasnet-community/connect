import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";

interface VPNSelectorProps {
  selectedType: string;
  onTypeChange$: QRL<(type: VPNType) => void>;
}

const vpnOptions = [
  {
    type: "Wireguard" as VPNType,
    label: "WireGuard",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    type: "OpenVPN" as VPNType,
    label: "OpenVPN", 
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    type: "L2TP" as VPNType,
    label: "L2TP",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    type: "IKeV2" as VPNType,
    label: "IKEv2",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    type: "PPTP" as VPNType,
    label: "PPTP",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    type: "SSTP" as VPNType,
    label: "SSTP",
    icon: (
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
];

export const VPNSelector = component$<VPNSelectorProps>(
  ({ selectedType, onTypeChange$ }) => {
    return (
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <svg class="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          {$localize`Select VPN Type`}
        </label>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {vpnOptions.map((option) => (
            <button
              key={option.type}
              type="button"
              onClick$={() => onTypeChange$(option.type)}
              class={`
                group relative overflow-hidden rounded-xl border-2 p-3 transition-all hover:scale-105
                ${selectedType === option.type 
                  ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20" 
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"}
              `}
            >
              <div class="relative z-10 flex flex-col items-center gap-2">
                <div class={`
                  flex h-10 w-10 items-center justify-center rounded-lg transition-colors
                  ${selectedType === option.type 
                    ? "bg-primary-500 text-white" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600"}
                `}>
                  {option.icon}
                </div>
                <span class={`text-xs font-medium ${selectedType === option.type ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}>
                  {$localize`${option.label}`}
                </span>
              </div>
              {selectedType === option.type && (
                <div class="absolute top-1 right-1">
                  <div class="h-2 w-2 rounded-full bg-primary-500 animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  },
);
