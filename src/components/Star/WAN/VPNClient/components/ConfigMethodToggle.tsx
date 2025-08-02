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
        class={`inline-flex overflow-hidden rounded-lg border border-border dark:border-border-dark ${className}`}
      >
        <button
          onClick$={() => onMethodChange$("file")}
          class={`px-4 py-2 text-sm transition-colors focus:outline-none ${
            method === "file"
              ? "bg-primary-500 font-medium text-white"
              : "text-text-default bg-white hover:bg-gray-50 dark:bg-surface-dark dark:text-text-dark-default dark:hover:bg-gray-800"
          }`}
        >
          {$localize`Configuration File`}
        </button>
        <button
          onClick$={() => onMethodChange$("manual")}
          class={`px-4 py-2 text-sm transition-colors focus:outline-none ${
            method === "manual"
              ? "bg-primary-500 font-medium text-white"
              : "text-text-default bg-white hover:bg-gray-50 dark:bg-surface-dark dark:text-text-dark-default dark:hover:bg-gray-800"
          }`}
        >
          {$localize`Manual Setup`}
        </button>
      </div>
    );
  },
);
