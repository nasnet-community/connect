import { component$ } from "@builder.io/qwik";
import { Flex, FlexItem } from "~/components/Core/Layout/Flex";

export const FlexItems = component$(() => {
  return (
    <Flex gap="md" class="rounded-md bg-surface p-4">
      <FlexItem grow={1} class="bg-primary rounded-md p-4 text-white">
        Flex grow 1
      </FlexItem>

      <FlexItem grow={2} class="bg-secondary rounded-md p-4 text-white">
        Flex grow 2
      </FlexItem>

      <FlexItem grow={1} class="bg-primary rounded-md p-4 text-white">
        Flex grow 1
      </FlexItem>
    </Flex>
  );
});
