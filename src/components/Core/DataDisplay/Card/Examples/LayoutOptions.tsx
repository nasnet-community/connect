import { component$ } from "@builder.io/qwik";
import { Card, CardHeader, CardBody } from "../../Card";

export default component$(() => {
  return (
    <div class="p-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 class="mb-2 text-sm font-semibold">Full Width Card</h3>
          <Card fullWidth={true} variant="outlined">
            <CardHeader>
              <h3 class="text-lg font-medium">Full Width</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                This card expands to fill the width of its container.
              </p>
            </CardBody>
          </Card>
        </div>

        <div>
          <h3 class="mb-2 text-sm font-semibold">Card with Fixed Width</h3>
          <Card class="w-64" variant="outlined">
            <CardHeader>
              <h3 class="text-lg font-medium">Fixed Width</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                This card has a fixed width of 16rem (256px).
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-4">
        <div>
          <h3 class="mb-2 text-sm font-semibold">
            Full Height Card in Container
          </h3>
          <div class="h-48 rounded-md border border-dashed border-gray-300 p-4 dark:border-gray-700">
            <Card
              fullHeight={true}
              variant="outlined"
              class="bg-blue-50 dark:bg-blue-900/20"
            >
              <CardBody class="flex items-center justify-center">
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  This card expands to fill the height of its container (192px).
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});
