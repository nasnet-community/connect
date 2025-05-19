import { component$, Fragment } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export const FlexGap = component$(() => {
  return (
    <div class="space-y-8">
      <Flex gap="xs" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
          <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
          <div class="bg-primary text-white p-4 rounded-md">XS Gap</div>
        </Fragment>
      </Flex>
      
      <Flex gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
          <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
          <div class="bg-primary text-white p-4 rounded-md">MD Gap</div>
        </Fragment>
      </Flex>
      
      <Flex gap="xl" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
          <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
          <div class="bg-primary text-white p-4 rounded-md">XL Gap</div>
        </Fragment>
      </Flex>
    </div>
  );
});
