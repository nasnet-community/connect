import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export const BoxBackgrounds = component$(() => {
  return (
    <div class="space-y-4">
      <Box padding="md" backgroundColor="primary" borderRadius="md" class="text-white">
        Primary background
      </Box>
      
      <Box padding="md" backgroundColor="secondary" borderRadius="md" class="text-white">
        Secondary background
      </Box>
      
      <Box padding="md" backgroundColor="success" borderRadius="md" class="text-white">
        Success background
      </Box>
      
      <Box padding="md" backgroundColor="info" borderRadius="md" class="text-white">
        Info background
      </Box>
      
      <Box padding="md" backgroundColor="warning" borderRadius="md">
        Warning background
      </Box>
      
      <Box padding="md" backgroundColor="error" borderRadius="md" class="text-white">
        Error background
      </Box>
      
      <Box padding="md" backgroundColor="surface" borderRadius="md">
        Surface background (default)
      </Box>
      
      <Box padding="md" backgroundColor="surface-alt" borderRadius="md">
        Alternative surface background
      </Box>
      
      <Box padding="md" backgroundColor="muted" borderRadius="md">
        Muted background
      </Box>
    </div>
  );
});
