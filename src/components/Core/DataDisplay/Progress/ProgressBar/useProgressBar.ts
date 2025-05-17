import { useSignal, useTask$ } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';

// Define the types since they might be different than in the Tooltip.types.ts file
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressBarColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface UseProgressBarParams {
  value?: number;
  min?: number;
  max?: number;
  size?: ProgressBarSize;
  color?: ProgressBarColor;
  showValue?: boolean;
  valueFormat?: (value: number, min: number, max: number) => string;
  indeterminate?: boolean;
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

export interface UseProgressBarReturn {
  progressValue: Signal<number>;
  progressPercent: Signal<number>;
  ariaValueNow: string | undefined;
  ariaValueMin: string;
  ariaValueMax: string;
  ariaValueText: string | undefined;
  valueLabel: string;
  trackClasses: string;
  fillerClasses: string;
  labelClasses: string;
  showValueLabel: boolean;
}

export function useProgressBar(params: UseProgressBarParams): UseProgressBarReturn {
  const {
    value = 0,
    min = 0,
    max = 100,
    size = 'md',
    color = 'primary',
    showValue = false,
    valueFormat,
    indeterminate = false,
    striped = false,
    animated = false,
    className = '',
  } = params;

  // Signals for tracking progress value and percent
  const progressValue = useSignal<number>(Math.min(Math.max(value, min), max));
  const progressPercent = useSignal<number>(0);

  // Update progress value and percent when inputs change
  useTask$(({ track }) => {
    const currentValue = track(() => progressValue.value);
    const currentMin = track(() => min);
    const currentMax = track(() => max);
    
    // Ensure value is within bounds
    if (currentValue < currentMin) {
      progressValue.value = currentMin;
    } else if (currentValue > currentMax) {
      progressValue.value = currentMax;
    }
    
    // Calculate percentage
    progressPercent.value = ((currentValue - currentMin) / (currentMax - currentMin)) * 100;
  });

  // Update progress value when value prop changes
  useTask$(({ track }) => {
    const newValue = track(() => value);
    progressValue.value = newValue;
  });

  // Format the value for display
  const formatValue = (value: number, min: number, max: number): string => {
    if (valueFormat) {
      return valueFormat(value, min, max);
    }
    return `${Math.round(value)}%`;
  };

  // Value for ARIA attributes and label
  const ariaValueNow = indeterminate ? undefined : progressValue.value.toString();
  const ariaValueMin = min.toString();
  const ariaValueMax = max.toString();
  const ariaValueText = indeterminate ? undefined : formatValue(progressValue.value, min, max);
  
  // Label for displaying the value
  const valueLabel = formatValue(progressValue.value, min, max);

  // Size classes
  const sizeMap: Record<ProgressBarSize, string> = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6',
  };
  const sizeClass = sizeMap[size];

  // Color classes
  const colorMap: Record<ProgressBarColor, string> = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-500',
  };
  const colorClass = colorMap[color];

  // Classes for the track (background)
  const trackClasses = [
    'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
    sizeClass,
    className,
  ].filter(Boolean).join(' ');

  // Classes for the filler (progress indicator)
  const fillerClasses = [
    colorClass,
    'h-full transition-all duration-300 ease-in-out',
    striped ? 'bg-stripes bg-stripes-white' : '',
    animated ? 'animate-progress-stripes' : '',
    indeterminate ? 'animate-indeterminate-progress w-2/5' : '',
    'rounded-full',
  ].filter(Boolean).join(' ');

  // Classes for the value label
  const labelClasses = [
    'ml-2 text-sm font-medium',
    color === 'neutral' ? 'text-gray-700 dark:text-gray-300' : `text-${color}-700 dark:text-${color}-300`,
  ].filter(Boolean).join(' ');

  return {
    progressValue,
    progressPercent,
    ariaValueNow,
    ariaValueMin,
    ariaValueMax,
    ariaValueText,
    valueLabel,
    trackClasses,
    fillerClasses,
    labelClasses,
    showValueLabel: showValue
  };
} 