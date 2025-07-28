import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <h2 class="text-xl font-semibold">Border Style Examples</h2>
      <div class="space-y-4">
        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          borderWidth="thin"
          borderStyle="solid"
          borderColor="default"
        >
          Thin Solid Default Border
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          borderWidth="normal"
          borderStyle="dashed"
          borderColor="primary"
        >
          Normal Dashed Primary Border
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          borderWidth="thick"
          borderStyle="dotted"
          borderColor="error"
        >
          Thick Dotted Error Border
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          borderWidth="normal"
          borderStyle="double"
          borderColor="success"
        >
          Normal Double Success Border
        </Box>
      </div>

      <h2 class="mt-8 text-xl font-semibold">Border Radius Examples</h2>
      <div class="space-y-4">
        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="none"
          borderWidth="thin"
        >
          No Border Radius
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="xs"
          borderWidth="thin"
        >
          Extra Small Border Radius (2px)
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          borderWidth="thin"
        >
          Medium Border Radius (6px)
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="xl"
          borderWidth="thin"
        >
          Extra Large Border Radius (12px)
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="full"
          borderWidth="thin"
        >
          Full Border Radius (rounded)
        </Box>
      </div>
    </div>
  );
});
