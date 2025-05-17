import { component$ } from '@builder.io/qwik';
import { Divider } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Horizontal Divider (Default)</h3>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <p class="text-gray-700 dark:text-gray-300 mb-4">Content above</p>
          <Divider orientation="horizontal" />
          <p class="text-gray-700 dark:text-gray-300 mt-4">Content below</p>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Vertical Divider</h3>
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded flex items-center h-24">
          <div class="text-gray-700 dark:text-gray-300 pr-4">Left content</div>
          <Divider orientation="vertical" />
          <div class="text-gray-700 dark:text-gray-300 pl-4">Right content</div>
        </div>
      </div>
    </div>
  );
});
