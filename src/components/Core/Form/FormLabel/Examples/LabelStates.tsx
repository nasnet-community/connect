import { component$ } from '@builder.io/qwik';
import { FormLabel } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default State</h3>
        <FormLabel for="default-field">Default Label</FormLabel>
        <input 
          id="default-field" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="Default input field"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Required State</h3>
        <FormLabel for="required-field" required>Required Label</FormLabel>
        <input 
          id="required-field" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="Required input field"
          required
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Disabled State</h3>
        <FormLabel for="disabled-field" disabled>Disabled Label</FormLabel>
        <input 
          id="disabled-field" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-md cursor-not-allowed" 
          placeholder="Disabled input field"
          disabled
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error State</h3>
        <FormLabel for="error-field" error>Error Label</FormLabel>
        <input 
          id="error-field" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-red-500 dark:border-red-500 rounded-md" 
          placeholder="Error input field"
          aria-invalid="true"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Success State</h3>
        <FormLabel for="success-field" success>Success Label</FormLabel>
        <input 
          id="success-field" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-green-500 dark:border-green-500 rounded-md" 
          placeholder="Success input field"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Warning State</h3>
        <FormLabel for="warning-field" warning>Warning Label</FormLabel>
        <input 
          id="warning-field" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-yellow-500 dark:border-yellow-500 rounded-md" 
          placeholder="Warning input field"
        />
      </div>
    </div>
  );
});
