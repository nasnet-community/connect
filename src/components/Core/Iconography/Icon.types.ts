import type { QRL, QwikIntrinsicElements, JSXNode, JSXOutput, SVGProps } from "@builder.io/qwik";

/**
 * Available icon sizes with extended range for diverse use cases
 */
export type IconSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * Icon color variants with comprehensive theme system integration
 */
export type IconColor =
  | "inherit"
  | "current"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted"
  | "on-surface"
  | "on-surface-variant"
  | "inverse";

/**
 * Icon weight/style variants for different visual styles
 */
export type IconWeight = "outline" | "solid" | "mini";

/**
 * Responsive behavior options for different devices
 */
export type IconResponsiveMode = boolean;

/**
 * Interactive behavior options for clickable icons
 */
export type IconInteractiveMode = boolean;

/**
 * Props for the Icon component with enhanced features
 */
export interface IconProps extends Omit<QwikIntrinsicElements["span"], "children" | "size"> {
  /**
   * The icon to display - can be a QRL icon function (with or without props), JSX element, or JSX output
   */
  icon: QRL<() => JSXNode> | QRL<(props: SVGProps<SVGSVGElement>) => JSXNode> | JSXNode | JSXOutput;

  /**
   * Size of the icon with extended size options
   * @default "md"
   */
  size?: IconSize;

  /**
   * Color variant for the icon with comprehensive theme support
   * @default "current"
   */
  color?: IconColor;

  /**
   * Whether the icon should have a fixed width (useful for alignment)
   * @default false
   */
  fixedWidth?: boolean;

  /**
   * Enable responsive sizing that adapts to different screen sizes
   * When enabled, icons will be larger on mobile for better touch targets
   * @default false
   */
  responsive?: IconResponsiveMode;

  /**
   * Enable interactive behavior with hover, focus, and active states
   * Automatically adds appropriate touch targets for mobile devices
   * @default false
   */
  interactive?: IconInteractiveMode;

  /**
   * Additional CSS classes to apply to the icon
   */
  class?: string;

  /**
   * Accessible label for the icon (for screen readers)
   * Leave empty if icon is decorative only
   * Required when interactive is true
   */
  label?: string;
}

/**
 * Extended icon props for specific use cases
 */
export interface IconButtonProps extends IconProps {
  /**
   * Button-specific properties when icon is used as a button
   */
  onClick$?: QRL<() => void>;
  
  /**
   * Whether the icon button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Loading state for icon buttons
   * @default false
   */
  loading?: boolean;
}

/**
 * Props for icon groups and collections
 */
export interface IconGroupProps {
  /**
   * Array of icons to display in a group
   */
  icons: Array<{
    icon: QRL<() => JSXNode> | JSXNode;
    label?: string;
    id?: string;
  }>;
  
  /**
   * Shared size for all icons in the group
   */
  size?: IconSize;
  
  /**
   * Shared color for all icons in the group
   */
  color?: IconColor;
  
  /**
   * Spacing between icons
   * @default "md"
   */
  spacing?: "sm" | "md" | "lg";
  
  /**
   * Direction of the icon group
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";
}

/**
 * Configuration for icon library and theme integration
 */
export interface IconConfig {
  /**
   * Default size for all icons
   * @default "md"
   */
  defaultSize?: IconSize;
  
  /**
   * Default color for all icons
   * @default "current"
   */
  defaultColor?: IconColor;
  
  /**
   * Whether to enable responsive behavior by default
   * @default false
   */
  defaultResponsive?: boolean;
  
  /**
   * Custom size mappings for responsive behavior
   */
  responsiveSizes?: Partial<Record<IconSize, {
    mobile: string;
    tablet: string;
    desktop: string;
  }>>;
}
