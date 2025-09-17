import { component$, $, useSignal, useTask$ } from "@builder.io/qwik";
import type { WANWizardState } from "../types";
import { ConnectionTypeSelector } from "../components/fields/ConnectionTypeSelector";
import { PPPoEFields } from "../components/fields/PPPoEFields";
import { StaticIPFields } from "../components/fields/StaticIPFields";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";

export interface Step2Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
}

export const Step2_Connection = component$<Step2Props>(
  ({ wizardState, wizardActions }) => {
    const expandedLinkId = useSignal<string | null>(null);
    const searchQuery = useSignal("");
    const hasAutoExpanded = useSignal(false);
    
    // Auto-expand first card when entering step with multiple links (only once)
    useTask$(({ track }) => {
      track(() => wizardState.links.length);
      
      // Only auto-expand once on initial load if we have multiple links
      if (wizardState.links.length > 1 && !hasAutoExpanded.value) {
        expandedLinkId.value = wizardState.links[0]?.id || null;
        hasAutoExpanded.value = true;
      }
    });
    
    const getLinkErrors = (linkId: string) => {
      return Object.entries(wizardState.validationErrors || {})
        .filter(([key]) => key.startsWith(`link-${linkId}`))
        .map(([, errors]) => errors)
        .flat();
    };

    const getFieldErrors = (linkId: string, field: string) => {
      return (wizardState.validationErrors || {})[`link-${linkId}-${field}`] || [];
    };

    // Simple non-reactive filtering to prevent loops
    const getFilteredLinks = () => {
      if (!searchQuery.value) return wizardState.links;
      const query = searchQuery.value.toLowerCase();
      return wizardState.links.filter(link => 
        (link.name && link.name.toLowerCase().includes(query)) ||
        (link.connectionType && link.connectionType.toLowerCase().includes(query)) ||
        (link.interfaceName && link.interfaceName.toLowerCase().includes(query))
      );
    };
    
    const toggleLinkExpanded = $((linkId: string) => {
      expandedLinkId.value = expandedLinkId.value === linkId ? null : linkId;
    });

    // Helper to handle connection changes
    const handleConnectionUpdate = $(async (linkId: string, updates: any) => {
      // Get the current link
      const link = wizardState.links.find(l => l.id === linkId);
      if (!link) return;
      
      // Merge updates with existing config
      const updatedLink = { ...link, ...updates };
      
      // Check if connection is complete based on type
      let connectionConfirmed = false;
      
      if (updates.connectionType === "DHCP" || updates.connectionType === "LTE") {
        connectionConfirmed = true;
      } else if (updatedLink.connectionType === "PPPoE") {
        connectionConfirmed = !!(
          updatedLink.connectionConfig?.pppoe?.username && 
          updatedLink.connectionConfig?.pppoe?.password
        );
      } else if (updatedLink.connectionType === "Static") {
        connectionConfirmed = !!(
          updatedLink.connectionConfig?.static?.ipAddress &&
          updatedLink.connectionConfig?.static?.subnet &&
          updatedLink.connectionConfig?.static?.gateway &&
          updatedLink.connectionConfig?.static?.DNS
        );
      }
      
      const updatesWithConfirmation = {
        ...updates,
        connectionConfirmed
      };
      
      await wizardActions.updateLink$(linkId, updatesWithConfirmation);
    });

    // Get link statistics
    const configuredConnections = wizardState.links.filter(l => l.connectionType).length;
    const completedConnections = wizardState.links.filter(l => {
      // If no connection type selected, it's not complete
      if (!l.connectionType) return false;
      
      if (l.connectionType === "PPPoE") {
        return l.connectionConfig?.pppoe?.username && l.connectionConfig.pppoe.password;
      }
      if (l.connectionType === "Static") {
        return l.connectionConfig?.static?.ipAddress && 
               l.connectionConfig.static.subnet && 
               l.connectionConfig.static.gateway && 
               l.connectionConfig.static.DNS;
      }
      // For DHCP and LTE, automatically consider complete
      if (l.connectionType === "DHCP" || l.connectionType === "LTE") {
        return true;
      }
      return false;
    }).length;
    const hasErrors = Object.keys(wizardState.validationErrors || {}).length > 0;
    
    // Get link status
    const getLinkStatus = (link: typeof wizardState.links[0]) => {
      const errors = getLinkErrors(link.id);
      if (errors.length > 0) return "error";
      
      // If no connection type selected, it's incomplete
      if (!link.connectionType) return "incomplete";
      
      // Check connection configuration completeness
      if (link.connectionType === "PPPoE") {
        if (link.connectionConfig?.pppoe?.username && link.connectionConfig.pppoe.password) {
          return "complete";
        }
        return "partial";
      }
      
      if (link.connectionType === "Static") {
        if (link.connectionConfig?.static?.ipAddress && 
            link.connectionConfig.static.subnet && 
            link.connectionConfig.static.gateway && 
            link.connectionConfig.static.DNS) {
          return "complete";
        }
        return "partial";
      }
      
      if (link.connectionType === "DHCP" || link.connectionType === "LTE") {
        return "complete";
      }
      
      return "incomplete";
    };
    
    const getConnectionIcon = (type: string) => {
      switch (type) {
        case "DHCP":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          );
        case "PPPoE":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          );
        case "Static":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          );
        case "LTE":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          );
        default:
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          );
      }
    };

    // Check if we should show inline editing for single link
    const showInlineEdit = wizardState.links.length === 1;
    const singleLink = showInlineEdit ? wizardState.links[0] : null;
    
    // Render connection configuration fields based on type
    const renderConnectionFields = (link: typeof wizardState.links[0]) => {
      return (
        <>
          {/* Connection Type Selection */}
          <ConnectionTypeSelector
            key={`${link.id}-${link.connectionType || 'none'}`}
            connectionType={link.connectionType}
            interfaceType={link.interfaceType || "Ethernet"}
            onUpdate$={$((type) =>
              handleConnectionUpdate(link.id, {
                connectionType: type,
              })
            )}
            mode={wizardState.mode}
          />

          {/* PPPoE Configuration */}
          {link.connectionType === "PPPoE" && (
            <div class="mt-6">
              <PPPoEFields
                config={link.connectionConfig?.pppoe}
                onUpdate$={$((config) =>
                  handleConnectionUpdate(link.id, {
                    connectionConfig: {
                      ...link.connectionConfig,
                      pppoe: config,
                    },
                  })
                )}
                errors={{
                  username: getFieldErrors(link.id, "pppoe-username"),
                  password: getFieldErrors(link.id, "pppoe-password"),
                }}
              />
            </div>
          )}

          {/* Static IP Configuration */}
          {link.connectionType === "Static" && (
            <div class="mt-6">
              <StaticIPFields
                config={link.connectionConfig?.static}
                onUpdate$={$((config) =>
                  handleConnectionUpdate(link.id, {
                    connectionConfig: {
                      ...link.connectionConfig,
                      static: config,
                    },
                  })
                )}
                errors={{
                  ipAddress: getFieldErrors(link.id, "static-ip"),
                  subnet: getFieldErrors(link.id, "static-subnet"),
                  gateway: getFieldErrors(link.id, "static-gateway"),
                  DNS: getFieldErrors(link.id, "static-dns1"),
                  secondaryDns: getFieldErrors(link.id, "static-dns2"),
                }}
              />
            </div>
          )}



        </>
      );
    };
    
    return (
      <div class="relative">
        {/* Show inline editing for single link */}
        {showInlineEdit && singleLink ? (
          <div class="space-y-6">
            {/* Single Link Header */}
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-medium text-gray-900 dark:text-white">
                {$localize`Configure Connection Type`}
              </h2>
            </div>
            
            {/* Inline Configuration Fields */}
            <div class="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
              {renderConnectionFields(singleLink)}
            </div>
            

          </div>
        ) : (
          // Multiple links - show card grid
          <>
            {/* Clean Header with Search and Controls */}
            <div class="mb-8">
              <div class="flex flex-col gap-4">
                {/* Title Row */}
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-2xl font-light text-gray-900 dark:text-white">
                      Connection Configuration
                    </h2>
                    <div class="mt-2 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <span class="flex items-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                        {completedConnections} Complete
                      </span>
                      <span class="flex items-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                        {configuredConnections} Configured
                      </span>
                      {hasErrors && (
                        <span class="flex items-center gap-2">
                          <div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                          Issues Detected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
            
                {/* Search and View Controls */}
                {wizardState.links.length > 3 && (
                  <div class="flex items-center gap-4">
                    {/* Search */}
                    <div class="flex-1 max-w-md">
                      <div class="relative">
                        <input
                          type="text"
                          placeholder="Search connections..."
                          value={searchQuery.value}
                          onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                          class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Expandable Cards */}
            <div class="space-y-4">
              {getFilteredLinks().map((link) => {
                const status = getLinkStatus(link);
                const errors = getLinkErrors(link.id);
                const isExpanded = expandedLinkId.value === link.id;
                
                return (
                  <div
                    key={link.id}
                    class={`
                      relative transition-all duration-200 rounded-xl border-2
                      ${status === 'complete'
                        ? 'bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md'
                        : status === 'error'
                        ? 'bg-white dark:bg-gray-800 border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md'
                        : status === 'partial'
                        ? 'bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-md'
                        : 'bg-white dark:bg-gray-800 border-orange-400 dark:border-orange-500 hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md'}
                    `}
                  >
                    {/* Card Header - Always visible */}
                    <div 
                      class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick$={() => toggleLinkExpanded(link.id)}
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          {/* Icon */}
                          <div class={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            status === 'complete' 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : status === 'error'
                              ? 'bg-red-100 dark:bg-red-900/30'
                              : status === 'partial'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <div class={`${
                              status === 'complete' 
                                ? 'text-green-600 dark:text-green-400' 
                                : status === 'error'
                                ? 'text-red-600 dark:text-red-400'
                                : status === 'partial'
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {getConnectionIcon(link.connectionType || "")}
                            </div>
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
                              {link.name}
                            </h3>
                            <p class={`text-sm ${
                              status === 'incomplete'
                                ? 'text-gray-400 dark:text-gray-500'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {link.connectionType || 'Not configured'}
                              {link.interfaceName && ` • ${link.interfaceName}`}
                              {link.interfaceType && ` • ${link.interfaceType}`}
                            </p>
                          </div>
                        </div>
                          
                        {/* Right side */}
                        <div class="flex items-center gap-3">
                          {status === 'complete' && errors.length === 0 && (
                            <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                          )}
                          {errors.length > 0 && (
                            <span class="text-xs text-red-600 dark:text-red-400 font-medium">
                              {errors.length} issue{errors.length > 1 ? 's' : ''}
                            </span>
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
                        {renderConnectionFields(link)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty State */}
        {getFilteredLinks().length === 0 && searchQuery.value && (
          <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No connections found matching "{searchQuery.value}"
            </p>
          </div>
        )}



      </div>
    );
  },
);