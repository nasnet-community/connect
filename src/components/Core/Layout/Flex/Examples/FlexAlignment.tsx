import { component$ } from "@builder.io/qwik";
import { Flex } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Justify Content Options</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              justify="start" (Default)
            </p>
            <Flex
              justify="start"
              gap="md"
              class="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              justify="center"
            </p>
            <Flex
              justify="center"
              gap="md"
              class="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              justify="end"
            </p>
            <Flex
              justify="end"
              gap="md"
              class="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              justify="between"
            </p>
            <Flex
              justify="between"
              class="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              justify="around"
            </p>
            <Flex
              justify="around"
              class="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              justify="evenly"
            </p>
            <Flex
              justify="evenly"
              class="rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Align Items Options</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              align="stretch" (Default)
            </p>
            <Flex
              align="stretch"
              gap="md"
              class="h-32 rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              align="start"
            </p>
            <Flex
              align="start"
              gap="md"
              class="h-32 rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              align="center"
            </p>
            <Flex
              align="center"
              gap="md"
              class="h-32 rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              align="end"
            </p>
            <Flex
              align="end"
              gap="md"
              class="h-32 rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 1</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 2</div>
              <div class="rounded bg-blue-100 p-4 dark:bg-blue-800">Item 3</div>
            </Flex>
          </div>

          <div>
            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
              align="baseline"
            </p>
            <Flex
              align="baseline"
              gap="md"
              class="h-32 rounded-md bg-gray-100 p-4 dark:bg-gray-800"
            >
              <div class="rounded bg-blue-100 p-4 text-sm dark:bg-blue-800">
                Small
              </div>
              <div class="rounded bg-blue-100 p-4 text-xl dark:bg-blue-800">
                Medium
              </div>
              <div class="rounded bg-blue-100 p-4 text-3xl dark:bg-blue-800">
                Large
              </div>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
});
