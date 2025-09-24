import { component$, type QRL, useComputed$, $ } from "@builder.io/qwik";
import type { WANWizardState } from "../types";
import { Alert, Card } from "~/components/Core";

export interface Step4Props {
  wizardState: WANWizardState;
  onEdit$: QRL<(step: number) => void>;
  onValidate$: QRL<() => Promise<boolean>>;
}

export const Step4_Summary = component$<Step4Props>(
  ({ wizardState, onEdit$, onValidate$: _onValidate$ }) => {

    // Use useComputed$ for sorted links to avoid mutations during render
    const sortedLinksByPriority = useComputed$(() => {
      return [...wizardState.links].sort((a, b) => (a.priority || 0) - (b.priority || 0));
    });

    const getConnectionTypeDisplay = (type?: string) => {
      if (!type) return "Not configured";
      const types: Record<string, string> = {
        DHCP: "DHCP Client",
        PPPoE: "PPPoE",
        Static: "Static IP",
        LTE: "LTE/4G",
      };
      return types[type] || type;
    };

    const getStrategyDisplay = (strategy?: string) => {
      const strategies: Record<string, string> = {
        LoadBalance: "Load Balance",
        Failover: "Failover",
        Both: "Load Balance + Failover",
      };
      return strategies[strategy || ""] || "";
    };

    const getInterfaceIcon = (type: string) => {
      switch (type) {
        case "Ethernet":
          return "M8 12h8m-8 0a8 8 0 1 0 16 0 8 8 0 1 0-16 0";
        case "Wireless":
          return "M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0";
        case "LTE":
          return "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M5 7h14M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2";
        case "SFP":
          return "M12 6v6m0 0v6m0-6h6m-6 0H6";
        default:
          return "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9";
      }
    };

    const getConnectionIcon = (type?: string) => {
      if (!type) return "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      switch (type) {
        case "DHCP":
          return "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01";
        case "PPPoE":
          return "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z";
        case "Static":
          return "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z";
        case "LTE":
          return "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z";
        default:
          return "M13 10V3L4 14h7v7l9-11h-7z";
      }
    };

    const getConnectionTypeColor = (type?: string) => {
      switch (type) {
        case "DHCP":
          return "bg-gradient-to-br from-blue-500 to-blue-700";
        case "PPPoE":
          return "bg-gradient-to-br from-orange-500 to-orange-700";
        case "Static":
          return "bg-gradient-to-br from-indigo-500 to-indigo-700";
        case "LTE":
          return "bg-gradient-to-br from-purple-500 to-purple-700";
        default:
          return "bg-gradient-to-br from-gray-500 to-gray-700";
      }
    };

    const getInterfaceTypeColor = (type?: string) => {
      switch (type) {
        case "Ethernet":
          return "bg-gradient-to-br from-blue-500 to-blue-700";
        case "Wireless":
          return "bg-gradient-to-br from-green-500 to-green-700";
        case "LTE":
          return "bg-gradient-to-br from-purple-500 to-purple-700";
        case "SFP":
          return "bg-gradient-to-br from-amber-500 to-amber-700";
        default:
          return "bg-gradient-to-br from-gray-500 to-gray-700";
      }
    };

    // Use useComputed$ to safely compute validation errors without causing state mutations
    const validationErrors = useComputed$(() => {
      const errors = Object.values(wizardState.validationErrors || {}).flat();
      return {
        list: errors,
        hasErrors: errors.length > 0
      };
    });

    const handleEditStep = $((step: number) => {
      if (onEdit$) {
        onEdit$(step);
      }
    });

    return (
      <div class="space-y-6">
        {/* Modern Header with Gradient */}
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white">
          <div class="relative z-10">
            <h2 class="text-3xl font-bold">
              {$localize`Configuration Summary`}
            </h2>
            <p class="mt-2 text-primary-100">
              {$localize`Review your WAN configuration before deploying to your router`}
            </p>
          </div>
          {/* Background Pattern */}
          <div class="absolute inset-0 opacity-10">
            <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white"></div>
            <div class="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Status Alert with Modern Style */}
        {validationErrors.value.hasErrors ? (
          <Alert status="error" class="border-l-4 border-red-500">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                  {$localize`Configuration Issues Detected`}
                </h3>
                <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                  <ul class="list-disc list-inside space-y-1">
                    {validationErrors.value.list.map((error, index) => (
                      <li key={index}>{error as string}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Alert>
        ) : (
          <Alert status="success" class="border-l-4 border-green-500">
            <div class="flex">
              <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
                  {$localize`Configuration Ready`}
                </h3>
                <p class="mt-1 text-sm text-green-700 dark:text-green-300">
                  {$localize`Your WAN configuration has been validated successfully.`}
                </p>
              </div>
            </div>
          </Alert>
        )}

        {/* WAN Links Overview with Modern Cards */}
        <Card class="overflow-hidden border-0 shadow-lg">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {$localize`WAN Links Overview`}
              </h3>
              <button
                onClick$={() => handleEditStep(0)}
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
            {sortedLinksByPriority.value.map((link, index) => {
              const isConfigured = link.connectionType && link.connectionConfirmed;
              const statusColor = !isConfigured
                ? 'border-yellow-300 dark:border-yellow-600'
                : 'border-green-300 dark:border-green-600';

              return (
                <div
                  key={link.id}
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

                      {/* Interface Icon with Gradient Background */}
                      <div class={`rounded-xl p-3 text-white shadow-lg ${getInterfaceTypeColor(link.interfaceType)}`}>
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getInterfaceIcon(link.interfaceType || "Ethernet")} />
                        </svg>
                      </div>

                      {/* Link Details */}
                      <div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                          {link.name}
                        </h4>
                        <div class="mt-1 flex items-center gap-3 text-sm">
                          <span class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8m-8 0a8 8 0 1 0 16 0 8 8 0 1 0-16 0" />
                            </svg>
                            {link.interfaceType || $localize`No interface selected`} • {link.interfaceName || $localize`Not selected`}
                          </span>
                          {link.connectionType && (
                            <>
                              <span class="text-gray-400">•</span>
                              <span class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getConnectionIcon(link.connectionType)} />
                                </svg>
                                {getConnectionTypeDisplay(link.connectionType)}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Additional Configuration Details */}
                        <div class="mt-2 flex flex-wrap gap-2">
                          {link.wirelessCredentials && (
                            <span class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01" />
                              </svg>
                              {link.wirelessCredentials.SSID}
                            </span>
                          )}

                          {link.vlanConfig?.enabled && (
                            <span class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              VLAN {link.vlanConfig.id}
                            </span>
                          )}

                          {wizardState.links.length > 1 && link.weight !== undefined && wizardState.multiLinkStrategy?.strategy !== "Failover" && (
                            <span class="inline-flex items-center rounded-md bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                              {link.weight}% {$localize`weight`}
                            </span>
                          )}
                        </div>

                        {/* Connection Configuration Details */}
                        {link.connectionType === "PPPoE" && link.connectionConfig?.pppoe && (
                          <div class="mt-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3">
                            <div class="flex items-center gap-2">
                              <div class={`rounded-lg p-2 text-white ${getConnectionTypeColor("PPPoE")}`}>
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div class="text-sm">
                                <p class="text-gray-600 dark:text-gray-400">
                                  {$localize`Username`}: <span class="font-medium text-gray-900 dark:text-white">{link.connectionConfig.pppoe.username}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {link.connectionType === "Static" && link.connectionConfig?.static && (
                          <div class="mt-3 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-3">
                            <div class="grid grid-cols-1 gap-2 text-sm">
                              <div class="flex items-center gap-2">
                                <svg class="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span class="text-gray-600 dark:text-gray-400">
                                  IP: <span class="font-medium text-gray-900 dark:text-white">{link.connectionConfig.static.ipAddress}/{link.connectionConfig.static.subnet}</span>
                                </span>
                              </div>
                              <div class="flex items-center gap-2">
                                <svg class="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span class="text-gray-600 dark:text-gray-400">
                                  Gateway: <span class="font-medium text-gray-900 dark:text-white">{link.connectionConfig.static.gateway}</span>
                                </span>
                              </div>
                              <div class="flex items-center gap-2">
                                <svg class="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                </svg>
                                <span class="text-gray-600 dark:text-gray-400">
                                  DNS: <span class="font-medium text-gray-900 dark:text-white">{link.connectionConfig.static.DNS}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div class="flex items-center gap-3">
                      {!isConfigured ? (
                        <span class="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-yellow-500"></span>
                          {$localize`Not Configured`}
                        </span>
                      ) : (
                        <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                          {$localize`Ready`}
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

        {/* Multi-WAN Strategy Section */}
        {wizardState.links.length > 1 && wizardState.multiLinkStrategy && (
          <Card class="overflow-hidden border-0 shadow-lg">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {$localize`Multi-WAN Strategy`}
                </h3>
                <button
                  onClick$={() => handleEditStep(2)}
                  class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  {$localize`Edit Strategy`}
                </button>
              </div>
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
                      {getStrategyDisplay(wizardState.multiLinkStrategy.strategy)}
                    </p>
                  </div>
                </div>

                {wizardState.multiLinkStrategy.failoverCheckInterval && (
                  <div class="flex items-center gap-3">
                    <div class="rounded-lg bg-yellow-100 dark:bg-yellow-900/30 p-3">
                      <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{$localize`Check Interval`}</p>
                      <p class="font-semibold text-gray-900 dark:text-white">
                        {wizardState.multiLinkStrategy.failoverCheckInterval}s
                      </p>
                    </div>
                  </div>
                )}

                {wizardState.multiLinkStrategy.failoverTimeout && (
                  <div class="flex items-center gap-3">
                    <div class="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
                      <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{$localize`Timeout`}</p>
                      <p class="font-semibold text-gray-900 dark:text-white">
                        {wizardState.multiLinkStrategy.failoverTimeout}s
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Strategy Details */}
              <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Load Balance Configuration */}
                {(wizardState.multiLinkStrategy.strategy === "LoadBalance" ||
                  wizardState.multiLinkStrategy.strategy === "Both") && (
                  <div>
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <svg class="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      {$localize`Load Balance Settings`}
                    </h4>
                    <div class="space-y-3">
                      <div class="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {$localize`Method`}: <span class="font-medium text-gray-900 dark:text-white">
                            {wizardState.multiLinkStrategy.loadBalanceMethod || "PCC"}
                          </span>
                        </p>
                      </div>
                      <div class="space-y-2">
                        {wizardState.links.map((link) => (
                          <div key={link.id} class="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {link.name}
                            </span>
                            <div class="flex items-center gap-2">
                              <div class="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  class="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all"
                                  style={`width: ${link.weight || 0}%`}
                                />
                              </div>
                              <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                                {link.weight || 0}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Failover Configuration */}
                {(wizardState.multiLinkStrategy.strategy === "Failover" ||
                  wizardState.multiLinkStrategy.strategy === "Both") && (
                  <div>
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <svg class="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      {$localize`Failover Settings`}
                    </h4>
                    <div class="space-y-3">
                      <div class="grid grid-cols-2 gap-2">
                        <div class="rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3">
                          <p class="text-xs text-gray-500 dark:text-gray-400">{$localize`Check Interval`}</p>
                          <p class="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                            {wizardState.multiLinkStrategy.failoverCheckInterval}s
                          </p>
                        </div>
                        <div class="rounded-lg bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-3">
                          <p class="text-xs text-gray-500 dark:text-gray-400">{$localize`Timeout`}</p>
                          <p class="text-lg font-bold text-red-700 dark:text-red-300">
                            {wizardState.multiLinkStrategy.failoverTimeout}s
                          </p>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{$localize`Priority Order`}</p>
                        {sortedLinksByPriority.value.map((link, index) => (
                          <div key={link.id} class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-3 py-2 transition-all hover:shadow-md">
                            <div class="flex items-center gap-3">
                              <div class={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ${
                                index === 0 ? "bg-gradient-to-br from-green-500 to-green-700" :
                                index === 1 ? "bg-gradient-to-br from-blue-500 to-blue-700" :
                                "bg-gradient-to-br from-gray-400 to-gray-600"
                              }`}>
                                {index + 1}
                              </div>
                              <span class="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {link.name}
                              </span>
                              {index === 0 && (
                                <span class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                  {$localize`Primary`}
                                </span>
                              )}
                            </div>
                            <div class="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary-500 to-primary-700 transform scale-x-0 transition-transform group-hover:scale-x-100"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  },
);