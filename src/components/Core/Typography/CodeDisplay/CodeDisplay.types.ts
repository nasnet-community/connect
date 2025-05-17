import type { JSXNode, QRL } from "@builder.io/qwik";
export type CodeTheme = "light" | "dark" | "system";
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
}
