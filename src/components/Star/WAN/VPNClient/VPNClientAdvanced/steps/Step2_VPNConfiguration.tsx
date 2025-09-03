import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import { Card, Input } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";

// Import protocol-specific fields from Advanced components
import { WireguardFields } from "../components/fields/WireguardFields";
import { OpenVPNFields } from "../components/fields/OpenVPNFields";
import { L2TPFields } from "../components/fields/L2TPFields";
import { IKEv2Fields } from "../components/fields/IKEv2Fields";
import { PPTPFields } from "../components/fields/PPTPFields";
import { SSTFields } from "../components/fields/SSTFields";

export interface Step2VPNConfigurationProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  onRefreshCompletion$?: QRL<() => Promise<void>>;
}

export const Step2_VPNConfiguration = component$<Step2VPNConfigurationProps>(({
  wizardState,
  wizardActions,
  onRefreshCompletion$
}) => {
  // Initialize with the first VPN expanded if any exist
  const expandedVPNId = useSignal<string | null>(
    wizardState.vpnConfigs.length > 0 ? wizardState.vpnConfigs[0].id : null
  );
  const searchQuery = useSignal("");

  const canRemoveVPN = wizardState.vpnConfigs.length > wizardActions.foreignWANCount;

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

  const handleUpdateVPNConfig = $(async (vpnId: string, config: any) => {
    try {
      await wizardActions.updateVPN$(vpnId, { config: config });
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to update VPN config:", error);
    }
  });

  const handleRemoveVPN = $(async (vpnId: string) => {
    if (!canRemoveVPN) return;
    
    try {
      await wizardActions.removeVPN$(vpnId);
      
      // Handle expansion after removal
      if (expandedVPNId.value === vpnId) {
        // Find another VPN to expand from the remaining ones
        const remainingVPNs = wizardState.vpnConfigs.filter(vpn => vpn.id !== vpnId);
        expandedVPNId.value = remainingVPNs.length > 0 ? remainingVPNs[0].id : null;
      }
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to remove VPN:", error);
    }
  });

  const handleToggleExpanded = $((vpnId: string) => {
    expandedVPNId.value = expandedVPNId.value === vpnId ? null : vpnId;
  });

  // Simple non-reactive filtering
  const getFilteredVPNs = () => {
    if (!searchQuery.value) return wizardState.vpnConfigs;
    const query = searchQuery.value.toLowerCase();
    return wizardState.vpnConfigs.filter(vpn => 
      vpn.name.toLowerCase().includes(query) ||
      vpn.type.toLowerCase().includes(query) ||
      (vpn.description && vpn.description.toLowerCase().includes(query))
    );
  };

  // Get statistics
  const configuredVPNs = wizardState.vpnConfigs.filter(vpn => Boolean(vpn.config)).length;
  const totalVPNs = wizardState.vpnConfigs.length;

  const getVPNIcon = (type: string) => {
    switch (type) {
      case "Wireguard":
        return "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0";
      case "OpenVPN":
        return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
      default:
        return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
    }
  };

  return (
    <div class="space-y-6">
      {/* Header with inline statistics */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-light text-gray-900 dark:text-white">
            {$localize`VPN Configuration`}
          </h2>
          <div class="mt-2 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-green-500"></div>
              {configuredVPNs} Configured
            </span>
            <span class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-blue-500"></div>
              {totalVPNs} Total
            </span>
            {configuredVPNs < totalVPNs && (
              <span class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                {totalVPNs - configuredVPNs} Remaining
              </span>
            )}
          </div>
        </div>
      </div>

      {/* No VPNs State */}
      {wizardState.vpnConfigs.length === 0 && (
        <Card>
          <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              {$localize`No VPN clients configured`}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {$localize`Please add VPN clients in Step 1 before configuring connections.`}
            </p>
          </div>
        </Card>
      )}

      {/* Search Box */}
      {wizardState.vpnConfigs.length > 2 && (
        <div class="relative">
          <Input
            type="text"
            placeholder="Search VPN clients..."
            value={searchQuery.value}
            onInput$={(event: Event, value: string) => searchQuery.value = value}
            class="pl-10"
          />
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      )}

      {/* VPN Configuration Cards */}
      {wizardState.vpnConfigs.length > 0 && (
        <div class="space-y-4">
          {getFilteredVPNs().map((vpn, index) => {
            const isExpanded = expandedVPNId.value === vpn.id;
            const hasConfig = Boolean(vpn.config);
            const hasErrors = Object.keys(wizardState.validationErrors || {}).some(key => 
              key.startsWith(`vpn-${vpn.id}`)
            );
            
            // Determine card status
            const getVPNStatus = () => {
              if (hasErrors) return "error";
              if (hasConfig) return "complete";
              return "incomplete";
            };
            
            const status = getVPNStatus();
            
            const getCardStyle = () => {
              switch (status) {
                case "complete":
                  return "bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md";
                case "error":
                  return "bg-white dark:bg-gray-800 border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md";
                default:
                  return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
              }
            };
            
            return (
              <div
                key={vpn.id}
                class={`
                  relative transition-all duration-200 rounded-xl border ${getCardStyle()}
                `}
              >
                {/* Card Header - Always visible */}
                <div 
                  class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick$={() => handleToggleExpanded(vpn.id)}
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      {/* Icon */}
                      <div class={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        status === 'complete' 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : status === 'error'
                          ? 'bg-red-100 dark:bg-red-900/30'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <svg class={`h-5 w-5 ${
                          status === 'complete' 
                            ? 'text-green-600 dark:text-green-400' 
                            : status === 'error'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={getVPNIcon(vpn.type)} />
                        </svg>
                      </div>
                      
                      {/* Name and Info */}
                      <div>
                        <h3 class={`font-medium ${
                          status === 'complete' 
                            ? 'text-green-900 dark:text-green-100' 
                            : status === 'incomplete'
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {vpn.name || $localize`VPN ${index + 1}`}
                        </h3>
                        <p class={`text-sm ${
                          status === 'incomplete'
                            ? 'text-gray-400 dark:text-gray-500'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {vpn.type || 'Not configured'}
                          {vpn.assignedLink && ` • ${vpn.assignedLink}`}
                          {hasConfig && ` • Configured`}
                        </p>
                      </div>
                    </div>
                    
                    {/* Right side */}
                    <div class="flex items-center gap-3">
                      {status === 'complete' && (
                        <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      )}
                      {hasErrors && (
                        <span class="text-xs text-red-600 dark:text-red-400 font-medium">
                          Issues detected
                        </span>
                      )}
                      {canRemoveVPN && (
                        <button
                          onClick$={$((e: Event) => {
                            e.stopPropagation();
                            handleRemoveVPN(vpn.id);
                          })}
                          class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                      <svg 
                        class={`h-5 w-5 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Expandable Content with Protocol-Specific Fields */}
                {isExpanded && (
                  <div class="border-t border-gray-200 dark:border-gray-700 p-6">
                    {/* Connection Name */}
                    <div class="mb-6">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {$localize`Connection Name`}
                      </label>
                      <Input
                        type="text"
                        value={vpn.name}
                        onInput$={(event: Event, value: string) => {
                          handleUpdateVPN(vpn.id, { name: value });
                        }}
                        placeholder={$localize`Enter a custom name for this VPN connection`}
                        class="w-full"
                      />
                    </div>

                    {/* Protocol-Specific Configuration */}
                    <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-4">
                        {$localize`${vpn.type} Configuration`}
                      </h3>
                      
                      {vpn.type === "Wireguard" && (
                        <WireguardFields
                          config={vpn.config || {}}
                          onUpdate$={$((updates) => handleUpdateVPNConfig(vpn.id, { ...vpn.config, ...updates }))}
                          errors={{}}
                          mode="advanced"
                        />
                      )}
                      
                      {vpn.type === "OpenVPN" && (
                        <OpenVPNFields
                          config={vpn.config || {}}
                          onUpdate$={$((updates) => handleUpdateVPNConfig(vpn.id, { ...vpn.config, ...updates }))}
                          errors={{}}
                          mode="advanced"
                        />
                      )}
                      
                      {vpn.type === "L2TP" && (
                        <L2TPFields
                          config={vpn.config || {}}
                          onUpdate$={$((updates) => handleUpdateVPNConfig(vpn.id, { ...vpn.config, ...updates }))}
                          errors={{}}
                        />
                      )}
                      
                      {vpn.type === "IKeV2" && (
                        <IKEv2Fields
                          config={vpn.config || {}}
                          onUpdate$={$((updates) => handleUpdateVPNConfig(vpn.id, { ...vpn.config, ...updates }))}
                          errors={{}}
                        />
                      )}
                      
                      {vpn.type === "PPTP" && (
                        <PPTPFields
                          config={vpn.config || {}}
                          onUpdate$={$((updates) => handleUpdateVPNConfig(vpn.id, { ...vpn.config, ...updates }))}
                          errors={{}}
                        />
                      )}
                      
                      {vpn.type === "SSTP" && (
                        <SSTFields
                          config={vpn.config || {}}
                          onUpdate$={$((updates) => handleUpdateVPNConfig(vpn.id, { ...vpn.config, ...updates }))}
                          errors={{}}
                        />
                      )}
                    </div>
                    
                    {/* Status */}
                    {hasConfig && (
                      <div class="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        {$localize`Configuration complete`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* No Search Results */}
      {searchQuery.value && getFilteredVPNs().length === 0 && (
        <Card>
          <div class="text-center py-8">
            <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              {$localize`No VPN clients found`}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {$localize`Try adjusting your search terms`}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
});