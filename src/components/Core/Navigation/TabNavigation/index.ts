/**
 * TabNavigation Component
 *
 * This file exports the TabNavigation component and related components,
 * hooks, and types for creating accessible tab navigation interfaces.
 */

// Main component
export { TabNavigation } from "./TabNavigation";
export { TabItem } from "./TabItem";

// Hooks
export { useTabStyles } from "./hooks/useTabStyles";
export { useTabState } from "./hooks/useTabState";
export { useTabKeyboardNavigation } from "./hooks/useTabKeyboardNavigation";

// Types
export type {
  TabNavigationProps,
  Tab as TabItemType,
  TabNavigationSize,
  TabNavigationVariant,
  TabNavigationAlign,
} from "./TabNavigation.types";

// Component prop types
export type { TabItemProps } from "./TabItem";

// Hook prop types
export type { UseTabStylesProps } from "./hooks/useTabStyles";
export type { UseTabStateProps } from "./hooks/useTabState";
export type { UseTabKeyboardNavigationProps } from "./hooks/useTabKeyboardNavigation";
