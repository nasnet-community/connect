import type { SliderProps } from "../Slider.types";
import { isRangeSlider } from "../Slider.types";

export interface UseSliderStylesProps {
  props: SliderProps;
  isVertical: boolean;
  isDragging: boolean;
  effectiveState: 'default' | 'error' | 'success' | 'warning';
  valueToPercent: (value: number) => number;
}

export function useSliderStyles({
  props,
  isVertical,
  isDragging,
  effectiveState,
  valueToPercent
}: UseSliderStylesProps) {
  // For horizontal orientation: left = 0%, right = 100%
  // For vertical orientation: bottom = 0%, top = 100%
  const getPositionStyle = (percent: number) => {
    if (isVertical) {
      return { bottom: `${percent}%` };
    }
    return { left: `${percent}%` };
  };
  
  // Track fill width for single slider or track segment for range slider
  const getTrackFillStyle = (singleValue: number, startValue: number, endValue: number) => {
    if (isRangeSlider(props)) {
      const startPercent = valueToPercent(startValue);
      const endPercent = valueToPercent(endValue);
      
      if (isVertical) {
        return {
          bottom: `${startPercent}%`,
          height: `${endPercent - startPercent}%`
        };
      }
      
      return {
        left: `${startPercent}%`,
        width: `${endPercent - startPercent}%`
      };
    } else {
      const percent = valueToPercent(singleValue);
      
      if (isVertical) {
        return {
          height: `${percent}%`
        };
      }
      
      return {
        width: `${percent}%`
      };
    }
  };

  const {
    size = 'md',
    variant = 'default',
    orientation,
    disabled = false,
    readonly = false,
    containerClass = '',
    trackClass = '',
    thumbClass = '',
    marksClass = ''
  } = props;

  // CSS classes for the container
  const containerClasses = [
    'slider',
    `slider-${size}`,
    `slider-${variant}`,
    `slider-${orientation}`,
    disabled ? 'slider-disabled' : '',
    readonly ? 'slider-readonly' : '',
    `slider-state-${effectiveState}`,
    containerClass
  ].filter(Boolean).join(' ');
  
  // CSS classes for the track
  const trackClasses = [
    'slider-track',
    `slider-track-${orientation}`,
    `slider-track-${variant}`,
    disabled ? 'slider-track-disabled' : '',
    trackClass
  ].filter(Boolean).join(' ');
  
  // CSS classes for the track fill
  const trackFillClasses = [
    'slider-track-fill',
    `slider-track-fill-${orientation}`,
    `slider-track-fill-${variant}`,
    `slider-track-fill-${effectiveState}`,
    disabled ? 'slider-track-fill-disabled' : ''
  ].filter(Boolean).join(' ');
  
  // CSS classes for the thumb
  const thumbClasses = [
    'slider-thumb',
    `slider-thumb-${size}`,
    `slider-thumb-${variant}`,
    `slider-thumb-${effectiveState}`,
    isDragging ? 'slider-thumb-active' : '',
    disabled ? 'slider-thumb-disabled' : '',
    thumbClass
  ].filter(Boolean).join(' ');
  
  // CSS classes for the marks
  const markClasses = [
    'slider-mark',
    `slider-mark-${orientation}`,
    `slider-mark-${size}`,
    disabled ? 'slider-mark-disabled' : '',
    marksClass
  ].filter(Boolean).join(' ');

  return {
    getPositionStyle,
    getTrackFillStyle,
    containerClasses,
    trackClasses,
    trackFillClasses,
    thumbClasses,
    markClasses
  };
} 