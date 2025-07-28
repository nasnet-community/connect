import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <Box padding="md" backgroundColor="surface" borderRadius="md">
      Basic Box with medium padding and rounded corners
    </Box>
  );
});
