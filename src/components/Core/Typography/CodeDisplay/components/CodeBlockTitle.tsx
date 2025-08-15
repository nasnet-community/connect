import { component$ } from "@builder.io/qwik";
import { type CodeTheme } from "../CodeDisplay.types";

export interface CodeBlockTitleProps {
  title: string;
  theme: CodeTheme;
}

export const CodeBlockTitle = component$<CodeBlockTitleProps>(
  ({ title, theme }) => {
    const titleClass = [
      "px-4 py-2 text-sm font-medium",
      theme === "system"
        ? "bg-gray-100 text-gray-700 dark:bg-slate-800/70 dark:text-slate-200 border-b border-gray-200 dark:border-slate-700/50 dark:backdrop-blur-sm"
        : theme === "light"
          ? "bg-gray-100 text-gray-700 border-b border-gray-200"
          : theme === "dark"
            ? "bg-slate-800/70 text-slate-200 border-b border-slate-700/50 backdrop-blur-sm"
            : "bg-gray-800 text-gray-300 border-b border-gray-700",
    ].join(" ");

    return <div class={titleClass}>{title}</div>;
  },
);
