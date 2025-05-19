import { component$ } from '@builder.io/qwik';
import { List, ListItem } from '../../List';

export default component$(() => {
  return (
    <div class="p-4">
      <h3 class="text-sm font-semibold mb-2">Nested Unordered Lists</h3>
      <List>
        <ListItem>Fruits
          <List nested={true}>
            <ListItem>Apples
              <List nested={true} marker="circle">
                <ListItem>Red Delicious</ListItem>
                <ListItem>Granny Smith</ListItem>
                <ListItem>Honeycrisp</ListItem>
              </List>
            </ListItem>
            <ListItem>Berries
              <List nested={true} marker="circle">
                <ListItem>Strawberries</ListItem>
                <ListItem>Blueberries</ListItem>
                <ListItem>Raspberries</ListItem>
              </List>
            </ListItem>
            <ListItem>Citrus
              <List nested={true} marker="circle">
                <ListItem>Oranges</ListItem>
                <ListItem>Lemons</ListItem>
                <ListItem>Limes</ListItem>
              </List>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>Vegetables
          <List nested={true}>
            <ListItem>Root Vegetables</ListItem>
            <ListItem>Leafy Greens</ListItem>
            <ListItem>Legumes</ListItem>
          </List>
        </ListItem>
      </List>
      
      <h3 class="text-sm font-semibold mt-6 mb-2">Nested Ordered Lists</h3>
      <List variant="ordered">
        <ListItem>Project Setup
          <List variant="ordered" nested={true} marker="alpha">
            <ListItem>Initialize repository</ListItem>
            <ListItem>Create project structure</ListItem>
            <ListItem>Install dependencies</ListItem>
          </List>
        </ListItem>
        <ListItem>Development Steps
          <List variant="ordered" nested={true} marker="alpha">
            <ListItem>Create components
              <List variant="ordered" nested={true} marker="roman">
                <ListItem>Core components</ListItem>
                <ListItem>Layout components</ListItem>
                <ListItem>Page components</ListItem>
              </List>
            </ListItem>
            <ListItem>Write tests</ListItem>
            <ListItem>Implement features</ListItem>
          </List>
        </ListItem>
        <ListItem>Deployment Process</ListItem>
      </List>
    </div>
  );
});
