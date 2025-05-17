import { component$ } from '@builder.io/qwik';
import { Flex } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Direction</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          This example will display as a column on small screens and as a row on medium screens and up
        </p>
        <div class="flex flex-col md:flex-row gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Justify & Align</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          The justification and alignment change at different breakpoints
        </p>
        <div class="flex justify-center md:justify-between lg:justify-end items-center md:items-start lg:items-end gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-32">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span class="block">Small screens: centered horizontally and vertically</span>
          <span class="block">Medium screens: space-between horizontally, aligned to top</span>
          <span class="block">Large screens: aligned to right and bottom</span>
        </p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Wrap & Gap</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          The wrapping behavior and gap size change at different breakpoints
        </p>
        <div class="flex flex-wrap lg:flex-nowrap gap-1 md:gap-4 lg:gap-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded min-w-[100px]">
              Item {i + 1}
            </div>
          ))}
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span class="block">Small screens: wrap with small gaps (4px)</span>
          <span class="block">Medium screens: wrap with medium gaps (16px)</span>
          <span class="block">Large screens: no wrap with large gaps (32px)</span>
        </p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">RTL Support</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          This example demonstrates RTL (Right-to-Left) support with supportRtl prop
        </p>
        <div class="flex gap-4 rtl:flex-row-reverse bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">First</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Second</div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Third</div>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          When viewed in RTL mode, the layout will flip direction appropriately
        </p>
      </div>
    </div>
  );
});
