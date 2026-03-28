import { component$, type QRL } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface ActionFooterProps {
  isComplete: boolean;
  isValid: boolean;
  onComplete$: QRL<() => void>;
}

export const ActionFooter = component$<ActionFooterProps>(
  ({ isComplete, isValid, onComplete$ }) => {
    const locale = useMessageLocale();

    return (
      <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
        <span class={`text-sm ${isComplete ? "text-success" : "text-warning"}`}>
          {isComplete
            ? semanticMessages.wan_easy_config_complete({}, { locale })
            : semanticMessages.wan_easy_config_incomplete({}, { locale })}
        </span>
        <button
          onClick$={onComplete$}
          class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium 
          text-white transition-colors hover:bg-primary-600
          disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isValid || isComplete}
        >
          {isComplete
            ? semanticMessages.shared_configured({}, { locale })
            : semanticMessages.shared_save({}, { locale })}
        </button>
      </div>
    );
  },
);
