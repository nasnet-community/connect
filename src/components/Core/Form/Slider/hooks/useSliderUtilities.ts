import { $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseSliderUtilitiesProps {
  min: number;
  max: number;
  step: number;
  formatLabel$?: QRL<(value: number) => string>;
}

export function useSliderUtilities({
  min,
  max,
  step,
  formatLabel$,
}: UseSliderUtilitiesProps) {
  // Calculate percentage for positioning
  const valueToPercent = $((value: number): number => {
    // Handle cases where min and max are the same (prevent division by zero)
    return max > min ? ((value - min) / (max - min)) * 100 : 0;
  });

  // Calculate value from percentage
  const percentToValue = $((percent: number): number => {
    let value = min + (percent / 100) * (max - min);

    // Round to nearest step
    if (step > 0) {
      const numSteps = Math.round((value - min) / step);
      value = min + numSteps * step;
    }

    // Constrain to min/max
    value = Math.max(min, Math.min(max, value));

    return value;
  });

  // Format label helper function
  const formatLabel = $((value: number) => {
    if (formatLabel$) {
      // Handle async return - this will be properly resolved when used
      return formatLabel$(value);
    }
    return value.toString();
  });

  // Generate marks
  const generateMarks = $((minVal: number, maxVal: number, count: number) => {
    if (count <= 1) return [];

    const step = (maxVal - minVal) / (count - 1);
    const marks = [];

    for (let i = 0; i < count; i++) {
      const value = minVal + i * step;
      // Handle formatLabel async resolution - it will be properly handled when used
      const label = i === 0 || i === count - 1 ? formatLabel(value) : undefined;
      marks.push({
        value,
        label,
      });
    }

    return marks;
  });

  return {
    valueToPercent,
    percentToValue,
    formatLabel,
    generateMarks,
  };
}
