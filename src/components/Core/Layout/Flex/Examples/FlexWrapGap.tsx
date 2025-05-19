import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Flex Wrap Options</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">wrap="nowrap" (Default)</p>
            <div class="flex flex-nowrap gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded min-w-[100px]">
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Items will stay in a single line (may overflow)</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">wrap="wrap"</p>
            <div class="flex flex-wrap gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded min-w-[100px]">
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Items will wrap to new lines as needed</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">wrap="wrap-reverse"</p>
            <div class="flex flex-wrap-reverse gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded min-w-[100px]">
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Items wrap but in reverse order</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Gap Spacing Options</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">gap="none"</p>
            <div class="flex flex-wrap gap-0 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">gap="xs" (4px)</p>
            <div class="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">gap="md" (16px)</p>
            <div class="flex flex-wrap gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">gap="xl" (32px)</p>
            <div class="flex flex-wrap gap-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Using columnGap and rowGap</p>
            <div class="flex flex-wrap gap-x-1 gap-y-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="bg-blue-100 dark:bg-blue-800 p-4 rounded min-w-[100px]">
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Small column gap (4px) with large row gap (32px)</p>
          </div>
        </div>
      </div>
    </div>
  );
});
