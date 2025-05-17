import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '../index';

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Error Message with Alert Icon</h3>
        <FormErrorMessage 
          message="This field is required" 
          icon={<span class="i-lucide-alert-circle w-4 h-4" />}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error Message with X Icon</h3>
        <FormErrorMessage 
          message="Invalid email address" 
          icon={<span class="i-lucide-x-circle w-4 h-4" />}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Error Message with Custom Icon</h3>
        <FormErrorMessage 
          message="Your password is too weak" 
          icon={<span class="i-lucide-shield-alert w-4 h-4" />}
        />
      </div>
    </div>
  );
});
