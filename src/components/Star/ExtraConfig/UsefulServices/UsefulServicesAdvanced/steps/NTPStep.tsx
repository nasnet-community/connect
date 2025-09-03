import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select, Card, CardHeader, CardBody, Input, FormField, Button } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const NTPStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const ntpServers = useSignal<string[]>(servicesData.ntp.servers || ["pool.ntp.org"]);
  const timeZone = useSignal(servicesData.ntp.timeZone || "UTC");
  const updateInterval = useSignal(servicesData.ntp.updateInterval || "1h");
  const newServerInput = useSignal("");

  // Time zone options
  const timeZoneOptions = [
    { value: "UTC", label: $localize`UTC` },
    { value: "GMT", label: $localize`GMT` },
    { value: "GMT+1", label: $localize`GMT+1 (CET)` },
    { value: "GMT+2", label: $localize`GMT+2 (EET)` },
    { value: "GMT+3", label: $localize`GMT+3 (MSK)` },
    { value: "GMT+4", label: $localize`GMT+4` },
    { value: "GMT+5", label: $localize`GMT+5` },
    { value: "GMT+6", label: $localize`GMT+6` },
    { value: "GMT+7", label: $localize`GMT+7` },
    { value: "GMT+8", label: $localize`GMT+8 (CST)` },
    { value: "GMT+9", label: $localize`GMT+9 (JST)` },
    { value: "GMT+10", label: $localize`GMT+10 (AEST)` },
    { value: "GMT-5", label: $localize`GMT-5 (EST)` },
    { value: "GMT-6", label: $localize`GMT-6 (CST)` },
    { value: "GMT-7", label: $localize`GMT-7 (MST)` },
    { value: "GMT-8", label: $localize`GMT-8 (PST)` },
    { value: "GMT-9", label: $localize`GMT-9 (AKST)` },
    { value: "GMT-10", label: $localize`GMT-10 (HST)` },
  ];

  // Update interval options
  const intervalOptions = [
    { value: "1h", label: $localize`1 hour` },
    { value: "6h", label: $localize`6 hours` },
    { value: "12h", label: $localize`12 hours` },
    { value: "24h", label: $localize`24 hours` },
  ];

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
      timeZone: timeZone.value,
      updateInterval: updateInterval.value,
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

      {/* Time Configuration */}
      <Card class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200/50 dark:border-indigo-700/50 shadow-lg">
        <CardHeader>
          <h4 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {$localize`Time Configuration`}
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Configure timezone and synchronization settings`}
          </p>
        </CardHeader>
        <CardBody>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label={$localize`Time Zone`}
              helperText={$localize`Select your local timezone`}
            >
              <Select
                options={timeZoneOptions}
                value={timeZone.value}
                onChange$={(value) => {
                  timeZone.value = value;
                  validateAndUpdate$();
                }}
                clearable={false}
              />
            </FormField>

            <FormField
              label={$localize`Update Interval`}
              helperText={$localize`How often to sync time`}
            >
              <Select
                options={intervalOptions}
                value={updateInterval.value}
                onChange$={(value) => {
                  updateInterval.value = value;
                  validateAndUpdate$();
                }}
                clearable={false}
              />
            </FormField>
          </div>
        </CardBody>
      </Card>

      {/* Status */}
      {ntpServers.value.length > 0 && (
        <Card class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200/50 dark:border-green-700/50 shadow-lg">
          <CardBody>
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm font-medium text-green-800 dark:text-green-200">
                {ntpServers.value.length === 1 
                  ? $localize`1 NTP server configured for time synchronization`
                  : $localize`${ntpServers.value.length} NTP servers configured for redundant time synchronization`
                }
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
});