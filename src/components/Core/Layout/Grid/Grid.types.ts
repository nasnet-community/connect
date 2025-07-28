import type { JSXChildren } from "@builder.io/qwik";
export type GridTemplateColumns =
  | "none"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "auto-fill"
  | "auto-fit";

export type GridTemplateRows =
  | "none"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "auto";

export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "safe" | "touch" | "touch-sm" | "touch-lg";

/**
 * Container-based responsive values for advanced grid layouts
 */
export type ContainerResponsiveValue<T> = {
  base?: T;
  container?: T;
  '@sm'?: T;
  '@md'?: T;
  '@lg'?: T;
  '@xl'?: T;
};

/**
 * Mobile-specific grid behaviors
 */
export type MobileGridBehavior = "stack" | "scroll" | "masonry" | "adaptive";

/**
 * Advanced auto-sizing options for mobile
 */
export type AutoSizeMode = "content" | "min-content" | "max-content" | "fit-content" | "stretch";

/**
 * Touch interaction modes for grid items
 */
export type GridTouchMode = "none" | "pan" | "manipulation" | "pinch-zoom";

export type GridAutoFlow =
  | "row"
  | "column"
  | "dense"
  | "row-dense"
  | "column-dense";

export type GridPlacement =
  | "auto"
  | "start"
  | "center"
  | "end"
  | "stretch"
  | "baseline";

export type GridBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Enhanced responsive grid columns with container query support
 */
export type ResponsiveGridTemplateColumns = {
  base?: GridTemplateColumns;
  sm?: GridTemplateColumns;
  md?: GridTemplateColumns;
  lg?: GridTemplateColumns;
  xl?: GridTemplateColumns;
  "2xl"?: GridTemplateColumns;
} | ContainerResponsiveValue<GridTemplateColumns>;

/**
 * Responsive grid gap with mobile-specific options
 */
export type ResponsiveGridGap = {
  base?: GridGap;
  sm?: GridGap;
  md?: GridGap;
  lg?: GridGap;
  xl?: GridGap;
  "2xl"?: GridGap;
} | ContainerResponsiveValue<GridGap>;

export interface GridProps {
  columns?: GridTemplateColumns | ResponsiveGridTemplateColumns;

  rows?: GridTemplateRows;

  minColumnWidth?: string;

  gap?: GridGap | ResponsiveGridGap;

  columnGap?: GridGap | ResponsiveGridGap;

  rowGap?: GridGap | ResponsiveGridGap;

  autoFlow?: GridAutoFlow;

  justifyItems?: GridPlacement;

  alignItems?: GridPlacement;

  columnTemplate?: string;

  rowTemplate?: string;

  role?: string;

  "aria-label"?: string;

  children?: JSXChildren;

  class?: string;
  
  // Mobile & Container Query Features
  containerQuery?: boolean;
  mobileStacking?: boolean;
  mobileBehavior?: MobileGridBehavior;
  touchMode?: GridTouchMode;
  
  // Auto-sizing for mobile
  autoSize?: AutoSizeMode;
  adaptiveColumns?: boolean;
  
  // Mobile Safe Areas
  mobileSafe?: boolean;
  safeAreaInsets?: boolean;
  
  // Accessibility
  focusManagement?: boolean;
  keyboardNavigation?: boolean;
  
  // Performance
  optimize?: boolean;
  virtualizeItems?: boolean;
  
  // Advanced Mobile Features
  scrollSnapType?: "none" | "x" | "y" | "both" | "mandatory" | "proximity";
  overscrollBehavior?: "auto" | "contain" | "none";
}

/**
 * Responsive grid item props with mobile optimization
 */
export type ResponsiveGridItemValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

export interface GridItemProps {
  colSpan?: ResponsiveGridItemValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full">;

  rowSpan?: ResponsiveGridItemValue<1 | 2 | 3 | 4 | 5 | 6 | "full">;

  colStart?: ResponsiveGridItemValue<"auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13>;

  colEnd?: ResponsiveGridItemValue<"auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13>;

  rowStart?: ResponsiveGridItemValue<"auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7>;

  rowEnd?: ResponsiveGridItemValue<"auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7>;

  justifySelf?: ResponsiveGridItemValue<"auto" | "start" | "center" | "end" | "stretch">;

  alignSelf?: ResponsiveGridItemValue<"auto" | "start" | "center" | "end" | "stretch" | "baseline">;

  role?: string;

  class?: string;

  children?: JSXChildren;
  
  // Mobile GridItem Features
  touchTarget?: "none" | "sm" | "md" | "lg" | "accessible";
  mobilePriority?: "low" | "normal" | "high";
  adaptiveSize?: boolean;
  scrollSnap?: "start" | "center" | "end" | "none";
  mobileOrder?: number;
}
