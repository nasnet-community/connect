/**
 * Type definitions for the Toggle component
 */
import { type QRL } from "@builder.io/qwik";

/**
 * Size variants for the Toggle component
 */
export type ToggleSize = "sm" | "md" | "lg";

/**
 * Position of the label relative to the toggle
 */
export type LabelPosition = "left" | "right";

/**
 * Props for the Toggle component
 */
export interface ToggleProps {
  /**
   * Whether the toggle is checked/on
   */
  checked: boolean;
  
  /**
   * Callback fired when the toggle state changes
   * @param checked The new toggle state
   */
  onChange$: QRL<(checked: boolean) => void>;
  
  /**
   * The label for the toggle
   */
  label?: string;
  
  /**
   * Where to position the label relative to the toggle
   * @default "right"
   */
  labelPosition?: LabelPosition;
  
  /**
   * The size variant of the toggle
   * @default "md"
   */
  size?: ToggleSize;
  
  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Name attribute for the input element
   */
  name?: string;
  
  /**
   * Value attribute for the input element
   */
  value?: string;
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Additional CSS classes to apply to the component
   */
  class?: string;
  
  /**
   * ID for the input element
   * @default auto-generated
   */
  id?: string;
  
  /**
   * ARIA label for the toggle
   */
  "aria-label"?: string;
  
  /**
   * ID of element that describes this toggle
   */
  "aria-describedby"?: string;
}
