import {
  component$,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { TimelineItemProps } from "./Timeline.types";
import { TimelineContext } from "./Timeline";
import { TimelineDot } from "./TimelineDot";
import { TimelineConnector } from "./TimelineConnector";
import { TimelineContent } from "./TimelineContent";
import { useTimelineItem } from "./hooks/useTimelineItem";

/**
 * TimelineItem component for individual timeline entries
 */
export const TimelineItem = component$<TimelineItemProps>((props) => {
  const {
    dotColor,
    dotVariant,
    dotIcon,
    opposite,
    connectorColor,
    isLast = false,
  } = props;

  const context = useContext(TimelineContext);
  const itemIndex = useSignal(0);

  // Get the position for this item
  const position = context.getItemPosition(itemIndex.value);
  const { containerClasses, contentClasses, oppositeClasses } = useTimelineItem(
    props,
    position,
    context.orientation,
  );

  // Track item index
  useVisibleTask$(() => {
    const parent = document.currentScript?.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      itemIndex.value = siblings.indexOf(document.currentScript as Element);
    }
  });

  return (
    <div class={containerClasses} role="listitem">
      {/* Opposite content (for alternating layouts) */}
      {opposite && context.orientation === "vertical" && (
        <div class={oppositeClasses}>{opposite}</div>
      )}

      {/* Timeline dot and connector */}
      <div
        class={
          context.orientation === "vertical"
            ? "flex flex-col items-center"
            : "flex items-center"
        }
      >
        <TimelineDot color={dotColor} variant={dotVariant} icon={dotIcon} />
        {!isLast && (
          <TimelineConnector
            color={connectorColor}
            orientation={context.orientation}
          />
        )}
      </div>

      {/* Main content */}
      <TimelineContent class={contentClasses}>
        <Slot />
      </TimelineContent>

      {/* Opposite content for horizontal */}
      {opposite && context.orientation === "horizontal" && (
        <div class={oppositeClasses}>{opposite}</div>
      )}
    </div>
  );
});
