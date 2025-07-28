import { component$ } from "@builder.io/qwik";
import { Flex } from "~/components/Core/Layout/Flex";

export const FlexBasic = component$(() => {
  return (
    <Flex
      justify="between"
      align="center"
      gap="md"
      class="rounded-md bg-surface p-4"
    >
      <div class="bg-primary rounded-md p-4 text-white">Item 1</div>
      <div class="bg-primary rounded-md p-4 text-white">Item 2</div>
      <div class="bg-primary rounded-md p-4 text-white">Item 3</div>
    </Flex>
  );
});
