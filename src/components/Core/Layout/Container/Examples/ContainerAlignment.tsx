import { component$ } from '@builder.io/qwik';
import { Container } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Centered Container (Default)</h3>
        <div class="bg-gray-200 dark:bg-gray-700 p-4">
          <Container maxWidth="md" class="bg-blue-100 dark:bg-blue-900/30 p-4">
            <div class="border border-dashed border-blue-400 dark:border-blue-600 p-4 text-center">
              This container is centered (centered=true)
            </div>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Non-Centered Container</h3>
        <div class="bg-gray-200 dark:bg-gray-700 p-4">
          <Container maxWidth="md" centered={false} class="bg-green-100 dark:bg-green-900/30 p-4">
            <div class="border border-dashed border-green-400 dark:border-green-600 p-4 text-center">
              This container is not centered (centered=false)
            </div>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Fixed Width Container</h3>
        <div class="bg-gray-200 dark:bg-gray-700 p-4">
          <Container maxWidth="md" fixedWidth={true} class="bg-purple-100 dark:bg-purple-900/30 p-4">
            <div class="border border-dashed border-purple-400 dark:border-purple-600 p-4 text-center">
              This container has fixed width (fixedWidth=true)
            </div>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Responsive Container (Default)</h3>
        <div class="bg-gray-200 dark:bg-gray-700 p-4">
          <Container maxWidth="md" class="bg-yellow-100 dark:bg-yellow-900/30 p-4">
            <div class="border border-dashed border-yellow-400 dark:border-yellow-600 p-4 text-center">
              This container is responsive (fixedWidth=false)
            </div>
          </Container>
          <p class="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
            Resize the window to see the container adapt to different screen sizes
          </p>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Container with Accessibility Attributes</h3>
        <div class="bg-gray-200 dark:bg-gray-700 p-4">
          <Container 
            maxWidth="md" 
            role="region" 
            aria-label="Important content region" 
            class="bg-red-100 dark:bg-red-900/30 p-4"
          >
            <div class="border border-dashed border-red-400 dark:border-red-600 p-4 text-center">
              This container has accessibility attributes
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
});
