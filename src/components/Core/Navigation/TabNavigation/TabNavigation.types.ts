/**
 * Type definitions for the TabNavigation component
 */
import { type QRL } from "@builder.io/qwik";

/**
 * Represents a single tab in the TabNavigation component
 */
export interface Tab {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Display label for the tab
   */
  label: string;

  /**
   * Optional icon for the tab
   */
  icon?: any;

  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Count/badge number to display (e.g., for notifications)
   */
  count?: number;

  /**
   * Additional CSS classes for this specific tab
   */
  class?: string;

  /**
   * Custom data attributes to pass to the tab
   */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Available size variants for the TabNavigation
 */
export type TabSize = "sm" | "md" | "lg";
export type TabNavigationSize = TabSize;

/**
 * Available style variants for the TabNavigation
 */
export type TabVariant =
  | "underline" // Default, underlined tabs
  | "pills" // Pill-shaped tabs
  | "boxed" // Boxed/rectangular tabs
  | "minimal"; // Minimal styling with hover effects
export type TabNavigationVariant = TabVariant;

/**
 * Available alignment options for the TabNavigation
 */
export type TabNavigationAlign = "left" | "center" | "right";

/**
 * Props for the TabNavigation component
 */
export interface TabNavigationProps {
  /**
   * Array of tab items to display
   */
  tabs: Tab[];

  /**
   * ID of the currently active tab
   */
  activeTab: string;

  /**
   * Callback fired when a tab is selected
   */
  onSelect$: QRL<(tabId: string) => void>;

  /**
   * Size variant of the tabs
   * @default "md"
   */
  size?: TabSize;

  /**
   * Style variant of the tabs
   * @default "underline"
   */
  variant?: TabVariant;

  /**
   * Whether icons should be displayed
   * @default true
   */
  showIcons?: boolean;

  /**
   * Whether tabs should be full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Horizontal alignment of tabs
   * @default "left"
   */
  align?: "left" | "center" | "right";

  /**
   * Whether to animate the active tab indicator
   * @default true
   */
  animated?: boolean;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * ID for the tab navigation element
   */
  id?: string;

  /**
   * ARIA label for the tab navigation
   */
  "aria-label"?: string;
}
