import { component$, $, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import { Card, Input, ProgressBar } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { useVPNClientValidation } from "../hooks/useVPNClientValidation";

// Import protocol-specific fields from Advanced components
import { WireguardFields } from "../components/fields/WireguardFields";
import { OpenVPNFields } from "../components/fields/OpenVPNFields";
import { L2TPFields } from "../components/fields/L2TPFields";
import { IKEv2Fields } from "../components/fields/IKEv2Fields";
import { PPTPFields } from "../components/fields/PPTPFields";
import { SSTFields } from "../components/fields/SSTFields";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface Step2VPNConfigurationProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  onRefreshCompletion$?: QRL<() => Promise<void>>;
}

export const Step2_VPNConfiguration = component$<Step2VPNConfigurationProps>(
  ({ wizardState, wizardActions, onRefreshCompletion$ }) => {
    const locale = useMessageLocale();
    // Initialize validation
    const validation = useVPNClientValidation();

    // Initialize with the first VPN expanded if any exist
    const expandedVPNId = useSignal<string | null>(
      wizardState.vpnConfigs.length > 0 ? wizardState.vpnConfigs[0].id : null,
    );
    const searchQuery = useSignal("");

    const canRemoveVPN =
      wizardState.vpnConfigs.length > wizardActions.foreignWANCount;

    const handleUpdateVPN = $(async (vpnId: string, updates: any) => {
      try {
        console.log(
          `[Step2_VPNConfiguration] Updating VPN for ${vpnId}:`,
          updates,
        );
        await wizardActions.updateVPN$(vpnId, updates);

        // Immediately trigger refresh - WANAdvanced pattern
        if (onRefreshCompletion$) {
          console.log(
            `[Step2_VPNConfiguration] Triggering immediate refresh after VPN update for ${vpnId}`,
          );
          await onRefreshCompletion$();
        }
      } catch (error) {
        console.error("Failed to update VPN:", error);
      }
    });

    const handleUpdateVPNConfig = $(async (vpnId: string, updates: any) => {
      try {
        console.log(
          `[Step2_VPNConfiguration] Updating VPN config for ${vpnId}:`,
          updates,
        );
        await wizardActions.updateVPN$(vpnId, { config: updates as any });

        // Immediately trigger refresh - WANAdvanced pattern
        if (onRefreshCompletion$) {
          console.log(
            `[Step2_VPNConfiguration] Triggering immediate refresh after config update for ${vpnId}`,
          );
          await onRefreshCompletion$();
        }
      } catch (error) {
        console.error("Failed to update VPN config:", error);
      }
    });

    const handleRemoveVPN = $(async (vpnId: string) => {
      if (!canRemoveVPN) return;

      try {
        await wizardActions.removeVPN$(vpnId);

        // Handle expansion after removal
        if (expandedVPNId.value === vpnId) {
          // Find another VPN to expand from the remaining ones
          const remainingVPNs = wizardState.vpnConfigs.filter(
            (vpn) => vpn.id !== vpnId,
          );
          expandedVPNId.value =
            remainingVPNs.length > 0 ? remainingVPNs[0].id : null;
        }

        if (onRefreshCompletion$) {
          await onRefreshCompletion$();
        }
      } catch (error) {
        console.error("Failed to remove VPN:", error);
      }
    });

    const handleToggleExpanded = $((vpnId: string) => {
      expandedVPNId.value = expandedVPNId.value === vpnId ? null : vpnId;
    });

    // Simple non-reactive filtering
    const getFilteredVPNs = () => {
      if (!searchQuery.value) return wizardState.vpnConfigs;
      const query = searchQuery.value.toLowerCase();
      return wizardState.vpnConfigs.filter(
        (vpn) =>
          vpn.name.toLowerCase().includes(query) ||
          (vpn.type && vpn.type.toLowerCase().includes(query)) ||
          (vpn.description && vpn.description.toLowerCase().includes(query)),
      );
    };

    // Track VPN validation state
    const vpnValidationState = useSignal<Record<string, boolean>>({});

    // Update validation state when VPNs change
    useTask$(async ({ track, cleanup: _cleanup }) => {
      track(() => wizardState.vpnConfigs);

      // Deep track config fields for each VPN
      track(() =>
        wizardState.vpnConfigs.map((vpn) => {
          // Track base VPN properties
          const baseTracking = {
            id: vpn.id,
            name: vpn.name,
            type: vpn.type,
          };

          // Track deep config fields based on VPN type
          if (vpn.type && "config" in vpn) {
            const config = vpn.config as any;

            switch (vpn.type) {
              case "Wireguard":
                return {
                  ...baseTracking,
                  InterfacePrivateKey: config.InterfacePrivateKey || "",
                  InterfaceAddress: config.InterfaceAddress || "",
                  PeerPublicKey: config.PeerPublicKey || "",
                  PeerEndpointAddress: config.PeerEndpointAddress || "",
                  PeerEndpointPort: config.PeerEndpointPort || 0,
                };

              case "OpenVPN":
                return {
                  ...baseTracking,
                  serverAddress: config.Server?.Address || "",
                  serverPort: config.Server?.Port || 0,
                  username: config.Credentials?.Username || "",
                  password: config.Credentials?.Password || "",
                };

              case "L2TP":
                return {
                  ...baseTracking,
                  serverAddress: config.Server?.Address || "",
                  username: config.Credentials?.Username || "",
                  password: config.Credentials?.Password || "",
                  ipsecSecret: config.IPsecSecret || "",
                };

              case "IKeV2":
                return {
                  ...baseTracking,
                  serverAddress: config.ServerAddress || "",
                  username: config.Credentials?.Username || "",
                  password: config.Credentials?.Password || "",
                };

              case "PPTP":
                return {
                  ...baseTracking,
                  connectTo: config.ConnectTo || "",
                  username: config.Credentials?.Username || "",
                  password: config.Credentials?.Password || "",
                };

              case "SSTP":
                return {
                  ...baseTracking,
                  serverAddress: config.Server?.Address || "",
                  username: config.Credentials?.Username || "",
                  password: config.Credentials?.Password || "",
                };

              default:
                return baseTracking;
            }
          }

          return baseTracking;
        }),
      );

      // Immediate validation and refresh - following WANAdvanced pattern
      const validationMap: Record<string, boolean> = {};
      for (const vpn of wizardState.vpnConfigs) {
        const isValid = await validation.hasAllMandatoryFields$(vpn);
        validationMap[vpn.id] = isValid;
        console.log(
          `[Step2_VPNConfiguration] VPN ${vpn.name} (${vpn.id}) validation:`,
          isValid,
        );
      }
      vpnValidationState.value = validationMap;

      const allConfigured = Object.values(validationMap).every(
        (isValid) => isValid,
      );
      console.log(
        "[Step2_VPNConfiguration] All VPNs configured:",
        allConfigured,
      );

      // Immediately trigger parent refresh - WANAdvanced pattern
      if (onRefreshCompletion$) {
        console.log(
          "[Step2_VPNConfiguration] Triggering immediate parent refresh...",
        );
        await onRefreshCompletion$();
        console.log("[Step2_VPNConfiguration] Parent refresh completed");
      }
    });

    // Get statistics - use validation state to check if VPNs are properly configured
    const configuredVPNs = Object.values(vpnValidationState.value).filter(
      (isValid) => isValid,
    ).length;
    const totalVPNs = wizardState.vpnConfigs.length;
    const completionPercentage =
      totalVPNs > 0 ? Math.round((configuredVPNs / totalVPNs) * 100) : 0;

    const _getVPNIcon = (type: string) => {
      switch (type) {
        case "Wireguard":
          return "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0";
        case "OpenVPN":
          return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
        default:
          return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
      }
    };

    return (
      <div class="space-y-6">
        {/* Header with Progress Indicator */}
        <div class="mb-6">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-light text-gray-900 dark:text-white">
                {semanticMessages.vpn_client_advanced_configuration_title(
                  {},
                  {
                    locale,
                  },
                )}
              </h2>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_configuration_description(
                  {},
                  { locale },
                )}
              </p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                {configuredVPNs} / {totalVPNs}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_vpns_configured(
                  {},
                  {
                    locale,
                  },
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {totalVPNs > 0 && (
            <div class="space-y-2">
              <ProgressBar
                value={completionPercentage}
                max={100}
                size="md"
                color={completionPercentage === 100 ? "success" : "primary"}
                variant="gradient"
                showValue={true}
              />
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-2">
                    <div class="h-2 w-2 rounded-full bg-green-500"></div>
                    <span class="text-gray-600 dark:text-gray-400">
                      {semanticMessages.shared_configured({}, { locale })}:{" "}
                      {configuredVPNs}
                    </span>
                  </span>
                  {configuredVPNs < totalVPNs && (
                    <span class="flex items-center gap-2">
                      <div class="h-2 w-2 animate-pulse rounded-full bg-amber-500"></div>
                      <span class="text-gray-600 dark:text-gray-400">
                        {semanticMessages.vpn_client_advanced_remaining(
                          {},
                          {
                            locale,
                          },
                        )}
                        : {totalVPNs - configuredVPNs}
                      </span>
                    </span>
                  )}
                </div>
                {completionPercentage === 100 && (
                  <span class="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <svg
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {semanticMessages.vpn_client_advanced_all_configured(
                      {},
                      {
                        locale,
                      },
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* No VPNs State */}
        {wizardState.vpnConfigs.length === 0 && (
          <Card>
            <div class="py-12 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {semanticMessages.vpn_client_advanced_no_clients_configured(
                  {},
                  {
                    locale,
                  },
                )}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_add_clients_first(
                  {},
                  {
                    locale,
                  },
                )}
              </p>
            </div>
          </Card>
        )}

        {/* Search Box */}
        {wizardState.vpnConfigs.length > 2 && (
          <div class="relative">
            <Input
              type="text"
              placeholder={semanticMessages.vpn_client_advanced_search_clients(
                {},
                { locale },
              )}
              value={searchQuery.value}
              onInput$={(event: Event, value: string) =>
                (searchQuery.value = value)
              }
              class="pl-10"
            />
            <svg
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}

        {/* VPN Configuration Cards */}
        {wizardState.vpnConfigs.length > 0 && (
          <div class="space-y-4">
            {getFilteredVPNs().map((vpn, index) => {
              const isExpanded = expandedVPNId.value === vpn.id;
              const isComplete = vpnValidationState.value[vpn.id] || false;
              const hasErrors = Object.keys(wizardState.validationErrors).some(
                (key) => key.startsWith(`vpn-${vpn.id}`),
              );

              // Determine card status
              const getVPNStatus = () => {
                if (hasErrors) return "error";
                if (isComplete) return "complete";
                return "incomplete";
              };

              const status = getVPNStatus();

              const getCardStyle = () => {
                switch (status) {
                  case "complete":
                    return "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-400 dark:border-green-600 hover:shadow-lg transition-all duration-200";
                  case "error":
                    return "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-400 dark:border-red-600 hover:shadow-lg transition-all duration-200";
                  default:
                    return "bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 border-2 border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all duration-200";
                }
              };

              return (
                <div
                  key={vpn.id}
                  class={`
                  relative rounded-xl border transition-all duration-200 ${getCardStyle()}
                `}
                >
                  {/* Card Header - Always visible */}
                  <div
                    class="cursor-pointer rounded-t-xl p-5 transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50"
                    onClick$={() => handleToggleExpanded(vpn.id)}
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        {/* Status Icon with Animation */}
                        <div class="relative">
                          <div
                            class={`flex h-12 w-12 items-center justify-center rounded-xl ${
                              status === "complete"
                                ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/25"
                                : status === "error"
                                  ? "bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25"
                                  : "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/25"
                            }`}
                          >
                            {status === "complete" ? (
                              <svg
                                class="h-6 w-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : status === "incomplete" ? (
                              <svg
                                class="h-6 w-6 animate-pulse text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                class="h-6 w-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                            )}
                          </div>
                          {status === "incomplete" && (
                            <span class="absolute -right-1 -top-1 flex h-3 w-3">
                              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                              <span class="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
                            </span>
                          )}
                        </div>

                        {/* Name and Info */}
                        <div class="flex-1">
                          <h3
                            class={`text-lg font-semibold ${
                              status === "complete"
                                ? "text-green-800 dark:text-green-200"
                                : status === "incomplete"
                                  ? "text-amber-800 dark:text-amber-200"
                                  : "text-red-800 dark:text-red-200"
                            }`}
                          >
                            {vpn.name ||
                              semanticMessages.vpn_client_advanced_default_name(
                                { index: index + 1 },
                                { locale },
                              )}
                          </h3>
                          <div class="mt-1 flex items-center gap-2">
                            <span
                              class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                vpn.type
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {vpn.type ||
                                semanticMessages.vpn_client_advanced_no_protocol_selected(
                                  {},
                                  { locale },
                                )}
                            </span>
                            {status === "complete" && (
                              <span class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-200">
                                <svg
                                  class="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                {semanticMessages.shared_ready({}, { locale })}
                              </span>
                            )}
                            {status === "incomplete" && vpn.type && (
                              <span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                                <svg
                                  class="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                {semanticMessages.vpn_client_advanced_configuration_required(
                                  {},
                                  { locale },
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side */}
                      <div class="flex items-center gap-3">
                        {canRemoveVPN && (
                          <button
                            onClick$={$((e: Event) => {
                              e.stopPropagation();
                              handleRemoveVPN(vpn.id);
                            })}
                            class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                        <div
                          class={`rounded-lg p-2 ${
                            isExpanded ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <svg
                            class={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content with Protocol-Specific Fields */}
                  {isExpanded && (
                    <div class="border-t border-gray-200 p-6 dark:border-gray-700">
                      {/* Connection Name */}
                      <div class="mb-6">
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {semanticMessages.vpn_client_advanced_connection_name(
                            {},
                            { locale },
                          )}
                        </label>
                        <Input
                          type="text"
                          value={vpn.name}
                          onInput$={(event: Event, value: string) => {
                            handleUpdateVPN(vpn.id, { name: value });
                          }}
                          placeholder={semanticMessages.vpn_client_advanced_connection_name_placeholder(
                            {},
                            { locale },
                          )}
                          class="w-full"
                        />
                      </div>

                      {/* Protocol-Specific Configuration */}
                      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h3 class="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                          {semanticMessages.vpn_client_advanced_protocol_configuration(
                            { type: vpn.type || "VPN" },
                            { locale },
                          )}
                        </h3>

                        {vpn.type === "Wireguard" && (
                          <WireguardFields
                            config={vpn.config}
                            onUpdate$={$((updates) =>
                              handleUpdateVPNConfig(vpn.id, updates),
                            )}
                            errors={{}}
                            mode="advanced"
                          />
                        )}

                        {vpn.type === "OpenVPN" && (
                          <OpenVPNFields
                            config={vpn.config}
                            onUpdate$={$((updates) =>
                              handleUpdateVPNConfig(vpn.id, updates),
                            )}
                            errors={{}}
                            mode="advanced"
                          />
                        )}

                        {vpn.type === "L2TP" && (
                          <L2TPFields
                            config={vpn.config}
                            onUpdate$={$((updates) =>
                              handleUpdateVPNConfig(vpn.id, updates),
                            )}
                            errors={{}}
                          />
                        )}

                        {vpn.type === "IKeV2" && (
                          <IKEv2Fields
                            config={vpn.config}
                            onUpdate$={$((updates) =>
                              handleUpdateVPNConfig(vpn.id, updates),
                            )}
                            errors={{}}
                          />
                        )}

                        {vpn.type === "PPTP" && (
                          <PPTPFields
                            config={vpn.config}
                            onUpdate$={$((updates) =>
                              handleUpdateVPNConfig(vpn.id, updates),
                            )}
                            errors={{}}
                          />
                        )}

                        {vpn.type === "SSTP" && (
                          <SSTFields
                            config={vpn.config}
                            onUpdate$={$((updates) =>
                              handleUpdateVPNConfig(vpn.id, updates),
                            )}
                            errors={{}}
                          />
                        )}
                      </div>

                      {/* Status */}
                      <div class="mt-4">
                        {isComplete ? (
                          <div class="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                            <svg
                              class="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span class="font-medium">
                              {semanticMessages.vpn_client_advanced_all_mandatory_fields_configured(
                                {},
                                { locale },
                              )}
                            </span>
                          </div>
                        ) : vpn.type ? (
                          <div class="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                            <svg
                              class="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span class="font-medium">
                              {semanticMessages.vpn_client_advanced_fill_required_fields(
                                {},
                                { locale },
                              )}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* No Search Results */}
        {searchQuery.value && getFilteredVPNs().length === 0 && (
          <Card>
            <div class="py-8 text-center">
              <svg
                class="mx-auto h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {semanticMessages.vpn_client_advanced_no_clients_found(
                  {},
                  {
                    locale,
                  },
                )}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_adjust_search_terms(
                  {},
                  {
                    locale,
                  },
                )}
              </p>
            </div>
          </Card>
        )}
      </div>
    );
  },
);
