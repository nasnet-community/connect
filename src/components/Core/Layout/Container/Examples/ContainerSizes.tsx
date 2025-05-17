import { component$ } from '@builder.io/qwik';
import { Container } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Small Container (xs)</h3>
        <Container maxWidth="xs" paddingX="md" class="bg-blue-100 dark:bg-blue-900/30 p-4">
          <div class="border border-dashed border-blue-400 dark:border-blue-600 p-4 text-center">
            Max width: 320px
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Small Container (sm)</h3>
        <Container maxWidth="sm" paddingX="md" class="bg-green-100 dark:bg-green-900/30 p-4">
          <div class="border border-dashed border-green-400 dark:border-green-600 p-4 text-center">
            Max width: 640px
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Medium Container (md)</h3>
        <Container maxWidth="md" paddingX="md" class="bg-yellow-100 dark:bg-yellow-900/30 p-4">
          <div class="border border-dashed border-yellow-400 dark:border-yellow-600 p-4 text-center">
            Max width: 768px
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Large Container (lg)</h3>
        <Container maxWidth="lg" paddingX="md" class="bg-purple-100 dark:bg-purple-900/30 p-4">
          <div class="border border-dashed border-purple-400 dark:border-purple-600 p-4 text-center">
            Max width: 1024px
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Extra Large Container (xl)</h3>
        <Container maxWidth="xl" paddingX="md" class="bg-pink-100 dark:bg-pink-900/30 p-4">
          <div class="border border-dashed border-pink-400 dark:border-pink-600 p-4 text-center">
            Max width: 1280px
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">2XL Container (2xl)</h3>
        <Container maxWidth="2xl" paddingX="md" class="bg-indigo-100 dark:bg-indigo-900/30 p-4">
          <div class="border border-dashed border-indigo-400 dark:border-indigo-600 p-4 text-center">
            Max width: 1536px
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Full Width Container</h3>
        <Container maxWidth="full" paddingX="md" class="bg-red-100 dark:bg-red-900/30 p-4">
          <div class="border border-dashed border-red-400 dark:border-red-600 p-4 text-center">
            Max width: 100%
          </div>
        </Container>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Fluid Container</h3>
        <Container maxWidth="fluid" paddingX="md" class="bg-gray-100 dark:bg-gray-800 p-4">
          <div class="border border-dashed border-gray-400 dark:border-gray-600 p-4 text-center">
            No max-width constraint
          </div>
        </Container>
      </div>
    </div>
  );
});
