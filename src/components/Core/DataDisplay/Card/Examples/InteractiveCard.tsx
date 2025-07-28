import { component$ } from "@builder.io/qwik";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "~/components/Core/DataDisplay/Card";

export default component$(() => {
  return (
    <div class="p-4">
      <div class="flex flex-col gap-4 md:flex-row">
        <Card interactive={true} hoverEffect="raise" class="w-full md:w-1/3">
          <CardHeader>
            <h3 class="text-lg font-medium">Clickable Card</h3>
          </CardHeader>
          <CardBody>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This card is interactive and can be clicked or focused with
              keyboard. Notice the raise effect on hover and focus.
            </p>
          </CardBody>
          <CardFooter class="flex justify-end">
            <span class="text-sm text-blue-600 dark:text-blue-400">
              Learn more →
            </span>
          </CardFooter>
        </Card>

        <Card interactive={true} hoverEffect="border" class="w-full md:w-1/3">
          <CardHeader>
            <h3 class="text-lg font-medium">Border Highlight</h3>
          </CardHeader>
          <CardBody>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This card shows a border highlight effect when hovered or focused.
              It's also interactive.
            </p>
          </CardBody>
          <CardFooter class="flex justify-end">
            <span class="text-sm text-blue-600 dark:text-blue-400">
              Learn more →
            </span>
          </CardFooter>
        </Card>

        <Card interactive={true} hoverEffect="shadow" class="w-full md:w-1/3">
          <CardHeader>
            <h3 class="text-lg font-medium">Shadow Effect</h3>
          </CardHeader>
          <CardBody>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This card enhances its shadow when interacted with. Try hovering
              or focusing on it.
            </p>
          </CardBody>
          <CardFooter class="flex justify-end">
            <span class="text-sm text-blue-600 dark:text-blue-400">
              Learn more →
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
});
