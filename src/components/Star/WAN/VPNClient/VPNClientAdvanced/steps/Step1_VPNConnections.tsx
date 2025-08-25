import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import { Card, Alert, Input, Select } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNCard } from "../components/VPNCard";

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
    { id: "Wireguard", label: "WireGuard", recommended: true },
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

  const handleDuplicateVPN = $(async (sourceVPN: any) => {
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

  const getVPNTemplates = () => [
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
      {/* Header */}
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {$localize`VPN Connections`}
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {$localize`Add and configure VPN clients for your Foreign WAN connections`}
        </p>
      </div>

      {/* Requirements Info */}
      <Card class="bg-blue-50 dark:bg-blue-900/20">
        <div class="p-4">
          <div class="flex items-start">
            <svg class="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                {$localize`Foreign WAN Requirements`}
              </h3>
              <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>{$localize`Minimum ${foreignWANCount} VPN client(s) required for your ${foreignWANCount} Foreign WAN link(s).`}</p>
                <p class="mt-1">{$localize`Current count: ${wizardState.vpnConfigs.length} VPN(s) configured`}</p>
                {needsMoreVPNs && (
                  <p class="mt-2 font-medium text-blue-800 dark:text-blue-200">
                    {$localize`⚠️ ${foreignWANCount - wizardState.vpnConfigs.length} more VPN(s) needed`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Add Templates */}
      {wizardState.vpnConfigs.length === 0 && (
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {$localize`Quick Start Templates`}
            </h3>
            <div class="grid gap-3 sm:grid-cols-3">
              {getVPNTemplates().map((template, index) => (
                <button
                  key={index}
                  onClick$={async () => {
                    isAdding.value = true;
                    await wizardActions.addVPN$(template);
                    if (onRefreshCompletion$) await onRefreshCompletion$();
                    isAdding.value = false;
                  }}
                  class="flex flex-col items-center p-4 text-center border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors dark:border-gray-700 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
                >
                  <div class="h-8 w-8 mb-2 bg-primary-100 rounded-lg flex items-center justify-center dark:bg-primary-900/30">
                    <svg class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 dark:text-white text-sm">{template.name}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* VPN List */}
      <div class="space-y-4">
        {wizardState.vpnConfigs.map((vpn, index) => (
          <VPNCard
            key={vpn.id}
            vpn={vpn}
            index={index}
            isExpanded={expandedVPN.value === vpn.id}
            canRemove={canRemoveVPN}
            validationErrors={wizardState.validationErrors}
            onUpdate$={handleUpdateVPN}
            onRemove$={canRemoveVPN ? handleRemoveVPN : undefined}
            onToggleExpanded$={handleToggleExpanded}
          >
            {/* Expanded Content - Basic VPN Settings */}
            <div class="space-y-4">
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
                      label: type.recommended ? `${type.label} (Recommended)` : type.label
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

              {/* Quick Actions */}
              <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick$={() => handleDuplicateVPN(vpn)}
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {$localize`Duplicate`}
                </button>

                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {$localize`Configure connection details in Step 2`}
                </div>
              </div>
            </div>
          </VPNCard>
        ))}

        {/* Add VPN Button */}
        <Card class="border-2 border-dashed border-gray-300 dark:border-gray-600">
          <button
            onClick$={handleAddVPN}
            disabled={isAdding.value}
            class="w-full p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors disabled:opacity-50"
          >
            <div class="flex flex-col items-center">
              <svg class="h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isAdding.value ? $localize`Adding VPN...` : $localize`Add VPN Client`}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {$localize`Click to add a new VPN connection`}
              </p>
            </div>
          </button>
        </Card>
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

      {/* Help Text */}
      <Card class="bg-gray-50 dark:bg-gray-800/50">
        <div class="p-4">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {$localize`💡 Tips for Step 1`}
          </h4>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• {$localize`Use descriptive names like "Primary VPN" or "US Server"`}</li>
            <li>• {$localize`WireGuard is recommended for best performance`}</li>
            <li>• {$localize`You can duplicate existing VPNs to save time`}</li>
            <li>• {$localize`Connection details will be configured in Step 2`}</li>
          </ul>
        </div>
      </Card>
    </div>
  );
});