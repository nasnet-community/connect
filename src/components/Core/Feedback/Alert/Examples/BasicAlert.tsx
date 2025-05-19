import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/Core/Feedback/Alert';

export const BasicAlert = component$(() => {
  return (
    <div class="flex flex-col gap-4">
      <Alert 
        status="info" 
        title="Information Alert" 
        message="This is an info alert with a title and message."
      />
      
      <Alert 
        status="success" 
        title="Success Alert" 
        message="Your changes have been saved successfully."
      />
      
      <Alert 
        status="warning" 
        title="Warning Alert" 
        message="This action cannot be undone. Please proceed with caution."
      />
      
      <Alert 
        status="error" 
        title="Error Alert" 
        message="There was an error processing your request. Please try again."
      />
    </div>
  );
});
