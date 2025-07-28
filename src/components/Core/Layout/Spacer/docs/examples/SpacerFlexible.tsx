import { component$ } from "@builder.io/qwik";
import { Spacer } from "~/components/Core/Layout/Spacer";
import { Box } from "~/components/Core/Layout/Box";

export const SpacerFlexible = component$(() => {
  return (
    <div class="flex w-full items-center">
      <>
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          Left Box
        </Box>
        <Spacer horizontal isFlexible />
        <Box
          padding="sm"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          Right Box
        </Box>
      </>
    </div>
  );
});

export default SpacerFlexible;
