import { component$ } from "@builder.io/qwik";
import { Container } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Centered Container (Default)</h3>
        <div class="bg-gray-200 p-4 dark:bg-gray-700">
          <Container maxWidth="md" class="bg-blue-100 p-4 dark:bg-blue-900/30">
            <div class="border border-dashed border-blue-400 p-4 text-center dark:border-blue-600">
              This container is centered (centered=true)
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Non-Centered Container</h3>
        <div class="bg-gray-200 p-4 dark:bg-gray-700">
          <Container
            maxWidth="md"
            centered={false}
            class="bg-green-100 p-4 dark:bg-green-900/30"
          >
            <div class="border border-dashed border-green-400 p-4 text-center dark:border-green-600">
              This container is not centered (centered=false)
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Fixed Width Container</h3>
        <div class="bg-gray-200 p-4 dark:bg-gray-700">
          <Container
            maxWidth="md"
            fixedWidth={true}
            class="bg-purple-100 p-4 dark:bg-purple-900/30"
          >
            <div class="border border-dashed border-purple-400 p-4 text-center dark:border-purple-600">
              This container has fixed width (fixedWidth=true)
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Responsive Container (Default)
        </h3>
        <div class="bg-gray-200 p-4 dark:bg-gray-700">
          <Container
            maxWidth="md"
            class="bg-yellow-100 p-4 dark:bg-yellow-900/30"
          >
            <div class="border border-dashed border-yellow-400 p-4 text-center dark:border-yellow-600">
              This container is responsive (fixedWidth=false)
            </div>
          </Container>
          <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Resize the window to see the container adapt to different screen
            sizes
          </p>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Container with Accessibility Attributes
        </h3>
        <div class="bg-gray-200 p-4 dark:bg-gray-700">
          <Container
            maxWidth="md"
            role="region"
            aria-label="Important content region"
            class="bg-red-100 p-4 dark:bg-red-900/30"
          >
            <div class="border border-dashed border-red-400 p-4 text-center dark:border-red-600">
              This container has accessibility attributes
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
});
