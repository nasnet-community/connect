import { component$ } from "@builder.io/qwik";
import type { FooterProps } from "./types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const Footer = component$<FooterProps>(
  ({ isComplete, isValid, onComplete }) => {
    const locale = useMessageLocale();
    return (
      <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
        <span
          class={`text-sm ${isComplete ? "text-success" : isValid ? "text-primary-500" : "text-warning"}`}
        >
          {isComplete
            ? semanticMessages.wan_easy_config_complete({}, { locale })
            : isValid
              ? semanticMessages.wan_easy_ready_to_complete({}, { locale })
              : semanticMessages.wan_easy_config_incomplete({}, { locale })}
        </span>
        <button
          onClick$={onComplete}
          class="rounded-lg bg-primary-500 px-4 py-2 text-sm
          font-medium text-white 
          transition-colors hover:bg-primary-600
          disabled:cursor-not-allowed disabled:bg-gray-300
          dark:disabled:bg-gray-600"
          disabled={!isValid || isComplete}
        >
          {isComplete
            ? semanticMessages.shared_configured({}, { locale })
            : semanticMessages.wan_easy_complete_setup({}, { locale })}
        </button>
      </div>
    );
  },
);
