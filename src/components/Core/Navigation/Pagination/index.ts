/**
 * Pagination Component
 *
 * This file exports the Pagination component and related components,
 * hooks, and types for creating accessible pagination interfaces.
 */

// Main component
export { Pagination } from "./Pagination";

// Supporting components
export { NavigationButton } from "./NavigationButton";
export { PageNumbers } from "./PageNumbers";
export { PageInputForm } from "./PageInputForm";

// Hooks
export { usePaginationState } from "./hooks/usePaginationState";
export { useVisiblePages } from "./hooks/useVisiblePages";
export { useItemRange } from "./hooks/useItemRange";

// Types
export type {
  PaginationProps,
  PaginationSize,
  PaginationVariant,
} from "./Pagination.types";

// Component prop types
export type { NavigationButtonProps } from "./NavigationButton";
export type { PageNumbersProps } from "./PageNumbers";
export type { PageInputFormProps } from "./PageInputForm";

// Hook prop types
export type { UsePaginationStateProps } from "./hooks/usePaginationState";
export type { UseVisiblePagesProps } from "./hooks/useVisiblePages";
export type { UseItemRangeProps } from "./hooks/useItemRange";
