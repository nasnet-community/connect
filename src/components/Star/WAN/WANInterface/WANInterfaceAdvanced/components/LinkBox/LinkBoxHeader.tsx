import { component$, type QRL } from "@builder.io/qwik";
import type { WANLinkConfig } from "../../types";

export interface LinkBoxHeaderProps {
  link: WANLinkConfig;
  onRemove$?: QRL<() => void>;
  canRemove: boolean;
  isExpanded: boolean;
  onToggleExpanded$: QRL<() => void>;
  hasErrors: boolean;
  isCompact?: boolean;
}

export const LinkBoxHeader = component$<LinkBoxHeaderProps>(
  ({
    link,
    onRemove$,
    canRemove,
    isExpanded,
    onToggleExpanded$,
    hasErrors,
  }) => {

    // Get connection type display
    const getConnectionDisplay = () => {
      switch (link.connectionType) {
        case "DHCP":
          return "DHCP Client";
        case "PPPoE":
          return "PPPoE";
        case "Static":
          return "Static IP";
        case "LTE":
          return "LTE";
        default:
          return "";
      }
    };

    // Get interface icon based on type
    const getInterfaceIcon = () => {
      switch (link.interfaceType) {
        case "Ethernet":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          );
        case "Wireless":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          );
        case "LTE":
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          );
        default:
          return (
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          );
      }
    };

    // Get connection type color
    const getConnectionColor = () => {
      switch (link.connectionType) {
        case "DHCP":
          return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
        case "PPPoE":
          return "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300";
        case "Static":
          return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300";
        case "LTE":
          return "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300";
        default:
          return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300";
      }
    };

    return (
      <div class="flex items-center justify-between p-5">
        <div class="flex flex-1 items-center gap-4">
          {/* Animated expand/collapse button */}
          <button
            onClick$={onToggleExpanded$}
            class="group relative overflow-hidden rounded-xl p-2 transition-all hover:scale-110 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              class={`h-5 w-5 transition-all duration-300 ${isExpanded ? "rotate-90 text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-400"}`}
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
            <div class="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </button>

          {/* Interface type icon with background */}
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-xl blur-xl"></div>
            <div class="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400">
              {getInterfaceIcon()}
            </div>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {link.name}
              </h3>
              
              {/* Connection type badge */}
              {link.connectionType && (
                <span class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getConnectionColor()}`}>
                  {getConnectionDisplay()}
                </span>
              )}
              
              {/* Error badge with animation */}
              {hasErrors && (
                <span class="inline-flex items-center gap-1 rounded-full bg-error-100 dark:bg-error-900/50 px-2.5 py-0.5 text-xs font-medium text-error-700 dark:text-error-300 animate-pulse">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {$localize`Has Errors`}
                </span>
              )}
            </div>

            {/* Metadata pills */}
            <div class="mt-2 flex flex-wrap items-center gap-2">
              {link.interfaceName && (
                <span class="inline-flex items-center gap-1 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  {link.interfaceName}
                </span>
              )}
              
              {link.weight && (
                <span class="inline-flex items-center gap-1 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  {link.weight}% weight
                </span>
              )}
              
              {link.priority && (
                <span class="inline-flex items-center gap-1 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Priority {link.priority}
                </span>
              )}
            </div>
          </div>
        </div>

        {canRemove && onRemove$ && (
          <button
            onClick$={onRemove$}
            class="group ml-4 relative overflow-hidden rounded-xl p-2 text-gray-400 transition-all 
                 hover:scale-110 hover:bg-error-50 hover:text-error-500 
                 dark:text-gray-500 dark:hover:bg-error-900/20 dark:hover:text-error-400"
            aria-label="Remove link"
          >
            <svg
              class="h-5 w-5 transition-transform group-hover:rotate-90"
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
            <div class="absolute inset-0 bg-error-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </button>
        )}
      </div>
    );
  },
);
