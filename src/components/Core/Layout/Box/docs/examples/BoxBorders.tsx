import { component$ } from '@builder.io/qwik';
import { Box } from '~/components/Core/Layout/Box';

export const BoxBorders = component$(() => {
  return (
    <div class="space-y-4">
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="md"
        borderWidth="thin"
        borderColor="primary"
      >
        Box with thin primary border
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="lg"
        borderWidth="medium"
        borderColor="secondary"
      >
        Box with medium secondary border and large border radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface"
        borderRadius="none"
        borderWidth="thick"
        borderColor="danger"
        borderStyle="dashed"
      >
        Box with thick dashed danger border and no border radius
      </Box>
      
      <Box 
        padding="md" 
        backgroundColor="surface" 
        borderRadius="full"
        borderWidth="thin"
        borderColor="success"
      >
        Box with full border radius (circular/pill shape)
      </Box>
    </div>
  );
});
