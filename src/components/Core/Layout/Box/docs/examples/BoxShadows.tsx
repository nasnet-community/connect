import { component$ } from "@builder.io/qwik";
import { Box } from "~/components/Core/Layout/Box";

export const BoxShadows = component$(() => {
  return (
    <div class="space-y-8">
      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="sm">
        Box with small shadow (sm)
      </Box>

      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="md">
        Box with medium shadow (md)
      </Box>

      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="lg">
        Box with large shadow (lg)
      </Box>

      <Box padding="md" backgroundColor="surface" borderRadius="md" shadow="xl">
        Box with extra large shadow (xl)
      </Box>

      <Box
        padding="md"
        backgroundColor="surface"
        borderRadius="md"
        shadow="2xl"
      >
        Box with double extra large shadow (2xl)
      </Box>

      <Box
        padding="md"
        backgroundColor="surface"
        borderRadius="md"
        shadow="inner"
      >
        Box with inner shadow
      </Box>

      <Box
        padding="md"
        backgroundColor="surface"
        borderRadius="md"
        shadow="none"
      >
        Box with no shadow (default)
      </Box>
    </div>
  );
});
