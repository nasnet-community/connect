import { component$, type QRL } from "@builder.io/qwik";

export type ConfigMethod = "file" | "manual";

export interface ConfigMethodToggleProps {
  method: ConfigMethod;
  onMethodChange$: QRL<(method: ConfigMethod) => void>;
  fileText?: string;
  manualText?: string;
  class?: string;
}

export const ConfigMethodToggle = component$<ConfigMethodToggleProps>(
  ({
    method,
    onMethodChange$,
    fileText = $localize`Upload/Paste Config`,
    manualText = $localize`Manual Configuration`,
    class: className,
  }) => {
    return (
      <div class={`w-full ${className || ""}`}>
        <div class="flex justify-center">
          {/* Tab Navigation Bar */}
          <nav
            class="inline-flex rounded-lg border border-border bg-white p-1 shadow-sm dark:border-border-dark dark:bg-surface-dark"
            aria-label="Configuration Method"
          >
            <button
              onClick$={() => onMethodChange$("file")}
              class={`relative flex items-center rounded-md px-4 py-2 text-sm font-medium transition-all
              ${
                method === "file"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "dark:hover:bg-surface-dark-hover text-text-secondary dark:text-text-dark-secondary bg-transparent hover:bg-gray-50"
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-offset-surface-dark
            `}
              type="button"
              aria-current={method === "file" ? "page" : undefined}
            >
              <svg
                class="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              {fileText}
            </button>

            <button
              onClick$={() => onMethodChange$("manual")}
              class={`relative flex items-center rounded-md px-4 py-2 text-sm font-medium transition-all
              ${
                method === "manual"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "dark:hover:bg-surface-dark-hover text-text-secondary dark:text-text-dark-secondary bg-transparent hover:bg-gray-50"
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-offset-surface-dark
            `}
              type="button"
              aria-current={method === "manual" ? "page" : undefined}
            >
              <svg
                class="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {manualText}
            </button>
          </nav>
        </div>
      </div>
    );
  },
);
