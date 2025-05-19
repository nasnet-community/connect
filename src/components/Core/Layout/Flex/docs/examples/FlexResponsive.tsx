import { component$, Fragment } from '@builder.io/qwik';
import { Flex } from '~/components/Core/Layout/Flex';

export const FlexResponsive = component$(() => {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      gap="md"
      class="bg-surface p-4 rounded-md"
    >
      <Fragment>
        <div class="bg-primary text-white p-4 rounded-md w-full">
          Column on mobile, Row on desktop
        </div>
        <div class="bg-primary text-white p-4 rounded-md w-full">
          Column on mobile, Row on desktop
        </div>
        <div class="bg-primary text-white p-4 rounded-md w-full">
          Column on mobile, Row on desktop
        </div>
      </Fragment>
    </Flex>
  );
});
