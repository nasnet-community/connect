import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Flex Item Order</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Controlling the order of flex items (visual order may differ from DOM
          order)
        </p>
        <div class="flex gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="order-3 rounded bg-red-100 p-4 dark:bg-red-800">
            First in DOM (order-3)
          </div>
          <div class="order-1 rounded bg-green-100 p-4 dark:bg-green-800">
            Second in DOM (order-1)
          </div>
          <div class="order-2 rounded bg-blue-100 p-4 dark:bg-blue-800">
            Third in DOM (order-2)
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Flex Grow</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Items with flex-grow will expand to fill available space
        </p>
        <div class="flex gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">
            Fixed width
          </div>
          <div class="flex-grow rounded bg-blue-100 p-4 dark:bg-blue-800">
            Grow = 1 (will expand)
          </div>
          <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">
            Fixed width
          </div>
        </div>

        <p class="mb-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
          Multiple items with different grow values
        </p>
        <div class="flex gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="flex-grow rounded bg-blue-100 p-4 dark:bg-blue-800">
            Grow = 1
          </div>
          <div class="flex-grow-2 rounded bg-green-100 p-4 dark:bg-green-800">
            Grow = 2 (takes more space)
          </div>
          <div class="flex-grow-0 rounded bg-red-100 p-4 dark:bg-red-800">
            Grow = 0 (won't expand)
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Flex Shrink</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Controls how items shrink when there's not enough space
        </p>
        <div class="flex w-full overflow-hidden rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="min-w-[150px] flex-shrink rounded bg-blue-100 p-4 dark:bg-blue-800">
            Shrink = 1
          </div>
          <div class="min-w-[150px] flex-shrink-0 rounded bg-green-100 p-4 dark:bg-green-800">
            Shrink = 0 (won't shrink)
          </div>
          <div class="flex-shrink-2 min-w-[150px] rounded bg-red-100 p-4 dark:bg-red-800">
            Shrink = 2 (shrinks more)
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Flex Basis</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Sets the initial size of a flex item before growing or shrinking
        </p>
        <div class="flex gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="flex-basis-1/4 rounded bg-blue-100 p-4 dark:bg-blue-800">
            Basis = 25%
          </div>
          <div class="flex-basis-1/2 rounded bg-green-100 p-4 dark:bg-green-800">
            Basis = 50%
          </div>
          <div class="flex-basis-1/4 rounded bg-red-100 p-4 dark:bg-red-800">
            Basis = 25%
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Align Self</h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Individual alignment that overrides the parent's align-items property
        </p>
        <div class="flex h-40 items-center gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="self-start rounded bg-blue-100 p-4 dark:bg-blue-800">
            Self Start
          </div>
          <div class="rounded bg-green-100 p-4 dark:bg-green-800">
            Parent Alignment (Center)
          </div>
          <div class="self-end rounded bg-red-100 p-4 dark:bg-red-800">
            Self End
          </div>
          <div class="self-stretch rounded bg-purple-100 p-4 dark:bg-purple-800">
            Self Stretch
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Responsive Flex Item Properties
        </h3>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Flex item properties that change at different breakpoints
        </p>
        <div class="flex gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <div class="rounded bg-blue-100 p-4 md:flex-grow lg:order-3 dark:bg-blue-800">
            Base order, grows on md+, order-3 on lg+
          </div>
          <div class="md:flex-grow-2 rounded bg-green-100 p-4 lg:order-1 dark:bg-green-800">
            Base order, grows 2x on md+, order-1 on lg+
          </div>
          <div class="rounded bg-red-100 p-4 md:self-stretch lg:order-2 dark:bg-red-800">
            Base order, stretches on md+, order-2 on lg+
          </div>
        </div>
      </div>
    </div>
  );
});
