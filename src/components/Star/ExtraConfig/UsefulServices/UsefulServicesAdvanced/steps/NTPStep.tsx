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
      {/* Modern header */}
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white mb-6 shadow-xl shadow-blue-500/25 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
          {$localize`NTP Time Synchronization`}
        </h3>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {$localize`Configure multiple NTP servers for accurate time synchronization`}
        </p>
      </div>

      {/* NTP Servers Configuration */}
      <Card class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <h4 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            {$localize`NTP Servers`}
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Add multiple NTP servers for redundancy and accuracy`}
          </p>
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
                  class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{server}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {index === 0 ? $localize`Primary server` : $localize`Backup server ${index}`}
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
                .map((server) => (
                  <Button
                    key={server}
                    variant="ghost"
                    size="sm"
                    onClick$={() => addPopularServer$(server)}
                    class="h-auto py-3 px-4 text-left border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                  >
                    <div class="w-full">
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{server}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{$localize`Click to add`}</p>
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