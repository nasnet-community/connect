import { component$, Slot } from "@builder.io/qwik";
import type { TableRowProps } from "../Table.types";

export const TableRow = component$<TableRowProps>((props) => {
  const {
    selected = false,
    clickable = false,
    onClick$,
    class: className = "",
    ariaLabel,
  } = props;

  const classes = [
    selected ? "bg-blue-50 dark:bg-blue-900/20" : "",
    clickable ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <tr class={classes} onClick$={onClick$} aria-label={ariaLabel}>
      <Slot />
    </tr>
  );
});
