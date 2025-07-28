import { component$ } from "@builder.io/qwik";
import { Stack } from "~/components/Core/Layout/Stack";
import { Box } from "~/components/Core/Layout/Box";

export const StackDividers = component$(() => {
  return (
    <>
      <div class="space-y-8">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Vertical stack with dividers
          </p>
          <Stack dividers={true} spacing="md">
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 1
            </Box>
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 2
            </Box>
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 3
            </Box>
          </Stack>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Horizontal stack with dividers
          </p>
          <Stack direction="row" dividers={true} spacing="md">
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 1
            </Box>
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 2
            </Box>
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 3
            </Box>
          </Stack>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Dividers with primary color
          </p>
          <Stack dividers={true} dividerColor="primary" spacing="md">
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 1
            </Box>
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 2
            </Box>
            <Box
              padding="md"
              backgroundColor="surface"
              borderRadius="md"
              class="dark:bg-gray-700"
            >
              Item 3
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
});

export default StackDividers;
