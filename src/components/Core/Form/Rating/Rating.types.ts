import type { QRL } from "@builder.io/qwik";

export type RatingSize = "sm" | "md" | "lg";
export type RatingPrecision = 0.1 | 0.5 | 1;

export interface RatingProps {
  /** Current rating value */
  value?: number;

  /** Default rating value for uncontrolled component */
  defaultValue?: number;

  /** Maximum rating value */
  max?: number;

  /** Rating precision - 1 for full stars, 0.5 for half stars */
  precision?: RatingPrecision;

  /** Size variant */
  size?: RatingSize;

  /** Whether the rating is read-only */
  readOnly?: boolean;

  /** Whether the rating is disabled */
  disabled?: boolean;

  /** Whether to allow clearing the rating */
  allowClear?: boolean;

  /** Custom icon component or JSX element */
  icon?: any;

  /** Custom empty icon component or JSX element */
  emptyIcon?: any;

  /** Array of labels for each rating value (for accessibility) */
  labels?: string[];

  /** Field label */
  label?: string;

  /** Helper text displayed below the rating */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Success message */
  successMessage?: string;

  /** Warning message */
  warningMessage?: string;

  /** Whether the field is required */
  required?: boolean;

  /** Field name for form submission */
  name?: string;

  /** Field ID */
  id?: string;

  /** Additional CSS classes */
  class?: string;

  /** Additional CSS classes for the label */
  labelClass?: string;

  /** Additional CSS classes for the message */
  messageClass?: string;

  /** Whether to show the numeric value */
  showValue?: boolean;

  /** Callback when rating value changes */
  onValueChange$?: QRL<(value: number | null) => void>;

  /** Standard onChange event handler */
  onChange$?: QRL<(event: Event, value: number | null) => void>;

  /** Callback when hovering over a rating */
  onHoverChange$?: QRL<(value: number | null) => void>;

  /** ARIA label */
  "aria-label"?: string;

  /** ARIA described by */
  "aria-describedby"?: string;
}

export interface UseRatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: RatingPrecision;
  readOnly?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  labels?: string[];
  onValueChange$?: QRL<(value: number | null) => void>;
  onChange$?: QRL<(event: Event, value: number | null) => void>;
  onHoverChange$?: QRL<(value: number | null) => void>;
}

export interface RatingItemProps {
  index: number;
  value: number;
  hoverValue: number | null;
  actualValue: number;
  precision: RatingPrecision;
  size: RatingSize;
  icon?: any;
  emptyIcon?: any;
  isActive: boolean;
  isHovered: boolean;
  isHalf: boolean;
  readOnly: boolean;
  disabled: boolean;
  onMouseEnter$: QRL<(value: number) => void>;
  onClick$: QRL<(value: number) => void>;
  label?: string;
}
