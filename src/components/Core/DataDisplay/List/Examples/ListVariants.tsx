import { component$ } from "@builder.io/qwik";
import { UnorderedList, ListItem } from "~/components/Core/DataDisplay/List";

export const ListVariants = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Marker Types</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-1 text-xs font-medium">Disc (Default)</h4>
            <UnorderedList marker="disc">
              <ListItem>Disc marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">Circle</h4>
            <UnorderedList marker="circle">
              <ListItem>Circle marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">Square</h4>
            <UnorderedList marker="square">
              <ListItem>Square marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">None</h4>
            <UnorderedList marker="none">
              <ListItem>No marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">List Sizes</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h4 class="mb-1 text-xs font-medium">Small</h4>
            <UnorderedList size="sm">
              <ListItem>Small size item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">Medium (Default)</h4>
            <UnorderedList size="md">
              <ListItem>Medium size item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">Large</h4>
            <UnorderedList size="lg">
              <ListItem>Large size item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">List Spacing</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h4 class="mb-1 text-xs font-medium">Compact</h4>
            <UnorderedList spacing="compact">
              <ListItem>Compact spacing item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">Normal (Default)</h4>
            <UnorderedList spacing="normal">
              <ListItem>Normal spacing item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>

          <div>
            <h4 class="mb-1 text-xs font-medium">Relaxed</h4>
            <UnorderedList spacing="relaxed">
              <ListItem>Relaxed spacing item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
        </div>
      </div>
    </div>
  );
});
