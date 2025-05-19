import { component$, Fragment } from '@builder.io/qwik';
import { Flex, FlexItem } from '~/components/Core/Layout/Flex';

export const FlexItems = component$(() => {
  return (
    <Flex gap="md" class="bg-surface p-4 rounded-md">
      <Fragment>
        <FlexItem grow={1} class="bg-primary text-white p-4 rounded-md">
          Flex grow 1
        </FlexItem>
        
        <FlexItem grow={2} class="bg-secondary text-white p-4 rounded-md">
          Flex grow 2
        </FlexItem>
        
        <FlexItem grow={1} class="bg-primary text-white p-4 rounded-md">
          Flex grow 1
        </FlexItem>
      </Fragment>
    </Flex>
  );
});
