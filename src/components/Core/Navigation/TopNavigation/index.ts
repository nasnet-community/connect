/**
 * TopNavigation Component
 *
 * This file exports the TopNavigation component and related components,
 * hooks, and types for creating accessible top navigation interfaces.
 */

// Main component
export { TopNavigation } from "./TopNavigation";

// Supporting components
export { TopNavigationItemComponent } from "./TopNavigationItem";
export { TopNavigationItemComponent as TopNavItem } from "./TopNavigationItem";
export { TopNavigationDropdown } from "./TopNavigationDropdown";
export { TopNavigationDropdown as TopNavDropdown } from "./TopNavigationDropdown";
export { TopNavigationHeader } from "./TopNavigationHeader";
export { TopNavigationMobileMenu } from "./TopNavigationMobileMenu";

// Hooks
export { useTopNavigationStyles } from "./hooks/useTopNavigationStyles";
export { useTopNavigationContainerStyles } from "./hooks/useTopNavigationContainerStyles";
export { useDropdownState } from "./hooks/useDropdownState";
export { useMobileMenuState } from "./hooks/useMobileMenuState";

// Types
export type {
  TopNavigationProps,
  TopNavigationItem,
  TopNavigationItem as TopNavDropdownItem,
  TopNavigationSize,
  TopNavigationVariant,
  TopNavigationPosition,
} from "./TopNavigation.types";

// Component prop types
export type { TopNavigationItemComponentProps } from "./TopNavigationItem";
export type { TopNavigationDropdownProps } from "./TopNavigationDropdown";
export type { TopNavigationHeaderProps } from "./TopNavigationHeader";
export type { TopNavigationMobileMenuProps } from "./TopNavigationMobileMenu";

// Hook prop types
export type { UseTopNavigationStylesProps } from "./hooks/useTopNavigationStyles";
export type { UseTopNavigationContainerStylesProps } from "./hooks/useTopNavigationContainerStyles";
export type { UseDropdownStateProps } from "./hooks/useDropdownState";
export type { UseMobileMenuStateProps } from "./hooks/useMobileMenuState";
