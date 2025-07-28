import { useSignal, useTask$, $ } from "@builder.io/qwik";
import type { SliderProps } from "../Slider.types";
import { isRangeSlider } from "../Slider.types";

export interface UseSliderStateProps {
  props: SliderProps;
}

export function useSliderState({ props }: UseSliderStateProps) {
  // Extract all necessary values from props at initialization time
  const {
    min = 0,
    max = 100,
    disabled = false,
    readonly = false,
    errorMessage: initialErrorMessage,
    warningMessage: initialWarningMessage,
    successMessage: initialSuccessMessage,
    type,
    value: propValue,
    defaultValue: propDefaultValue,
  } = props;

  // Extract callback functions to avoid serialization issues
  const singleOnChange$ = !isRangeSlider(props) ? props.onChange$ : undefined;
  const rangeOnChange$ = isRangeSlider(props) ? props.onChange$ : undefined;
  const singleOnChangeEnd$ = !isRangeSlider(props)
    ? props.onChangeEnd$
    : undefined;
  const rangeOnChangeEnd$ = isRangeSlider(props)
    ? props.onChangeEnd$
    : undefined;

  // Extract range-specific properties
  const minRange = type === "range" ? props.minRange || 0 : 0;
  const maxRange = type === "range" ? props.maxRange : undefined;
  const isRange = type === "range";

  // Internal signals for slider state
  const trackRef = useSignal<HTMLDivElement>();
  const isDragging = useSignal<boolean>(false);
  const activeThumb = useSignal<"start" | "end" | null>(null);

  // Initialize value signals with fallbacks
  const singleValueInit =
    propValue !== undefined && !isRange
      ? (propValue as number)
      : !isRange && propDefaultValue !== undefined
        ? (propDefaultValue as number)
        : min;

  const rangeStartValueInit =
    isRange && propValue !== undefined
      ? (propValue as [number, number])[0]
      : isRange && propDefaultValue !== undefined
        ? (propDefaultValue as [number, number])[0]
        : min;

  const rangeEndValueInit =
    isRange && propValue !== undefined
      ? (propValue as [number, number])[1]
      : isRange && propDefaultValue !== undefined
        ? (propDefaultValue as [number, number])[1]
        : max;

  // Create signals for state
  const errorMessage = useSignal(initialErrorMessage);
  const warningMessage = useSignal(initialWarningMessage);
  const successMessage = useSignal(initialSuccessMessage);
  const singleValue = useSignal<number>(singleValueInit);
  const startValue = useSignal<number>(rangeStartValueInit);
  const endValue = useSignal<number>(rangeEndValueInit);

  // Compute effective state based on messages
  const effectiveState = useSignal<"default" | "error" | "success" | "warning">(
    initialErrorMessage
      ? "error"
      : initialSuccessMessage
        ? "success"
        : initialWarningMessage
          ? "warning"
          : "default",
  );

  // Update single value with constraints
  const updateSingleValue = $((value: number) => {
    if (disabled || readonly) return;

    const constrainedValue = Math.max(min, Math.min(max, value));
    singleValue.value = constrainedValue;

    // Call onChange$ callback if provided for single slider
    if (singleOnChange$) {
      singleOnChange$(constrainedValue);
    }
  });

  // Update start value with constraints for range slider
  const updateStartValue = $((value: number) => {
    if (disabled || readonly) return;

    const maxEndValue =
      maxRange !== undefined
        ? Math.min(endValue.value, min + maxRange)
        : endValue.value;

    // Ensure start value doesn't exceed end value minus the minimum range
    const constrainedValue = Math.max(
      min,
      Math.min(maxEndValue - minRange, value),
    );
    startValue.value = constrainedValue;

    // Call onChange callback if provided
    if (rangeOnChange$) {
      rangeOnChange$([constrainedValue, endValue.value]);
    }
  });

  // Update end value with constraints for range slider
  const updateEndValue = $((value: number) => {
    if (disabled || readonly) return;

    const minStartValue =
      maxRange !== undefined
        ? Math.max(startValue.value, max - maxRange)
        : startValue.value;

    // Ensure end value doesn't fall below start value plus the minimum range
    const constrainedValue = Math.min(
      max,
      Math.max(minStartValue + minRange, value),
    );
    endValue.value = constrainedValue;

    // Call onChange callback if provided
    if (rangeOnChange$) {
      rangeOnChange$([startValue.value, constrainedValue]);
    }
  });

  // Initialize message-related state
  useTask$(({ track }) => {
    // Track message changes
    const propsErrorMessage = track(() => errorMessage.value);
    const propsWarningMessage = track(() => warningMessage.value);
    const propsSuccessMessage = track(() => successMessage.value);

    // Update effective state whenever messages change
    if (propsErrorMessage) {
      effectiveState.value = "error";
    } else if (propsWarningMessage) {
      effectiveState.value = "warning";
    } else if (propsSuccessMessage) {
      effectiveState.value = "success";
    } else {
      effectiveState.value = "default";
    }
  });

  return {
    trackRef,
    isDragging,
    activeThumb,
    singleValue,
    startValue,
    endValue,
    effectiveState,
    updateSingleValue,
    updateStartValue,
    updateEndValue,
    singleOnChangeEnd$,
    rangeOnChangeEnd$,
    isRange,
  };
}
