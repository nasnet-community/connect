import { component$, Fragment } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export const FlexNested = component$(() => {
  return (
    <Flex direction="column" gap="md" class="bg-surface p-4 rounded-md">
      <Fragment>
        <div class="bg-muted p-4 rounded-md">Header</div>
        
        <Flex gap="md" class="flex-grow">
          <Fragment>
            <div class="bg-muted p-4 rounded-md w-1/3">Sidebar</div>
            
            <Flex direction="column" gap="md" class="flex-grow">
              <Fragment>
                <div class="bg-primary text-white p-4 rounded-md">Content 1</div>
                <div class="bg-primary text-white p-4 rounded-md">Content 2</div>
                <div class="bg-primary text-white p-4 rounded-md">Content 3</div>
              </Fragment>
            </Flex>
          </Fragment>
        </Flex>
        
        <div class="bg-muted p-4 rounded-md">Footer</div>
      </Fragment>
    </Flex>
  );
});
