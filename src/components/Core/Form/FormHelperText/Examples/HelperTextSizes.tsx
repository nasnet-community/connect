import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <FormHelperText size="sm">
          This is a small helper text message
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <FormHelperText size="md">
          This is a medium helper text message
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <FormHelperText size="lg">
          This is a large helper text message
        </FormHelperText>
      </div>
    </div>
  );
});
