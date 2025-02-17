import { component$, type QRL } from "@builder.io/qwik";

export const StateHeader = component$(
  ({
    onClose$,
    onClearHistory$,
    onCopyAll$,
    onRefresh$,
    onGenerateConfig$,
  }: {
    onClose$: QRL<() => void>;
    onClearHistory$: QRL<() => void>;
    onCopyAll$: QRL<() => void>;
    onRefresh$: QRL<() => void>;
    onGenerateConfig$: QRL<() => void>;
  }) => {
    return (
      <div class="relative flex items-center border-b border-border/20 p-6 dark:border-border-dark/20">
        <div class="flex items-center gap-3">
          <button
            onClick$={onRefresh$}
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

          <div class="flex items-center gap-1">
            <button
              onClick$={onGenerateConfig$}
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
              onClick$={onCopyAll$}
              class="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
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
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              {$localize`Copy All`}
            </button>

            <button
              onClick$={onClearHistory$}
              class="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {$localize`Clear`}
            </button>
          </div>
        </div>

        <h3 class="absolute left-1/2 -translate-x-1/2 text-lg font-medium">{$localize`State History`}</h3>

        <button
          onClick$={onClose$}
          class="absolute right-4 top-4 rounded-lg p-2 hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  },
);
