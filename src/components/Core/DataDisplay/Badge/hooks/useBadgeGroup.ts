import type { BadgeGroupProps } from "../Badge.types";

export interface UseBadgeGroupReturn {
  badgeGroupClasses: string;
  classes: string;
}

export function useBadgeGroup(
  params: BadgeGroupProps,
  className = "",
): UseBadgeGroupReturn {
  const { spacing = "md", wrap = true, align = "start" } = params;

  // Spacing between badges
  const spacingClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  }[spacing];

  // Alignment classes
  const alignClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  }[align];

  // Combined classes
  const classes = [
    "inline-flex",
    wrap ? "flex-wrap" : "flex-nowrap",
    spacingClasses,
    alignClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    badgeGroupClasses: classes, // Keep for backward compatibility
    classes,
  };
}
