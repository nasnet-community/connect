import { component$ } from '@builder.io/qwik';
import { UnorderedList, ListItem } from '~/components/Core/DataDisplay/List';

export const ListVariants = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Marker Types</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-xs font-medium mb-1">Disc (Default)</h4>
            <UnorderedList marker="disc">
              <ListItem>Disc marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">Circle</h4>
            <UnorderedList marker="circle">
              <ListItem>Circle marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">Square</h4>
            <UnorderedList marker="square">
              <ListItem>Square marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">None</h4>
            <UnorderedList marker="none">
              <ListItem>No marker item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">List Sizes</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 class="text-xs font-medium mb-1">Small</h4>
            <UnorderedList size="sm">
              <ListItem>Small size item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">Medium (Default)</h4>
            <UnorderedList size="md">
              <ListItem>Medium size item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">Large</h4>
            <UnorderedList size="lg">
              <ListItem>Large size item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">List Spacing</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 class="text-xs font-medium mb-1">Compact</h4>
            <UnorderedList spacing="compact">
              <ListItem>Compact spacing item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">Normal (Default)</h4>
            <UnorderedList spacing="normal">
              <ListItem>Normal spacing item</ListItem>
              <ListItem>Second item</ListItem>
              <ListItem>Third item</ListItem>
            </UnorderedList>
          </div>
          
          <div>
            <h4 class="text-xs font-medium mb-1">Relaxed</h4>
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
