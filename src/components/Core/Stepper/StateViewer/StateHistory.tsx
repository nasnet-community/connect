import { component$ } from "@builder.io/qwik";
import { StateEntry } from "./StateEntry";
import type { StateHistoryProps } from "./type";

export const StateHistory = component$((props: StateHistoryProps) => {
  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">{$localize`State History`}</h4>
        <div class="flex items-center gap-2">
          <button
            onClick$={props.onDownloadLatest$}
            disabled={props.entries.length === 0}
            class="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
            title={$localize`Download latest state as .txt file`}
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {$localize`Download State`}
          </button>
        </div>
      </div>

      {props.entries.length === 0 ? (
        <div class="text-sm text-text-secondary dark:text-text-dark-secondary">
          {$localize`No state history available`}
        </div>
      ) : (
        <div class="space-y-4">
          {props.entries.map((entry) => (
            <StateEntry
              key={entry.timestamp}
              entry={entry}
              onCopy$={() => props.onCopy$?.(entry.state)}
              onRefresh$={props.onRefresh$}
              onGenerateConfig$={props.onGenerateConfig$}
            />
          ))}
        </div>
      )}
    </div>
  );
});
