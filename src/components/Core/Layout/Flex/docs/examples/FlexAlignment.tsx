import { component$, Fragment } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export const FlexAlignment = component$(() => {
  return (
    <div class="space-y-8">
      <p>Justify Content:</p>
      
      <Flex justify="start" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">Start</div>
          <div class="bg-primary text-white p-4 rounded-md">Start</div>
          <div class="bg-primary text-white p-4 rounded-md">Start</div>
        </Fragment>
      </Flex>
      
      <Flex justify="center" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">Center</div>
          <div class="bg-primary text-white p-4 rounded-md">Center</div>
          <div class="bg-primary text-white p-4 rounded-md">Center</div>
        </Fragment>
      </Flex>
      
      <Flex justify="end" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">End</div>
          <div class="bg-primary text-white p-4 rounded-md">End</div>
          <div class="bg-primary text-white p-4 rounded-md">End</div>
        </Fragment>
      </Flex>
      
      <Flex justify="between" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">Between</div>
          <div class="bg-primary text-white p-4 rounded-md">Between</div>
          <div class="bg-primary text-white p-4 rounded-md">Between</div>
        </Fragment>
      </Flex>
    </div>
  );
});
