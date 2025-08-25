import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import { Card, Alert, Input } from "~/components/Core";
import type { VPNClientAdvancedState, VPNType } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNProtocolSelector } from "../components/fields/VPNProtocolSelector";

export interface Step1VPNProtocolsProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  foreignWANCount: number;
  onRefreshCompletion$?: QRL<() => Promise<void>>;
}

export const Step1_VPNProtocols = component$<Step1VPNProtocolsProps>(({
  wizardState,
  wizardActions,
  foreignWANCount,
  onRefreshCompletion$
}) => {
  const isAdding = useSignal(false);
  const expandedVPNs = useSignal<Set<string>>(new Set());

  const canRemoveVPN = wizardState.vpnConfigs.length > foreignWANCount;
  const needsMoreVPNs = wizardState.vpnConfigs.length < foreignWANCount;
  

  const handleAddVPN = $(async () => {
    isAdding.value = true;
    try {
      const name = `VPN ${wizardState.vpnConfigs.length + 1}`;
      await wizardActions.addVPN$({
        type: "Wireguard", // Default protocol
        name: name,
      });
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to add VPN:", error);
    }
    isAdding.value = false;
  });

  const handleRemoveVPN = $(async (vpnId: string) => {
    if (!canRemoveVPN) return;
    
    try {
      await wizardActions.removeVPN$(vpnId);
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to remove VPN:", error);
    }
  });

  const handleUpdateVPN = $(async (vpnId: string, updates: any) => {
    try {
      await wizardActions.updateVPN$(vpnId, updates);
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to update VPN:", error);
    }
  });

  const handleToggleVPNExpansion = $((vpnId: string) => {
    const newExpanded = new Set(expandedVPNs.value);
    if (newExpanded.has(vpnId)) {
      newExpanded.delete(vpnId);
    } else {
      newExpanded.add(vpnId);
    }
    expandedVPNs.value = newExpanded;
  });

  const handleVPNProtocolChange = $(async (vpnId: string, protocol: VPNType) => {
    await handleUpdateVPN(vpnId, { type: protocol });
  });


  return (
    <div class="space-y-6">

      {/* Add New VPN Section */}
      <div class="flex justify-center">
        <button
          onClick$={handleAddVPN}
          disabled={isAdding.value}
          class="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-6 py-3 text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {isAdding.value ? (
            <>
              <svg class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {$localize`Adding VPN...`}
            </>
          ) : (
            <>
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {$localize`Add VPN Client`}
            </>
          )}
        </button>
      </div>

      {/* Current VPN List */}
      {wizardState.vpnConfigs.length > 0 && (
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {$localize`Configured VPN Clients`}
          </h3>

          <div class="space-y-4">
            {wizardState.vpnConfigs.map((vpn, _index) => {
              const hasName = Boolean(vpn.name);
              const hasType = Boolean(vpn.type);
              const status = (hasName && hasType) ? "complete" : (hasName || hasType) ? "partial" : "incomplete";
              const isExpanded = expandedVPNs.value.has(vpn.id);
              const cardStyle = status === "complete" 
                ? "bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600"
                : status === "partial"
                ? "bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-600"
                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
              
              return (
                <Card key={vpn.id} class={`transition-all ${cardStyle}`}>
                  {/* Header */}
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        {/* Protocol Icon */}
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                          <svg class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={{
                              "Wireguard": "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                              "OpenVPN": "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                              "L2TP": "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                              "PPTP": "M13 10V3L4 14h7v7l9-11h-7z",
                              "SSTP": "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                              "IKeV2": "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            }[vpn.type] || "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"} />
                          </svg>
                        </div>

                        <div>
                          <div class="flex items-center gap-2">
                            <h4 class="font-medium text-gray-900 dark:text-white">
                              {vpn.name}
                            </h4>
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                              ({vpn.type})
                            </span>
                            {status === "complete" && (
                              <svg class="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p class="text-sm text-gray-600 dark:text-gray-400">
                            {vpn.enabled ? $localize`Enabled` : $localize`Disabled`}
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        {/* Expand/Collapse Button */}
                        <button
                          onClick$={() => handleToggleVPNExpansion(vpn.id)}
                          class="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-600"
                          title={isExpanded ? $localize`Collapse` : $localize`Expand to edit`}
                        >
                          <svg
                            class={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Enable/Disable Toggle */}
                        <button
                          onClick$={() => handleUpdateVPN(vpn.id, { enabled: !vpn.enabled })}
                          class={`
                            px-3 py-1 rounded-full text-xs font-medium transition-colors
                            ${vpn.enabled 
                              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"}
                          `}
                        >
                          {vpn.enabled ? $localize`Enabled` : $localize`Disabled`}
                        </button>

                        {/* Remove Button */}
                        {canRemoveVPN && (
                          <button
                            onClick$={() => handleRemoveVPN(vpn.id)}
                            class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                            title={$localize`Remove VPN`}
                          >
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div class="p-6 space-y-6">
                        {/* VPN Name Input */}
                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {$localize`VPN Name`}
                          </label>
                          <Input
                            type="text"
                            value={vpn.name}
                            onInput$={(event: Event, value: string) => {
                              handleUpdateVPN(vpn.id, { name: value });
                            }}
                            placeholder={$localize`Enter VPN name`}
                            class="w-full"
                          />
                        </div>


                        {/* Protocol Selection */}
                        <div>
                          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                            {$localize`Select VPN Protocol`}
                          </h4>
                          <VPNProtocolSelector
                            selectedProtocol={vpn.type}
                            onSelect$={$(async (protocol: VPNType) => {
                              await handleVPNProtocolChange(vpn.id, protocol);
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Status Alert */}
      {needsMoreVPNs && (
        <Alert status="warning">
          <div class="flex">
            <svg class="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                {$localize`More VPN clients needed`}
              </h3>
              <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                {$localize`You need ${foreignWANCount - wizardState.vpnConfigs.length} more VPN client(s) to match your Foreign WAN links.`}
              </p>
            </div>
          </div>
        </Alert>
      )}
    </div>
  );
});