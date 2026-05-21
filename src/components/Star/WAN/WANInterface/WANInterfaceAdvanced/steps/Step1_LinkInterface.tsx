import { component$, $, useSignal } from "@builder.io/qwik";
import type { WANWizardState } from "../types";
import { InterfaceSelector } from "../components/fields/InterfaceSelector";
import { WirelessFields } from "../components/fields/WirelessFields";
import { LTEFields } from "../components/fields/LTEFields";
import { VLANMACFields } from "../components/fields/VLANMACFields";
import { ConnectionTypeSelector } from "../components/fields/ConnectionTypeSelector";
import { PPPoEFields } from "../components/fields/PPPoEFields";
import { StaticIPFields } from "../components/fields/StaticIPFields";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";
import { Input } from "~/components/Core";
import { SearchBar } from "../components/common/SearchBar";
import { EmptyState } from "../components/common/EmptyState";
import { LinkStatistics } from "../components/common/LinkStatistics";
import { LinkCard } from "../components/cards/LinkCard";
import {
  getLinkStatus,
  filterLinks,
  getLinkStatistics,
} from "../utils/linkHelpers";
import {
  getLinkErrors,
  getFieldErrors,
  isLinkConfigurationComplete,
} from "../utils/validationUtils";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface Step1Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
  mode?: "Foreign" | "Domestic";
}

