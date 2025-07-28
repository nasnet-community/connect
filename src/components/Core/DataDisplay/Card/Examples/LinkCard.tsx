import { component$ } from "@builder.io/qwik";
import { Card, CardHeader, CardBody, CardFooter } from "../../Card";

export default component$(() => {
  return (
    <div class="p-4">
      <div class="flex flex-col gap-4 md:flex-row">
        <Card
          href="https://example.com"
          target="_blank"
          hoverEffect="raise"
          class="w-full md:w-1/2"
        >
          <CardHeader>
            <h3 class="text-lg font-medium">External Link Card</h3>
          </CardHeader>
          <CardBody>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This entire card is an anchor tag that links to an external URL.
              Clicking anywhere on the card will navigate to the link. It opens
              in a new tab because target="_blank" is specified.
            </p>
          </CardBody>
          <CardFooter class="flex items-center justify-between">
            <span class="text-sm text-gray-500">example.com</span>
            <span class="text-sm text-blue-600 dark:text-blue-400">
              Visit site →
            </span>
          </CardFooter>
        </Card>

        <Card href="/docs" hoverEffect="border" class="w-full md:w-1/2">
          <CardHeader>
            <h3 class="text-lg font-medium">Internal Link Card</h3>
          </CardHeader>
          <CardBody>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This card links to an internal page. Since no target is specified,
              it will navigate within the same tab. This is useful for
              navigation within your app.
            </p>
          </CardBody>
          <CardFooter class="flex justify-end">
            <span class="text-sm text-blue-600 dark:text-blue-400">
              View docs →
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
});
