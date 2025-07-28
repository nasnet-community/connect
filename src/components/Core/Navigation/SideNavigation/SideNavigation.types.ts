import type { JSXChildren, QRL } from "@builder.io/qwik";

/**
 * The different sizes of the SideNavigation component.
 */
export type SideNavigationSize = "sm" | "md" | "lg";

/**
 * The different variants of the SideNavigation component.
 */
export type SideNavigationVariant = "default" | "bordered" | "minimal";

/**
 * A single navigation item in the SideNavigation component.
 */
export interface SideNavigationItem {
  /**
   * The label text for the navigation item.
   */
  label: string;

  /**
   * Optional URL for the navigation item.
   * If not provided, the item will be rendered as a non-clickable item (e.g., a category).
   */
  href?: string;

  /**
   * Optional icon to display next to the label.
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
   * Optional badge content (e.g., count indicator).
   */
  badge?: JSXChildren;

  /**
   * Optional tooltip text.
   */
  tooltip?: string;

  /**
   * Optional subitems for this navigation item.
   */
  items?: SideNavigationItem[];

  /**
   * Whether the nested items are initially expanded.
   * Only applicable if `items` is provided.
   */
  isExpanded?: boolean;

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
}

/**
 * Props for the SideNavigation component.
 */
export interface SideNavigationProps {
  /**
   * The navigation items to display in the side navigation.
   */
  items: SideNavigationItem[];

  /**
   * The title of the navigation menu.
   */
  title?: string;

  /**
   * Optional header content to display above the navigation items.
   */
  header?: JSXChildren;

  /**
   * Optional footer content to display below the navigation items.
   */
  footer?: JSXChildren;

  /**
   * Whether the side navigation is collapsed into an icon-only mode.
   * @default false
   */
  isCollapsed?: boolean;

  /**
   * Whether the side navigation can be toggled between collapsed and expanded states.
   * @default true
   */
  isCollapsible?: boolean;

  /**
   * The size of the side navigation component.
   * @default "md"
   */
  size?: SideNavigationSize;

  /**
   * The visual variant of the side navigation component.
   * @default "default"
   */
  variant?: SideNavigationVariant;

  /**
   * Whether the side navigation is rendered inside a container with a backdrop for mobile devices.
   * @default false
   */
  isMobileModal?: boolean;

  /**
   * Whether the mobile modal is currently open.
   * Only applicable if `isMobileModal` is true.
   * @default false
   */
  isMobileOpen?: boolean;

  /**
   * Whether to enable swipe gestures for opening/closing the mobile drawer.
   * Only applicable if `isMobileModal` is true.
   * @default true
   */
  enableSwipeGestures?: boolean;

  /**
   * Minimum swipe distance in pixels to trigger open/close action.
   * Only applicable if `enableSwipeGestures` is true.
   * @default 50
   */
  swipeThreshold?: number;

  /**
   * Whether to show a close button in the mobile drawer.
   * Only applicable if `isMobileModal` is true.
   * @default true
   */
  showMobileCloseButton?: boolean;

  /**
   * Whether to blur the backdrop when the mobile drawer is open.
   * Only applicable if `isMobileModal` is true.
   * @default true
   */
  enableBackdropBlur?: boolean;

  /**
   * Whether to optimize touch targets for mobile devices (minimum 44x44px).
   * @default true
   */
  optimizeTouchTargets?: boolean;

  /**
   * Optional handler for toggling the collapsed state.
   */
  onToggleCollapse$?: QRL<() => void>;

  /**
   * Optional handler for closing the mobile modal.
   * Only applicable if `isMobileModal` is true.
   */
  onCloseMobile$?: QRL<() => void>;

  /**
   * Optional handler for when a swipe gesture is detected.
   * Only applicable if `enableSwipeGestures` is true.
   */
  onSwipeGesture$?: QRL<(direction: 'left' | 'right', distance: number) => void>;

  /**
   * Optional handler for when any navigation item is clicked.
   */
  onNavItemClick$?: QRL<(item: SideNavigationItem) => void>;

  /**
   * Optional ARIA label for the navigation.
   * @default "Side navigation"
   */
  ariaLabel?: string;

  /**
   * Optional custom CSS class for the side navigation container.
   */
  class?: string;

  /**
   * Optional ID for the side navigation container.
   */
  id?: string;
}
