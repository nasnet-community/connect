import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Card, CardHeader, CardBody, Input, Button } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const NTPStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const ntpServers = useSignal<string[]>(servicesData.ntp.servers || ["pool.ntp.org"]);
  const newServerInput = useSignal("");

  // Popular NTP servers for quick add
  const popularServers = [
    "pool.ntp.org",
    "time.google.com",
    "time.cloudflare.com",
    "time.windows.com",
    "time.nist.gov",
    "1.pool.ntp.org",
    "2.pool.ntp.org",
    "3.pool.ntp.org"
  ];

  // Add NTP server
  const addServer$ = $((server: string) => {
    if (server.trim() && !ntpServers.value.includes(server.trim())) {
      ntpServers.value = [...ntpServers.value, server.trim()];
      newServerInput.value = "";
      validateAndUpdate$();
    }
  });

  // Remove NTP server
  const removeServer$ = $((index: number) => {
    ntpServers.value = ntpServers.value.filter((_, i) => i !== index);
    validateAndUpdate$();
  });

  // Quick add popular server
  const addPopularServer$ = $((server: string) => {
    if (!ntpServers.value.includes(server)) {
      ntpServers.value = [...ntpServers.value, server];
      validateAndUpdate$();
    }
  });

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.ntp = {
      servers: ntpServers.value,
      timeZone: "UTC",
      updateInterval: "1h",
    };

    // Validate: At least one NTP server must be configured
    const isComplete = ntpServers.value.length > 0 && ntpServers.value.every(server => server.trim() !== "");

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 2,
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
          <div class="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500/15 via-secondary-500/15 to-primary-500/15 animate-pulse-slow"></div>
          <div class="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white shadow-2xl shadow-primary-500/30 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-primary-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 transition-transform duration-500 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white animate-gradient bg-300%">
            {$localize`NTP Time Synchronization`}
          </h3>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {$localize`Configure multiple NTP servers for accurate time synchronization across your network`}
          </p>
        </div>
      </div>

      {/* NTP Servers Configuration with glassmorphism */}
      <Card class="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <CardHeader class="relative">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <h4 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-600 dark:text-primary-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                {$localize`NTP Servers Configuration`}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {$localize`Add multiple NTP servers for redundancy and accuracy`}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody class="space-y-6">
          {/* Current NTP Servers List */}
          <div class="space-y-4">
            <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
              {$localize`Configured Servers`} ({ntpServers.value.length})
            </h5>
            <div class="space-y-3">
              {ntpServers.value.map((server, index) => (
                <div
                  key={index}
                  class="group/item flex items-center justify-between p-4 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl border border-primary-200/50 dark:border-primary-700/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10 animate-fade-in-up"
                >
                  <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800/50 dark:to-primary-700/50 text-primary-600 dark:text-primary-300 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover/item:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">{server}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {index === 0 ? 
                          <span class="inline-flex items-center gap-1.5">
                            <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            {$localize`Primary server`}
                          </span> : 
                          $localize`Backup server ${index}`
                        }
                      </p>
                    </div>
                  </div>
                  {ntpServers.value.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick$={() => removeServer$(index)}
                      class="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Server */}
          <div class="space-y-4">
            <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
              {$localize`Add Custom Server`}
            </h5>
            <div class="flex gap-4">
              <div class="flex-1">
                <Input
                  type="text"
                  placeholder={$localize`Enter NTP server address`}
                  value={newServerInput.value}
                  onInput$={(e: any) => {
                    newServerInput.value = e.target.value;
                  }}
                  onKeyDown$={(e: KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addServer$(newServerInput.value);
                    }
                  }}
                />
              </div>
              <Button
                variant="outline"
                onClick$={() => addServer$(newServerInput.value)}
                disabled={!newServerInput.value.trim()}
              >
                {$localize`Add Server`}
              </Button>
            </div>
          </div>

          {/* Popular Servers Quick Add */}
          <div class="space-y-4">
            <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
              {$localize`Popular NTP Servers`}
            </h5>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularServers
                .filter(server => !ntpServers.value.includes(server))
                .map((server, _index) => (
                  <Button
                    key={server}
                    variant="ghost"
                    size="sm"
                    onClick$={() => addPopularServer$(server)}
                    class="group h-auto py-3 px-4 text-left border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 hover:scale-[1.02] hover:shadow-md transition-all duration-300 rounded-xl animate-fade-in-up"
                  >
                    <div class="w-full space-y-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{server}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {$localize`Click to add`}
                      </p>
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        </CardBody>
      </Card>


    </div>
  );
});