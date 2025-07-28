import { component$ } from "@builder.io/qwik";
import { Card, CardHeader, CardBody, CardFooter } from "../../Card";

export default component$(() => {
  return (
    <div class="p-4">
      <Card
        interactive={true}
        hoverEffect="border"
        class="mx-auto max-w-lg"
        id="accessible-card"
        aria-labelledby="card-heading"
        aria-describedby="card-description"
      >
        <CardHeader>
          <h3 id="card-heading" class="text-lg font-medium">
            Accessible Card
          </h3>
        </CardHeader>
        <CardBody>
          <p
            id="card-description"
            class="text-sm text-gray-600 dark:text-gray-300"
          >
            This card demonstrates proper accessibility implementation. It has
            proper ARIA attributes connecting the card to its heading and
            description. The interactive card can be navigated to with keyboard
            and activated with Enter or Space.
          </p>
          <ul class="mt-4 list-inside list-disc text-sm">
            <li>Uses aria-labelledby to associate the card with its heading</li>
            <li>Uses aria-describedby to provide additional context</li>
            <li>Keyboard navigable with proper focus indicators</li>
            <li>Supports screen readers through semantic HTML and ARIA</li>
          </ul>
        </CardBody>
        <CardFooter class="flex justify-end">
          <button
            class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Learn more about accessibility"
          >
            Learn More
          </button>
        </CardFooter>
      </Card>
    </div>
  );
});
