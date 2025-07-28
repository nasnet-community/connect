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
        ? "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700"
        : theme === "light"
          ? "bg-gray-50 text-gray-600 border-t border-gray-200"
          : "bg-gray-800 text-gray-400 border-t border-gray-700",
    ].join(" ");

    return <div class={captionClass}>{caption}</div>;
  },
);
