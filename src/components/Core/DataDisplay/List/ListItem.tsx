import { component$, Slot } from "@builder.io/qwik";
import type { ListItemProps } from "./List.types";
import { useListItem } from "./hooks/useListItem";

/**
 * ListItem component for list items
 */
export const ListItem = component$<ListItemProps>((props) => {
  const {
    value,
    class: className = "",
    id,
    active = false,
    disabled = false,
  } = props;

  // Use the list item hook
  const { classes } = useListItem({ active, disabled }, className);

  return (
    <li
      class={classes}
      id={id}
      value={value ? parseInt(value) : undefined}
      aria-disabled={disabled ? "true" : undefined}
      aria-current={active ? "true" : undefined}
    >
      <Slot />
    </li>
  );
});
