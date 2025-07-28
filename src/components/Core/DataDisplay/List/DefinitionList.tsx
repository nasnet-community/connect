import { component$, Slot } from "@builder.io/qwik";
import type { ListProps } from "./List.types";
import { List } from "./List";

/**
 * DefinitionList convenience component
 */
export const DefinitionList = component$<Omit<ListProps, "variant">>(
  (props) => {
    return (
      <List {...props} variant="definition">
        <Slot />
      </List>
    );
  },
);
