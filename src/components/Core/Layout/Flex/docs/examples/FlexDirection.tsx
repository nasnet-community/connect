import { component$, Fragment } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export const FlexDirection = component$(() => {
  return (
    <div class="space-y-8">
      <Flex direction="row" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">Row Item 1</div>
          <div class="bg-primary text-white p-4 rounded-md">Row Item 2</div>
          <div class="bg-primary text-white p-4 rounded-md">Row Item 3</div>
        </Fragment>
      </Flex>
      
      <Flex direction="column" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">Column Item 1</div>
          <div class="bg-primary text-white p-4 rounded-md">Column Item 2</div>
          <div class="bg-primary text-white p-4 rounded-md">Column Item 3</div>
        </Fragment>
      </Flex>
      
      <Flex direction="row-reverse" gap="md" class="bg-surface p-4 rounded-md">
        <Fragment>
          <div class="bg-primary text-white p-4 rounded-md">Row Reverse Item 1</div>
          <div class="bg-primary text-white p-4 rounded-md">Row Reverse Item 2</div>
          <div class="bg-primary text-white p-4 rounded-md">Row Reverse Item 3</div>
        </Fragment>
      </Flex>
    </div>
  );
});
