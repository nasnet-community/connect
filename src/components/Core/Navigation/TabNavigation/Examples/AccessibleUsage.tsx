import { component$ } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  return (
    <div class="p-4">
      <TabNavigation 
        ariaLabel="Product information"
        id="accessible-tabs"
      >
        <TabItem 
          label="Description" 
          isActive={true}
          id="desc-tab"
          controls="desc-panel"
        />
        <TabItem 
          label="Specifications" 
          id="specs-tab"
          controls="specs-panel"
        />
        <TabItem 
          label="Reviews" 
          id="reviews-tab"
          controls="reviews-panel"
          count={42}
        />
      </TabNavigation>
      
      <div class="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <div id="desc-panel" role="tabpanel" aria-labelledby="desc-tab">
          <h3 class="text-lg font-medium mb-2">Product Description</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            This tab component demonstrates proper ARIA attributes for accessibility.
            It uses role="tablist" for the container, role="tab" for each tab,
            and establishes the relationship between tabs and panels with id/controls attributes.
          </p>
        </div>
      </div>
    </div>
  );
});
