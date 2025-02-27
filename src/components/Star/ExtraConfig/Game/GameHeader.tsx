import { component$ } from "@builder.io/qwik";

export const GameHeader = component$(() => {
  return (
    <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
      <div class="flex items-center space-x-5">
        <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
          <svg
            class="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
        </div>
        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-white">{$localize`Game Configuration`}</h2>
          <p class="text-sm font-medium text-primary-50">{$localize`Manage game routing and port configuration`}</p>
          <div class="mt-2 flex items-center space-x-2">
            <svg
              class="h-5 w-5 text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span class="text-xs text-primary-50">
              {$localize`Port configurations sourced from portforward.com are provided without verification.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
