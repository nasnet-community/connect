import { component$, type QRL } from "@builder.io/qwik";
import { type CodeTheme } from "../CodeDisplay.types";
import { CopyIcon } from "../icons/CopyIcon";
import { CheckIcon } from "../icons/CheckIcon";

export interface CopyButtonProps {
  copySuccess: boolean;
  theme: CodeTheme;
  code: string;
  copyToClipboard$: QRL<(codeText: string) => void>;
}

export const CopyButton = component$<CopyButtonProps>(
  ({ copySuccess, theme, code, copyToClipboard$ }) => {
    const buttonClass = [
      "copy-button absolute top-2 right-2 p-2 rounded-lg transition-all duration-200",
      theme === "system"
        ? "bg-white/80 dark:bg-slate-700/60 dark:backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-700/80 text-gray-700 dark:text-slate-200 dark:border dark:border-slate-600/30 dark:hover:border-yellow-500/30 dark:hover:shadow-lg dark:hover:shadow-yellow-500/10"
        : theme === "light"
          ? "bg-white/80 hover:bg-white/90 text-gray-700"
          : theme === "dark"
            ? "bg-slate-700/60 backdrop-blur-sm hover:bg-slate-700/80 text-slate-200 border border-slate-600/30 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10"
            : "bg-gray-700/80 hover:bg-gray-700/90 text-gray-300",
      copySuccess ? "copy-success !text-emerald-400 !border-emerald-500/30" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type="button"
        onClick$={() => copyToClipboard$(code)}
        class={buttonClass}
        aria-label="Copy code"
      >
        {copySuccess ? <CheckIcon /> : <CopyIcon />}
      </button>
    );
  },
);
