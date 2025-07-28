import { $, component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface RangeThumbProps {
  value: number;
  thumbType: "start" | "end";
  minValue: number;
  maxValue: number;
  constraints: {
    min: number;
    max: number;
  };
  minRange?: number;
  disabled?: boolean;
  readonly?: boolean;
  thumbClass: string;
  positionStyle: { [key: string]: string };
  onMouseDown: QRL<(e: MouseEvent, thumb: "start" | "end") => void>;
  onKeyDown: QRL<(e: KeyboardEvent, thumb: "start" | "end") => void>;
  label?: string;
  valueText?: string; // Pre-resolved value text
}

export const RangeThumb = component$((props: RangeThumbProps) => {
  const {
    value,
    thumbType,
    minValue,
    maxValue,
    constraints,
    minRange = 0,
    disabled,
    readonly,
    thumbClass,
    positionStyle,
    onMouseDown,
    onKeyDown,
    label,
    valueText,
  } = props;

  // Calculate min/max based on thumb type and constraints
  const ariaMin = thumbType === "start" ? constraints.min : minValue + minRange;
  const ariaMax = thumbType === "end" ? constraints.max : maxValue;

  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={ariaMin}
      aria-valuemax={ariaMax}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-readonly={readonly}
      aria-label={`${label || "Range"} ${thumbType} value`}
      aria-valuetext={valueText || value.toString()}
      class={`${thumbClass} slider-thumb-${thumbType}`}
      style={positionStyle}
      onMouseDown$={$((e: MouseEvent) => onMouseDown(e, thumbType))}
      onTouchStart$={$((e: TouchEvent) => {
        // Convert TouchEvent to MouseEvent for consistent handling
        if (e.touches[0]) {
          const mouseEvent = {
            preventDefault: () => e.preventDefault(),
            stopPropagation: () => e.stopPropagation(),
            clientX: e.touches[0].clientX || 0,
            clientY: e.touches[0].clientY || 0,
          } as MouseEvent;
          onMouseDown(mouseEvent, thumbType);
        }
      })}
      onKeyDown$={$((e: KeyboardEvent) => onKeyDown(e, thumbType))}
      data-value={value}
      data-thumb={thumbType}
    />
  );
});
