import type { QwikIntrinsicElements, QRL } from "@builder.io/qwik";

export type SliderSize = "sm" | "md" | "lg";
export type SliderVariant = "default" | "filled";
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderMark {
  value: number;
  label?: string;
}

export interface BaseSliderProps
  extends Omit<QwikIntrinsicElements["div"], "onChange$"> {
  id?: string;
  name?: string;
  size?: SliderSize;
  variant?: SliderVariant;
  orientation?: SliderOrientation;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  formatLabel$?: QRL<(value: number) => string>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: SliderMark[];
  markCount?: number;
  showTicks?: boolean;
  tickCount?: number;
  containerClass?: string;
  trackClass?: string;
  thumbClass?: string;
  marksClass?: string;
  labelClass?: string;
  valueClass?: string;
  messageClass?: string;
}

export interface SingleSliderProps extends BaseSliderProps {
  type?: "single";
  value?: number;
  defaultValue?: number;
  onChange$?: QRL<(value: number) => void>;
  onChangeEnd$?: QRL<(value: number) => void>;
}

export interface RangeSliderProps extends BaseSliderProps {
  type: "range";
  value?: [number, number];
  defaultValue?: [number, number];
  minRange?: number;
  maxRange?: number;
  onChange$?: QRL<(values: [number, number]) => void>;
  onChangeEnd$?: QRL<(values: [number, number]) => void>;
}

export type SliderProps = SingleSliderProps | RangeSliderProps;

export function isRangeSlider(props: SliderProps): props is RangeSliderProps {
  return props.type === "range";
}

export function isSingleSlider(props: SliderProps): props is SingleSliderProps {
  return props.type === undefined || props.type === "single";
}
