import { component$, useSignal } from '@builder.io/qwik';
import { FormErrorMessage } from '../index';
import { Field } from '../../Field';
import { Button } from '../../../button';

export default component$(() => {
  const hasError = useSignal(false);
  const errorId = 'email-error';
  const fieldId = 'email-field';
  
  return (
    <div class="space-y-4 max-w-md">
      <h3 class="text-sm font-semibold mb-2">FormErrorMessage with Accessibility Attributes</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        This example demonstrates how to use FormErrorMessage with proper ARIA attributes for accessibility.
      </p>
      
      <div>
        <Field 
          id={fieldId}
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          state={hasError.value ? 'error' : 'default'}
          aria-describedby={hasError.value ? errorId : undefined}
          aria-invalid={hasError.value}
        />
        
        {hasError.value && (
          <FormErrorMessage 
            id={errorId}
            message="Please enter a valid email address"
            role="alert"
            aria-describedby={fieldId}
            icon={<span class="i-lucide-alert-circle w-4 h-4" />}
          />
        )}
      </div>
      
      <div class="pt-2">
        <Button
          type="button"
          onClick$={() => hasError.value = !hasError.value}
        >
          {hasError.value ? 'Clear' : 'Show'} Error
        </Button>
      </div>
      
      <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h4 class="text-sm font-medium mb-2">Accessibility Features:</h4>
        <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-5">
          <li>Uses <code>id</code> on error message for explicit reference</li>
          <li>Sets <code>aria-describedby</code> on the field to link to its error message</li>
          <li>Uses <code>aria-invalid</code> to indicate invalid form field</li>
          <li>Provides <code>role="alert"</code> for screen readers to announce errors</li>
          <li>Includes an icon for visual users to quickly identify the error</li>
        </ul>
      </div>
    </div>
  );
});
