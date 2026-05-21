import { component$, $, type QRL } from "@builder.io/qwik";
import {
  Card,
  Alert,
  AdvancedSummaryBanner,
  SummaryItemCard,
} from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface Step3SummaryProps {
  wizardState: VPNClientAdvancedState;
  wizardActions?: UseVPNClientAdvancedReturn;
  onEdit$?: QRL<(step: number) => void>;
  onValidate$?: QRL<() => Promise<boolean>>;
}

export const Step3_Summary = component$<Step3SummaryProps>(
  ({ wizardState, onEdit$, onValidate$: _onValidate$ }) => {
    const locale = useMessageLocale();
    const showsWeightBadges =
      wizardState.multiVPNStrategy?.strategy === "LoadBalance" ||
      wizardState.multiVPNStrategy?.strategy === "Both";

    // Check validation status
    const hasValidationErrors =
      Object.keys(wizardState.validationErrors).length > 0;
    console.log("[Step3_Summary] Validation status check:", {
      hasValidationErrors,
      errorKeys: Object.keys(wizardState.validationErrors),
      errorDetails: wizardState.validationErrors,
    });

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

    return (
      <div class="space-y-6">
        <AdvancedSummaryBanner
          title={semanticMessages.vpn_client_advanced_summary_title(
            {},
            {
              locale,
            },
          )}
          description={semanticMessages.vpn_client_advanced_summary_description(
            {},
            {
              locale,
            },
          )}
        />

        {/* Status Alert with Modern Style */}
        {hasValidationErrors && (
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
                  {semanticMessages.vpn_client_advanced_configuration_issues_title(
                    {},
                    { locale },
                  )}
                </h3>
                <p class="mt-1 text-sm text-red-700 dark:text-red-300">
                  {semanticMessages.vpn_client_advanced_configuration_issues_description(
                    {},
                    { locale },
                  )}
                </p>
              </div>
            </div>
          </Alert>
        )}

        {/* VPN Clients Overview with Modern Cards */}
        <Card class="overflow-hidden border-0 shadow-lg">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 dark:from-gray-800 dark:to-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {semanticMessages.vpn_client_advanced_connections_overview(
                  {},
                  {
                    locale,
                  },
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
                {semanticMessages.vpn_client_advanced_edit_configuration(
                  {},
                  {
                    locale,
                  },
                )}
              </button>
            </div>
          </div>

          <div class="space-y-3 p-4">
            {[...wizardState.vpnConfigs]
              .sort((a, b) => (a.priority || 0) - (b.priority || 0))
              .map((vpn, index) => {
                const isConfigured =
                  vpn.type && "config" in vpn && Boolean(vpn.config);
                const statusColor = !vpn.enabled
                  ? "border-gray-300 dark:border-gray-600"
                  : isConfigured
                    ? "border-green-300 dark:border-green-600"
                    : "border-yellow-300 dark:border-yellow-600";

                return (
                  <SummaryItemCard key={vpn.id} statusColorClass={statusColor}>
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
                      class={`self-center rounded-lg p-2.5 text-white shadow-md ${getProtocolColor(vpn.type)}`}
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
                          d={getVPNIcon(vpn.type)}
                        />
                      </svg>
                    </div>

                    <h4 class="truncate text-base font-semibold text-gray-900 dark:text-white md:text-lg">
                      {vpn.name}
                    </h4>
                    <div class="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-5">
                      <span class="text-gray-600 dark:text-gray-400">
                        {vpn.type ||
                          semanticMessages.vpn_client_advanced_no_protocol_selected(
                            {},
                            { locale },
                          )}
                      </span>
                      {vpn.assignedLink && (
                        <>
                          <span class="text-gray-400">•</span>
                          <span class="text-gray-600 dark:text-gray-400">
                            {vpn.assignedLink}
                          </span>
                        </>
                      )}
                    </div>

                    <div q:slot="trailing" class="flex flex-col items-end gap-1.5">
                      {!vpn.enabled ? (
                        <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                          {semanticMessages.shared_disabled({}, { locale })}
                        </span>
                      ) : isConfigured ? (
                        <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span class="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                          {semanticMessages.shared_ready({}, { locale })}
                        </span>
                      ) : (
                        <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <span class="mr-1.5 h-2 w-2 rounded-full bg-yellow-500"></span>
                          {semanticMessages.vpn_client_advanced_not_configured_status(
                            {},
                            { locale },
                          )}
                        </span>
                      )}

                      {showsWeightBadges && vpn.weight !== undefined && (
                        <span class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {vpn.weight}%{" "}
                          {semanticMessages.vpn_client_advanced_weight(
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

        {/* Strategy Configuration */}
        {wizardState.multiVPNStrategy && (
          <Card class="overflow-hidden border-0 shadow-lg">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 dark:from-gray-800 dark:to-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {semanticMessages.vpn_client_advanced_strategy_title(
                  {},
                  {
                    locale,
                  },
                )}
              </h3>
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
                      {semanticMessages.vpn_client_advanced_strategy(
                        {},
                        { locale },
                      )}
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {wizardState.multiVPNStrategy.strategy}
                    </p>
                  </div>
                </div>

                {wizardState.multiVPNStrategy.failoverCheckInterval && (
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
                        {semanticMessages.vpn_client_advanced_check_interval(
                          {},
                          { locale },
                        )}
                      </p>
                      <p class="font-semibold text-gray-900 dark:text-white">
                        {wizardState.multiVPNStrategy.failoverCheckInterval}s
                      </p>
                    </div>
                  </div>
                )}

                {wizardState.multiVPNStrategy.failoverTimeout && (
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
                        {semanticMessages.vpn_client_advanced_timeout(
                          {},
                          { locale },
                        )}
                      </p>
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
  },
);
