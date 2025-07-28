import type { JSXChildren, QRL } from "@builder.io/qwik";

/**
 * The different sizes of the TopNavigation component.
 */
export type TopNavigationSize = "sm" | "md" | "lg";

/**
 * The different variants of the TopNavigation component.
 */
export type TopNavigationVariant =
  | "default"
  | "minimal"
  | "filled"
  | "transparent"
  | "bordered";

/**
 * The different positions of the TopNavigation component.
 */
export type TopNavigationPosition = "static" | "sticky" | "fixed";

/**
 * A single navigation item in the TopNavigation component.
 */
export interface TopNavigationItem {
  /**
   * The label text for the navigation item.
   */
  label: string;

  /**
   * Optional URL for the navigation item.
   */
  href?: string;

  /**
   * Optional icon to display with the label.
   */
  icon?: JSXChildren;

  /**
   * Whether this navigation item is currently active.
   */
  isActive?: boolean;

  /**
   * Whether this navigation item is disabled.
   */
  isDisabled?: boolean;

  /**
   * Optional subitems for dropdown menus.
   */
  items?: TopNavigationItem[];

  /**
   * Optional click handler for the navigation item.
   */
  onClick$?: QRL<() => void>;

  /**
   * Optional custom CSS class for the navigation item.
   */
  class?: string;

  /**
   * Optional ID for the navigation item.
   */
  id?: string;

  /**
   * Optional badge to display with the navigation item.
   */
  badge?: JSXChildren;
}

/**
 * Props for the TopNavigation component.
 */
export interface TopNavigationProps {
  /**
   * The main menu navigation items.
   */
  items: TopNavigationItem[];

  /**
   * Optional logo content to display in the navigation bar.
   */
  logo?: JSXChildren;

  /**
   * Directs the user to this URL when clicking the logo.
   */
  logoHref?: string;

  /**
   * Optional content to display on the right side of the navigation bar.
   */
  rightContent?: JSXChildren;

  /**
   * The size of the top navigation component.
   * @default "md"
   */
  size?: TopNavigationSize;

  /**
   * The visual variant of the top navigation component.
   * @default "default"
   */
  variant?: TopNavigationVariant;

  /**
   * The position of the top navigation component.
   * @default "static"
   */
  position?: TopNavigationPosition;

  /**
   * Whether to show a mobile menu toggle button on small screens.
   * @default true
   */
  mobileMenuEnabled?: boolean;

  /**
   * Whether the mobile menu is initially open.
   * @default false
   */
  isMobileMenuOpen?: boolean;

  /**
   * Optional handler for toggling the mobile menu.
   */
  onMobileMenuToggle$?: QRL<(isOpen: boolean) => void>;

  /**
   * Optional handler when a navigation item is clicked.
   */
  onNavItemClick$?: QRL<(item: TopNavigationItem) => void>;

  /**
   * Optional custom CSS class for the top navigation container.
   */
  class?: string;

  /**
   * Optional ID for the top navigation container.
   */
  id?: string;
}
