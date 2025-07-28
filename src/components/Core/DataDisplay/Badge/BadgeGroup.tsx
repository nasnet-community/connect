import { component$, Slot } from "@builder.io/qwik";
import type { BadgeGroupProps } from "./Badge.types";
import { useBadgeGroup } from "./hooks/useBadgeGroup";

/**
 * BadgeGroup component for grouping multiple badges
 */
export const BadgeGroup = component$<BadgeGroupProps>((props) => {
  const { class: className = "" } = props;

  const { classes } = useBadgeGroup(props, className);

  return (
    <div class={classes}>
      <Slot />
    </div>
  );
});
