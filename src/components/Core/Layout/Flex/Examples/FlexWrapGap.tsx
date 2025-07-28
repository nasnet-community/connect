import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Flex Wrap Options</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              wrap="nowrap" (Default)
            </p>
            <div class="flex flex-nowrap gap-4 overflow-x-auto rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  class="min-w-[100px] rounded bg-blue-100 p-4 dark:bg-blue-800"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Items will stay in a single line (may overflow)
            </p>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              wrap="wrap"
            </p>
            <div class="flex flex-wrap gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  class="min-w-[100px] rounded bg-blue-100 p-4 dark:bg-blue-800"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Items will wrap to new lines as needed
            </p>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              wrap="wrap-reverse"
            </p>
            <div class="flex flex-wrap-reverse gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  class="min-w-[100px] rounded bg-blue-100 p-4 dark:bg-blue-800"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Items wrap but in reverse order
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Gap Spacing Options</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              gap="none"
            </p>
            <div class="flex flex-wrap gap-0 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="rounded bg-blue-100 p-4 dark:bg-blue-800">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              gap="xs" (4px)
            </p>
            <div class="flex flex-wrap gap-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="rounded bg-blue-100 p-4 dark:bg-blue-800">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              gap="md" (16px)
            </p>
            <div class="flex flex-wrap gap-4 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="rounded bg-blue-100 p-4 dark:bg-blue-800">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              gap="xl" (32px)
            </p>
            <div class="flex flex-wrap gap-8 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} class="rounded bg-blue-100 p-4 dark:bg-blue-800">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              Using columnGap and rowGap
            </p>
            <div class="flex flex-wrap gap-x-1 gap-y-8 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
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
              Small column gap (4px) with large row gap (32px)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
