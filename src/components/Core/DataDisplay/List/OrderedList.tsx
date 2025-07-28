import { component$, Slot } from "@builder.io/qwik";
import type { ListProps } from "./List.types";
import { List } from "./List";

/**
 * OrderedList convenience component
 */
export const OrderedList = component$<Omit<ListProps, "variant">>((props) => {
  return (
    <List {...props} variant="ordered">
      <Slot />
    </List>
  );
});
