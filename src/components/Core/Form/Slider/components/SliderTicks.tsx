import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface SliderTicksProps {
  count: number;
  min: number;
  max: number;
  getPositionStyle: (percent: number) => { [key: string]: string };
  valueToPercent: QRL<(value: number) => number>;
  // Pre-calculated tick positions to avoid async issues
  tickPercentages?: number[];
}

export const SliderTicks = component$((props: SliderTicksProps) => {
  const { count, min, max, getPositionStyle, tickPercentages } = props;

  // If we have pre-calculated percentages, use those
  if (tickPercentages && tickPercentages.length > 0) {
    return (
      <div class="slider-ticks">
        {tickPercentages.map((percent, index) => (
          <div
            key={index}
            class="slider-tick"
            style={getPositionStyle(percent)}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  // Otherwise, calculate positions based on count, min, max
  const tickValues: number[] = [];
  for (let i = 0; i < count; i++) {
    tickValues.push(min + (i / (count - 1)) * (max - min));
  }

  return (
    <div class="slider-ticks">
      {tickValues.map((tickValue, index) => {
        // Use a default percentage calculation since we can't use the async function directly
        const percent = ((tickValue - min) / (max - min)) * 100;

        return (
          <div
            key={index}
            class="slider-tick"
            style={getPositionStyle(percent)}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
});
