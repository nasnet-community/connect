/**
 * SideNavigation Component
 *
 * This file exports the SideNavigation component and related components,
 * hooks, and types for creating accessible side navigation interfaces.
 */

// Main component
export { SideNavigation } from "./SideNavigation";

// Supporting components
export { SideNavigationItemComponent } from "./SideNavigationItem";
export { SideNavigationHeader } from "./SideNavigationHeader";
export { SideNavigationBackdrop } from "./SideNavigationBackdrop";

// Hooks
export { useSideNavigationState } from "./hooks/useSideNavigationState";
export { useSideNavigationStyles } from "./hooks/useSideNavigationStyles";
export { useSideNavigationClasses } from "./hooks/useSideNavigationClasses";
export { useSideNavigationItemState } from "./hooks/useSideNavigationItemState";
export { useSideNavigationItemStyles } from "./hooks/useSideNavigationItemStyles";

// Types
export type {
  SideNavigationProps,
  SideNavigationItem,
  SideNavigationSize,
  SideNavigationVariant,
} from "./SideNavigation.types";

// Component prop types
export type { SideNavigationItemComponentProps } from "./SideNavigationItem";
export type { SideNavigationBackdropProps } from "./SideNavigationBackdrop";
export type { SideNavigationHeaderProps } from "./SideNavigationHeader";

// Hook prop types
export type { UseSideNavigationStateProps } from "./hooks/useSideNavigationState";
export type { UseSideNavigationStylesProps } from "./hooks/useSideNavigationStyles";
export type { UseSideNavigationClassesProps } from "./hooks/useSideNavigationClasses";
export type { UseSideNavigationItemStateProps } from "./hooks/useSideNavigationItemState";
export type { UseSideNavigationItemStylesProps } from "./hooks/useSideNavigationItemStyles";
