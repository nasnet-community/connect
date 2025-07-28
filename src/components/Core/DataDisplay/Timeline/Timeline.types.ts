import type { JSXChildren } from "@builder.io/qwik";

export type TimelinePosition = "left" | "right" | "alternate";
export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineDotVariant = "filled" | "outlined";

export interface TimelineProps {
  children?: JSXChildren;
  position?: TimelinePosition;
  orientation?: TimelineOrientation;
  class?: string;
}

export interface TimelineItemProps {
  children?: JSXChildren;
  dotColor?: string;
  dotVariant?: TimelineDotVariant;
  dotIcon?: JSXChildren;
  opposite?: JSXChildren;
  connectorColor?: string;
  class?: string;
  isLast?: boolean;
}

export interface TimelineDotProps {
  color?: string;
  variant?: TimelineDotVariant;
  icon?: JSXChildren;
  size?: "sm" | "md" | "lg";
  class?: string;
}

export interface TimelineConnectorProps {
  color?: string;
  orientation?: TimelineOrientation;
  class?: string;
}

export interface TimelineContentProps {
  children?: JSXChildren;
  class?: string;
}
