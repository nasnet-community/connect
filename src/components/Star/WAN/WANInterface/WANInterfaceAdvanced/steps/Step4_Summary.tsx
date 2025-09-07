import { component$, type QRL, useComputed$ } from "@builder.io/qwik";
import type { WANWizardState } from "../../../../StarContext/WANType";
import { Alert, Card } from "~/components/Core";

export interface Step4Props {
  wizardState: WANWizardState;
  onEdit$: QRL<(step: number) => void>;
  onValidate$: QRL<() => Promise<boolean>>;
}

export const Step4_Summary = component$<Step4Props>(
  ({ wizardState, onEdit$, onValidate$ }) => {
    
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
          return "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z";
        case "Static":
          return "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z";
        case "LTE":
          return "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z";
        default:
          return "M13 10V3L4 14h7v7l9-11h-7z";
      }
    };

    // Use useComputed$ to safely compute validation errors without causing state mutations
    const validationErrors = useComputed$(() => {
      const errors = Object.values(wizardState.validationErrors).flat();
      return {
        list: errors,
        hasErrors: errors.length > 0
      };
    });

    return (
      <div class="space-y-6">
        {/* Header Section */}
        <div class="text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
            <svg class="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Review Configuration
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Please review your WAN configuration. When ready, click "Save & Complete" to apply the settings.
          </p>
        </div>

        {/* Validation Status */}
        {validationErrors.value.hasErrors ? (
          <Alert
            status="error"
            title="Configuration Issues"
            message="Please review and fix the following issues:"
          >
            <ul class="mt-2 list-disc list-inside text-sm">
              {validationErrors.value.list.map((error, index) => (
                <li key={index}>{error as string}</li>
              ))}
            </ul>
          </Alert>
        ) : (
          <Alert
            status="success"
            title="Configuration Ready"
            message="Your WAN configuration has been validated successfully. You can now save and apply the changes."
          />
        )}

        {/* WAN Links Configuration Section */}
        <Card>
          <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  WAN Links Configuration
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Interface and connection settings
                </p>
              </div>
            </div>
            {wizardState.links.length > 1 && (
              <button
                onClick$={() => onEdit$(0)}
                class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/10"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
          </div>
          
          <div class="mt-6 space-y-4">
            {wizardState.links.map((link, index) => (
              <div key={link.id} class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div class="flex items-start justify-between">
                  <div class="flex gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getInterfaceIcon(link.interfaceType)} />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <h4 class="font-medium text-gray-900 dark:text-white">
                          {link.name}
                        </h4>
                        {index === 0 && wizardState.links.length > 1 && (
                          <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Primary
                          </span>
                        )}
                      </div>
                      
                      <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        <div class="flex items-center gap-2 text-sm">
                          <span class="text-gray-500 dark:text-gray-400">Interface:</span>
                          <span class="font-medium text-gray-700 dark:text-gray-300">
                            {link.interfaceType} ({link.interfaceName || "Not selected"})
                          </span>
                        </div>
                        
                        <div class="flex items-center gap-2 text-sm">
                          <span class="text-gray-500 dark:text-gray-400">Connection:</span>
                          <span class="font-medium text-gray-700 dark:text-gray-300">
                            {getConnectionTypeDisplay(link.connectionType)}
                          </span>
                        </div>
                        
                        {link.wirelessCredentials && (
                          <div class="flex items-center gap-2 text-sm">
                            <span class="text-gray-500 dark:text-gray-400">SSID:</span>
                            <span class="font-medium text-gray-700 dark:text-gray-300">
                              {link.wirelessCredentials.SSID}
                            </span>
                          </div>
                        )}
                        
                        {link.vlanConfig?.enabled && (
                          <div class="flex items-center gap-2 text-sm">
                            <span class="text-gray-500 dark:text-gray-400">VLAN ID:</span>
                            <span class="font-medium text-gray-700 dark:text-gray-300">
                              {link.vlanConfig.id}
                            </span>
                          </div>
                        )}
                        
                        {wizardState.links.length > 1 && link.weight !== undefined && wizardState.multiLinkStrategy?.strategy !== "Failover" && (
                          <div class="flex items-center gap-2 text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Weight:</span>
                            <span class="font-medium text-gray-700 dark:text-gray-300">
                              {link.weight}%
                            </span>
                          </div>
                        )}
                        
                        {wizardState.links.length > 1 && link.priority !== undefined && wizardState.multiLinkStrategy?.strategy !== "LoadBalance" && (
                          <div class="flex items-center gap-2 text-sm">
                            <span class="text-gray-500 dark:text-gray-400">Priority:</span>
                            <span class="font-medium text-gray-700 dark:text-gray-300">
                              #{link.priority}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Connection Details */}
                      {link.connectionType === "PPPoE" && link.connectionConfig?.pppoe && (
                        <div class="mt-2 rounded-md bg-gray-50 dark:bg-gray-800 p-2">
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            Username: <span class="font-medium">{link.connectionConfig.pppoe.username}</span>
                          </p>
                        </div>
                      )}
                      
                      {link.connectionType === "Static" && link.connectionConfig?.static && (
                        <div class="mt-2 rounded-md bg-gray-50 dark:bg-gray-800 p-2 text-xs">
                          <p class="text-gray-500 dark:text-gray-400">
                            IP: <span class="font-medium">{link.connectionConfig.static.ipAddress}/{link.connectionConfig.static.subnet}</span>
                          </p>
                          <p class="text-gray-500 dark:text-gray-400">
                            Gateway: <span class="font-medium">{link.connectionConfig.static.gateway}</span>
                          </p>
                          <p class="text-gray-500 dark:text-gray-400">
                            DNS: <span class="font-medium">{link.connectionConfig.static.primaryDns}</span>
                            {link.connectionConfig.static.secondaryDns && (
                              <span>, {link.connectionConfig.static.secondaryDns}</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getConnectionIcon(link.connectionType)} />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Multi-WAN Strategy Section */}
        {wizardState.links.length > 1 && wizardState.multiLinkStrategy && (
          <Card>
            <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Multi-WAN Strategy
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {getStrategyDisplay(wizardState.multiLinkStrategy.strategy)}
                  </p>
                </div>
              </div>
              <button
                onClick$={() => onEdit$(2)}
                class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/10"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            </div>
            
            <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Load Balance Configuration */}
              {(wizardState.multiLinkStrategy.strategy === "LoadBalance" || 
                wizardState.multiLinkStrategy.strategy === "Both") && (
                <div>
                  <h4 class="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <svg class="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    Load Balance Settings
                  </h4>
                  <div class="space-y-2">
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Method: <span class="font-medium text-gray-700 dark:text-gray-300">
                          {wizardState.multiLinkStrategy.loadBalanceMethod}
                        </span>
                      </p>
                    </div>
                    <div class="space-y-2">
                      {wizardState.links.map((link) => (
                        <div key={link.id} class="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2">
                          <span class="text-sm text-gray-600 dark:text-gray-400">
                            {link.name}
                          </span>
                          <div class="flex items-center gap-2">
                            <div class="h-2 w-20 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div 
                                class="h-full rounded-full bg-primary-500 transition-all"
                                style={`width: ${link.weight || 0}%`}
                              />
                            </div>
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    Failover Settings
                  </h4>
                  <div class="space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Check Interval</p>
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {wizardState.multiLinkStrategy.failoverCheckInterval}s
                        </p>
                      </div>
                      <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Timeout</p>
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {wizardState.multiLinkStrategy.failoverTimeout}s
                        </p>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Priority Order:</p>
                      {sortedLinksByPriority.value.map((link, index) => (
                          <div key={link.id} class="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2">
                            <div class={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                              index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-gray-400"
                            }`}>
                              {index + 1}
                            </div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                              {link.name}
                            </span>
                            {index === 0 && (
                              <span class="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Primary
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}



      </div>
    );
  },
);