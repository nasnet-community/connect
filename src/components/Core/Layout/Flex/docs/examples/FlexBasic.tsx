import { component$, Fragment } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export const FlexBasic = component$(() => {
  return (
    <Flex justify="between" align="center" gap="md" class="bg-surface p-4 rounded-md">
      <Fragment>
        <div class="bg-primary text-white p-4 rounded-md">Item 1</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 2</div>
        <div class="bg-primary text-white p-4 rounded-md">Item 3</div>
      </Fragment>
    </Flex>
  );
});
