import { component$ } from "@builder.io/qwik";

export const Header = component$<{ mode: "Foreign" | "Domestic" }>(
  ({ mode }) => {
    return (
      <div class="flex items-center space-x-4">
        <div class="rounded-full bg-primary-100 p-3 dark:bg-primary-900">
          <svg
            class="h-6 w-6 text-primary-600 dark:text-primary-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d={
                mode === "Foreign"
                  ? "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  : "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              }
            />
          </svg>
        </div>
        <div>
          <h2 class="text-text-default text-xl font-semibold dark:text-text-dark-default">
            {mode === "Foreign"
              ? $localize`Foreign Network Connection`
              : $localize`Domestic Network Connection`}
          </h2>
          <p class="text-text-muted dark:text-text-dark-muted">
            {mode === "Foreign"
              ? $localize`Configure your foreign network connection (WAN)`
              : $localize`Configure your domestic network connection`}
          </p>
        </div>
      </div>
    );
  },
);
