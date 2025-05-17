import { component$ } from '@builder.io/qwik';
import { Container } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Horizontal Padding Options</h3>
        <div class="space-y-4">
          <Container maxWidth="md" paddingX="none" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
              No horizontal padding (none)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingX="xs" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
              Extra small horizontal padding (xs)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingX="sm" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
              Small horizontal padding (sm)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingX="md" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
              Medium horizontal padding (md)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingX="lg" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
              Large horizontal padding (lg)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingX="xl" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
              Extra large horizontal padding (xl)
            </div>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Vertical Padding Options</h3>
        <div class="space-y-4">
          <Container maxWidth="md" paddingY="none" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-green-100 dark:bg-green-900/30 p-4 text-center">
              No vertical padding (none)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingY="xs" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-green-100 dark:bg-green-900/30 p-4 text-center">
              Extra small vertical padding (xs)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingY="sm" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-green-100 dark:bg-green-900/30 p-4 text-center">
              Small vertical padding (sm)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingY="md" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-green-100 dark:bg-green-900/30 p-4 text-center">
              Medium vertical padding (md)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingY="lg" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-green-100 dark:bg-green-900/30 p-4 text-center">
              Large vertical padding (lg)
            </div>
          </Container>
          
          <Container maxWidth="md" paddingY="xl" class="bg-gray-200 dark:bg-gray-700">
            <div class="bg-green-100 dark:bg-green-900/30 p-4 text-center">
              Extra large vertical padding (xl)
            </div>
          </Container>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Combined Horizontal & Vertical Padding</h3>
        <Container maxWidth="md" paddingX="md" paddingY="md" class="bg-gray-200 dark:bg-gray-700">
          <div class="bg-purple-100 dark:bg-purple-900/30 p-4 text-center">
            Medium horizontal & vertical padding
          </div>
        </Container>
      </div>
    </div>
  );
});
