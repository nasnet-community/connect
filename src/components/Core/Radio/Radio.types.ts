/**
 * Type definitions for Radio components
 */
import { type QRL } from "@builder.io/qwik";

/**
 * Size variations for Radio components
 */
export type RadioSize = "sm" | "md" | "lg" | "xl";

/**
 * Touch target configuration for responsive design
 */
export interface TouchTargetConfig {
  /**
   * Minimum touch target size in pixels
   * @default 44
   */
  minSize?: number;
  /**
   * Whether to apply touch-friendly padding
   * @default true
   */
  touchPadding?: boolean;
  /**
   * Custom touch area size for different breakpoints
   */
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Animation configuration for Radio component
 */
export interface AnimationConfig {
  /**
   * Enable smooth transitions for state changes
   * @default true
   */
  enabled?: boolean;
  /**
   * Transition duration in milliseconds
   * @default 200
   */
  duration?: number;
  /**
   * Animation easing function
   * @default "ease-out"
   */
  easing?: "ease-in" | "ease-out" | "ease-in-out" | "linear";
}

/**
 * Props for the Radio component
 */
export interface RadioProps {
  /**
   * The value of the radio button
   */
  value: string;

  /**
   * The name attribute for the radio input
   */
  name: string;

  /**
   * Whether the radio button is checked
   */
  checked?: boolean;

  /**
   * Label text for the radio button
   */
  label?: string;

  /**
   * Event fired when the radio button state changes
   */
  onChange$?: QRL<(value: string) => void>;

  /**
   * Whether the radio button is disabled
   */
  disabled?: boolean;

  /**
   * Size variant of the radio button
   * @default "md"
   */
  size?: RadioSize;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Touch target configuration for mobile optimization
   */
  touchTarget?: TouchTargetConfig;

  /**
   * Animation configuration
   */
  animation?: AnimationConfig;

  /**
   * Whether to use responsive sizing based on breakpoints
   * @default false
   */
  responsive?: boolean;

  /**
   * Custom responsive size configuration
   */
  responsiveSizes?: {
    mobile?: RadioSize;
    tablet?: RadioSize;
    desktop?: RadioSize;
  };

  /**
   * Theme variant for enhanced theming
   */
  variant?: "default" | "outlined" | "filled" | "minimal";

  /**
   * Whether to show focus ring on keyboard navigation
   * @default true
   */
  showFocusRing?: boolean;

  /**
   * High contrast mode support
   * @default false
   */
  highContrast?: boolean;

  /**
   * ID for the radio button input
   * @default auto-generated
   */
  id?: string;

  /**
   * ARIA label for the radio button
   */
  "aria-label"?: string;

  /**
   * ID of element that describes this radio button
   */
  "aria-describedby"?: string;
}

/**
 * Single radio option for RadioGroup
 */
export interface RadioOption {
  /**
   * Value of the radio option
   */
  value: string;

  /**
   * Label text for the radio option
   */
  label: string;

  /**
   * Whether this option is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes for this radio option
   */
  class?: string;
}

/**
 * Layout direction configuration for RadioGroup
 */
export type RadioGroupDirection = 
  | "horizontal" 
  | "vertical" 
  | "responsive-vertical" 
  | "responsive-horizontal";

/**
 * Grid layout configuration for RadioGroup
 */
export interface GridLayoutConfig {
  /**
   * Number of columns in grid layout
   */
  columns?: number;
  /**
   * Responsive column configuration
   */
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /**
   * Whether to auto-fit columns based on content
   * @default false
   */
  autoFit?: boolean;
}

/**
 * Enhanced spacing configuration for RadioGroup
 */
export interface SpacingConfig {
  /**
   * Space between radio options
   * @default "md"
   */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Responsive gap configuration
   */
  responsive?: {
    mobile?: "xs" | "sm" | "md" | "lg" | "xl";
    tablet?: "xs" | "sm" | "md" | "lg" | "xl";
    desktop?: "xs" | "sm" | "md" | "lg" | "xl";
  };
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
  /**
   * List of radio options
   */
  options: RadioOption[];

  /**
   * Currently selected value
   */
  value: string;

  /**
   * Name attribute for all radio buttons in the group
   */
  name: string;

  /**
   * Label for the entire radio group
   */
  label?: string;

  /**
   * Helper text for the radio group
   */
  helperText?: string;

  /**
   * Error message for the radio group
   */
  error?: string;

  /**
   * Whether the radio group is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the entire radio group is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Layout direction of radio buttons with responsive options
   * @default "vertical"
   */
  direction?: RadioGroupDirection;

  /**
   * Size variant for all radio buttons
   * @default "md"
   */
  size?: RadioSize;

  /**
   * Additional CSS classes for the radio group container
   */
  class?: string;

  /**
   * Event fired when selection changes
   */
  onChange$?: QRL<(value: string) => void>;

  /**
   * ID for the radio group
   * @default auto-generated
   */
  id?: string;

  /**
   * ARIA label for the radio group
   */
  "aria-label"?: string;

  /**
   * ID of element that describes this radio group
   */
  "aria-describedby"?: string;

  /**
   * Whether to enable responsive behavior
   * @default false
   */
  responsive?: boolean;

  /**
   * Custom responsive size configuration for all radio buttons
   */
  responsiveSizes?: {
    mobile?: RadioSize;
    tablet?: RadioSize;
    desktop?: RadioSize;
  };

  /**
   * Touch target configuration applied to all radio buttons
   */
  touchTarget?: TouchTargetConfig;

  /**
   * Animation configuration applied to all radio buttons
   */
  animation?: AnimationConfig;

  /**
   * Theme variant applied to all radio buttons
   */
  variant?: "default" | "outlined" | "filled" | "minimal";

  /**
   * Whether to show focus ring on keyboard navigation
   * @default true
   */
  showFocusRing?: boolean;

  /**
   * High contrast mode support
   * @default false
   */
  highContrast?: boolean;

  /**
   * Grid layout configuration for larger screens
   */
  gridLayout?: GridLayoutConfig;

  /**
   * Enhanced spacing configuration
   */
  spacing?: SpacingConfig;

  /**
   * Whether to enable staggered animations for radio options
   * @default false
   */
  staggeredAnimation?: boolean;
}
