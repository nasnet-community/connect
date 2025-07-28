/**
 * Breadcrumbs Component
 *
 * This file exports the Breadcrumbs component and related components,
 * hooks, and types for creating accessible breadcrumb navigation.
 */

// Main component
export { default as Breadcrumbs } from "./Breadcrumbs";
export { default } from "./Breadcrumbs";

// Supporting components
export { BreadcrumbItem } from "./BreadcrumbItem";

// Hooks
export { useBreadcrumbsResponsive } from "./hooks/useBreadcrumbsResponsive";
export { useDisplayedItems } from "./hooks/useDisplayedItems";

// Types
export type {
  BreadcrumbsProps,
  BreadcrumbItem as BreadcrumbItemType,
  BreadcrumbSeparator,
} from "./Breadcrumbs.types";

// Component prop types
export type { BreadcrumbItemProps } from "./BreadcrumbItem";
