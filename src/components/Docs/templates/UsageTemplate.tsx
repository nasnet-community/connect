import { component$, Slot } from "@builder.io/qwik";
import { Card } from "../../Core/Card/Card";
import CodeExample from "../CodeExample";

export interface UsageGuideline {
  title: string;
  description: string;
  code?: string;
  component?: any; // The actual component to render
  type?: "do" | "dont";
  example?: string;
}

export interface BestPractice {
  title: string;
  description: string;
  category?: string;
  practices?: Array<{
    title: string;
    description: string;
    correct?: string;
    incorrect?: string;
  }>;
}

export interface AccessibilityTip {
  title: string;
  description: string;
  implementation?: string;
}

export interface UsageTemplateProps {
  guidelines?: UsageGuideline[];
  bestPractices?: BestPractice[];
  accessibilityTips?: AccessibilityTip[];
  performanceTips?: string[];
  installation?: string; // Installation code
  basicUsage?: string; // Basic usage examples
  advancedUsage?: string; // Advanced usage examples
  dos?: string[]; // Do guidelines
  donts?: string[]; // Don't guidelines
}

export const UsageTemplate = component$<UsageTemplateProps>(
  ({
    guidelines = [],
    bestPractices = [],
    accessibilityTips = [],
    performanceTips = [],
    installation,
    basicUsage,
    advancedUsage,
    dos = [],
    donts = [],
  }) => {
    const doGuidelines = guidelines.filter((g) => g.type === "do");
    const dontGuidelines = guidelines.filter((g) => g.type === "dont");

    // Convert string arrays to guideline objects if provided
    const allDos = [
      ...doGuidelines,
      ...dos.map((text) => ({
        title: text,
        description: text,
        type: "do" as const,
        component: undefined,
        code: undefined,
      })),
    ];
    const allDonts = [
      ...dontGuidelines,
      ...donts.map((text) => ({
        title: text,
        description: text,
        type: "dont" as const,
        component: undefined,
        code: undefined,
      })),
    ];

    return (
      <div class="space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Introduction to usage */}
        <div class="mb-4 sm:mb-5 lg:mb-6">
          <div class="text-sm sm:text-base">
            <Slot />
          </div>
        </div>

        {/* Installation */}
        {installation && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Installation
              </h3>
            </div>
            <div class="p-3 sm:p-4 lg:p-6">
              <pre class="rounded-md bg-gray-100 p-3 text-xs text-gray-800 sm:text-sm dark:bg-gray-800 dark:text-gray-200">
                <code>{installation}</code>
              </pre>
            </div>
          </Card>
        )}

        {/* Basic Usage */}
        {basicUsage && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Basic Usage
              </h3>
            </div>
            <div class="p-3 sm:p-4 lg:p-6">
              <pre class="rounded-md bg-gray-100 p-3 text-xs text-gray-800 sm:text-sm dark:bg-gray-800 dark:text-gray-200">
                <code>{basicUsage}</code>
              </pre>
            </div>
          </Card>
        )}

        {/* Advanced Usage */}
        {advancedUsage && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Advanced Usage
              </h3>
            </div>
            <div class="p-3 sm:p-4 lg:p-6">
              <pre class="rounded-md bg-gray-100 p-3 text-xs text-gray-800 sm:text-sm dark:bg-gray-800 dark:text-gray-200">
                <code>{advancedUsage}</code>
              </pre>
            </div>
          </Card>
        )}

        {/* Do's and Don'ts */}
        {(allDos.length > 0 || allDonts.length > 0) && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Guidelines
              </h3>
            </div>

            <div class="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-gray-700">
              {/* Do's */}
              <div class="p-3 sm:p-4 lg:p-6">
                <h4 class="mb-3 flex items-center text-sm font-medium text-green-600 sm:mb-4 sm:text-base lg:text-lg dark:text-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Do
                </h4>

                <div class="space-y-4 sm:space-y-5 lg:space-y-6">
                  {allDos.map((guideline, index) => (
                    <div
                      key={index}
                      class="overflow-hidden rounded-md border border-green-200 dark:border-green-900"
                    >
                      <div class="border-b border-green-200 bg-green-50 p-3 sm:p-4 dark:border-green-900 dark:bg-green-900/20">
                        <h5 class="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                          {guideline.title}
                        </h5>
                        <p class="mt-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                          {guideline.description}
                        </p>
                      </div>

                      {guideline.component && (
                        <div class="bg-white p-3 sm:p-4 dark:bg-gray-800">
                          {guideline.component}
                        </div>
                      )}

                      {guideline.code && (
                        <CodeExample
                          code={guideline.code}
                          language="tsx"
                          showLineNumbers={false}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Don'ts */}
              <div class="p-3 sm:p-4 lg:p-6">
                <h4 class="mb-3 flex items-center text-sm font-medium text-red-600 sm:mb-4 sm:text-base lg:text-lg dark:text-red-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Don't
                </h4>

                <div class="space-y-4 sm:space-y-5 lg:space-y-6">
                  {allDonts.map((guideline, index) => (
                    <div
                      key={index}
                      class="overflow-hidden rounded-md border border-red-200 dark:border-red-900"
                    >
                      <div class="border-b border-red-200 bg-red-50 p-3 sm:p-4 dark:border-red-900 dark:bg-red-900/20">
                        <h5 class="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                          {guideline.title}
                        </h5>
                        <p class="mt-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                          {guideline.description}
                        </p>
                      </div>

                      {guideline.component && (
                        <div class="bg-white p-3 sm:p-4 dark:bg-gray-800">
                          {guideline.component}
                        </div>
                      )}

                      {guideline.code && (
                        <CodeExample
                          code={guideline.code}
                          language="tsx"
                          showLineNumbers={false}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Best Practices */}
        {bestPractices.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Best Practices
              </h3>
            </div>

            <div class="p-3 sm:p-4 lg:p-6">
              <ul class="space-y-3 sm:space-y-4">
                {bestPractices.map((practice, index) => (
                  <li
                    key={index}
                    class="rounded-md bg-gray-50 p-3 sm:p-4 dark:bg-gray-900"
                  >
                    <h4 class="mb-1 text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                      {practice.title}
                    </h4>
                    <p class="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                      {practice.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Accessibility */}
        {accessibilityTips.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Accessibility Considerations
              </h3>
            </div>

            <div class="p-3 sm:p-4 lg:p-6">
              <ul class="space-y-3 sm:space-y-4">
                {accessibilityTips.map((tip, index) => (
                  <li
                    key={index}
                    class="rounded-md border border-blue-100 bg-blue-50 p-3 sm:p-4 dark:border-blue-900 dark:bg-blue-900/20"
                  >
                    <h4 class="mb-1 text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                      {tip.title}
                    </h4>
                    <p class="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                      {tip.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Performance Considerations */}
        {performanceTips.length > 0 && (
          <Card variant="elevated" class="overflow-hidden">
            <div class="border-b border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700">
              <h3 class="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl dark:text-white">
                Performance Considerations
              </h3>
            </div>

            <div class="p-3 sm:p-4 lg:p-6">
              <ul class="list-disc space-y-1 pl-4 text-sm sm:space-y-2 sm:pl-5 sm:text-base">
                {performanceTips.map((tip, index) => (
                  <li key={index} class="text-gray-700 dark:text-gray-300">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    );
  },
);

export default UsageTemplate;
