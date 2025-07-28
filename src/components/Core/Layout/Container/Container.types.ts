import type { JSXChildren, QwikIntrinsicElements } from "@builder.io/qwik";

export type ContainerSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full"
  | "fluid";
export type ContainerPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface ContainerProps
  extends Omit<QwikIntrinsicElements["div"], "children"> {
  maxWidth?: ContainerSize;
  centered?: boolean;
  paddingX?: ContainerPadding;
  paddingY?: ContainerPadding;
  children?: JSXChildren;
  class?: string;
  role?: string;
  "aria-label"?: string;
  fixedWidth?: boolean;
}
