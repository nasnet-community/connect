import { component$, Slot } from "@builder.io/qwik";
import type { TableHeadProps } from "../Table.types";

export const TableHead = component$<TableHeadProps>((props) => {
  const { sticky = false, class: className = "" } = props;

  const classes = [
    "bg-gray-50 dark:bg-gray-800",
    sticky ? "sticky top-0 z-10" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <thead class={classes}>
      <Slot />
    </thead>
  );
});
