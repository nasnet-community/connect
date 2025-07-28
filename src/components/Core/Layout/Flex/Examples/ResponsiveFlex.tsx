import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Responsive Direction</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          This example will display as a column on small screens and as a row on
          medium screens and up
        </p>
        <div class="flex flex-col gap-4 rounded-md bg-gray-100 p-4 md:flex-row dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Responsive Justify & Align</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          The justification and alignment change at different breakpoints
        </p>
        <div class="flex h-32 items-center justify-center gap-4 rounded-md bg-gray-100 p-4 md:items-start md:justify-between lg:items-end lg:justify-end dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
        </div>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span class="block">
            Small screens: centered horizontally and vertically
          </span>
          <span class="block">
            Medium screens: space-between horizontally, aligned to top
          </span>
          <span class="block">Large screens: aligned to right and bottom</span>
        </p>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Responsive Wrap & Gap</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          The wrapping behavior and gap size change at different breakpoints
        </p>
        <div class="flex flex-wrap gap-1 rounded-md bg-gray-100 p-4 md:gap-4 lg:flex-nowrap lg:gap-8 dark:bg-gray-800">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              class="min-w-[100px] rounded bg-blue-100 p-4 dark:bg-blue-800"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span class="block">Small screens: wrap with small gaps (4px)</span>
          <span class="block">
            Medium screens: wrap with medium gaps (16px)
          </span>
          <span class="block">
            Large screens: no wrap with large gaps (32px)
          </span>
        </p>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">RTL Support</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          This example demonstrates RTL (Right-to-Left) support with supportRtl
          prop
        </p>
        <div class="flex gap-4 rounded-md bg-gray-100 p-4 rtl:flex-row-reverse dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">First</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Second</div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Third</div>
        </div>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          When viewed in RTL mode, the layout will flip direction appropriately
        </p>
      </div>
    </div>
  );
});
