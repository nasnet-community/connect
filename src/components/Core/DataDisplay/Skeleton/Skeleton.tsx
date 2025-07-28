import { component$, Slot } from "@builder.io/qwik";
import type { SkeletonProps } from "./Skeleton.types";
import { useSkeleton } from "./hooks/useSkeleton";

/**
 * Skeleton component for displaying loading placeholders
 */
export const Skeleton = component$<SkeletonProps>((props) => {
  const { "aria-label": ariaLabel, children } = props;
  const { classes, styles, responsiveClasses } = useSkeleton(props);

  return (
    <div
      class={`${classes} ${responsiveClasses}`}
      style={styles}
      aria-busy="true"
      aria-label={ariaLabel || "Loading content"}
      role="status"
    >
      <span class="sr-only">Loading...</span>
      {children && <Slot />}
    </div>
  );
});
