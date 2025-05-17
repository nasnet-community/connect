import { useComputed$ } from "@builder.io/qwik";
import { type InlineCodeProps } from "../CodeDisplay.types";

export function useInlineCode({ 
  noWrap = false,
  class: className = ""
}: Pick<InlineCodeProps, "noWrap" | "class">) {
  
  const classes = useComputed$(() => [
    // Base styles
    "font-mono text-sm px-1.5 py-0.5 rounded",
    "bg-gray-100 dark:bg-gray-800",
    "text-pink-600 dark:text-pink-400",
    "border border-gray-200 dark:border-gray-700",
    
    // Wrapping behavior
    noWrap ? "whitespace-nowrap" : "break-words",
    
    // Custom classes
    className,
  ].filter(Boolean).join(" "));

  return {
    classes
  };
} 