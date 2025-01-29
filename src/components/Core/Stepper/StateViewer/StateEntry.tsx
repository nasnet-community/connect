import { component$, type QRL } from "@builder.io/qwik";

export const StateEntry = component$(
  ({
    entry,
    onCopy$,
  }: {
    entry: { timestamp: string; state: any };
    onCopy$: QRL<() => void>;
  }) => {
    return (
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-text-secondary dark:text-text-dark-secondary">
            {new Date(entry.timestamp).toLocaleString()}
          </span>
          <button
            onClick$={onCopy$}
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
            {$localize`Copy State`}
          </button>
        </div>
        <pre class="max-h-[500px] overflow-auto rounded-lg bg-surface-secondary/50 p-4 font-mono text-sm dark:bg-surface-dark-secondary/50">
          <code>{JSON.stringify(entry.state, null, 2)}</code>
        </pre>
      </div>
    );
  },
);
