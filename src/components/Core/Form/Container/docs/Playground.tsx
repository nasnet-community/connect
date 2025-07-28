import { component$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "../../../../Docs/templates";
import { Container } from "../";

/**
 * Container component playground using the standard template
 */
export default component$(() => {
  // Define the ContainerDemo component that will be controlled by the playground
  const ContainerDemo = component$<{
    title: string;
    description: string;
    bordered: boolean;
    showFooter: boolean;
  }>((props) => {
    return (
      <Container
        title={props.title || undefined}
        description={props.description || undefined}
        bordered={props.bordered}
        class="max-w-lg"
      >
        <div class="grid gap-4">
          <div>
            <label class="mb-1 block text-sm font-medium" for="name-demo">
              Name
            </label>
            <input
              type="text"
              id="name-demo"
              class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium" for="email-demo">
              Email
            </label>
            <input
              type="email"
              id="email-demo"
              class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {props.showFooter && (
          <div
            q:slot="footer"
            class="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4 dark:border-gray-700"
          >
            <button class="rounded-md bg-gray-200 px-3 py-1.5 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              Cancel
            </button>
            <button class="rounded-md bg-primary-600 px-3 py-1.5 text-white">
              Submit
            </button>
          </div>
        )}
      </Container>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "title",
      label: "Title",
      defaultValue: "Contact Information",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "Please provide your contact details below.",
    },
    {
      type: "boolean",
      name: "bordered",
      label: "Bordered",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showFooter",
      label: "Show Footer",
      defaultValue: true,
    },
  ];

  return (
    <PlaygroundTemplate component={ContainerDemo} properties={properties} />
  );
});
