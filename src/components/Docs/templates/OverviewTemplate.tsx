import { component$, Slot } from "@builder.io/qwik";
import { Card } from "../../Core/Card/Card";

export interface OverviewTemplateProps {
  title?: string;
  description?: string;
  importStatement?: string;
  features?: string[] | Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  keyFeatures?: string[] | Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  whenToUse?: string[];
  whenNotToUse?: string[];
}

export const OverviewTemplate = component$<OverviewTemplateProps>(
  ({
    title = "Overview",
    description,
    importStatement,
    features = [],
    keyFeatures = [],
    whenToUse = [],
    whenNotToUse = [],
  }) => {
    return (
      <div class="space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Main description */}
        <Card
          variant="elevated"
          class="overflow-hidden border border-gray-200 p-3 sm:p-4 lg:p-6 dark:border-gray-700"
        >
          <div class="prose prose-sm max-w-none sm:prose-base dark:prose-invert">
            <h2 class="mb-2 text-lg font-bold text-gray-900 sm:mb-3 sm:text-xl lg:mb-4 lg:text-2xl dark:text-white">
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p class="mb-4 text-sm text-gray-600 sm:text-base dark:text-gray-300">
                {description}
              </p>
            )}

            {/* Import Statement */}
            {importStatement && (
              <div class="mb-4">
                <pre class="rounded-md bg-gray-100 p-3 text-xs text-gray-800 sm:text-sm dark:bg-gray-800 dark:text-gray-200">
                  <code>{importStatement}</code>
                </pre>
              </div>
            )}

            {/* The main description content will be inserted here */}
            <div class="text-sm sm:text-base">
              <Slot />
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div class="mt-4 sm:mt-5 lg:mt-6">
                <h3 class="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg dark:text-white">
                  Features
                </h3>
                <ul class="list-disc space-y-1 pl-4 sm:space-y-2 sm:pl-5">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      class="text-sm text-gray-700 sm:text-base dark:text-gray-300"
                    >
                      {typeof feature === 'string' ? feature : (
                        <>
                          {feature.icon && <span class="mr-2">{feature.icon}</span>}
                          <strong>{feature.title}:</strong> {feature.description}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Features */}
            {keyFeatures.length > 0 && (
              <div class="mt-4 sm:mt-5 lg:mt-6">
                <h3 class="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg dark:text-white">
                  Key Features
                </h3>
                <ul class="list-disc space-y-1 pl-4 sm:space-y-2 sm:pl-5">
                  {keyFeatures.map((feature, index) => (
                    <li
                      key={index}
                      class="text-sm text-gray-700 sm:text-base dark:text-gray-300"
                    >
                      {typeof feature === 'string' ? feature : (
                        <>
                          {feature.icon && <span class="mr-2">{feature.icon}</span>}
                          <strong>{feature.title}:</strong> {feature.description}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* When to use / When not to use */}
        {(whenToUse.length > 0 || whenNotToUse.length > 0) && (
          <div class="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-6">
            {whenToUse.length > 0 && (
              <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
                <h3 class="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg dark:text-white">
                  When to Use
                </h3>
                <ul class="list-disc space-y-1 pl-4 sm:space-y-2 sm:pl-5">
                  {whenToUse.map((item, index) => (
                    <li
                      key={index}
                      class="text-sm text-gray-700 sm:text-base dark:text-gray-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {whenNotToUse.length > 0 && (
              <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
                <h3 class="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg dark:text-white">
                  When Not to Use
                </h3>
                <ul class="list-disc space-y-1 pl-4 sm:space-y-2 sm:pl-5">
                  {whenNotToUse.map((item, index) => (
                    <li
                      key={index}
                      class="text-sm text-gray-700 sm:text-base dark:text-gray-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default OverviewTemplate;
