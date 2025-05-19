import { component$ } from '@builder.io/qwik';
import { Divider } from '~/components/Core/Layout/Divider';

export const DividerWithLabel = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Center label (default)</p>
        <Divider label="Section" />
      </div>
      
      <div>
        <p class="mb-2">Left aligned label</p>
        <Divider label="Section" labelPosition="start" />
      </div>
      
      <div>
        <p class="mb-2">Right aligned label</p>
        <Divider label="Section" labelPosition="end" />
      </div>
      
      <div>
        <p class="mb-2">Custom label with component</p>
        <Divider
          label={
            <span class="bg-primary text-white px-2 py-1 rounded">
              Custom Label
            </span>
          }
        />
      </div>
    </div>
  );
});
