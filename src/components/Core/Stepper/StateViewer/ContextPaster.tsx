import { component$ } from "@builder.io/qwik";
import type { ContextPasterProps } from "./type";

export const ContextPaster = component$((props: ContextPasterProps) => {
  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">{$localize`Paste Context`}</h4>
        <div class="flex items-center gap-2">
          <button
            onClick$={props.onGenerate}
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
            onClick$={() =>
              navigator.clipboard.readText().then((text) => props.onPaste(text))
            }
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {$localize`Paste`}
          </button>
        </div>
      </div>
      <div class="space-y-2">
        <textarea
          value={props.value}
          onChange$={(_, el) => props.onPaste(el.value)}
          class="h-96 w-full resize-none rounded-lg bg-surface-secondary/50 p-4 font-mono text-sm dark:bg-surface-dark-secondary/50"
          placeholder={$localize`Paste your context here...`}
        />
        {props.error && <p class="text-sm text-red-500">{props.error}</p>}
      </div>
    </div>
  );
});
