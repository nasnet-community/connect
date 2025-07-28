import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Card } from "~/components/Core/Card/Card";
import { HiBookOpenOutline } from "@qwikest/icons/heroicons";

export interface ComponentItem {
  name: string;
  description: string;
  path: string;
  status: "stable" | "coming soon";
}

export interface ComponentGroup {
  name: string;
  description: string;
  icon: any; // This is now a QRL
  components: ComponentItem[];
}

export interface ComponentGroupsDisplayProps {
  componentGroups: ComponentGroup[];
  locale?: string;
}

export const ComponentGroupsDisplay = component$<ComponentGroupsDisplayProps>(
  ({ componentGroups }) => {
    return (
      <div class="space-y-8">
        <div class="mb-8">
          <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            Components
          </h1>
          <p class="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Browse our library of reusable UI components with comprehensive
            documentation, interactive examples, and usage guidelines.
          </p>
        </div>

        <div class="space-y-12">
          {componentGroups.map((group, index) => {
            const IconComponent = group.icon;

            return (
              <div key={index} class="space-y-6">
                <div class="flex items-center gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <IconComponent class="h-5 w-5" />
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                      {group.name}
                    </h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.components.map((component, compIndex) => (
                    <Card
                      key={compIndex}
                      variant="elevated"
                      class="h-full transition-all hover:shadow-lg"
                    >
                      {component.status === "stable" ? (
                        <Link href={component.path} class="block h-full p-1">
                          <div class="flex items-start justify-between p-3">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                              {component.name}
                            </h3>
                            <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
                              Stable
                            </span>
                          </div>
                          <p class="px-3 pb-4 text-sm text-gray-600 dark:text-gray-300">
                            {component.description}
                          </p>
                          <div class="mt-2 flex items-center px-3 pb-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                            <span>View documentation</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="ml-1 h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </Link>
                      ) : (
                        <div class="flex h-full flex-col p-4">
                          <div class="flex items-start justify-between">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                              {component.name}
                            </h3>
                            <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              Coming soon
                            </span>
                          </div>
                          <p class="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-300">
                            {component.description}
                          </p>
                          <div class="mt-3 flex items-center border-t border-gray-100 pt-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                            <HiBookOpenOutline class="mr-1.5 h-4 w-4" />
                            <span>Documentation in progress</span>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
