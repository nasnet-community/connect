import { component$ } from "@builder.io/qwik";
import type { FooterProps } from "./types";

export const Footer = component$<FooterProps>(
  ({ isComplete, isValid, onComplete }) => {
    return (
      <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
        <span
          class={`text-sm ${isComplete ? "text-success" : isValid ? "text-primary-500" : "text-warning"}`}
        >
          {isComplete
            ? $localize`Configuration Complete`
            : isValid
              ? $localize`Ready to Complete`
              : $localize`Configuration Incomplete`}
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
          {isComplete ? $localize`Configured` : $localize`Complete Setup`}
        </button>
      </div>
    );
  },
);
