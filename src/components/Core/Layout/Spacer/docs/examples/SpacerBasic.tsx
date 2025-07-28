import { component$ } from "@builder.io/qwik";
import { Spacer } from "~/components/Core/Layout/Spacer";
import { Box } from "~/components/Core/Layout/Box";

export const SpacerBasic = component$(() => {
  return (
    <div>
      <>
        <Box
          padding="md"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          First box
        </Box>
        <Spacer size="md" />
        <Box
          padding="md"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          Second box with space above
        </Box>
      </>
    </div>
  );
});

export default SpacerBasic;
