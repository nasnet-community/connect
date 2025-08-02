import { component$, type QRL } from "@builder.io/qwik";
import type { WANLinkConfig } from "../../../../../StarContext/WANType";

export interface LinkBoxHeaderProps {
  link: WANLinkConfig;
  onRemove$?: QRL<() => void>;
  canRemove: boolean;
  isExpanded: boolean;
  onToggleExpanded$: QRL<() => void>;
  hasErrors: boolean;
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
    // Format interface display
    const getInterfaceDisplay = () => {
      if (!link.interfaceName) return "";
      return `(${link.interfaceName})`;
    };

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

    return (
      <div class="flex items-center justify-between p-4">
        <div class="flex flex-1 items-center gap-3">
          <button
            onClick$={onToggleExpanded$}
            class="rounded p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              class={`h-5 w-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
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
          </button>

          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-medium text-gray-900 dark:text-gray-100">
                {link.name}
              </h3>
              {hasErrors && (
                <span class="inline-flex items-center rounded bg-error-100 px-2 py-0.5 text-xs font-medium text-error-800 dark:bg-error-900 dark:text-error-200">
                  {$localize`Has Errors`}
                </span>
              )}
            </div>

            <div class="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {link.interfaceType} {getInterfaceDisplay()} •{" "}
              {getConnectionDisplay()}
              {link.weight && ` • ${link.weight}% weight`}
              {link.priority && ` • Priority ${link.priority}`}
            </div>
          </div>
        </div>

        {canRemove && onRemove$ && (
          <button
            onClick$={onRemove$}
            class="ml-2 rounded p-1.5 text-gray-400 transition-colors 
                 hover:bg-gray-100 hover:text-error-500 dark:text-gray-500 dark:hover:bg-gray-700 
                 dark:hover:text-error-400"
            aria-label="Remove link"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
