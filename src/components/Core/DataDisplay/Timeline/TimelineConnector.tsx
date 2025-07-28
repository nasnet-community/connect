import { component$ } from "@builder.io/qwik";
import type { TimelineConnectorProps } from "./Timeline.types";

/**
 * TimelineConnector component for connecting timeline items
 */
export const TimelineConnector = component$<TimelineConnectorProps>((props) => {
  const {
    color = "gray",
    orientation = "vertical",
    class: className = "",
  } = props;

  // Color classes
  const colorClasses = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    gray: "bg-gray-300 dark:bg-gray-600",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-cyan-500",
  };

  const bgColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;

  const classes =
    orientation === "vertical"
      ? ["w-0.5", "flex-1", "min-h-[2rem]", bgColor, className]
          .filter(Boolean)
          .join(" ")
      : ["h-0.5", "flex-1", "min-w-[2rem]", bgColor, className]
          .filter(Boolean)
          .join(" ");

  return <div class={classes} />;
});
