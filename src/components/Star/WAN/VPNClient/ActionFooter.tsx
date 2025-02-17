import { component$, type QRL } from "@builder.io/qwik";

interface ActionFooterProps {
  isComplete: boolean;
  isValid: boolean;
  onComplete$: QRL<() => void>;
}

export const ActionFooter = component$<ActionFooterProps>(
  ({ isComplete, isValid, onComplete$ }) => {
    return (
      <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
        <span class={`text-sm ${isComplete ? "text-success" : "text-warning"}`}>
          {isComplete
            ? $localize`Configuration Complete`
            : $localize`Configuration Incomplete`}
        </span>
        <button
          onClick$={onComplete$}
          class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium 
          text-white transition-colors hover:bg-primary-600
          disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isValid || isComplete}
        >
          {isComplete ? $localize`Configured` : $localize`Save`}
        </button>
      </div>
    );
  },
);
