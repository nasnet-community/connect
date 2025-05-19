import { component$ } from '@builder.io/qwik';
import { List, ListItem } from '../../List';

export default component$(() => {
  return (
    <div class="p-4">
      <h3 class="text-sm font-semibold mb-2">Accessible Unordered List</h3>
      <div class="mb-6">
        <List 
          ariaLabel="Keyboard shortcuts" 
          id="shortcuts-list"
        >
          <ListItem value="Copy: Ctrl+C">Copy: <kbd>Ctrl</kbd>+<kbd>C</kbd></ListItem>
          <ListItem value="Paste: Ctrl+V">Paste: <kbd>Ctrl</kbd>+<kbd>V</kbd></ListItem>
          <ListItem value="Cut: Ctrl+X">Cut: <kbd>Ctrl</kbd>+<kbd>X</kbd></ListItem>
          <ListItem value="Save: Ctrl+S">Save: <kbd>Ctrl</kbd>+<kbd>S</kbd></ListItem>
        </List>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
          This list includes value attributes for improved screen reader
          experience and is labeled with ariaLabel.
        </p>
      </div>
      
      <h3 class="text-sm font-semibold my-4">Accessible Ordered List</h3>
      <div class="mb-6">
        <List 
          variant="ordered" 
          ariaLabel="Installation steps" 
          id="installation-steps"
        >
          <ListItem>
            <div id="step1">
              <strong>Download the package</strong>
              <p>Get the latest version from our website</p>
            </div>
          </ListItem>
          <ListItem>
            <div id="step2">
              <strong>Run the installer</strong>
              <p>Double-click the downloaded file to begin installation</p>
            </div>
          </ListItem>
          <ListItem>
            <div id="step3">
              <strong>Configure settings</strong>
              <p>Adjust the settings according to your preferences</p>
            </div>
          </ListItem>
        </List>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
          This ordered list uses semantic HTML structure with proper headings
          within list items and is properly labeled for screen readers.
        </p>
      </div>
      
      <h3 class="text-sm font-semibold my-4">Accessible Interactive List</h3>
      <div>
        <nav aria-labelledby="nav-heading">
          <h4 id="nav-heading" class="sr-only">Site navigation</h4>
          <List marker="none" class="bg-gray-50 dark:bg-gray-800 rounded overflow-hidden">
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" aria-current="page">
                Home
              </a>
            </ListItem>
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Products
              </a>
            </ListItem>
            <ListItem class="block">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Services
              </a>
            </ListItem>
          </List>
        </nav>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
          This navigation list uses aria-labelledby to associate it with a heading,
          and aria-current to indicate the current page.
        </p>
      </div>
    </div>
  );
});
