import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select } from "~/components/Core/Select";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const CloudDDNSStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableDDNS = useSignal(servicesData.cloudDDNS.enableDDNS || false);
  const ddnsProvider = useSignal(servicesData.cloudDDNS.provider || "no-ip");
  const hostname = useSignal(servicesData.cloudDDNS.hostname || "");
  const username = useSignal(servicesData.cloudDDNS.username || "");
  const password = useSignal(servicesData.cloudDDNS.password || "");
  const updateInterval = useSignal(
    servicesData.cloudDDNS.updateInterval || "30m",
  );
  const enableSSL = useSignal(servicesData.cloudDDNS.enableSSL !== false);
  const customServerURL = useSignal(
    servicesData.cloudDDNS.customServerURL || "",
  );
  const enableCloudBackup = useSignal(
    servicesData.cloudDDNS.enableCloudBackup || false,
  );
  const backupInterval = useSignal(
    servicesData.cloudDDNS.backupInterval || "weekly",
  );

  // DDNS Provider options
  const ddnsProviderOptions = [
    { value: "no-ip", label: $localize`No-IP` },
    { value: "dyndns", label: $localize`DynDNS` },
    { value: "duck-dns", label: $localize`Duck DNS` },
    { value: "cloudflare", label: $localize`CloudFlare` },
    { value: "custom", label: $localize`Custom` },
  ];

  // Update interval options
  const updateIntervalOptions = [
    { value: "5m", label: $localize`5 minutes` },
    { value: "10m", label: $localize`10 minutes` },
    { value: "30m", label: $localize`30 minutes` },
    { value: "1h", label: $localize`1 hour` },
  ];

  // Backup interval options
  const backupIntervalOptions = [
    { value: "daily", label: $localize`Daily` },
    { value: "weekly", label: $localize`Weekly` },
    { value: "monthly", label: $localize`Monthly` },
  ];

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.cloudDDNS = {
      enableDDNS: enableDDNS.value,
      provider: ddnsProvider.value,
      hostname: hostname.value,
      username: username.value,
      password: password.value,
      updateInterval: updateInterval.value,
      enableSSL: enableSSL.value,
      customServerURL: customServerURL.value,
      enableCloudBackup: enableCloudBackup.value,
      backupInterval: backupInterval.value,
    };

    // Validate: DDNS is enabled and all required fields are filled
    const isComplete =
      enableDDNS.value &&
      ddnsProvider.value.trim() !== "" &&
      hostname.value.trim() !== "" &&
      username.value.trim() !== "" &&
      password.value.trim() !== "";

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 4,
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`Cloud/DDNS Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Configure Dynamic DNS and cloud services for remote access`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div class="p-6">
          <div class="space-y-6">
            {/* DDNS Configuration Section */}
            <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
              <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                {$localize`DDNS Configuration`}
              </h3>

              {/* Enable DDNS */}
              <div class="mb-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                    checked={enableDDNS.value}
                    onChange$={(e: any) => {
                      enableDDNS.value = e.target.checked;
                      validateAndUpdate$();
                    }}
                  />
                  <span class="text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Enable DDNS`}
                  </span>
                </label>
                <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                  {$localize`Enable Dynamic DNS to maintain a consistent domain name for your router`}
                </p>
              </div>

              {/* DDNS fields - shown only when enabled */}
              {enableDDNS.value && (
                <div class="space-y-4">
                  {/* DDNS Provider */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                      {$localize`DDNS Provider`}
                      <span class="ml-1 text-red-500">*</span>
                    </label>
                    <Select
                      options={ddnsProviderOptions}
                      value={ddnsProvider.value}
                      onChange$={(value) => {
                        ddnsProvider.value = value;
                        validateAndUpdate$();
                      }}
                      clearable={false}
                      class="w-full"
                    />
                  </div>

                  {/* Custom Server URL - shown only for Custom provider */}
                  {ddnsProvider.value === "custom" && (
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="custom-server"
                      >
                        {$localize`Custom Server URL`}
                      </label>
                      <input
                        id="custom-server"
                        type="text"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        placeholder={$localize`https://your-ddns-server.com/update`}
                        value={customServerURL.value}
                        onInput$={(e: any) => {
                          customServerURL.value = e.target.value;
                          validateAndUpdate$();
                        }}
                      />
                    </div>
                  )}

                  {/* Hostname */}
                  <div>
                    <label
                      class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                      for="hostname"
                    >
                      {$localize`Hostname`}
                      <span class="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      id="hostname"
                      type="text"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                             focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                             dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder={$localize`yourhost.ddns.net`}
                      value={hostname.value}
                      onInput$={(e: any) => {
                        hostname.value = e.target.value;
                        validateAndUpdate$();
                      }}
                    />
                  </div>

                  {/* Username/Email */}
                  <div>
                    <label
                      class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                      for="username"
                    >
                      {$localize`Username/Email`}
                      <span class="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                             focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                             dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder={$localize`Enter username or email`}
                      value={username.value}
                      onInput$={(e: any) => {
                        username.value = e.target.value;
                        validateAndUpdate$();
                      }}
                    />
                  </div>

                  {/* Password/API Key */}
                  <div>
                    <label
                      class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                      for="password"
                    >
                      {$localize`Password/API Key`}
                      <span class="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                             focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                             dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder={$localize`Enter password or API key`}
                      value={password.value}
                      onInput$={(e: any) => {
                        password.value = e.target.value;
                        validateAndUpdate$();
                      }}
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

                  {/* Enable SSL/HTTPS */}
                  <div>
                    <label class="flex items-center">
                      <input
                        type="checkbox"
                        class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                        checked={enableSSL.value}
                        onChange$={(e: any) => {
                          enableSSL.value = e.target.checked;
                          validateAndUpdate$();
                        }}
                      />
                      <span class="text-sm font-medium text-text dark:text-text-dark-default">
                        {$localize`Enable SSL/HTTPS`}
                      </span>
                    </label>
                    <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                      {$localize`Use secure HTTPS connection for DDNS updates`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cloud Services Section */}
            <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
              <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                {$localize`Cloud Services`}
              </h3>

              {/* Enable Cloud Backup */}
              <div class="mb-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                    checked={enableCloudBackup.value}
                    onChange$={(e: any) => {
                      enableCloudBackup.value = e.target.checked;
                      validateAndUpdate$();
                    }}
                  />
                  <span class="text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Enable Cloud Backup`}
                  </span>
                </label>
                <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                  {$localize`Automatically backup router configuration to cloud storage`}
                </p>
              </div>

              {/* Backup Interval - shown only when Cloud Backup is enabled */}
              {enableCloudBackup.value && (
                <div>
                  <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Backup Interval`}
                  </label>
                  <Select
                    options={backupIntervalOptions}
                    value={backupInterval.value}
                    onChange$={(value) => {
                      backupInterval.value = value;
                      validateAndUpdate$();
                    }}
                    clearable={false}
                    class="w-full"
                  />
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
                  {$localize`Enable DDNS and fill all required fields (Provider, Hostname, Username, Password) to proceed to the next step.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
