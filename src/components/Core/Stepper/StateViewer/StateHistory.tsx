import { component$ } from "@builder.io/qwik";
import { StateEntry } from "./StateEntry";
import type { StateHistoryProps } from "./type";

export const StateHistory = component$((props: StateHistoryProps) => {
  const hasSlaveRouters = props.slaveRouters.length > 0;

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

      {hasSlaveRouters && (
        <div class="space-y-3 rounded-lg border border-primary-200 bg-primary-50 p-3 dark:border-primary-800 dark:bg-primary-950">
          <h5 class="text-sm font-medium text-text dark:text-text-dark">
            {$localize`Slave Router Configuration`}
          </h5>
          
          <div class="space-y-2">
            <label class="block text-xs font-medium text-text-secondary dark:text-text-dark-secondary">
              {$localize`Select Slave Router`}
            </label>
            <select
              value={props.selectedSlaveRouter}
              onChange$={(e) => props.onSlaveRouterChange$((e.target as HTMLSelectElement).value)}
              class="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {props.slaveRouters.map((router) => (
                <option key={router.id} value={router.id}>
                  {router.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick$={props.onGenerateSlaveConfig$}
            disabled={!props.selectedSlaveRouter}
            class="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
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
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {$localize`Generate Slave Config`}
          </button>
        </div>
      )}

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
