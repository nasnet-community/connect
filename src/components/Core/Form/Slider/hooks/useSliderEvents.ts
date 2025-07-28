import { $, useVisibleTask$ } from "@builder.io/qwik";
import type { useSliderState } from "./useSliderState";
import type { useSliderUtilities } from "./useSliderUtilities";
import type { SliderProps } from "../Slider.types";

export interface UseSliderEventsProps {
  props: SliderProps;
  state: ReturnType<typeof useSliderState>;
  utilities: ReturnType<typeof useSliderUtilities>;
  orientation: string;
}

export function useSliderEvents({
  props,
  state,
  utilities,
  orientation,
}: UseSliderEventsProps) {
  // Extract required properties to avoid serialization issues
  const disabled = props.disabled || false;
  const readonly = props.readonly || false;
  const min = props.min || 0;
  const max = props.max || 100;
  const step = props.step || 1;

  const {
    trackRef,
    isDragging,
    activeThumb,
    updateSingleValue,
    updateStartValue,
    updateEndValue,
    singleOnChangeEnd$,
    rangeOnChangeEnd$,
    isRange,
  } = state;

  const { percentToValue, valueToPercent } = utilities;

  // Handle track click to update slider values
  const handleTrackClick = $((event: MouseEvent) => {
    if (disabled || readonly) return;

    if (trackRef.value) {
      const rect = trackRef.value.getBoundingClientRect();
      let percent: number = 0;

      if (orientation === "horizontal") {
        percent = ((event.clientX - rect.left) / rect.width) * 100;
      } else {
        // For vertical orientation, invert the percentage (bottom = min, top = max)
        percent = ((rect.bottom - event.clientY) / rect.height) * 100;
      }

      percent = Math.max(0, Math.min(100, percent));

      // Handle async function by using then() to chain
      percentToValue(percent).then((newValue) => {
        if (isRange) {
          // For range slider, determine which thumb to move
          Promise.all([
            valueToPercent(state.startValue.value),
            valueToPercent(state.endValue.value),
          ]).then(([startPercent, endPercent]) => {
            // Move the thumb that's closer to the click point
            const distToStart = Math.abs(percent - startPercent);
            const distToEnd = Math.abs(percent - endPercent);

            if (distToStart < distToEnd) {
              updateStartValue(newValue);
            } else {
              updateEndValue(newValue);
            }
          });
        } else {
          updateSingleValue(newValue);
        }
      });
    }
  });

  // Mouse/touch event handlers for thumb dragging
  const handleThumbMouseDown = $(
    (event: MouseEvent, thumb: "single" | "start" | "end") => {
      if (disabled || readonly) return;

      event.preventDefault();
      event.stopPropagation();

      isDragging.value = true;
      activeThumb.value = thumb === "single" ? null : thumb;
    },
  );

  // Handle mouse movement during drag
  const handleMouseMove = $((event: MouseEvent) => {
    if (!isDragging.value || !trackRef.value) return;

    const rect = trackRef.value.getBoundingClientRect();
    let percent: number = 0;

    if (orientation === "horizontal") {
      percent = ((event.clientX - rect.left) / rect.width) * 100;
    } else {
      // For vertical orientation, invert the percentage
      percent = ((rect.bottom - event.clientY) / rect.height) * 100;
    }

    percent = Math.max(0, Math.min(100, percent));

    // Handle async function using then() to chain actions
    percentToValue(percent).then((newValue) => {
      // Update the appropriate value based on which thumb is active
      if (isRange) {
        if (activeThumb.value === "start") {
          updateStartValue(newValue);
        } else if (activeThumb.value === "end") {
          updateEndValue(newValue);
        }
      } else {
        updateSingleValue(newValue);
      }
    });
  });

  // Handle touch movement during drag
  const handleTouchMove = $((event: TouchEvent) => {
    if (!isDragging.value || !trackRef.value || !event.touches[0]) return;

    event.preventDefault();
    const touch = event.touches[0];
    const rect = trackRef.value.getBoundingClientRect();
    let percent: number = 0;

    if (orientation === "horizontal") {
      percent = ((touch.clientX - rect.left) / rect.width) * 100;
    } else {
      // For vertical orientation, invert the percentage
      percent = ((rect.bottom - touch.clientY) / rect.height) * 100;
    }

    percent = Math.max(0, Math.min(100, percent));

    // Handle async function using then() to chain actions
    percentToValue(percent).then((newValue) => {
      // Update the appropriate value based on which thumb is active
      if (isRange) {
        if (activeThumb.value === "start") {
          updateStartValue(newValue);
        } else if (activeThumb.value === "end") {
          updateEndValue(newValue);
        }
      } else {
        updateSingleValue(newValue);
      }
    });
  });

  // Handle mouse/touch up to end dragging
  const handleMouseUp = $(() => {
    if (!isDragging.value) return;

    isDragging.value = false;
    activeThumb.value = null;

    // Call onChangeEnd$ callback if provided - separate handling for range and single sliders
    if (isRange && rangeOnChangeEnd$) {
      rangeOnChangeEnd$([state.startValue.value, state.endValue.value]);
    } else if (!isRange && singleOnChangeEnd$) {
      singleOnChangeEnd$(state.singleValue.value);
    }
  });

  // Handle keyboard navigation for thumbs
  const handleThumbKeyDown = $(
    (event: KeyboardEvent, thumb: "single" | "start" | "end") => {
      if (disabled || readonly) return;

      const stepSize = event.shiftKey ? step * 10 : step;
      let newValue: number;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          if (thumb === "single") {
            newValue = state.singleValue.value + stepSize;
            updateSingleValue(newValue);
          } else if (thumb === "start") {
            newValue = state.startValue.value + stepSize;
            updateStartValue(newValue);
          } else {
            newValue = state.endValue.value + stepSize;
            updateEndValue(newValue);
          }
          event.preventDefault();
          break;

        case "ArrowLeft":
        case "ArrowDown":
          if (thumb === "single") {
            newValue = state.singleValue.value - stepSize;
            updateSingleValue(newValue);
          } else if (thumb === "start") {
            newValue = state.startValue.value - stepSize;
            updateStartValue(newValue);
          } else {
            newValue = state.endValue.value - stepSize;
            updateEndValue(newValue);
          }
          event.preventDefault();
          break;

        case "Home":
          if (thumb === "single" || thumb === "start") {
            newValue = min;
            if (thumb === "single") {
              updateSingleValue(newValue);
            } else {
              updateStartValue(newValue);
            }
          }
          event.preventDefault();
          break;

        case "End":
          if (thumb === "single" || thumb === "end") {
            newValue = max;
            if (thumb === "single") {
              updateSingleValue(newValue);
            } else {
              updateEndValue(newValue);
            }
          }
          event.preventDefault();
          break;

        case "PageUp":
          if (thumb === "single") {
            newValue = state.singleValue.value + stepSize * 10;
            updateSingleValue(newValue);
          } else if (thumb === "start") {
            newValue = state.startValue.value + stepSize * 10;
            updateStartValue(newValue);
          } else {
            newValue = state.endValue.value + stepSize * 10;
            updateEndValue(newValue);
          }
          event.preventDefault();
          break;

        case "PageDown":
          if (thumb === "single") {
            newValue = state.singleValue.value - stepSize * 10;
            updateSingleValue(newValue);
          } else if (thumb === "start") {
            newValue = state.startValue.value - stepSize * 10;
            updateStartValue(newValue);
          } else {
            newValue = state.endValue.value - stepSize * 10;
            updateEndValue(newValue);
          }
          event.preventDefault();
          break;
      }
    },
  );

  // Set up event listeners
  useVisibleTask$(({ cleanup }) => {
    const documentMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const documentTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const documentMouseUp = () => handleMouseUp();

    document.addEventListener("mousemove", documentMouseMove);
    document.addEventListener("touchmove", documentTouchMove, {
      passive: false,
    });
    document.addEventListener("mouseup", documentMouseUp);
    document.addEventListener("touchend", documentMouseUp);

    cleanup(() => {
      document.removeEventListener("mousemove", documentMouseMove);
      document.removeEventListener("touchmove", documentTouchMove);
      document.removeEventListener("mouseup", documentMouseUp);
      document.removeEventListener("touchend", documentMouseUp);
    });
  });

  return {
    handleTrackClick,
    handleThumbMouseDown,
    handleThumbKeyDown,
  };
}
