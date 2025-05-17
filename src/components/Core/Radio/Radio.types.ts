/**
 * Type definitions for Radio components
 */
import { type QRL } from "@builder.io/qwik";

/**
 * Size variations for Radio components
 */
export type RadioSize = "sm" | "md" | "lg";

/**
 * Props for the Radio component
 */
export interface RadioProps {
  /**
   * The value of the radio button
   */
  value: string;
  
  /**
   * The name attribute for the radio input
   */
  name: string;
  
  /**
   * Whether the radio button is checked
   */
  checked?: boolean;
  
  /**
   * Label text for the radio button
   */
  label?: string;
  
  /**
   * Event fired when the radio button state changes
   */
  onChange$?: QRL<(value: string) => void>;
  
  /**
   * Whether the radio button is disabled
   */
  disabled?: boolean;
  
  /**
   * Size variant of the radio button
   * @default "md"
   */
  size?: RadioSize;
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Additional CSS classes
   */
  class?: string;
  
  /**
   * ID for the radio button input
   * @default auto-generated
   */
  id?: string;
  
  /**
   * ARIA label for the radio button
   */
  "aria-label"?: string;
  
  /**
   * ID of element that describes this radio button
   */
  "aria-describedby"?: string;
}

/**
 * Single radio option for RadioGroup
 */
export interface RadioOption {
  /**
   * Value of the radio option
   */
  value: string;
  
  /**
   * Label text for the radio option
   */
  label: string;
  
  /**
   * Whether this option is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes for this radio option
   */
  class?: string;
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
  /**
   * List of radio options
   */
  options: RadioOption[];
  
  /**
   * Currently selected value
   */
  value: string;
  
  /**
   * Name attribute for all radio buttons in the group
   */
  name: string;
  
  /**
   * Label for the entire radio group
   */
  label?: string;
  
  /**
   * Helper text for the radio group
   */
  helperText?: string;
  
  /**
   * Error message for the radio group
   */
  error?: string;
  
  /**
   * Whether the radio group is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Whether the entire radio group is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Layout direction of radio buttons
   * @default "vertical"
   */
  direction?: "horizontal" | "vertical";
  
  /**
   * Size variant for all radio buttons
   * @default "md"
   */
  size?: RadioSize;
  
  /**
   * Additional CSS classes for the radio group container
   */
  class?: string;
  
  /**
   * Event fired when selection changes
   */
  onChange$?: QRL<(value: string) => void>;
  
  /**
   * ID for the radio group
   * @default auto-generated
   */
  id?: string;
  
  /**
   * ARIA label for the radio group
   */
  "aria-label"?: string;
  
  /**
   * ID of element that describes this radio group
   */
  "aria-describedby"?: string;
}
