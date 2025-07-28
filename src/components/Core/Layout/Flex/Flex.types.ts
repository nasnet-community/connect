import type { JSXChildren, QwikIntrinsicElements } from "@builder.io/qwik";
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type FlexJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FlexAlignContent =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "stretch";
export type FlexGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "safe" | "touch" | "touch-sm" | "touch-lg";
export type FlexBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Container query breakpoints for advanced responsive design
 */
export type ContainerBreakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Touch interaction modes for mobile optimization
 */
export type TouchMode = "none" | "pan-x" | "pan-y" | "manipulation" | "auto";

/**
 * Mobile-specific flex behaviors
 */
export type MobileFlexBehavior = "stack" | "scroll" | "wrap" | "adaptive";
export type ResponsiveValue<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};
export interface FlexProps
  extends Omit<QwikIntrinsicElements["div"], "children" | "align"> {
  direction?: FlexDirection | ResponsiveValue<FlexDirection>;
  wrap?: FlexWrap | ResponsiveValue<FlexWrap>;
  justify?: FlexJustify | ResponsiveValue<FlexJustify>;
  align?: FlexAlign | ResponsiveValue<FlexAlign>;
  alignContent?: FlexAlignContent | ResponsiveValue<FlexAlignContent>;
  gap?: FlexGap | ResponsiveValue<FlexGap>;
  columnGap?: FlexGap | ResponsiveValue<FlexGap>;
  rowGap?: FlexGap | ResponsiveValue<FlexGap>;
  supportRtl?: boolean;
  as?: keyof QwikIntrinsicElements;
  children?: JSXChildren;
  class?: string;
  
  // Mobile & Touch Optimization
  touchMode?: TouchMode;
  mobileBehavior?: MobileFlexBehavior;
  touchOptimized?: boolean;
  
  // Container Queries
  containerQuery?: boolean;
  containerBreakpoint?: ContainerBreakpoint;
  
  // Safe Area Support
  mobileSafe?: boolean;
  safeAreaInsets?: boolean;
  
  // Performance
  optimize?: boolean;
  
  // Accessibility
  focusManagement?: boolean;
  scrollBehavior?: "smooth" | "instant" | "auto";
  
  // Advanced Mobile Features
  overscrollBehavior?: "auto" | "contain" | "none";
  scrollSnapType?: "none" | "x" | "y" | "both" | "mandatory" | "proximity";
}
export interface FlexItemProps
  extends Omit<QwikIntrinsicElements["div"], "children" | "align"> {
  order?: number | ResponsiveValue<number>;
  grow?: number | boolean | ResponsiveValue<number | boolean>;
  shrink?: number | boolean | ResponsiveValue<number | boolean>;
  basis?: string | "auto" | ResponsiveValue<string | "auto">;
  alignSelf?: FlexAlign | ResponsiveValue<FlexAlign>;
  as?: keyof QwikIntrinsicElements;
  children?: JSXChildren;
  class?: string;
  
  // Mobile FlexItem Features
  touchTarget?: "none" | "sm" | "md" | "lg" | "accessible";
  mobilePriority?: "low" | "normal" | "high";
  adaptiveSize?: boolean;
  scrollSnap?: "start" | "center" | "end" | "none";
}
