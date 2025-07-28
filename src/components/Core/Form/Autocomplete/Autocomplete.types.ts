import type { QRL, Signal } from "@builder.io/qwik";

export interface AutocompleteOption {
  /**
   * Unique value for the option
   */
  value: string;

  /**
   * Display label for the option
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

export interface AutocompleteGroup {
  /**
   * Label for the group
   */
  label: string;

  /**
   * Options in this group
   */
  options: AutocompleteOption[];
}

export type AutocompleteSize = "sm" | "md" | "lg";

export interface AutocompleteProps {
  /**
   * Array of options to display
   */
  options: AutocompleteOption[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onValueChange$?: QRL<(value: string) => void>;

  /**
   * Callback when input text changes (for controlled search)
   */
  onInputChange$?: QRL<(value: string) => void>;

  /**
   * Current input value (for controlled mode)
   */
  inputValue?: string;

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
   * Size variant of the input
   * @default "md"
   */
  size?: AutocompleteSize;

  /**
   * Whether to allow custom values not in options
   * @default true
   */
  allowCustomValue?: boolean;

  /**
   * Whether to filter options based on input
   * @default true
   */
  filterOptions?: boolean;

  /**
   * Custom filter function
   */
  filterFunction$?: QRL<
    (option: AutocompleteOption, inputValue: string) => boolean
  >;

  /**
   * Text to show when no options match
   * @default "No options found"
   */
  noOptionsText?: string;

  /**
   * Text to show when loading options
   */
  loadingText?: string;

  /**
   * Whether options are currently loading
   * @default false
   */
  loading?: boolean;

  /**
   * Maximum height of the dropdown
   * @default "300px"
   */
  maxDropdownHeight?: string;

  /**
   * Whether the dropdown is open (controlled mode)
   */
  open?: Signal<boolean>;

  /**
   * Whether to highlight matching text in options
   * @default true
   */
  highlightMatches?: boolean;

  /**
   * Whether to show clear button when value is selected
   * @default true
   */
  clearable?: boolean;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Whether to open dropdown on focus
   * @default true
   */
  openOnFocus?: boolean;

  /**
   * Whether to close dropdown on select
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Minimum characters required before showing options
   * @default 0
   */
  minCharsToSearch?: number;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}
