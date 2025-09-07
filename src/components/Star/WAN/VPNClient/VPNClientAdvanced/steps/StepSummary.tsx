import { component$, $, useSignal } from "@builder.io/qwik";
import type { VPNClientAdvancedState, VPNClientConfig } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNBox } from "../components/VPNBox/VPNBox";
import { VPNBoxContent } from "../components/VPNBox/VPNBoxContent";

export interface StepSummaryProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  isCommitting?: boolean;
}

export const StepSummary = component$<StepSummaryProps>(
  ({ wizardState, wizardActions }) => {
    const editingVPN = useSignal<string | null>(null);
    const editedName = useSignal<string>("");
    
    // Check if there are validation errors
    const hasValidationErrors = Object.keys(wizardState.validationErrors).length > 0;

    // Sort VPNs by priority and filter out uninitialized VPNs
    const sortedVPNs = [...wizardState.vpnConfigs]
      .filter(vpn => vpn.type !== undefined) // Only show configured VPNs
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));

    const startEdit = $((vpnId: string, currentName: string) => {
      editingVPN.value = vpnId;
      editedName.value = currentName;
    });

    const saveEdit = $((vpnId: string) => {
      wizardActions.updateVPN$(vpnId, { name: editedName.value });
      editingVPN.value = null;
      editedName.value = "";
    });

    const cancelEdit = $(() => {
      editingVPN.value = null;
      editedName.value = "";
    });



    const getConfigSummary = (vpn: (typeof wizardState.vpnConfigs)[0]) => {
      const details: string[] = [];

      switch (vpn.type) {
        case "Wireguard":
          if (vpn.config && "PeerEndpointAddress" in vpn.config) {
            details.push(
              `Server: ${vpn.config.PeerEndpointAddress}:${vpn.config.PeerEndpointPort || 51820}`,
            );
          }
          break;

        case "OpenVPN":
          if (vpn.config && "Server" in vpn.config && vpn.config.Server) {
            details.push(
              `Server: ${vpn.config.Server.Address}:${vpn.config.Server.Port || "1194"}`,
            );
            if ("AuthType" in vpn.config) {
              details.push(`Auth: ${vpn.config.AuthType || "Certificate"}`);
            }
          }
          break;

        case "L2TP":
          if (vpn.config && "Server" in vpn.config && vpn.config.Server) {
            details.push(`Server: ${vpn.config.Server.Address}`);
            if ("UseIPsec" in vpn.config) {
              details.push(
                `IPSec: ${vpn.config.UseIPsec ? "Enabled" : "Disabled"}`,
              );
            }
          }
          break;

        case "PPTP":
          if (vpn.config && "ConnectTo" in vpn.config) {
            details.push(`Server: ${vpn.config.ConnectTo}`);
          }
          break;

        case "SSTP":
          if (vpn.config && "Server" in vpn.config && vpn.config.Server) {
            details.push(
              `Server: ${vpn.config.Server.Address}:${vpn.config.Server.Port || "443"}`,
            );
          }
          break;

        case "IKeV2":
          if (vpn.config && "ServerAddress" in vpn.config) {
            details.push(`Server: ${vpn.config.ServerAddress}`);
            if ("AuthMethod" in vpn.config) {
              details.push(
                `Auth: ${vpn.config.AuthMethod || "pre-shared-key"}`,
              );
            }
          }
          break;
      }

      return details;
    };



    return (
      <div class="space-y-6">
        {/* Header */}
        <div>
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {$localize`VPN Configuration Summary`}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Review your VPN configurations. You can make minor edits before applying.`}
          </p>
        </div>

        {/* Validation status */}
        {hasValidationErrors ? (
          <div class="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
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
                <p class="text-sm text-red-700 dark:text-red-300">
                  {$localize`Please fix validation errors before applying configuration`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <div class="flex">
              <svg
                class="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-green-700 dark:text-green-300">
                  {$localize`All configurations are valid and ready to apply`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VPN Summary List */}
        <div class="space-y-4">
          {sortedVPNs.map((vpn, index) => (
            <VPNBox
              key={vpn.id}
              vpn={vpn as VPNClientConfig}
              index={index}
              isExpanded={false}
              canRemove={false}
              validationErrors={wizardState.validationErrors}
            >
              <VPNBoxContent
                vpn={vpn as VPNClientConfig}
                validationErrors={wizardState.validationErrors}
              >
                <div class="space-y-4">
                  {/* Priority and Name */}
                  <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                        <span class="text-xs font-semibold text-primary-700 dark:text-primary-300">
                          {index + 1}
                        </span>
                      </div>

                      {editingVPN.value === vpn.id ? (
                        <div class="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editedName.value}
                            onInput$={(e) => {
                              editedName.value = (
                                e.target as HTMLInputElement
                              ).value;
                            }}
                            onKeyDown$={(e) => {
                              if (e.key === "Enter") {
                                saveEdit(vpn.id);
                              } else if (e.key === "Escape") {
                                cancelEdit();
                              }
                            }}
                            class="rounded border border-primary-300 px-2 py-1 text-sm focus:ring-1 focus:ring-primary-500 dark:border-primary-600 dark:bg-gray-700"
                            autoFocus
                          />
                          <button
                            onClick$={() => saveEdit(vpn.id)}
                            class="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            title={$localize`Save`}
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                          <button
                            onClick$={cancelEdit}
                            class="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            title={$localize`Cancel`}
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div class="flex items-center space-x-2">
                          <h3 class="font-medium text-gray-900 dark:text-gray-100">
                            {vpn.name}
                          </h3>
                          <button
                            onClick$={() => startEdit(vpn.id, vpn.name)}
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title={$localize`Edit name`}
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
                          </button>
                        </div>
                      )}
                    </div>

                    <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {vpn.type}
                    </span>
                  </div>

                  {/* Configuration Summary */}
                  <div class="pl-11">
                    <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {getConfigSummary(vpn).map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Foreign Link (if applicable) */}
                  {vpn.assignedLink && (
                    <div class="border-t border-gray-200 pl-11 pt-2 dark:border-gray-700">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`Assigned to: ${vpn.assignedLink}`}
                      </p>
                    </div>
                  )}
                </div>
              </VPNBoxContent>
            </VPNBox>
          ))}
        </div>



        {/* Info message */}
        <div class="mt-4 rounded-lg bg-info-50 p-4 dark:bg-info-900/20">
          <p class="text-sm text-info-700 dark:text-info-300">
            {$localize`Review your configuration above. When ready, click "Save & Complete" to apply the VPN settings to your router configuration.`}
          </p>
        </div>
      </div>
    );
  },
);
