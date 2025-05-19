import { component$ } from '@builder.io/qwik';
import { List, ListItem } from '../../List';

export default component$(() => {
  return (
    <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Disc Markers (Default)</h3>
        <List marker="disc">
          <ListItem>Apple</ListItem>
          <ListItem>Banana</ListItem>
          <ListItem>Cherry</ListItem>
          <ListItem>Dragon fruit</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Circle Markers</h3>
        <List marker="circle">
          <ListItem>HTML</ListItem>
          <ListItem>CSS</ListItem>
          <ListItem>JavaScript</ListItem>
          <ListItem>TypeScript</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Square Markers</h3>
        <List marker="square">
          <ListItem>North</ListItem>
          <ListItem>East</ListItem>
          <ListItem>South</ListItem>
          <ListItem>West</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Decimal Markers</h3>
        <List variant="ordered" marker="decimal">
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
          <ListItem>Third step</ListItem>
          <ListItem>Fourth step</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Roman Numerals</h3>
        <List variant="ordered" marker="roman">
          <ListItem>Chapter One</ListItem>
          <ListItem>Chapter Two</ListItem>
          <ListItem>Chapter Three</ListItem>
          <ListItem>Chapter Four</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Alphabetical Markers</h3>
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
