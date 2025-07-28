/**
 * Code Display Components
 *
 * These components provide consistent styling for displaying code snippets
 * with syntax highlighting and copy functionality.
 *
 * @example
 * ```tsx
 * import { InlineCode, CodeBlock } from "~/components/Core/Typography";
 *
 * // Inline code within text
 * <Text>Use the <InlineCode>useSignal()</InlineCode> hook for reactive state</Text>
 *
 * // Code block with syntax highlighting
 * <CodeBlock
 *   code="const count = useSignal(0);\ncount.value++;"
 *   language="typescript"
 *   showLineNumbers
 * />
 * ```
 */

export { InlineCode } from "./InlineCode";
export { CodeBlock } from "./CodeBlock";
export type {
  CodeBlockProps,
  InlineCodeProps,
  CodeLanguage,
  CodeTheme,
} from "./CodeDisplay.types";
