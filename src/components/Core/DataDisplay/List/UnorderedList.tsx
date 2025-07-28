import { component$, Slot } from "@builder.io/qwik";
import type { ListProps } from "./List.types";
import { List } from "./List";

/**
 * UnorderedList convenience component
 */
export const UnorderedList = component$<Omit<ListProps, "variant">>((props) => {
  return (
    <List {...props} variant="unordered">
      <Slot />
    </List>
  );
});
