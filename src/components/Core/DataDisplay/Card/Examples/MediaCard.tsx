import { component$ } from "@builder.io/qwik";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardMedia,
} from "~/components/Core/DataDisplay/Card";

export const MediaCard = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Media Card - Image Top</h3>
        <Card class="max-w-md">
          <CardMedia
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
            alt="Laptop on desk"
            class="h-48 w-full object-cover"
          />
          <CardHeader>
            <h3 class="text-lg font-medium">Web Development</h3>
          </CardHeader>
          <CardBody>
            <p>
              Modern web development with Qwik allows you to build incredibly
              fast, resumable applications without the hydration cost of
              traditional frameworks.
            </p>
          </CardBody>
          <CardFooter>
            <button class="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Learn More
            </button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Horizontal Media Card</h3>
        <Card class="max-w-2xl">
          <div class="flex flex-col md:flex-row">
            <CardMedia
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159"
              alt="Code on screen"
              class="h-full object-cover md:w-1/3"
            />
            <div class="md:w-2/3">
              <CardHeader>
                <h3 class="text-lg font-medium">Developer Resources</h3>
              </CardHeader>
              <CardBody>
                <p>
                  Access a wide range of development tools, tutorials, and
                  resources to accelerate your web application development with
                  Qwik.
                </p>
              </CardBody>
              <CardFooter>
                <div class="flex space-x-2">
                  <button class="flex-1 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                    Docs
                  </button>
                  <button class="flex-1 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Get Started
                  </button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
});
