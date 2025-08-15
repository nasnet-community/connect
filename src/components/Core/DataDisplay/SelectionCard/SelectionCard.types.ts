import type { JSXOutput, PropFunction } from "@builder.io/qwik";
import type { CardProps } from "../Card/Card.types";

export type SelectionBadgeVariant = "default" | "primary" | "success" | "warning" | "info";

export interface SelectionCardProps {
  /**
   * Whether the card is currently selected
   * @default false
   */
  isSelected?: boolean;

  /**
   * Whether the card is disabled (unselectable)
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Card title
   */
  title?: string;

  /**
   * Card description
   */
  description?: string;

  /**
   * Icon element to display
   */
  icon?: JSXOutput;

  /**
   * Optional badge text (e.g., "Recommended", "Popular")
   */
  badge?: string;

  /**
   * Badge color variant
   * @default "default"
   */
  badgeVariant?: SelectionBadgeVariant;

  /**
   * Click handler
   */
  onClick$?: PropFunction<() => void>;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Additional props to pass to the underlying Card component
   */
  cardProps?: Partial<CardProps>;

  /**
   * Children content (typically FeatureList or custom content)
   */
  children?: JSXOutput;
}