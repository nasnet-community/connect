import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '../index';

export default component$(() => {
  return (
    <div class="space-y-4">
      <div>
        <FormErrorMessage message="This field is required" />
      </div>
      
      <div>
        <FormErrorMessage>Email address is invalid</FormErrorMessage>
      </div>
      
      <div>
        <FormErrorMessage>
          Password must be at least 8 characters long and include 
          at least one uppercase letter, one lowercase letter, and one number
        </FormErrorMessage>
      </div>
    </div>
  );
});
