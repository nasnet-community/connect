import { component$ } from "@builder.io/qwik";
import { Flex } from "~/components/Core/Layout/Flex";

export const FlexDirection = component$(() => {
  return (
    <div class="space-y-8">
      <Flex direction="row" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">Row Item 1</div>
        <div class="bg-primary rounded-md p-4 text-white">Row Item 2</div>
        <div class="bg-primary rounded-md p-4 text-white">Row Item 3</div>
      </Flex>

      <Flex direction="column" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">Column Item 1</div>
        <div class="bg-primary rounded-md p-4 text-white">Column Item 2</div>
        <div class="bg-primary rounded-md p-4 text-white">Column Item 3</div>
      </Flex>

      <Flex direction="row-reverse" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">
          Row Reverse Item 1
        </div>
        <div class="bg-primary rounded-md p-4 text-white">
          Row Reverse Item 2
        </div>
        <div class="bg-primary rounded-md p-4 text-white">
          Row Reverse Item 3
        </div>
      </Flex>
    </div>
  );
});
