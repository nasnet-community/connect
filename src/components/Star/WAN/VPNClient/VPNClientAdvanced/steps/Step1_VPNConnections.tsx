import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import { Alert, Input, Select } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";

export interface Step1VPNConnectionsProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  foreignWANCount: number;
  onRefreshCompletion$?: QRL<() => Promise<void>>;
}

export const Step1_VPNConnections = component$<Step1VPNConnectionsProps>(({
  wizardState,
  wizardActions,
  foreignWANCount,
  onRefreshCompletion$
}) => {
  const expandedVPN = useSignal<string | null>(null);
  const isAdding = useSignal(false);

  const vpnTypes = [
    { id: "Wireguard", label: "WireGuard" },
    { id: "OpenVPN", label: "OpenVPN" },
    { id: "L2TP", label: "L2TP/IPSec" },
    { id: "PPTP", label: "PPTP" },
    { id: "SSTP", label: "SSTP" },
    { id: "IKeV2", label: "IKEv2/IPSec" }
  ];

  const canRemoveVPN = wizardState.vpnConfigs.length > foreignWANCount;
  const needsMoreVPNs = wizardState.vpnConfigs.length < foreignWANCount;

  const handleAddVPN = $(async () => {
    isAdding.value = true;
    try {
      await wizardActions.addVPN$({
        type: "Wireguard",
        name: `VPN ${wizardState.vpnConfigs.length + 1}`,
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
      
      // Close expanded card if it was the removed one
      if (expandedVPN.value === vpnId) {
        expandedVPN.value = null;
      }
      
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

  const handleToggleExpanded = $((vpnId: string) => {
    expandedVPN.value = expandedVPN.value === vpnId ? null : vpnId;
  });

  const _handleDuplicateVPN = $(async (sourceVPN: any) => {
    isAdding.value = true;
    try {
      await wizardActions.addVPN$({
        type: sourceVPN.type,
        name: `${sourceVPN.name} Copy`,
        description: sourceVPN.description
      });
      
      if (onRefreshCompletion$) {
        await onRefreshCompletion$();
      }
    } catch (error) {
      console.error("Failed to duplicate VPN:", error);
    }
    isAdding.value = false;
  });

  const _getVPNTemplates = () => [
    {
      name: "WireGuard VPN",
      type: "Wireguard" as const,
      description: "Fast and modern VPN protocol"
    },
    {
      name: "OpenVPN UDP",
      type: "OpenVPN" as const, 
      description: "Reliable VPN with UDP protocol"
    },
    {
      name: "L2TP/IPSec",
      type: "L2TP" as const,
      description: "Compatible with most devices"
    }
  ];

  return (
    <div class="space-y-6">
      {/* Header with inline button */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-light text-gray-900 dark:text-white">
            {$localize`Configured VPN Clients`}
          </h2>
          <div class="mt-2 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-green-500"></div>
              {wizardState.vpnConfigs.filter(v => v.enabled).length} Active
            </span>
            <span class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-blue-500"></div>
              {wizardState.vpnConfigs.length} Configured
            </span>
            {needsMoreVPNs && (
              <span class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                {foreignWANCount - wizardState.vpnConfigs.length} More Needed
              </span>
            )}
          </div>
        </div>
        
        {/* Add VPN Button */}
        <button
          onClick$={handleAddVPN}
          disabled={isAdding.value}
          class="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-4 py-2 text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {isAdding.value ? $localize`Adding...` : $localize`Add VPN Client`}
        </button>
      </div>


      {/* VPN List - Network Interface Style Cards */}
      <div class="space-y-4">
        {wizardState.vpnConfigs.map((vpn, index) => {
          const isExpanded = expandedVPN.value === vpn.id;
          const hasErrors = Object.keys(wizardState.validationErrors || {}).some(key => 
            key.startsWith(`vpn-${vpn.id}`)
          );
          
          // Determine card status
          const getVPNStatus = () => {
            if (hasErrors) return "error";
            if (vpn.name && vpn.type) return "complete";
            if (vpn.name || vpn.type) return "partial";
            return "incomplete";
          };
          
          const status = getVPNStatus();
          
          const getCardStyle = () => {
            switch (status) {
              case "complete":
                return "bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md";
              case "error":
                return "bg-white dark:bg-gray-800 border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md";
              case "partial":
                return "bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-md";
              default:
                return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 opacity-75";
            }
          };
          
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
              
              {/* Expandable Content */}
              {isExpanded && (
                <div class="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6">
                  {/* VPN Name */}
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {$localize`VPN Name`} *
                      </label>
                      <Input
                        value={vpn.name}
                        onInput$={(e) => handleUpdateVPN(vpn.id, { name: (e.target as HTMLInputElement).value })}
                        placeholder={$localize`Enter VPN name`}
                        class="w-full"
                      />
                    </div>

                    {/* VPN Type */}
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {$localize`VPN Type`} *
                      </label>
                      <Select
                        value={vpn.type}
                        onChange$={(value) => handleUpdateVPN(vpn.id, { type: value as string })}
                        options={vpnTypes.map(type => ({
                          value: type.id,
                          label: type.label
                        }))}
                        class="w-full"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$localize`Description`}
                    </label>
                    <Input
                      value={vpn.description || ""}
                      onInput$={(e) => handleUpdateVPN(vpn.id, { description: (e.target as HTMLInputElement).value })}
                      placeholder={$localize`Optional description`}
                      class="w-full"
                    />
                  </div>

                  {/* Assigned WAN Link */}
                  {vpn.assignedLink && (
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {$localize`Assigned to Foreign WAN`}
                      </label>
                      <div class="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm text-gray-600 dark:text-gray-400">
                        {vpn.assignedLink}
                      </div>
                    </div>
                  )}

                  {/* Note about connection details */}
                  <div class="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
                    <div class="flex items-start gap-3">
                      <svg class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p class="text-sm text-blue-700 dark:text-blue-300">
                        {$localize`Connection details will be configured in Step 2`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Errors */}
      {needsMoreVPNs && (
        <Alert status="warning">
          {$localize`You need to add at least ${foreignWANCount - wizardState.vpnConfigs.length} more VPN client(s) to meet the minimum requirement for your Foreign WAN configuration.`}
        </Alert>
      )}

      {/* Success State */}
      {!needsMoreVPNs && wizardState.vpnConfigs.length > 0 && (
        <Alert status="success">
          {$localize`✓ ${wizardState.vpnConfigs.length} VPN client(s) configured. You can proceed to Step 2 to configure connection details.`}
        </Alert>
      )}

    </div>
  );
});