import { useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { type CodeBlockProps, type CodeTheme } from "../CodeDisplay.types";

export function useCodeBlock({
  code,
  language = "javascript",
  showLineNumbers = false,
  highlight = true,
  highlightLines,
  theme = "system",
}: Pick<
  CodeBlockProps,
  | "code"
  | "language"
  | "showLineNumbers"
  | "highlight"
  | "highlightLines"
  | "theme"
>) {
  const copySuccess = useSignal(false);
  const highlightedCode = useSignal(code);
  const themeSignal = useSignal<CodeTheme>(theme);

  useVisibleTask$(({ track }) => {
    track(() => code);
    track(() => language);
    track(() => highlight);
    track(() => highlightLines);
    track(() => showLineNumbers);

    // Dynamically import highlight.js
    import("highlight.js/lib/core")
      .then(async (hljs) => {
        // Only proceed if highlighting is enabled
        if (!highlight) {
          highlightedCode.value = processCodeWithoutHighlight(
            code,
            showLineNumbers,
          );
          return;
        }

        // Determine which language to load
        const langName =
          language === "js"
            ? "javascript"
            : language === "ts"
              ? "typescript"
              : language === "py"
                ? "python"
                : language === "md"
                  ? "markdown"
                  : language === "yml"
                    ? "yaml"
                    : language;

        try {
          // Dynamically import the language
          const langModule = await import(
            /* @vite-ignore */ `highlight.js/lib/languages/${langName}`
          );
          hljs.default.registerLanguage(langName, langModule.default);

          // Highlight the code
          let highlighted = hljs.default.highlight(code, {
            language: langName,
          }).value;

          // Process line numbers and line highlights if needed
          highlighted = processLineHighlights(highlighted, highlightLines);
          highlighted = processLineNumbers(highlighted, showLineNumbers);

          highlightedCode.value = highlighted;
        } catch (error) {
          // Fallback if language isn't available
          console.warn(
            `Language '${langName}' not supported for syntax highlighting`,
          );
          highlightedCode.value = processCodeWithoutHighlight(
            code,
            showLineNumbers,
          );
        }
      })
      .catch(() => {
        // Fallback if highlight.js fails to load
        highlightedCode.value = processCodeWithoutHighlight(
          code,
          showLineNumbers,
        );
      });

    // Check system theme preference if set to "system"
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      themeSignal.value = prefersDark ? "dark" : "light";

      // Listen for theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e: MediaQueryListEvent) => {
        themeSignal.value = e.matches ? "dark" : "light";
      };

      mediaQuery.addEventListener("change", listener);
      return () => {
        mediaQuery.removeEventListener("change", listener);
      };
    }
  });

  const copyToClipboard$ = $((codeText: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText).then(() => {
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 1500);
      });
    }
  });

  return {
    copySuccess,
    highlightedCode,
    themeSignal,
    copyToClipboard$,
  };
}

// Helper functions
export function processCodeWithoutHighlight(
  code: string,
  showLineNumbers: boolean,
): string {
  let processedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (showLineNumbers) {
    const lines = processedCode.split("\n");
    processedCode = lines
      .map((line) => `<span class="hljs-ln">${line}</span>`)
      .join("\n");
  }

  return processedCode;
}

export function processLineHighlights(
  code: string,
  highlightLines?: string,
): string {
  if (!highlightLines) return code;

  const lines = code.split("\n");
  const ranges = parseHighlightRanges(highlightLines);

  const highlightedLines = lines.map((line, i) => {
    const lineNumber = i + 1;
    if (
      ranges.some(
        (range) => lineNumber >= range.start && lineNumber <= range.end,
      )
    ) {
      return `<span class="hljs-line-highlight">${line}</span>`;
    }
    return line;
  });

  return highlightedLines.join("\n");
}

export function processLineNumbers(
  code: string,
  showLineNumbers: boolean,
): string {
  if (!showLineNumbers) return code;

  const lines = code.split("\n");
  const numberedLines = lines.map(
    (line) => `<span class="hljs-ln">${line}</span>`,
  );
  return numberedLines.join("\n");
}

export function parseHighlightRanges(
  highlightLines?: string,
): Array<{ start: number; end: number }> {
  if (!highlightLines) return [];

  return highlightLines.split(",").map((range) => {
    const parts = range.trim().split("-");
    if (parts.length === 1) {
      const lineNumber = parseInt(parts[0], 10);
      return { start: lineNumber, end: lineNumber };
    } else {
      return {
        start: parseInt(parts[0], 10),
        end: parseInt(parts[1], 10),
      };
    }
  });
}
