import type { QRL } from "@builder.io/qwik";

export type PinInputSize = "sm" | "md" | "lg";
export type PinInputType = "numeric" | "alphanumeric";

export interface PinInputProps {
  /**
   * Current value of the PIN
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onValueChange$?: QRL<(value: string) => void>;

  /**
   * Callback when all digits are filled
   */
  onComplete$?: QRL<(value: string) => void>;

  /**
   * Number of input boxes
   * @default 4
   */
  length?: number;

  /**
   * Type of input allowed
   * @default "numeric"
   */
  type?: PinInputType;

  /**
   * Whether to mask the input (like password)
   * @default false
   */
  mask?: boolean;

  /**
   * Label for the PIN input group
   */
  label?: string;

  /**
   * Helper text displayed below the inputs
   */
  helperText?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * HTML id attribute for the first input
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
   * Size variant of the inputs
   * @default "md"
   */
  size?: PinInputSize;

  /**
   * Whether to auto-focus the first input
   * @default true
   */
  autoFocus?: boolean;

  /**
   * Whether to select text on focus
   * @default true
   */
  selectOnFocus?: boolean;

  /**
   * Placeholder character for empty inputs
   * @default "○"
   */
  placeholder?: string;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Whether inputs should be spaced apart
   * @default true
   */
  spaced?: boolean;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}
