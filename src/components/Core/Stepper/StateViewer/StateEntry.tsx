import { component$ } from "@builder.io/qwik";
import type { StateEntryProps } from "./type";
import { JsonViewer } from "./JsonViewer";

export const StateEntry = component$((props: StateEntryProps) => {
  return (
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm text-text-secondary dark:text-text-dark-secondary">
          {new Date(props.entry.timestamp).toLocaleString()}
        </span>
        <div class="flex items-center gap-2">
          <button
            onClick$={props.onRefresh$}
            class="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-1.5 text-sm text-white hover:bg-green-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {$localize`Refresh`}
          </button>

          <button
            onClick$={props.onGenerateConfig$}
            class="flex items-center gap-2 rounded-lg bg-primary-500 px-3 py-1.5 text-sm text-white hover:bg-primary-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            {$localize`Generate`}
          </button>

          <button
            onClick$={props.onCopy$}
            class="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {$localize`Copy State`}
          </button>
        </div>
      </div>
      <JsonViewer
        data={props.entry.state}
        maxHeight="600px"
        class="mt-3"
      />
    </div>
  );
});
