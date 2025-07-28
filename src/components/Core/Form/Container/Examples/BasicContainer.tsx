import { component$ } from "@builder.io/qwik";
import { Container } from "../";

/**
 * BasicContainer demonstrates the simplest usage of the Container component
 * with and without title and description.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Basic Container with Title</h3>
        <Container title="Contact Information">
          <div class="rounded bg-gray-50 p-4 dark:bg-gray-700">
            <p class="text-sm">This is a simple container with just a title.</p>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">
          Container with Title and Description
        </h3>
        <Container
          title="Payment Details"
          description="Please enter your payment information securely."
        >
          <div class="rounded bg-gray-50 p-4 dark:bg-gray-700">
            <p class="text-sm">
              This container has both a title and description text.
            </p>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Container without Title</h3>
        <Container>
          <div class="rounded bg-gray-50 p-4 dark:bg-gray-700">
            <p class="text-sm">
              This container has no title or description, used for simple
              content grouping.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
});
