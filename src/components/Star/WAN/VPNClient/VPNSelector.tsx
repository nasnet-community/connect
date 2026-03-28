import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";
import { SelectionCard } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface VPNSelectorProps {
  selectedType: string;
  onTypeChange$: QRL<(type: VPNType) => void>;
}

export const VPNSelector = component$<VPNSelectorProps>(
  ({ selectedType, onTypeChange$ }) => {
    const locale = useMessageLocale();
    const selectableOptions = [
      {
        type: "Wireguard" as VPNType,
        label: "WireGuard",
        description: semanticMessages.vpn_selector_wireguard_description(
          {},
          { locale },
        ),
        badge: semanticMessages.vpn_selector_recommended({}, { locale }),
        badgeVariant: "success" as const,
        icon: (
          <svg
            class="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        ),
      },
      {
        type: "L2TP" as VPNType,
        label: "L2TP",
        description: semanticMessages.vpn_selector_l2tp_description(
          {},
          { locale },
        ),
        icon: (
          <svg
            class="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        ),
      },
    ];

    return (
      <div class="w-full">
        {/* Header */}
        <div class="mb-8 text-center">
          <div class="mb-4 flex justify-center">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
              <svg
                class="h-6 w-6 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h2 class="text-text-default mb-2 text-2xl font-bold dark:text-text-dark-default">
            {semanticMessages.vpn_selector_title({}, { locale })}
          </h2>
          <p class="text-text-muted dark:text-text-dark-muted mx-auto max-w-md">
            {semanticMessages.vpn_selector_description({}, { locale })}
          </p>
        </div>

        {/* VPN Options */}
        <div class="mx-auto max-w-4xl">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            {selectableOptions.map((option) => (
              <SelectionCard
                key={option.type}
                isSelected={selectedType === option.type}
                title={option.label}
                description={option.description}
                icon={option.icon}
                badge={option.badge}
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
