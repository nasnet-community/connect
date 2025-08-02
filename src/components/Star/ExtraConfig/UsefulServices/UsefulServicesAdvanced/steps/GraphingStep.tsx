import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select } from "~/components/Core/Select";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const GraphingStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableGraphing = useSignal(servicesData.graphing.enabled || false);
  const dataRetentionDays = useSignal(
    servicesData.graphing.dataRetentionDays || 30,
  );
  const updateInterval = useSignal(
    servicesData.graphing.updateInterval || "15m",
  );
  const monitoredInterfaces = useSignal(
    servicesData.graphing.monitoredInterfaces || {
      wan1: false,
      wan2: false,
      lan: false,
      wireless: false,
    },
  );
  const enableCPUMonitoring = useSignal(
    servicesData.graphing.enableCPU || false,
  );
  const enableMemoryMonitoring = useSignal(
    servicesData.graphing.enableMemory || false,
  );
  const enableDiskMonitoring = useSignal(
    servicesData.graphing.enableDisk || false,
  );
  const enableNetworkTrafficGraphs = useSignal(
    servicesData.graphing.enableNetworkTraffic || false,
  );
  const graphResolution = useSignal(
    servicesData.graphing.graphResolution || "medium",
  );
  const storageLocation = useSignal(
    servicesData.graphing.storageLocation || "internal",
  );

  // Update interval options
  const updateIntervalOptions = [
    { value: "5m", label: $localize`5 minutes` },
    { value: "15m", label: $localize`15 minutes` },
    { value: "30m", label: $localize`30 minutes` },
    { value: "1h", label: $localize`1 hour` },
  ];

  // Graph resolution options
  const graphResolutionOptions = [
    { value: "high", label: $localize`High` },
    { value: "medium", label: $localize`Medium` },
    { value: "low", label: $localize`Low` },
  ];

  // Storage location options
  const storageLocationOptions = [
    { value: "internal", label: $localize`Internal` },
    { value: "external", label: $localize`External USB` },
  ];

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.graphing = {
      enabled: enableGraphing.value,
      dataRetentionDays: dataRetentionDays.value,
      updateInterval: updateInterval.value,
      monitoredInterfaces: monitoredInterfaces.value,
      enableCPU: enableCPUMonitoring.value,
      enableMemory: enableMemoryMonitoring.value,
      enableDisk: enableDiskMonitoring.value,
      enableNetworkTraffic: enableNetworkTrafficGraphs.value,
      graphResolution: graphResolution.value,
      storageLocation: storageLocation.value,
    };

    // Validate: Graphing enabled and at least one monitoring option selected
    const hasInterfaceMonitoring = Object.values(
      monitoredInterfaces.value,
    ).some((enabled) => enabled);
    const hasSystemMonitoring =
      enableCPUMonitoring.value ||
      enableMemoryMonitoring.value ||
      enableDiskMonitoring.value;
    const hasNetworkTrafficGraphs = enableNetworkTrafficGraphs.value;

    const isComplete =
      enableGraphing.value &&
      (hasInterfaceMonitoring ||
        hasSystemMonitoring ||
        hasNetworkTrafficGraphs);

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

  // Handle interface monitoring change
  const handleInterfaceChange$ = $(
    (
      interfaceKey: keyof typeof monitoredInterfaces.value,
      checked: boolean,
    ) => {
      monitoredInterfaces.value = {
        ...monitoredInterfaces.value,
        [interfaceKey]: checked,
      };
      validateAndUpdate$();
    },
  );

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
                  d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`Graphing Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Configure monitoring and graphing for network performance analysis`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div class="p-6">
          <div class="space-y-6">
            {/* Enable Graphing */}
            <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
              <div class="mb-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                    checked={enableGraphing.value}
                    onChange$={(e: any) => {
                      enableGraphing.value = e.target.checked;
                      validateAndUpdate$();
                    }}
                  />
                  <span class="text-sm font-medium text-text dark:text-text-dark-default">
                    {$localize`Enable Graphing`}
                  </span>
                </label>
                <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                  {$localize`Enable network monitoring and performance graphing`}
                </p>
              </div>

              {/* Graphing configuration fields - shown only when enabled */}
              {enableGraphing.value && (
                <div class="space-y-6">
                  {/* Basic Settings */}
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Data Retention Days */}
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="retention-days"
                      >
                        {$localize`Data Retention Days`}
                      </label>
                      <input
                        id="retention-days"
                        type="number"
                        min="1"
                        max="365"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        value={dataRetentionDays.value}
                        onInput$={(e: any) => {
                          const value = Math.max(
                            1,
                            Math.min(365, parseInt(e.target.value) || 30),
                          );
                          dataRetentionDays.value = value;
                          validateAndUpdate$();
                        }}
                      />
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`Number of days to retain monitoring data (1-365)`}
                      </p>
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

                  {/* Interface Monitoring */}
                  <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
                    <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                      {$localize`Interface Monitoring`}
                    </h3>

                    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {/* WAN1 */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={monitoredInterfaces.value.wan1}
                            onChange$={(e: any) => {
                              handleInterfaceChange$("wan1", e.target.checked);
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`WAN1`}
                          </span>
                        </label>
                      </div>

                      {/* WAN2 */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={monitoredInterfaces.value.wan2}
                            onChange$={(e: any) => {
                              handleInterfaceChange$("wan2", e.target.checked);
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`WAN2`}
                          </span>
                        </label>
                      </div>

                      {/* LAN */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={monitoredInterfaces.value.lan}
                            onChange$={(e: any) => {
                              handleInterfaceChange$("lan", e.target.checked);
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`LAN`}
                          </span>
                        </label>
                      </div>

                      {/* Wireless */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={monitoredInterfaces.value.wireless}
                            onChange$={(e: any) => {
                              handleInterfaceChange$(
                                "wireless",
                                e.target.checked,
                              );
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Wireless`}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* System Monitoring */}
                  <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
                    <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                      {$localize`System Monitoring`}
                    </h3>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* CPU Monitoring */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={enableCPUMonitoring.value}
                            onChange$={(e: any) => {
                              enableCPUMonitoring.value = e.target.checked;
                              validateAndUpdate$();
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Enable CPU Monitoring`}
                          </span>
                        </label>
                      </div>

                      {/* Memory Monitoring */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={enableMemoryMonitoring.value}
                            onChange$={(e: any) => {
                              enableMemoryMonitoring.value = e.target.checked;
                              validateAndUpdate$();
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Enable Memory Monitoring`}
                          </span>
                        </label>
                      </div>

                      {/* Disk Monitoring */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={enableDiskMonitoring.value}
                            onChange$={(e: any) => {
                              enableDiskMonitoring.value = e.target.checked;
                              validateAndUpdate$();
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Enable Disk Monitoring`}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Graph Settings */}
                  <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
                    <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                      {$localize`Graph Settings`}
                    </h3>

                    <div class="space-y-4">
                      {/* Network Traffic Graphs */}
                      <div>
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                            checked={enableNetworkTrafficGraphs.value}
                            onChange$={(e: any) => {
                              enableNetworkTrafficGraphs.value =
                                e.target.checked;
                              validateAndUpdate$();
                            }}
                          />
                          <span class="text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Enable Network Traffic Graphs`}
                          </span>
                        </label>
                        <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                          {$localize`Generate detailed network traffic graphs and statistics`}
                        </p>
                      </div>

                      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Graph Resolution */}
                        <div>
                          <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Graph Resolution`}
                          </label>
                          <Select
                            options={graphResolutionOptions}
                            value={graphResolution.value}
                            onChange$={(value) => {
                              graphResolution.value = value;
                              validateAndUpdate$();
                            }}
                            clearable={false}
                            class="w-full"
                          />
                          <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                            {$localize`Higher resolution provides more detailed graphs but uses more resources`}
                          </p>
                        </div>

                        {/* Storage Location */}
                        <div>
                          <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                            {$localize`Storage Location`}
                          </label>
                          <Select
                            options={storageLocationOptions}
                            value={storageLocation.value}
                            onChange$={(value) => {
                              storageLocation.value = value;
                              validateAndUpdate$();
                            }}
                            clearable={false}
                            class="w-full"
                          />
                          <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                            {$localize`Choose where to store monitoring data and graphs`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Required Notice */}
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
                  {$localize`Enable graphing and select at least one monitoring option to proceed to the next step.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
