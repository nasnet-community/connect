import { component$ } from "@builder.io/qwik";
import type { TimelineDotProps } from "./Timeline.types";

/**
 * TimelineDot component for timeline event indicators
 */
export const TimelineDot = component$<TimelineDotProps>((props) => {
  const {
    color = "primary",
    variant = "filled",
    icon,
    size = "md",
    class: className = "",
  } = props;

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  // Color classes based on variant
  const colorClasses = {
    filled: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      error: "bg-red-500 text-white",
      info: "bg-cyan-500 text-white",
    },
    outlined: {
      primary:
        "border-2 border-blue-500 text-blue-500 bg-white dark:bg-gray-800",
      secondary:
        "border-2 border-gray-500 text-gray-500 bg-white dark:bg-gray-800",
      success:
        "border-2 border-green-500 text-green-500 bg-white dark:bg-gray-800",
      warning:
        "border-2 border-yellow-500 text-yellow-500 bg-white dark:bg-gray-800",
      error: "border-2 border-red-500 text-red-500 bg-white dark:bg-gray-800",
      info: "border-2 border-cyan-500 text-cyan-500 bg-white dark:bg-gray-800",
    },
  };

  const variantColors =
    colorClasses[variant][color as keyof typeof colorClasses.filled] ||
    colorClasses[variant].primary;

  const classes = [
    "rounded-full",
    "flex items-center justify-center",
    "z-10",
    sizeClasses[size],
    variantColors,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={classes}>
      {icon || (
        <div
          class={`${size === "sm" ? "h-2 w-2" : size === "md" ? "h-3 w-3" : "h-4 w-4"} rounded-full ${variant === "outlined" ? "bg-current" : "bg-white"}`}
        />
      )}
    </div>
  );
});
