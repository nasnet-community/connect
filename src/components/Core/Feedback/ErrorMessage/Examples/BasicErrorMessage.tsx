import { component$ } from '@builder.io/qwik';
import { ErrorMessage } from '~/components/Core/Feedback/ErrorMessage';

export const BasicErrorMessage = component$(() => {
  return (
    <div class="space-y-4">
      <ErrorMessage 
        message="Failed to connect to the server. Please check your internet connection and try again."
      />
    </div>
  );
}); 