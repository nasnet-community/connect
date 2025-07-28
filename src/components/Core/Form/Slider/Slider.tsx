import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import type { SliderProps, SliderMark } from "./Slider.types";
import { isRangeSlider } from "./Slider.types";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";
import { SingleThumb } from "./components/SingleThumb";
import { RangeThumb } from "./components/RangeThumb";
import { SliderTrack } from "./components/SliderTrack";
import { SliderMarks } from "./components/SliderMarks";
import { SliderTicks } from "./components/SliderTicks";
import { useSliderState } from "./hooks/useSliderState";
import { useSliderUtilities } from "./hooks/useSliderUtilities";
import { useSliderEvents } from "./hooks/useSliderEvents";
import { useSliderStyles } from "./hooks/useSliderStyles";

/**
 * Slider component for selecting numeric values with a draggable thumb.
 * Supports both single value and range selection with customizable appearance.
 */
export const Slider = component$<SliderProps>((props) => {
  // Extract only the props we need for rendering
  const {
    id = `slider-${Math.random().toString(36).substr(2, 9)}`,
    name,
    orientation = "horizontal",
    label,
    helperText,
    errorMessage,
    successMessage,
    warningMessage,
    min = 0,
    max = 100,
    step = 1,
    showValue = false,
    showMarks = false,
    marks,
    markCount = 0,
    showTicks = false,
    tickCount = 0,
    labelClass = "",
    valueClass = "",
    messageClass = "",
    ...rest
  } = props;

  // Filter out properties that would conflict with HTML attributes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange$, onChangeEnd$, type, value, defaultValue, ...htmlProps } =
    rest;

  // Make a copy of the type for checking in useTask$
  const isRangeType = isRangeSlider(props);

  // Initialize the slider state
  const state = useSliderState({ props });

  // Initialize utilities
  const utilities = useSliderUtilities({
    min,
    max,
    step,
    formatLabel$: props.formatLabel$,
  });

  // Get slider events
  const events = useSliderEvents({
    props,
    state,
    utilities,
    orientation,
  });

  // Set up styles
  const isVertical = orientation === "vertical";
  const styles = useSliderStyles({
    props,
    isVertical,
    isDragging: state.isDragging.value,
    effectiveState: state.effectiveState.value,
    valueToPercent: (value: number) =>
      utilities.valueToPercent(value) as unknown as number,
  });

  // Calculate display marks and store pre-calculated percentages
  // to avoid async issues with QRL functions
  const displayMarks = useSignal<SliderMark[]>([]);
  const markPercentages = useSignal<Record<number, number>>({});

  // Pre-calculate tick percentages
  const tickPercentages = useSignal<number[]>([]);

  // Initialize marks and ticks with pre-calculated percentages
  useTask$(async ({ track }) => {
    // Track dependencies that might affect marks
    track(() => showMarks);
    track(() => marks);
    track(() => markCount);
    track(() => min);
    track(() => max);
    track(() => isRangeType);

    // Generate marks if needed
    let finalMarks: SliderMark[] = [];

    if (showMarks) {
      if (marks) {
        finalMarks = marks;
      } else if (markCount > 1) {
        // Generate mark values
        const step = (max - min) / (markCount - 1);
        const tempMarks: SliderMark[] = [];

        for (let i = 0; i < markCount; i++) {
          const value = min + i * step;
          const shouldLabel = i === 0 || i === markCount - 1;

          if (shouldLabel) {
            // Get label and ensure it's a string
            const labelPromise = await utilities.formatLabel(value);
            tempMarks.push({
              value,
              label: labelPromise,
            });
          } else {
            tempMarks.push({ value });
          }
        }

        finalMarks = tempMarks;
      }

      // Pre-calculate percentages for each mark
      const percentages: Record<number, number> = {};
      for (const mark of finalMarks) {
        const percent = await utilities.valueToPercent(mark.value);
        percentages[mark.value] = percent;
      }

      markPercentages.value = percentages;
      displayMarks.value = finalMarks;
    }

    // Generate tick percentages if needed
    if (showTicks && tickCount > 1) {
      const ticks: number[] = [];
      for (let i = 0; i < tickCount; i++) {
        const tickValue = min + (i / (tickCount - 1)) * (max - min);
        const percent = await utilities.valueToPercent(tickValue);
        ticks.push(percent);
      }
      tickPercentages.value = ticks;
    }
  });

  // Calculate formatted values for display
  const singleValueText = useSignal<string>("");
  const startValueText = useSignal<string>("");
  const endValueText = useSignal<string>("");

  useTask$(async ({ track }) => {
    // Track relevant values
    track(() => state.singleValue.value);
    track(() => state.startValue.value);
    track(() => state.endValue.value);
    track(() => isRangeType);

    if (isRangeType) {
      startValueText.value = await utilities.formatLabel(
        state.startValue.value,
      );
      endValueText.value = await utilities.formatLabel(state.endValue.value);
    } else {
      singleValueText.value = await utilities.formatLabel(
        state.singleValue.value,
      );
    }
  });

  // Calculate track fill style
  const trackFillStyle = useSignal<Record<string, string>>({});

  // Pre-calculate thumb positions
  const singleThumbPosition = useSignal<Record<string, string>>({});
  const startThumbPosition = useSignal<Record<string, string>>({});
  const endThumbPosition = useSignal<Record<string, string>>({});

  // Update styles when values change
  useTask$(async ({ track }) => {
    // Track relevant values
    track(() => state.singleValue.value);
    track(() => state.startValue.value);
    track(() => state.endValue.value);
    track(() => isRangeType);
    track(() => isVertical);

    // Pre-calculate positions to avoid async issues
    const singlePercent = await utilities.valueToPercent(
      state.singleValue.value,
    );
    const startPercent = await utilities.valueToPercent(state.startValue.value);
    const endPercent = await utilities.valueToPercent(state.endValue.value);

    // Update track fill style
    if (isRangeType) {
      if (isVertical) {
        trackFillStyle.value = {
          bottom: `${startPercent}%`,
          height: `${endPercent - startPercent}%`,
          left: "0",
          width: "100%",
        };
      } else {
        trackFillStyle.value = {
          left: `${startPercent}%`,
          width: `${endPercent - startPercent}%`,
          bottom: "0",
          height: "100%",
        };
      }
    } else {
      if (isVertical) {
        trackFillStyle.value = {
          height: `${singlePercent}%`,
          bottom: "0",
          left: "0",
          width: "100%",
        };
      } else {
        trackFillStyle.value = {
          width: `${singlePercent}%`,
          left: "0",
          bottom: "0",
          height: "100%",
        };
      }
    }

    // Update thumb positions
    singleThumbPosition.value = isVertical
      ? { bottom: `${singlePercent}%`, left: "0" }
      : { left: `${singlePercent}%`, bottom: "0" };

    startThumbPosition.value = isVertical
      ? { bottom: `${startPercent}%`, left: "0" }
      : { left: `${startPercent}%`, bottom: "0" };

    endThumbPosition.value = isVertical
      ? { bottom: `${endPercent}%`, left: "0" }
      : { left: `${endPercent}%`, bottom: "0" };
  });

  // Create wrapper functions to fix type issues with SingleThumb and RangeThumb components
  const handleSingleThumbMouseDown = $((e: MouseEvent) => {
    events.handleThumbMouseDown(e, "single");
  });

  const handleSingleThumbKeyDown = $((e: KeyboardEvent) => {
    events.handleThumbKeyDown(e, "single");
  });

  const handleSingleThumbTouchStart = $((e: TouchEvent) => {
    // Convert TouchEvent to MouseEvent for consistent handling
    if (e.touches[0]) {
      const mouseEvent = {
        preventDefault: () => e.preventDefault(),
        stopPropagation: () => e.stopPropagation(),
        clientX: e.touches[0].clientX || 0,
        clientY: e.touches[0].clientY || 0,
      } as MouseEvent;
      events.handleThumbMouseDown(mouseEvent, "single");
    }
  });

  const handleStartThumbMouseDown = $((e: MouseEvent) => {
    events.handleThumbMouseDown(e, "start");
  });

  const handleEndThumbMouseDown = $((e: MouseEvent) => {
    events.handleThumbMouseDown(e, "end");
  });

  const handleStartThumbKeyDown = $((e: KeyboardEvent) => {
    events.handleThumbKeyDown(e, "start");
  });

  const handleEndThumbKeyDown = $((e: KeyboardEvent) => {
    events.handleThumbKeyDown(e, "end");
  });

  // Convert style functions to work with markPercentages
  const getPositionStyle = (percent: number): { [key: string]: string } => {
    return isVertical
      ? { bottom: `${percent}%`, left: "0" }
      : { left: `${percent}%`, bottom: "0" };
  };

  return (
    <div class={styles.containerClasses} {...htmlProps}>
      {/* Label */}
      {label && (
        <FormLabel for={id} class={labelClass} required={props.required}>
          {label}
        </FormLabel>
      )}

      {/* Value display */}
      {showValue && (
        <div class={`slider-value ${valueClass}`} aria-hidden="true">
          {isRangeType ? (
            <>
              <span class="slider-value-start">{startValueText.value}</span>
              {" - "}
              <span class="slider-value-end">{endValueText.value}</span>
            </>
          ) : (
            <span>{singleValueText.value}</span>
          )}
        </div>
      )}

      {/* Slider track and thumb(s) */}
      <SliderTrack
        trackRef={state.trackRef}
        trackClasses={styles.trackClasses}
        trackFillClasses={styles.trackFillClasses}
        trackFillStyle={trackFillStyle.value}
        onTrackClick={events.handleTrackClick}
      >
        {/* Marks */}
        {showMarks && displayMarks.value.length > 0 && (
          <SliderMarks
            marks={displayMarks.value}
            markClasses={styles.markClasses}
            getPositionStyle={getPositionStyle}
            valueToPercent={utilities.valueToPercent}
            percentValues={markPercentages.value}
          />
        )}

        {/* Ticks */}
        {showTicks && tickCount > 1 && (
          <SliderTicks
            count={tickCount}
            min={min}
            max={max}
            getPositionStyle={getPositionStyle}
            valueToPercent={utilities.valueToPercent}
            tickPercentages={tickPercentages.value}
          />
        )}

        {/* Thumb(s) */}
        {isRangeType ? (
          <>
            {/* Start thumb */}
            <RangeThumb
              value={state.startValue.value}
              thumbType="start"
              minValue={min}
              maxValue={state.endValue.value}
              constraints={{
                min,
                max:
                  state.endValue.value -
                  (isRangeType ? props.minRange || 0 : 0),
              }}
              minRange={isRangeType ? props.minRange : undefined}
              disabled={props.disabled}
              readonly={props.readonly}
              thumbClass={`${styles.thumbClasses} slider-thumb-start`}
              positionStyle={startThumbPosition.value}
              onMouseDown={handleStartThumbMouseDown}
              onKeyDown={handleStartThumbKeyDown}
              label={label}
              valueText={startValueText.value}
            />

            {/* End thumb */}
            <RangeThumb
              value={state.endValue.value}
              thumbType="end"
              minValue={state.startValue.value}
              maxValue={max}
              constraints={{
                min:
                  state.startValue.value +
                  (isRangeType ? props.minRange || 0 : 0),
                max,
              }}
              minRange={isRangeType ? props.minRange : undefined}
              disabled={props.disabled}
              readonly={props.readonly}
              thumbClass={`${styles.thumbClasses} slider-thumb-end`}
              positionStyle={endThumbPosition.value}
              onMouseDown={handleEndThumbMouseDown}
              onKeyDown={handleEndThumbKeyDown}
              label={label}
              valueText={endValueText.value}
            />
          </>
        ) : (
          // Single thumb
          <SingleThumb
            value={state.singleValue.value}
            min={min}
            max={max}
            disabled={props.disabled}
            readonly={props.readonly}
            thumbClass={styles.thumbClasses}
            positionStyle={singleThumbPosition.value}
            formatLabel={utilities.formatLabel}
            onMouseDown={handleSingleThumbMouseDown}
            onKeyDown={handleSingleThumbKeyDown}
            onTouchStart={handleSingleThumbTouchStart}
            label={label}
            valueText={singleValueText.value}
          />
        )}
      </SliderTrack>

      {/* Hidden input for form submission */}
      {name &&
        (isRangeType ? (
          <>
            <input
              type="hidden"
              id={`${id}-start`}
              name={`${name}-start`}
              value={state.startValue.value}
              disabled={props.disabled}
              required={props.required}
            />
            <input
              type="hidden"
              id={`${id}-end`}
              name={`${name}-end`}
              value={state.endValue.value}
              disabled={props.disabled}
              required={props.required}
            />
          </>
        ) : (
          <input
            type="hidden"
            id={id}
            name={name}
            value={state.singleValue.value}
            disabled={props.disabled}
            required={props.required}
          />
        ))}

      {/* Helper/Error/Success/Warning message */}
      {helperText && !errorMessage && !warningMessage && !successMessage && (
        <FormHelperText class={messageClass}>{helperText}</FormHelperText>
      )}

      {errorMessage && (
        <FormErrorMessage class={messageClass} data-state="error">
          {errorMessage}
        </FormErrorMessage>
      )}

      {!errorMessage && warningMessage && (
        <FormErrorMessage class={messageClass} data-state="warning">
          {warningMessage}
        </FormErrorMessage>
      )}

      {!errorMessage && !warningMessage && successMessage && (
        <FormErrorMessage class={messageClass} data-state="success">
          {successMessage}
        </FormErrorMessage>
      )}
    </div>
  );
});
