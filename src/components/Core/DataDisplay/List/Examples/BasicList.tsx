import { component$ } from "@builder.io/qwik";
import {
  List,
  ListItem,
  UnorderedList,
  OrderedList,
} from "~/components/Core/DataDisplay/List";

export const BasicList = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Unordered List</h3>
        <UnorderedList>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
          <ListItem>Fourth item</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Ordered List</h3>
        <OrderedList>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
          <ListItem>Fourth item</ListItem>
        </OrderedList>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Generic List Component</h3>
        <List variant="unordered">
          <ListItem>This is a list using the generic List component</ListItem>
          <ListItem>
            You can specify whether it's an ordered or unordered list
          </ListItem>
          <ListItem>This gives you more flexibility for custom lists</ListItem>
        </List>
      </div>
    </div>
  );
});
