import type { JSXNode, QRL } from "@builder.io/qwik";
import type { LinkProps as QwikLinkProps } from "@builder.io/qwik-city";

/**
 * Available link sizes
 */
export type LinkSize = "xs" | "sm" | "base" | "lg" | "xl";

/**
 * Available font weights for link text
 */
export type LinkWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Available link colors
 */
export type LinkColor =
  | "primary" // Default blue link color
  | "secondary" // Subdued color
  | "tertiary" // Even more subdued
  | "inverse" // For dark backgrounds
  | "accent" // Brand accent color
  | "inherit" // Inherits from parent text color
  | "success"
  | "error"
  | "warning"
  | "info";

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
  prefixIcon?: JSXNode;

  /**
   * Icon to display after link text
   */
  suffixIcon?: JSXNode;

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
  children?: string | JSXNode;

  /**
   * Click handler
   */
  onClick$?: QRL<(e: MouseEvent) => void>;

  /**
   * Qwik-specific Link props for internal routing
   */
  qwikCity?: Partial<QwikLinkProps>;
}
