import { component$, type QRL } from "@builder.io/qwik";
import { LuZap, LuBrain } from "@qwikest/icons/lucide";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface ModeSelectorProps {
  selectedMode: "easy" | "advance";
  onModeChange$: QRL<(mode: "easy" | "advance") => void>;
}

export const ModeSelector = component$((props: ModeSelectorProps) => {
  const locale = useMessageLocale();

  return (
    <div class="flex justify-center">
      <div class="bg-surface-secondary/30 dark:bg-surface-dark-secondary/30 inline-flex gap-1 rounded-lg p-1">
        <button
          onClick$={() => props.onModeChange$("easy")}
          class={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 
            ${
              props.selectedMode === "easy"
                ? "bg-white text-primary-500 shadow-sm dark:bg-surface-dark"
                : "dark:hover:text-text-dark text-text-secondary dark:text-text-dark-secondary hover:text-text"
            }`}
        >
          <LuZap class="h-4 w-4" />
          <span class="hidden sm:inline">
            {semanticMessages.shared_easy({}, { locale })}
          </span>
        </button>
        <button
          onClick$={() => props.onModeChange$("advance")}
          class={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 
            ${
              props.selectedMode === "advance"
                ? "bg-white text-primary-500 shadow-sm dark:bg-surface-dark"
                : "dark:hover:text-text-dark text-text-secondary dark:text-text-dark-secondary hover:text-text"
            }`}
        >
          <LuBrain class="h-4 w-4" />
          <span class="hidden sm:inline">
            {semanticMessages.shared_advanced({}, { locale })}
          </span>
        </button>
      </div>
    </div>
  );
});
