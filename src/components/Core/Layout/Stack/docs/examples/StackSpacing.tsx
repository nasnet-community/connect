import { component$ } from "@builder.io/qwik";
import { Stack } from "~/components/Core/Layout/Stack";
import { Box } from "~/components/Core/Layout/Box";

export const StackSpacing = component$(() => {
  return (
    <>
      <div class="space-y-8">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Small spacing (sm)
          </p>
          <Stack spacing="sm">
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
            Medium spacing (md)
          </p>
          <Stack spacing="md">
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
            Large spacing (lg)
          </p>
          <Stack spacing="lg">
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
      </div>
    </>
  );
});

export default StackSpacing;
