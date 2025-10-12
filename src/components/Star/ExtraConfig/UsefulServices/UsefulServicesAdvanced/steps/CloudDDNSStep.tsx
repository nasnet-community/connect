import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select, Card, CardHeader, CardBody, Input, FormField, Toggle, Button } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";

export const CloudDDNSStep = component$(() => {
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableDDNS = useSignal(servicesData.cloudDDNS.enableDDNS || false);
  const ddnsEntries = useSignal(servicesData.cloudDDNS.ddnsEntries || []);

  // New DDNS entry form state
  const newEntryProvider = useSignal("no-ip");
  const newEntryHostname = useSignal("");
  const newEntryUsername = useSignal("");
  const newEntryPassword = useSignal("");
  const newEntryUpdateInterval = useSignal("30m");
  const newEntryCustomURL = useSignal("");

  // DDNS Provider options
  const providerOptions = [
    { value: "no-ip", label: "No-IP" },
    { value: "dyndns", label: "DynDNS" },
    { value: "duckdns", label: "Duck DNS" },
    { value: "cloudflare", label: "Cloudflare" },
    { value: "custom", label: $localize`Custom Provider` },
  ];

  // Update interval options  
  const updateIntervalOptions = [
    { value: "5m", label: $localize`5 minutes` },
    { value: "10m", label: $localize`10 minutes` },
    { value: "30m", label: $localize`30 minutes` },
    { value: "1h", label: $localize`1 hour` },
  ];


  // Add new DDNS entry
  const addDDNSEntry$ = $(() => {
    if (newEntryHostname.value.trim() && newEntryUsername.value.trim() && newEntryPassword.value.trim()) {
      const newEntry = {
        id: `ddns-${Date.now()}`,
        provider: newEntryProvider.value,
        hostname: newEntryHostname.value.trim(),
        username: newEntryUsername.value.trim(),
        password: newEntryPassword.value.trim(),
        updateInterval: newEntryUpdateInterval.value,
        customServerURL: newEntryProvider.value === "custom" ? newEntryCustomURL.value.trim() : undefined,
      };
      
      ddnsEntries.value = [...ddnsEntries.value, newEntry];
      
      // Clear form
      newEntryHostname.value = "";
      newEntryUsername.value = "";
      newEntryPassword.value = "";
      newEntryCustomURL.value = "";
      
      validateAndUpdate$();
    }
  });

  // Remove DDNS entry
  const removeDDNSEntry$ = $((id: string) => {
    ddnsEntries.value = ddnsEntries.value.filter((entry: any) => entry.id !== id);
    validateAndUpdate$();
  });

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data with only ddnsEntries
    const entries = enableDDNS.value ? ddnsEntries.value : [];
    servicesData.cloudDDNS = {
      ddnsEntries: entries,
    };

    // Update StarContext - explicit property assignment to avoid spread operator issues
    const currentServices = starCtx.state.ExtraConfig.usefulServices || {};
    starCtx.updateExtraConfig$({
      usefulServices: {
        certificate: currentServices.certificate,
        ntp: currentServices.ntp,
        graphing: currentServices.graphing,
        cloudDDNS: {
          ddnsEntries: entries,
        },
        upnp: currentServices.upnp,
        natpmp: currentServices.natpmp,
      }
    });

    // Validate: DDNS is disabled or at least one valid entry exists
    const isComplete = !enableDDNS.value || ddnsEntries.value.length > 0;

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
    <div class="space-y-8 animate-fade-in-up">
      {/* Modern header */}
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-500 text-white mb-6 shadow-xl shadow-primary-500/25 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
          {$localize`Dynamic DNS`}
        </h3>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {$localize`Configure multiple DDNS providers to maintain consistent domain access`}
        </p>
      </div>


      {/* Dynamic DNS Section */}
      <div class="space-y-6">

        {/* DDNS Enable Toggle */}
        <Card class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200/50 dark:border-primary-700/50 shadow-lg">
          <CardHeader>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                    {$localize`Enable Dynamic DNS`}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400">
                    {$localize`Maintain a consistent domain name despite IP changes`}
                  </p>
                </div>
              </div>
              <Toggle
                checked={enableDDNS.value}
                onChange$={$((checked) => {
                  enableDDNS.value = checked;
                  validateAndUpdate$();
                })}
                size="lg"
                color="primary"
              />
            </div>
          </CardHeader>
        </Card>

        {/* Current DDNS Entries List */}
        {enableDDNS.value && ddnsEntries.value.length > 0 && (
          <Card class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200/50 dark:border-primary-700/50 shadow-lg animate-fade-in-up">
            <CardHeader>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {$localize`Configured DDNS Entries`} ({ddnsEntries.value.length})
              </h4>
            </CardHeader>
            <CardBody>
              <div class="space-y-4">
                {ddnsEntries.value.map((entry: any) => {
                  const provider = providerOptions.find(p => p.value === entry.provider);
                  return (
                    <div
                      key={entry.id}
                      class="group/entry flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div class="flex items-center gap-4">
                        <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800/50 dark:to-secondary-700/50 text-secondary-600 dark:text-secondary-300 transition-all duration-300 group-hover/entry:scale-110 group-hover/entry:rotate-6">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 transition-transform duration-300 group-hover/entry:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                          </svg>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">{entry.hostname}</p>
                          <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <span class="inline-flex items-center gap-1">
                              <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                              {provider?.label}
                            </span>
                            • {$localize`Updates every`} {entry.updateInterval}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick$={() => removeDDNSEntry$(entry.id)}
                        class="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Add New DDNS Entry Form - shown only when enabled */}
        {enableDDNS.value && (
          <Card class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200/50 dark:border-primary-700/50 shadow-lg animate-fade-in-up">
            <CardHeader>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {$localize`Add DDNS Entry`}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {$localize`Configure a new Dynamic DNS provider`}
              </p>
            </CardHeader>
            <CardBody class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label={$localize`Provider`}
                  helperText={$localize`Select DDNS service provider`}
                >
                  <Select
                    options={providerOptions}
                    value={newEntryProvider.value}
                    onChange$={(value) => {
                      newEntryProvider.value = Array.isArray(value) ? value[0] : value;
                    }}
                    clearable={false}
                  />
                </FormField>

                <FormField
                  label={$localize`Update Interval`}
                  helperText={$localize`How often to check for IP changes`}
                >
                  <Select
                    options={updateIntervalOptions}
                    value={newEntryUpdateInterval.value}
                    onChange$={(value) => {
                      newEntryUpdateInterval.value = Array.isArray(value) ? value[0] : value;
                    }}
                    clearable={false}
                  />
                </FormField>
              </div>

              {/* Custom Server URL for custom provider */}
              {newEntryProvider.value === "custom" && (
                <FormField
                  label={$localize`Custom Server URL`}
                  required
                  helperText={$localize`Enter the full URL for your DDNS update endpoint`}
                >
                  <Input
                    type="text"
                    placeholder={$localize`https://your-ddns-server.com/update`}
                    value={newEntryCustomURL.value}
                    onInput$={(e: any) => {
                      newEntryCustomURL.value = e.target.value;
                    }}
                  />
                </FormField>
              )}

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label={$localize`Hostname`}
                  required
                  helperText={$localize`Your dynamic DNS hostname`}
                >
                  <Input
                    type="text"
                    placeholder={$localize`yourhost.ddns.net`}
                    value={newEntryHostname.value}
                    onInput$={(e: any) => {
                      newEntryHostname.value = e.target.value;
                    }}
                  />
                </FormField>

                <FormField
                  label={$localize`Username/Email`}
                  required
                  helperText={$localize`Your DDNS service account`}
                >
                  <Input
                    type="text"
                    placeholder={$localize`Enter username or email`}
                    value={newEntryUsername.value}
                    onInput$={(e: any) => {
                      newEntryUsername.value = e.target.value;
                    }}
                  />
                </FormField>

                <FormField
                  label={$localize`Password/API Key`}
                  required
                  helperText={$localize`Your service password or API token`}
                >
                  <Input
                    type="password"
                    placeholder={$localize`Enter password or API key`}
                    value={newEntryPassword.value}
                    onInput$={(e: any) => {
                      newEntryPassword.value = e.target.value;
                    }}
                  />
                </FormField>
              </div>

              <div class="flex justify-end">
                <Button
                  onClick$={addDDNSEntry$}
                  disabled={!newEntryHostname.value.trim() || !newEntryUsername.value.trim() || !newEntryPassword.value.trim()}
                  class="px-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {$localize`Add DDNS Entry`}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>



      {/* Bottom status indicator - only show when active */}
      {enableDDNS.value && ddnsEntries.value.length > 0 && (
        <div class="text-center">
          <div class="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 px-6 py-3 text-sm border border-primary-200/50 dark:border-primary-700/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13a3 3 0 00-6 0l3 3 3-3z" />
          </svg>
          <span class="font-medium text-primary-700 dark:text-primary-300">
            {`${ddnsEntries.value.length} ${ddnsEntries.value.length === 1 ? $localize`DDNS entry configured` : $localize`DDNS entries configured`}`}
          </span>
        </div>
      </div>
      )}
    </div>
  );
});