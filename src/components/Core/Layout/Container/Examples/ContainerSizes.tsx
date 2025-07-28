import { component$ } from "@builder.io/qwik";
import { Container } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Extra Small Container (xs)</h3>
        <Container
          maxWidth="xs"
          paddingX="md"
          class="bg-blue-100 p-4 dark:bg-blue-900/30"
        >
          <div class="border border-dashed border-blue-400 p-4 text-center dark:border-blue-600">
            Max width: 320px
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Small Container (sm)</h3>
        <Container
          maxWidth="sm"
          paddingX="md"
          class="bg-green-100 p-4 dark:bg-green-900/30"
        >
          <div class="border border-dashed border-green-400 p-4 text-center dark:border-green-600">
            Max width: 640px
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Medium Container (md)</h3>
        <Container
          maxWidth="md"
          paddingX="md"
          class="bg-yellow-100 p-4 dark:bg-yellow-900/30"
        >
          <div class="border border-dashed border-yellow-400 p-4 text-center dark:border-yellow-600">
            Max width: 768px
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Large Container (lg)</h3>
        <Container
          maxWidth="lg"
          paddingX="md"
          class="bg-purple-100 p-4 dark:bg-purple-900/30"
        >
          <div class="border border-dashed border-purple-400 p-4 text-center dark:border-purple-600">
            Max width: 1024px
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Extra Large Container (xl)</h3>
        <Container
          maxWidth="xl"
          paddingX="md"
          class="bg-pink-100 p-4 dark:bg-pink-900/30"
        >
          <div class="border border-dashed border-pink-400 p-4 text-center dark:border-pink-600">
            Max width: 1280px
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">2XL Container (2xl)</h3>
        <Container
          maxWidth="2xl"
          paddingX="md"
          class="bg-indigo-100 p-4 dark:bg-indigo-900/30"
        >
          <div class="border border-dashed border-indigo-400 p-4 text-center dark:border-indigo-600">
            Max width: 1536px
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Full Width Container</h3>
        <Container
          maxWidth="full"
          paddingX="md"
          class="bg-red-100 p-4 dark:bg-red-900/30"
        >
          <div class="border border-dashed border-red-400 p-4 text-center dark:border-red-600">
            Max width: 100%
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Fluid Container</h3>
        <Container
          maxWidth="fluid"
          paddingX="md"
          class="bg-gray-100 p-4 dark:bg-gray-800"
        >
          <div class="border border-dashed border-gray-400 p-4 text-center dark:border-gray-600">
            No max-width constraint
          </div>
        </Container>
      </div>
    </div>
  );
});
