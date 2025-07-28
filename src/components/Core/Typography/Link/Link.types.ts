import type { JSXChildren, QRL } from "@builder.io/qwik";
import type { LinkProps as QwikLinkProps } from "@builder.io/qwik-city";

/**
 * Available link sizes (enhanced with fluid typography)
 */
export type LinkSize = 
  | "3xs" | "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
  | "fluid-xs" | "fluid-sm" | "fluid-base" | "fluid-lg" | "fluid-xl" | "fluid-2xl" | "fluid-3xl" | "fluid-4xl";

/**
 * Available font weights for link text
 */
export type LinkWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Available link colors (enhanced with design system colors)
 */
export type LinkColor =
  | "primary" // Default link color
  | "secondary" // Subdued color
  | "tertiary" // Even more subdued
  | "inverse" // For dark backgrounds
  | "accent" // Brand accent color
  | "inherit" // Inherits from parent text color
  | "success"
  | "error"
  | "warning"
  | "info"
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
 * Available link variants
 */
export type LinkVariant =
  | "standard" // Default underlined on hover
  | "button" // Button-like appearance
  | "nav" // Navigation link style
  | "subtle" // Minimal styling
  | "icon" // Icon with optional text
  | "breadcrumb"; // For breadcrumb navigation

/**
 * Link underline styles
 */
export type LinkUnderline =
  | "none" // No underline
  | "hover" // Underline on hover (default)
  | "always" // Always show underline
  | "animate"; // Animated underline effect

/**
 * Properties for the Link component
 */
export interface LinkProps {
  /**
   * Link destination URL for external links or path for internal links
   */
  href: string;

  /**
   * Whether the link should be treated as external regardless of URL format
   * @default false - Auto-detects based on href format
   */
  external?: boolean;

  /**
   * Link variant style
   * @default "standard"
   */
  variant?: LinkVariant;

  /**
   * Link size
   * @default "base"
   */
  size?: LinkSize;

  /**
   * Font weight for link text
   * @default "medium"
   */
  weight?: LinkWeight;

  /**
   * Link color
   * @default "primary"
   */
  color?: LinkColor;

  /**
   * Underline style
   * @default "hover"
   */
  underline?: LinkUnderline;

  /**
   * Whether to open link in a new tab (adding target="_blank")
   * @default false for internal links, true for external links
   */
  newTab?: boolean;

  /**
   * Icon to display before link text
   */
  prefixIcon?: JSXChildren;

  /**
   * Icon to display after link text
   */
  suffixIcon?: JSXChildren;

  /**
   * Whether to truncate text with ellipsis if it overflows
   * @default false
   */
  truncate?: boolean;

  /**
   * Whether the link is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the link is currently active (for navigation links)
   * @default false
   */
  active?: boolean;

  /**
   * Whether to add the rel="noopener noreferrer" attribute to external links
   * @default true
   */
  secure?: boolean;

  /**
   * The rel attribute for the link
   */
  rel?: string;

  /**
   * ARIA label for better accessibility
   */
  ariaLabel?: string;

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
   * Enable print-optimized styles
   * @default false
   */
  printOptimized?: boolean;

  /**
   * Enable focus ring animations
   * @default true
   */
  focusRing?: boolean;

  /**
   * Enable ripple effect on touch
   * @default false
   */
  rippleEffect?: boolean;

  /**
   * Qwik-specific Link props for internal routing
   */
  qwikCity?: Partial<QwikLinkProps>;
}
