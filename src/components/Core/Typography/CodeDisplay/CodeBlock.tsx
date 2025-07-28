import { component$, useStyles$ } from "@builder.io/qwik";
import { type CodeBlockProps } from "./CodeDisplay.types";
import { useCodeBlock } from "./hooks/useCodeBlock";
import { highlightStyles } from "./styles/codeBlockStyles";
import { CodeBlockTitle } from "./components/CodeBlockTitle";
import { CodeBlockCaption } from "./components/CodeBlockCaption";
import { CopyButton } from "./components/CopyButton";

export const CodeBlock = component$<CodeBlockProps>(
  ({
    code,
    language = "javascript",
    showLineNumbers = false,
    wrap = true,
    theme = "auto",
    title,
    copyButton = true,
    highlight = true,
    highlightLines,
    maxHeight,
    caption,
    size = "base",
    highContrast = false,
    reduceMotion = true,
    touchOptimized = false,
    direction = "auto",
    containerResponsive = false,
    printOptimized = false,
    borderRadius = "md",
    mobileScrolling = true,
    class: className = "",
    id,
  }) => {
    // Apply syntax highlighting styles
    useStyles$(highlightStyles);

    // Use the hook to handle code highlighting and copy logic
    const { copySuccess, highlightedCode, themeSignal, copyToClipboard$ } =
      useCodeBlock({
        code,
        language,
        showLineNumbers,
        highlight,
        highlightLines,
        theme,
      });

    // Enhanced size mapping for code blocks
    const sizeMap = {
      xs: "text-xs p-2",
      sm: "text-sm p-3",
      base: "text-sm p-4",
      lg: "text-base p-5",
      xl: "text-lg p-6",
    };

    // Enhanced border radius mapping
    const borderRadiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };

    // Enhanced theme classes
    const getThemeClasses = (): { container: string; pre: string } => {
      const baseContainer = [
        "code-block-container relative border overflow-hidden",
        borderRadiusMap[borderRadius]
      ].join(" ");

      const basePre = [
        "m-0 font-mono",
        sizeMap[size]
      ].join(" ");

      if (theme === "light") {
        return {
          container: [
            baseContainer,
            "bg-surface-light-DEFAULT border-gray-200"
          ].join(" "),
          pre: [
            basePre,
            "bg-surface-light-secondary text-gray-900"
          ].join(" ")
        };
      }
      
      if (theme === "dark") {
        return {
          container: [
            baseContainer,
            "bg-surface-dark-DEFAULT border-gray-700"
          ].join(" "),
          pre: [
            basePre,
            "bg-surface-dark-secondary text-gray-100"
          ].join(" ")
        };
      }
      
      if (theme === "dim") {
        return {
          container: [
            baseContainer,
            "bg-surface-dim-DEFAULT border-gray-600"
          ].join(" "),
          pre: [
            basePre,
            "bg-surface-dim-secondary text-gray-200"
          ].join(" ")
        };
      }

      // Auto/system theme
      return {
        container: [
          baseContainer,
          "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
          "border-gray-200 dark:border-gray-700"
        ].join(" "),
        pre: [
          basePre,
          "bg-surface-light-secondary dark:bg-surface-dark-secondary",
          "text-gray-900 dark:text-gray-100"
        ].join(" ")
      };
    };

    const themeClasses = getThemeClasses();

    // Build enhanced CSS classes
    const containerClasses = [
      themeClasses.container,
      
      // Container responsive styles
      containerResponsive && "@container",
      
      // High contrast support
      highContrast && "high-contrast:bg-white high-contrast:border-black",
      
      // Direction support
      direction === "ltr" && "ltr:text-left",
      direction === "rtl" && "rtl:text-right",
      
      // Touch optimization
      touchOptimized && "touch:rounded-lg",
      
      // Print optimization
      printOptimized && "print:bg-white print:border print:border-black",
      
      // Mobile scrolling optimization
      mobileScrolling && "mobile:overflow-x-auto",
      
      // Motion preferences
      reduceMotion ? "motion-reduce:transition-none" : "transition-all duration-150",
      
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const preClasses = [
      themeClasses.pre,
      
      // Syntax highlighting
      "hljs-" + (theme === "auto" || theme === "system" ? "light dark:hljs-dark" : themeSignal.value),
      
      // Line numbers
      showLineNumbers ? "hljs-line-numbers" : "",
      
      // Text wrapping with enhanced mobile support
      !wrap 
        ? [
            "whitespace-pre overflow-x-auto",
            mobileScrolling && "mobile:overflow-x-scroll mobile:scrollbar-thin"
          ].filter(Boolean).join(" ")
        : "whitespace-pre-wrap",
      
      // High contrast support
      highContrast && "high-contrast:text-black high-contrast:bg-white",
      
      // Touch optimization
      touchOptimized && [
        "touch:text-base touch:p-5",
        "touch:leading-relaxed"
      ].join(" "),
      
      // Print optimization
      printOptimized && "print:text-black print:bg-white",
      
      // Focus styles for accessibility
      "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div class={containerClasses} id={id}>
        {/* Optional title/filename */}
        {title && <CodeBlockTitle title={title} theme={theme} />}

        {/* Code content */}
        <div class="relative">
          <pre
            class={preClasses}
            style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
            dangerouslySetInnerHTML={highlightedCode.value}
          ></pre>

          {/* Copy button */}
          {copyButton && (
            <CopyButton
              copySuccess={copySuccess.value}
              theme={theme}
              code={code}
              copyToClipboard$={copyToClipboard$}
            />
          )}
        </div>

        {/* Optional caption */}
        {caption && <CodeBlockCaption caption={caption} theme={theme} />}
      </div>
    );
  },
);
