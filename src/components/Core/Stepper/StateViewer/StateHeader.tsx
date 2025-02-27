import { component$ } from "@builder.io/qwik";
import type { StateHeaderProps } from "./type";

export const StateHeader = component$((props: StateHeaderProps) => {
  return (
    <div class="relative flex items-center border-b border-border/20 p-6 dark:border-border-dark/20">
      <h3 class="absolute left-1/2 -translate-x-1/2 text-lg font-medium">{$localize`State History`}</h3>

      <button
        onClick$={props.onClose$}
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
});
