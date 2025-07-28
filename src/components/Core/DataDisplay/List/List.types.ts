import type { JSXChildren } from "@builder.io/qwik";

export type ListVariant = "unordered" | "ordered" | "definition";
export type ListMarker =
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "roman"
  | "alpha"
  | "none";
export type ListSize = "sm" | "md" | "lg";
export type ListSpacing = "compact" | "normal" | "relaxed";

export interface ListProps {
  children?: JSXChildren;
  variant?: ListVariant;
  size?: ListSize;
  spacing?: ListSpacing;
  marker?: ListMarker;
  nested?: boolean;
  start?: number;
  reversed?: boolean;
  class?: string;
  id?: string;
  ariaLabel?: string;
}

export interface ListItemProps {
  children?: JSXChildren;
  active?: boolean;
  disabled?: boolean;
  value?: string;
  class?: string;
  id?: string;
}

export interface ListTermProps {
  children?: JSXChildren;
  class?: string;
}

export interface ListDescriptionProps {
  children?: JSXChildren;
  class?: string;
}
