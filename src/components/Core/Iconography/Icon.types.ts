import type { QRL } from '@builder.io/qwik';

/**
 * Available icon sizes
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Icon color variants
 */
export type IconColor =
  | 'inherit'
  | 'current'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted';

/**
 * Icon weight/style variants 
 */
export type IconWeight = 'outline' | 'solid' | 'mini';

/**
 * Props for the Icon component
 */
export interface IconProps {
  /**
   * The icon to display - should be a QRL created with $() from an icon component
   */
  icon: QRL<any>;

  /**
   * Size of the icon
   * @default "md"
   */
  size?: IconSize;

  /**
   * Color variant for the icon
   * @default "current"
   */
  color?: IconColor;

  /**
   * Whether the icon should have a fixed width (useful for alignment)
   * @default false
   */
  fixedWidth?: boolean;

  /**
   * Additional CSS classes to apply to the icon
   */
  class?: string;

  /**
   * Accessible label for the icon (for screen readers)
   * Leave empty if icon is decorative only
   */
  label?: string;
}
