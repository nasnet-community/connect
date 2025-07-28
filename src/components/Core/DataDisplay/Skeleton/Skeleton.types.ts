import type { JSXChildren } from "@builder.io/qwik";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  class?: string;
  children?: JSXChildren;
  "aria-label"?: string;
  // Responsive size support
  responsiveWidth?: {
    mobile?: string | number;
    tablet?: string | number;
    desktop?: string | number;
  };
  responsiveHeight?: {
    mobile?: string | number;
    tablet?: string | number;
    desktop?: string | number;
  };
}

export interface SkeletonTextProps {
  lines?: number;
  lineHeight?: string | number;
  spacing?: "sm" | "md" | "lg";
  lastLineWidth?: string;
  animation?: SkeletonAnimation;
  class?: string;
}

export interface SkeletonAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  shape?: "circle" | "square" | "rounded";
  animation?: SkeletonAnimation;
  class?: string;
}

export interface SkeletonCardProps {
  hasMedia?: boolean;
  mediaHeight?: string | number;
  hasTitle?: boolean;
  hasDescription?: boolean;
  descriptionLines?: number;
  hasActions?: boolean;
  animation?: SkeletonAnimation;
  class?: string;
}
