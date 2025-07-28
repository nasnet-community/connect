import type { DividerProps } from "../Divider.types";

export function useDivider(props: DividerProps) {
  const {
    orientation = "horizontal",
    thickness = "thin",
    variant = "solid",
    color = "default",
    labelPosition = "center",
    spacing = "md",
    label,
  } = props;

  // Generate thickness classes
  const thicknessClasses = {
    "border-t": orientation === "horizontal" && thickness === "thin",
    "border-t-2": orientation === "horizontal" && thickness === "medium",
    "border-t-4": orientation === "horizontal" && thickness === "thick",
    "border-l": orientation === "vertical" && thickness === "thin",
    "border-l-2": orientation === "vertical" && thickness === "medium",
    "border-l-4": orientation === "vertical" && thickness === "thick",
  };

  // Generate variant classes
  const variantClasses = {
    "border-solid": variant === "solid",
    "border-dashed": variant === "dashed",
    "border-dotted": variant === "dotted",
  };

  // Generate color classes
  const colorClasses = {
    "border-gray-200 dark:border-gray-700": color === "default",
    "border-primary": color === "primary",
    "border-secondary": color === "secondary",
    "border-gray-300 dark:border-gray-600": color === "muted",
  };

  // Generate spacing classes
  const spacingClasses = {
    "my-0 mx-0": spacing === "none" && orientation === "horizontal",
    "my-1 mx-0": spacing === "xs" && orientation === "horizontal",
    "my-2 mx-0": spacing === "sm" && orientation === "horizontal",
    "my-4 mx-0": spacing === "md" && orientation === "horizontal",
    "my-6 mx-0": spacing === "lg" && orientation === "horizontal",
    "my-8 mx-0": spacing === "xl" && orientation === "horizontal",

    "mx-0 my-0": spacing === "none" && orientation === "vertical",
    "mx-1 my-0": spacing === "xs" && orientation === "vertical",
    "mx-2 my-0": spacing === "sm" && orientation === "vertical",
    "mx-4 my-0": spacing === "md" && orientation === "vertical",
    "mx-6 my-0": spacing === "lg" && orientation === "vertical",
    "mx-8 my-0": spacing === "xl" && orientation === "vertical",
  };

  // Generate orientation specific classes
  const orientationClasses = {
    "w-full h-0": orientation === "horizontal",
    "h-full w-0 inline-block": orientation === "vertical",
    "aria-orientation-horizontal": orientation === "horizontal",
    "aria-orientation-vertical": orientation === "vertical",
  };

  // Generate label position classes (only for horizontal dividers)
  const labelPositionClasses = {
    "flex items-center": !!label && orientation === "horizontal",
    'before:content-[""] before:flex-grow':
      !!label && orientation === "horizontal",
    'after:content-[""] after:flex-grow':
      !!label && orientation === "horizontal",
    "before:mr-4":
      label &&
      orientation === "horizontal" &&
      (labelPosition === "center" || labelPosition === "end"),
    "after:ml-4":
      label &&
      orientation === "horizontal" &&
      (labelPosition === "center" || labelPosition === "start"),
    "before:mr-0":
      label && orientation === "horizontal" && labelPosition === "start",
    "after:ml-0":
      label && orientation === "horizontal" && labelPosition === "end",
  };

  // Combine all classes
  const allClasses = {
    ...thicknessClasses,
    ...variantClasses,
    ...colorClasses,
    ...spacingClasses,
    ...orientationClasses,
    ...labelPositionClasses,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  // Determine if we need a labeled divider
  const hasLabel = !!label && orientation === "horizontal";

  return {
    combinedClassNames,
    orientation,
    hasLabel,
  };
}
