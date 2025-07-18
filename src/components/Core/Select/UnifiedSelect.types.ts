/**
 * Type definitions for the unified Select component
 */

import { type QRL } from "@builder.io/qwik";

/**
 * Option item for the Select component
 */
export interface SelectOption {
  /**
   * Unique value for the option (used for selection)
   */
  value: string;
  
  /**
   * Display text for the option
   */
  label: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  
  /**
   * Optional group name for organizing options
   */
  group?: string;
}

/**
 * Size variants for the Select component
 */
export type SelectSize = "sm" | "md" | "lg";

/**
 * Validation states for the Select component
 */
export type ValidationState = "default" | "valid" | "invalid";

/**
 * Mode for Select component rendering
 */
export type SelectMode = "native" | "custom";

/**
 * Props for the unified Select component
 */
export interface SelectProps {
  /**
   * Array of options to display in the select
   */
  options: SelectOption[];
  
  /**
   * Currently selected value(s)
   * - String for single selection
   * - String array for multiple selection
   */
  value?: string | string[];
  
  /**
   * HTML ID attribute for the select
   * @default auto-generated
   */
  id?: string;
  
  /**
   * HTML name attribute for form submission
   */
  name?: string;
  
  /**
   * Placeholder text when no option is selected
   * @default "Select an option"
   */
  placeholder?: string;
  
  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Size variant of the select
   * @default "md"
   */
  size?: SelectSize;
  
  /**
   * Validation state of the select
   * @default "default"
   */
  validation?: ValidationState;
  
  /**
   * Label text to display above the select
   */
  label?: string;
  
  /**
   * Helper text to display below the select
   * Only shown when no error is present
   */
  helperText?: string;
  
  /**
   * Error message to display when validation is "invalid"
   */
  errorMessage?: string;
  
  /**
   * Additional CSS classes to apply to the component
   */
  class?: string;
  
  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Whether to enable search functionality
   * Only applies to custom mode
   * @default false
   */
  searchable?: boolean;
  
  /**
   * Whether selection can be cleared
   * Only applies to custom mode
   * @default true
   */
  clearable?: boolean;
  
  /**
   * Maximum height of dropdown in custom mode
   * @example "300px"
   */
  maxHeight?: string;
  
  /**
   * Rendering mode - native or custom UI
   * - native: uses browser's <select> element (like VPNSelect)
   * - custom: uses custom UI with richer features (like current Select)
   * @default "custom"
   */
  mode?: SelectMode;
  
  /**
   * Callback fired when selection changes
   * @param value The new selected value(s)
   */
  onChange$?: QRL<(value: string | string[]) => void>;
  
  /**
   * Callback fired when dropdown opens or closes
   * Only applies to custom mode
   * @param isOpen Whether dropdown is open
   */
  onOpenChange$?: QRL<(isOpen: boolean) => void>;
  
  /**
   * Callback fired when dropdown is opened
   * Only applies to custom mode
   */
  onOpen$?: QRL<() => void>;
  
  /**
   * Callback fired when dropdown is closed
   * Only applies to custom mode
   */
  onClose$?: QRL<() => void>;
  
  /**
   * Optional custom renderer for option items
   * Only applies to custom mode
   * @param option The option to render
   * @param isSelected Whether the option is selected
   */
  optionRenderer$?: QRL<(option: SelectOption, isSelected: boolean) => JSX.Element>;
  
  /**
   * Whether to show checkbox indicators in multiple mode
   * Only applies to custom mode
   * @default true
   */
  showCheckboxes?: boolean;
  
  /**
   * Whether to trap focus within dropdown when open
   * Only applies to custom mode
   * @default true
   */
  trapFocus?: boolean;
  
  /**
   * Text to display when search returns no results
   * Only applies when searchable is true
   * @default "No options found"
   */
  noResultsText?: string;
  
  /**
   * ARIA label for the select
   * @default value of label prop
   */
  "aria-label"?: string;
  
  /**
   * ID of element that describes this select
   */
  "aria-describedby"?: string;
}

/**
 * Props for the native select element
 * Used internally by UnifiedSelect in native mode
 */
export type NativeSelectProps = Omit<
  SelectProps, 
  | 'searchable' 
  | 'clearable' 
  | 'maxHeight' 
  | 'onOpenChange$' 
  | 'onOpen$' 
  | 'onClose$' 
  | 'optionRenderer$' 
  | 'showCheckboxes' 
  | 'trapFocus' 
  | 'noResultsText'
>;

/**
 * Props for the custom select component 
 * Used internally by UnifiedSelect in custom mode
 */
export type CustomSelectProps = Omit<SelectProps, 'mode'>;
