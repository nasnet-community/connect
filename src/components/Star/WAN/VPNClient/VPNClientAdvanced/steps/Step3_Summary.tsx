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
  
  const enabledVPNs = wizardState.vpnConfigs.filter(vpn => vpn.enabled);
  const configuredVPNs = wizardState.vpnConfigs.filter(vpn => vpn.type && 'config' in vpn && Boolean(vpn.config));

  const getVPNIcon = (type?: string) => {
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

  const getProtocolColor = (type?: string) => {
    switch (type) {
      case "Wireguard":
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case "OpenVPN":
        return "bg-gradient-to-br from-green-500 to-green-700";
      case "L2TP":
        return "bg-gradient-to-br from-purple-500 to-purple-700";
      case "PPTP":
        return "bg-gradient-to-br from-orange-500 to-orange-700";
      case "SSTP":
        return "bg-gradient-to-br from-pink-500 to-pink-700";
      case "IKeV2":
        return "bg-gradient-to-br from-indigo-500 to-indigo-700";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-700";
    }
  };

  const handleEditStep = $((step: number) => {
    if (onEdit$) {
      onEdit$(step);
    }
  });

  const completionPercentage = Math.round((configuredVPNs.length / wizardState.vpnConfigs.length) * 100) || 0;

  return (
    <div class="space-y-6">
      {/* Modern Header with Gradient */}
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white">
        <div class="relative z-10">
          <h2 class="text-3xl font-bold">
            {$localize`Configuration Summary`}
          </h2>
          <p class="mt-2 text-primary-100">
            {$localize`Review your VPN configuration before deploying to your router`}
          </p>
        </div>
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white"></div>
          <div class="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Status Alert with Modern Style */}
      {hasValidationErrors && (
        <Alert status="error" class="border-l-4 border-red-500">
          <div class="flex">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                {$localize`Configuration Issues Detected`}
              </h3>
              <p class="mt-1 text-sm text-red-700 dark:text-red-300">
                {$localize`Please review and fix the issues before proceeding.`}
              </p>
            </div>
          </div>
        </Alert>
      )}


      {/* Modern Statistics Dashboard */}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total VPNs Card */}
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-xl">
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100">{$localize`Total VPNs`}</p>
                <p class="mt-2 text-3xl font-bold">{wizardState.vpnConfigs.length}</p>
              </div>
              <div class="rounded-lg bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10"></div>
        </div>

        {/* Active VPNs Card */}
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-xl">
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100">{$localize`Active VPNs`}</p>
                <p class="mt-2 text-3xl font-bold">{enabledVPNs.length}</p>
              </div>
              <div class="rounded-lg bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10"></div>
        </div>

        {/* Configured VPNs Card */}
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-xl">
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100">{$localize`Configured`}</p>
                <p class="mt-2 text-3xl font-bold">{configuredVPNs.length}</p>
              </div>
              <div class="rounded-lg bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10"></div>
        </div>

        {/* Completion Progress Card */}
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl">
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div class="w-full">
                <p class="text-orange-100">{$localize`Completion`}</p>
                <p class="mt-2 text-3xl font-bold">{completionPercentage}%</p>
                <div class="mt-3 w-full rounded-full bg-white/20">
                  <div 
                    class="h-2 rounded-full bg-white transition-all duration-500"
                    style={`width: ${completionPercentage}%`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* VPN Clients Overview with Modern Cards */}
      <Card class="overflow-hidden border-0 shadow-lg">
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {$localize`VPN Connections Overview`}
            </h3>
            <button
              onClick$={() => handleEditStep(1)}
              class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-1 transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {$localize`Edit Configuration`}
            </button>
          </div>
        </div>
        
        <div class="p-6 space-y-4">
          {[...wizardState.vpnConfigs]
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
            .map((vpn, index) => {
              const isConfigured = vpn.type && 'config' in vpn && Boolean(vpn.config);
              const statusColor = !vpn.enabled 
                ? 'border-gray-300 dark:border-gray-600'
                : isConfigured
                ? 'border-green-300 dark:border-green-600'
                : 'border-yellow-300 dark:border-yellow-600';
              
              return (
                <div
                  key={vpn.id}
                  class={`group relative overflow-hidden rounded-xl border-2 ${statusColor} bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-5 transition-all hover:shadow-lg`}
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      {/* Priority Badge */}
                      <div class="flex flex-col items-center">
                        <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{$localize`Priority`}</span>
                        <div class="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      {/* Protocol Icon with Gradient Background */}
                      <div class={`rounded-xl p-3 text-white shadow-lg ${getProtocolColor(vpn.type)}`}>
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getVPNIcon(vpn.type)} />
                        </svg>
                      </div>

                      {/* VPN Details */}
                      <div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                          {vpn.name}
                        </h4>
                        <div class="mt-1 flex items-center gap-3 text-sm">
                          <span class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            {vpn.type || $localize`No protocol selected`}
                          </span>
                          {vpn.assignedLink && (
                            <>
                              <span class="text-gray-400">•</span>
                              <span class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                {vpn.assignedLink}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div class="flex items-center gap-3">
                      {!vpn.enabled ? (
                        <span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                          {$localize`Disabled`}
                        </span>
                      ) : isConfigured ? (
                        <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                          {$localize`Ready`}
                        </span>
                      ) : (
                        <span class="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-yellow-500"></span>
                          {$localize`Not Configured`}
                        </span>
                      )}

                      {/* Weight Badge for Load Balancing */}
                      {vpn.weight && (
                        <span class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {vpn.weight}% {$localize`weight`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div class="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary-500 to-primary-700 transform scale-x-0 transition-transform group-hover:scale-x-100"></div>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Strategy Configuration */}
      {wizardState.multiVPNStrategy && (
        <Card class="overflow-hidden border-0 shadow-lg">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {$localize`Multi-VPN Strategy`}
            </h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div class="flex items-center gap-3">
                <div class="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 p-3">
                  <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{$localize`Strategy`}</p>
                  <p class="font-semibold text-gray-900 dark:text-white">
                    {wizardState.multiVPNStrategy.strategy}
                  </p>
                </div>
              </div>

              {wizardState.multiVPNStrategy.failoverCheckInterval && (
                <div class="flex items-center gap-3">
                  <div class="rounded-lg bg-yellow-100 dark:bg-yellow-900/30 p-3">
                    <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{$localize`Check Interval`}</p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {wizardState.multiVPNStrategy.failoverCheckInterval}s
                    </p>
                  </div>
                </div>
              )}

              {wizardState.multiVPNStrategy.failoverTimeout && (
                <div class="flex items-center gap-3">
                  <div class="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
                    <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{$localize`Timeout`}</p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {wizardState.multiVPNStrategy.failoverTimeout}s
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

    </div>
  );
});