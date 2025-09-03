import type { PropFunction } from "@builder.io/qwik";

export type FrequencyValue = "Daily" | "Weekly" | "Monthly";

export interface FrequencySelectorProps {
  /**
   * Current selected frequency value
   */
  value: FrequencyValue;

  /**
   * Callback when frequency selection changes
   */
  onChange$: PropFunction<(value: FrequencyValue) => void>;

  /**
   * Optional label for the frequency selector
   */
  label?: string;

  /**
   * Whether the selector is disabled
   * @default false
   */
  disabled?: boolean;


  /**
   * Which option to mark as recommended with a badge
   */
  recommendedOption?: FrequencyValue;

  /**
   * Additional CSS classes
   */
  class?: string;
}

export interface FrequencyOption {
  value: FrequencyValue;
  label: string;
}