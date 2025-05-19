import { component$ } from '@builder.io/qwik';
import { Spinner } from '~/components/Core/DataDisplay/Progress';

export const BasicSpinner = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Default Spinner</h3>
        <Spinner />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Spinner with Label</h3>
        <Spinner label="Loading..." />
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Spinner with Custom Color</h3>
        <div class="flex gap-4">
          <Spinner color="primary" />
          <Spinner color="secondary" />
          <Spinner color="success" />
          <Spinner color="warning" />
          <Spinner color="error" />
          <Spinner color="info" />
          <Spinner color="white" class="bg-gray-800 p-2 rounded" />
        </div>
      </div>
    </div>
  );
});
