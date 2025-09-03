import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";
import { SelectionCard } from "~/components/Core";

interface VPNSelectorProps {
  selectedType: string;
  onTypeChange$: QRL<(type: VPNType) => void>;
}

const vpnOptions = [
  {
    type: "Wireguard" as VPNType,
    label: "WireGuard",
    description: "Fast, modern VPN with state-of-the-art cryptography",
    badge: "Recommended",
    badgeVariant: "success" as const,
    icon: (
      <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  // {
  //   type: "OpenVPN" as VPNType,
  //   label: "OpenVPN", 
  //   description: "Reliable VPN protocol with excellent compatibility",
  //   icon: (
  //     <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  //     </svg>
  //   ),
  // },
  {
    type: "L2TP" as VPNType,
    label: "L2TP",
    description: "Widely supported protocol with IPSec encryption",
    icon: (
      <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  // {
  //   type: "IKeV2" as VPNType,
  //   label: "IKEv2",
  //   description: "Modern protocol with excellent mobile support",
  //   icon: (
  //     <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  //     </svg>
  //   ),
  // },
  // {
  //   type: "PPTP" as VPNType,
  //   label: "PPTP",
  //   description: "Legacy protocol with basic encryption",
  //   icon: (
  //     <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  //     </svg>
  //   ),
  // },
  // {
  //   type: "SSTP" as VPNType,
  //   label: "SSTP",
  //   description: "Windows-native protocol with SSL encryption",
  //   icon: (
  //     <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  //     </svg>
  //   ),
  // },
];

export const VPNSelector = component$<VPNSelectorProps>(
  ({ selectedType, onTypeChange$ }) => {
    return (
      <div class="w-full">
        {/* Header */}
        <div class="mb-8 text-center">
          <div class="mb-4 flex justify-center">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
              <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-text-default dark:text-text-dark-default mb-2">
            {$localize`Select VPN Type`}
          </h2>
          <p class="text-text-muted dark:text-text-dark-muted max-w-md mx-auto">
            {$localize`Choose the VPN protocol that best suits your security and performance needs.`}
          </p>
        </div>

        {/* VPN Options */}
        <div class="mx-auto max-w-4xl">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            {vpnOptions.map((option) => (
              <SelectionCard
                key={option.type}
                isSelected={selectedType === option.type}
                title={$localize`${option.label}`}
                description={$localize`${option.description}`}
                icon={option.icon}
                badge={option.badge ? $localize`${option.badge}` : undefined}
                badgeVariant={option.badgeVariant}
                onClick$={() => onTypeChange$(option.type)}
                class="transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
