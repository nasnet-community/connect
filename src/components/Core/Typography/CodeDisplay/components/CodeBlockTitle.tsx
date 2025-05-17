import { component$ } from "@builder.io/qwik";
import { type CodeTheme } from "../CodeDisplay.types";

export interface CodeBlockTitleProps {
  title: string;
  theme: CodeTheme;
}

export const CodeBlockTitle = component$<CodeBlockTitleProps>(({
  title,
  theme
}) => {
  const titleClass = [
    "px-4 py-2 text-sm font-medium",
    theme === "system" 
      ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700" 
      : theme === "light" 
        ? "bg-gray-100 text-gray-700 border-b border-gray-200" 
        : "bg-gray-800 text-gray-300 border-b border-gray-700",
  ].join(" ");

  return (
    <div class={titleClass}>
      {title}
    </div>
  );
}); 