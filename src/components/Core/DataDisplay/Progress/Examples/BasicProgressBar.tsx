import { component$ } from '@builder.io/qwik';
import { ProgressBar } from '~/components/Core/DataDisplay/Progress';

export const BasicProgressBar = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Default Progress Bar</h3>
        <ProgressBar value={60} />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Progress Bar with Value Display</h3>
        <ProgressBar value={75} showValue />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Progress Bar with Custom Label</h3>
        <ProgressBar 
          value={85} 
          label="Uploading files"
          valueDisplay="percent"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Indeterminate Progress Bar</h3>
        <ProgressBar indeterminate />
      </div>
    </div>
  );
});
