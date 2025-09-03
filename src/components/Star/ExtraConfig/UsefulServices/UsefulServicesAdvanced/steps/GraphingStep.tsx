import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { SelectionCard, Card, CardHeader, CardBody } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const GraphingStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableInterface = useSignal(servicesData.graphing.enableInterface || false);
  const enableQueue = useSignal(servicesData.graphing.enableQueue || false);
  const enableResources = useSignal(servicesData.graphing.enableResources || false);

  // Graph configuration data
  const graphingOptions = [
    {
      id: "interface",
      title: $localize`Interface Monitoring`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      colorTheme: "blue",
      signal: enableInterface
    },
    {
      id: "queue",
      title: $localize`Queue Management`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      colorTheme: "green",
      signal: enableQueue
    },
    {
      id: "resources",
      title: $localize`System Resources`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      colorTheme: "purple",
      signal: enableResources
    }
  ];

  // Color theme mappings
  const colorThemes = {
    blue: {
      bg: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      border: "border-blue-200/50 dark:border-blue-700/50",
      icon: "bg-gradient-to-br from-blue-500 to-indigo-600",
      badge: "success"
    },
    green: {
      bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      border: "border-green-200/50 dark:border-green-700/50",
      icon: "bg-gradient-to-br from-green-500 to-emerald-600",
      badge: "success"
    },
    purple: {
      bg: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
      border: "border-purple-200/50 dark:border-purple-700/50",
      icon: "bg-gradient-to-br from-purple-500 to-violet-600",
      badge: "info"
    }
  };

  // Handler for graph type selection
  const handleGraphToggle$ = $((optionId: string) => {
    const option = graphingOptions.find(opt => opt.id === optionId);
    if (option) {
      option.signal.value = !option.signal.value;
      validateAndUpdate$();
    }
  });

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.graphing = {
      enableInterface: enableInterface.value,
      enableQueue: enableQueue.value,
      enableResources: enableResources.value,
    };

    // Validate: At least one graphing option must be selected
    const isComplete = enableInterface.value || enableQueue.value || enableResources.value;

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 3,
    );
    if (currentStepIndex !== -1) {
      context.updateStepCompletion$(
        context.steps.value[currentStepIndex].id,
        isComplete,
      );
    }
  });

  // Run validation on component mount and when values change
  useVisibleTask$(() => {
    validateAndUpdate$();
  });

  const selectedCount = [enableInterface.value, enableQueue.value, enableResources.value].filter(Boolean).length;
  const selectedOptions = graphingOptions.filter(opt => opt.signal.value);

  return (
    <div class="space-y-8 animate-fade-in-up">
      {/* Modern header */}
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white mb-6 shadow-xl shadow-emerald-500/25 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
          {$localize`Network Graphing`}
        </h3>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {$localize`Enable comprehensive network monitoring with real-time graphs and performance analytics`}
        </p>
      </div>

      {/* Graph Type Selection */}
      <div class="space-y-6">
        <div class="text-center">
          <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {$localize`Choose Monitoring Types`}
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Select the types of network data you want to monitor and visualize`}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {graphingOptions.map((option) => {
            const theme = colorThemes[option.colorTheme as keyof typeof colorThemes];
            return (
              <SelectionCard
                key={option.id}
                isSelected={option.signal.value}
                title={option.title}
                icon={
                  <div class={`flex h-16 w-16 items-center justify-center rounded-2xl ${theme.icon} text-white shadow-lg transition-transform group-hover:scale-110`}>
                    {option.icon}
                  </div>
                }
                onClick$={() => handleGraphToggle$(option.id)}
                class={`transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${theme.bg} border-2 ${theme.border}`}
                badge={option.signal.value ? $localize`Active` : undefined}
                badgeVariant={option.signal.value ? theme.badge as any : undefined}
              />
            );
          })}
        </div>
      </div>

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <Card class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200/50 dark:border-green-700/50 shadow-xl animate-fade-in-up">
          <CardHeader>
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-xl font-bold text-green-800 dark:text-green-200">
                  {$localize`Active Monitoring`}
                </h4>
                <p class="text-green-600 dark:text-green-400">
                  {selectedCount === 1 
                    ? $localize`1 graph type selected`
                    : $localize`${selectedCount} graph types selected`
                  }
                </p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div class="space-y-4">
              <p class="text-sm text-green-800 dark:text-green-300 font-medium">
                {$localize`The following monitoring graphs will be enabled:`}
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedOptions.map((option) => (
                  <div key={option.id} class="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <div class="text-green-600 dark:text-green-400">
                      {option.icon}
                    </div>
                    <div>
                      <p class="font-medium text-green-900 dark:text-green-200 text-sm">
                        {option.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      )}


      {/* Bottom status indicator */}
      <div class="text-center">
        <div class="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 px-6 py-3 text-sm backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d={selectedCount > 0 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
          </svg>
          <span class="font-medium text-emerald-700 dark:text-emerald-300">
            {selectedCount > 0 
              ? `${$localize`Monitoring enabled for`} ${selectedCount} ${selectedCount === 1 ? $localize`graph type` : $localize`graph types`}`
              : $localize`Select monitoring types to enable network graphing`
            }
          </span>
        </div>
      </div>
    </div>
  );
});