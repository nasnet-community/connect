import type { JSXChildren } from "@builder.io/qwik";

export type AspectRatioPreset =
  | "square" // 1:1
  | "video" // 16:9
  | "ultrawide" // 21:9
  | "portrait" // 9:16
  | "landscape" // 4:3
  | "photo" // 3:2
  | "golden"; // 1.618:1

export type OverflowMode = "cover" | "contain" | "fill" | "scale-down";

export interface AspectRatioProps {
  /**
   * Content to be displayed within the aspect ratio container
   */
  children?: JSXChildren;

  /**
   * Predefined aspect ratio preset
   */
  ratio?: AspectRatioPreset;

  /**
   * Custom aspect ratio as a number (width / height)
   * e.g., 16/9 = 1.7778
   */
  customRatio?: number;

  /**
   * CSS class for the container
   */
  class?: string;

  /**
   * ID attribute
   */
  id?: string;

  /**
   * Background color when content doesn't fill the container
   * Supports both CSS color values and Tailwind theme classes
   * @example "bg-surface-light dark:bg-surface-dark" | "#f3f4f6"
   */
  bgColor?: string;

  /**
   * How to handle content overflow
   */
  overflow?: OverflowMode;

  /**
   * Whether to center the content
   */
  centered?: boolean;

  /**
   * Additional inline styles
   */
  style?: Record<string, string>;

  /**
   * Maximum width constraint
   * Supports responsive values
   * @example "sm:full md:400px" | "400px"
   */
  maxWidth?: string;

  /**
   * Minimum width constraint
   * Supports responsive values
   * @example "mobile:200px tablet:300px" | "200px"
   */
  minWidth?: string;

  /**
   * Enable responsive behavior and smooth transitions
   * @default true
   */
  responsive?: boolean;

  /**
   * Optimize for touch devices with better interaction handling
   * @default true
   */
  touchOptimized?: boolean;
}
