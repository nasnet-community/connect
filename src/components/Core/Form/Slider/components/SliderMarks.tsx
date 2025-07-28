import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { SliderMark } from "../Slider.types";

export interface SliderMarksProps {
  marks: SliderMark[];
  markClasses: string;
  getPositionStyle: (percent: number) => { [key: string]: string };
  valueToPercent: QRL<(value: number) => number>;
  percentValues: Record<number, number>; // Pre-calculated percent values
}

export const SliderMarks = component$((props: SliderMarksProps) => {
  const { marks, markClasses, getPositionStyle, percentValues } = props;

  return (
    <div class="slider-marks">
      {marks.map((mark) => {
        // Use pre-calculated percent values to avoid async issues
        const percent = percentValues[mark.value] || 0;
        return (
          <div
            key={mark.value}
            class={markClasses}
            style={getPositionStyle(percent)}
            aria-hidden="true"
          >
            {mark.label && <span class="slider-mark-label">{mark.label}</span>}
          </div>
        );
      })}
    </div>
  );
});
