import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
      <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
      <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
      <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
    </div>
  );
});
