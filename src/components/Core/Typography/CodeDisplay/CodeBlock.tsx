import { component$, useStyles$ } from "@builder.io/qwik";
import { type CodeBlockProps } from "./CodeDisplay.types";
import { useCodeBlock } from "./hooks/useCodeBlock";
import { highlightStyles } from "./styles/codeBlockStyles";
import { CodeBlockTitle } from "./components/CodeBlockTitle";
import { CodeBlockCaption } from "./components/CodeBlockCaption";
import { CopyButton } from "./components/CopyButton";


export const CodeBlock = component$<CodeBlockProps>(({
  code,
  language = "javascript",
  showLineNumbers = false,
  wrap = true,
  theme = "system",
  title,
  copyButton = true,
  highlight = true,
  highlightLines,
  maxHeight,
  caption,
  class: className = "",
  id,
}) => {
  // Apply syntax highlighting styles
  useStyles$(highlightStyles);
  
  // Use the hook to handle code highlighting and copy logic
  const { copySuccess, highlightedCode, themeSignal, copyToClipboard$ } = useCodeBlock({
    code,
    language,
    showLineNumbers,
    highlight,
    highlightLines,
    theme,
  });
  
  // Build CSS classes
  const containerClasses = [
    "code-block-container relative rounded-lg border overflow-hidden",
    theme === "system" 
      ? "border-gray-200 dark:border-gray-700" 
      : theme === "light" 
        ? "border-gray-200" 
        : "border-gray-700",
    className,
  ].filter(Boolean).join(" ");
  
  const preClasses = [
    "text-sm m-0 p-4",
    "hljs-" + (theme === "system" ? "light dark:hljs-dark" : themeSignal.value),
    showLineNumbers ? "hljs-line-numbers" : "",
    !wrap ? "whitespace-pre overflow-x-auto" : "whitespace-pre-wrap",
  ].filter(Boolean).join(" ");
  
  return (
    <div class={containerClasses} id={id}>
      {/* Optional title/filename */}
      {title && <CodeBlockTitle title={title} theme={theme} />}
      
      {/* Code content */}
      <div class="relative">
        <pre 
          class={preClasses} 
          style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
          dangerouslySetInnerHTML={highlightedCode.value}
        ></pre>
        
        {/* Copy button */}
        {copyButton && (
          <CopyButton 
            copySuccess={copySuccess.value} 
            theme={theme} 
            copyToClipboard$={copyToClipboard$} 
          />
        )}
      </div>
      
      {/* Optional caption */}
      {caption && <CodeBlockCaption caption={caption} theme={theme} />}
    </div>
  );
});
