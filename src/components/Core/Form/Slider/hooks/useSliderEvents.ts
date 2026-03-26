import { $, useTask$ } from "@builder.io/qwik";
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

  // Set up event listeners
  useTask$(({ track, cleanup }) => {
    if (typeof document === "undefined") {
      return;
    }

    track(() => trackRef.value);

    const documentMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const documentTouchMove = (event: TouchEvent) => {
      if (!isDragging.value || !trackRef.value) return;

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

      percentToValue(percent).then((newValue) => {
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
    };
    const documentMouseUp = () => handleMouseUp();
    const sliderRoot = trackRef.value?.closest<HTMLElement>(
      '[data-slider-root="true"]',
    );
    const thumbKeyHandlers = new Map<
      HTMLElement,
      (event: KeyboardEvent) => void
    >();

    const updateThumbValue = (
      thumb: "single" | "start" | "end",
      value: number,
    ) => {
      if (thumb === "single") {
        void updateSingleValue(value);
      } else if (thumb === "start") {
        void updateStartValue(value);
      } else {
        void updateEndValue(value);
      }
    };

    const createThumbKeyHandler = (thumb: "single" | "start" | "end") => {
      return (event: KeyboardEvent) => {
        if (disabled || readonly) return;

        const stepSize = event.shiftKey ? step * 10 : step;
        let newValue: number | null = null;

        switch (event.key) {
          case "ArrowRight":
          case "ArrowUp":
            newValue =
              thumb === "single"
                ? state.singleValue.value + stepSize
                : thumb === "start"
                  ? state.startValue.value + stepSize
                  : state.endValue.value + stepSize;
            break;

          case "ArrowLeft":
          case "ArrowDown":
            newValue =
              thumb === "single"
                ? state.singleValue.value - stepSize
                : thumb === "start"
                  ? state.startValue.value - stepSize
                  : state.endValue.value - stepSize;
            break;

          case "Home":
            if (thumb === "single" || thumb === "start") {
              newValue = min;
            }
            break;

          case "End":
            if (thumb === "single" || thumb === "end") {
              newValue = max;
            }
            break;

          case "PageUp":
            newValue =
              thumb === "single"
                ? state.singleValue.value + stepSize * 10
                : thumb === "start"
                  ? state.startValue.value + stepSize * 10
                  : state.endValue.value + stepSize * 10;
            break;

          case "PageDown":
            newValue =
              thumb === "single"
                ? state.singleValue.value - stepSize * 10
                : thumb === "start"
                  ? state.startValue.value - stepSize * 10
                  : state.endValue.value - stepSize * 10;
            break;
        }

        if (newValue === null) return;

        event.preventDefault();
        updateThumbValue(thumb, newValue);
      };
    };

    sliderRoot
      ?.querySelectorAll<HTMLElement>("[data-thumb]")
      .forEach((thumbElement) => {
        const thumbType = thumbElement.dataset.thumb as
          | "single"
          | "start"
          | "end"
          | undefined;

        if (!thumbType) return;

        const handler = createThumbKeyHandler(thumbType);
        thumbKeyHandlers.set(thumbElement, handler);
        thumbElement.addEventListener("keydown", handler);
      });

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
      thumbKeyHandlers.forEach((handler, thumbElement) => {
        thumbElement.removeEventListener("keydown", handler);
      });
    });
  });

  return {
    handleTrackClick,
    handleThumbMouseDown,
  };
}
