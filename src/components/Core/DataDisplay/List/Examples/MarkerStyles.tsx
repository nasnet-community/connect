import { component$ } from "@builder.io/qwik";
import { List, ListItem } from "~/components/Core/DataDisplay/List";

export const MarkerStyles = component$(() => {
  return (
    <div class="grid grid-cols-1 gap-6 p-4 md:grid-cols-3">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Disc Markers (Default)</h3>
        <List marker="disc">
          <ListItem>Apple</ListItem>
          <ListItem>Banana</ListItem>
          <ListItem>Cherry</ListItem>
          <ListItem>Dragon fruit</ListItem>
        </List>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Circle Markers</h3>
        <List marker="circle">
          <ListItem>HTML</ListItem>
          <ListItem>CSS</ListItem>
          <ListItem>JavaScript</ListItem>
          <ListItem>TypeScript</ListItem>
        </List>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Square Markers</h3>
        <List marker="square">
          <ListItem>North</ListItem>
          <ListItem>East</ListItem>
          <ListItem>South</ListItem>
          <ListItem>West</ListItem>
        </List>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Decimal Markers</h3>
        <List variant="ordered" marker="decimal">
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
          <ListItem>Third step</ListItem>
          <ListItem>Fourth step</ListItem>
        </List>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Roman Numerals</h3>
        <List variant="ordered" marker="roman">
          <ListItem>Chapter One</ListItem>
          <ListItem>Chapter Two</ListItem>
          <ListItem>Chapter Three</ListItem>
          <ListItem>Chapter Four</ListItem>
        </List>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Alphabetical Markers</h3>
        <List variant="ordered" marker="alpha">
          <ListItem>Plan A</ListItem>
          <ListItem>Plan B</ListItem>
          <ListItem>Plan C</ListItem>
          <ListItem>Plan D</ListItem>
        </List>
      </div>
    </div>
  );
});
