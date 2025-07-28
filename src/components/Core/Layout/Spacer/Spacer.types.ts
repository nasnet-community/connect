/**
 * Size options for the Spacer component.
 */
export type SpacerSize =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Props for the Spacer component.
 */
export interface SpacerProps {
  /**
   * Size of the spacer.
   * @default "md"
   */
  size?:
    | SpacerSize
    | {
        base?: SpacerSize;
        sm?: SpacerSize;
        md?: SpacerSize;
        lg?: SpacerSize;
        xl?: SpacerSize;
        "2xl"?: SpacerSize;
      };

  /**
   * Whether to make the spacer flex-grow to fill available space.
   * @default false
   */
  isFlexible?: boolean;

  /**
   * Horizontal axis only - creates a horizontal spacer with specified width.
   */
  horizontal?: boolean;

  /**
   * Vertical axis only - creates a vertical spacer with specified height.
   * This is the default behavior.
   */
  vertical?: boolean;

  /**
   * Additional CSS classes to apply to the spacer.
   */
  class?: string;

  /**
   * ID for the spacer element.
   */
  id?: string;

  /**
   * Whether the spacer should be hidden on smaller screens.
   * @default false
   */
  hideOnMobile?: boolean;

  /**
   * ARIA role attribute.
   * @default "none"
   */
  role?: string;
}
