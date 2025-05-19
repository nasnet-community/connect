import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export const DividerBasic = component$(() => {
  return (
    <div class="space-y-4">
      <p>Content above the divider</p>
      <Divider />
      <p>Content below the divider</p>
    </div>
  );
});
