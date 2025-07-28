import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
      <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
      <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
      <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
    </div>
  );
});
