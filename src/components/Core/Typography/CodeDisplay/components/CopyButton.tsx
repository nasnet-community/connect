import { component$, type QRL } from "@builder.io/qwik";
import { type CodeTheme } from "../CodeDisplay.types";
import { CopyIcon } from "../icons/CopyIcon";
import { CheckIcon } from "../icons/CheckIcon";

export interface CopyButtonProps {
  copySuccess: boolean;
  theme: CodeTheme;
  copyToClipboard$: QRL<() => void>;
}

export const CopyButton = component$<CopyButtonProps>(({
  copySuccess,
  theme,
  copyToClipboard$
}) => {
  const buttonClass = [
    "copy-button absolute top-2 right-2 p-2 rounded",
    theme === "system" 
      ? "bg-white/80 dark:bg-gray-700/80 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-700 dark:text-gray-300" 
      : theme === "light" 
        ? "bg-white/80 hover:bg-white/90 text-gray-700" 
        : "bg-gray-700/80 hover:bg-gray-700/90 text-gray-300",
    copySuccess ? "copy-success" : "",
  ].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      onClick$={copyToClipboard$}
      class={buttonClass}
      aria-label="Copy code"
    >
      {copySuccess ? (
        <CheckIcon />
      ) : (
        <CopyIcon />
      )}
    </button>
  );
}); 