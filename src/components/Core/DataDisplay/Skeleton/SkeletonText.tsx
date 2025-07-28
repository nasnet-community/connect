import { component$ } from "@builder.io/qwik";
import type { SkeletonTextProps } from "./Skeleton.types";
import { Skeleton } from "./Skeleton";

/**
 * SkeletonText component for displaying multiple lines of text placeholders
 */
export const SkeletonText = component$<SkeletonTextProps>((props) => {
  const {
    lines = 3,
    lineHeight = 16,
    spacing = "md",
    lastLineWidth = "80%",
    animation = "pulse",
    class: className = "",
  } = props;

  const spacingClasses = {
    sm: "space-y-2",
    md: "space-y-3",
    lg: "space-y-4",
  };

  const containerClasses = [spacingClasses[spacing], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={containerClasses} role="status" aria-label="Loading text">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : "100%"}
          height={lineHeight}
          animation={animation}
        />
      ))}
    </div>
  );
});
