import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Row Direction (Default)</h3>
        <div class="flex flex-row gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Column Direction</h3>
        <div class="flex flex-col gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Row Reverse Direction</h3>
        <div class="flex flex-row-reverse gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Column Reverse Direction</h3>
        <div class="flex flex-col-reverse gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
        </div>
      </div>
    </div>
  );
});
