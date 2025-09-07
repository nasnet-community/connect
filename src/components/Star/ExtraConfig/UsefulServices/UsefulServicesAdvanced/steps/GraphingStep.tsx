import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { SelectionCard } from "~/components/Core";
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
      colorTheme: "primary",
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
      colorTheme: "primary",
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
      colorTheme: "primary",
      signal: enableResources
    }
  ];

  // Enhanced color theme mappings using primary colors
  const colorThemes = {
    primary: {
      bg: "from-primary-50/80 to-primary-100/80 dark:from-primary-900/20 dark:to-primary-800/20",
      border: "border-primary-200/30 dark:border-primary-700/30",
      icon: "bg-gradient-to-br from-primary-500 to-primary-600",
      selectedBg: "from-primary-100/90 to-primary-200/90 dark:from-primary-800/40 dark:to-primary-700/40",
      selectedBorder: "border-primary-400/50 dark:border-primary-500/50"
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

  return (
    <div class="space-y-8 animate-fade-in-up">
      {/* Enhanced modern header with glassmorphism */}
      <div class="text-center space-y-6">
        <div class="relative inline-flex items-center justify-center">
          {/* Subtle glow effect */}
          <div class="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500/15 via-primary-500/15 to-primary-500/15 animate-pulse-slow"></div>
          <div class="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-500 text-white shadow-2xl shadow-primary-500/30 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-primary-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 transition-transform duration-500 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white animate-gradient bg-300%">
            {$localize`Network Graphing`}
          </h3>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {$localize`Enable comprehensive network monitoring with real-time graphs and performance analytics`}
          </p>
        </div>
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
            const theme = colorThemes.primary;
            return (
              <SelectionCard
                key={option.id}
                isSelected={option.signal.value}
                title={option.title}
                icon={
                  <div class={`flex h-16 w-16 items-center justify-center rounded-2xl ${theme.icon} text-white shadow-xl`}>
                    {option.icon}
                  </div>
                }
                onClick$={() => handleGraphToggle$(option.id)}
                class={`relative overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 bg-gradient-to-br ${option.signal.value ? theme.selectedBg : theme.bg} border ${option.signal.value ? theme.selectedBorder : theme.border}`}
              />
            );
          })}
        </div>
      </div>



    </div>
  );
});