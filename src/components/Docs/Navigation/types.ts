// Navigation-related types
export interface DocsSideNavigationLink {
  href: string;
  label: string;
  subComponents?: DocsSideNavigationLink[];
}

export interface DocsSideNavigationCategory {
  id: string;
  name: string;
  links?: DocsSideNavigationLink[];
  subcategories?: DocsSideNavigationCategory[];
}

export interface DocsSideNavigationProps {
  categories: DocsSideNavigationCategory[];
  title?: string;
  class?: string;
  activePath?: string;
  sidebarVisible?: boolean;
  onToggleSidebar$?: PropFunction<() => void>;
  isMobile?: boolean;
  renderFullLayout?: boolean;
}

// Make PropFunction available to avoid importing it in multiple files
import type { PropFunction } from "@builder.io/qwik";
