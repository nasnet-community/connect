import { component$, Slot } from "@builder.io/qwik";
import type { TableBodyProps } from "../Table.types";

export const TableBody = component$<TableBodyProps>((props) => {
  const { class: className = "" } = props;

  const classes = ["divide-y divide-gray-200 dark:divide-gray-700", className]
    .filter(Boolean)
    .join(" ");

  return (
    <tbody class={classes}>
      <Slot />
    </tbody>
  );
});
