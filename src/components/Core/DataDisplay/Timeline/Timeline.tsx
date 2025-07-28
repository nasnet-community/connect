import {
  component$,
  Slot,
  useContextProvider,
  createContextId,
} from "@builder.io/qwik";
import type { TimelineProps } from "./Timeline.types";
import { useTimeline } from "./hooks/useTimeline";

export interface TimelineContextValue {
  position: "left" | "right" | "alternate";
  orientation: "vertical" | "horizontal";
  getItemPosition: (index: number) => "left" | "right";
}

export const TimelineContext =
  createContextId<TimelineContextValue>("timeline-context");

/**
 * Timeline component for displaying chronological events
 */
export const Timeline = component$<TimelineProps>((props) => {
  const { position = "left", orientation = "vertical" } = props;
  const { classes, getItemPosition } = useTimeline(props);

  // Provide context to child components
  useContextProvider(TimelineContext, {
    position,
    orientation,
    getItemPosition,
  });

  return (
    <div class={classes} role="list">
      <Slot />
    </div>
  );
});