export const Step1_LinkInterface = component$<Step1Props>(
  ({ wizardState, wizardActions, mode = "Foreign" }) => {
    const locale = useMessageLocale();
    const expandedLinkId = useSignal<string | null>(null);
    const searchQuery = useSignal("");
    const viewMode = useSignal<"grid" | "list">("grid");

    const getFilteredLinks = () =>
      filterLinks(wizardState.links, searchQuery.value);

    const toggleLinkExpanded = $((linkId: string) => {
      expandedLinkId.value = expandedLinkId.value === linkId ? null : linkId;
    });

    // Helper to handle interface changes
    const handleInterfaceUpdate = $(async (linkId: string, updates: any) => {
      const link = wizardState.links.find((item) => item.id === linkId);
      if (!link) return;

      const updatedLink = { ...link, ...updates };

      if (updates.interfaceType === "LTE") {
        updatedLink.connectionType = "LTE";
      } else if (updates.interfaceType && link.connectionType === "LTE") {
        updatedLink.connectionType = "DHCP";
        updatedLink.connectionConfig = { isDHCP: true };
      }

      await wizardActions.updateLink$(linkId, {
        ...updates,
        connectionConfirmed: isLinkConfigurationComplete(updatedLink),
      });
    });

    const handleConnectionUpdate = $(async (linkId: string, updates: any) => {
      const link = wizardState.links.find((item) => item.id === linkId);
      if (!link) return;

      const updatedLink = { ...link, ...updates };

      await wizardActions.updateLink$(linkId, {
        ...updates,
        connectionConfirmed: isLinkConfigurationComplete(updatedLink),
      });
    });

    const renderConnectionFields = (link: WANWizardState["links"][0]) => {
      if (!link.interfaceName) {
        return null;
      }

      if (link.interfaceType === "LTE") {
        return null;
      }

      return (
        <div class="space-y-4 rounded-xl border border-gray-200 bg-white/70 p-4 dark:border-gray-700 dark:bg-gray-950/30">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
              {semanticMessages.wan_advanced_configure_connection_type(
                {},
                { locale },
              )}
            </h3>
          </div>

          <ConnectionTypeSelector
            key={`${link.id}-${link.connectionType || "none"}`}
            connectionType={link.connectionType}
            interfaceType={link.interfaceType || "Ethernet"}
            onUpdate$={$((type) =>
              handleConnectionUpdate(link.id, {
                connectionType: type,
              }),
            )}
            mode={wizardState.mode}
          />

          {link.connectionType === "PPPoE" && (
            <PPPoEFields
              config={link.connectionConfig?.pppoe}
              onUpdate$={$((config) =>
                handleConnectionUpdate(link.id, {
                  connectionConfig: {
                    ...link.connectionConfig,
                    pppoe: config,
                  },
                }),
              )}
              errors={{
                username: getFieldErrors(
                  link.id,
                  "pppoe-username",
                  wizardState.validationErrors,
                ),
                password: getFieldErrors(
                  link.id,
                  "pppoe-password",
                  wizardState.validationErrors,
                ),
              }}
            />
          )}

          {link.connectionType === "Static" && (
            <StaticIPFields
              config={link.connectionConfig?.static}
              onUpdate$={$((config) =>
                handleConnectionUpdate(link.id, {
                  connectionConfig: {
                    ...link.connectionConfig,
                    static: config,
                  },
                }),
              )}
              errors={{
                ipAddress: getFieldErrors(
                  link.id,
                  "static-ip",
                  wizardState.validationErrors,
                ),
                subnet: getFieldErrors(
                  link.id,
                  "static-subnet",
                  wizardState.validationErrors,
                ),
                gateway: getFieldErrors(
                  link.id,
                  "static-gateway",
                  wizardState.validationErrors,
                ),
                DNS: getFieldErrors(
                  link.id,
                  "static-dns1",
                  wizardState.validationErrors,
                ),
                secondaryDns: getFieldErrors(
                  link.id,
                  "static-dns2",
                  wizardState.validationErrors,
                ),
              }}
            />
          )}
        </div>
      );
    };

    // Get link statistics
    const stats = getLinkStatistics(
      wizardState.links,
      wizardState.validationErrors,
    );

    // Check if we should show inline editing for single link
    const showInlineEdit = wizardState.links.length === 1;
    const singleLink = showInlineEdit ? wizardState.links[0] : null;

    return (
      <div class="relative">
        {/* Empty State - No links configured */}
        {wizardState.links.length === 0 ? (
          <div class="space-y-6">
            {/* Header */}
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <svg
                  class="h-6 w-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {mode === "Foreign"
                    ? semanticMessages.wan_advanced_foreign_wan_links(
                        {},
                        { locale },
                      )
                    : semanticMessages.wan_advanced_domestic_wan_links(
                        {},
                        { locale },
                      )}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {semanticMessages.wan_advanced_links_description(
                    {},
                    { locale },
                  )}
                </p>
              </div>
            </div>

            {/* Empty State Message */}
            <div class="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900/40">
              <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                {semanticMessages.wan_advanced_no_links({}, { locale })}
              </h3>
              <p class="mx-auto mb-6 max-w-sm text-gray-500 dark:text-gray-400">
                {mode === "Foreign"
                  ? semanticMessages.wan_advanced_create_first_foreign(
                      {},
                      { locale },
                    )
                  : semanticMessages.wan_advanced_create_first_domestic(
                      {},
                      { locale },
                    )}
              </p>
              <button
                onClick$={$(async () => {
                  await wizardActions.addLink$();
                })}
                class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {mode === "Foreign"
                  ? semanticMessages.wan_advanced_add_foreign_link(
                      {},
                      { locale },
                    )
                  : semanticMessages.wan_advanced_add_domestic_link(
                      {},
                      { locale },
                    )}
              </button>
            </div>
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
                      ? semanticMessages.wan_advanced_configure_foreign_interface(
                          {},
                          { locale },
                        )
                      : semanticMessages.wan_advanced_configure_domestic_interface(
                          {},
                          { locale },
                        )}
                  </h2>
                  <button
                    onClick$={$(async () => {
                      // Add link without triggering multiple renders
                      const prevLength = wizardState.links.length;
                      await wizardActions.addLink$();
                      // After adding, the UI will switch to multi-link view
                      // Use requestAnimationFrame for smoother transition
                      requestAnimationFrame(() => {
                        const newLink =
                          wizardState.links[wizardState.links.length - 1];
                        if (wizardState.links.length > prevLength) {
                          expandedLinkId.value = newLink.id;
                        }
                      });
                    })}
                    class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    {semanticMessages.wan_advanced_add_another_link(
                      {},
                      { locale },
                    )}
                  </button>
                </div>

                {/* Inline Configuration Fields */}
                <div class="rounded-lg border border-gray-200 bg-gray-50/80 p-6 dark:border-gray-700 dark:bg-gray-900/40">
                  {/* Name Input Field */}
                  <div class="mb-6">
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.wan_advanced_link_name({}, { locale })}
                    </label>
                    <Input
                      type="text"
                      value={singleLink.name}
                      onInput$={(event: Event, value: string) => {
                        handleInterfaceUpdate(singleLink.id, { name: value });
                      }}
                      placeholder={semanticMessages.wan_advanced_link_name_placeholder(
                        {},
                        { locale },
                      )}
                      class="w-full"
                    />
                  </div>

                  <InterfaceSelector
                    link={singleLink}
                    onUpdate$={$((updates) =>
                      handleInterfaceUpdate(singleLink.id, updates),
                    )}
                    mode={wizardState.mode}
                  />

                  {singleLink.interfaceType === "Wireless" &&
                    singleLink.interfaceName && (
                      <div class="mt-6">
                        <WirelessFields
                          credentials={singleLink.wirelessCredentials}
                          onUpdate$={$((creds) =>
                            handleInterfaceUpdate(singleLink.id, {
                              wirelessCredentials: creds,
                            }),
                          )}
                          errors={{
                            ssid: getFieldErrors(
                              singleLink.id,
                              "ssid",
                              wizardState.validationErrors,
                            ),
                            password: getFieldErrors(
                              singleLink.id,
                              "password",
                              wizardState.validationErrors,
                            ),
                          }}
                        />
                      </div>
                    )}

                  {singleLink.interfaceType === "LTE" &&
                    singleLink.interfaceName && (
                      <div class="mt-6">
                        <LTEFields
                          settings={singleLink.lteSettings}
                          onUpdate$={$((settings) =>
                            handleInterfaceUpdate(singleLink.id, {
                              lteSettings: settings,
                            }),
                          )}
                          errors={{
                            apn: getFieldErrors(
                              singleLink.id,
                              "apn",
                              wizardState.validationErrors,
                            ),
                          }}
                        />
                      </div>
                    )}

                  {wizardState.mode === "advanced" &&
                    singleLink.interfaceType !== "LTE" && (
                      <div class="mt-6">
                        <VLANMACFields
                          vlanConfig={wizardState.links[0]?.vlanConfig}
                          macAddress={wizardState.links[0]?.macAddress}
                          onUpdateVLAN$={$((config) =>
                            handleInterfaceUpdate(singleLink.id, {
                              vlanConfig: config,
                            }),
                          )}
                          onUpdateMAC$={$((config) =>
                            handleInterfaceUpdate(singleLink.id, {
                              macAddress: config,
                            }),
                          )}
                          _errors={{
                            vlan: getFieldErrors(
                              singleLink.id,
                              "vlan",
                              wizardState.validationErrors,
                            ),
                            mac: getFieldErrors(
                              singleLink.id,
                              "mac",
                              wizardState.validationErrors,
                            ),
                          }}
                        />
                      </div>
                    )}

                  {singleLink.interfaceName && (
                    <div class="mt-6">{renderConnectionFields(singleLink)}</div>
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
                            const newLink =
                              wizardState.links[wizardState.links.length - 1];
                            if (wizardState.links.length > prevLength) {
                              expandedLinkId.value = newLink.id;
                            }
                          });
                        })}
                        class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                      >
                        <svg
                          class="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        {wizardState.links.length === 1
                          ? semanticMessages.wan_advanced_add_another_link(
                              {},
                              { locale },
                            )
                          : semanticMessages.wan_advanced_add_interface(
                              {},
                              { locale },
                            )}
                      </button>
                    </div>

                    {/* Search and View Controls */}
                    {wizardState.links.length > 3 && (
                      <div class="flex items-center gap-4">
                        {/* Search */}
                        <SearchBar
                          searchQuery={searchQuery}
                          placeholder="Search interfaces..."
                          class="max-w-md flex-1"
                        />

                        {/* View Toggle */}
                        <div class="flex items-center rounded-full border border-gray-200 p-1 dark:border-gray-700">
                          <button
                            onClick$={() => (viewMode.value = "grid")}
                            class={`rounded-full px-3 py-1 text-sm transition-colors ${
                              viewMode.value === "grid"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            }`}
                          >
                            Grid
                          </button>
                          <button
                            onClick$={() => (viewMode.value = "list")}
                            class={`rounded-full px-3 py-1 text-sm transition-colors ${
                              viewMode.value === "list"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
                    const status = getLinkStatus(
                      link,
                      wizardState.validationErrors,
                      "interface",
                    );
                    const errors = getLinkErrors(
                      link.id,
                      wizardState.validationErrors,
                    );
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
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {semanticMessages.wan_advanced_link_name(
                              {},
                              { locale },
                            )}
                          </label>
                          <Input
                            type="text"
                            value={link.name}
                            onInput$={(event: Event, value: string) => {
                              handleInterfaceUpdate(link.id, { name: value });
                            }}
                            placeholder={semanticMessages.wan_advanced_link_name_placeholder(
                              {},
                              { locale },
                            )}
                            class="w-full"
                          />
                        </div>

                        <InterfaceSelector
                          link={link}
                          onUpdate$={$((updates) =>
                            handleInterfaceUpdate(link.id, updates),
                          )}
                          mode={wizardState.mode}
                        />

                        {link.interfaceType === "Wireless" &&
                          link.interfaceName && (
                            <WirelessFields
                              credentials={link.wirelessCredentials}
                              onUpdate$={$((creds) =>
                                handleInterfaceUpdate(link.id, {
                                  wirelessCredentials: creds,
                                }),
                              )}
                              errors={{
                                ssid: getFieldErrors(
                                  link.id,
                                  "ssid",
                                  wizardState.validationErrors,
                                ),
                                password: getFieldErrors(
                                  link.id,
                                  "password",
                                  wizardState.validationErrors,
                                ),
                              }}
                            />
                          )}

                        {link.interfaceType === "LTE" && link.interfaceName && (
                          <LTEFields
                            settings={link.lteSettings}
                            onUpdate$={$((settings) =>
                              handleInterfaceUpdate(link.id, {
                                lteSettings: settings,
                              }),
                            )}
                            errors={{
                              apn: getFieldErrors(
                                link.id,
                                "apn",
                                wizardState.validationErrors,
                              ),
                            }}
                          />
                        )}

                        {wizardState.mode === "advanced" &&
                          link.interfaceType !== "LTE" && (
                            <VLANMACFields
                              vlanConfig={link.vlanConfig}
                              macAddress={link.macAddress}
                              onUpdateVLAN$={$((config) =>
                                handleInterfaceUpdate(link.id, {
                                  vlanConfig: config,
                                }),
                              )}
                              onUpdateMAC$={$((config) =>
                                handleInterfaceUpdate(link.id, {
                                  macAddress: config,
                                }),
                              )}
                              _errors={{
                                vlan: getFieldErrors(
                                  link.id,
                                  "vlan",
                                  wizardState.validationErrors,
                                ),
                                mac: getFieldErrors(
                                  link.id,
                                  "mac",
                                  wizardState.validationErrors,
                                ),
                              }}
                            />
                          )}

                        {link.interfaceName && renderConnectionFields(link)}
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
              <div class="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <div class="flex items-start gap-3">
                  <svg
                    class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    {semanticMessages.wan_advanced_easy_hint({}, { locale })}
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
