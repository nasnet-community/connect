import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import type { WANWizardState } from "../../../../StarContext/WANType";
import { InterfaceSelector } from "../components/fields/InterfaceSelector";
import { WirelessFields } from "../components/fields/WirelessFields";
import { LTEFields } from "../components/fields/LTEFields";
import { VLANMACFields } from "../components/fields/VLANMACFields";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";
import { Input } from "~/components/Core";

export interface Step1Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
  onRefreshCompletion$?: QRL<() => Promise<void>>;
}

export const Step1_LinkInterface = component$<Step1Props>(
  ({ wizardState, wizardActions, onRefreshCompletion$ }) => {
    const expandedLinkId = useSignal<string | null>(null);
    const searchQuery = useSignal("");
    const viewMode = useSignal<"grid" | "list">("grid");
    
    const getLinkErrors = (linkId: string) => {
      return Object.entries(wizardState.validationErrors)
        .filter(([key]) => key.startsWith(`link-${linkId}`))
        .map(([, errors]) => errors)
        .flat();
    };

    const getFieldErrors = (linkId: string, field: string) => {
      return wizardState.validationErrors[`link-${linkId}-${field}`] || [];
    };

    const usedInterfaces = wizardState.links
      .map((l) => l.interfaceName)
      .filter(Boolean);
      
    // Simple non-reactive filtering to prevent loops
    const getFilteredLinks = () => {
      if (!searchQuery.value) return wizardState.links;
      const query = searchQuery.value.toLowerCase();
      return wizardState.links.filter(link => 
        link.name.toLowerCase().includes(query) ||
        link.interfaceName.toLowerCase().includes(query) ||
        link.interfaceType.toLowerCase().includes(query)
      );
    };
    
    const toggleLinkExpanded = $((linkId: string) => {
      expandedLinkId.value = expandedLinkId.value === linkId ? null : linkId;
    });

    // Helper to refresh step completion after interface changes
    // Batch updates to prevent multiple renders
    const handleInterfaceUpdate = $(async (linkId: string, updates: any) => {
      await wizardActions.updateLink$(linkId, updates);
      // Defer refresh to prevent rapid updates
      if (onRefreshCompletion$) {
        setTimeout(() => {
          onRefreshCompletion$();
        }, 50);
      }
    });

    // Get link statistics
    const activeLinks = wizardState.links.filter(l => l.interfaceName).length;
    const configuredLinks = wizardState.links.filter(l => l.connectionType).length;
    const hasErrors = Object.keys(wizardState.validationErrors).length > 0;
    
    // Get link status - for Step 1, only check interface configuration
    const getLinkStatus = (link: typeof wizardState.links[0]) => {
      const errors = getLinkErrors(link.id);
      if (errors.length > 0) return "error";
      // For Step 1, complete means interface is fully configured
      if (Boolean(link.interfaceName) && Boolean(link.interfaceType)) return "complete";
      // Partial means some interface configuration is done
      if (Boolean(link.interfaceName) || Boolean(link.interfaceType)) return "partial";
      return "incomplete";
    };
    
    
    const getCardStyle = (status: string) => {
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
    
    const getInterfaceIcon = (type: string) => {
      switch (type) {
        case "Ethernet":
          return "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z";
        case "Wireless":
          return "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0";
        case "LTE":
          return "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z";
        case "SFP":
          return "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z";
        default:
          return "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9";
      }
    };

    // Check if we should show inline editing for single link
    const showInlineEdit = wizardState.links.length === 1;
    const singleLink = showInlineEdit ? wizardState.links[0] : null;
    
    return (
      <div class="relative">
        {/* Show inline editing for single link */}
        {showInlineEdit && singleLink ? (
          <div class="space-y-6">
            {/* Single Link Header */}
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-medium text-gray-900 dark:text-white">
                {$localize`Configure WAN Interface`}
              </h2>
              <button
                onClick$={$(async () => {
                  // Add link without triggering multiple renders
                  const prevLength = wizardState.links.length;
                  await wizardActions.addLink$();
                  // After adding, the UI will switch to multi-link view
                  // Use requestAnimationFrame for smoother transition
                  requestAnimationFrame(() => {
                    const newLink = wizardState.links[wizardState.links.length - 1];
                    if (newLink && wizardState.links.length > prevLength) {
                      expandedLinkId.value = newLink.id;
                    }
                  });
                })}
                class="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-4 py-2 text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                {$localize`Add Another Link`}
              </button>
            </div>
            
            {/* Inline Configuration Fields */}
            <div class="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
              {/* Name Input Field */}
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$localize`Link Name`}
                </label>
                <Input
                  type="text"
                  value={singleLink.name}
                  onInput$={(event: Event, value: string) => {
                    handleInterfaceUpdate(singleLink.id, { name: value });
                  }}
                  placeholder={$localize`Enter a custom name for this WAN link`}
                  class="w-full"
                />
              </div>
              
              <InterfaceSelector
                link={singleLink}
                onUpdate$={$((updates) =>
                  handleInterfaceUpdate(singleLink.id, updates)
                )}
                usedInterfaces={usedInterfaces}
                mode={wizardState.mode}
              />

              {singleLink.interfaceType === "Wireless" && (
                <div class="mt-6">
                  <WirelessFields
                    credentials={singleLink.wirelessCredentials}
                    onUpdate$={$((creds) =>
                      handleInterfaceUpdate(singleLink.id, {
                        wirelessCredentials: creds,
                      })
                    )}
                    errors={{
                      ssid: getFieldErrors(singleLink.id, "ssid"),
                      password: getFieldErrors(singleLink.id, "password"),
                    }}
                  />
                </div>
              )}

              {singleLink.interfaceType === "LTE" && (
                <div class="mt-6">
                  <LTEFields
                    settings={singleLink.lteSettings}
                    onUpdate$={$((settings) =>
                      handleInterfaceUpdate(singleLink.id, {
                        lteSettings: settings,
                      })
                    )}
                    errors={{
                      apn: getFieldErrors(singleLink.id, "apn"),
                    }}
                  />
                </div>
              )}

              {wizardState.mode === "advanced" && (
                <div class="mt-6">
                  <VLANMACFields
                    vlanConfig={wizardState.links[0]?.vlanConfig}
                    macAddress={wizardState.links[0]?.macAddress}
                    onUpdateVLAN$={$((config) =>
                      handleInterfaceUpdate(singleLink.id, {
                        vlanConfig: config,
                      })
                    )}
                    onUpdateMAC$={$((config) =>
                      handleInterfaceUpdate(singleLink.id, {
                        macAddress: config,
                      })
                    )}
                    _errors={{
                      vlan: getFieldErrors(singleLink.id, "vlan"),
                      mac: getFieldErrors(singleLink.id, "mac"),
                    }}
                  />
                </div>
              )}
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
                      Network Interfaces
                    </h2>
                    <div class="mt-2 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <span class="flex items-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-green-500"></div>
                        {activeLinks} Active
                      </span>
                      <span class="flex items-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                        {configuredLinks} Configured
                      </span>
                      {hasErrors && (
                        <span class="flex items-center gap-2">
                          <div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                          Issues Detected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Primary Actions */}
                  <button
                    onClick$={$(async () => {
                      const prevLength = wizardState.links.length;
                      await wizardActions.addLink$();
                      // Expand the newly added link with smoother transition
                      requestAnimationFrame(() => {
                        const newLink = wizardState.links[wizardState.links.length - 1];
                        if (newLink && wizardState.links.length > prevLength) {
                          expandedLinkId.value = newLink.id;
                        }
                      });
                    })}
                    class="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {wizardState.links.length === 1 ? $localize`Add Another Link` : $localize`Add Interface`}
                  </button>
                </div>
            
            {/* Search and View Controls */}
            {wizardState.links.length > 3 && (
              <div class="flex items-center gap-4">
                {/* Search */}
                <div class="flex-1 max-w-md">
                  <div class="relative">
                    <Input
                      type="text"
                      placeholder="Search interfaces..."
                      value={searchQuery.value}
                      onInput$={(event: Event, value: string) => searchQuery.value = value}
                      class="pl-10 rounded-full"
                    />
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* View Toggle */}
                <div class="flex items-center rounded-full border border-gray-200 dark:border-gray-700 p-1">
                  <button
                    onClick$={() => viewMode.value = "grid"}
                    class={`px-3 py-1 rounded-full text-sm transition-colors ${
                      viewMode.value === "grid" 
                        ? "bg-black text-white dark:bg-white dark:text-black" 
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick$={() => viewMode.value = "list"}
                    class={`px-3 py-1 rounded-full text-sm transition-colors ${
                      viewMode.value === "list" 
                        ? "bg-black text-white dark:bg-white dark:text-black" 
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    List
                  </button>
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
                  relative transition-all duration-200 rounded-xl border ${getCardStyle(status)}
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
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <svg class={`h-5 w-5 ${
                          status === 'complete' 
                            ? 'text-green-600 dark:text-green-400' 
                            : status === 'error'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={getInterfaceIcon(link.interfaceType)} />
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
                          {link.name}
                        </h3>
                        <p class={`text-sm ${
                          status === 'incomplete'
                            ? 'text-gray-400 dark:text-gray-500'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {link.interfaceType || 'Not configured'}
                          {link.interfaceName && ` • ${link.interfaceName}`}
                          {link.connectionType && ` • ${link.connectionType}`}
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
                      {wizardState.links.length > 1 && (
                        <button
                          onClick$={$((e: Event) => {
                            e.stopPropagation();
                            wizardActions.removeLink$(link.id);
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
                    {/* Name Input Field */}
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {$localize`Link Name`}
                      </label>
                      <Input
                        type="text"
                        value={link.name}
                        onInput$={(event: Event, value: string) => {
                          handleInterfaceUpdate(link.id, { name: value });
                        }}
                        placeholder={$localize`Enter a custom name for this WAN link`}
                        class="w-full"
                      />
                    </div>
                    
                    <InterfaceSelector
                      link={link}
                      onUpdate$={$((updates) =>
                        handleInterfaceUpdate(link.id, updates)
                      )}
                      usedInterfaces={usedInterfaces}
                      mode={wizardState.mode}
                    />

                    {link.interfaceType === "Wireless" && (
                      <WirelessFields
                        credentials={link.wirelessCredentials}
                        onUpdate$={$((creds) =>
                          handleInterfaceUpdate(link.id, {
                            wirelessCredentials: creds,
                          })
                        )}
                        errors={{
                          ssid: getFieldErrors(link.id, "ssid"),
                          password: getFieldErrors(link.id, "password"),
                        }}
                      />
                    )}

                    {link.interfaceType === "LTE" && (
                      <LTEFields
                        settings={link.lteSettings}
                        onUpdate$={$((settings) =>
                          handleInterfaceUpdate(link.id, {
                            lteSettings: settings,
                          })
                        )}
                        errors={{
                          apn: getFieldErrors(link.id, "apn"),
                        }}
                      />
                    )}

                    {wizardState.mode === "advanced" && (
                      <VLANMACFields
                        vlanConfig={link.vlanConfig}
                        macAddress={link.macAddress}
                        onUpdateVLAN$={$((config) =>
                          handleInterfaceUpdate(link.id, {
                            vlanConfig: config,
                          })
                        )}
                        onUpdateMAC$={$((config) =>
                          handleInterfaceUpdate(link.id, {
                            macAddress: config,
                          })
                        )}
                        _errors={{
                          vlan: getFieldErrors(link.id, "vlan"),
                          mac: getFieldErrors(link.id, "mac"),
                        }}
                      />
                    )}
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
              No interfaces found matching "{searchQuery.value}"
            </p>
          </div>
        )}




        {/* Info message for easy mode */}
        {wizardState.mode === "easy" && (
          <div class="mt-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <div class="flex items-start gap-3">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                {$localize`In Easy Mode, DHCP connection type will be used by default. Switch to Advanced Mode for more options.`}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
