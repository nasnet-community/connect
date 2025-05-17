import { component$ } from '@builder.io/qwik';
import { FormLabel } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <FormLabel for="field-sm" size="sm">Small Label</FormLabel>
        <input 
          id="field-sm" 
          type="text" 
          class="block w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="Small input field"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <FormLabel for="field-md" size="md">Medium Label</FormLabel>
        <input 
          id="field-md" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="Medium input field"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <FormLabel for="field-lg" size="lg">Large Label</FormLabel>
        <input 
          id="field-lg" 
          type="text" 
          class="block w-full mt-1 px-3 py-2.5 text-lg border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="Large input field"
        />
      </div>
    </div>
  );
});
