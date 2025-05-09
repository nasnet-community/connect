import { component$, type QRL } from "@builder.io/qwik";

export type ConfigMethod = "file" | "manual";

export interface ConfigMethodToggleProps {

  method: ConfigMethod;

  onMethodChange$: QRL<(method: ConfigMethod) => void>;
  
  fileText?: string;
  
  manualText?: string;

  class?: string;
}


export const ConfigMethodToggle = component$<ConfigMethodToggleProps>(({
  method,
  onMethodChange$,
  fileText = $localize`Upload/Paste Config`,
  manualText = $localize`Manual Configuration`,
  class: className,
}) => {
  return (
    <div class={`flex items-center space-x-4 ${className || ""}`}>
      <button
        onClick$={() => onMethodChange$("file")}
        class={{
          "px-4 py-2 rounded-lg font-medium transition-colors": true,
          "bg-primary-600 text-white": method === "file",
          "bg-surface-dark border border-border text-text-secondary hover:bg-border/20": method !== "file"
        }}
        type="button"
      >
        {fileText}
      </button>
      <button
        onClick$={() => onMethodChange$("manual")}
        class={{
          "px-4 py-2 rounded-lg font-medium transition-colors": true,
          "bg-primary-600 text-white": method === "manual",
          "bg-surface-dark border border-border text-text-secondary hover:bg-border/20": method !== "manual"
        }}
        type="button"
      >
        {manualText}
      </button>
    </div>
  );
}); 
