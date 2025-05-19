import { component$ } from '@builder.io/qwik';
import { List, ListItem } from '../../List';

export default component$(() => {
  return (
    <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <List size="sm">
          <ListItem>Smaller text size</ListItem>
          <ListItem>Ideal for dense content</ListItem>
          <ListItem>Uses less vertical space</ListItem>
          <ListItem>Good for sidebars</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <List size="md">
          <ListItem>Standard text size</ListItem>
          <ListItem>Balanced readability</ListItem>
          <ListItem>Default size for most cases</ListItem>
          <ListItem>Works well in content areas</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <List size="lg">
          <ListItem>Larger text size</ListItem>
          <ListItem>Improved readability</ListItem>
          <ListItem>Better for important information</ListItem>
          <ListItem>Good for feature highlights</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Compact Spacing</h3>
        <List spacing="compact">
          <ListItem>Items are closer together</ListItem>
          <ListItem>Minimal vertical spacing</ListItem>
          <ListItem>Efficient use of space</ListItem>
          <ListItem>Good for many items</ListItem>
          <ListItem>Ideal for lists with simple content</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Normal Spacing (Default)</h3>
        <List spacing="normal">
          <ListItem>Standard spacing between items</ListItem>
          <ListItem>Balanced readability</ListItem>
          <ListItem>Default for most use cases</ListItem>
          <ListItem>Good balance of space and density</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Relaxed Spacing</h3>
        <List spacing="relaxed">
          <ListItem>More space between items</ListItem>
          <ListItem>Enhanced readability</ListItem>
          <ListItem>Better visual separation</ListItem>
          <ListItem>Good for complex content</ListItem>
        </List>
      </div>
    </div>
  );
});
