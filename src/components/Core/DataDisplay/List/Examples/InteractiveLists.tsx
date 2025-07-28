import { component$ } from "@builder.io/qwik";
import { List, ListItem } from "~/components/Core/DataDisplay/List";

export const InteractiveLists = component$(() => {
  return (
    <div class="p-4">
      <h3 class="mb-2 text-sm font-semibold">
        List with Active and Disabled Items
      </h3>
      <div class="rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <List class="overflow-hidden rounded bg-gray-50 dark:bg-gray-800">
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Regular item
          </ListItem>
          <ListItem
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            active={true}
          >
            Active item
          </ListItem>
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Regular item
          </ListItem>
          <ListItem
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={true}
          >
            Disabled item
          </ListItem>
          <ListItem class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            Regular item
          </ListItem>
        </List>
      </div>

      <h3 class="mb-2 mt-6 text-sm font-semibold">
        Interactive Navigation List
      </h3>
      <div class="rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <nav aria-label="Main navigation">
          <List
            class="overflow-hidden rounded bg-gray-50 dark:bg-gray-800"
            marker="none"
          >
            <ListItem class="block">
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </a>
            </ListItem>
            <ListItem class="block">
              <a
                href="#"
                class="block bg-blue-100 px-4 py-2 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              >
                Products
              </a>
            </ListItem>
            <ListItem class="block">
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Services
              </a>
            </ListItem>
            <ListItem class="block">
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </a>
            </ListItem>
            <ListItem class="block">
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Contact
              </a>
            </ListItem>
          </List>
        </nav>
      </div>
    </div>
  );
});
