import { component$ } from '@builder.io/qwik';
import { Container } from '../';

/**
 * BasicContainer demonstrates the simplest usage of the Container component
 * with and without title and description.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Basic Container with Title</h3>
        <Container title="Contact Information">
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p class="text-sm">This is a simple container with just a title.</p>
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Container with Title and Description</h3>
        <Container 
          title="Payment Details" 
          description="Please enter your payment information securely."
        >
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p class="text-sm">This container has both a title and description text.</p>
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Container without Title</h3>
        <Container>
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p class="text-sm">This container has no title or description, used for simple content grouping.</p>
          </div>
        </Container>
      </div>
    </div>
  );
}); 