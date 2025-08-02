import { component$, type QRL } from "@builder.io/qwik";

export interface ConfigMethodToggleProps {
  method: "file" | "manual";
  onMethodChange$: QRL<(method: "file" | "manual") => void>;
  class?: string;
}

export const ConfigMethodToggle = component$<ConfigMethodToggleProps>(
  ({ method, onMethodChange$, class: className = "" }) => {
    return (
      <div
        class={`flex rounded-lg border border-border dark:border-border-dark ${className}`}
      >
        <button
          onClick$={() => onMethodChange$("file")}
          class={`flex-1 rounded-l-lg px-4 py-2 text-center text-sm font-medium transition-colors
              ${
                method === "file"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                  : "text-text-default hover:bg-surface-lighter dark:hover:bg-surface-dark-lighter bg-white dark:bg-surface-dark dark:text-text-dark-default"
              }`}
        >
          {$localize`Upload File`}
        </button>
        <button
          onClick$={() => onMethodChange$("manual")}
          class={`flex-1 rounded-r-lg px-4 py-2 text-center text-sm font-medium transition-colors
              ${
                method === "manual"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                  : "text-text-default hover:bg-surface-lighter dark:hover:bg-surface-dark-lighter bg-white dark:bg-surface-dark dark:text-text-dark-default"
              }`}
        >
          {$localize`Manual Setup`}
        </button>
      </div>
    );
  },
);
