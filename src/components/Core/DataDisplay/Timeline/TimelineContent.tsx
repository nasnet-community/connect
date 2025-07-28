import { component$, Slot } from "@builder.io/qwik";
import type { TimelineContentProps } from "./Timeline.types";

/**
 * TimelineContent component for timeline item content
 */
export const TimelineContent = component$<TimelineContentProps>((props) => {
  const { class: className = "" } = props;

  return (
    <div class={className}>
      <Slot />
    </div>
  );
});
