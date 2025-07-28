/**
 * Type definitions for the Heading component
 */
import type { JSXNode } from "@builder.io/qwik";

/**
 * Heading level (h1-h6)
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Available font weights for headings
 */
export type HeadingWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

/**
 * Available text alignments for headings (including logical properties)
 */
export type HeadingAlignment = "left" | "center" | "right" | "start" | "end";

/**
 * Available color variants for headings (enhanced with design system colors)
 */
export type HeadingColor =
  | "primary" // Default heading color
  | "secondary" // Less prominent text
  | "tertiary" // Even less prominent text
  | "inverse" // For use on dark backgrounds
  | "accent" // Brand accent color
  | "success" // Success/positive messaging
  | "warning" // Warning messaging
  | "error" // Error messaging
  | "info" // Informational messaging
  | "surface-light" // Surface light theme
  | "surface-dark" // Surface dark theme
  | "surface-dim" // Surface dim theme
  | "primary-light" // Primary light variant
  | "primary-dark" // Primary dark variant
  | "secondary-light" // Secondary light variant
  | "secondary-dark" // Secondary dark variant
  | "contrast-medium" // Medium contrast
  | "contrast-high"; // High contrast

/**
 * Heading size types (including fluid typography)
 */
export type HeadingSize = 
  | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
  | "fluid-xs" | "fluid-sm" | "fluid-base" | "fluid-lg" | "fluid-xl" | "fluid-2xl" | "fluid-3xl" | "fluid-4xl";

/**
 * Available responsive size options (enhanced with custom breakpoints)
 */
export type ResponsiveSize = {
  /** Extra small phones (360px+) */
  "2xs"?: HeadingLevel | HeadingSize;
  /** Small phones (475px+) */
  xs?: HeadingLevel | HeadingSize;
  /** Large phones (640px+) */
  sm?: HeadingLevel | HeadingSize;
  /** Tablets (768px+) */
  md?: HeadingLevel | HeadingSize;
  /** Small laptops (1024px+) */
  lg?: HeadingLevel | HeadingSize;
  /** Desktop (1280px+) */
  xl?: HeadingLevel | HeadingSize;
  /** Large desktop (1536px+) */
  "2xl"?: HeadingLevel | HeadingSize;
  /** Full HD (1920px+) */
  "3xl"?: HeadingLevel | HeadingSize;
  /** 2K/4K (2560px+) */
  "4xl"?: HeadingLevel | HeadingSize;
  
  /** Base/default size (mobile-first) */
  base?: HeadingLevel | HeadingSize;
  /** Mobile devices (360px+) */
  mobile?: HeadingLevel | HeadingSize;
  /** Mobile medium (475px+) */
  "mobile-md"?: HeadingLevel | HeadingSize;
  /** Tablet devices (768px+) */
  tablet?: HeadingLevel | HeadingSize;
  /** Laptop devices (1024px+) */
  laptop?: HeadingLevel | HeadingSize;
  /** Desktop devices (1280px+) */
  desktop?: HeadingLevel | HeadingSize;
};

/**
 * Props for the Heading component
 */
export interface HeadingProps {
  /**
   * Heading level (h1-h6). Can be overridden by the 'as' prop for semantic purposes.
   * @default 2 (h2)
   */
  level?: HeadingLevel;

  /**
   * Element to render the heading as (for semantic HTML)
   * This allows you to have the correct semantic element while maintaining visual styling of another level
   * @example <Heading level={2} as="h1">Visually h2, semantically h1</Heading>
   */
  as?: `h${HeadingLevel}` | "div" | "span";

  /**
   * Font weight of the heading
   * @default "semibold"
   */
  weight?: HeadingWeight;

  /**
   * Text alignment
   * @default "left"
   */
  align?: HeadingAlignment;

  /**
   * Whether to truncate text with ellipsis if it overflows
   * @default false
   */
  truncate?: boolean;

  /**
   * Maximum number of lines before truncating (requires truncate=true)
   * @default 1
   */
  maxLines?: number;

  /**
   * Color variant for the heading
   * @default "primary"
   */
  color?: HeadingColor;

  /**
   * Responsive size configuration
   * If provided, overrides the 'level' prop
   * @example { base: 3, md: 2, lg: 1 } // h3 on mobile, h2 on medium screens, h1 on large screens
   */
  responsiveSize?: ResponsiveSize;

  /**
   * Font family variant
   * @default "display"
   */
  fontFamily?: "sans" | "sans-rtl" | "serif" | "serif-rtl" | "display" | "body";

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
   * Child content
   */
  children?: string | JSXNode;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * ID attribute
   */
  id?: string;
}
