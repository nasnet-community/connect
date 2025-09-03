import { component$, type QRL } from "@builder.io/qwik";
import type { VPNClientConfig } from "../../types/VPNClientAdvancedTypes";

export interface VPNLinkHeaderProps {
  vpn: VPNClientConfig;
  index: number;
  isExpanded?: boolean;
  hasErrors?: boolean;
  canRemove?: boolean;
  onToggleExpand$?: QRL<() => void>;
  onRemove$?: QRL<() => void>;
  onMoveUp$?: QRL<() => void>;
  onMoveDown$?: QRL<() => void>;
}

export const VPNLinkHeader = component$<VPNLinkHeaderProps>(
  ({
    vpn,
    index,
    isExpanded = false,
    hasErrors = false,
    canRemove = true,
    onToggleExpand$,
    onRemove$,
    onMoveUp$,
    onMoveDown$,
  }) => {
    return (
      <div class="flex items-center justify-between p-6">
        <div class="flex items-center gap-4">
          {/* VPN Protocol Icon */}
          <div class={`
            flex h-12 w-12 items-center justify-center rounded-lg transition-colors
            ${hasErrors 
              ? "bg-red-100 dark:bg-red-900/30" 
              : "bg-primary-100 dark:bg-primary-900/30"}
          `}>
            <svg 
              class={`h-6 w-6 ${hasErrors ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400"}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={{
                "Wireguard": "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                "OpenVPN": "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                "L2TP": "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 719-9",
                "PPTP": "M13 10V3L4 14h7v7l9-11h-7z",
                "SSTP": "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                "IKeV2": "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              }[vpn.type] || "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"} />
            </svg>
          </div>

          {/* VPN Info */}
          <div>
            <div class="flex items-center gap-3">
              <h3 class={`
                text-lg font-semibold
                ${hasErrors
                  ? "text-red-800 dark:text-red-200"
                  : "text-gray-900 dark:text-white"}
              `}>
                {vpn.name || `VPN ${index + 1}`}
              </h3>
              <span class={`
                rounded-full px-3 py-1 text-xs font-medium
                ${hasErrors
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  : "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"}
              `}>
                {vpn.type}
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {$localize`Priority`}: {vpn.priority} 
              {vpn.assignedWANLink && (
                <span> • {$localize`Assigned to ${vpn.assignedWANLink}`}</span>
              )}
              {vpn.description && (
                <span> • {vpn.description}</span>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div class="flex items-center gap-2">
          {/* Priority buttons */}
          <div class="flex flex-col gap-1">
            {onMoveUp$ && (
              <button
                onClick$={onMoveUp$}
                class="rounded border border-gray-300 bg-white p-1 text-gray-600 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                title={$localize`Move up priority`}
              >
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            {onMoveDown$ && (
              <button
                onClick$={onMoveDown$}
                class="rounded border border-gray-300 bg-white p-1 text-gray-600 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                title={$localize`Move down priority`}
              >
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Expand/Collapse */}
          {onToggleExpand$ && (
            <button
              onClick$={onToggleExpand$}
              class="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50 hover:scale-105 transition-all dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              title={isExpanded ? $localize`Collapse` : $localize`Expand`}
            >
              <svg
                class={`
                  h-4 w-4 transition-transform
                  ${isExpanded ? "rotate-180" : ""}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {/* Remove */}
          {onRemove$ && canRemove && (
            <button
              onClick$={onRemove$}
              class="rounded-lg border border-red-300 bg-red-50 p-2 text-red-600 hover:bg-red-100 hover:scale-105 transition-all dark:border-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
              title={$localize`Remove VPN Client`}
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);