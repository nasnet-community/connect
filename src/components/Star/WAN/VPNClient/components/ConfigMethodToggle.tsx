import { component$, type QRL } from "@builder.io/qwik";

export interface ConfigMethodToggleProps {
  method: "file" | "manual";
  onMethodChange$: QRL<(method: "file" | "manual") => void>;
  class?: string;
}

export const ConfigMethodToggle = component$<ConfigMethodToggleProps>(({ 
  method, 
  onMethodChange$,
  class: className = ""
}) => {
  return (
    <div class={`inline-flex rounded-lg overflow-hidden border border-border dark:border-border-dark ${className}`}>
      <button
        onClick$={() => onMethodChange$("file")}
        class={`px-4 py-2 text-sm focus:outline-none transition-colors ${
          method === "file"
            ? "bg-primary-500 text-white font-medium"
            : "bg-white dark:bg-surface-dark text-text-default dark:text-text-dark-default hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {$localize`Configuration File`}
      </button>
      <button
        onClick$={() => onMethodChange$("manual")}
        class={`px-4 py-2 text-sm focus:outline-none transition-colors ${
          method === "manual"
            ? "bg-primary-500 text-white font-medium"
            : "bg-white dark:bg-surface-dark text-text-default dark:text-text-dark-default hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {$localize`Manual Setup`}
      </button>
    </div>
  );
}); 