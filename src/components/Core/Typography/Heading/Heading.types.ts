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
export type HeadingWeight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

/**
 * Available text alignments for headings
 */
export type HeadingAlignment = "left" | "center" | "right";

/**
 * Available color variants for headings
 */
export type HeadingColor = 
  | "primary"       // Default heading color
  | "secondary"     // Less prominent text
  | "tertiary"      // Even less prominent text
  | "inverse"       // For use on dark backgrounds
  | "accent"        // Brand accent color
  | "success"       // Success/positive messaging
  | "warning"       // Warning messaging
  | "error"         // Error messaging
  | "info";         // Informational messaging

/**
 * Available responsive size options
 */
export type ResponsiveSize = {
  base?: HeadingLevel;  // Default size (mobile)
  sm?: HeadingLevel;    // Small screens (640px+)
  md?: HeadingLevel;    // Medium screens (768px+)
  lg?: HeadingLevel;    // Large screens (1024px+)
  xl?: HeadingLevel;    // Extra large screens (1280px+)
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
