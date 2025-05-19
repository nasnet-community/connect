import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export const BoxSpacing = component$(() => {
  return (
    <div class="space-y-4">
      <Box padding="md" backgroundColor="surface-alt" borderRadius="md">
        Box with medium padding (md)
      </Box>
      
      <Box padding={{ x: 'lg', y: 'sm' }} backgroundColor="surface-alt" borderRadius="md">
        Box with horizontal large padding (lg) and vertical small padding (sm)
      </Box>
      
      <Box padding="sm" margin="lg" backgroundColor="surface-alt" borderRadius="md">
        Box with small padding (sm) and large margin (lg)
      </Box>
      
      <Box padding={{ top: 'xl', bottom: 'md', left: 'sm', right: 'sm' }} backgroundColor="surface-alt" borderRadius="md">
        Box with custom padding for each side
      </Box>
    </div>
  );
});
