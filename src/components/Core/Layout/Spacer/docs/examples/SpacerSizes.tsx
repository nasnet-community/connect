import { component$ } from "@builder.io/qwik";
import { Spacer } from "~/components/Core/Layout/Spacer";
import { Box } from "~/components/Core/Layout/Box";

export const SpacerSizes = component$(() => {
  return (
    <div>
      <>
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          xs spacing below
        </Box>
        <Spacer size="xs" />
        <Box
          padding="sm"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          sm spacing below
        </Box>
        <Spacer size="sm" />
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          md spacing below
        </Box>
        <Spacer size="md" />
        <Box
          padding="sm"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          lg spacing below
        </Box>
        <Spacer size="lg" />
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          xl spacing below
        </Box>
        <Spacer size="xl" />
        <Box
          padding="sm"
          backgroundColor="secondary"
          borderRadius="md"
          class="text-white"
        >
          2xl spacing below
        </Box>
        <Spacer size="2xl" />
        <Box
          padding="sm"
          backgroundColor="primary"
          borderRadius="md"
          class="text-white"
        >
          Last box
        </Box>
      </>
    </div>
  );
});

export default SpacerSizes;
