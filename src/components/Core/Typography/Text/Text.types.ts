import type { JSXNode, QRL } from "@builder.io/qwik";

/**
 * Available text sizes
 */
export type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

/**
 * Available font weights
 */
export type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

/**
 * Available text alignments
 */
export type TextAlign = "left" | "center" | "right";

/**
 * Available text colors
 */
export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "subtle";

/**
 * Available text transformations
 */
export type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none";

/**
 * Available text decorations
 */
export type TextDecoration = "underline" | "line-through" | "none";

/**
 * Available text styles 
 */
export type TextStyle = "body" | "caption" | "label" | "code" | "quote" | "paragraph";

/**
 * Responsive size configuration
 */
export interface ResponsiveTextSize {
  base?: TextSize;
  sm?: TextSize;
  md?: TextSize;
  lg?: TextSize;
  xl?: TextSize;
  "2xl"?: TextSize;
}

/**
 * Properties for the Text component 
 */
export interface TextProps {
  /**
   * Text style variant
   * @default "body"
   */
  variant?: TextStyle;

  /**
   * The element to render the text as
   * @default "p" for variant="paragraph" or "body", "span" for others
   */
  as?: "p" | "span" | "div" | "label" | "strong" | "em" | "time" | "pre" | "code" | "blockquote" | "figcaption";

  /**
   * Font size
   * @default "base"
   */
  size?: TextSize;

  /**
   * Font weight
   * @default "normal"
   */
  weight?: FontWeight;

  /**
   * Text alignment
   * @default "left"
   */
  align?: TextAlign;

  /**
   * Text color
   * @default "primary"
   */
  color?: TextColor;

  /**
   * Whether to truncate text with ellipsis if it overflows
   * @default false
   */
  truncate?: boolean;

  /**
   * Maximum number of lines before truncating (when truncate is true)
   * @default 1
   */
  maxLines?: number;

  /**
   * Text transformation
   * @default "none"
   */
  transform?: TextTransform;

  /**
   * Text decoration
   * @default "none"
   */
  decoration?: TextDecoration;

  /**
   * Responsive size configuration
   */
  responsiveSize?: ResponsiveTextSize;

  /**
   * Whether to enable italics
   * @default false
   */
  italic?: boolean;

  /**
   * Whether to enable monospace font
   * @default false for most variants, true for "code" variant
   */
  monospace?: boolean;

  /**
   * Text for screen readers only (visually hidden)
   */
  srOnly?: boolean;

  /**
   * ID attribute
   */
  id?: string;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Child content
   */
  children?: string | JSXNode;

  /**
   * Click handler
   */
  onClick$?: QRL<(e: MouseEvent) => void>;
}
