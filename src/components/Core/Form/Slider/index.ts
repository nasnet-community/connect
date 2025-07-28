/**
 * Slider Component
 *
 * The Slider component provides interactive range selectors with support for
 * single value or range selection, marks, ticks, and various styling options.
 */

import { Slider } from "./Slider";
import type {
  SliderProps,
  SingleSliderProps,
  RangeSliderProps,
  SliderSize,
  SliderVariant,
  SliderOrientation,
  SliderMark,
  BaseSliderProps,
} from "./Slider.types";

// Export the component
export { Slider };

// Export types
export type {
  SliderProps,
  SingleSliderProps,
  RangeSliderProps,
  SliderSize,
  SliderVariant,
  SliderOrientation,
  SliderMark,
  BaseSliderProps,
};

// Export hooks
export { useSliderState } from "./hooks/useSliderState";
export { useSliderEvents } from "./hooks/useSliderEvents";
export { useSliderStyles } from "./hooks/useSliderStyles";
export { useSliderUtilities } from "./hooks/useSliderUtilities";

// Export sub-components
export { SingleThumb } from "./components/SingleThumb";
export { RangeThumb } from "./components/RangeThumb";
export { SliderTrack } from "./components/SliderTrack";
export { SliderMarks } from "./components/SliderMarks";
export { SliderTicks } from "./components/SliderTicks";
