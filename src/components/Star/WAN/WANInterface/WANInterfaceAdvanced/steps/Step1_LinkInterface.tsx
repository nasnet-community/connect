import { component$, $, useSignal } from "@builder.io/qwik";
import type { WANWizardState } from "../types";
import { InterfaceSelector } from "../components/fields/InterfaceSelector";
import { WirelessFields } from "../components/fields/WirelessFields";
import { LTEFields } from "../components/fields/LTEFields";
import { VLANMACFields } from "../components/fields/VLANMACFields";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";
import { Input, Card } from "~/components/Core";
import { SearchBar } from "../components/common/SearchBar";
import { EmptyState } from "../components/common/EmptyState";
import { LinkStatistics } from "../components/common/LinkStatistics";
import { LinkCard } from "../components/cards/LinkCard";
import { getLinkStatus, filterLinks, getLinkStatistics } from "../utils/linkHelpers";
import { getLinkErrors, getFieldErrors } from "../utils/validationUtils";

export interface Step1Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
  mode?: "Foreign" | "Domestic";
}

export const Step1_LinkInterface = component$<Step1Props>(
  ({ wizardState, wizardActions, mode = "Foreign" }) => {
    const expandedLinkId = useSignal<string | null>(null);
    const searchQuery = useSignal("");
    const viewMode = useSignal<"grid" | "list">("grid");

    const getFilteredLinks = () => filterLinks(wizardState.links, searchQuery.value);
    
    const toggleLinkExpanded = $((linkId: string) => {
      expandedLinkId.value = expandedLinkId.value === linkId ? null : linkId;
    });

    // Helper to handle interface changes
    const handleInterfaceUpdate = $(async (linkId: string, updates: any) => {
      await wizardActions.updateLink$(linkId, updates);
    });

    // Get link statistics
    const stats = getLinkStatistics(wizardState.links, wizardState.validationErrors);

    // Check if we should show inline editing for single link
    const showInlineEdit = wizardState.links.length === 1;
    const singleLink = showInlineEdit ? wizardState.links[0] : null;
    
    return (
      <div class="relative">
        {/* Empty State - No links configured */}
        {wizardState.links.length === 0 ? (
          <div class="space-y-6">
            {/* Header */}
            <Card>
              <div class="flex items-center gap-3">
                <div class="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {mode === "Foreign"
                      ? $localize`Foreign WAN Links`
                      : $localize`Domestic WAN Links`}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$localize`Configure multiple WAN connections for load balancing and failover`}
                  </p>
                </div>
              </div>
            </Card>

            {/* Empty State Message */}
            <Card>
              <div class="text-center py-12">
                <div class="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {$localize`No WAN links configured`}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                  {mode === "Foreign"
                    ? $localize`Create your first foreign WAN connection. You can add multiple links for load balancing and failover.`
                    : $localize`Create your first domestic WAN connection. You can add multiple links for load balancing and failover.`}
                </p>
                <button
                  onClick$={$(async () => {
                    await wizardActions.addLink$();
                  })}
                  class="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-6 py-3 text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  {mode === "Foreign" ? $localize`Add Foreign Link` : $localize`Add Domestic Link`}
                </button>
              </div>
            </Card>
          </div>
        ) : (
          // Show configured links
          <div class="space-y-6">
            {/* Show inline editing for single link */}
            {showInlineEdit && singleLink ? (
          <div class="space-y-6">
            {/* Single Link Header */}
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-medium text-gray-900 dark:text-white">
                {mode === "Foreign"
                  ? $localize`Configure Foreign WAN Interface`
                  : $localize`Configure Domestic WAN Interface`}
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
                mode={wizardState.mode}
              />

              {singleLink.interfaceType === "Wireless" && singleLink.interfaceName && (
                <div class="mt-6">
                  <WirelessFields
                    credentials={singleLink.wirelessCredentials}
                    onUpdate$={$((creds) =>
                      handleInterfaceUpdate(singleLink.id, {
                        wirelessCredentials: creds,
                      })
                    )}
                    errors={{
                      ssid: getFieldErrors(singleLink.id, "ssid", wizardState.validationErrors),
                      password: getFieldErrors(singleLink.id, "password", wizardState.validationErrors),
                    }}
                  />
                </div>
              )}

              {singleLink.interfaceType === "LTE" && singleLink.interfaceName && (
                <div class="mt-6">
                  <LTEFields
                    settings={singleLink.lteSettings}
                    onUpdate$={$((settings) =>
                      handleInterfaceUpdate(singleLink.id, {
                        lteSettings: settings,
                      })
                    )}
                    errors={{
                      apn: getFieldErrors(singleLink.id, "apn", wizardState.validationErrors),
                    }}
                  />
                </div>
              )}

              {wizardState.mode === "advanced" && singleLink.interfaceType !== "LTE" && (
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
                      vlan: getFieldErrors(singleLink.id, "vlan", wizardState.validationErrors),
                      mac: getFieldErrors(singleLink.id, "mac", wizardState.validationErrors),
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
                    <LinkStatistics 
                      activeLinks={stats.activeLinks}
                      configuredLinks={stats.configuredLinks}
                      hasErrors={stats.hasErrors}
                    />
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
                    class="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-4 py-2 text-sm font-medium hover:bg-primary-700 transition-colors"
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
                <SearchBar 
                  searchQuery={searchQuery}
                  placeholder="Search interfaces..."
                  class="flex-1 max-w-md"
                />
                
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
                const status = getLinkStatus(link, wizardState.validationErrors, "interface");
                const errors = getLinkErrors(link.id, wizardState.validationErrors);
                const isExpanded = expandedLinkId.value === link.id;
                
                return (
                  <LinkCard
                    key={link.id}
                    link={link}
                    status={status}
                    errorCount={errors.length}
                    isExpanded={isExpanded}
                    onToggle$={() => toggleLinkExpanded(link.id)}
                    onRemove$={() => wizardActions.removeLink$(link.id)}
                    showRemove={wizardState.links.length > 1}
                    iconType="interface"
                  >
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
                      mode={wizardState.mode}
                    />

                    {link.interfaceType === "Wireless" && link.interfaceName && (
                      <WirelessFields
                        credentials={link.wirelessCredentials}
                        onUpdate$={$((creds) =>
                          handleInterfaceUpdate(link.id, {
                            wirelessCredentials: creds,
                          })
                        )}
                        errors={{
                          ssid: getFieldErrors(link.id, "ssid", wizardState.validationErrors),
                          password: getFieldErrors(link.id, "password", wizardState.validationErrors),
                        }}
                      />
                    )}

                    {link.interfaceType === "LTE" && link.interfaceName && (
                      <LTEFields
                        settings={link.lteSettings}
                        onUpdate$={$((settings) =>
                          handleInterfaceUpdate(link.id, {
                            lteSettings: settings,
                          })
                        )}
                        errors={{
                          apn: getFieldErrors(link.id, "apn", wizardState.validationErrors),
                        }}
                      />
                    )}

                    {wizardState.mode === "advanced" && link.interfaceType !== "LTE" && (
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
                          vlan: getFieldErrors(link.id, "vlan", wizardState.validationErrors),
                          mac: getFieldErrors(link.id, "mac", wizardState.validationErrors),
                        }}
                      />
                    )}
                  </LinkCard>
                );
              })}
            </div>
            </>
          )}

          {/* Empty State for filtered results */}
          {getFilteredLinks().length === 0 && searchQuery.value && (
            <EmptyState searchQuery={searchQuery.value} />
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
        )}
      </div>
    );
  },
);
