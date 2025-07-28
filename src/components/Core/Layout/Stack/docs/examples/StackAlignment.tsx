import { component$ } from "@builder.io/qwik";
import { Stack } from "~/components/Core/Layout/Stack";
import { Box } from "~/components/Core/Layout/Box";

export const StackAlignment = component$(() => {
  return (
    <>
      <div class="space-y-8">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Horizontal stack with vertical alignment (align="start")
          </p>
          <div class="h-24 rounded bg-gray-100 dark:bg-gray-700">
            <Stack direction="row" spacing="md" align="start">
              <Box
                padding="sm"
                backgroundColor="primary"
                borderRadius="md"
                class="text-white"
              >
                Start
              </Box>
              <Box
                padding="sm"
                backgroundColor="primary"
                borderRadius="md"
                class="text-white"
              >
                Aligned
              </Box>
              <Box
                padding="sm"
                backgroundColor="primary"
                borderRadius="md"
                class="text-white"
              >
                Items
              </Box>
            </Stack>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Horizontal stack with vertical alignment (align="center")
          </p>
          <div class="h-24 rounded bg-gray-100 dark:bg-gray-700">
            <Stack direction="row" spacing="md" align="center">
              <Box
                padding="sm"
                backgroundColor="secondary"
                borderRadius="md"
                class="text-white"
              >
                Center
              </Box>
              <Box
                padding="sm"
                backgroundColor="secondary"
                borderRadius="md"
                class="text-white"
              >
                Aligned
              </Box>
              <Box
                padding="sm"
                backgroundColor="secondary"
                borderRadius="md"
                class="text-white"
              >
                Items
              </Box>
            </Stack>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Horizontal stack with vertical alignment (align="end")
          </p>
          <div class="h-24 rounded bg-gray-100 dark:bg-gray-700">
            <Stack direction="row" spacing="md" align="end">
              <Box
                padding="sm"
                backgroundColor="primary"
                borderRadius="md"
                class="text-white"
              >
                End
              </Box>
              <Box
                padding="sm"
                backgroundColor="primary"
                borderRadius="md"
                class="text-white"
              >
                Aligned
              </Box>
              <Box
                padding="sm"
                backgroundColor="primary"
                borderRadius="md"
                class="text-white"
              >
                Items
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
});

export default StackAlignment;
