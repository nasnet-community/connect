import { component$ } from '@builder.io/qwik';
import { FormHelperText } from '../index';
import { Field } from '../../Field';

export default component$(() => {
  const passwordFieldId = 'password-field';
  const helperTextId = 'password-helper';
  
  return (
    <div class="space-y-8 max-w-md">
      <div>
        <h3 class="text-sm font-semibold mb-2">Accessible Helper Text</h3>
        
        <Field
          id={passwordFieldId}
          label="Password"
          type="password"
          placeholder="Enter your password"
          aria-describedby={helperTextId}
        />
        
        <FormHelperText id={helperTextId}>
          Password must be at least 8 characters and include at least one number, 
          one uppercase letter, and one special character
        </FormHelperText>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Screen Reader Only Helper Text</h3>
        
        <Field
          id="email-field"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          aria-describedby="email-sr-helper"
        />
        
        <FormHelperText id="email-sr-helper" srOnly>
          Please enter a valid email address in the format name@example.com
        </FormHelperText>
        
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
          The helper text above is only visible to screen readers
        </p>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h4 class="text-sm font-medium mb-2">Accessibility Features:</h4>
        <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-5">
          <li>Uses <code>id</code> on helper text for explicit reference</li>
          <li>Sets <code>aria-describedby</code> on the field to link to its helper text</li>
          <li>Provides <code>srOnly</code> option for screen reader only text</li>
          <li>Uses <code>role="status"</code> to communicate state changes to screen readers</li>
        </ul>
      </div>
    </div>
  );
});
