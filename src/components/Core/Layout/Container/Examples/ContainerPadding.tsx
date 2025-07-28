import { component$ } from "@builder.io/qwik";
import { Container } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Horizontal Padding Options</h3>
        <div class="space-y-4">
          <Container
            maxWidth="md"
            paddingX="none"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-blue-100 p-4 text-center dark:bg-blue-900/30">
              No horizontal padding (none)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingX="xs"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-blue-100 p-4 text-center dark:bg-blue-900/30">
              Extra small horizontal padding (xs)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingX="sm"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-blue-100 p-4 text-center dark:bg-blue-900/30">
              Small horizontal padding (sm)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingX="md"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-blue-100 p-4 text-center dark:bg-blue-900/30">
              Medium horizontal padding (md)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingX="lg"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-blue-100 p-4 text-center dark:bg-blue-900/30">
              Large horizontal padding (lg)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingX="xl"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-blue-100 p-4 text-center dark:bg-blue-900/30">
              Extra large horizontal padding (xl)
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Vertical Padding Options</h3>
        <div class="space-y-4">
          <Container
            maxWidth="md"
            paddingY="none"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-green-100 p-4 text-center dark:bg-green-900/30">
              No vertical padding (none)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingY="xs"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-green-100 p-4 text-center dark:bg-green-900/30">
              Extra small vertical padding (xs)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingY="sm"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-green-100 p-4 text-center dark:bg-green-900/30">
              Small vertical padding (sm)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingY="md"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-green-100 p-4 text-center dark:bg-green-900/30">
              Medium vertical padding (md)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingY="lg"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-green-100 p-4 text-center dark:bg-green-900/30">
              Large vertical padding (lg)
            </div>
          </Container>

          <Container
            maxWidth="md"
            paddingY="xl"
            class="bg-gray-200 dark:bg-gray-700"
          >
            <div class="bg-green-100 p-4 text-center dark:bg-green-900/30">
              Extra large vertical padding (xl)
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">
          Combined Horizontal & Vertical Padding
        </h3>
        <Container
          maxWidth="md"
          paddingX="md"
          paddingY="md"
          class="bg-gray-200 dark:bg-gray-700"
        >
          <div class="bg-purple-100 p-4 text-center dark:bg-purple-900/30">
            Medium horizontal & vertical padding
          </div>
        </Container>
      </div>
    </div>
  );
});
