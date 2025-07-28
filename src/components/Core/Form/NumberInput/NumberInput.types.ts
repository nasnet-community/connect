import type { QRL } from "@builder.io/qwik";

export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputProps {
  /**
   * Current value of the input
   */
  value?: number;

  /**
   * Callback when value changes
   */
  onValueChange$?: QRL<(value: number | undefined) => void>;

  /**
   * Minimum allowed value
   */
  min?: number;

  /**
   * Maximum allowed value
   */
  max?: number;

  /**
   * Step amount for increment/decrement
   * @default 1
   */
  step?: number;

  /**
   * Number of decimal places to display
   * @default 0
   */
  precision?: number;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Placeholder text when empty
   */
  placeholder?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * HTML id attribute
   */
  id?: string;

  /**
   * HTML name attribute for form submission
   */
  name?: string;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Size variant of the input
   * @default "md"
   */
  size?: NumberInputSize;

  /**
   * Whether to show stepper controls
   * @default true
   */
  showSteppers?: boolean;

  /**
   * Whether to allow keyboard arrow key control
   * @default true
   */
  allowKeyboardStepping?: boolean;

  /**
   * Format display value (e.g., currency, percentage)
   */
  formatValue$?: QRL<(value: number) => string>;

  /**
   * Parse formatted value back to number
   */
  parseValue$?: QRL<(value: string) => number | undefined>;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Whether to allow negative numbers
   * @default true
   */
  allowNegative?: boolean;

  /**
   * Whether to clamp value to min/max on blur
   * @default true
   */
  clampValueOnBlur?: boolean;

  /**
   * Delay in ms for continuous increment/decrement when holding stepper
   * @default 50
   */
  stepperDelay?: number;
}
