import { component$, $, type QRL } from "@builder.io/qwik";
import { Card, Alert } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";

export interface Step3SummaryProps {
  wizardState: VPNClientAdvancedState;
  wizardActions?: UseVPNClientAdvancedReturn;
  onEdit$?: QRL<(step: number) => void>;
  onValidate$?: QRL<() => Promise<boolean>>;
}

export const Step3_Summary = component$<Step3SummaryProps>(({
  wizardState,
  onEdit$,
  onValidate$: _onValidate$
}) => {
  // Check validation status
  const hasValidationErrors = Object.keys(wizardState.validationErrors).length > 0;
  const allVPNsConfigured = wizardState.vpnConfigs.every(vpn => 
    Boolean(vpn.name) && Boolean(vpn.type) && Boolean(vpn.config)
  );
  
  const enabledVPNs = wizardState.vpnConfigs.filter(vpn => vpn.enabled);
  const disabledVPNs = wizardState.vpnConfigs.filter(vpn => !vpn.enabled);

  const getVPNIcon = (type: string) => {
    switch (type) {
      case "Wireguard":
        return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
      case "OpenVPN":
        return "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z";
      case "L2TP":
        return "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9";
      case "PPTP":
        return "M13 10V3L4 14h7v7l9-11h-7z";
      case "SSTP":
        return "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4";
      case "IKeV2":
        return "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z";
      default:
        return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
    }
  };

  const getStatusBadge = (vpn: any) => {
    if (!vpn.enabled) {
      return (
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          {$localize`Disabled`}
        </span>
      );
    }
    
    if (!vpn.config) {
      return (
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          {$localize`Not Configured`}
        </span>
      );
    }
    
    return (
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
        {$localize`Ready`}
      </span>
    );
  };

  const handleEditStep = $((step: number) => {
    if (onEdit$) {
      onEdit$(step);
    }
  });

  return (
    <div class="space-y-6">
      {/* Header */}
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {$localize`Review & Summary`}
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {$localize`Review your VPN client configuration before applying`}
        </p>
      </div>

      {/* Validation Status */}
      {hasValidationErrors && (
        <Alert status="error">
          <div class="flex">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                {$localize`Configuration has errors`}
              </h3>
              <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{$localize`Please review and fix the following issues before continuing:`}</p>
                <ul class="list-disc ml-5 mt-1">
                  {Object.entries(wizardState.validationErrors).map(([key, errors]) => (
                    <li key={key}>
                      {errors.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Alert>
      )}

      {!hasValidationErrors && allVPNsConfigured && (
        <Alert status="success">
          <div class="flex">
            <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
                {$localize`Configuration is ready`}
              </h3>
              <p class="mt-1 text-sm text-green-700 dark:text-green-300">
                {$localize`All VPN clients are properly configured and ready to deploy.`}
              </p>
            </div>
          </div>
        </Alert>
      )}

      {/* Configuration Summary */}
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* VPN Clients Overview */}
        <Card>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {$localize`VPN Clients`}
              </h3>
              <button
                onClick$={() => handleEditStep(0)}
                class="text-primary-600 hover:text-primary-700 text-sm font-medium dark:text-primary-400 dark:hover:text-primary-300"
              >
                {$localize`Edit`}
              </button>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{$localize`Total VPN clients:`}</span>
                <span class="font-medium text-gray-900 dark:text-white">{wizardState.vpnConfigs.length}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{$localize`Enabled clients:`}</span>
                <span class="font-medium text-green-600 dark:text-green-400">{enabledVPNs.length}</span>
              </div>
              {disabledVPNs.length > 0 && (
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">{$localize`Disabled clients:`}</span>
                  <span class="font-medium text-gray-500">{disabledVPNs.length}</span>
                </div>
              )}
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{$localize`Configured clients:`}</span>
                <span class="font-medium text-gray-900 dark:text-white">
                  {wizardState.vpnConfigs.filter(vpn => vpn.config).length}
                </span>
              </div>
            </div>
            
            {/* Protocol Breakdown */}
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
                {$localize`Protocols Used`}
              </h4>
              <div class="flex flex-wrap gap-2">
                {Array.from(new Set(wizardState.vpnConfigs.map(vpn => vpn.type))).map((protocol) => (
                  <span
                    key={protocol}
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Configuration Details */}
        <Card>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {$localize`Configuration Details`}
              </h3>
              <button
                onClick$={() => handleEditStep(1)}
                class="text-primary-600 hover:text-primary-700 text-sm font-medium dark:text-primary-400 dark:hover:text-primary-300"
              >
                {$localize`Edit`}
              </button>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{$localize`Strategy:`}</span>
                <span class="font-medium text-gray-900 dark:text-white">
                  {wizardState.multiVPNStrategy?.strategy || $localize`Failover`}
                </span>
              </div>
              {wizardState.multiVPNStrategy?.failoverCheckInterval && (
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">{$localize`Check interval:`}</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {wizardState.multiVPNStrategy.failoverCheckInterval}s
                  </span>
                </div>
              )}
              {wizardState.multiVPNStrategy?.failoverTimeout && (
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">{$localize`Timeout:`}</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {wizardState.multiVPNStrategy.failoverTimeout}s
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* VPN Clients List */}
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
            {$localize`VPN Clients Detail`}
          </h3>
          
          <div class="space-y-4">
            {wizardState.vpnConfigs
              .sort((a, b) => (a.priority || 0) - (b.priority || 0))
              .map((vpn, index) => (
                <div
                  key={vpn.id}
                  class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div class="flex items-center space-x-4">
                    {/* Priority Badge */}
                    <div class="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-lg dark:bg-primary-900/30">
                      <span class="text-sm font-medium text-primary-700 dark:text-primary-300">
                        {index + 1}
                      </span>
                    </div>

                    {/* Protocol Icon */}
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getVPNIcon(vpn.type)} />
                      </svg>
                    </div>

                    {/* VPN Info */}
                    <div>
                      <h4 class="font-medium text-gray-900 dark:text-white">
                        {vpn.name}
                      </h4>
                      <div class="flex items-center space-x-2 mt-1">
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                          {vpn.type}
                        </span>
                        {vpn.description && (
                          <>
                            <span class="text-gray-400">•</span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                              {vpn.description}
                            </span>
                          </>
                        )}
                        {vpn.assignedLink && (
                          <>
                            <span class="text-gray-400">•</span>
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                              {$localize`Assigned to ${vpn.assignedLink}`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div class="flex items-center space-x-3">
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {$localize`Priority ${vpn.priority || index + 1}`}
                    </span>
                    {getStatusBadge(vpn)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card class="bg-blue-50 dark:bg-blue-900/20">
        <div class="p-6">
          <h3 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">
            {$localize`What happens next?`}
          </h3>
          <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
              {$localize`VPN client configurations will be applied to your router`}
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
              {$localize`VPN connections will be established based on priority`}
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
              {$localize`Failover strategy will handle connection failures automatically`}
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
              {$localize`You can modify these settings later from the router management interface`}
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
});