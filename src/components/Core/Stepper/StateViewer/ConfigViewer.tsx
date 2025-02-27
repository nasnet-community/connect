import { component$ } from "@builder.io/qwik";
import type { ConfigViewerProps } from "./type";


export const ConfigViewer = component$((props: ConfigViewerProps) => {
  return (
    <div class="max-h-[calc(100vh-200px)] space-y-4 overflow-auto">
      {props.currentConfig && (
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium">{$localize`Current Context Config`}</h4>
            <button
              onClick$={() =>
                navigator.clipboard.writeText(props.currentConfig)
              }
              class="flex items-center gap-2 rounded-lg bg-primary-500 px-3 py-1.5 text-sm text-white hover:bg-primary-600"
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
              {$localize`Copy Config`}
            </button>
          </div>
          <div class="rounded-lg bg-surface-secondary/50 p-4 dark:bg-surface-dark-secondary/50">
            <pre class="max-h-[35vh] overflow-auto font-mono text-xs">
              <code>{props.currentConfig}</code>
            </pre>
          </div>
        </div>
      )}

      {props.pastedConfig && (
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium">{$localize`Pasted Context Config`}</h4>
            <button
              onClick$={() => navigator.clipboard.writeText(props.pastedConfig)}
              class="flex items-center gap-2 rounded-lg bg-primary-500 px-3 py-1.5 text-sm text-white hover:bg-primary-600"
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
              {$localize`Copy Config`}
            </button>
          </div>
          <div class="rounded-lg bg-surface-secondary/50 p-4 dark:bg-surface-dark-secondary/50">
            <pre class="max-h-[35vh] overflow-auto font-mono text-xs">
              <code>{props.pastedConfig}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
});
