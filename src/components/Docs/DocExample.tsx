import { component$ } from "@builder.io/qwik";
import { CodeExample } from "./CodeExample";

export interface DocExampleProps {
  /**
   * The title of the example
   */
  title: string;

  /**
   * Description text explaining the example
   */
  description?: string;

  /**
   * The component to render as an example
   */
  preview: any;

  /**
   * The source code to display
   */
  code: string;
}

export const DocExample = component$<DocExampleProps>(
  ({ title, description, preview, code }) => {
    return (
      <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Header with title and description */}
        <div class="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {/* Preview area */}
        <div class="border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
          <div class="mx-auto">{preview}</div>
        </div>

        {/* Code area */}
        <div class="bg-white p-6 dark:bg-gray-800">
          <CodeExample
            code={code.trim()}
            language="tsx"
            showLineNumbers={true}
          />
        </div>
      </div>
    );
  },
);

export default DocExample;
