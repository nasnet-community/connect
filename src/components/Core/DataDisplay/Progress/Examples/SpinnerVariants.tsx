import { component$ } from '@builder.io/qwik';
import { Spinner } from '~/components/Core/DataDisplay/Progress';

export const SpinnerVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Size Variants</h3>
        <div class="flex items-center gap-4">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Visual Variants</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div>
            <span class="text-xs block mb-2">Border</span>
            <Spinner variant="border" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Grow</span>
            <Spinner variant="grow" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Dots</span>
            <Spinner variant="dots" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Bars</span>
            <Spinner variant="bars" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Circle</span>
            <Spinner variant="circle" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Label Positions</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span class="text-xs block mb-2">Top</span>
            <Spinner label="Loading" labelPosition="top" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Right</span>
            <Spinner label="Loading" labelPosition="right" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Bottom</span>
            <Spinner label="Loading" labelPosition="bottom" />
          </div>
          
          <div>
            <span class="text-xs block mb-2">Left</span>
            <Spinner label="Loading" labelPosition="left" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Centered Spinner</h3>
        <div class="relative h-32 w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <Spinner centered />
        </div>
      </div>
    </div>
  );
});
