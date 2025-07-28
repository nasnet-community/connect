import type { JSXChildren, QwikIntrinsicElements } from "@builder.io/qwik";

/**
 * Responsive value type for mobile-first design
 */
export type ResponsiveValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};
export type BoxPadding =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "safe"
  | "safe-top"
  | "safe-bottom"
  | "safe-left"
  | "safe-right";

/**
 * Mobile-specific spacing with touch-friendly sizes
 */
export type BoxSpacing = BoxPadding | "touch" | "touch-sm" | "touch-lg";

export type BoxMargin =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "auto"
  | "safe"
  | "safe-top"
  | "safe-bottom"
  | "safe-left"
  | "safe-right";

export type BoxBorderRadius =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

/**
 * Enhanced border radius with mobile-optimized options
 */
export type BoxBorderRadiusResponsive = ResponsiveValue<BoxBorderRadius>;

export type BoxBorderWidth = "none" | "thin" | "normal" | "thick";

export type BoxBorderStyle = "solid" | "dashed" | "dotted" | "double" | "none";

export type BoxBorderColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted";

export type BoxBackgroundColor =
  | "transparent"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted"
  | "surface"
  | "surface-alt"
  | "surface-elevated"
  | "surface-depressed"
  | "background"
  | "background-alt";

/**
 * Enhanced shadow system with mobile-optimized shadows
 */
export type BoxShadowEnhanced = BoxShadow | "mobile-card" | "mobile-nav" | "elevated" | "floating";

export type BoxShadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";

/**
 * Touch interaction styles for mobile devices
 */
export type BoxTouchTarget = "none" | "sm" | "md" | "lg" | "accessible";

/**
 * Focus management for accessibility
 */
export type BoxFocusStyle = "none" | "default" | "ring" | "outline" | "glow";

/**
 * Viewport-based sizing options
 */
export type BoxViewportSize = "vh" | "vw" | "dvh" | "svh" | "lvh";

export interface BoxBorderProps {
  borderRadius?: BoxBorderRadiusResponsive;

  borderWidth?: ResponsiveValue<BoxBorderWidth>;

  borderStyle?: ResponsiveValue<BoxBorderStyle>;

  borderColor?: ResponsiveValue<BoxBorderColor>;
}

export interface BoxProps
  extends Omit<QwikIntrinsicElements["div"], "children" | "class">,
    BoxBorderProps {
  children?: JSXChildren;

  as?: keyof QwikIntrinsicElements;

  padding?:
    | ResponsiveValue<BoxPadding>
    | ResponsiveValue<{
        all?: BoxPadding;
        x?: BoxPadding;
        y?: BoxPadding;
        top?: BoxPadding;
        right?: BoxPadding;
        bottom?: BoxPadding;
        left?: BoxPadding;
        // RTL-aware logical properties
        inline?: BoxPadding;
        block?: BoxPadding;
        inlineStart?: BoxPadding;
        inlineEnd?: BoxPadding;
        blockStart?: BoxPadding;
        blockEnd?: BoxPadding;
      }>;

  margin?:
    | ResponsiveValue<BoxMargin>
    | ResponsiveValue<{
        all?: BoxMargin;
        x?: BoxMargin;
        y?: BoxMargin;
        top?: BoxMargin;
        right?: BoxMargin;
        bottom?: BoxMargin;
        left?: BoxMargin;
        // RTL-aware logical properties
        inline?: BoxMargin;
        block?: BoxMargin;
        inlineStart?: BoxMargin;
        inlineEnd?: BoxMargin;
        blockStart?: BoxMargin;
        blockEnd?: BoxMargin;
      }>;

  backgroundColor?: ResponsiveValue<BoxBackgroundColor>;

  shadow?: ResponsiveValue<BoxShadowEnhanced>;

  fullWidth?: boolean | ResponsiveValue<boolean>;

  fullHeight?: boolean | ResponsiveValue<boolean>;

  // Enhanced mobile-first features
  touchTarget?: BoxTouchTarget;

  focusStyle?: BoxFocusStyle;

  // Viewport-based sizing
  viewportWidth?: BoxViewportSize | string;

  viewportHeight?: BoxViewportSize | string;

  // Mobile-specific properties
  mobileSafe?: boolean;

  // Touch interaction optimizations
  touchOptimized?: boolean;

  // RTL support
  supportRtl?: boolean;

  // Performance optimization
  optimize?: boolean;

  class?: string;

  role?: string;

  "aria-label"?: string;

  "aria-labelledby"?: string;

  "aria-describedby"?: string;
}
