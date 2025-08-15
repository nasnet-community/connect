export type FeatureListSize = "sm" | "md" | "lg";
export type FeatureListIconColor = "primary" | "secondary" | "success" | "info" | "inherit";
export type FeatureListSpacing = "compact" | "normal" | "relaxed";

export interface FeatureListProps {
  /**
   * Array of feature strings to display
   */
  features: string[];
  
  /**
   * Color theme for the checkmark icon
   * @default "primary"
   */
  iconColor?: FeatureListIconColor;
  
  /**
   * Size of the text and icon
   * @default "md"
   */
  size?: FeatureListSize;
  
  /**
   * Whether to show the checkmark icon
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Spacing between list items
   * @default "normal"
   */
  spacing?: FeatureListSpacing;
  
  /**
   * Additional CSS classes
   */
  class?: string;
}