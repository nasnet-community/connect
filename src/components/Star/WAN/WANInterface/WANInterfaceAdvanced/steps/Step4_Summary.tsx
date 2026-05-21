import { component$, type QRL, useComputed$, $ } from "@builder.io/qwik";
import type { WANWizardState } from "../types";
import { Alert, Card, AdvancedSummaryBanner, SummaryItemCard } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import { renderInterfaceTypeIcon } from "../utils/interfaceTypeIcons";

export interface Step4Props {
  wizardState: WANWizardState;
  onEdit$: QRL<(step: number) => void>;
  onValidate$: QRL<() => Promise<boolean>>;
}

export const Step4_Summary = component$<Step4Props>(
  ({ wizardState, onEdit$, onValidate$: _onValidate$ }) => {
    const locale = useMessageLocale();
    // Use useComputed$ for sorted links to avoid mutations during render
    const sortedLinksByPriority = useComputed$(() => {
      return [...wizardState.links].sort(
        (a, b) => (a.priority || 0) - (b.priority || 0),
      );
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
        hasErrors: errors.length > 0,
      };
    });

    const handleEditStep = $((step: number) => {
      onEdit$(step);
    });

    return (
      <div class="space-y-6">
        <AdvancedSummaryBanner
          title={semanticMessages.wan_advanced_summary_title({}, { locale })}
          description={semanticMessages.wan_advanced_review_before_deploy(
            {},
            { locale },
          )}
        />

        {/* Status Alert with Modern Style */}
        {validationErrors.value.hasErrors && (
          <Alert status="error" class="border-l-4 border-red-500">
            <div class="flex">
              <svg
                class="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                  {semanticMessages.wan_advanced_issues_detected(
                    {},
                    { locale },
                  )}
                </h3>
                <div class="mt-2 text-sm text-red-700 dark:text-red-300">
                  <ul class="list-inside list-disc space-y-1">
                    {validationErrors.value.list.map((error, index) => (
                      <li key={index}>{error as string}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Alert>
        )}

        {/* WAN Links Overview with Modern Cards */}
        <Card class="overflow-hidden border-0 shadow-lg">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 dark:from-gray-800 dark:to-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {semanticMessages.wan_advanced_wan_links_overview(
                  {},
                  { locale },
                )}
              </h3>
              <button
                onClick$={() => handleEditStep(0)}
                class="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                {semanticMessages.wan_advanced_edit_configuration(
                  {},
                  { locale },
                )}
              </button>
            </div>
          </div>

          <div class="space-y-3 p-4">
            {sortedLinksByPriority.value.map((link, index) => {
              const isConfigured =
                link.connectionType && link.connectionConfirmed;
              const statusColor = !isConfigured
                ? "border-yellow-300 dark:border-yellow-600"
                : "border-green-300 dark:border-green-600";

              return (
                <SummaryItemCard key={link.id} statusColorClass={statusColor}>
                  <div q:slot="badge" class="flex flex-col items-center pt-0.5">
                    <span class="text-[10px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                      {semanticMessages.wan_advanced_priority({}, { locale })}
                    </span>
                    <div class="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  <div
                    q:slot="icon"
                    class={`self-center rounded-lg p-2.5 text-white shadow-md ${getInterfaceTypeColor(link.interfaceType)}`}
                  >
                    {renderInterfaceTypeIcon(
                      link.interfaceType || "Ethernet",
                      "h-5 w-5",
                    )}
                  </div>

                  <h4 class="truncate text-base font-semibold text-gray-900 dark:text-white md:text-lg">
                    {link.name}
                  </h4>
                  <div class="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-5">
                    <span class="text-gray-600 dark:text-gray-400">
                      {link.interfaceType ||
                        semanticMessages.wan_advanced_no_interface_selected(
                          {},
                          { locale },
                        )}{" "}
                      •{" "}
                      {link.interfaceName ||
                        semanticMessages.wan_advanced_not_selected(
                          {},
                          { locale },
                        )}
                    </span>
                    {link.connectionType && link.connectionType !== "LTE" && (
                      <>
                        <span class="text-gray-400">•</span>
                        <span class="text-gray-600 dark:text-gray-400">
                          {getConnectionTypeDisplay(link.connectionType)}
                        </span>
                      </>
                    )}
                  </div>

                  {(link.wirelessCredentials || link.vlanConfig?.enabled) && (
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      {link.wirelessCredentials && (
                        <span class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <svg
                            class="mr-1 h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01"
                            />
                          </svg>
                          {link.wirelessCredentials.SSID}
                        </span>
                      )}

                      {link.vlanConfig?.enabled && (
                        <span class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          VLAN {link.vlanConfig.id}
                        </span>
                      )}
                    </div>
                  )}

                  {link.connectionType === "PPPoE" &&
                    link.connectionConfig?.pppoe && (
                      <div class="mt-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 p-3 dark:from-orange-900/20 dark:to-orange-800/20">
                        <div class="flex items-center gap-2">
                          <div
                            class={`rounded-lg p-2 text-white ${getConnectionTypeColor("PPPoE")}`}
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
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div class="text-sm">
                            <p class="text-gray-600 dark:text-gray-400">
                              {semanticMessages.wan_advanced_username(
                                {},
                                { locale },
                              )}
                              :{" "}
                              <span class="font-medium text-gray-900 dark:text-white">
                                {link.connectionConfig.pppoe.username}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {link.connectionType === "Static" &&
                    link.connectionConfig?.static && (
                      <div class="mt-2.5 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 p-3 dark:from-indigo-900/20 dark:to-indigo-800/20">
                        <div class="grid grid-cols-1 gap-2 text-sm">
                          <div class="flex items-center gap-2">
                            <svg
                              class="h-4 w-4 text-indigo-600 dark:text-indigo-400"
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
                            <span class="text-gray-600 dark:text-gray-400">
                              IP:{" "}
                              <span class="font-medium text-gray-900 dark:text-white">
                                {link.connectionConfig.static.ipAddress}/
                                {link.connectionConfig.static.subnet}
                              </span>
                            </span>
                          </div>
                          <div class="flex items-center gap-2">
                            <svg
                              class="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              />
                            </svg>
                            <span class="text-gray-600 dark:text-gray-400">
                              Gateway:{" "}
                              <span class="font-medium text-gray-900 dark:text-white">
                                {link.connectionConfig.static.gateway}
                              </span>
                            </span>
                          </div>
                          <div class="flex items-center gap-2">
                            <svg
                              class="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                              />
                            </svg>
                            <span class="text-gray-600 dark:text-gray-400">
                              DNS:{" "}
                              <span class="font-medium text-gray-900 dark:text-white">
                                {link.connectionConfig.static.DNS}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                  <div q:slot="trailing" class="flex flex-col items-end gap-1.5">
                    {!isConfigured ? (
                      <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <span class="mr-1.5 h-2 w-2 rounded-full bg-yellow-500"></span>
                        {semanticMessages.wan_advanced_not_configured(
                          {},
                          { locale },
                        )}
                      </span>
                    ) : (
                      <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span class="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                        {semanticMessages.wan_advanced_link_ready(
                          {},
                          { locale },
                        )}
                      </span>
                    )}

                    {wizardState.links.length > 1 &&
                      link.weight !== undefined &&
                      wizardState.multiLinkStrategy?.strategy !== "Failover" && (
                        <span class="inline-flex items-center rounded-md bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {link.weight}%{" "}
                          {semanticMessages.wan_advanced_weight(
                            {},
                            { locale },
                          )}
                        </span>
                      )}
                  </div>
                </SummaryItemCard>
              );
            })}
          </div>
        </Card>

        {/* Multi-WAN Strategy Section */}
        {wizardState.links.length > 1 && wizardState.multiLinkStrategy && (
          <Card class="overflow-hidden border-0 shadow-lg">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 dark:from-gray-800 dark:to-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {semanticMessages.wan_advanced_multi_wan_strategy(
                    {},
                    { locale },
                  )}
                </h3>
                <button
                  onClick$={() => handleEditStep(1)}
                  class="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  {semanticMessages.wan_advanced_edit_configuration(
                    {},
                    { locale },
                  )}
                </button>
              </div>
            </div>

            <div class="p-6">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div class="flex items-center gap-3">
                  <div class="rounded-lg bg-indigo-100 p-3 dark:bg-indigo-900/30">
                    <svg
                      class="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {semanticMessages.wan_advanced_strategy({}, { locale })}
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {getStrategyDisplay(
                        wizardState.multiLinkStrategy.strategy,
                      )}
                    </p>
                  </div>
                </div>

                {wizardState.multiLinkStrategy.failoverCheckInterval && (
                  <div class="flex items-center gap-3">
                    <div class="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                      <svg
                        class="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {semanticMessages.wan_advanced_check_interval(
                          {},
                          { locale },
                        )}
                      </p>
                      <p class="font-semibold text-gray-900 dark:text-white">
                        {wizardState.multiLinkStrategy.failoverCheckInterval}s
                      </p>
                    </div>
                  </div>
                )}

                {wizardState.multiLinkStrategy.failoverTimeout && (
                  <div class="flex items-center gap-3">
                    <div class="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                      <svg
                        class="h-6 w-6 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {semanticMessages.wan_advanced_timeout({}, { locale })}
                      </p>
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
                      <svg
                        class="h-4 w-4 text-primary-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                      {semanticMessages.wan_advanced_load_balance_settings(
                        {},
                        { locale },
                      )}
                    </h4>
                    <div class="space-y-3">
                      <div class="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-3 dark:from-blue-900/20 dark:to-blue-800/20">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {semanticMessages.wan_advanced_method({}, { locale })}
                          :{" "}
                          <span class="font-medium text-gray-900 dark:text-white">
                            {wizardState.multiLinkStrategy.loadBalanceMethod ||
                              "PCC"}
                          </span>
                        </p>
                      </div>
                      <div class="space-y-2">
                        {wizardState.links.map((link) => (
                          <div
                            key={link.id}
                            class="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800"
                          >
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
                      <svg
                        class="h-4 w-4 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                      {semanticMessages.wan_advanced_failover_settings(
                        {},
                        { locale },
                      )}
                    </h4>
                    <div class="space-y-3">
                      <div class="grid grid-cols-2 gap-2">
                        <div class="rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 dark:from-yellow-900/20 dark:to-yellow-800/20">
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {semanticMessages.wan_advanced_check_interval(
                              {},
                              { locale },
                            )}
                          </p>
                          <p class="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                            {
                              wizardState.multiLinkStrategy
                                .failoverCheckInterval
                            }
                            s
                          </p>
                        </div>
                        <div class="rounded-lg bg-gradient-to-r from-red-50 to-red-100 p-3 dark:from-red-900/20 dark:to-red-800/20">
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {semanticMessages.wan_advanced_timeout(
                              {},
                              { locale },
                            )}
                          </p>
                          <p class="text-lg font-bold text-red-700 dark:text-red-300">
                            {wizardState.multiLinkStrategy.failoverTimeout}s
                          </p>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {semanticMessages.wan_advanced_priority_order(
                            {},
                            { locale },
                          )}
                        </p>
                        {sortedLinksByPriority.value.map((link, index) => (
                          <div
                            key={link.id}
                            class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 transition-all hover:shadow-md dark:from-gray-800 dark:to-gray-700"
                          >
                            <div class="flex items-center gap-3">
                              <div
                                class={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ${
                                  index === 0
                                    ? "bg-gradient-to-br from-green-500 to-green-700"
                                    : index === 1
                                      ? "bg-gradient-to-br from-blue-500 to-blue-700"
                                      : "bg-gradient-to-br from-gray-400 to-gray-600"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <span class="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {link.name}
                              </span>
                              {index === 0 && (
                                <span class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                  {semanticMessages.wan_advanced_primary(
                                    {},
                                    { locale },
                                  )}
                                </span>
                              )}
                            </div>
                            <div class="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-gradient-to-r from-primary-500 to-primary-700 transition-transform group-hover:scale-x-100"></div>
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
