import { component$, type QRL } from "@builder.io/qwik";
import type { VPNClientConfig } from "../../types/VPNClientAdvancedTypes";

export interface VPNBoxHeaderProps {
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

export const VPNBoxHeader = component$<VPNBoxHeaderProps>(
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
    // Get VPN protocol icon
    const getVPNIcon = () => {
      switch (vpn.type) {
        case "Wireguard":
          return "🔒";
        case "OpenVPN":
          return "🔑";
        case "L2TP":
          return "🛡️";
        case "PPTP":
          return "🔓";
        case "SSTP":
          return "🔐";
        case "IKeV2":
          return "⚡";
        default:
          return "🔒";
      }
    };

    return (
      <div class="flex items-center justify-between p-6">
        <div class="flex items-center gap-4">
          {/* VPN Protocol Icon */}
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <span class="text-xl">{getVPNIcon()}</span>
          </div>

          {/* VPN Info */}
          <div>
            <div class="flex items-center gap-3">
              <h3 class={[
                "text-lg font-semibold",
                hasErrors
                  ? "text-red-800 dark:text-red-200"
                  : "text-gray-900 dark:text-white"
              ]}>
                {vpn.name || `VPN ${index + 1}`}
              </h3>
              <span class={[
                "rounded-full px-2 py-1 text-xs font-medium",
                hasErrors
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  : "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
              ]}>
                {vpn.type}
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {$localize`Priority`}: {vpn.priority} • {vpn.assignedWANLink ? $localize`Assigned to WAN Link` : $localize`No WAN Link assigned`}
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
                class="rounded border border-gray-300 bg-white p-1 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                title={$localize`Move up`}
              >
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            {onMoveDown$ && (
              <button
                onClick$={onMoveDown$}
                class="rounded border border-gray-300 bg-white p-1 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                title={$localize`Move down`}
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
              class="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              title={isExpanded ? $localize`Collapse` : $localize`Expand`}
            >
              <svg
                class={[
                  "h-4 w-4 transition-transform",
                  isExpanded ? "rotate-180" : ""
                ]}
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
              class="rounded-lg border border-red-300 bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:border-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
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
