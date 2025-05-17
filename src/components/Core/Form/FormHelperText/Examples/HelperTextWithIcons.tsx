import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Helper Text with Info Icon</h3>
        <FormHelperText 
          icon={<span class="i-lucide-info w-4 h-4" />}
        >
          Your password must be at least 8 characters
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error Helper Text with Icon</h3>
        <FormHelperText 
          error
          icon={<span class="i-lucide-alert-circle w-4 h-4" />}
        >
          Please enter a valid email address
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Success Helper Text with Icon</h3>
        <FormHelperText 
          success
          icon={<span class="i-lucide-check-circle w-4 h-4" />}
        >
          Your email has been verified
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Warning Helper Text with Icon</h3>
        <FormHelperText 
          warning
          icon={<span class="i-lucide-alert-triangle w-4 h-4" />}
        >
          Your session will expire in 5 minutes
        </FormHelperText>
      </div>
    </div>
  );
});
