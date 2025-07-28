import { useStore } from "@builder.io/qwik";
import type { TimelineProps, TimelinePosition } from "../Timeline.types";

export interface TimelineState {
  position: TimelinePosition;
  itemCount: number;
}

export interface UseTimelineReturn {
  state: TimelineState;
  classes: string;
  getItemPosition: (index: number) => "left" | "right";
}

export function useTimeline(props: TimelineProps): UseTimelineReturn {
  const {
    position = "left",
    orientation = "vertical",
    class: className = "",
  } = props;

  const state = useStore<TimelineState>({
    position,
    itemCount: 0,
  });

  // Build classes based on orientation
  const baseClasses = orientation === "vertical" ? "relative" : "relative flex";

  const classes = [baseClasses, className].filter(Boolean).join(" ");

  // Determine item position based on timeline position setting
  const getItemPosition = (index: number): "left" | "right" => {
    if (position === "alternate") {
      return index % 2 === 0 ? "left" : "right";
    }
    return position;
  };

  return {
    state,
    classes,
    getItemPosition,
  };
}
