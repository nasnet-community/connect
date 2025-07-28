import { component$ } from "@builder.io/qwik";
import { Stack } from "~/components/Core/Layout/Stack";
import { Box } from "~/components/Core/Layout/Box";

export const StackBasic = component$(() => {
  return (
    <>
      <Stack spacing="md">
        <Box
          padding="md"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          First item
        </Box>
        <Box
          padding="md"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          Second item
        </Box>
        <Box
          padding="md"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          Third item
        </Box>
      </Stack>
    </>
  );
});

export default StackBasic;
