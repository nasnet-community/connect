import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <h2 class="text-xl font-semibold">Padding Examples</h2>
      <div class="space-y-4">
        <Box backgroundColor="surface" borderRadius="md" padding="none">
          No Padding
        </Box>
        <Box backgroundColor="surface" borderRadius="md" padding="xs">
          Extra Small Padding (4px)
        </Box>
        <Box backgroundColor="surface" borderRadius="md" padding="sm">
          Small Padding (8px)
        </Box>
        <Box backgroundColor="surface" borderRadius="md" padding="md">
          Medium Padding (16px)
        </Box>
        <Box backgroundColor="surface" borderRadius="md" padding="lg">
          Large Padding (24px)
        </Box>
        <Box backgroundColor="surface" borderRadius="md" padding="xl">
          Extra Large Padding (32px)
        </Box>
      </div>

      <h2 class="mt-8 text-xl font-semibold">Directional Padding Examples</h2>
      <div class="space-y-4">
        <Box
          backgroundColor="surface"
          borderRadius="md"
          padding={{
            x: "lg", // Horizontal padding
            y: "sm", // Vertical padding
          }}
        >
          Horizontal: Large, Vertical: Small
        </Box>

        <Box
          backgroundColor="surface"
          borderRadius="md"
          padding={{
            top: "lg",
            right: "md",
            bottom: "sm",
            left: "xs",
          }}
        >
          Top: Large, Right: Medium, Bottom: Small, Left: Extra Small
        </Box>
      </div>

      <h2 class="mt-8 text-xl font-semibold">Margin Examples</h2>
      <div>
        <Box
          backgroundColor="primary"
          padding="sm"
          margin="md"
          borderRadius="md"
          class="text-white"
        >
          Box with Medium Margin
        </Box>

        <Box
          backgroundColor="secondary"
          padding="sm"
          margin={{
            top: "lg",
            bottom: "lg",
          }}
          borderRadius="md"
          class="text-white"
        >
          Box with Large Vertical Margin
        </Box>
      </div>
    </div>
  );
});
