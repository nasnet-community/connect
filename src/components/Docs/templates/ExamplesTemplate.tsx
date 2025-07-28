import { component$, Slot } from "@builder.io/qwik";
import { Card } from "../../Core/Card/Card";

export interface Example {
  title: string;
  description?: string;
  component?: any; // The actual component to render
  path?: string; // Path to example file
  code?: string; // Code snippet to display
}

export interface ExamplesTemplateProps {
  examples?: Example[];
}

export const ExamplesTemplate = component$<ExamplesTemplateProps>(
  ({ examples = [] }) => {
    return (
      <div class="space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Introduction to examples */}
        <div class="mb-4 text-sm sm:mb-5 sm:text-base lg:mb-6">
          <Slot />
        </div>

        {/* Examples */}
        {examples.map((example, index) => (
          <Card key={index} variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="mb-1 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg lg:text-xl dark:text-white">
                {example.title}
              </h3>
              {example.description && (
                <p class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
                  {example.description}
                </p>
              )}
            </div>

            {/* Component Example */}
            <div class="bg-white p-3 sm:p-4 lg:p-6 dark:bg-gray-800">
              <div class="flex items-center justify-center rounded-md bg-gray-50 p-3 sm:p-4 lg:p-6 dark:bg-gray-900">
                {example.component}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
);

export default ExamplesTemplate;
