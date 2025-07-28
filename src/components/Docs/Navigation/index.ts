// Export main component
export { DocsSideNavigation } from "./DocsSideNavigation";

// Export types
export type {
  DocsSideNavigationProps,
  DocsSideNavigationCategory,
  DocsSideNavigationLink,
} from "./types";

// Export hooks for direct use
export {
  useResponsiveDetection,
  useCategoryExpansion,
  useToggleCallback,
} from "./hooks";

// Export components for direct use
export {
  CategoryItem,
  DocsSidebarOverlay,
  DocsSidebarHeader,
  DocsSidebarContent,
} from "./components";
