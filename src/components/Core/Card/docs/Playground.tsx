import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates/PlaygroundTemplate";
import { Card } from "~/components/Core/Card/Card";

export default component$(() => {
  return (
    <PlaygroundTemplate
      component={Card}
      properties={[
        {
          type: "select",
          name: "variant",
          label: "Variant",
          defaultValue: "default",
          options: [
            { label: "Default", value: "default" },
            { label: "Bordered", value: "bordered" },
            { label: "Elevated", value: "elevated" },
            { label: "Success", value: "success" },
            { label: "Warning", value: "warning" },
            { label: "Error", value: "error" },
            { label: "Info", value: "info" },
            { label: "Glass", value: "glass" },
            { label: "Gradient", value: "gradient" },
          ],
        },
        {
          type: "boolean",
          name: "hasHeader",
          label: "Has Header",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "hasFooter",
          label: "Has Footer",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "hasActions",
          label: "Has Actions",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "loading",
          label: "Loading",
          defaultValue: false,
        },
        {
          type: "boolean",
          name: "noPadding",
          label: "No Padding",
          defaultValue: false,
        },
        {
          type: "text",
          name: "containerClass",
          label: "Container Class",
          placeholder: "e.g., @container/card max-w-md",
        },
      ]}
    >
      <div class="mx-auto w-full max-w-xl">
        <Card>
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Card Playground
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Use the controls above to customize this card. Try different
              variants and settings to see how the Card component behaves with
              various configurations.
            </p>
            <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <h4 class="mb-2 text-sm font-semibold">Features to Test:</h4>
              <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Try different variants (semantic colors and special effects)</li>
                <li>• Enable header/footer sections with hasHeader/hasFooter</li>
                <li>• Add action buttons with hasActions</li>
                <li>• Test loading state with the loading toggle</li>
                <li>• Remove padding with noPadding for media content</li>
                <li>• Add container classes for responsive behavior</li>
              </ul>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">
                Interactive playground
              </span>
              <div class="flex gap-2">
                <button class="rounded px-3 py-1 text-xs bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                  Example
                </button>
                <button class="rounded px-3 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PlaygroundTemplate>
  );
});
