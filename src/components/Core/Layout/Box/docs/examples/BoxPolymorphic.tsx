import { component$ } from "@builder.io/qwik";
import { Box } from "~/components/Core/Layout/Box";

export const BoxPolymorphic = component$(() => {
  return (
    <div class="space-y-4">
      <Box
        as="section"
        padding="md"
        backgroundColor="surface-alt"
        borderRadius="md"
      >
        This Box renders as a &lt;section&gt; element
      </Box>

      <Box
        as="article"
        padding="md"
        backgroundColor="primary"
        borderRadius="md"
        class="text-white"
      >
        This Box renders as an &lt;article&gt; element
      </Box>

      <Box as="aside" padding="md" backgroundColor="muted" borderRadius="md">
        This Box renders as an &lt;aside&gt; element
      </Box>
    </div>
  );
});
