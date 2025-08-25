/**
 * Type definitions for the Toggle component
 */
import { type QRL } from "@builder.io/qwik";

/**
 * Size variants for the Toggle component
 */
export type ToggleSize = "sm" | "md" | "lg";

/**
 * Color variants for the Toggle component
 */
export type ToggleColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";


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
   * Color variant of the toggle
   * @default "primary"
   */
  color?: ToggleColor;

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the toggle is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display when checked (as JSX element or component)
   * Can be a Qwik component, JSX element, or string
   */
  checkedIcon?: any;

  /**
   * Icon to display when unchecked (as JSX element or component)
   * Can be a Qwik component, JSX element, or string
   */
  uncheckedIcon?: any;


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

  /**
   * Show focus ring only on keyboard focus
   * @default true
   */
  focusVisibleOnly?: boolean;
}
