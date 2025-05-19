import { component$ } from '@builder.io/qwik';
import { List, ListItem } from '../../List';

export default component$(() => {
  return (
    <div class="p-4">
      <h3 class="text-sm font-semibold mb-2">List with Active and Disabled Items</h3>
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <List class="bg-gray-50 dark:bg-gray-800 rounded overflow-hidden">
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Regular item</ListItem>
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" active={true}>
            Active item
          </ListItem>
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Regular item</ListItem>
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" disabled={true}>
            Disabled item
          </ListItem>
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Regular item</ListItem>
        </List>
      </div>
      
      <h3 class="text-sm font-semibold mt-6 mb-2">Interactive Navigation List</h3>
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <nav aria-label="Main navigation">
          <List class="bg-gray-50 dark:bg-gray-800 rounded overflow-hidden" marker="none">
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
            </ListItem>
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">Products</a>
            </ListItem>
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Services</a>
            </ListItem>
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">About</a>
            </ListItem>
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a>
            </ListItem>
          </List>
        </nav>
      </div>
    </div>
  );
});
