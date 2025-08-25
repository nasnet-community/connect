import { component$, $ } from "@builder.io/qwik";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNBox } from "../components/VPNBox/VPNBox";
import { VPNBoxHeader } from "../components/VPNBox/VPNBoxHeader";
import { VPNBoxContent } from "../components/VPNBox/VPNBoxContent";
import { VPNTypeSelector } from "../components/fields/VPNTypeSelector";

export interface Step1Props {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  foreignWANCount: number;
}

export const Step1_AddVPNs = component$<Step1Props>(
  ({ wizardState, wizardActions, foreignWANCount }) => {
    const getVPNErrors = (vpnId: string) => {
      return Object.entries(wizardState.validationErrors)
        .filter(([key]) => key.startsWith(`vpn-${vpnId}`))
        .map(([, errors]) => errors)
        .flat();
    };

    // Removed unused getFieldErrors function

    const canRemoveVPN = wizardState.vpnConfigs.length > foreignWANCount;

    const handleAddVPN$ = $(() => {
      wizardActions.addVPN$({
        type: "Wireguard",
        name: `VPN ${wizardState.vpnConfigs.length + 1}`,
      });
    });

    return (
      <div class="space-y-6">
        {/* Header with Add VPN button */}
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {$localize`VPN Client Configuration`}
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {$localize`Add and configure VPN clients. Minimum ${foreignWANCount} VPN${foreignWANCount > 1 ? "s" : ""} required for foreign WAN links.`}
            </p>
          </div>

          <button
            onClick$={handleAddVPN$}
            class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 
                 py-2 text-sm font-medium text-white shadow-sm 
                 hover:bg-primary-700 focus:outline-none focus:ring-2 
                 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg
              class="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {$localize`Add VPN`}
          </button>
        </div>

        {/* VPN Boxes */}
        <div class="space-y-4">
          {wizardState.vpnConfigs.map((vpn: any, index: number) => {
            const vpnId = vpn.id;
            const hasErrors = getVPNErrors(vpnId).length > 0;
            
            return (
              <VPNBox
                key={vpnId}
                vpn={vpn}
                index={index}
                isExpanded={true}
                canRemove={canRemoveVPN}
                validationErrors={{}}
                onRemove$={
                  canRemoveVPN
                    ? () => wizardActions.removeVPN$(vpnId)
                    : undefined
                }
                onUpdate$={(id: string, updates: any) =>
                  wizardActions.updateVPN$(id, updates)
                }
              >
                <VPNBoxHeader
                  vpn={vpn}
                  index={index}
                  isExpanded={true}
                  hasErrors={hasErrors}
                  canRemove={canRemoveVPN}
                  onRemove$={
                    canRemoveVPN
                      ? () => wizardActions.removeVPN$(vpnId)
                      : undefined
                  }
                />
                <VPNBoxContent
                  vpn={vpn}
                  onUpdate$={(updates: any) =>
                    wizardActions.updateVPN$(vpnId, updates)
                  }
                >
                  {/* VPN Type Selection */}
                  <VPNTypeSelector
                    selectedType={vpn.type}
                    onTypeChange$={(type: any) =>
                      wizardActions.updateVPN$(vpnId, { type })
                    }
                  />
                </VPNBoxContent>
              </VPNBox>
            );
          })}
        </div>

        {/* Minimum VPNs warning */}
        {wizardState.vpnConfigs.length < foreignWANCount && (
          <div class="mt-4 rounded-lg bg-warning-50 p-4 dark:bg-warning-900/20">
            <p class="text-sm text-warning-700 dark:text-warning-300">
              {$localize`You need at least ${foreignWANCount} VPN${foreignWANCount > 1 ? "s" : ""} for your foreign WAN links. Currently configured: ${wizardState.vpnConfigs.length}`}
            </p>
          </div>
        )}
      </div>
    );
  },
);
