import { component$, type QRL } from "@builder.io/qwik";

export interface ModeToggleProps {
  mode: "easy" | "advanced";
  onToggle$: QRL<() => void>;
}

export const ModeToggle = component$<ModeToggleProps>(({ mode, onToggle$ }) => {
  return (
    <div class="flex items-center justify-center">
      <div class="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <button
          onClick$={onToggle$}
          class={`
            rounded-md px-4 py-2 text-sm font-medium transition-all
            ${
              mode === "easy"
                ? "bg-white text-primary-600 shadow-sm dark:bg-gray-700 dark:text-primary-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }
          `}
          disabled={mode === "easy"}
        >
          {$localize`Easy Mode`}
        </button>
        <button
          onClick$={onToggle$}
          class={`
            rounded-md px-4 py-2 text-sm font-medium transition-all
            ${
              mode === "advanced"
                ? "bg-white text-primary-600 shadow-sm dark:bg-gray-700 dark:text-primary-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }
          `}
          disabled={mode === "advanced"}
        >
          {$localize`Advanced Mode`}
        </button>
      </div>
    </div>
  );
});
