import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { SelectionCard, Card, CardHeader, Toggle, Alert } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const NATPMPStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const natpmpEnabled = useSignal(servicesData.natpmp?.enabled || false);
  const linkType = useSignal(servicesData.natpmp?.linkType || "domestic");

  // Link type options
  const linkTypeOptions = [
    {
      id: "domestic",
      title: $localize`Domestic Link`,
      description: $localize`Local network connection`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      colorTheme: "green",
      recommended: true
    },
    {
      id: "foreign",
      title: $localize`Foreign Link`,
      description: $localize`External network connection`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      ),
      colorTheme: "blue"
    },
    {
      id: "vpn",
      title: $localize`VPN Link`,
      description: $localize`VPN tunnel connection`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      colorTheme: "purple",
      warning: true
    }
  ];

  // Color theme mappings
  const colorThemes = {
    green: {
      bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      border: "border-green-200/50 dark:border-green-700/50",
      icon: "bg-gradient-to-br from-green-500 to-emerald-600",
      badge: "success"
    },
    blue: {
      bg: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      border: "border-blue-200/50 dark:border-blue-700/50",
      icon: "bg-gradient-to-br from-blue-500 to-indigo-600",
      badge: "info"
    },
    purple: {
      bg: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
      border: "border-purple-200/50 dark:border-purple-700/50",
      icon: "bg-gradient-to-br from-purple-500 to-violet-600",
      badge: "warning"
    }
  };

  // Handle link type selection
  const handleLinkTypeSelect$ = $((selectedType: string) => {
    linkType.value = selectedType;
    validateAndUpdate$();
  });

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.natpmp = {
      enabled: natpmpEnabled.value,
      linkType: linkType.value,
    };

    // Validate: Step is complete when NAT-PMP is disabled or when enabled with a link type selected
    const isComplete = !natpmpEnabled.value || (natpmpEnabled.value && linkType.value);

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 6, // NAT-PMP step ID
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
      {/* Modern header */}
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white mb-6 shadow-xl shadow-teal-500/25 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
          {$localize`NAT-PMP Configuration`}
        </h3>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {$localize`Configure NAT Port Mapping Protocol for automatic port forwarding and NAT traversal`}
        </p>
      </div>

      {/* NAT-PMP Enable Toggle */}
      <Card class="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200/50 dark:border-teal-700/50 shadow-lg">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {$localize`Enable NAT-PMP`}
                </h4>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                  {$localize`Enable Network Address Translation Port Mapping Protocol`}
                </p>
                <div class="mt-3 flex items-center gap-3">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                    {$localize`Port Mapping`}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                    {$localize`NAT Traversal`}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400">
                    {$localize`Apple Compatible`}
                  </span>
                </div>
              </div>
            </div>
            <Toggle
              checked={natpmpEnabled.value}
              onChange$={$((checked) => {
                natpmpEnabled.value = checked;
                validateAndUpdate$();
              })}
              size="lg"
              color="primary"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Link Type Selection - shown only when NAT-PMP is enabled */}
      {natpmpEnabled.value && (
        <div class="space-y-6 animate-fade-in-up">
          <div class="text-center">
            <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {$localize`Choose Link Type`}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              {$localize`Select the type of network connection where NAT-PMP will be enabled`}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {linkTypeOptions.map((option) => {
              const theme = colorThemes[option.colorTheme as keyof typeof colorThemes];
              return (
                <SelectionCard
                  key={option.id}
                  isSelected={linkType.value === option.id}
                  title={option.title}
                  description={option.description}
                  icon={
                    <div class={`flex h-16 w-16 items-center justify-center rounded-2xl ${theme.icon} text-white shadow-lg transition-transform group-hover:scale-110`}>
                      {option.icon}
                    </div>
                  }
                  onClick$={() => handleLinkTypeSelect$(option.id)}
                  class={`transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${theme.bg} border-2 ${theme.border} ${option.warning ? 'ring-2 ring-amber-300 dark:ring-amber-600' : ''}`}
                  badge={option.recommended ? $localize`Recommended` : (option.warning ? $localize`Requires Support` : undefined)}
                  badgeVariant={option.recommended ? "success" : (option.warning ? "warning" : "default")}
                />
              );
            })}
          </div>

          {/* VPN Warning */}
          {linkType.value === "vpn" && (
            <Alert
              status="warning"
              title={$localize`VPN NAT-PMP Support Required`}
              class="border-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 shadow-lg animate-fade-in-up"
            >
              <div class="text-sm text-amber-800 dark:text-amber-300">
                <p class="mb-2">
                  {$localize`When using NAT-PMP over VPN connections, ensure that:`}
                </p>
                <ul class="space-y-1 ml-4">
                  <li class="flex items-start gap-2">
                    <span class="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                    {$localize`Your VPN server supports NAT-PMP protocol forwarding`}
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                    {$localize`The VPN tunnel allows NAT-PMP control traffic`}
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                    {$localize`Port mapping requests can be processed remotely`}
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                    {$localize`Gateway supports NAT-PMP over tunnel interfaces`}
                  </li>
                </ul>
                <p class="mt-3 text-amber-900 dark:text-amber-200 font-medium">
                  ⚠️ {$localize`NAT-PMP may not function correctly with all VPN implementations.`}
                </p>
              </div>
            </Alert>
          )}

        </div>
      )}

      {/* Bottom status indicator - only show when enabled */}
      {natpmpEnabled.value && (
        <div class="text-center">
          <div class="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 px-6 py-3 text-sm backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d={natpmpEnabled.value ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"} />
          </svg>
          <span class="font-medium text-teal-700 dark:text-teal-300">
            {$localize`NAT-PMP enabled`}
          </span>
        </div>
        </div>
      )}
    </div>
  );
});