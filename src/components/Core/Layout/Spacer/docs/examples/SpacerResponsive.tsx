import { component$ } from "@builder.io/qwik";
import { Spacer } from "~/components/Core/Layout/Spacer";
import { Box } from "~/components/Core/Layout/Box";

export const SpacerResponsive = component$(() => {
  return (
    <div>
      <>
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          Responsive spacing - xs on mobile, md on tablet, xl on desktop
        </Box>
        <Spacer
          size={{
            base: "xs",
            md: "md",
            lg: "xl",
          }}
        />
        <Box
          padding="sm"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          Box below with responsive spacing
        </Box>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Try resizing your browser window to see the spacing change.
        </p>
      </>
    </div>
  );
});

export default SpacerResponsive;
