import { component$ } from "@builder.io/qwik";
import { Flex } from "~/components/Core/Layout/Flex";

export const FlexGap = component$(() => {
  return (
    <div class="space-y-8">
      <Flex gap="xs" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">XS Gap</div>
        <div class="bg-primary rounded-md p-4 text-white">XS Gap</div>
        <div class="bg-primary rounded-md p-4 text-white">XS Gap</div>
      </Flex>

      <Flex gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">MD Gap</div>
        <div class="bg-primary rounded-md p-4 text-white">MD Gap</div>
        <div class="bg-primary rounded-md p-4 text-white">MD Gap</div>
      </Flex>

      <Flex gap="xl" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">XL Gap</div>
        <div class="bg-primary rounded-md p-4 text-white">XL Gap</div>
        <div class="bg-primary rounded-md p-4 text-white">XL Gap</div>
      </Flex>
    </div>
  );
});
