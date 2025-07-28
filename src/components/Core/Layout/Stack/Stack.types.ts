import type { HTMLAttributes, JSXChildren } from "@builder.io/qwik";

export type StackDirection = "row" | "column";

/**
 * Enhanced spacing with mobile-specific options
 */
export type StackSpacing =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "safe"        // Mobile safe area spacing
  | "touch"       // Touch-friendly spacing
  | "touch-sm"    // Small touch spacing
  | "touch-lg"    // Large touch spacing
  | "adaptive";   // Adaptive spacing based on device

export type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Enhanced responsive value pattern for mobile-first design
 */
export type ResponsiveStackValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

/**
 * Mobile-specific Stack behaviors
 */
export type MobileStackBehavior = 
  | "stack"      // Force vertical stacking on mobile
  | "scroll"     // Horizontal scroll on mobile
  | "wrap"       // Allow wrapping on mobile
  | "adaptive";  // Auto-adapt based on content

/**
 * Touch interaction modes for Stack items
 */
export type StackTouchMode = "none" | "pan" | "manipulation" | "scrollable";

/**
 * Enhanced divider options with mobile support
 */
export type StackDividerVariant = 
  | "default" 
  | "primary" 
  | "secondary" 
  | "muted" 
  | "touch"      // Touch-friendly divider
  | "minimal";   // Minimal mobile divider

/**
 * RTL layout strategies
 */
export type RTLStrategy = "logical" | "transform" | "auto";

/**
 * Safe area inset options for mobile devices
 */
export type SafeAreaInsets = "top" | "bottom" | "left" | "right" | "horizontal" | "vertical" | "all";

export interface StackProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  
  direction?: ResponsiveStackValue<StackDirection>;

  spacing?: ResponsiveStackValue<StackSpacing>;

  justify?: ResponsiveStackValue<StackJustify>;

  align?: ResponsiveStackValue<StackAlign>;

  wrap?: ResponsiveStackValue<StackWrap>;

  // Enhanced divider support
  dividers?: boolean;
  dividerColor?: StackDividerVariant;
  dividerThickness?: "thin" | "medium" | "thick";

  reverse?: boolean;

  // Enhanced RTL support
  supportRtl?: boolean;
  rtlStrategy?: RTLStrategy;

  // Mobile-specific features
  mobileBehavior?: MobileStackBehavior;
  touchMode?: StackTouchMode;
  mobileSpacing?: StackSpacing;  // Override spacing on mobile
  
  // Safe areas for mobile
  safeAreaInsets?: SafeAreaInsets[] | boolean;
  mobileSafe?: boolean;

  // Touch optimization
  touchTargetSpacing?: boolean;  // Add extra spacing for touch targets
  
  // Container queries
  containerQuery?: boolean;
  
  // Performance & Accessibility
  optimize?: boolean;
  focusManagement?: boolean;
  scrollSnap?: boolean;
  
  // Content
  children?: JSXChildren;
  
  // Semantic HTML
  as?: "div" | "section" | "article" | "nav" | "main" | "aside" | "header" | "footer" | "ul" | "ol";
}
