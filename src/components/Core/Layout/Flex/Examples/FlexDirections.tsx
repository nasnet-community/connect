import { component$ } from '@builder.io/qwik';
import { Flex } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Row Direction (Default)</h3>
        <div class="flex flex-row gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Column Direction</h3>
        <div class="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Row Reverse Direction</h3>
        <div class="flex flex-row-reverse gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Column Reverse Direction</h3>
        <div class="flex flex-col-reverse gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
        </div>
      </div>
    </div>
  );
});
