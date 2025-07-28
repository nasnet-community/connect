import type { TimelineItemProps } from "../Timeline.types";

export interface UseTimelineItemReturn {
  containerClasses: string;
  contentClasses: string;
  oppositeClasses: string;
}

export function useTimelineItem(
  props: TimelineItemProps,
  position: "left" | "right",
  orientation: "vertical" | "horizontal",
): UseTimelineItemReturn {
  const { class: className = "" } = props;

  // Container classes based on orientation and position
  const containerClasses =
    orientation === "vertical"
      ? [
          "flex",
          position === "right" ? "flex-row-reverse" : "",
          "relative",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      : ["flex flex-col items-center", "relative", className]
          .filter(Boolean)
          .join(" ");

  // Content area classes
  const contentClasses =
    orientation === "vertical"
      ? ["flex-1", position === "right" ? "pl-8 pr-4" : "pr-8 pl-4", "pb-8"]
          .filter(Boolean)
          .join(" ")
      : "pt-4 text-center";

  // Opposite content classes
  const oppositeClasses =
    orientation === "vertical"
      ? [
          "flex-1",
          position === "right" ? "pr-8 pl-4 text-right" : "pl-8 pr-4",
          "pb-8",
        ]
          .filter(Boolean)
          .join(" ")
      : "pb-4 text-center";

  return {
    containerClasses,
    contentClasses,
    oppositeClasses,
  };
}
