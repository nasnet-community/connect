import { component$, type QRL } from "@builder.io/qwik";
import { LuZap, LuBrain } from "@qwikest/icons/lucide";

interface ModeSelectorProps {
  selectedMode: "easy" | "advance";
  onModeChange$: QRL<(mode: "easy" | "advance") => void>;
}

export const ModeSelector = component$((props: ModeSelectorProps) => {
  return (
    <div class="flex justify-center">
      <div class="inline-flex gap-1 rounded-lg bg-surface-secondary/30 p-1 dark:bg-surface-dark-secondary/30">
        <button
          onClick$={() => props.onModeChange$("easy")}
          class={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 
            ${
              props.selectedMode === "easy"
                ? "bg-white text-primary-500 shadow-sm dark:bg-surface-dark"
                : "dark:hover:text-text-dark text-text-secondary hover:text-text dark:text-text-dark-secondary"
            }`}
        >
          <LuZap class="h-4 w-4" />
          <span class="hidden sm:inline">{$localize`Easy`}</span>
        </button>
        <button
          onClick$={() => props.onModeChange$("advance")}
          class={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 
            ${
              props.selectedMode === "advance"
                ? "bg-white text-primary-500 shadow-sm dark:bg-surface-dark"
                : "dark:hover:text-text-dark text-text-secondary hover:text-text dark:text-text-dark-secondary"
            }`}
        >
          <LuBrain class="h-4 w-4" />
          <span class="hidden sm:inline">{$localize`Advance`}</span>
        </button>
      </div>
    </div>
  );
});
