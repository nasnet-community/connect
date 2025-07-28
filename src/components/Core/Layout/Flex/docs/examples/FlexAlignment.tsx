import { component$ } from "@builder.io/qwik";
import { Flex } from "~/components/Core/Layout/Flex";

export const FlexAlignment = component$(() => {
  return (
    <div class="space-y-8">
      <p>Justify Content:</p>

      <Flex justify="start" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">Start</div>
        <div class="bg-primary rounded-md p-4 text-white">Start</div>
        <div class="bg-primary rounded-md p-4 text-white">Start</div>
      </Flex>

      <Flex justify="center" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">Center</div>
        <div class="bg-primary rounded-md p-4 text-white">Center</div>
        <div class="bg-primary rounded-md p-4 text-white">Center</div>
      </Flex>

      <Flex justify="end" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">End</div>
        <div class="bg-primary rounded-md p-4 text-white">End</div>
        <div class="bg-primary rounded-md p-4 text-white">End</div>
      </Flex>

      <Flex justify="between" gap="md" class="rounded-md bg-surface p-4">
        <div class="bg-primary rounded-md p-4 text-white">Between</div>
        <div class="bg-primary rounded-md p-4 text-white">Between</div>
        <div class="bg-primary rounded-md p-4 text-white">Between</div>
      </Flex>
    </div>
  );
});
