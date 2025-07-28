import { component$ } from "@builder.io/qwik";
import { Stack } from "~/components/Core/Layout/Stack";
import { Box } from "~/components/Core/Layout/Box";

export const StackDirection = component$(() => {
  return (
    <>
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Vertical Stack (column direction)
          </p>
          <Stack direction="column" spacing="md">
            <Box
              padding="sm"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Item 1
            </Box>
            <Box
              padding="sm"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Item 2
            </Box>
            <Box
              padding="sm"
              backgroundColor="primary"
              borderRadius="md"
              class="text-white"
            >
              Item 3
            </Box>
          </Stack>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Horizontal Stack (row direction)
          </p>
          <Stack direction="row" spacing="md">
            <Box
              padding="sm"
              backgroundColor="secondary"
              borderRadius="md"
              class="text-white"
            >
              Item 1
            </Box>
            <Box
              padding="sm"
              backgroundColor="secondary"
              borderRadius="md"
              class="text-white"
            >
              Item 2
            </Box>
            <Box
              padding="sm"
              backgroundColor="secondary"
              borderRadius="md"
              class="text-white"
            >
              Item 3
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
});

export default StackDirection;
