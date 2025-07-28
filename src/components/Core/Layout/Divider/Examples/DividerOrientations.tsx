import { component$ } from "@builder.io/qwik";
import { Divider } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Horizontal Divider (Default)</h3>
        <div class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          <p class="mb-4 text-gray-700 dark:text-gray-300">Content above</p>
          <Divider orientation="horizontal" />
          <p class="mt-4 text-gray-700 dark:text-gray-300">Content below</p>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Vertical Divider</h3>
        <div class="flex h-24 items-center rounded bg-gray-50 p-4 dark:bg-gray-800">
          <div class="pr-4 text-gray-700 dark:text-gray-300">Left content</div>
          <Divider orientation="vertical" />
          <div class="pl-4 text-gray-700 dark:text-gray-300">Right content</div>
        </div>
      </div>
    </div>
  );
});
