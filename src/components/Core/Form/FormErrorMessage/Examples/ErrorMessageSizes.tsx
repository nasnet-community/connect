import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <FormErrorMessage 
          size="sm" 
          message="This is a small error message"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <FormErrorMessage 
          size="md" 
          message="This is a medium error message"
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <FormErrorMessage 
          size="lg" 
          message="This is a large error message"
        />
      </div>
    </div>
  );
});
