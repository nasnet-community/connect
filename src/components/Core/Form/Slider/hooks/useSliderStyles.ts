import type { SliderProps } from "../Slider.types";
import { isRangeSlider } from "../Slider.types";

export interface UseSliderStylesProps {
  props: SliderProps;
  isVertical: boolean;
  isDragging: boolean;
  effectiveState: "default" | "error" | "success" | "warning";
  valueToPercent: (value: number) => number;
}

export function useSliderStyles({
  props,
  isVertical,
  isDragging,
  effectiveState,
  valueToPercent,
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
  const getTrackFillStyle = (
    singleValue: number,
    startValue: number,
    endValue: number,
  ) => {
    if (isRangeSlider(props)) {
      const startPercent = valueToPercent(startValue);
      const endPercent = valueToPercent(endValue);

      if (isVertical) {
        return {
          bottom: `${startPercent}%`,
          height: `${endPercent - startPercent}%`,
        };
      }

      return {
        left: `${startPercent}%`,
        width: `${endPercent - startPercent}%`,
      };
    } else {
      const percent = valueToPercent(singleValue);

      if (isVertical) {
        return {
          height: `${percent}%`,
        };
      }

      return {
        width: `${percent}%`,
      };
    }
  };

  const {
    size = "md",
    orientation,
    disabled = false,
    readonly = false,
    containerClass = "",
    trackClass = "",
    thumbClass = "",
    marksClass = "",
  } = props;

  // Size configurations
  const sizeConfig = {
    sm: {
      container: isVertical ? "w-4 h-40" : "h-4 w-full",
      track: isVertical ? "w-1" : "h-1",
      thumb: "w-4 h-4",
      mark: "w-1 h-1",
    },
    md: {
      container: isVertical ? "w-6 h-48" : "h-6 w-full",
      track: isVertical ? "w-1.5" : "h-1.5",
      thumb: "w-5 h-5",
      mark: "w-1.5 h-1.5",
    },
    lg: {
      container: isVertical ? "w-8 h-56" : "h-8 w-full",
      track: isVertical ? "w-2" : "h-2",
      thumb: "w-6 h-6",
      mark: "w-2 h-2",
    },
  }[size];

  // State-specific colors
  const stateColors = {
    default: {
      track: "bg-gray-200 dark:bg-gray-700",
      fill: "bg-primary-500 dark:bg-primary-400",
      thumb:
        "bg-white dark:bg-surface-dark-DEFAULT border-primary-500 dark:border-primary-400",
    },
    error: {
      track: "bg-gray-200 dark:bg-gray-700",
      fill: "bg-error-500 dark:bg-error-400",
      thumb:
        "bg-white dark:bg-surface-dark-DEFAULT border-error-500 dark:border-error-400",
    },
    success: {
      track: "bg-gray-200 dark:bg-gray-700",
      fill: "bg-success-500 dark:bg-success-400",
      thumb:
        "bg-white dark:bg-surface-dark-DEFAULT border-success-500 dark:border-success-400",
    },
    warning: {
      track: "bg-gray-200 dark:bg-gray-700",
      fill: "bg-warning-500 dark:bg-warning-400",
      thumb:
        "bg-white dark:bg-surface-dark-DEFAULT border-warning-500 dark:border-warning-400",
    },
  }[effectiveState];

  // CSS classes for the container
  const containerClasses = [
    "relative flex items-center",
    sizeConfig.container,
    orientation === "vertical" ? "flex-col" : "flex-row",
    disabled
      ? "opacity-60 cursor-not-allowed"
      : readonly
        ? "cursor-default"
        : "cursor-pointer",
    containerClass,
  ]
    .filter(Boolean)
    .join(" ");

  // CSS classes for the track
  const trackClasses = [
    "relative rounded-full transition-colors duration-200",
    sizeConfig.track,
    stateColors.track,
    orientation === "vertical" ? "flex-1" : "w-full",
    disabled ? "cursor-not-allowed" : "",
    trackClass,
  ]
    .filter(Boolean)
    .join(" ");

  // CSS classes for the track fill
  const trackFillClasses = [
    "absolute rounded-full transition-all duration-200",
    stateColors.fill,
    orientation === "vertical" ? "w-full bottom-0" : "h-full left-0",
  ]
    .filter(Boolean)
    .join(" ");

  // CSS classes for the thumb - mobile optimized with larger touch targets
  const thumbClasses = [
    "absolute rounded-full border-2 shadow-md transition-all duration-200 transform -translate-x-1/2",
    sizeConfig.thumb,
    stateColors.thumb,
    orientation === "vertical" ? "-translate-y-1/2" : "-translate-y-1/2",
    disabled
      ? "cursor-not-allowed opacity-60"
      : isDragging
        ? "scale-110 shadow-lg ring-4 ring-primary-500/20 dark:ring-primary-400/20"
        : "hover:scale-105 hover:shadow-lg focus:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20",
    // Larger touch target on mobile
    "touch-manipulation",
    "after:absolute after:inset-0 after:scale-150 after:content-[''] sm:after:scale-125",
    thumbClass,
  ]
    .filter(Boolean)
    .join(" ");

  // CSS classes for the marks
  const markClasses = [
    "absolute rounded-full bg-gray-300 dark:bg-gray-600 transform",
    sizeConfig.mark,
    orientation === "vertical"
      ? "-translate-x-1/2 left-1/2"
      : "-translate-y-1/2 top-1/2",
    disabled ? "opacity-40" : "",
    marksClass,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    getPositionStyle,
    getTrackFillStyle,
    containerClasses,
    trackClasses,
    trackFillClasses,
    thumbClasses,
    markClasses,
  };
}
