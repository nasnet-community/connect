import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <h2 class="text-xl font-semibold">Element Type Examples</h2>
      <div class="space-y-4">
        <Box
          as="section"
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
        >
          This is rendered as a <code>section</code> element
        </Box>

        <Box
          as="article"
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
        >
          This is rendered as an <code>article</code> element
        </Box>

        <Box
          as="aside"
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
        >
          This is rendered as an <code>aside</code> element
        </Box>
      </div>

      <h2 class="mt-8 text-xl font-semibold">Layout Examples</h2>
      <div class="h-64 space-y-4">
        <Box
          padding="md"
          backgroundColor="surface"
          fullWidth
          borderWidth="thin"
        >
          Full Width Box
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          fullHeight
          borderWidth="thin"
          class="flex items-center justify-center"
        >
          Full Height Box
        </Box>
      </div>

      <h2 class="mt-8 text-xl font-semibold">Accessibility Examples</h2>
      <div class="space-y-4">
        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          role="region"
          aria-label="Important information"
        >
          Box with ARIA attributes for accessibility
        </Box>

        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="md"
          aria-describedby="box-description"
        >
          Box with ARIA describedby attribute
          <p id="box-description" class="sr-only">
            This description is read by screen readers
          </p>
        </Box>
      </div>
    </div>
  );
});
