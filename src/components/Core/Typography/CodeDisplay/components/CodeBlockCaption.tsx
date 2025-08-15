import { component$ } from "@builder.io/qwik";
import { type CodeTheme } from "../CodeDisplay.types";

export interface CodeBlockCaptionProps {
  caption: string;
  theme: CodeTheme;
}

export const CodeBlockCaption = component$<CodeBlockCaptionProps>(
  ({ caption, theme }) => {
    const captionClass = [
      "px-4 py-2 text-sm italic",
      theme === "system"
        ? "bg-gray-50 text-gray-600 dark:bg-slate-800/50 dark:text-slate-400 border-t border-gray-200 dark:border-slate-700/50 dark:backdrop-blur-sm"
        : theme === "light"
          ? "bg-gray-50 text-gray-600 border-t border-gray-200"
          : theme === "dark"
            ? "bg-slate-800/50 text-slate-400 border-t border-slate-700/50 backdrop-blur-sm"
            : "bg-gray-800 text-gray-400 border-t border-gray-700",
    ].join(" ");

    return <div class={captionClass}>{caption}</div>;
  },
);
