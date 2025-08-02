import { component$, type Signal } from "@builder.io/qwik";

export const GameSearch = component$<{ searchQuery: Signal<string> }>(
  ({ searchQuery }) => {
    return (
      <div class="relative">
        <input
          type="text"
          placeholder="Search games..."
          bind:value={searchQuery}
          class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 pl-10 focus:border-primary-500
               focus:ring-2 focus:ring-primary-500/50 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
        />
        <svg
          class="text-text-secondary dark:text-text-dark-secondary absolute left-3 top-3 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  },
);
