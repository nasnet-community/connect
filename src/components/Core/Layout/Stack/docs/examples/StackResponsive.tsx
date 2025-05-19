import { component$ } from '@builder.io/qwik';
import { Stack } from '~/components/Core/Layout/Stack';
import { Box } from '~/components/Core/Layout/Box';

export const StackResponsive = component$(() => {
  return (
    <>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          This Stack changes from column to row at the md breakpoint
        </p>
        <Stack 
          direction={{
            base: 'column',
            md: 'row'
          }} 
          spacing="md"
        >
          <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
            Item 1
          </Box>
          <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
            Item 2
          </Box>
          <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
            Item 3
          </Box>
        </Stack>
      </div>
    </>
  );
});

export default StackResponsive;
