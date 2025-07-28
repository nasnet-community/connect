import type { JSXNode, QRL } from "@builder.io/qwik";

/**
 * Available code themes (enhanced with design system themes)
 */
export type CodeTheme = "light" | "dark" | "dim" | "system" | "auto";

/**
 * Available code block sizes
 */
export type CodeSize = "xs" | "sm" | "base" | "lg" | "xl";
export type CodeLanguage =
  | "bash"
  | "c"
  | "cpp"
  | "csharp"
  | "css"
  | "diff"
  | "go"
  | "graphql"
  | "html"
  | "java"
  | "javascript"
  | "js"
  | "json"
  | "jsx"
  | "kotlin"
  | "less"
  | "markdown"
  | "md"
  | "mysql"
  | "objectivec"
  | "perl"
  | "php"
  | "python"
  | "py"
  | "ruby"
  | "rust"
  | "scala"
  | "scss"
  | "shell"
  | "sql"
  | "swift"
  | "typescript"
  | "ts"
  | "tsx"
  | "yaml"
  | "yml";

export interface InlineCodeProps {
  children?: string | JSXNode;
  class?: string;
  id?: string;
  noWrap?: boolean;
  
  /**
   * Theme variant for color scheme
   * @default "auto"
   */
  theme?: CodeTheme;
  
  /**
   * Size variant
   * @default "sm"
   */
  size?: CodeSize;
  
  /**
   * Enable high contrast mode
   * @default false
   */
  highContrast?: boolean;
  
  /**
   * Enable touch-optimized interactions
   * @default false
   */
  touchOptimized?: boolean;
  
  /**
   * Text direction for RTL support
   * @default "auto"
   */
  direction?: "ltr" | "rtl" | "auto";
  
  /**
   * Enable print-optimized styles
   * @default false
   */
  printOptimized?: boolean;
}

export interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  showLineNumbers?: boolean;
  wrap?: boolean;
  theme?: CodeTheme;
  title?: string;
  copyButton?: boolean;
  highlight?: boolean;
  highlightLines?: string;
  maxHeight?: string;
  caption?: string;
  class?: string;
  id?: string;
  onCopy$?: QRL<() => void>;
  
  /**
   * Size variant
   * @default "base"
   */
  size?: CodeSize;
  
  /**
   * Enable high contrast mode
   * @default false
   */
  highContrast?: boolean;
  
  /**
   * Respect reduced motion preferences
   * @default true
   */
  reduceMotion?: boolean;
  
  /**
   * Enable touch-optimized interactions
   * @default false
   */
  touchOptimized?: boolean;
  
  /**
   * Text direction for RTL support
   * @default "auto"
   */
  direction?: "ltr" | "rtl" | "auto";
  
  /**
   * Enable container-based responsive sizing
   * @default false
   */
  containerResponsive?: boolean;
  
  /**
   * Enable print-optimized styles
   * @default false
   */
  printOptimized?: boolean;
  
  /**
   * Border radius variant
   * @default "md"
   */
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Enable mobile-optimized scrolling
   * @default true
   */
  mobileScrolling?: boolean;
}
