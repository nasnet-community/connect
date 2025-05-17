import { component$ } from '@builder.io/qwik';
import { Flex } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Flex Item Order</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Controlling the order of flex items (visual order may differ from DOM order)
        </p>
        <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-red-100 dark:bg-red-800 p-4 rounded order-3">
            First in DOM (order-3)
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-4 rounded order-1">
            Second in DOM (order-1)
          </div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded order-2">
            Third in DOM (order-2)
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Flex Grow</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Items with flex-grow will expand to fill available space
        </p>
        <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">
            Fixed width
          </div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded flex-grow">
            Grow = 1 (will expand)
          </div>
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">
            Fixed width
          </div>
        </div>
        
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-3 mb-2">
          Multiple items with different grow values
        </p>
        <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded flex-grow">
            Grow = 1
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-4 rounded flex-grow-2">
            Grow = 2 (takes more space)
          </div>
          <div class="bg-red-100 dark:bg-red-800 p-4 rounded flex-grow-0">
            Grow = 0 (won't expand)
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Flex Shrink</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Controls how items shrink when there's not enough space
        </p>
        <div class="flex bg-gray-100 dark:bg-gray-800 p-4 rounded-md w-full overflow-hidden">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded min-w-[150px] flex-shrink">
            Shrink = 1
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-4 rounded min-w-[150px] flex-shrink-0">
            Shrink = 0 (won't shrink)
          </div>
          <div class="bg-red-100 dark:bg-red-800 p-4 rounded min-w-[150px] flex-shrink-2">
            Shrink = 2 (shrinks more)
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Flex Basis</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Sets the initial size of a flex item before growing or shrinking
        </p>
        <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded flex-basis-1/4">
            Basis = 25%
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-4 rounded flex-basis-1/2">
            Basis = 50%
          </div>
          <div class="bg-red-100 dark:bg-red-800 p-4 rounded flex-basis-1/4">
            Basis = 25%
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Self</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Individual alignment that overrides the parent's align-items property
        </p>
        <div class="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-40">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded self-start">
            Self Start
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-4 rounded">
            Parent Alignment (Center)
          </div>
          <div class="bg-red-100 dark:bg-red-800 p-4 rounded self-end">
            Self End
          </div>
          <div class="bg-purple-100 dark:bg-purple-800 p-4 rounded self-stretch">
            Self Stretch
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Flex Item Properties</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Flex item properties that change at different breakpoints
        </p>
        <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded md:flex-grow lg:order-3">
            Base order, grows on md+, order-3 on lg+
          </div>
          <div class="bg-green-100 dark:bg-green-800 p-4 rounded md:flex-grow-2 lg:order-1">
            Base order, grows 2x on md+, order-1 on lg+
          </div>
          <div class="bg-red-100 dark:bg-red-800 p-4 rounded md:self-stretch lg:order-2">
            Base order, stretches on md+, order-2 on lg+
          </div>
        </div>
      </div>
    </div>
  );
});
