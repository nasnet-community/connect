import type { JSXChildren } from "@builder.io/qwik";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: JSXChildren;
  isCurrent?: boolean;
  id?: string;
  class?: string;
}

export type BreadcrumbSeparator = "/" | ">" | "-" | "•" | "|";

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator | JSXChildren;
  maxItems?: number;
  expanderLabel?: string;
  label?: string;
  class?: string;
  id?: string;
}
