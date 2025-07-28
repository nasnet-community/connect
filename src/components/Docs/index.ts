// Export main components
export { ComponentPage } from "./ComponentPage";
export { ComponentGroupsDisplay } from "./ComponentGroupsDisplay";
export { DocExample } from "./DocExample";
export { CodeExample } from "./CodeExample";

// Export types from the main components
export type { ComponentPageProps } from "./ComponentPage";
export type {
  ComponentGroupsDisplayProps,
  ComponentGroup,
  ComponentItem,
} from "./ComponentGroupsDisplay";
export type { DocExampleProps } from "./DocExample";

// Export the main DocsSideNavigation component
export { DocsSideNavigation } from "./Navigation/DocsSideNavigation";

// Export navigation types
export type {
  DocsSideNavigationProps,
  DocsSideNavigationCategory,
  DocsSideNavigationLink,
} from "./Navigation/types";

// Export navigation hooks
export {
  useResponsiveDetection,
  useCategoryExpansion,
  useToggleCallback,
} from "./Navigation/hooks";

// Export navigation components
export {
  CategoryItem,
  DocsSidebarOverlay,
  DocsSidebarHeader,
  DocsSidebarContent,
} from "./Navigation/components";

// Export templates
export * from "./templates";

// Export components
export * from "./components";

// Export types
export * from "./types/ComponentDocumentation";
