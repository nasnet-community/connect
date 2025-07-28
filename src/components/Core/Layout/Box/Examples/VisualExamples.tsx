import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <h2 class="text-xl font-semibold">Background Color Examples</h2>
      <div class="space-y-4">
        <Box padding="md" backgroundColor="transparent" borderWidth="thin">
          Transparent Background
        </Box>

        <Box padding="md" backgroundColor="primary" class="text-white">
          Primary Background
        </Box>

        <Box padding="md" backgroundColor="secondary" class="text-white">
          Secondary Background
        </Box>

        <Box padding="md" backgroundColor="success" class="text-white">
          Success Background
        </Box>

        <Box padding="md" backgroundColor="warning">
          Warning Background
        </Box>

        <Box padding="md" backgroundColor="error" class="text-white">
          Error Background
        </Box>

        <Box padding="md" backgroundColor="surface">
          Surface Background
        </Box>

        <Box padding="md" backgroundColor="surface-alt">
          Surface Alt Background
        </Box>
      </div>

      <h2 class="mt-8 text-xl font-semibold">Shadow Examples</h2>
      <div class="space-y-4">
        <Box padding="md" backgroundColor="surface" shadow="none">
          No Shadow
        </Box>

        <Box padding="md" backgroundColor="surface" shadow="sm">
          Small Shadow
        </Box>

        <Box padding="md" backgroundColor="surface" shadow="md">
          Medium Shadow
        </Box>

        <Box padding="md" backgroundColor="surface" shadow="lg">
          Large Shadow
        </Box>

        <Box padding="md" backgroundColor="surface" shadow="xl">
          Extra Large Shadow
        </Box>

        <Box padding="md" backgroundColor="surface" shadow="2xl">
          Double Extra Large Shadow
        </Box>
      </div>
    </div>
  );
});
