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
      preventdefault:mousedown
      onTouchStart$={$((e: TouchEvent) => {
        // Convert TouchEvent to MouseEvent for consistent handling
        const touch = e.touches[0];
        const mouseEvent = {
          preventDefault: () => {},
          stopPropagation: () => {},
          clientX: touch.clientX || 0,
          clientY: touch.clientY || 0,
        } as MouseEvent;
        onMouseDown(mouseEvent);
      })}
      preventdefault:touchstart
      data-value={value}
      data-thumb="single"
    />
  );
});
