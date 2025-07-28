import { component$ } from "@builder.io/qwik";
import type { SkeletonAvatarProps } from "./Skeleton.types";
import { Skeleton } from "./Skeleton";

/**
 * SkeletonAvatar component for displaying avatar placeholders
 */
export const SkeletonAvatar = component$<SkeletonAvatarProps>((props) => {
  const {
    size = "md",
    shape = "circle",
    animation = "pulse",
    class: className = "",
  } = props;

  // Size mapping
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  };

  const dimension = typeof size === "number" ? size : sizeMap[size];

  // Shape to variant mapping
  const variantMap = {
    circle: "circular",
    square: "rectangular",
    rounded: "rounded",
  } as const;

  return (
    <Skeleton
      variant={variantMap[shape]}
      width={dimension}
      height={dimension}
      animation={animation}
      class={className}
      aria-label="Loading avatar"
    />
  );
});
