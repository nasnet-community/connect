import { component$ } from '@builder.io/qwik';
import { Stack } from '~/components/Core/Layout/Stack';
import { Box } from '~/components/Core/Layout/Box';

export const StackJustify = component$(() => {
  return (
    <>
      <div class="space-y-8">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Justify content: start</p>
          <div class="bg-gray-100 dark:bg-gray-700 rounded p-2">
            <Stack direction="row" spacing="md" justify="start">
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">Item 1</Box>
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">Item 2</Box>
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">Item 3</Box>
            </Stack>
          </div>
        </div>
        
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Justify content: center</p>
          <div class="bg-gray-100 dark:bg-gray-700 rounded p-2">
            <Stack direction="row" spacing="md" justify="center">
              <Box padding="sm" backgroundColor="secondary" borderRadius="md" class="text-white">Item 1</Box>
              <Box padding="sm" backgroundColor="secondary" borderRadius="md" class="text-white">Item 2</Box>
              <Box padding="sm" backgroundColor="secondary" borderRadius="md" class="text-white">Item 3</Box>
            </Stack>
          </div>
        </div>
        
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Justify content: end</p>
          <div class="bg-gray-100 dark:bg-gray-700 rounded p-2">
            <Stack direction="row" spacing="md" justify="end">
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">Item 1</Box>
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">Item 2</Box>
              <Box padding="sm" backgroundColor="primary" borderRadius="md" class="text-white">Item 3</Box>
            </Stack>
          </div>
        </div>
        
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Justify content: between</p>
          <div class="bg-gray-100 dark:bg-gray-700 rounded p-2">
            <Stack direction="row" spacing="md" justify="between">
              <Box padding="sm" backgroundColor="secondary" borderRadius="md" class="text-white">Item 1</Box>
              <Box padding="sm" backgroundColor="secondary" borderRadius="md" class="text-white">Item 2</Box>
              <Box padding="sm" backgroundColor="secondary" borderRadius="md" class="text-white">Item 3</Box>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
});

export default StackJustify;
