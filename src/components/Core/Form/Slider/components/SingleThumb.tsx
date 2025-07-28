import { $, component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface SingleThumbProps {
  value: number;
  disabled?: boolean;
  readonly?: boolean;
  thumbClass: string;
  positionStyle: { [key: string]: string };
  formatLabel: QRL<(value: number) => string | Promise<string>>;
  onMouseDown: QRL<(e: MouseEvent) => void>;
  onTouchStart: QRL<(e: TouchEvent) => void>;
  onKeyDown: QRL<(e: KeyboardEvent) => void>;
  label?: string;
  min: number;
  max: number;
  valueText?: string; // Pre-resolved value text
}

export const SingleThumb = component$((props: SingleThumbProps) => {
  const {
    value,
    disabled,
    readonly,
    thumbClass,
    positionStyle,
    onMouseDown,
    onKeyDown,
    label,
    min,
    max,
    valueText,
  } = props;

  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-readonly={readonly}
      aria-label={label || "Slider"}
      aria-valuetext={valueText || value.toString()}
      class={thumbClass}
      style={positionStyle}
      onMouseDown$={onMouseDown}
      onTouchStart$={$((e: TouchEvent) => {
        // Convert TouchEvent to MouseEvent for consistent handling
        if (e.touches[0]) {
          const mouseEvent = {
            preventDefault: () => e.preventDefault(),
            stopPropagation: () => e.stopPropagation(),
            clientX: e.touches[0].clientX || 0,
            clientY: e.touches[0].clientY || 0,
          } as MouseEvent;
          onMouseDown(mouseEvent);
        }
      })}
      onKeyDown$={onKeyDown}
      data-value={value}
      data-thumb="single"
    />
  );
});
