import { component$, useSignal } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { HiChevronLeftOutline, HiCubeOutline, HiPlayOutline, HiCodeBracketOutline, HiBeakerOutline, HiWrenchOutline } from "@qwikest/icons/heroicons";
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

export const ComponentPage = component$<ComponentPageProps>(({ 
  name, 
  description,
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
  ComponentIntegration,
  Customization,
  defaultTab = "overview"
}) => {
  const location = useLocation();
  const activeTab = useSignal(defaultTab);

  return (
    <div class="w-full">
      <div class="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 pb-16">
        {/* Header */}
        <div class="mb-4 sm:mb-6 lg:mb-8">
          {/* Back Link */}
          <div class="mb-3 sm:mb-4">
            <Link href={`/${location.params.locale}/docs/components`} class="inline-flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500">
              <HiChevronLeftOutline class="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Back to Components
            </Link>
          </div>
          
          {/* Component Name */}
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{name}</h1>
          
          {/* Description */}
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl">{description}</p>
        </div>
        
        {/* Navigation */}
        <div class="border-b border-gray-200 dark:border-gray-800 pb-2 mb-5 sm:mb-6 lg:mb-8 overflow-x-auto">
          <div class="flex space-x-2 sm:space-x-3 lg:space-x-4 min-w-max">
            {Overview && (
              <button
                onClick$={() => activeTab.value = "overview"}
                class={{
                  "px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-t-md text-sm sm:text-base font-medium flex items-center": true,
                  "text-primary-600 border-b-2 border-primary-500": activeTab.value === "overview",
                  "text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:border-b-2 hover:border-primary-300": activeTab.value !== "overview"
                }}
              >
                <HiCubeOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3" />
                Overview
              </button>
            )}
            
            {Examples && (
              <button
                onClick$={() => activeTab.value = "examples"}
                class={{
                  "px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-t-md text-sm sm:text-base font-medium flex items-center": true,
                  "text-primary-600 border-b-2 border-primary-500": activeTab.value === "examples",
                  "text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:border-b-2 hover:border-primary-300": activeTab.value !== "examples"
                }}
              >
                <HiPlayOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3" />
                Examples
              </button>
            )}
            
            {APIReference && (
              <button
                onClick$={() => activeTab.value = "api"}
                class={{
                  "px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-t-md text-sm sm:text-base font-medium flex items-center": true,
                  "text-primary-600 border-b-2 border-primary-500": activeTab.value === "api",
                  "text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:border-b-2 hover:border-primary-300": activeTab.value !== "api"
                }}
              >
                <HiCodeBracketOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3" />
                API
              </button>
            )}
            
            {Usage && (
              <button
                onClick$={() => activeTab.value = "usage"}
                class={{
                  "px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-t-md text-sm sm:text-base font-medium flex items-center": true,
                  "text-primary-600 border-b-2 border-primary-500": activeTab.value === "usage",
                  "text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:border-b-2 hover:border-primary-300": activeTab.value !== "usage"
                }}
              >
                <HiWrenchOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3" />
                Usage
              </button>
            )}
            
            {Playground && (
              <button
                onClick$={() => activeTab.value = "playground"}
                class={{
                  "px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-t-md text-sm sm:text-base font-medium flex items-center": true,
                  "text-primary-600 border-b-2 border-primary-500": activeTab.value === "playground",
                  "text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:border-b-2 hover:border-primary-300": activeTab.value !== "playground"
                }}
              >
                <HiBeakerOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3" />
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
                <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center">
                  <HiCubeOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-primary-500" />
                  Overview
                </h2>
                <Overview />
              </>
            )}
            
            {/* Component Integration and Customization */}
            {(ComponentIntegration || Customization) && (
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mt-5 sm:mt-6 lg:mt-8">
                {ComponentIntegration && (
                  <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
                    <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Component Integration</h3>
                    <p class="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300">
                      {ComponentIntegration}
                    </p>
                  </Card>
                )}
                
                {Customization && (
                  <Card variant="elevated" class="p-3 sm:p-4 lg:p-6">
                    <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Customization</h3>
                    <p class="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300">
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
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center">
              <HiPlayOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-primary-500" />
              Examples
            </h2>
            <Examples />
          </section>
        )}
        
        {/* API Reference section */}
        {activeTab.value === "api" && APIReference && (
          <section class="mb-5 sm:mb-6 lg:mb-8">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center">
              <HiCodeBracketOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-primary-500" />
              API Reference
            </h2>
            <APIReference />
          </section>
        )}
        
        {/* Usage section */}
        {activeTab.value === "usage" && Usage && (
          <section class="mb-5 sm:mb-6 lg:mb-8">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center">
              <HiWrenchOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-primary-500" />
              Usage Guidelines
            </h2>
            <Usage />
          </section>
        )}
        
        {/* Playground section */}
        {activeTab.value === "playground" && Playground && (
          <section class="mb-5 sm:mb-6 lg:mb-8">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center">
              <HiBeakerOutline class="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-primary-500" />
              Playground
            </h2>
            <Playground />
          </section>
        )}
      </div>
    </div>
  );
});

export default ComponentPage;