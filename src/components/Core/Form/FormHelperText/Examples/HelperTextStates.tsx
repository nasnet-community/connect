import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default State</h3>
        <FormHelperText>
          This is a normal helper text message
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Disabled State</h3>
        <FormHelperText disabled>
          This field is currently disabled
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error State</h3>
        <FormHelperText error>
          Your password is too short
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Success State</h3>
        <FormHelperText success>
          Username is available
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Warning State</h3>
        <FormHelperText warning>
          Your password is not very strong
        </FormHelperText>
      </div>
    </div>
  );
});
