import { component$ } from "@builder.io/qwik";
import { Flex } from "~/components/Core/Layout/Flex";

export const FlexNested = component$(() => {
  return (
    <Flex direction="column" gap="md" class="rounded-md bg-surface p-4">
      <div class="bg-muted rounded-md p-4">Header</div>

      <Flex gap="md" class="flex-grow">
        <div class="bg-muted w-1/3 rounded-md p-4">Sidebar</div>

        <Flex direction="column" gap="md" class="flex-grow">
          <div class="bg-primary rounded-md p-4 text-white">Content 1</div>
          <div class="bg-primary rounded-md p-4 text-white">Content 2</div>
          <div class="bg-primary rounded-md p-4 text-white">Content 3</div>
        </Flex>
      </Flex>

      <div class="bg-muted rounded-md p-4">Footer</div>
    </Flex>
  );
});
