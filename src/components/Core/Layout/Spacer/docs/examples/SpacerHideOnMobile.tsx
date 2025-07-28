import { component$ } from "@builder.io/qwik";
import { Spacer } from "~/components/Core/Layout/Spacer";
import { Box } from "~/components/Core/Layout/Box";

export const SpacerHideOnMobile = component$(() => {
  return (
    <div>
      <>
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          First box
        </Box>
        <Spacer size="xl" hideOnMobile />
        <Box
          padding="sm"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          Second box (no space between on mobile)
        </Box>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
          On mobile screens, the boxes will be stacked without the spacer. On
          larger screens (sm breakpoint and above), there will be xl space
          between the boxes.
        </p>
      </>
    </div>
  );
});

export default SpacerHideOnMobile;
