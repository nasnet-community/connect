import type { JSXChildren, QRL } from "@builder.io/qwik";

/**
 * Available text sizes (including fluid typography)
 */
export type TextSize = 
  | "3xs" | "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
  | "fluid-xs" | "fluid-sm" | "fluid-base" | "fluid-lg" | "fluid-xl" | "fluid-2xl" | "fluid-3xl" | "fluid-4xl";

/**
 * Available font weights
 */
export type FontWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

/**
 * Available text alignments (including logical properties)
 */
export type TextAlign = "left" | "center" | "right" | "start" | "end";

/**
 * Available text colors (enhanced with design system colors)
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
  | "subtle"
  | "surface-light"
  | "surface-dark"
  | "surface-dim"
  | "primary-light"
  | "primary-dark"
  | "secondary-light"
  | "secondary-dark"
  | "contrast-medium"
  | "contrast-high";

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
export type TextStyle =
  | "body"
  | "caption"
  | "label"
  | "code"
  | "quote"
  | "paragraph";

/**
 * Responsive size configuration (enhanced with custom breakpoints)
 */
export interface ResponsiveTextSize {
  /** Extra small phones (360px+) */
  "2xs"?: TextSize;
  /** Small phones (475px+) */
  xs?: TextSize;
  /** Large phones (640px+) */
  sm?: TextSize;
  /** Tablets (768px+) */
  md?: TextSize;
  /** Small laptops (1024px+) */
  lg?: TextSize;
  /** Desktop (1280px+) */
  xl?: TextSize;
  /** Large desktop (1536px+) */
  "2xl"?: TextSize;
  /** Full HD (1920px+) */
  "3xl"?: TextSize;
  /** 2K/4K (2560px+) */
  "4xl"?: TextSize;
  
  /** Base/default size (mobile-first) */
  base?: TextSize;
  /** Mobile devices (360px+) */
  mobile?: TextSize;
  /** Mobile medium (475px+) */
  "mobile-md"?: TextSize;
  /** Tablet devices (768px+) */
  tablet?: TextSize;
  /** Laptop devices (1024px+) */
  laptop?: TextSize;
  /** Desktop devices (1280px+) */
  desktop?: TextSize;
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
  as?:
    | "p"
    | "span"
    | "div"
    | "label"
    | "strong"
    | "em"
    | "time"
    | "pre"
    | "code"
    | "blockquote"
    | "figcaption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

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
   * Font family variant
   * @default "sans"
   */
  fontFamily?: "sans" | "sans-rtl" | "serif" | "serif-rtl" | "mono" | "display" | "body";

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
   * Theme variant for color scheme
   * @default "auto"
   */
  theme?: "light" | "dark" | "dim" | "auto";

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
  children?: JSXChildren;

  /**
   * Click handler
   */
  onClick$?: QRL<(e: MouseEvent) => void>;
}
