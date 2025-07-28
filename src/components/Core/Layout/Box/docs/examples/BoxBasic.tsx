import { component$ } from "@builder.io/qwik";
import { Box } from "~/components/Core/Layout/Box";

export const BoxBasic = component$(() => {
  return (
    <Box padding="md" backgroundColor="surface" borderRadius="md">
      This is a basic box with padding and background color.
    </Box>
  );
});
