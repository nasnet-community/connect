import { useComputed$ } from "@builder.io/qwik";
import { type InlineCodeProps } from "../CodeDisplay.types";

export function useInlineCode({
  noWrap = false,
  theme = "auto",
  size = "sm",
  highContrast = false,
  touchOptimized = false,
  direction = "auto",
  printOptimized = false,
  class: className = "",
}: Pick<InlineCodeProps, "noWrap" | "theme" | "size" | "highContrast" | "touchOptimized" | "direction" | "printOptimized" | "class">) {
  
  const classes = useComputed$(() => {
    // Size mapping for enhanced Tailwind configuration
    const sizeMap = {
      xs: "text-xs px-1 py-0.5",
      sm: "text-sm px-1.5 py-0.5", 
      base: "text-base px-2 py-1",
      lg: "text-lg px-2.5 py-1",
      xl: "text-xl px-3 py-1.5",
    };

    // Enhanced color system using design system colors
    const getThemeClasses = (): string => {
      const baseClasses = [
        "bg-surface-light-secondary dark:bg-surface-dark-secondary",
        "border border-gray-200 dark:border-gray-700"
      ];

      if (theme === "light") {
        return [
          "bg-surface-light-secondary",
          "text-primary-600",
          "border border-gray-200"
        ].join(" ");
      }
      
      if (theme === "dark") {
        return [
          "bg-surface-dark-secondary", 
          "text-primary-400",
          "border border-gray-700"
        ].join(" ");
      }
      
      if (theme === "dim") {
        return [
          "bg-surface-dim-secondary",
          "text-primary-300", 
          "border border-gray-600"
        ].join(" ");
      }

      // Auto/system theme
      return [
        ...baseClasses,
        "text-primary-600 dark:text-primary-400"
      ].join(" ");
    };

    return [
      // Base styles
      "font-mono rounded inline-block",
      
      // Size classes
      sizeMap[size],

      // Enhanced theme classes
      getThemeClasses(),

      // High contrast support
      highContrast && "high-contrast:bg-white high-contrast:text-black high-contrast:border-black",

      // Direction support
      direction === "ltr" && "ltr:text-left",
      direction === "rtl" && "rtl:text-right",

      // Touch optimization
      touchOptimized && [
        "touch:px-2 touch:py-1",
        "touch:text-base",
        "touch:min-h-[32px] touch:inline-flex touch:items-center"
      ].join(" "),

      // Print optimization
      printOptimized && "print:bg-white print:text-black print:border print:border-black",

      // Wrapping behavior
      noWrap ? "whitespace-nowrap" : "break-words",

      // Focus styles for accessibility
      "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",

      // Custom classes
      className,
    ]
      .filter(Boolean)
      .join(" ");
  });

  return {
    classes,
  };
}
