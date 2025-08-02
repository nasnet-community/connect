import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select } from "~/components/Core/Select";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const NTPStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableNTPClient = useSignal(servicesData.ntp.enableClient || false);
  const primaryNTPServer = useSignal(
    servicesData.ntp.primaryServer || "pool.ntp.org",
  );
  const secondaryNTPServer = useSignal(
    servicesData.ntp.secondaryServer || "time.google.com",
  );
  const enableNTPServer = useSignal(servicesData.ntp.enableServer || false);
  const allowedNetworks = useSignal(servicesData.ntp.allowedNetworks || "");
  const timeZone = useSignal(servicesData.ntp.timeZone || "UTC");
  const updateInterval = useSignal(servicesData.ntp.updateInterval || "1h");

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
  const updateIntervalOptions = [
    { value: "1h", label: $localize`1 hour` },
    { value: "6h", label: $localize`6 hours` },
    { value: "12h", label: $localize`12 hours` },
    { value: "24h", label: $localize`24 hours` },
    { value: "48h", label: $localize`48 hours` },
  ];

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.ntp = {
      enableClient: enableNTPClient.value,
      primaryServer: primaryNTPServer.value,
      secondaryServer: secondaryNTPServer.value,
      enableServer: enableNTPServer.value,
      allowedNetworks: allowedNetworks.value,
      timeZone: timeZone.value,
      updateInterval: updateInterval.value,
    };

    // Validate: at least one of NTP Client or NTP Server must be enabled
    const isComplete = enableNTPClient.value || enableNTPServer.value;

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
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
        <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
          <div class="flex items-center space-x-5">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`NTP Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Configure Network Time Protocol for accurate time synchronization`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div class="p-6">
          <div class="space-y-6">
            {/* NTP Client Section */}
            <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
              <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                {$localize`NTP Client`}
              </h3>

              {/* Enable NTP Client */}
              <div class="mb-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                    checked={enableNTPClient.value}
                    onChange$={(e: any) => {
                      enableNTPClient.value = e.target.checked;
                      validateAndUpdate$();
                    }}
                  />
                  <span class="text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Enable NTP Client`}
                  </span>
                </label>
                <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                  {$localize`Synchronize router time with external NTP servers`}
                </p>
              </div>

              {/* NTP Client fields - shown only when enabled */}
              {enableNTPClient.value && (
                <div class="space-y-4">
                  {/* Primary NTP Server */}
                  <div>
                    <label
                      class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                      for="primary-ntp"
                    >
                      {$localize`Primary NTP Server`}
                    </label>
                    <input
                      id="primary-ntp"
                      type="text"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                             focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                             dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder={$localize`pool.ntp.org`}
                      value={primaryNTPServer.value}
                      onInput$={(e: any) => {
                        primaryNTPServer.value = e.target.value;
                        validateAndUpdate$();
                      }}
                    />
                  </div>

                  {/* Secondary NTP Server */}
                  <div>
                    <label
                      class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                      for="secondary-ntp"
                    >
                      {$localize`Secondary NTP Server`}
                    </label>
                    <input
                      id="secondary-ntp"
                      type="text"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                             focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                             dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder={$localize`time.google.com`}
                      value={secondaryNTPServer.value}
                      onInput$={(e: any) => {
                        secondaryNTPServer.value = e.target.value;
                        validateAndUpdate$();
                      }}
                    />
                  </div>

                  {/* Time Zone */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                      {$localize`Time Zone`}
                    </label>
                    <Select
                      options={timeZoneOptions}
                      value={timeZone.value}
                      onChange$={(value) => {
                        timeZone.value = value;
                        validateAndUpdate$();
                      }}
                      clearable={false}
                      class="w-full"
                    />
                  </div>

                  {/* Update Interval */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                      {$localize`Update Interval`}
                    </label>
                    <Select
                      options={updateIntervalOptions}
                      value={updateInterval.value}
                      onChange$={(value) => {
                        updateInterval.value = value;
                        validateAndUpdate$();
                      }}
                      clearable={false}
                      class="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* NTP Server Section */}
            <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
              <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                {$localize`NTP Server`}
              </h3>

              {/* Enable NTP Server */}
              <div class="mb-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                    checked={enableNTPServer.value}
                    onChange$={(e: any) => {
                      enableNTPServer.value = e.target.checked;
                      validateAndUpdate$();
                    }}
                  />
                  <span class="text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Enable NTP Server`}
                  </span>
                </label>
                <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                  {$localize`Allow other devices to synchronize time with this router`}
                </p>
              </div>

              {/* NTP Server fields - shown only when enabled */}
              {enableNTPServer.value && (
                <div>
                  {/* Allowed Networks */}
                  <div>
                    <label
                      class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                      for="allowed-networks"
                    >
                      {$localize`Allowed Networks`}
                    </label>
                    <input
                      id="allowed-networks"
                      type="text"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                             focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                             dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder={$localize`192.168.0.0/16`}
                      value={allowedNetworks.value}
                      onInput$={(e: any) => {
                        allowedNetworks.value = e.target.value;
                        validateAndUpdate$();
                      }}
                    />
                    <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                      {$localize`Networks allowed to query this NTP server (CIDR format)`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Required Configuration Notice */}
          <div class="mt-6 rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
            <div class="flex items-start">
              <svg
                class="mr-3 mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-primary-800 dark:text-primary-200">
                  {$localize`Configuration Required`}
                </h3>
                <p class="mt-1 text-sm text-primary-700 dark:text-primary-300">
                  {$localize`Enable at least NTP Client or NTP Server to proceed to the next step.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
