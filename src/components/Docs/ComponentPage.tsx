import { component$, useSignal, $, JSXNode } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import {
  HiChevronLeftOutline,
  HiCubeOutline,
  HiPlayOutline,
  HiCodeBracketOutline,
  HiBeakerOutline,
  HiWrenchOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../Core/Card/Card";

export interface ComponentPageProps {
  name: string;
  description: string;
  Overview?: any;
  Examples?: any;
  APIReference?: any;
  Usage?: any;
  Playground?: any;
  ComponentIntegration?: string;
  Customization?: string;
  defaultTab?: "overview" | "examples" | "api" | "usage" | "playground";
}

export const ComponentPage = component$<ComponentPageProps>(
  ({
    name,
    description,
    Overview,
    Examples,
    APIReference,
    Usage,
    Playground,
    ComponentIntegration,
    Customization,
    defaultTab = "overview",
  }) => {
    const location = useLocation();
    const activeTab = useSignal(defaultTab);
    
    // Helper to safely render components
    const renderComponent = (Component: any) => {
      if (!Component) return null;
      // Check if it's a valid component
      if (typeof Component === 'function') {
        return <Component />;
      }
      // If it's already JSX, return it
      if (Component && typeof Component === 'object' && '_jsxQ' in Component) {
        return Component;
      }
      console.error('Invalid component type:', Component);
      return null;
    };

    return (
      <div class="w-full">
        <div class="mx-auto max-w-screen-2xl px-3 pb-16 sm:px-4 md:px-6">
          {/* Header */}
          <div class="mb-4 sm:mb-6 lg:mb-8">
            {/* Back Link */}
            <div class="mb-3 sm:mb-4">
              <Link
                href={`/${location.params.locale}/docs/components`}
                class="inline-flex items-center text-xs text-gray-600 hover:text-primary-600 sm:text-sm dark:text-gray-400 dark:hover:text-primary-500"
              >
                <HiChevronLeftOutline class="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Back to Components
              </Link>
            </div>

            {/* Component Name */}
            <h1 class="mb-2 text-xl font-bold text-gray-900 sm:mb-3 sm:text-2xl lg:text-3xl dark:text-white">
              {name}
            </h1>

            {/* Description */}
            <p class="max-w-3xl text-sm text-gray-600 sm:text-base dark:text-gray-300">
              {description}
            </p>
          </div>

          {/* Navigation */}
          <div class="mb-5 overflow-x-auto border-b border-gray-200 pb-2 sm:mb-6 lg:mb-8 dark:border-gray-800">
            <div class="flex min-w-max space-x-2 sm:space-x-3 lg:space-x-4">
              {Overview && (
                <button
                  onClick$={() => (activeTab.value = "overview")}
                  class={{
                    "flex items-center rounded-t-md px-3 py-2 text-sm font-medium sm:px-4 sm:py-3 sm:text-base lg:px-5":
                      true,
                    "border-b-2 border-primary-500 text-primary-600":
                      activeTab.value === "overview",
                    "text-gray-500 hover:border-b-2 hover:border-primary-300 hover:text-primary-600 dark:text-gray-400":
                      activeTab.value !== "overview",
                  }}
                >
                  <HiCubeOutline class="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  Overview
                </button>
              )}

              {Examples && (
                <button
                  onClick$={() => (activeTab.value = "examples")}
                  class={{
                    "flex items-center rounded-t-md px-3 py-2 text-sm font-medium sm:px-4 sm:py-3 sm:text-base lg:px-5":
                      true,
                    "border-b-2 border-primary-500 text-primary-600":
                      activeTab.value === "examples",
                    "text-gray-500 hover:border-b-2 hover:border-primary-300 hover:text-primary-600 dark:text-gray-400":
                      activeTab.value !== "examples",
                  }}
                >
                  <HiPlayOutline class="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  Examples
                </button>
              )}

              {APIReference && (
                <button
                  onClick$={() => (activeTab.value = "api")}
                  class={{
                    "flex items-center rounded-t-md px-3 py-2 text-sm font-medium sm:px-4 sm:py-3 sm:text-base lg:px-5":
                      true,
                    "border-b-2 border-primary-500 text-primary-600":
                      activeTab.value === "api",
                    "text-gray-500 hover:border-b-2 hover:border-primary-300 hover:text-primary-600 dark:text-gray-400":
                      activeTab.value !== "api",
                  }}
                >
                  <HiCodeBracketOutline class="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  API
                </button>
              )}

              {Usage && (
                <button
                  onClick$={() => (activeTab.value = "usage")}
                  class={{
                    "flex items-center rounded-t-md px-3 py-2 text-sm font-medium sm:px-4 sm:py-3 sm:text-base lg:px-5":
                      true,
                    "border-b-2 border-primary-500 text-primary-600":
                      activeTab.value === "usage",
                    "text-gray-500 hover:border-b-2 hover:border-primary-300 hover:text-primary-600 dark:text-gray-400":
                      activeTab.value !== "usage",
                  }}
                >
                  <HiWrenchOutline class="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  Usage
                </button>
              )}

              {Playground && (
                <button
                  onClick$={() => (activeTab.value = "playground")}
                  class={{
                    "flex items-center rounded-t-md px-3 py-2 text-sm font-medium sm:px-4 sm:py-3 sm:text-base lg:px-5":
                      true,
                    "border-b-2 border-primary-500 text-primary-600":
                      activeTab.value === "playground",
                    "text-gray-500 hover:border-b-2 hover:border-primary-300 hover:text-primary-600 dark:text-gray-400":
                      activeTab.value !== "playground",
                  }}
                >
                  <HiBeakerOutline class="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  Playground
                </button>
              )}
            </div>
          </div>

          {/* Overview section */}
          {activeTab.value === "overview" && (
            <section class="mb-5 sm:mb-6 lg:mb-8">
              {Overview && (
                <>
                  <h2 class="mb-3 flex items-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl dark:text-white">
                    <HiCubeOutline class="mr-2 h-4 w-4 text-primary-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    Overview
                  </h2>
                  {renderComponent(Overview)}
                </>
              )}

              {/* Component Integration and Customization */}
              {(ComponentIntegration || Customization) && (
                <div class="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 lg:mt-8 lg:grid-cols-2 lg:gap-6">
                  {ComponentIntegration && (
                    <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
                      <h3 class="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg lg:text-xl dark:text-white">
                        Component Integration
                      </h3>
                      <p class="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-gray-300">
                        {ComponentIntegration}
                      </p>
                    </Card>
                  )}

                  {Customization && (
                    <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
                      <h3 class="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg lg:text-xl dark:text-white">
                        Customization
                      </h3>
                      <p class="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-gray-300">
                        {Customization}
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Examples section */}
          {activeTab.value === "examples" && Examples && (
            <section class="mb-5 sm:mb-6 lg:mb-8">
              <h2 class="mb-3 flex items-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl dark:text-white">
                <HiPlayOutline class="mr-2 h-4 w-4 text-primary-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                Examples
              </h2>
              {renderComponent(Examples)}
            </section>
          )}

          {/* API Reference section */}
          {activeTab.value === "api" && APIReference && (
            <section class="mb-5 sm:mb-6 lg:mb-8">
              <h2 class="mb-3 flex items-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl dark:text-white">
                <HiCodeBracketOutline class="mr-2 h-4 w-4 text-primary-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                API Reference
              </h2>
              {renderComponent(APIReference)}
            </section>
          )}

          {/* Usage section */}
          {activeTab.value === "usage" && Usage && (
            <section class="mb-5 sm:mb-6 lg:mb-8">
              <h2 class="mb-3 flex items-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl dark:text-white">
                <HiWrenchOutline class="mr-2 h-4 w-4 text-primary-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                Usage Guidelines
              </h2>
              {renderComponent(Usage)}
            </section>
          )}

          {/* Playground section */}
          {activeTab.value === "playground" && Playground && (
            <section class="mb-5 sm:mb-6 lg:mb-8">
              <h2 class="mb-3 flex items-center text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl dark:text-white">
                <HiBeakerOutline class="mr-2 h-4 w-4 text-primary-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                Playground
              </h2>
              {renderComponent(Playground)}
            </section>
          )}
        </div>
      </div>
    );
  },
);

export default ComponentPage;
