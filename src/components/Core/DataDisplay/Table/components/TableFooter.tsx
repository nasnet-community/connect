import { component$, Slot } from "@builder.io/qwik";
import type { TableFooterProps } from "../Table.types";

export const TableFooter = component$<TableFooterProps>((props) => {
  const { class: className = "" } = props;

  const classes = ["bg-gray-50 dark:bg-gray-800", className]
    .filter(Boolean)
    .join(" ");

  return (
    <tfoot class={classes}>
      <Slot />
    </tfoot>
  );
});
