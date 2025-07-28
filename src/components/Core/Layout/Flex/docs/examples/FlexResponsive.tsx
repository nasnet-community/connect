import { component$ } from "@builder.io/qwik";
import { Flex } from "~/components/Core/Layout/Flex";

export const FlexResponsive = component$(() => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap="md"
      class="rounded-md bg-surface p-4"
    >
      <div class="bg-primary w-full rounded-md p-4 text-white">
        Column on mobile, Row on desktop
      </div>
      <div class="bg-primary w-full rounded-md p-4 text-white">
        Column on mobile, Row on desktop
      </div>
      <div class="bg-primary w-full rounded-md p-4 text-white">
        Column on mobile, Row on desktop
      </div>
    </Flex>
  );
});
