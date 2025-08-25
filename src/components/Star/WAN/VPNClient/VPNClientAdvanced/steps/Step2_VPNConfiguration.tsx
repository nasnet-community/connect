import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNLink } from "../components/VPNLink/VPNLink";

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
  const expandedVPNId = useSignal<string | null>(null);
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

  const handleRemoveVPN = $(async (vpnId: string) => {
    if (!canRemoveVPN) return;
    
    try {
      await wizardActions.removeVPN$(vpnId);
      
      // Close expanded card if it was the removed one
      if (expandedVPNId.value === vpnId) {
        expandedVPNId.value = null;
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

  const handleMoveUp = $(async (vpnId: string) => {
    // Find the current index
    const currentIndex = wizardState.vpnConfigs.findIndex(vpn => vpn.id === vpnId);
    if (currentIndex <= 0) return;
    
    try {
      // Update priorities
      const currentVPN = wizardState.vpnConfigs[currentIndex];
      const aboveVPN = wizardState.vpnConfigs[currentIndex - 1];
      
      await wizardActions.updateVPN$(currentVPN.id, { priority: aboveVPN.priority });
      await wizardActions.updateVPN$(aboveVPN.id, { priority: currentVPN.priority });
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to move VPN up:", error);
    }
  });

  const handleMoveDown = $(async (vpnId: string) => {
    // Find the current index
    const currentIndex = wizardState.vpnConfigs.findIndex(vpn => vpn.id === vpnId);
    if (currentIndex >= wizardState.vpnConfigs.length - 1) return;
    
    try {
      // Update priorities
      const currentVPN = wizardState.vpnConfigs[currentIndex];
      const belowVPN = wizardState.vpnConfigs[currentIndex + 1];
      
      await wizardActions.updateVPN$(currentVPN.id, { priority: belowVPN.priority });
      await wizardActions.updateVPN$(belowVPN.id, { priority: currentVPN.priority });
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to move VPN down:", error);
    }
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

  return (
    <div class="space-y-6">
      {/* Header */}
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {$localize`VPN Configuration`}
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {$localize`Configure connection details for each VPN client`}
        </p>
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

      {/* Progress Overview */}
      {wizardState.vpnConfigs.length > 0 && (
        <Card class="bg-blue-50 dark:bg-blue-900/20">
          <div class="p-4">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {$localize`Configuration Progress`}
                </h3>
                <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>{$localize`${configuredVPNs} of ${totalVPNs} VPN clients configured`}</p>
                  {configuredVPNs < totalVPNs && (
                    <p class="mt-1">{$localize`Configure the remaining ${totalVPNs - configuredVPNs} VPN client(s) below`}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Search and View Controls */}
      {wizardState.vpnConfigs.length > 1 && (
        <Card>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <label class="sr-only">{$localize`Search VPN clients`}</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery.value}
                    onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder={$localize`Search VPN clients...`}
                  />
                </div>
              </div>
              <div class="ml-4 text-sm text-gray-500 dark:text-gray-400">
                {getFilteredVPNs().length} {getFilteredVPNs().length === 1 ? $localize`client` : $localize`clients`}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* VPN Links */}
      {wizardState.vpnConfigs.length > 0 && (
        <div class="space-y-4">
          {getFilteredVPNs().map((vpn, index) => (
            <VPNLink
              key={vpn.id}
              vpn={vpn}
              index={index}
              isExpanded={expandedVPNId.value === vpn.id}
              canRemove={canRemoveVPN}
              validationErrors={wizardState.validationErrors}
              onUpdate$={handleUpdateVPN}
              onRemove$={handleRemoveVPN}
              onToggleExpand$={handleToggleExpanded}
              onMoveUp$={handleMoveUp}
              onMoveDown$={handleMoveDown}
            />
          ))}
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

      {/* Configuration Tips */}
      {wizardState.vpnConfigs.length > 0 && (
        <Card class="bg-gray-50 dark:bg-gray-800/50">
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <svg class="h-3 w-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </span>
              {$localize`Configuration Tips`}
            </h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• {$localize`Click on a VPN card to expand and configure connection details`}</li>
              <li>• {$localize`Fill in server address, port, and authentication credentials`}</li>
              <li>• {$localize`Enable/disable individual VPN clients as needed`}</li>
              <li>• {$localize`Use the priority field to control failover order`}</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
});